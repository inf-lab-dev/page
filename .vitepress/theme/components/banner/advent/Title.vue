<template>
    <h2 class="title">
        <span class="title__keyword--advent">Advent</span>
        <span class="title__keyword">&nbsp;of&nbsp;</span>
        <span class="title__keyword--inf">InfLabs</span>
    </h2>

    <p class="title__subtitle">
        Löse jeden Adventssonntag eine kleine Aufgabe, um deine
        Programmierfähigkeiten zu verbessern!
    </p>
</template>

<style lang="scss" scoped>
.title {
    font-size: 2rem !important;
    margin: 0 !important;
    margin-top: 1rem !important;
    font-weight: bold !important;
    border-bottom: none !important;

    &__subtitle {
        margin: 0;
        font-weight: bold;
    }

    &__keyword {
        &--advent {
            color: #0000;
            background-clip: text;
            background-image: linear-gradient(
                to right,
                rgb(22, 163, 74),
                rgb(239, 68, 68)
            );
        }
        &--inf {
            color: #0000;
            background-clip: text;
            background-image: linear-gradient(
                to right,
                rgb(234, 179, 8),
                rgb(249, 115, 22),
                rgb(185, 28, 28)
            );
        }
    }
}
</style>
