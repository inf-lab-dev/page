<template>
    <button
        class="searchButton"
        @click="onOpenSearch"
        :aria-label="
            theme.search.options.translations?.button?.buttonAriaLabel ??
            'Open search modal'
        "
    >
        <span class="searchButton__icon vpi-search"></span>
        <span>{{
            theme.search.options.translations?.button?.buttonText ?? 'Search'
        }}</span>
    </button>

    <VPLocalSearchBox v-if="isOpen" @close="onCloseSearch" />
</template>

<script lang="ts" setup>
import { useData } from 'vitepress';
import VPLocalSearchBox from 'vitepress/dist/client/theme-default/components/VPLocalSearchBox.vue';
import { ref } from 'vue';
import type { ThemeOptions } from '../..';

const { theme } = useData<ThemeOptions>();

const isOpen = ref(false);

function onOpenSearch() {
    isOpen.value = true;
}

function onCloseSearch() {
    isOpen.value = false;
}
</script>

<style lang="scss" scoped>
.searchButton {
    all: unset;

    display: flex;
    align-items: center;
    gap: var(--base-size-4);
    cursor: pointer;

    &:hover,
    &:focus {
        color: var(--fgColor-accent);
    }

    .searchButton__icon {
        display: inline-block;
    }
}
</style>
