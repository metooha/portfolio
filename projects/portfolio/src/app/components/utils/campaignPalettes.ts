/* ── Campaign Palettes ────────────────────────────────────────────
 *  Curated color sets for marketing campaigns. Stored separately from
 *  brand themes (customThemes) and shared with Palette Generator +
 *  Theme Editor preview / prompt-based apply.
 * ───────────────────────────────────────────────────────────────── */

export interface CampaignPalette {
  id: string;
  name: string;
  colors: string[];
  createdAt: number;
  updatedAt: number;
  /** Built-in presets cannot be deleted; they can be duplicated. */
  isBuiltIn?: boolean;
}

const STORAGE_KEY = 'ld-kit-campaign-palettes';
const ACTIVE_KEY = 'ld-kit-active-campaign-palette';

export const CAMPAIGN_PALETTES_EVENT = 'ld-kit-campaign-palettes-change';
export const ACTIVE_CAMPAIGN_PALETTE_EVENT = 'ld-kit-active-campaign-palette-change';
export const APPLY_CAMPAIGN_COLORS_EVENT = 'ld-kit-apply-campaign-colors';

const CHART_TOKENS = Array.from(
  { length: 8 },
  (_, index) => `--ld-semantic-color-chart-categorical-${index + 1}`,
);

const ACCENT_TOKENS = [
  '--ld-semantic-color-fill-brand',
  '--ld-semantic-color-text-brand',
  '--ld-semantic-color-border-brand',
  '--ld-semantic-color-fill-positive',
  '--ld-semantic-color-fill-warning',
  '--ld-semantic-color-fill-negative',
  '--ld-semantic-color-progress-fill-info',
  '--ld-semantic-color-switch-fill-activated',
  '--ld-semantic-color-pageNav-indicator-activated',
  '--ld-semantic-color-action-fill-primary',
];

const DEFAULT_PALETTES: CampaignPalette[] = [
  {
    id: 'fy27-summer-savings',
    name: 'FY27 Summer Savings',
    colors: ['#0053e2', '#ffc220', '#2a8703', '#0092db', '#df74b1', '#cc851a', '#a184b2', '#3f931c', '#af2f00', '#6212b2'],
    createdAt: 0,
    updatedAt: 0,
    isBuiltIn: true,
  },
  {
    id: 'fy26-new-year-new-you',
    name: 'FY26 New Year New You',
    colors: ['#0071dc', '#2a8703', '#ffc220', '#6212b2', '#0092db', '#ea1100', '#006937', '#df74b1'],
    createdAt: 0,
    updatedAt: 0,
    isBuiltIn: true,
  },
  {
    id: 'brand-primary',
    name: 'Brand Primary',
    colors: ['#0053e2', '#002e99', '#0071dc', '#74767c', '#2e2f32', '#ffffff'],
    createdAt: 0,
    updatedAt: 0,
    isBuiltIn: true,
  },
  {
    id: 'campaign-baby',
    name: 'Campaign: Baby',
    colors: ['#0092db', '#df74b1', '#ffc220', '#a184b2', '#3f931c'],
    createdAt: 0,
    updatedAt: 0,
    isBuiltIn: true,
  },
  {
    id: 'campaign-beauty',
    name: 'Campaign: Beauty',
    colors: ['#df74b1', '#6212b2', '#b1267d', '#ffc220', '#0053e2'],
    createdAt: 0,
    updatedAt: 0,
    isBuiltIn: true,
  },
  {
    id: 'campaign-patio',
    name: 'Campaign: Patio',
    colors: ['#3f931c', '#cc851a', '#0092db', '#2a8703', '#74767c'],
    createdAt: 0,
    updatedAt: 0,
    isBuiltIn: true,
  },
  {
    id: 'campaign-wellness',
    name: 'Campaign: Wellness',
    colors: ['#2a8703', '#0092db', '#3f931c', '#6212b2', '#0053e2'],
    createdAt: 0,
    updatedAt: 0,
    isBuiltIn: true,
  },
  {
    id: 'campaign-pet',
    name: 'Campaign: Pet',
    colors: ['#cc851a', '#af2f00', '#3f931c', '#0092db', '#df74b1'],
    createdAt: 0,
    updatedAt: 0,
    isBuiltIn: true,
  },
  {
    id: 'campaign-spring',
    name: 'Campaign: Spring',
    colors: ['#3f931c', '#ffc220', '#df74b1', '#0092db', '#2a8703', '#6212b2'],
    createdAt: 0,
    updatedAt: 0,
    isBuiltIn: true,
  },
];

function normalizeHex(raw: string): string | null {
  const value = raw.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{6}$/.test(value)) return `#${value.toLowerCase()}`;
  if (/^[0-9a-fA-F]{3}$/.test(value)) {
    return `#${value.split('').map((char) => char + char).join('').toLowerCase()}`;
  }
  return null;
}

function loadCustomPalettes(): CampaignPalette[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CampaignPalette[]).filter((item) => !item.isBuiltIn) : [];
  } catch {
    return [];
  }
}

