<template>
    <div :class="$style.notice">
        <div :class="$style.notice__icon">🤔</div>
        <h1 :class="$style.notice__content">Nicht gefunden</h1>
        <p :class="$style.notice__content">
            Die angeforderte Seite konnte nicht gefunden werden.
        </p>
    </div>
</template>

<style lang="scss" module>
.notice {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;

    color: var(--fgColor-default);
    text-align: center;

    &__icon {
        font-size: 400%;
    }

    &__content {
        padding-right: 1rem;
        padding-left: 1rem;
    }
}
</style>
