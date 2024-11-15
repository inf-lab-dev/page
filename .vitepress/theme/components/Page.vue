<template>
    <div class="container-lg px-3 my-5 markdown-body">
        <h1 v-if="site.title && !frontmatter.home" class="no-print">
            <a href="/">{{ site.title }}</a>
        </h1>

        <Content />

        <div
            v-if="theme.editLink"
            class="no-print footer border-top border-gray-light mt-5 pt-3 text-right text-gray"
        >
            Diese Seite ist Open Source.
            <a :href="editUrl">{{ theme.editLink.text }}</a
            >.
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useData } from 'vitepress';
import { computed } from 'vue';

const { site, page, theme, frontmatter } = useData();

const editUrl = computed(() => {
    if (theme.value.editLink) {
        return theme.value.editLink.pattern.replace(
            ':path',
            page.value.relativePath,
        );
    }

    return '';
});
</script>
