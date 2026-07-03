/**
 * CSS Generator
 * Generates/updates base.css color sections and theme override files.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { PATHS, CSS_MARKERS, THEME_FILE_MAP, THEME_FONT_OVERRIDES } from '../config.mjs';

/**
 * Natural sort comparator — sorts numeric suffixes correctly.
 * e.g. blue-5, blue-10, blue-20, blue-100 (not blue-10, blue-100, blue-20)
 */
function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

/**
 * Group tokens by category for organized CSS output.
 * Primitives grouped by hue, semantics grouped by usage domain. Breakpoint
 * primitives are pulled out into their own bucket so they get their own
 * dedicated section in base.css (the canonical responsive breakpoints).
 */
function groupTokens(tokens) {
  const primitiveColors = new Map();
  const semanticColors = new Map();
  const wcpTokens = new Map();
  const breakpoints = new Map();

  for (const [cssVar, token] of tokens) {
    if (token.isBreakpoint) {
      breakpoints.set(cssVar, token);
      continue;
    }
    if (token.isWcp) {
      wcpTokens.set(cssVar, token);
      continue;
    }
    if (token.type === 'primitive') {
      // Group by hue: --ld-primitive-color-{hue}-{shade}
      const match = cssVar.match(/--ld-primitive-color-([a-z-]+?)(?:-\d+)?$/);
      const group = match ? match[1] : 'other';
      if (!primitiveColors.has(group)) primitiveColors.set(group, new Map());
      primitiveColors.get(group).set(cssVar, token);
    } else {
      // Group by domain: --ld-semantic-color-{domain}-...
      const match = cssVar.match(/--ld-semantic-color-([a-z]+)/);
      const group = match ? match[1] : 'other';
      if (!semanticColors.has(group)) semanticColors.set(group, new Map());
      semanticColors.get(group).set(cssVar, token);
    }
  }

  return { primitiveColors, semanticColors, wcpTokens, breakpoints };
}

const BREAKPOINT_ORDER = ['small', 'medium', 'large', 'xLarge', 'xxLarge'];

/**
 * Format the breakpoint section of base.css. Order is intentional (small →
 * xxLarge) so the file reads from narrowest to widest viewport — that ordering
 * matches the mobile-first responsive convention used in component CSS.
 * Unknown breakpoints (e.g. someone adds a new one in Airtable) are appended
 * after the canonical set in alphabetical order rather than dropped silently.
 */
function generateBreakpointSection(breakpoints) {
  if (breakpoints.size === 0) return '';
  const lines = [];
  lines.push('  /* Canonical responsive breakpoints. The pixel values are the source of');
  lines.push('     truth (see Airtable view viw3aImoD7tLBVm7S). CSS @media queries cannot');
  lines.push('     read var() — keep media-query literals (37.5rem/56.25rem/75rem)');
  lines.push('     numerically aligned with these tokens. No other breakpoints allowed. */');

  const byKey = new Map();
  for (const [cssVar, token] of breakpoints) {
    const m = cssVar.match(/--ld-primitive-scale-breakpoint-(.+)$/);
    byKey.set(m ? m[1] : cssVar, [cssVar, token]);
  }

  const seen = new Set();
  for (const key of BREAKPOINT_ORDER) {
    const entry = byKey.get(key);
    if (!entry) continue;
    seen.add(key);
    const [cssVar, token] = entry;
    lines.push(formatBaseVar(cssVar, token));
  }

  const extras = [...byKey.entries()]
    .filter(([k]) => !seen.has(k))
    .sort(([a], [b]) => naturalSort(a, b));
  for (const [, [cssVar, token]] of extras) {
    lines.push(formatBaseVar(cssVar, token));
  }

  return lines.join('\n');
}

/**
 * Format a CSS variable line for base.css (with var() reference for semantics).
 */
function formatBaseVar(cssVar, token) {
  if (token.type === 'semantic' && token.reference) {
    return `  ${cssVar}: var(${token.reference}, ${token.value});`;
  }
  return `  ${cssVar}: ${token.value};`;
}

