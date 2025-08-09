import { ContentData, PageData } from 'vitepress';
import { SiteData } from 'vitepress/dist/node/index.js';

/**
 * This function creates a page's title.
 *
 * **Note:** This function has been copied from VitePress directly, as it does not allow us to
 * access this function in any way.
 */
function createTitle(siteData: SiteData, pageData: PageData) {
    const title = pageData.title || siteData.title;
    const template = pageData.titleTemplate ?? siteData.titleTemplate;

    if (typeof template === 'string' && template.includes(':title')) {
        return template.replace(/:title/g, title);
    }

    const templateString = createTitleTemplate(siteData.title, template);

    if (title === templateString.slice(3)) {
        return title;
    }

    return `${title}${templateString}`;
}

/**
 * This function formats the title according to the configured
 * title template.
 *
 * **Note:** This function has been copied from VitePress directly, as it does not allow us to
 * access this function in any way.
 */
function createTitleTemplate(
    siteTitle: string,
    template: string | boolean | undefined,
) {
    if (template === false) {
        return '';
    }

    if (template === true || template === void 0) {
        return ` | ${siteTitle}`;
    }

    if (siteTitle === template) {
        return '';
    }

    return ` | ${template}`;
}

export function getPageTitle(page: ContentData) {
    let title = page.frontmatter.title;

    if (!title && page.html) {
        const match = page.html.match(/<h1[^>]*>(.*?)<a[^>]*>/i);

        if (match) {
            title = match[1].trim();
        }
    }

    // @ts-expect-error: Usage of undocumented api
    return createTitle(global.VITEPRESS_CONFIG.site, {
        ...page.frontmatter,
        title,
    });
}
