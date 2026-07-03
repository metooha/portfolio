import * as React from 'react';
import {useItems} from './Store';

type LogEntry = {
  id: number;
  time: string;
  topic: string;
  payload: any;
};

const MAX_ENTRIES = 100;

let _nextId = 0;

const DEVTOOLS_THEME = {
  bg: 'rgba(28, 28, 30, 0.85)',
  border: 'rgba(255, 255, 255, 0.15)',
  text: '#FFFFFF',
  textDim: 'rgba(255, 255, 255, 0.55)',
  accent: '#0A84FF',
  blur: 'blur(24px) saturate(150%)',
  shadow: '0 0 0 1px rgba(255,255,255,0.05)',
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  monoFamily: '"SF Mono", "Menlo", "Monaco", "Consolas", monospace',
};

const JsonViewer = ({ data, isLast = true }: { data: any; isLast?: boolean }) => {
  const [expanded, setExpanded] = React.useState(true);

  // VS Code dark theme colors
  const colors = {
    key: '#9CDCFE',
    string: '#CE9178',
    number: '#B5CEA8',
    keyword: '#569CD6', // boolean, null, undefined
    punctuation: '#D4D4D4',
  };

  if (data === undefined) return <span style={{ color: colors.keyword }}>undefined<span style={{ color: colors.punctuation }}>{isLast ? '' : ','}</span></span>;
  if (data === null) return <span style={{ color: colors.keyword }}>null<span style={{ color: colors.punctuation }}>{isLast ? '' : ','}</span></span>;
  if (typeof data === 'boolean') return <span style={{ color: colors.keyword }}>{data ? 'true' : 'false'}<span style={{ color: colors.punctuation }}>{isLast ? '' : ','}</span></span>;
  if (typeof data === 'number') return <span style={{ color: colors.number }}>{data}<span style={{ color: colors.punctuation }}>{isLast ? '' : ','}</span></span>;
  if (typeof data === 'string') return <span style={{ color: colors.string, wordBreak: 'break-word' }}>"{data}"<span style={{ color: colors.punctuation }}>{isLast ? '' : ','}</span></span>;

  if (Array.isArray(data)) {
    if (data.length === 0) return <span style={{ color: colors.punctuation }}>[]{isLast ? '' : ','}</span>;
    return (
      <div style={{ display: 'inline-block', width: '100%' }}>
        <span
          style={{ color: colors.punctuation, cursor: 'pointer', userSelect: 'none' }}
          onClick={() => setExpanded(!expanded)}
        >
          <span style={{ display: 'inline-block', width: 20, fontSize: 12, textAlign: 'center', opacity: 0.8, transform: 'translateY(-1px)' }}>
            {expanded ? '▼' : '▶'}
          </span>
          [
        </span>
        {expanded ? (
          <>
            <div style={{ paddingLeft: 16, borderLeft: `1px solid ${DEVTOOLS_THEME.border}`, marginLeft: 6, marginTop: 2, marginBottom: 2 }}>
              {data.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <JsonViewer data={item} isLast={i === data.length - 1} />
                  </div>
                </div>
              ))}
            </div>
            <span style={{ color: colors.punctuation, marginLeft: 14 }}>]{isLast ? '' : ','}</span>
          </>
        ) : (
          <span style={{ color: colors.punctuation, cursor: 'pointer', opacity: 0.6 }} onClick={() => setExpanded(true)}>
            {' '}... ]{isLast ? '' : ','}
          </span>
        )}
      </div>
    );
  }

  if (typeof data === 'object') {
    const keys = Object.keys(data);
    if (keys.length === 0) return <span style={{ color: colors.punctuation }}>{"{}"}{isLast ? '' : ','}</span>;
    return (
      <div style={{ display: 'inline-block', width: '100%' }}>
        <span
          style={{ color: colors.punctuation, cursor: 'pointer', userSelect: 'none' }}
          onClick={() => setExpanded(!expanded)}
        >
          <span style={{ display: 'inline-block', width: 20, fontSize: 12, textAlign: 'center', opacity: 0.8, transform: 'translateY(-1px)' }}>
            {expanded ? '▼' : '▶'}
          </span>
          {"{"}
        </span>
        {expanded ? (
          <>
            <div style={{ paddingLeft: 16, borderLeft: `1px solid ${DEVTOOLS_THEME.border}`, marginLeft: 6, marginTop: 2, marginBottom: 2 }}>
              {keys.map((key, i) => (
                <div key={key} style={{ display: 'flex', gap: 6, marginTop: 2, alignItems: 'flex-start' }}>
                  <span style={{ color: colors.key, whiteSpace: 'nowrap' }}>"{key}"<span style={{ color: colors.punctuation }}>:</span></span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <JsonViewer data={data[key]} isLast={i === keys.length - 1} />
                  </div>
                </div>
              ))}
            </div>
            <span style={{ color: colors.punctuation, marginLeft: 14 }}>{"}"}{isLast ? '' : ','}</span>
          </>
        ) : (
          <span style={{ color: colors.punctuation, cursor: 'pointer', opacity: 0.6 }} onClick={() => setExpanded(true)}>
            {' '}... {"}"}{isLast ? '' : ','}
          </span>
        )}
      </div>
    );
  }

  return <span style={{ color: colors.punctuation }}>{String(data)}</span>;
};

