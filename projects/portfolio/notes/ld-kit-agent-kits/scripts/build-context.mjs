#!/usr/bin/env node

/**
 * Centralized Context Distribution System
 *
 * Reads canonical .mdc files from src/context/, applies platform-specific
 * template variable substitution, and distributes to each sync target.
 *
 * Usage:
 *   node scripts/build-context.mjs
 *
 * Can also be imported:
 *   import { buildContext } from './build-context.mjs';
 *   await buildContext();
 */

import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {SANDBOX_INSTANCE_REL} from './sandbox-instance.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTEXT_DIR = path.resolve(ROOT, 'src/context');
const SANDBOX_SKILL_ROOT = path.resolve(ROOT, SANDBOX_INSTANCE_REL);
const SANDBOX_ACTIVE = existsSync(SANDBOX_SKILL_ROOT);

// ---------------------------------------------------------------------------
// Platform configs
// ---------------------------------------------------------------------------

const PLATFORMS = [
  {
    name: 'builder',
    outputDir: 'sync/builder/projects/living-design/.builder/rules',
    fileExtension: '.mdc',
    includeFrontmatter: true,
    variables: {
      ld_component_path: 'client/components',
      ld_patterns_path: 'client/patterns',
      ld_root_path: 'client',
      helpers_path: 'client/utils',
      app_entry: 'client/App.tsx',
      theming_file: 'theming.mdc',
      components_index_file: 'components-index.mdc',
      guidelines_file: 'living-design-guidelines.mdc',
      communication_file: 'component-communication.mdc',
      platform_name: 'Builder',
      theming_runtime_module: 'client/utils/Theming.tsx',
      rules_dir_description: '.builder/rules/',
      rules_location_block:
        'Before writing any code, read the guideline files in `.builder/rules/` in this order:',
    },
    fileMap: {
      'living-design-guidelines.mdc': null,
      'theming.mdc': null,
      'component-communication.mdc': null,
      'spacing.mdc': null,
      'icons.mdc': null,
      'a11y.mdc': null,
    },
    extras: [
      {
        source: 'agents.mdc',
        outputPath: 'sync/builder/projects/living-design/AGENTS.md',
        stripFrontmatter: true,
      },
    ],
  },
  {
    name: 'skill',
    outputDir: 'living-design/.cursor/rules',
    fileExtension: '.mdc',
    includeFrontmatter: true,
    variables: {
      ld_component_path: 'src/components',
      ld_patterns_path: 'src/patterns',
      ld_root_path: 'src',
      helpers_path: 'src/utils',
      app_entry: 'src/App.tsx',
      theming_file: 'theming.mdc',
      components_index_file: 'components-index.mdc',
      guidelines_file: 'living-design-guidelines.mdc',
      communication_file: 'component-communication.mdc',
      platform_name: 'Skill/IDE',
      theming_runtime_module: 'src/utils/Theming.tsx',
      rules_dir_description: '.cursor/rules/',
      rules_location_block:
        'Before writing any code, locate and read the guideline files. The canonical copy lives in `rules/` (`.md` files) at the project root — always visible to any tool. The same content is mirrored into hidden per-tool directories for auto-loading:\n\n| Tool | Rules directory |\n|------|----------------|\n| Any tool (canonical) | `rules/` (`.md` files) |\n| Cursor | `.cursor/rules/` (`.mdc` files) |\n| Claude Code | `.claude/rules/` (`.md` files) |\n| GitHub Copilot (VS Code) | `.github/instructions/` (`.instructions.md` files) |\n\nThe dot-directories are hidden — some tools\' file listings and searches omit them entirely. If you cannot see them, read `rules/` at the project root.\n\nRead these files **in order**:',
    },
    fileMap: {
      'living-design-guidelines.mdc': null,
      'theming.mdc': null,
      'component-communication.mdc': null,
      'spacing.mdc': null,
      'icons.mdc': null,
      'a11y.mdc': null,
    },
    extras: [
      {
        source: 'agents.mdc',
        outputPath: 'living-design/AGENTS.md',
        stripFrontmatter: true,
      },
    ],
  },
  {
    name: 'claude',
    outputDir: 'living-design/.claude/rules',
    fileExtension: '.md',
    includeFrontmatter: false,
    variables: {
      ld_component_path: 'src/components',
      ld_patterns_path: 'src/patterns',
      ld_root_path: 'src',
      helpers_path: 'src/utils',
      app_entry: 'src/App.tsx',
      theming_file: 'theming.md',
      components_index_file: 'components-index.md',
      guidelines_file: 'living-design-guidelines.md',
      communication_file: 'component-communication.md',
      platform_name: 'Skill/IDE',
      theming_runtime_module: 'src/utils/Theming.tsx',
      rules_dir_description: '.claude/rules/',
      rules_location_block:
        'Before writing any code, locate and read the guideline files. The canonical copy lives in `rules/` (`.md` files) at the project root — always visible to any tool. The same content is mirrored into hidden per-tool directories for auto-loading:\n\n| Tool | Rules directory |\n|------|----------------|\n| Any tool (canonical) | `rules/` (`.md` files) |\n| Cursor | `.cursor/rules/` (`.mdc` files) |\n| Claude Code | `.claude/rules/` (`.md` files) |\n| GitHub Copilot (VS Code) | `.github/instructions/` (`.instructions.md` files) |\n\nThe dot-directories are hidden — some tools\' file listings and searches omit them entirely. If you cannot see them, read `rules/` at the project root.\n\nRead these files **in order**:',
    },
    fileMap: {
      'living-design-guidelines.mdc': null,
      'theming.mdc': null,
      'component-communication.mdc': null,
      'spacing.mdc': null,
      'icons.mdc': null,
      'a11y.mdc': null,
    },
    extras: [
      {
        source: 'agents.mdc',
        outputPath: 'living-design/.claude/CLAUDE.md',
        stripFrontmatter: true,
      },
    ],
  },
  {
    name: 'copilot',
    outputDir: 'living-design/.github/instructions',
    fileExtension: '.instructions.md',
    includeFrontmatter: true,
    frontmatterTransform: 'copilot',
    variables: {
      ld_component_path: 'src/components',
      ld_patterns_path: 'src/patterns',
      ld_root_path: 'src',
      helpers_path: 'src/utils',
      app_entry: 'src/App.tsx',
      theming_file: 'theming.instructions.md',
      components_index_file: 'components-index.instructions.md',
      guidelines_file: 'living-design-guidelines.instructions.md',
      communication_file: 'component-communication.instructions.md',
      platform_name: 'Skill/IDE',
      theming_runtime_module: 'src/utils/Theming.tsx',
      rules_dir_description: '.github/instructions/',
      rules_location_block:
        'Before writing any code, locate and read the guideline files. The canonical copy lives in `rules/` (`.md` files) at the project root — always visible to any tool. The same content is mirrored into hidden per-tool directories for auto-loading:\n\n| Tool | Rules directory |\n|------|----------------|\n| Any tool (canonical) | `rules/` (`.md` files) |\n| Cursor | `.cursor/rules/` (`.mdc` files) |\n| Claude Code | `.claude/rules/` (`.md` files) |\n| GitHub Copilot (VS Code) | `.github/instructions/` (`.instructions.md` files) |\n\nThe dot-directories are hidden — some tools\' file listings and searches omit them entirely. If you cannot see them, read `rules/` at the project root.\n\nRead these files **in order**:',
    },
    fileMap: {
      'living-design-guidelines.mdc': null,
      'theming.mdc': null,
      'component-communication.mdc': null,
      'spacing.mdc': null,
      'icons.mdc': null,
      'a11y.mdc': null,
    },
    extras: [
      {
        source: 'agents.mdc',
        outputPath: 'living-design/.github/copilot-instructions.md',
        stripFrontmatter: true,
      },
    ],
  },
  // Tool-agnostic VISIBLE copy of the rules. The per-tool directories above
  // are all dot-hidden, and some agent harnesses (e.g. code puppy) omit
  // hidden directories from file listings and searches entirely — an agent
  // routed by AGENTS.md can be unable to find the rules it was told to read.
  // `rules/` at the project root is the canonical, always-discoverable copy.
  {
    name: 'rules',
    outputDir: 'living-design/rules',
    fileExtension: '.md',
    includeFrontmatter: false,
    variables: {
      ld_component_path: 'src/components',
      ld_patterns_path: 'src/patterns',
      ld_root_path: 'src',
      helpers_path: 'src/utils',
      app_entry: 'src/App.tsx',
      theming_file: 'theming.md',
      components_index_file: 'components-index.md',
      guidelines_file: 'living-design-guidelines.md',
      communication_file: 'component-communication.md',
      platform_name: 'Skill/IDE',
      theming_runtime_module: 'src/utils/Theming.tsx',
      rules_dir_description: 'rules/',
      rules_location_block:
        'Before writing any code, locate and read the guideline files. The canonical copy lives in `rules/` (`.md` files) at the project root — always visible to any tool. The same content is mirrored into hidden per-tool directories for auto-loading:\n\n| Tool | Rules directory |\n|------|----------------|\n| Any tool (canonical) | `rules/` (`.md` files) |\n| Cursor | `.cursor/rules/` (`.mdc` files) |\n| Claude Code | `.claude/rules/` (`.md` files) |\n| GitHub Copilot (VS Code) | `.github/instructions/` (`.instructions.md` files) |\n\nThe dot-directories are hidden — some tools\' file listings and searches omit them entirely. If you cannot see them, read `rules/` at the project root.\n\nRead these files **in order**:',
    },
    fileMap: {
      'living-design-guidelines.mdc': null,
      'theming.mdc': null,
      'component-communication.mdc': null,
      'spacing.mdc': null,
      'icons.mdc': null,
      'a11y.mdc': null,
    },
    extras: [],
  },
];

