/**
 * Media Pipeline
 * Pulls brand-media assets (SVG + PNG) from the Airtable primitives table
 * (rows whose Data Type resolves to "media") and emits per-tenant TypeScript
 * modules under `src/media/`. Each module exports:
 *   - `<TENANT>_MEDIA_SVGS`    — PascalCase name → inline SVG string
 *   - `<TENANT>_MEDIA_IMAGES`  — PascalCase name → `data:image/png;base64,...`
 *                                URL (one entry per PNG-backed token)
 *   - `<TENANT>_MEDIA_TOKENS`  — PascalCase name → Airtable token name
 *                                (the direct mapping back to the DB row)
 * Plus an aggregate barrel `src/media/index.ts` keyed by tenant media key
 * (`wcp` | `sams-club` | `bodega`) and a `manifest.json` for tooling.
 *
 * SVGs ship inline (not as a font) so multicolor brand marks preserve every
 * fill / stroke / gradient. PNGs ship as `data:` URLs in the same TS module
 * so the consumer surface stays purely textual — no binary asset handling in
 * the package, and the portable build script's utf-8 file copier keeps
 * working unchanged.
 */

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  unlinkSync,
} from 'fs';
import { resolve } from 'path';
import {
  FIELD_NAMES,
  ALLOWED_STATUSES,
  PATHS,
  ICON_THEMES,
  THEME_FILE_MAP,
  MEDIA_THEME_ROUTING,
  MEDIA_TENANTS,
  MEDIA_THEMES,
} from '../config.mjs';
import { proxyFetch } from './proxy.mjs';

// Marker comments wrap the per-theme primitive media CSS block that this
// pipeline injects into each theme CSS file. Using a dedicated marker pair
// (not the v1 "MEDIA TOKENS" one that purgePreviousOutputs strips) lets the
// block be replaced idempotently on subsequent syncs.
const MEDIA_PRIMS_START = '/* === AUTO-GENERATED: MEDIA PRIMITIVES START === */';
const MEDIA_PRIMS_END = '/* === AUTO-GENERATED: MEDIA PRIMITIVES END === */';

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

/** "wcp-primitive-media-logo-inverse-member" → "LogoInverseMember" */
function tokenNameToMediaName(name) {
  const stripped = name.replace(/^[\w]+-(?:primitive|semantic)-media-/, '');
  const pascal = stripped
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  return pascal || stripped;
}

/**
 * Classify an Airtable media attachment as 'svg', 'png', or null (unsupported).
 * Both SVG and PNG are valid media kinds; everything else (jpg, gif, ...) is
 * skipped with a warning so curators see the row in the verbose log.
 */
function classifyMediaAttachment(att) {
  if (!att) return null;
  const type = att.type || '';
  const filename = att.filename || '';
  const url = att.url || '';
  if (/svg/i.test(type) || /\.svg$/i.test(filename) || /\.svg(\?|$)/i.test(url)) return 'svg';
  if (/png/i.test(type) || /\.png$/i.test(filename) || /\.png(\?|$)/i.test(url)) return 'png';
  return null;
}

// ─── Extraction ──────────────────────────────────────────────────

// Reverse lookup: Airtable theme name → MEDIA_THEMES key. Built once at
// module load so extractMedia can route each row directly to its theme node.
const AIRTABLE_THEME_TO_KEY = new Map(
  Object.entries(MEDIA_THEMES).map(([key, cfg]) => [cfg.theme, key]),
);

/**
 * Walk every media token (primitive + semantic) and bucket the rows by
 * MEDIA_THEMES key. Each bucket is a Map<tokenName, asset> so a token that
 * appears twice for the same theme (e.g. duplicate Airtable rows) collapses
 * to one entry — first wins.
 *
 * Rows whose Index theme isn't a MEDIA_THEMES entry but IS in
 * MEDIA_THEME_ROUTING fall back to the tenant's root theme key (`wcp`,
 * `sams-club`, or `bodega`). That keeps regional sub-themes that don't have
 * their own gallery tab (Cashi MX, Data Ventures, Sparky, Sams' Club US …)
 * from getting silently dropped.
 *
 * Each asset carries a `kind` of 'svg' or 'png'; downstream emitters route
 * by kind into the appropriate output (inline SVG vs. base64 data URL).
 */
