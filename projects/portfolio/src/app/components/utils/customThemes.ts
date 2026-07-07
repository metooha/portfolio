/* ── Custom Themes ────────────────────────────────────────────────
 *  User-defined themes that layer semantic-token overrides on top of a
 *  built-in base theme (Portfolio by default). Each theme is built from a
 *  small set of "seed" colors — changing one seed updates every related
 *  component at once, mirroring the Theme Editor experience.
 *
 *  Storage model
 *  ─────────────
 *  - `ld-kit-custom-themes`  → array of CustomTheme (this file)
 *  - `ld-kit-theme`          → active theme name (built-in OR custom),
 *                              shared with themeManager / Theming.
 *
 *  Application model
 *  ─────────────────
 *  A custom theme applies its base theme via `data-ld-theme` (fonts + base
 *  tokens) and then injects its seed-derived overrides into a single
 *  <style id="ld-kit-custom-theme"> element scoped to :root. Built-in themes
 *  clear that element, so switching is always clean.
 * ───────────────────────────────────────────────────────────────── */

import {
  darken,
  lighten,
  tint,
  withAlpha,
  contrastColor,
  isDark,
  ensureContrastOnWhite,
} from './colorUtils';
import { THEME_FONT_CONFIG } from './Theming';
import type { TextFontKey, ThemeName } from './Theming';
import { getDeployedCustomThemes } from '@/app/auth/site-config';
import {
  getThemePreviewLayers,
} from '@/component-library/theme-editor/colorTokens';

/* ── Types ─────────────────────────────────────────────────────── */

export type SeedId = 'primary' | 'navigation' | 'surface' | 'positive' | 'negative' | 'warning';

export interface CustomTheme {
  /** Unique, stable id (also the display name — names must be unique). */
  id: string;
  name: string;
  description?: string;
  /** When set, this record stores user edits for a built-in preset (e.g. Portfolio). */
  builtInPreset?: ThemeName;
  /** Built-in theme this custom theme layers on top of. */
  baseTheme: ThemeName;
  /** Text font family used by this custom theme. */
  textFont?: TextFontKey;
  /** Seed hex values keyed by seed id. */
  seeds: Record<SeedId, string>;
  /**
   * Optional fine-grained token overrides that win over seed-derived values.
   * token name → CSS value.
   */
  tokenOverrides?: Record<string, string>;
  createdAt: number;
  updatedAt: number;
}

/* ── Seed definitions ──────────────────────────────────────────── */

export interface SeedDef {
  id: SeedId;
  label: string;
  description: string;
  /** Components most visibly affected — shown as pills in the editor. */
  components: string[];
  /** Sensible starting value when creating a new theme. */
  default: string;
  /** Derive semantic token overrides from a single seed hex. */
  derive: (hex: string) => Record<string, string>;
}

