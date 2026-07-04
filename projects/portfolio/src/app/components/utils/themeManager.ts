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
  loadTextFont,
  DEFAULT_THEME,
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
import { getAllCaseStudies } from '@/app/data/case-studies-config';
import { otherWork } from '@/app/data/portfolio-data';
import { getDeployedPageThemes } from '@/app/auth/site-config';

export { THEME_PRESETS, THEME_FONT_CONFIG, type ThemePreset };

const STORAGE_KEY = 'ld-kit-theme';
const THEME_CHANGE_EVENT = 'ld-kit-theme-change';
export const PAGE_THEME_CHANGE_EVENT = 'ld-kit-page-theme-change';
const MEGA_STORAGE_KEY = 'ld-kit-mega';
const PAGE_THEMES_STORAGE_KEY = 'ld-kit-page-themes';
const DENSITY_ATTR = 'data-ld-density';
export const MEGA_CHANGE_EVENT = 'ld-kit-mega-change';

export type ThemePageTargetGroup = 'main' | 'case-study' | 'other-work' | 'admin';

export interface ThemePageTarget {
  id: string;
  label: string;
  group: ThemePageTargetGroup;
  /** Higher values win when multiple targets match the same path. */
  specificity: number;
  match: (pathname: string) => boolean;
}

const MAIN_THEME_PAGE_TARGETS: ThemePageTarget[] = [
  { id: 'home', label: 'Home', group: 'main', specificity: 1, match: (pathname) => pathname === '/' },
  { id: 'about', label: 'About', group: 'main', specificity: 1, match: (pathname) => pathname === '/about' },
  { id: 'work', label: 'Work', group: 'main', specificity: 1, match: (pathname) => pathname === '/work' },
  { id: 'contact', label: 'Contact', group: 'main', specificity: 1, match: (pathname) => pathname === '/contact' },
  { id: 'dashboard', label: 'Settings', group: 'admin', specificity: 1, match: (pathname) => pathname === '/dashboard' },
  { id: 'component-library', label: 'Component library', group: 'admin', specificity: 1, match: (pathname) => pathname === '/component-library' },
  { id: 'theme-editor', label: 'Theme editor', group: 'admin', specificity: 1, match: (pathname) => pathname === '/theme-editor' },
  { id: 'palette-generator', label: 'Palette generator', group: 'admin', specificity: 1, match: (pathname) => pathname === '/palette-generator' },
];

function getCaseStudyThemeTargets(): ThemePageTarget[] {
  return getAllCaseStudies().map((study) => ({
    id: `case-study-${study.id}`,
    label: study.title,
    group: 'case-study' as const,
    specificity: 100,
    match: (pathname: string) => pathname === study.path,
  }));
}

function getOtherWorkThemeTargets(): ThemePageTarget[] {
  return otherWork.map((work) => ({
    id: `other-work-${work.id}`,
    label: work.title,
    group: 'other-work' as const,
    specificity: 100,
    match: (pathname: string) => pathname === `/other-work/${work.id}`,
  }));
}

export const THEME_PAGE_TARGETS: ThemePageTarget[] = [
  ...MAIN_THEME_PAGE_TARGETS,
  ...getCaseStudyThemeTargets(),
  ...getOtherWorkThemeTargets(),
];

export const THEME_PAGE_TARGET_GROUPS: Array<{ id: ThemePageTargetGroup; label: string }> = [
  { id: 'main', label: 'Main pages' },
  { id: 'case-study', label: 'Case studies' },
  { id: 'other-work', label: 'Other work' },
  { id: 'admin', label: 'Admin' },
];

const CASE_STUDY_FALLBACK_THEME: ThemeName = 'Walmart';
const OTHER_WORK_DEFAULT_THEME: ThemeName = 'Walmart';

export function getDefaultThemeForPath(pathname: string): ThemeName {
  const caseStudy = getAllCaseStudies().find((study) => study.path === pathname);
  if (caseStudy) {
    return caseStudy.defaultTheme ?? CASE_STUDY_FALLBACK_THEME;
  }

  if (pathname.startsWith('/other-work/')) {
    return OTHER_WORK_DEFAULT_THEME;
  }

  return DEFAULT_THEME;
}

