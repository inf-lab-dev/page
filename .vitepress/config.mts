import markdownItFootnote from 'markdown-it-footnote';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitepress';
import { zipPlugin } from './plugin/zip';
import { ThemeOptions } from './theme';

const PUBLIC_URL = 'https://inf-lab.dev';

export default defineConfig<ThemeOptions>({
    title: 'inf-labs',
    description: 'Material für die Inf-Einf-Labs',
    lang: 'de-DE',
    srcDir: './src/page',
    cleanUrls: true,
    ignoreDeadLinks: true,
    appearance: 'force-auto',

    // Ignore all READMEs, as otherwise the VitePress engine
    // will fail with an error like "Cannot read properties of undefined (reading 'imports')"
    // as the modules are duplicated (i.e. we have 2 readmes, one from solution, one from labs).
    srcExclude: ['**/README.md'],

    rewrites: {
        'content/:path*': ':path*',
    },
    vite: {
        plugins: [
            zipPlugin({
                src: './src/page/content',
                publicUrl: PUBLIC_URL,
            }),
        ],
        ssr: {
            noExternal: ['monaco-editor', 'mark.js'],
        },
        resolve: {
            alias: {
                '~': fileURLToPath(new URL('../node_modules', import.meta.url)),
                '@': fileURLToPath(new URL('../src', import.meta.url)),
            },
        },
    },
    themeConfig: {
        publicUrl: PUBLIC_URL,
        editLink: {
            pattern: 'https://github.com/inf-lab-dev/labs/edit/main/:path',
            text: 'Verbessere diese Seite',
        },
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: 'Suchen',
                        buttonAriaLabel: 'Suche öffnen',
                    },
                    modal: {
                        displayDetails: 'Inhalt der Suchergebnisse anzeigen',
                        resetButtonTitle: 'Suche leeren',
                        backButtonTitle: 'Suche schließen',
                        noResultsText: 'Keine Ergebnisse für',
                        footer: {
                            selectText: 'zum auszuwählen',
                            selectKeyAriaLabel: 'Enter',
                            navigateText: 'zum navigieren',
                            navigateUpKeyAriaLabel: 'Pfeiltaste nach oben',
                            navigateDownKeyAriaLabel: 'Pfeiltaste nach unten',
                            closeText: 'zum schließen',
                            closeKeyAriaLabel: 'Escape',
                        },
                    },
                },
            },
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
