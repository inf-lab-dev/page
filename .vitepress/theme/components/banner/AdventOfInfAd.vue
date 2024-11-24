<template>
    <article v-if="theme.banner.advent" class="advertisement">
        <LightRope />
        <section class="advertisement__content">
            <div class="advertisement__segemnts">
                <Title />
                <Text />
            </div>

            <Wreath class="advertisement__wreath" />
        </section>
    </article>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import { ThemeOptions } from '../..';
import LightRope from './advent/LightRope.vue';
import Text from './advent/Text.vue';
import Title from './advent/Title.vue';
import Wreath from './advent/Wreath.vue';

const { theme } = useData<ThemeOptions>();
</script>

<style lang="scss" scoped>
.advertisement {
    overflow: hidden;
    position: relative;

    border: 2px solid #b1b3b4;
    border-radius: 0.25rem;

    @media print {
        display: none;
    }

    @media (prefers-color-scheme: dark) {
        background-color: #000000;
        color: #e2e2e2;
        border-color: #e2e2e2;
    }

    &__content {
        display: flex;
        gap: 0.5rem;

        padding: 1.7rem 1rem;
        padding-bottom: 0;
        z-index: 99;
    }

    &__segments {
        flex-grow: 1;
    }

    &__wreath {
        width: 20%;

        @media only screen and (max-width: 1026px) {
            display: none;
        }
    }
}
</style>
