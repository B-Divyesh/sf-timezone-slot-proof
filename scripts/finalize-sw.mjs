import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const source = new URL('../public/sw.js', import.meta.url);
const assets = readdirSync(new URL('assets/', dist)).filter((file) => /\.(?:js|css)$/.test(file)).map((file) => `/assets/${file}`);
const worker = readFileSync(source, 'utf8').replace('__BUILD_ASSETS__', JSON.stringify(assets));
writeFileSync(new URL('sw.js', dist), worker);
