import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {Divider} from '../components/Divider/Divider';
import {FormGroup} from '../components/FormGroup/FormGroup';
import {Icon} from '../components/Icons/Icons';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type CheckboxPreviewState = 'checked' | 'unchecked' | 'indeterminate';

const CHECKBOX_STATES: Array<{state: CheckboxPreviewState; label: string; description: string}> = [
  {state: 'unchecked', label: 'Unchecked', description: 'Use when an optional value is available but not selected.'},
  {state: 'checked', label: 'Checked', description: 'Use when the option is selected and will be applied.'},
  {state: 'indeterminate', label: 'Indeterminate', description: 'Use for parent selections when only some children are selected.'},
];

function stateToChecked(state: CheckboxPreviewState) {
  return state === 'checked' || state === 'indeterminate';
}

type CheckboxSize = 'small' | 'medium';

const CHECKBOX_SIZES: Array<{size: CheckboxSize; label: string}> = [
  {size: 'medium', label: 'Medium'},
  {size: 'small', label: 'Small'},
];

type CheckboxSpecState = {
  key: string;
  label: string;
  wrapperClassName?: 'hover' | 'focus' | 'active';
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  overrides?: Partial<Record<TokenKey, string>>;
};

type TokenKey =
  | 'boxFillColorToken'
  | 'boxBorderColorToken'
  | 'boxBorderWidthToken'
  | 'boxBorderRadiusToken'
  | 'indicatorColorToken'
  | 'labelTextColorToken'
  | 'labelFontSizeToken'
  | 'labelFontWeightToken'
  | 'labelLineHeightToken';

const BASE_TOKENS: Record<TokenKey, string> = {
  boxFillColorToken: '--ld-semantic-color-input-fill',
  boxBorderColorToken: '--ld-semantic-color-input-border',
  boxBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive',
  boxBorderRadiusToken: '--ld-semantic-border-radius-small',
  indicatorColorToken: 'none',
  labelTextColorToken: '--ld-semantic-color-text',
  labelFontSizeToken: '--ld-semantic-font-body-small-size',
  labelFontWeightToken: '--ld-semantic-font-body-small-weight-default',
  labelLineHeightToken: '--ld-semantic-font-body-small-line-height',
};

