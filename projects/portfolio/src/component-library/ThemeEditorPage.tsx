import * as React from 'react';
import {
  Alert,
  Badge,
  Body,
  Button,
  Caption,
  Heading,
  IconButton,
  Label,
  Link,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  Menu,
  MenuItem,
  MenuSectionTitle,
  MoreIcon,
  Select,
  SegmentedControl,
  Tooltip,
  TabNavigation,
  TabNavigationItem,
  Icon,
  TextField,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/app/components';
import {
  SEEDS,
  type SeedId,
  type CustomTheme,
  getCustomThemes,
  saveCustomTheme,
  deleteCustomTheme,
  deleteCustomThemeRecord,
  createDraftTheme,
  createThemeFromBuiltIn,
  resolveOverrides,
  getPreviewThemeContext,
  mirrorSemanticTokenName,
  getCustomTheme,
  CUSTOM_THEMES_EVENT,
  DEFAULT_BASE_THEME,
  isCustomThemeName,
  BUILT_IN_THEME_SEEDS,
  isBuiltInPresetTheme,
  getBuiltInCustomization,
  builtInCustomizationId,
  isBuiltInCustomization,
  syncBuiltInPresetFonts,
} from '@/app/components/utils/customThemes';
import {
  APPLY_CAMPAIGN_COLORS_EVENT,
  promptRequestsCampaignColors,
} from '@/app/components/utils/campaignPalettes';
import {
  removeCustomTheme,
  THEME_FONT_CONFIG,
  THEME_PRESETS,
} from '@/app/components/utils/themeManager';
import { darken, parseHex, tint } from '@/app/components/utils/colorUtils';
import { A11yAnnouncementProvider } from '@/app/components/A11yAnnouncement';
import { loadTextFont, loadThemeFonts, type TextFontKey, type ThemeName } from '@/app/components/utils/Theming';
import './ThemeEditorPage.css';
import {
  BASE_SURFACE_TOKENS,
  ExistingThemePicker,
  PreviewPanel,
  PrimitiveTokenPicker,
  ThemeEditorCategoryNav,
  ThemeEditorPanel,
  ThemeEditorScrollRegion,
  ThemeEditorSectionHeader,
  ThemeEditorTokenRow,
  TOKEN_PICKER_WIDTH,
  buildColorSelectOptions,
  findSavedTheme,
  parseThemeOptionValue,
  resolveCssVar,
  resolveSemanticToken,
  themeOptionValue,
  ThemeEditorDraftTokenProvider,
  useThemeEditorDraftTokens,
  type EditorTab,
  type PrimitiveColorOption,
  type ThemeTokenResolver,
  SCALE_STEPS,
} from './theme-editor';

const CUSTOM_SCALES_KEY = 'ld-kit-palette-generator-scales';
const STEP_L: Record<number, number> = {
  5: 97, 10: 95, 20: 89, 30: 83, 40: 77, 50: 71, 60: 65, 70: 59, 80: 53,
  90: 47, 100: 41, 110: 36, 120: 31, 130: 27, 140: 23, 150: 19, 160: 15, 170: 11, 180: 7,
};
const STEP_S: Record<number, number> = {
  5: 0.12, 10: 0.20, 20: 0.35, 30: 0.52, 40: 0.65, 50: 0.77, 60: 0.87,
  70: 0.94, 80: 0.98, 90: 1, 100: 1, 110: 0.98, 120: 0.96,
  130: 0.93, 140: 0.90, 150: 0.87, 160: 0.84, 170: 0.80, 180: 0.76,
};
const TEXT_FONT_OPTIONS: Array<{ value: TextFontKey; label: string; family: string }> = [
  { value: 'inter', label: 'Inter', family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
  { value: 'maax', label: 'Maax', family: "'Maax', 'Inter', -apple-system, Roboto, sans-serif" },
  { value: 'calibre', label: 'Calibre R', family: "'Calibre-R', 'Inter', -apple-system, Roboto, sans-serif" },
  { value: 'tt-commons', label: 'TT Commons Classic', family: "'TT Commons Classic', 'Inter', -apple-system, Roboto, sans-serif" },
  { value: 'everyday-sans', label: 'Everyday Sans', family: "'Everyday Sans UI', -apple-system, Roboto, sans-serif" },
  { value: 'gibson', label: 'Gibson', family: "'Gibson', -apple-system, Roboto, sans-serif" },
  { value: 'bogle', label: 'Bogle', family: "'Bogle', -apple-system, Roboto, sans-serif" },
];

const HEADING_FONT_TOKENS = [
  '--ld-semantic-font-display-large-family',
  '--ld-semantic-font-display-small-family',
  '--ld-semantic-font-heading-large-family',
  '--ld-semantic-font-heading-medium-family',
  '--ld-semantic-font-heading-small-family',
] as const;

const TYPE_SCALE_OPTIONS = [
  { value: 'default', label: 'Default — 1', ratio: 1 },
  { value: 'minor-second', label: 'Minor second — 1.067', ratio: 1.067 },
  { value: 'major-second', label: 'Major second — 1.125', ratio: 1.125 },
  { value: 'custom-1167', label: 'Custom — 1.167', ratio: 1.167 },
  { value: 'major-third', label: 'Major third — 1.25', ratio: 1.25 },
] as const;

type TypeScaleKey = (typeof TYPE_SCALE_OPTIONS)[number]['value'];

/** Built-in theme shown in the editor after deleting a custom theme. */
const EDITOR_FALLBACK_THEME: ThemeName = 'Portfolio';

type ThemeTemplateSource =
  | { type: 'built-in'; name: ThemeName }
  | { type: 'custom'; name: string };


type AdvancedCategory =
  | 'colors'
  | 'spacing'
  | 'radius'
  | 'elevation'
  | 'duration'
  | 'easing'
  | 'borderWidth'
  | 'opacity'
  | 'zIndex'
  | 'breakpoints';

type TokenPreviewKind = 'spacing' | 'radius' | 'elevation' | 'borderWidth';

const FONT_SIZE_OPTIONS = [
  '0.75rem',
  '0.875rem',
  '1rem',
  '1.125rem',
  '1.25rem',
  '1.5rem',
  '1.625rem',
  '1.75rem',
  '1.875rem',
  '2rem',
  '2.25rem',
  '2.5rem',
  '2.625rem',
  '3rem',
  '3.25rem',
  '4rem',
  '5.25rem',
  '8.75rem',
] as const;

const LINE_HEIGHT_OPTIONS = [
  '1rem',
  '1.25rem',
  '1.5rem',
  '1.75rem',
  '2rem',
  '2.25rem',
  '2.5rem',
  '3rem',
  '3.25rem',
] as const;

const FONT_WEIGHT_OPTIONS = ['400', '500', '600', '700'] as const;

const REM_BASE_PX = 16;

function roundDesignerNumber(value: number): number {
  return Math.round(value * 100) / 100;
}

function formatDesignerPx(px: number): string {
  if (px >= 9999) return 'Full';
  const rounded = roundDesignerNumber(px);
  return `${Number.isInteger(rounded) ? rounded : rounded}px`;
}

/** Convert a stored CSS length (rem/px) to a designer-readable px label. */
function formatDesignerLength(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.endsWith('rem')) {
    return formatDesignerPx(parseFloat(trimmed) * REM_BASE_PX);
  }
  if (trimmed.endsWith('px')) return trimmed;
  if (trimmed === '0') return '0px';
  const px = parseFloat(trimmed);
  if (!Number.isNaN(px)) return formatDesignerPx(px);
  return value;
}

/** Convert designer px input to px for CSS token storage. */
function designerLengthToCss(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (trimmed.toLowerCase() === 'full' || trimmed === '9999') return '9999px';
  if (trimmed.endsWith('px')) {
    const px = parseFloat(trimmed.slice(0, -2));
    if (Number.isNaN(px)) return value;
    return px === 0 ? '0' : formatDesignerPx(px);
  }
  if (trimmed.endsWith('rem')) {
    const rem = parseFloat(trimmed);
    if (!Number.isNaN(rem)) return rem === 0 ? '0' : formatDesignerPx(rem * REM_BASE_PX);
  }
  const px = parseFloat(trimmed);
  if (Number.isNaN(px)) return value;
  return px === 0 ? '0' : formatDesignerPx(px);
}

/** Convert stored CSS duration (s/ms) to designer-readable ms. */
function formatDesignerDuration(value: string): string {
  const trimmed = value.trim();
  if (trimmed.endsWith('ms')) return trimmed;
  if (trimmed.endsWith('s')) {
    const ms = parseFloat(trimmed) * 1000;
    const rounded = roundDesignerNumber(ms);
    return `${Number.isInteger(rounded) ? rounded : rounded}ms`;
  }
  return value;
}

/** Convert designer ms input back to seconds for CSS token storage. */
function designerDurationToCss(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (trimmed.endsWith('s') && !trimmed.endsWith('ms')) return trimmed;
  const msText = trimmed.endsWith('ms') ? trimmed.slice(0, -2) : trimmed;
  const ms = parseFloat(msText);
  if (Number.isNaN(ms)) return value;
  const seconds = ms / 1000;
  const rounded = roundDesignerNumber(seconds);
  return `${rounded}s`;
}

/** Convert stored opacity (0–1) to designer-readable percent. */
function formatDesignerOpacity(value: string): string {
  const trimmed = value.trim();
  if (trimmed.endsWith('%')) return trimmed;
  const n = parseFloat(trimmed);
  if (Number.isNaN(n)) return value;
  if (n <= 1) return `${Math.round(n * 100)}%`;
  return `${n}%`;
}

/** Convert designer percent input back to 0–1 for CSS token storage. */
function designerOpacityToCss(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (trimmed.endsWith('%')) {
    const pct = parseFloat(trimmed.slice(0, -1));
    if (Number.isNaN(pct)) return value;
    const normalized = pct / 100;
    return `${roundDesignerNumber(normalized)}`;
  }
  return trimmed;
}

type DesignerUnit = 'px' | 'ms' | 'percent' | 'raw';

function inferDesignerUnit(token: string): DesignerUnit {
  if (token.includes('-duration-')) return 'ms';
  if (token.includes('-opacity-')) return 'percent';
  if (
    token.includes('-spacing-')
    || token.includes('-border-radius-')
    || token.includes('-border-width-')
    || token.includes('-focus-ring-width')
    || token.includes('-focus-ring-offset')
    || token.includes('-breakpoint-')
  ) {
    return 'px';
  }
  return 'raw';
}

function cssValueToDesignerDisplay(value: string, unit: DesignerUnit): string {
  switch (unit) {
    case 'px':
      return formatDesignerLength(value);
    case 'ms':
      return formatDesignerDuration(value);
    case 'percent':
      return formatDesignerOpacity(value);
    default:
      return value;
  }
}

function designerDisplayToCssValue(value: string, unit: DesignerUnit): string {
  switch (unit) {
    case 'px':
      return designerLengthToCss(value);
    case 'ms':
      return designerDurationToCss(value);
    case 'percent':
      return designerOpacityToCss(value);
    default:
      return value;
  }
}

/** Strip unit suffix for numeric input fields (e.g. "12px" → "12"). */
function designerDisplayToInputValue(display: string, unit: DesignerUnit): string {
  if (unit === 'px') return display.replace(/px$/i, '').replace(/^full$/i, '9999');
  if (unit === 'ms') return display.replace(/ms$/i, '');
  if (unit === 'percent') return display.replace(/%$/, '');
  return display;
}

function designerUnitSuffix(unit: DesignerUnit): string | undefined {
  if (unit === 'px') return 'px';
  if (unit === 'ms') return 'ms';
  if (unit === 'percent') return '%';
  return undefined;
}

function isTypographyLengthField(field: TypographyFieldDef): boolean {
  return (
    field.id === 'size'
    || field.id === 'sizeMin'
    || field.id === 'sizeMax'
    || field.id === 'lineHeight'
  );
}

interface TypographyFieldDef {
  id: string;
  label: string;
  token: string;
  options: readonly string[];
}

interface TypographyStyleDef {
  id: string;
  label: string;
  sample: string;
  familyToken: string;
  fields: TypographyFieldDef[];
}

interface TypographyStyleGroup {
  id: string;
  title: string;
  styles: TypographyStyleDef[];
}

const TYPOGRAPHY_STYLE_GROUPS: TypographyStyleGroup[] = [
  {
    id: 'display',
    title: 'Display',
    styles: [
      {
        id: 'display-hero',
        label: 'Hero',
        sample: 'Northstar Financial',
        familyToken: '--ld-semantic-font-case-study-hero-family',
        fields: [
          { id: 'sizeMin', label: 'Min size', token: '--ld-semantic-font-case-study-hero-size-min', options: FONT_SIZE_OPTIONS },
          { id: 'sizeMax', label: 'Max size', token: '--ld-semantic-font-case-study-hero-size-max', options: FONT_SIZE_OPTIONS },
          { id: 'lineHeight', label: 'Line height', token: '--ld-semantic-font-case-study-hero-line-height', options: LINE_HEIGHT_OPTIONS },
          { id: 'weightDefault', label: 'Weight', token: '--ld-semantic-font-case-study-hero-weight', options: FONT_WEIGHT_OPTIONS },
        ],
      },
      {
        id: 'display-page-title',
        label: 'Page title',
        sample: 'Building a cohesive design system',
        familyToken: '--ld-semantic-font-page-title-family',
        fields: [
          { id: 'sizeMin', label: 'Min size', token: '--ld-semantic-font-page-title-size-min', options: FONT_SIZE_OPTIONS },
          { id: 'sizeMax', label: 'Max size', token: '--ld-semantic-font-page-title-size-max', options: FONT_SIZE_OPTIONS },
          { id: 'lineHeight', label: 'Line height', token: '--ld-semantic-font-page-title-line-height', options: LINE_HEIGHT_OPTIONS },
          { id: 'weightDefault', label: 'Weight', token: '--ld-semantic-font-page-title-weight', options: FONT_WEIGHT_OPTIONS },
        ],
      },
      {
        id: 'display-large',
        label: 'Large',
        sample: 'Hero headline',
        familyToken: '--ld-semantic-font-display-large-family',
        fields: [
          { id: 'size', label: 'Size', token: '--ld-semantic-font-display-large-size-b-s', options: FONT_SIZE_OPTIONS },
          { id: 'lineHeight', label: 'Line height', token: '--ld-semantic-font-display-large-line-height-b-s', options: LINE_HEIGHT_OPTIONS },
          { id: 'weightDefault', label: 'Weight', token: '--ld-semantic-font-display-large-weight-default', options: FONT_WEIGHT_OPTIONS },
          { id: 'weightAlt', label: 'Alt weight', token: '--ld-semantic-font-display-large-weight-alt', options: FONT_WEIGHT_OPTIONS },
        ],
      },
      {
        id: 'display-small',
        label: 'Small',
        sample: 'Section headline',
        familyToken: '--ld-semantic-font-display-small-family',
        fields: [
          { id: 'size', label: 'Size', token: '--ld-semantic-font-display-small-size-b-s', options: FONT_SIZE_OPTIONS },
          { id: 'lineHeight', label: 'Line height', token: '--ld-semantic-font-display-small-line-height-b-s', options: LINE_HEIGHT_OPTIONS },
          { id: 'weightDefault', label: 'Weight', token: '--ld-semantic-font-display-small-weight-default', options: FONT_WEIGHT_OPTIONS },
          { id: 'weightAlt', label: 'Alt weight', token: '--ld-semantic-font-display-small-weight-alt', options: FONT_WEIGHT_OPTIONS },
        ],
      },
    ],
  },
  {
    id: 'heading',
    title: 'Heading',
    styles: [
      {
        id: 'heading-large',
        label: 'Large',
        sample: 'Problem Space',
        familyToken: '--ld-semantic-font-heading-large-family',
        fields: [
          { id: 'size', label: 'Size', token: '--ld-semantic-font-heading-large-size-b-s', options: FONT_SIZE_OPTIONS },
          { id: 'lineHeight', label: 'Line height', token: '--ld-semantic-font-heading-large-line-height-b-s', options: LINE_HEIGHT_OPTIONS },
          { id: 'weightDefault', label: 'Weight', token: '--ld-semantic-font-heading-large-weight-default', options: FONT_WEIGHT_OPTIONS },
          { id: 'weightAlt', label: 'Alt weight', token: '--ld-semantic-font-heading-large-weight-alt', options: FONT_WEIGHT_OPTIONS },
        ],
      },
      {
        id: 'heading-medium',
        label: 'Medium',
        sample: 'Card title',
        familyToken: '--ld-semantic-font-heading-medium-family',
        fields: [
          { id: 'size', label: 'Size', token: '--ld-semantic-font-heading-medium-size-b-s', options: FONT_SIZE_OPTIONS },
          { id: 'lineHeight', label: 'Line height', token: '--ld-semantic-font-heading-medium-line-height-b-s', options: LINE_HEIGHT_OPTIONS },
          { id: 'weightDefault', label: 'Weight', token: '--ld-semantic-font-heading-medium-weight-default', options: FONT_WEIGHT_OPTIONS },
          { id: 'weightAlt', label: 'Alt weight', token: '--ld-semantic-font-heading-medium-weight-alt', options: FONT_WEIGHT_OPTIONS },
        ],
      },
      {
        id: 'heading-small',
        label: 'Small',
        sample: 'Subsection title',
        familyToken: '--ld-semantic-font-heading-small-family',
        fields: [
          { id: 'size', label: 'Size', token: '--ld-semantic-font-heading-small-size-b-s', options: FONT_SIZE_OPTIONS },
          { id: 'lineHeight', label: 'Line height', token: '--ld-semantic-font-heading-small-line-height-b-s', options: LINE_HEIGHT_OPTIONS },
          { id: 'weightDefault', label: 'Weight', token: '--ld-semantic-font-heading-small-weight-default', options: FONT_WEIGHT_OPTIONS },
          { id: 'weightAlt', label: 'Alt weight', token: '--ld-semantic-font-heading-small-weight-alt', options: FONT_WEIGHT_OPTIONS },
        ],
      },
    ],
  },
  {
    id: 'body',
    title: 'Body',
    styles: [
      {
        id: 'body-large',
        label: 'Large',
        sample: 'Intro paragraph for longer reads.',
        familyToken: '--ld-semantic-font-body-large-family',
        fields: [
          { id: 'size', label: 'Size', token: '--ld-semantic-font-body-large-size', options: FONT_SIZE_OPTIONS },
          { id: 'lineHeight', label: 'Line height', token: '--ld-semantic-font-body-large-line-height', options: LINE_HEIGHT_OPTIONS },
          { id: 'weightDefault', label: 'Weight', token: '--ld-semantic-font-body-large-weight-default', options: FONT_WEIGHT_OPTIONS },
          { id: 'weightAlt', label: 'Alt weight', token: '--ld-semantic-font-body-large-weight-alt', options: FONT_WEIGHT_OPTIONS },
        ],
      },
      {
        id: 'body-medium',
        label: 'Medium',
        sample: 'Default body copy.',
        familyToken: '--ld-semantic-font-body-medium-family',
        fields: [
          { id: 'size', label: 'Size', token: '--ld-semantic-font-body-medium-size', options: FONT_SIZE_OPTIONS },
          { id: 'lineHeight', label: 'Line height', token: '--ld-semantic-font-body-medium-line-height', options: LINE_HEIGHT_OPTIONS },
          { id: 'weightDefault', label: 'Weight', token: '--ld-semantic-font-body-medium-weight-default', options: FONT_WEIGHT_OPTIONS },
          { id: 'weightAlt', label: 'Alt weight', token: '--ld-semantic-font-body-medium-weight-alt', options: FONT_WEIGHT_OPTIONS },
        ],
      },
      {
        id: 'body-small',
        label: 'Small',
        sample: 'Dense UI label text.',
        familyToken: '--ld-semantic-font-body-small-family',
        fields: [
          { id: 'size', label: 'Size', token: '--ld-semantic-font-body-small-size', options: FONT_SIZE_OPTIONS },
          { id: 'lineHeight', label: 'Line height', token: '--ld-semantic-font-body-small-line-height', options: LINE_HEIGHT_OPTIONS },
          { id: 'weightDefault', label: 'Weight', token: '--ld-semantic-font-body-small-weight-default', options: FONT_WEIGHT_OPTIONS },
          { id: 'weightAlt', label: 'Alt weight', token: '--ld-semantic-font-body-small-weight-alt', options: FONT_WEIGHT_OPTIONS },
        ],
      },
    ],
  },
  {
    id: 'caption',
    title: 'Caption',
    styles: [
      {
        id: 'caption',
        label: 'Default',
        sample: 'Timestamps and helper text.',
        familyToken: '--ld-semantic-font-caption-family',
        fields: [
          { id: 'size', label: 'Size', token: '--ld-semantic-font-caption-size', options: FONT_SIZE_OPTIONS },
          { id: 'lineHeight', label: 'Line height', token: '--ld-semantic-font-caption-line-height', options: LINE_HEIGHT_OPTIONS },
          { id: 'weightDefault', label: 'Weight', token: '--ld-semantic-font-caption-weight-default', options: FONT_WEIGHT_OPTIONS },
          { id: 'weightAlt', label: 'Alt weight', token: '--ld-semantic-font-caption-weight-alt', options: FONT_WEIGHT_OPTIONS },
        ],
      },
    ],
  },
];

type TypographyCategory = (typeof TYPOGRAPHY_STYLE_GROUPS)[number]['id'];

const TYPOGRAPHY_CATEGORY_ITEMS: { value: TypographyCategory; label: string; icon: string }[] = [
  { value: 'display', label: 'Display', icon: 'Sparky' },
  { value: 'heading', label: 'Heading', icon: 'Write' },
  { value: 'body', label: 'Body', icon: 'Article' },
  { value: 'caption', label: 'Caption', icon: 'Tag' },
];

const TYPOGRAPHY_TOKENS = new Set([
  ...TYPOGRAPHY_STYLE_GROUPS.flatMap((group) =>
    group.styles.flatMap((style) => [
      style.familyToken,
      ...style.fields.map((field) => field.token),
    ]),
  ),
]);

const BODY_FONT_TOKENS = TYPOGRAPHY_STYLE_GROUPS
  .filter((group) => group.id === 'body' || group.id === 'caption')
  .flatMap((group) => group.styles.map((style) => style.familyToken));

const TYPOGRAPHY_SIZE_TOKENS = TYPOGRAPHY_STYLE_GROUPS.flatMap((group) =>
  group.styles.flatMap((style) =>
    style.fields.filter((field) => field.id === 'size').map((field) => field.token),
  ),
);

/* ── helpers ───────────────────────────────────────────────────── */

function clone(t: CustomTheme): CustomTheme {
  return { ...t, seeds: { ...t.seeds }, tokenOverrides: { ...(t.tokenOverrides ?? {}) } };
}

function uniqueName(base = 'My Theme'): string {
  const names = new Set(getCustomThemes().map((t) => t.name));
  if (!names.has(base)) return base;
  let i = 2;
  while (names.has(`${base} ${i}`)) i += 1;
  return `${base} ${i}`;
}

function normalizeSeedHex(hex: string): string {
  return parseHex(hex) ?? hex.trim().toLowerCase();
}

function seedsEqual(a: string, b: string): boolean {
  return normalizeSeedHex(a) === normalizeSeedHex(b);
}

function getBaselineSeeds(
  draft: CustomTheme | null,
  sourceKind: 'built-in' | 'custom' | 'new',
  templateSource: ThemeTemplateSource | null,
): Record<SeedId, string> {
  const genericDefaults = SEEDS.reduce((acc, seed) => {
    acc[seed.id] = seed.default;
    return acc;
  }, {} as Record<SeedId, string>);

  if (!draft) return genericDefaults;

  if (sourceKind === 'custom') {
    const saved = getCustomTheme(draft.id) ?? getCustomTheme(draft.name);
    if (saved) return { ...saved.seeds };
  }

  if (sourceKind === 'built-in' && templateSource?.type === 'built-in') {
    return { ...BUILT_IN_THEME_SEEDS[templateSource.name] };
  }

  if (sourceKind === 'new' && templateSource?.type === 'custom') {
    const saved = getCustomTheme(templateSource.name);
    if (saved) return { ...saved.seeds };
  }

  if (sourceKind === 'new' && templateSource?.type === 'built-in') {
    return { ...BUILT_IN_THEME_SEEDS[templateSource.name] };
  }

  if (isBuiltInPresetTheme(draft.name)) {
    return { ...BUILT_IN_THEME_SEEDS[draft.name] };
  }

  if (isBuiltInPresetTheme(draft.id)) {
    return { ...BUILT_IN_THEME_SEEDS[draft.id] };
  }

  return genericDefaults;
}

function getBaselineTypography(
  draft: CustomTheme | null,
  sourceKind: 'built-in' | 'custom' | 'new',
  templateSource: ThemeTemplateSource | null,
): { headingFont: TextFontKey; bodyFont: TextFontKey; typeScale: TypeScaleKey } {
  const defaults = {
    headingFont: THEME_FONT_CONFIG[DEFAULT_BASE_THEME].textFont,
    bodyFont: THEME_FONT_CONFIG[DEFAULT_BASE_THEME].textFont,
    typeScale: 'default' as TypeScaleKey,
  };
  if (!draft) return defaults;

  let baselineTheme = draft;

  if (sourceKind === 'custom') {
    const saved = getCustomTheme(draft.id) ?? getCustomTheme(draft.name);
    if (saved) baselineTheme = saved;
  } else if (sourceKind === 'built-in' && templateSource?.type === 'built-in') {
    baselineTheme = createThemeFromBuiltIn(templateSource.name);
  } else if (sourceKind === 'new' && templateSource?.type === 'custom') {
    const saved = getCustomTheme(templateSource.name);
    if (saved) baselineTheme = saved;
  } else if (sourceKind === 'new' && templateSource?.type === 'built-in') {
    baselineTheme = createThemeFromBuiltIn(templateSource.name);
  } else if (isBuiltInPresetTheme(draft.name)) {
    baselineTheme = createThemeFromBuiltIn(draft.name as ThemeName);
  } else if (isBuiltInPresetTheme(draft.id)) {
    baselineTheme = createThemeFromBuiltIn(draft.id as ThemeName);
  }

  return {
    headingFont: (() => {
      const overrides = baselineTheme.tokenOverrides ?? {};
      if (HEADING_FONT_TOKENS.some((token) => Object.prototype.hasOwnProperty.call(overrides, token))) {
        return getHeadingFontKey(baselineTheme);
      }
      return getPresetTextFont(
        baselineTheme,
        sourceKind === 'built-in' ? 'built-in' : 'custom',
        templateSource,
      );
    })(),
    bodyFont: getPresetTextFont(
      baselineTheme,
      sourceKind === 'built-in' ? 'built-in' : 'custom',
      templateSource,
    ),
    typeScale: inferTypeScaleKey(baselineTheme),
  };
}

function getFontKeyFromFamily(family: string): TextFontKey | null {
  const normalized = family.trim();
  const exact = TEXT_FONT_OPTIONS.find((option) => option.family === normalized);
  if (exact) return exact.value;

  const firstFont = normalized
    .split(',')[0]
    ?.trim()
    .replace(/^['"]|['"]$/g, '')
    .toLowerCase();
  if (!firstFont) return null;

  const byPrimaryFace = TEXT_FONT_OPTIONS.find((option) => {
    const optionFirst = option.family
      .split(',')[0]
      ?.trim()
      .replace(/^['"]|['"]$/g, '')
      .toLowerCase();
    return optionFirst === firstFont;
  });
  return byPrimaryFace?.value ?? null;
}

function getPresetForTheme(
  theme: CustomTheme,
  sourceKind: 'built-in' | 'custom' | 'new' = 'custom',
  templateSource: ThemeTemplateSource | null = null,
): ThemeName {
  if (theme.builtInPreset) return theme.builtInPreset;
  if (sourceKind === 'built-in' && templateSource?.type === 'built-in') return templateSource.name;
  if (isBuiltInPresetTheme(theme.name)) return theme.name as ThemeName;
  return theme.baseTheme;
}

function getPresetTextFont(
  theme: CustomTheme,
  sourceKind: 'built-in' | 'custom' | 'new' = 'custom',
  templateSource: ThemeTemplateSource | null = null,
): TextFontKey {
  const preset = getPresetForTheme(theme, sourceKind, templateSource);
  return THEME_FONT_CONFIG[preset]?.textFont ?? THEME_FONT_CONFIG[DEFAULT_BASE_THEME].textFont;
}

function getThemeTextFont(theme: CustomTheme): TextFontKey {
  if (theme.textFont) return theme.textFont;
  if (THEME_PRESETS[theme.name]) {
    return THEME_FONT_CONFIG[theme.name as ThemeName]?.textFont ?? THEME_FONT_CONFIG[DEFAULT_BASE_THEME].textFont;
  }
  return THEME_FONT_CONFIG[theme.baseTheme]?.textFont ?? THEME_FONT_CONFIG[DEFAULT_BASE_THEME].textFont;
}

function getFontFamilyForKey(key: TextFontKey): string {
  return TEXT_FONT_OPTIONS.find((option) => option.value === key)?.family
    ?? TEXT_FONT_OPTIONS[0].family;
}

function getHeadingFontKey(theme: CustomTheme): TextFontKey {
  const overrides = theme.tokenOverrides ?? {};
  const headingFamily = HEADING_FONT_TOKENS
    .map((token) => overrides[token])
    .find(Boolean);
  if (headingFamily) {
    const match = getFontKeyFromFamily(headingFamily);
    if (match) return match;
  }
  return getThemeTextFont(theme);
}

function getTypographyStyleFontKey(
  theme: CustomTheme,
  style: TypographyStyleDef,
  overrides: Record<string, string>,
  sourceKind: 'built-in' | 'custom' | 'new',
  templateSource: ThemeTemplateSource | null,
): TextFontKey {
  if (Object.prototype.hasOwnProperty.call(overrides, style.familyToken)) {
    return getFontKeyFromFamily(overrides[style.familyToken]) ?? getPresetTextFont(theme, sourceKind, templateSource);
  }

  if ((HEADING_FONT_TOKENS as readonly string[]).includes(style.familyToken)) {
    const hasHeadingBatchOverride = HEADING_FONT_TOKENS.some((token) =>
      Object.prototype.hasOwnProperty.call(overrides, token),
    );
    if (hasHeadingBatchOverride) return getHeadingFontKey(theme);
  }

  const presetFont = getPresetTextFont(theme, sourceKind, templateSource);
  const activeFont = getThemeTextFont(theme);
  const hasBodyFontOverride =
    activeFont !== presetFont
    || BODY_FONT_TOKENS.some((token) => Object.prototype.hasOwnProperty.call(overrides, token));

  return hasBodyFontOverride ? activeFont : presetFont;
}

function inferTypeScaleKey(
  theme: CustomTheme,
  resolveToken: ThemeTokenResolver = resolveCssVar,
): TypeScaleKey {
  const overrides = theme.tokenOverrides ?? {};
  const hasSizeOverrides = TYPOGRAPHY_SIZE_TOKENS.some((token) =>
    Object.prototype.hasOwnProperty.call(overrides, token),
  );
  if (!hasSizeOverrides) return 'default';

  const anchorToken = '--ld-semantic-font-body-medium-size';
  const basePx = parseLengthToPx(resolveSemanticToken(anchorToken, resolveToken, {}, '1rem'));
  const currentValue = Object.prototype.hasOwnProperty.call(overrides, anchorToken)
    ? overrides[anchorToken]
    : resolveSemanticToken(anchorToken, resolveToken, {}, '1rem');
  const currentPx = parseLengthToPx(currentValue);
  if (!basePx || !currentPx) return 'default';

  const ratio = currentPx / basePx;
  let closest: TypeScaleKey = 'default';
  let minDiff = Infinity;
  TYPE_SCALE_OPTIONS.forEach((option) => {
    const diff = Math.abs(ratio - option.ratio);
    if (diff < minDiff) {
      minDiff = diff;
      closest = option.value;
    }
  });
  return minDiff <= 0.04 ? closest : 'default';
}

function getTypographyFontsToLoad(theme: CustomTheme): TextFontKey[] {
  const fonts = new Set<TextFontKey>([
    getThemeTextFont(theme),
    getHeadingFontKey(theme),
  ]);
  return [...fonts];
}

/** Applies the selected theme's CSS scope + overrides for previews and examples. */


function hexToRgb(hex: string) {
  const c = hex.replace('#', '').slice(0, 6);
  const n = parseInt(c, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const { r, g, b } = hexToRgb(hex);
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: l * 100 };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)))
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generateColorScale(baseHex: string): Array<{ step: number; hex: string }> {
  const { h, s } = hexToHsl(baseHex);
  return SCALE_STEPS.map((step) => ({
    step,
    hex: hslToHex(h, Math.min(s * STEP_S[step], 100), STEP_L[step]),
  }));
}

interface CustomScale {
  id: string;
  name: string;
  baseHex: string;
}




function loadCustomScales(): CustomScale[] {
  try {
    const raw = window.localStorage.getItem(CUSTOM_SCALES_KEY);
    return raw ? (JSON.parse(raw) as CustomScale[]) : [];
  } catch {
    return [];
  }
}



/* ── advanced token groups ─────────────────────────────────────── */
// Fine-grained semantic tokens users can override individually. These win over
// seed-derived values (see resolveOverrides). Only real portfolio tokens listed.

interface TokenDef { token: string; label: string; fallback?: string }
interface TokenGroup { id: string; title: string; tokens: TokenDef[] }
interface AdvancedTokenDef extends TokenDef {
  kind?: 'text' | 'select';
  options?: readonly string[];
  preview?: TokenPreviewKind;
  designUnit?: DesignerUnit;
}

const TOKEN_GROUPS: TokenGroup[] = [
  {
    id: 'secondary',
    title: 'Secondary Action',
    tokens: [
      { token: '--ld-semantic-color-action-fill-secondary', label: 'Fill' },
      { token: '--ld-semantic-color-action-border-secondary', label: 'Border' },
      { token: '--ld-semantic-color-action-text-on-fill-secondary', label: 'Text' },
    ],
  },
  {
    id: 'brand',
    title: 'Brand',
    tokens: [
      { token: '--ld-semantic-color-text-brand', label: 'Brand Text' },
      { token: '--ld-semantic-color-border-brand', label: 'Brand Border' },
      { token: '--ld-semantic-color-border-activated', label: 'Activated Border' },
    ],
  },
  {
    id: 'topNav',
    title: 'Top Navigation',
    tokens: [
      { token: '--ld-semantic-color-topNav-fill', label: 'Fill' },
      { token: '--ld-semantic-color-topNav-text-onFill', label: 'Text' },
    ],
  },
  {
    id: 'bottomNav',
    title: 'Bottom Navigation',
    tokens: [
      { token: '--ld-semantic-color-bottomNav-fill', label: 'Fill' },
      { token: '--ld-semantic-color-bottomNav-text-onFill', label: 'Text' },
      { token: '--ld-semantic-color-bottomNav-text-onFill-activated', label: 'Activated Text' },
    ],
  },
  {
    id: 'pageNav',
    title: 'Page Navigation',
    tokens: [
      { token: '--ld-semantic-color-pageNav-fill', label: 'Fill' },
      { token: '--ld-semantic-color-pageNav-fill-activated', label: 'Activated Fill' },
      { token: '--ld-semantic-color-pageNav-text-onFill', label: 'Text' },
      { token: '--ld-semantic-color-pageNav-indicator-activated', label: 'Indicator' },
    ],
  },
  {
    id: 'primary',
    title: 'Primary Action',
    tokens: [
      { token: '--ld-semantic-color-action-fill-primary', label: 'Fill' },
      { token: '--ld-semantic-color-action-fill-primary-hovered', label: 'Fill · hovered' },
      { token: '--ld-semantic-color-action-fill-primary-pressed', label: 'Fill · pressed' },
      { token: '--ld-semantic-color-action-text-on-fill-primary', label: 'Text on fill' },
    ],
  },
  {
    id: 'surface',
    title: 'Surface & Text',
    tokens: [
      { token: '--ld-semantic-color-surface', label: 'Surface' },
      { token: '--ld-semantic-color-surface-subtle', label: 'Surface · subtle' },
      { token: '--ld-semantic-color-surface-brand', label: 'Surface · brand' },
      { token: '--ld-semantic-color-text', label: 'Text' },
      { token: '--ld-semantic-color-text-subtle', label: 'Text · subtle' },
      { token: '--ld-semantic-color-border', label: 'Border' },
    ],
  },
  {
    id: 'status',
    title: 'Status',
    tokens: [
      { token: '--ld-semantic-color-fill-positive', label: 'Positive fill' },
      { token: '--ld-semantic-color-text-positive', label: 'Positive text' },
      { token: '--ld-semantic-color-fill-negative', label: 'Negative fill' },
      { token: '--ld-semantic-color-text-negative', label: 'Negative text' },
      { token: '--ld-semantic-color-fill-warning', label: 'Warning fill' },
      { token: '--ld-semantic-color-text-warning', label: 'Warning text' },
    ],
  },
  {
    id: 'focus',
    title: 'Focus',
    tokens: [
      { token: '--ld-semantic-color-action-focus-outline', label: 'Ring color' },
      { token: '--ld-semantic-focus-ring-color', label: 'Ring color · semantic' },
      { token: '--ld-semantic-focus-ring-color-inverse', label: 'Ring color · inverse' },
      { token: '--ld-semantic-focus-ring-color-negative', label: 'Ring color · negative' },
    ],
  },
];

const ADVANCED_SPACING_SECTIONS: TokenGroup[] = [
  {
    id: 'spacing-scale',
    title: 'Spacing scale',
    tokens: [
      { token: '--ld-semantic-spacing-25', label: 'Spacing 25', fallback: '0.125rem' },
      { token: '--ld-semantic-spacing-50', label: 'Spacing 50', fallback: '0.25rem' },
      { token: '--ld-semantic-spacing-100', label: 'Spacing 100', fallback: '0.5rem' },
      { token: '--ld-semantic-spacing-150', label: 'Spacing 150', fallback: '0.75rem' },
      { token: '--ld-semantic-spacing-200', label: 'Spacing 200', fallback: '1rem' },
      { token: '--ld-semantic-spacing-250', label: 'Spacing 250', fallback: '1.25rem' },
      { token: '--ld-semantic-spacing-300', label: 'Spacing 300', fallback: '1.5rem' },
      { token: '--ld-semantic-spacing-400', label: 'Spacing 400', fallback: '2rem' },
      { token: '--ld-semantic-spacing-500', label: 'Spacing 500', fallback: '2.5rem' },
      { token: '--ld-semantic-spacing-600', label: 'Spacing 600', fallback: '3rem' },
      { token: '--ld-semantic-spacing-700', label: 'Spacing 700', fallback: '3.5rem' },
      { token: '--ld-semantic-spacing-800', label: 'Spacing 800', fallback: '4rem' },
      { token: '--ld-semantic-spacing-900', label: 'Spacing 900', fallback: '4.5rem' },
      { token: '--ld-semantic-spacing-1000', label: 'Spacing 1000', fallback: '5rem' },
    ],
  },
  {
    id: 'spacing-component',
    title: 'Component spacing',
    tokens: [
      { token: '--ld-semantic-spacing-component-padding-small', label: 'Padding · small', fallback: '0.5rem' },
      { token: '--ld-semantic-spacing-component-padding-medium', label: 'Padding · medium', fallback: '0.75rem' },
      { token: '--ld-semantic-spacing-component-padding-large', label: 'Padding · large', fallback: '1rem' },
      { token: '--ld-semantic-spacing-component-gap-small', label: 'Gap · small', fallback: '0.5rem' },
      { token: '--ld-semantic-spacing-component-gap-medium', label: 'Gap · medium', fallback: '0.75rem' },
      { token: '--ld-semantic-spacing-component-gap-large', label: 'Gap · large', fallback: '1rem' },
    ],
  },
  {
    id: 'spacing-layout',
    title: 'Layout spacing',
    tokens: [
      { token: '--ld-semantic-spacing-layout-margin-small', label: 'Margin · small', fallback: '1rem' },
      { token: '--ld-semantic-spacing-layout-margin-medium', label: 'Margin · medium', fallback: '1.5rem' },
      { token: '--ld-semantic-spacing-layout-margin-large', label: 'Margin · large', fallback: '2rem' },
      { token: '--ld-semantic-spacing-layout-padding-small', label: 'Padding · small', fallback: '1rem' },
      { token: '--ld-semantic-spacing-layout-padding-medium', label: 'Padding · medium', fallback: '1.5rem' },
      { token: '--ld-semantic-spacing-layout-padding-large', label: 'Padding · large', fallback: '2rem' },
      { token: '--ld-semantic-spacing-section-gap-small', label: 'Section gap · small', fallback: '1.5rem' },
      { token: '--ld-semantic-spacing-section-gap-medium', label: 'Section gap · medium', fallback: '2rem' },
      { token: '--ld-semantic-spacing-section-gap-large', label: 'Section gap · large', fallback: '3rem' },
    ],
  },
];

const ADVANCED_RADIUS_TOKENS: AdvancedTokenDef[] = [
  { token: '--ld-semantic-border-radius-small', label: 'Small', fallback: '0.125rem', preview: 'radius' },
  { token: '--ld-semantic-border-radius-medium', label: 'Medium', fallback: '0.25rem', preview: 'radius' },
  { token: '--ld-semantic-border-radius-large', label: 'Large', fallback: '0.5rem', preview: 'radius' },
  { token: '--ld-semantic-border-radius-xlarge', label: 'X large', fallback: '1rem', preview: 'radius' },
  { token: '--ld-semantic-border-radius-xxlarge', label: 'XX large', fallback: '1.5rem', preview: 'radius' },
  { token: '--ld-semantic-border-radius-xxxlarge', label: 'XXX large', fallback: '2rem', preview: 'radius' },
  { token: '--ld-semantic-border-radius-round', label: 'Round', fallback: '62.5rem', preview: 'radius' },
  { token: '--ld-semantic-border-radius-button', label: 'Button', fallback: '62.5rem', preview: 'radius' },
  { token: '--ld-semantic-border-radius-card', label: 'Card', fallback: '0.5rem', preview: 'radius' },
  { token: '--ld-semantic-border-radius-input', label: 'Input', fallback: '0.25rem', preview: 'radius' },
  { token: '--ld-semantic-border-radius-modal', label: 'Modal', fallback: '0.5rem', preview: 'radius' },
  { token: '--ld-semantic-border-radius-popover', label: 'Popover', fallback: '0.5rem', preview: 'radius' },
  { token: '--ld-semantic-border-radius-tag', label: 'Tag', fallback: '0.25rem', preview: 'radius' },
  { token: '--ld-semantic-border-radius-badge', label: 'Badge', fallback: '62.5rem', preview: 'radius' },
];

const ADVANCED_ELEVATION_TOKENS: AdvancedTokenDef[] = [
  {
    token: '--ld-semantic-elevation-100',
    label: 'Elevation 100',
    fallback: '0 0.0625rem 0.125rem 0.0625rem #00000026, 0 -0.0625rem 0.125rem 0 #0000001a',
    preview: 'elevation',
  },
  {
    token: '--ld-semantic-elevation-200',
    label: 'Elevation 200',
    fallback: '0 0.1875rem 0.3125rem 0.125rem #00000026, 0 -0.0625rem 0.1875rem 0 #0000001a',
    preview: 'elevation',
  },
  {
    token: '--ld-semantic-elevation-300',
    label: 'Elevation 300',
    fallback: '0 0.3125rem 0.625rem 0.1875rem #00000026, 0 -0.0625rem 0.25rem 0 #0000001a',
    preview: 'elevation',
  },
];

const ADVANCED_DURATION_SECTIONS: TokenGroup[] = [
  {
    id: 'duration-scale',
    title: 'Duration scale',
    tokens: [
      { token: '--ld-semantic-duration-instant', label: 'Instant', fallback: '0.10s' },
      { token: '--ld-semantic-duration-fast', label: 'Fast', fallback: '0.20s' },
      { token: '--ld-semantic-duration-medium', label: 'Medium', fallback: '0.30s' },
      { token: '--ld-semantic-duration-slow', label: 'Slow', fallback: '0.40s' },
      { token: '--ld-semantic-duration-slower', label: 'Slower', fallback: '0.50s' },
      { token: '--ld-semantic-duration-slowest', label: 'Slowest', fallback: '0.60s' },
      { token: '--ld-semantic-duration-glacial', label: 'Glacial', fallback: '0.70s' },
    ],
  },
  {
    id: 'duration-component',
    title: 'Component durations',
    tokens: [
      { token: '--ld-semantic-duration-button-hover', label: 'Button hover', fallback: '0.20s' },
      { token: '--ld-semantic-duration-button-press', label: 'Button press', fallback: '0.10s' },
      { token: '--ld-semantic-duration-modal-open', label: 'Modal open', fallback: '0.30s' },
      { token: '--ld-semantic-duration-modal-close', label: 'Modal close', fallback: '0.20s' },
      { token: '--ld-semantic-duration-popover-open', label: 'Popover open', fallback: '0.20s' },
      { token: '--ld-semantic-duration-popover-close', label: 'Popover close', fallback: '0.10s' },
      { token: '--ld-semantic-duration-tooltip-show', label: 'Tooltip show', fallback: '0.20s' },
      { token: '--ld-semantic-duration-tooltip-hide', label: 'Tooltip hide', fallback: '0.10s' },
      { token: '--ld-semantic-duration-dropdown-open', label: 'Dropdown open', fallback: '0.20s' },
      { token: '--ld-semantic-duration-dropdown-close', label: 'Dropdown close', fallback: '0.10s' },
      { token: '--ld-semantic-duration-fade-in', label: 'Fade in', fallback: '0.30s' },
      { token: '--ld-semantic-duration-fade-out', label: 'Fade out', fallback: '0.20s' },
      { token: '--ld-semantic-duration-slide-in', label: 'Slide in', fallback: '0.30s' },
      { token: '--ld-semantic-duration-slide-out', label: 'Slide out', fallback: '0.20s' },
    ],
  },
];

const EASING_PRESETS = [
  'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  'cubic-bezier(0.165, 0.84, 0.44, 1)',
  'cubic-bezier(0.77, 0, 0.175, 1)',
  'linear',
] as const;

const ADVANCED_EASING_TOKENS: AdvancedTokenDef[] = [
  { token: '--ld-semantic-timing-ease-in', label: 'Ease in', fallback: EASING_PRESETS[0], kind: 'select', options: EASING_PRESETS },
  { token: '--ld-semantic-timing-ease-out', label: 'Ease out', fallback: EASING_PRESETS[1], kind: 'select', options: EASING_PRESETS },
  { token: '--ld-semantic-timing-ease-in-out', label: 'Ease in-out', fallback: EASING_PRESETS[2], kind: 'select', options: EASING_PRESETS },
  { token: '--ld-semantic-timing-linear', label: 'Linear', fallback: EASING_PRESETS[3], kind: 'select', options: EASING_PRESETS },
  { token: '--ld-semantic-timing-button', label: 'Button', fallback: EASING_PRESETS[1], kind: 'select', options: EASING_PRESETS },
  { token: '--ld-semantic-timing-modal', label: 'Modal', fallback: EASING_PRESETS[2], kind: 'select', options: EASING_PRESETS },
  { token: '--ld-semantic-timing-popover', label: 'Popover', fallback: EASING_PRESETS[1], kind: 'select', options: EASING_PRESETS },
  { token: '--ld-semantic-timing-dropdown', label: 'Dropdown', fallback: EASING_PRESETS[1], kind: 'select', options: EASING_PRESETS },
  { token: '--ld-semantic-timing-fade', label: 'Fade', fallback: EASING_PRESETS[2], kind: 'select', options: EASING_PRESETS },
  { token: '--ld-semantic-timing-slide', label: 'Slide', fallback: EASING_PRESETS[1], kind: 'select', options: EASING_PRESETS },
];

const ADVANCED_BORDER_WIDTH_SECTIONS: TokenGroup[] = [
  {
    id: 'border-width-scale',
    title: 'Border width',
    tokens: [
      { token: '--ld-semantic-border-width-none', label: 'None', fallback: '0' },
      { token: '--ld-semantic-border-width-thin', label: 'Thin', fallback: '0.0625rem' },
      { token: '--ld-semantic-border-width-medium', label: 'Medium', fallback: '0.125rem' },
      { token: '--ld-semantic-border-width-thick', label: 'Thick', fallback: '0.1875rem' },
      { token: '--ld-semantic-border-width-thicker', label: 'Thicker', fallback: '0.25rem' },
    ],
  },
  {
    id: 'focus-ring',
    title: 'Focus ring',
    tokens: [
      { token: '--ld-semantic-focus-ring-width', label: 'Width', fallback: '0.125rem' },
      { token: '--ld-semantic-focus-ring-width-thick', label: 'Width · thick', fallback: '0.25rem' },
      { token: '--ld-semantic-focus-ring-offset', label: 'Offset', fallback: '0.125rem' },
      { token: '--ld-semantic-focus-ring-offset-large', label: 'Offset · large', fallback: '0.25rem' },
    ],
  },
];

const FOCUS_RING_STYLE_OPTIONS = ['solid', 'dashed', 'dotted', 'double'] as const;

const ADVANCED_FOCUS_STYLE_TOKENS: AdvancedTokenDef[] = [
  {
    token: '--ld-semantic-focus-ring-style',
    label: 'Style',
    fallback: 'solid',
    kind: 'select',
    options: FOCUS_RING_STYLE_OPTIONS,
  },
];

const ADVANCED_OPACITY_SECTIONS: TokenGroup[] = [
  {
    id: 'opacity-scale',
    title: 'Opacity scale',
    tokens: [
      { token: '--ld-semantic-opacity-0', label: '0%', fallback: '0' },
      { token: '--ld-semantic-opacity-10', label: '10%', fallback: '0.1' },
      { token: '--ld-semantic-opacity-20', label: '20%', fallback: '0.2' },
      { token: '--ld-semantic-opacity-30', label: '30%', fallback: '0.3' },
      { token: '--ld-semantic-opacity-40', label: '40%', fallback: '0.4' },
      { token: '--ld-semantic-opacity-50', label: '50%', fallback: '0.5' },
      { token: '--ld-semantic-opacity-60', label: '60%', fallback: '0.6' },
      { token: '--ld-semantic-opacity-70', label: '70%', fallback: '0.7' },
      { token: '--ld-semantic-opacity-80', label: '80%', fallback: '0.8' },
      { token: '--ld-semantic-opacity-90', label: '90%', fallback: '0.9' },
      { token: '--ld-semantic-opacity-100', label: '100%', fallback: '1' },
    ],
  },
  {
    id: 'opacity-component',
    title: 'Component opacity',
    tokens: [
      { token: '--ld-semantic-opacity-disabled', label: 'Disabled', fallback: '0.4' },
      { token: '--ld-semantic-opacity-hover-overlay', label: 'Hover overlay', fallback: '0.08' },
      { token: '--ld-semantic-opacity-pressed-overlay', label: 'Pressed overlay', fallback: '0.12' },
      { token: '--ld-semantic-opacity-skeleton', label: 'Skeleton', fallback: '0.12' },
      { token: '--ld-semantic-opacity-backdrop', label: 'Backdrop', fallback: '0.4' },
      { token: '--ld-semantic-opacity-tooltip', label: 'Tooltip', fallback: '0.95' },
    ],
  },
];

const ADVANCED_Z_INDEX_TOKENS: AdvancedTokenDef[] = [
  { token: '--ld-semantic-z-index-base', label: 'Base', fallback: '0' },
  { token: '--ld-semantic-z-index-dropdown', label: 'Dropdown', fallback: '1000' },
  { token: '--ld-semantic-z-index-sticky', label: 'Sticky', fallback: '1020' },
  { token: '--ld-semantic-z-index-fixed', label: 'Fixed', fallback: '1030' },
  { token: '--ld-semantic-z-index-modal-backdrop', label: 'Modal backdrop', fallback: '1040' },
  { token: '--ld-semantic-z-index-modal', label: 'Modal', fallback: '1050' },
  { token: '--ld-semantic-z-index-popover', label: 'Popover', fallback: '1060' },
  { token: '--ld-semantic-z-index-tooltip', label: 'Tooltip', fallback: '1070' },
  { token: '--ld-semantic-z-index-notification', label: 'Notification', fallback: '1080' },
  { token: '--ld-semantic-z-index-overlay', label: 'Overlay', fallback: '1090' },
  { token: '--ld-semantic-z-index-top', label: 'Top', fallback: '1100' },
];

const ADVANCED_BREAKPOINT_TOKENS: AdvancedTokenDef[] = [
  { token: '--ld-semantic-breakpoint-small', label: 'Small · mobile', fallback: '0' },
  { token: '--ld-semantic-breakpoint-medium', label: 'Medium · tablet', fallback: '37.5rem' },
  { token: '--ld-semantic-breakpoint-large', label: 'Large · desktop', fallback: '56.25rem' },
  { token: '--ld-semantic-breakpoint-xlarge', label: 'X large', fallback: '75rem' },
  { token: '--ld-semantic-breakpoint-xxlarge', label: 'XX large', fallback: '120rem' },
];

const COLOR_CATEGORY_ICON = 'Services';

const ADVANCED_CATEGORY_ITEMS: { value: AdvancedCategory; label: string; icon: string }[] = [
  { value: 'colors', label: 'Colors', icon: COLOR_CATEGORY_ICON },
  { value: 'spacing', label: 'Spacing', icon: 'Grid' },
  { value: 'radius', label: 'Radius', icon: 'Card' },
  { value: 'elevation', label: 'Elevation', icon: 'BottomPanelFill' },
  { value: 'duration', label: 'Duration', icon: 'Clock' },
  { value: 'easing', label: 'Easing', icon: 'Flash' },
  { value: 'borderWidth', label: 'Border width', icon: 'ExpanderDiagonal' },
  { value: 'opacity', label: 'Opacity', icon: 'EyeSlash' },
  { value: 'zIndex', label: 'Z-index', icon: 'Expander' },
  { value: 'breakpoints', label: 'Breakpoints', icon: 'Mobile' },
];

const ADVANCED_OVERRIDE_TOKENS = new Set([
  ...TOKEN_GROUPS.flatMap((group) => group.tokens.map((token) => token.token)),
  ...ADVANCED_SPACING_SECTIONS.flatMap((section) => section.tokens.map((token) => token.token)),
  ...ADVANCED_RADIUS_TOKENS.map((token) => token.token),
  ...ADVANCED_ELEVATION_TOKENS.map((token) => token.token),
  ...ADVANCED_DURATION_SECTIONS.flatMap((section) => section.tokens.map((token) => token.token)),
  ...ADVANCED_EASING_TOKENS.map((token) => token.token),
  ...ADVANCED_BORDER_WIDTH_SECTIONS.flatMap((section) => section.tokens.map((token) => token.token)),
  ...ADVANCED_FOCUS_STYLE_TOKENS.map((token) => token.token),
  ...ADVANCED_OPACITY_SECTIONS.flatMap((section) => section.tokens.map((token) => token.token)),
  ...ADVANCED_Z_INDEX_TOKENS.map((token) => token.token),
  ...ADVANCED_BREAKPOINT_TOKENS.map((token) => token.token),
]);

/* ── color seed control ─────────────────────────────────────────── */



function BaseStylesSection({
  draft,
  baselineSeeds,
  baselineTypography,
  primitiveOptions,
  sourceKind,
  templateSource,
  resolveToken,
  onSeedChange,
  onSeedReset,
  onTextFontChange,
  onSetToken,
  onResetToken,
}: {
  draft: CustomTheme;
  baselineSeeds: Record<SeedId, string>;
  baselineTypography: { headingFont: TextFontKey; bodyFont: TextFontKey; typeScale: TypeScaleKey };
  primitiveOptions: PrimitiveColorOption[];
  sourceKind: 'built-in' | 'custom' | 'new';
  templateSource: ThemeTemplateSource | null;
  resolveToken: ThemeTokenResolver;
  onSeedChange: (id: SeedId, hex: string) => void;
  onSeedReset: (id: SeedId) => void;
  onTextFontChange: (textFont: TextFontKey) => void;
  onSetToken: (token: string, value: string) => void;
  onResetToken: (token: string) => void;
}) {
  const applyHeadingFont = (key: TextFontKey) => {
    const family = getFontFamilyForKey(key);
    HEADING_FONT_TOKENS.forEach((token) => onSetToken(token, family));
  };

  const applyBodyFont = (key: TextFontKey) => {
    onTextFontChange(key);
    const family = getFontFamilyForKey(key);
    BODY_FONT_TOKENS.forEach((token) => onSetToken(token, family));
  };

  const applyTypeScale = (scaleKey: TypeScaleKey) => {
    const option = TYPE_SCALE_OPTIONS.find((entry) => entry.value === scaleKey);
    if (!option || option.ratio === 1) {
      TYPOGRAPHY_SIZE_TOKENS.forEach((token) => onResetToken(token));
      return;
    }
    TYPOGRAPHY_STYLE_GROUPS.forEach((group) => {
      group.styles.forEach((style) => {
        style.fields.filter((field) => field.id === 'size').forEach((field) => {
          const base = resolveToken(field.token, field.options[2] ?? field.options[0]);
          const px = parseLengthToPx(base) * option.ratio;
          onSetToken(field.token, formatDesignerPx(px));
        });
      });
    });
  };

  const typeScaleKey = inferTypeScaleKey(draft, resolveToken);
  const presetBodyFont = getPresetTextFont(draft, sourceKind, templateSource);
  const tokenOverrides = draft.tokenOverrides ?? {};
  const hasBodyFontTokenOverrides = BODY_FONT_TOKENS.some((token) =>
    Object.prototype.hasOwnProperty.call(tokenOverrides, token),
  );
  const hasHeadingFontTokenOverrides = HEADING_FONT_TOKENS.some((token) =>
    Object.prototype.hasOwnProperty.call(tokenOverrides, token),
  );
  const activeBodyFont = getThemeTextFont(draft);
  const bodyFontKey = !hasBodyFontTokenOverrides && activeBodyFont === presetBodyFont
    ? presetBodyFont
    : activeBodyFont;
  const headingFontKey = hasHeadingFontTokenOverrides
    ? getHeadingFontKey(draft)
    : bodyFontKey;
  const isHeadingFontOverridden = headingFontKey !== baselineTypography.headingFont;
  const isBodyFontOverridden = bodyFontKey !== baselineTypography.bodyFont;
  const isTypeScaleOverridden = typeScaleKey !== baselineTypography.typeScale;

  const resetHeadingFont = () => {
    HEADING_FONT_TOKENS.forEach((token) => onResetToken(token));
  };

  const resetBodyFont = () => {
    onTextFontChange(baselineTypography.bodyFont);
    BODY_FONT_TOKENS.forEach((token) => onResetToken(token));
  };

  const resetTypeScale = () => {
    applyTypeScale('default');
  };

  const typographySelectStyle: React.CSSProperties = {
    width: TOKEN_PICKER_WIDTH,
    maxWidth: TOKEN_PICKER_WIDTH,
    minWidth: TOKEN_PICKER_WIDTH,
    flexShrink: 0,
  };

  const seedDefaults = React.useMemo(
    () => resolveOverrides({ seeds: draft.seeds, tokenOverrides: {} }),
    [draft.seeds],
  );

  const seedColorRows = SEEDS.flatMap((seed) => (
    seed.id === 'surface'
      ? BASE_SURFACE_TOKENS.map((row) => ({ kind: 'surface-token' as const, row }))
      : [{ kind: 'seed' as const, seed }]
  ));

  const seedOverrideCount = SEEDS.filter(
    (seed) => seed.id !== 'surface' && !seedsEqual(draft.seeds[seed.id], baselineSeeds[seed.id]),
  ).length;
  const surfaceTokenOverrideCount = BASE_SURFACE_TOKENS.filter(
    (row) => getResolvedTokenValue(row.token, tokenOverrides, seedDefaults, '', resolveToken).isOverridden,
  ).length;
  const typographyOverrideCount = [
    isHeadingFontOverridden,
    isBodyFontOverridden,
    isTypeScaleOverridden,
  ].filter(Boolean).length;
  const overrideCount = seedOverrideCount + surfaceTokenOverrideCount + typographyOverrideCount;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ThemeEditorSectionHeader
        title="Base styles"
        badge={overrideCount}
        description="Choose seed colors to update every related component at once."
      />

      <ThemeEditorPanel title="Seed colors">
        {seedColorRows.map((entry, index) => {
          if (entry.kind === 'surface-token') {
            const { row } = entry;
            const { value, isOverridden } = getResolvedTokenValue(row.token, tokenOverrides, seedDefaults, '', resolveToken);
            const { selectOptions, selectedOption } = buildColorSelectOptions(value, row.label, primitiveOptions);
            return (
              <ThemeEditorTokenRow
                key={row.token}
                layout="stacked"
                label={row.label}
                description={row.description}
                components={[...row.components]}
                showDivider={index > 0}
                isOverridden={isOverridden}
                onReset={() => onResetToken(row.token)}
                resetLabel={`Reset ${row.label}`}
                picker={(
                  <PrimitiveTokenPicker
                    label={`${row.label} color`}
                    options={selectOptions}
                    selectedOption={selectedOption}
                    onChange={(option) => onSetToken(row.token, option.hex)}
                  />
                )}
              />
            );
          }

          const { seed } = entry;
          const hex = draft.seeds[seed.id];
          const baselineHex = baselineSeeds[seed.id];
          const { selectOptions, selectedOption } = buildColorSelectOptions(hex, seed.label, primitiveOptions);
          return (
            <ThemeEditorTokenRow
              key={seed.id}
              layout="stacked"
              label={seed.label}
              description={seed.description}
              components={[...seed.components]}
              showDivider={index > 0}
              isOverridden={!seedsEqual(hex, baselineHex)}
              onReset={() => onSeedReset(seed.id)}
              resetLabel={`Reset ${seed.label}`}
              picker={(
                <PrimitiveTokenPicker
                  label={`${seed.label} color`}
                  options={selectOptions}
                  selectedOption={selectedOption}
                  onChange={(option) => onSeedChange(seed.id, option.hex)}
                />
              )}
            />
          );
        })}
      </ThemeEditorPanel>

      <ThemeEditorPanel title="Typography">
        <ThemeEditorTokenRow
          label="Heading font"
          picker={(
            <div style={typographySelectStyle}>
              <Select
                size="xsmall"
                value={headingFontKey}
                onChange={(event) => applyHeadingFont(event.target.value as TextFontKey)}
                selectProps={{ 'aria-label': 'Select heading font' }}
              >
                {TEXT_FONT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} style={{ fontFamily: option.family }}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          )}
          isOverridden={isHeadingFontOverridden}
          onReset={resetHeadingFont}
          resetLabel="Reset heading font"
        />
        <ThemeEditorTokenRow
          label="Body font"
          picker={(
            <div style={typographySelectStyle}>
              <Select
                size="xsmall"
                value={bodyFontKey}
                onChange={(event) => applyBodyFont(event.target.value as TextFontKey)}
                selectProps={{ 'aria-label': 'Select body font' }}
              >
                {TEXT_FONT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} style={{ fontFamily: option.family }}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          )}
          isOverridden={isBodyFontOverridden}
          onReset={resetBodyFont}
          resetLabel="Reset body font"
          showDivider
        />
        <ThemeEditorTokenRow
          label="Type scale"
          picker={(
            <div style={typographySelectStyle}>
              <Select
                size="xsmall"
                value={typeScaleKey}
                onChange={(event) => applyTypeScale(event.target.value as TypeScaleKey)}
                selectProps={{ 'aria-label': 'Select type scale' }}
              >
                {TYPE_SCALE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          )}
          isOverridden={isTypeScaleOverridden}
          onReset={resetTypeScale}
          resetLabel="Reset type scale"
          showDivider
        />
      </ThemeEditorPanel>
    </div>
  );
}

/* ── advanced token override row ───────────────────────────────── */

function formatTokenSlug(token: string): string {
  return token.replace(/^--ld-semantic-/, '');
}

function parseLengthToPx(value: string): number {
  const trimmed = value.trim();
  if (trimmed.endsWith('rem')) return parseFloat(trimmed) * REM_BASE_PX;
  if (trimmed.endsWith('px')) return parseFloat(trimmed);
  return parseFloat(trimmed) || 0;
}

function DesignerValueInput({
  label,
  value,
  unit,
  width = '120px',
  onChange,
}: {
  label: string;
  value: string;
  unit: DesignerUnit;
  width?: string;
  onChange: (cssValue: string) => void;
}) {
  const display = cssValueToDesignerDisplay(value, unit);
  const inputValue = designerDisplayToInputValue(display, unit);
  const suffix = designerUnitSuffix(unit);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
      <TextField
        size="xsmall"
        value={inputValue}
        onChange={(event) => onChange(designerDisplayToCssValue(event.target.value, unit))}
        textFieldProps={{ 'aria-label': `${label} value`, inputMode: unit === 'raw' ? undefined : 'decimal' }}
        UNSAFE_style={{ width, minWidth: width }}
      />
      {suffix && (
        <Caption as="span" color="subtlest" style={{ flexShrink: 0, minWidth: '14px' }}>
          {suffix}
        </Caption>
      )}
    </div>
  );
}

function getResolvedTokenValue(
  token: string,
  overrides: Record<string, string>,
  seedDefaults: Record<string, string>,
  fallback = '',
  resolveToken: ThemeTokenResolver = resolveCssVar,
): { value: string; isOverridden: boolean } {
  const overrideKey = Object.prototype.hasOwnProperty.call(overrides, token)
    ? token
    : mirrorSemanticTokenName(token).find((alias) => Object.prototype.hasOwnProperty.call(overrides, alias));
  const isOverridden = overrideKey != null;
  const value = isOverridden
    ? overrides[overrideKey!]
    : (seedDefaults[token] || resolveToken(token, fallback));
  return { value, isOverridden };
}

function TokenValuePreview({ kind, value }: { kind: TokenPreviewKind; value: string }) {
  if (kind === 'spacing') {
    const width = Math.min(Math.max(parseLengthToPx(value), 0), 72);
    return (
      <div
        aria-hidden="true"
        style={{
          width: `${Math.max(width, 2)}px`,
          height: '8px',
          borderRadius: '2px',
          background: 'var(--ld-semantic-color-border-subtlest, #74767C)',
          flexShrink: 0,
        }}
      />
    );
  }

  if (kind === 'radius') {
    return (
      <div
        aria-hidden="true"
        style={{
          width: '28px',
          height: '28px',
          background: 'var(--ld-semantic-color-surface-subtle, #F2F3F5)',
          border: '1px solid var(--ld-semantic-color-border-subtlest, #C9CDD3)',
          borderRadius: value,
          flexShrink: 0,
        }}
      />
    );
  }

  if (kind === 'borderWidth') {
    const width = Math.max(parseLengthToPx(value), 0);
    return (
      <div
        aria-hidden="true"
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '4px',
          border: `${width || 1}px solid var(--ld-semantic-color-border, #2E2F32)`,
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{
        width: '40px',
        height: '28px',
        borderRadius: '6px',
        background: 'var(--ld-semantic-color-surface, #fff)',
        boxShadow: value,
        flexShrink: 0,
      }}
    />
  );
}

function ValueTokenRow({
  def,
  value,
  isOverridden,
  onChange,
  onReset,
  showDivider,
}: {
  def: AdvancedTokenDef;
  value: string;
  isOverridden: boolean;
  onChange: (value: string) => void;
  onReset: () => void;
  showDivider?: boolean;
}) {
  const designUnit = def.designUnit ?? inferDesignerUnit(def.token);
  const inputWidth = def.preview === 'elevation' ? '200px' : designUnit === 'raw' ? '120px' : '72px';

  return (
    <div className={`theme-editor-row${showDivider ? ' theme-editor-row--divider' : ''}`}>
      <div className="theme-editor-row__main">
        <Body as="div" size="small" weight="alt">{def.label}</Body>
        <Caption as="div" color="subtlest" isMonospace className="theme-editor-row__token-slug">
          {formatTokenSlug(def.token)}
        </Caption>
      </div>
      {def.preview && <TokenValuePreview kind={def.preview} value={value} />}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {def.kind === 'select' && def.options ? (
          <Select
            size="xsmall"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            selectProps={{ 'aria-label': `${def.label} value` }}
            UNSAFE_style={{ width: inputWidth, minWidth: inputWidth }}
          >
            {def.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
        ) : designUnit !== 'raw' ? (
          <DesignerValueInput
            label={def.label}
            value={value}
            unit={designUnit}
            width={inputWidth}
            onChange={onChange}
          />
        ) : (
          <TextField
            size="xsmall"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            textFieldProps={{ 'aria-label': `${def.label} value` }}
            UNSAFE_style={{ width: inputWidth, minWidth: inputWidth }}
          />
        )}
        {isOverridden && (
          <IconButton
            a11yLabel={`Reset ${def.label}`}
            size="xsmall"
            color="default"
            title="Reset to default"
            onClick={onReset}
          >
            <Icon name="Refresh" decorative />
          </IconButton>
        )}
      </div>
    </div>
  );
}

function AdvancedColorPanel({
  sections,
  overrides,
  seedDefaults,
  primitiveOptions,
  resolveToken,
  onSetToken,
  onResetToken,
}: {
  sections: TokenGroup[];
  overrides: Record<string, string>;
  seedDefaults: Record<string, string>;
  primitiveOptions: PrimitiveColorOption[];
  resolveToken: ThemeTokenResolver;
  onSetToken: (token: string, value: string) => void;
  onResetToken: (token: string) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {sections.map((section) => (
        <ThemeEditorPanel key={section.id} title={section.title}>
          {section.tokens.map((def, index) => {
            const { value, isOverridden } = getResolvedTokenValue(
              def.token,
              overrides,
              seedDefaults,
              def.fallback,
              resolveToken,
            );
            const { selectOptions, selectedOption } = buildColorSelectOptions(value, def.label, primitiveOptions);
            return (
              <ThemeEditorTokenRow
                key={def.token}
                label={def.label}
                tokenSlug={formatTokenSlug(def.token)}
                isOverridden={isOverridden}
                onReset={() => onResetToken(def.token)}
                resetLabel={`Reset ${def.label}`}
                showDivider={index > 0}
                picker={(
                  <PrimitiveTokenPicker
                    label={`${def.label} value`}
                    options={selectOptions}
                    selectedOption={selectedOption}
                    onChange={(option) => onSetToken(def.token, option.hex)}
                    displayText={isOverridden ? undefined : 'Pick color'}
                  />
                )}
              />
            );
          })}
        </ThemeEditorPanel>
      ))}
    </div>
  );
}

function AdvancedCategoryNav({
  value,
  onChange,
}: {
  value: AdvancedCategory;
  onChange: (value: AdvancedCategory) => void;
}) {
  return (
    <ThemeEditorCategoryNav
      items={ADVANCED_CATEGORY_ITEMS}
      value={value}
      onChange={onChange}
      ariaLabel="Advanced token category"
    />
  );
}

function AdvancedValueSectionsPanel({
  sections,
  overrides,
  seedDefaults,
  resolveToken,
  onSetToken,
  onResetToken,
  withSpacingPreview,
  withBorderWidthPreview,
}: {
  sections: TokenGroup[];
  overrides: Record<string, string>;
  seedDefaults: Record<string, string>;
  resolveToken: ThemeTokenResolver;
  onSetToken: (token: string, value: string) => void;
  onResetToken: (token: string) => void;
  withSpacingPreview?: boolean;
  withBorderWidthPreview?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {sections.map((section) => (
        <ThemeEditorPanel key={section.id} title={section.title}>
          {section.tokens.map((tokenDef, index) => {
            const def: AdvancedTokenDef = withSpacingPreview
              ? { ...tokenDef, preview: 'spacing' }
              : withBorderWidthPreview
                ? { ...tokenDef, preview: 'borderWidth' }
                : tokenDef;
            const { value, isOverridden } = getResolvedTokenValue(
              def.token,
              overrides,
              seedDefaults,
              def.fallback,
              resolveToken,
            );
            return (
              <ValueTokenRow
                key={def.token}
                def={def}
                value={value}
                isOverridden={isOverridden}
                onChange={(next) => onSetToken(def.token, next)}
                onReset={() => onResetToken(def.token)}
                showDivider={index > 0}
              />
            );
          })}
        </ThemeEditorPanel>
      ))}
    </div>
  );
}

function AdvancedFlatValuePanel({
  tokens,
  overrides,
  seedDefaults,
  resolveToken,
  onSetToken,
  onResetToken,
}: {
  tokens: AdvancedTokenDef[];
  overrides: Record<string, string>;
  seedDefaults: Record<string, string>;
  resolveToken: ThemeTokenResolver;
  onSetToken: (token: string, value: string) => void;
  onResetToken: (token: string) => void;
}) {
  return (
    <ThemeEditorPanel>
      {tokens.map((def, index) => {
        const { value, isOverridden } = getResolvedTokenValue(
          def.token,
          overrides,
          seedDefaults,
          def.fallback,
          resolveToken,
        );
        return (
          <ValueTokenRow
            key={def.token}
            def={def}
            value={value}
            isOverridden={isOverridden}
            onChange={(next) => onSetToken(def.token, next)}
            onReset={() => onResetToken(def.token)}
            showDivider={index > 0}
          />
        );
      })}
    </ThemeEditorPanel>
  );
}

function AdvancedTab({
  theme,
  primitiveOptions,
  resolveToken,
  onSetToken,
  onResetToken,
}: {
  theme: CustomTheme;
  primitiveOptions: PrimitiveColorOption[];
  resolveToken: ThemeTokenResolver;
  onSetToken: (token: string, value: string) => void;
  onResetToken: (token: string) => void;
}) {
  const [category, setCategory] = React.useState<AdvancedCategory>('colors');
  const seedDefaults = React.useMemo(
    () => resolveOverrides({ seeds: theme.seeds, tokenOverrides: {} }),
    [theme.seeds],
  );
  const overrides = theme.tokenOverrides ?? {};
  const overrideCount = Object.keys(overrides).filter((token) => ADVANCED_OVERRIDE_TOKENS.has(token)).length;

  const categoryOverrideCount = React.useMemo(() => {
    const tokensForCategory = (() => {
      switch (category) {
        case 'colors':
          return TOKEN_GROUPS.flatMap((group) => group.tokens.map((t) => t.token));
        case 'spacing':
          return ADVANCED_SPACING_SECTIONS.flatMap((section) => section.tokens.map((t) => t.token));
        case 'radius':
          return ADVANCED_RADIUS_TOKENS.map((t) => t.token);
        case 'elevation':
          return ADVANCED_ELEVATION_TOKENS.map((t) => t.token);
        case 'duration':
          return ADVANCED_DURATION_SECTIONS.flatMap((section) => section.tokens.map((t) => t.token));
        case 'easing':
          return ADVANCED_EASING_TOKENS.map((t) => t.token);
        case 'borderWidth':
          return [
            ...ADVANCED_BORDER_WIDTH_SECTIONS.flatMap((section) => section.tokens.map((t) => t.token)),
            ...ADVANCED_FOCUS_STYLE_TOKENS.map((t) => t.token),
          ];
        case 'opacity':
          return ADVANCED_OPACITY_SECTIONS.flatMap((section) => section.tokens.map((t) => t.token));
        case 'zIndex':
          return ADVANCED_Z_INDEX_TOKENS.map((t) => t.token);
        case 'breakpoints':
          return ADVANCED_BREAKPOINT_TOKENS.map((t) => t.token);
        default:
          return [];
      }
    })();
    return tokensForCategory.filter((token) => Object.prototype.hasOwnProperty.call(overrides, token)).length;
  }, [category, overrides]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ThemeEditorSectionHeader
        title="Advanced token overrides"
        badge={overrideCount}
        description="Fine-tune individual semantic tokens. Overrides take priority over seed-derived values."
      />

      <AdvancedCategoryNav value={category} onChange={setCategory} />

      {categoryOverrideCount > 0 && (
        <Caption as="p" color="subtle" style={{ margin: 0 }}>
          {categoryOverrideCount} override{categoryOverrideCount === 1 ? '' : 's'} in {ADVANCED_CATEGORY_ITEMS.find((item) => item.value === category)?.label.toLowerCase()}
        </Caption>
      )}

      {category === 'colors' && (
        <AdvancedColorPanel
          sections={TOKEN_GROUPS}
          overrides={overrides}
          seedDefaults={seedDefaults}
          primitiveOptions={primitiveOptions}
          resolveToken={resolveToken}
          onSetToken={onSetToken}
          onResetToken={onResetToken}
        />
      )}

      {category === 'spacing' && (
        <AdvancedValueSectionsPanel
          sections={ADVANCED_SPACING_SECTIONS}
          overrides={overrides}
          seedDefaults={seedDefaults}
          resolveToken={resolveToken}
          onSetToken={onSetToken}
          onResetToken={onResetToken}
          withSpacingPreview
        />
      )}

      {category === 'radius' && (
        <AdvancedFlatValuePanel
          tokens={ADVANCED_RADIUS_TOKENS}
          overrides={overrides}
          seedDefaults={seedDefaults}
          resolveToken={resolveToken}
          onSetToken={onSetToken}
          onResetToken={onResetToken}
        />
      )}

      {category === 'elevation' && (
        <AdvancedFlatValuePanel
          tokens={ADVANCED_ELEVATION_TOKENS}
          overrides={overrides}
          seedDefaults={seedDefaults}
          resolveToken={resolveToken}
          onSetToken={onSetToken}
          onResetToken={onResetToken}
        />
      )}

      {category === 'duration' && (
        <AdvancedValueSectionsPanel
          sections={ADVANCED_DURATION_SECTIONS}
          overrides={overrides}
          seedDefaults={seedDefaults}
          resolveToken={resolveToken}
          onSetToken={onSetToken}
          onResetToken={onResetToken}
        />
      )}

      {category === 'easing' && (
        <AdvancedFlatValuePanel
          tokens={ADVANCED_EASING_TOKENS}
          overrides={overrides}
          seedDefaults={seedDefaults}
          resolveToken={resolveToken}
          onSetToken={onSetToken}
          onResetToken={onResetToken}
        />
      )}

      {category === 'borderWidth' && (
        <>
          <AdvancedValueSectionsPanel
            sections={ADVANCED_BORDER_WIDTH_SECTIONS}
            overrides={overrides}
            seedDefaults={seedDefaults}
            resolveToken={resolveToken}
            onSetToken={onSetToken}
            onResetToken={onResetToken}
            withBorderWidthPreview
          />
          <AdvancedFlatValuePanel
            tokens={ADVANCED_FOCUS_STYLE_TOKENS}
            overrides={overrides}
            seedDefaults={seedDefaults}
            resolveToken={resolveToken}
            onSetToken={onSetToken}
            onResetToken={onResetToken}
          />
        </>
      )}

      {category === 'opacity' && (
        <AdvancedValueSectionsPanel
          sections={ADVANCED_OPACITY_SECTIONS}
          overrides={overrides}
          seedDefaults={seedDefaults}
          resolveToken={resolveToken}
          onSetToken={onSetToken}
          onResetToken={onResetToken}
        />
      )}

      {category === 'zIndex' && (
        <AdvancedFlatValuePanel
          tokens={ADVANCED_Z_INDEX_TOKENS}
          overrides={overrides}
          seedDefaults={seedDefaults}
          resolveToken={resolveToken}
          onSetToken={onSetToken}
          onResetToken={onResetToken}
        />
      )}

      {category === 'breakpoints' && (
        <AdvancedFlatValuePanel
          tokens={ADVANCED_BREAKPOINT_TOKENS}
          overrides={overrides}
          seedDefaults={seedDefaults}
          resolveToken={resolveToken}
          onSetToken={onSetToken}
          onResetToken={onResetToken}
        />
      )}
    </div>
  );
}

function TypographyFontRow({
  theme,
  style,
  overrides,
  sourceKind,
  templateSource,
  onChange,
  onReset,
  showDivider,
}: {
  theme: CustomTheme;
  style: TypographyStyleDef;
  overrides: Record<string, string>;
  sourceKind: 'built-in' | 'custom' | 'new';
  templateSource: ThemeTemplateSource | null;
  onChange: (family: string) => void;
  onReset: () => void;
  showDivider?: boolean;
}) {
  const isOverridden = Object.prototype.hasOwnProperty.call(overrides, style.familyToken);
  const selectValue = isOverridden
    ? (getFontKeyFromFamily(overrides[style.familyToken]) ?? getPresetTextFont(theme, sourceKind, templateSource))
    : getTypographyStyleFontKey(theme, style, overrides, sourceKind, templateSource);

  return (
    <ThemeEditorTokenRow
      label="Font"
      tokenSlug={formatTokenSlug(style.familyToken)}
      showDivider={showDivider}
      isOverridden={isOverridden}
      onReset={onReset}
      resetLabel={`Reset ${style.label} font`}
      picker={(
        <div style={{ width: TOKEN_PICKER_WIDTH, maxWidth: TOKEN_PICKER_WIDTH, minWidth: TOKEN_PICKER_WIDTH, flexShrink: 0 }}>
          <Select
            size="xsmall"
            value={selectValue}
            onChange={(event) => onChange(getFontFamilyForKey(event.target.value as TextFontKey))}
            selectProps={{ 'aria-label': `${style.label} font` }}
          >
            {TEXT_FONT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} style={{ fontFamily: option.family }}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      )}
    />
  );
}

function TypographyFieldRow({
  styleLabel,
  field,
  value,
  isOverridden,
  onChange,
  onReset,
  showDivider,
}: {
  styleLabel: string;
  field: TypographyFieldDef;
  value: string;
  isOverridden: boolean;
  onChange: (value: string) => void;
  onReset: () => void;
  showDivider?: boolean;
}) {
  const isLength = isTypographyLengthField(field);

  return (
    <ThemeEditorTokenRow
      label={field.label}
      tokenSlug={formatTokenSlug(field.token)}
      showDivider={showDivider}
      isOverridden={isOverridden}
      onReset={onReset}
      resetLabel={`Reset ${styleLabel} ${field.label.toLowerCase()}`}
      picker={(
        isLength ? (
          <DesignerValueInput
            label={field.label}
            value={value}
            unit="px"
            width="72px"
            onChange={onChange}
          />
        ) : (
          <div style={{ width: TOKEN_PICKER_WIDTH, maxWidth: TOKEN_PICKER_WIDTH, minWidth: TOKEN_PICKER_WIDTH, flexShrink: 0 }}>
            <Select
              size="xsmall"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              selectProps={{ 'aria-label': `${field.label} value` }}
            >
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              {isOverridden && !field.options.includes(value as typeof field.options[number]) && (
                <option value={value}>{value}</option>
              )}
            </Select>
          </div>
        )
      )}
    />
  );
}

function TypographyStylePanel({
  theme,
  style,
  overrides,
  resolveToken,
  sourceKind,
  templateSource,
  onSetToken,
  onResetToken,
}: {
  theme: CustomTheme;
  style: TypographyStyleDef;
  overrides: Record<string, string>;
  resolveToken: ThemeTokenResolver;
  sourceKind: 'built-in' | 'custom' | 'new';
  templateSource: ThemeTemplateSource | null;
  onSetToken: (token: string, value: string) => void;
  onResetToken: (token: string) => void;
}) {
  const styleOverrideCount = [
    ...style.fields.map((field) => field.token),
    style.familyToken,
  ].filter((token) => Object.prototype.hasOwnProperty.call(overrides, token)).length;

  return (
    <ThemeEditorPanel title={style.label} badge={styleOverrideCount}>
      <TypographyFontRow
        theme={theme}
        style={style}
        overrides={overrides}
        sourceKind={sourceKind}
        templateSource={templateSource}
        onChange={(family) => onSetToken(style.familyToken, family)}
        onReset={() => onResetToken(style.familyToken)}
      />
      {style.fields.map((field) => {
        const isOverridden = Object.prototype.hasOwnProperty.call(overrides, field.token);
        const value = isOverridden
          ? overrides[field.token]
          : resolveSemanticToken(field.token, resolveToken, overrides);
        return (
          <TypographyFieldRow
            key={field.token}
            styleLabel={style.label}
            field={field}
            value={value}
            isOverridden={isOverridden}
            onChange={(next) => onSetToken(field.token, next)}
            onReset={() => onResetToken(field.token)}
            showDivider
          />
        );
      })}
    </ThemeEditorPanel>
  );
}

function TypographyStylesSection({
  theme,
  resolveToken,
  sourceKind,
  templateSource,
  onSetToken,
  onResetToken,
}: {
  theme: CustomTheme;
  resolveToken: ThemeTokenResolver;
  sourceKind: 'built-in' | 'custom' | 'new';
  templateSource: ThemeTemplateSource | null;
  onSetToken: (token: string, value: string) => void;
  onResetToken: (token: string) => void;
}) {
  const [category, setCategory] = React.useState<TypographyCategory>('display');
  const overrides = theme.tokenOverrides ?? {};
  const typographyOverrideCount = Object.keys(overrides).filter((token) => TYPOGRAPHY_TOKENS.has(token)).length;
  const activeGroup = TYPOGRAPHY_STYLE_GROUPS.find((group) => group.id === category)!;

  const categoryOverrideCount = activeGroup.styles
    .flatMap((style) => [style.familyToken, ...style.fields.map((field) => field.token)])
    .filter((token) => Object.prototype.hasOwnProperty.call(overrides, token)).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ThemeEditorSectionHeader
        title="Text styles"
        badge={typographyOverrideCount}
        description="Customize type styles for display, heading, body, and caption text. Preview changes live in the Typography preview tab."
      />

      <ThemeEditorCategoryNav
        items={TYPOGRAPHY_CATEGORY_ITEMS}
        value={category}
        onChange={setCategory}
        ariaLabel="Typography category"
      />

      {categoryOverrideCount > 0 && (
        <Caption as="p" color="subtle" style={{ margin: 0 }}>
          {categoryOverrideCount} override{categoryOverrideCount === 1 ? '' : 's'} in {TYPOGRAPHY_CATEGORY_ITEMS.find((item) => item.value === category)?.label.toLowerCase()}
        </Caption>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {activeGroup.styles.map((style) => (
          <TypographyStylePanel
            key={style.id}
            theme={theme}
            style={style}
            overrides={overrides}
            resolveToken={resolveToken}
            sourceKind={sourceKind}
            templateSource={templateSource}
            onSetToken={onSetToken}
            onResetToken={onResetToken}
          />
        ))}
      </div>
    </div>
  );
}

/* ── palette generator ─────────────────────────────────────────── */

function PaletteGenerator({
  theme,
  customThemes,
  onApplySeeds,
}: {
  theme: CustomTheme;
  customThemes: CustomTheme[];
  onApplySeeds: (seeds: CustomTheme['seeds']) => void;
}) {
  const [seedHex, setSeedHex] = React.useState(theme.seeds.primary);
  React.useEffect(() => setSeedHex(theme.seeds.primary), [theme.seeds.primary]);

  const parsed = parseHex(seedHex);
  const generated = React.useMemo<CustomTheme['seeds']>(() => {
    const primary = parsed ?? theme.seeds.primary;
    return {
      primary,
      navigation: darken(primary, 0.06),
      surface: '#ffffff',
      positive: '#2a8703',
      negative: '#ea1100',
      warning: '#ffc220',
    };
  }, [parsed, theme.seeds.primary]);

  const ramp = React.useMemo(() => {
    const primary = parsed ?? theme.seeds.primary;
    return [
      tint(primary, 98),
      tint(primary, 95),
      tint(primary, 90),
      primary,
      darken(primary, 0.08),
      darken(primary, 0.16),
    ];
  }, [parsed, theme.seeds.primary]);

  const paletteCards = [
    ...Object.keys(THEME_PRESETS).map((name) => {
      const preset = createThemeFromBuiltIn(name as ThemeName);
      return {
        id: `built-in-${name}`,
        name,
        description: THEME_PRESETS[name].description,
        seeds: preset.seeds,
      };
    }),
    ...customThemes.map((savedTheme) => ({
      id: `custom-${savedTheme.id}`,
      name: savedTheme.name,
      description: savedTheme.description ?? 'Custom theme',
      seeds: savedTheme.seeds,
    })),
  ];

  return (
    <div className="theme-editor-card theme-editor-card--padded">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <Body as="div" size="small" weight="alt">Palette generator</Body>
          <Caption as="p" color="subtle" style={{ margin: '2px 0 0', lineHeight: 1.4 }}>
            Generate seed colors from one brand color or apply an existing theme palette.
          </Caption>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'end', marginBottom: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Label htmlFor="palette-brand-color">Brand color</Label>
          <TextField
            id="palette-brand-color"
            size="xsmall"
            value={seedHex}
            onChange={(e) => setSeedHex(e.target.value)}
            textFieldProps={{ spellCheck: false, inputMode: 'text' }}
            UNSAFE_style={{
              width: '112px',
              fontFamily: 'monospace',
            }}
            error={Boolean(seedHex && !parsed)}
          />
        </div>
        <div
          style={{
            display: 'flex',
            height: '32px',
            overflow: 'hidden',
            borderRadius: '6px',
            border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
          }}
        >
          {ramp.map((hex) => (
            <div key={hex} title={hex} style={{ width: '34px', background: hex }} />
          ))}
        </div>
        <Button variant="secondary" size="small" disabled={!parsed} onClick={() => onApplySeeds(generated)}>
          Apply generated
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px' }}>
        {paletteCards.map((palette) => (
          <button
            key={palette.id}
            type="button"
            onClick={() => onApplySeeds(palette.seeds)}
            title={palette.description}
            style={{
              border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
              borderRadius: '8px',
              background: 'var(--ld-semantic-color-surface, #fff)',
              padding: '8px',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', height: '18px', overflow: 'hidden', borderRadius: '5px', marginBottom: '6px' }}>
              {(Object.values(palette.seeds) as string[]).map((hex, i) => (
                <span key={`${hex}-${i}`} style={{ flex: 1, background: hex }} />
              ))}
            </div>
            <Caption as="span" weight="alt">{palette.name}</Caption>
          </button>
        ))}
      </div>
    </div>
  );
}


function CreateThemeNameDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (name: string) => void;
}) {
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!open) {
      setName('');
      setError('');
    }
  }, [open]);

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Enter a theme name.');
      return;
    }
    if (THEME_PRESETS[trimmed]) {
      setError('That name matches a built-in theme. Choose a different name.');
      return;
    }
    onCreate(trimmed);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        title="Create new theme"
        actions={
          <>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCreate}>Create</AlertDialogAction>
          </>
        }
      >
        <TextField
          label="Theme name"
          size="small"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (error) setError('');
          }}
          error={error || undefined}
          textFieldProps={{
            placeholder: 'My theme',
            onKeyDown: (event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleCreate();
              }
            },
          }}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}

