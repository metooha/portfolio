import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {FormGroup} from '@/app/components/FormGroup/FormGroup';
import {Icon} from '@/app/components/Icons/Icons';
import {Radio} from '@/app/components/Radio/Radio';
import {Body} from '@/app/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const PREVIEW_OPTIONS = [
  {value: 'a', label: 'Option A'},
  {value: 'b', label: 'Option B'},
  {value: 'c', label: 'Option C'},
];

type RadioSize = 'small' | 'medium';

const RADIO_SIZES: Array<{size: RadioSize; label: string}> = [
  {size: 'medium', label: 'Medium'},
  {size: 'small', label: 'Small'},
];

type RadioSpecState = {
  key: string;
  label: string;
  wrapperClassName?: 'hover' | 'focus' | 'active';
  checked?: boolean;
  disabled?: boolean;
  overrides?: Partial<Record<TokenKey, string>>;
};

type TokenKey =
  | 'controlFillColorToken'
  | 'controlBorderColorToken'
  | 'controlBorderWidthToken'
  | 'indicatorColorToken'
  | 'labelTextColorToken'
  | 'labelFontSizeToken'
  | 'labelFontWeightToken'
  | 'labelLineHeightToken';

const BASE_TOKENS: Record<TokenKey, string> = {
  controlFillColorToken: '--ld-semantic-color-input-fill',
  controlBorderColorToken: '--ld-semantic-color-input-border',
  controlBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive',
  indicatorColorToken: 'none',
  labelTextColorToken: '--ld-semantic-color-text',
  labelFontSizeToken: '--ld-semantic-font-body-small-size',
  labelFontWeightToken: '--ld-semantic-font-body-small-weight-default',
  labelLineHeightToken: '--ld-semantic-font-body-small-line-height',
};

const RADIO_SPEC_STATES: RadioSpecState[] = [
  {
    key: 'unchecked-default',
    label: 'Enabled',
  },
  {
    key: 'unchecked-hover',
    label: 'Hovered',
    wrapperClassName: 'hover',
    overrides: {
      controlFillColorToken: '--ld-semantic-color-input-fill-hovered',
      controlBorderColorToken: '--ld-semantic-color-input-border-hovered',
      controlBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-hovered',
    },
  },
  {
    key: 'unchecked-focus',
    label: 'Focused',
    wrapperClassName: 'focus',
    overrides: {
      controlFillColorToken: '--ld-semantic-color-input-fill-focused',
      controlBorderColorToken: '--ld-semantic-color-input-border-focused',
      controlBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-focused',
    },
  },
  {
    key: 'unchecked-pressed',
    label: 'Pressed',
    wrapperClassName: 'active',
    overrides: {
      controlFillColorToken: '--ld-semantic-color-input-fill-pressed',
      controlBorderColorToken: '--ld-semantic-color-input-border-pressed',
      controlBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-pressed',
    },
  },
  {
    key: 'checked-default',
    label: 'Enabled (selected)',
    checked: true,
    overrides: {
      controlFillColorToken: '--ld-semantic-color-input-fill-activated',
      controlBorderColorToken: '--ld-semantic-color-input-border-activated',
      controlBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-activated',
      indicatorColorToken: '--ld-semantic-color-input-indicator-activated',
      labelFontWeightToken: '--ld-semantic-font-body-small-weight-alt',
    },
  },
  {
    key: 'checked-hover',
    label: 'Hovered (selected)',
    checked: true,
    wrapperClassName: 'hover',
    overrides: {
      controlFillColorToken: '--ld-semantic-color-input-fill-activated-hovered',
      controlBorderColorToken: '--ld-semantic-color-input-border-activated-hovered',
      controlBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-activated-hovered',
      indicatorColorToken: '--ld-semantic-color-input-indicator-activated',
    },
  },
  {
    key: 'checked-focus',
    label: 'Focused (selected)',
    checked: true,
    wrapperClassName: 'focus',
    overrides: {
      controlFillColorToken: '--ld-semantic-color-input-fill-activated-focused',
      controlBorderColorToken: '--ld-semantic-color-input-border-activated-focused',
      controlBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-activated-focused',
      indicatorColorToken: '--ld-semantic-color-input-indicator-activated',
    },
  },
  {
    key: 'checked-pressed',
    label: 'Pressed (selected)',
    checked: true,
    wrapperClassName: 'active',
    overrides: {
      controlFillColorToken: '--ld-semantic-color-input-fill-activated-pressed',
      controlBorderColorToken: '--ld-semantic-color-input-border-activated-pressed',
      controlBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-activated-pressed',
      indicatorColorToken: '--ld-semantic-color-input-indicator-activated',
    },
  },
  {
    key: 'disabled-unchecked',
    label: 'Disabled',
    disabled: true,
    overrides: {
      controlFillColorToken: '--ld-semantic-color-input-fill-disabled',
      controlBorderColorToken: '--ld-semantic-color-input-border-disabled',
      controlBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive',
      labelTextColorToken: '--ld-semantic-color-text-disabled',
      labelFontWeightToken: '--ld-semantic-font-body-small-weight-default',
    },
  },
  {
    key: 'disabled-checked',
    label: 'Disabled (selected)',
    checked: true,
    disabled: true,
    overrides: {
      controlFillColorToken: '--ld-semantic-color-input-fill-activated-disabled',
      controlBorderColorToken: '--ld-semantic-color-input-border-activated-disabled',
      controlBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-activated',
      indicatorColorToken: '--ld-semantic-color-input-indicator-activated',
      labelTextColorToken: '--ld-semantic-color-text-disabled',
      labelFontWeightToken: '--ld-semantic-font-body-small-weight-alt',
    },
  },
];