const CHECKBOX_SPEC_STATES: CheckboxSpecState[] = [
  {
    key: 'unchecked-default',
    label: 'Enabled',
  },
  {
    key: 'unchecked-hover',
    label: 'Hovered',
    wrapperClassName: 'hover',
    overrides: {
      boxFillColorToken: '--ld-semantic-color-input-fill-hovered',
      boxBorderColorToken: '--ld-semantic-color-input-border-hovered',
      boxBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-hovered',
    },
  },
  {
    key: 'unchecked-focus',
    label: 'Focused',
    wrapperClassName: 'focus',
    overrides: {
      boxFillColorToken: '--ld-semantic-color-input-fill-focused',
      boxBorderColorToken: '--ld-semantic-color-input-border-focused',
      boxBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-focused',
    },
  },
  {
    key: 'unchecked-pressed',
    label: 'Pressed',
    wrapperClassName: 'active',
    overrides: {
      boxFillColorToken: '--ld-semantic-color-input-fill-pressed',
      boxBorderColorToken: '--ld-semantic-color-input-border-pressed',
      boxBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-pressed',
    },
  },
  {
    key: 'checked-default',
    label: 'Enabled (checked)',
    checked: true,
    overrides: {
      boxFillColorToken: '--ld-semantic-color-input-fill-activated',
      boxBorderColorToken: '--ld-semantic-color-input-border-activated',
      boxBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-activated',
      indicatorColorToken: '--ld-semantic-color-input-indicator-activated',
      labelFontWeightToken: '--ld-semantic-font-body-small-weight-alt',
    },
  },
  {
    key: 'checked-hover',
    label: 'Hovered (checked)',
    checked: true,
    wrapperClassName: 'hover',
    overrides: {
      boxFillColorToken: '--ld-semantic-color-input-fill-activated-hovered',
      boxBorderColorToken: '--ld-semantic-color-input-border-activated-hovered',
      boxBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-activated-hovered',
      indicatorColorToken: '--ld-semantic-color-input-indicator-activated',
    },
  },
  {
    key: 'checked-focus',
    label: 'Focused (checked)',
    checked: true,
    wrapperClassName: 'focus',
    overrides: {
      boxFillColorToken: '--ld-semantic-color-input-fill-activated-focused',
      boxBorderColorToken: '--ld-semantic-color-input-border-activated-focused',
      boxBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-activated-focused',
      indicatorColorToken: '--ld-semantic-color-input-indicator-activated',
    },
  },
  {
    key: 'checked-pressed',
    label: 'Pressed (checked)',
    checked: true,
    wrapperClassName: 'active',
    overrides: {
      boxFillColorToken: '--ld-semantic-color-input-fill-activated-pressed',
      boxBorderColorToken: '--ld-semantic-color-input-border-activated-pressed',
      boxBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-activated-pressed',
      indicatorColorToken: '--ld-semantic-color-input-indicator-activated',
    },
  },
  {
    key: 'indeterminate-default',
    label: 'Enabled (indeterminate)',
    checked: true,
    indeterminate: true,
    overrides: {
      boxFillColorToken: '--ld-semantic-color-input-fill-activated',
      boxBorderColorToken: '--ld-semantic-color-input-border-activated',
      boxBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-activated',
      indicatorColorToken: '--ld-semantic-color-input-indicator-activated',
    },
  },
  {
    key: 'indeterminate-hover',
    label: 'Hovered (indeterminate)',
    checked: true,
    indeterminate: true,
    wrapperClassName: 'hover',
    overrides: {
      boxFillColorToken: '--ld-semantic-color-input-fill-activated-hovered',
      boxBorderColorToken: '--ld-semantic-color-input-border-activated-hovered',
      boxBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-activated-hovered',
      indicatorColorToken: '--ld-semantic-color-input-indicator-activated',
    },
  },
  {
    key: 'indeterminate-focus',
    label: 'Focused (indeterminate)',
    checked: true,
    indeterminate: true,
    wrapperClassName: 'focus',
    overrides: {
      boxFillColorToken: '--ld-semantic-color-input-fill-activated-focused',
      boxBorderColorToken: '--ld-semantic-color-input-border-activated-focused',
      boxBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-activated-focused',
      indicatorColorToken: '--ld-semantic-color-input-indicator-activated',
    },
  },
  {
    key: 'indeterminate-pressed',
    label: 'Pressed (indeterminate)',
    checked: true,
    indeterminate: true,
    wrapperClassName: 'active',
    overrides: {
      boxFillColorToken: '--ld-semantic-color-input-fill-activated-pressed',
      boxBorderColorToken: '--ld-semantic-color-input-border-activated-pressed',
      boxBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-activated-pressed',
      indicatorColorToken: '--ld-semantic-color-input-indicator-activated',
    },
  },
  {
    key: 'disabled-unchecked',
    label: 'Disabled',
    disabled: true,
    overrides: {
      boxFillColorToken: '--ld-semantic-color-input-fill-disabled',
      boxBorderColorToken: '--ld-semantic-color-input-border-disabled',
      indicatorColorToken: 'none',
      labelTextColorToken: '--ld-semantic-color-text-disabled',
      labelFontWeightToken: '--ld-semantic-font-body-small-weight-default',
    },
  },
  {
    key: 'disabled-checked',
    label: 'Disabled (checked)',
    checked: true,
    disabled: true,
    overrides: {
      boxFillColorToken: '--ld-semantic-color-input-fill-activated-disabled',
      boxBorderColorToken: '--ld-semantic-color-input-border-activated-disabled',
      boxBorderWidthToken: '--ld-semantic-scale-borderwidth-interactive-activated',
      indicatorColorToken: '--ld-semantic-color-input-indicator-activated',
      labelTextColorToken: '--ld-semantic-color-text-disabled',
      labelFontWeightToken: '--ld-semantic-font-body-small-weight-alt',
    },
  },
];

