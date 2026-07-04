import * as React from 'react';
import {
  Alert,
  Badge,
  Body,
  Button,
  ButtonGroup,
  Caption,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Heading,
  Link,
  Switch,
  Tag,
  TextField,
} from '@/living-design';
import {
  SEEDS,
  type SeedId,
  type CustomTheme,
  getCustomThemes,
  saveCustomTheme,
  deleteCustomTheme,
  createDraftTheme,
  createThemeFromBuiltIn,
  resolveOverrides,
  getCustomTheme,
  CUSTOM_THEMES_EVENT,
  DEFAULT_BASE_THEME,
} from '@/living-design/utils/customThemes';
import { getTheme, setTheme, THEME_PRESETS } from '@/living-design/utils/themeManager';
import { darken, parseHex, tint } from '@/living-design/utils/colorUtils';
import type { ThemeName } from '@/living-design/utils/Theming';

const THEME_CHANGE_EVENT = 'ld-kit-theme-change';

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

/* ── advanced token groups ─────────────────────────────────────── */
// Fine-grained semantic tokens users can override individually. These win over
// seed-derived values (see resolveOverrides). Only real portfolio tokens listed.

interface TokenDef { token: string; label: string }
interface TokenGroup { id: string; title: string; tokens: TokenDef[] }

const TOKEN_GROUPS: TokenGroup[] = [
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
    id: 'brand',
    title: 'Brand',
    tokens: [
      { token: '--ld-semantic-color-text-brand', label: 'Brand text' },
      { token: '--ld-semantic-color-border-brand', label: 'Brand border' },
      { token: '--ld-semantic-color-fill-brand', label: 'Brand fill' },
      { token: '--ld-semantic-color-fill-brand-subtle', label: 'Brand fill · subtle' },
      { token: '--ld-semantic-color-surface-brand', label: 'Brand surface' },
    ],
  },
  {
    id: 'navigation',
    title: 'Navigation',
    tokens: [
      { token: '--ld-semantic-color-topNav-fill', label: 'Top nav background' },
      { token: '--ld-semantic-color-topNav-text-onFill', label: 'Top nav text / icons' },
    ],
  },
  {
    id: 'surface',
    title: 'Surface & Text',
    tokens: [
      { token: '--ld-semantic-color-surface', label: 'Surface' },
      { token: '--ld-semantic-color-surface-subtle', label: 'Surface · subtle' },
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
];

/* ── color seed control ─────────────────────────────────────────── */

function SeedControl({
  seedId,
  hex,
  onChange,
}: {
  seedId: SeedId;
  hex: string;
  onChange: (hex: string) => void;
}) {
  const seed = SEEDS.find((s) => s.id === seedId)!;
  const [text, setText] = React.useState(hex);
  React.useEffect(() => setText(hex), [hex]);

  const tokenCount = Object.keys(seed.derive(hex)).length;

  const commitText = (val: string) => {
    const parsed = parseHex(val);
    if (parsed) onChange(parsed);
    else setText(hex);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        padding: '14px',
        border: '1px solid #E6E6E8',
        borderRadius: '10px',
        background: '#fff',
      }}
    >
      <label
        style={{
          position: 'relative',
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          flexShrink: 0,
          cursor: 'pointer',
          background: hex,
          boxShadow: '0 0 0 1px rgba(0,0,0,0.08) inset',
          overflow: 'hidden',
        }}
        title="Pick a color"
      >
        <input
          type="color"
          value={hex.length === 7 ? hex : '#000000'}
          onChange={(e) => onChange(e.target.value)}
          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none' }}
          aria-label={`${seed.label} color`}
        />
      </label>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#2E2F32' }}>{seed.label}</span>
          <span style={{ fontSize: '11px', color: '#74767C' }}>{tokenCount} tokens</span>
        </div>
        <p style={{ margin: '2px 0 8px', fontSize: '12px', color: '#74767C', lineHeight: 1.4 }}>
          {seed.description}
        </p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
          {seed.components.map((c) => (
            <span
              key={c}
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: '#515357',
                background: '#F2F3F5',
                borderRadius: '4px',
                padding: '2px 6px',
              }}
            >
              {c}
            </span>
          ))}
        </div>
        <input
          type="text"
          value={text}
          spellCheck={false}
          onChange={(e) => setText(e.target.value)}
          onBlur={(e) => commitText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitText((e.target as HTMLInputElement).value);
          }}
          style={{
            width: '110px',
            fontFamily: 'monospace',
            fontSize: '12px',
            padding: '5px 8px',
            border: '1px solid #E6E6E8',
            borderRadius: '6px',
            color: '#2E2F32',
            outline: 'none',
          }}
          aria-label={`${seed.label} hex value`}
        />
      </div>
    </div>
  );
}

