/**
 * Illustration Pipeline
 * Pulls SVG illustrations from the Airtable Illustrations table
 * (`tbl2xASmvXw6MC3M9`) and emits per-type TypeScript modules under
 * `src/illustrations/`. One module per `Illustration Type` we ship — currently
 * Mono Small, Mono Large, Spot. The "Hero" type is omitted because those rows
 * are PNG attachments, which don't fit the inline-SVG pipeline.
 *
 * Each emitted module exports:
 *   - `<TYPE>_ILLUSTRATION_SVGS` — PascalCase name → inline SVG string
 *   - `<TYPE>_ILLUSTRATION_META` — PascalCase name → { width, height }
 *
 * Plus an aggregate barrel `src/illustrations/index.ts` keyed by type id and a
 * `src/illustrations/manifest.json` that the React page consumes for tabs,
 * search, and grid layout.
 *
 * Inline SVG (not a font) so multicolor illustrations preserve every fill /
 * stroke / gradient — same reasoning as the media pipeline.
 */

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from 'fs';
import { resolve } from 'path';
import {
  FIELD_NAMES,
  PATHS,
  ILLUSTRATION_TYPES,
} from '../config.mjs';
import { proxyFetch } from './proxy.mjs';

const F_ILL = FIELD_NAMES.illustrations;

// ─── Helpers ────────────────────────────────────────────────────

/** "  walmart business " → "WalmartBusiness". Handles the leading whitespace
 *  and underscore-separated casings seen in real Airtable data. */
