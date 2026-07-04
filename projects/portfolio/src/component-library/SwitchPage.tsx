import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {Switch, type SwitchSize} from '@/app/components/Switch/Switch';
import {Body} from '@/app/components/Text/Text';
import {Icon} from '@/app/components/Icons/Icons';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const SIZES: Array<{value: SwitchSize; label: string; description: string}> = [
  {value: 'medium', label: 'Medium', description: 'Default 48×24px target. Use in standard settings rows.'},
  {value: 'small', label: 'Small', description: '40×20px. Use in dense rows or when the surrounding controls are small.'},
];

// Token mapping types and data
type SwitchSpecState = {
  key: string;
  label: string;
  wrapperClassName?: 'hover' | 'focus' | 'active';
  isOn?: boolean;
  disabled?: boolean;
  overrides?: Partial<Record<TokenKey, string>>;
};

type TokenKey =
  | 'controlFillColorToken'
  | 'controlKnobColorToken'
  | 'labelTextColorToken'
  | 'labelFontSizeToken'
  | 'labelFontWeightToken'
  | 'labelLineHeightToken';

const BASE_TOKENS: Record<TokenKey, string> = {
  controlFillColorToken: '--ld-semantic-color-switch-fill',
  controlKnobColorToken: '--ld-semantic-color-switch-indicator',
  labelTextColorToken: '--ld-semantic-color-text',
  labelFontSizeToken: '--ld-semantic-font-body-small-size',
  labelFontWeightToken: '--ld-semantic-font-body-small-weight-default',
  labelLineHeightToken: '--ld-semantic-font-body-small-line-height',
};

const SWITCH_SPEC_STATES: SwitchSpecState[] = [
  {
    key: 'off-default',
    label: 'Enabled (off)',
    isOn: false,
  },
  {
    key: 'off-hover',
    label: 'Hovered (off)',
    wrapperClassName: 'hover',
    isOn: false,
    overrides: {
      controlFillColorToken: '--ld-semantic-color-switch-fill-hovered',
    },
  },
  {
    key: 'off-focus',
    label: 'Focused (off)',
    wrapperClassName: 'focus',
    isOn: false,
    overrides: {
      controlFillColorToken: '--ld-semantic-color-switch-fill-focused',
    },
  },
  {
    key: 'off-pressed',
    label: 'Pressed (off)',
    wrapperClassName: 'active',
    isOn: false,
    overrides: {
      controlFillColorToken: '--ld-semantic-color-switch-fill-pressed',
    },
  },
  {
    key: 'on-default',
    label: 'Enabled (on)',
    isOn: true,
    overrides: {
      controlFillColorToken: '--ld-semantic-color-switch-fill-activated',
    },
  },
  {
    key: 'on-hover',
    label: 'Hovered (on)',
    wrapperClassName: 'hover',
    isOn: true,
    overrides: {
      controlFillColorToken: '--ld-semantic-color-switch-fill-activated-hovered',
    },
  },
  {
    key: 'on-focus',
    label: 'Focused (on)',
    wrapperClassName: 'focus',
    isOn: true,
    overrides: {
      controlFillColorToken: '--ld-semantic-color-switch-fill-activated-focused',
    },
  },
  {
    key: 'on-pressed',
    label: 'Pressed (on)',
    wrapperClassName: 'active',
    isOn: true,
    overrides: {
      controlFillColorToken: '--ld-semantic-color-switch-fill-activated-pressed',
    },
  },
  {
    key: 'disabled-off',
    label: 'Disabled (off)',
    isOn: false,
    disabled: true,
    overrides: {
      controlFillColorToken: '--ld-semantic-color-switch-fill-disabled',
      controlKnobColorToken: '--ld-semantic-color-switch-indicator-disabled',
      labelTextColorToken: '--ld-semantic-color-text-disabled',
    },
  },
  {
    key: 'disabled-on',
    label: 'Disabled (on)',
    isOn: true,
    disabled: true,
    overrides: {
      controlFillColorToken: '--ld-semantic-color-switch-fill-activated-disabled',
      controlKnobColorToken: '--ld-semantic-color-switch-indicator-disabled',
      labelTextColorToken: '--ld-semantic-color-text-disabled',
    },
  },
];

