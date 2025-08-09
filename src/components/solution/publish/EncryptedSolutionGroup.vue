<template></template>

<script lang="ts" setup>
const props = defineProps<{
    solutions: unknown[];
}>();

console.warn(
    `Using <EncryptedSolutionGroup> is deprecated, use the '.solution.json' pages instead.`,
);
</script>
