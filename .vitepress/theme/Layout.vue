<template>
    <NotFound v-if="page.isNotFound" />
    <Content v-else-if="frontmatter.layout === 'empty'" />
    <Page v-else />
</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import { onMounted, onUnmounted } from 'vue';
import NotFound from './components/NotFound.vue';
import Page from './components/Page.vue';

const { page, frontmatter } = useData();

/**
 * Function that runs before the page is printed. It currently does the following:
 *
 * - open all detail's elements and store their prior state
 */
function onBeforePrint() {
    const detailsElements = document.querySelectorAll('details');

    for (const details of detailsElements) {
        details.dataset.beforePrintOpen = `${details.open}`;

        details.open = true;
    }
}

/**
 * Function that runs after the page is printed (or the printing was cancelled).
 * It currently does the following:
 *
 * - revert all detail's elements to their stored prior state
 */
function onAfterPrint() {
    const detailsElements = document.querySelectorAll('details');

    for (const details of detailsElements) {
        details.open = details.dataset.beforePrintOpen === 'true';

        details.removeAttribute('data-before-print-open');
    }
}

onMounted(() => {
    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('afterprint', onAfterPrint);
});
onUnmounted(() => {
    window.removeEventListener('beforeprint', onBeforePrint);
    window.removeEventListener('afterprint', onAfterPrint);
});
</script>