export const SEEDS: SeedDef[] = [
  {
    id: 'primary',
    label: 'Primary / Brand',
    description: 'Primary buttons, links, switches, focus rings, and brand text.',
    components: ['Button', 'Link', 'Switch', 'Checkbox', 'Side Navigation', 'Focus Ring'],
    default: '#0053e2',
    derive: (hex) => {
      const focused = darken(hex, 0.08);
      const hovered = darken(hex, 0.1);
      const pressed = darken(hex, 0.16);
      const bold = darken(hex, 0.16);
      const onFill = contrastColor(hex);
      const subtle = tint(hex, 95);
      const subtleStrong = tint(hex, 90);
      const textSafe = ensureContrastOnWhite(hex);
      const borderSafe = ensureContrastOnWhite(hex, 3.0);
      return {
        // Primary action (Button)
        '--ld-semantic-color-action-fill-primary': hex,
        '--ld-semantic-color-action-fill-primary-focused': focused,
        '--ld-semantic-color-action-fill-primary-hovered': hovered,
        '--ld-semantic-color-action-fill-primary-pressed': pressed,
        '--ld-semantic-color-action-text-on-fill-primary': onFill,
        '--ld-semantic-color-action-text-onFill-primary': onFill,
        '--ld-semantic-color-action-focus-outline': withAlpha(hex, 0.35),
        // Brand text / borders (on white surfaces)
        '--ld-semantic-color-text-brand': textSafe,
        '--ld-semantic-color-text-brand-bold': bold,
        '--ld-semantic-color-text-brand-onFill': onFill,
        '--ld-semantic-color-text-activated': textSafe,
        '--ld-semantic-color-border-brand': borderSafe,
        '--ld-semantic-color-border-brand-bold': bold,
        '--ld-semantic-color-border-activated': borderSafe,
        // Brand fills / activated states
        '--ld-semantic-color-fill-brand': hex,
        '--ld-semantic-color-fill-brand-bold': bold,
        '--ld-semantic-color-fill-brand-subtle': subtle,
        '--ld-semantic-color-fill-activated': hex,
        '--ld-semantic-color-fill-activated-focused': focused,
        '--ld-semantic-color-fill-activated-hovered': hovered,
        '--ld-semantic-color-fill-activated-pressed': pressed,
        '--ld-semantic-color-surface-brand': subtleStrong,
        '--ld-semantic-color-surface-activated': subtle,
        // Switch (on state)
        '--ld-semantic-color-switch-fill-activated': hex,
        '--ld-semantic-color-switch-fill-activated-focused': focused,
        '--ld-semantic-color-switch-fill-activated-hovered': hovered,
        '--ld-semantic-color-switch-fill-activated-pressed': pressed,
        // Page / side nav indicator
        '--ld-semantic-color-pageNav-indicator-activated': borderSafe,
        '--ld-semantic-color-pageNav-indicator-activated-focused': focused,
        '--ld-semantic-color-pageNav-indicator-activated-hovered': hovered,
        '--ld-semantic-color-pageNav-indicator-activated-pressed': pressed,
        // Progress + focus ring
        '--ld-semantic-color-progress-fill-info': hex,
        '--ld-semantic-focus-ring-color': hex,
      };
    },
  },
  {
    id: 'navigation',
    label: 'Navigation',
    description: 'Top nav background and text/icons on it.',
    components: ['Top Nav', 'Masthead', 'App Bar'],
    default: '#0053e2',
    derive: (hex) => {
      const onFill = contrastColor(hex);
      const hovered = isDark(hex) ? lighten(hex, 0.06) : darken(hex, 0.06);
      const pressed = isDark(hex) ? lighten(hex, 0.12) : darken(hex, 0.12);
      return {
        '--ld-semantic-color-topNav-fill': hex,
        '--ld-semantic-color-topNav-fill-hovered': hovered,
        '--ld-semantic-color-topNav-fill-pressed': pressed,
        '--ld-semantic-color-topNav-text-onFill': onFill,
        '--ld-semantic-color-topNav-text-onFill-hovered': onFill,
        '--ld-semantic-color-topNav-text-onFill-pressed': onFill,
      };
    },
  },
  {
    id: 'surface',
    label: 'Surface',
    description: 'Page and card backgrounds plus default text colors.',
    components: ['Page', 'Card', 'Modal', 'Sheet'],
    default: '#ffffff',
    derive: (hex) => {
      const dark = isDark(hex);
      return {
        '--ld-semantic-color-surface': hex,
        '--ld-semantic-color-surface-overlay': hex,
        '--ld-semantic-color-surface-subtle': dark ? lighten(hex, 0.08) : darken(hex, 0.03),
        '--ld-semantic-color-surface-hovered': dark ? lighten(hex, 0.1) : darken(hex, 0.04),
        '--ld-semantic-color-background': dark ? darken(hex, 0.03) : hex,
        '--ld-semantic-color-text': dark ? '#ffffff' : '#2e2f32',
        '--ld-semantic-color-text-subtle': dark ? withAlpha('#ffffff', 0.72) : '#515357',
        '--ld-semantic-color-text-subtlest': dark ? withAlpha('#ffffff', 0.5) : '#74767c',
        '--ld-semantic-color-border': dark ? withAlpha('#ffffff', 0.16) : '#dedede',
      };
    },
  },
  {
    id: 'positive',
    label: 'Positive / Success',
    description: 'Confirmations, positive badges, tags, and metrics.',
    components: ['Alert', 'Badge', 'Tag', 'Metric'],
    default: '#2a8703',
    derive: (hex) => {
      const textSafe = ensureContrastOnWhite(hex);
      const onFill = contrastColor(hex);
      const onFillSubtle = ensureContrastOnWhite(hex);
      return {
        '--ld-semantic-color-fill-positive': hex,
        '--ld-semantic-color-fill-positive-subtle': tint(hex, 94),
        '--ld-semantic-color-text-positive': textSafe,
        '--ld-semantic-color-text-positive-bold': darken(hex, 0.12),
        '--ld-semantic-color-text-onFill-positive': onFill,
        '--ld-semantic-color-text-onFill-positive-subtle': onFillSubtle,
        '--ld-semantic-color-border-positive': ensureContrastOnWhite(hex, 3.0),
        '--ld-semantic-color-border-positive-bold': darken(hex, 0.12),
      };
    },
  },
  {
    id: 'negative',
    label: 'Negative / Error',
    description: 'Errors, destructive actions, and negative badges.',
    components: ['Alert', 'Badge', 'Error Message', 'Destructive Button'],
    default: '#ea1100',
    derive: (hex) => {
      const textSafe = ensureContrastOnWhite(hex);
      return {
        '--ld-semantic-color-fill-negative': hex,
        '--ld-semantic-color-fill-negative-subtle': tint(hex, 94),
        '--ld-semantic-color-text-negative': textSafe,
        '--ld-semantic-color-text-negative-bold': darken(hex, 0.12),
        '--ld-semantic-color-border-negative': ensureContrastOnWhite(hex, 3.0),
        '--ld-semantic-color-border-negative-bold': darken(hex, 0.12),
      };
    },
  },
  {
    id: 'warning',
    label: 'Warning / Caution',
    description: 'Caution states, warning badges, and banners.',
    components: ['Alert', 'Badge', 'Banner', 'Callout'],
    default: '#ffc220',
    derive: (hex) => {
      const onFill = contrastColor(hex);
      return {
        '--ld-semantic-color-fill-warning': hex,
        '--ld-semantic-color-fill-warning-subtle': tint(hex, 94),
        '--ld-semantic-color-text-warning': ensureContrastOnWhite(hex),
        '--ld-semantic-color-text-warning-bold': ensureContrastOnWhite(darken(hex, 0.2)),
        '--ld-semantic-color-text-onFill-warning': onFill,
        '--ld-semantic-color-border-warning': ensureContrastOnWhite(hex, 3.0),
        '--ld-semantic-color-border-warning-bold': ensureContrastOnWhite(darken(hex, 0.2), 3.0),
      };
    },
  },
];

