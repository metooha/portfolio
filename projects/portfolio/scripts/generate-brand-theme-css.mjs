#!/usr/bin/env node
/**
 * Generate client brand theme CSS files using the override-only inheritance model
 * (see src/app/components/theme/THEME_INHERITANCE.md):
 *   1. LD Base (base-tokens.css :root) — complete token set, always loaded
 *   2. Theme files — ONLY primitives/semantics that differ from LD Base
 *
 * Usage: node scripts/generate-brand-theme-css.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THEME_DIR = path.join(__dirname, '../src/app/components/theme');
const BASE_TOKENS_PATH = path.join(THEME_DIR, 'base-tokens.css');
const BRAND_PRIMITIVES_TS = path.join(
  __dirname,
  '../src/component-library/theme-editor/theme-primitives.ts',
);

const STEPS = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];
const TRANSPARENT_STEPS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

function familyKey(figmaFamily) {
  return figmaFamily.replace(/\s+/g, '-');
}

function figmaColorToCss(value) {
  const v = String(value).trim().toLowerCase();
  if (v.startsWith('rgba(') || v.startsWith('rgb(')) return v;
  if (!v.startsWith('#')) return v;
  const hex = v.slice(1);
  if (hex.length === 8) {
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    const a = Number.parseInt(hex.slice(6, 8), 16) / 255;
    const alpha = Number.isInteger(a * 10000) ? (a / 1).toFixed(4) : a.toFixed(4);
    return `rgba(${r}, ${g}, ${b}, ${alpha.replace(/0+$/, '').replace(/\.$/, '.0')})`;
  }
  return `#${hex}`;
}

/** Convert Figma primitive/color/* keys to --ld-primitive-color-* CSS custom properties. */
function figmaVarsToCssRecord(vars) {
  const out = {};
  for (const [key, rawValue] of Object.entries(vars)) {
    const cssValue = figmaColorToCss(rawValue);
    if (key === 'primitive/color/white') {
      out['--ld-primitive-color-white'] = cssValue;
      continue;
    }
    if (key === 'primitive/color/black') {
      out['--ld-primitive-color-black'] = cssValue;
      continue;
    }
    const match = key.match(/^primitive\/color\/([^/]+)\/(\d+)$/);
    if (!match) continue;
    const family = familyKey(match[1]);
    const step = match[2];
    out[`--ld-primitive-color-${family}-${step}`] = cssValue;
  }
  return out;
}

function parseCssCustomProperties(text) {
  const record = {};
  const re = /^\s*(--ld-primitive-color-[^:]+):\s*([^;]+);/gm;
  let match;
  while ((match = re.exec(text)) !== null) {
    record[match[1]] = match[2].trim();
  }
  return record;
}

/** Parse all LD/WCP custom properties from a theme block body. */
function parseAllThemeCustomProperties(text) {
  const record = {};
  const re = /^\s*(--(?:ld|wcp)-[^:]+):\s*([^;]+);/gm;
  let match;
  while ((match = re.exec(text)) !== null) {
    record[match[1]] = match[2].trim();
  }
  return record;
}

function isPrimitiveColorToken(token) {
  return token.startsWith('--ld-primitive-color-')
    || token === '--ld-primitive-color-black'
    || token === '--ld-primitive-color-white';
}

function splitThemeVars(allVars) {
  const primitives = {};
  const semantics = {};
  for (const [token, value] of Object.entries(allVars)) {
    if (isPrimitiveColorToken(token)) {
      primitives[token] = value;
    } else {
      semantics[token] = value;
    }
  }
  return { primitives, semantics };
}

/** Tokens in `full` that differ from `base` (inheritance overrides only). */
function diffRecords(base, full) {
  const delta = {};
  for (const [token, value] of Object.entries(full)) {
    if (base[token] !== value) {
      delta[token] = value;
    }
  }
  return delta;
}

function loadBaseTokenSections() {
  const css = fs.readFileSync(BASE_TOKENS_PATH, 'utf8');
  const tokensStart = css.indexOf('/* === AUTO-GENERATED: COLOR TOKENS START === */');
  const actionStart = css.indexOf('/* ========================================\n     ACTION COLORS');
  const tokensEnd = css.indexOf('/* === AUTO-GENERATED: COLOR TOKENS END === */');

  if (tokensStart === -1 || actionStart === -1 || tokensEnd === -1) {
    throw new Error('Could not locate color token markers in base-tokens.css');
  }

  const primitiveSection = css.slice(tokensStart, actionStart);
  const semanticBlock = css.slice(actionStart, tokensEnd).trimEnd();

  return {
    basePrimitives: parseCssCustomProperties(primitiveSection),
    semanticBlock,
  };
}

function mergeRecords(base, ...overrides) {
  return { ...base, ...Object.assign({}, ...overrides) };
}

/** light-green and wm-green exist in Figma base color only for WM — strip from other themes. */
const WM_ONLY_SCALE_FAMILIES = ['light-green', 'wm-green'];

function stripWmOnlyScales(record) {
  return Object.fromEntries(
    Object.entries(record).filter(([token]) =>
      !WM_ONLY_SCALE_FAMILIES.some((family) => token.includes(`-${family}-`)),
    ),
  );
}

