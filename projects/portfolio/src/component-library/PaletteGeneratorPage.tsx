import * as React from 'react';
import {
  Alert,
  Body,
  Button,
  Caption,
  FilterChip,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  MenuSectionTitle,
  MoreIcon,
  CloseIcon,
  ScrollArea,
  SearchBar,
  SegmentedControl,
  SideNavigation,
  SideNavigationItem,
  TextField,
} from '@/app/components';
import './PaletteGeneratorPage.css';
import {
  CAMPAIGN_PALETTES_EVENT,
  ACTIVE_CAMPAIGN_PALETTE_EVENT,
  duplicateCampaignPalette,
  deleteCampaignPalette,
  getActiveCampaignPaletteId,
  getCampaignPalette,
  getCampaignPalettes,
  renameCampaignPalette,
  saveCampaignPalette,
  setActiveCampaignPaletteId,
  uniqueCampaignPaletteName,
  type CampaignPalette,
} from '@/app/components/utils/campaignPalettes';
import {
  CUSTOM_THEMES_EVENT,
  DEFAULT_BASE_THEME,
  type CustomTheme,
  builtInCustomizationId,
  createDraftTheme,
  createThemeFromBuiltIn,
  deleteCustomTheme,
  getBuiltInCustomization,
  getCustomTheme,
  getCustomThemes,
  getPreviewThemeContext,
  resolvePresetThemeName,
  saveCustomTheme,
} from '@/app/components/utils/customThemes';
import {
  removeCustomTheme,
  getThemePrimaryColor,
  THEME_PRESETS,
} from '@/app/components/utils/themeManager';
import {isDark} from '@/app/components/utils/colorUtils';
import type {ThemeName} from '@/app/components/utils/Theming';
import {ThemePreviewScope, useThemePreviewResolve} from '@/component-library/theme-editor/ThemePreviewScope';
import {loadThemeFonts} from '@/app/components/utils/Theming';
import {SCALE_STEPS, getScaleFamiliesForTheme, getScaleStepsForFamily} from '@/component-library/theme-editor/colorTokens';

const BRAND_THEME_NAMES: ThemeName[] = [
  'Walmart',
  "Sam's Club",
  "Sam's Club Maverick",
  'Cashi MX',
  'Bodega',
  'WM',
  'Oportun',
  'Portfolio',
  'Xense',
  'Carbon',
];
const HUE_COLUMNS = [
  'gray',
  'red',
  'orange',
  'spark',
  'yellow',
  'green',
  'teal',
  'cyan',
  'blue',
  'purple',
  'pink',
];
const LIGHTNESS_ROWS = [
  {id: 'very-light', label: 'Very light', step: 10},
  {id: 'light', label: 'Light', step: 30},
  {id: 'medium', label: 'Medium', step: 60},
  {id: 'strong', label: 'Strong', step: 90},
  {id: 'dark', label: 'Dark', step: 120},
  {id: 'very-dark', label: 'Very dark', step: 150},
  {id: 'blackish', label: 'Blackish', step: 170},
] as const;

type NavSelection =
  | {kind: 'brand'; id: string}
  | {kind: 'campaign'; id: string};

const STEP_L: Record<number, number> = {
  5: 97, 10: 95, 20: 89, 30: 83, 40: 77, 50: 71, 60: 65, 70: 59, 80: 53,
  90: 47, 100: 41, 110: 36, 120: 31, 130: 27, 140: 23, 150: 19, 160: 15, 170: 11, 180: 7,
};
const STEP_S: Record<number, number> = {
  5: 0.12, 10: 0.20, 20: 0.35, 30: 0.52, 40: 0.65, 50: 0.77, 60: 0.87,
  70: 0.94, 80: 0.98, 90: 1, 100: 1, 110: 0.98, 120: 0.96,
  130: 0.93, 140: 0.90, 150: 0.87, 160: 0.84, 170: 0.80, 180: 0.76,
};

function hexToRgb(hex: string) {
  const c = hex.replace('#', '').slice(0, 6);
  const n = parseInt(c, 16);
  return {r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255};
}

function hexToHsl(hex: string): {h: number; s: number; l: number} {
  const {r, g, b} = hexToRgb(hex);
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return {h: 0, s: 0, l: l * 100};
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return {h: h * 360, s: s * 100, l: l * 100};
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

function normaliseHex(raw: string): string | null {
  const s = raw.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{6}$/.test(s)) return `#${s.toLowerCase()}`;
  if (/^[0-9a-fA-F]{3}$/.test(s)) return `#${s.split('').map((c) => c + c).join('').toLowerCase()}`;
  return null;
}

interface ScaleToken {
  step: number;
  hex: string;
}

function generateColorScale(baseHex: string): ScaleToken[] {
  const {h, s} = hexToHsl(baseHex);
  return SCALE_STEPS.map((step) => ({
    step,
    hex: hslToHex(h, Math.min(s * STEP_S[step], 100), STEP_L[step]),
  }));
}

function resolveCssColor(cssVarName: string, fallback = '#E3E4E5'): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim();
  return raw || fallback;
}

function primitiveToken(family: string, step: number): string {
  return `--ld-primitive-color-${family}-${step}`;
}

function getScaleBaseScoped(
  resolveToken: (cssVarName: string, fallback?: string) => string,
  family: string,
  overrides?: Record<string, string>,
): string {
  const token = primitiveToken(family, 100);
  return overrides?.[token] ?? resolveToken(token, '#E3E4E5');
}

function basesFromDraftOverrides(draft: CustomTheme): Record<string, string> {
  const themeKey = (resolvePresetThemeName(draft) ?? draft.baseTheme ?? draft.name) as ThemeName;
  const families = getScaleFamiliesForTheme(themeKey);
  return families.reduce((acc, family) => {
    const token = primitiveToken(family, 100);
    const override = draft.tokenOverrides?.[token];
    if (override) acc[family] = override;
    return acc;
  }, {} as Record<string, string>);
}

