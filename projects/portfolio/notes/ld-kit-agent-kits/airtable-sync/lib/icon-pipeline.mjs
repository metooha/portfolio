/**
 * Icon Pipeline
 * Downloads SVGs from Airtable icon tokens grouped by theme,
 * generates per-theme woff2 fonts + CSS, and a unified font for base.css.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync, copyFileSync } from 'fs';
import { resolve } from 'path';
import { FIELD_NAMES, ALLOWED_STATUSES, PATHS, CSS_MARKERS, ICON_THEMES } from '../config.mjs';
import { preprocessSvgDir } from './svg-preprocessor.mjs';
import { proxyFetch } from './proxy.mjs';

const F_PRIM = FIELD_NAMES.primitives;

// ─── Helpers ────────────────────────────────────────────────────

function buildDataDictionary(ddRecords) {
  const dict = new Map();
  for (const rec of ddRecords) {
    const term = rec.fields.Term || rec.fields.Name || rec.fields.Value || '';
    if (term) dict.set(rec.id, term);
  }
  return dict;
}

function resolveDataType(record, fieldName, dataDictionary) {
  const linked = record.fields[fieldName];
  if (!linked) return null;
  for (const id of (Array.isArray(linked) ? linked : [linked])) {
    const term = dataDictionary.get(id);
    if (term) return term;
  }
  return null;
}

/** Convert "ld-primitive-icon-arrowDown" → "ArrowDown" */
function tokenNameToIconName(name) {
  const stripped = name.replace(/^[\w]+-(?:primitive|semantic)-icon-/, '');
  return stripped.charAt(0).toUpperCase() + stripped.slice(1);
}

// ─── Token Extraction (theme-based) ────────────────────────────

/**
 * Extract icon tokens grouped by theme.
 * Returns Map<themeKey, icon[]> where each icon has { name, tokenName, svgUrl }.
 */
function extractIconsByTheme(primitives, themes, dataDictionary) {
  // Build theme ID → name lookup
  const themeById = new Map();
  for (const t of themes) themeById.set(t.id, t.fields.Name);

  // Build theme name → theme key lookup
  const themeNameToKey = new Map();
  for (const [key, cfg] of Object.entries(ICON_THEMES)) {
    themeNameToKey.set(cfg.theme, key);
  }

  const result = new Map();
  for (const key of Object.keys(ICON_THEMES)) result.set(key, []);

  for (const rec of primitives) {
    const status = rec.fields[F_PRIM.status];
    if (!ALLOWED_STATUSES.includes(status)) continue;

    const dataType = resolveDataType(rec, F_PRIM.dataType, dataDictionary);
    if (!dataType || !/icon/i.test(dataType)) continue;

    const tokenName = rec.fields[F_PRIM.name];
    if (!tokenName) continue;

    const iconName = tokenNameToIconName(tokenName);
    const index = rec.fields.Index;
    if (!Array.isArray(index)) continue;

    // Read SVG attachment
    let svgUrl = null;
    const svgField = rec.fields[F_PRIM.svg];
    if (Array.isArray(svgField) && svgField.length > 0 && svgField[0].url) {
      svgUrl = svgField[0].url;
    }

    // Assign to each theme this icon belongs to
    for (const themeId of index) {
      const themeName = themeById.get(themeId);
      if (!themeName) continue;
      const themeKey = themeNameToKey.get(themeName);
      if (!themeKey) continue;
      const group = result.get(themeKey);
      // Dedupe within theme by icon name
      if (!group.some(i => i.name === iconName)) {
        group.push({ name: iconName, tokenName, svgUrl });
      }
    }
  }

  return result;
}

// ─── SVG Download (per-theme) ──────────────────────────────────

