<template>
    <slot v-if="hasKey"></slot>
</template>

<script lang="ts" setup>
import { usePrivateKey } from '@/composables/usePrivateKey';
import { computed } from 'vue';

const privateKey = usePrivateKey();

const hasKey = computed(() => !!privateKey.value);
</script>
