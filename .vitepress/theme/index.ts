import type { DefaultTheme, Theme } from 'vitepress';
import EncryptedSolution from '../../src/components/_deprecated/EncryptedSolution.vue';
import EncryptedSolutionGroup from '../../src/components/_deprecated/EncryptedSolutionGroup.vue';
import MaterialFAQ from '../../src/components/_deprecated/MaterialFAQ.vue';
import RequirePrivateKey from '../../src/components/crypto/RequirePrivateKey.vue';
import Layout from './Layout.vue';
import './style/style.scss';

export interface ThemeOptions {
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
    enhanceApp({ app }) {
        // make the commonly used components available everywhere
        app.component('RequirePrivateKey', RequirePrivateKey);

        // DEPRECATED
        app.component('EncryptedSolution', EncryptedSolution);
        app.component('EncryptedSolutionGroup', EncryptedSolutionGroup);
        app.component('MaterialFAQ', MaterialFAQ);
    },
} satisfies Theme;