function findThemePageTarget(pathname: string): ThemePageTarget | undefined {
  return THEME_PAGE_TARGETS
    .filter((page) => page.match(pathname))
    .sort((a, b) => b.specificity - a.specificity)[0];
}

export function getThemeTargetForPath(pathname: string): ThemePageTarget | undefined {
  return findThemePageTarget(pathname);
}

export function getEffectiveThemeForPath(pathname: string): string {
  const pageTheme = getPageThemeForPath(pathname);
  return pageTheme ?? getDefaultThemeForPath(pathname);
}

/* ── Module-level state ──────────────────────────────────────── */

let _currentTheme: ThemeName = DEFAULT_THEME;
let _megaMode = false;

/* ── Public API ──────────────────────────────────────────────── */

/** Apply a custom theme: base theme tokens/fonts (silent) + injected overrides. */
function applyCustomTheme(theme: CustomTheme, options?: { persist?: boolean; notify?: boolean }): void {
  const { persist = true, notify = true } = options ?? {};
  // Lay down the base theme's tokens + fonts without clobbering the active
  // theme name or firing a change event for the base.
  applyTheme(theme.baseTheme, { persist: false, notify: false });
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-ld-custom-theme', theme.name);
  }
  injectCustomOverrides(theme);
  if (theme.textFont) loadTextFont(theme.textFont);
  if (persist) {
    try { localStorage.setItem(STORAGE_KEY, theme.name); } catch {}
  }
  if (notify && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme: theme.name } }));
  }
}

/** Apply a built-in theme: clear any custom overrides first. */
function applyBuiltInTheme(name: ThemeName, options?: { persist?: boolean; notify?: boolean }): void {
  clearCustomOverrides();
  if (typeof document !== 'undefined') {
    document.documentElement.removeAttribute('data-ld-custom-theme');
  }
  applyTheme(name, options);
}

const RETIRED_THEMES = new Set(['Sparky', 'Data Ventures', 'Walmart+', "Member's Mark"]);

const MAIN_AND_ADMIN_THEME_TARGET_IDS = new Set(
  THEME_PAGE_TARGETS
    .filter((target) => target.group === 'main' || target.group === 'admin')
    .map((target) => target.id),
);

/** Remove page-level theme overrides for main and admin pages. */
function resetMainAndAdminPageThemeOverrides(): boolean {
  const pageAssignments = getPageThemeAssignments();
  const next = Object.fromEntries(
    Object.entries(pageAssignments).filter(([targetId]) => !MAIN_AND_ADMIN_THEME_TARGET_IDS.has(targetId)),
  );
  if (Object.keys(next).length === Object.keys(pageAssignments).length) {
    return false;
  }
  localStorage.setItem(PAGE_THEMES_STORAGE_KEY, JSON.stringify(next));
  return true;
}

/** Clean retired themes from storage without applying a global theme. */
export function prepareThemeStorage(): void {
  let changed = false;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      localStorage.removeItem(STORAGE_KEY);
      changed = true;
    }

    const pageAssignments = getPageThemeAssignments();
    const cleanedPageAssignments = Object.fromEntries(
      Object.entries(pageAssignments).filter(([, themeName]) => !RETIRED_THEMES.has(themeName)),
    );
    if (Object.keys(cleanedPageAssignments).length !== Object.keys(pageAssignments).length) {
      localStorage.setItem(PAGE_THEMES_STORAGE_KEY, JSON.stringify(cleanedPageAssignments));
      changed = true;
    }

    if (resetMainAndAdminPageThemeOverrides()) {
      changed = true;
    }
  } catch {
    // localStorage may be unavailable.
  }

  if (changed && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PAGE_THEME_CHANGE_EVENT));
  }
}

