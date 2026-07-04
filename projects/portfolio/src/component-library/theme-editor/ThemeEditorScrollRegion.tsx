import * as React from 'react';

export function ThemeEditorScrollRegion({
  children,
  a11yLabel = 'Scrollable content',
  rootStyle,
  style,
}: {
  children: React.ReactNode;
  a11yLabel?: string;
  rootStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}) {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleScroll = React.useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    el.classList.add('is-scrolling');
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      el.classList.remove('is-scrolling');
    }, 700);
  }, []);

  React.useEffect(() => () => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
  }, []);

  return (
    <div className="theme-editor-scroll-root" style={rootStyle}>
      <div
        ref={viewportRef}
        className="theme-editor-scroll-viewport"
        tabIndex={0}
        role="group"
        aria-label={a11yLabel}
        onScroll={handleScroll}
        style={style}
      >
        {children}
      </div>
    </div>
  );
}
