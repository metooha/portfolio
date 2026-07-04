import * as React from 'react';
import {
  getPreviewThemeContext,
  type CustomTheme,
} from '@/app/components/utils/customThemes';
import { resolveCssVar, resolveCssVarFromElement } from './colorTokens';

export type ThemeTokenResolver = (cssVarName: string, fallback?: string) => string;

const ThemePreviewContext = React.createContext<ThemeTokenResolver | null>(null);

export function useThemePreviewResolve(): ThemeTokenResolver {
  const scopedResolve = React.useContext(ThemePreviewContext);
  return scopedResolve ?? resolveCssVar;
}

export function ThemePreviewScope({
  theme,
  children,
  style,
  className,
}: {
  theme: CustomTheme;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const scopeRef = React.useRef<HTMLDivElement>(null);
  const scopeId = React.useId().replace(/:/g, '');
  const { dataLdTheme, overrideStyle } = React.useMemo(
    () => getPreviewThemeContext(theme),
    [theme],
  );

  const overrideCss = React.useMemo(
    () => Object.entries(overrideStyle)
      .map(([token, value]) => `  ${token}: ${value};`)
      .join('\n'),
    [overrideStyle],
  );

  const resolveToken = React.useCallback<ThemeTokenResolver>((cssVarName, fallback = '') => (
    resolveCssVarFromElement(scopeRef.current, cssVarName, fallback)
  ), []);

  const scopeKey = `${dataLdTheme}-${theme.id}-${theme.updatedAt ?? 0}`;

  return (
    <ThemePreviewContext.Provider value={resolveToken}>
      <div
        key={scopeKey}
        ref={scopeRef}
        data-ld-theme={dataLdTheme}
        data-theme-preview-scope={scopeId}
        className={className}
        style={{ ...style, fontFamily: 'var(--ld-primitive-font-family-sans, inherit)' }}
      >
        {overrideCss.length > 0 && (
          <style>{`[data-theme-preview-scope="${scopeId}"] {\n${overrideCss}\n}`}</style>
        )}
        {children}
      </div>
    </ThemePreviewContext.Provider>
  );
}
