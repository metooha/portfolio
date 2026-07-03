#!/usr/bin/env node

/**
 * Portable build script.
 *
 * Mirrors src/components/ 1:1 into sync targets (Builder + Skill). The output
 * preserves the structure (components live at the root; patterns live under
 * patterns/; common/ holds internal helpers) so generated code visibly
 * distinguishes atomic components from composed patterns.
 *
 * What this script does:
 *   1. Copies every file under src/components/ (.tsx/.ts/.css/.md) into each
 *      sync app dir, preserving the relative path.
 *   2. Prepends `// @refresh reset` + a read-only JSDoc to each component's
 *      main .tsx (e.g. Button/Button.tsx).
 *   3. Generates a top-level index.ts barrel that re-exports every component.
 *   4. Syncs shared helper files (Theming.tsx, Store.tsx, etc.) into sync apps.
 *   5. Generates App.tsx, vite.config.ts, index.html for each sync target.
 *   6. Removes any legacy components/ld/ tree left from the previous layout.
 *
 * Source imports already resolve correctly under a 1:1 layout
 * (e.g. Button/Button.tsx → '../common/cx'), so no import rewriting.
 *
 * Component-specific contracts (called out here because they affect downstream
 * consumers of the synced output):
 *   - Tag: `children` is typed `number` and a runtime check rejects anything
 *     that isn't an integer. Tag is for numeric counts ONLY. Strings,
 *     fragments, or other ReactNode are not allowed — see
 *     src/components/Tag/Tag.tsx and the integer-only callout in the synced
 *     Tag.md (sourced from libs/react/src/Tag/Tag.md). For text content,
 *     consumers must use Badge or Chip.
 *
 * Usage:
 *   node scripts/build-portable.mjs                   # all components
 *   node scripts/build-portable.mjs Switch Alert Badge # specific components
 */

import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {spawn, execSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import ejs from 'ejs';
import {buildContext} from './build-context.mjs';
import {SANDBOX_INSTANCE_REL} from './sandbox-instance.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..');
const SANDBOX_SKILL_ROOT = path.resolve(ROOT, SANDBOX_INSTANCE_REL);
const SANDBOX_ACTIVE = existsSync(SANDBOX_SKILL_ROOT);
const COMPONENTS_DIR = path.resolve(ROOT, 'src/components');
const PATTERNS_DIR = path.resolve(ROOT, 'src/patterns');
const COMMON_DIR = path.resolve(ROOT, 'src/common');
const HOOKS_DIR = path.resolve(ROOT, 'src/hooks');
const MEDIA_DIR = path.resolve(ROOT, 'src/media');
// Sources walked by discoverComponents — each contributes components with a
// category-prefixed relPath (e.g. 'components/Button', 'patterns/Header').
const COMPONENT_SOURCES = [
  {dir: COMPONENTS_DIR, category: 'components'},
  {dir: PATTERNS_DIR, category: 'patterns'},
];
const GUIDANCE_PATH = path.resolve(SCRIPT_DIR, 'component-guidance.md');
const THEMES_DIR = path.resolve(ROOT, 'src/themes');
const THEME_CSS_PATH = path.resolve(THEMES_DIR, 'base.css');
const STARTER_TEMPLATE_DIR = path.resolve(ROOT, 'sync/starter');
const STARTER_OUTPUT_DIR = path.resolve(ROOT, 'living-design');
// Template files whose names can't live as literal dotfiles in a committed
// source dir (a committed `.gitignore` would alter git's behavior for the
// sync/starter/ subtree). Stored without the dot, renamed on copy.
const STARTER_DOTFILE_RENAMES = {
  gitignore: '.gitignore',
  npmrc: '.npmrc',
  nvmrc: '.nvmrc',
};
const APP_TEMPLATE_PATH = path.resolve(ROOT, 'sync/App.tsx.ejs');
const VITE_CONFIG_TEMPLATE_PATH = path.resolve(ROOT, 'sync/vite.config.ts.ejs');
const INDEX_HTML_TEMPLATE_PATH = path.resolve(ROOT, 'sync/index.html.ejs');
const FONTS_DIR = path.resolve(ROOT, 'src/fonts');
const FONT_SYNC_OUTPUT_DIRS = [
  path.resolve(ROOT, 'sync/builder/projects/living-design/client/fonts'),
  path.resolve(ROOT, 'living-design/src/fonts'),
  ...(SANDBOX_ACTIVE ? [path.resolve(SANDBOX_SKILL_ROOT, 'src/fonts')] : []),
];
const PORTABLE_HELPER_SYNC_GROUPS = [
  {
    sourceDir: path.resolve(ROOT, 'src/utils'),
    allowList: ['Theming.tsx', 'Store.tsx', 'Layout.tsx'],
    outputDirs: [
      path.resolve(ROOT, 'sync/builder/projects/living-design/client/utils'),
      path.resolve(ROOT, 'living-design/src/utils'),
      ...(SANDBOX_ACTIVE ? [path.resolve(SANDBOX_SKILL_ROOT, 'src/utils')] : []),
    ],
  },
  {
    sourceDir: path.resolve(ROOT, 'src/fonts'),
    allowList: ['theme-icon-map.json', 'icon-manifest.json'],
    outputDirs: [
      path.resolve(ROOT, 'sync/builder/projects/living-design/client/fonts'),
      path.resolve(ROOT, 'living-design/src/fonts'),
      ...(SANDBOX_ACTIVE ? [path.resolve(SANDBOX_SKILL_ROOT, 'src/fonts')] : []),
    ],
  },
  {
    sourceDir: path.resolve(ROOT, 'src'),
    allowList: ['vite-env.d.ts'],
    outputDirs: [
      path.resolve(ROOT, 'sync/builder/projects/living-design/client'),
      path.resolve(ROOT, 'living-design/src'),
      ...(SANDBOX_ACTIVE ? [path.resolve(SANDBOX_SKILL_ROOT, 'src')] : []),
    ],
  },
];

