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
  const [scopeReady, setScopeReady] = React.useState(0);
  const { dataLdTheme, overrideStyle } = React.useMemo(
    () => getPreviewThemeContext(theme),
    [theme],
  );

  const resolveToken = React.useCallback<ThemeTokenResolver>((cssVarName, fallback = '') => (
    resolveCssVarFromElement(scopeRef.current, cssVarName, fallback)
  ), [scopeReady]);

  const scopeKey = `${dataLdTheme}-${theme.id}-${theme.updatedAt ?? 0}`;

  const handleScopeRef = React.useCallback((node: HTMLDivElement | null) => {
    scopeRef.current = node;
    if (node) setScopeReady((value) => value + 1);
  }, []);

  return (
    <ThemePreviewContext.Provider value={resolveToken}>
      <div
        key={scopeKey}
        ref={handleScopeRef}
        data-ld-theme={dataLdTheme}
        className={className}
        style={{
          ...(overrideStyle as React.CSSProperties),
          ...style,
          fontFamily: 'var(--ld-primitive-font-family-sans, inherit)',
        }}
      >
        {children}
      </div>
    </ThemePreviewContext.Provider>
  );
}
