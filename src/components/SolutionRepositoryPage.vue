<template>
    <div v-html="pageContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { data as solutionRepository } from '../loader/solution-repository.data';

const props = defineProps<{
    requestedPage: string;
}>();

const pageContent = computed(() => solutionRepository[props.requestedPage]);
console.log(solutionRepository);
</script>
