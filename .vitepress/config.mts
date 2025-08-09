import markdownItFootnote from 'markdown-it-footnote';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vitepress';
import { zipPlugin } from './plugin/zip';
import { ThemeOptions } from './theme';

const STATIC_FILE_EXTENSIONS = ['sh', 'zip', 'py', 'hosted.js'];

export default defineConfig<ThemeOptions>({
    title: 'inf-labs',
    description: 'Material für die Inf-Einf-Labs',
    lang: 'de-DE',
    srcDir: './src/page',
    cleanUrls: true,
    ignoreDeadLinks: true,
    appearance: 'force-auto',

    // Ignore the "contents" readme, as otherwise the VitePress engine
    // will fail with an error like "Cannot read properties of undefined (reading 'imports')"
    // as the modules are duplicated (i.e. we have 2 readmes, one from solution, one from labs).
    srcExclude: ['content/README.md'],

    rewrites: {
        'content/:path*': ':path*',
    },
    vite: {
        plugins: [
            zipPlugin({
                src: './src/page/content',
                publicUrl: 'https://inf-lab.dev',
            }),
            viteStaticCopy({
                silent: true,
                targets: [
                    {
                        src: `../src/page/content/**/*.{${STATIC_FILE_EXTENSIONS.join(',')}}`,
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
                '@': fileURLToPath(new URL('../src', import.meta.url)),
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
        config: (md) => void md.use(markdownItFootnote),
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
    transformPageData(pageData) {
        // Allow to set some page properties for dynamic routes
        if (pageData.params?.title) {
            pageData.title = pageData.params.title;
        }

        if (pageData.params?.frontmatter) {
            pageData.frontmatter = {
                ...pageData.frontmatter,
                ...pageData.params.frontmatter,
            };
        }
    },
});
