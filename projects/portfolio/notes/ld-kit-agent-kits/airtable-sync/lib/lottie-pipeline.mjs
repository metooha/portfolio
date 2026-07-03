/**
 * Lottie Pipeline
 * Pulls animated Lottie assets from the Airtable primitives table
 * (rows whose Data Type resolves to "ANIMATE") and emits a TypeScript
 * module under `src/lottie/`.
 *
 * Two attachment formats are handled:
 *   • `.lottie`  — dotLottie binary (ZIP container). Stored as base64.
 *   • `.json`    — raw Lottie JSON. Stored as an escaped JSON string.
 *
 * The emitted module exports:
 *   - `LOTTIE_DATA`    — PascalCase name → raw data string
 *                        (base64 for .lottie, minified JSON string for .json)
 *   - `LOTTIE_FORMATS` — PascalCase name → 'lottie' | 'json'
 *   - `LOTTIE_TOKENS`  — PascalCase name → Airtable token name
 *
 * Plus `src/lottie/manifest.json` consumed by the React gallery page.
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
  ALLOWED_STATUSES,
  PATHS,
} from '../config.mjs';
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

/** "ld-primitive-lottie-martyEmotes" → "MartyEmotes" */
function tokenNameToLottieName(name) {
  const stripped = name.replace(/^[\w]+-(?:primitive|semantic)-lottie-/, '');
  return stripped
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('') || stripped;
}

/**
 * Classify an attachment as 'lottie', 'json', or null (unsupported).
 */
function classifyAttachment(att) {
  if (!att) return null;
  const filename = (att.filename || '').toLowerCase();
  const type = (att.type || '').toLowerCase();
  if (filename.endsWith('.lottie') || type.includes('octet-stream') && filename.endsWith('.lottie')) return 'lottie';
  if (filename.endsWith('.json') || type.includes('json')) return 'json';
  // Fallback: dotlottie often ships as application/octet-stream with a .lottie filename.
  // If the filename has no extension but type is octet-stream, treat as lottie.
  if (type.includes('octet-stream') || type === '') return 'lottie';
  return null;
}

// ─── Extraction ──────────────────────────────────────────────────

/**
 * Walk primitives and collect all ANIMATE-typed rows into a flat list.
 * Tokens without a usable attachment are skipped with a verbose log.
 */
function extractLottie(primitives, dataDictionary, { verbose }) {
  const items = [];
  let skippedStatus = 0;
  let skippedNoAtt = 0;

  for (const rec of primitives) {
    const status = rec.fields[F_PRIM.status];
    if (!ALLOWED_STATUSES.includes(status)) {
      skippedStatus++;
      continue;
    }

    const dataType = resolveDataType(rec, F_PRIM.dataType, dataDictionary);
    // Match "ANIMATE" data type. Also accept token names containing "lottie"
    // as a belt-and-suspenders fallback in case the data dictionary entry
    // hasn't propagated to the snapshot yet.
    const tokenName = rec.fields[F_PRIM.name] || '';
    const isAnimateType = dataType && /animate/i.test(dataType);
    const isLottieName = /lottie/i.test(tokenName);
    if (!isAnimateType && !isLottieName) continue;

    if (!tokenName) continue;

    const svgField = rec.fields[F_PRIM.svg];
    const att = Array.isArray(svgField) && svgField.length > 0 ? svgField[0] : null;
    const format = classifyAttachment(att);

    if (!att || !format) {
      skippedNoAtt++;
      if (verbose) {
        const kind = att?.type || att?.filename || '(missing)';
        console.log(`    ✗ Skip ${tokenName}: no usable attachment (${kind})`);
      }
      continue;
    }

    items.push({
      name: tokenNameToLottieName(tokenName),
      tokenName,
      format,
      attId: att.id || null,
      assetUrl: att.url || null,
      filename: att.filename || null,
      size: att.size || 0,
    });
  }

  // Dedupe by name, first wins.
  const seen = new Set();
  const deduped = [];
  for (const item of items) {
    if (seen.has(item.name)) continue;
    seen.add(item.name);
    deduped.push(item);
  }

  return { items: deduped, skippedStatus, skippedNoAtt };
}