function uniqueThemeName(base = 'New Palette'): string {
  const names = new Set([
    ...Object.keys(THEME_PRESETS),
    ...getCustomThemes().map((theme) => theme.name),
  ]);
  if (!names.has(base)) return base;
  let i = 2;
  while (names.has(`${base} ${i}`)) i += 1;
  return `${base} ${i}`;
}

function buildScaleOverrides(family: string, baseHex: string): Record<string, string> {
  const steps = new Set(getScaleStepsForFamily(family));
  return Object.fromEntries(
    generateColorScale(baseHex)
      .filter((token) => steps.has(token.step))
      .map((token) => [primitiveToken(family, token.step), token.hex]),
  );
}

function draftForBrandSelection(selection: string): CustomTheme {
  if (getCustomTheme(selection) || THEME_PRESETS[selection as ThemeName]) {
    return draftFromSelection(selection);
  }
  return createDraftTheme(selection, DEFAULT_BASE_THEME);
}

function draftFromSelection(selection: string): CustomTheme {
  if (THEME_PRESETS[selection as ThemeName]) {
    const builtInCustomization = getBuiltInCustomization(selection as ThemeName);
    if (builtInCustomization) {
      return {
        ...builtInCustomization,
        seeds: {...builtInCustomization.seeds},
        tokenOverrides: {...(builtInCustomization.tokenOverrides ?? {})},
      };
    }
  }
  const custom = getCustomTheme(selection);
  if (custom) return {
    ...custom,
    seeds: {...custom.seeds},
    tokenOverrides: {...(custom.tokenOverrides ?? {})},
  };
  if (THEME_PRESETS[selection]) return createThemeFromBuiltIn(selection as ThemeName, selection);
  return createThemeFromBuiltIn(DEFAULT_BASE_THEME);
}

function resolveBrandThemeSaveTarget(
  draft: CustomTheme,
  activeTheme: string,
): {id: string; name: string; baseTheme: ThemeName; builtInPreset?: ThemeName} {
  const preset =
    draft.builtInPreset
    ?? (THEME_PRESETS[activeTheme as ThemeName] ? (activeTheme as ThemeName) : undefined);

  if (preset) {
    return {
      id: builtInCustomizationId(preset),
      name: preset,
      baseTheme: preset,
      builtInPreset: preset,
    };
  }

  const existing = getCustomTheme(activeTheme);
  if (existing) {
    return {
      id: existing.id,
      name: existing.name,
      baseTheme: existing.baseTheme ?? DEFAULT_BASE_THEME,
    };
  }

  const name = activeTheme.trim() || uniqueThemeName('New Palette');
  return {id: name, name, baseTheme: DEFAULT_BASE_THEME};
}

function Swatch({hex, label, onCopy}: {hex: string; label: string; onCopy: (hex: string) => void}) {
  return (
    <button
      type="button"
      className="palette-generator__primitive-swatch"
      onClick={() => onCopy(hex)}
      title={`${label}: ${hex} — click to copy`}
      style={{background: hex}}
    />
  );
}

function SwatchMark({color}: {color: string}) {
  const fallback = resolveCssColor('--ld-semantic-color-separator', '#e6e6e8');
  return (
    <span
      aria-hidden
      className="palette-generator__swatch-mark"
      style={{background: color || fallback}}
    />
  );
}

function SwatchMarkGrid({colors}: {colors: string[]}) {
  const fallback = resolveCssColor('--ld-semantic-color-separator', '#e6e6e8');
  const cells = colors.slice(0, 4);
  return (
    <span aria-hidden className="palette-generator__swatch-grid">
      {cells.map((color, index) => (
        <span
          key={`${color}-${index}`}
          className="palette-generator__swatch-grid-cell"
          style={{background: color || fallback}}
        />
      ))}
    </span>
  );
}

function ScaleRowActions({
  family,
  isDirty,
  onSave,
  onReset,
}: {
  family: string;
  isDirty: boolean;
  onSave: () => void;
  onReset: () => void;
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className="palette-generator__scale-row-actions">
      <Menu
        isOpen={menuOpen}
        onOpen={() => setMenuOpen(true)}
        onClose={() => setMenuOpen(false)}
        position="bottomRight"
        triggerRef={triggerRef}
        trigger={(
          <IconButton
            ref={triggerRef}
            a11yLabel={`Actions for ${family} scale`}
            color="secondary"
            size="small"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setMenuOpen(true);
            }}
          >
            <MoreIcon decorative />
          </IconButton>
        )}
      >
        <MenuSectionTitle variant="bold">Scale actions</MenuSectionTitle>
        <MenuItem onClick={() => { onSave(); setMenuOpen(false); }}>
          Save scale
        </MenuItem>
        <MenuItem
          disabled={!isDirty}
          onClick={() => { onReset(); setMenuOpen(false); }}
        >
          Reset to theme
        </MenuItem>
      </Menu>
    </div>
  );
}

