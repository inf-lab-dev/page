/**
 * The path to the locally cloned solutions repository.
 */
export const SOLUTIONS_REPOSITORY_PATH =
    process.env.SOLUTIONS_REPOSITORY_PATH ?? '../solution';

/**
 * The path to the page's source folder, as configured in the VitePress
 * config file.
 */
// @ts-expect-error: Usage of undocumented api
export const PAGE_SOURCE_PATH = global.VITEPRESS_CONFIG.srcDir;
