#!/usr/bin/env node

/**
 * One-time CSS compilation script.
 *
 * Reads .module.scss files from libs/react/src/<Component>/,
 * compiles them via sass, scopes class names to ld-<component>-<class>,
 * resolves CSS custom property var() calls to literal token values,
 * and writes the result as plain CSS into src/components/<Component>/styles.css.
 *
 * Usage:
 *   node scripts/compile-css.mjs                   # all components
 *   node scripts/compile-css.mjs Switch Alert Badge # specific components
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import * as sass from 'sass';

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(SCRIPT_DIR, '..');
const LIBS_SRC = path.resolve(ROOT, 'libs/react/src');
const OUT_BASE = path.resolve(ROOT, 'src/components');
const NODE_MODULES = [
  path.resolve(ROOT, 'node_modules'),
  path.resolve(ROOT, 'libs/react/node_modules'),
];

// ---------------------------------------------------------------------------
// Token resolution
// ---------------------------------------------------------------------------

async function resolveExistingPath(candidates) {
  for (const c of candidates) {
    try { await fs.access(c); return c; } catch { /* next */ }
  }
  return candidates[0];
}

function camelToKebab(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Za-z])(\d+)/g, '$1-$2')
    .replace(/(\d)([A-Za-z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
}

async function loadTokenFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const tokens = {};
  for (const m of content.matchAll(/export const (\w+)\s*=\s*(?:"([^"]*)"|(\d+))/g)) {
    tokens[m[1]] = m[2] !== undefined ? m[2] : Number(m[3]);
  }
  return tokens;
}

let _cssVarMap = null;
async function getCssVarMap() {
  if (_cssVarMap) return _cssVarMap;
  const nm = await resolveExistingPath(NODE_MODULES);
  const [semantic, primitive] = await Promise.all([
    loadTokenFile(path.resolve(nm, '@livingdesign/tokens/dist/js/light/regular/semantic.esm.js')),
    loadTokenFile(path.resolve(nm, '@livingdesign/tokens/dist/js/light/regular/primitive.esm.js')),
  ]);
  const map = {};
  for (const [k, v] of Object.entries(semantic)) map[`--ld-semantic-${camelToKebab(k)}`] = String(v);
  for (const [k, v] of Object.entries(primitive)) map[`--ld-primitive-${camelToKebab(k)}`] = String(v);
  _cssVarMap = map;
  return map;
}

function resolveVarFunctions(cssText, varMap) {
  let out = '';
  let i = 0;
  while (i < cssText.length) {
    const start = cssText.indexOf('var(', i);
    if (start === -1) { out += cssText.slice(i); break; }
    out += cssText.slice(i, start);
    let j = start + 4, depth = 1;
    while (j < cssText.length && depth > 0) {
      if (cssText[j] === '(') depth++;
      else if (cssText[j] === ')') depth--;
      j++;
    }
    if (depth !== 0) { out += cssText.slice(start); break; }
    const args = cssText.slice(start + 4, j - 1);
    const commaIdx = findTopLevelComma(args);
    const varName = (commaIdx >= 0 ? args.slice(0, commaIdx) : args).trim();
    const fallback = commaIdx >= 0 ? args.slice(commaIdx + 1).trim() : null;
    const resolved = varMap[varName];
    if (resolved !== undefined) out += resolved;
    else if (fallback) out += fallback;
    else out += cssText.slice(start, j);
    i = j;
  }
  return out;
}

function findTopLevelComma(s) {
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') depth++;
    else if (s[i] === ')') depth--;
    else if (s[i] === ',' && depth === 0) return i;
  }
  return -1;
}

// ---------------------------------------------------------------------------
// SCSS compilation + class scoping
// ---------------------------------------------------------------------------

