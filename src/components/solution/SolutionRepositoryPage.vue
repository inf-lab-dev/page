<template>
    <EncryptedContent :content="pageContent.content" #="{ decryptedContent }">
        <div v-html="decryptedContent"></div>
    </EncryptedContent>
</template>

<script setup lang="ts">
import EncryptedContent from '@/components/crypto/EncryptedContent.vue';
import { data as solutionRepository } from '@/loader/solution-repository.data';
import { computed, onMounted, watch } from 'vue';

const props = defineProps<{
    requestedPage: string;
}>();

const pageContent = computed(() => solutionRepository[props.requestedPage]);

watch(pageContent, () => updateTitle());

function updateTitle() {
    if (pageContent.value.title) {
        // This already contains the suffix
        document.title = pageContent.value.title;
    }
}

// Trigger initially without `immediate` to also work when Hot replacing modules
// in the Vite dev environment
onMounted(() => updateTitle());
</script>
