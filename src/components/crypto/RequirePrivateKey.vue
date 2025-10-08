<template>
    <ClientOnly>
        <slot v-if="hasKey"></slot>
    </ClientOnly>
</template>

<script lang="ts" setup>
import { usePrivateKey } from '@/composables/usePrivateKey';
import { computed } from 'vue';

const privateKey = usePrivateKey();

const hasKey = computed(() => !!privateKey.value);
</script>