function normalizeTildeImports(source) {
  return source.replace(/(['"])~([^'"]+)\1/g, '$1$2$1');
}

function stripGlobalLocal(css) {
  return css.replace(/:global\(([^)]+)\)/g, '$1').replace(/:local\(([^)]+)\)/g, '$1');
}

async function getModuleClassNames(scssPath) {
  const dtsPath = `${scssPath}.d.ts`;
  try {
    const dts = await fs.readFile(dtsPath, 'utf-8');
    const names = [];
    for (const m of dts.matchAll(/export\s+declare\s+const\s+(\w+)\s*:\s*string\s*;/g)) {
      names.push(m[1]);
    }
    if (names.length > 0) return names;
  } catch { /* fall through */ }
  const scss = await fs.readFile(scssPath, 'utf-8');
  const names = [];
  for (const m of scss.matchAll(/\.([A-Za-z_]\w*)/g)) names.push(m[1]);
  return [...new Set(names)];
}

function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function scopeCSS(cssText, scope, classNames) {
  let scoped = stripGlobalLocal(cssText);
  scoped = scoped.replace(/\/\*[\s\S]*?\*\//g, '');
  const sorted = [...new Set(classNames)].sort((a, b) => b.length - a.length);
  for (const cn of sorted) {
    const re = new RegExp(`\\.${escapeRegExp(cn)}(?=[\\s\\.{:#>+~\\[,)|]|$)`, 'g');
    scoped = scoped.replace(re, `.${scope}-${cn}`);
  }
  return scoped;
}

async function compileScssFile(scssPath, scope) {
  const source = await fs.readFile(scssPath, 'utf-8');
  const normalized = normalizeTildeImports(source);
  const nm = await resolveExistingPath(NODE_MODULES);
  const nmUrl = pathToFileURL(`${nm}/`);
  const loadPaths = [LIBS_SRC, path.resolve(ROOT, 'libs/react'), ROOT, ...NODE_MODULES];

  const compiled = await sass.compileStringAsync(normalized, {
    url: pathToFileURL(scssPath),
    style: 'expanded',
    loadPaths,
    importers: [{
      findFileUrl(url) {
        if (!url.startsWith('~')) return null;
        return new URL(url.slice(1), nmUrl);
      },
    }],
  });

  const classNames = await getModuleClassNames(scssPath);
  const varMap = await getCssVarMap();
  const resolved = resolveVarFunctions(compiled.css, varMap);
  const scoped = scopeCSS(resolved, scope, classNames);
  return scoped.trim();
}

// ---------------------------------------------------------------------------
// Component discovery
// ---------------------------------------------------------------------------

const SKIP_DIRS = new Set(['hooks', 'utility', 'styles', 'types']);

async function discoverComponents(requested) {
  if (requested.length > 0) return requested;
  const entries = await fs.readdir(LIBS_SRC, {withFileTypes: true});
  return entries
    .filter(e => e.isDirectory() && !SKIP_DIRS.has(e.name))
    .map(e => e.name)
    .sort();
}

async function findScssFiles(componentName) {
  const dir = path.resolve(LIBS_SRC, componentName);
  const files = [];

  async function scan(d) {
    const entries = await fs.readdir(d, {withFileTypes: true}).catch(() => []);
    for (const e of entries) {
      if (e.isDirectory() && !e.name.startsWith('__')) {
        await scan(path.resolve(d, e.name));
      } else if (e.name.endsWith('.module.scss')) {
        files.push(path.resolve(d, e.name));
      }
    }
  }

  await scan(dir);
  return files;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const componentNames = await discoverComponents(args);

  console.log(`Compiling CSS for ${componentNames.length} component(s)...\n`);

  for (const name of componentNames) {
    const scope = `ld-${name.toLowerCase()}`;
    const scssFiles = await findScssFiles(name);
    if (scssFiles.length === 0) {
      console.log(`  - ${name}: no SCSS files`);
      continue;
    }

    const cssParts = [];
    for (const scssPath of scssFiles) {
      const moduleName = path.basename(scssPath).replace('.module.scss', '');
      const moduleScope = moduleName === name ? scope : `${scope}-${moduleName.toLowerCase()}`;
      try {
        const css = await compileScssFile(scssPath, moduleScope);
        if (css) cssParts.push(`/* ${moduleName} */\n${css}`);
      } catch (err) {
        console.error(`  ! ${name}/${moduleName}: ${err.message}`);
      }
    }

    if (cssParts.length === 0) {
      console.log(`  - ${name}: compiled CSS is empty`);
      continue;
    }

    const outDir = path.resolve(OUT_BASE, name);
    await fs.mkdir(outDir, {recursive: true});
    const cssContent = `/* LD Portable – ${name} */\n${cssParts.join('\n\n')}\n`;
    await fs.writeFile(path.resolve(outDir, `${name}.css`), cssContent, 'utf-8');
    console.log(`  ✓ ${name}/${name}.css`);
  }

  console.log('\nDone.');
}

main().catch(err => { console.error(err); process.exit(1); });