const TOKEN_TABLE_ROWS = [
  {part: 'Control', attribute: 'Fill color', tokenKey: 'controlFillColorToken'},
  {part: 'Control knob', attribute: 'Knob color', tokenKey: 'controlKnobColorToken'},
  {part: 'Label text', attribute: 'Text color', tokenKey: 'labelTextColorToken'},
  {part: 'Label text', attribute: 'Font size', tokenKey: 'labelFontSizeToken'},
  {part: 'Label text', attribute: 'Font weight', tokenKey: 'labelFontWeightToken'},
  {part: 'Label text', attribute: 'Line height', tokenKey: 'labelLineHeightToken'},
] as const;

// Token utilities
function resolveTokenValue(
  token: string,
  rootStyles: CSSStyleDeclaration,
  visited: Set<string> = new Set(),
): string {
  if (!token.startsWith('--')) return token;
  if (visited.has(token)) return 'circular';
  visited.add(token);

  const raw = rootStyles.getPropertyValue(token).trim();
  if (!raw) return 'undefined';

  const varMatch = raw.match(/^var\((--[^,\s)]+)(?:\s*,\s*(.+))?\)$/);
  if (!varMatch) return raw;

  const [, nextToken, fallback] = varMatch;
  const resolved = resolveTokenValue(nextToken, rootStyles, visited);
  if (resolved !== 'undefined') return resolved;
  return fallback?.trim() ?? 'undefined';
}

