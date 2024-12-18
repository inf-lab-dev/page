import * as path from 'node:path';
import type { Plugin } from 'vite';
import { buildPlugin } from './environment/build';
import { servePlugin } from './environment/serve';

/**
 * The options for the zip plugin.
 */
export interface ZipPluginOptions {
    /**
     * The URL at which the page will be accessible in production.
     * This will be interpolated into the self-extracting archives.
     *
     * In serve, this will automatically be set to the local url.
     */
    publicUrl: string;

    /**
     * The source folder, where to look for those manifests, this will be interpreted
     * relative to the project root.
     */
    src: string;
}

/**
 * Creates a new zip plugin that can convert zip manifests
 *
 * @param options the plugins options
 * @returns the plugins that need to be applied
 */
export function zipPlugin(options: ZipPluginOptions): Plugin[] {
    const resolvedOptions = {
        ...options,
        src: path.resolve(options.src),
    };

    return [buildPlugin(resolvedOptions), servePlugin(resolvedOptions)];
}
