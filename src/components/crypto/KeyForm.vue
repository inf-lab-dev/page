<template>
    <form class="keyForm" @submit.prevent="onSubmit">
        <div class="keyForm__keyField">
            <label class="keyForm__label" :for="keyFieldId"
                >Schlüsseldatei</label
            >
            <input
                ref="keyField"
                :id="keyFieldId"
                type="file"
                accept=".pem,.key"
                @change="onSelectedFile"
            />
        </div>

        <div class="keyForm__rememberField">
            <input
                v-model="rememberKey"
                type="checkbox"
                :id="rememberFieldId"
            />
            <label :for="rememberFieldId">Schlüssel im Browser speichern</label>
        </div>
        <button :disabled="!canSubmit" type="submit">Entschlüsseln</button>
    </form>
</template>

<script lang="ts" setup>
import { computed, ref, useId, useTemplateRef } from 'vue';

export interface KeySubmission {
    key: string;
    remember: boolean;
}

const emit = defineEmits<{
    submit: [KeySubmission];
}>();

const props = defineProps<{ loading: boolean }>();

const keyFieldId = useId();
const rememberFieldId = useId();

const keyField = useTemplateRef('keyField');

const hasFileSelected = ref(false);
const rememberKey = ref(true);

const canSubmit = computed(() => hasFileSelected.value && !props.loading);

function onSelectedFile() {
    hasFileSelected.value = keyField.value?.files?.length === 1;
}

async function onSubmit() {
    const keyFile = keyField.value?.files?.item(0);
    const keyContent = await keyFile?.text();

    if (keyContent) {
        emit('submit', { key: keyContent, remember: rememberKey.value });
    }
}
</script>

<style lang="scss" scoped>
.keyForm {
    display: flex;
    flex-direction: column;
    gap: var(--base-size-16);

    .keyForm__label {
        font-weight: var(--base-text-weight-semibold);
    }

    .keyForm__keyField {
        display: flex;
        flex-direction: column;
    }

    .keyForm__rememberField {
        display: flex;
        align-items: center;

        gap: var(--base-size-4);
    }
}
</style>
