export interface DynamicPage {
    path: string;
    title?: string;
    frontmatter?: Record<string, unknown>;
}

export interface DynamicPageSource {
    type: string;

    load: () => Promise<DynamicPage[]>;
}

/**
 * Creates a new dynamic page source.
 * This function only exists for a nice type inference.
 *
 * @param source The source you create.
 * @returns Your source.
 */
export function defineDynamicPageSource(
    source: DynamicPageSource,
): DynamicPageSource {
    return source;
}
