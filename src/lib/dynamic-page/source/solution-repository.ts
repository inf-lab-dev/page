import { readdir } from 'fs/promises';
import { defineDynamicPageSource } from '.';
import { SOLUTIONS_REPOSITORY_PATH } from '../../../env';

export default defineDynamicPageSource({
    type: 'solution-repository',
    async load() {
        const entries = await readdir(SOLUTIONS_REPOSITORY_PATH, {
            recursive: true,
            encoding: null,
        });

        return entries
            .filter(
                // Only select markdown (Non-README) files
                (path) => path.endsWith('.md') && !path.endsWith('README.md'),
            )
            .map((path) => ({
                path: path.replace(/\.md$/, ''),
                frontmatter: {
                    search: false,
                    editLink: {
                        pattern:
                            'https://github.com/inf-lab-dev/solution/edit/main/:path',
                        stripPathPrefix: '/solution',
                    },
                },
            }));
    },
});
