<template>
    <p class="text">
        Du möchtest dich zusätzlich zum Übungsmaterial auf
        <em>inf.zone</em> mit dem Programmieren und algorithmischen Denken
        beschäftigen?

        <a
            class="text__join"
            href="https://advent.inf-lab.dev"
            target="_blank"
            rel="noreferer noopener"
            >Dann mach gerne mit!</a
        >
    </p>
</template>

<style lang="scss" scoped>
.text {
    margin-left: 1rem;

    &__join {
        display: block;

        max-width: fit-content;

        margin-top: 0.5rem;
        padding: 0.4em 0.9em;

        font-size: 1rem;
        font-weight: bold;

        color: #ffffff;
        background: linear-gradient(
            to right,
            rgb(22, 163, 74),
            rgb(239, 68, 68)
        );

        border-radius: 0.25rem;

        transition:
            transform 0.2s,
            box-shadow 0.2s;

        cursor: pointer;

        &:hover,
        &:focus {
            text-decoration: none;
            transform: translateY(-2px);
            box-shadow: 0 6px 10px var(--shadow);
        }
    }
}
</style>
