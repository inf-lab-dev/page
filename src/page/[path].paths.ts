/**
 * This dynamic route has a single purpose, creating dynamic routes throughout the ENTIRE site,
 * therefore it needs to be placed at the top, so it is able to capture ALL routes.
 *
 * Of course, we could also create seperate dynamic routes for all different types we need them for but,
 * this makes our URLs more pretty - and thats the most important part for SSG.
 * Also this allows us to use a sort-of centralized approach, which is always nice.
 */

import { DynamicPageSource } from '../lib/dynamic-page/source';
import solutionRepository from '../lib/dynamic-page/source/solution-repository';

const sources: DynamicPageSource[] = [solutionRepository];

export default {
    async paths() {
        return (
            await Promise.all(
                sources.map(async (source) => {
                    const pages = await source.load();

                    return pages.map((page) => ({
                        params: { ...page, type: source.type },
                    }));
                }),
            )
        ).flat();
    },
};
