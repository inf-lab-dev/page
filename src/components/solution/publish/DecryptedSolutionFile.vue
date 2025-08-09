<template>
    <CodeEditor
        v-model="file.code"
        class="decryptedSolution"
        :options="editorOptions"
        @loaded="onEditorLoaded"
    />
</template>

<script setup lang="ts">
import { DecryptedSolutionFile } from 'solution-zone';
import { useData } from 'vitepress';
import { computed, shallowRef, watch } from 'vue';
import CodeEditor, {
    EditorOptions,
    EnhancedEditor,
} from './util/CodeEditor.vue';

const { isDark } = useData();

const props = defineProps<{
    file: DecryptedSolutionFile;
}>();

const editor = shallowRef<EnhancedEditor>();

const editorOptions = computed<EditorOptions>(() => ({
    language: props.file.language || 'plaintext',
    lineNumbers: 'on',
    automaticLayout: true,
    scrollBeyondLastLine: false,
    renderValidationDecorations: 'on',
    theme: isDark.value ? 'vs-dark' : 'vs-light',
    readOnlyMessage: { value: 'Diese Datei kann nicht bearbeitet werden.' },
    readOnly: true,
}));

function updateAnnotations() {
    if (!editor.value) {
        return;
    }

    const markers = props.file.annotations.map(
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
function onEditorLoaded(editorInstance: EnhancedEditor) {
    editor.value = editorInstance;

    updateAnnotations();
}

watch(props.file, () => updateAnnotations(), { deep: true });
</script>

<style lang="scss" scoped>
.decryptedSolution {
    flex-grow: 1;

    border: 1px solid var(--borderColor-default);

    // subtract the border on the right
    width: calc(100% - 1px);
    min-height: 50vh;
}
</style>
