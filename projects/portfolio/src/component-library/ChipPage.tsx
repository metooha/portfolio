import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {Chip, ChipGroup, type ChipSize} from '@/app/components/Chip/Chip';
import {Icon} from '@/app/components/Icons/Icons';
import {Body} from '@/app/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const FILTERS = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys'];
const TAGS = ['Featured', 'New', 'Sale', 'Popular'];

type ChipTokenKey =
  | 'fillColorToken'
  | 'borderColorToken'
  | 'textColorToken'
  | 'leadingIconColorToken'
  | 'indicatorColorToken'
  | 'borderWidthValue'
  | 'borderRadiusValue'
  | 'fontSizeValue'
  | 'fontWeightValue'
  | 'lineHeightValue'
  | 'iconSizeValue'
  | 'leadingGapValue'
  | 'trailingGapValue'
  ;

type ChipSpecState = {
  key: string;
  label: string;
  wrapperClassName?: 'hover' | 'focus' | 'active';
  selected?: boolean;
  disabled?: boolean;
  selectionIndicator?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  overrides?: Partial<Record<ChipTokenKey, string>>;
};

type ChipTokenRow = {
  part: string;
  attribute: string;
  tokenKey: ChipTokenKey;
  visibleInState?: (state: ChipSpecState) => boolean;
};

type ChipSizeSpaceState = {
  key: string;
  label: string;
  size: ChipSize;
  withIcons: boolean;
};

type ChipSizeSpaceTokenRow = {
  part: string;
  attribute: string;
  tokenKey: 'height' | 'paddingBlock' | 'paddingInline' | 'gap' | 'iconSize' | 'iconPaddingReduction';
  visibleInState?: (state: ChipSizeSpaceState) => boolean;
};

const CHIP_BASE_TOKENS: Record<ChipTokenKey, string> = {
  fillColorToken: '--ld-semantic-color-filter-fill',
  borderColorToken: '--ld-semantic-color-filter-border',
  textColorToken: '--ld-semantic-color-filter-text-onFill',
  leadingIconColorToken: '--ld-semantic-color-filter-text-onFill',
  indicatorColorToken: '--ld-semantic-color-filter-text-onFill',
  borderWidthValue: '--ld-semantic-scale-borderwidth-interactive',
  borderRadiusValue: '--ld-semantic-border-radius-tag',
  fontSizeValue: '--ld-semantic-font-body-small-size',
  fontWeightValue: '--ld-semantic-font-body-small-weight-default',
  lineHeightValue: '--ld-semantic-font-body-small-line-height',
  iconSizeValue: '--ld-semantic-scale-icon-small',
  leadingGapValue: '--ld-primitive-scale-space-100',
  trailingGapValue: '--ld-primitive-scale-space-100',
};