function lerpChannel(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function lerpHex(hexA, hexB, t) {
  const a = hexA.replace('#', '');
  const b = hexB.replace('#', '');
  const r = lerpChannel(parseInt(a.slice(0, 2), 16), parseInt(b.slice(0, 2), 16), t);
  const g = lerpChannel(parseInt(a.slice(2, 4), 16), parseInt(b.slice(2, 4), 16), t);
  const bl = lerpChannel(parseInt(a.slice(4, 6), 16), parseInt(b.slice(4, 6), 16), t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl.toString(16).padStart(2, '0')}`;
}

function darkenHex(hex, factor = 0.88) {
  const h = hex.replace('#', '');
  const r = Math.max(0, Math.round(parseInt(h.slice(0, 2), 16) * factor));
  const g = Math.max(0, Math.round(parseInt(h.slice(2, 4), 16) * factor));
  const b = Math.max(0, Math.round(parseInt(h.slice(4, 6), 16) * factor));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/** Open Color 0–9 → LD steps (6 = brand / 100). Source: Oportun swatch sheet. */
const OC_LD_STEPS = [5, 10, 20, 30, 40, 50, 100, 110, 120, 130];
const OC_EXTRA_LD_STEPS = [140, 150, 160, 170, 180];

function openColorFamilyToFigma(family, values10) {
  const out = {};
  for (let i = 0; i < 10; i++) {
    out[`primitive/color/${family}/${OC_LD_STEPS[i]}`] = values10[i].toLowerCase();
  }
  let dark = values10[9].toLowerCase();
  for (const step of OC_EXTRA_LD_STEPS) {
    dark = darkenHex(dark);
    out[`primitive/color/${family}/${step}`] = dark;
  }
  return out;
}

/** WM sheet anchors at 10 / 50 / 100 → LD scale (50 = brand → LD 100). */
function wmAnchorsToFigma(family, anchors) {
  const c10 = anchors[10];
  const c50 = anchors[50];
  const c100 = anchors[100];
  const out = {};
  for (const step of STEPS) {
    let hex;
    if (step <= 10) {
      hex = step === 5 ? lerpHex('#ffffff', c10, 0.35) : c10;
    } else if (step <= 100) {
      const t = (step - 10) / 90;
      hex = lerpHex(c10, c50, t);
    } else {
      const t = (step - 100) / 80;
      hex = lerpHex(c50, c100, t);
    }
    out[`primitive/color/${family}/${step}`] = hex.toLowerCase();
  }
  return out;
}

function ldScaleToFigma(family, stepValues) {
  const out = {};
  for (const [step, hex] of Object.entries(stepValues)) {
    out[`primitive/color/${family}/${step}`] = hex.toLowerCase();
  }
  return out;
}

/** Oportun primitive LD scales — from Figma Foundations swatch sheets (node 37:54280). */
const OPORTUN_BLUE_LD = {
  5: '#E7F2FB',
  10: '#D0E5FB',
  20: '#B9D8F5',
  30: '#A2CBF2',
  40: '#8BBEEF',
  50: '#73B1EB',
  60: '#5CA4E8',
  70: '#4597E5',
  80: '#2E8AE2',
  90: '#177DDF',
  100: '#0071DC',
  110: '#0066C8',
  120: '#005CB4',
  130: '#0052A0',
  140: '#00478C',
  150: '#003D77',
  160: '#003364',
  170: '#002950',
  180: '#001427',
};

const OPORTUN_TEAL_LD = {
  5: '#E9F6F7',
  10: '#D3EEF1',
  20: '#BDE6E7',
  30: '#A7DCDF',
  40: '#91D3D7',
  50: '#7BCDCE',
  60: '#65C5C7',
  70: '#4FBCBF',
  80: '#39B4B7',
  90: '#23ACAF',
  100: '#0EA4A8',
  110: '#0C9598',
  120: '#0B8689',
  130: '#0A777A',
  140: '#08686A',
  150: '#07595B',
  160: '#064A4C',
  170: '#053B3D',
  180: '#032C2D',
};

const OPORTUN_ORANGE_LD = {
  5: '#FDF0E8',
  10: '#FCE2D1',
  20: '#FBD4BB',
  30: '#FAC5A4',
  40: '#F9B78E',
  50: '#F8A977',
  60: '#F79B61',
  70: '#F68C4A',
  80: '#F57E34',
  90: '#F4701D',
  100: '#F36207',
  110: '#DC5906',
  120: '#C65005',
  130: '#B04705',
  140: '#9A3E04',
  150: '#843503',
  160: '#6E2C03',
  170: '#582302',
  180: '#421A01',
};

const OPORTUN_GRAY_LD = {
  5: '#F8F8F8',
  10: '#F1F1F2',
  20: '#E3E4E5',
  30: '#D5D6D8',
  40: '#C7C8CB',
  50: '#BABBBF',
  60: '#ACADB3',
  70: '#9E9FA3',
  80: '#909196',
  90: '#828489',
  100: '#74767C',
  110: '#686A70',
  120: '#5D5E63',
  130: '#515357',
  140: '#46474A',
  150: '#3A3B3E',
  160: '#2E2F32',
  170: '#232325',
  180: '#171819',
};

const OPORTUN_PINK_LD = {
  5: '#FCF4F9',
  10: '#FAEAF4',
  20: '#F5D5E9',
  30: '#EFC0DE',
  40: '#EAABD3',
  50: '#E596C8',
  60: '#E080BC',
  70: '#DB6BB1',
  80: '#D556A6',
  90: '#D0419B',
  100: '#CB2C90',
  110: '#B72882',
  120: '#A22373',
  130: '#8E1F65',
  140: '#7A1A56',
  150: '#661648',
  160: '#3D0D2B',
  170: '#5C1441',
  180: '#29091D',
};

const OPORTUN_PURPLE_LD = {
  5: '#F1EEFD',
  10: '#E4DEFB',
  20: '#D6CDF9',
  30: '#C9BDF7',
  40: '#BCADF5',
  50: '#AE9CF3',
  60: '#A18CF1',
  70: '#947CEF',
  80: '#795BEB',
  90: '#6C4BE9',
  100: '#6244D3',
  110: '#583DBE',
  120: '#4E36A9',
  130: '#442F94',
  140: '#3A287F',
  150: '#312269',
  160: '#271B54',
  170: '#1D143F',
  180: '#130D2A',
};

const OPORTUN_RED_LD = {
  5: '#FEEAE8',
  10: '#FED5D1',
  20: '#FEC0BA',
  30: '#FDABA3',
  40: '#FD968C',
  50: '#FD8176',
  60: '#FD6C5F',
  70: '#FC5748',
  80: '#FC4231',
  90: '#FC2D1A',
  100: '#FC1904',
  110: '#E51603',
  120: '#CE1403',
  130: '#B71202',
  140: '#A00F02',
  150: '#890D02',
  160: '#720B01',
  170: '#5B0801',
  180: '#440601',
};

const OPORTUN_CYAN_LD = {
  5: '#EBF6FC',
  10: '#D8EEFA',
  20: '#C4E6F7',
  30: '#B1DEF5',
  40: '#9ED6F2',
  50: '#8ACDF0',
  60: '#77C5ED',
  70: '#64BDEB',
  80: '#50B5E8',
  90: '#3DADE6',
  100: '#2AA5E4',
  110: '#2696CF',
  120: '#2287BA',
  130: '#1E78A5',
  140: '#1A6991',
  150: '#165A7C',
  160: '#0F3C52',
  170: '#134B67',
  180: '#0B2D3E',
};

/** Oportun green — full LD scale from Figma primitive swatches (primary brand). */
const OPORTUN_GREEN_LD = {
  5: '#E7FAEF',
  10: '#D0F5E0',
  20: '#B9F0D1',
  30: '#A2EBC2',
  40: '#8BE6B3',
  50: '#73E1A4',
  60: '#5CDC95',
  70: '#45D786',
  80: '#2ED277',
  90: '#17CD68',
  100: '#00C859',
  110: '#00B550',
  120: '#00A348',
  130: '#009140',
  140: '#007F38',
  150: '#006D30',
  160: '#005A28',
  170: '#004B20',
  180: '#003618',
};

/** Oportun yellow — full LD scale from Figma primitive swatches. */
const OPORTUN_YELLOW_LD = {
  5: '#FFFAEA',
  10: '#FFF6D6',
  20: '#FFF1C2',
  30: '#FFEDAD',
  40: '#FFE899',
  50: '#FFE485',
  60: '#FFDF71',
  70: '#FFDB5C',
  80: '#FFD648',
  90: '#FFD234',
  100: '#FFCE20',
  110: '#E7BB1D',
  120: '#D0A81A',
  130: '#B99517',
  140: '#A28214',
  150: '#735D0E',
  160: '#5C4A0B',
  170: '#453808',
  180: '#2E2505',
};

function buildOportunVars() {
  const ldScales = {
    blue: OPORTUN_BLUE_LD,
    teal: OPORTUN_TEAL_LD,
    orange: OPORTUN_ORANGE_LD,
    gray: OPORTUN_GRAY_LD,
    pink: OPORTUN_PINK_LD,
    purple: OPORTUN_PURPLE_LD,
    red: OPORTUN_RED_LD,
    green: OPORTUN_GREEN_LD,
    yellow: OPORTUN_YELLOW_LD,
    cyan: OPORTUN_CYAN_LD,
  };
  const vars = {
    'primitive/color/white': '#ffffff',
    'primitive/color/black': '#000000',
    ...TRANSPARENT_VARS,
  };
  for (const [family, scale] of Object.entries(ldScales)) {
    Object.assign(vars, ldScaleToFigma(family, scale));
  }
  return vars;
}

function buildWmVars() {
  const anchors = {
    gray: { 10: '#F2F2F2', 50: '#999999', 100: '#1A1A1A' },
    yellow: { 10: '#FFF9E5', 50: '#FFC220', 100: '#806110' },
    blue: { 10: '#E6EBF5', 50: '#004F9A', 100: '#001A33' },
    teal: { 10: '#E5F7F7', 50: '#008296', 100: '#002B32' },
    'light-green': { 10: '#E6FAF0', 50: '#00C878', 100: '#004228' },
    green: { 10: '#E6FAF0', 50: '#007120', 100: '#002810' },
    red: { 10: '#FDEAE8', 50: '#D9291C', 100: '#5A0F09' },
    orange: { 10: '#FFF0E5', 50: '#FF8200', 100: '#662E00' },
    cyan: { 10: '#E5F5FC', 50: '#009BD9', 100: '#003D56' },
    purple: { 10: '#F0E8F4', 50: '#7A2E9E', 100: '#311240' },
    pink: { 10: '#FCE8F0', 50: '#A31F61', 100: '#410C27' },
  };
  const vars = {
    'primitive/color/white': '#ffffff',
    'primitive/color/black': '#000000',
    ...TRANSPARENT_VARS,
  };
  for (const [family, familyAnchors] of Object.entries(anchors)) {
    Object.assign(vars, wmAnchorsToFigma(family, familyAnchors));
  }
  // WM case study: LD brand blues use the WM green ramp.
  for (const step of STEPS) {
    const green = vars[`primitive/color/green/${step}`];
    if (green) vars[`primitive/color/blue/${step}`] = green;
  }
  // Partial wm-green scale (Figma base only defines 5,10,20,30,50).
  for (const step of [5, 10, 20, 30, 50]) {
    const green = vars[`primitive/color/green/${step}`];
    if (green) vars[`primitive/color/wm-green/${step}`] = green;
  }
  return vars;
}

/** Spark is universal LD Base (#ffc220) — never override per theme. */
function stripSparkPrimitiveTokens(record) {
  return Object.fromEntries(
    Object.entries(record).filter(([token]) => !token.includes('-spark-')),
  );
}

/** Semantic tokens referencing spark also inherit from LD Base. */
function stripSparkSemanticTokens(record) {
  return Object.fromEntries(
    Object.entries(record).filter(([token]) => !token.includes('-spark')),
  );
}

const STANDARD_SCALE_FAMILIES = [
  'blue',
  'cyan',
  'gray',
  'green',
  'orange',
  'pink',
  'purple',
  'red',
  'spark',
  'teal',
  'yellow',
];

function scaleFamiliesForTheme(themeName) {
  if (themeName === 'WM') {
    return [...STANDARD_SCALE_FAMILIES, ...WM_ONLY_SCALE_FAMILIES];
  }
  return STANDARD_SCALE_FAMILIES;
}

/** Extract primitive color vars from each `[data-ld-theme="…"]` block in a CSS file. */
function parseThemeBlocksFromCss(cssText) {
  const themes = {};
  let index = 0;
  while (index < cssText.length) {
    const marker = cssText.indexOf('[data-ld-theme="', index);
    if (marker === -1) break;
    const nameStart = marker + '[data-ld-theme="'.length;
    const nameEnd = cssText.indexOf('"', nameStart);
    if (nameEnd === -1) break;
    const themeName = cssText.slice(nameStart, nameEnd);
    const braceStart = cssText.indexOf('{', nameEnd);
    if (braceStart === -1) break;
    let depth = 1;
    let pos = braceStart + 1;
    while (pos < cssText.length && depth > 0) {
      const char = cssText[pos];
      if (char === '{') depth += 1;
      else if (char === '}') depth -= 1;
      pos += 1;
    }
    const blockBody = cssText.slice(braceStart + 1, pos - 1);
    const allVars = parseAllThemeCustomProperties(blockBody);
    if (Object.keys(allVars).length > 0) {
      const { primitives, semantics } = splitThemeVars(allVars);
      themes[themeName] ??= { primitives: {}, semantics: {} };
      Object.assign(themes[themeName].primitives, primitives);
      Object.assign(themes[themeName].semantics, semantics);
    }
    index = pos;
  }
  return themes;
}

function parseOfficialThemeCssFiles(basePrimitives) {
  const officialFiles = [
    'brands/walmart.css',
    'brands/sams-club.css',
    'brands/walmart-b2b.css',
    'brands/bodega.css',
    'brands/cashi-mx.css',
    'brands/walmart-legacy.css',
  ];
  const primitiveOverrides = {};
  const semanticOverrides = {};
  for (const relativePath of officialFiles) {
    const filePath = path.join(THEME_DIR, relativePath);
    if (!fs.existsSync(filePath)) continue;
    const blocks = parseThemeBlocksFromCss(fs.readFileSync(filePath, 'utf8'));
    for (const [themeName, { primitives, semantics }] of Object.entries(blocks)) {
      if (Object.keys(primitives).length > 0) {
        const merged = mergeRecords(basePrimitives, primitives);
        primitiveOverrides[themeName] = stripSparkPrimitiveTokens(
          diffRecords(basePrimitives, merged),
        );
      }
      if (Object.keys(semantics).length > 0) {
        semanticOverrides[themeName] = stripSparkSemanticTokens({
          ...(semanticOverrides[themeName] ?? {}),
          ...semantics,
        });
      }
    }
  }
  return { primitiveOverrides, semanticOverrides };
}

function cssRecordToFamilies(record) {
  const byFamily = {};
  for (const [token, value] of Object.entries(record)) {
    if (token === '--ld-primitive-color-white') {
      byFamily.white = { _: value };
      continue;
    }
    if (token === '--ld-primitive-color-black') {
      byFamily.black = { _: value };
      continue;
    }
    const match = token.match(/^--ld-primitive-color-(.+)-(\d+)$/);
    if (!match) continue;
    const family = match[1];
    const step = match[2];
    byFamily[family] ??= {};
    byFamily[family][step] = value;
  }
  return byFamily;
}

function renderPrimitiveOverrides(overrides) {
  if (!overrides || Object.keys(overrides).length === 0) return '';
  const byFamily = cssRecordToFamilies(overrides);
  const scaleFamilies = Object.keys(byFamily)
    .filter((family) => family !== 'black' && family !== 'white')
    .sort((a, b) => a.localeCompare(b));

  const lines = ['  /* === PRIMITIVE OVERRIDES (inherit LD Base for everything else) === */'];
  if (byFamily.black) lines.push(`  --ld-primitive-color-black: ${byFamily.black._};`);
  if (byFamily.white) lines.push(`  --ld-primitive-color-white: ${byFamily.white._};`);

  for (const family of scaleFamilies) {
    const stepList = family.startsWith('transparent') ? TRANSPARENT_STEPS : STEPS;
    lines.push(`  /* ${family} */`);
    for (const step of stepList) {
      const value = byFamily[family][String(step)];
      if (value) lines.push(`  --ld-primitive-color-${family}-${step}: ${value};`);
    }
  }

  return `${lines.join('\n')}\n`;
}

function renderSemanticOverrides(overrides) {
  if (!overrides || Object.keys(overrides).length === 0) return '';
  const lines = Object.entries(overrides).map(([token, value]) => `  ${token}: ${value};`);
  return `  /* === SEMANTIC OVERRIDES === */\n${lines.join('\n')}\n`;
}

function writeTheme({
  name,
  font,
  primitiveOverrides,
  semanticOverrides,
  sourceNote,
  inherits = 'LD Base (base-tokens.css :root)',
  colorScheme,
}) {
  const header = `/**
 * "${name}" theme — override-only (CSS cascade inheritance).
 *
 * Inherits: ${inherits}
 * Activate with \`data-ld-theme="${name}"\`.
 *
 * ${sourceNote}
 *
 * See THEME_INHERITANCE.md — only tokens that differ from the parent are declared here.
 * Auto-generated via scripts/generate-brand-theme-css.mjs — do not edit by hand.
 */`;

  const fontLine = font ? `  --ld-primitive-font-family-sans: ${font};\n` : '';
  const colorSchemeLine = colorScheme ? `  color-scheme: ${colorScheme};\n` : '';
  const primitiveBlock = renderPrimitiveOverrides(primitiveOverrides);
  const semanticBlock = renderSemanticOverrides(semanticOverrides);

  return `${header}

[data-ld-theme="${name}"] {
${colorSchemeLine}${fontLine}${primitiveBlock}${semanticBlock}}
`;
}

function renderThemePrimitivesModule({
  basePrimitives,
  themePrimitiveOverrides,
  themeSemanticOverrides,
}) {
  const baseBody = JSON.stringify(basePrimitives, null, 2)
    .split('\n')
    .map((line, index) => (index === 0 ? line : `  ${line}`))
    .join('\n');

  const primitiveOverridesBody = JSON.stringify(themePrimitiveOverrides, null, 2)
    .split('\n')
    .map((line, index) => (index === 0 ? line : `  ${line}`))
    .join('\n');

  const semanticOverridesBody = JSON.stringify(themeSemanticOverrides, null, 2)
    .split('\n')
    .map((line, index) => (index === 0 ? line : `  ${line}`))
    .join('\n');

  return `/**
 * Auto-generated via scripts/generate-brand-theme-css.mjs
 * Inheritance model: LD Base + per-theme override deltas (see THEME_INHERITANCE.md).
 * Do not edit by hand — re-run the script after token updates.
 */
import type { ThemeName } from '@/app/components/utils/Theming';

/** LD Base primitive colors from base-tokens.css (:root). */
export const BASE_PRIMITIVE_VARS: Record<string, string> = ${baseBody};

/** Per-theme primitive overrides (only tokens that differ from LD Base). */
export const THEME_PRIMITIVE_OVERRIDES: Partial<Record<ThemeName, Record<string, string>>> = ${primitiveOverridesBody};

/** Per-theme semantic overrides (only tokens that differ from LD Base semantics). */
export const THEME_SEMANTIC_OVERRIDES: Partial<Record<ThemeName, Record<string, string>>> = ${semanticOverridesBody};

/** Resolved primitive map: LD Base + theme overrides. */
export function resolveThemePrimitiveVars(
  themeName: ThemeName,
): Record<string, string> {
  return {
    ...BASE_PRIMITIVE_VARS,
    ...(THEME_PRIMITIVE_OVERRIDES[themeName] ?? {}),
  };
}

/** @deprecated Use THEME_PRIMITIVE_OVERRIDES — full maps kept for backwards compatibility. */
export const THEME_PRIMITIVE_VARS: Partial<Record<ThemeName, Record<string, string>>> = {
  Walmart: BASE_PRIMITIVE_VARS,
  ...Object.fromEntries(
    Object.entries(THEME_PRIMITIVE_OVERRIDES).map(([name, overrides]) => [
      name,
      { ...BASE_PRIMITIVE_VARS, ...overrides },
    ]),
  ),
} as Partial<Record<ThemeName, Record<string, string>>>;

/** Walmart resolved primitives (alias for LD Base). */
export const WALMART_PRIMITIVE_VARS: Record<string, string> = BASE_PRIMITIVE_VARS;
`;
}

const TRANSPARENT_VARS = {
  'primitive/color/transparentLight/0': '#ffffff00',
  'primitive/color/transparentLight/10': '#ffffff1a',
  'primitive/color/transparentLight/20': '#ffffff33',
  'primitive/color/transparentLight/30': '#ffffff4d',
  'primitive/color/transparentLight/40': '#ffffff66',
  'primitive/color/transparentLight/50': '#ffffff80',
  'primitive/color/transparentLight/60': '#ffffff99',
  'primitive/color/transparentLight/70': '#ffffffb2',
  'primitive/color/transparentLight/80': '#ffffffcc',
  'primitive/color/transparentLight/90': '#ffffffe5',
  'primitive/color/transparentDark/0': '#00000000',
  'primitive/color/transparentDark/10': '#0000001a',
  'primitive/color/transparentDark/20': '#00000033',
  'primitive/color/transparentDark/30': '#0000004d',
  'primitive/color/transparentDark/40': '#00000066',
  'primitive/color/transparentDark/50': '#00000080',
  'primitive/color/transparentDark/60': '#00000099',
  'primitive/color/transparentDark/70': '#000000b2',
  'primitive/color/transparentDark/80': '#000000cc',
  'primitive/color/transparentDark/90': '#000000e5',
};

const OPORTUN_VARS = buildOportunVars();
const WM_VARS = buildWmVars();

const XENSE_VARS = {
  'primitive/color/white': '#ffffff',
  'primitive/color/black': '#000000',
  'primitive/color/gray/5': '#f8f8f8',
  'primitive/color/gray/10': '#eff1f2',
  'primitive/color/gray/20': '#e8eaec',
  'primitive/color/gray/30': '#e0e3e5',
  'primitive/color/gray/40': '#d8dcdf',
  'primitive/color/gray/50': '#d1d5d9',
  'primitive/color/gray/60': '#c9ced3',
  'primitive/color/gray/70': '#c1c7cc',
  'primitive/color/gray/80': '#bac0c6',
  'primitive/color/gray/90': '#828489',
  'primitive/color/gray/100': '#74767c',
  'primitive/color/gray/110': '#686a70',
  'primitive/color/gray/120': '#5d5e63',
  'primitive/color/gray/130': '#515357',
  'primitive/color/gray/140': '#46474a',
  'primitive/color/gray/150': '#3a3b3e',
  'primitive/color/gray/160': '#2e2f32',
  'primitive/color/gray/170': '#232325',
  'primitive/color/gray/180': '#000000',
  'primitive/color/cyan/5': '#e7ffff',
  'primitive/color/cyan/10': '#d0ffff',
  'primitive/color/cyan/20': '#b9ffff',
  'primitive/color/cyan/30': '#a2ffff',
  'primitive/color/cyan/40': '#8bffff',
  'primitive/color/cyan/50': '#73ffff',
  'primitive/color/cyan/60': '#5cffff',
  'primitive/color/cyan/70': '#45ffff',
  'primitive/color/cyan/80': '#2effff',
  'primitive/color/cyan/90': '#17ffff',
  'primitive/color/cyan/100': '#00ffff',
  'primitive/color/cyan/110': '#00e7e7',
  'primitive/color/cyan/120': '#00d0d0',
  'primitive/color/cyan/130': '#00b9b9',
  'primitive/color/cyan/140': '#00a2a2',
  'primitive/color/cyan/150': '#008b8b',
  'primitive/color/cyan/160': '#005c5c',
  'primitive/color/cyan/170': '#007373',
  'primitive/color/cyan/180': '#004545',
  'primitive/color/red/5': '#fee7e7',
  'primitive/color/red/10': '#fed0d0',
  'primitive/color/red/20': '#fdb9b9',
  'primitive/color/red/30': '#fda2a2',
  'primitive/color/red/40': '#fc8b8b',
  'primitive/color/red/50': '#fc7474',
  'primitive/color/red/60': '#fb5d5d',
  'primitive/color/red/70': '#fb4646',
  'primitive/color/red/80': '#fa2f2f',
  'primitive/color/red/90': '#fa1818',
  'primitive/color/red/100': '#fa0101',
  'primitive/color/red/110': '#e30000',
  'primitive/color/red/120': '#cc0000',
  'primitive/color/red/130': '#b50000',
  'primitive/color/red/140': '#9f0000',
  'primitive/color/red/150': '#880000',
  'primitive/color/red/160': '#710000',
  'primitive/color/red/180': '#440000',
  'primitive/color/orange/5': '#fff4e7',
  'primitive/color/orange/10': '#ffe9d0',
  'primitive/color/orange/20': '#ffdeb9',
  'primitive/color/orange/30': '#ffd3a2',
  'primitive/color/orange/40': '#ffc88b',
  'primitive/color/orange/50': '#ffcd92',
  'primitive/color/orange/60': '#ffb35c',
  'primitive/color/orange/70': '#ffa845',
  'primitive/color/orange/80': '#ff9d2e',
  'primitive/color/orange/90': '#ff9217',
  'primitive/color/orange/100': '#ff8800',
  'primitive/color/orange/110': '#e77b00',
  'primitive/color/orange/120': '#d06f00',
  'primitive/color/orange/130': '#b96200',
  'primitive/color/orange/140': '#a25600',
  'primitive/color/orange/150': '#8b4a00',
  'primitive/color/orange/160': '#733d00',
  'primitive/color/orange/170': '#5c3100',
  'primitive/color/orange/180': '#452500',
  'primitive/color/yellow/5': '#fefde7',
  'primitive/color/yellow/10': '#fefcd0',
  'primitive/color/yellow/20': '#fdfab9',
  'primitive/color/yellow/30': '#fdf9a2',
  'primitive/color/yellow/40': '#fcf88b',
  'primitive/color/yellow/50': '#fcf674',
  'primitive/color/yellow/60': '#fbf55d',
  'primitive/color/yellow/70': '#fbf446',
  'primitive/color/yellow/80': '#faf22f',
  'primitive/color/yellow/90': '#faf118',
  'primitive/color/yellow/100': '#faf001',
  'primitive/color/yellow/110': '#e3da00',
  'primitive/color/yellow/120': '#ccc400',
  'primitive/color/yellow/130': '#b5ae00',
  'primitive/color/yellow/140': '#9f9800',
  'primitive/color/yellow/150': '#888200',
  'primitive/color/yellow/160': '#716d00',
  'primitive/color/yellow/170': '#5a5700',
  'primitive/color/yellow/180': '#444100',
  'primitive/color/green/5': '#e8fee8',
  'primitive/color/green/10': '#d2fed1',
  'primitive/color/green/20': '#bcfebb',
  'primitive/color/green/30': '#a6fda4',
  'primitive/color/green/40': '#90fd8d',
  'primitive/color/green/50': '#79fd77',
  'primitive/color/green/60': '#63fd60',
  'primitive/color/green/70': '#4dfc49',
  'primitive/color/green/80': '#37fc33',
  'primitive/color/green/90': '#21fc1c',
  'primitive/color/green/100': '#0bfc06',
  'primitive/color/green/110': '#0ae505',
  'primitive/color/green/120': '#09ce04',
  'primitive/color/green/130': '#08b704',
  'primitive/color/green/140': '#07a003',
  'primitive/color/green/150': '#057202',
  'primitive/color/green/160': '#045b02',
  'primitive/color/green/170': '#068903',
  'primitive/color/green/180': '#034401',
  'primitive/color/teal/5': '#e9fbf8',
  'primitive/color/teal/10': '#d4f7f2',
  'primitive/color/teal/20': '#bff3eb',
  'primitive/color/teal/30': '#aaefe5',
  'primitive/color/teal/40': '#95ebdf',
  'primitive/color/teal/50': '#80e7d8',
  'primitive/color/teal/60': '#6be3d2',
  'primitive/color/teal/70': '#56dfcc',
  'primitive/color/teal/80': '#41dbc5',
  'primitive/color/teal/90': '#2cd7bf',
  'primitive/color/teal/100': '#17d3b9',
  'primitive/color/teal/110': '#14bfa8',
  'primitive/color/teal/120': '#12ac97',
  'primitive/color/teal/130': '#109986',
  'primitive/color/teal/140': '#0e8675',
  'primitive/color/teal/150': '#0c7364',
  'primitive/color/teal/160': '#0a5f54',
  'primitive/color/teal/170': '#084c43',
  'primitive/color/teal/180': '#063932',
  'primitive/color/blue/5': '#f0f5ff',
  'primitive/color/blue/10': '#e2ecff',
  'primitive/color/blue/20': '#d3e2ff',
  'primitive/color/blue/30': '#c5d9ff',
  'primitive/color/blue/40': '#b7cfff',
  'primitive/color/blue/50': '#a8c6ff',
  'primitive/color/blue/60': '#9abcff',
  'primitive/color/blue/70': '#8cb3ff',
  'primitive/color/blue/80': '#7da9ff',
  'primitive/color/blue/90': '#6fa0ff',
  'primitive/color/blue/100': '#6197ff',
  'primitive/color/blue/110': '#5889e7',
  'primitive/color/blue/120': '#4f7bd0',
  'primitive/color/blue/130': '#466db9',
  'primitive/color/blue/140': '#3d60a2',
  'primitive/color/blue/150': '#34528b',
  'primitive/color/blue/160': '#2c4473',
  'primitive/color/blue/170': '#23365c',
  'primitive/color/blue/180': '#1a2945',
  'primitive/color/purple/5': '#eee8f7',
  'primitive/color/purple/10': '#ddd2ef',
  'primitive/color/purple/20': '#cdbce7',
  'primitive/color/purple/30': '#bca6df',
  'primitive/color/purple/40': '#ab90d7',
  'primitive/color/purple/50': '#9b7acf',
  'primitive/color/purple/60': '#8a64c7',
  'primitive/color/purple/70': '#794ebf',
  'primitive/color/purple/80': '#6938b7',
  'primitive/color/purple/90': '#5822af',
  'primitive/color/purple/100': '#480ca8',
  'primitive/color/purple/110': '#410a98',
  'primitive/color/purple/120': '#3a0989',
  'primitive/color/purple/130': '#34087a',
  'primitive/color/purple/140': '#2d076a',
  'primitive/color/purple/150': '#27065b',
  'primitive/color/purple/160': '#20054c',
  'primitive/color/purple/170': '#1a043d',
  'primitive/color/purple/180': '#13032d',
  'primitive/color/pink/5': '#fef1f3',
  'primitive/color/pink/10': '#fde4e8',
  'primitive/color/pink/20': '#fcd6dd',
  'primitive/color/pink/30': '#fbc9d2',
  'primitive/color/pink/40': '#fabbc7',
  'primitive/color/pink/50': '#f9aebb',
  'primitive/color/pink/60': '#f8a0b0',
  'primitive/color/pink/70': '#f793a5',
  'primitive/color/pink/80': '#f6859a',
  'primitive/color/pink/90': '#f5788f',
  'primitive/color/pink/100': '#f46b84',
  'primitive/color/pink/110': '#dd6178',
  'primitive/color/pink/120': '#c7576b',
  'primitive/color/pink/130': '#b14d60',
  'primitive/color/pink/140': '#9b4454',
  'primitive/color/pink/150': '#853a48',
  'primitive/color/pink/160': '#6e303c',
  'primitive/color/pink/170': '#582630',
  'primitive/color/pink/180': '#421d24',
  ...TRANSPARENT_VARS,
};

const CARBON_VARS = {
  'primitive/color/white': '#ffffff',
  'primitive/color/black': '#000000',
  'primitive/color/gray/5': '#f7f8f8',
  'primitive/color/gray/10': '#eff1f2',
  'primitive/color/gray/20': '#e8eaec',
  'primitive/color/gray/30': '#e0e3e5',
  'primitive/color/gray/40': '#d8dcdf',
  'primitive/color/gray/50': '#d1d5d9',
  'primitive/color/gray/60': '#c9ced3',
  'primitive/color/gray/70': '#c1c7cc',
  'primitive/color/gray/80': '#bac0c6',
  'primitive/color/gray/90': '#b2b9c0',
  'primitive/color/gray/100': '#abb2ba',
  'primitive/color/gray/110': '#8b9198',
  'primitive/color/gray/120': '#7c8187',
  'primitive/color/gray/130': '#6c7176',
  'primitive/color/gray/140': '#5d6165',
  'primitive/color/gray/150': '#4d5054',
  'primitive/color/gray/160': '#2e3032',
  'primitive/color/gray/170': '#1f2021',
  'primitive/color/gray/180': '#0f1010',
  'primitive/color/cyan/5': '#edf9ff',
  'primitive/color/cyan/10': '#dbf3ff',
  'primitive/color/cyan/20': '#c9eeff',
  'primitive/color/cyan/30': '#b7e8ff',
  'primitive/color/cyan/40': '#a5e2ff',
  'primitive/color/cyan/50': '#93ddff',
  'primitive/color/cyan/60': '#81d7ff',
  'primitive/color/cyan/70': '#6fd1ff',
  'primitive/color/cyan/80': '#5dccff',
  'primitive/color/cyan/90': '#4bc6ff',
  'primitive/color/cyan/100': '#39c1ff',
  'primitive/color/cyan/110': '#2e9dd0',
  'primitive/color/cyan/120': '#298cb9',
  'primitive/color/cyan/130': '#247aa2',
  'primitive/color/cyan/140': '#1f698b',
  'primitive/color/cyan/150': '#195773',
  'primitive/color/cyan/160': '#0f3445',
  'primitive/color/cyan/170': '#14465c',
  'primitive/color/cyan/180': '#0a232e',
  'primitive/color/red/5': '#fbecee',
  'primitive/color/red/10': '#f7d9de',
  'primitive/color/red/20': '#f3c6cd',
  'primitive/color/red/30': '#efb3bd',
  'primitive/color/red/40': '#eba0ac',
  'primitive/color/red/50': '#e78d9c',
  'primitive/color/red/60': '#e37a8b',
  'primitive/color/red/70': '#df677b',
  'primitive/color/red/80': '#db546a',
  'primitive/color/red/90': '#d7415a',
  'primitive/color/red/100': '#d32f4a',
  'primitive/color/red/110': '#ac263c',
  'primitive/color/red/120': '#992235',
  'primitive/color/red/130': '#861d2f',
  'primitive/color/red/140': '#731928',
  'primitive/color/red/150': '#5f1521',
  'primitive/color/red/160': '#4c111a',
  'primitive/color/red/180': '#26080d',
  'primitive/color/orange/5': '#fff6ec',
  'primitive/color/orange/10': '#ffeeda',
  'primitive/color/orange/20': '#ffe6c8',
  'primitive/color/orange/30': '#ffddb6',
  'primitive/color/orange/40': '#ffd5a4',
  'primitive/color/orange/50': '#ffcd92',
  'primitive/color/orange/60': '#ffc580',
  'primitive/color/orange/70': '#ffbc6e',
  'primitive/color/orange/80': '#ffb45c',
  'primitive/color/orange/90': '#ffac4a',
  'primitive/color/orange/100': '#ffa438',
  'primitive/color/orange/110': '#e79532',
  'primitive/color/orange/120': '#d0862d',
  'primitive/color/orange/130': '#b97728',
  'primitive/color/orange/140': '#a26823',
  'primitive/color/orange/150': '#8b591e',
  'primitive/color/orange/160': '#734a19',
  'primitive/color/orange/170': '#5c3b14',
  'primitive/color/orange/180': '#452c0f',
  'primitive/color/yellow/5': '#fdffef',
  'primitive/color/yellow/10': '#fbffdf',
  'primitive/color/yellow/20': '#f9ffcf',
  'primitive/color/yellow/30': '#f5ffaf',
  'primitive/color/yellow/40': '#f4ffa0',
  'primitive/color/yellow/50': '#f2ff90',
  'primitive/color/yellow/60': '#f0ff80',
  'primitive/color/yellow/70': '#eeff70',
  'primitive/color/yellow/80': '#ecff60',
  'primitive/color/yellow/90': '#ebff51',
  'primitive/color/yellow/100': '#c0d042',
  'primitive/color/yellow/110': '#aab93a',
  'primitive/color/yellow/120': '#95a233',
  'primitive/color/yellow/130': '#808b2c',
  'primitive/color/yellow/140': '#6a7324',
  'primitive/color/yellow/150': '#555c1d',
  'primitive/color/yellow/160': '#404516',
  'primitive/color/yellow/170': '#2a2e0e',
  'primitive/color/yellow/180': '#151707',
  'primitive/color/green/5': '#effff8',
  'primitive/color/green/10': '#dffff2',
  'primitive/color/green/20': '#cfffec',
  'primitive/color/green/30': '#bfffe6',
  'primitive/color/green/40': '#afffe0',
  'primitive/color/green/50': '#a0ffda',
  'primitive/color/green/60': '#90ffd4',
  'primitive/color/green/70': '#80ffce',
  'primitive/color/green/80': '#70ffc8',
  'primitive/color/green/90': '#60ffc2',
  'primitive/color/green/100': '#51ffbc',
  'primitive/color/green/110': '#42d099',
  'primitive/color/green/120': '#3ab988',
  'primitive/color/green/130': '#33a277',
  'primitive/color/green/140': '#2c8b66',
  'primitive/color/green/150': '#247355',
  'primitive/color/green/160': '#1d5c44',
  'primitive/color/green/170': '#2c8b66',
  'primitive/color/green/180': '#0e2e22',
  'primitive/color/teal/5': '#e9f6f7',
  'primitive/color/teal/10': '#d3eeef',
  'primitive/color/teal/20': '#bde6e7',
  'primitive/color/teal/30': '#a7dddf',
  'primitive/color/teal/40': '#91d5d7',
  'primitive/color/teal/50': '#7bcdcf',
  'primitive/color/teal/60': '#65c5c7',
  'primitive/color/teal/70': '#39b4b7',
  'primitive/color/teal/80': '#23acaf',
  'primitive/color/teal/90': '#0ea4a8',
  'primitive/color/teal/100': '#0b8689',
  'primitive/color/teal/110': '#0a777a',
  'primitive/color/teal/120': '#08686a',
  'primitive/color/teal/130': '#07595b',
  'primitive/color/teal/140': '#064a4c',
  'primitive/color/teal/150': '#053b3d',
  'primitive/color/teal/160': '#032c2d',
  'primitive/color/teal/170': '#021d1e',
  'primitive/color/teal/180': '#010e0f',
  'primitive/color/blue/5': '#ebe9ff',
  'primitive/color/blue/10': '#d8d3ff',
  'primitive/color/blue/20': '#c4bdff',
  'primitive/color/blue/30': '#b1a7ff',
  'primitive/color/blue/40': '#9e91ff',
  'primitive/color/blue/50': '#8a7bff',
  'primitive/color/blue/60': '#7765ff',
  'primitive/color/blue/70': '#644fff',
  'primitive/color/blue/80': '#5039ff',
  'primitive/color/blue/90': '#3d23ff',
  'primitive/color/blue/100': '#2a0eff',
  'primitive/color/blue/110': '#220bd0',
  'primitive/color/blue/120': '#1e0ab9',
  'primitive/color/blue/130': '#1a08a2',
  'primitive/color/blue/140': '#16078b',
  'primitive/color/blue/150': '#16078b',
  'primitive/color/blue/160': '#0f055c',
  'primitive/color/blue/170': '#0b0345',
  'primitive/color/blue/180': '#07022e',
  'primitive/color/purple/5': '#f1efff',
  'primitive/color/purple/10': '#e3dfff',
  'primitive/color/purple/20': '#d5cfff',
  'primitive/color/purple/30': '#c7bfff',
  'primitive/color/purple/40': '#b9afff',
  'primitive/color/purple/50': '#aba0ff',
  'primitive/color/purple/60': '#9d90ff',
  'primitive/color/purple/70': '#8f80ff',
  'primitive/color/purple/80': '#8170ff',
  'primitive/color/purple/90': '#7360ff',
  'primitive/color/purple/100': '#6551ff',
  'primitive/color/purple/110': '#5242d0',
  'primitive/color/purple/120': '#493ab9',
  'primitive/color/purple/130': '#4033a2',
  'primitive/color/purple/140': '#372c8b',
  'primitive/color/purple/150': '#2d2473',
  'primitive/color/purple/160': '#241d5c',
  'primitive/color/purple/170': '#1b1645',
  'primitive/color/purple/180': '#120e2e',
  'primitive/color/pink/5': '#f9ebf8',
  'primitive/color/pink/10': '#f4d7f2',
  'primitive/color/pink/20': '#eec3eb',
  'primitive/color/pink/30': '#e9afe5',
  'primitive/color/pink/40': '#e39bde',
  'primitive/color/pink/50': '#de87d8',
  'primitive/color/pink/60': '#d873d1',
  'primitive/color/pink/70': '#d35fcb',
  'primitive/color/pink/80': '#cd4bc4',
  'primitive/color/pink/90': '#c837be',
  'primitive/color/pink/100': '#c324b8',
  'primitive/color/pink/110': '#b120a7',
  'primitive/color/pink/120': '#9f1d96',
  'primitive/color/pink/130': '#8d1a85',
  'primitive/color/pink/140': '#7c1675',
  'primitive/color/pink/150': '#6a1364',
  'primitive/color/pink/160': '#460d42',
  'primitive/color/pink/170': '#581053',
  'primitive/color/pink/180': '#230621',
  ...TRANSPARENT_VARS,
};


const PORTFOLIO_PRIMITIVE_OVERRIDES = {
  '--ld-primitive-color-green-5': '#f5f3ff',
  '--ld-primitive-color-green-10': '#ede9fe',
  '--ld-primitive-color-green-20': '#ddd6fe',
  '--ld-primitive-color-green-30': '#c4b5fd',
  '--ld-primitive-color-green-40': '#a78bfa',
  '--ld-primitive-color-green-50': '#8b5cf6',
  '--ld-primitive-color-green-60': '#7c3aed',
  '--ld-primitive-color-green-70': '#6d28d9',
  '--ld-primitive-color-green-80': '#5b21b6',
  '--ld-primitive-color-green-90': '#4c1d95',
  '--ld-primitive-color-green-100': '#4f39f6',
  '--ld-primitive-color-green-110': '#4338ca',
  '--ld-primitive-color-green-120': '#3d2bc4',
  '--ld-primitive-color-green-130': '#3730a3',
  '--ld-primitive-color-green-140': '#312e81',
  '--ld-primitive-color-green-150': '#1e1b4b',
  '--ld-primitive-color-green-160': '#18181b',
  '--ld-primitive-color-green-170': '#0f0f12',
  '--ld-primitive-color-green-180': '#09090b',
  '--ld-primitive-color-blue-5': '#eef2ff',
  '--ld-primitive-color-blue-10': '#e0e7ff',
  '--ld-primitive-color-blue-20': '#c7d2fe',
  '--ld-primitive-color-blue-30': '#a5b4fc',
  '--ld-primitive-color-blue-40': '#818cf8',
  '--ld-primitive-color-blue-50': '#6366f1',
  '--ld-primitive-color-blue-60': '#4f46e5',
  '--ld-primitive-color-blue-70': '#4338ca',
  '--ld-primitive-color-blue-80': '#3730a3',
  '--ld-primitive-color-blue-90': '#312e81',
  '--ld-primitive-color-blue-100': '#4f39f6',
  '--ld-primitive-color-blue-110': '#4338ca',
  '--ld-primitive-color-blue-120': '#3d2bc4',
  '--ld-primitive-color-blue-130': '#3730a3',
  '--ld-primitive-color-blue-140': '#312e81',
  '--ld-primitive-color-blue-150': '#1e1b4b',
  '--ld-primitive-color-blue-160': '#18181b',
  '--ld-primitive-color-blue-170': '#0f0f12',
  '--ld-primitive-color-blue-180': '#09090b',
};

/** Xense dark-mode semantic layer — mint green primary on charcoal surfaces. */
const XENSE_SEMANTIC_OVERRIDES = {
  /* Surfaces */
  '--ld-semantic-color-fill': 'var(--ld-primitive-color-gray-170, #232325)',
  '--ld-semantic-color-background': 'var(--ld-primitive-color-gray-170, #232325)',
  '--ld-semantic-color-background-subtle': 'var(--ld-primitive-color-gray-180, #000000)',
  '--ld-semantic-color-background-inverse': 'var(--ld-primitive-color-gray-5, #f8f8f8)',
  '--ld-semantic-color-surface': 'var(--ld-primitive-color-gray-160, #2e2f32)',
  '--ld-semantic-color-surface-subtle': 'var(--ld-primitive-color-gray-150, #3a3b3e)',
  '--ld-semantic-color-surface-hovered': 'var(--ld-primitive-color-gray-150, #3a3b3e)',
  '--ld-semantic-color-surface-pressed': 'var(--ld-primitive-color-gray-140, #46474a)',
  '--ld-semantic-color-surface-focused': 'var(--ld-primitive-color-gray-150, #3a3b3e)',
  '--ld-semantic-color-surface-overlay': 'var(--ld-primitive-color-gray-160, #2e2f32)',
  '--ld-semantic-color-surface-subtle-hovered': 'var(--ld-primitive-color-gray-140, #46474a)',
  '--ld-semantic-color-surface-subtle-pressed': 'var(--ld-primitive-color-gray-130, #515357)',
  '--ld-semantic-color-surface-subtle-focused': 'var(--ld-primitive-color-gray-140, #46474a)',
  '--ld-semantic-color-surface-brand': 'var(--ld-primitive-color-green-180, #034401)',
  '--ld-semantic-color-surface-activated': 'var(--ld-primitive-color-green-180, #034401)',
  '--ld-semantic-color-surface-activated-hovered': 'var(--ld-primitive-color-green-170, #068903)',
  '--ld-semantic-color-surface-activated-pressed': 'var(--ld-primitive-color-green-160, #045b02)',
  '--ld-semantic-color-surface-activated-focused': 'var(--ld-primitive-color-green-170, #068903)',
  /* Text on dark */
  '--ld-semantic-color-text': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-text-subtle': 'var(--ld-primitive-color-gray-70, #c1c7cc)',
  '--ld-semantic-color-text-subtlest': 'var(--ld-primitive-color-gray-90, #828489)',
  '--ld-semantic-color-text-inverse': 'var(--ld-primitive-color-gray-160, #2e2f32)',
  '--ld-semantic-color-text-onFill': 'var(--ld-primitive-color-black, #000000)',
  /* Brand — mint green */
  '--ld-semantic-color-text-brand': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-color-text-brand-bold': 'var(--ld-primitive-color-green-120, #09ce04)',
  '--ld-semantic-color-fill-brand': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-color-fill-brand-bold': 'var(--ld-primitive-color-green-120, #09ce04)',
  '--ld-semantic-color-border-brand': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-color-border-activated': 'var(--ld-primitive-color-green-100, #0bfc06)',
  /* Primary button — mint fill, black label */
  '--ld-semantic-color-action-fill-primary': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-color-action-fill-primary-hovered': 'var(--ld-primitive-color-green-90, #21fc1c)',
  '--ld-semantic-color-action-fill-primary-focused': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-color-action-fill-primary-pressed': 'var(--ld-primitive-color-green-110, #0ae505)',
  '--ld-semantic-color-action-fill-primary-disabled': 'var(--ld-primitive-color-gray-120, #5d5e63)',
  '--ld-semantic-color-action-text-onFill-primary': 'var(--ld-primitive-color-black, #000000)',
  '--ld-semantic-color-action-text-onFill-primary-hovered': 'var(--ld-primitive-color-black, #000000)',
  '--ld-semantic-color-action-text-onFill-primary-focused': 'var(--ld-primitive-color-black, #000000)',
  '--ld-semantic-color-action-text-onFill-primary-pressed': 'var(--ld-primitive-color-black, #000000)',
  '--ld-semantic-color-action-text-onFill-primary-disabled': 'var(--ld-primitive-color-gray-70, #c1c7cc)',
  '--ld-semantic-color-action-text-on-fill-primary': 'var(--ld-primitive-color-black, #000000)',
  '--ld-semantic-color-action-text-on-fill-primary-hovered': 'var(--ld-primitive-color-black, #000000)',
  '--ld-semantic-color-action-text-on-fill-primary-focused': 'var(--ld-primitive-color-black, #000000)',
  '--ld-semantic-color-action-text-on-fill-primary-pressed': 'var(--ld-primitive-color-black, #000000)',
  '--ld-semantic-color-action-text-on-fill-primary-disabled': 'var(--ld-primitive-color-gray-70, #c1c7cc)',
  /* Secondary button — mint outline on dark */
  '--ld-semantic-color-action-fill-secondary': 'var(--ld-primitive-color-transparentDark-0, rgba(0, 0, 0, 0.0000))',
  '--ld-semantic-color-action-fill-secondary-hovered': 'var(--ld-primitive-color-transparentLight-10, rgba(255, 255, 255, 0.102))',
  '--ld-semantic-color-action-fill-secondary-focused': 'var(--ld-primitive-color-transparentLight-10, rgba(255, 255, 255, 0.102))',
  '--ld-semantic-color-action-fill-secondary-pressed': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-color-action-fill-secondary-disabled': 'var(--ld-primitive-color-gray-120, #5d5e63)',
  '--ld-semantic-color-action-border-secondary': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-color-action-border-secondary-hovered': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-color-action-border-secondary-focused': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-color-action-border-secondary-pressed': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-color-action-border-secondary-disabled': 'var(--ld-primitive-color-gray-90, #828489)',
  '--ld-semantic-color-action-text-onFill-secondary': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-action-text-onFill-secondary-hovered': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-action-text-onFill-secondary-focused': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-action-text-onFill-secondary-pressed': 'var(--ld-primitive-color-black, #000000)',
  '--ld-semantic-color-action-text-onFill-secondary-disabled': 'var(--ld-primitive-color-gray-70, #c1c7cc)',
  '--ld-semantic-color-action-text-on-fill-secondary': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-action-text-on-fill-secondary-hovered': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-action-text-on-fill-secondary-focused': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-action-text-on-fill-secondary-pressed': 'var(--ld-primitive-color-black, #000000)',
  '--ld-semantic-color-action-text-on-fill-secondary-disabled': 'var(--ld-primitive-color-gray-70, #c1c7cc)',
  /* Tertiary button — text on dark */
  '--ld-semantic-color-action-fill-tertiary': 'var(--ld-primitive-color-transparentDark-0, rgba(0, 0, 0, 0.0000))',
  '--ld-semantic-color-action-fill-tertiary-hovered': 'var(--ld-primitive-color-transparentLight-10, rgba(255, 255, 255, 0.102))',
  '--ld-semantic-color-action-fill-tertiary-focused': 'var(--ld-primitive-color-transparentLight-10, rgba(255, 255, 255, 0.102))',
  '--ld-semantic-color-action-fill-tertiary-pressed': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-action-fill-tertiary-disabled': 'var(--ld-primitive-color-gray-120, #5d5e63)',
  '--ld-semantic-color-action-border-tertiary': 'var(--ld-primitive-color-transparentDark-0, rgba(0, 0, 0, 0.0000))',
  '--ld-semantic-color-action-border-tertiary-hovered': 'var(--ld-primitive-color-transparentDark-0, rgba(0, 0, 0, 0.0000))',
  '--ld-semantic-color-action-border-tertiary-focused': 'var(--ld-primitive-color-transparentDark-0, rgba(0, 0, 0, 0.0000))',
  '--ld-semantic-color-action-border-tertiary-pressed': 'var(--ld-primitive-color-transparentDark-0, rgba(0, 0, 0, 0.0000))',
  '--ld-semantic-color-action-text-onFill-tertiary': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-action-text-onFill-tertiary-hovered': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-action-text-onFill-tertiary-focused': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-action-text-onFill-tertiary-pressed': 'var(--ld-primitive-color-black, #000000)',
  '--ld-semantic-color-action-text-onFill-tertiary-disabled': 'var(--ld-primitive-color-gray-70, #c1c7cc)',
  '--ld-semantic-color-action-text-on-fill-tertiary': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-action-text-on-fill-tertiary-hovered': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-action-text-on-fill-tertiary-focused': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-action-text-on-fill-tertiary-pressed': 'var(--ld-primitive-color-black, #000000)',
  '--ld-semantic-color-action-text-on-fill-tertiary-disabled': 'var(--ld-primitive-color-gray-70, #c1c7cc)',
  /* Focus + nav */
  '--ld-semantic-color-action-focus-outline': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-focus-ring-color': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-color-topNav-fill': 'var(--ld-primitive-color-gray-180, #000000)',
  '--ld-semantic-color-topNav-fill-hovered': 'var(--ld-primitive-color-gray-170, #232325)',
  '--ld-semantic-color-topNav-fill-pressed': 'var(--ld-primitive-color-gray-160, #2e2f32)',
  '--ld-semantic-color-topNav-text-onFill': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-topNav-text-onFill-hovered': 'var(--ld-primitive-color-white, #ffffff)',
  '--ld-semantic-color-topNav-text-onFill-pressed': 'var(--ld-primitive-color-white, #ffffff)',
  /* Borders + accent text links */
  '--ld-semantic-color-border': 'var(--ld-primitive-color-gray-130, #515357)',
  '--ld-semantic-color-border-subtle': 'var(--ld-primitive-color-gray-140, #46474a)',
  '--ld-semantic-color-text-accent-cyan': 'var(--ld-primitive-color-cyan-100, #00ffff)',
  '--ld-semantic-color-text-accent-cyan-bold': 'var(--ld-primitive-color-cyan-130, #00b9b9)',
  '--ld-semantic-color-text-accent-green': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-color-text-accent-green-bold': 'var(--ld-primitive-color-green-140, #07a003)',
  '--ld-semantic-color-text-accent-purple': 'var(--ld-primitive-color-purple-60, #8a64c7)',
  '--ld-semantic-color-text-accent-purple-bold': 'var(--ld-primitive-color-purple-80, #6938b7)',
  /* Switch + progress */
  '--ld-semantic-color-switch-fill-activated': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-color-switch-fill-activated-hovered': 'var(--ld-primitive-color-green-90, #21fc1c)',
  '--ld-semantic-color-switch-fill-activated-pressed': 'var(--ld-primitive-color-green-110, #0ae505)',
  '--ld-semantic-color-progress-fill-info': 'var(--ld-primitive-color-green-100, #0bfc06)',
  '--ld-semantic-color-pageNav-indicator-activated': 'var(--ld-primitive-color-green-100, #0bfc06)',
};

const { basePrimitives, semanticBlock } = loadBaseTokenSections();

const THEMES = [
  {
    name: 'Xense',
    file: 'xense.css',
    font: "'Inter', -apple-system, Roboto, sans-serif",
    overrides: figmaVarsToCssRecord(XENSE_VARS),
    semanticOverrides: XENSE_SEMANTIC_OVERRIDES,
    colorScheme: 'dark',
    sourceNote: 'Source: Figma Foundations (node 122:24117) — dark mode primitives + semantic tokens',
  },
  {
    name: 'Carbon',
    file: 'carbon.css',
    font: "'Calibre R', 'Inter', -apple-system, Roboto, sans-serif",
    overrides: figmaVarsToCssRecord(CARBON_VARS),
    semanticOverrides: {
      '--ld-semantic-color-topNav-fill': 'var(--ld-primitive-color-gray-160, #2e3032)',
    },
    sourceNote: 'Source: Figma Foundations library (node 87:21129)',
  },
  {
    name: 'WM',
    file: 'wm.css',
    font: "'Maax', 'Inter', -apple-system, Roboto, sans-serif",
    overrides: figmaVarsToCssRecord(WM_VARS),
    semanticOverrides: {
      '--ld-semantic-color-topNav-fill': 'var(--ld-primitive-color-green-100, #007120)',
    },
    sourceNote: 'Source: WM primitive color swatch sheet',
  },
  {
    name: 'Oportun',
    file: 'oportun.css',
    font: "'TT Commons Classic', 'Inter', -apple-system, Roboto, sans-serif",
    overrides: figmaVarsToCssRecord(OPORTUN_VARS),
    semanticOverrides: {
      '--ld-semantic-color-topNav-fill': 'var(--ld-primitive-color-green-100, #00c859)',
      '--ld-semantic-color-action-fill-primary': 'var(--ld-primitive-color-green-100, #00c859)',
      '--ld-semantic-color-action-fill-primary-hovered': 'var(--ld-primitive-color-green-110, #00b550)',
      '--ld-semantic-color-action-fill-primary-pressed': 'var(--ld-primitive-color-green-120, #00a348)',
      '--ld-semantic-color-fill-brand': 'var(--ld-primitive-color-green-100, #00c859)',
      '--ld-semantic-color-text-brand': 'var(--ld-primitive-color-green-100, #00c859)',
      '--ld-semantic-color-border-brand': 'var(--ld-primitive-color-green-100, #00c859)',
    },
    sourceNote: 'Source: Oportun Figma primitive swatch sheets',
  },
  {
    name: 'Portfolio',
    file: 'portfolio.css',
    font: "'Inter', 'Maax', 'Sams Sans Text', -apple-system, Roboto, sans-serif",
    overrides: PORTFOLIO_PRIMITIVE_OVERRIDES,
    semanticOverrides: {
      '--ld-semantic-color-topNav-fill': 'var(--ld-primitive-color-white, #ffffff)',
      '--ld-semantic-color-topNav-fill-hovered': 'var(--ld-primitive-color-transparentDark-10, rgba(0, 0, 0, 0.1000))',
      '--ld-semantic-color-topNav-fill-pressed': 'var(--ld-primitive-color-transparentDark-20, rgba(0, 0, 0, 0.2000))',
      '--ld-semantic-color-topNav-separator': 'var(--ld-primitive-color-gray-20, #e3e4e5)',
      '--ld-semantic-color-topNav-text-onFill': 'var(--ld-primitive-color-gray-160, #2e2f32)',
      '--ld-semantic-color-topNav-text-onFill-hovered': 'var(--ld-primitive-color-gray-160, #2e2f32)',
      '--ld-semantic-color-topNav-text-onFill-pressed': 'var(--ld-primitive-color-gray-160, #2e2f32)',
    },
    sourceNote: 'Source: portfolio site shell (purple / indigo brand)',
  },
];

const themePrimitiveOverrides = {};
const themeSemanticOverrides = {};

for (const theme of THEMES) {
  const baseForTheme = theme.name === 'WM' ? basePrimitives : stripWmOnlyScales(basePrimitives);
  const fullPrimitives = mergeRecords(baseForTheme, theme.overrides);
  const primitiveOverrides = stripSparkPrimitiveTokens(
    diffRecords(baseForTheme, fullPrimitives),
  );

  themePrimitiveOverrides[theme.name] = primitiveOverrides;
  if (theme.semanticOverrides && Object.keys(theme.semanticOverrides).length > 0) {
    themeSemanticOverrides[theme.name] = stripSparkSemanticTokens(theme.semanticOverrides);
  }

  const css = writeTheme({
    name: theme.name,
    font: theme.font,
    primitiveOverrides,
    semanticOverrides: theme.semanticOverrides,
    sourceNote: theme.sourceNote,
    colorScheme: theme.colorScheme,
  });

  fs.writeFileSync(path.join(THEME_DIR, theme.file), css);
  console.log(`Wrote ${theme.file} (${css.split('\n').length} lines)`);
}

const official = parseOfficialThemeCssFiles(basePrimitives);
for (const [themeName, overrides] of Object.entries(official.primitiveOverrides)) {
  themePrimitiveOverrides[themeName] = {
    ...(themePrimitiveOverrides[themeName] ?? {}),
    ...overrides,
  };
}
for (const [themeName, overrides] of Object.entries(official.semanticOverrides)) {
  themeSemanticOverrides[themeName] = {
    ...(themeSemanticOverrides[themeName] ?? {}),
    ...overrides,
  };
}

fs.writeFileSync(
  BRAND_PRIMITIVES_TS,
  renderThemePrimitivesModule({
    basePrimitives,
    themePrimitiveOverrides,
    themeSemanticOverrides,
  }),
);
console.log('Wrote theme-primitives.ts');
