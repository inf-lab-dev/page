import markdownItFootnote from 'markdown-it-footnote';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfigWithTheme } from 'vitepress';
import { zipPlugin } from './plugin/zip';
import { ThemeOptions } from './theme';

const STATIC_FILE_EXTENSIONS = ['sh', 'zip', 'py', 'hosted.js'];

export default defineConfigWithTheme<ThemeOptions>({
    title: 'inf-labs',
    description: 'Material für die Inf-Einf-Labs',
    lang: 'de-DE',
    srcDir: './content',
    cleanUrls: true,
    ignoreDeadLinks: true,
    appearance: 'force-auto',
    vite: {
        plugins: [
            zipPlugin({
                src: './content',
                publicUrl: 'https://inf-lab.dev',
            }),
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
            advent: false,
        },
    },
    markdown: {
        config: (md) => md.use(markdownItFootnote),
        math: true,

        codeCopyButtonTitle: 'Code kopieren',

        container: {
            tipLabel: 'Tipp',
            warningLabel: 'Warnung',
            dangerLabel: 'Achtung',
            infoLabel: 'Information',
            noteLabel: 'Information',
            importantLabel: 'Wichtig',
            cautionLabel: 'Vorsicht',
        },
    },
});
