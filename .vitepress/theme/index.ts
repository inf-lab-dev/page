import type { Theme } from 'vitepress';
import EncryptedSolution from '../../src/components/EncryptedSolution.vue';
import Layout from './Layout.vue';
import './style/style.scss';

export default {
    Layout,
    enhanceApp({ app }) {
        // make the commonly used components available everywhere
        app.component('EncryptedSolution', EncryptedSolution);
    },
} satisfies Theme;