function extractMedia(primitives, themes, dataDictionary, { verbose }) {
  const themeById = new Map();
  for (const t of themes) themeById.set(t.id, t.fields.Name);

  // byThemeKey: MEDIA_THEMES key → Map<tokenName, asset>. Asset.themeKey is
  // the key the row was bucketed into; downstream inheritance merging only
  // needs the per-key tokenName map.
  const byThemeKey = new Map();
  for (const key of Object.keys(MEDIA_THEMES)) byThemeKey.set(key, new Map());

  let skippedUnsupported = 0;
  let skippedNoTheme = 0;

  for (const rec of primitives) {
    const status = rec.fields[F_PRIM.status];
    if (!ALLOWED_STATUSES.includes(status)) continue;

    const dataType = resolveDataType(rec, F_PRIM.dataType, dataDictionary);
    if (!dataType || !/media/i.test(dataType)) continue;

    const tokenName = rec.fields[F_PRIM.name];
    if (!tokenName) continue;

    const svgField = rec.fields[F_PRIM.svg];
    const att = Array.isArray(svgField) && svgField.length > 0 ? svgField[0] : null;
    const kind = classifyMediaAttachment(att);
    if (!kind) {
      skippedUnsupported++;
      if (verbose) {
        const summary = att?.type || att?.filename || '(missing)';
        console.log(`    ✗ Skip ${tokenName}: unsupported attachment (${summary})`);
      }
      continue;
    }

    const mediaName = tokenNameToMediaName(tokenName);
    const indexLinks = Array.isArray(rec.fields.Index) ? rec.fields.Index : [];
    if (indexLinks.length === 0) {
      skippedNoTheme++;
      if (verbose) console.log(`    ✗ Skip ${tokenName}: no Index (theme)`);
      continue;
    }

    const routedKeys = new Set();
    const attemptedThemes = [];
    for (const themeId of indexLinks) {
      const themeName = themeById.get(themeId);
      if (!themeName) continue;
      attemptedThemes.push(themeName);
      // Prefer a direct MEDIA_THEMES match; fall back to the tenant root key
      // so regional themes without their own tab still contribute media.
      const directKey = AIRTABLE_THEME_TO_KEY.get(themeName);
      const tenantKey = MEDIA_THEME_ROUTING[themeName];
      const key = directKey || tenantKey;
      if (key && byThemeKey.has(key)) routedKeys.add(key);
    }

    if (routedKeys.size === 0) {
      skippedNoTheme++;
      if (verbose) {
        console.log(`    ✗ Skip ${tokenName}: Index themes have no routing (${attemptedThemes.join(', ') || '?'})`);
      }
      continue;
    }

    const asset = {
      name: mediaName,
      tokenName,
      kind,
      assetUrl: att.url,
      attId: att.id || null,
      attFilename: att.filename || null,
      width: att.width || 0,
      height: att.height || 0,
    };

    // Add to every routed theme key. First write per tokenName wins so the
    // emitted order matches Airtable's natural order without late rows silently
    // shadowing earlier ones.
    for (const key of routedKeys) {
      const bucket = byThemeKey.get(key);
      if (!bucket.has(tokenName)) bucket.set(tokenName, asset);
    }
  }

  return { byThemeKey, skippedUnsupported, skippedNoTheme };
}

// ─── Asset Download ─────────────────────────────────────────────

/**
 * Download every unique attachment once (keyed by Airtable attachment ID)
 * into `cache/media/_by-att/<attId>.<svg|png>` and mirror the per-tenant
 * "first seen per name" assets into `cache/media/<tenant>/<name>.<ext>`.
 *
 * Returns `{ svgByAttId, pngByAttId }`:
 *   • svgByAttId — Map<attId, normalisedSvgString>
 *   • pngByAttId — Map<attId, Buffer> (raw PNG bytes; base64 encoded later)
 */
