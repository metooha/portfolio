#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LIBS_DIR = path.resolve(ROOT, 'libs');
const LIB_REPOS = [
  {
    name: 'react',
    remote: 'git@gecgithub01.walmart.com:LivingDesign/react.git',
  },
  {
    name: 'everyday-sans',
    remote: 'git@gecgithub01.walmart.com:LivingDesign/everyday-sans.git',
  },
  {
    name: 'tokens',
    remote: 'git@gecgithub01.walmart.com:LivingDesign/tokens.git',
  },
  {
    name: 'icons',
    remote: 'git@gecgithub01.walmart.com:LivingDesign/icons.git',
  }
];

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function runGit(args, {cwd = ROOT, capture = false} = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn('git', args, {
      cwd,
      stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    });

    let stdout = '';
    let stderr = '';

    if (capture) {
      child.stdout.on('data', (chunk) => {
        stdout += String(chunk);
      });

      child.stderr.on('data', (chunk) => {
        stderr += String(chunk);
      });
    }

    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve({stdout, stderr});
        return;
      }

      reject(
        new Error(
          capture
            ? `git ${args.join(' ')} failed with exit code ${code}\n${stderr.trim()}`
            : `git ${args.join(' ')} failed with exit code ${code}`
        )
      );
    });
  });
}

async function ensureRepo({name, remote}) {
  const repoDir = path.resolve(LIBS_DIR, name);
  const relativeRepoDir = path.relative(ROOT, repoDir) || repoDir;
  const repoExists = await pathExists(repoDir);

  if (!repoExists) {
    console.log(`[setup:libs] cloning ${remote} into ${relativeRepoDir}...`);
    await runGit(['clone', remote, repoDir]);
    console.log(`[setup:libs] clone complete for ${name}`);
    return;
  }

  const gitDir = path.resolve(repoDir, '.git');
  const isGitRepo = await pathExists(gitDir);

  if (!isGitRepo) {
    throw new Error(
      `[setup:libs] ${relativeRepoDir} exists but is not a git repository. ` +
        'Please move/remove it and run setup again.'
    );
  }

  let origin = '';
  try {
    const result = await runGit(
      ['-C', repoDir, 'remote', 'get-url', 'origin'],
      {capture: true}
    );
    origin = result.stdout.trim();
  } catch {
    // Fall back to a generic "already present" message if origin is unavailable.
  }

  if (origin && origin !== remote) {
    console.log(
      `[setup:libs] ${relativeRepoDir} already exists with origin "${origin}". Skipping clone.`
    );
    return;
  }

  console.log(`[setup:libs] ${relativeRepoDir} already present. Nothing to do.`);
}

async function ensureLibRepos() {
  await fs.mkdir(LIBS_DIR, {recursive: true});
  for (const repo of LIB_REPOS) {
    await ensureRepo(repo);
  }
}

ensureLibRepos().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
