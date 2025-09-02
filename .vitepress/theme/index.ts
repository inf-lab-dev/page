import type { DefaultTheme, Theme } from 'vitepress';
import EncryptedSolution from '../../src/components/_deprecated/EncryptedSolution.vue';
import EncryptedSolutionGroup from '../../src/components/_deprecated/EncryptedSolutionGroup.vue';
import MaterialFAQ from '../../src/components/_deprecated/MaterialFAQ.vue';
import RequirePrivateKey from '../../src/components/crypto/RequirePrivateKey.vue';
import Layout from './Layout.vue';
import './style/style.scss';

export interface ThemeOptions {
    publicUrl: string;

    search: {
        provider: 'local';
        options: Omit<DefaultTheme.LocalSearchOptions, 'locales'>;
    };
    editLink: {
        pattern: string;
        text: string;
    };
    banner: {
        advent: boolean;
    };
}

export default {
    Layout,
    enhanceApp({ app, router, siteData }) {
        // make the commonly used components available everywhere
        app.component('RequirePrivateKey', RequirePrivateKey);

        // Helper to create absolute URLs inside markdown
        app.config.globalProperties.$url = (relativePath: string) => {
            const base = siteData.value?.base || '/';
            const currentPath = router.route.path;

            const routePath = currentPath.replace(/^\/|\/$/g, '');

            return new URL(
                relativePath,
                `${siteData.value.themeConfig.publicUrl}${base}${routePath}`,
            );
        };

        // DEPRECATED
        app.component('EncryptedSolution', EncryptedSolution);
        app.component('EncryptedSolutionGroup', EncryptedSolutionGroup);
        app.component('MaterialFAQ', MaterialFAQ);
    },
} satisfies Theme;
