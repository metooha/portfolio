import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Badge} from '@/app/components/Badge/Badge';
import {ChevronDownIcon} from '@/app/components/Icons/Icons';
import {THEME_PRESETS, THEME_FONT_CONFIG, getTheme, setTheme, getMegaMode, setMegaMode, MEGA_CHANGE_EVENT, getCustomThemeNames, getThemePrimaryColor} from '@/app/components/utils/themeManager';
import {getCustomTheme, CUSTOM_THEMES_EVENT} from '@/app/components/utils/customThemes';
import themeIconMap from '@/app/assets/walmart-assets/fonts/theme-icon-map.json';
import {navigationSections, navigationTopItems} from './pages';

const SIDE_NAV_STORAGE_KEY = 'ld-kit-nav-sections';

// Restrict route ids used in href to a safe, fragment-only character set.
// Prevents any non-anchor characters from flowing into the href attribute.
const sanitizeFragmentId = (id: string): string => id.replace(/[^a-zA-Z0-9_-]/g, '');

function LibraryNavList({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <nav aria-label={label}>
      <ul style={{display: 'grid', gap: '2px', listStyle: 'none', margin: 0, padding: 0}}>
        {children}
      </ul>
    </nav>
  );
}

function LibraryNavItem({
  href,
  isCurrent,
  onClick,
  children,
}: {
  href: string;
  isCurrent: boolean;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        aria-current={isCurrent ? 'page' : undefined}
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '32px',
          borderRadius: '6px',
          padding: '6px 12px',
          color: isCurrent ? '#004f9a' : '#2E2F32',
          background: isCurrent ? '#E6F1FC' : 'transparent',
          fontSize: '13px',
          fontWeight: isCurrent ? 700 : 500,
          lineHeight: 1.3,
          textDecoration: 'none',
        }}
      >
        {children}
      </a>
    </li>
  );
}

/* ── Extras menu (… overflow on the theme footer) ────────────────
 * Add new options by appending to `extrasOptions` inside AppNav.
 * No JSX edits needed — `ExtrasMenuItem` renders each variant. */
type ExtrasOption =
  | { type: 'heading'; id: string; label: string }
  | { type: 'divider' }
  | { type: 'toggle'; id: string; label: string; checked: boolean; onChange: (next: boolean) => void };

function ExtrasMenuItem({option}: {option: ExtrasOption}) {
  if (option.type === 'divider') {
    return <div role="separator" style={{ height: 1, background: '#EEEEF0', margin: '4px 0' }} />;
  }
  if (option.type === 'heading') {
    return (
      <div
        style={{
          padding: '6px 8px 2px',
          fontSize: '10px',
          fontWeight: 700,
          color: '#9CA0A6',
          textTransform: 'uppercase',
          letterSpacing: '0.4px',
        }}
      >
        {option.label}
      </div>
    );
  }
  return (
    <label
      role="menuitemcheckbox"
      aria-checked={option.checked}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        padding: '6px 8px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 500,
        color: '#2E2F32',
      }}
    >
      <span>{option.label}</span>
      <input
        type="checkbox"
        checked={option.checked}
        onChange={(e) => option.onChange(e.target.checked)}
        style={{ margin: 0, cursor: 'pointer' }}
        aria-label={`Toggle ${option.label}`}
      />
    </label>
  );
}

const FONT_DISPLAY_NAMES: Record<string, string> = {
  'inter': 'Inter',
  'maax': 'Maax',
  'calibre': 'Calibre R',
  'tt-commons': 'TT Commons Classic',
  'everyday-sans': 'Everyday Sans UI',
  'gibson': 'Gibson',
  'bogle': 'Bogle',
};

interface AppNavProps {
  currentRoute: string;
  navigate: (route: string) => void;
  /** Offset from the top of the viewport (e.g. admin header height). */
  topOffset?: number;
  /** When true, the nav renders as a fixed slide-in drawer with backdrop
   *  instead of an inline sticky sidebar. Used below the `large` breakpoint. */
  isDrawer?: boolean;
  /** Drawer open state (only relevant when isDrawer). */
  isOpen?: boolean;
  /** Called when the user dismisses the drawer (backdrop click / Escape). */
  onClose?: () => void;
}