const SEED_BY_ID: Record<SeedId, SeedDef> = SEEDS.reduce((acc, s) => {
  acc[s.id] = s;
  return acc;
}, {} as Record<SeedId, SeedDef>);

const TEXT_FONT_FAMILIES: Record<TextFontKey, string> = {
  inter: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  'everyday-sans': "'Everyday Sans UI', -apple-system, Roboto, sans-serif",
  gibson: "'Gibson', -apple-system, Roboto, sans-serif",
  bogle: "'Bogle', -apple-system, Roboto, sans-serif",
  maax: "'Maax', 'Inter', -apple-system, Roboto, sans-serif",
  calibre: "'Calibre-R', 'Inter', -apple-system, Roboto, sans-serif",
  'tt-commons': "'TT Commons Classic', 'Inter', -apple-system, Roboto, sans-serif",
};

/** Semantic type tokens that inherit body/heading fonts in component CSS. */
const TYPOGRAPHY_FONT_FAMILY_TOKENS = [
  '--ld-primitive-font-family-sans',
  '--ld-semantic-font-family-sans',
  '--ld-semantic-font-body-large-family',
  '--ld-semantic-font-body-medium-family',
  '--ld-semantic-font-body-small-family',
  '--ld-semantic-font-caption-family',
  '--ld-semantic-font-display-large-family',
  '--ld-semantic-font-display-small-family',
  '--ld-semantic-font-heading-large-family',
  '--ld-semantic-font-heading-medium-family',
  '--ld-semantic-font-heading-small-family',
  '--ld-semantic-font-case-study-hero-family',
  '--ld-semantic-font-page-title-family',
] as const;