// When the local test instance exists (npm run test:local), also distribute
// rule files into it so edits to src/context/*.mdc surface live for agent
// testing. See scripts/sandbox-instance.mjs and TESTING.md.
if (SANDBOX_ACTIVE) {
  const SANDBOX_SKILL_PLATFORM_NAMES = new Set(['skill', 'claude', 'copilot', 'rules']);
  const sandboxRewrites = {
    'living-design/': `${SANDBOX_INSTANCE_REL}/`,
  };
  const rewritePath = (p) => {
    for (const [from, to] of Object.entries(sandboxRewrites)) {
      if (p.startsWith(from)) return p.replace(from, to);
    }
    return p;
  };
  const sandboxPlatforms = PLATFORMS
    .filter((p) => SANDBOX_SKILL_PLATFORM_NAMES.has(p.name))
    .map((p) => ({
      ...p,
      name: `${p.name}-sandbox`,
      outputDir: rewritePath(p.outputDir),
      extras: (p.extras ?? []).map((e) => ({...e, outputPath: rewritePath(e.outputPath)})),
    }));
  PLATFORMS.push(...sandboxPlatforms);
}

// ---------------------------------------------------------------------------
// Template helpers
// ---------------------------------------------------------------------------

function applyTemplateVariables(content, variables) {
  return content.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (key in variables) return variables[key];
    return match; // leave unresolved
  });
}