const CHIP_SPEC_STATES: ChipSpecState[] = [
  {
    key: 'default',
    label: 'Enabled (unselected)',
    selectionIndicator: false,
    leading: <Icon name="Tag" decorative style={{width: 16, height: 16, fontSize: 16}} />,
  },
  {
    key: 'hover',
    label: 'Hovered (unselected)',
    wrapperClassName: 'hover',
    selectionIndicator: false,
    leading: <Icon name="Tag" decorative style={{width: 16, height: 16, fontSize: 16}} />,
    overrides: {
      fillColorToken: '--ld-semantic-color-filter-fill-hovered',
      borderColorToken: '--ld-semantic-color-filter-border-hovered',
      borderWidthValue: '--ld-semantic-scale-borderwidth-interactive-hovered',
    },
  },
  {
    key: 'focus',
    label: 'Focused (unselected)',
    wrapperClassName: 'focus',
    selectionIndicator: false,
    leading: <Icon name="Tag" decorative style={{width: 16, height: 16, fontSize: 16}} />,
    overrides: {
      fillColorToken: '--ld-semantic-color-filter-fill-focused',
      borderColorToken: '--ld-semantic-color-filter-border-focused',
      borderWidthValue: '--ld-semantic-scale-borderwidth-interactive-focused',
    },
  },
  {
    key: 'pressed',
    label: 'Pressed (unselected)',
    wrapperClassName: 'active',
    selectionIndicator: false,
    leading: <Icon name="Tag" decorative style={{width: 16, height: 16, fontSize: 16}} />,
    overrides: {
      fillColorToken: '--ld-semantic-color-filter-fill-pressed',
      borderColorToken: '--ld-semantic-color-filter-border-pressed',
      borderWidthValue: '--ld-semantic-scale-borderwidth-interactive-pressed',
    },
  },
  {
    key: 'disabled',
    label: 'Disabled (unselected)',
    disabled: true,
    selectionIndicator: false,
    leading: <Icon name="Tag" decorative style={{width: 16, height: 16, fontSize: 16}} />,
    overrides: {
      fillColorToken: '--ld-semantic-color-filter-fill-disabled',
      borderColorToken: '--ld-semantic-color-filter-border-disabled',
      borderWidthValue: '--ld-semantic-scale-borderwidth-interactive',
      textColorToken: '--ld-semantic-color-filter-text-onFill-disabled',
      leadingIconColorToken: '--ld-semantic-color-filter-text-onFill-disabled',
      indicatorColorToken: 'none',
    },
  },
  {
    key: 'selected',
    label: 'Enabled (selected)',
    selected: true,
    selectionIndicator: false,
    leading: <Icon name="Tag" decorative style={{width: 16, height: 16, fontSize: 16}} />,
    overrides: {
      fillColorToken: '--ld-semantic-color-filter-fill-activated',
      borderColorToken: '--ld-semantic-color-filter-border-activated',
      borderWidthValue: '--ld-semantic-scale-borderwidth-interactive-activated',
      leadingIconColorToken: '--ld-semantic-color-filter-text-onFill',
      indicatorColorToken: 'none',
    },
  },
  {
    key: 'selected-hover',
    label: 'Hovered (selected)',
    selected: true,
    selectionIndicator: false,
    leading: <Icon name="Tag" decorative style={{width: 16, height: 16, fontSize: 16}} />,
    wrapperClassName: 'hover',
    overrides: {
      fillColorToken: '--ld-semantic-color-filter-fill-activated-hovered',
      borderColorToken: '--ld-semantic-color-filter-border-activated-hovered',
      borderWidthValue: '--ld-semantic-scale-borderwidth-interactive-activated-hovered',
      leadingIconColorToken: '--ld-semantic-color-filter-text-onFill',
      indicatorColorToken: 'none',
    },
  },
  {
    key: 'selected-focus',
    label: 'Focused (selected)',
    selected: true,
    selectionIndicator: false,
    leading: <Icon name="Tag" decorative style={{width: 16, height: 16, fontSize: 16}} />,
    wrapperClassName: 'focus',
    overrides: {
      fillColorToken: '--ld-semantic-color-filter-fill-activated-focused',
      borderColorToken: '--ld-semantic-color-filter-border-activated-focused',
      borderWidthValue: '--ld-semantic-scale-borderwidth-interactive-activated-focused',
      leadingIconColorToken: '--ld-semantic-color-filter-text-onFill',
      indicatorColorToken: 'none',
    },
  },
  {
    key: 'selected-pressed',
    label: 'Pressed (selected)',
    selected: true,
    selectionIndicator: false,
    leading: <Icon name="Tag" decorative style={{width: 16, height: 16, fontSize: 16}} />,
    wrapperClassName: 'active',
    overrides: {
      fillColorToken: '--ld-semantic-color-filter-fill-activated-pressed',
      borderColorToken: '--ld-semantic-color-filter-border-activated-pressed',
      borderWidthValue: '--ld-semantic-scale-borderwidth-interactive-activated-pressed',
      leadingIconColorToken: '--ld-semantic-color-filter-text-onFill',
      indicatorColorToken: 'none',
    },
  },
  {
    key: 'disabled-selected',
    label: 'Disabled (selected)',
    disabled: true,
    selected: true,
    selectionIndicator: false,
    leading: <Icon name="Tag" decorative style={{width: 16, height: 16, fontSize: 16}} />,
    overrides: {
      fillColorToken: '--ld-semantic-color-filter-fill-disabled',
      borderColorToken: '--ld-semantic-color-filter-border-activated-disabled',
      borderWidthValue: '--ld-semantic-scale-borderwidth-interactive-activated',
      textColorToken: '--ld-semantic-color-filter-text-onFill-disabled',
      leadingIconColorToken: '--ld-semantic-color-filter-text-onFill-disabled',
      indicatorColorToken: 'none',
    },
  },
  {
    key: 'selected-with-indicator',
    label: 'Selected with checkmark indicator',
    selected: true,
    selectionIndicator: true,
    overrides: {
      borderWidthValue: '--ld-semantic-scale-borderwidth-interactive-activated',
      indicatorColorToken: '--ld-semantic-color-filter-text-onFill',
    },
  },
];

const CHIP_TOKEN_ROWS: ChipTokenRow[] = [
  {part: 'Container', attribute: 'Fill color', tokenKey: 'fillColorToken'},
  {part: 'Container', attribute: 'Border color', tokenKey: 'borderColorToken'},
  {part: 'Container', attribute: 'Border width', tokenKey: 'borderWidthValue'},
  {part: 'Container', attribute: 'Border radius', tokenKey: 'borderRadiusValue'},
  {part: 'Label text', attribute: 'Color', tokenKey: 'textColorToken'},
  {part: 'Label text', attribute: 'Font size', tokenKey: 'fontSizeValue'},
  {part: 'Label text', attribute: 'Font weight', tokenKey: 'fontWeightValue'},
  {part: 'Label text', attribute: 'Line height', tokenKey: 'lineHeightValue'},
  {
    part: 'Leading icon',
    attribute: 'Color',
    tokenKey: 'leadingIconColorToken',
    visibleInState: (state) => Boolean(state.leading),
  },
  {
    part: 'Selection indicator',
    attribute: 'Color',
    tokenKey: 'indicatorColorToken',
    visibleInState: (state) => Boolean(state.selected && state.selectionIndicator && !state.leading),
  },
];