function ThemeNavItem({
  label,
  swatchColor,
  swatchColors,
  isCurrent,
  onSelect,
  onRename,
  onDuplicate,
  onUpdatePalette,
  onDelete,
  canRename,
  menuVariant,
  compact = false,
}: {
  label: string;
  swatchColor?: string;
  swatchColors?: string[];
  isCurrent: boolean;
  onSelect: () => void;
  onRename: (nextName: string) => void;
  onDuplicate: () => void;
  onUpdatePalette?: () => void;
  onDelete?: () => void;
  canRename: boolean;
  menuVariant: 'brand' | 'campaign';
  compact?: boolean;
}) {
  const [editing, setEditing] = React.useState(false);
  const [draftName, setDraftName] = React.useState(label);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setDraftName(label);
  }, [label]);

  React.useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commitRename = () => {
    const trimmed = draftName.trim();
    setEditing(false);
    if (trimmed && trimmed !== label) onRename(trimmed);
    else setDraftName(label);
  };

  return (
    <div
      className={`palette-generator__nav-item-row${compact ? ' palette-generator__nav-item-row--compact' : ''}`}
      onDoubleClick={() => {
        if (canRename && !compact) setEditing(true);
      }}
    >
      <div style={{flex: 1, minWidth: 0}}>
        {editing ? (
          <TextField
            label="Theme name"
            size="small"
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            textFieldProps={{
              ref: inputRef,
              onBlur: commitRename,
              onKeyDown: (event) => {
                if (event.key === 'Enter') commitRename();
                if (event.key === 'Escape') {
                  setDraftName(label);
                  setEditing(false);
                }
              },
            }}
          />
        ) : (
          <SideNavigationItem
            href="#"
            isCurrent={isCurrent}
            leading={
              swatchColors && swatchColors.length > 1
                ? <SwatchMarkGrid colors={swatchColors} />
                : <SwatchMark color={swatchColor ?? swatchColors?.[0] ?? resolveCssColor('--ld-semantic-color-separator', '#e6e6e8')} />
            }
            onClick={(event) => {
              event.preventDefault();
              onSelect();
            }}
            title={compact ? label : undefined}
          >
            {!compact ? label : null}
          </SideNavigationItem>
        )}
      </div>
      {!editing && !compact && (
        <Menu
          isOpen={menuOpen}
          onOpen={() => setMenuOpen(true)}
          onClose={() => setMenuOpen(false)}
          position="bottomRight"
          triggerRef={triggerRef}
          trigger={(
            <IconButton
              ref={triggerRef}
              a11yLabel={`Actions for ${label}`}
              size="xsmall"
              color="default"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setMenuOpen(true);
              }}
            >
              <MoreIcon decorative />
            </IconButton>
          )}
        >
          <MenuSectionTitle variant="bold">{menuVariant === 'brand' ? 'Theme actions' : 'Palette actions'}</MenuSectionTitle>
          {canRename && (
            <MenuItem onClick={() => { setEditing(true); setMenuOpen(false); }}>
              {menuVariant === 'brand' ? 'Rename theme' : 'Rename palette'}
            </MenuItem>
          )}
          <MenuItem onClick={() => { onDuplicate(); setMenuOpen(false); }}>
            {menuVariant === 'brand' ? 'Duplicate theme' : 'Duplicate palette'}
          </MenuItem>
          {onUpdatePalette && (
            <MenuItem onClick={() => { onUpdatePalette(); setMenuOpen(false); }}>
              Update palette
            </MenuItem>
          )}
          {onDelete && (
            <MenuItem onClick={() => { onDelete(); setMenuOpen(false); }}>
              Delete
            </MenuItem>
          )}
        </Menu>
      )}
    </div>
  );
}

function ThemesSidebar({
  selection,
  customThemeNames,
  campaignPalettes,
  collapsed,
  onToggleCollapsed,
  onSelectBrand,
  onSelectCampaign,
  onNewBrand,
  onNewCampaign,
  onRenameBrand,
  onRenameCampaign,
  onDuplicateBrand,
  onDuplicateCampaign,
  onUpdateCampaignPalette,
  onDeleteBrand,
  onDeleteCampaign,
}: {
  selection: NavSelection;
  customThemeNames: string[];
  campaignPalettes: CampaignPalette[];
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onSelectBrand: (id: string) => void;
  onSelectCampaign: (id: string) => void;
  onNewBrand: () => void;
  onNewCampaign: () => void;
  onRenameBrand: (id: string, name: string) => void;
  onRenameCampaign: (id: string, name: string) => void;
  onDuplicateBrand: (id: string) => void;
  onDuplicateCampaign: (id: string) => void;
  onUpdateCampaignPalette: (id: string) => void;
  onDeleteBrand: (id: string) => void;
  onDeleteCampaign: (id: string) => void;
}) {
  const [newMenuOpen, setNewMenuOpen] = React.useState(false);
  const newMenuTriggerRef = React.useRef<HTMLButtonElement>(null);

  const brandThemes = [
    ...BRAND_THEME_NAMES.filter((name) => THEME_PRESETS[name]),
    ...Object.keys(THEME_PRESETS).filter((name) => !BRAND_THEME_NAMES.includes(name as ThemeName)),
    ...customThemeNames,
  ];

  const brandPrimaryColor = (id: string) => getThemePrimaryColor(id);

  return (
    <aside className={`palette-generator__sidebar${collapsed ? ' palette-generator__sidebar--collapsed' : ''}`}>
      <div className="palette-generator__sidebar-header">
        <IconButton
          a11yLabel={collapsed ? 'Expand themes sidebar' : 'Collapse themes sidebar'}
          color="tertiary"
          size="small"
          onClick={onToggleCollapsed}
        >
          <Icon name={collapsed ? 'LeftPanel' : 'LeftPanelFill'} decorative />
        </IconButton>
        {!collapsed && <Heading as="h2" size="small" UNSAFE_className="palette-generator__sidebar-title">Themes</Heading>}
        {!collapsed && (
          <Menu
            isOpen={newMenuOpen}
            onOpen={() => setNewMenuOpen(true)}
            onClose={() => setNewMenuOpen(false)}
            position="bottomRight"
            triggerRef={newMenuTriggerRef}
            trigger={(
              <Button ref={newMenuTriggerRef} variant="secondary" size="small">
                + New
              </Button>
            )}
          >
            <MenuItem onClick={() => { onNewBrand(); setNewMenuOpen(false); }}>
              New brand theme
            </MenuItem>
            <MenuItem onClick={() => { onNewCampaign(); setNewMenuOpen(false); }}>
              New campaign palette
            </MenuItem>
          </Menu>
        )}
      </div>
      <ScrollArea a11yLabel="Themes and palettes" className="palette-generator__sidebar-scroll">
        <SideNavigation aria-label="Theme and palette navigation">
          {!collapsed && (
            <Caption as="p" color="subtlest" UNSAFE_className="palette-generator__nav-section-label">
              Brand
            </Caption>
          )}
          {brandThemes.map((name) => (
            <ThemeNavItem
              key={`brand-${name}`}
              label={name}
              swatchColor={brandPrimaryColor(name)}
              isCurrent={selection.kind === 'brand' && selection.id === name}
              canRename={Boolean(getCustomTheme(name)) && !THEME_PRESETS[name]}
              menuVariant="brand"
              compact={collapsed}
              onSelect={() => onSelectBrand(name)}
              onRename={(nextName) => onRenameBrand(name, nextName)}
              onDuplicate={() => onDuplicateBrand(name)}
              onDelete={getCustomTheme(name) && !THEME_PRESETS[name] ? () => onDeleteBrand(name) : undefined}
            />
          ))}
          {!collapsed && (
            <Caption as="p" color="subtlest" UNSAFE_className="palette-generator__nav-section-label">
              Campaign palettes
            </Caption>
          )}
          {campaignPalettes.map((palette) => (
            <ThemeNavItem
              key={`campaign-${palette.id}`}
              label={palette.name}
              swatchColors={palette.colors}
              isCurrent={selection.kind === 'campaign' && selection.id === palette.id}
              canRename={!palette.isBuiltIn}
              menuVariant="campaign"
              compact={collapsed}
              onSelect={() => onSelectCampaign(palette.id)}
              onRename={(nextName) => onRenameCampaign(palette.id, nextName)}
              onDuplicate={() => onDuplicateCampaign(palette.id)}
              onUpdatePalette={() => onUpdateCampaignPalette(palette.id)}
              onDelete={palette.isBuiltIn ? undefined : () => onDeleteCampaign(palette.id)}
            />
          ))}
        </SideNavigation>
      </ScrollArea>
      {!collapsed && (
        <Caption as="p" color="subtlest" UNSAFE_className="palette-generator__nav-footer">
          Fork any theme or palette to start customizing. Double-click a name to rename.
        </Caption>
      )}
    </aside>
  );
}

