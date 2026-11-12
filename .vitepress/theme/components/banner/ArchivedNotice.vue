<template>
    <aside
        v-if="theme.banner.archived"
        :class="[$style.banner, 'no-print']"
        role="note"
    >
        <p :class="$style.banner__text">
            Die Inf-Labs sind archiviert und werden nicht mehr aktiv
            weiterbetrieben.
        </p>
        <p :class="$style.banner__text">
            Aktuelle Aufgaben findest du auf
            <a :class="$style.banner__link" href="https://inf.zone">inf.zone</a>
            und in den Tutorien.
        </p>
    </aside>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import { ThemeOptions } from '../..';

const { theme } = useData<ThemeOptions>();
</script>

<style lang="scss" module>
.banner {
    border-top: 1px solid var(--borderColor-attention);
    border-bottom: 1px solid var(--borderColor-attention);

    background-color: var(--bgColor-attention-muted);
    padding: 20px 16px;

    color: var(--fgColor-attention);
    font-size: 1.125rem;
    line-height: 1.5;
    text-align: center;

    &__text {
        margin: 0;
    }

    &__link {
        color: inherit;
        font-weight: var(--base-text-weight-semibold);
        text-decoration: underline;
        text-underline-offset: 2px;

        &:hover {
            text-decoration-thickness: 2px;
        }
    }
}
</style>
