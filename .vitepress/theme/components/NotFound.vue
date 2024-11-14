<template>
    <div class="notice">
        <div class="notice__icon">🤔</div>
        <h1>Nicht gefunden</h1>
        <p>Die angeforderte Seite konnte nicht gefunden werden.</p>
    </div>
</template>

<style lang="css" scoped>
.notice {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    text-align: center;

    padding: 1rem;

    width: 100vw;
    height: 100vh;

    .notice__icon {
        font-size: 400%;
    }
}
</style>