function CampaignColorPicker({
  palette,
  onSave,
  onColorsChange,
  flash,
}: {
  palette: CampaignPalette;
  onSave: (next: CampaignPalette) => void;
  onColorsChange?: (colors: string[]) => void;
  flash: (message: string) => void;
}) {
  const [query, setQuery] = React.useState('');
  const [surface, setSurface] = React.useState<'white' | 'gray' | 'dark'>('white');
  const [hueFilter, setHueFilter] = React.useState<string | null>(null);
  const [lightnessFilter, setLightnessFilter] = React.useState<string>('all');
  const [draftName, setDraftName] = React.useState(palette.name);
  const [selectedColors, setSelectedColors] = React.useState<string[]>(palette.colors);
  const [customHex, setCustomHex] = React.useState('');

  React.useEffect(() => {
    setDraftName(palette.name);
    setSelectedColors(palette.colors);
    onColorsChange?.(palette.colors);
  }, [palette.id, palette.name, palette.colors, onColorsChange]);

  const gridCells = React.useMemo(
    () => LIGHTNESS_ROWS.flatMap((row) =>
      HUE_COLUMNS.map((family) => ({
        id: `${family}-${row.step}`,
        family,
        row,
        hex: resolveCssColor(primitiveToken(family, row.step)),
        label: `${family}-${row.step}`,
      })),
    ),
    [],
  );

  const visibleCells = gridCells.filter((cell) => {
    if (hueFilter && cell.family !== hueFilter) return false;
    if (lightnessFilter !== 'all' && cell.row.id !== lightnessFilter) return false;
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    return cell.label.includes(q) || cell.hex.includes(q);
  });

  const hueFocusRows = hueFilter
    ? LIGHTNESS_ROWS.map((row) => ({
        row,
        cells: visibleCells.filter((cell) => cell.row.id === row.id),
      })).filter((group) => group.cells.length > 0)
    : [];

  const toggleColor = (hex: string) => {
    setSelectedColors((prev) => {
      const next = prev.includes(hex)
        ? prev.filter((color) => color !== hex)
        : prev.length >= 10
          ? (flash('Campaign palettes support up to 10 colors'), prev)
          : [...prev, hex];
      onColorsChange?.(next);
      return next;
    });
  };

  const addCustomHex = () => {
    const normalized = normaliseHex(customHex);
    if (!normalized) {
      flash('Enter a valid hex value');
      return;
    }
    toggleColor(normalized);
    setCustomHex('');
  };

  const savePalette = () => {
    const name = draftName.trim() || uniqueCampaignPaletteName();
    onSave({
      ...palette,
      id: palette.isBuiltIn ? uniqueCampaignPaletteName(name) : palette.id,
      name,
      colors: selectedColors,
      isBuiltIn: false,
    });
  };

  const surfaceClassName = `palette-generator__color-grid-surface palette-generator__color-grid-surface--${surface}`;

  return (
    <div className="palette-generator__campaign-layout">
      <div className="palette-generator__campaign-main">
        <div className="palette-generator__campaign-header">
          <Heading as="h2" size="small">Search colors</Heading>
          <Body as="p" color="subtle" size="small">
            Choose colors for campaign surfaces, charts, and accents. Save the palette to use it in Theme Editor previews and prompts.
          </Body>
        </div>
        <div className="palette-generator__campaign-controls">
          <div className="palette-generator__campaign-search">
            <SearchBar
              variant="inline"
              size="small"
              value={query}
              onChange={setQuery}
              onClear={() => setQuery('')}
              placeholder="name or hex, e.g. blue-100"
            />
          </div>
          <SegmentedControl
            aria-label="Preview surface"
            value={surface}
            onChange={(value) => setSurface(value as 'white' | 'gray' | 'dark')}
            items={[
              {value: 'white', label: 'White'},
              {value: 'gray', label: 'Gray'},
              {value: 'dark', label: 'Dark'},
            ]}
          />
          <Caption as="span" color="subtlest" className="palette-generator__campaign-stats">
            {visibleCells.length} colors · {HUE_COLUMNS.length} hues
          </Caption>
        </div>
        <div className="palette-generator__campaign-filters">
          <Caption as="span" color="subtlest">All hues</Caption>
          <FilterChip selected={!hueFilter} onSelectedChange={() => setHueFilter(null)}>All</FilterChip>
          {HUE_COLUMNS.map((family) => (
            <button
              key={family}
              type="button"
              title={family}
              className={`palette-generator__hue-dot${hueFilter === family ? ' palette-generator__hue-dot--selected' : ''}`}
              onClick={() => setHueFilter((current) => (current === family ? null : family))}
              style={{background: resolveCssColor(primitiveToken(family, 90))}}
            />
          ))}
        </div>
        <div className="palette-generator__campaign-filters">
          <Caption as="span" color="subtlest">Lightness</Caption>
          {[{id: 'all', label: 'All'}, ...LIGHTNESS_ROWS.map((row) => ({id: row.id, label: row.label}))].map((item) => (
            <FilterChip
              key={item.id}
              selected={lightnessFilter === item.id}
              onSelectedChange={() => setLightnessFilter(item.id)}
            >
              {item.label}
            </FilterChip>
          ))}
        </div>
        <ScrollArea a11yLabel="Color grid" className="palette-generator__color-grid-scroll">
          <div className={surfaceClassName}>
            {hueFilter ? (
              <div className="palette-generator__hue-focus">
                <Heading as="h3" size="small" UNSAFE_className="palette-generator__hue-focus-title">
                  {hueFilter}
                </Heading>
                {hueFocusRows.map(({row, cells}) => (
                  <div key={row.id} className="palette-generator__hue-focus-row">
                    <Caption as="span" color="subtlest" className="palette-generator__grid-label--row">
                      {row.label}
                    </Caption>
                    <div style={{display: 'grid', gap: 8}}>
                      {cells.map((cell) => {
                        const selected = selectedColors.includes(cell.hex);
                        return (
                          <button
                            key={cell.id}
                            type="button"
                            title={`${cell.label}: ${cell.hex}`}
                            className={`palette-generator__hue-bar${selected ? ' palette-generator__hue-bar--selected' : ''}`}
                            onClick={() => toggleColor(cell.hex)}
                            style={{background: cell.hex}}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="palette-generator__full-grid">
                <div />
                {HUE_COLUMNS.map((family) => (
                  <Caption key={family} as="span" color="subtlest" className="palette-generator__grid-label">
                    {family}
                  </Caption>
                ))}
                {LIGHTNESS_ROWS.map((row) => (
                  <React.Fragment key={row.id}>
                    <Caption as="span" color="subtlest" className="palette-generator__grid-label--row">
                      {row.label}
                    </Caption>
                    {HUE_COLUMNS.map((family) => {
                      const cell = gridCells.find((item) => item.family === family && item.row.id === row.id);
                      if (!cell || !visibleCells.some((item) => item.id === cell.id)) {
                        return <div key={`${family}-${row.id}`} />;
                      }
                      const selected = selectedColors.includes(cell.hex);
                      return (
                        <button
                          key={cell.id}
                          type="button"
                          title={`${cell.label}: ${cell.hex}`}
                          className={`palette-generator__color-cell${selected ? ' palette-generator__color-cell--selected' : ''}`}
                          onClick={() => toggleColor(cell.hex)}
                          style={{background: cell.hex}}
                        />
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      <aside className="palette-generator__palettes-panel">
        <div className="palette-generator__palettes-header">
          <Heading as="h3" size="small">Palettes</Heading>
          <Button
            variant="secondary"
            size="small"
            onClick={() => onSave({
              id: uniqueCampaignPaletteName(),
              name: uniqueCampaignPaletteName(),
              colors: [],
              createdAt: Date.now(),
              updatedAt: Date.now(),
            })}
          >
            + New
          </Button>
        </div>
        <div className="palette-generator__palettes-editor">
          <TextField
            label="Palette name"
            size="small"
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
          />
          <div className="palette-generator__selected-colors">
            {selectedColors.map((hex) => (
              <div key={hex} className="palette-generator__selected-swatch">
                <span className="palette-generator__selected-swatch-color" style={{background: hex}} />
                <IconButton
                  a11yLabel={`Remove ${hex}`}
                  size="xsmall"
                  color={isDark(hex) ? 'white' : 'default'}
                  UNSAFE_className="palette-generator__selected-swatch-remove"
                  onClick={() => {
                    setSelectedColors((prev) => {
                      const next = prev.filter((color) => color !== hex);
                      onColorsChange?.(next);
                      return next;
                    });
                  }}
                >
                  <CloseIcon decorative />
                </IconButton>
              </div>
            ))}
          </div>
          <div className="palette-generator__hex-row">
            <TextField
              label="Custom hex"
              size="small"
              value={customHex}
              onChange={(event) => setCustomHex(event.target.value)}
              UNSAFE_className="palette-generator__hex-field"
              textFieldProps={{
                placeholder: '#rrggbb',
                spellCheck: false,
              }}
            />
            <Button variant="secondary" size="small" onClick={addCustomHex}>Add</Button>
          </div>
          <Button variant="primary" size="small" onClick={savePalette}>Save palette</Button>
        </div>
      </aside>
    </div>
  );
}

function BrandScaleGridContent({
  previewTheme,
  draftBases,
  dirtyFamilies,
  activeTheme,
  onUpdateFamilyBase,
  onSaveFamily,
  onResetFamily,
  onCopyHex,
}: {
  previewTheme: CustomTheme;
  draftBases: Record<string, string>;
  dirtyFamilies: Set<string>;
  activeTheme: string;
  onUpdateFamilyBase: (family: string, raw: string) => void;
  onSaveFamily: (family: string) => void;
  onResetFamily: (family: string) => void;
  onCopyHex: (hex: string) => void;
}) {
  const resolveToken = useThemePreviewResolve();
  const scaleTheme = (resolvePresetThemeName(previewTheme) ?? previewTheme.baseTheme ?? activeTheme) as ThemeName;
  const scaleFamilies = getScaleFamiliesForTheme(scaleTheme);

  return (
    <div className="palette-generator__scale-grid">
      <div className="palette-generator__scale-header">
        <Caption as="span" color="subtlest">Family</Caption>
        <Caption as="span" color="subtlest">Scale steps</Caption>
        <span />
      </div>
      {scaleFamilies.map((family) => {
        const steps = getScaleStepsForFamily(family);
        const base = draftBases[family]
          ?? getScaleBaseScoped(resolveToken, family, previewTheme.tokenOverrides);
        const normalized = normaliseHex(base);
        const tokens = dirtyFamilies.has(family) && normalized
          ? generateColorScale(normalized).filter((token) => steps.includes(token.step))
          : steps.map((step) => ({
              step,
              hex: resolveToken(primitiveToken(family, step), '#E3E4E5'),
            }));
        return (
          <div
            key={`${family}-${activeTheme}`}
            className={`palette-generator__scale-row${dirtyFamilies.has(family) ? ' palette-generator__scale-row--dirty' : ''}`}
            style={{'--scale-step-count': steps.length} as React.CSSProperties}
          >
            <span className="palette-generator__scale-family">
              <Body as="span" size="small" weight="alt" UNSAFE_className="palette-generator__scale-family-name">
                {family}
              </Body>
              <label
                title={`Pick ${family} seed color`}
                className="palette-generator__seed-picker"
                style={{background: normalized ?? resolveToken('--ld-semantic-color-separator', '#e6e6e8')}}
              >
                <input
                  type="color"
                  value={normalized ?? '#000000'}
                  onChange={(e) => onUpdateFamilyBase(family, e.target.value)}
                  aria-label={`${family} seed color`}
                />
              </label>
              <TextField
                label={`${family} seed hex`}
                size="xsmall"
                value={base}
                onChange={(event) => onUpdateFamilyBase(family, event.target.value)}
                error={base && !normalized ? 'Invalid hex' : undefined}
                textFieldProps={{
                  spellCheck: false,
                  'aria-label': `${family} seed hex`,
                }}
              />
            </span>
            <div className="palette-generator__scale-swatches">
              {steps.map((step) => {
                const token = tokens.find((item) => item.step === step);
                const hex = token?.hex ?? resolveToken(primitiveToken(family, step), '#E3E4E5');
                return (
                  <div key={step} className="palette-generator__scale-swatch-cell">
                    <Swatch
                      hex={hex}
                      label={primitiveToken(family, step)}
                      onCopy={onCopyHex}
                    />
                    <Caption as="span" color="subtlest" UNSAFE_className="palette-generator__scale-step-label">
                      {step}
                    </Caption>
                  </div>
                );
              })}
            </div>
            <ScaleRowActions
              family={family}
              isDirty={dirtyFamilies.has(family)}
              onSave={() => onSaveFamily(family)}
              onReset={() => onResetFamily(family)}
            />
          </div>
        );
      })}
    </div>
  );
}

function BrandScaleGrid({
  previewTheme,
  draftBases,
  dirtyFamilies,
  activeTheme,
  onUpdateFamilyBase,
  onSaveFamily,
  onResetFamily,
  onCopyHex,
}: {
  previewTheme: CustomTheme;
  draftBases: Record<string, string>;
  dirtyFamilies: Set<string>;
  activeTheme: string;
  onUpdateFamilyBase: (family: string, raw: string) => void;
  onSaveFamily: (family: string) => void;
  onResetFamily: (family: string) => void;
  onCopyHex: (hex: string) => void;
}) {
  return (
    <ThemePreviewScope theme={previewTheme}>
      <BrandScaleGridContent
        previewTheme={previewTheme}
        draftBases={draftBases}
        dirtyFamilies={dirtyFamilies}
        activeTheme={activeTheme}
        onUpdateFamilyBase={onUpdateFamilyBase}
        onSaveFamily={onSaveFamily}
        onResetFamily={onResetFamily}
        onCopyHex={onCopyHex}
      />
    </ThemePreviewScope>
  );
}

export default function PaletteGeneratorPage() {
  const [selection, setSelection] = React.useState<NavSelection>(() => {
    const activeCampaignId = getActiveCampaignPaletteId();
    if (activeCampaignId && getCampaignPalette(activeCampaignId)) {
      return {kind: 'campaign', id: activeCampaignId};
    }
    return {kind: 'brand', id: DEFAULT_BASE_THEME};
  });
  const [activeTheme, setActiveTheme] = React.useState(() =>
    selection.kind === 'brand' ? selection.id : DEFAULT_BASE_THEME,
  );
  const [customThemeNames, setCustomThemeNames] = React.useState<string[]>(() =>
    getCustomThemes().filter((theme) => !theme.builtInPreset).map((theme) => theme.name),
  );
  const [campaignPalettes, setCampaignPalettes] = React.useState(() => getCampaignPalettes());
  const [draftBases, setDraftBases] = React.useState<Record<string, string>>({});
  const [dirtyFamilies, setDirtyFamilies] = React.useState<Set<string>>(() => new Set());
  const [campaignDraftColors, setCampaignDraftColors] = React.useState<string[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);

  const flash = React.useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 1600);
  }, []);

  const copyHex = React.useCallback(
    (hex: string) => {
      navigator.clipboard.writeText(hex).then(() => flash(`Copied ${hex}`));
    },
    [flash],
  );

  React.useEffect(() => {
    const onThemesChange = () => {
      setCustomThemeNames(getCustomThemes().filter((theme) => !theme.builtInPreset).map((theme) => theme.name));
    };
    const onCampaignPalettesChange = () => setCampaignPalettes(getCampaignPalettes());
    const onActiveCampaignChange = (event: Event) => {
      const id = (event as CustomEvent).detail?.id;
      if (typeof id === 'string' && getCampaignPalette(id)) {
        setSelection({kind: 'campaign', id});
      }
    };

    window.addEventListener(CUSTOM_THEMES_EVENT, onThemesChange);
    window.addEventListener(CAMPAIGN_PALETTES_EVENT, onCampaignPalettesChange);
    window.addEventListener(ACTIVE_CAMPAIGN_PALETTE_EVENT, onActiveCampaignChange);
    return () => {
      window.removeEventListener(CUSTOM_THEMES_EVENT, onThemesChange);
      window.removeEventListener(CAMPAIGN_PALETTES_EVENT, onCampaignPalettesChange);
      window.removeEventListener(ACTIVE_CAMPAIGN_PALETTE_EVENT, onActiveCampaignChange);
    };
  }, []);

  React.useEffect(() => {
    if (selection.kind !== 'brand') return;
    setActiveTheme(selection.id);
    const draft = draftForBrandSelection(selection.id);
    setDraftBases(basesFromDraftOverrides(draft));
    setDirtyFamilies(new Set());
  }, [selection]);

  React.useEffect(() => {
    if (selection.kind !== 'campaign') return;
    const palette = getCampaignPalette(selection.id);
    if (palette) {
      setCampaignDraftColors(palette.colors);
      setActiveCampaignPaletteId(palette.id);
    }
  }, [selection]);

  const updateFamilyBase = (family: string, raw: string) => {
    setDraftBases((prev) => ({...prev, [family]: raw}));
    setDirtyFamilies((prev) => new Set(prev).add(family));
  };

  const resetFamily = React.useCallback((family: string) => {
    const draft = draftFromSelection(activeTheme);
    const token = primitiveToken(family, 100);
    const originalOverride = draft.tokenOverrides?.[token];
    setDraftBases((prev) => {
      const next = {...prev};
      if (originalOverride) next[family] = originalOverride;
      else delete next[family];
      return next;
    });
    setDirtyFamilies((prev) => {
      const next = new Set(prev);
      next.delete(family);
      return next;
    });
  }, [activeTheme]);

  const activeCampaignPalette = selection.kind === 'campaign' ? getCampaignPalette(selection.id) : undefined;

  const previewTheme = React.useMemo(() => {
    const base = draftFromSelection(activeTheme);
    const dirtyOverrides = [...dirtyFamilies].reduce((acc, family) => {
      const normalized = normaliseHex(draftBases[family] ?? '');
      if (normalized) {
        Object.assign(acc, buildScaleOverrides(family, normalized));
      }
      return acc;
    }, {} as Record<string, string>);

    return {
      ...base,
      tokenOverrides: {
        ...(base.tokenOverrides ?? {}),
        ...dirtyOverrides,
      },
    };
  }, [activeTheme, draftBases, dirtyFamilies]);

  React.useEffect(() => {
    if (selection.kind !== 'brand') return;
    const { dataLdTheme } = getPreviewThemeContext(previewTheme);
    loadThemeFonts(dataLdTheme);
  }, [selection.kind, previewTheme]);

  const currentDraftTheme = () => draftForBrandSelection(activeTheme);

  const applySavedBrandTheme = (saved: CustomTheme, message: string, clearFamily?: string) => {
    const navId = saved.builtInPreset ?? saved.name;
    setCustomThemeNames(getCustomThemes().filter((theme) => !theme.builtInPreset).map((theme) => theme.name));
    const stayOnCurrent = selection.kind === 'brand' && selection.id === navId;
    if (!stayOnCurrent) {
      setSelection({kind: 'brand', id: navId});
      setActiveTheme(navId);
    }
    setDraftBases(basesFromDraftOverrides(saved));
    setDirtyFamilies((prev) => {
      if (!clearFamily) return new Set();
      const next = new Set(prev);
      next.delete(clearFamily);
      return next;
    });
    flash(message);
  };

  const saveFamily = (family: string) => {
    const normalized = normaliseHex(draftBases[family] ?? '');
    if (!normalized) {
      flash('Enter a valid hex value');
      return;
    }
    setDraftBases((prev) => ({...prev, [family]: normalized}));
    const draft = currentDraftTheme();
    const target = resolveBrandThemeSaveTarget(draft, activeTheme);
    const saved = saveCustomTheme({
      ...draft,
      id: target.id,
      name: target.name,
      baseTheme: target.baseTheme,
      ...(target.builtInPreset ? {builtInPreset: target.builtInPreset} : {}),
      tokenOverrides: {
        ...(draft.tokenOverrides ?? {}),
        ...buildScaleOverrides(family, normalized),
      },
    });
    applySavedBrandTheme(saved, `Updated ${family}`, family);
  };

  const handleDuplicateBrand = (id: string) => {
    const source = draftFromSelection(id);
    const name = uniqueThemeName(`${source.name} Copy`);
    const saved = saveCustomTheme({
      ...source,
      id: name,
      name,
      description: `Based on ${source.name}`,
      baseTheme: source.baseTheme ?? DEFAULT_BASE_THEME,
    });
    setCustomThemeNames(getCustomThemes().filter((theme) => !theme.builtInPreset).map((theme) => theme.name));
    setSelection({kind: 'brand', id: saved.name});
    flash(`Duplicated "${saved.name}"`);
  };

  const handleRenameBrand = (id: string, nextName: string) => {
    const theme = getCustomTheme(id);
    if (!theme || THEME_PRESETS[id]) return;
    if (THEME_PRESETS[nextName]) {
      flash('That name matches a built-in theme');
      return;
    }
    deleteCustomTheme(theme.id);
    const saved = saveCustomTheme({...theme, id: nextName, name: nextName});
    setCustomThemeNames(getCustomThemes().filter((item) => !item.builtInPreset).map((item) => item.name));
    if (activeTheme === id) setActiveTheme(saved.name);
    setSelection({kind: 'brand', id: saved.name});
    flash(`Renamed to "${saved.name}"`);
  };

  const handleSaveCampaignPalette = (next: CampaignPalette) => {
    const saved = saveCampaignPalette(next);
    setCampaignPalettes(getCampaignPalettes());
    setSelection({kind: 'campaign', id: saved.id});
    setActiveCampaignPaletteId(saved.id);
    flash(`Saved "${saved.name}"`);
  };

  const handleUpdateCampaignPalette = (id: string) => {
    const palette = getCampaignPalette(id);
    if (!palette) return;
    handleSaveCampaignPalette({...palette, colors: campaignDraftColors.length ? campaignDraftColors : palette.colors});
  };

  return (
    <div className="palette-generator">
      <ThemesSidebar
        selection={selection}
        customThemeNames={customThemeNames}
        campaignPalettes={campaignPalettes}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed((value) => !value)}
        onSelectBrand={(id) => {
          setSelection({kind: 'brand', id});
        }}
        onSelectCampaign={(id) => {
          setSelection({kind: 'campaign', id});
          setActiveCampaignPaletteId(id);
        }}
        onNewBrand={() => {
          const name = uniqueThemeName('New Palette');
          setSelection({kind: 'brand', id: name});
        }}
        onNewCampaign={() => {
          const name = uniqueCampaignPaletteName();
          const palette: CampaignPalette = {
            id: name,
            name,
            colors: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          handleSaveCampaignPalette(palette);
        }}
        onRenameBrand={handleRenameBrand}
        onRenameCampaign={(id, name) => {
          const saved = renameCampaignPalette(id, name);
          if (!saved) {
            flash('Built-in palettes cannot be renamed');
            return;
          }
          setCampaignPalettes(getCampaignPalettes());
          setSelection({kind: 'campaign', id: saved.id});
          flash(`Renamed to "${saved.name}"`);
        }}
        onDuplicateBrand={handleDuplicateBrand}
        onDuplicateCampaign={(id) => {
          const copy = duplicateCampaignPalette(id);
          if (!copy) return;
          setCampaignPalettes(getCampaignPalettes());
          setSelection({kind: 'campaign', id: copy.id});
          flash(`Duplicated "${copy.name}"`);
        }}
        onUpdateCampaignPalette={handleUpdateCampaignPalette}
        onDeleteBrand={(id) => {
          const theme = getCustomTheme(id);
          if (!theme) return;
          if (!window.confirm(`Delete "${theme.name}"?`)) return;
          removeCustomTheme(theme.id);
          setCustomThemeNames(getCustomThemes().filter((item) => !item.builtInPreset).map((item) => item.name));
          setSelection({kind: 'brand', id: DEFAULT_BASE_THEME});
          flash(`Deleted "${theme.name}"`);
        }}
        onDeleteCampaign={(id) => {
          if (!window.confirm('Delete this campaign palette?')) return;
          deleteCampaignPalette(id);
          setCampaignPalettes(getCampaignPalettes());
          setSelection({kind: 'campaign', id: getCampaignPalettes()[0]?.id ?? 'fy27-summer-savings'});
          flash('Palette deleted');
        }}
      />

      <div className="palette-generator__main">
        {selection.kind === 'campaign' && activeCampaignPalette ? (
          <CampaignColorPicker
            palette={activeCampaignPalette}
            onSave={handleSaveCampaignPalette}
            onColorsChange={setCampaignDraftColors}
            flash={flash}
          />
        ) : (
          <ScrollArea a11yLabel="Brand palette editor" className="palette-generator__brand-content">
            <div className="palette-generator__brand-header">
              <div>
                <Heading as="h1" size="large">{activeTheme}</Heading>
              </div>
              {toast && (
                <Alert variant="success">{toast}</Alert>
              )}
            </div>

            <div className="palette-generator__scales-section">
              <Heading as="h2" size="small">Editable primitive scales</Heading>
              <div className="palette-generator__scales-scroll">
                <BrandScaleGrid
                  previewTheme={previewTheme}
                  draftBases={draftBases}
                  dirtyFamilies={dirtyFamilies}
                  activeTheme={activeTheme}
                  onUpdateFamilyBase={updateFamilyBase}
                  onSaveFamily={saveFamily}
                  onResetFamily={resetFamily}
                  onCopyHex={copyHex}
                />
              </div>
            </div>
          </ScrollArea>
        )}
        {selection.kind === 'campaign' && toast && (
          <div className="palette-generator__feedback">
            <Alert variant="success">{toast}</Alert>
          </div>
        )}
      </div>
    </div>
  );
}
