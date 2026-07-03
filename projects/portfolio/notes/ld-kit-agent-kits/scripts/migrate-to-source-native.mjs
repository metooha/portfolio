#!/usr/bin/env node

/**
 * One-time migration script.
 *
 * Takes existing generated .tsx files from src/generated/ and transforms them
 * into source-native components in src/components/, stripping out the style
 * injection mechanism and rewriting imports to use ../common/.
 *
 * This should be run once per component. After migration, the component source
 * in src/components/ is maintained directly.
 *
 * Usage:
 *   node scripts/migrate-to-source-native.mjs                   # all
 *   node scripts/migrate-to-source-native.mjs Button Card Modal  # specific
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const WORKSPACE = path.resolve(ROOT, '..');
const GENERATED_DIR = path.resolve(WORKSPACE, 'src/generated');
const COMPONENTS_DIR = path.resolve(WORKSPACE, 'src/components');

const SKIP = new Set(['common', 'index']);

async function migrateComponent(name) {
  const sourcePath = path.resolve(GENERATED_DIR, `${name}.tsx`);
  try {
    await fs.access(sourcePath);
  } catch {
    console.log(`  - ${name}: no generated file found`);
    return false;
  }

  // Skip if already migrated
  const targetDir = path.resolve(COMPONENTS_DIR, name);
  const targetPath = path.resolve(targetDir, `${name}.tsx`);
  try {
    await fs.access(targetPath);
    console.log(`  - ${name}: already migrated (skipping)`);
    return false;
  } catch {
    // Not yet migrated, proceed
  }

  let code = await fs.readFile(sourcePath, 'utf-8');

  // 1. Remove the JSDoc header block (build-portable will re-add it)
  code = code.replace(/^\/\*\*\n \* @module \w+[\s\S]*?\*\/\s*\n/m, '');

  // 2. Remove the style injection block
  code = code.replace(
    /\n?\/\/ -{50,}\n\/\/ Interactive styles[\s\S]*?if \(typeof document !== 'undefined'\) \{\s*\n\s*_injectStyles\(\);\s*\n\}\s*\n/,
    '\n'
  );
  // Also remove standalone _injectStyles() calls in component bodies
  code = code.replace(/\s*_injectStyles\(\);\s*\n/g, '\n');

  // 3. Remove _SCOPE declaration
  code = code.replace(/const _SCOPE = '[^']*';\s*\n/g, '');

  // 4. Remove the section marker comments
  code = code.replace(
    /\n?\/\/ -{50,}\n\/\/ Component\n\/\/ -{50,}\s*\n/g,
    '\n'
  );

  // 5. Rewrite cross-component imports from ./Name to ../Name/Name
  // MUST run before common import rewriting to avoid mangling './common'
  code = code.replace(
    /from\s+'\.\/(\w+)'/g,
    (match, name) => {
      if (name === 'common') return match;
      return `from '../${name}/${name}'`;
    }
  );

  // 6. Rewrite import from './common' to use ../common/ with specific files
  const commonImportMatch = code.match(/import\s+\{([^}]+)\}\s+from\s+'\.\/common';\s*\n/);
  if (commonImportMatch) {
    const symbols = commonImportMatch[1].split(',').map(s => s.trim()).filter(Boolean);

    const helperSymbols = new Set([
      'useStableId', 'invariant', 'getTarget', 'onAnchorKeyDown',
      'mergeRefs', 'MergeRefsItem', 'remToPxValue', 'debounce',
      'setStyleProperty', 'applyCommonProps', '_applyCommonProps',
      'getPositionStyle', 'CalculatePositionFn',
    ]);
    const typeSymbols = new Set(['PolymorphicElementWithoutRef', 'WithIconProps']);
    const iconSymbols = new Set([
      'ExclamationCircleIcon', 'InfoCircleIcon', 'CheckCircleIcon',
      'WarningIcon', 'CloseIcon', 'CaretDownIcon', 'ArrowUpIcon',
      'ArrowDownIcon', 'CalendarIcon', 'ChevronRightIcon', 'ChevronLeftIcon',
    ]);
    const vhSymbols = new Set(['VisuallyHiddenInline', 'VisuallyHidden']);

    const helpers = symbols.filter(s => helperSymbols.has(s));
    const types = symbols.filter(s => typeSymbols.has(s));
    const icons = symbols.filter(s => iconSymbols.has(s));
    const vh = symbols.filter(s => vhSymbols.has(s));

    // Replace _applyCommonProps with applyCommonProps in the import list and code
    const apIdx = helpers.indexOf('_applyCommonProps');
    if (apIdx !== -1 && !helpers.includes('applyCommonProps')) {
      helpers[apIdx] = 'applyCommonProps';
      code = code.replace(/\b_applyCommonProps\b/g, 'applyCommonProps');
    } else if (apIdx !== -1) {
      helpers.splice(apIdx, 1);
      code = code.replace(/\b_applyCommonProps\b/g, 'applyCommonProps');
    }

    // Replace VisuallyHiddenInline with VisuallyHidden
    const vhIdx = vh.indexOf('VisuallyHiddenInline');
    if (vhIdx !== -1 && !vh.includes('VisuallyHidden')) {
      vh[vhIdx] = 'VisuallyHidden';
      code = code.replace(/\bVisuallyHiddenInline\b/g, 'VisuallyHidden');
    } else if (vhIdx !== -1) {
      vh.splice(vhIdx, 1);
      code = code.replace(/\bVisuallyHiddenInline\b/g, 'VisuallyHidden');
    }

    const imports = [];
    if (helpers.length > 0) imports.push(`import {${helpers.join(', ')}} from '../common/helpers';`);
    if (types.length > 0) imports.push(`import {${types.join(', ')}} from '../common/types';`);
    if (icons.length > 0) imports.push(`import {\n  ${icons.join(',\n  ')},\n} from '../common/icons';`);
    if (vh.length > 0) imports.push(`import {${vh.join(', ')}} from '../common/VisuallyHidden';`);

    code = code.replace(commonImportMatch[0], imports.join('\n') + '\n');
  }

  // 7. Replace array.filter(Boolean).join(' ') patterns with cx()
  let needsCx = false;
  code = code.replace(
    /\[([^\]]+)\]\.filter\(Boolean\)\.join\(' '\)/g,
    (_, args) => { needsCx = true; return `cx(${args})`; }
  );

  if (needsCx && !code.includes("from '../common/cx'")) {
    code = code.replace(
      /^import \* as React from 'react';\n/m,
      "import * as React from 'react';\nimport {cx} from '../common/cx';\n"
    );
  }

  // 8. Remove 'use client' (the build will handle this if needed)
  // Actually, keep it if present — it's a directive needed for the component
  // code = code.replace(/^['"]use client['"];\s*\n/m, '');

  // 9. Clean up multiple blank lines
  code = code.replace(/\n{3,}/g, '\n\n');
  code = code.trim() + '\n';

  // Write to src/components/<Name>/<Name>.tsx
  await fs.mkdir(targetDir, {recursive: true});
  await fs.writeFile(targetPath, code, 'utf-8');
  return true;
}

async function main() {
  const args = process.argv.slice(2);

  let componentNames;
  if (args.length > 0) {
    componentNames = args;
  } else {
    const entries = await fs.readdir(GENERATED_DIR, {withFileTypes: true});
    componentNames = entries
      .filter(e => e.isFile() && e.name.endsWith('.tsx'))
      .map(e => e.name.replace(/\.tsx$/, ''))
      .filter(n => !SKIP.has(n))
      .sort();
  }

  console.log(`Migrating ${componentNames.length} component(s) to source-native...\n`);

  let migrated = 0;
  for (const name of componentNames) {
    try {
      if (await migrateComponent(name)) {
        console.log(`  ✓ ${name}`);
        migrated++;
      }
    } catch (err) {
      console.error(`  ✗ ${name}: ${err.message}`);
    }
  }

  console.log(`\nMigrated ${migrated} component(s) to src/components/.\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
