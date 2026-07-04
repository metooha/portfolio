import * as React from 'react';
import { Alert, Body } from '@/app/components';
import { useAnnounce } from '@/app/components/A11yAnnouncement';
import type { CustomTheme } from '@/app/components/utils/customThemes';
import {
  formatThemeContrastAnnouncement,
  getThemeContrastIssues,
  type ThemeContrastIssue,
} from './themeColorA11y';
import { useThemePreviewResolve } from './ThemePreviewScope';

function issuesSignature(issues: ThemeContrastIssue[]): string {
  return issues.map((issue) => `${issue.id}:${issue.ratio.toFixed(2)}`).join('|');
}

/**
 * Watches resolved theme tokens inside a preview scope and surfaces WCAG
 * contrast failures for badges, tags, alerts, and buttons shown in the
 * component preview.
 */
export function ThemeColorA11yMonitor({ theme }: { theme: CustomTheme }) {
  const resolveToken = useThemePreviewResolve();
  const announce = useAnnounce();
  const lastAnnouncedRef = React.useRef('');
  const [issues, setIssues] = React.useState<ThemeContrastIssue[]>([]);

  React.useLayoutEffect(() => {
    setIssues(getThemeContrastIssues(resolveToken));
  }, [
    resolveToken,
    theme.seeds,
    theme.tokenOverrides,
    theme.baseTheme,
    theme.name,
    theme.builtInPreset,
  ]);

  const signature = issuesSignature(issues);

  React.useEffect(() => {
    if (signature === lastAnnouncedRef.current) return;
    lastAnnouncedRef.current = signature;

    if (issues.length === 0) return;
    announce.polite(formatThemeContrastAnnouncement(issues));
  }, [issues, signature, announce]);

  if (issues.length === 0) return null;

  return (
    <Alert variant="warning">
      <Body as="p" size="small" style={{ margin: 0 }}>
        {issues.length === 1 ? '1 contrast issue' : `${issues.length} contrast issues`}
        {' '}in preview components (WCAG AA 4.5:1):
        {' '}
        {issues.map((issue) => issue.label).join(', ')}
        .
      </Body>
    </Alert>
  );
}
