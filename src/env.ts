import path from 'path';
import { fileURLToPath } from 'url';

/**
 * The path to the solutions repository.
 */
export const SOLUTIONS_REPOSITORY_PATH = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    './page/solution',
);

/**
 * The path to the page's source folder, as configured in the VitePress
 * config file.
 */
// @ts-expect-error: Usage of undocumented api
export const PAGE_SOURCE_PATH = global.VITEPRESS_CONFIG.srcDir;

/**
 * The path to the Crypto engine's public key.
 *
 * This is used to encrypt various values.
 */
export const PUBLIC_KEY_PATH = `${PAGE_SOURCE_PATH}/../assets/crypto/public.pem`;
