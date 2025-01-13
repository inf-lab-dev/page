import { createWriteStream } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';
import { ZipPluginOptions } from '..';
import { collectManifests, translateFileName } from '../file';
import { createArchive } from '../file/archive';
import { createShellScript } from '../file/shell';
import {
    loadManifest,
    ResolvedIncludeEntry,
    SelfExtractionConfiguration,
} from '../manifest';

/**
 * Saves the zip created by the given includes at the given path.
 *
 * @param includes the includes for the zip
 * @param to the destination of the zip
 */
async function saveZip(includes: ResolvedIncludeEntry[], to: string) {
    await mkdir(dirname(to), { recursive: true });

    const archive = createArchive(includes);
    const stream = createWriteStream(to, { encoding: 'utf8' });

    return await new Promise((resolve) => {
        stream.on('finish', resolve);

        archive.pipe(stream);
        archive.finalize();
    });
}

/**
 * Saves the shell script created by the given config (and zipUrl) at the given path.
 *
 * @param zipUrl the url of the zip archive
 * @param config the config of the shell script
 * @param to the destination of the script
 */
async function saveShellScript(
    zipUrl: URL,
    config: SelfExtractionConfiguration,
    to: string,
) {
    await mkdir(dirname(to), { recursive: true });

    const script = createShellScript(zipUrl, config);

    await writeFile(to, script, { encoding: 'utf8' });
}

/**
 * Creates the build plugin.
 *
 * @param options the plugins options
 * @returns the plugin
 */
export function buildPlugin({ src, publicUrl }: ZipPluginOptions): Plugin {
    let config: ResolvedConfig;

    return {
        name: 'zip:build',
        apply: 'build',
        async configResolved(resolvedConfig) {
            config = resolvedConfig;
        },
        async closeBundle() {
            const files = await collectManifests(src);

            for (const file of files) {
                const manifest = await loadManifest(file);
                const zipFileName = translateFileName(
                    src,
                    config.build.outDir,
                    file,
                );

                const ziupUrl = new URL(
                    zipFileName.substring(config.build.outDir.length),
                    publicUrl,
                );

                await saveZip(manifest.include, zipFileName);

                if (manifest.self_extraction) {
                    await saveShellScript(
                        ziupUrl,
                        manifest.self_extraction,
                        `${zipFileName}.sh`,
                    );
                }
            }
        },
    };
}
