import glob from 'fast-glob';
import { defineDynamicPageSource } from '.';
import { PAGE_SOURCE_PATH } from '../../../env';

export default defineDynamicPageSource({
    type: 'solution-json',
    async load() {
        const entries = await glob('**/*.solution.json', {
            cwd: `${PAGE_SOURCE_PATH}/content`,
        });
        console.log(entries);
        return entries.map((path) => ({
            path: path.replace(/\.json$/, ''),
            title: path,
        }));
    },
});