function buildTextFontOverrides(textFont: TextFontKey): Record<string, string> {
  const family = TEXT_FONT_FAMILIES[textFont];
  return TYPOGRAPHY_FONT_FAMILY_TOKENS.reduce((acc, token) => {
    acc[token] = family;
    return acc;
  }, {} as Record<string, string>);
}

function hasExplicitFontCustomization(
  theme: Pick<CustomTheme, 'textFont' | 'tokenOverrides'>,
  presetFont: TextFontKey,
): boolean {
  const overrides = theme.tokenOverrides ?? {};
  if (TYPOGRAPHY_FONT_FAMILY_TOKENS.some((token) =>
    Object.prototype.hasOwnProperty.call(overrides, token),
  )) {
    return true;
  }
  return Boolean(theme.textFont && theme.textFont !== presetFont);
}

function resolvePreviewTextFont(theme: CustomTheme, dataLdTheme: ThemeName): TextFontKey {
  const presetFont = THEME_FONT_CONFIG[dataLdTheme]?.textFont
    ?? THEME_FONT_CONFIG[DEFAULT_BASE_THEME].textFont;
  if (hasExplicitFontCustomization(theme, presetFont) && theme.textFont) {
    return theme.textFont;
  }
  return presetFont;
}

/** Align stored body font with a built-in preset unless the user customized typography. */
export function syncBuiltInPresetFonts(theme: CustomTheme): CustomTheme {
  const presetName = (
    theme.builtInPreset
    ?? (isBuiltInPresetTheme(theme.name) ? theme.name : null)
  ) as ThemeName | null;
  if (!presetName) return theme;
  const presetFont = THEME_FONT_CONFIG[presetName]?.textFont;
  if (!presetFont || hasExplicitFontCustomization(theme, presetFont)) return theme;
  if (theme.textFont === presetFont) return theme;
  return { ...theme, textFont: presetFont };
}

const TOKEN_SEGMENT_ALIASES = [
  ['onFill', 'on-fill'],
  ['pageNav', 'page-nav'],
  ['topNav', 'top-nav'],
  ['bottomNav', 'bottom-nav'],
] as const;

/** Tokens that components consume under a different name than the theme source. */
const LINKED_TOKEN_ALIASES: Record<string, string> = {
  '--ld-semantic-focus-ring-color': '--ld-semantic-color-action-focus-outline',
  '--ld-semantic-color-action-focus-outline': '--ld-semantic-focus-ring-color',
};

export function mirrorSemanticTokenName(token: string): string[] {
  const mirrors = new Set<string>();
  TOKEN_SEGMENT_ALIASES.forEach(([left, right]) => {
    if (token.includes(left)) mirrors.add(token.split(left).join(right));
    if (token.includes(right)) mirrors.add(token.split(right).join(left));
  });
  const linked = LINKED_TOKEN_ALIASES[token];
  if (linked) mirrors.add(linked);
  mirrors.delete(token);
  return [...mirrors];
}

/** Mirror camelCase / kebab-case semantic aliases so overrides hit component CSS. */
export function expandSemanticTokenAliases(overrides: Record<string, string>): Record<string, string> {
  const out = { ...overrides };
  Object.entries(overrides).forEach(([token, value]) => {
    mirrorSemanticTokenName(token).forEach((alias) => {
      out[alias] = value;
    });
  });
  return out;
}

/** Resolve the full token override map for a theme (seeds + fine-grained). */
export function resolveOverrides(
  theme: Pick<CustomTheme, 'seeds' | 'tokenOverrides' | 'baseTheme'> & Partial<Pick<CustomTheme, 'textFont' | 'name' | 'builtInPreset'>>,
): Record<string, string> {
  const out: Record<string, string> = {};
  (Object.keys(theme.seeds) as SeedId[]).forEach((id) => {
    const def = SEED_BY_ID[id];
    const hex = theme.seeds[id];
    if (!def || !hex) return;
    Object.assign(out, def.derive(hex));
  });
  const dataLdTheme = theme.baseTheme ?? DEFAULT_BASE_THEME;
  Object.assign(out, buildTextFontOverrides(resolvePreviewTextFont(theme as CustomTheme, dataLdTheme)));
  if (theme.tokenOverrides) Object.assign(out, theme.tokenOverrides);
  return expandSemanticTokenAliases(out);
}

