import type { ThemeName } from '@/app/components/utils/Theming';
import {
  BASE_PRIMITIVE_VARS,
  THEME_PRIMITIVE_OVERRIDES,
  THEME_SEMANTIC_OVERRIDES,
  resolveThemePrimitiveVars,
} from './theme-primitives';

export { BASE_PRIMITIVE_VARS, THEME_PRIMITIVE_OVERRIDES, THEME_SEMANTIC_OVERRIDES };

export const SCALE_STEPS = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];

/** Figma partial scale — no step 140. */
export const LIGHT_GREEN_STEPS = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 150, 160, 170, 180] as const;

/** Figma partial scale — WM-only family. */
export const WM_GREEN_STEPS = [5, 10, 20, 30, 50] as const;

/** Extra primitive families in Figma base color — WM theme only. */
export const WM_EXTRA_SCALE_FAMILIES = ['light-green', 'wm-green'] as const;

/** Base spark ramp from base-tokens.css — universal across all themes. */
export const BASE_SPARK_PRIMITIVE_VARS: Record<string, string> = {
  '--ld-primitive-color-spark-5': '#fffcf4',
  '--ld-primitive-color-spark-10': '#fef6de',
  '--ld-primitive-color-spark-20': '#fff3d2',
  '--ld-primitive-color-spark-30': '#ffedbc',
  '--ld-primitive-color-spark-40': '#ffe7a6',
  '--ld-primitive-color-spark-50': '#fbe298',
  '--ld-primitive-color-spark-60': '#ffda79',
  '--ld-primitive-color-spark-70': '#ffd463',
  '--ld-primitive-color-spark-80': '#ffce4d',
  '--ld-primitive-color-spark-90': '#ffc836',
  '--ld-primitive-color-spark-100': '#ffc220',
  '--ld-primitive-color-spark-110': '#e6a31d',
  '--ld-primitive-color-spark-120': '#cc851a',
  '--ld-primitive-color-spark-130': '#b36a16',
  '--ld-primitive-color-spark-140': '#995213',
  '--ld-primitive-color-spark-150': '#803d10',
  '--ld-primitive-color-spark-160': '#662b0d',
  '--ld-primitive-color-spark-170': '#4d1c0a',
  '--ld-primitive-color-spark-180': '#330f06',
};

/** Spark always inherits LD Base — no per-theme spark overrides. */
export function getSparkPrimitiveVars(_themeName?: ThemeName): Record<string, string> {
  return BASE_SPARK_PRIMITIVE_VARS;
}

/** Per-theme primitive overrides (only tokens that differ from LD Base). */
export function getThemePrimitiveOverrides(themeName: ThemeName): Record<string, string> {
  return THEME_PRIMITIVE_OVERRIDES[themeName] ?? {};
}

/** Per-theme semantic overrides (only tokens that differ from LD Base). */
export function getThemeSemanticOverrides(themeName: ThemeName): Record<string, string> {
  return THEME_SEMANTIC_OVERRIDES[themeName] ?? {};
}

/** Resolved primitive map: LD Base + theme overrides (inheritance model). */
export function getThemePrimitiveVars(themeName: ThemeName): Record<string, string> {
  return resolveThemePrimitiveVars(themeName);
}

/** @deprecated Use getThemePrimitiveVars */
export function getBrandThemePrimitiveVars(themeName: ThemeName): Record<string, string> {
  return getThemePrimitiveVars(themeName);
}

/** Primitive families shown in the palette grid for a theme. */
export function getScaleFamiliesForTheme(themeName: ThemeName): readonly string[] {
  if (themeName === 'WM') {
    return [...SCALE_FAMILIES, ...WM_EXTRA_SCALE_FAMILIES];
  }
  return SCALE_FAMILIES;
}

/** Scale steps for a primitive family (Figma defines partial ramps for WM extras). */
export function getScaleStepsForFamily(family: string): readonly number[] {
  if (family === 'wm-green') return WM_GREEN_STEPS;
  if (family === 'light-green') return LIGHT_GREEN_STEPS;
  return SCALE_STEPS;
}

