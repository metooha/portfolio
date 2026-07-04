import {
  getBuiltInCustomization,
  getCustomThemes,
  type CustomTheme,
} from '@/app/components/utils/customThemes';
import { THEME_PRESETS } from '@/app/components/utils/themeManager';
import type { ThemeName } from '@/app/components/utils/Theming';

export function themeOptionValue(kind: 'builtin' | 'custom' | 'draft', id: string): string {
  return `${kind}:${id}`;
}

export function parseThemeOptionValue(value: string): { kind: 'builtin' | 'custom' | 'draft'; id: string } {
  const separator = value.indexOf(':');
  if (separator === -1) return { kind: 'draft', id: value };
  return {
    kind: value.slice(0, separator) as 'builtin' | 'custom' | 'draft',
    id: value.slice(separator + 1),
  };
}

export function findSavedTheme(
  draft: CustomTheme,
  sourceKind: 'built-in' | 'custom' | 'new',
): CustomTheme | undefined {
  if (draft.builtInPreset) {
    return getBuiltInCustomization(draft.builtInPreset);
  }

  if (sourceKind === 'built-in' && THEME_PRESETS[draft.name]) {
    return getBuiltInCustomization(draft.name as ThemeName);
  }

  const customThemes = getCustomThemes();
  return customThemes.find(
    (theme) => !theme.builtInPreset
      && (
        theme.id === draft.id
        || theme.name === draft.name
        || theme.id === draft.name
        || theme.name === draft.id
      ),
  );
}

export function getThemePickerValue(
  draft: CustomTheme,
  sourceKind: 'built-in' | 'custom' | 'new',
  customThemes: CustomTheme[],
): string {
  const builtInPreset = draft.builtInPreset
    ?? (sourceKind === 'built-in' && THEME_PRESETS[draft.name] ? draft.name : undefined);
  if (builtInPreset) {
    return themeOptionValue('builtin', builtInPreset);
  }

  const saved = findSavedTheme(draft, sourceKind);
  if (saved) return themeOptionValue('custom', saved.id);
  if (sourceKind === 'built-in' && THEME_PRESETS[draft.name]) {
    return themeOptionValue('builtin', draft.name);
  }
  if (customThemes.some((theme) => !theme.builtInPreset && (theme.id === draft.id || theme.name === draft.name))) {
    return themeOptionValue('custom', draft.id);
  }
  return themeOptionValue('draft', draft.id);
}
