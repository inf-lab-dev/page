<template></template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        decryptionKey?: string;
        sourcePrefix?: string;
        source?: string;
    }>(),
    {
        sourcePrefix: '',
    },
);

console.warn(
    `Using <EncryptedSolution> is deprecated, use the '.solution.json' pages instead.`,
);
</script>
