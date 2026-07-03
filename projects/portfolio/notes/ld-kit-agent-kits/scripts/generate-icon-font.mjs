#!/usr/bin/env node

/**
 * Standalone Icon Font Generator
 * Reads cached SVGs and snapshot from airtable-sync/cache/,
 * generates unified + per-brand woff2 fonts, CSS, and components.
 *
 * Usage: node scripts/generate-icon-font.mjs [--verbose]
 *
 * Prerequisite: Run `npm run airtable:pull-icons` first to download SVGs.
 */

import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SNAPSHOT = resolve(ROOT, 'airtable-sync/cache/snapshot.json');

const verbose = process.argv.includes('--verbose');

async function main() {
  if (!existsSync(SNAPSHOT)) {
    console.error('No cached snapshot found. Run "npm run airtable:pull-icons" first.');
    process.exit(1);
  }

  // Re-use the full pipeline with cached data (no Airtable fetch)
  const { getAirtableData } = await import('../airtable-sync/lib/airtable-client.mjs');
  const { pullIcons } = await import('../airtable-sync/lib/icon-pipeline.mjs');

  const data = await getAirtableData({ refresh: false, verbose });
  await pullIcons(data, { refresh: false, verbose });
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
