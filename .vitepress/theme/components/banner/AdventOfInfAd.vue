<template>
    <article
        v-if="theme.banner.advent"
        :class="[
            $style.advertisement,
            'no-print',
            {
                [$style['advertisement--dark']]: isDark,
            },
        ]"
    >
        <LightRope />
        <section :class="$style.advertisement__content">
            <div :class="$style.advertisement__segemnts">
                <Title />
                <Text />
            </div>

            <Wreath :class="$style.advertisement__wreath" />
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

const { theme, isDark } = useData<ThemeOptions>();
</script>

<style lang="scss" module>
.advertisement {
    position: relative;

    border: 2px solid var(--borderColor-default);
    border-radius: 0.5rem;
    overflow: hidden;

    &--dark {
        background-color: #000000;
    }

    &__content {
        display: flex;
        gap: 0.5rem;
        z-index: 99;

        padding: 1.7rem 1rem;
        padding-bottom: 0;
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