function toPascalCase(raw) {
  const cleaned = String(raw || '').trim();
  if (!cleaned) return '';
  const parts = cleaned.split(/[\s_\-]+/).filter(Boolean);
  return parts
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

function isSvgAttachment(att) {
  if (!att) return false;
  if (att.type && /svg/i.test(att.type)) return true;
  if (att.filename && /\.svg$/i.test(att.filename)) return true;
  if (att.url && /\.svg(\?|$)/i.test(att.url)) return true;
  return false;
}

/** Looks like a usable SVG document (allows a leading XML decl / whitespace). */
function looksLikeSvg(raw) {
  if (!raw) return false;
  return /<svg\b/i.test(raw);
}

/** Strip XML decl / comments, ensure xmlns + drop hard-coded width/height so
 *  the React grid can size the illustration via aspect-ratio. */
function normaliseSvgForInline(svg) {
  let s = svg.replace(/<\?xml[^>]*\?>/g, '').replace(/<!--[\s\S]*?-->/g, '').trim();
  if (!/xmlns\s*=/.test(s)) {
    s = s.replace(/<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  s = s.replace(/(<svg\b[^>]*?)\s+width\s*=\s*"[^"]*"/, '$1');
  s = s.replace(/(<svg\b[^>]*?)\s+height\s*=\s*"[^"]*"/, '$1');
  return s;
}

// Map Airtable `Illustration Type` value → our type key. Built once.
const TYPE_LOOKUP = new Map(
  Object.entries(ILLUSTRATION_TYPES).map(([key, cfg]) => [cfg.airtableType, key]),
);

// ─── Extraction ──────────────────────────────────────────────────

/**
 * Walk the Illustrations table and bucket records into the type keys defined
 * in ILLUSTRATION_TYPES. Skips rows whose attachment isn't an SVG (handles the
 * Hero type, which is PNG-only) and rows with no usable Name.
 *
 * For each kept row we capture either an attachment (preferred — has a stable
 * cacheable URL keyed by attachment ID) or, as a fallback, the inline `SVG
 * Source` text. The downloader handles both.
 */
function extractIllustrations(records, { verbose }) {
  const byType = new Map();
  for (const key of Object.keys(ILLUSTRATION_TYPES)) byType.set(key, []);

  let skippedUnknownType = 0;
  let skippedNoAttachment = 0;
  let skippedNoName = 0;

  for (const rec of records) {
    const rawName = rec.fields[F_ILL.name];
    const pascal = toPascalCase(rawName);
    if (!pascal) {
      skippedNoName++;
      if (verbose) console.log(`    ✗ Skip ${rec.id}: empty/unparseable name (${JSON.stringify(rawName)})`);
      continue;
    }

    const airtableType = rec.fields[F_ILL.type];
    const typeKey = TYPE_LOOKUP.get(airtableType);
    if (!typeKey) {
      skippedUnknownType++;
      if (verbose) console.log(`    ✗ Skip ${pascal}: type "${airtableType || '(none)'}" not in ILLUSTRATION_TYPES`);
      continue;
    }

    const imageField = rec.fields[F_ILL.image];
    const att = Array.isArray(imageField) && imageField.length > 0 ? imageField[0] : null;
    const svgSource = rec.fields[F_ILL.svgSource];
    const hasSvgAtt = att && isSvgAttachment(att);
    const hasInlineSource = looksLikeSvg(svgSource);

    if (!hasSvgAtt && !hasInlineSource) {
      skippedNoAttachment++;
      if (verbose) {
        const kind = att?.type || att?.filename || '(missing)';
        console.log(`    ✗ Skip ${pascal}: no SVG attachment (got ${kind}) and no SVG Source`);
      }
      continue;
    }

    byType.get(typeKey).push({
      name: pascal,
      airtableId: rec.id,
      svgUrl: hasSvgAtt ? att.url : null,
      attId: hasSvgAtt ? (att.id || null) : null,
      // Fallback inline SVG used when the attachment URL can't be downloaded
      // (corporate proxy, expired URL, etc.) or when there's no attachment at
      // all — observed on a handful of Spot-type rows.
      svgSource: hasInlineSource ? svgSource : null,
      width: hasSvgAtt && att.width ? att.width : null,
      height: hasSvgAtt && att.height ? att.height : null,
    });
  }

  // Dedupe within each bucket by name (first wins) so naming collisions don't
  // produce duplicate keys in the emitted TS module.
  for (const [key, list] of byType) {
    const seen = new Set();
    const deduped = [];
    for (const item of list) {
      if (seen.has(item.name)) continue;
      seen.add(item.name);
      deduped.push(item);
    }
    byType.set(key, deduped);
  }

  return { byType, skippedUnknownType, skippedNoAttachment, skippedNoName };
}

// ─── SVG Download ────────────────────────────────────────────────

/**
 * Resolve every illustration to a normalised SVG string. Attachments are
 * downloaded once per attId into `cache/illustrations/_by-att/<attId>.svg`;
 * rows without an attachment fall back to the row's `SVG Source` text.
 *
 * Returns Map<illustration key, normalised svg> keyed by `${typeKey}/${name}`
 * so the emitter can look up the right SVG even if two types happen to share
 * a name.
 */
async function resolveAllSvgs(byType, { refresh = false, verbose = false } = {}) {
  const byAttDir = resolve(PATHS.illustrationsCache, '_by-att');
  mkdirSync(byAttDir, { recursive: true });

  const svgByKey = new Map();
  let downloaded = 0;
  let cached = 0;
  let inline = 0;
  let failed = 0;
  const CONCURRENCY = 10;

  // Build a flat list of (typeKey, item) pairs for parallel processing.
  const tasks = [];
  for (const [typeKey, items] of byType) {
    for (const item of items) tasks.push({ typeKey, item });
  }

  async function resolveOne({ typeKey, item }) {
    const key = `${typeKey}/${item.name}`;
    const useInlineFallback = () => {
      if (!item.svgSource) return false;
      const svg = normaliseSvgForInline(item.svgSource);
      svgByKey.set(key, svg);
      inline++;
      return true;
    };

    if (!item.attId || !item.svgUrl) {
      if (useInlineFallback()) return;
      failed++;
      if (verbose) console.log(`      ✗ ${key}: no attachment URL and no inline SVG`);
      return;
    }

    const destPath = resolve(byAttDir, `${item.attId}.svg`);
    const readFromDisk = () => {
      try {
        const raw = readFileSync(destPath, 'utf-8');
        if (!looksLikeSvg(raw)) return false;
        svgByKey.set(key, normaliseSvgForInline(raw));
        return true;
      } catch {
        return false;
      }
    };

    if (!refresh && existsSync(destPath) && readFromDisk()) { cached++; return; }

    try {
      const res = await proxyFetch(item.svgUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const svg = await res.text();
      if (!looksLikeSvg(svg)) throw new Error('not SVG');
      writeFileSync(destPath, svg);
      svgByKey.set(key, normaliseSvgForInline(svg));
      downloaded++;
    } catch (err) {
      // Last-ditch: if the row also has SVG Source filled in, use it. This is
      // how we recover when attachment URLs expire or the proxy blocks them.
      if (useInlineFallback()) {
        if (verbose) console.log(`      ↺ ${key}: attachment fetch failed (${err.message}) — used inline SVG Source`);
        return;
      }
      failed++;
      if (verbose) console.log(`      ✗ ${key}: ${err.message}`);
    }
  }

  for (let i = 0; i < tasks.length; i += CONCURRENCY) {
    await Promise.all(tasks.slice(i, i + CONCURRENCY).map(resolveOne));
  }

  console.log(
    `  Illustration SVG totals: ${downloaded} downloaded, ${cached} cached, ${inline} inline-source, ${failed} failed (${tasks.length} unique rows)`,
  );

  return svgByKey;
}

// ─── Output emission ────────────────────────────────────────────

function writeTypeModule(typeKey, items, svgByKey) {
  const cfg = ILLUSTRATION_TYPES[typeKey];

  // Drop rows whose SVG couldn't be resolved (download + inline fallback both
  // failed) so the manifest counts and TS exports stay in sync.
  const entries = items
    .map((item) => {
      const svg = svgByKey.get(`${typeKey}/${item.name}`);
      if (!svg) return null;
      return {
        name: item.name,
        svg,
        width: item.width,
        height: item.height,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

  if (entries.length === 0) return null;

  mkdirSync(PATHS.illustrationsDir, { recursive: true });

  const svgConst = `${cfg.constPrefix}_ILLUSTRATION_SVGS`;
  const metaConst = `${cfg.constPrefix}_ILLUSTRATION_META`;

  const formatKey = (name) => (/^[A-Za-z_][A-Za-z0-9_]*$/.test(name) ? name : JSON.stringify(name));

  const svgBody = entries
    .map(({ name, svg }) => {
      const escaped = svg.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
      return `  ${formatKey(name)}: \`${escaped}\`,`;
    })
    .join('\n');

  const metaBody = entries
    .map(({ name, width, height }) => {
      const w = width ?? 0;
      const h = height ?? 0;
      return `  ${formatKey(name)}: { width: ${w}, height: ${h} },`;
    })
    .join('\n');

  const source = `/* Auto-generated from Airtable "🌠 Illustrations" — do not edit by hand */

/** Inline SVG strings keyed by the illustration's PascalCase name. */
export const ${svgConst}: Record<string, string> = {
${svgBody}
};

/** Source attachment dimensions per illustration. Used by the gallery grid to
 *  reserve the right aspect ratio without measuring DOM. */
export const ${metaConst}: Record<string, { width: number; height: number }> = {
${metaBody}
};
`;

  writeFileSync(resolve(PATHS.illustrationsDir, `${typeKey}.ts`), source);

  return {
    items: entries.map(({ name, width, height }) => ({ name, width: width ?? 0, height: height ?? 0 })),
  };
}

function writeAggregateBarrel(activeTypeKeys) {
  const lines = [
    '/* Auto-generated from Airtable "🌠 Illustrations" — do not edit by hand */',
    '',
  ];

  for (const key of activeTypeKeys) {
    const cfg = ILLUSTRATION_TYPES[key];
    lines.push(
      `import { ${cfg.constPrefix}_ILLUSTRATION_SVGS, ${cfg.constPrefix}_ILLUSTRATION_META } from './${key}';`,
    );
  }
  lines.push('');

  lines.push('/** Type key → PascalCase name → inline SVG string. */');
  lines.push('export const ILLUSTRATION_SVGS: Record<string, Record<string, string>> = {');
  for (const key of activeTypeKeys) {
    const cfg = ILLUSTRATION_TYPES[key];
    lines.push(`  '${key}': ${cfg.constPrefix}_ILLUSTRATION_SVGS,`);
  }
  lines.push('};');
  lines.push('');

  lines.push('/** Type key → PascalCase name → { width, height }. */');
  lines.push(
    'export const ILLUSTRATION_META: Record<string, Record<string, { width: number; height: number }>> = {',
  );
  for (const key of activeTypeKeys) {
    const cfg = ILLUSTRATION_TYPES[key];
    lines.push(`  '${key}': ${cfg.constPrefix}_ILLUSTRATION_META,`);
  }
  lines.push('};');
  lines.push('');

  for (const key of activeTypeKeys) {
    const cfg = ILLUSTRATION_TYPES[key];
    lines.push(
      `export { ${cfg.constPrefix}_ILLUSTRATION_SVGS, ${cfg.constPrefix}_ILLUSTRATION_META };`,
    );
  }
  lines.push('');

  writeFileSync(resolve(PATHS.illustrationsDir, 'index.ts'), lines.join('\n'));
}

function writeManifest(typeResults) {
  const manifest = {};
  for (const [typeKey, { items }] of typeResults) {
    const cfg = ILLUSTRATION_TYPES[typeKey];
    manifest[typeKey] = {
      label: cfg.label,
      count: items.length,
      items,
    };
  }
  mkdirSync(PATHS.illustrationsDir, { recursive: true });
  writeFileSync(PATHS.illustrationsManifestPath, JSON.stringify(manifest, null, 2));
  return manifest;
}

// ─── Main Entry Point ───────────────────────────────────────────

export async function pullIllustrations(data, { refresh = false, verbose = false } = {}) {
  const records = data.illustrations || [];
  if (records.length === 0) {
    console.log('  No illustrations in snapshot — was the table synced? Try --refresh.');
    return;
  }

  const { byType, skippedUnknownType, skippedNoAttachment, skippedNoName } =
    extractIllustrations(records, { verbose });

  let totalKept = 0;
  for (const [key, items] of byType) {
    if (items.length === 0) continue;
    const cfg = ILLUSTRATION_TYPES[key];
    if (verbose) console.log(`  ${cfg.label}: ${items.length} candidates`);
    totalKept += items.length;
  }

  console.log(
    `  Found ${totalKept} illustration row(s) across ${[...byType.values()].filter((v) => v.length > 0).length} type(s)` +
      (skippedNoName ? ` — skipped ${skippedNoName} unnamed` : '') +
      (skippedUnknownType ? ` — skipped ${skippedUnknownType} unmapped types` : '') +
      (skippedNoAttachment ? ` — skipped ${skippedNoAttachment} non-SVG` : ''),
  );

  if (totalKept === 0) {
    console.log('  No SVG illustrations to emit.');
    return;
  }

  console.log('  Resolving SVGs...');
  const svgByKey = await resolveAllSvgs(byType, { refresh, verbose });

  console.log('  Emitting per-type illustration modules...');
  const typeResults = new Map();
  for (const [typeKey, items] of byType) {
    if (items.length === 0) continue;
    const result = writeTypeModule(typeKey, items, svgByKey);
    if (!result) continue;
    typeResults.set(typeKey, result);
    console.log(`    ${ILLUSTRATION_TYPES[typeKey].label}: ${result.items.length} SVGs → src/illustrations/${typeKey}.ts`);
  }

  if (typeResults.size === 0) {
    console.log('  No illustration modules emitted (every SVG failed to resolve).');
    return;
  }

  const activeTypeKeys = [...typeResults.keys()];
  writeAggregateBarrel(activeTypeKeys);
  const manifest = writeManifest(typeResults);

  console.log(
    `  Illustration manifest: ${Object.keys(manifest).length} types → ${PATHS.illustrationsManifestPath}`,
  );
}
