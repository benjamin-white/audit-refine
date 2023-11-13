# Audit Refine

A simple script that takes a JSON npm packages audit report and filters it to return only those packages that have the highest vulnerability found.

**_To use:_**

Install dependencies

```sh
pnpm i
```

Run the typescipt version

```sh
bun lib/index.ts -- --in="YOUR_JSON_AUDIT" --out="SAVE_FILE_LOCATION"
```

Or build and run the JS version

```sh
pnpm build && node ./dist/index.js --in="YOUR_JSON_AUDIT" --out="SAVE_FILE_LOCATION"
```
