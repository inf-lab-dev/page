<template>
    <div
        :class="[
            'wrapper',
            {
                'wrapper--rendered': !!decryptedSolution,
            },
        ]"
    >
        <div v-if="!decryptedSolution" class="wrapper__locked">
            <span class="wrapper__lock">🔒</span>
            <p>
                <strong class="wrapper__header">
                    Hier verbirgt sich die verschlüsselte Lösung!
                </strong>
                <span>
                    Um diese anzuzeigen, wird ein spezieller Link benötigt. Wie
                    du diesen erhalten kannst, wurde im Tutorium mitgeteilt.
                </span>
            </p>
        </div>
        <CodeEditor
            v-else
            v-model="decryptedSolution.code"
            class="wrapper__editor"
            :options="editorOptions"
        />
    </div>
</template>

<script setup lang="ts">
import { DecryptedSolution, decryptFile } from 'solution-zone';
import { useData } from 'vitepress';
import { computed, onMounted, shallowRef, watch } from 'vue';
import { data as encryptedSolutions } from '../loader/encrypted-solutions.data';
import CodeEditor, {
    EditorOptions,
    EnhancedEditor,
} from './util/CodeEditor.vue';

const { isDark } = useData();

const editor = shallowRef<EnhancedEditor>();
const decryptedSolution = shallowRef<DecryptedSolution>();

const solution = computed(() => {
    if (!import.meta.env.SSR) {
        const url = new URL(location.href);

        const key = url.searchParams.get('key');
        const source = url.searchParams.get('source') ?? 'values';

        const sourcePath = `${url.pathname}${source}.solution.json`.substring(
            1,
        );

        if (key != null && sourcePath in encryptedSolutions) {
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

async function loadSolution() {
    if (solution.value.source == null) {
        throw new ReferenceError('Cannot load solution from "NULL" source.');
    }

    decryptedSolution.value = await decryptFile(
        solution.value.key,
        solution.value.source,
    );
}

watch(
    decryptedSolution,
    () => {
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
    },
    { deep: true },
);

onMounted(() => {
    if (solution.value.key) {
        // drop errors silently
        loadSolution();
    }
});
</script>

<style lang="css" scoped>
.wrapper {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;

    .wrapper__locked {
        display: flex;
        gap: 10px;
    }

    .wrapper__lock {
        font-size: 200%;
    }

    .wrapper__header {
        display: block;
        font-weight: bold;
    }

    .wrapper__editor {
        flex-grow: 1;
    }
}

.wrapper--rendered {
    outline: 1px solid #eaecef;
    min-height: 30vh;
}
</style>
