<template>
    <h1>Lösung für {{ solution.source.title }}</h1>

    <p>
        Hier kann die Lösung gefunden werden, welche wir zusammen im Tutorium
        erarbeitet haben.
    </p>

    <div class="wrapper">
        <SolutionLock v-if="!decryptedSolution" />
        <DecryptedSolution v-else :solution="decryptedSolution" />
    </div>
</template>

<script setup lang="ts">
import { data as encryptedSolutions } from '@/loader/encrypted-solutions.data';
import {
    DecryptedSolution as DecryptedSolutionType,
    decryptFile,
} from 'solution-zone';
import { computed, onMounted, shallowRef } from 'vue';
import DecryptedSolution from './DecryptedSolution.vue';
import SolutionLock from './util/SolutionLock.vue';

const props = defineProps<{
    requestedPage: string;
}>();

const decryptedSolution = shallowRef<DecryptedSolutionType>();

const solution = computed(() => {
    const sourcePath = `${props.requestedPage}.solution.json`;
    const encryptedSolution = encryptedSolutions[sourcePath];
    let key: string | null = null;

    if (!import.meta.env.SSR) {
        const url = new URL(location.href);

        key = url.searchParams.get('key');
    }

    return { key, source: encryptedSolution };
});

async function loadSolution() {
    if ((solution.value.source.files ?? []).length === 0) {
        throw new ReferenceError('Cannot load solution without files.');
    }

    try {
        decryptedSolution.value = await decryptFile(
            solution.value.key ?? '',
            solution.value.source,
        );
    } catch (error) {
        console.error(error);
        // rethrow the error
        throw error;
    }
}

onMounted(() => {
    if (solution.value.key) {
        // drop errors silently
        loadSolution();
    }
});
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
</style>
