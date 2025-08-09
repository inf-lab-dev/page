import { readFile } from 'fs/promises';
import path from 'path';
import { createContentLoader } from 'vitepress';
import {
    PAGE_SOURCE_PATH,
    PUBLIC_KEY_PATH,
    SOLUTIONS_REPOSITORY_PATH,
} from '../env';
import { encryptString } from '../lib/crypto';
import { getPageTitle } from '../lib/dynamic-page/utils';

type Data = Record<string, { title?: string; content: string }>;

export declare const data: Data;

export default createContentLoader(
    // We need to build the path relative to the source directory, as vitepress will
    // interpret all paths relative to it, so we need to escape this boxing.
    `${path.relative(PAGE_SOURCE_PATH, SOLUTIONS_REPOSITORY_PATH)}/**/*.md`,
    {
        render: true,
        async transform(contentData) {
            const pathPrefix = path.relative(
                PAGE_SOURCE_PATH,
                SOLUTIONS_REPOSITORY_PATH,
            );

            const publicKeyPem = (await readFile(PUBLIC_KEY_PATH)).toString(
                'utf-8',
            );

            return Object.fromEntries(
                await Promise.all(
                    contentData.map(async (page) => [
                        // Normalize the path as it would appear on the page
                        // this means we need to strip the prefix +2, to ensure the last "." and "/"
                        // is also correctly removed.
                        page.url.slice(pathPrefix.length + 2),

                        {
                            title: getPageTitle(page),

                            content: await encryptString(
                                publicKeyPem,
                                page.html!,
                            ),
                        },
                    ]),
                ),
            );
        },
    },
);
