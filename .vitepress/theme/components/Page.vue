<template>
    <div :class="[$style.wrapper, 'markdown-body']">
        <h1 v-if="site.title && !frontmatter.home" class="no-print">
            <a href="/">{{ site.title }}</a>
        </h1>

        <AdventOfInfAd />

        <Content />

        <div
            v-if="theme.editLink"
            :class="[$style.wrapper__footer, 'no-print']"
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
import AdventOfInfAd from './banner/AdventOfInfAd.vue';

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

<style lang="scss" module>
$py: 16px;
$mx: 32px;

.wrapper {
    margin-top: $mx !important;

    margin-right: auto !important;
    margin-bottom: $mx !important;
    margin-left: auto !important;

    padding-right: $py;
    padding-left: $py;
    max-width: 1012px;
}

.wrapper__footer {
    margin-top: $mx;
    border-top: 1px var(--borderColor-neutral-muted) solid;

    padding-top: $py;
    color: var(--fgColor-muted);

    text-align: right;
}
</style>
