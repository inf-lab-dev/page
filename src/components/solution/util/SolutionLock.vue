<template>
    <div class="solutionLock">
        <span class="solutionLock__lock">🔒</span>
        <p class="solutionLock__text">
            <strong class="solutionLock__header">
                Hier verbirgt sich die verschlüsselte Lösung!
            </strong>
            <span>
                Um diese anzuzeigen, wird ein spezieller Link benötigt. Wie du
                diesen erhalten kannst, wurde im Tutorium mitgeteilt.
            </span>
        </p>
    </div>
</template>

<style lang="scss" scoped>
.solutionLock {
    display: flex;

    .solutionLock__text {
        margin-bottom: 0;
    }

    .solutionLock__lock {
        font-size: 200%;
    }

    .solutionLock__header {
        display: block;
        font-weight: bold;
    }
}
</style>