const TOKEN_TABLE_ROWS = [
  {part: 'Control', attribute: 'Fill color', tokenKey: 'boxFillColorToken'},
  {part: 'Control', attribute: 'Border color', tokenKey: 'boxBorderColorToken'},
  {part: 'Control', attribute: 'Border width', tokenKey: 'boxBorderWidthToken'},
  {part: 'Control', attribute: 'Border radius', tokenKey: 'boxBorderRadiusToken'},
  {part: 'Indicator', attribute: 'Color', tokenKey: 'indicatorColorToken'},
  {part: 'Label text', attribute: 'Color', tokenKey: 'labelTextColorToken'},
  {part: 'Label text', attribute: 'Font size', tokenKey: 'labelFontSizeToken'},
  {part: 'Label text', attribute: 'Font weight', tokenKey: 'labelFontWeightToken'},
  {part: 'Label text', attribute: 'Font line height', tokenKey: 'labelLineHeightToken'},
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
  if (!token.startsWith('--')) return 'N/A';

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

function getEffectiveTokens(state: CheckboxSpecState): Record<TokenKey, string> {
  return {...BASE_TOKENS, ...(state.overrides ?? {})};
}

function useResolvedTokenMap() {
  const [map, setMap] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const recalc = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};
      for (const state of CHECKBOX_SPEC_STATES) {
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

function CheckboxTokenSpecDiagram() {
  const resolvedTokenMap = useResolvedTokenMap();

  const rowsByState = CHECKBOX_SPEC_STATES.map((state, stateIndex) => {
    const current = getEffectiveTokens(state);
    const previous = stateIndex > 0 ? getEffectiveTokens(CHECKBOX_SPEC_STATES[stateIndex - 1]) : null;
    const hasIndicator = Boolean(state.checked || state.indeterminate);

    const changedRows = TOKEN_TABLE_ROWS.filter((row) => {
      if (row.tokenKey === 'indicatorColorToken' && !hasIndicator) return false;
      if (!previous) return true;
      const key = row.tokenKey as TokenKey;
      return current[key] !== previous[key];
    });

    const rows = changedRows.length > 0 ? changedRows : [{part: 'No change', attribute: '-', tokenKey: 'boxFillColorToken' as TokenKey}];
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
        Rows are consolidated by token changes between states. Tokens are shown as code chips with an adjacent copy icon.
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
                    <div className={state.wrapperClassName}>
                      <Checkbox
                        label="Checkbox label"
                        checked={Boolean(state.checked)}
                        indeterminate={Boolean(state.indeterminate)}
                        disabled={Boolean(state.disabled)}
                        onChange={() => {}}
                      />
                    </div>
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

function CheckboxSpecCanvas({
  title,
  control,
  spacing,
}: {
  title: string;
  control: number;
  spacing: number;
}) {
  const canvasWidth = 500;
  const canvasHeight = 220;
  const labelWidth = 108;
  const labelHeight = 20;
  const totalComponentWidth = control + spacing + labelWidth;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const checkboxX = centerX - (totalComponentWidth / 2);
  const checkboxY = centerY - (control / 2);
  const labelX = checkboxX + control + spacing;
  const labelY = centerY - (labelHeight / 2);
  const redline = '#d92d20';

  return (
    <DocsCard title={title} description="Centered canvas with redlines for control and label dimensions, plus checkbox-to-label spacing.">
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

            <rect x={checkboxX} y={checkboxY} width={control} height={control} fill="#ffffff" stroke="#2e2f32" strokeWidth="1.5" rx="2" />
            <rect x={checkboxX + 1.5} y={checkboxY + 1.5} width={control - 3} height={control - 3} fill="#dbeafe" stroke="#6b7280" strokeWidth="1" rx="1" />

            <rect x={labelX} y={labelY} width={labelWidth} height={labelHeight} fill="transparent" stroke="#64748b" strokeDasharray="4 3" />
            <text x={labelX + 6} y={labelY + 14} fontSize="13" fill="#2e2f32">Checkbox label</text>

            <line x1={checkboxX} y1={checkboxY - 24} x2={checkboxX + control} y2={checkboxY - 24} stroke={redline} strokeWidth="1.5" />
            <line x1={checkboxX} y1={checkboxY - 29} x2={checkboxX} y2={checkboxY - 19} stroke={redline} strokeWidth="1.5" />
            <line x1={checkboxX + control} y1={checkboxY - 29} x2={checkboxX + control} y2={checkboxY - 19} stroke={redline} strokeWidth="1.5" />
            <text x={checkboxX + (control / 2)} y={checkboxY - 31} textAnchor="middle" fontSize="11" fill={redline}>W {control}px</text>

            <line x1={checkboxX - 22} y1={checkboxY} x2={checkboxX - 22} y2={checkboxY + control} stroke={redline} strokeWidth="1.5" />
            <line x1={checkboxX - 27} y1={checkboxY} x2={checkboxX - 17} y2={checkboxY} stroke={redline} strokeWidth="1.5" />
            <line x1={checkboxX - 27} y1={checkboxY + control} x2={checkboxX - 17} y2={checkboxY + control} stroke={redline} strokeWidth="1.5" />
            <text x={checkboxX - 30} y={checkboxY + (control / 2)} textAnchor="end" dominantBaseline="middle" fontSize="11" fill={redline}>H {control}px</text>

            <line x1={labelX} y1={labelY - 24} x2={labelX + labelWidth} y2={labelY - 24} stroke={redline} strokeWidth="1.5" />
            <line x1={labelX} y1={labelY - 29} x2={labelX} y2={labelY - 19} stroke={redline} strokeWidth="1.5" />
            <line x1={labelX + labelWidth} y1={labelY - 29} x2={labelX + labelWidth} y2={labelY - 19} stroke={redline} strokeWidth="1.5" />
            <text x={labelX + (labelWidth / 2)} y={labelY - 31} textAnchor="middle" fontSize="11" fill={redline}>W {labelWidth}px</text>

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

            <line x1={checkboxX + control} y1={checkboxY + control + 28} x2={labelX} y2={checkboxY + control + 28} stroke={redline} strokeWidth="1.5" />
            <line x1={checkboxX + control} y1={checkboxY + control + 33} x2={checkboxX + control} y2={checkboxY + control + 23} stroke={redline} strokeWidth="1.5" />
            <line x1={labelX} y1={checkboxY + control + 33} x2={labelX} y2={checkboxY + control + 23} stroke={redline} strokeWidth="1.5" />
            <text x={checkboxX + control + (spacing / 2)} y={checkboxY + control + 45} textAnchor="middle" fontSize="11" fill={redline}>
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
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)', fontWeight: 700}}>Checkbox (W×H)</td>
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)'}}>{control}px × {control}px</td>
            </tr>
            <tr>
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)', fontWeight: 700}}>Label (W×H)</td>
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)'}}>{labelWidth}px × {labelHeight}px (sample text, hug width)</td>
            </tr>
            <tr>
              <td style={{padding: '6px 8px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)', fontWeight: 700}}>Checkbox to label spacing</td>
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

export default function CheckboxPage() {
  const [previewState, setPreviewState] = React.useState<CheckboxPreviewState>('checked');
  const [previewSize, setPreviewSize] = React.useState<CheckboxSize>('medium');
  const [disabled, setDisabled] = React.useState(false);
  const [required, setRequired] = React.useState(false);
  const [preferences, setPreferences] = React.useState<Record<string, boolean>>({
    substitutions: true,
    deliveryUpdates: false,
    weeklyDeals: true,
  });
  const [items, setItems] = React.useState<Record<string, boolean>>({
    apples: true,
    bread: true,
    milk: false,
  });

  const selectedCount = Object.values(items).filter(Boolean).length;
  const allItemsSelected = selectedCount === Object.keys(items).length;
  const hasPartialSelection = selectedCount > 0 && !allItemsSelected;

  const togglePreference = (key: string) => {
    setPreferences((current) => ({...current, [key]: !current[key]}));
  };

  const toggleItem = (key: string) => {
    setItems((current) => ({...current, [key]: !current[key]}));
  };

  const setAllItems = (checked: boolean) => {
    setItems({apples: checked, bread: checked, milk: checked});
  };

  return (
    <PageWrapper
      title="Checkbox"
      category="Core Components"
      description="Selectable controls for independent options where users may choose any number of values."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview checked, unchecked, indeterminate, disabled, and required states."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  State
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the visual state shown in the preview.
                </Body>
              </div>
              <ButtonGroup aria-label="Checkbox state">
                {CHECKBOX_STATES.map((item) => (
                  <Button
                    key={item.state}
                    size="small"
                    variant={previewState === item.state ? 'primary' : 'secondary'}
                    aria-pressed={previewState === item.state}
                    onClick={() => setPreviewState(item.state)}
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
              <ButtonGroup aria-label="Checkbox size">
                {CHECKBOX_SIZES.map((item) => (
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
                <Checkbox label="Required input" checked={required} onChange={(event) => setRequired(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard
              title={CHECKBOX_STATES.find((item) => item.state === previewState)?.label}
              description={CHECKBOX_STATES.find((item) => item.state === previewState)?.description}
            >
              <Checkbox
                label={required ? 'I agree to the required terms' : 'Use this option'}
                checked={stateToChecked(previewState)}
                indeterminate={previewState === 'indeterminate'}
                disabled={disabled}
                size={previewSize}
                onChange={(event) => setPreviewState(event.target.checked ? 'checked' : 'unchecked')}
                checkboxProps={{required}}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Two control sizes — no large. Checkbox caps at medium so the control never visually outweighs the surrounding body text; a larger checkbox would compete with its label and pull focus from the prompt. Small (20×20) is reserved for dense surfaces where a Checkbox is rendered inside another control, such as multi-select Select dropdowns and menu items. For forms, dialogs, preference lists, and most page-level use, keep medium."
      >
        <DocsGrid>
          <DocsCard title="Medium · 24×24" description="Default size for forms, dialogs, and most surfaces.">
            <div style={{display: 'grid', gap: 12}}>
              <Checkbox size="medium" label="Unchecked" checked={false} onChange={() => {}} />
              <Checkbox size="medium" label="Checked" checked onChange={() => {}} />
              <Checkbox size="medium" label="Indeterminate" checked indeterminate onChange={() => {}} />
            </div>
          </DocsCard>
          <DocsCard title="Small · 20×20" description="Reserved for Checkboxes rendered inside another control — multi-select Select dropdowns and menu items. Don't pick this for standalone form rows.">
            <div style={{display: 'grid', gap: 12}}>
              <Checkbox size="small" label="Unchecked" checked={false} onChange={() => {}} />
              <Checkbox size="small" label="Checked" checked onChange={() => {}} />
              <Checkbox size="small" label="Indeterminate" checked indeterminate onChange={() => {}} />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="States" description="Use cards to compare the core checkbox states and disabled treatments.">
        <DocsGrid>
          <DocsCard title="Default states" description="Unchecked, checked, and indeterminate states all use the same label pattern.">
            <div style={{display: 'grid', gap: 12}}>
              <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
              <Checkbox label="Checked" checked onChange={() => {}} />
              <Checkbox label="Indeterminate" checked indeterminate onChange={() => {}} />
            </div>
          </DocsCard>
          <DocsCard title="Disabled states" description="Disabled checkboxes remain visible but cannot be changed.">
            <div style={{display: 'grid', gap: 12}}>
              <Checkbox label="Disabled unchecked" checked={false} disabled onChange={() => {}} />
              <Checkbox label="Disabled checked" checked disabled onChange={() => {}} />
              <Checkbox label="Disabled indeterminate" checked indeterminate disabled onChange={() => {}} />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Common patterns" description="Checkboxes work well for agreements, preference lists, and select-all groups.">
        <DocsGrid>
          <DocsCard title="Agreement" description="Use one checkbox when the user must explicitly opt in or acknowledge terms.">
            <Checkbox
              label="I agree to the Terms and Conditions and Privacy Policy"
              checked={required}
              onChange={(event) => setRequired(event.target.checked)}
            />
          </DocsCard>
          <DocsCard title="Preference list" description="Group related independent options with FormGroup and concise labels.">
            <FormGroup label="Notifications" helperText="Choose all updates you want to receive.">
              <Checkbox label="Allow substitutions" checked={preferences.substitutions} onChange={() => togglePreference('substitutions')} />
              <Checkbox label="Delivery updates" checked={preferences.deliveryUpdates} onChange={() => togglePreference('deliveryUpdates')} />
              <Checkbox label="Weekly deals" checked={preferences.weeklyDeals} onChange={() => togglePreference('weeklyDeals')} />
            </FormGroup>
          </DocsCard>
          <DocsCard title="Select all" description="Use indeterminate on the parent when only some child items are selected.">
            <div style={{display: 'grid', gap: 12}}>
              <Checkbox
                label="Select all items"
                checked={allItemsSelected || hasPartialSelection}
                indeterminate={hasPartialSelection}
                onChange={(event) => setAllItems(event.target.checked)}
              />
              <Divider />
              <div style={{display: 'grid', gap: 8, paddingLeft: 24}}>
                <Checkbox label="Apples" checked={items.apples} onChange={() => toggleItem('apples')} />
                <Checkbox label="Bread" checked={items.bread} onChange={() => toggleItem('bread')} />
                <Checkbox label="Milk" checked={items.milk} onChange={() => toggleItem('milk')} />
              </div>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Token mapping"
        description="State-by-state token mapping with consolidated rows, merged part cells, copyable token chips, and normalized values (hex for color, rem + px for size/spacing)."
      >
        <CheckboxTokenSpecDiagram />
      </ExampleSection>

      <ExampleSection
        title="Specs"
        description="Centered canvas redlines for checkbox and label dimensions with hug-width behavior and checkbox-to-label spacing."
      >
        <DocsGrid>
          <CheckboxSpecCanvas title="Medium checkbox" control={24} spacing={12} />
          <CheckboxSpecCanvas title="Small checkbox" control={20} spacing={8} />
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use checkboxes for independent choices, multi-select lists, and explicit acknowledgements. Provide a visible label or a11yLabelledBy for every checkbox, keep labels specific, and reserve indeterminate for parent controls that summarize child selections. Use native checkboxProps for required, name, and validation behavior when the checkbox participates in a form."
        defaultValue="checked=false, disabled=false, indeterminate=false"
      />
    </PageWrapper>
  );
}