async function downloadThemeSvgs(iconsByTheme, { refresh = false, verbose = false } = {}) {
  let totalDownloaded = 0, totalCached = 0, totalFailed = 0;
  const CONCURRENCY = 10;

  for (const [themeKey, icons] of iconsByTheme) {
    if (icons.length === 0) continue;
    const themeDir = resolve(PATHS.iconsCache, themeKey);
    mkdirSync(themeDir, { recursive: true });

    let downloaded = 0, cached = 0, failed = 0;

    async function downloadOne(icon) {
      const destPath = resolve(themeDir, `${icon.name}.svg`);
      if (!icon.svgUrl) {
        if (existsSync(destPath)) { cached++; return; }
        failed++;
        return;
      }
      if (!refresh && existsSync(destPath)) { cached++; return; }
      try {
        const res = await proxyFetch(icon.svgUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const svg = await res.text();
        if (!svg.includes('<svg') && !svg.includes('<SVG')) throw new Error('Not SVG');
        writeFileSync(destPath, svg);
        downloaded++;
      } catch (err) {
        failed++;
        if (verbose) console.log(`      ✗ ${icon.name}: ${err.message}`);
      }
    }

    for (let i = 0; i < icons.length; i += CONCURRENCY) {
      await Promise.all(icons.slice(i, i + CONCURRENCY).map(downloadOne));
    }

    const cfg = ICON_THEMES[themeKey];
    if (verbose || downloaded > 0) {
      console.log(`    ${cfg.label}: ${downloaded} downloaded, ${cached} cached, ${failed} failed`);
    }
    totalDownloaded += downloaded;
    totalCached += cached;
    totalFailed += failed;
  }

  console.log(`  SVG totals: ${totalDownloaded} downloaded, ${totalCached} cached, ${totalFailed} failed`);
  return { totalDownloaded, totalCached, totalFailed };
}

// ─── Font Generation ────────────────────────────────────────────

export async function generateIconFont(svgDir, codepoints) {
  const fantasticon = await import('fantasticon');
  const generateFonts = fantasticon.generateFonts || fantasticon.default;

  const svgFiles = readdirSync(svgDir).filter(f => f.endsWith('.svg'));
  if (svgFiles.length === 0) return null;

  const availableNames = new Set(svgFiles.map(f => f.replace('.svg', '')));
  const codepointsObj = {};
  for (const [name, cp] of codepoints) {
    if (availableNames.has(name)) codepointsObj[name] = cp;
  }

  const outputDir = resolve(svgDir, '../font-output-tmp');
  if (existsSync(outputDir)) rmSync(outputDir, { recursive: true });
  mkdirSync(outputDir, { recursive: true });

  await generateFonts({
    inputDir: svgDir,
    outputDir,
    name: 'Icons',
    fontTypes: ['woff2'],
    assetTypes: ['json'],
    codepoints: codepointsObj,
    fontHeight: 1000,
    normalize: true,
    selector: '.icon',
    prefix: 'icon',
  });

  const woff2Path = resolve(outputDir, 'Icons.woff2');
  if (!existsSync(woff2Path)) {
    rmSync(outputDir, { recursive: true });
    return null;
  }

  const woff2Buffer = readFileSync(woff2Path);
  let finalCodepoints = new Map(Object.entries(codepointsObj));
  const jsonPath = resolve(outputDir, 'Icons.json');
  if (existsSync(jsonPath)) {
    const gen = JSON.parse(readFileSync(jsonPath, 'utf-8'));
    finalCodepoints = new Map(Object.entries(gen));
  }

  rmSync(outputDir, { recursive: true });
  return { woff2Buffer, codepoints: finalCodepoints };
}

// ─── Per-Theme Font + CSS Generation ────────────────────────────

function assignCodepoints(iconNames) {
  const codepoints = new Map();
  let cp = 0xf101;
  for (const name of [...iconNames].sort()) {
    codepoints.set(name, cp++);
  }
  return codepoints;
}

function writeThemeFontCss(themeKey, cfg, codepoints, woff2Base64) {
  const fontDir = resolve(PATHS.fontsDir, cfg.dir);
  mkdirSync(fontDir, { recursive: true });

  // Write woff2 file
  writeFileSync(resolve(fontDir, `${cfg.fontName}.woff2`), Buffer.from(woff2Base64, 'base64'));

  // Generate font.css
  const sorted = [...codepoints.entries()].sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
  );

  const glyphRules = sorted
    .map(([name, cp]) => `.${cfg.cssClass}.${cfg.cssClass}-${name}:before{content:"\\${cp.toString(16)}"}`)
    .join('\n');

  const fontCss = `/* ${cfg.label} Icon Font */

@font-face {
  font-display: swap;
  font-family: '${cfg.fontName}Icons';
  font-style: normal;
  src: url('data:font/woff2;base64,${woff2Base64}') format('woff2');
}

.${cfg.cssClass} {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font: normal normal normal 16px/1 ${cfg.fontName}Icons;
  font-size: inherit;
}

/* ${sorted.length} icon glyphs */
${glyphRules}
`;

  writeFileSync(resolve(fontDir, 'font.css'), fontCss);
}