async function downloadAllMedia(byThemeKey, { refresh = false, verbose = false } = {}) {
  const byAttDir = resolve(PATHS.mediaCache, '_by-att');
  mkdirSync(byAttDir, { recursive: true });

  // Collect unique attachments across every theme bucket. Same attId will
  // appear in multiple buckets when several themes share the WCP default;
  // we still only download it once.
  const attMap = new Map();
  for (const bucket of byThemeKey.values()) {
    for (const a of bucket.values()) if (a.attId) attMap.set(a.attId, a);
  }

  let downloaded = 0;
  let cached = 0;
  let failed = 0;
  const svgByAttId = new Map();
  const pngByAttId = new Map();
  const CONCURRENCY = 10;

  const ids = [...attMap.keys()];

  async function downloadOne(attId) {
    const asset = attMap.get(attId);
    const ext = asset.kind === 'png' ? 'png' : 'svg';
    const destPath = resolve(byAttDir, `${attId}.${ext}`);

    const readFromDisk = () => {
      try {
        if (asset.kind === 'png') {
          pngByAttId.set(attId, readFileSync(destPath));
        } else {
          const raw = readFileSync(destPath, 'utf-8');
          svgByAttId.set(attId, normaliseSvgForInline(raw));
        }
        return true;
      } catch {
        return false;
      }
    };

    if (!asset?.assetUrl) {
      if (existsSync(destPath) && readFromDisk()) { cached++; return; }
      failed++;
      if (verbose) console.log(`      ✗ ${asset?.name || attId}: missing URL`);
      return;
    }

    if (!refresh && existsSync(destPath) && readFromDisk()) { cached++; return; }

    try {
      const res = await proxyFetch(asset.assetUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (asset.kind === 'png') {
        const buf = Buffer.from(await res.arrayBuffer());
        // PNG magic: 89 50 4E 47 0D 0A 1A 0A. Verify before caching so a
        // mis-typed attachment doesn't poison the cache silently.
        if (buf.length < 8 || buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4e || buf[3] !== 0x47) {
          throw new Error('Not PNG');
        }
        writeFileSync(destPath, buf);
        pngByAttId.set(attId, buf);
      } else {
        const svg = await res.text();
        if (!svg.includes('<svg') && !svg.includes('<SVG')) throw new Error('Not SVG');
        writeFileSync(destPath, svg);
        svgByAttId.set(attId, normaliseSvgForInline(svg));
      }
      downloaded++;
    } catch (err) {
      failed++;
      if (verbose) console.log(`      ✗ ${asset.name}: ${err.message}`);
    }
  }

  for (let i = 0; i < ids.length; i += CONCURRENCY) {
    await Promise.all(ids.slice(i, i + CONCURRENCY).map(downloadOne));
  }

  // Mirror per-theme-key folders for local browsing. Source-of-truth is the
  // `_by-att/` cache — the mirror just makes it easy to eyeball a theme's
  // assets without grep'ing the JSON manifest.
  for (const [themeKey, bucket] of byThemeKey) {
    if (bucket.size === 0) continue;
    const outDir = resolve(PATHS.mediaCache, themeKey);
    mkdirSync(outDir, { recursive: true });
    for (const a of bucket.values()) {
      if (!a.attId) continue;
      const ext = a.kind === 'png' ? 'png' : 'svg';
      const sourcePath = resolve(byAttDir, `${a.attId}.${ext}`);
      if (!existsSync(sourcePath)) continue;
      const destPath = resolve(outDir, `${a.name}.${ext}`);
      try {
        writeFileSync(destPath, readFileSync(sourcePath));
      } catch { /* ignore mirror errors; the by-att cache is the source of truth */ }
    }
  }

  if (verbose) {
    for (const [k, bucket] of byThemeKey) {
      if (bucket.size === 0) continue;
      const cfg = MEDIA_THEMES[k];
      console.log(`    ${cfg.label}: ${bucket.size} own override(s)`);
    }
  }
  console.log(
    `  Media totals: ${downloaded} downloaded, ${cached} cached, ${failed} failed` +
      ` (${attMap.size} unique attachments, ${svgByAttId.size} SVG, ${pngByAttId.size} PNG)`,
  );

  return { svgByAttId, pngByAttId };
}

// ─── Inheritance merge ─────────────────────────────────────────

/**
 * For a given MEDIA_THEMES key, recursively walk its `inherits` chain
 * (oldest ancestor first, depth-first) collecting tokenName → asset, then
 * apply the theme's own bucket last so its overrides win. Mirrors how the
 * icon pipeline layers SVGs.
 *
 * `cache` memoises per-key merges so each ancestor is built at most once,
 * which matters for Member's Mark / Maverick that both inherit through
 * sams-club into wcp.
 *
 * Returns a Map<tokenName, asset> representing the fully merged set for
 * that theme.
 */
function mergedAssetsFor(themeKey, byThemeKey, cache = new Map()) {
  if (cache.has(themeKey)) return new Map(cache.get(themeKey));
  const cfg = MEDIA_THEMES[themeKey];
  if (!cfg) return new Map();
  const merged = new Map();
  for (const ancestor of cfg.inherits || []) {
    const ancestorMerged = mergedAssetsFor(ancestor, byThemeKey, cache);
    for (const [tokenName, asset] of ancestorMerged) merged.set(tokenName, asset);
  }
  const ownBucket = byThemeKey.get(themeKey);
  if (ownBucket) {
    for (const [tokenName, asset] of ownBucket) merged.set(tokenName, asset);
  }
  cache.set(themeKey, new Map(merged));
  return merged;
}

// ─── CSS injection (per-theme primitive media tokens) ──────────

/**
 * Encode an SVG string as a data URI payload suitable for use inside
 * `background-image: url("data:image/svg+xml,...")`. Uses percent-encoding
 * (not base64) so declarations stay diff-friendly in git.
 */
function svgToDataUrl(svg) {
  // Collapse whitespace to shrink the payload and percent-encode the result.
  const minified = svg.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(minified)}`;
}

/** Encode a PNG Buffer as a `data:image/png;base64,...` URI. */
function pngToDataUrl(buf) {
  return `data:image/png;base64,${buf.toString('base64')}`;
}

/**
 * Build the per-(file, selector) CSS blocks for primitive media tokens.
 * Returns Map<filePath, Map<selector, { declarations: Map, airtableThemes: Set }>>.
 *
 * The active runtime theme on `document.documentElement[data-ld-theme]` (set
 * by src/utils/themeManager.ts → applyTheme) picks the matching selector, so
 * overriding the primitive per-selector lets semantic tokens like
 * --wcp-semantic-media-topNav-logo-compact resolve to the theme's asset
 * without any JS swap.
 *
 * Each theme's declarations start from its tenant's shared asset set (so
 * every WCP-routed theme inherits the generic spark for tokens it doesn't
 * override) and are then overridden by any theme-specific rows — which is
 * how Walmart B2B ends up with LogomarkWalmartBusiness.svg while Walmart US
 * keeps the standard Logo.svg even though both live under the `wcp` tenant.
 */
function buildThemeCssBlocks(byThemeKey, svgByAttId, pngByAttId) {
  const blocksByFile = new Map();
  const mergeCache = new Map();

  const resolveDataUrl = (asset) => {
    if (asset.kind === 'png') {
      const buf = pngByAttId.get(asset.attId);
      if (!buf) return null;
      return pngToDataUrl(buf);
    }
    const svg = svgByAttId.get(asset.attId);
    if (!svg) return null;
    return svgToDataUrl(svg);
  };

  // For every runtime theme that has its own CSS file + data-ld-theme
  // selector, look up the matching MEDIA_THEMES key and emit its merged
  // asset set. Themes without their own MEDIA_THEMES entry fall back to
  // the tenant root key (wcp / sams-club / bodega) so e.g. Cashi MX still
  // resolves --wcp-primitive-media-* to the Walmart defaults.
  for (const [airtableThemeName, cfg] of Object.entries(THEME_FILE_MAP)) {
    if (!cfg.file || cfg.file === 'base.css' || !cfg.selector) continue;

    const directKey = AIRTABLE_THEME_TO_KEY.get(airtableThemeName);
    const tenantKey = MEDIA_THEME_ROUTING[airtableThemeName];
    const mediaKey = directKey || tenantKey;
    if (!mediaKey || !MEDIA_THEMES[mediaKey]) continue;

    const tokenToAsset = mergedAssetsFor(mediaKey, byThemeKey, mergeCache);
    if (tokenToAsset.size === 0) continue;

    const decls = new Map();
    for (const [tokenName, asset] of tokenToAsset) {
      const dataUrl = resolveDataUrl(asset);
      if (!dataUrl) continue;
      decls.set(`--${tokenName}`, `url("${dataUrl}")`);
    }

    if (decls.size === 0) continue;

    const filePath = resolve(PATHS.themesDir, cfg.file);
    if (!blocksByFile.has(filePath)) blocksByFile.set(filePath, new Map());
    const bySelector = blocksByFile.get(filePath);

    // Each Airtable theme maps to a unique selector; sibling themes (e.g.
    // "Sam's Club" vs. "Sam's Club US") that resolve to the same selector
    // merge here so the last-written declarations win for any overlap.
    const existing = bySelector.get(cfg.selector);
    if (existing) {
      for (const [k, v] of decls) existing.declarations.set(k, v);
      existing.airtableThemes.add(airtableThemeName);
    } else {
      bySelector.set(cfg.selector, {
        declarations: decls,
        airtableThemes: new Set([airtableThemeName]),
      });
    }
  }

  return blocksByFile;
}

/**
 * Format a single auto-generated primitive media block for a selector.
 */
function formatMediaBlock(selector, declarations, airtableThemes) {
  const sortedDecls = [...declarations.entries()].sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
  );
  const labelThemes = [...airtableThemes].sort().join(', ');

  const lines = [];
  lines.push(MEDIA_PRIMS_START);
  lines.push(`/* Theme: ${labelThemes} — primitive media tokens */`);
  lines.push(`${selector} {`);
  for (const [cssVar, value] of sortedDecls) {
    lines.push(`  ${cssVar}: ${value};`);
  }
  lines.push('}');
  lines.push(MEDIA_PRIMS_END);
  return lines.join('\n');
}

/**
 * Strip any previous auto-generated primitive media block from the file.
 */
function stripExistingMediaBlock(css) {
  const startIdx = css.indexOf(MEDIA_PRIMS_START);
  if (startIdx === -1) return css;
  const endIdx = css.indexOf(MEDIA_PRIMS_END, startIdx);
  if (endIdx === -1) return css;
  const endOfEnd = endIdx + MEDIA_PRIMS_END.length;
  // Also consume one trailing newline if present.
  const trimEnd = css[endOfEnd] === '\n' ? endOfEnd + 1 : endOfEnd;
  // And trim one leading blank line if present.
  let trimStart = startIdx;
  while (trimStart > 0 && css[trimStart - 1] === '\n') trimStart--;
  return css.substring(0, trimStart) + css.substring(trimEnd);
}

/**
 * Inject or replace the auto-generated primitive media block into each
 * relevant theme CSS file. Runs after css-generator has rewritten the file,
 * so blocks land after the theme's own overrides and are not clobbered.
 */
function writeThemeMediaCss(byThemeKey, svgByAttId, pngByAttId, { verbose = false } = {}) {
  const blocksByFile = buildThemeCssBlocks(byThemeKey, svgByAttId, pngByAttId);
  if (blocksByFile.size === 0) {
    if (verbose) console.log('  No per-theme primitive media CSS to emit.');
    return;
  }

  for (const [filePath, bySelector] of blocksByFile) {
    if (!existsSync(filePath)) {
      if (verbose) console.log(`    ✗ Missing theme file: ${filePath}`);
      continue;
    }
    let css = readFileSync(filePath, 'utf-8');
    css = stripExistingMediaBlock(css);
    if (!css.endsWith('\n')) css += '\n';

    const ordered = [...bySelector.entries()].sort(([a], [b]) => a.localeCompare(b));
    const joined = ordered
      .map(([selector, { declarations, airtableThemes }]) =>
        formatMediaBlock(selector, declarations, airtableThemes),
      )
      .join('\n\n');

    css += '\n' + joined + '\n';
    writeFileSync(filePath, css);

    if (verbose) {
      const totalDecls = [...bySelector.values()].reduce(
        (sum, v) => sum + v.declarations.size,
        0,
      );
      console.log(
        `    ${filePath.split('/').pop()}: ${bySelector.size} selector(s), ${totalDecls} media var(s)`,
      );
    }
  }
}

// ─── SVG Normalisation ──────────────────────────────────────────
// Keep every paint attribute intact; strip outer width/height so CSS can size;
// guarantee xmlns + viewBox; drop XML decl / comments for compact inlining.

function normaliseSvgForInline(svg) {
  let s = svg.replace(/<\?xml[^>]*\?>/g, '').replace(/<!--[\s\S]*?-->/g, '').trim();
  if (!/xmlns\s*=/.test(s)) {
    s = s.replace(/<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  s = s.replace(/(<svg\b[^>]*?)\s+width\s*=\s*"[^"]*"/, '$1');
  s = s.replace(/(<svg\b[^>]*?)\s+height\s*=\s*"[^"]*"/, '$1');
  return s;
}

// ─── Cleanup of earlier output locations ────────────────────────

function purgePreviousOutputs() {
  // v1 (font-based): src/fonts/<dir>/media.css, <FontName>Media.woff2, <FontName>Media.tsx
  // v2 (inline SVG under fonts/): src/fonts/<dir>/media.ts, src/fonts/media.generated.ts, src/fonts/media-manifest.json
  for (const cfg of Object.values(ICON_THEMES)) {
    const dir = resolve(PATHS.fontsDir, cfg.dir);
    for (const stale of [
      resolve(dir, 'media.css'),
      resolve(dir, `${cfg.fontName}Media.woff2`),
      resolve(dir, `${cfg.fontName}Media.tsx`),
      resolve(dir, 'media.ts'),
    ]) {
      if (existsSync(stale)) unlinkSync(stale);
    }
  }
  for (const stale of [
    resolve(PATHS.fontsDir, 'media.generated.ts'),
    resolve(PATHS.fontsDir, 'media-manifest.json'),
  ]) {
    if (existsSync(stale)) unlinkSync(stale);
  }

  // Strip any auto-generated media blocks from fonts barrel files.
  const indexTsPath = resolve(PATHS.fontsDir, 'index.ts');
  if (existsSync(indexTsPath)) {
    let ts = readFileSync(indexTsPath, 'utf-8');
    const TS_START = '// --- AUTO-GENERATED: MEDIA EXPORTS START ---';
    const TS_END = '// --- AUTO-GENERATED: MEDIA EXPORTS END ---';
    const s = ts.indexOf(TS_START);
    const e = ts.indexOf(TS_END);
    if (s !== -1 && e !== -1) {
      ts = ts.substring(0, s).replace(/\n+$/, '\n') + ts.substring(e + TS_END.length).replace(/^\n+/, '');
      writeFileSync(indexTsPath, ts);
    }
  }

  const indexCssPath = resolve(PATHS.fontsDir, 'index.css');
  if (existsSync(indexCssPath)) {
    let css = readFileSync(indexCssPath, 'utf-8');
    const CSS_START = '/* --- AUTO-GENERATED: MEDIA IMPORTS START --- */';
    const CSS_END = '/* --- AUTO-GENERATED: MEDIA IMPORTS END --- */';
    const s = css.indexOf(CSS_START);
    const e = css.indexOf(CSS_END);
    if (s !== -1 && e !== -1) {
      css = css.substring(0, s).replace(/\n+$/, '\n') + css.substring(e + CSS_END.length).replace(/^\n+/, '');
      writeFileSync(indexCssPath, css);
    }
  }

  // Strip v1's CSS token blocks from theme CSS files.
  const START = '/* === AUTO-GENERATED: MEDIA TOKENS START === */';
  const END = '/* === AUTO-GENERATED: MEDIA TOKENS END === */';
  for (const [, cfg] of Object.entries(THEME_FILE_MAP)) {
    if (!cfg.file || cfg.file === 'base.css') continue;
    const filePath = resolve(PATHS.themesDir, cfg.file);
    if (!existsSync(filePath)) continue;
    let css = readFileSync(filePath, 'utf-8');
    const s = css.indexOf(START);
    const e = css.indexOf(END);
    if (s === -1 || e === -1) continue;
    const before = css.lastIndexOf('\n', s);
    const eLine = css.indexOf('\n', e);
    const tail = eLine === -1 ? '' : css.substring(eLine);
    css = css.substring(0, before === -1 ? 0 : before) + tail;
    writeFileSync(filePath, css);
  }
}

// ─── Output emission ────────────────────────────────────────────

/**
 * Emit one TypeScript module per MEDIA_THEMES key with the theme's fully
 * merged asset set (parents + own overrides). Each module exports:
 *   <PREFIX>_MEDIA_SVGS   — PascalCase name → inline SVG string
 *   <PREFIX>_MEDIA_IMAGES — PascalCase name → `data:image/png;base64,...`
 *   <PREFIX>_MEDIA_TOKENS — PascalCase name → Airtable token name
 *
 * Returns null if no asset payload could be resolved for any token.
 */
function writeThemeModule(themeKey, mergedAssets, svgByAttId, pngByAttId) {
  const cfg = MEDIA_THEMES[themeKey];

  const entries = [];
  for (const [, asset] of mergedAssets) {
    if (!asset.attId) continue;
    if (asset.kind === 'png') {
      const buf = pngByAttId.get(asset.attId);
      if (!buf) continue;
      entries.push({
        name: asset.name,
        token: asset.tokenName ?? asset.name,
        kind: 'png',
        dataUrl: pngToDataUrl(buf),
        width: asset.width ?? 0,
        height: asset.height ?? 0,
      });
    } else {
      const svg = svgByAttId.get(asset.attId);
      if (!svg) continue;
      entries.push({
        name: asset.name,
        token: asset.tokenName ?? asset.name,
        kind: 'svg',
        svg,
        width: asset.width ?? 0,
        height: asset.height ?? 0,
      });
    }
  }

  if (entries.length === 0) return null;

  entries.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }),
  );

  mkdirSync(PATHS.mediaDir, { recursive: true });

  const formatKey = (name) => (/^[A-Za-z_][A-Za-z0-9_]*$/.test(name) ? name : JSON.stringify(name));

  const svgEntries = entries.filter((e) => e.kind === 'svg');
  const pngEntries = entries.filter((e) => e.kind === 'png');

  const svgConst = `${cfg.constPrefix}_MEDIA_SVGS`;
  const imageConst = `${cfg.constPrefix}_MEDIA_IMAGES`;
  const tokenConst = `${cfg.constPrefix}_MEDIA_TOKENS`;

  const svgBody = svgEntries
    .map(({ name, svg }) => {
      const escaped = svg.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
      return `  ${formatKey(name)}: \`${escaped}\`,`;
    })
    .join('\n');

  const imageBody = pngEntries
    .map(({ name, dataUrl }) => `  ${formatKey(name)}: ${JSON.stringify(dataUrl)},`)
    .join('\n');

  const tokenBody = entries
    .map(({ name, token }) => `  ${formatKey(name)}: ${JSON.stringify(token)},`)
    .join('\n');

  const source = `/* Auto-generated from Airtable "All Media" view — do not edit by hand */

/** Inline SVG strings keyed by the token's derived PascalCase name. The set
 *  is fully merged: inherited assets from parent themes plus this theme's
 *  own overrides win-last. */
export const ${svgConst}: Record<string, string> = {
${svgBody}
};

/** PNG-backed assets keyed by name, encoded as \`data:image/png;base64,...\` URLs.
 *  Use directly as an \`<img src>\` or inside \`background-image: url()\`. */
export const ${imageConst}: Record<string, string> = {
${imageBody}
};

/** Airtable token name (e.g. "wcp-primitive-media-logo") for each asset entry. */
export const ${tokenConst}: Record<string, string> = {
${tokenBody}
};
`;

  writeFileSync(resolve(PATHS.mediaDir, `${themeKey}.ts`), source);

  return {
    assets: entries.map(({ name, token, kind, width, height }) => ({
      name,
      token,
      kind,
      width: width ?? 0,
      height: height ?? 0,
    })),
  };
}