/** Whether a theme name maps to a built-in preset (WM, Portfolio, etc.). */
export function isBuiltInPresetTheme(name: string): name is ThemeName {
  return Object.prototype.hasOwnProperty.call(BUILT_IN_THEME_SEEDS, name);
}

/** Resolve the official preset theme for preview/CSS (handles saved built-in customizations). */
export function resolvePresetThemeName(theme: CustomTheme): ThemeName | null {
  if (theme.builtInPreset) return theme.builtInPreset;
  if (isBuiltInPresetTheme(theme.name)) return theme.name as ThemeName;
  return null;
}

function builtInSeedsChanged(theme: CustomTheme): boolean {
  const defaults = BUILT_IN_THEME_SEEDS[theme.name as ThemeName];
  if (!defaults) return false;
  return (Object.keys(theme.seeds) as SeedId[]).some((id) => theme.seeds[id] !== defaults[id]);
}

/**
 * Resolve how a theme should render in the editor preview.
 *
 * Inheritance model (THEME_INHERITANCE.md):
 *   1. LD Base primitives on the preview scope (isolates from `<html>` theme)
 *   2. Theme-specific primitive + semantic overrides via `data-ld-theme` CSS
 *   3. Seed derivations and user token overrides on top
 */
export function getPreviewThemeContext(
  theme: CustomTheme,
): { dataLdTheme: ThemeName; overrideStyle: Record<string, string> } {
  const presetTheme = resolvePresetThemeName(theme);
  if (presetTheme) {
    const dataLdTheme = presetTheme;
    const { base, primitiveOverrides, semanticOverrides } = getThemePreviewLayers(dataLdTheme);
    const style: Record<string, string> = {
      ...base,
      ...primitiveOverrides,
      ...semanticOverrides,
    };
    Object.assign(style, buildTextFontOverrides(resolvePreviewTextFont(theme, dataLdTheme)));
    (Object.keys(theme.seeds) as SeedId[]).forEach((id) => {
      const def = SEED_BY_ID[id];
      if (def) Object.assign(style, def.derive(theme.seeds[id]));
    });
    if (theme.tokenOverrides) Object.assign(style, theme.tokenOverrides);
    // Re-apply inherited layers unless explicitly overridden by the user.
    for (const [token, value] of Object.entries({ ...base, ...primitiveOverrides })) {
      if (!theme.tokenOverrides?.[token]) {
        style[token] = value;
      }
    }
    return { dataLdTheme, overrideStyle: expandSemanticTokenAliases(style) };
  }

  const dataLdTheme = theme.baseTheme;
  const { base, primitiveOverrides, semanticOverrides } = getThemePreviewLayers(dataLdTheme);
  return {
    dataLdTheme,
    overrideStyle: {
      ...base,
      ...primitiveOverrides,
      ...semanticOverrides,
      ...resolveOverrides(theme),
    },
  };
}

/* ── Storage ───────────────────────────────────────────────────── */

const CUSTOM_THEMES_KEY = 'ld-kit-custom-themes';
export const CUSTOM_THEMES_EVENT = 'ld-kit-custom-themes-change';
export const DEFAULT_BASE_THEME: ThemeName = 'Portfolio';