function writeThemeFontComponent(themeKey, cfg, codepoints, woff2Base64) {
  const fontDir = resolve(PATHS.fontsDir, cfg.dir);
  const sorted = [...codepoints.entries()].sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
  );

  const codepointEntries = sorted
    .map(([name, code]) => {
      const key = /^\d/.test(name) ? `'${name}'` : name;
      return `  ${key}: '\\u${code.toString(16)}',`;
    })
    .join('\n');

  const componentName = cfg.fontName;
  const source = `'use client';

export const ${componentName.toUpperCase()}_ICON_CODEPOINTS: Record<string, string> = {
${codepointEntries}
};
`;

  writeFileSync(resolve(fontDir, `${cfg.fontName}Icons.tsx`), source);
}

async function generateThemeFonts(iconsByTheme, { verbose = false } = {}) {
  const themeCodepoints = new Map();

  for (const [themeKey, icons] of iconsByTheme) {
    const cfg = ICON_THEMES[themeKey];

    // Assemble SVGs from inheritance chain: base ancestors first, then this theme last
    const mergedDir = resolve(PATHS.iconsCache, `_merged-${themeKey}`);
    if (existsSync(mergedDir)) rmSync(mergedDir, { recursive: true });
    mkdirSync(mergedDir, { recursive: true });

    // Layer ancestor SVGs (in order), then this theme's own SVGs on top
    const layers = [...(cfg.inherits || []), themeKey];
    let layerCount = 0;
    for (const layerKey of layers) {
      const layerDir = resolve(PATHS.iconsCache, layerKey);
      if (!existsSync(layerDir)) continue;
      for (const f of readdirSync(layerDir).filter(f => f.endsWith('.svg'))) {
        copyFileSync(resolve(layerDir, f), resolve(mergedDir, f)); // overwrites = override
      }
      layerCount++;
    }

    const svgFiles = readdirSync(mergedDir).filter(f => f.endsWith('.svg'));
    if (svgFiles.length === 0) {
      if (verbose) console.log(`    ${cfg.label}: no SVGs, skipping`);
      rmSync(mergedDir, { recursive: true });
      continue;
    }

    // Preprocess SVGs: convert evenodd fill-rule to nonzero winding
    preprocessSvgDir(mergedDir, { verbose });

    const iconNames = svgFiles.map(f => f.replace('.svg', ''));
    const codepoints = assignCodepoints(iconNames);

    const result = await generateIconFont(mergedDir, codepoints);
    rmSync(mergedDir, { recursive: true });
    if (!result) {
      console.log(`    ${cfg.label}: font generation failed`);
      continue;
    }

    const woff2Base64 = result.woff2Buffer.toString('base64');
    const finalCodepoints = result.codepoints;
    themeCodepoints.set(themeKey, finalCodepoints);

    writeThemeFontCss(themeKey, cfg, finalCodepoints, woff2Base64);
    writeThemeFontComponent(themeKey, cfg, finalCodepoints, woff2Base64);
    console.log(`    ${cfg.label}: ${finalCodepoints.size} icons, ${(result.woff2Buffer.length / 1024).toFixed(1)} KB`);
  }

  // Write manifest
  const manifest = {};
  for (const [themeKey, codepoints] of themeCodepoints) {
    const cfg = ICON_THEMES[themeKey];
    manifest[themeKey] = {
      label: cfg.label,
      fontFamily: `${cfg.fontName}Icons`,
      cssClass: cfg.cssClass,
      count: codepoints.size,
      icons: [...codepoints.keys()].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
    };
  }
  mkdirSync(PATHS.fontsDir, { recursive: true });
  writeFileSync(PATHS.iconManifestPath, JSON.stringify(manifest, null, 2));

  // Write barrel export
  const activeKeys = [...themeCodepoints.keys()];
  const lines = activeKeys.map(key => {
    const cfg = ICON_THEMES[key];
    return `export * from './${cfg.dir}/${cfg.fontName}Icons';`;
  });
  writeFileSync(resolve(PATHS.fontsDir, 'index.ts'), lines.join('\n') + '\n');

  // Write index.css with all font imports (text + icon)
  const textImports = [
    "@import './everyday-sans/font.css';",
    "@import './everyday-sans-mono/font.css';",
    "@import './gibson/font.css';",
    "@import './bogle/font.css';",
  ];
  const iconImports = activeKeys.map(key => {
    const cfg = ICON_THEMES[key];
    return `@import './${cfg.dir}/font.css';`;
  });
  const indexCss = `/* Living Design Font System */\n\n/* Text fonts */\n${textImports.join('\n')}\n\n/* Icon fonts (per theme) */\n${iconImports.join('\n')}\n`;
  writeFileSync(resolve(PATHS.fontsDir, 'index.css'), indexCss);

  console.log(`  Manifest: ${activeKeys.length} theme fonts → ${PATHS.iconManifestPath}`);
  return themeCodepoints;
}