/**
 * Inject LD Base + theme overrides so preview scopes don't inherit the document
 * theme from `<html data-ld-theme="Portfolio">`. See THEME_INHERITANCE.md.
 */
export function getThemePreviewPrimitiveVars(themeName: ThemeName): Record<string, string> {
  return getThemePrimitiveVars(themeName);
}

/** Layered preview vars: LD Base, then theme-specific overrides. */
export function getThemePreviewLayers(themeName: ThemeName): {
  base: Record<string, string>;
  primitiveOverrides: Record<string, string>;
  semanticOverrides: Record<string, string>;
} {
  return {
    base: BASE_PRIMITIVE_VARS,
    primitiveOverrides: getThemePrimitiveOverrides(themeName),
    semanticOverrides: getThemeSemanticOverrides(themeName),
  };
}

export const SCALE_FAMILIES = [
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

export interface PrimitiveColorOption {
  id: string;
  label: string;
  description: string;
  hex: string;
  family: string;
}

export function resolveCssColor(cssVarName: string, fallback = '#E3E4E5'): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim();
  return raw || fallback;
}

export function resolveCssVarFromElement(
  element: Element | null | undefined,
  cssVarName: string,
  fallback = '',
): string {
  if (typeof document === 'undefined' || !element) return fallback;
  const raw = getComputedStyle(element).getPropertyValue(cssVarName).trim();
  return raw || fallback;
}

export function resolveCssVar(cssVarName: string, fallback = ''): string {
  return resolveCssVarFromElement(document.documentElement, cssVarName, fallback);
}

/** Follow var(--token) chains on a scoped element until a concrete value is found. */
export function resolveSemanticToken(
  token: string,
  resolveToken: (cssVarName: string, fallback?: string) => string,
  overrides: Record<string, string> = {},
  fallback = '',
): string {
  if (Object.prototype.hasOwnProperty.call(overrides, token)) {
    return overrides[token];
  }

  let value = resolveToken(token, fallback);
  for (let depth = 0; depth < 12; depth += 1) {
    const trimmed = value.trim();
    const varMatch = trimmed.match(/^var\(\s*(--[^,)]+)(?:\s*,\s*([\s\S]+))?\s*\)$/);
    if (!varMatch) break;

    const [, varName, varFallback = ''] = varMatch;
    const fallbackValue = varFallback.trim().replace(/^['"]|['"]$/g, '');
    const resolved = resolveToken(varName, fallbackValue);
    if (!resolved || resolved === value) {
      value = fallbackValue || value;
      break;
    }
    value = resolved;
  }

  return value || fallback;
}

export function buildPrimitiveOptions(
  resolveToken: (cssVarName: string, fallback?: string) => string = resolveCssColor,
): PrimitiveColorOption[] {
  return SCALE_FAMILIES.flatMap((family) =>
    SCALE_STEPS.map((step) => {
      const token = `--ld-primitive-color-${family}-${step}`;
      const label = `${family}-${step}`;
      return {
        id: token,
        label,
        description: token,
        hex: resolveToken(token, resolveCssColor(token)),
        family,
      };
    }),
  );
}

function normalizeHexForCompare(hex: string): string {
  return hex.trim().toLowerCase();
}

export function buildColorSelectOptions(
  hex: string,
  currentLabel: string,
  primitiveOptions: PrimitiveColorOption[],
): { selectOptions: PrimitiveColorOption[]; selectedOption: PrimitiveColorOption } {
  const currentOptionId = `current-${currentLabel.replace(/\s+/g, '-').toLowerCase()}`;
  const normalizedHex = normalizeHexForCompare(hex);
  const matched = primitiveOptions.find(
    (option) => normalizeHexForCompare(option.hex) === normalizedHex,
  );
  const selectOptions = matched
    ? primitiveOptions
    : [
        {
          id: currentOptionId,
          label: `Current ${currentLabel}`,
          description: 'Current value',
          hex,
          family: 'Current',
        },
        ...primitiveOptions,
      ];
  return { selectOptions, selectedOption: matched ?? selectOptions[0] };
}
