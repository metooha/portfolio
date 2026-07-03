#!/usr/bin/env node
/**
 * Playwright-based Lottie asset downloader.
 *
 * Uses Playwright's browser network stack (which handles corporate proxy and
 * system TLS correctly on macOS) to download .lottie / .json attachment files
 * from Airtable signed CDN URLs, then runs the lottie pipeline to emit
 * src/lottie/index.ts and src/lottie/manifest.json.
 *
 * This replaces the Node.js fetch path in lottie-pipeline.mjs which fails when
 * the corporate proxy (proxy-intlho.wal-mart.com) is unreachable off-network.
 *
 * Usage:
 *   node airtable-sync/lottie-playwright-pull.mjs           # use cached snapshot
 *   node airtable-sync/lottie-playwright-pull.mjs --refresh  # force fresh snapshot
 *   npm run airtable:pull-lottie
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';
import { PATHS, FIELD_NAMES, ALLOWED_STATUSES } from './config.mjs';
import { getAirtableData } from './lib/airtable-client.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env from airtable-sync/ (preferred) or project root
for (const envPath of [
  resolve(__dirname, '.env'),
  resolve(process.cwd(), '.env'),
]) {
  try {
    for (const line of readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*([^#=\s][^=\s]*)\s*=\s*"?(.*?)"?\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
    break;
  } catch { /* file not found */ }
}

const refresh = process.argv.includes('--refresh');
const verbose = process.argv.includes('--verbose');

const byAttDir = resolve(PATHS.lottieCache, '_by-att');
mkdirSync(byAttDir, { recursive: true });

// ── 1. Get Airtable snapshot ──────────────────────────────────────────────────
// Signed attachment URLs in the snapshot expire hourly. Pass --refresh when
// cached URLs are stale or downloads start returning 403/404.
console.log(refresh ? 'Refreshing Airtable snapshot...' : 'Loading Airtable snapshot (use --refresh if URLs expired)...');
const data = await getAirtableData({ refresh, verbose });
const { primitives } = data;

// ── 2. Collect lottie items ───────────────────────────────────────────────────
const F = FIELD_NAMES.primitives;
const items = [];
for (const rec of primitives) {
  const status = rec.fields[F.status];
  if (!ALLOWED_STATUSES.includes(status)) continue;

  const tokenName = rec.fields[F.name] || '';
  if (!/lottie/i.test(tokenName)) continue;

  const svgField = rec.fields[F.svg];
  const att = Array.isArray(svgField) && svgField.length ? svgField[0] : null;
  if (!att?.url || !att?.id) {
    if (verbose) console.log(`  skip ${tokenName}: no attachment`);
    continue;
  }

  const ext = (att.filename || '').toLowerCase().endsWith('.json') ? 'json' : 'lottie';
  items.push({
    tokenName,
    attId: att.id,
    url: att.url,
    filename: att.filename,
    ext,
    destPath: resolve(byAttDir, `${att.id}.${ext}`),
  });
}

if (items.length === 0) {
  console.log('No lottie tokens found. Ensure tokens are ✅ Published and have a file attachment.');
  process.exit(0);
}

// ── 3. Download missing files via Playwright ─────────────────────────────────
const toDownload = items.filter(i => !existsSync(i.destPath));

if (toDownload.length === 0) {
  console.log(`All ${items.length} lottie file(s) already cached.`);
} else {
  console.log(`Downloading ${toDownload.length} / ${items.length} lottie file(s) via Playwright...`);

  // chromium uses the macOS system keychain + system proxy PAC natively,
  // which avoids the Node.js DNS / NTLM proxy resolution issue.
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  let downloaded = 0;
  let failed = 0;

  for (const item of toDownload) {
    try {
      const response = await context.request.get(item.url, { timeout: 30_000 });
      if (!response.ok()) {
        throw new Error(`HTTP ${response.status()} ${response.statusText()}`);
      }
      const buf = await response.body();
      writeFileSync(item.destPath, buf);
      if (verbose) console.log(`  ✓ ${item.tokenName} — ${item.filename} (${(buf.length / 1024).toFixed(1)} KB)`);
      downloaded++;
    } catch (err) {
      console.error(`  ✗ ${item.tokenName}: ${err.message}`);
      failed++;
    }
  }

  await browser.close();
  console.log(`  ${downloaded} downloaded, ${failed} failed`);

  if (failed > 0 && downloaded === 0) {
    console.error('All downloads failed. Try --refresh to get fresh signed URLs.');
    process.exit(1);
  }
}

// ── 4. Emit src/lottie/index.ts + manifest.json ──────────────────────────────
console.log('Running lottie pipeline...');
const { pullLottie } = await import('./lib/lottie-pipeline.mjs');
await pullLottie(data, { refresh: false, verbose });
console.log('✓ Lottie sync complete.');
