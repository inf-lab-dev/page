<template>
    <div ref="editorElement" class="wrapper">
        <div class="wrapper__locked">
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
    </div>
</template>

<script setup lang="ts">
import {
    createEditor,
    createViteWorkerOptions,
    DecryptedSolution,
    decryptFile,
    EncryptedSolution,
} from 'solution-zone';
import { useData } from 'vitepress';
import { computed, onMounted, ref } from 'vue';
import { data as encryptedSolutions } from '../loader/encrypted-solutions.data';

const editorElement = ref<HTMLDivElement>();

const { isDark } = useData();

const [key, source] = computed<[string, EncryptedSolution] | [null, null]>(
    () => {
        if (!import.meta.env.SSR) {
            const url = new URL(location.href);

            const key = url.searchParams.get('key');
            const source = url.searchParams.get('source') ?? 'values';

            const sourcePath =
                `${url.pathname}${source}.solution.json`.substring(1);

            if (key != null && sourcePath in encryptedSolutions) {
                return [key, encryptedSolutions[sourcePath]];
            }
        }

        return [null, null];
    },
).value;

async function setupEditor({ language, code, annotations }: DecryptedSolution) {
    if (!editorElement.value) {
        throw new ReferenceError(
            'Could not find element to display solution within.',
        );
    }

    editorElement.value.classList.add('wrapper--rendered');
    editorElement.value.innerHTML = '';

    const [monaco, editor] = await createEditor({
        worker: await createViteWorkerOptions(
            import('monaco-editor/esm/vs/editor/editor.worker?worker'),
            import('monaco-editor/esm/vs/language/css/css.worker?worker'),
            import('monaco-editor/esm/vs/language/html/html.worker?worker'),
            import('monaco-editor/esm/vs/language/json/json.worker?worker'),
            import('monaco-editor/esm/vs/language/typescript/ts.worker?worker'),
        ),
        element: editorElement.value,
        options: {
            language,
            value: code,
            lineNumbers: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            renderValidationDecorations: 'on',
            theme: isDark.value ? 'vs-dark' : 'vs-light',
            readOnlyMessage: { value: 'Cannot edit this file.' },
            readOnly: true,
        },
    });

    const markers = annotations.map(
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
            severity: monaco.MarkerSeverity.Hint,
        }),
    );

    monaco.editor.setModelMarkers(editor.getModel()!, 'annotations', markers);
}

async function loadSolution(key: string): Promise<DecryptedSolution> {
    if (source == null) {
        throw new ReferenceError('Cannot load solution from "NULL" source.');
    }

    return await decryptFile(key, source);
}

onMounted(() => {
    if (key) {
        // drop errors silently
        loadSolution(key).then(setupEditor);
    }
});
</script>

<style lang="css" scoped>
.wrapper {
    height: 100%;
    width: 100%;

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
}

.wrapper--rendered {
    outline: 1px solid #eaecef;
    min-height: 30vh;
}
</style>