// ─── Asset Download ─────────────────────────────────────────────

/**
 * Download every unique Lottie attachment into `cache/lottie/_by-att/`.
 * Returns:
 *   lottieByAttId — Map<attId, base64 string>   (.lottie binaries)
 *   jsonByAttId   — Map<attId, string>           (raw JSON strings)
 */
async function downloadAllLottie(items, { refresh = false, verbose = false } = {}) {
  const byAttDir = resolve(PATHS.lottieCache, '_by-att');
  mkdirSync(byAttDir, { recursive: true });

  const lottieByAttId = new Map();
  const jsonByAttId = new Map();
  let downloaded = 0;
  let cached = 0;
  let failed = 0;
  const CONCURRENCY = 10;

  async function downloadOne(item) {
    const { attId, assetUrl, format, name } = item;
    if (!attId) {
      failed++;
      if (verbose) console.log(`      ✗ ${name}: no attachment ID`);
      return;
    }

    const ext = format === 'json' ? 'json' : 'lottie';
    const destPath = resolve(byAttDir, `${attId}.${ext}`);

    const readFromDisk = () => {
      try {
        if (format === 'json') {
          const raw = readFileSync(destPath, 'utf-8');
          JSON.parse(raw); // validate
          jsonByAttId.set(attId, raw);
        } else {
          const buf = readFileSync(destPath);
          lottieByAttId.set(attId, buf.toString('base64'));
        }
        return true;
      } catch {
        return false;
      }
    };

    if (!assetUrl) {
      if (existsSync(destPath) && readFromDisk()) { cached++; return; }
      failed++;
      if (verbose) console.log(`      ✗ ${name}: no URL`);
      return;
    }

    if (!refresh && existsSync(destPath) && readFromDisk()) { cached++; return; }

    try {
      const res = await proxyFetch(assetUrl);
      if (!res.ok) {
        const msg = res.statusText || res.status;
        // MediaTypeBlocked is the McAfee corporate proxy blocking binary downloads.
        // Workaround: run airtable:pull-lottie from outside the corporate network
        // (VPN split-tunnel or non-proxy connection), or manually place the .lottie
        // file at: airtable-sync/cache/lottie/_by-att/<attId>.lottie
        if (res.status === 403 && (res.statusText || '').includes('MediaTypeBlocked')) {
          throw new Error(`HTTP 403 MediaTypeBlocked — binary download blocked by corporate proxy. Run outside corporate network or place file manually in cache.`);
        }
        throw new Error(`HTTP ${res.status} ${msg}`);
      }

      if (format === 'json') {
        const text = await res.text();
        JSON.parse(text); // validate before caching
        writeFileSync(destPath, text, 'utf-8');
        jsonByAttId.set(attId, text);
      } else {
        const buf = Buffer.from(await res.arrayBuffer());
        writeFileSync(destPath, buf);
        lottieByAttId.set(attId, buf.toString('base64'));
      }
      downloaded++;
      if (verbose) console.log(`      ✓ ${name} (${format}, ${(item.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      failed++;
      if (verbose) console.log(`      ✗ ${name}: ${err.message}`);
    }
  }

  for (let i = 0; i < items.length; i += CONCURRENCY) {
    await Promise.all(items.slice(i, i + CONCURRENCY).map(downloadOne));
  }

  console.log(
    `  Lottie totals: ${downloaded} downloaded, ${cached} cached, ${failed} failed` +
      ` (${lottieByAttId.size} .lottie, ${jsonByAttId.size} .json)`,
  );

  return { lottieByAttId, jsonByAttId };
}

// ─── Output Emission ────────────────────────────────────────────

function writeModule(items, lottieByAttId, jsonByAttId) {
  const entries = [];
  for (const item of items) {
    if (!item.attId) continue;
    if (item.format === 'json') {
      const raw = jsonByAttId.get(item.attId);
      if (!raw) continue;
      entries.push({ name: item.name, tokenName: item.tokenName, format: 'json', data: raw, size: item.size });
    } else {
      const b64 = lottieByAttId.get(item.attId);
      if (!b64) continue;
      entries.push({ name: item.name, tokenName: item.tokenName, format: 'lottie', data: b64, size: item.size });
    }
  }

  if (entries.length === 0) return null;

  entries.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

  mkdirSync(PATHS.lottieDir, { recursive: true });

  const formatKey = (name) => (/^[A-Za-z_][A-Za-z0-9_]*$/.test(name) ? name : JSON.stringify(name));

  const dataBody = entries
    .map(({ name, data }) => {
      const escaped = data.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
      return `  ${formatKey(name)}: \`${escaped}\`,`;
    })
    .join('\n');

  const formatsBody = entries
    .map(({ name, format }) => `  ${formatKey(name)}: '${format}',`)
    .join('\n');

  const tokenBody = entries
    .map(({ name, tokenName }) => `  ${formatKey(name)}: ${JSON.stringify(tokenName)},`)
    .join('\n');

  const source = `/* Auto-generated from Airtable ANIMATE tokens — do not edit by hand */

/**
 * Lottie animation data keyed by PascalCase name.
 * • format === 'lottie' → base64-encoded dotLottie binary (.lottie)
 * • format === 'json'   → raw Lottie JSON string
 *
 * Usage with @lottiefiles/dotlottie-react:
 *   const src = \`data:application/zip;base64,\${LOTTIE_DATA[name]}\`;
 *   <DotLottie src={src} autoplay loop />
 */
export const LOTTIE_DATA: Record<string, string> = {
${dataBody}
};

/** Animation format per token: 'lottie' (dotLottie binary) or 'json' (Lottie JSON). */
export const LOTTIE_FORMATS: Record<string, 'lottie' | 'json'> = {
${formatsBody}
};

/** Airtable token name for each entry (e.g. "ld-primitive-lottie-martyEmotes"). */
export const LOTTIE_TOKENS: Record<string, string> = {
${tokenBody}
};
`;

  writeFileSync(resolve(PATHS.lottieDir, 'index.ts'), source);

  return entries.map(({ name, tokenName, format, size }) => ({ name, tokenName, format, size }));
}

function writeManifest(entries) {
  const manifest = {
    count: entries.length,
    items: entries,
  };
  mkdirSync(PATHS.lottieDir, { recursive: true });
  writeFileSync(PATHS.lottieManifestPath, JSON.stringify(manifest, null, 2));
  return manifest;
}

// ─── Main Entry Point ───────────────────────────────────────────

export async function pullLottie(data, { refresh = false, verbose = false } = {}) {
  const { primitives, dataDictionary: ddRecords } = data;
  const dataDictionary = buildDataDictionary(ddRecords);

  const { items, skippedNoAtt } = extractLottie(primitives, dataDictionary, { verbose });

  const lottieCount = items.filter((i) => i.format === 'lottie').length;
  const jsonCount = items.filter((i) => i.format === 'json').length;

  console.log(
    `  Found ${items.length} Lottie token(s)` +
      (lottieCount ? ` — ${lottieCount} .lottie` : '') +
      (jsonCount ? ` — ${jsonCount} .json` : '') +
      (skippedNoAtt ? ` — skipped ${skippedNoAtt} without attachment` : ''),
  );

  if (items.length === 0) {
    console.log('  No Lottie tokens found. Ensure tokens are ✅ Published and have a file attachment.');
    return;
  }

  console.log('  Downloading Lottie assets...');
  const { lottieByAttId, jsonByAttId } = await downloadAllLottie(items, { refresh, verbose });

  console.log('  Emitting src/lottie/index.ts...');
  const entries = writeModule(items, lottieByAttId, jsonByAttId);
  if (!entries) {
    console.log('  No Lottie assets could be resolved — check download errors above.');
    return;
  }

  const manifest = writeManifest(entries);
  console.log(
    `    ${entries.length} animation(s) → src/lottie/index.ts`,
  );
  console.log(
    `  Lottie manifest: ${manifest.count} item(s) → ${PATHS.lottieManifestPath}`,
  );
}