function toHexColor(value: string): string {
  const v = value.trim();
  if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v)) {
    return v.toUpperCase();
  }

  const rgbMatch = v.match(/^rgba?\(([^)]+)\)$/i);
  if (!rgbMatch) return v;

  const parts = rgbMatch[1].split(',').map((p) => p.trim());
  if (parts.length < 3) return v;

  const r = Math.max(0, Math.min(255, Number(parts[0])));
  const g = Math.max(0, Math.min(255, Number(parts[1])));
  const b = Math.max(0, Math.min(255, Number(parts[2])));
  const a = parts[3] !== undefined ? Math.max(0, Math.min(1, Number(parts[3]))) : 1;
  const hex = `#${[r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
  if (a === 1) return hex;
  const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0').toUpperCase();
  return `${hex}${alphaHex}`;
}

function formatTokenValue(token: string, resolvedValue: string): string {
  if (!token.startsWith('--')) return 'N/A';

  if (token.includes('color')) {
    return toHexColor(resolvedValue);
  }

  // Format font sizes with both rem and px
  if (token.includes('size') && resolvedValue.includes('rem')) {
    const remNum = parseFloat(resolvedValue);
    const pxNum = remNum * 16;
    return `${resolvedValue} (${pxNum}px)`;
  }

  return resolvedValue;
}

function getEffectiveTokens(state: SwitchSpecState): Record<TokenKey, string> {
  return {...BASE_TOKENS, ...(state.overrides ?? {})};
}

function useResolvedTokenMap() {
  const [map, setMap] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const recalc = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};
      for (const state of SWITCH_SPEC_STATES) {
        const effective = getEffectiveTokens(state);
        for (const row of TOKEN_TABLE_ROWS) {
          const token = effective[row.tokenKey as TokenKey];
          if (!token.startsWith('--')) continue;
          if (!next[token]) {
            next[token] = resolveTokenValue(token, rootStyles);
          }
        }
      }
      setMap(next);
    };

    recalc();
    const onThemeChange = () => recalc();
    window.addEventListener('ld-kit-theme-change', onThemeChange);
    return () => window.removeEventListener('ld-kit-theme-change', onThemeChange);
  }, []);

  return map;
}

function CopyTokenButton({token}: {token: string}) {
  const [copied, setCopied] = React.useState(false);
  const isToken = token.startsWith('--');
  const resetTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const onCopy = async () => {
    if (!isToken || typeof navigator === 'undefined' || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard write can fail (denied permission / insecure context) — degrade silently.
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      disabled={!isToken}
      aria-label={isToken ? `Copy token ${token}` : 'No token to copy'}
      title={copied ? 'Copied' : isToken ? 'Copy token' : 'No token'}
      style={{
        border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        background: copied
          ? 'var(--ld-semantic-color-fill-brand-subtle, #ebf0ff)'
          : 'var(--ld-semantic-color-surface, #ffffff)',
        borderRadius: 6,
        width: 26,
        height: 26,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isToken ? 'pointer' : 'not-allowed',
        opacity: isToken ? 1 : 0.45,
      }}
    >
      <Icon name="Copy" decorative style={{fontSize: 14, color: 'var(--ld-semantic-color-text, #2e2f32)'}} />
    </button>
  );
}

function HardcodedSwitchPreview({state, resolvedTokenMap}: {state: SwitchSpecState; resolvedTokenMap: Record<string, string>}) {
  const effectiveTokens = getEffectiveTokens(state);
  
  // Resolve token values
  const fillColor = resolvedTokenMap[effectiveTokens.controlFillColorToken] || '#74767c';
  const knobColor = resolvedTokenMap[effectiveTokens.controlKnobColorToken] || '#ffffff';
  const textColor = resolvedTokenMap[effectiveTokens.labelTextColorToken] || '#2e2f32';
  const fontSize = resolvedTokenMap[effectiveTokens.labelFontSizeToken] || '14px';
  const fontWeight = resolvedTokenMap[effectiveTokens.labelFontWeightToken] || '400';
  const lineHeight = resolvedTokenMap[effectiveTokens.labelLineHeightToken] || '1.43';

  // Keep token-provided CSS units so rem values are not unintentionally scaled down.
  const fontSizeCss = fontSize;

  // Calculate switch dimensions (medium size: 48×24px, small: 40×20px)
  const isMedium = true; // hardcoded to medium for preview
  const switchWidth = isMedium ? 48 : 40;
  const switchHeight = isMedium ? 24 : 20;
  const knobSize = isMedium ? 20 : 16;
  const knobOffset = isMedium ? 2 : 2;
  const showKnobShadow = state.isOn && !state.disabled;

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
      <button
        type="button"
        disabled={state.disabled}
        style={{
          width: switchWidth,
          height: switchHeight,
          borderRadius: `${switchHeight / 2}px`,
          border: 'none',
          padding: knobOffset,
          background: fillColor,
          cursor: state.disabled ? 'default' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: state.isOn ? 'flex-end' : 'flex-start',
          transition: 'all 0.1s',
          position: 'relative',
        }}
        aria-pressed={state.isOn}
      >
        <span
          style={{
            width: knobSize,
            height: knobSize,
            borderRadius: '50%',
            background: knobColor,
            boxShadow: showKnobShadow
              ? '0 0.0625rem 0.125rem 0.0625rem rgba(0, 0, 0, 0.1490196078), 0 -0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.1019607843)'
              : 'none',
          }}
        />
      </button>
      <span
        style={{
          color: textColor,
          fontSize: fontSizeCss,
          fontWeight: fontWeight,
          lineHeight: lineHeight,
        }}
      >
        Switch label
      </span>
    </div>
  );
}

function SwitchTokenSpecDiagram() {
  const resolvedTokenMap = useResolvedTokenMap();

  const rowsByState = SWITCH_SPEC_STATES.map((state, stateIndex) => {
    const current = getEffectiveTokens(state);
    const previous = stateIndex > 0 ? getEffectiveTokens(SWITCH_SPEC_STATES[stateIndex - 1]) : null;

    const changedRows = TOKEN_TABLE_ROWS.filter((row) => {
      if (!previous) return true;
      const key = row.tokenKey as TokenKey;
      return current[key] !== previous[key];
    });

    const rows = changedRows.length > 0 ? changedRows : [{part: 'No change', attribute: '-', tokenKey: 'controlFillColorToken' as TokenKey}];
    return {state, current, rows};
  });

  const getPartRowSpan = (
    rows: Array<{part: string; attribute: string; tokenKey: TokenKey}>,
    rowIndex: number,
  ) => {
    const part = rows[rowIndex].part;
    let span = 0;
    for (let i = rowIndex; i < rows.length; i += 1) {
      if (rows[i].part !== part) break;
      span += 1;
    }
    return span;
  };

  return (
    <div style={{display: 'grid', gap: 12, overflowX: 'auto'}}>
      <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
        Rows are consolidated by token changes between states. Disabled previews use disabled color tokens directly (no extra opacity layer). Tokens are shown as code chips with an adjacent copy icon.
      </Body>
      <table
        style={{
          width: '100%',
          minWidth: 1000,
          borderCollapse: 'collapse',
          border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
          borderRadius: 8,
          overflow: 'hidden',
          background: 'var(--ld-semantic-color-surface, #ffffff)',
        }}
      >
        <thead>
          <tr style={{background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)'}}>
            <th style={tokenTableHeaderCellStyle}>State</th>
            <th style={tokenTableHeaderCellStyle}>Preview</th>
            <th style={tokenTableHeaderCellStyle}>Part</th>
            <th style={tokenTableHeaderCellStyle}>Attribute</th>
            <th style={tokenTableHeaderCellStyle}>Token</th>
            <th style={tokenTableHeaderCellStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          {rowsByState.map(({state, current, rows}) => (
            rows.map((row, rowIndex) => {
              const token = current[row.tokenKey as TokenKey];
              const rawValue = token.startsWith('--') ? (resolvedTokenMap[token] ?? '…') : 'N/A';
              const value = rawValue === '…' ? rawValue : formatTokenValue(token, rawValue);
              const hasColorSwatch =
                token.startsWith('--') &&
                token.includes('color') &&
                /^#([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(value);
              const showPartCell = rowIndex === 0 || rows[rowIndex - 1].part !== row.part;
              const partRowSpan = showPartCell ? getPartRowSpan(rows, rowIndex) : 0;
              return (
                <tr key={`${state.key}-${row.part}-${row.attribute}`}>
                  {rowIndex === 0 && (
                    <td rowSpan={rows.length} style={tokenTableStateCellStyle}>
                      <Body as="p" size="small" weight="alt" style={{margin: 0}}>{state.label}</Body>
                    </td>
                  )}
                  {rowIndex === 0 && (
                    <td rowSpan={rows.length} style={tokenTablePreviewCellStyle}>
                      <HardcodedSwitchPreview state={state} resolvedTokenMap={resolvedTokenMap} />
                    </td>
                  )}
                  {showPartCell && <td rowSpan={partRowSpan} style={tokenTableCellStyle}>{row.part}</td>}
                  <td style={tokenTableCellStyle}>{row.attribute}</td>
                  <td style={tokenTableCellStyle}>
                    {token.startsWith('--') ? (
                      <span style={{display: 'inline-flex', alignItems: 'center', gap: 6}}>
                        <code style={tokenCodeChipStyle}>{token}</code>
                        <CopyTokenButton token={token} />
                      </span>
                    ) : (
                      <span style={{fontSize: 13, color: 'var(--ld-semantic-color-text-subtle, #74767c)'}}>{token}</span>
                    )}
                  </td>
                  <td style={tokenTableCellStyle}>
                    {hasColorSwatch ? (
                      <span style={{display: 'inline-flex', alignItems: 'center', gap: 8}}>
                        <span
                          aria-hidden
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 2,
                            border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
                            background: value,
                            flexShrink: 0,
                          }}
                        />
                        <code>{value}</code>
                      </span>
                    ) : (
                      <code>{value}</code>
                    )}
                  </td>
                </tr>
              );
            })
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tokenTableHeaderCellStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  fontSize: 12,
  fontWeight: 700,
  borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  color: 'var(--ld-semantic-color-text, #2e2f32)',
  verticalAlign: 'top',
};

const tokenTableCellStyle: React.CSSProperties = {
  padding: '10px 12px',
  fontSize: 13,
  lineHeight: '1.4',
  borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  color: 'var(--ld-semantic-color-text, #2e2f32)',
  verticalAlign: 'top',
};

const tokenTableStateCellStyle: React.CSSProperties = {
  ...tokenTableCellStyle,
  width: 140,
  minWidth: 140,
};

const tokenTablePreviewCellStyle: React.CSSProperties = {
  ...tokenTableCellStyle,
  width: 180,
  minWidth: 180,
};

const tokenCodeChipStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '3px 8px',
  borderRadius: 4,
  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
  fontSize: 12,
  lineHeight: '18px',
};

function SwitchSpecCanvas({
  title,
  trackWidth,
  trackHeight,
  knobSize,
  spacing,
}: {
  title: string;
  trackWidth: number;
  trackHeight: number;
  knobSize: number;
  spacing: number;
}) {
  const canvasWidth = 500;
  const canvasHeight = 220;
  const labelWidth = 108;
  const labelHeight = 20;
  const totalComponentWidth = trackWidth + spacing + labelWidth;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const trackX = centerX - (totalComponentWidth / 2);
  const trackY = centerY - (trackHeight / 2);
  const labelX = trackX + trackWidth + spacing;
  const labelY = centerY - (labelHeight / 2);
  const redline = '#d92d20';

  return (
    <DocsCard title={title} description="Centered canvas with redlines for switch track and label dimensions, plus switch-to-label spacing.">
      <div style={{display: 'grid', gap: 10}}>
        <div
          style={{
            overflowX: 'auto',
            border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
            borderRadius: 10,
            background:
              'linear-gradient(0deg, var(--ld-semantic-color-fill-subtle, #f5f5f6), var(--ld-semantic-color-fill-subtle, #f5f5f6))',
            padding: 10,
          }}
        >
          <svg width={canvasWidth} height={canvasHeight} role="img" aria-label={`${title} specs canvas`}>
            <rect x={0} y={0} width={canvasWidth} height={canvasHeight} fill="rgba(255,255,255,0.72)" rx="8" />

            {/* Track/pill background */}
            <rect x={trackX} y={trackY} width={trackWidth} height={trackHeight} fill="#ffffff" stroke="#2e2f32" strokeWidth="1.5" rx={trackHeight / 2} />
            {/* Knob */}
            <circle cx={trackX + knobSize / 2 + 2} cy={trackY + trackHeight / 2} r={knobSize / 2} fill="#dbeafe" stroke="#6b7280" strokeWidth="1" />

            {/* Label box */}
            <rect x={labelX} y={labelY} width={labelWidth} height={labelHeight} fill="transparent" stroke="#64748b" strokeDasharray="4 3" />
            <text x={labelX + 6} y={labelY + 14} fontSize="13" fill="#2e2f32">Switch label</text>

            {/* Track width redline */}
            <line x1={trackX} y1={trackY - 24} x2={trackX + trackWidth} y2={trackY - 24} stroke={redline} strokeWidth="1.5" />
            <line x1={trackX} y1={trackY - 29} x2={trackX} y2={trackY - 19} stroke={redline} strokeWidth="1.5" />
            <line x1={trackX + trackWidth} y1={trackY - 29} x2={trackX + trackWidth} y2={trackY - 19} stroke={redline} strokeWidth="1.5" />
            <text x={trackX + (trackWidth / 2)} y={trackY - 31} textAnchor="middle" fontSize="11" fill={redline}>W {trackWidth}px</text>

            {/* Track height redline */}
            <line x1={trackX - 22} y1={trackY} x2={trackX - 22} y2={trackY + trackHeight} stroke={redline} strokeWidth="1.5" />
            <line x1={trackX - 27} y1={trackY} x2={trackX - 17} y2={trackY} stroke={redline} strokeWidth="1.5" />
            <line x1={trackX - 27} y1={trackY + trackHeight} x2={trackX - 17} y2={trackY + trackHeight} stroke={redline} strokeWidth="1.5" />
            <text x={trackX - 30} y={trackY + (trackHeight / 2)} textAnchor="end" dominantBaseline="middle" fontSize="11" fill={redline}>H {trackHeight}px</text>

            {/* Label width redline */}
            <line x1={labelX} y1={labelY - 24} x2={labelX + labelWidth} y2={labelY - 24} stroke={redline} strokeWidth="1.5" />
            <line x1={labelX} y1={labelY - 29} x2={labelX} y2={labelY - 19} stroke={redline} strokeWidth="1.5" />
            <line x1={labelX + labelWidth} y1={labelY - 29} x2={labelX + labelWidth} y2={labelY - 19} stroke={redline} strokeWidth="1.5" />
            <text x={labelX + (labelWidth / 2)} y={labelY - 31} textAnchor="middle" fontSize="11" fill={redline}>W {labelWidth}px</text>

            {/* Label height redline */}
            <line x1={labelX + labelWidth + 20} y1={labelY} x2={labelX + labelWidth + 20} y2={labelY + labelHeight} stroke={redline} strokeWidth="1.5" />
            <line x1={labelX + labelWidth + 15} y1={labelY} x2={labelX + labelWidth + 25} y2={labelY} stroke={redline} strokeWidth="1.5" />
            <line x1={labelX + labelWidth + 15} y1={labelY + labelHeight} x2={labelX + labelWidth + 25} y2={labelY + labelHeight} stroke={redline} strokeWidth="1.5" />
            <text
              x={labelX + labelWidth + 29}
              y={labelY + (labelHeight / 2)}
              dominantBaseline="middle"
              fontSize="11"
              fill={redline}
            >
              H {labelHeight}px
            </text>

            {/* Spacing redline */}
            <line x1={trackX + trackWidth} y1={trackY + trackHeight + 28} x2={labelX} y2={trackY + trackHeight + 28} stroke={redline} strokeWidth="1.5" />
            <line x1={trackX + trackWidth} y1={trackY + trackHeight + 33} x2={trackX + trackWidth} y2={trackY + trackHeight + 23} stroke={redline} strokeWidth="1.5" />
            <line x1={labelX} y1={trackY + trackHeight + 33} x2={labelX} y2={trackY + trackHeight + 23} stroke={redline} strokeWidth="1.5" />
            <text x={trackX + trackWidth + (spacing / 2)} y={trackY + trackHeight + 45} textAnchor="middle" fontSize="11" fill={redline}>
              Spacing {spacing}px
            </text>
          </svg>
        </div>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
            fontSize: 12,
            background: 'var(--ld-semantic-color-surface, #ffffff)',
          }}
        >
          <tbody>
            <tr>
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)', fontWeight: 700}}>Track (W×H)</td>
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)'}}>{trackWidth}px × {trackHeight}px</td>
            </tr>
            <tr>
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)', fontWeight: 700}}>Knob (W×H)</td>
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)'}}>{knobSize}px × {knobSize}px</td>
            </tr>
            <tr>
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)', fontWeight: 700}}>Track padding</td>
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)'}}>2px (all sides)</td>
            </tr>
            <tr>
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)', fontWeight: 700}}>Label (W×H)</td>
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)'}}>{labelWidth}px × {labelHeight}px (sample text, hug width)</td>
            </tr>
            <tr>
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)', fontWeight: 700}}>Switch to label spacing</td>
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)'}}>{spacing}px</td>
            </tr>
            <tr>
              <td style={{padding: '6px 8px', fontWeight: 700}}>Component width behavior</td>
              <td style={{padding: '6px 8px'}}>Hug width by default (inline-flex, fit-content)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsCard>
  );
}

export default function SwitchPage() {
  const [size, setSize] = React.useState<SwitchSize>('medium');
  const [isOn, setIsOn] = React.useState(true);
  const [disabled, setDisabled] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [smsUpdates, setSmsUpdates] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <PageWrapper
      title="Switch"
      category="Core Components"
      description="Toggle controls for binary on/off settings with immediate state changes."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview switch size, on/off state, and disabled treatment."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Size</Body>
              </div>
              <ButtonGroup aria-label="Switch size">
                {SIZES.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={size === item.value ? 'primary' : 'secondary'}
                    aria-pressed={size === item.value}
                    onClick={() => setSize(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="On" checked={isOn} onChange={(event) => setIsOn(event.target.checked)} />
                <Checkbox label="Disabled" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard
              title={`${SIZES.find((item) => item.value === size)?.label} switch`}
              description={SIZES.find((item) => item.value === size)?.description}
            >
              <Switch
                size={size}
                label="Live preview switch"
                isOn={isOn}
                disabled={disabled}
                onClick={() => setIsOn((value) => !value)}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="States" description="Compare on/off and disabled treatments side by side.">
        <DocsGrid>
          <DocsCard title="On / Off" description="Standard interactive switches.">
            <div style={{display: 'grid', gap: 12}}>
              <Switch label="Notifications" isOn={notifications} onClick={() => setNotifications((value) => !value)} />
              <Switch label="SMS updates" isOn={smsUpdates} onClick={() => setSmsUpdates((value) => !value)} />
            </div>
          </DocsCard>
          <DocsCard title="Disabled" description="Disabled switches stay readable but are non-interactive.">
            <div style={{display: 'grid', gap: 12}}>
              <Switch label="Disabled off" isOn={false} disabled />
              <Switch label="Disabled on" isOn disabled />
            </div>
          </DocsCard>
          <DocsCard title="Sizes" description="Use small inside dense settings rows.">
            <div style={{display: 'grid', gap: 12}}>
              <Switch label="Medium" isOn={darkMode} onClick={() => setDarkMode((value) => !value)} />
              <Switch size="small" label="Small" isOn={darkMode} onClick={() => setDarkMode((value) => !value)} />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Token mapping"
        description="State-by-state token mapping with consolidated rows, merged part cells, copyable token chips, and normalized values that mirror rendered switch behavior."
      >
        <SwitchTokenSpecDiagram />
      </ExampleSection>

      <ExampleSection
        title="Specs"
        description="Centered canvas redlines for switch track and knob dimensions with label spacing and width behavior."
      >
        <DocsGrid>
          <SwitchSpecCanvas title="Medium switch" trackWidth={48} trackHeight={24} knobSize={20} spacing={12} />
          <SwitchSpecCanvas title="Small switch" trackWidth={40} trackHeight={20} knobSize={16} spacing={8} />
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Switch for binary settings that take effect immediately. Provide a clear label that describes the on-state outcome, and avoid using Switch for actions that need confirmation — use Checkbox + Save instead. Match size to the surrounding row density."
        defaultValue="size='medium', isOn=false"
      />
    </PageWrapper>
  );
}
