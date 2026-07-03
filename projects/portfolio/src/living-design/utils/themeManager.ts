/* ── Theme Manager ────────────────────────────────────────────────
 *  Thin wrapper around Theming.tsx for the root ld-kit app.
 *  Provides an imperative API (initTheme, setTheme, getTheme)
 *  used by IndexPage and AppNav.
 *
 *  THEME_PRESETS are re-exported from Theming.tsx
 *  which is the single source of truth for all theme presets.
 * ─────────────────────────────────────────────────────────────── */

import {
  THEME_PRESETS,
  THEME_FONT_CONFIG,
  applyTheme,
  loadThemeFonts,
  type ThemePreset,
  type ThemeName,
} from './Theming';
import {
  getCustomTheme,
  getCustomThemes,
  isCustomThemeName,
  injectCustomOverrides,
  clearCustomOverrides,
  type CustomTheme,
} from './customThemes';

export { THEME_PRESETS, THEME_FONT_CONFIG, type ThemePreset };

const STORAGE_KEY = 'ld-kit-theme';
const THEME_CHANGE_EVENT = 'ld-kit-theme-change';
const MEGA_STORAGE_KEY = 'ld-kit-mega';
const DENSITY_ATTR = 'data-ld-density';
export const MEGA_CHANGE_EVENT = 'ld-kit-mega-change';

/* ── Module-level state ──────────────────────────────────────── */

let _currentTheme = 'Walmart';
let _megaMode = false;

/* ── Public API ──────────────────────────────────────────────── */

/** Apply a custom theme: base theme tokens/fonts (silent) + injected overrides. */
function applyCustomTheme(theme: CustomTheme): void {
  // Lay down the base theme's tokens + fonts without clobbering the active
  // theme name or firing a change event for the base.
  applyTheme(theme.baseTheme, { persist: false, notify: false });
  injectCustomOverrides(theme);

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-ld-custom-theme', theme.name);
  }
  try { localStorage.setItem(STORAGE_KEY, theme.name); } catch {}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme: theme.name } }));
  }
}

/** Apply a built-in theme: clear any custom overrides first. */
function applyBuiltInTheme(name: ThemeName): void {
  clearCustomOverrides();
  if (typeof document !== 'undefined') {
    document.documentElement.removeAttribute('data-ld-custom-theme');
  }
  applyTheme(name);
}

export function initTheme(): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const custom = getCustomTheme(stored);
      if (custom) {
        _currentTheme = custom.name;
        applyCustomTheme(custom);
        return;
      }
      if (THEME_PRESETS[stored]) {
        _currentTheme = stored;
        applyBuiltInTheme(stored as ThemeName);
        return;
      }
    }
  } catch {
    // localStorage may be unavailable; fall back to default.
  }
  // Load fonts for the default theme
  loadThemeFonts(_currentTheme as ThemeName);
}

export function setTheme(name: string): void {
  const custom = getCustomTheme(name);
  if (custom) {
    _currentTheme = custom.name;
    applyCustomTheme(custom);
    return;
  }
  if (!THEME_PRESETS[name]) return;
  _currentTheme = name;
  applyBuiltInTheme(name as ThemeName);
}

export function getTheme(): string {
  return _currentTheme;
}

/** Built-in theme names only. */
export function getThemeNames(): string[] {
  return Object.keys(THEME_PRESETS);
}

/** Custom theme names, in creation order. */
export function getCustomThemeNames(): string[] {
  return getCustomThemes().map((t) => t.name);
}

/** All selectable theme names (built-in + custom). */
export function getAllThemeNames(): string[] {
  return [...Object.keys(THEME_PRESETS), ...getCustomThemeNames()];
}

/** Representative primary color for any theme name (for swatches). */
export function getThemePrimaryColor(name: string): string {
  const preset = THEME_PRESETS[name];
  if (preset) return preset.primaryColor;
  const custom = getCustomTheme(name);
  return custom?.seeds.primary ?? '#0053e2';
}

export function isCustomTheme(name: string): boolean {
  return isCustomThemeName(name);
}

/* ── Mega mode ───────────────────────────────────────────────────
 * Scales the root font-size to 150% via a `data-ld-density` attribute
 * on <html>. Intended for in-store touch screens / kiosks where bigger
 * tap targets and larger type both matter. */

function applyMegaToDOM(enabled: boolean): void {
  if (typeof document === 'undefined') return;
  if (enabled) {
    document.documentElement.setAttribute(DENSITY_ATTR, 'mega');
  } else {
    document.documentElement.removeAttribute(DENSITY_ATTR);
  }
}

export function initMegaMode(): void {
  try {
    const stored = localStorage.getItem(MEGA_STORAGE_KEY);
    _megaMode = stored === '1';
  } catch {
    _megaMode = false;
  }
  applyMegaToDOM(_megaMode);
}

export function setMegaMode(enabled: boolean): void {
  _megaMode = enabled;
  applyMegaToDOM(enabled);
  try {
    localStorage.setItem(MEGA_STORAGE_KEY, enabled ? '1' : '0');
  } catch {
    // localStorage may be unavailable; toggle still applies in-session.
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(MEGA_CHANGE_EVENT, { detail: { enabled } }));
  }
}

export function getMegaMode(): boolean {
  return _megaMode;
}
