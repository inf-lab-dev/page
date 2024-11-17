<template>
    <div ref="editorElement"></div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef, useTemplateRef, watch } from 'vue';

export type MonacoModule = typeof import('monaco-editor');
export type Editor = import('monaco-editor').editor.IStandaloneCodeEditor;
export type EditorOptions =
    import('monaco-editor').editor.IStandaloneEditorConstructionOptions;

export type EnhancedEditor = Editor & {
    monaco: MonacoModule;
};

const emit = defineEmits<{
    loaded: [editor: EnhancedEditor];
}>();

const props = defineProps<{
    options: EditorOptions;
}>();

const editorElement = useTemplateRef('editorElement');

const modelValue = defineModel<string>({ required: true });

const monaco = shallowRef<MonacoModule>();
const editor = shallowRef<Editor>();

function createEditor() {
    editor.value = monaco.value!.editor.create(editorElement.value!, {
        ...props.options,
        value: modelValue.value,
    });

    editor.value.onDidChangeModelContent(
        () => (modelValue.value = editor.value!.getValue()),
    );

    emit(
        'loaded',
        // @ts-expect-error: Wrong typings here...
        Object.assign(editor.value, {
            monaco: monaco.value,
        }),
    );
}

watch(modelValue, (oldValue, newValue) => {
    if (oldValue != newValue) {
        editor.value?.setValue(newValue);
    }
});

watch(props, () => editor.value?.updateOptions(props.options), { deep: true });

onMounted(async () => {
    const monacoInstance = await import('monaco-editor');

    const [
        { default: editorWorker },
        { default: jsonWorker },
        { default: cssWorker },
        { default: htmlWorker },
        { default: tsWorker },
    ] = await Promise.all([
        import('monaco-editor/esm/vs/editor/editor.worker?worker'),
        import('monaco-editor/esm/vs/language/json/json.worker?worker'),
        import('monaco-editor/esm/vs/language/css/css.worker?worker'),
        import('monaco-editor/esm/vs/language/html/html.worker?worker'),
        import('monaco-editor/esm/vs/language/typescript/ts.worker?worker'),
    ]);

    self.MonacoEnvironment = {
        getWorker(_, label) {
            if (label === 'json') return new jsonWorker();

            if (label === 'css' || label === 'scss' || label === 'less')
                return new cssWorker();

            if (label === 'html' || label === 'handlebars' || label === 'razor')
                return new htmlWorker();

            if (label === 'typescript' || label === 'javascript')
                return new tsWorker();

            return new editorWorker();
        },
    };

    monaco.value = monacoInstance;

    createEditor();
});
</script>
