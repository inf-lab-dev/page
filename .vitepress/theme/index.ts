import type { Theme } from 'vitepress';
import MaterialFAQ from '../../src/components/MaterialFAQ.vue';
import EncryptedSolution from '../../src/components/solution/publish/EncryptedSolution.vue';
import EncryptedSolutionGroup from '../../src/components/solution/publish/EncryptedSolutionGroup.vue';
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
