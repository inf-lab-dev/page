<template>
    <details>
        <summary class="summary">
            Ich kann die Aufgabe schon alleine lösen, bin ich jetzt vergebens
            hier?
        </summary>
        Nein! Ihr könnt gerne aufpassen, dass ich keinen Fehler mache und ggf.
        euren eigenen Code verbessern.
    </details>

    <details v-if="hasCommand">
        <summary class="summary">Was macht der Befehl überhaupt?</summary>
        Dieser Befehl lädt Code herunter und führt diesen direkt aus, sodass für
        euch komfortabel ein weiteres ZIP-Archiv heruntergeladen und gleich
        entpackt wird. All das wird anschließend wieder aufgeräumt.
    </details>
</template>

<script lang="ts" setup>
withDefaults(
    defineProps<{
        hasCommand: boolean;
    }>(),
    {
        hasCommand: true,
    },
);
</script>

<style lang="css" scoped>
.summary {
    font-weight: bold;
}
</style>