const CHIP_SIZE_SPACE_STATES: ChipSizeSpaceState[] = [
  {key: 'small-no-icons', label: 'Small (no icons)', size: 'small', withIcons: false},
  {key: 'small-with-icons', label: 'Small (with icons)', size: 'small', withIcons: true},
  {key: 'medium-no-icons', label: 'Medium (no icons)', size: 'medium', withIcons: false},
  {key: 'medium-with-icons', label: 'Medium (with icons)', size: 'medium', withIcons: true},
  {key: 'large-no-icons', label: 'Large (no icons)', size: 'large', withIcons: false},
  {key: 'large-with-icons', label: 'Large (with icons)', size: 'large', withIcons: true},
];

const CHIP_SIZE_SPACE_ROWS: ChipSizeSpaceTokenRow[] = [
  {part: 'Container', attribute: 'Height', tokenKey: 'height'},
  {part: 'Container', attribute: 'Padding: Top/Bottom', tokenKey: 'paddingBlock'},
  {part: 'Container', attribute: 'Padding: Left/Right', tokenKey: 'paddingInline'},
  {
    part: 'Container',
    attribute: 'Padding: Left/Right',
    tokenKey: 'iconPaddingReduction',
    visibleInState: (state) => state.withIcons,
  },
  {
    part: 'Content',
    attribute: 'Gap between icon and label',
    tokenKey: 'gap',
    visibleInState: (state) => state.withIcons,
  },
  {
    part: 'Icon',
    attribute: 'Size',
    tokenKey: 'iconSize',
    visibleInState: (state) => state.withIcons,
  },
];

const CHIP_SIZE_SPACE_TOKEN_POOL = [
  '--ld-semantic-spacing-25',
  '--ld-semantic-spacing-50',
  '--ld-semantic-spacing-100',
  '--ld-semantic-spacing-150',
  '--ld-semantic-spacing-200',
  '--ld-semantic-spacing-300',
  '--ld-semantic-spacing-400',
  '--ld-semantic-spacing-500',
  '--ld-semantic-scale-icon-small',
  '--ld-semantic-scale-icon-medium',
];

function getChipSizeSpaceToken(state: ChipSizeSpaceState, tokenKey: ChipSizeSpaceTokenRow['tokenKey']): string {
  const bySize: Record<ChipSize, {height: string; paddingBlock: string; paddingInline: string; gap: string; iconSize: string}> = {
    small: {
      height: '--ld-semantic-spacing-300',
      paddingBlock: '--ld-semantic-spacing-25',
      paddingInline: '--ld-semantic-spacing-100',
      gap: '--ld-semantic-spacing-50',
      iconSize: '--ld-semantic-scale-icon-small',
    },
    medium: {
      height: '--ld-semantic-spacing-400',
      paddingBlock: '--ld-semantic-spacing-50',
      paddingInline: '--ld-semantic-spacing-150',
      gap: '--ld-semantic-spacing-100',
      iconSize: '--ld-semantic-scale-icon-small',
    },
    large: {
      height: '--ld-semantic-spacing-500',
      paddingBlock: '--ld-semantic-spacing-100',
      paddingInline: '--ld-semantic-spacing-200',
      gap: '--ld-semantic-spacing-150',
      iconSize: '--ld-semantic-scale-icon-medium',
    },
  };

  const sizeTokens = bySize[state.size];
  if (tokenKey === 'height') return sizeTokens.height;
  if (tokenKey === 'paddingBlock') return sizeTokens.paddingBlock;
  if (tokenKey === 'paddingInline') return sizeTokens.paddingInline;
  if (tokenKey === 'gap') return sizeTokens.gap;
  if (tokenKey === 'iconSize') return sizeTokens.iconSize;
  return '--ld-semantic-spacing-50';
}

function getEffectiveTokens(state: ChipSpecState): Record<ChipTokenKey, string> {
  return {...CHIP_BASE_TOKENS, ...(state.overrides ?? {})};
}

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

function formatValue(tokenOrValue: string, resolvedValue: string): string {
  if (tokenOrValue.startsWith('--')) {
    if (tokenOrValue.includes('color')) {
      return toHexColor(resolvedValue);
    }
    if (
      tokenOrValue.includes('width') ||
      tokenOrValue.includes('radius') ||
      tokenOrValue.includes('size') ||
      tokenOrValue.includes('height') ||
      tokenOrValue.includes('line-height')
    ) {
      return formatLengthValue(resolvedValue);
    }
    return resolvedValue;
  }

  return formatLengthValue(tokenOrValue);
}

