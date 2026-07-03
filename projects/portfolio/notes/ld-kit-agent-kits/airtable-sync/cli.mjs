#!/usr/bin/env node

/**
 * Airtable Sync CLI
 * Pull design tokens and icons from Airtable into ld-kit theme files.
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Command } from 'commander';
import { getAirtableData } from './lib/airtable-client.mjs';
import { resolveAllThemes } from './lib/theme-resolver.mjs';
import { generateAllCss } from './lib/css-generator.mjs';
import { pullIcons } from './lib/icon-pipeline.mjs';
import { pullMedia } from './lib/media-pipeline.mjs';
import { pullIllustrations } from './lib/illustration-pipeline.mjs';
import { pullLottie } from './lib/lottie-pipeline.mjs';
import { setupProxy } from './lib/proxy.mjs';

// Load .env from airtable-sync/ (preferred) or project root
for (const envPath of [
  resolve(new URL('.', import.meta.url).pathname, '.env'),
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

const program = new Command();

program
  .name('airtable-sync')
  .description('Pull design tokens and icons from Airtable into ld-kit themes')
  .version('1.0.0');

program
  .command('pull-tokens')
  .description('Pull color tokens from Airtable and update CSS theme files')
  .option('--refresh', 'Force re-download from Airtable (ignore cache)')
  .option('--verbose', 'Detailed logging')
  .option('--dry-run', 'Preview changes without writing files')
  .action(async (opts) => {
    try {
      await setupProxy({ verbose: opts.verbose });
      console.log('Pulling color tokens from Airtable...');
      const data = await getAirtableData({ refresh: opts.refresh, verbose: opts.verbose });
      const resolved = resolveAllThemes(data, { verbose: opts.verbose });
      await generateAllCss(resolved, { dryRun: opts.dryRun, verbose: opts.verbose });
      console.log('✓ Token sync complete.');
    } catch (err) {
      console.error('Error:', err.message);
      if (opts.verbose) console.error(err.stack);
      process.exit(1);
    }
  });

program
  .command('pull-icons')
  .description('Pull icon SVGs from Airtable and generate icon font')
  .option('--refresh', 'Force re-download from Airtable (ignore cache)')
  .option('--verbose', 'Detailed logging')
  .action(async (opts) => {
    try {
      await setupProxy({ verbose: opts.verbose });
      console.log('Pulling icons from Airtable...');
      const data = await getAirtableData({ refresh: opts.refresh, verbose: opts.verbose });
      await pullIcons(data, { refresh: opts.refresh, verbose: opts.verbose });
      console.log('✓ Icon sync complete.');
    } catch (err) {
      console.error('Error:', err.message);
      if (opts.verbose) console.error(err.stack);
      process.exit(1);
    }
  });

program
  .command('pull-media')
  .description('Pull media (brand marks / logos) from Airtable "All Media" view and generate per-tenant media fonts')
  .option('--refresh', 'Force re-download from Airtable (ignore cache)')
  .option('--verbose', 'Detailed logging')
  .action(async (opts) => {
    try {
      await setupProxy({ verbose: opts.verbose });
      console.log('Pulling media from Airtable...');
      const data = await getAirtableData({ refresh: opts.refresh, verbose: opts.verbose });
      await pullMedia(data, { refresh: opts.refresh, verbose: opts.verbose });
      console.log('✓ Media sync complete.');
    } catch (err) {
      console.error('Error:', err.message);
      if (opts.verbose) console.error(err.stack);
      process.exit(1);
    }
  });

program
  .command('pull-lottie')
  .description('Pull Lottie animation assets from Airtable ANIMATE tokens')
  .option('--refresh', 'Force re-download from Airtable (ignore cache)')
  .option('--verbose', 'Detailed logging')
  .action(async (opts) => {
    try {
      await setupProxy({ verbose: opts.verbose });
      console.log('Pulling Lottie assets from Airtable...');
      const data = await getAirtableData({ refresh: opts.refresh, verbose: opts.verbose });
      await pullLottie(data, { refresh: opts.refresh, verbose: opts.verbose });
      console.log('✓ Lottie sync complete.');
    } catch (err) {
      console.error('Error:', err.message);
      if (opts.verbose) console.error(err.stack);
      process.exit(1);
    }
  });

program
  .command('pull-illustrations')
  .description('Pull SVG illustrations from the Airtable Illustrations table and emit src/illustrations/*')
  .option('--refresh', 'Force re-download from Airtable (ignore cache)')
  .option('--verbose', 'Detailed logging')
  .action(async (opts) => {
    try {
      await setupProxy({ verbose: opts.verbose });
      console.log('Pulling illustrations from Airtable...');
      const data = await getAirtableData({ refresh: opts.refresh, verbose: opts.verbose });
      await pullIllustrations(data, { refresh: opts.refresh, verbose: opts.verbose });
      console.log('✓ Illustration sync complete.');
    } catch (err) {
      console.error('Error:', err.message);
      if (opts.verbose) console.error(err.stack);
      process.exit(1);
    }
  });

program
  .command('pull')
  .description('Pull tokens, icons, media, and illustrations from Airtable')
  .option('--refresh', 'Force re-download from Airtable (ignore cache)')
  .option('--verbose', 'Detailed logging')
  .option('--dry-run', 'Preview changes without writing files')
  .action(async (opts) => {
    try {
      await setupProxy({ verbose: opts.verbose });
      console.log('Pulling tokens, icons, and media from Airtable...\n');
      const data = await getAirtableData({ refresh: opts.refresh, verbose: opts.verbose });

      console.log('\n── Color Tokens ──');
      const resolved = resolveAllThemes(data, { verbose: opts.verbose });
      await generateAllCss(resolved, { dryRun: opts.dryRun, verbose: opts.verbose });

      console.log('\n── Icons ──');
      await pullIcons(data, { refresh: opts.refresh, verbose: opts.verbose });

      if (!opts.dryRun) {
        console.log('\n── Media ──');
        await pullMedia(data, { refresh: opts.refresh, verbose: opts.verbose });

        console.log('\n── Illustrations ──');
        await pullIllustrations(data, { refresh: opts.refresh, verbose: opts.verbose });

        console.log('\n── Lottie ──');
        await pullLottie(data, { refresh: opts.refresh, verbose: opts.verbose });
      }

      console.log('\n✓ Full sync complete.');
    } catch (err) {
      console.error('Error:', err.message);
      if (opts.verbose) console.error(err.stack);
      process.exit(1);
    }
  });

program.parse();
