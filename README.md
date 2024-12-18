# page

The [VitePress](https://vitepress.dev/) setup for inf-lab.dev

## Updating

To update all submodules, use `npm run update:submodule`.

## Developing

This repository uses Git Submodules, therefore either use the `--recurse-submodules` flag when cloing it, or run the following commands afterwards.

```bash
git submodule init
git submodule update
```

### Special files

Some files within the [`content`](./content/) directory get handled specially, those together with their documentation can be found here.

#### `.zip.json`

This file allows the creation of dynamic zip files, its contents represent the `ZipManifest` interface from [`manifest.ts`](./.vitepress/plugin/zip/manifest.ts#L36).
Please consult the linked file for documentation. The resulting files can then be accessed where the manifest file would be, except the `.json` extension needs to be dropped (or replaced by `.sh`).
