import { fileURLToPath } from 'url';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'inf-labs',
    description: 'Material für die Inf-Einf-Labs',
    lang: 'de-DE',
    srcDir: './content',
    cleanUrls: true,
    ignoreDeadLinks: true,
    appearance: false,
    vite: {
        ssr: {
            noExternal: ['monaco-editor'],
        },
        resolve: {
            alias: {
                '~': fileURLToPath(new URL('../node_modules', import.meta.url)),
            },
        },
    },
    themeConfig: {
        editLink: {
            pattern: 'https://github.com/inf-lab-dev/labs/blob/main/:path',
            text: 'Verbessere diese Seite',
        },
    },
});