function persistCustom(customOnly: CampaignPalette[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customOnly));
  } catch {
    // localStorage may be unavailable.
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CAMPAIGN_PALETTES_EVENT, { detail: { palettes: mergeWithDefaults(customOnly) } }));
  }
}

function mergeWithDefaults(stored: CampaignPalette[]): CampaignPalette[] {
  const byId = new Map<string, CampaignPalette>();
  DEFAULT_PALETTES.forEach((palette) => byId.set(palette.id, palette));
  stored.forEach((palette) => {
    if (!palette.isBuiltIn) byId.set(palette.id, palette);
  });
  return [...byId.values()];
}

export function getCampaignPalettes(): CampaignPalette[] {
  return mergeWithDefaults(loadCustomPalettes());
}

export function getCampaignPalette(id: string): CampaignPalette | undefined {
  return getCampaignPalettes().find((palette) => palette.id === id || palette.name === id);
}

export function uniqueCampaignPaletteName(base = 'New Campaign Palette'): string {
  const names = new Set(getCampaignPalettes().map((palette) => palette.name));
  if (!names.has(base)) return base;
  let index = 2;
  while (names.has(`${base} ${index}`)) index += 1;
  return `${base} ${index}`;
}

export function saveCampaignPalette(palette: CampaignPalette): CampaignPalette {
  const now = Date.now();
  const customOnly = loadCustomPalettes();
  const next: CampaignPalette = {
    ...palette,
    isBuiltIn: false,
    colors: palette.colors.map((color) => normalizeHex(color) ?? color).filter(Boolean),
    updatedAt: now,
    createdAt: palette.createdAt || now,
  };
  const index = customOnly.findIndex((item) => item.id === palette.id);
  const mergedCustom = [...customOnly];
  if (index >= 0) mergedCustom[index] = next;
  else mergedCustom.push(next);
  persistCustom(mergedCustom);
  return next;
}

export function deleteCampaignPalette(id: string): boolean {
  const palette = getCampaignPalette(id);
  if (!palette || palette.isBuiltIn) return false;
  persistCustom(loadCustomPalettes().filter((item) => item.id !== id));
  if (getActiveCampaignPaletteId() === id) {
    setActiveCampaignPaletteId(DEFAULT_PALETTES[0]?.id ?? null);
  }
  return true;
}

export function duplicateCampaignPalette(id: string): CampaignPalette | null {
  const source = getCampaignPalette(id);
  if (!source) return null;
  const name = uniqueCampaignPaletteName(`${source.name} Copy`);
  const copy: CampaignPalette = {
    id: name,
    name,
    colors: [...source.colors],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  return saveCampaignPalette(copy);
}

export function renameCampaignPalette(id: string, nextName: string): CampaignPalette | null {
  const trimmed = nextName.trim();
  if (!trimmed) return null;
  const source = getCampaignPalette(id);
  if (!source || source.isBuiltIn) return null;
  const customOnly = loadCustomPalettes().filter((item) => item.id !== id);
  const renamed: CampaignPalette = { ...source, id: trimmed, name: trimmed, updatedAt: Date.now() };
  persistCustom([...customOnly, renamed]);
  if (getActiveCampaignPaletteId() === id) setActiveCampaignPaletteId(trimmed);
  return renamed;
}

export function getActiveCampaignPaletteId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_KEY);
  } catch {
    return null;
  }
}

export function setActiveCampaignPaletteId(id: string | null): void {
  try {
    if (id) localStorage.setItem(ACTIVE_KEY, id);
    else localStorage.removeItem(ACTIVE_KEY);
  } catch {
    // ignore
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(ACTIVE_CAMPAIGN_PALETTE_EVENT, { detail: { id } }));
  }
}

export function getActiveCampaignPalette(): CampaignPalette | undefined {
  const id = getActiveCampaignPaletteId();
  if (!id) return undefined;
  return getCampaignPalette(id);
}

/** Map campaign colors onto chart + accent semantic tokens. */
export function campaignColorsToTokenOverrides(colors: string[]): Record<string, string> {
  const normalized = colors
    .map((color) => normalizeHex(color))
    .filter((color): color is string => Boolean(color));
  const overrides: Record<string, string> = {};
  CHART_TOKENS.forEach((token, index) => {
    const color = normalized[index % normalized.length];
    if (color) overrides[token] = color;
  });
  ACCENT_TOKENS.forEach((token, index) => {
    const color = normalized[index % normalized.length];
    if (color) overrides[token] = color;
  });
  return overrides;
}

export function dispatchApplyCampaignColors(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(APPLY_CAMPAIGN_COLORS_EVENT));
}

/** Detect prompt text that should apply the active campaign palette. */
export function promptRequestsCampaignColors(prompt: string): boolean {
  const normalized = prompt.trim().toLowerCase();
  return (
    normalized.includes('update with campaign color')
    || normalized.includes('apply campaign color')
    || normalized.includes('use campaign color')
    || normalized.includes('campaign palette')
  );
}