function stripFrontmatter(content) {
  const match = content.match(/^---\n[\s\S]*?\n---\n/);
  if (match) return content.slice(match[0].length);
  return content;
}

/**
 * Convert .mdc frontmatter (description/globs/alwaysApply) to Copilot
 * .instructions.md frontmatter (applyTo glob).
 */
function transformCopilotFrontmatter(content) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) return content;

  const body = content.slice(fmMatch[0].length);
  const fmBlock = fmMatch[1];

  // Parse simple YAML fields
  const descMatch = fmBlock.match(/^description:\s*(.+)$/m);
  const alwaysApply = /^alwaysApply:\s*true/m.test(fmBlock);

  // globs: may be empty (just "globs:") or have a value on the same line
  const globsMatch = fmBlock.match(/^globs:[^\S\n]+(\S.*)$/m);
  const description = descMatch ? descMatch[1].trim() : '';
  const globs = globsMatch ? globsMatch[1].trim() : '';

  // Determine applyTo: use explicit globs if present, otherwise '**' for alwaysApply
  const applyTo = globs || '**';

  const newFm = [
    '---',
    ...(description ? [`description: '${description.replace(/'/g, "''")}'`] : []),
    `applyTo: '${applyTo}'`,
    '---',
  ].join('\n');

  return newFm + '\n' + body;
}

function getOutputFilename(sourceFilename, platform) {
  // Check fileMap for explicit rename
  if (platform.fileMap && sourceFilename in platform.fileMap) {
    const mapped = platform.fileMap[sourceFilename];
    if (mapped) return mapped;
  }

  // Swap extension
  const base = sourceFilename.replace(/\.mdc$/, '');
  return base + platform.fileExtension;
}

// ---------------------------------------------------------------------------
// File helpers
// ---------------------------------------------------------------------------

