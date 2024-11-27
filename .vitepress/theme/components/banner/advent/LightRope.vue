<template>
    <ul :class="$style.lightrope">
        <li v-for="_ in 42" :class="$style.lightrope__light"></li>
    </ul>
</template>

<style lang="scss" module>
// Adapted from https://codepen.io/tobyj/pen/QjvEex

$globe-width: 12px;
$globe-height: 28px;
$globe-spacing: 40px;
$globe-spread: 3px;
$light-off-opacity: 0.4;
$rope-color: #222;

@mixin glow($background-opacity, $shadow-opacity) {
    box-shadow: 0px calc($globe-height / 6) calc($globe-width * 2) $globe-spread
        rgba(var(--color), $shadow-opacity);
    background: rgba(var(--color), $background-opacity);
}

.lightrope {
    position: absolute;
    z-index: 1;
    margin-top: -18px !important;
    margin-bottom: 0 !important;
    padding: 0 !important;
    width: 100%;
    overflow: hidden;
    pointer-events: none;
    text-align: center;
    white-space: nowrap;

    &__light {
        --color: 22, 163, 74;

        @include glow(1, 1);
        display: inline-block;

        position: relative;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;

        animation-name: flash;
        margin: calc($globe-spacing / 2);
        border-radius: 50%;

        padding: 0;

        width: $globe-width;
        height: $globe-height;
        list-style: none;

        @media (prefers-reduced-motion) {
            animation-name: none;
        }

        &:last-child::after {
            content: none;
        }

        &:first-child {
            margin-left: -$globe-spacing;
        }

        &:nth-child(2n + 1) {
            --color: 239, 68, 68;

            animation-duration: 0.4s;
        }

        &:nth-child(4n + 2) {
            --color: 234, 179, 8;

            animation-duration: 1.1s;
        }

        &:nth-child(odd) {
            animation-duration: 1.8s;
        }

        &:nth-child(3n + 1) {
            animation-duration: 1.4s;
        }

        &::before {
            position: absolute;

            top: calc(0px - ($globe-height / 6));
            left: 1px;

            border-radius: 3px;
            background-color: $rope-color;

            width: ($globe-width - 2);
            height: calc($globe-height / 3);
            content: '';
        }

        &::after {
            position: absolute;

            top: calc(0px - $globe-height / 2);
            left: $globe-width - 3;
            border-bottom: solid $rope-color 2px;

            border-radius: 50%;

            width: $globe-spacing + 12;
            height: calc($globe-height / 3 * 2);
            content: '';
        }
    }
}

@keyframes flash {
    0%,
    100% {
        @include glow(1, 1);
    }
    50% {
        @include glow($light-off-opacity, 0.2);
    }
}
</style>
