import glob from 'fast-glob';
import { readFile } from 'node:fs/promises';
import { EncryptedSolution } from 'solution-zone';
import { defineDynamicPageSource } from '.';
import { PAGE_SOURCE_PATH } from '../../../env';

export default defineDynamicPageSource({
    type: 'solution-json',
    async load() {
        const entries = await glob('**/*.solution.json', {
            cwd: `${PAGE_SOURCE_PATH}/content`,
        });

        return await Promise.all(
            entries.map(async (path) => {
                const content = JSON.parse(
                    (
                        await readFile(`${PAGE_SOURCE_PATH}/content/${path}`)
                    ).toString('utf-8'),
                ) as EncryptedSolution;

                return {
                    path: path.replace(/\.solution\.json$/, ''),
                    title: content.title,
                    frontmatter: {
                        search: false,
                    },
                };
            }),
        );
    },
});
