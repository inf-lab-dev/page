<template>
    <div :class="[$style.wrapper, 'markdown-body']">
        <h1 v-if="site.title && !frontmatter.home" class="no-print">
            <a href="/">{{ site.title }}</a>
        </h1>

        <AdventOfInfAd />

        <Content />

        <div :class="[$style.wrapper__footer, 'no-print']">
            <SearchButton />

            <div :class="$style.wrapper__footerEditLink" v-if="theme.editLink">
                Diese Seite ist Open Source.
                <a :href="editUrl">{{ theme.editLink.text }}</a
                >.
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useData } from 'vitepress';
import { computed } from 'vue';
import AdventOfInfAd from './banner/AdventOfInfAd.vue';
import SearchButton from './widget/SearchButton.vue';

const { site, page, theme, frontmatter } = useData();

const editUrl = computed(() => {
    const editLinkPattern =
        frontmatter.value?.editLink?.pattern ?? theme.value.editLink?.pattern;
    const editLinkStripPathPrefix =
        frontmatter.value.editLink?.stripPathPrefix ?? '';

    if (editLinkPattern) {
        return editLinkPattern.replace(
            ':path',
            page.value.relativePath.substring(editLinkStripPathPrefix.length),
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
    display: flex;
    margin-top: $mx;
    border-top: 1px var(--borderColor-neutral-muted) solid;

    padding-top: $py;
    color: var(--fgColor-muted);

    text-align: right;
}

.wrapper__footerEditLink {
    flex-grow: 1;
}
</style>