async function writeIfChanged(filePath, content) {
  try {
    const existing = await fs.readFile(filePath, 'utf-8');
    if (existing === content) return false;
  } catch {
    // File doesn't exist yet
  }
  await fs.writeFile(filePath, content, 'utf-8');
  return true;
}

// ---------------------------------------------------------------------------
// Distribution
// ---------------------------------------------------------------------------

async function distributeFile(sourceFilename, sourceContent, platform) {
  const outputFilename = getOutputFilename(sourceFilename, platform);
  const outputDir = path.resolve(ROOT, platform.outputDir);
  const outputPath = path.resolve(outputDir, outputFilename);

  let content = applyTemplateVariables(sourceContent, platform.variables);

  if (!platform.includeFrontmatter) {
    content = stripFrontmatter(content);
  } else if (platform.frontmatterTransform === 'copilot') {
    content = transformCopilotFrontmatter(content);
  }

  await fs.mkdir(outputDir, {recursive: true});
  const changed = await writeIfChanged(outputPath, content);
  return {outputPath, outputFilename, changed};
}

async function distributeExtra(extra, platform) {
  const sourcePath = path.resolve(CONTEXT_DIR, extra.source);
  let content;
  try {
    content = await fs.readFile(sourcePath, 'utf-8');
  } catch {
    console.warn(`  ! Missing extra source: ${extra.source}`);
    return null;
  }

  content = applyTemplateVariables(content, platform.variables);

  if (extra.stripFrontmatter) {
    content = stripFrontmatter(content);
  }

  const outputPath = path.resolve(ROOT, extra.outputPath);
  await fs.mkdir(path.dirname(outputPath), {recursive: true});
  const changed = await writeIfChanged(outputPath, content);
  return {outputPath, changed};
}

function warnUnresolved(content, filePath) {
  const matches = content.match(/\{\{\w+\}\}/g);
  if (matches) {
    const unique = [...new Set(matches)];
    console.warn(`  ! Unresolved variables in ${path.relative(ROOT, filePath)}: ${unique.join(', ')}`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export async function buildContext() {
  console.log('\n  Distributing context files...');

  // Read all .mdc files from src/context/
  let entries;
  try {
    entries = await fs.readdir(CONTEXT_DIR);
  } catch {
    console.warn('  ! src/context/ not found — skipping context distribution');
    return;
  }

  const mdcFiles = entries.filter((f) => f.endsWith('.mdc'));
  if (mdcFiles.length === 0) {
    console.warn('  ! No .mdc files in src/context/ — skipping');
    return;
  }

  // Read all source files
  const sources = new Map();
  for (const filename of mdcFiles) {
    const content = await fs.readFile(path.resolve(CONTEXT_DIR, filename), 'utf-8');
    sources.set(filename, content);
  }

  // Distribute to each platform
  for (const platform of PLATFORMS) {
    console.log(`\n  [${platform.name}]`);

    // Regular files from fileMap
    for (const sourceFilename of Object.keys(platform.fileMap)) {
      const sourceContent = sources.get(sourceFilename);
      if (!sourceContent) {
        console.warn(`  ! Missing source: ${sourceFilename}`);
        continue;
      }

      const result = await distributeFile(sourceFilename, sourceContent, platform);
      const outputRelative = path.relative(ROOT, result.outputPath);
      const status = result.changed ? 'updated' : 'unchanged';
      console.log(`  ${result.changed ? '\u2713' : '\u2022'} ${result.outputFilename} (${status})`);

      // Check for unresolved variables
      const finalContent = await fs.readFile(result.outputPath, 'utf-8');
      warnUnresolved(finalContent, result.outputPath);
    }

    // Extras (platform-specific files)
    for (const extra of platform.extras) {
      const result = await distributeExtra(extra, platform);
      if (result) {
        const outputRelative = path.relative(ROOT, result.outputPath);
        const status = result.changed ? 'updated' : 'unchanged';
        console.log(`  ${result.changed ? '\u2713' : '\u2022'} ${path.basename(extra.outputPath)} (${status})`);

        const finalContent = await fs.readFile(result.outputPath, 'utf-8');
        warnUnresolved(finalContent, result.outputPath);
      }
    }
  }

  console.log('\n  Context distribution complete.\n');
}

// CLI entry point
const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__dirname, 'build-context.mjs');
if (isMain) {
  buildContext().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
