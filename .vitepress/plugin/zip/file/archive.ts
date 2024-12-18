import archiver, { Archiver } from 'archiver';
import { ResolvedIncludeEntry } from '../manifest';

/**
 * Creates the archive for the given includes.
 *
 * @param includes the includes for the archive
 * @returns the created archiver instance
 */
export function createArchive(includes: ResolvedIncludeEntry[]): Archiver {
    const archive = archiver('zip', {
        zlib: { level: 9 },
    });

    for (const { src, dest } of includes) {
        archive.file(src, { name: dest });
    }

    return archive;
}