function writeAggregateBarrel(activeThemes) {
  const lines = [
    '/* Auto-generated from Airtable "All Media" view — do not edit by hand */',
    '',
  ];
  for (const key of activeThemes) {
    const cfg = MEDIA_THEMES[key];
    lines.push(
      `import { ${cfg.constPrefix}_MEDIA_SVGS, ${cfg.constPrefix}_MEDIA_IMAGES, ${cfg.constPrefix}_MEDIA_TOKENS } from './${key}';`,
    );
  }
  lines.push('');
  lines.push('/** Media theme key → PascalCase name → inline SVG string. */');
  lines.push('export const MEDIA_SVGS: Record<string, Record<string, string>> = {');
  for (const key of activeThemes) {
    const cfg = MEDIA_THEMES[key];
    lines.push(`  '${key}': ${cfg.constPrefix}_MEDIA_SVGS,`);
  }
  lines.push('};');
  lines.push('');
  lines.push('/** Media theme key → PascalCase name → `data:image/png;base64,...` URL. */');
  lines.push('export const MEDIA_IMAGES: Record<string, Record<string, string>> = {');
  for (const key of activeThemes) {
    const cfg = MEDIA_THEMES[key];
    lines.push(`  '${key}': ${cfg.constPrefix}_MEDIA_IMAGES,`);
  }
  lines.push('};');
  lines.push('');
  lines.push('/** Media theme key → PascalCase name → Airtable token name. */');
  lines.push('export const MEDIA_TOKENS: Record<string, Record<string, string>> = {');
  for (const key of activeThemes) {
    const cfg = MEDIA_THEMES[key];
    lines.push(`  '${key}': ${cfg.constPrefix}_MEDIA_TOKENS,`);
  }
  lines.push('};');
  lines.push('');
  for (const key of activeThemes) {
    const cfg = MEDIA_THEMES[key];
    lines.push(
      `export { ${cfg.constPrefix}_MEDIA_SVGS, ${cfg.constPrefix}_MEDIA_IMAGES, ${cfg.constPrefix}_MEDIA_TOKENS };`,
    );
  }
  lines.push('');

  writeFileSync(resolve(PATHS.mediaDir, 'index.ts'), lines.join('\n'));
}