const ItemRow = ({ item, onRemove }: { item: any; onRemove: () => void }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: `1px solid ${DEVTOOLS_THEME.border}`,
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '60%', opacity: hover ? 0.3 : 1 }}>
        <span style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.name}
        </span>
        <span style={{ color: DEVTOOLS_THEME.textDim, fontSize: 12, fontFamily: DEVTOOLS_THEME.monoFamily }}>
          {item.sku}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, opacity: hover ? 0.3 : 1 }}>
        <span style={{ fontWeight: 500 }}>${(item.priceCents / 100).toFixed(2)}</span>
        <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
          {item.hearted && <span style={{ color: '#F14C4C' }}>♥</span>}
          {item.cartQty > 0 && <span style={{ color: DEVTOOLS_THEME.textDim }}>Qty: {item.cartQty}</span>}
          {!item.hearted && item.cartQty === 0 && <span style={{ color: DEVTOOLS_THEME.textDim }}>—</span>}
        </div>
      </div>

      {hover && (
        <button
          onClick={onRemove}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#C53929',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 6,
            padding: '6px 12px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F14C4C';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#C53929';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Remove
        </button>
      )}
    </div>
  );
};

export default function DevToolsPanel() {
  const [open, setOpen] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [tab, setTab] = React.useState<'events' | 'items'>('events');
  const [entries, setEntries] = React.useState<LogEntry[]>([]);
  const {items, favorites, cartLines, summary, unheartItem, removeFromCart} = useItems();
  const logRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onEvent = (e: Event) => {
      const d = (e as CustomEvent).detail;
      if (!d) return;

      setEntries((prev) => {
        const next = [
          ...prev,
          {
            id: _nextId++,
            time: new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'}),
            topic: d.topic ?? '?',
            payload: d.payload,
          },
        ];
        return next.length > MAX_ENTRIES ? next.slice(-MAX_ENTRIES) : next;
      });
    };

    window.addEventListener('ld-kit-event', onEvent);
    return () => {
      window.removeEventListener('ld-kit-event', onEvent);
    };
  }, []);

  React.useEffect(() => {
    if (open && tab === 'events' && logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [entries, open, tab]);

  React.useEffect(() => {
    const styleId = 'ld-devtools-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        .ld-devtools-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .ld-devtools-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .ld-devtools-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .ld-devtools-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        @keyframes ld-devtools-fade-in {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ld-devtools-panel {
          animation: ld-devtools-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const clearLog = () => setEntries([]);

  const theme = DEVTOOLS_THEME;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open DevTools"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 44,
          height: 44,
          borderRadius: 22,
          border: `1px solid ${theme.border}`,
          background: theme.bg,
          backdropFilter: theme.blur,
          WebkitBackdropFilter: theme.blur,
          color: theme.text,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: theme.shadow,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.background = 'rgba(44, 44, 46, 0.85)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.background = theme.bg;
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      </button>
    );
  }

  const allItems = Object.values(items);

  return (
    <div
      className="ld-devtools-panel"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        width: isExpanded ? 'min(80vw, 1000px)' : 420,
        height: isExpanded ? 'min(80vh, 800px)' : 480,
        background: theme.bg,
        backdropFilter: theme.blur,
        WebkitBackdropFilter: theme.blur,
        color: theme.text,
        borderRadius: 16,
        border: `1px solid ${theme.border}`,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: theme.fontFamily,
        fontSize: 13,
        boxShadow: theme.shadow,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: `1px solid ${theme.border}`,
          flexShrink: 0,
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: theme.textDim }}>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: '-0.01em' }}>GenLD DevTools</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse Panel" : "Expand Panel"}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: theme.text,
              cursor: 'pointer',
              width: 24,
              height: 24,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          >
            {isExpanded ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 14 10 14 10 20"></polyline>
                <polyline points="20 10 14 10 14 4"></polyline>
                <line x1="14" y1="10" x2="21" y2="3"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            )}
          </button>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close DevTools"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: theme.text,
              cursor: 'pointer',
              width: 24,
              height: 24,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Tab bar (Segmented Control style) */}
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${theme.border}` }}>
        <div
          style={{
            display: 'flex',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: 8,
            padding: 2,
          }}
        >
          {(['events', 'items'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: '6px 0',
                background: tab === t ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: tab === t ? theme.text : theme.textDim,
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: tab === t ? 500 : 400,
                fontFamily: 'inherit',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
                boxShadow: 'none',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {tab === 'events' ? (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          <div
            className="ld-devtools-scrollbar"
            ref={logRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'auto',
              padding: '8px 16px',
            }}
          >
            {entries.length === 0 && (
              <div style={{ color: theme.textDim, padding: '32px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                Waiting for events...
              </div>
            )}
            {entries.map((e) => (
              <div
                key={e.id}
                style={{
                  padding: '8px 0',
                  borderBottom: `1px solid ${theme.border}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  <span style={{ color: theme.textDim, fontSize: 11, fontFamily: theme.monoFamily }}>{e.time}</span>
                  <span
                    style={{
                      color: e.topic.startsWith('store:items') ? '#DCDCAA' : '#4EC9B0',
                      fontWeight: 600,
                      fontSize: 12,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {e.topic}
                  </span>
                </div>
                {e.payload !== undefined && (
                  <div
                    className="ld-devtools-scrollbar"
                    style={{
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: 6,
                      padding: 8,
                      marginTop: 6,
                      color: '#E5E5EA',
                      fontFamily: theme.monoFamily,
                      fontSize: 11,
                      lineHeight: 1.4,
                      overflowX: 'auto',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <JsonViewer data={e.payload} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div
            style={{
              padding: '12px 16px',
              borderTop: `1px solid ${theme.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0,
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            <span style={{ color: theme.textDim, fontSize: 12 }}>{entries.length} event{entries.length !== 1 ? 's' : ''} recorded</span>
            <button
              onClick={clearLog}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: theme.text,
                borderRadius: 14,
                padding: '4px 12px',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                fontFamily: 'inherit',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div className="ld-devtools-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px', minHeight: 0 }}>
          {/* Cart summary */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 16,
              padding: '16px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 12,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: theme.textDim, fontSize: 12 }}>Cart Qty</span>
              <strong style={{ fontSize: 18, fontWeight: 600, color: '#569CD6' }}>{summary.totalQty}</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
              <span style={{ color: theme.textDim, fontSize: 12 }}>Favorites</span>
              <strong style={{ fontSize: 18, fontWeight: 600, color: '#F14C4C' }}>{favorites.length}</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
              <span style={{ color: theme.textDim, fontSize: 12 }}>Subtotal</span>
              <strong style={{ fontSize: 18, fontWeight: 600, color: '#B5CEA8' }}>
                ${(summary.subtotalCents / 100).toFixed(2)}
              </strong>
            </div>
          </div>

          {allItems.length === 0 ? (
            <div style={{ color: theme.textDim, padding: '32px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              No items tracked yet
            </div>
          ) : (
            <>
              <div style={{ fontWeight: 600, marginBottom: 8, color: theme.textDim, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                All Items
              </div>
              {allItems.map((item) => (
                <ItemRow
                  key={item.sku}
                  item={item}
                  onRemove={() => {
                    removeFromCart(item.sku);
                    unheartItem(item.sku);
                  }}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