const TOKEN_TABLE_ROWS = [
  {part: 'Control', attribute: 'Fill color', tokenKey: 'controlFillColorToken'},
  {part: 'Control', attribute: 'Border color', tokenKey: 'controlBorderColorToken'},
  {part: 'Control', attribute: 'Border width', tokenKey: 'controlBorderWidthToken'},
  {part: 'Indicator', attribute: 'Color', tokenKey: 'indicatorColorToken'},
  {part: 'Label text', attribute: 'Color', tokenKey: 'labelTextColorToken'},
  {part: 'Label text', attribute: 'Font size', tokenKey: 'labelFontSizeToken'},
  {part: 'Label text', attribute: 'Font weight', tokenKey: 'labelFontWeightToken'},
  {part: 'Label text', attribute: 'Line height', tokenKey: 'labelLineHeightToken'},
] as const;

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

function trimNumber(value: number): string {
  return Number(value.toFixed(4)).toString();
}

function formatLengthValue(value: string): string {
  const v = value.trim();
  const remMatch = v.match(/^(-?\d*\.?\d+)rem$/);
  if (remMatch) {
    const rem = Number(remMatch[1]);
    const px = rem * 16;
    return `${trimNumber(rem)}rem (${trimNumber(px)}px)`;
  }

  const pxMatch = v.match(/^(-?\d*\.?\d+)px$/);
  if (pxMatch) {
    const px = Number(pxMatch[1]);
    const rem = px / 16;
    return `${trimNumber(px)}px (${trimNumber(rem)}rem)`;
  }

  return v;
}

function formatTokenValue(token: string, resolvedValue: string): string {
  if (!token.startsWith('--')) {
    if (resolvedValue === 'none' || resolvedValue === 'N/A') return resolvedValue;
    return formatLengthValue(resolvedValue);
  }

  if (token.includes('color')) {
    return toHexColor(resolvedValue);
  }

  if (
    token.includes('width') ||
    token.includes('radius') ||
    token.includes('size') ||
    token.includes('line-height')
  ) {
    return formatLengthValue(resolvedValue);
  }

  return resolvedValue;
}

