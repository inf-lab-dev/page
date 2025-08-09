<template>
    <div
        :class="[
            'wrapper',
            {
                'wrapper--rendered': !!decryptedSolution,
            },
        ]"
    >
        <SolutionLock v-if="!decryptedSolution" />
        <CodeEditor
            v-else
            v-model="decryptedSolution.code"
            class="wrapper__editor"
            :options="editorOptions"
            @loaded="onEditorLoaded"
        />
    </div>
</template>

<script setup lang="ts">
import { DecryptedSolution, decryptFile } from 'solution-zone';
import { useData } from 'vitepress';
import { computed, onMounted, shallowRef, watch } from 'vue';
import { data as encryptedSolutions } from '../../loader/encrypted-solutions.data';
import CodeEditor, {
    EditorOptions,
    EnhancedEditor,
} from './util/CodeEditor.vue';
import SolutionLock from './util/SolutionLock.vue';

const { isDark } = useData();

const emit = defineEmits<{
    decrypted: [solution: DecryptedSolution];
    failed: [error: unknown];
}>();

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

const editor = shallowRef<EnhancedEditor>();
const decryptedSolution = shallowRef<DecryptedSolution>();

const solution = computed(() => {
    if (!import.meta.env.SSR) {
        console.log(encryptedSolutions);
        const url = new URL(location.href);

        const key = props.decryptionKey ?? url.searchParams.get('key');
        const source =
            props.source ?? url.searchParams.get('source') ?? 'values';

        const sourcePath =
            `${url.pathname}${props.sourcePrefix}${source}.solution.json`.substring(
                1,
            );

        if (key && sourcePath in encryptedSolutions) {
            return { key, source: encryptedSolutions[sourcePath] };
        }
    }

    return { key: null, source: null };
});

const editorOptions = computed<EditorOptions>(() => ({
    language: decryptedSolution.value?.language || 'plaintext',
    lineNumbers: 'on',
    automaticLayout: true,
    scrollBeyondLastLine: false,
    renderValidationDecorations: 'on',
    theme: isDark.value ? 'vs-dark' : 'vs-light',
    readOnlyMessage: { value: 'Cannot edit this file.' },
    readOnly: true,
}));

function updateAnnotations() {
    if (!editor.value) {
        return;
    }

    const markers = decryptedSolution.value?.annotations.map(
        ({
            line: [startLineNumber, endLineNumber],
            column: [startColumn, endColumn],
            comment: message,
        }) => ({
            startLineNumber,
            endLineNumber,
            startColumn,
            endColumn,
            message,
            severity: editor.value!.monaco.MarkerSeverity.Hint,
        }),
    );

    editor.value!.monaco.editor.setModelMarkers(
        editor.value!.getModel()!,
        'annotations',
        markers ?? [],
    );
}

async function loadSolution() {
    if (solution.value.source == null) {
        throw new ReferenceError('Cannot load solution from "NULL" source.');
    }

    try {
        decryptedSolution.value = await decryptFile(
            solution.value.key,
            solution.value.source,
        );

        // propagage the success
        emit('decrypted', decryptedSolution.value);
    } catch (error) {
        emit('failed', error);

        // rethrow the error
        throw error;
    }
}

function onEditorLoaded(editorInstance: EnhancedEditor) {
    editor.value = editorInstance;

    updateAnnotations();
}

watch(decryptedSolution, () => updateAnnotations(), { deep: true });

onMounted(() => {
    if (solution.value.key) {
        // drop errors silently
        loadSolution();
    }
});
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .wrapper__editor {
        flex-grow: 1;
    }
}

.wrapper--rendered {
    border: 1px solid var(--borderColor-default);

    // subtract the border on the right
    width: calc(100% - 1px);
    min-height: 30vh;
}
</style>
