/**
 * Airtable Data Fetcher with Caching
 * Downloads all tables and caches to snapshot.json
 */

import { config as loadEnv } from 'dotenv';
import Airtable from 'airtable';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { AIRTABLE_BASE_ID, TABLES, PATHS } from '../config.mjs';

// Load .env from project root
const __dirname = dirname(fileURLToPath(import.meta.url));
loadEnv({ path: resolve(__dirname, '../../.env') });

// Airtable attachment URLs (v5.airtableusercontent.com) are signed and expire
// ~2h after issue. Treat snapshots older than this as stale so downstream
// SVG/PNG fetches don't silently 410.
const SNAPSHOT_TTL_MS = 60 * 60 * 1000;

async function fetchTable(base, tableId, label, verbose) {
  const records = [];
  if (verbose) console.log(`  Fetching ${label}...`);

  await new Promise((resolve, reject) => {
    base(tableId)
      .select({ pageSize: 100 })
      .eachPage(
        (pageRecords, fetchNextPage) => {
          for (const rec of pageRecords) {
            records.push({ id: rec.id, fields: rec.fields });
          }
          if (verbose) console.log(`    ${records.length} records so far...`);
          fetchNextPage();
        },
        (err) => (err ? reject(err) : resolve()),
      );
  });

  if (verbose) console.log(`  ✓ ${label}: ${records.length} records`);
  return records;
}

export async function getAirtableData({ refresh = false, verbose = false } = {}) {
  // Return cached data if available and not refreshing. Snapshots written by
  // older versions of this client may be missing newer table arrays; treat
  // those as stale and re-fetch. Also re-fetch if the snapshot is older than
  // SNAPSHOT_TTL_MS so we get fresh Airtable attachment URLs.
  if (!refresh && existsSync(PATHS.snapshotFile)) {
    const raw = readFileSync(PATHS.snapshotFile, 'utf-8');
    const cached = JSON.parse(raw);
    const cachedAt = cached.timestamp ? new Date(cached.timestamp).getTime() : 0;
    const ageMs = Date.now() - cachedAt;
    if (!cached.illustrations) {
      if (verbose) console.log('Cached snapshot missing illustrations table; re-fetching...');
    } else if (!Number.isFinite(cachedAt) || ageMs > SNAPSHOT_TTL_MS) {
      const ageMin = Math.round(ageMs / 60000);
      const ttlMin = Math.round(SNAPSHOT_TTL_MS / 60000);
      console.log(`Cached snapshot is ${ageMin}m old (TTL ${ttlMin}m); re-fetching for fresh attachment URLs...`);
    } else {
      if (verbose) console.log('Using cached snapshot...');
      return cached;
    }
  }

  const token = process.env.AIRTABLE_TOKEN || process.env.AIRTABLE_API_KEY;
  if (!token) {
    throw new Error(
      'Missing AIRTABLE_TOKEN environment variable.\n' +
        'Set it in .env or export AIRTABLE_TOKEN=pat_...',
    );
  }

  if (verbose) console.log('Downloading from Airtable...');
  Airtable.configure({ apiKey: token });
  const base = Airtable.base(AIRTABLE_BASE_ID);

  const [themes, primitives, semantics, dataDictionary, illustrations] = await Promise.all([
    fetchTable(base, TABLES.themes, 'Themes', verbose),
    fetchTable(base, TABLES.primitives, 'Primitives', verbose),
    fetchTable(base, TABLES.semantics, 'Semantics', verbose),
    fetchTable(base, TABLES.dataDictionary, 'Data Dictionary', verbose),
    fetchTable(base, TABLES.illustrations, 'Illustrations', verbose),
  ]);

  const snapshot = {
    timestamp: new Date().toISOString(),
    themes,
    primitives,
    semantics,
    dataDictionary,
    illustrations,
  };

  // Save cache
  mkdirSync(dirname(PATHS.snapshotFile), { recursive: true });
  writeFileSync(PATHS.snapshotFile, JSON.stringify(snapshot, null, 2));
  if (verbose) {
    console.log(`✓ Snapshot saved to ${PATHS.snapshotFile}`);
    console.log(`  Themes: ${themes.length}, Primitives: ${primitives.length}, Semantics: ${semantics.length}, DataDictionary: ${dataDictionary.length}, Illustrations: ${illustrations.length}`);
  }

  return snapshot;
}