/**
 * Format a CSS variable line for theme override files (raw values only).
 */
function formatOverrideVar(cssVar, token) {
  return `  ${cssVar}: ${token.value};`;
}

/**
 * Pretty-print a group label for CSS comments.
 */
function groupLabel(key) {
  return key
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Generate the color primitives section for base.css.
 */
function generatePrimitiveColorSection(primitiveColors) {
  const lines = [];

  // Collect black + white into a single "Base colors" group
  const baseColors = new Map();
  const scaleGroups = new Map();
  for (const [group, tokens] of primitiveColors) {
    if (group === 'black' || group === 'white') {
      for (const [k, v] of tokens) baseColors.set(k, v);
    } else {
      scaleGroups.set(group, tokens);
    }
  }

  // Base colors first
  if (baseColors.size > 0) {
    lines.push(`  /* Base colors */`);
    for (const [cssVar, token] of [...baseColors.entries()].sort(([a], [b]) => naturalSort(a, b))) {
      lines.push(formatBaseVar(cssVar, token));
    }
  }

  // Then hue scales in alphabetical order
  const sortedGroups = [...scaleGroups.keys()].sort();
  for (const group of sortedGroups) {
    const groupTokens = scaleGroups.get(group);
    const sorted = [...groupTokens.entries()].sort(([a], [b]) => naturalSort(a, b));

    lines.push('');
    lines.push(`  /* ${groupLabel(group)} color scale */`);
    for (const [cssVar, token] of sorted) {
      lines.push(formatBaseVar(cssVar, token));
    }
  }

  return lines.join('\n');
}

/**
 * Generate the semantic colors section for base.css.
 */
function generateSemanticColorSection(semanticColors) {
  const lines = [];
  const sortedGroups = [...semanticColors.keys()].sort();

  for (const group of sortedGroups) {
    const groupTokens = semanticColors.get(group);
    const sorted = [...groupTokens.entries()].sort(([a], [b]) => naturalSort(a, b));

    lines.push('');
    lines.push(`  /* ========================================`);
    lines.push(`     ${groupLabel(group).toUpperCase()} COLORS`);
    lines.push(`     ======================================== */`);

    for (const [cssVar, token] of sorted) {
      lines.push(formatBaseVar(cssVar, token));
    }
  }

  return lines.join('\n');
}

/**
 * Generate the WCP section for base.css.
 */
function generateWcpSection(wcpTokens) {
  if (wcpTokens.size === 0) return '';
  const lines = [];
  const sorted = [...wcpTokens.entries()].sort(([a], [b]) => naturalSort(a, b));

  lines.push('');
  lines.push('  /* ═══════════════════════════════════════════════════ */');
  lines.push('  /* WCP (Walmart Connect Platform) Extended Tokens     */');
  lines.push('  /* ═══════════════════════════════════════════════════ */');
  lines.push('');

  for (const [cssVar, token] of sorted) {
    lines.push(formatBaseVar(cssVar, token));
  }

  return lines.join('\n');
}

/**
 * Insert or replace content between marker comments in a file.
 * If markers don't exist yet, inserts them at the appropriate location.
 */
function spliceMarkerSection(content, startMarker, endMarker, newContent) {
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);

  if (startIdx !== -1 && endIdx !== -1) {
    // Replace between markers
    return (
      content.substring(0, startIdx + startMarker.length) +
      '\n' +
      newContent +
      '\n  ' +
      content.substring(endIdx)
    );
  }

  // Markers not found — return null to signal we need different insertion logic
  return null;
}

/**
 * Update base.css with color tokens from Airtable.
 * Strategy: Replace the color primitive section, semantic color section, and WCP section
 * using marker comments. First run inserts markers; subsequent runs replace between them.
 */
