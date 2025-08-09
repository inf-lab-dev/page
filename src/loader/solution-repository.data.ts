import path from 'path';
import { createContentLoader } from 'vitepress';
import { PAGE_SOURCE_PATH, SOLUTIONS_REPOSITORY_PATH } from '../env';

type Data = Record<string, string>;

export declare const data: Data;

export default createContentLoader(
    // We need to build the path relative to the source directory, as vitepress will
    // interpret all paths relative to it, so we need to escape this boxing.
    `${path.relative(PAGE_SOURCE_PATH, SOLUTIONS_REPOSITORY_PATH)}/**/*.md`,
    {
        globOptions: {
            debug: true,
        },
        render: true,
        transform(contentData) {
            const pathPrefix = path.relative(
                PAGE_SOURCE_PATH,
                SOLUTIONS_REPOSITORY_PATH,
            );

            // TODO: Encryption
            return Object.fromEntries(
                contentData.map((page) => [
                    // Normalize the path as it would appear on the page
                    // this means we need to strip the prefix +2, to ensure the last "." and "/"
                    // is also correctly removed.
                    page.url.slice(pathPrefix.length + 2),

                    page.html,
                ]),
            );
        },
    },
);