export function initTheme(): void {
  prepareThemeStorage();

  try {
    const activeStored = localStorage.getItem(STORAGE_KEY);
    if (activeStored) {
      const custom = getCustomTheme(activeStored);
      if (custom) {
        _currentTheme = custom.name;
        applyCustomTheme(custom);
        return;
      }
      if (THEME_PRESETS[activeStored]) {
        _currentTheme = activeStored as ThemeName;
        applyBuiltInTheme(activeStored as ThemeName);
        return;
      }
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // localStorage may be unavailable; fall back to default.
  }

  _currentTheme = DEFAULT_THEME;
  applyBuiltInTheme(DEFAULT_THEME, { persist: false, notify: false });
}

export function setTheme(name: string, options?: { persist?: boolean; notify?: boolean }): void {
  const { persist = true } = options ?? {};
  const custom = getCustomTheme(name);
  if (custom) {
    _currentTheme = custom.name as ThemeName;
    applyCustomTheme(custom, options);
    return;
  }
  if (!THEME_PRESETS[name]) return;
  _currentTheme = name as ThemeName;
  applyBuiltInTheme(name as ThemeName, options);
}

export function getTheme(): string {
  return _currentTheme;
}

/** Built-in theme names only. */
export function getThemeNames(): string[] {
  return Object.keys(THEME_PRESETS);
}

/** Custom theme names, in creation order (excludes built-in preset customizations). */
export function getCustomThemeNames(): string[] {
  return getCustomThemes().filter((t) => !t.builtInPreset).map((t) => t.name);
}

/** All selectable theme names (built-in + custom). */
export function getAllThemeNames(): string[] {
  return [...Object.keys(THEME_PRESETS), ...getCustomThemeNames()];
}

function readLocalPageThemeAssignments(): Record<string, string> {
  try {
    const raw = localStorage.getItem(PAGE_THEMES_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function getPageThemeAssignments(): Record<string, string> {
  return { ...getDeployedPageThemes(), ...readLocalPageThemeAssignments() };
}

export function setPageTheme(targetId: string, themeName: string): void {
  try {
    const next = { ...readLocalPageThemeAssignments(), [targetId]: themeName };
    localStorage.setItem(PAGE_THEMES_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Page-scoped themes are an enhancement; ignore storage failures.
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PAGE_THEME_CHANGE_EVENT));
  }
}

export function clearPageTheme(targetId: string): void {
  try {
    const next = { ...readLocalPageThemeAssignments() };
    delete next[targetId];
    localStorage.setItem(PAGE_THEMES_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Page-scoped themes are an enhancement; ignore storage failures.
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PAGE_THEME_CHANGE_EVENT));
  }
}

/** Remove page-level theme overrides that point at a deleted or retired theme. */
export function clearPageThemesUsingTheme(themeName: string): void {
  try {
    const assignments = readLocalPageThemeAssignments();
    const next = { ...assignments };
    let changed = false;
    for (const [targetId, theme] of Object.entries(assignments)) {
      if (theme === themeName) {
        delete next[targetId];
        changed = true;
      }
    }
    if (!changed) return;
    localStorage.setItem(PAGE_THEMES_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Page-scoped themes are an enhancement; ignore storage failures.
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PAGE_THEME_CHANGE_EVENT));
  }
}

/** Delete a custom theme and clear any site/page references to it. */
export function removeCustomTheme(name: string): void {
  deleteCustomTheme(name);
  clearPageThemesUsingTheme(name);
  try {
    if (localStorage.getItem(STORAGE_KEY) === name) {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // localStorage may be unavailable.
  }
  if (_currentTheme === name && !getCustomTheme(name) && THEME_PRESETS.Portfolio) {
    _currentTheme = 'Portfolio';
  }
}

export function getPageThemeForPath(pathname: string): string | null {
  const target = findThemePageTarget(pathname);
  if (!target) return null;
  return getPageThemeAssignments()[target.id] ?? null;
}

export function applyThemeForPath(pathname: string): void {
  const pageTheme = getPageThemeForPath(pathname);
  setTheme(pageTheme ?? getDefaultThemeForPath(pathname), { persist: false });
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
