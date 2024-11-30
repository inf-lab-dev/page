<template>
    <h2 :class="$style.title">
        <span :class="$style['title__keyword--advent']">Advent</span>
        <span :class="$style['title__keyword']">&nbsp;of&nbsp;</span>
        <span :class="$style['title__keyword--inf']">InfLabs</span>
    </h2>

    <p :class="$style.title__subtitle">
        Löse jeden Adventssonntag eine kleine Aufgabe, um deine
        Programmierfähigkeiten zu verbessern!
    </p>
</template>

<style lang="scss" module>
.title {
    margin: 0 !important;
    margin-top: 1rem !important;
    border-bottom: none !important;
    font-weight: bold !important;
    font-size: 2rem !important;

    &__subtitle {
        margin: 0;
        font-weight: bold;
    }

    &__keyword {
        &--advent {
            background-image: linear-gradient(
                to right,
                rgb(22, 163, 74),
                rgb(239, 68, 68)
            );
            background-clip: text;
            color: #0000;
        }
        &--inf {
            background-image: linear-gradient(
                to right,
                rgb(234, 179, 8),
                rgb(249, 115, 22),
                rgb(185, 28, 28)
            );
            background-clip: text;
            color: #0000;
        }
    }
}
</style>
