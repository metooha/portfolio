#!/usr/bin/env node

import {spawn} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const WATCH_TARGETS = [
  path.resolve(ROOT, 'src/components'),
  path.resolve(ROOT, 'src/utils'),
  path.resolve(ROOT, 'src/context'),
  path.resolve(ROOT, 'scripts/build-portable.mjs'),
  path.resolve(ROOT, 'scripts/component-guidance.md'),
];

const watchers = [];
let buildRunning = false;
let queued = false;
let debounceTimer = null;

function runPortableBuild(reason) {
  if (buildRunning) {
    queued = true;
    return;
  }

  buildRunning = true;
  console.log(`\n[portable:watch] change detected (${reason})`);
  console.log('[portable:watch] rebuilding portable outputs...');

  const child = spawn(process.execPath, ['scripts/build-portable.mjs'], {
    cwd: ROOT,
    stdio: 'inherit',
  });

  child.on('exit', (code) => {
    buildRunning = false;
    if (code === 0) {
      console.log('[portable:watch] rebuild complete');
    } else {
      console.error(
        `[portable:watch] rebuild failed (exit ${code ?? 'unknown'})`
      );
    }

    if (queued) {
      queued = false;
      runPortableBuild('queued change');
    }
  });
}

function shouldIgnore(relativePath) {
  if (!relativePath) return false;
  return (
    relativePath.includes('node_modules') ||
    relativePath.startsWith('dist')
  );
}

function scheduleBuild(reason) {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => runPortableBuild(reason), 150);
}

function watchTarget(targetPath) {
  if (!fs.existsSync(targetPath)) return;

  const stats = fs.statSync(targetPath);
  const isDirectory = stats.isDirectory();

  const watcher = fs.watch(
    targetPath,
    isDirectory ? {recursive: true} : undefined,
    (eventType, filename) => {
      const normalized = filename ? String(filename).replaceAll('\\', '/') : '';
      if (shouldIgnore(normalized)) return;
      const reason = normalized ? `${eventType}: ${normalized}` : eventType;
      scheduleBuild(reason);
    }
  );

  watchers.push(watcher);
}

function cleanupAndExit(signalCode = 0) {
  for (const watcher of watchers) watcher.close();
  process.exit(signalCode);
}

for (const target of WATCH_TARGETS) watchTarget(target);

if (watchers.length === 0) {
  console.warn('[portable:watch] no watch targets found; exiting');
  process.exit(1);
}

console.log('[portable:watch] watching for changes...');
for (const target of WATCH_TARGETS) {
  const relative = path.relative(ROOT, target) || '.';
  console.log(`[portable:watch] - ${relative}`);
}

process.on('SIGINT', () => cleanupAndExit(0));
process.on('SIGTERM', () => cleanupAndExit(0));
