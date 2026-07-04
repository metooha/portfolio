import * as React from 'react';
import type { CustomTheme } from '@/app/components/utils/customThemes';
import { buildPrimitiveOptions, resolveCssVar, type PrimitiveColorOption } from './colorTokens';
import { ThemePreviewScope, useThemePreviewResolve, type ThemeTokenResolver } from './ThemePreviewScope';

export type ThemeEditorDraftTokenContextValue = {
  resolveToken: ThemeTokenResolver;
  primitiveOptions: PrimitiveColorOption[];
};

const ThemeEditorDraftTokenContext = React.createContext<ThemeEditorDraftTokenContextValue>({
  resolveToken: resolveCssVar,
  primitiveOptions: buildPrimitiveOptions(),
});

function DraftTokenBridge({
  draft,
  onContext,
}: {
  draft: CustomTheme;
  onContext: (value: ThemeEditorDraftTokenContextValue) => void;
}) {
  const resolveToken = useThemePreviewResolve();
  const primitiveOptions = React.useMemo(
    () => buildPrimitiveOptions(resolveToken),
    [resolveToken, draft.seeds, draft.tokenOverrides, draft.baseTheme, draft.name, draft.builtInPreset],
  );

  React.useLayoutEffect(() => {
    onContext({ resolveToken, primitiveOptions });
  }, [resolveToken, primitiveOptions, onContext]);

  return null;
}

/**
 * Supplies theme-aware token resolution for Theme Editor controls.
 * Reads primitive colors from a hidden preview scope so swatches match the
 * draft theme (including palette-generator scale overrides), without applying
 * the draft theme to editor chrome.
 */
export function ThemeEditorDraftTokenProvider({
  draft,
  children,
}: {
  draft: CustomTheme;
  children: React.ReactNode;
}) {
  const [contextValue, setContextValue] = React.useState<ThemeEditorDraftTokenContextValue>(() => ({
    resolveToken: resolveCssVar,
    primitiveOptions: buildPrimitiveOptions(),
  }));

  const handleContext = React.useCallback((value: ThemeEditorDraftTokenContextValue) => {
    setContextValue(value);
  }, []);

  return (
    <ThemeEditorDraftTokenContext.Provider value={contextValue}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <ThemePreviewScope theme={draft}>
          <DraftTokenBridge draft={draft} onContext={handleContext} />
        </ThemePreviewScope>
      </div>
      {children}
    </ThemeEditorDraftTokenContext.Provider>
  );
}

export function useThemeEditorDraftTokens(): ThemeEditorDraftTokenContextValue {
  return React.useContext(ThemeEditorDraftTokenContext);
}