export const BUILT_IN_THEME_SEEDS: Record<ThemeName, Record<SeedId, string>> = {
  Portfolio: {
    primary: '#4f39f6',
    navigation: '#ffffff',
    surface: '#ffffff',
    positive: '#2a8703',
    negative: '#ea1100',
    warning: '#6366f1',
  },
  WM: {
    primary: '#006937',
    navigation: '#006937',
    surface: '#ffffff',
    positive: '#006937',
    negative: '#ea1100',
    warning: '#ffc220',
  },
  Oportun: {
    primary: '#00c859',
    navigation: '#00c859',
    surface: '#ffffff',
    positive: '#00c859',
    negative: '#fc1904',
    warning: '#ffc220',
  },
  Xense: {
    primary: '#17d3b9',
    navigation: '#121212',
    surface: '#2b2b2b',
    positive: '#00ff00',
    negative: '#fa3131',
    warning: '#faf031',
  },
  Carbon: {
    primary: '#2a0eff',
    navigation: '#2e3032',
    surface: '#ffffff',
    positive: '#51ffbc',
    negative: '#d32f4a',
    warning: '#c0d042',
  },
  Walmart: {
    primary: '#0053e2',
    navigation: '#0053e2',
    surface: '#ffffff',
    positive: '#2a8703',
    negative: '#ea1100',
    warning: '#ffc220',
  },
  "Sam's Club": {
    primary: '#0062ad',
    navigation: '#0062ad',
    surface: '#ffffff',
    positive: '#2a8703',
    negative: '#df2c2c',
    warning: '#f27c00',
  },
  "Sam's Club Maverick": {
    primary: '#0a6cff',
    navigation: '#0a6cff',
    surface: '#ffffff',
    positive: '#2a8703',
    negative: '#df2c2c',
    warning: '#f27c00',
  },
  'Walmart B2B': {
    primary: '#002e99',
    navigation: '#002e99',
    surface: '#ffffff',
    positive: '#2a8703',
    negative: '#ea1100',
    warning: '#ffc220',
  },
  Bodega: {
    primary: '#2c981d',
    navigation: '#2c981d',
    surface: '#ffffff',
    positive: '#2a8703',
    negative: '#ea1100',
    warning: '#ffc220',
  },
  'Cashi MX': {
    primary: '#6212b2',
    navigation: '#6212b2',
    surface: '#ffffff',
    positive: '#2a8703',
    negative: '#ea1100',
    warning: '#ffc220',
  },
  'Walmart Legacy': {
    primary: '#0071dc',
    navigation: '#0071dc',
    surface: '#ffffff',
    positive: '#2a8703',
    negative: '#ea1100',
    warning: '#ffc220',
  },
};

export const BUILTIN_CUSTOMIZATION_PREFIX = '__builtin__';

export function builtInCustomizationId(preset: ThemeName): string {
  return `${BUILTIN_CUSTOMIZATION_PREFIX}${preset}`;
}

/** Saved user edits for a built-in preset, if any. */
export function getBuiltInCustomization(preset: ThemeName): CustomTheme | undefined {
  return getCustomThemes().find(
    (theme) => theme.builtInPreset === preset || theme.id === builtInCustomizationId(preset),
  );
}

export function isBuiltInCustomization(theme: CustomTheme): boolean {
  return Boolean(theme.builtInPreset);
}

export function createThemeFromBuiltIn(themeName: ThemeName, name = themeName): CustomTheme {
  const now = Date.now();
  return {
    id: name,
    name,
    baseTheme: themeName,
    builtInPreset: themeName,
    description: `Based on ${themeName}`,
    textFont: THEME_FONT_CONFIG[themeName]?.textFont ?? THEME_FONT_CONFIG[DEFAULT_BASE_THEME].textFont,
    seeds: { ...BUILT_IN_THEME_SEEDS[themeName] },
    tokenOverrides: {},
    createdAt: now,
    updatedAt: now,
  };
}

function readLocalCustomThemes(): CustomTheme[] {
  try {
    const raw = localStorage.getItem(CUSTOM_THEMES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CustomTheme[]) : [];
  } catch {
    return [];
  }
}

function mergeCustomThemes(deployed: CustomTheme[], local: CustomTheme[]): CustomTheme[] {
  const byId = new Map<string, CustomTheme>();
  for (const theme of deployed) {
    byId.set(theme.id, theme);
  }
  for (const theme of local) {
    byId.set(theme.id, theme);
  }
  return Array.from(byId.values());
}

export function getCustomThemes(): CustomTheme[] {
  return mergeCustomThemes(getDeployedCustomThemes(), readLocalCustomThemes());
}

export function getCustomTheme(name: string): CustomTheme | undefined {
  const themes = getCustomThemes();
  const builtIn = themes.find(
    (theme) => theme.builtInPreset === name || theme.id === builtInCustomizationId(name as ThemeName),
  );
  if (builtIn) return builtIn;
  return themes.find((t) => t.id === name || t.name === name);
}