function getEffectiveTokens(state: RadioSpecState): Record<TokenKey, string> {
  return {...BASE_TOKENS, ...(state.overrides ?? {})};
}

function useResolvedTokenMap() {
  const [map, setMap] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const recalc = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};
      for (const state of RADIO_SPEC_STATES) {
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

function RadioTokenMappingTable() {
  const resolvedTokenMap = useResolvedTokenMap();

  const getResolvedPreviewTokenValue = (token: string) => {
    if (!token.startsWith('--')) return token;
    return resolvedTokenMap[token] && resolvedTokenMap[token] !== '…'
      ? resolvedTokenMap[token]
      : `var(${token})`;
  };

  const getPreviewTokenStyle = (tokens: Record<TokenKey, string>): React.CSSProperties => {
    const fill = getResolvedPreviewTokenValue(tokens.controlFillColorToken);
    const border = getResolvedPreviewTokenValue(tokens.controlBorderColorToken);
    const borderWidth = getResolvedPreviewTokenValue(tokens.controlBorderWidthToken);
    const indicator = tokens.indicatorColorToken === 'none' ? 'transparent' : getResolvedPreviewTokenValue(tokens.indicatorColorToken);

    return {
      '--ld-semantic-color-input-fill': fill,
      '--ld-semantic-color-input-fill-hovered': fill,
      '--ld-semantic-color-input-fill-pressed': fill,
      '--ld-semantic-color-input-fill-activated': fill,
      '--ld-semantic-color-input-fill-activated-hovered': fill,
      '--ld-semantic-color-input-fill-activated-pressed': fill,
      '--ld-semantic-color-input-fill-disabled': fill,
      '--ld-semantic-color-input-fill-activated-disabled': fill,
      '--ld-semantic-color-input-border': border,
      '--ld-semantic-color-input-border-hovered': border,
      '--ld-semantic-color-input-border-focused': border,
      '--ld-semantic-color-input-border-pressed': border,
      '--ld-semantic-color-input-border-activated': border,
      '--ld-semantic-color-input-border-disabled': border,
      '--ld-semantic-color-input-border-activated-disabled': border,
      '--ld-semantic-scale-borderwidth-interactive': borderWidth,
      '--ld-semantic-scale-borderwidth-interactive-hovered': borderWidth,
      '--ld-semantic-scale-borderwidth-interactive-focused': borderWidth,
      '--ld-semantic-scale-borderwidth-interactive-pressed': borderWidth,
      '--ld-semantic-scale-borderwidth-interactive-activated': borderWidth,
      '--ld-semantic-scale-borderwidth-interactive-activated-hovered': borderWidth,
      '--ld-semantic-scale-borderwidth-interactive-activated-focused': borderWidth,
      '--ld-semantic-scale-borderwidth-interactive-activated-pressed': borderWidth,
      '--ld-semantic-color-input-indicator-activated': indicator,
    } as React.CSSProperties;
  };

  const resolvePreviewValue = (token: string) => {
    if (token === 'none') return 'transparent';
    if (!token.startsWith('--')) return token;
    return resolvedTokenMap[token] && resolvedTokenMap[token] !== '…' ? resolvedTokenMap[token] : `var(${token})`;
  };

  const rowsByState = RADIO_SPEC_STATES.map((state, stateIndex) => {
    const current = getEffectiveTokens(state);
    const previous = stateIndex > 0 ? getEffectiveTokens(RADIO_SPEC_STATES[stateIndex - 1]) : null;
    const hasIndicator = Boolean(state.checked);

    const changedRows = TOKEN_TABLE_ROWS.filter((row) => {
      if (row.tokenKey === 'indicatorColorToken' && !hasIndicator) return false;
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
        Rows are consolidated by token or value changes between adjacent states. Copy is available only for true CSS variable tokens.
      </Body>
      <table
        style={{
          width: '100%',
          minWidth: 1100,
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
              const isToken = token.startsWith('--');
              const rawValue = isToken ? (resolvedTokenMap[token] ?? '…') : token;
              const value = rawValue === '…' ? rawValue : formatTokenValue(token, rawValue);
              const hasColorSwatch =
                isToken &&
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
                      <div style={{pointerEvents: 'none', ...getPreviewTokenStyle(current)}}>
                        <div
                          aria-hidden
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 12,
                          }}
                        >
                          <span
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: '999px',
                              boxSizing: 'border-box',
                              background: resolvePreviewValue(current.controlFillColorToken),
                              border: `${resolvePreviewValue(current.controlBorderWidthToken)} solid ${resolvePreviewValue(current.controlBorderColorToken)}`,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transform: state.wrapperClassName === 'active' ? 'scale(0.98)' : 'none',
                              opacity: state.disabled ? 0.92 : 1,
                            }}
                          >
                            {state.checked && (
                              <span
                                style={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '999px',
                                  background: resolvePreviewValue(current.indicatorColorToken),
                                }}
                              />
                            )}
                          </span>
                          <span
                            style={{
                              color: resolvePreviewValue(current.labelTextColorToken),
                              fontSize: resolvePreviewValue(current.labelFontSizeToken),
                              fontWeight: resolvePreviewValue(current.labelFontWeightToken),
                              lineHeight: resolvePreviewValue(current.labelLineHeightToken),
                            }}
                          >
                            Radio label
                          </span>
                        </div>
                      </div>
                    </td>
                  )}
                  {showPartCell && <td rowSpan={partRowSpan} style={tokenTableCellStyle}>{row.part}</td>}
                  <td style={tokenTableCellStyle}>{row.attribute}</td>
                  <td style={tokenTableCellStyle}>
                    {isToken ? (
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
                    ) : isToken ? (
                      <code>{value}</code>
                    ) : (
                      <span>{value}</span>
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
  width: 160,
  minWidth: 160,
};

const tokenTablePreviewCellStyle: React.CSSProperties = {
  ...tokenTableCellStyle,
  width: 220,
  minWidth: 220,
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

function RadioSpecCanvas({
  title,
  control,
  indicator,
  spacing,
}: {
  title: string;
  control: number;
  indicator: number;
  spacing: number;
}) {
  const canvasWidth = 520;
  const canvasHeight = 240;
  const labelWidth = 84;
  const labelHeight = 20;
  const totalComponentWidth = control + spacing + labelWidth;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const controlX = centerX - (totalComponentWidth / 2);
  const controlY = centerY - (control / 2);
  const labelX = controlX + control + spacing;
  const labelY = centerY - (labelHeight / 2);
  const indicatorX = controlX + (control / 2) - (indicator / 2);
  const indicatorY = controlY + (control / 2) - (indicator / 2);
  const redline = '#d92d20';

  return (
    <DocsCard title={title} description="Centered redline canvas showing control, indicator, and spacing measurements from the implementation.">
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

            <circle
              cx={controlX + (control / 2)}
              cy={controlY + (control / 2)}
              r={(control / 2) - 1}
              fill="#ffffff"
              stroke="#2e2f32"
              strokeWidth="2"
            />
            <circle
              cx={indicatorX + (indicator / 2)}
              cy={indicatorY + (indicator / 2)}
              r={indicator / 2}
              fill="#2e2f32"
            />

            <rect x={labelX} y={labelY} width={labelWidth} height={labelHeight} fill="transparent" stroke="#64748b" strokeDasharray="4 3" />
            <text x={labelX + 6} y={labelY + 14} fontSize="13" fill="#2e2f32">Radio label</text>

            <line x1={controlX} y1={controlY - 26} x2={controlX + control} y2={controlY - 26} stroke={redline} strokeWidth="1.5" />
            <line x1={controlX} y1={controlY - 31} x2={controlX} y2={controlY - 21} stroke={redline} strokeWidth="1.5" />
            <line x1={controlX + control} y1={controlY - 31} x2={controlX + control} y2={controlY - 21} stroke={redline} strokeWidth="1.5" />
            <text x={controlX + (control / 2)} y={controlY - 33} textAnchor="middle" fontSize="11" fill={redline}>W {control}px</text>

            <line x1={controlX - 24} y1={controlY} x2={controlX - 24} y2={controlY + control} stroke={redline} strokeWidth="1.5" />
            <line x1={controlX - 29} y1={controlY} x2={controlX - 19} y2={controlY} stroke={redline} strokeWidth="1.5" />
            <line x1={controlX - 29} y1={controlY + control} x2={controlX - 19} y2={controlY + control} stroke={redline} strokeWidth="1.5" />
            <text x={controlX - 32} y={controlY + (control / 2)} textAnchor="end" dominantBaseline="middle" fontSize="11" fill={redline}>H {control}px</text>

            <line x1={indicatorX} y1={controlY + control + 26} x2={indicatorX + indicator} y2={controlY + control + 26} stroke={redline} strokeWidth="1.5" />
            <line x1={indicatorX} y1={controlY + control + 31} x2={indicatorX} y2={controlY + control + 21} stroke={redline} strokeWidth="1.5" />
            <line x1={indicatorX + indicator} y1={controlY + control + 31} x2={indicatorX + indicator} y2={controlY + control + 21} stroke={redline} strokeWidth="1.5" />
            <text x={indicatorX + (indicator / 2)} y={controlY + control + 43} textAnchor="middle" fontSize="11" fill={redline}>Indicator {Number(indicator.toFixed(2))}px</text>

            <line x1={controlX + control} y1={controlY + control + 58} x2={labelX} y2={controlY + control + 58} stroke={redline} strokeWidth="1.5" />
            <line x1={controlX + control} y1={controlY + control + 63} x2={controlX + control} y2={controlY + control + 53} stroke={redline} strokeWidth="1.5" />
            <line x1={labelX} y1={controlY + control + 63} x2={labelX} y2={controlY + control + 53} stroke={redline} strokeWidth="1.5" />
            <text x={controlX + control + (spacing / 2)} y={controlY + control + 75} textAnchor="middle" fontSize="11" fill={redline}>
              Gap {spacing}px
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
              <td style={specLabelCellStyle}>Control width</td>
              <td style={specValueCellStyle}>{control}px ({trimNumber(control / 16)}rem)</td>
            </tr>
            <tr>
              <td style={specLabelCellStyle}>Control height</td>
              <td style={specValueCellStyle}>{control}px ({trimNumber(control / 16)}rem)</td>
            </tr>
            <tr>
              <td style={specLabelCellStyle}>Indicator size</td>
              <td style={specValueCellStyle}>{Number(indicator.toFixed(2))}px ({trimNumber(indicator / 16)}rem)</td>
            </tr>
            <tr>
              <td style={specLabelCellStyle}>Label width (sample)</td>
              <td style={specValueCellStyle}>{labelWidth}px ({trimNumber(labelWidth / 16)}rem), hugged by content</td>
            </tr>
            <tr>
              <td style={specLabelCellStyle}>Control to label gap</td>
              <td style={specValueCellStyle}>{spacing}px ({trimNumber(spacing / 16)}rem)</td>
            </tr>
            <tr>
              <td style={specLabelCellStyle}>Label behavior</td>
              <td style={specValueCellStyle}>Content-sized text, centered with align-self: center</td>
            </tr>
            <tr>
              <td style={specLabelCellStyle}>Component width behavior</td>
              <td style={specValueCellStyle}>Hug width by default (inline-flex). Example width: {totalComponentWidth}px ({trimNumber(totalComponentWidth / 16)}rem)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsCard>
  );
}

const specLabelCellStyle: React.CSSProperties = {
  padding: '6px 8px',
  borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  fontWeight: 700,
};

const specValueCellStyle: React.CSSProperties = {
  padding: '6px 8px',
  borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
};

export default function RadioPage() {
  const [value, setValue] = React.useState('a');
  const [disabled, setDisabled] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [previewSize, setPreviewSize] = React.useState<RadioSize>('medium');
  const [sizeMediumValue, setSizeMediumValue] = React.useState('email');
  const [sizeSmallValue, setSizeSmallValue] = React.useState('email');
  const [stateDefaultValue, setStateDefaultValue] = React.useState('email');
  const [stateRequiredValue, setStateRequiredValue] = React.useState<string | null>(null);

  return (
    <PageWrapper
      title="Radio"
      category="Core Components"
      description="Mutually exclusive selection within a group. Uses LD input tokens."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview selected option, disabled state, and group-level error messaging."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Selected option</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Use Radio inside FormGroup so the prompt and validation copy share one fieldset.
                </Body>
              </div>
              <ButtonGroup aria-label="Radio selected option">
                {PREVIEW_OPTIONS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={value === item.value ? 'primary' : 'secondary'}
                    aria-pressed={value === item.value}
                    onClick={() => setValue(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Size
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Use small (20×20) in dense lists and panels; medium (24×24) is the default.
                </Body>
              </div>
              <ButtonGroup aria-label="Radio size">
                {RADIO_SIZES.map((item) => (
                  <Button
                    key={item.size}
                    size="small"
                    variant={previewSize === item.size ? 'primary' : 'secondary'}
                    aria-pressed={previewSize === item.size}
                    onClick={() => setPreviewSize(item.size)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Disabled" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
                <Checkbox label="Show error" checked={showError} onChange={(event) => setShowError(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title="Preview" description="Radios always sit inside a FormGroup so the prompt has one accessible name.">
              <FormGroup
                label="Choose an option"
                helperText={!showError ? 'Pick one option to continue.' : undefined}
                error={showError ? 'Select an option to continue.' : undefined}
              >
                {PREVIEW_OPTIONS.map((item) => (
                  <Radio
                    key={item.value}
                    name="radio-preview"
                    value={item.value}
                    label={item.label}
                    checked={value === item.value}
                    disabled={disabled}
                    size={previewSize}
                    onChange={() => setValue(item.value)}
                  />
                ))}
              </FormGroup>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Two control sizes — no large. Radio caps at medium so the control never visually outweighs the surrounding body text; a larger radio would compete with its label and pull focus from the prompt. Small (20×20) is reserved for dense surfaces where a Radio is rendered inside another control, such as single-select Select dropdowns and menu items. For forms, dialogs, preference lists, and most page-level use, keep medium."
      >
        <DocsGrid>
          <DocsCard title="Medium · 24×24" description="Default size for forms, dialogs, and most surfaces.">
            <FormGroup label="Preferred contact">
              <Radio
                size="medium"
                name="size-medium"
                value="email"
                label="Email"
                checked={sizeMediumValue === 'email'}
                onChange={() => setSizeMediumValue('email')}
              />
              <Radio
                size="medium"
                name="size-medium"
                value="phone"
                label="Phone"
                checked={sizeMediumValue === 'phone'}
                onChange={() => setSizeMediumValue('phone')}
              />
              <Radio
                size="medium"
                name="size-medium"
                value="text"
                label="Text message"
                checked={sizeMediumValue === 'text'}
                onChange={() => setSizeMediumValue('text')}
              />
            </FormGroup>
          </DocsCard>
          <DocsCard title="Small · 20×20" description="Reserved for Radios rendered inside another control — single-select Select dropdowns and menu items. Don't pick this for standalone form rows.">
            <FormGroup label="Preferred contact">
              <Radio
                size="small"
                name="size-small"
                value="email"
                label="Email"
                checked={sizeSmallValue === 'email'}
                onChange={() => setSizeSmallValue('email')}
              />
              <Radio
                size="small"
                name="size-small"
                value="phone"
                label="Phone"
                checked={sizeSmallValue === 'phone'}
                onChange={() => setSizeSmallValue('phone')}
              />
              <Radio
                size="small"
                name="size-small"
                value="text"
                label="Text message"
                checked={sizeSmallValue === 'text'}
                onChange={() => setSizeSmallValue('text')}
              />
            </FormGroup>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="States" description="Compare default, disabled, and required-state radio groups.">
        <DocsGrid>
          <DocsCard title="Default" description="One option selected, others available.">
            <FormGroup label="Preferred contact">
              <Radio
                name="state-default"
                value="email"
                label="Email"
                checked={stateDefaultValue === 'email'}
                onChange={() => setStateDefaultValue('email')}
              />
              <Radio
                name="state-default"
                value="phone"
                label="Phone"
                checked={stateDefaultValue === 'phone'}
                onChange={() => setStateDefaultValue('phone')}
              />
              <Radio
                name="state-default"
                value="text"
                label="Text message"
                checked={stateDefaultValue === 'text'}
                onChange={() => setStateDefaultValue('text')}
              />
            </FormGroup>
          </DocsCard>
          <DocsCard title="Disabled" description="Disabled radios remain visible but cannot be changed.">
            <FormGroup label="Locked preference">
              <Radio name="state-disabled" value="email" label="Email" checked disabled onChange={() => {}} />
              <Radio name="state-disabled" value="phone" label="Phone" disabled onChange={() => {}} />
              <Radio name="state-disabled" value="text" label="Text message" disabled onChange={() => {}} />
            </FormGroup>
          </DocsCard>
          <DocsCard title="Required with error" description="Group-level error uses the FormGroup error slot.">
            <FormGroup label="Choose a method" error="Select an option to continue.">
              <Radio
                name="state-required"
                value="a"
                label="Option A"
                checked={stateRequiredValue === 'a'}
                onChange={() => setStateRequiredValue('a')}
              />
              <Radio
                name="state-required"
                value="b"
                label="Option B"
                checked={stateRequiredValue === 'b'}
                onChange={() => setStateRequiredValue('b')}
              />
            </FormGroup>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Token mapping"
        description="State-by-state mapping using real Radio implementation values. Rows only show deltas versus the previous state."
      >
        <RadioTokenMappingTable />
      </ExampleSection>

      <ExampleSection
        title="Specs"
        description="Redline-style dimensions for production sizes, plus compact specs and real layout behavior."
      >
        <DocsGrid>
          <RadioSpecCanvas title="Medium radio" control={24} indicator={8} spacing={12} />
          <RadioSpecCanvas title="Small radio" control={20} indicator={8} spacing={8} />
        </DocsGrid>
        <DocsCard title="Layout behavior" description="Actual behavior from Radio implementation and CSS.">
          <div style={{display: 'grid', gap: 8}}>
            <Body as="p" size="small" style={{margin: 0}}>
              Hug / intrinsic width: root uses <code>display: inline-flex</code> with no explicit width, so width is content-driven.
            </Body>
            <Body as="p" size="small" style={{margin: 0}}>
              Fill behavior: no built-in fill mode; parent layout controls expansion.
            </Body>
            <Body as="p" size="small" style={{margin: 0}}>
              Alignment behavior: control and label align on the cross axis; label uses <code>align-self: center</code>.
            </Body>
            <Body as="p" size="small" style={{margin: 0}}>
              Wrapping behavior: labels wrap naturally when constrained; control keeps fixed size.
            </Body>
            <Body as="p" size="small" style={{margin: 0}}>
              Icon sizing behavior: indicator dot is fixed at 8px for both medium and small.
            </Body>
            <Body as="p" size="small" style={{margin: 0}}>
              Label sizing behavior: text uses fixed CSS values (0.875rem size, 1.25rem line height, 400/700 weights).
            </Body>
          </div>
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use Radio for mutually exclusive choices. Always wrap radio sets in FormGroup so the question and validation message belong to the whole group, not one option. Keep labels parallel and short, and reserve disabled for options that are temporarily unavailable rather than permanently absent."
        defaultValue="checked=false, disabled=false"
      />
    </PageWrapper>
  );
}
