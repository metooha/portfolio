#!/usr/bin/env node

/**
 * Converts font files to a base64-embedded React component (.tsx).
 *
 * Usage:
 *   node scripts/font-to-base64.mjs <font-family-name> <file:weight> [<file:weight> ...]
 *
 * Examples:
 *   node scripts/font-to-base64.mjs Gibson \
 *     "notes/Gibson Complete ttf/Gibson-Regular.ttf:400" \
 *     "notes/Gibson Complete ttf/Gibson-SemiBold.ttf:600"
 *
 *   node scripts/font-to-base64.mjs Bogle \
 *     "libs/icons/docs/static/media/Bogle-Regular.9f683a17.woff2:400" \
 *     "libs/icons/docs/static/media/Bogle-Bold.98124f1d.woff2:700"
 *
 * Output: writes to src/components/core/<Name>SansFont/<Name>SansFont.tsx
 *
 * Supported formats: .woff2, .woff, .ttf, .otf
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const FORMAT_MAP = {
  '.woff2': 'woff2',
  '.woff': 'woff',
  '.ttf': 'truetype',
  '.otf': 'opentype',
};

function usage() {
  console.log(`
Usage: node scripts/font-to-base64.mjs <FontFamilyName> <file:weight> [<file:weight> ...]

  <FontFamilyName>  The CSS font-family name (e.g. Gibson, Bogle)
  <file:weight>     Path to font file and its CSS font-weight, separated by ':'
                    Path is relative to project root.

Example:
  node scripts/font-to-base64.mjs Bogle \\
    "libs/icons/docs/static/media/Bogle-Regular.9f683a17.woff2:400" \\
    "libs/icons/docs/static/media/Bogle-Bold.98124f1d.woff2:700"
`);
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length < 2) usage();

const fontFamily = args[0];
const componentName = `${fontFamily}SansFont`;
const slug = fontFamily.toLowerCase().replace(/\s+/g, '-') + '-sans';
const entries = args.slice(1).map((arg) => {
  const lastColon = arg.lastIndexOf(':');
  if (lastColon === -1) {
    console.error(`Error: "${arg}" must be in format <file>:<weight>`);
    process.exit(1);
  }
  const filePath = arg.slice(0, lastColon);
  const weight = arg.slice(lastColon + 1);
  return { filePath, weight };
});

// Validate files exist and detect format
const rootWithSep = ROOT.endsWith(path.sep) ? ROOT : ROOT + path.sep;
for (const entry of entries) {
  const abs = path.resolve(ROOT, entry.filePath);
  // Reject paths that escape the project root (path traversal).
  if (abs !== ROOT && !abs.startsWith(rootWithSep)) {
    console.error(`Error: path escapes project root: ${entry.filePath}`);
    process.exit(1);
  }
  if (!fs.existsSync(abs)) {
    console.error(`Error: file not found: ${abs}`);
    process.exit(1);
  }
  const ext = path.extname(entry.filePath).toLowerCase();
  const format = FORMAT_MAP[ext];
  if (!format) {
    console.error(`Error: unsupported format "${ext}" for ${entry.filePath}`);
    console.error(`Supported: ${Object.keys(FORMAT_MAP).join(', ')}`);
    process.exit(1);
  }
  entry.abs = abs;
  entry.format = format;
  entry.mimePrefix = ext === '.woff2' ? 'font/woff2' : ext === '.woff' ? 'font/woff' : ext === '.otf' ? 'font/opentype' : 'font/truetype';
}

// Convert to base64
const constants = entries.map((entry, i) => {
  const buf = fs.readFileSync(entry.abs);
  const b64 = buf.toString('base64');
  const label = `${fontFamily.toUpperCase()}_W${entry.weight}_BASE64`;
  console.log(`  ${path.basename(entry.filePath)} (weight ${entry.weight}): ${(buf.length / 1024).toFixed(1)}KB → ${(b64.length / 1024).toFixed(1)}KB base64`);
  return { label, b64, weight: entry.weight, format: entry.format, mimePrefix: entry.mimePrefix };
});

// Build @font-face declarations
const fontFaces = constants.map(c =>
  `    @font-face {
      font-family: '${fontFamily}';
      src: url('data:${c.mimePrefix};base64,\${${c.label}}') format('${c.format}');
      font-weight: ${c.weight};
    }`
).join('\n');

const guardVar = `_${slug.replace(/-/g, '')}Injected`;
const injectFn = `inject${fontFamily}Sans`;
const hookName = `use${fontFamily}Sans`;

const source = `'use client';

import {useEffect} from 'react';

let ${guardVar} = false;

${constants.map(c => `const ${c.label} = "${c.b64}";`).join('\n')}

export function ${injectFn}(): void {
  if (${guardVar} || typeof document === 'undefined') {
    return;
  }
  ${guardVar} = true;

  const style = document.createElement('style');
  style.setAttribute('data-ld-portable-font', '${slug}');
  style.textContent = \`
${fontFaces}
  \`;
  document.head.appendChild(style);
}

export const ${hookName} = () => {
  useEffect(() => {
    ${injectFn}();
  }, []);
};
`;

// Write output
const outDir = path.resolve(ROOT, 'src/components/core', componentName);
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.resolve(outDir, `${componentName}.tsx`);
fs.writeFileSync(outPath, source, 'utf-8');

console.log(`\n✓ Written to ${path.relative(ROOT, outPath)}`);
console.log(`  Exports: ${injectFn}(), ${hookName}()`);
