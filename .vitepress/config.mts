import path from 'node:path';
import { fileURLToPath } from 'url';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfigWithTheme } from 'vitepress';
import { ThemeOptions } from './theme';

const STATIC_FILE_EXTENSIONS = ['sh', 'zip', 'py'];

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeOptions>({
    title: 'inf-labs',
    description: 'Material für die Inf-Einf-Labs',
    lang: 'de-DE',
    srcDir: './local-content',
    cleanUrls: true,
    ignoreDeadLinks: true,
    appearance: false,
    vite: {
        plugins: [
            viteStaticCopy({
                targets: [
                    {
                        src: `../content/**/*.{${STATIC_FILE_EXTENSIONS.join(',')}}`,
                        dest: '',
                        rename: (_file, _extension, absolutePath) => {
                            const contentPath = path.resolve('./content');
                            const resolvedName = absolutePath.substring(
                                contentPath.length + 1,
                            );

                            return resolvedName;
                        },
                    },
                ],
            }),
        ],
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
            pattern: 'https://github.com/inf-lab-dev/labs/edit/main/:path',
            text: 'Verbessere diese Seite',
        },
        banner: {
            advent: true,
        },
    },
    markdown: {
        math: true,
        container: {
            tipLabel: 'Tipp',
            warningLabel: 'Warnung',
            dangerLabel: 'Achtung',
            infoLabel: 'Information',
            detailsLabel: 'Details',
        },
    },
});