/* ── live preview ──────────────────────────────────────────────── */

function PreviewPanel({ theme }: { theme: CustomTheme }) {
  const overrideVars = resolveOverrides(theme) as React.CSSProperties;
  const [checked, setChecked] = React.useState(true);
  const [on, setOn] = React.useState(true);

  return (
    <div
      data-ld-theme={theme.baseTheme}
      style={{
        ...overrideVars,
        background: 'var(--ld-semantic-color-surface, #fff)',
        border: '1px solid #E6E6E8',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Top nav preview */}
      <div
        style={{
          background: 'var(--ld-semantic-color-topNav-fill, #0053e2)',
          color: 'var(--ld-semantic-color-topNav-text-onFill, #fff)',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 700,
          fontSize: '15px',
        }}
      >
        <span
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '5px',
            background: 'var(--ld-semantic-color-topNav-text-onFill, #fff)',
            opacity: 0.9,
          }}
        />
        {theme.name || 'Untitled theme'}
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Caption as="p" color="subtlest">Buttons</Caption>
          <ButtonGroup>
            <Button variant="primary" size="small">Primary</Button>
            <Button variant="secondary" size="small">Secondary</Button>
            <Button variant="tertiary" size="small">Tertiary</Button>
          </ButtonGroup>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Caption as="p" color="subtlest">Badges &amp; Tags</Caption>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge color="brand">Brand</Badge>
            <Badge color="green">Positive</Badge>
            <Badge color="red">Negative</Badge>
            <Badge color="yellow">Warning</Badge>
            <Tag color="brand">Brand</Tag>
            <Tag color="green">Active</Tag>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Caption as="p" color="subtlest">Controls</Caption>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Checkbox label="Remember me" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            <Switch label="Notifications" isOn={on} onClick={() => setOn(!on)} />
            <Link href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Text link</Link>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Caption as="p" color="subtlest">Feedback</Caption>
          <Alert variant="success">Your changes were saved.</Alert>
          <Alert variant="error">Something went wrong.</Alert>
          <Alert variant="warning">Double-check this field.</Alert>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Caption as="p" color="subtlest">Card</Caption>
          <Card size="small">
            <CardHeader title="Service card" />
            <CardContent>
              <TextField label="Store number" placeholder="Enter store ID" />
            </CardContent>
            <CardActions>
              <Button variant="primary" size="small">Save</Button>
              <Button variant="tertiary" size="small">Cancel</Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ── advanced token override row ───────────────────────────────── */

function TokenRow({
  def,
  value,
  isOverridden,
  onChange,
  onReset,
}: {
  def: TokenDef;
  value: string;
  isOverridden: boolean;
  onChange: (value: string) => void;
  onReset: () => void;
}) {
  const [text, setText] = React.useState(value);
  React.useEffect(() => setText(value), [value]);
  const isHex = /^#[0-9a-fA-F]{6}$/.test(value);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0' }}>
      <label
        style={{
          position: 'relative',
          width: '26px',
          height: '26px',
          borderRadius: '6px',
          flexShrink: 0,
          cursor: 'pointer',
          background: value || '#ffffff',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.1) inset',
          overflow: 'hidden',
        }}
        title="Pick a color"
      >
        <input
          type="color"
          value={isHex ? value : '#000000'}
          onChange={(e) => onChange(e.target.value)}
          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none' }}
          aria-label={`${def.label} color`}
        />
      </label>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#2E2F32',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {def.label}
          {isOverridden && <Badge color="brand">override</Badge>}
        </div>
        <div style={{ fontSize: '10px', color: '#9CA0A6', fontFamily: 'monospace' }}>
          {def.token.replace('--ld-semantic-color-', '')}
        </div>
      </div>
      <input
        type="text"
        value={text}
        spellCheck={false}
        onChange={(e) => setText(e.target.value)}
        onBlur={(e) => onChange(e.target.value.trim())}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onChange((e.target as HTMLInputElement).value.trim());
        }}
        style={{
          width: '120px',
          fontFamily: 'monospace',
          fontSize: '11px',
          padding: '5px 7px',
          border: '1px solid #E6E6E8',
          borderRadius: '6px',
          color: '#2E2F32',
          outline: 'none',
        }}
        aria-label={`${def.label} value`}
      />
      <button
        type="button"
        onClick={onReset}
        disabled={!isOverridden}
        title="Reset to seed-derived value"
        aria-label={`Reset ${def.label}`}
        style={{
          width: '26px',
          height: '26px',
          flexShrink: 0,
          border: '1px solid #E6E6E8',
          borderRadius: '6px',
          background: '#fff',
          color: isOverridden ? '#74767C' : '#C9CDD3',
          cursor: isOverridden ? 'pointer' : 'default',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          lineHeight: 1,
        }}
      >
        ↺
      </button>
    </div>
  );
}