function writeManifest(themeResults) {
  const manifest = {};
  for (const [themeKey, { assets }] of themeResults) {
    const cfg = MEDIA_THEMES[themeKey];
    manifest[themeKey] = {
      label: cfg.label,
      count: assets.length,
      assets,
    };
  }
  mkdirSync(PATHS.mediaDir, { recursive: true });
  writeFileSync(PATHS.mediaManifestPath, JSON.stringify(manifest, null, 2));
  return manifest;
}

// ─── Main Entry Point ───────────────────────────────────────────

export async function pullMedia(data, { refresh = false, verbose = false } = {}) {
  const { primitives, semantics, themes, dataDictionary: ddRecords } = data;
  const dataDictionary = buildDataDictionary(ddRecords);

  // Always clean up older output layouts first (idempotent).
  purgePreviousOutputs();

  const allTokens = [...primitives, ...(semantics || [])];

  const { byThemeKey, skippedUnsupported, skippedNoTheme } = extractMedia(
    allTokens,
    themes,
    dataDictionary,
    { verbose },
  );

  let ownOverrideTotal = 0;
  for (const [, bucket] of byThemeKey) ownOverrideTotal += bucket.size;
  const themesWithMedia = [...byThemeKey.entries()].filter(([, b]) => b.size > 0).length;

  console.log(
    `  Found ${ownOverrideTotal} own-override rows across ${themesWithMedia} media themes` +
      (skippedUnsupported ? ` — skipped ${skippedUnsupported} unsupported rows` : '') +
      (skippedNoTheme ? ` — skipped ${skippedNoTheme} unrouted rows` : ''),
  );

  if (ownOverrideTotal === 0) {
    console.log('  No media assets found');
    return;
  }

  console.log('  Downloading media assets...');
  const { svgByAttId, pngByAttId } = await downloadAllMedia(byThemeKey, { refresh, verbose });

  console.log('  Emitting per-theme media modules...');
  const themeResults = new Map();
  const mergeCache = new Map();
  for (const themeKey of Object.keys(MEDIA_THEMES)) {
    const merged = mergedAssetsFor(themeKey, byThemeKey, mergeCache);
    if (merged.size === 0) continue;
    const result = writeThemeModule(themeKey, merged, svgByAttId, pngByAttId);
    if (!result) continue;
    themeResults.set(themeKey, result);
    const svgCount = result.assets.filter((a) => a.kind === 'svg').length;
    const pngCount = result.assets.filter((a) => a.kind === 'png').length;
    const ownCount = byThemeKey.get(themeKey)?.size ?? 0;
    console.log(
      `    ${MEDIA_THEMES[themeKey].label}: ${result.assets.length} assets (${svgCount} SVG, ${pngCount} PNG; ${ownCount} own override${ownCount === 1 ? '' : 's'}) → src/media/${themeKey}.ts`,
    );
  }

  if (themeResults.size === 0) {
    console.log('  No theme media modules emitted');
    return;
  }

  const activeThemes = [...themeResults.keys()];
  writeAggregateBarrel(activeThemes);
  const manifest = writeManifest(themeResults);

  console.log(
    `  Media manifest: ${Object.keys(manifest).length} themes → ${PATHS.mediaManifestPath}`,
  );

  // Emit per-theme primitive media CSS tokens so semantic tokens like
  // --wcp-semantic-media-topNav-logo-compact resolve to each runtime
  // theme's specific asset via [data-ld-theme="…"] selectors. Runs AFTER
  // css-generator rewrites theme files.
  console.log('  Emitting per-theme primitive media CSS vars...');
  writeThemeMediaCss(byThemeKey, svgByAttId, pngByAttId, { verbose });
}
