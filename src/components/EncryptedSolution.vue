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
import { computed, onMounted, ref } from 'vue';
import { decrypt } from '../api/encrypted-solution';
import {
    data as encryptedSolutions,
    type EncryptedSolution,
} from '../loader/encrypted-solutions.data';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { useData } from 'vitepress';

type DecryptedSolution = Omit<EncryptedSolution, 'annotations'> & {
    annotations: {
        comment: string;
        line: [number, number];
        column: [number, number];
    }[];
};

if (!import.meta.env.SSR) {
    self.MonacoEnvironment = {
        getWorker(_, label) {
            if (label === 'json') {
                return new jsonWorker();
            } else if (
                label === 'css' ||
                label === 'scss' ||
                label === 'less'
            ) {
                return new cssWorker();
            } else if (
                label === 'html' ||
                label === 'handlebars' ||
                label === 'razor'
            ) {
                return new htmlWorker();
            } else if (label === 'typescript' || label === 'javascript') {
                return new tsWorker();
            }

            return new editorWorker();
        },
    };
}

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
            console.log(sourcePath, encryptedSolutions);
            if (key != null && sourcePath in encryptedSolutions) {
                return [key, encryptedSolutions[sourcePath]];
            }
        }

        return [null, null];
    },
).value;

async function setupEditor([monaco, { code, language, annotations }]: [
    typeof import('monaco-editor'),
    DecryptedSolution,
]) {
    if (!editorElement.value) {
        throw new ReferenceError(
            'Could not find element to display solution within.',
        );
    }

    editorElement.value.classList.add('wrapper--rendered');
    editorElement.value.innerHTML = '';

    const editor = monaco.editor.create(editorElement.value, {
        language,
        value: code,
        lineNumbers: 'on',
        automaticLayout: true,
        scrollBeyondLastLine: false,
        renderValidationDecorations: 'on',
        theme: isDark.value ? 'vs-dark' : 'vs-light',
        readOnlyMessage: { value: 'Cannot edit this file.' },
        readOnly: true,
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

    const code = await decrypt(key, source.code);
    const annotations = await decrypt(key, source.annotations);

    return {
        ...source,
        code,
        annotations: JSON.parse(annotations),
    };
}

onMounted(() => {
    if (key) {
        // drop errors silently
        Promise.all([import('monaco-editor'), loadSolution(key)]).then(
            setupEditor,
        );
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