export function updateBaseCss(baseTokens, { dryRun = false, verbose = false } = {}) {
  const { primitiveColors, semanticColors, wcpTokens, breakpoints } = groupTokens(baseTokens);

  const primSection = generatePrimitiveColorSection(primitiveColors);
  const semSection = generateSemanticColorSection(semanticColors);
  const wcpSection = generateWcpSection(wcpTokens);
  const breakpointSection = generateBreakpointSection(breakpoints);

  let css = readFileSync(PATHS.baseCss, 'utf-8');

  // Try marker-based replacement first
  let updated = spliceMarkerSection(css, CSS_MARKERS.colorStart, CSS_MARKERS.colorEnd, primSection + '\n' + semSection);

  if (updated) {
    css = updated;
  } else {
    // First run: insert markers. Find the `:root {` line and the ELEVATION section.
    const rootIdx = css.indexOf(':root {');
    const elevationIdx = css.indexOf('ELEVATION/SHADOW TOKENS');
    if (rootIdx === -1 || elevationIdx === -1) {
      throw new Error('Cannot find :root { or ELEVATION/SHADOW TOKENS in base.css');
    }

    // Find the line before ELEVATION (the section comment start)
    const beforeElevation = css.lastIndexOf('  /* ===', elevationIdx);

    const beforeColors = css.indexOf('\n', rootIdx) + 1;
    const preservedMiddle = ''; // We'll regenerate the color section entirely

    css =
      css.substring(0, beforeColors) +
      '  ' + CSS_MARKERS.colorStart + '\n' +
      primSection + '\n' +
      semSection + '\n' +
      '  ' + CSS_MARKERS.colorEnd + '\n\n' +
      css.substring(beforeElevation);
  }

  // Breakpoint section — sits between the color block and the WCP/elevation
  // tail. First run inserts the markers right after the color block.
  let breakpointUpdated = spliceMarkerSection(css, CSS_MARKERS.breakpointStart, CSS_MARKERS.breakpointEnd, breakpointSection);
  if (breakpointUpdated) {
    css = breakpointUpdated;
  } else if (breakpointSection) {
    const colorEndIdx = css.indexOf(CSS_MARKERS.colorEnd);
    if (colorEndIdx !== -1) {
      const insertAt = css.indexOf('\n', colorEndIdx) + 1;
      css =
        css.substring(0, insertAt) +
        '\n  ' + CSS_MARKERS.breakpointStart + '\n' +
        breakpointSection + '\n' +
        '  ' + CSS_MARKERS.breakpointEnd + '\n' +
        css.substring(insertAt);
    }
  }

  // WCP section
  let wcpUpdated = spliceMarkerSection(css, CSS_MARKERS.wcpStart, CSS_MARKERS.wcpEnd, wcpSection);
  if (wcpUpdated) {
    css = wcpUpdated;
  } else {
    // Insert WCP markers before the closing } of :root
    // Find the WCP section or the closing brace
    const wcpExisting = css.indexOf('WCP (Walmart Connect Platform)');
    if (wcpExisting !== -1) {
      // Find the start of that section comment
      const wcpSectionStart = css.lastIndexOf('  /* ═', wcpExisting);
      // Find the closing } of :root after WCP
      const closingBrace = css.indexOf('\n}', wcpExisting);

      css =
        css.substring(0, wcpSectionStart) +
        '  ' + CSS_MARKERS.wcpStart + '\n' +
        wcpSection + '\n' +
        '  ' + CSS_MARKERS.wcpEnd + '\n' +
        css.substring(closingBrace);
    } else {
      // No existing WCP section, insert before closing }
      const lastClosingBrace = css.lastIndexOf('\n}');
      css =
        css.substring(0, lastClosingBrace) +
        '\n  ' + CSS_MARKERS.wcpStart + '\n' +
        wcpSection + '\n' +
        '  ' + CSS_MARKERS.wcpEnd + '\n' +
        css.substring(lastClosingBrace);
    }
  }

  if (dryRun) {
    const primCount = [...primitiveColors.values()].reduce((sum, g) => sum + g.size, 0);
    const semCount = [...semanticColors.values()].reduce((sum, g) => sum + g.size, 0);
    console.log(`[dry-run] base.css: ${primCount} primitives, ${semCount} semantics, ${wcpTokens.size} WCP tokens, ${breakpoints.size} breakpoints`);
    return;
  }

  writeFileSync(PATHS.baseCss, css);
  if (verbose) {
    const primCount = [...primitiveColors.values()].reduce((sum, g) => sum + g.size, 0);
    const semCount = [...semanticColors.values()].reduce((sum, g) => sum + g.size, 0);
    console.log(`  base.css: ${primCount} primitives, ${semCount} semantics, ${wcpTokens.size} WCP, ${breakpoints.size} breakpoints`);
  }
}

