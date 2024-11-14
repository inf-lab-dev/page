import fs from 'node:fs/promises';
import { defineLoader } from 'vitepress';

const CONTENT_FOLDER = 'content/';

type Data = Record<string, EncryptedSolution>;

export interface EncryptedSolution {
    language: string;
    code: string;
    annotations: string;
}

export declare const data: Data;

export default defineLoader({
    watch: [`${CONTENT_FOLDER}/**/*.solution.json`],
    async load(watchedFiles: string[]): Promise<Data> {
        const solutions = await Promise.all(
            watchedFiles.map((file) =>
                fs
                    .readFile(file, 'utf-8')
                    .then((content) => [
                        file.substring(CONTENT_FOLDER.length),
                        JSON.parse(content),
                    ]),
            ),
        );

        return Object.fromEntries(solutions);
    },
});