function useResolvedTokenMap() {
  const [map, setMap] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const recalc = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};

      for (const state of CHIP_SPEC_STATES) {
        const effective = getEffectiveTokens(state);
        for (const row of CHIP_TOKEN_ROWS) {
          const token = effective[row.tokenKey];
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

  const onCopy = async () => {
    if (!isToken || typeof navigator === 'undefined' || !navigator.clipboard) return;
    await navigator.clipboard.writeText(token);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
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

function useResolvedStaticTokenMap(tokens: string[]) {
  const [map, setMap] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const recalc = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};

      for (const token of tokens) {
        if (!token.startsWith('--')) continue;
        next[token] = resolveTokenValue(token, rootStyles);
      }

      setMap(next);
    };

    recalc();
    const onThemeChange = () => recalc();
    window.addEventListener('ld-kit-theme-change', onThemeChange);
    return () => window.removeEventListener('ld-kit-theme-change', onThemeChange);
  }, [tokens]);

  return map;
}

function ChipTokenMappingTable() {
  const resolvedTokenMap = useResolvedTokenMap();

  const rowsByState = CHIP_SPEC_STATES.map((state, stateIndex) => {
    const current = getEffectiveTokens(state);
    const previousState = stateIndex > 0 ? CHIP_SPEC_STATES[stateIndex - 1] : null;
    const previous = previousState ? getEffectiveTokens(previousState) : null;

    const changedRows = CHIP_TOKEN_ROWS.filter((row) => {
      const visibleInCurrent = row.visibleInState ? row.visibleInState(state) : true;
      if (!visibleInCurrent) return false;
      if (!previousState || !previous) return true;

      const visibleInPrevious = row.visibleInState ? row.visibleInState(previousState) : true;
      if (!visibleInPrevious) return true;

      return current[row.tokenKey] !== previous[row.tokenKey];
    });

    return {state, current, rows: changedRows};
  });

  const getPartRowSpan = (rows: ChipTokenRow[], rowIndex: number) => {
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
        Rows are consolidated by token changes versus the previous state. Token chips and copy actions are shown only
        for real CSS variable tokens.
      </Body>
      <table
        style={{
          width: '100%',
          minWidth: 1150,
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
          {rowsByState.map(({state, current, rows}) => {
            if (rows.length === 0) {
              return (
                <tr key={`${state.key}-no-changes`}>
                  <td style={tokenTableStateCellStyle}>
                    <Body as="p" size="small" weight="alt" style={{margin: 0}}>
                      {state.label}
                    </Body>
                  </td>
                  <td style={tokenTablePreviewCellStyle}>
                    <Chip
                      size="medium"
                      UNSAFE_className={state.wrapperClassName}
                      selected={Boolean(state.selected)}
                      disabled={Boolean(state.disabled)}
                      selectionIndicator={Boolean(state.selectionIndicator)}
                      leading={state.leading}
                      trailing={state.trailing}
                      onClick={() => {}}
                    >
                      Chip label
                    </Chip>
                  </td>
                  <td style={tokenTableCellStyle}>No token change</td>
                  <td style={tokenTableCellStyle}>-</td>
                  <td style={tokenTableCellStyle}><span style={{fontSize: 13}}>N/A</span></td>
                  <td style={tokenTableCellStyle}><span style={{fontSize: 13}}>N/A</span></td>
                </tr>
              );
            }

            return rows.map((row, rowIndex) => {
              const tokenOrValue = current[row.tokenKey];
              const isToken = tokenOrValue.startsWith('--');
              const rawValue = isToken ? (resolvedTokenMap[tokenOrValue] ?? '...') : tokenOrValue;
              const value = rawValue === '...' ? rawValue : formatValue(tokenOrValue, rawValue);
              const hasColorSwatch =
                isToken &&
                tokenOrValue.includes('color') &&
                /^#([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(value);

              const showPartCell = rowIndex === 0 || rows[rowIndex - 1].part !== row.part;
              const partRowSpan = showPartCell ? getPartRowSpan(rows, rowIndex) : 0;

              return (
                <tr key={`${state.key}-${row.part}-${row.attribute}`}>
                  {rowIndex === 0 && (
                    <td rowSpan={rows.length} style={tokenTableStateCellStyle}>
                      <Body as="p" size="small" weight="alt" style={{margin: 0}}>
                        {state.label}
                      </Body>
                    </td>
                  )}
                  {rowIndex === 0 && (
                    <td rowSpan={rows.length} style={tokenTablePreviewCellStyle}>
                      <Chip
                        size="medium"
                        UNSAFE_className={state.wrapperClassName}
                        selected={Boolean(state.selected)}
                        disabled={Boolean(state.disabled)}
                        selectionIndicator={Boolean(state.selectionIndicator)}
                        leading={state.leading}
                        trailing={state.trailing}
                        onClick={() => {}}
                      >
                        Chip label
                      </Chip>
                    </td>
                  )}
                  {showPartCell && (
                    <td rowSpan={partRowSpan} style={tokenTableCellStyle}>
                      {row.part}
                    </td>
                  )}
                  <td style={tokenTableCellStyle}>{row.attribute}</td>
                  <td style={tokenTableCellStyle}>
                    {isToken ? (
                      <span style={{display: 'inline-flex', alignItems: 'center', gap: 6}}>
                        <code style={tokenCodeChipStyle}>{tokenOrValue}</code>
                        <CopyTokenButton token={tokenOrValue} />
                      </span>
                    ) : (
                      <span style={{fontSize: 13, color: 'var(--ld-semantic-color-text-subtle, #74767c)'}}>{tokenOrValue}</span>
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
            });
          })}
        </tbody>
      </table>
    </div>
  );
}

function ChipSizeSpaceTokenMappingTable() {
  const resolvedTokenMap = useResolvedStaticTokenMap(CHIP_SIZE_SPACE_TOKEN_POOL);

  const rowsByState = CHIP_SIZE_SPACE_STATES.map((state, stateIndex) => {
    const previousState = stateIndex > 0 ? CHIP_SIZE_SPACE_STATES[stateIndex - 1] : null;
    const canDiffAgainstPrevious = Boolean(previousState && previousState.size === state.size);

    const rows = CHIP_SIZE_SPACE_ROWS.filter((row) => {
      const visibleInCurrent = row.visibleInState ? row.visibleInState(state) : true;
      if (!visibleInCurrent) return false;

      if (!canDiffAgainstPrevious || !previousState) return true;

      const visibleInPrevious = row.visibleInState ? row.visibleInState(previousState) : true;
      if (!visibleInPrevious) return true;

      const currentToken = getChipSizeSpaceToken(state, row.tokenKey);
      const previousToken = getChipSizeSpaceToken(previousState, row.tokenKey);
      return currentToken !== previousToken;
    });

    return {state, rows};
  });

  const getPartRowSpan = (rows: ChipSizeSpaceTokenRow[], rowIndex: number) => {
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
        Enabled-state token mapping for size, spacing, and padding only.
      </Body>
      <table
        style={{
          width: '100%',
          minWidth: 1150,
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
          {rowsByState.map(({state, rows}) => {
            const iconSize = state.size === 'large' ? 24 : 16;
            const leading = state.withIcons ? <Icon name="Tag" decorative style={{width: iconSize, height: iconSize, fontSize: iconSize}} /> : undefined;
            const trailing = state.withIcons ? <Icon name="Close" decorative style={{width: iconSize, height: iconSize, fontSize: iconSize}} /> : undefined;

            if (rows.length === 0) {
              return (
                <tr key={`${state.key}-no-changes`}>
                  <td style={tokenTableStateCellStyle}>
                    <Body as="p" size="small" weight="alt" style={{margin: 0}}>
                      {state.label}
                    </Body>
                  </td>
                  <td style={tokenTablePreviewCellStyle}>
                    <Chip size={state.size} leading={leading} trailing={trailing} onClick={() => {}}>
                      Chip label
                    </Chip>
                  </td>
                  <td style={tokenTableCellStyle}>No token change</td>
                  <td style={tokenTableCellStyle}>-</td>
                  <td style={tokenTableCellStyle}><span style={{fontSize: 13}}>N/A</span></td>
                  <td style={tokenTableCellStyle}><span style={{fontSize: 13}}>N/A</span></td>
                </tr>
              );
            }

            return rows.map((row, rowIndex) => {
              const token = getChipSizeSpaceToken(state, row.tokenKey);
              const rawValue = token.startsWith('--') ? (resolvedTokenMap[token] ?? '...') : token;
              const value = rawValue === '...' ? rawValue : formatValue(token, rawValue);
              const showPartCell = rowIndex === 0 || rows[rowIndex - 1].part !== row.part;
              const partRowSpan = showPartCell ? getPartRowSpan(rows, rowIndex) : 0;

              return (
                <tr key={`${state.key}-${row.part}-${row.attribute}`}>
                  {rowIndex === 0 && (
                    <td rowSpan={rows.length} style={tokenTableStateCellStyle}>
                      <Body as="p" size="small" weight="alt" style={{margin: 0}}>
                        {state.label}
                      </Body>
                    </td>
                  )}
                  {rowIndex === 0 && (
                    <td rowSpan={rows.length} style={tokenTablePreviewCellStyle}>
                      <Chip size={state.size} leading={leading} trailing={trailing} onClick={() => {}}>
                        Chip label
                      </Chip>
                    </td>
                  )}
                  {showPartCell && (
                    <td rowSpan={partRowSpan} style={tokenTableCellStyle}>
                      {row.part}
                    </td>
                  )}
                  <td style={tokenTableCellStyle}>{row.attribute}</td>
                  <td style={tokenTableCellStyle}>
                    <span style={{display: 'inline-flex', alignItems: 'center', gap: 6}}>
                      <code style={tokenCodeChipStyle}>{token}</code>
                      <CopyTokenButton token={token} />
                    </span>
                  </td>
                  <td style={tokenTableCellStyle}><code>{value}</code></td>
                </tr>
              );
            });
          })}
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
  width: 180,
  minWidth: 180,
};

const tokenTablePreviewCellStyle: React.CSSProperties = {
  ...tokenTableCellStyle,
  width: 240,
  minWidth: 240,
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

function ChipSpecCanvas({
  title,
  size,
  withLeading,
  withTrailing,
  withSelectionIndicator,
}: {
  title: string;
  size: ChipSize;
  withLeading: boolean;
  withTrailing: boolean;
  withSelectionIndicator: boolean;
}) {
  const sizeConfig: Record<ChipSize, {height: number; horizontalPadding: number; verticalPadding: number; iconSize: number; gap: number; labelWidth: number}> = {
    small: {height: 24, horizontalPadding: 8, verticalPadding: 2, iconSize: 16, gap: 4, labelWidth: 64},
    medium: {height: 32, horizontalPadding: 12, verticalPadding: 4, iconSize: 16, gap: 8, labelWidth: 68},
    large: {height: 40, horizontalPadding: 16, verticalPadding: 8, iconSize: 24, gap: 12, labelWidth: 80},
  };

  const {height, horizontalPadding, verticalPadding, iconSize, gap, labelWidth} = sizeConfig[size];
  const borderRadius = 4;

  const leftAccessoryCount = withLeading || withSelectionIndicator ? 1 : 0;
  const rightAccessoryCount = withTrailing ? 1 : 0;
  const leftPadding = horizontalPadding - (withLeading ? 4 : 0);
  const rightPadding = horizontalPadding - (withTrailing ? 4 : 0);

  const chipWidth =
    leftPadding +
    rightPadding +
    labelWidth +
    leftAccessoryCount * iconSize +
    rightAccessoryCount * iconSize +
    (leftAccessoryCount > 0 ? gap : 0) +
    (rightAccessoryCount > 0 ? gap : 0);

  const canvasWidth = 360;
  const canvasHeight = 220;
  const chipX = (canvasWidth - chipWidth) / 2;
  const chipY = (canvasHeight - height) / 2;
  const redline = '#d92d20';

  const firstAccessoryX = chipX + leftPadding;
  const firstAccessoryY = chipY + ((height - iconSize) / 2);
  const labelX = firstAccessoryX + (leftAccessoryCount > 0 ? iconSize + gap : 0);
  const labelHeight = 20;
  const labelY = chipY + ((height - labelHeight) / 2);
  const trailingX = chipX + chipWidth - rightPadding - iconSize;

  return (
    <DocsCard
      title={title}
      description="Centered canvas redlines for key dimensions and spacing extracted from the shipped Chip implementation."
    >
      <div style={{display: 'grid', gap: 10}}>
        <div
          style={{
            overflowX: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
            borderRadius: 10,
            background:
              'linear-gradient(0deg, var(--ld-semantic-color-fill-subtle, #f5f5f6), var(--ld-semantic-color-fill-subtle, #f5f5f6))',
            padding: 10,
          }}
        >
          <svg
            width={canvasWidth}
            height={canvasHeight}
            viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
            role="img"
            aria-label={`${title} specs canvas`}
            style={{display: 'block', width: '100%', maxWidth: canvasWidth, height: 'auto', margin: '0 auto'}}
          >
            <rect x={0} y={0} width={canvasWidth} height={canvasHeight} fill="rgba(255,255,255,0.72)" rx="8" />

            <rect x={chipX} y={chipY} width={chipWidth} height={height} fill="#ffffff" stroke="#2e2f32" strokeWidth="1.5" rx={borderRadius} />

            {(withLeading || withSelectionIndicator) && (
              <rect x={firstAccessoryX} y={firstAccessoryY} width={iconSize} height={iconSize} fill="#dbeafe" stroke="#64748b" strokeWidth="1" rx="2" />
            )}

            <rect x={labelX} y={labelY} width={labelWidth} height={labelHeight} fill="transparent" stroke="#64748b" strokeDasharray="4 3" rx="2" />
            <text x={labelX + 8} y={labelY + 14} fontSize="13" fill="#2e2f32">Chip label</text>

            {withTrailing && (
              <rect x={trailingX} y={firstAccessoryY} width={iconSize} height={iconSize} fill="#dbeafe" stroke="#64748b" strokeWidth="1" rx="2" />
            )}

            <line x1={chipX} y1={chipY - 24} x2={chipX + chipWidth} y2={chipY - 24} stroke={redline} strokeWidth="1.5" />
            <line x1={chipX} y1={chipY - 29} x2={chipX} y2={chipY - 19} stroke={redline} strokeWidth="1.5" />
            <line x1={chipX + chipWidth} y1={chipY - 29} x2={chipX + chipWidth} y2={chipY - 19} stroke={redline} strokeWidth="1.5" />
            <text x={chipX + (chipWidth / 2)} y={chipY - 31} textAnchor="middle" fontSize="11" fill={redline}>W {chipWidth}px (sample)</text>

            <line x1={chipX - 22} y1={chipY} x2={chipX - 22} y2={chipY + height} stroke={redline} strokeWidth="1.5" />
            <line x1={chipX - 27} y1={chipY} x2={chipX - 17} y2={chipY} stroke={redline} strokeWidth="1.5" />
            <line x1={chipX - 27} y1={chipY + height} x2={chipX - 17} y2={chipY + height} stroke={redline} strokeWidth="1.5" />
            <text x={chipX - 30} y={chipY + (height / 2)} textAnchor="end" dominantBaseline="middle" fontSize="11" fill={redline}>H {height}px</text>

            <line x1={chipX} y1={chipY + height + 24} x2={chipX + leftPadding} y2={chipY + height + 24} stroke={redline} strokeWidth="1.5" />
            <line x1={chipX} y1={chipY + height + 29} x2={chipX} y2={chipY + height + 19} stroke={redline} strokeWidth="1.5" />
            <line x1={chipX + leftPadding} y1={chipY + height + 29} x2={chipX + leftPadding} y2={chipY + height + 19} stroke={redline} strokeWidth="1.5" />
            <text x={chipX + (leftPadding / 2)} y={chipY + height + 40} textAnchor="middle" fontSize="11" fill={redline}>Left pad {leftPadding}px</text>

            {(withLeading || withSelectionIndicator) && (
              <>
                <line x1={firstAccessoryX + iconSize} y1={chipY + height + 54} x2={labelX} y2={chipY + height + 54} stroke={redline} strokeWidth="1.5" />
                <line x1={firstAccessoryX + iconSize} y1={chipY + height + 59} x2={firstAccessoryX + iconSize} y2={chipY + height + 49} stroke={redline} strokeWidth="1.5" />
                <line x1={labelX} y1={chipY + height + 59} x2={labelX} y2={chipY + height + 49} stroke={redline} strokeWidth="1.5" />
                <text x={firstAccessoryX + iconSize + (gap / 2)} y={chipY + height + 68} textAnchor="middle" fontSize="11" fill={redline}>Gap {gap}px</text>
              </>
            )}
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
              <td style={specLabelStyle}>Container: Width</td>
              <td style={specValueStyle}>Hugged</td>
            </tr>
            <tr>
              <td style={specLabelStyle}>Container: Height</td>
              <td style={specValueStyle}>{height}px ({trimNumber(height / 16)}rem)</td>
            </tr>
            <tr>
              <td style={specLabelStyle}>Container: Padding (no icons)</td>
              <td style={specValueStyle}>
                {verticalPadding}px, {horizontalPadding}px
              </td>
            </tr>
            <tr>
              <td style={specLabelStyle}>Container: Padding (with icons)</td>
              <td style={specValueStyle}>{verticalPadding}px, {leftPadding}px</td>
            </tr>
            <tr>
              <td style={specLabelStyle}>Icons: Width/Height</td>
              <td style={specValueStyle}>{iconSize}px ({trimNumber(iconSize / 16)}rem)</td>
            </tr>
            <tr>
              <td style={specLabelStyle}>Label: Width</td>
              <td style={specValueStyle}>Hugged</td>
            </tr>
            <tr>
              <td style={specLabelStyle}>Label: Line height</td>
              <td style={specValueStyle}>{trimNumber((size === 'large' ? 24 : 20))}px ({trimNumber((size === 'large' ? 24 : 20) / 16)}rem)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsCard>
  );
}

const specLabelStyle: React.CSSProperties = {
  padding: '6px 8px',
  borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  fontWeight: 700,
};

const specValueStyle: React.CSSProperties = {
  padding: '6px 8px',
  borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
};

function toggleSelection(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export default function ChipPage() {
  const [selected, setSelected] = React.useState<string[]>(['Electronics', 'Sports']);
  const [size, setSize] = React.useState<ChipSize>('medium');
  const [isSelected, setIsSelected] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [showSelectionIndicator, setShowSelectionIndicator] = React.useState(true);
  const [showLeadingIcon, setShowLeadingIcon] = React.useState(false);
  const [showTrailingIcon, setShowTrailingIcon] = React.useState(false);

  const previewIconSize = size === 'large' ? 24 : 16;
  const leadingIcon = showLeadingIcon ? <Icon name="Plus" decorative style={{width: previewIconSize, height: previewIconSize, fontSize: previewIconSize}} /> : undefined;
  const trailingIcon = showTrailingIcon ? <Icon name="Close" decorative style={{width: previewIconSize, height: previewIconSize, fontSize: previewIconSize}} /> : undefined;

  return (
    <PageWrapper
      title="Chip"
      category="Core Components"
      description="Compact selectable controls for filters, categories, and short option sets."
    >
      <ExampleSection title="Component Configuration" description="Preview chip size, selected state, disabled state, and optional selection/leading/trailing icons.">
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Size
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Use small chips in dense rows, medium as the default utility size, and large where extra prominence and touch area are needed.
                </Body>
              </div>
              <ButtonGroup aria-label="Chip size">
                {(['small', 'medium', 'large'] as ChipSize[]).map((item) => (
                  <Button
                    key={item}
                    size="small"
                    variant={size === item ? 'primary' : 'secondary'}
                    aria-pressed={size === item}
                    onClick={() => setSize(item)}
                  >
                    {item === 'small' ? 'Small' : item === 'medium' ? 'Medium' : 'Large'}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Selected" checked={isSelected} onChange={(event) => setIsSelected(event.target.checked)} />
                <Checkbox label="Disabled" checked={isDisabled} onChange={(event) => setIsDisabled(event.target.checked)} />
                <Checkbox
                  label="Show selection indicator"
                  checked={showSelectionIndicator}
                  onChange={(event) => setShowSelectionIndicator(event.target.checked)}
                />
                <Checkbox label="Show leading icon" checked={showLeadingIcon} onChange={(event) => setShowLeadingIcon(event.target.checked)} />
                <Checkbox label="Show trailing icon" checked={showTrailingIcon} onChange={(event) => setShowTrailingIcon(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title={`${size === 'small' ? 'Small' : size === 'medium' ? 'Medium' : 'Large'} chip`} description="Configured chip preview: selected chips show a checkmark only when no leading icon is present.">
              <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
                <Chip
                  size={size}
                  selected={isSelected}
                  selectionIndicator={showSelectionIndicator}
                  disabled={isDisabled}
                  leading={leadingIcon}
                  trailing={trailingIcon}
                  onClick={() => setIsSelected((value) => !value)}
                >
                  Pickup
                </Chip>
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Selectable filters" description="Chips can select multiple filter values in a wrapping row.">
        <DocsCard title="Product filters" description="Use chip labels that are short enough to scan when the row wraps.">
          <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
            {FILTERS.map((label) => (
              <Chip
                key={label}
                selected={selected.includes(label)}
                selectionIndicator
                onClick={() => setSelected((values) => toggleSelection(values, label))}
              >
                {label}
              </Chip>
            ))}
          </div>
        </DocsCard>
      </ExampleSection>

      <ExampleSection
        title="States and sizes"
        description="Compare selected, unselected, disabled, and size states. Selection checkmarks are shown only when no leading icon is present."
      >
        <DocsGrid>
          <DocsCard title="Selection states" description="Selected chips should reflect the applied filter or option.">
            <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
              <Chip selected selectionIndicator onClick={() => {}}>Selected</Chip>
              <Chip onClick={() => {}}>Unselected</Chip>
              <Chip selected selectionIndicator disabled>Selected disabled</Chip>
              <Chip selected selectionIndicator leading={<Icon name="Tag" decorative style={{width: 16, height: 16, fontSize: 16}} />} onClick={() => {}}>
                Selected with leading icon
              </Chip>
              <Chip disabled>Disabled</Chip>
            </div>
          </DocsCard>
          <DocsCard title="Sizes" description="Use size to match density, not to create visual hierarchy between peer options.">
            <div style={{display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap'}}>
              <Chip size="small">Small</Chip>
              <Chip size="medium">Medium</Chip>
              <Chip size="large">Large</Chip>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Common use cases" description="Chips work best for compact selections and filters, not primary actions.">
        <DocsGrid>
          <DocsCard title="Tag selection" description="Use chips when users can apply multiple short tags.">
            <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
              {TAGS.map((label) => (
                <Chip
                  key={label}
                  selected={selected.includes(label)}
                  selectionIndicator
                  onClick={() => setSelected((values) => toggleSelection(values, label))}
                >
                  {label}
                </Chip>
              ))}
            </div>
          </DocsCard>
          <DocsCard title="Chip group" description="Use ChipGroup when chips are a related list of selectable options.">
            <ChipGroup aria-label="Filter options">
              {['Option 1', 'Option 2', 'Option 3'].map((label) => (
                <Chip
                  key={label}
                  selected={selected.includes(label)}
                  selectionIndicator
                  onClick={() => setSelected((values) => toggleSelection(values, label))}
                >
                  {label}
                </Chip>
              ))}
            </ChipGroup>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Token mapping"
        description="State-by-state token mapping with consolidated row diffs, merged part cells, token copy chips for real CSS variables, and formatted values."
      >
        <ChipTokenMappingTable />
      </ExampleSection>

      <ExampleSection
        title="Token mapping (size, space, and padding)"
        description="Enabled-state mapping only for size, spacing, and padding tokens across small/medium/large with and without icons."
      >
        <ChipSizeSpaceTokenMappingTable />
      </ExampleSection>

      <ExampleSection
        title="Specs"
        description="Centered redline diagrams and compact spec tables for primary Chip configurations and real implementation measurements."
      >
        <DocsGrid>
          <ChipSpecCanvas
            title="Small chip"
            size="small"
            withLeading
            withTrailing
            withSelectionIndicator={false}
          />
          <ChipSpecCanvas
            title="Medium chip"
            size="medium"
            withLeading
            withTrailing
            withSelectionIndicator={false}
          />
          <ChipSpecCanvas
            title="Large chip"
            size="large"
            withLeading
            withTrailing
            withSelectionIndicator={false}
          />
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use chips for compact filters, selections, and short option sets. Keep labels brief, allow rows to wrap, and use selected state only when it reflects an applied value. Use the optional selection indicator for selected chips without leading icons; keep meaningful leading icons intact across states, and reserve trailing icons for actions such as remove, clear, or disclose. Do not use chips as primary page actions or as non-interactive labels; use Button or Tag for those needs."
        defaultValue="size='medium', selected=false, selectionIndicator=false"
      />
    </PageWrapper>
  );
}
