<template>
    <slot v-if="decryptedContent" :decryptedContent="decryptedContent"></slot>
    <template v-else>
        <article class="unlock">
            <header class="unlock__content">
                <span class="unlock__icon">
                    <template v-if="isLoading">⏳</template>
                    <template v-else>🔑</template>
                </span>
                <section>
                    <hgroup class="unlock__titleGroup">
                        <h2 class="unlock__title">
                            Dieser Inhalt ist verschlüsselt!
                        </h2>
                        <p class="unlock__subTitle">
                            Um diesen zu entschlüsseln, ist eine Schlüsseldatei
                            erforderlich. Wähle deine Schlüsseldatei unten aus.
                        </p>
                    </hgroup>

                    <DecryptionError v-if="hasError" />

                    <KeyForm @submit="onKeySubmitted" :loading="isLoading" />
                </section>
            </header>
        </article>
    </template>
</template>

<script lang="ts" setup>
import KeyForm, { KeySubmission } from '@/components/crypto/KeyForm.vue';
import { decryptString } from '@/lib/crypto';
import { onMounted, ref } from 'vue';
import DecryptionError from './DecryptionError.vue';

const REMEMBER_KEY = 'private-key';

const props = defineProps<{
    content: string;
}>();

const isLoading = ref(false);
const hasError = ref(false);
const decryptedContent = ref<string>();

async function onKeySubmitted({ key, remember }: KeySubmission) {
    hasError.value = false;

    const success = await decryptContent(key);

    if (success) {
        if (remember) {
            localStorage.setItem(REMEMBER_KEY, key);
        }
    } else {
        hasError.value = true;
    }
}

async function decryptContent(key: string) {
    try {
        isLoading.value = true;
        decryptedContent.value = await decryptString(props.content, key);

        return true;
    } catch {
        return false;
    } finally {
        isLoading.value = false;
    }
}

onMounted(async () => {
    const storedKey = localStorage.getItem(REMEMBER_KEY);

    if (storedKey) {
        const success = await decryptContent(storedKey);

        if (!success) {
            localStorage.removeItem(REMEMBER_KEY);
        }
    }
});
</script>

<style lang="scss" scoped>
.unlock {
    .unlock__content {
        display: flex;
        gap: var(--base-size-8);
    }

    .unlock__icon {
        font-size: 200%;
    }

    .unlock__titleGroup {
        display: flex;
        flex-direction: column;
        margin-bottom: var(--base-size-4);
    }

    .unlock__title {
        margin: 0;
        border: none;
        padding: 0;
    }

    .unlock__subTitle {
        margin: 0;
        color: var(--fgColor-muted);
    }
}
</style>
