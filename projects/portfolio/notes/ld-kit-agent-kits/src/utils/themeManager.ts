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

export { THEME_PRESETS, THEME_FONT_CONFIG, type ThemePreset };

const STORAGE_KEY = 'ld-kit-theme';
const MEGA_STORAGE_KEY = 'ld-kit-mega';
const DENSITY_ATTR = 'data-ld-density';
export const MEGA_CHANGE_EVENT = 'ld-kit-mega-change';

/* ── Module-level state ──────────────────────────────────────── */

let _currentTheme = 'Walmart';
let _megaMode = false;

/* ── Public API ──────────────────────────────────────────────── */

export function initTheme(): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && THEME_PRESETS[stored]) {
      _currentTheme = stored;
      applyTheme(stored as ThemeName);
      return;
    }
  } catch {
    // localStorage may be unavailable; fall back to default.
  }
  // Load fonts for the default theme
  loadThemeFonts(_currentTheme as ThemeName);
}

export function setTheme(name: string): void {
  if (!THEME_PRESETS[name]) return;
  _currentTheme = name;
  applyTheme(name as ThemeName);
}

export function getTheme(): string {
  return _currentTheme;
}

export function getThemeNames(): string[] {
  return Object.keys(THEME_PRESETS);
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
