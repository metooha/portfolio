#!/usr/bin/env node
/**
 * Inlines all JS and CSS assets referenced in docs/index.html into a single
 * self-contained docs/index-bundled.html.
 *
 * This lets the docs be shared as a single file (e.g. via share-puppy or
 * opened directly with file://) without needing the assets/ folder alongside.
 *
 * Usage:
 *   node scripts/bundle-html.mjs
 *   npm run build:pages:bundle   ← builds + bundles in one shot
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const INPUT = path.join(DOCS_DIR, 'index.html');
const OUTPUT = path.join(DOCS_DIR, 'index-bundled.html');

let html = fs.readFileSync(INPUT, 'utf8');

// Inline <link rel="stylesheet" href="./assets/...">
html = html.replace(
  /<link rel="stylesheet" crossorigin href="(\.\/assets\/[^"]+)">/g,
  (_, href) => {
    const css = fs.readFileSync(path.join(DOCS_DIR, href.replace('./', '')), 'utf8');
    return `<style>${css}</style>`;
  }
);

// Inline <script type="module" src="./assets/...">
html = html.replace(
  /<script type="module" crossorigin src="(\.\/assets\/[^"]+)"><\/script>/g,
  (_, src) => {
    const js = fs.readFileSync(path.join(DOCS_DIR, src.replace('./', '')), 'utf8');
    return `<script type="module">${js}</script>`;
  }
);

fs.writeFileSync(OUTPUT, html, 'utf8');

const mb = (fs.statSync(OUTPUT).size / 1024 / 1024).toFixed(2);
console.log(`✓ ${path.relative(ROOT, OUTPUT)} (${mb} MB)`);