const THEME_EDITOR_SIDEBAR_MIN = 300;
const THEME_EDITOR_SIDEBAR_MAX = 600;
const THEME_EDITOR_SIDEBAR_DEFAULT = 400;

function pxToPercent(px: number, totalWidth: number) {
  if (totalWidth <= 0) return 0;
  return (px / totalWidth) * 100;
}

function ThemeEditorSplitLayout({
  sidebar,
  preview,
}: {
  sidebar: React.ReactNode;
  preview: React.ReactNode;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [layout, setLayout] = React.useState({
    ready: false,
    defaultSize: pxToPercent(THEME_EDITOR_SIDEBAR_DEFAULT, 1200),
    minSize: pxToPercent(THEME_EDITOR_SIDEBAR_MIN, 1200),
    maxSize: pxToPercent(THEME_EDITOR_SIDEBAR_MAX, 1200),
  });

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = (width: number) => {
      if (width <= 0) return;
      setLayout({
        ready: true,
        defaultSize: pxToPercent(THEME_EDITOR_SIDEBAR_DEFAULT, width),
        minSize: pxToPercent(THEME_EDITOR_SIDEBAR_MIN, width),
        maxSize: pxToPercent(THEME_EDITOR_SIDEBAR_MAX, width),
      });
    };

    update(el.getBoundingClientRect().width);
    const observer = new ResizeObserver(([entry]) => update(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="theme-editor-split-layout"
      style={{ flex: 1, minHeight: 0, minWidth: 0, overflow: 'hidden' }}
    >
      {layout.ready ? (
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={layout.defaultSize}
            minSize={layout.minSize}
            maxSize={layout.maxSize}
            style={{ display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'visible' }}
          >
            {sidebar}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            minSize={100 - layout.maxSize}
            style={{ display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0, overflow: 'hidden' }}
          >
            {preview}
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : null}
    </div>
  );
}

function ThemeActionsMenu({
  onDuplicate,
  onReset,
  onCreateNew,
  resetDisabled,
}: {
  onDuplicate: () => void;
  onReset: () => void;
  onCreateNew: () => void;
  resetDisabled: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const closeAnd = (action: () => void) => () => {
    action();
    setIsOpen(false);
  };

  return (
    <Tooltip content="Duplicate, reset, or create themes" relationship="description" position="left">
      <span style={{ display: 'inline-flex' }}>
        <Menu
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          position="bottomRight"
          triggerRef={triggerRef}
          trigger={
            <IconButton ref={triggerRef} a11yLabel="Theme actions" variant="round" size="medium">
              <MoreIcon />
            </IconButton>
          }
        >
          <MenuSectionTitle variant="bold">Theme actions</MenuSectionTitle>
          <MenuItem onClick={closeAnd(onDuplicate)}>Duplicate theme</MenuItem>
          <MenuItem onClick={closeAnd(onReset)} disabled={resetDisabled}>Reset theme</MenuItem>
          <MenuItem onClick={closeAnd(onCreateNew)}>Create new theme</MenuItem>
        </Menu>
      </span>
    </Tooltip>
  );
}

/* ── theme editor tab panels (inside preview scope) ─────────────── */

function ThemeEditorTabPanels({
  editorTab,
  draft,
  sourceKind,
  templateSource,
  baselineSeeds,
  baselineTypography,
  onSeedChange,
  onSeedReset,
  onTextFontChange,
  onSetToken,
  onResetToken,
}: {
  editorTab: EditorTab;
  draft: CustomTheme;
  sourceKind: 'built-in' | 'custom' | 'new';
  templateSource: ThemeTemplateSource | null;
  baselineSeeds: Record<SeedId, string>;
  baselineTypography: { headingFont: TextFontKey; bodyFont: TextFontKey; typeScale: TypeScaleKey };
  onSeedChange: (id: SeedId, hex: string) => void;
  onSeedReset: (id: SeedId) => void;
  onTextFontChange: (textFont: TextFontKey) => void;
  onSetToken: (token: string, value: string) => void;
  onResetToken: (token: string) => void;
}) {
  const { resolveToken, primitiveOptions } = useThemeEditorDraftTokens();

  if (editorTab === 'baseStyles') {
    return (
      <div
        id="theme-editor-base-styles"
        role="tabpanel"
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <BaseStylesSection
          draft={draft}
          baselineSeeds={baselineSeeds}
          baselineTypography={baselineTypography}
          primitiveOptions={primitiveOptions}
          sourceKind={sourceKind}
          templateSource={templateSource}
          resolveToken={resolveToken}
          onSeedChange={onSeedChange}
          onSeedReset={onSeedReset}
          onTextFontChange={onTextFontChange}
          onSetToken={onSetToken}
          onResetToken={onResetToken}
        />
      </div>
    );
  }

  if (editorTab === 'typography') {
    return (
      <div
        id="theme-editor-typography"
        role="tabpanel"
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <TypographyStylesSection
          theme={draft}
          resolveToken={resolveToken}
          sourceKind={sourceKind}
          templateSource={templateSource}
          onSetToken={onSetToken}
          onResetToken={onResetToken}
        />
      </div>
    );
  }

  return (
    <div
      id="theme-editor-advanced"
      role="tabpanel"
      style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      <AdvancedTab
        theme={draft}
        primitiveOptions={primitiveOptions}
        resolveToken={resolveToken}
        onSetToken={onSetToken}
        onResetToken={onResetToken}
      />
    </div>
  );
}

/* ── page ──────────────────────────────────────────────────────── */

export default function ThemeEditorPage({ embedded = false }: { embedded?: boolean } = {}) {
  const [themes, setThemes] = React.useState<CustomTheme[]>(() => getCustomThemes());
  const [activeName, setActiveName] = React.useState<string>(EDITOR_FALLBACK_THEME);
  const [draft, setDraft] = React.useState<CustomTheme | null>(null);
  const [sourceKind, setSourceKind] = React.useState<'built-in' | 'custom' | 'new'>('built-in');
  const [templateSource, setTemplateSource] = React.useState<ThemeTemplateSource | null>(null);
  const [dirty, setDirty] = React.useState(false);
  const [toast, setToast] = React.useState<{ message: string; success?: boolean } | null>(null);
  const [editorTab, setEditorTab] = React.useState<EditorTab>('baseStyles');
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

  const flash = React.useCallback((msg: string, options?: { success?: boolean }) => {
    setToast({ message: msg, success: options?.success });
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  // keep in sync with external theme-list changes
  React.useEffect(() => {
    const onThemes = () => setThemes(getCustomThemes());
    window.addEventListener(CUSTOM_THEMES_EVENT, onThemes);
    return () => {
      window.removeEventListener(CUSTOM_THEMES_EVENT, onThemes);
    };
  }, []);

  // initial selection: Portfolio built-in or its saved customization.
  React.useEffect(() => {
    const portfolioCustomization = getBuiltInCustomization(EDITOR_FALLBACK_THEME);
    if (portfolioCustomization) {
      setDraft(clone(syncBuiltInPresetFonts(portfolioCustomization)));
      setSourceKind('custom');
      setTemplateSource(null);
    } else {
      setDraft(createThemeFromBuiltIn(EDITOR_FALLBACK_THEME));
      setSourceKind('built-in');
      setTemplateSource({ type: 'built-in', name: EDITOR_FALLBACK_THEME });
    }
    setActiveName(EDITOR_FALLBACK_THEME);
    setDirty(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectSavedTheme = (t: CustomTheme) => {
    setDraft(clone(syncBuiltInPresetFonts(t)));
    setSourceKind('custom');
    setTemplateSource(null);
    setActiveName(t.builtInPreset ?? t.name);
    setDirty(false);
  };

  const loadThemeTemplate = (t: CustomTheme) => {
    setDraft(clone(t));
    setSourceKind('new');
    setTemplateSource({ type: 'custom', name: t.name });
    setDirty(false);
  };

  const selectBuiltInTheme = (name: ThemeName) => {
    const customization = getBuiltInCustomization(name);
    if (customization) {
      selectSavedTheme(customization);
      return;
    }
    setDraft(createThemeFromBuiltIn(name));
    setSourceKind('built-in');
    setTemplateSource({ type: 'built-in', name });
    setActiveName(name);
    setDirty(false);
  };

  const handleCreateNew = (requestedName: string) => {
    const name = isCustomThemeName(requestedName) ? uniqueName(requestedName) : requestedName;
    setDraft(createDraftTheme(name, DEFAULT_BASE_THEME));
    setSourceKind('new');
    setTemplateSource(null);
    setDirty(true);
    setCreateDialogOpen(false);
    flash(`Created "${name}"`);
  };

  const updateSeed = (id: SeedId, hex: string) => {
    setDraft((d) => (d ? { ...d, seeds: { ...d.seeds, [id]: hex } } : d));
    setDirty(true);
  };

  const baselineSeeds = React.useMemo(
    () => getBaselineSeeds(draft, sourceKind, templateSource),
    [draft, sourceKind, templateSource],
  );
  const baselineTypography = React.useMemo(
    () => getBaselineTypography(draft, sourceKind, templateSource),
    [draft, sourceKind, templateSource],
  );

  const resetSeed = (id: SeedId) => {
    const baseline = baselineSeeds[id];
    if (!draft || seedsEqual(draft.seeds[id], baseline)) return;
    setDraft((d) => (d ? { ...d, seeds: { ...d.seeds, [id]: baseline } } : d));
    setDirty(true);
  };

  const updateTextFont = (textFont: TextFontKey) => {
    setDraft((d) => (d ? { ...d, textFont } : d));
    setDirty(true);
  };

  const applyGeneratedSeeds = (seeds: CustomTheme['seeds']) => {
    setDraft((d) => (d ? { ...d, seeds: { ...seeds } } : d));
    setDirty(true);
  };

  const setTokenOverride = (token: string, value: string) => {
    setDraft((d) => (d ? { ...d, tokenOverrides: { ...(d.tokenOverrides ?? {}), [token]: value } } : d));
    setDirty(true);
  };

  const resetTokenOverride = (token: string) => {
    setDraft((d) => {
      if (!d) return d;
      const next = { ...(d.tokenOverrides ?? {}) };
      delete next[token];
      return { ...d, tokenOverrides: next };
    });
    setDirty(true);
  };

  const applyCampaignColors = React.useCallback(() => {
    const palette = getActiveCampaignPalette();
    if (!palette || !draft) return false;
    const overrides = campaignColorsToTokenOverrides(palette.colors);
    setDraft((current) => (current ? {
      ...current,
      tokenOverrides: { ...(current.tokenOverrides ?? {}), ...overrides },
    } : current));
    setDirty(true);
    flash(`Applied "${palette.name}" campaign colors`, { success: true });
    return true;
  }, [draft, flash]);

  const handlePromptSend = React.useCallback((prompt: string) => {
    if (!promptRequestsCampaignColors(prompt)) return false;
    return applyCampaignColors();
  }, [applyCampaignColors]);

  React.useEffect(() => {
    const onApplyCampaignColors = () => {
      applyCampaignColors();
    };
    window.addEventListener(APPLY_CAMPAIGN_COLORS_EVENT, onApplyCampaignColors);
    return () => window.removeEventListener(APPLY_CAMPAIGN_COLORS_EVENT, onApplyCampaignColors);
  }, [applyCampaignColors]);

  const matchedSavedTheme = draft ? findSavedTheme(draft, sourceKind) : undefined;
  const isSaved = Boolean(matchedSavedTheme);

  const persistDraft = (): CustomTheme | null => {
    if (!draft) return null;

    const builtInPreset =
      draft.builtInPreset
      ?? (sourceKind === 'built-in' && templateSource?.type === 'built-in' ? templateSource.name : undefined)
      ?? (sourceKind === 'built-in' && isBuiltInPresetTheme(draft.name) ? draft.name : undefined);

    if (builtInPreset) {
      const id = builtInCustomizationId(builtInPreset);
      const saved = saveCustomTheme({
        ...draft,
        id,
        name: builtInPreset,
        builtInPreset,
        baseTheme: builtInPreset,
        textFont: getThemeTextFont(draft),
      });
      setThemes(getCustomThemes());
      setDraft(clone(saved));
      setSourceKind('custom');
      setTemplateSource(null);
      setDirty(false);
      return saved;
    }

    const requestedName = draft.name.trim() || uniqueName();
    let name = THEME_PRESETS[requestedName]
      ? uniqueName(`${requestedName} Custom`)
      : requestedName;
    // Dropdown selections load as templates — never overwrite an existing saved theme on save.
    if (!isSaved && isCustomThemeName(name)) {
      name = uniqueName(name);
    }
    // Renaming a saved theme: drop the old record so ids stay in sync with names.
    if (isSaved && draft.id !== name) deleteCustomTheme(draft.id);
    const saved = saveCustomTheme({
      ...draft,
      id: name,
      name,
      baseTheme: draft.baseTheme ?? DEFAULT_BASE_THEME,
      textFont: getThemeTextFont(draft),
    });
    setThemes(getCustomThemes());
    setDraft(clone(saved));
    setSourceKind('custom');
    setTemplateSource(null);
    setDirty(false);
    return saved;
  };

  const handleSave = () => {
    const saved = persistDraft();
    if (!saved) return;
    setActiveName(saved.builtInPreset ?? saved.name);
    flash('Theme was saved', { success: true });
  };

  const handleReset = () => {
    if (!draft) return;

    if (draft.builtInPreset) {
      const saved = getBuiltInCustomization(draft.builtInPreset);
      if (dirty && saved) {
        setDraft(clone(saved));
        setDirty(false);
        flash('Choices reset');
        return;
      }
      if (!dirty && saved) {
        deleteCustomThemeRecord(saved);
        removeCustomTheme(saved.name);
        if (saved.name !== saved.id) removeCustomTheme(saved.id);
        selectBuiltInTheme(draft.builtInPreset);
        flash('Restored default');
        return;
      }
    }

    if (sourceKind === 'custom') {
      const saved = getCustomTheme(draft.id) ?? getCustomTheme(draft.name);
      if (saved && !saved.builtInPreset) {
        setDraft(clone(saved));
        setDirty(false);
        flash('Choices reset');
        return;
      }
    }

    if (sourceKind === 'built-in' && templateSource?.type === 'built-in') {
      setDraft(createThemeFromBuiltIn(templateSource.name));
      setDirty(false);
      flash('Choices reset');
      return;
    }

    if (sourceKind === 'new' && templateSource?.type === 'custom') {
      const saved = getCustomTheme(templateSource.name);
      if (saved) {
        setDraft(clone(saved));
        setDirty(false);
        flash('Choices reset');
        return;
      }
    }

    if (sourceKind === 'built-in' && THEME_PRESETS[draft.id]) {
      setDraft(createThemeFromBuiltIn(draft.id as ThemeName));
      setDirty(false);
      flash('Choices reset');
      return;
    }

    const resetDraft = createDraftTheme(draft.name.trim() || uniqueName(), DEFAULT_BASE_THEME);
    setDraft({ ...resetDraft, name: draft.name });
    setDirty(false);
    flash('Choices reset');
  };

  const handleDuplicate = () => {
    if (!draft) return;
    const name = uniqueName(`${draft.name} copy`);
    const copy = saveCustomTheme({
      ...clone(draft),
      id: name,
      name,
      builtInPreset: undefined,
      baseTheme: draft.builtInPreset ?? draft.baseTheme ?? DEFAULT_BASE_THEME,
      createdAt: 0,
      updatedAt: 0,
    });
    setThemes(getCustomThemes());
    selectSavedTheme(copy);
    flash('Duplicated');
  };

  const handleDelete = (saved: CustomTheme) => {
    if (!window.confirm(`Delete "${saved.name}"? This cannot be undone.`)) return;

    const matchedDraftTheme = draft ? findSavedTheme(draft, sourceKind) : undefined;
    const deletedMatchesActiveEditor =
      activeName === saved.name
      || activeName === saved.id;
    const deletedMatchesDraft = Boolean(
      matchedDraftTheme
        ? matchedDraftTheme.id === saved.id
          || matchedDraftTheme.name === saved.name
          || matchedDraftTheme.id === saved.name
          || matchedDraftTheme.name === saved.id
        : draft
          && (
            draft.id === saved.id
            || draft.name === saved.name
            || draft.id === saved.name
            || draft.name === saved.id
          ),
    );

    if (!deleteCustomThemeRecord(saved)) {
      flash('Theme could not be deleted');
      return;
    }

    if (deletedMatchesActiveEditor) {
      setActiveName(EDITOR_FALLBACK_THEME);
    }

    removeCustomTheme(saved.name);
    if (saved.name !== saved.id) {
      removeCustomTheme(saved.id);
    }

    setThemes(getCustomThemes());

    if (deletedMatchesDraft || deletedMatchesActiveEditor) {
      selectBuiltInTheme(EDITOR_FALLBACK_THEME);
      setDirty(false);
    }

    flash(`Deleted "${saved.name}"`);
  };

  const builtInNames = Object.keys(THEME_PRESETS);
  const handleThemeSelection = (value: string) => {
    const { kind, id } = parseThemeOptionValue(value);
    const customThemes = getCustomThemes();

    if (kind === 'custom') {
      const custom = customThemes.find((theme) => theme.id === id) ?? getCustomTheme(id);
      if (custom) {
        selectSavedTheme(custom);
        return;
      }
    }

    if (kind === 'builtin' && THEME_PRESETS[id]) {
      selectBuiltInTheme(id as ThemeName);
      return;
    }

    if (kind === 'draft') {
      const custom = customThemes.find((theme) => theme.id === id || theme.name === id);
      if (custom) {
        selectSavedTheme(custom);
        return;
      }
    }
  };

  // Load fonts for the selected theme so previews match the real theme.
  React.useEffect(() => {
    if (!draft) return;
    const { dataLdTheme } = getPreviewThemeContext(draft);
    loadThemeFonts(dataLdTheme);
    loadTextFont(getPresetTextFont(draft, sourceKind, templateSource));
    getTypographyFontsToLoad(draft).forEach((font) => loadTextFont(font));
  }, [draft, sourceKind, templateSource]);

  const isTemplate = sourceKind !== 'custom';

  return (
    <A11yAnnouncementProvider>
    <div
      style={{
        background: '#fff',
        ...(embedded
          ? { minHeight: '640px', height: 'calc(100vh - 180px)' }
          : { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }),
      }}
    >
      <div
        style={{
          minWidth: 0,
          padding: '28px 32px',
          overflow: 'hidden',
          ...(embedded
            ? { height: '100%', display: 'flex', flexDirection: 'column' }
            : { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }),
        }}
      >
        <div style={{ marginBottom: '20px', flexShrink: 0 }}>
          <Heading as="h1" size="large">Theme Editor</Heading>
        </div>

        {!draft ? (
          <div
            style={{
              border: '1px dashed var(--ld-semantic-color-separator, #e3e4e5)',
              borderRadius: '12px',
              padding: '48px',
              textAlign: 'center',
              background: '#fff',
            }}
          >
            <Heading as="h2" size="small">Create your first theme</Heading>
            <Body as="p" color="subtle">
              Start from the base theme and adjust the colors to make it yours.
            </Body>
            <div style={{ marginTop: '16px', display: 'inline-flex', gap: '8px' }}>
              <Button variant="primary" size="medium" onClick={() => setCreateDialogOpen(true)}>Create new theme</Button>
            </div>
          </div>
        ) : (
          <div
            style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'visible' }}
          >
            <ThemeEditorSplitLayout
              sidebar={(
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                minWidth: 0,
                minHeight: 0,
                height: '100%',
                overflow: 'visible',
              }}
            >
              {/* Theme meta + actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0, overflow: 'visible', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {sourceKind === 'built-in' && (
                    <Caption as="span" color="subtlest">Built-in theme · save to keep changes</Caption>
                  )}
                  {draft.builtInPreset && sourceKind === 'custom' && !dirty && (
                    <Caption as="span" color="subtlest">Customized {draft.builtInPreset} · reset restores default</Caption>
                  )}
                  {isTemplate && sourceKind === 'new' && templateSource && (
                    <Caption as="span" color="subtlest">Save creates a new theme</Caption>
                  )}
                  {toast?.success ? (
                    <Alert variant="success">{toast.message}</Alert>
                  ) : toast ? (
                    <Caption as="span" color="subtle">{toast.message}</Caption>
                  ) : null}
                  {dirty && !toast && <Caption as="span" color="subtlest">Unsaved changes</Caption>}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1, minWidth: '160px' }}>
                    <ExistingThemePicker
                      draft={draft}
                      sourceKind={sourceKind}
                      builtInNames={builtInNames}
                      onSelect={handleThemeSelection}
                      onDeleteTheme={handleDelete}
                    />
                  </div>
                  <div className="theme-editor-sidebar-actions" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <Button
                      variant="primary"
                      size="medium"
                      disabled={!dirty}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <ThemeActionsMenu
                      onDuplicate={handleDuplicate}
                      onReset={handleReset}
                      onCreateNew={() => setCreateDialogOpen(true)}
                      resetDisabled={!dirty}
                    />
                  </div>
                </div>
              </div>

              <div style={{ overflowX: 'auto', minWidth: 0, WebkitOverflowScrolling: 'touch', flexShrink: 0 }}>
                <TabNavigation
                  aria-label="Theme editor section"
                  pattern="tablist"
                  UNSAFE_style={{ width: 'max-content', minWidth: '100%' }}
                >
                  <TabNavigationItem
                    isCurrent={editorTab === 'baseStyles'}
                    leadingIcon={<Icon name={COLOR_CATEGORY_ICON} decorative />}
                    onClick={() => setEditorTab('baseStyles')}
                  >
                    Base Styles
                  </TabNavigationItem>
                  <TabNavigationItem
                    isCurrent={editorTab === 'typography'}
                    leadingIcon={<Icon name="Write" decorative />}
                    onClick={() => setEditorTab('typography')}
                  >
                    Text styles
                  </TabNavigationItem>
                  <TabNavigationItem
                    isCurrent={editorTab === 'advanced'}
                    leadingIcon={<Icon name="Sliders" decorative />}
                    onClick={() => setEditorTab('advanced')}
                  >
                    Advanced
                  </TabNavigationItem>
                </TabNavigation>
              </div>

              <ThemeEditorDraftTokenProvider draft={draft}>
                <ThemeEditorScrollRegion
                  a11yLabel="Theme editor controls"
                  rootStyle={{ flex: 1, minHeight: 0 }}
                >
                  <ThemeEditorTabPanels
                    editorTab={editorTab}
                    draft={draft}
                    sourceKind={sourceKind}
                    templateSource={templateSource}
                    baselineSeeds={baselineSeeds}
                    baselineTypography={baselineTypography}
                    onSeedChange={updateSeed}
                    onSeedReset={resetSeed}
                    onTextFontChange={updateTextFont}
                    onSetToken={setTokenOverride}
                    onResetToken={resetTokenOverride}
                  />
                </ThemeEditorScrollRegion>
              </ThemeEditorDraftTokenProvider>
            </div>
              )}
              preview={(
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                minHeight: 0,
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <Caption as="p" color="subtlest" style={{ flexShrink: 0 }}>Live preview</Caption>
              <div style={{ marginTop: '8px', flex: 1, minHeight: 0 }}>
                <PreviewPanel theme={draft} fillHeight editorTab={editorTab} onPromptSend={handlePromptSend} />
              </div>
            </div>
              )}
            />
          </div>
        )}

      </div>
      <CreateThemeNameDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreate={handleCreateNew}
      />
    </div>
    </A11yAnnouncementProvider>
  );
}
