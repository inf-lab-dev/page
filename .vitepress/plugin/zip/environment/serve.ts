import * as path from 'node:path';
import type { Connect, Plugin, ResolvedConfig, ViteDevServer } from 'vite';
import { ZipPluginOptions } from '..';
import { getLogger, Logger } from '../../logger';
import { collectManifests } from '../file';
import { createArchive } from '../file/archive';
import { createShellScript } from '../file/shell';
import {
    loadManifest,
    ResolvedZipManifest,
    SelfExtractionConfiguration,
} from '../manifest';

/**
 * Creates a middleware to intercept the zip files and serve them dynamically.
 *
 * @param options the plugins options
 * @param devServer the vite dev-server, that provides the public url
 * @param manifestMap the map that houses all manifests
 * @returns the created middleware
 */
function createMiddleware(
    { src }: ZipPluginOptions,
    devServer: ViteDevServer,
    manifestMap: Map<string, ResolvedZipManifest>,
): Connect.NextHandleFunction {
    /**
     * Gets the manifest from the given url and what to serve from it.
     *
     * @param url the request url
     * @returns the resolved manifest, its path and what to serve from it
     */
    const getManifest = (
        url: string,
    ):
        | [
              manifest: ResolvedZipManifest,
              manifestPath: string,
              serve: 'shell' | 'zip',
          ]
        | null => {
        let serveShellScript = false;

        if (url.endsWith('.sh')) {
            serveShellScript = true;

            url = url.slice(0, -3);
        }

        const manifestFile = path
            .join(src, `${url}.json`)
            // normalize path separators
            .replaceAll('\\', '/');

        if (manifestMap.has(manifestFile)) {
            return [
                manifestMap.get(manifestFile)!,
                manifestFile,
                serveShellScript ? 'shell' : 'zip',
            ];
        }

        return null;
    };

    // use a named function to be able to detect this when re-ordering the middlewares
    return async function viteZipMiddleware({ url }, res, next) {
        if (!url) {
            throw new ReferenceError('Could not determine url from request.');
        }

        const publicUrl =
            devServer.resolvedUrls?.local?.[0] ??
            devServer.resolvedUrls?.network?.[0];
        const [manifest, manifestFile, serve] = getManifest(url) ?? [];

        if (manifest && manifestFile && serve) {
            if (serve === 'zip') {
                const archive = createArchive(manifest.include);

                archive.pipe(res);
                archive.finalize();

                return await new Promise<void>((resolve) => {
                    archive.on('finish', () => {
                        res.end();
                        resolve();
                    });
                });
            } else if (serve === 'shell' && manifest.self_extraction) {
                const script = createShellScript(
                    new URL(
                        manifestFile.slice(src.length, -1 * '.json'.length),
                        publicUrl,
                    ),
                    manifest.self_extraction as SelfExtractionConfiguration,
                );

                // use correct header for encoding
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.write(script, 'utf8');
                res.end();

                return;
            }
        }

        next?.();
    };
}

/**
 * Finds the index of a middleware with any of the given names.
 *
 * @param middlewares the middleware stack to search
 * @param names the names to search for, the first match will abort the search
 * @returns the found index, or `-1` on failure
 */
function findMiddlewareIndex(
    middlewares: Connect.ServerStackItem[],
    ...names: string[]
) {
    for (const name of names) {
        const index = middlewares.findIndex(
            (middleware) =>
                typeof middleware.handle === 'function' &&
                middleware.handle.name === name,
        );

        // we've found the requested index
        if (index > 0) {
            return index;
        }
    }

    return -1;
}

/**
 * Creates the serve plugin.
 *
 * @param options the plugins options
 * @returns the plugin
 */
export function servePlugin(options: ZipPluginOptions): Plugin {
    const { src } = options;
    const manifestMap = new Map<string, ResolvedZipManifest>();

    let config: ResolvedConfig;
    let logger: Logger;

    /**
     * Updates the {@link manifestMap} with the most recent files from
     * disk.
     *
     * @param trigger the path that triggered the update
     */
    const updateMap = async (trigger?: string) => {
        if (trigger && !trigger.endsWith('.zip.json')) {
            return;
        }

        logger.success('Reloading manifests...');

        const files = await collectManifests(src);

        // clear the map at first (to populate it again)
        manifestMap.clear();

        for (const file of files) {
            manifestMap.set(file, await loadManifest(file));
        }
    };

    return {
        name: 'zip:serve',
        apply: 'serve',
        configResolved(resolvedConfig) {
            config = resolvedConfig;

            logger = getLogger('zip', config);
        },
        async buildStart() {
            await updateMap();
        },
        configureServer(devServer) {
            const { middlewares, watcher } = devServer;

            watcher.add(src);

            watcher.on('add', updateMap);
            watcher.on('change', updateMap);
            watcher.on('unlink', updateMap);

            return () => {
                middlewares.use(
                    createMiddleware(options, devServer, manifestMap),
                );

                // our middleware must run before the `viteServePublicMiddleware` (or `viteTransformMiddleware`), to intercept it's requests aswell
                const targetMiddlewareIndex = findMiddlewareIndex(
                    middlewares.stack,
                    'viteServePublicMiddleware',
                    'viteTransformMiddleware',
                );
                const viteZipMiddlewareIndex = findMiddlewareIndex(
                    middlewares.stack,
                    'viteZipMiddleware',
                );

                const [registeredMiddleware] = middlewares.stack.splice(
                    viteZipMiddlewareIndex,
                    1,
                );

                if (registeredMiddleware === undefined) {
                    throw new TypeError(
                        'Could not find our registered middleware.',
                    );
                }

                middlewares.stack.splice(
                    targetMiddlewareIndex,
                    0,
                    registeredMiddleware,
                );
            };
        },
    };
}
