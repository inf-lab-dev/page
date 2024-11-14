<template>
    <NotFound v-if="page.isNotFound" />
    <Content v-else-if="frontmatter.layout === 'empty'" />
    <Page v-else />
</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import NotFound from './components/NotFound.vue';
import Page from './components/Page.vue';

const { page, frontmatter } = useData();
</script>
