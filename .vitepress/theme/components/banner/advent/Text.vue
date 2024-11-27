<template>
    <p :class="$style.text">
        Du möchtest dich zusätzlich zum Übungsmaterial auf
        <em>inf.zone</em> mit dem Programmieren und algorithmischen Denken
        beschäftigen?

        <a
            :class="$style.text__join"
            href="https://advent.inf-lab.dev"
            target="_blank"
            rel="noreferer noopener"
            >Dann mach gerne mit!</a
        >
    </p>
</template>

<style lang="scss" module>
.text {
    margin-top: 1rem;

    &__join {
        display: block;

        transition:
            transform 0.2s,
            box-shadow 0.2s;

        cursor: pointer;

        margin-top: 1rem;

        border-radius: 0.25rem;

        background: linear-gradient(
            to right,
            rgb(22, 163, 74),
            rgb(239, 68, 68)
        );
        padding: 0.4em 0.9em;

        max-width: fit-content;

        color: #ffffff !important;
        font-weight: bold;

        font-size: 1rem;
        text-decoration: none !important;

        &:hover,
        &:focus {
            transform: translateY(-2px);
            box-shadow: 0 6px 10px var(--shadow);
            text-decoration: none;
        }
    }
}
</style>