// CODE output dirs are now the root of the generated tree (one level up from
// where components used to live). The build writes:
//   <code-out>/components/<Name>/   — atoms, molecules, single components
//   <code-out>/patterns/<Name>/     — composed pattern recipes
//   <code-out>/common/              — internal helpers
//   <code-out>/hooks/               — shared hooks
//   <code-out>/index.ts             — top-level barrel (`@livingdesign/react`)
const DEFAULT_BUILDER_SYNC_APP_DIR = 'sync/builder/projects/living-design/client';
const DEFAULT_SKILL_SYNC_APP_DIR = 'living-design/src';
const DEFAULT_BUILDER_SYNC_STYLES_DIR = 'sync/builder/projects/living-design/client';
const DEFAULT_SKILL_SYNC_STYLES_DIR = 'living-design/src';
const SANDBOX_SKILL_APP_DIR = `${SANDBOX_INSTANCE_REL}/src`;
const SANDBOX_SKILL_STYLES_DIR = `${SANDBOX_INSTANCE_REL}/src`;
const DEFAULT_SYNC_APP_DIRS = [
  DEFAULT_BUILDER_SYNC_APP_DIR,
  DEFAULT_SKILL_SYNC_APP_DIR,
  ...(SANDBOX_ACTIVE ? [SANDBOX_SKILL_APP_DIR] : []),
];
const DEFAULT_SYNC_STYLES_DIRS = [
  DEFAULT_BUILDER_SYNC_STYLES_DIR,
  DEFAULT_SKILL_SYNC_STYLES_DIR,
  ...(SANDBOX_ACTIVE ? [SANDBOX_SKILL_STYLES_DIR] : []),
];

let CODE_OUT_DIRS = [];
let CSS_OUT_DIRS = [];

function runNodeScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [scriptPath], {
      cwd: ROOT,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`node ${path.relative(ROOT, scriptPath)} failed with exit code ${code}`));
    });
  });
}

async function refreshGeneratedFontSources() {
  // LivingDesignIconsFont removed — icon fonts are now loaded via the theming system.
}

function printHelpAndExit() {
  console.log(`
Usage:
  node scripts/build-portable.mjs [options] [ComponentName...]

Options:
  --app-dir              <path>  sync app code output dir (repeatable)
                                 (defaults: ${DEFAULT_SYNC_APP_DIRS.join(', ')})
  --styles-dir           <path>  sync styles output dir (repeatable)
                                 (defaults: ${DEFAULT_SYNC_STYLES_DIRS.join(', ')})
  --help                         Show this help message
`);
  process.exit(0);
}

function parseArgs(rawArgs) {
  const options = {
    appDirs: [...DEFAULT_SYNC_APP_DIRS],
    stylesDirs: [...DEFAULT_SYNC_STYLES_DIRS],
  };
  let hasExplicitAppDirs = false;
  let hasExplicitStylesDirs = false;
  const componentNames = [];

  for (let i = 0; i < rawArgs.length; i += 1) {
    const arg = rawArgs[i];

    if (arg === '--help' || arg === '-h') {
      printHelpAndExit();
    }

    if (arg === '--app-dir') {
      const value = rawArgs[i + 1];
      if (!value || value.startsWith('-')) {
        throw new Error(`Missing value for ${arg}`);
      }
      if (!hasExplicitAppDirs) {
        options.appDirs = [];
        hasExplicitAppDirs = true;
      }
      options.appDirs.push(value);
      i += 1;
      continue;
    }

    if (arg === '--styles-dir') {
      const value = rawArgs[i + 1];
      if (!value || value.startsWith('-')) {
        throw new Error(`Missing value for ${arg}`);
      }
      if (!hasExplicitStylesDirs) {
        options.stylesDirs = [];
        hasExplicitStylesDirs = true;
      }
      options.stylesDirs.push(value);
      i += 1;
      continue;
    }

    if (arg.startsWith('-')) {
      throw new Error(`Unknown option: ${arg}`);
    }

    componentNames.push(arg);
  }

  if (options.appDirs.length === 0) {
    throw new Error('At least one --app-dir must be provided');
  }

  return {options, componentNames};
}

