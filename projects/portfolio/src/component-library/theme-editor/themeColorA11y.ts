import { contrastRatio, parseHex } from '@/app/components/utils/colorUtils';
import { resolveSemanticToken } from './colorTokens';
import type { ThemeTokenResolver } from './ThemePreviewScope';

export type ThemeContrastIssue = {
  id: string;
  label: string;
  foreground: string;
  background: string;
  ratio: number;
  minRatio: number;
};

type ContrastPairCheck = {
  id: string;
  label: string;
  foregroundToken: string;
  backgroundToken: string;
  minRatio: number;
};

/** Pairs exercised by Theme Editor component preview (badges, tags, alerts, buttons). */
const PREVIEW_CONTRAST_CHECKS: ContrastPairCheck[] = [
  {
    id: 'badge-green',
    label: 'Green badge text',
    foregroundToken: '--ld-semantic-color-text-inverse',
    backgroundToken: '--ld-semantic-color-fill-accent-green',
    minRatio: 4.5,
  },
  {
    id: 'badge-red',
    label: 'Red badge text',
    foregroundToken: '--ld-semantic-color-text-inverse',
    backgroundToken: '--ld-semantic-color-fill-accent-red',
    minRatio: 4.5,
  },
  {
    id: 'badge-yellow',
    label: 'Yellow badge text',
    foregroundToken: '--ld-semantic-color-text',
    backgroundToken: '--ld-semantic-color-fill-accent-yellow',
    minRatio: 4.5,
  },
  {
    id: 'badge-spark',
    label: 'Spark badge text',
    foregroundToken: '--ld-semantic-color-text',
    backgroundToken: '--ld-semantic-color-fill-accent-spark',
    minRatio: 4.5,
  },
  {
    id: 'tag-positive-secondary',
    label: 'Positive tag (secondary)',
    foregroundToken: '--ld-semantic-color-text-accent-green',
    backgroundToken: '--ld-semantic-color-fill',
    minRatio: 4.5,
  },
  {
    id: 'tag-positive-tertiary',
    label: 'Positive tag (tertiary)',
    foregroundToken: '--ld-semantic-color-text-accent-green-bold',
    backgroundToken: '--ld-semantic-color-fill-accent-green-subtle',
    minRatio: 4.5,
  },
  {
    id: 'tag-negative-secondary',
    label: 'Negative tag (secondary)',
    foregroundToken: '--ld-semantic-color-text-accent-red',
    backgroundToken: '--ld-semantic-color-fill',
    minRatio: 4.5,
  },
  {
    id: 'tag-warning-secondary',
    label: 'Warning tag (secondary)',
    foregroundToken: '--ld-semantic-color-text-accent-spark',
    backgroundToken: '--ld-semantic-color-fill',
    minRatio: 4.5,
  },
  {
    id: 'alert-success',
    label: 'Success alert text',
    foregroundToken: '--ld-semantic-color-text-positive',
    backgroundToken: '--ld-semantic-color-fill-positive-subtle',
    minRatio: 4.5,
  },
  {
    id: 'alert-error',
    label: 'Error alert text',
    foregroundToken: '--ld-semantic-color-text-negative',
    backgroundToken: '--ld-semantic-color-fill-negative-subtle',
    minRatio: 4.5,
  },
  {
    id: 'alert-warning',
    label: 'Warning alert text',
    foregroundToken: '--ld-semantic-color-text-warning',
    backgroundToken: '--ld-semantic-color-fill-warning-subtle',
    minRatio: 4.5,
  },
  {
    id: 'button-primary',
    label: 'Primary button label',
    foregroundToken: '--ld-semantic-color-text-onFill',
    backgroundToken: '--ld-semantic-color-action-fill-primary',
    minRatio: 4.5,
  },
];

function parseResolvedColor(value: string): string | null {
  const trimmed = value.trim();
  const hex = parseHex(trimmed);
  if (hex) return hex;

  const rgbMatch = trimmed.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*[\d.]+)?\s*\)$/i,
  );
  if (!rgbMatch) return null;

  const toHex = (channel: string) => {
    const n = Math.round(Math.max(0, Math.min(255, Number(channel))));
    return n.toString(16).padStart(2, '0');
  };

  return `#${toHex(rgbMatch[1])}${toHex(rgbMatch[2])}${toHex(rgbMatch[3])}`;
}

function resolvePairColor(
  token: string,
  resolveToken: ThemeTokenResolver,
): string | null {
  const resolved = resolveSemanticToken(token, resolveToken, {});
  return parseResolvedColor(resolved);
}

export function getThemeContrastIssues(resolveToken: ThemeTokenResolver): ThemeContrastIssue[] {
  const issues: ThemeContrastIssue[] = [];

  for (const check of PREVIEW_CONTRAST_CHECKS) {
    const foreground = resolvePairColor(check.foregroundToken, resolveToken);
    const background = resolvePairColor(check.backgroundToken, resolveToken);

    if (!foreground || !background) continue;

    const ratio = contrastRatio(foreground, background);
    if (ratio < check.minRatio) {
      issues.push({
        id: check.id,
        label: check.label,
        foreground,
        background,
        ratio,
        minRatio: check.minRatio,
      });
    }
  }

  return issues;
}

export function formatThemeContrastAnnouncement(issues: ThemeContrastIssue[]): string {
  if (issues.length === 0) return '';
  const summary = issues
    .map((issue) => `${issue.label} (${issue.ratio.toFixed(1)}:1, needs ${issue.minRatio}:1)`)
    .join('. ');
  return issues.length === 1
    ? `Color contrast issue: ${summary}`
    : `${issues.length} color contrast issues: ${summary}`;
}