export function isCustomThemeName(name: string): boolean {
  return getCustomThemes().some(
    (t) => !t.builtInPreset && (t.id === name || t.name === name),
  );
}

function persist(themes: CustomTheme[]): void {
  try {
    localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(themes));
  } catch {
    // localStorage may be unavailable; in-session state still works.
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CUSTOM_THEMES_EVENT, { detail: { themes } }));
  }
}

/** Create or update a custom theme (matched by id). Returns the saved theme. */
export function saveCustomTheme(theme: CustomTheme): CustomTheme {
  const now = Date.now();
  const themes = readLocalCustomThemes();
  let idx = themes.findIndex((t) => t.id === theme.id);
  if (idx < 0 && !theme.builtInPreset) {
    idx = themes.findIndex((t) => t.name === theme.name && !t.builtInPreset);
  }
  const next: CustomTheme = { ...theme, updatedAt: now, createdAt: theme.createdAt || now };
  if (idx >= 0) themes[idx] = next;
  else themes.push(next);

  if (next.builtInPreset) {
    const canonicalId = builtInCustomizationId(next.builtInPreset);
    for (let i = themes.length - 1; i >= 0; i--) {
      const candidate = themes[i];
      if (
        candidate.id !== canonicalId
        && !candidate.builtInPreset
        && (candidate.id === next.builtInPreset || candidate.name === next.builtInPreset)
      ) {
        themes.splice(i, 1);
      }
    }
  }

  persist(themes);
  return next;
}

export function deleteCustomTheme(name: string): void {
  persist(readLocalCustomThemes().filter((t) => t.id !== name && t.name !== name));
}

/** Remove a saved custom theme by id and/or name. Returns whether a record was removed. */
export function deleteCustomThemeRecord(theme: Pick<CustomTheme, 'id' | 'name'>): boolean {
  const themes = readLocalCustomThemes();
  const next = themes.filter(
    (t) => t.id !== theme.id && t.name !== theme.name && t.id !== theme.name && t.name !== theme.id,
  );
  if (next.length === themes.length) return false;
  persist(next);
  return true;
}

/** Build a fresh custom theme seeded from the built-in base defaults. */
export function createDraftTheme(name: string, baseTheme: ThemeName = DEFAULT_BASE_THEME): CustomTheme {
  const now = Date.now();
  const seeds = SEEDS.reduce((acc, s) => {
    acc[s.id] = s.default;
    return acc;
  }, {} as Record<SeedId, string>);
  return {
    id: name,
    name,
    baseTheme,
    textFont: THEME_FONT_CONFIG[baseTheme]?.textFont ?? THEME_FONT_CONFIG[DEFAULT_BASE_THEME].textFont,
    seeds,
    tokenOverrides: {},
    createdAt: now,
    updatedAt: now,
  };
}

/* ── DOM application ───────────────────────────────────────────── */

const STYLE_EL_ID = 'ld-kit-custom-theme';

/** Inject a theme's resolved overrides so they win over brand theme defaults. */
export function injectCustomOverrides(
  theme: Pick<CustomTheme, 'seeds' | 'tokenOverrides' | 'name'> & Partial<Pick<CustomTheme, 'textFont'>>,
): void {
  if (typeof document === 'undefined') return;
  const overrides = resolveOverrides(theme);
  const body = Object.entries(overrides)
    .map(([token, value]) => `  ${token}: ${value};`)
    .join('\n');
  const customThemeName = theme.name.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const selector = customThemeName
    ? `:root[data-ld-custom-theme="${customThemeName}"]`
    : ':root';

  let el = document.getElementById(STYLE_EL_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = STYLE_EL_ID;
    el.setAttribute('data-theme-override', 'custom');
    document.head.appendChild(el);
  }
  el.textContent = `${selector} {\n${body}\n}`;
}

/** Remove any injected custom-theme overrides (used when a built-in theme is active). */
export function clearCustomOverrides(): void {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(STYLE_EL_ID);
  if (el) el.remove();
}
