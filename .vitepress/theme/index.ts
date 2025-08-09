import type { Theme } from 'vitepress';
import EncryptedSolution from '../../src/components/_deprecated/EncryptedSolution.vue';
import EncryptedSolutionGroup from '../../src/components/_deprecated/EncryptedSolutionGroup.vue';
import MaterialFAQ from '../../src/components/_deprecated/MaterialFAQ.vue';
import Layout from './Layout.vue';
import './style/style.scss';

export interface ThemeOptions {
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
        app.component('EncryptedSolution', EncryptedSolution);
        app.component('EncryptedSolutionGroup', EncryptedSolutionGroup);
        app.component('MaterialFAQ', MaterialFAQ);
    },
} satisfies Theme;