// ─── Unified Font (base.css) ────────────────────────────────────

function readExistingCodepoints() {
  try {
    const css = readFileSync(PATHS.baseCss, 'utf-8');
    const codepoints = new Map();
    const re = /\.ld\.ld-(\w+):before\{content:"\\([0-9a-fA-F]+)"\}/g;
    let match;
    while ((match = re.exec(css)) !== null) {
      codepoints.set(match[1], parseInt(match[2], 16));
    }
    return codepoints;
  } catch { return new Map(); }
}

function assignUnifiedCodepoints(iconNames, existingCodepoints) {
  const assigned = new Map();
  let maxCp = 0xf100;
  for (const cp of existingCodepoints.values()) { if (cp > maxCp) maxCp = cp; }
  let next = maxCp + 1;

  for (const name of iconNames) {
    if (existingCodepoints.has(name)) assigned.set(name, existingCodepoints.get(name));
  }
  for (const name of iconNames.filter(n => !assigned.has(n)).sort()) {
    while ([...assigned.values()].includes(next)) next++;
    assigned.set(name, next++);
  }
  return assigned;
}

export function updateBaseCssIcons(codepoints, woff2Base64) {
  let css = readFileSync(PATHS.baseCss, 'utf-8');

  const fontFace = `@font-face {\n  font-display: swap;\n  font-family: 'LivingDesign';\n  font-style: normal;\n  src: url('data:font/woff2;base64,${woff2Base64}') format('woff2');\n}`;
  const ldBase = `.ld {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  display: inline-block;\n  font: normal normal normal 16px/1 LivingDesign;\n  font-size: inherit;\n}`;
  const fullFont = fontFace + '\n\n' + ldBase;

  const sorted = [...codepoints.entries()].sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
  );
  const glyphs = sorted.map(([n, cp]) => `.ld.ld-${n}:before{content:"\\${cp.toString(16)}"}`).join('\n');

  // Marker-based replacement
  const fs1 = css.indexOf(CSS_MARKERS.iconFontStart);
  const fe1 = css.indexOf(CSS_MARKERS.iconFontEnd);
  if (fs1 !== -1 && fe1 !== -1) {
    css = css.substring(0, fs1 + CSS_MARKERS.iconFontStart.length) + '\n' + fullFont + '\n' + css.substring(fe1);
  }
  const gs1 = css.indexOf(CSS_MARKERS.iconGlyphsStart);
  const ge1 = css.indexOf(CSS_MARKERS.iconGlyphsEnd);
  if (gs1 !== -1 && ge1 !== -1) {
    css = css.substring(0, gs1 + CSS_MARKERS.iconGlyphsStart.length) + '\n' + glyphs + '\n' + css.substring(ge1);
  }

  writeFileSync(PATHS.baseCss, css);
}

