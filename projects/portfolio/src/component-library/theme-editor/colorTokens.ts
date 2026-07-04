export const SCALE_STEPS = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];

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