export default function AppNav({currentRoute, navigate, topOffset = 0, isDrawer = false, isOpen = false, onClose}: AppNavProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeTheme, setActiveTheme] = React.useState(() => getTheme());
  const [customThemeNames, setCustomThemeNames] = React.useState<string[]>(() => getCustomThemeNames());
  // Custom themes have no built-in preset; resolve their swatch color separately.
  const activePreset = THEME_PRESETS[activeTheme] ?? { primaryColor: getThemePrimaryColor(activeTheme) };
  // For font/icon labels, custom themes report their base theme's fonts.
  const effectiveThemeKey = (THEME_FONT_CONFIG[activeTheme as keyof typeof THEME_FONT_CONFIG]
    ? activeTheme
    : getCustomTheme(activeTheme)?.baseTheme ?? 'Walmart') as keyof typeof THEME_FONT_CONFIG;
  const [megaMode, setMegaModeState] = React.useState(() => getMegaMode());
  const [showExtras, setShowExtras] = React.useState(false);
  const extrasRef = React.useRef<HTMLDivElement | null>(null);
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(() => {
    const defaultSections = navigationSections.reduce((acc, section) => {
      acc[section.id] = true;
      return acc;
    }, {} as Record<string, boolean>);

    try {
      const storedSections = window.localStorage.getItem(SIDE_NAV_STORAGE_KEY);
      if (!storedSections) {
        return defaultSections;
      }

      return {
        ...defaultSections,
        ...JSON.parse(storedSections),
      };
    } catch {
      return defaultSections;
    }
  });

  React.useEffect(() => {
    const onThemeChange = (e: Event) => {
      const name = (e as CustomEvent).detail?.theme;
      if (typeof name === 'string' && name) setActiveTheme(name);
    };
    window.addEventListener('ld-kit-theme-change', onThemeChange);
    return () => window.removeEventListener('ld-kit-theme-change', onThemeChange);
  }, []);

  React.useEffect(() => {
    const onCustomThemes = () => setCustomThemeNames(getCustomThemeNames());
    window.addEventListener(CUSTOM_THEMES_EVENT, onCustomThemes);
    return () => window.removeEventListener(CUSTOM_THEMES_EVENT, onCustomThemes);
  }, []);

  React.useEffect(() => {
    const onMegaChange = (e: Event) => {
      const enabled = (e as CustomEvent).detail?.enabled;
      if (typeof enabled === 'boolean') setMegaModeState(enabled);
    };
    window.addEventListener(MEGA_CHANGE_EVENT, onMegaChange);
    return () => window.removeEventListener(MEGA_CHANGE_EVENT, onMegaChange);
  }, []);

  React.useEffect(() => {
    if (!showExtras) return;
    const onPointer = (e: MouseEvent) => {
      if (extrasRef.current && !extrasRef.current.contains(e.target as Node)) {
        setShowExtras(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowExtras(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [showExtras]);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(SIDE_NAV_STORAGE_KEY, JSON.stringify(openSections));
    } catch {
      // Ignore storage failures so navigation still works.
    }
  }, [openSections]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    navigate(id);
    // In drawer mode, dismiss the nav after a successful navigation so the
    // user can see the page they just opened.
    if (isDrawer && onClose) onClose();
  };

  // Escape closes the drawer. Only attached when in drawer + open mode so the
  // sidebar layout doesn't intercept Escape from page-level controls.
  React.useEffect(() => {
    if (!isDrawer || !isOpen || !onClose) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isDrawer, isOpen, onClose]);

  const handleSectionToggle = (sectionId: string) => {
    setOpenSections((previousSections) => ({
      ...previousSections,
      [sectionId]: !previousSections[sectionId],
    }));
  };

  // Filter navigation by search query
  const q = searchQuery.toLowerCase().trim();
  const filteredTopItems = navigationTopItems.filter((item) =>
    !q || item.name.toLowerCase().includes(q),
  );
  const filteredSections = navigationSections.map((section) => {
    if (!q) return section;
    const filteredItems = section.items.filter((item) =>
      item.name.toLowerCase().includes(q)
    );
    return { ...section, items: filteredItems };
  }).filter((section) => section.items.length > 0);

  const extrasOptions: ExtrasOption[] = [
    { type: 'heading', id: 'display-heading', label: 'Display' },
    { type: 'toggle', id: 'mega', label: 'Mega mode', checked: megaMode, onChange: setMegaMode },
  ];

  const drawerBaseStyle: React.CSSProperties = isDrawer
    ? {
        position: 'fixed',
        top: topOffset,
        left: 0,
        height: `calc(100vh - ${topOffset}px)`,
        zIndex: 1100,
        boxShadow: isOpen ? '0 0 24px rgba(0,0,0,0.12)' : 'none',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 220ms cubic-bezier(0.32, 0.72, 0, 1), box-shadow 220ms ease',
        // Avoid intercepting touch/scroll on the page beneath when closed.
        pointerEvents: isOpen ? 'auto' : 'none',
      }
    : {
        position: 'sticky',
        top: topOffset,
        height: topOffset > 0 ? `calc(100vh - ${topOffset}px)` : '100vh',
      };

  return (
    <>
      {isDrawer && (
        <div
          aria-hidden={!isOpen}
          onClick={onClose}
          style={{
            position: 'fixed',
            top: topOffset,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none',
            transition: 'opacity 220ms ease',
            zIndex: 1099,
          }}
        />
      )}
    <aside
      aria-label="Component navigation"
      style={{
        width: '280px',
        borderRight: '1px solid #E6E6E8',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        ...drawerBaseStyle,
      }}
    >
      {/* Fixed top: title + search */}
      <div style={{ padding: '20px 16px 0', flexShrink: 0 }}>
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#2E2F32', letterSpacing: '-0.2px', lineHeight: 1.2 }}>
            Component Library
          </span>
        </div>
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <div style={{
            position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
            pointerEvents: 'none', display: 'flex', alignItems: 'center',
          }}>
            <i aria-hidden="true" className="ld ld-Search" style={{ fontSize: '16px', color: '#74767C' }} />
          </div>
          <input
            id="sidebar-search-input"
            type="text"
            aria-label="Search components"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 32px 8px 32px',
              fontSize: '13px',
              border: '1px solid #E6E6E8',
              borderRadius: '6px',
              backgroundColor: '#F7F7F8',
              color: '#2E2F32',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#0071DC'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#E6E6E8'; }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', padding: '2px',
                display: 'flex', alignItems: 'center',
              }}
              aria-label="Clear search"
            >
              <i aria-hidden="true" className="ld ld-X" style={{ fontSize: '14px', color: '#74767C' }} />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable nav area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0 16px',
      }}>
        {filteredTopItems.length > 0 && (
          <div style={{ marginTop: '12px', marginBottom: filteredSections.length > 0 ? '20px' : '12px' }}>
            <LibraryNavList label="Overview Navigation">
              {filteredTopItems.map((item) => (
                <LibraryNavItem
                  key={item.id}
                  href={`#${sanitizeFragmentId(item.id)}`}
                  isCurrent={currentRoute === item.id}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, item.id)}
                >
                  {item.name}
                </LibraryNavItem>
              ))}
            </LibraryNavList>
          </div>
        )}
        {filteredSections.map((section, sectionIndex) => {
          const matchCount = section.items.length;
          return (
            <div key={section.id} style={{ marginTop: sectionIndex === 0 && filteredTopItems.length === 0 ? '12px' : '0', marginBottom: sectionIndex < filteredSections.length - 1 ? '20px' : '12px' }}>
              <button
                type="button"
                onClick={() => handleSectionToggle(section.id)}
                aria-expanded={openSections[section.id]}
                style={{
                  width: '100%',
                  border: 0,
                  background: 'transparent',
                  padding: '0 12px',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <span style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#2E2F32',
                  lineHeight: 1.3,
                }}>
                  {section.title}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Badge color="neutral">{matchCount}</Badge>
                  <ChevronDownIcon
                    size="small"
                    style={{
                      color: '#74767C',
                      transform: openSections[section.id] ? 'rotate(0deg)' : 'rotate(-90deg)',
                      transition: 'transform 160ms ease',
                      verticalAlign: 'middle',
                    }}
                  />
                </span>
              </button>
              {openSections[section.id] && (
                <LibraryNavList label={`${section.title} Navigation`}>
                  {section.items.map((item) => (
                    <LibraryNavItem
                      key={item.id}
                      href={`#${sanitizeFragmentId(item.id)}`}
                      isCurrent={currentRoute === item.id}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, item.id)}
                    >
                      {item.name}
                    </LibraryNavItem>
                  ))}
                </LibraryNavList>
              )}
            </div>
          );
        })}
        {q && filteredSections.length === 0 && filteredTopItems.length === 0 && (
          <div style={{ padding: '16px 12px', textAlign: 'center' }}>
            <Body as="p" size="small" color="subtle">No matches</Body>
          </div>
        )}
      </div>

      {/* Fixed bottom: theme selector */}
      <div style={{ flexShrink: 0, borderTop: '1px solid #E6E6E8' }}>
        <div style={{ height: '3px', background: activePreset.primaryColor, transition: 'background 0.25s ease' }} />
        <div style={{ padding: '14px 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: activePreset.primaryColor,
              flexShrink: 0,
              boxShadow: `0 0 0 2px #fff, 0 0 0 3px ${activePreset.primaryColor}33`,
              transition: 'background-color 0.25s ease, box-shadow 0.25s ease',
            }} />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#2E2F32', flex: 1 }}>{activeTheme}</span>
            <div ref={extrasRef} style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setShowExtras((v) => !v)}
                aria-expanded={showExtras}
                aria-haspopup="menu"
                aria-label="More theme options"
                title="More options"
                style={{
                  background: showExtras ? '#F2F3F5' : 'transparent',
                  border: 'none',
                  padding: '4px 6px',
                  cursor: 'pointer',
                  color: '#74767C',
                  lineHeight: 1,
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <i aria-hidden="true" className="ld ld-More" style={{ fontSize: '16px' }} />
              </button>
              {showExtras && (
                <div
                  role="menu"
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 'calc(100% + 6px)',
                    minWidth: '200px',
                    background: '#ffffff',
                    border: '1px solid #E6E6E8',
                    borderRadius: '8px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
                    padding: '4px',
                    zIndex: 1101,
                  }}
                >
                  {extrasOptions.map((option, i) => (
                    <ExtrasMenuItem key={option.type === 'divider' ? `div-${i}` : option.id} option={option} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <select
            value={activeTheme}
            aria-label="Select theme"
            onChange={(e) => {
              const name = e.target.value;
              setTheme(name);
              setActiveTheme(name);
            }}
            style={{
              width: '100%',
              padding: '5px 28px 5px 8px',
              fontSize: '12px',
              fontWeight: 600,
              border: '1px solid #E6E6E8',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              color: '#2E2F32',
              appearance: 'none' as const,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.4356 15.4934C11.578 15.6562 11.7837 15.7495 12 15.7495C12.2163 15.7495 12.422 15.6562 12.5644 15.4934L17.8144 9.49339C18.0082 9.27192 18.0546 8.95758 17.933 8.6896C17.8114 8.42162 17.5443 8.24951 17.25 8.24951H6.75001C6.45573 8.24951 6.18864 8.42162 6.06704 8.6896C5.94544 8.95758 5.99179 9.27192 6.18558 9.49339L11.4356 15.4934Z' fill='%2374767C'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 4px center',
              backgroundSize: '16px',
              cursor: 'pointer',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          >
            <optgroup label="Built-in">
              {Object.keys(THEME_PRESETS).map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </optgroup>
            {customThemeNames.length > 0 && (
              <optgroup label="My Themes">
                {customThemeNames.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </optgroup>
            )}
          </select>
          <button
            type="button"
            onClick={() => {
              navigate('theme-editor');
              if (isDrawer && onClose) onClose();
            }}
            style={{
              width: '100%',
              marginTop: '6px',
              padding: '6px 8px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#2E2F32',
              background: '#F7F7F8',
              border: '1px solid #E6E6E8',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span aria-hidden="true" style={{ fontSize: '15px', lineHeight: 1 }}>+</span>
            Create / edit themes
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '8px', fontSize: '11px', lineHeight: 1.2 }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ fontWeight: 700, color: '#74767C', textTransform: 'uppercase' as const, letterSpacing: '0.3px', fontSize: '10px', width: '36px', flexShrink: 0, paddingTop: '1px' }}>Font</span>
              <span style={{ color: '#2E2F32', fontWeight: 500 }}>{FONT_DISPLAY_NAMES[THEME_FONT_CONFIG[effectiveThemeKey]?.textFont] ?? THEME_FONT_CONFIG[effectiveThemeKey]?.textFont}</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ fontWeight: 700, color: '#74767C', textTransform: 'uppercase' as const, letterSpacing: '0.3px', fontSize: '10px', width: '36px', flexShrink: 0, paddingTop: '1px' }}>Icons</span>
              <span style={{ color: '#2E2F32', fontWeight: 500 }}>{themeIconMap.fonts[themeIconMap.themes[effectiveThemeKey as keyof typeof themeIconMap.themes] as keyof typeof themeIconMap.fonts]?.label}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}
