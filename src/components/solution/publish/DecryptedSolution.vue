<template>
    <div class="vp-code-group vp-adaptive-theme">
        <div class="tabs">
            <template
                v-for="decryptedFile of solution.files"
                :key="decryptedFile.name"
            >
                <input
                    type="radio"
                    :value="tabId(decryptedFile)"
                    :name="`decrypted-solution-${baseId}`"
                    :id="tabId(decryptedFile)"
                    v-model="activeSolution"
                />
                <label
                    :data-title="decryptedFile.name"
                    :for="tabId(decryptedFile)"
                    >{{ decryptedFile.name }}</label
                >
            </template>
        </div>
        <div class="blocks">
            <div
                v-for="decryptedFile of solution.files"
                :key="decryptedFile.name"
                :class="[
                    'decrypted-solution-file',
                    tabId(decryptedFile) == activeSolution && 'active',
                ]"
            >
                <DecryptedSolutionFile :file="decryptedFile" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    DecryptedSolutionFile as DecryptedSolutionFileType,
    DecryptedSolution as DecryptedSolutionType,
} from 'solution-zone';
import { onMounted, ref, useId } from 'vue';
import DecryptedSolutionFile from './DecryptedSolutionFile.vue';

const props = defineProps<{
    solution: DecryptedSolutionType;
}>();

const baseId = useId();

const activeSolution = ref();

const tabId = (decryptedFile: DecryptedSolutionFileType) =>
    `tab-${baseId}-${decryptedFile.name}`;

onMounted(() => {
    activeSolution.value = tabId(props.solution.files[0]);
});
</script>