// ---------------------------------------------------------------------------
// Documentation
// ---------------------------------------------------------------------------

let _guidanceCache = null;
async function loadGlobalGuidance() {
  if (_guidanceCache !== null) return _guidanceCache;
  try { _guidanceCache = await fs.readFile(GUIDANCE_PATH, 'utf-8'); }
  catch { _guidanceCache = ''; }
  return _guidanceCache;
}

function renderHardStopJSDoc(componentName, globalGuidance) {
  // Prop APIs and usage narrative live in <Name>.md next to this .tsx
  // (generated by scripts/extract-guidelines.mjs). The JSDoc only carries the
  // "read-only" hard-stop directive so that an agent (or human) opening this
  // file in an editor still sees the no-edit guardrail. Duplicating the
  // narrative here would make Button.md and Button.tsx drift over time.
  const guidance = (globalGuidance ?? '').trim();
  if (!guidance) return '';
  const guidanceLines = guidance.split('\n').map((l) => ` * ${l}`).join('\n');
  return [
    '/**',
    ` * @module ${componentName}`,
    ' *',
    guidanceLines,
    ' *',
    ` * For prop API + usage notes, read \`${componentName}.md\` in this folder`,
    ` * or run \`npx ld-kit show ${componentName}\`.`,
    ' */',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// File helpers
// ---------------------------------------------------------------------------

async function writeIfChanged(filePath, content) {
  try {
    const existing = await fs.readFile(filePath, 'utf-8');
    if (existing === content) return;
  } catch {
    // File doesn't exist yet — write it
  }
  await fs.writeFile(filePath, content, 'utf-8');
}

async function writeCodeToOutputs(filename, content) {
  await Promise.all(CODE_OUT_DIRS.map(async dir => {
    const filePath = path.resolve(dir, filename);
    await fs.mkdir(path.dirname(filePath), {recursive: true});
    await writeIfChanged(filePath, content);
  }));
}

async function writeCssToOutputs(filename, content) {
  await Promise.all(CSS_OUT_DIRS.map(async dir => {
    const filePath = path.resolve(dir, filename);
    await fs.mkdir(path.dirname(filePath), {recursive: true});
    await writeIfChanged(filePath, content);
  }));
}

async function ensureOutDirs() {
  const allDirs = [...new Set([...CODE_OUT_DIRS, ...CSS_OUT_DIRS])];
  await Promise.all(allDirs.map(dir => fs.mkdir(dir, {recursive: true})));
}

// Copies the static starter scaffold (sync/starter/) verbatim into
// living-design/. Every file is a real, browseable source file — to change the
// generated README, package.json, tsconfig, etc., edit the file under
// sync/starter/ directly. Dotfiles are stored without their leading dot (see
// STARTER_DOTFILE_RENAMES) and renamed on copy.
//
// Note: vite-env.d.ts is intentionally NOT part of this template — it's owned
// by PORTABLE_HELPER_SYNC_GROUPS, which syncs the real src/vite-env.d.ts to
// every target (builder, skill, sandbox) from a single source.
async function generateStarterScaffold() {
  console.log('\n  Generating starter scaffold...');

  if (!existsSync(STARTER_TEMPLATE_DIR)) {
    console.log(`  - skipped (missing ${path.relative(ROOT, STARTER_TEMPLATE_DIR)})`);
    return;
  }

  let count = 0;

  async function walk(absDir, relDir) {
    const entries = await fs.readdir(absDir, {withFileTypes: true});
    for (const e of entries) {
      const absPath = path.resolve(absDir, e.name);
      const relPath = relDir ? `${relDir}/${e.name}` : e.name;
      if (e.isDirectory()) {
        await walk(absPath, relPath);
        continue;
      }
      // Top-level dotfile templates are stored without their leading dot.
      const outName = relDir === '' && STARTER_DOTFILE_RENAMES[e.name]
        ? STARTER_DOTFILE_RENAMES[e.name]
        : e.name;
      const outRel = relDir ? `${relDir}/${outName}` : outName;
      const outPath = path.resolve(STARTER_OUTPUT_DIR, outRel);
      const content = await fs.readFile(absPath, 'utf-8');
      await fs.mkdir(path.dirname(outPath), {recursive: true});
      await writeIfChanged(outPath, content);
      count += 1;
    }
  }

  await walk(STARTER_TEMPLATE_DIR, '');
  console.log(`  ✓ ${count} scaffold file${count === 1 ? '' : 's'}`);
}

// Wipe legacy output trees left over from prior layouts so consumers don't
// accidentally resolve against stale modules. Legacy dirs include:
//   - <out>/components/ld/, components/core/, components/CX/, components/shared/
//   - <out>/components/patterns/, components/common/, components/hooks/ (inner-nested form)
//   - <out>/components/index.ts (old barrel location)
// The current layout writes sibling top-level dirs <out>/{components,patterns,common,hooks}/.
async function cleanLegacyLdDirs() {
  const STALE_UNDER_COMPONENTS = ['ld', 'core', 'CX', 'shared', 'patterns', 'common', 'hooks'];
  let removed = 0;
  for (const dir of CODE_OUT_DIRS) {
    const componentsRoot = path.resolve(dir, 'components');
    for (const legacy of STALE_UNDER_COMPONENTS) {
      const p = path.resolve(componentsRoot, legacy);
      try {
        await fs.rm(p, {recursive: true, force: true});
        if (!existsSync(p)) removed += 1;
      } catch {
        // Already gone — fine.
      }
    }
    // Old barrel location.
    const oldBarrel = path.resolve(componentsRoot, 'index.ts');
    try {
      await fs.rm(oldBarrel, {force: true});
    } catch {
      // ignore
    }
  }
  if (removed > 0) {
    console.log(`\n  Removed ${removed} legacy output tree(s).`);
  }
}

async function syncPortableHelpers() {
  console.log('\n  Syncing helper files...');
  let syncedCount = 0;

  for (const group of PORTABLE_HELPER_SYNC_GROUPS) {
    const {sourceDir, allowList, outputDirs} = group;
    for (const fileName of allowList) {
      const sourcePath = path.resolve(sourceDir, fileName);
      let sourceContent = '';

      try {
        sourceContent = await fs.readFile(sourcePath, 'utf-8');
      } catch {
        console.log(
          `  - skipped ${fileName} (missing ${path.relative(ROOT, sourcePath)})`
        );
        continue;
      }

      await Promise.all(outputDirs.map(async (outputDir) => {
        await fs.mkdir(outputDir, {recursive: true});
        const outputPath = path.resolve(outputDir, fileName);
        await writeIfChanged(outputPath, sourceContent);
      }));

      syncedCount += 1;
      console.log(`  ✓ ${fileName}`);
    }
  }

  if (syncedCount === 0) {
    console.log('  - no helper files synced');
  }
}

// ---------------------------------------------------------------------------
// Font directory syncing
// ---------------------------------------------------------------------------

async function syncFontDirs() {
  console.log('\n  Syncing font directories...');
  let syncedCount = 0;

  const entries = await fs.readdir(FONTS_DIR, {withFileTypes: true});

  // Sync root-level index files
  for (const rootFile of ['index.ts', 'index.css']) {
    const sourcePath = path.resolve(FONTS_DIR, rootFile);
    try {
      const content = await fs.readFile(sourcePath, 'utf-8');
      await Promise.all(FONT_SYNC_OUTPUT_DIRS.map(async (dir) => {
        await fs.mkdir(dir, {recursive: true});
        await writeIfChanged(path.resolve(dir, rootFile), content);
      }));
      syncedCount += 1;
      console.log(`  ✓ fonts/${rootFile}`);
    } catch {
      console.log(`  - skipped fonts/${rootFile} (not found)`);
    }
  }

  // Sync font subdirectories (font.css + *Icons.tsx)
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const subdir = entry.name;
    const subdirPath = path.resolve(FONTS_DIR, subdir);
    const files = await fs.readdir(subdirPath);
    // font.css contains base64-embedded woff2 — raw .woff2 files not needed
    const syncable = files.filter(f =>
      f === 'font.css' || f.endsWith('Icons.tsx')
    );

    if (syncable.length === 0) continue;

    for (const file of syncable) {
      const sourcePath = path.resolve(subdirPath, file);
      const content = await fs.readFile(sourcePath, 'utf-8');
      await Promise.all(FONT_SYNC_OUTPUT_DIRS.map(async (dir) => {
        const outDir = path.resolve(dir, subdir);
        await fs.mkdir(outDir, {recursive: true});
        await writeIfChanged(path.resolve(outDir, file), content);
      }));
    }

    syncedCount += syncable.length;
    console.log(`  ✓ fonts/${subdir}/ (${syncable.length} files)`);
  }

  console.log(`  ${syncedCount} font files synced`);
}

// ---------------------------------------------------------------------------
// Directory mirror — recursive 1:1 copy from a src/ dir to its same-named
// output subdir. Used for common/ and hooks/.
// ---------------------------------------------------------------------------

// Removes output directories under `components/` and `patterns/` that have no
// matching source. Without this, deleting or renaming a component dir leaves
// stale files in the published kit (every consumer would still see the old
// directory + barrel pollution) until someone manually wiped them. Called
// after discoverComponents and before buildComponent so each build is a 1:1
// mirror of the current source tree.
async function pruneOrphanedComponentDirs(components) {
  const keep = {
    components: new Set(),
    patterns: new Set(),
  };
  for (const c of components) {
    // c.relPath is e.g. "components/Button" or "patterns/Header".
    const [category, ...rest] = c.relPath.split('/');
    if (category in keep && rest.length > 0) {
      keep[category].add(rest[0]);
    }
  }

  let pruned = 0;
  for (const outDir of CODE_OUT_DIRS) {
    for (const category of Object.keys(keep)) {
      const categoryRoot = path.resolve(outDir, category);
      if (!existsSync(categoryRoot)) continue;
      const entries = await fs.readdir(categoryRoot, {withFileTypes: true});
      for (const e of entries) {
        if (!e.isDirectory()) continue;
        if (keep[category].has(e.name)) continue;
        await fs.rm(path.resolve(categoryRoot, e.name), {
          recursive: true,
          force: true,
        });
        pruned += 1;
      }
    }
  }
  if (pruned > 0) {
    console.log(`  ✓ pruned ${pruned} orphaned component dir(s)`);
  }
}

async function copySrcDir(srcDir, outRel) {
  if (!existsSync(srcDir)) {
    console.log(`  - skipped ${outRel}/ (missing ${path.relative(ROOT, srcDir)})`);
    return;
  }

  // Make the output dir a 1:1 mirror of the source. Without this step, files
  // that were removed from the source would persist in the published kit (the
  // file walk only adds + overwrites). Concretely: when `common/VisuallyHidden.tsx`
  // is deleted from source, the prior output copy must also disappear.
  for (const outDir of CODE_OUT_DIRS) {
    const outPath = path.resolve(outDir, outRel);
    await fs.rm(outPath, {recursive: true, force: true});
  }

  let count = 0;

  async function walk(absDir, relDir) {
    const entries = await fs.readdir(absDir, {withFileTypes: true});
    for (const e of entries) {
      const absPath = path.resolve(absDir, e.name);
      const relPath = relDir ? `${relDir}/${e.name}` : e.name;
      if (e.isDirectory()) {
        await walk(absPath, relPath);
        continue;
      }
      if (e.name.endsWith('.test.tsx') || e.name.endsWith('.stories.tsx')) continue;
      const content = await fs.readFile(absPath, 'utf-8');
      await writeCodeToOutputs(`${outRel}/${relPath}`, content);
      count += 1;
    }
  }

  try {
    await walk(srcDir, '');
    console.log(`  ✓ ${outRel}/ (${count} file${count === 1 ? '' : 's'})`);
  } catch (err) {
    console.log(`  - ${outRel}/ copy failed: ${err.message}`);
  }
}

async function copyCommonDir() {
  console.log('  Copying common/...');
  await copySrcDir(COMMON_DIR, 'common');
}

async function copyHooksDir() {
  console.log('  Copying hooks/...');
  await copySrcDir(HOOKS_DIR, 'hooks');
}

async function copyMediaDir() {
  console.log('  Copying media/...');
  await copySrcDir(MEDIA_DIR, 'media');
}

// ---------------------------------------------------------------------------
// Component builder — copies source files preserving the category subpath
// ---------------------------------------------------------------------------

async function buildComponent({name: componentName, relPath, dir: componentDir}) {
  const entries = await fs.readdir(componentDir, {withFileTypes: true}).catch(() => []);
  if (entries.length === 0) {
    console.log(`  - ${componentName}: no files`);
    return;
  }

  const globalGuidance = await loadGlobalGuidance();
  const jsDoc = renderHardStopJSDoc(componentName, globalGuidance);

  // Walk the component dir recursively so any nested subfolders (helpers,
  // assets, etc.) get mirrored 1:1.
  async function walk(absDir, relDir) {
    const dirEntries = await fs.readdir(absDir, {withFileTypes: true});
    for (const e of dirEntries) {
      const absPath = path.resolve(absDir, e.name);
      const subRel = relDir ? `${relDir}/${e.name}` : e.name;
      if (e.isDirectory()) {
        await walk(absPath, subRel);
        continue;
      }
      if (e.name.startsWith('.')) continue;
      if (e.name.endsWith('.test.tsx') || e.name.endsWith('.stories.tsx')) continue;
      if (e.name.endsWith('.css')) continue; // CSS handled in buildCSS
      // Kit-local <Name>.md files are NARRATIVE INPUTS for
      // scripts/extract-guidelines.mjs (it folds them into the generated
      // per-component doc). They are not runtime artifacts — skip copying
      // them here, or they'd overwrite the generated <Name>.md that
      // extract-guidelines already wrote to the same output path.
      if (relDir === '' && e.name === `${componentName}.md`) continue;

      let content = await fs.readFile(absPath, 'utf-8');
      const isMainTsx = relDir === '' && e.name === `${componentName}.tsx`;

      if (isMainTsx) {
        const hasUseClient = content.includes("'use client'");
        const block = jsDoc ? `// @refresh reset\n\n${jsDoc}\n` : '// @refresh reset\n';
        if (hasUseClient) {
          content = content.replace(
            /^['"]use client['"];\s*\n/m,
            `'use client';\n${block}\n`
          );
        } else {
          content = `${block}\n${content}`;
        }
      }

      await writeCodeToOutputs(`${relPath}/${subRel}`, content);
    }
  }

  await walk(componentDir, '');
  console.log(`  ✓ ${relPath}`);
}

// ---------------------------------------------------------------------------
// Per-component CSS copying — preserves the relPath under the output dir.
// ---------------------------------------------------------------------------

async function buildCSS(components) {
  console.log('\n  Copying per-component CSS files...');

  // Theme CSS lives at src/themes/ and gets copied to <styles-dir>/themes/
  try {
    const themeFiles = (await fs.readdir(THEMES_DIR))
      .filter(f => f.endsWith('.css'));
    for (const themeFile of themeFiles) {
      const content = await fs.readFile(path.resolve(THEMES_DIR, themeFile), 'utf-8');
      await writeCssToOutputs(`themes/${themeFile}`, content);
    }
    console.log(`  ✓ ${themeFiles.length} theme CSS files copied to themes/`);
  } catch (err) {
    console.log(`  - theme CSS copy failed: ${err.message}`);
  }

  let cssCount = 0;
  for (const {relPath, dir} of components) {
    // Mirror every .css file inside the component dir (most components have one,
    // but some bundle more).
    const entries = await fs.readdir(dir, {withFileTypes: true}).catch(() => []);
    for (const e of entries) {
      if (!e.isFile() || !e.name.endsWith('.css')) continue;
      const css = await fs.readFile(path.resolve(dir, e.name), 'utf-8');
      await writeCodeToOutputs(`${relPath}/${e.name}`, css);
      cssCount += 1;
    }
  }

  console.log(`  ✓ ${cssCount} component CSS files copied`);
}

// ---------------------------------------------------------------------------
// living-design.css generation — unified CSS entry point for sync targets
// ---------------------------------------------------------------------------

async function generateLivingDesignCSS() {
  console.log('\n  Generating living-design.css...');

  for (let i = 0; i < CSS_OUT_DIRS.length; i++) {
    const cssDir = path.resolve(CSS_OUT_DIRS[i]);

    // Compute relative path from CSS output dir to fonts index.css
    // Fonts are synced to FONT_SYNC_OUTPUT_DIRS by syncFontDirs
    let fontImportLine = '';
    if (i < FONT_SYNC_OUTPUT_DIRS.length) {
      const fontsIndexPath = path.resolve(FONT_SYNC_OUTPUT_DIRS[i], 'index.css');
      const relFontsIndex = path.relative(cssDir, fontsIndexPath).split(path.sep).join('/');
      fontImportLine = `@import '${relFontsIndex}';`;
    }

    const lines = [
      '/* Living Design */',
      '',
      '/* Icon & text fonts */',
      fontImportLine,
      '',
      '/* Theme system (base tokens + per-theme overrides) */',
      `@import './themes/index.css';`,
      '',
    ].filter(l => l !== undefined);

    const outputPath = path.resolve(cssDir, 'living-design.css');
    await writeIfChanged(outputPath, lines.join('\n'));
    console.log(`  ✓ ${path.relative(ROOT, outputPath)}`);
  }
}

// ---------------------------------------------------------------------------
// Sync App.tsx generation
// ---------------------------------------------------------------------------

const SYNC_APP_TARGETS = [
  {
    outputPath: 'sync/builder/projects/living-design/client/App.tsx',
    utilsImportPrefix: './utils',
    guidelinesRef: '.builder/rules/component-communication.mdc',
  },
  {
    outputPath: 'living-design/src/App.tsx',
    utilsImportPrefix: './utils',
    guidelinesRef: '.cursor/rules/component-communication.mdc',
  },
  ...(SANDBOX_ACTIVE ? [{
    outputPath: `${SANDBOX_INSTANCE_REL}/src/App.tsx`,
    utilsImportPrefix: './utils',
    guidelinesRef: '.cursor/rules/component-communication.mdc',
    // Sandbox is agent-authored: if an App.tsx already exists, it likely
    // renders the page the agent just built. Don't clobber it on rebuild.
    // `test:local:reset` is the way to restore the template default.
    preserveIfExists: true,
  }] : []),
];

async function generateSyncAppFiles() {
  console.log('\n  Generating sync App.tsx files...');

  const template = await fs.readFile(APP_TEMPLATE_PATH, 'utf-8');

  let sha = 'unknown';
  try {
    sha = execSync('git rev-parse --short HEAD', {cwd: ROOT, encoding: 'utf-8'}).trim();
  } catch {
    console.log('  - could not read git SHA, using "unknown"');
  }

  for (const target of SYNC_APP_TARGETS) {
    const outputPath = path.resolve(ROOT, target.outputPath);
    if (target.preserveIfExists && existsSync(outputPath)) {
      console.log(`  • ${target.outputPath} (preserved — agent-authored)`);
      continue;
    }
    const content = ejs.render(template, {...target, sha});
    await writeIfChanged(outputPath, content);
    console.log(`  ✓ ${target.outputPath}`);
  }
}

// ---------------------------------------------------------------------------
// Sync vite.config.ts generation
// ---------------------------------------------------------------------------

const SYNC_VITE_CONFIG_TARGETS = [
  {
    outputPath: 'sync/builder/projects/living-design/vite.config.ts',
    target: 'builder',
    componentExcludePattern: 'client\\/(components|patterns|common|hooks)\\/.*',
    ldAlias: './client/index.ts',
  },
  {
    outputPath: 'living-design/vite.config.ts',
    target: 'skill',
    componentExcludePattern: 'src\\/(components|patterns|common|hooks)\\/.*',
    ldAlias: 'src/index.ts',
  },
  ...(SANDBOX_ACTIVE ? [{
    outputPath: `${SANDBOX_INSTANCE_REL}/vite.config.ts`,
    target: 'skill',
    componentExcludePattern: 'src\\/(components|patterns|common|hooks)\\/.*',
    ldAlias: 'src/index.ts',
  }] : []),
];

async function generateSyncViteConfigs() {
  console.log('\n  Generating sync vite.config.ts files...');

  const template = await fs.readFile(VITE_CONFIG_TEMPLATE_PATH, 'utf-8');

  for (const target of SYNC_VITE_CONFIG_TARGETS) {
    const content = ejs.render(template, target);
    const outputPath = path.resolve(ROOT, target.outputPath);
    await writeIfChanged(outputPath, content);
    console.log(`  ✓ ${target.outputPath}`);
  }
}

// ---------------------------------------------------------------------------
// Sync index.html generation
// ---------------------------------------------------------------------------

const SYNC_INDEX_HTML_TARGETS = [
  {
    outputPath: 'sync/builder/projects/living-design/index.html',
    entryScript: 'client/main.tsx',
  },
  {
    outputPath: 'living-design/index.html',
    entryScript: 'src/main.tsx',
  },
  ...(SANDBOX_ACTIVE ? [{
    outputPath: `${SANDBOX_INSTANCE_REL}/index.html`,
    entryScript: 'src/main.tsx',
  }] : []),
];

async function generateSyncIndexHtml() {
  console.log('\n  Generating sync index.html files...');

  const template = await fs.readFile(INDEX_HTML_TEMPLATE_PATH, 'utf-8');

  for (const target of SYNC_INDEX_HTML_TARGETS) {
    const content = ejs.render(template, target);
    const outputPath = path.resolve(ROOT, target.outputPath);
    await writeIfChanged(outputPath, content);
    console.log(`  ✓ ${target.outputPath}`);
  }
}

// ---------------------------------------------------------------------------
// Component discovery (multi-source)
//
// Walks every COMPONENT_SOURCES root (src/components/ and src/patterns/). A
// component is a directory that contains a .tsx, .css, or index.ts. The
// returned `relPath` is category-prefixed: 'components/Button' or
// 'patterns/Header'.
// ---------------------------------------------------------------------------

async function discoverComponents(requested) {
  async function walk(dir, relDir) {
    if (!existsSync(dir)) return [];
    const entries = await fs.readdir(dir, {withFileTypes: true});
    const results = [];
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const full = path.resolve(dir, e.name);
      const subRel = relDir ? `${relDir}/${e.name}` : e.name;
      const children = await fs.readdir(full);
      const hasComponent = children.some(c =>
        (c.endsWith('.tsx') && !c.endsWith('.test.tsx') && !c.endsWith('.stories.tsx')) ||
        c.endsWith('.css') ||
        c === 'index.ts'
      );
      if (hasComponent) {
        results.push({name: e.name, relPath: subRel, dir: full});
      } else {
        // Organizational directory — recurse.
        results.push(...await walk(full, subRel));
      }
    }
    return results;
  }

  const all = [];
  for (const source of COMPONENT_SOURCES) {
    const found = await walk(source.dir, source.category);
    all.push(...found);
  }
  all.sort((a, b) => a.relPath.localeCompare(b.relPath));

  if (requested.length > 0) {
    return all.filter(c => requested.includes(c.name));
  }
  return all;
}

// ---------------------------------------------------------------------------
// Barrel file generation — creates index.ts for @livingdesign/react alias
// ---------------------------------------------------------------------------

const BARREL_SKIP_RELPATHS = new Set([
  // DatePicker already exports DatePickerCalendar + DatePickerCalendarProps.
  // Re-exporting the standalone DatePickerCalendar module from the top-level
  // barrel causes TS2308 duplicate-export errors in scaffolded projects.
  'components/DatePickerCalendar',
]);

async function generateBarrelFile(components) {
  console.log('\n  Generating index.ts barrel file...');

  const lines = [
    '/**',
    ' * Living Design component barrel.',
    ' */',
    '',
    "export * from './common';",
    '',
  ];

  let currentCategory = '';
  for (const {relPath} of components) {
    if (BARREL_SKIP_RELPATHS.has(relPath)) continue;

    const category = relPath.includes('/') ? relPath.split('/')[0] : 'components';
    if (category !== currentCategory) {
      if (currentCategory) lines.push('');
      lines.push(`// ${category}`);
      currentCategory = category;
    }
    lines.push(`export * from './${relPath}';`);
  }
  lines.push('');

  await writeCodeToOutputs('index.ts', lines.join('\n'));
  console.log('  ✓ index.ts');
}

// ---------------------------------------------------------------------------
// Drift detector — warns when a discovered component has no viewer nav entry.
//
// src/pages/navigation.ts is the source of truth for the dev viewer's sidebar.
// New components added under src/components/ or src/patterns/ should usually
// get a corresponding nav item so they're discoverable in the viewer. The
// skip-list covers intentional internals (providers, dev tooling, utilities)
// that have no consumer-facing demo.
// ---------------------------------------------------------------------------

const NAV_SKIP_COMPONENTS = new Set([
  'A11yAnnouncement',      // context provider, no demo
  'A11yDevAssertions',     // dev-only runtime scanner
  'DefaultBreakpoint',     // layout utility
  'FocusTrap',             // a11y utility composed inside other components
  'LayoutContainer',       // layout primitive used internally
  'Overlay',               // shared scrim used inside Modal/Panel/BottomSheet
  'SsrBoundary',           // SSR-safety wrapper used inside other components
  'VisuallyHidden',        // utility wrapper (no standalone demo)
  'Text',                  // exports Body/Caption/Display/Heading — demoed indirectly
]);

function toKebabId(pascalName) {
  return pascalName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

async function checkNavCoverage(components) {
  const navPath = path.resolve(ROOT, 'src/pages/navigation.ts');
  let navText;
  try {
    navText = await fs.readFile(navPath, 'utf-8');
  } catch {
    console.log('\n  ! drift check skipped (cannot read navigation.ts)');
    return;
  }

  const navIds = new Set(
    [...navText.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1])
  );

  // Patterns aggregate multiple variants into one demo page (e.g. FooterPage
  // demos DesktopFooter + MwebFooter + Footer; OrderCardPatternsPage demos 8
  // variant cards). Drift-check only the components/ category — patterns are
  // intentionally fewer nav entries than physical components.
  //
  // A component is considered covered if EITHER:
  //   - its prefixed id `components-<kebab>` is in nav, OR
  //   - a bare id `<kebab>` is in nav (top-level routes like `icons`)
  const missing = [];
  for (const c of components) {
    if (NAV_SKIP_COMPONENTS.has(c.name)) continue;
    const [category] = c.relPath.split('/');
    if (category !== 'components') continue;
    const kebab = toKebabId(c.name);
    const prefixedId = `components-${kebab}`;
    if (navIds.has(prefixedId) || navIds.has(kebab)) continue;
    missing.push({name: c.name, expectedId: prefixedId});
  }

  if (missing.length === 0) {
    console.log('\n  ✓ Nav coverage: every primitive component has a viewer nav entry.');
    return;
  }

  console.log(`\n  ! Nav coverage: ${missing.length} primitive component(s) missing from src/pages/navigation.ts:`);
  for (const m of missing) {
    console.log(`      ${m.name} — expected id "${m.expectedId}"`);
  }
  console.log('  (Either add a nav item + page, or extend NAV_SKIP_COMPONENTS in build-portable.mjs.)');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const {options, componentNames: requestedComponents} = parseArgs(process.argv.slice(2));

  CODE_OUT_DIRS = [...new Set(options.appDirs.map(dir => path.resolve(ROOT, dir)))];
  CSS_OUT_DIRS = [...new Set(options.stylesDirs.map(dir => path.resolve(ROOT, dir)))];

  await ensureOutDirs();
  await cleanLegacyLdDirs();
  await generateStarterScaffold();
  await syncPortableHelpers();
  await syncFontDirs();
  await runNodeScript(path.resolve(SCRIPT_DIR, 'extract-guidelines.mjs'));
  await buildContext();
  await copyCommonDir();
  await copyHooksDir();
  await copyMediaDir();
  await generateSyncAppFiles();
  await generateSyncViteConfigs();
  await generateSyncIndexHtml();

  const components = await discoverComponents(requestedComponents);
  await pruneOrphanedComponentDirs(components);
  console.log(`\nBuilding ${components.length} component(s)...\n`);

  for (const comp of components) {
    try {
      await buildComponent(comp);
    } catch (err) {
      console.error(`  ✗ ${comp.name}: ${err.message}`);
    }
  }

  await buildCSS(components);
  await generateLivingDesignCSS();
  await generateBarrelFile(components);
  await checkNavCoverage(components);

  console.log('\nDone.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