function AdvancedOverrides({
  theme,
  onSetToken,
  onResetToken,
}: {
  theme: CustomTheme;
  onSetToken: (token: string, value: string) => void;
  onResetToken: (token: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  // Seed-derived defaults (without fine-grained overrides) for display fallback.
  const seedDefaults = React.useMemo(
    () => resolveOverrides({ seeds: theme.seeds, tokenOverrides: {} }),
    [theme.seeds],
  );
  const overrides = theme.tokenOverrides ?? {};
  const overrideCount = Object.keys(overrides).length;

  return (
    <div style={{ border: '1px solid #E6E6E8', borderRadius: '10px', background: '#fff', overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          padding: '12px 14px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#2E2F32' }}>Advanced token overrides</span>
          {overrideCount > 0 && <Badge color="brand">{overrideCount}</Badge>}
        </span>
        <span aria-hidden="true" style={{ fontSize: '12px', color: '#74767C' }}>
          {open ? '▴' : '▾'}
        </span>
      </button>

      {open && (
        <div style={{ padding: '0 14px 14px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#74767C', lineHeight: 1.4 }}>
            Fine-tune individual semantic tokens. These take priority over the seed-derived values above.
          </p>
          {TOKEN_GROUPS.map((group) => (
            <div key={group.id} style={{ marginTop: '10px' }}>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#9CA0A6',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px',
                  padding: '4px 0',
                  borderTop: '1px solid #F2F3F5',
                }}
              >
                {group.title}
              </div>
              {group.tokens.map((def) => {
                const isOverridden = Object.prototype.hasOwnProperty.call(overrides, def.token);
                const value = isOverridden ? overrides[def.token] : (seedDefaults[def.token] ?? '');
                return (
                  <TokenRow
                    key={def.token}
                    def={def}
                    value={value}
                    isOverridden={isOverridden}
                    onChange={(v) => onSetToken(def.token, v)}
                    onReset={() => onResetToken(def.token)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}
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
    <div style={{ border: '1px solid #E6E6E8', borderRadius: '10px', background: '#fff', padding: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#2E2F32' }}>Palette generator</div>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#74767C', lineHeight: 1.4 }}>
            Generate seed colors from one brand color or apply an existing theme palette.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'end', marginBottom: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#2E2F32' }}>Brand color</label>
          <input
            type="text"
            value={seedHex}
            onChange={(e) => setSeedHex(e.target.value)}
            spellCheck={false}
            style={{
              width: '112px',
              fontFamily: 'monospace',
              fontSize: '12px',
              padding: '7px 8px',
              border: `1px solid ${seedHex && !parsed ? '#c82014' : '#E6E6E8'}`,
              borderRadius: '6px',
              color: '#2E2F32',
              outline: 'none',
            }}
          />
        </div>
        <div style={{ display: 'flex', height: '32px', overflow: 'hidden', borderRadius: '6px', border: '1px solid #E6E6E8' }}>
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
              border: '1px solid #E6E6E8',
              borderRadius: '8px',
              background: '#fff',
              padding: '8px',
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', height: '18px', overflow: 'hidden', borderRadius: '5px', marginBottom: '6px' }}>
              {Object.values(palette.seeds).map((hex, i) => (
                <span key={`${hex}-${i}`} style={{ flex: 1, background: hex }} />
              ))}
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#2E2F32' }}>{palette.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── page ──────────────────────────────────────────────────────── */

export default function ThemeEditorPage({ embedded = false }: { embedded?: boolean } = {}) {
  const [themes, setThemes] = React.useState<CustomTheme[]>(() => getCustomThemes());
  const [activeName, setActiveName] = React.useState<string>(() => getTheme());
  const [draft, setDraft] = React.useState<CustomTheme | null>(null);
  const [sourceKind, setSourceKind] = React.useState<'built-in' | 'custom' | 'new'>('built-in');
  const [dirty, setDirty] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const flash = React.useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  // keep in sync with external theme/theme-list changes
  React.useEffect(() => {
    const onThemes = () => setThemes(getCustomThemes());
    const onTheme = (e: Event) => {
      const name = (e as CustomEvent).detail?.theme;
      if (typeof name === 'string') setActiveName(name);
    };
    window.addEventListener(CUSTOM_THEMES_EVENT, onThemes);
    window.addEventListener(THEME_CHANGE_EVENT, onTheme);
    return () => {
      window.removeEventListener(CUSTOM_THEMES_EVENT, onThemes);
      window.removeEventListener(THEME_CHANGE_EVENT, onTheme);
    };
  }, []);

  // initial selection: active custom theme, else the active built-in/default theme.
  React.useEffect(() => {
    const list = getCustomThemes();
    const active = getCustomTheme(getTheme());
    if (active) {
      setDraft(clone(active));
      setSourceKind('custom');
    } else {
      const activeBuiltIn = THEME_PRESETS[getTheme()] ? getTheme() : DEFAULT_BASE_THEME;
      setDraft(createThemeFromBuiltIn(activeBuiltIn as ThemeName));
      setSourceKind('built-in');
    }
    setDirty(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectTheme = (t: CustomTheme) => {
    setDraft(clone(t));
    setSourceKind('custom');
    setDirty(false);
  };

  const selectBuiltInTheme = (name: ThemeName) => {
    setDraft(createThemeFromBuiltIn(name));
    setSourceKind('built-in');
    setDirty(false);
  };

  const handleNew = () => {
    const name = uniqueName();
    setDraft(createDraftTheme(name, DEFAULT_BASE_THEME));
    setSourceKind('new');
    setDirty(true);
  };

  const updateSeed = (id: SeedId, hex: string) => {
    setDraft((d) => (d ? { ...d, seeds: { ...d.seeds, [id]: hex } } : d));
    setDirty(true);
  };

  const updateName = (name: string) => {
    setDraft((d) => (d ? { ...d, name } : d));
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

  const isSaved = draft ? sourceKind === 'custom' && themes.some((t) => t.id === draft.id) : false;
  const isActive = draft ? activeName === draft.name : false;

  const persistDraft = (): CustomTheme | null => {
    if (!draft) return null;
    const requestedName = draft.name.trim() || uniqueName();
    const name = THEME_PRESETS[requestedName]
      ? uniqueName(`${requestedName} Custom`)
      : requestedName;
    // Renaming a saved theme: drop the old record so ids stay in sync with names.
    if (isSaved && draft.id !== name) deleteCustomTheme(draft.id);
    const saved = saveCustomTheme({ ...draft, id: name, name, baseTheme: DEFAULT_BASE_THEME });
    setThemes(getCustomThemes());
    setDraft(clone(saved));
    setSourceKind('custom');
    setDirty(false);
    return saved;
  };

  const handleSave = () => {
    const saved = persistDraft();
    if (saved && activeName === saved.name) setTheme(saved.name); // refresh live app
    flash('Theme saved');
  };

  const handleApply = () => {
    const saved = persistDraft();
    if (saved) {
      setTheme(saved.name);
      setActiveName(saved.name);
      flash(`Applied "${saved.name}"`);
    }
  };

  const handleDuplicate = () => {
    if (!draft) return;
    const name = uniqueName(`${draft.name} copy`);
    const copy = saveCustomTheme({ ...clone(draft), id: name, name, createdAt: 0, updatedAt: 0 });
    setThemes(getCustomThemes());
    selectTheme(copy);
    flash('Duplicated');
  };

  const handleDelete = (t: CustomTheme) => {
    deleteCustomTheme(t.id);
    const remaining = getCustomThemes();
    setThemes(remaining);
    if (activeName === t.name) setTheme(DEFAULT_BASE_THEME);
    if (draft && draft.id === t.id) {
      if (remaining.length > 0) selectTheme(remaining[0]);
      else setDraft(null);
    }
  };

  const handleExport = () => {
    if (!draft) return;
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${draft.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(String(ev.target?.result)) as Partial<CustomTheme>;
        if (!parsed || typeof parsed !== 'object' || !parsed.seeds) {
          flash('Invalid theme file');
          return;
        }
        const name = uniqueName(parsed.name || 'Imported theme');
        const imported = saveCustomTheme({
          ...createDraftTheme(name, (parsed.baseTheme as ThemeName) || DEFAULT_BASE_THEME),
          seeds: { ...createDraftTheme(name).seeds, ...parsed.seeds },
          tokenOverrides: parsed.tokenOverrides ?? {},
        });
        setThemes(getCustomThemes());
        selectTheme(imported);
        setSourceKind('custom');
        flash('Imported');
      } catch {
        flash('Could not read file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const builtInNames = Object.keys(THEME_PRESETS);

  return (
    <div style={{ display: 'flex', minHeight: embedded ? 'auto' : '100vh', background: '#F7F7F8' }}>
      {/* ── Sidebar: existing themes + my themes ── */}
      <aside
        style={{
          width: '260px',
          flexShrink: 0,
          borderRight: '1px solid #E6E6E8',
          background: '#fff',
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#2E2F32' }}>Themes</span>
          <Button variant="secondary" size="small" onClick={handleNew}>+ New</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#9CA0A6',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              marginTop: '2px',
            }}
          >
            Existing themes
          </div>
          {builtInNames.map((name) => {
            const selected = sourceKind === 'built-in' && draft?.id === name;
            const primary = createThemeFromBuiltIn(name as ThemeName).seeds.primary;
            return (
              <button
                key={name}
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: selected ? '#F2F3F5' : 'transparent',
                  border: selected ? '1px solid #E6E6E8' : '1px solid transparent',
                  textAlign: 'left',
                }}
                onClick={() => selectBuiltInTheme(name as ThemeName)}
              >
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    flexShrink: 0,
                    background: primary,
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.08) inset',
                  }}
                />
                <span
                  style={{
                    flex: 1,
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#2E2F32',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {name}
                </span>
                {activeName === name && <Badge color="green">Active</Badge>}
              </button>
            );
          })}

          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#9CA0A6',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              marginTop: '12px',
            }}
          >
            My themes
          </div>
          {themes.length === 0 && (
            <p style={{ fontSize: '12px', color: '#74767C', lineHeight: 1.5, margin: 0 }}>
              No custom themes yet. Select an existing theme or create one to start.
            </p>
          )}
          {themes.map((t) => {
            const selected = sourceKind === 'custom' && draft?.id === t.id;
            return (
              <button
                key={t.id}
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: selected ? '#F2F3F5' : 'transparent',
                  border: selected ? '1px solid #E6E6E8' : '1px solid transparent',
                  textAlign: 'left',
                }}
                onClick={() => selectTheme(t)}
              >
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    flexShrink: 0,
                    background: t.seeds.primary,
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.08) inset',
                  }}
                />
                <span
                  style={{
                    flex: 1,
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#2E2F32',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {t.name}
                </span>
                {activeName === t.name && <Badge color="green">Active</Badge>}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 'auto', fontSize: '11px', color: '#9CA0A6', lineHeight: 1.5 }}>
          Select an existing theme to inspect and edit it. Saving a built-in theme creates a custom
          editable copy layered over <strong>Walmart</strong>.
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={{ flex: 1, minWidth: 0, padding: '28px 32px', overflowX: 'hidden' }}>
        <div style={{ marginBottom: '20px' }}>
          <Heading as="h1" size="large">Theme Editor</Heading>
          <Body as="p" color="subtle">
            Build your own themes by choosing seed colors. Each seed updates every related
            component at once — all layered on top of the Walmart base theme.
          </Body>
        </div>

        {!draft ? (
          <div
            style={{
              border: '1px dashed #C9CDD3',
              borderRadius: '12px',
              padding: '48px',
              textAlign: 'center',
              background: '#fff',
            }}
          >
            <Heading as="h2" size="small">Create your first theme</Heading>
            <Body as="p" color="subtle">
              Start from the Walmart base and adjust the colors to make it yours.
            </Body>
            <div style={{ marginTop: '16px', display: 'inline-flex', gap: '8px' }}>
              <Button variant="primary" size="medium" onClick={handleNew}>+ New theme</Button>
              <Button variant="secondary" size="medium" onClick={() => fileInputRef.current?.click()}>
                Import JSON
              </Button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1fr) minmax(360px, 1fr)', gap: '28px', alignItems: 'start' }}>
            {/* Left: editor */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Theme meta + actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <TextField
                      label="Theme name"
                      value={draft.name}
                      onChange={(e) => updateName(e.target.value)}
                      placeholder="My Theme"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#2E2F32' }}>Base theme</label>
                    <div
                      style={{
                        padding: '9px 10px',
                        fontSize: '13px',
                        border: '1px solid #E6E6E8',
                        borderRadius: '8px',
                        background: '#fff',
                        color: '#2E2F32',
                        minWidth: '150px',
                      }}
                    >
                      Walmart override
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button variant="primary" size="small" onClick={handleApply}>
                    {isActive ? 'Re-apply' : 'Apply to site'}
                  </Button>
                  <Button variant="secondary" size="small" onClick={handleSave} disabled={!dirty && isSaved}>
                    {sourceKind === 'built-in' ? 'Save as custom' : 'Save'}
                  </Button>
                  <Button variant="tertiary" size="small" onClick={handleDuplicate} disabled={!draft}>
                    Duplicate
                  </Button>
                  <Button variant="tertiary" size="small" onClick={handleExport}>Export</Button>
                  <Button variant="tertiary" size="small" onClick={() => fileInputRef.current?.click()}>
                    Import
                  </Button>
                  {isSaved && sourceKind === 'custom' && (
                    <Button variant="tertiary" size="small" onClick={() => handleDelete(draft)}>
                      Delete
                    </Button>
                  )}
                  {sourceKind === 'built-in' && <Badge color="neutral">Built-in template</Badge>}
                  {toast && <Badge color="green">{toast}</Badge>}
                  {dirty && !toast && <Caption as="span" color="subtlest">Unsaved changes</Caption>}
                </div>
              </div>

              <PaletteGenerator theme={draft} customThemes={themes} onApplySeeds={applyGeneratedSeeds} />

              {/* Seeds */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SEEDS.map((seed) => (
                  <SeedControl
                    key={seed.id}
                    seedId={seed.id}
                    hex={draft.seeds[seed.id]}
                    onChange={(hex) => updateSeed(seed.id, hex)}
                  />
                ))}
              </div>

              {/* Advanced per-token overrides */}
              <AdvancedOverrides
                theme={draft}
                onSetToken={setTokenOverride}
                onResetToken={resetTokenOverride}
              />
            </div>

            {/* Right: sticky preview */}
            <div style={{ position: 'sticky', top: '20px' }}>
              <Caption as="p" color="subtlest">Live preview</Caption>
              <div style={{ marginTop: '8px' }}>
                <PreviewPanel theme={draft} />
              </div>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          style={{ display: 'none' }}
          onChange={handleImportFile}
        />
      </div>
    </div>
  );
}