/**
 * Generate a theme override CSS file.
 */
function generateThemeOverrideCss(themeName, config, overrides) {
  const displayName = config.displayName || themeName;
  const lines = [];

  lines.push(`/**`);
  lines.push(` * ${displayName} Theme`);
  lines.push(` * Auto-generated from Airtable — do not edit manually`);
  lines.push(` */`);
  lines.push('');
  lines.push(`${config.selector} {`);

  // Split into primitives and semantics, each sorted
  const primitives = [];
  const semantics = [];

  for (const [cssVar, token] of overrides) {
    if (token.type === 'primitive') {
      primitives.push([cssVar, token]);
    } else {
      semantics.push([cssVar, token]);
    }
  }

  primitives.sort(([a], [b]) => naturalSort(a, b));
  semantics.sort(([a], [b]) => naturalSort(a, b));

  const fontOverride = THEME_FONT_OVERRIDES[config.file];
  if (fontOverride) {
    lines.push(`  --ld-primitive-font-family-sans: ${fontOverride};`);
    if (primitives.length > 0 || semantics.length > 0) {
      lines.push('');
    }
  }

  for (const [cssVar, token] of primitives) {
    lines.push(formatOverrideVar(cssVar, token));
  }
  if (primitives.length > 0 && semantics.length > 0) {
    lines.push('');
  }
  for (const [cssVar, token] of semantics) {
    lines.push(formatOverrideVar(cssVar, token));
  }

  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

/**
 * Write all theme override CSS files.
 */
function writeThemeOverrides(themeResults, { dryRun = false, verbose = false } = {}) {
  const fileGroups = new Map();

  for (const [themeName, { overrides, config }] of themeResults) {
    if (!config.file || config.file === 'base.css') continue;

    if (!fileGroups.has(config.file)) {
      fileGroups.set(config.file, new Map());
    }
    
    const fileGroup = fileGroups.get(config.file);
    if (!fileGroup.has(config.selector)) {
      fileGroup.set(config.selector, {
        themeName,
        config,
        overrides: new Map(overrides)
      });
    } else {
      // Merge overrides for the same selector
      const existing = fileGroup.get(config.selector);
      for (const [cssVar, token] of overrides) {
        existing.overrides.set(cssVar, token);
      }
    }
  }

  for (const [file, selectorsMap] of fileGroups) {
    const filePath = resolve(PATHS.themesDir, file);
    const cssBlocks = [];
    let totalOverrides = 0;

    for (const { themeName, config, overrides } of selectorsMap.values()) {
      const css = generateThemeOverrideCss(themeName, config, overrides);
      cssBlocks.push(css);
      totalOverrides += overrides.size;
    }

    if (dryRun) {
      console.log(`[dry-run] ${file}: ${totalOverrides} overrides`);
      continue;
    }

    writeFileSync(filePath, cssBlocks.join('\n'));
    if (verbose) console.log(`  ${file}: ${totalOverrides} overrides`);
  }
}

/**
 * Generate all CSS files from resolved theme data.
 */
export async function generateAllCss(resolvedData, opts = {}) {
  const { base, themes } = resolvedData;

  if (opts.verbose) console.log('Generating CSS...');

  updateBaseCss(base.tokens, opts);
  writeThemeOverrides(themes, opts);

  const totalOverrides = [...themes.values()].reduce((sum, t) => sum + t.overrides.size, 0);
  console.log(`  Updated base.css + ${themes.size} theme files (${totalOverrides} total overrides)`);
}
