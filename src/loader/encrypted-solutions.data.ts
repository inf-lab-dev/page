import fs from 'node:fs/promises';
import path from 'node:path';
import { EncryptedSolution } from 'solution-zone';
import { defineLoader } from 'vitepress';
import { PAGE_SOURCE_PATH } from '../env';

const CONTENT_PATH = `${PAGE_SOURCE_PATH}/content`;

type Data = Record<string, EncryptedSolution>;

export declare const data: Data;

export default defineLoader({
    watch: [`${CONTENT_PATH}/**/*.solution.json`],
    async load(watchedFiles: string[]): Promise<Data> {
        const solutions = await Promise.all(
            watchedFiles.map((file) =>
                fs
                    .readFile(file, 'utf-8')
                    .then((content) => [
                        path.resolve(file).substring(CONTENT_PATH.length + 1),
                        JSON.parse(content),
                    ]),
            ),
        );

        return Object.fromEntries(solutions);
    },
});
