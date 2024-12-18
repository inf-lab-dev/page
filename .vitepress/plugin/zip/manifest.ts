import glob from 'fast-glob';
import { readFile } from 'node:fs/promises';
import * as path from 'node:path';

/**
 * The configuration for the self-extraction shell scripts.
 */
export interface SelfExtractionConfiguration {
    /**
     * Commands the user should be suggested to run after the archive has been extracted.
     */
    post_user_commands: string[];
}

/**
 * An entry that can be included.
 */
export type IncludeEntry =
    | string
    | {
          /**
           * The source file name or a glob pattern.
           */
          src: string;

          /**
           * The destination of the file(s) inside the zip archive.
           * If `src` is a glob, this will be treated as a folder rather than a file name.
           */
          dest?: string;
      };

/**
 * A user-supplied manifest.
 */
export interface ZipManifest {
    /**
     * The includes.
     */
    include: IncludeEntry[];

    /**
     * The configuration for the self-extracting shell script.
     */
    self_extraction?: boolean | Partial<SelfExtractionConfiguration>;
}

/**
 * A resolved include entry.
 */
export interface ResolvedIncludeEntry {
    /**
     * The source file name.
     */
    src: string;
    /**
     * The destination of the file inside the zip archive.
     */
    dest: string;
}

/**
 * A {@link ZipManifest} that has been resolved.
 */
export interface ResolvedZipManifest {
    /**
     * The resolved includes.
     */
    include: ResolvedIncludeEntry[];

    /**
     * The self-extraction configuration.
     */
    self_extraction: false | SelfExtractionConfiguration;
}

/**
 * Loads the manifest from a given file and resolves it.
 *
 * @param filePath the file to load the manifest from
 * @returns the resolved manifest
 */
export async function loadManifest(
    filePath: string,
): Promise<ResolvedZipManifest> {
    const content = await readFile(filePath, 'utf-8');
    const manifest: ZipManifest = JSON.parse(content);

    manifest.include = await resolveIncludes(
        path.dirname(filePath),
        manifest.include,
    );

    if (manifest.self_extraction) {
        const selfExtraction =
            manifest.self_extraction === true ? {} : manifest.self_extraction;

        manifest.self_extraction = {
            post_user_commands: selfExtraction.post_user_commands || [],
        };
    } else {
        manifest.self_extraction = false;
    }

    return manifest as ResolvedZipManifest;
}

/**
 * Resolves the includes in the given baseDir.
 *
 * @param baseDir the base directory of the manifest
 * @param includes the includes of the manifest
 * @returns the resolved includes
 */
async function resolveIncludes(
    baseDir: string,
    includes: IncludeEntry[],
): Promise<ResolvedIncludeEntry[]> {
    const resolved: ResolvedIncludeEntry[] = [];

    for (let include of includes) {
        if (typeof include === 'string') {
            include = { src: include };
        }

        const files = await glob(include.src, {
            cwd: baseDir,
            absolute: true,
        });

        for (const file of files) {
            const directoryDestination =
                include.dest?.replace(/\/$/, '') ?? path.basename(file);

            const destination = directoryDestination.endsWith('/')
                ? path.join(directoryDestination, path.basename(file))
                : directoryDestination;

            resolved.push({ src: file, dest: destination });
        }
    }

    return resolved;
}