// ─── Main Entry Point ───────────────────────────────────────────

export async function pullIcons(data, { refresh = false, verbose = false } = {}) {
  const { primitives, themes, dataDictionary: ddRecords } = data;
  const dataDictionary = buildDataDictionary(ddRecords);

  // Extract icons grouped by theme
  const iconsByTheme = extractIconsByTheme(primitives, themes, dataDictionary);
  let totalIcons = 0;
  for (const [key, icons] of iconsByTheme) {
    if (icons.length > 0) {
      const cfg = ICON_THEMES[key];
      if (verbose) console.log(`  ${cfg.label}: ${icons.length} icons`);
      totalIcons += icons.length;
    }
  }
  console.log(`  Found ${totalIcons} icon tokens across ${[...iconsByTheme.values()].filter(v => v.length > 0).length} themes`);

  if (totalIcons === 0) {
    console.log('  No icon tokens found');
    return;
  }

  // Download SVGs per theme
  console.log('  Downloading SVGs...');
  const stats = await downloadThemeSvgs(iconsByTheme, { refresh, verbose });

  // Bail out if nothing landed — otherwise we'd overwrite the manifest/font CSS
  // with empty output. Most likely cause: stale snapshot with expired Airtable
  // attachment URLs.
  if (stats.totalDownloaded === 0 && stats.totalCached === 0) {
    throw new Error(
      `All ${stats.totalFailed} icon SVG downloads failed — refusing to write empty fonts.\n` +
        `  Most likely the Airtable snapshot has expired attachment URLs (signed URLs from\n` +
        `  airtableusercontent.com expire ~2h after issue).\n` +
        `\n` +
        `  To recover:\n` +
        `    1. Re-run with --refresh:  npm run airtable:pull-icons -- --refresh\n` +
        `    2. If that still fails, delete the snapshot and retry:\n` +
        `         rm airtable-sync/cache/snapshot.json && npm run airtable:pull-icons\n` +
        `    3. Revert any empty manifest/font output from this run:\n` +
        `         git checkout -- src/fonts/icon-manifest.json src/fonts/index.css src/fonts/index.ts\n`
    );
  }

  // Build unified font from ALL SVGs (for base.css)
  // Collect all unique SVGs into a flat temp dir (first theme wins for shared names)
  const unifiedDir = resolve(PATHS.iconsCache, '_unified');
  if (existsSync(unifiedDir)) rmSync(unifiedDir, { recursive: true });
  mkdirSync(unifiedDir, { recursive: true });

  const seen = new Set();
  for (const themeKey of Object.keys(ICON_THEMES)) {
    const themeDir = resolve(PATHS.iconsCache, themeKey);
    if (!existsSync(themeDir)) continue;
    for (const f of readdirSync(themeDir).filter(f => f.endsWith('.svg'))) {
      if (!seen.has(f)) {
        seen.add(f);
        copyFileSync(resolve(themeDir, f), resolve(unifiedDir, f));
      }
    }
  }

  // Preprocess unified SVGs
  preprocessSvgDir(unifiedDir, { verbose });

  const allNames = [...seen].map(f => f.replace('.svg', ''));
  console.log(`  ${allNames.length} unique icons for unified font`);

  const existingCp = readExistingCodepoints();
  const unifiedCp = assignUnifiedCodepoints(allNames, existingCp);

  console.log('  Generating unified font...');
  const unified = await generateIconFont(unifiedDir, unifiedCp);
  rmSync(unifiedDir, { recursive: true });

  if (unified) {
    const b64 = unified.woff2Buffer.toString('base64');
    updateBaseCssIcons(unified.codepoints, b64);
    console.log(`  Unified: ${unified.codepoints.size} icons, ${(unified.woff2Buffer.length / 1024).toFixed(1)} KB`);
  }

  // Generate per-theme fonts
  console.log('\n  Generating per-theme fonts...');
  await generateThemeFonts(iconsByTheme, { verbose });
}
