import glob from 'fast-glob';
import * as path from 'node:path';

/**
 * Collects the **absolute paths** of all manifest files under the given `src`.
 *
 * @param src the source to search for manifests
 * @returns the absolute paths of all manifests
 */
export const collectManifests = (src: string) =>
    glob('**/*.zip.json', { cwd: src, absolute: true });

/**
 * Translates the given source filename to its output companion.
 *
 * @param baseSrc the base src where the files are searched
 * @param outputDir the output folder
 * @param manifestFile the manifest files path
 * @returns the path of the zip file in the output directory
 */
export function translateFileName(
    baseSrc: string,
    outputDir: string,
    manifestFile: string,
): string {
    const sourcePath = path.join(
        path.dirname(manifestFile),
        path.basename(manifestFile, '.json'),
    );

    return path.join(outputDir, sourcePath.substring(baseSrc.length));
}
