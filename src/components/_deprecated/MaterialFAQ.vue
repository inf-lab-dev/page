<template></template>

<script lang="ts" setup>
withDefaults(
    defineProps<{
        hasCommand: boolean;
    }>(),
    {
        hasCommand: true,
    },
);

console.warn(`Using <MaterialFAQ> is deprecated, do not use material pages.`);
</script>
