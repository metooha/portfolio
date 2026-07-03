#!/usr/bin/env node
/**
 * Builds the component-viewer project for Builder.
 *
 * ## Builder  (sync/builder/projects/component-viewer/)
 *   - App.tsx is generated from src/App.tsx using react-router-dom (BrowserRouter).
 *   - Pages are copied & transformed into client/pages/.
 *   - Import rewrites:
 *       App.tsx:  './generated/X'   → './components/ld/X'
 *       Pages:   '../generated/X'  → '../components/ld/X'
 *       Assets: replaced with empty-string placeholders.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join, resolve, dirname, extname } from "path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const SRC = join(ROOT, "src");
const BUILDER_OUT = join(ROOT, "sync", "builder", "projects", "component-viewer");

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// ---------------------------------------------------------------------------
// Import rewriting
// ---------------------------------------------------------------------------

/**
 * Rewrite imports for Builder output.
 * Files live at client/<depth-levels>/ and reference components/ld/ components.
 *   depth 0 → client/App.tsx        (ldPrefix = "./components/ld")
 *   depth 1 → client/pages/Foo.tsx  (ldPrefix = "../components/ld")
 */
function rewriteImportsBuilder(source, depth) {
  const ldPrefix = depth === 0 ? "./components/ld" : "../".repeat(depth) + "components/ld";
  let result = source;

  result = result.replace(
    /(from\s+['"])(?:\.\/|\.\.\/)+generated\/([^'"]+)(['"])/g,
    `$1${ldPrefix}/$2$3`
  );
  result = result.replace(
    /(import\s+['"])(?:\.\/|\.\.\/)+generated\/([^'"]+)(['"])/g,
    `$1${ldPrefix}/$2$3`
  );
  result = result.replace(
    /import\s+(\w+)\s+from\s+['"]\.\/assets\/[^'"]+['"];?\n?/g,
    `const $1 = '';\n`
  );
  result = result.replace(
    /import\s+(\w+)\s+from\s+['"]\.\.\/assets\/[^'"]+['"];?\n?/g,
    `const $1 = '';\n`
  );

  return result;
}

// ---------------------------------------------------------------------------
// Shared: copy utils/ (no import rewriting needed — no generated refs)
// ---------------------------------------------------------------------------
function copyUtilities(outBase) {
  const utilsDir = join(SRC, "utils");
  if (!existsSync(utilsDir)) return 0;

  const outUtilsDir = join(outBase);
  ensureDir(outUtilsDir);

  const files = readdirSync(utilsDir).filter(
    (f) => extname(f) === ".ts" || extname(f) === ".tsx"
  );

  for (const file of files) {
    const src = readFileSync(join(utilsDir, file), "utf8");
    const dest = join(outUtilsDir, file);
    writeFileSync(dest, src, "utf8");
  }

  return files.length;
}

// ---------------------------------------------------------------------------
// Builder: copy & transform App.tsx + pages
// ---------------------------------------------------------------------------
function buildBuilderAppTsx() {
  const src = readFileSync(join(SRC, "App.tsx"), "utf8");
  const transformed = rewriteImportsBuilder(src, 0);
  const dest = join(BUILDER_OUT, "client", "App.tsx");
  ensureDir(dirname(dest));
  writeFileSync(dest, transformed, "utf8");
  console.log(`  [builder] App.tsx → ${dest}`);
}

function buildBuilderPages() {
  const pagesDir = join(SRC, "pages");
  const outPagesDir = join(BUILDER_OUT, "client", "pages");
  ensureDir(outPagesDir);

  const files = readdirSync(pagesDir).filter(
    (f) => extname(f) === ".tsx" || extname(f) === ".ts"
  );

  for (const file of files) {
    const src = readFileSync(join(pagesDir, file), "utf8");
    const transformed = rewriteImportsBuilder(src, 1);
    const dest = join(outPagesDir, file);
    writeFileSync(dest, transformed, "utf8");
    console.log(`  [builder] pages/${file} → ${dest}`);
  }

  return files.length;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
console.log("Building component-viewer...\n");
console.log(`Source:          ${SRC}`);
console.log(`Builder output:  ${BUILDER_OUT}\n`);

console.log("── Builder ─────────────────────────────────────────────────");
buildBuilderAppTsx();
const builderPageCount = buildBuilderPages();
const builderUtilsCount = copyUtilities(join(BUILDER_OUT, "client", "utils"));
if (builderUtilsCount) console.log(`  [builder] utils/ → ${builderUtilsCount} file(s)`);

const builderTotal = 1 + builderPageCount + builderUtilsCount;

console.log(`\nDone: ${builderTotal} files written (App.tsx + ${builderPageCount} pages + ${builderUtilsCount} utils)`);
console.log(`\nTo sync builder: cd sync/builder && npx tsx src/cli.ts --dir projects/component-viewer`);
