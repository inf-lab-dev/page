import fs from 'fs';
import { SOLUTIONS_REPOSITORY_PATH } from '../../env';

export default {
    paths() {
        return fs
            .readdirSync(SOLUTIONS_REPOSITORY_PATH, {
                recursive: true,
                encoding: null,
            })
            .filter((path) => path.endsWith('.md'))
            .map((path) => {
                return { params: { path: path.replace(/\.md$/, '') } };
            });
    },
};
