'use client';

/**
 * AgentSidebar — the agent-canvas ("[AK] Sidebar") left rail.
 *
 * A compound sidebar built for agent-driven experiences. It uses the shared
 * `pageNav` design tokens with agent-specific behaviors:
 *
 *  - **Collapse to an icon-only rail** (300px ↔ 57px) via context.
 *  - **Editable app-name header** (click the title to rename).
 *  - **Primary button items** (icon + bold label, optional Tag) that collapse to icons.
 *  - **Sections** of text-label items with an overflow "…" menu and inline rename.
 *  - **Segment control** that shows the full control when there's room, drops to
 *    icon-only when the rail is narrow, and shows just the active segment when collapsed.
 *  - **Footer** with four interchangeable types (avatar-button, menu-expand,
 *    icon-button, accordion).
 *
 * Usage mirrors the composable {@link Sidebar} pattern — wrap the tree in
 * {@link AgentSidebarProvider} and read collapse state with {@link useAgentSidebar}.
 */
import * as React from 'react';

import {cx} from '@/app/components/common/cx';
import {Avatar, type AvatarProps} from '@/app/components/Avatar';
import {Divider} from '@/app/components/Divider';
import {IconButton} from '@/app/components/IconButton';
import {
  ChevronDownIcon,
  CloseIcon,
  Icon,
  MoreIcon,
  SearchIcon,
} from '@/app/components/Icons';
import {
  Menu,
  MenuItem,
  MenuSectionTitleAccordion,
  type MenuPosition,
} from '@/app/components/Menu/Menu';
import {
  SegmentedControl,
  type SegmentedControlItem,
} from '@/app/components/SegmentedControl/SegmentedControl';
import {SearchBar} from '@/app/components/SearchBar/SearchBar';

import './AgentSidebar.css';

// ========================================================================
// Context & Provider
// ========================================================================

interface AgentSidebarContextValue {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  toggle: () => void;
}

const AgentSidebarContext = React.createContext<AgentSidebarContextValue | null>(
  null,
);

/** Read the current collapse state. Throws outside {@link AgentSidebarProvider}. */
export function useAgentSidebar(): AgentSidebarContextValue {
  const ctx = React.useContext(AgentSidebarContext);
  if (!ctx)
    throw new Error('useAgentSidebar must be used inside <AgentSidebarProvider>');
  return ctx;
}

export interface AgentSidebarProviderProps {
  children?: React.ReactNode;
  /** Controlled collapsed state. */
  collapsed?: boolean;
  /** Initial collapsed state when uncontrolled. @default false */
  defaultCollapsed?: boolean;
  /** Called when the collapsed state changes (controlled or uncontrolled). */
  onCollapsedChange?: (collapsed: boolean) => void;
}

/**
 * Holds the collapse state for an {@link AgentSidebar} subtree. Supports both
 * controlled (`collapsed` + `onCollapsedChange`) and uncontrolled
 * (`defaultCollapsed`) usage.
 */
export const AgentSidebarProvider: React.FC<AgentSidebarProviderProps> = ({
  children,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
}) => {
  const [internalCollapsed, setInternalCollapsed] =
    React.useState(defaultCollapsed);
  const collapsed = collapsedProp ?? internalCollapsed;

  const setCollapsed = React.useCallback(
    (value: boolean) => {
      if (onCollapsedChange) onCollapsedChange(value);
      if (collapsedProp === undefined) setInternalCollapsed(value);
    },
    [onCollapsedChange, collapsedProp],
  );

  const toggle = React.useCallback(
    () => setCollapsed(!collapsed),
    [collapsed, setCollapsed],
  );

  const value = React.useMemo<AgentSidebarContextValue>(
    () => ({collapsed, setCollapsed, toggle}),
    [collapsed, setCollapsed, toggle],
  );

  return (
    <AgentSidebarContext.Provider value={value}>
      {children}
    </AgentSidebarContext.Provider>
  );
};

AgentSidebarProvider.displayName = 'AgentSidebarProvider';

// ========================================================================
// Root
// ========================================================================

export interface AgentSidebarProps
  extends Omit<React.ComponentPropsWithoutRef<'aside'>, 'className' | 'style'> {
  children?: React.ReactNode;
  /** Escape hatch — applied to the root `<aside>`. */
  UNSAFE_className?: string;
  /** Escape hatch — applied to the root `<aside>`. */
  UNSAFE_style?: React.CSSProperties;
  /** Accessible label for the navigation landmark. @default "Sidebar" */
  'aria-label'?: string;
  /**
   * Allow the user to drag the right edge to resize the expanded sidebar.
   * Has no effect while collapsed. @default false
   */
  resizable?: boolean;
  /** Initial expanded width in px (used when `resizable`). @default 300 */
  defaultWidth?: number;
  /** Minimum expanded width in px. @default 240 */
  minWidth?: number;
  /** Maximum expanded width in px. @default 420 */
  maxWidth?: number;
  /** Called with the new width (px) while resizing. */
  onWidthChange?: (width: number) => void;
}

/** Keyboard step (px) for resizing the sidebar with arrow keys. */
const RESIZE_STEP = 16;

/**
 * The sidebar shell. Reads collapse state from context and exposes it as a
 * `data-state` attribute so its children's CSS can react to it. When
 * `resizable` is set, an expanded sidebar can be widened / narrowed by
 * dragging (or arrow-keying) the handle on its right edge.
 */
export const AgentSidebar = React.forwardRef<HTMLElement, AgentSidebarProps>(
  (
    {
      children,
      UNSAFE_className,
      UNSAFE_style,
      'aria-label': ariaLabel,
      resizable = false,
      defaultWidth = 300,
      minWidth = 240,
      maxWidth = 420,
      onWidthChange,
      ...rest
    },
    ref,
  ) => {
    const {collapsed} = useAgentSidebar();
    const [width, setWidth] = React.useState(defaultWidth);
    const [resizing, setResizing] = React.useState(false);
    const startX = React.useRef(0);
    const startWidth = React.useRef(0);

    const clamp = React.useCallback(
      (w: number) => Math.max(minWidth, Math.min(maxWidth, w)),
      [minWidth, maxWidth],
    );

    const applyWidth = React.useCallback(
      (w: number) => {
        const next = clamp(w);
        setWidth(next);
        onWidthChange?.(next);
      },
      [clamp, onWidthChange],
    );

    React.useEffect(() => {
      if (!resizing) return;
      const onMove = (e: MouseEvent) =>
        applyWidth(startWidth.current + (e.clientX - startX.current));
      const onUp = () => setResizing(false);
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      const prevUserSelect = document.body.style.userSelect;
      document.body.style.userSelect = 'none';
      return () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.body.style.userSelect = prevUserSelect;
      };
    }, [resizing, applyWidth]);

    const showHandle = resizable && !collapsed;

    // Inline width only applies while expanded; when collapsed the CSS
    // `data-state` rule drives the icon-rail width instead.
    const style: React.CSSProperties = {
      ...(showHandle ? {width, transition: resizing ? 'none' : undefined} : {}),
      ...UNSAFE_style,
    };

    return (
      <aside
        ref={ref}
        data-state={collapsed ? 'collapsed' : 'expanded'}
        aria-label={ariaLabel ?? 'Sidebar'}
        className={cx(
          'ld-agentsidebar',
          resizing && 'ld-agentsidebar--resizing',
          UNSAFE_className,
        )}
        style={style}
        {...rest}
      >
        <div className="ld-agentsidebar__inner">{children}</div>
        {showHandle ? (
          <div
            className="ld-agentsidebar__resize-handle"
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize sidebar"
            aria-valuenow={Math.round(width)}
            aria-valuemin={minWidth}
            aria-valuemax={maxWidth}
            tabIndex={0}
            onMouseDown={(e) => {
              e.preventDefault();
              startX.current = e.clientX;
              startWidth.current = width;
              setResizing(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                applyWidth(width - RESIZE_STEP);
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                applyWidth(width + RESIZE_STEP);
              } else if (e.key === 'Home') {
                e.preventDefault();
                applyWidth(minWidth);
              } else if (e.key === 'End') {
                e.preventDefault();
                applyWidth(maxWidth);
              }
            }}
          />
        ) : null}
      </aside>
    );
  },
);

AgentSidebar.displayName = 'AgentSidebar';

// ========================================================================
// Trigger (collapse / expand)
// ========================================================================

export interface AgentSidebarTriggerProps {
  /** Accessible label override. @default "Collapse sidebar" / "Expand sidebar" */
  a11yLabel?: string;
}

/** A toggle button that collapses / expands the sidebar. */
export const AgentSidebarTrigger: React.FC<AgentSidebarTriggerProps> = ({
  a11yLabel,
}) => {
  const {collapsed, toggle} = useAgentSidebar();
  return (
    <IconButton
      a11yLabel={a11yLabel ?? (collapsed ? 'Expand sidebar' : 'Collapse sidebar')}
      color="tertiary"
      size="small"
      onClick={toggle}
    >
      <Icon name="SideMenu" decorative />
    </IconButton>
  );
};

AgentSidebarTrigger.displayName = 'AgentSidebarTrigger';

// ========================================================================
// Lock / expand toggle
// ========================================================================

export interface AgentSidebarLockToggleProps {
  /** Label shown beside the arrow when expanded. @default "Lock" */
  label?: string;
}

/**
 * The canonical collapse affordance for the rail — the "lock and expand"
 * experience. Collapsed, it's a centered arrow ("→") that expands the sidebar;
 * expanded, it's a full-width "← Lock" row that collapses (locks) it again.
 *
 * Pin this near the bottom of the rail so the experience is identical wherever
 * the {@link AgentSidebar} is used (Focus Chat, the surface, etc.).
 */
export const AgentSidebarLockToggle: React.FC<AgentSidebarLockToggleProps> = ({
  label = 'Lock',
}) => {
  const {collapsed, toggle} = useAgentSidebar();
  return (
    <div className="ld-agentsidebar__lock">
      <button
        type="button"
        className={cx(
          'ld-agentsidebar__lock-toggle',
          collapsed
            ? 'ld-agentsidebar__lock-toggle--collapsed'
            : 'ld-agentsidebar__lock-toggle--expanded',
        )}
        onClick={toggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Lock sidebar'}
        aria-expanded={!collapsed}
      >
        {collapsed ? (
          <Icon name="ArrowRight" size="small" decorative />
        ) : (
          <>
            <Icon name="ArrowLeft" size="small" decorative />
            <span className="ld-agentsidebar__lock-label">{label}</span>
          </>
        )}
      </button>
    </div>
  );
};

AgentSidebarLockToggle.displayName = 'AgentSidebarLockToggle';

// ========================================================================
// EditableLabel (internal helper)
// ========================================================================

interface EditableLabelProps {
  value: string;
  onCommit: (next: string) => void;
  /** Class for the resting (non-editing) text element. */
  className?: string;
  /** Class for the `<input>` shown while editing. */
  inputClassName?: string;
  /** Accessible label for the edit input. */
  a11yLabel?: string;
}

/**
 * A label that swaps to an `<input>` when activated. Enter / blur commits the
 * draft, Escape cancels. Shared by the header title and editable text items.
 */
function EditableLabel({
  value,
  onCommit,
  className,
  inputClassName,
  a11yLabel,
}: EditableLabelProps) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const start = () => {
    setDraft(value);
    setEditing(true);
  };

  const commit = () => {
    setEditing(false);
    const trimmed = draft.trim();
    if (trimmed && trimmed !== value) onCommit(trimmed);
  };

  const cancel = () => {
    setEditing(false);
    setDraft(value);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        className={cx('ld-agentsidebar__edit-input', inputClassName)}
        value={draft}
        aria-label={a11yLabel ?? 'Edit name'}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            commit();
          } else if (e.key === 'Escape') {
            e.preventDefault();
            cancel();
          }
        }}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <button
      type="button"
      className={cx('ld-agentsidebar__edit-text', className)}
      onClick={(e) => {
        e.stopPropagation();
        start();
      }}
      title="Click to rename"
    >
      {value}
    </button>
  );
}

// ========================================================================
// Header
// ========================================================================

export interface AgentSidebarHeaderProps {
  /** Brand mark / logo shown at the start of the header (always visible). */
  logo?: React.ReactNode;
  /** The app / workspace name. */
  title: string;
  /**
   * A secondary caption shown beneath the title — the "two lines" header
   * variant. Mutually exclusive with `tag` in the Figma library.
   */
  subtitle?: string;
  /** A Tag rendered inline after the title — the "one line, tag" variant. */
  tag?: React.ReactNode;
  /** When set, the title becomes editable; called with the new value on commit. */
  onTitleChange?: (next: string) => void;
  /**
   * Render a trailing search button. Clicking it reveals an inline search field
   * that expands from the right edge leftward over the title. Called once when
   * the field is opened.
   */
  onSearch?: () => void;
  /** Called on every keystroke in the inline search field. */
  onSearchChange?: (value: string) => void;
  /** Called when the inline search is submitted (Enter). */
  onSearchSubmit?: (value: string) => void;
  /** Placeholder for the inline search field. @default "Search" */
  searchPlaceholder?: string;
}

/**
 * The sidebar header — logo + app name + an optional search button. The name
 * supports the Figma header variants: one line, one line + Tag, or two lines
 * (title over a caption). The title can also be made editable. Collapses to
 * just the logo.
 */
export const AgentSidebarHeader: React.FC<AgentSidebarHeaderProps> = ({
  logo,
  title,
  subtitle,
  tag,
  onTitleChange,
  onSearch,
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder = 'Search',
}) => {
  const {collapsed} = useAgentSidebar();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const searchWrapRef = React.useRef<HTMLDivElement>(null);
  const searchTriggerRef = React.useRef<HTMLButtonElement>(null);
  // Set when the search is dismissed via its own controls (Close button /
  // Escape) so focus returns to the trigger once it re-renders, instead of being
  // stranded on <body> when the search field unmounts.
  const restoreTriggerFocus = React.useRef(false);

  // Focus the field as it opens; collapsing the rail dismisses an open search.
  React.useEffect(() => {
    if (searchOpen) {
      searchWrapRef.current?.querySelector('input')?.focus();
    } else if (restoreTriggerFocus.current) {
      restoreTriggerFocus.current = false;
      requestAnimationFrame(() => searchTriggerRef.current?.focus());
    }
  }, [searchOpen]);
  React.useEffect(() => {
    if (collapsed) setSearchOpen(false);
  }, [collapsed]);

  const closeSearch = () => {
    // Dismissed by the user — send focus back to the search trigger.
    restoreTriggerFocus.current = true;
    setSearchOpen(false);
    setQuery('');
    onSearchChange?.('');
  };

  // When search is open, the logo + app name collapse so the SearchBar can take
  // the full header width.
  const searchActive = searchOpen && !collapsed;

  return (
    <div className="ld-agentsidebar__header">
      {logo && !searchActive ? (
        <span
          className="ld-agentsidebar__logo"
          role="img"
          aria-label={typeof title === 'string' ? `${title} logo` : 'Logo'}
        >
          {logo}
        </span>
      ) : null}
      {!collapsed ? (
        searchActive ? (
          <div ref={searchWrapRef} className="ld-agentsidebar__searchOpen">
            <SearchBar
              variant="inline"
              size="small"
              value={query}
              placeholder={searchPlaceholder}
              UNSAFE_className="ld-agentsidebar__searchbar"
              onChange={(next) => {
                setQuery(next);
                onSearchChange?.(next);
              }}
              onClear={() => onSearchChange?.('')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onSearchSubmit?.(query);
                } else if (e.key === 'Escape') {
                  e.preventDefault();
                  closeSearch();
                }
              }}
            />
            <IconButton
              a11yLabel="Close search"
              color="tertiary"
              size="small"
              onClick={closeSearch}
            >
              <CloseIcon />
            </IconButton>
          </div>
        ) : (
          <>
            <div className="ld-agentsidebar__titlewrap">
              <div className="ld-agentsidebar__titlerow">
                <h2 style={{margin: 0, minWidth: 0}}>
                  {onTitleChange ? (
                    <EditableLabel
                      value={title}
                      onCommit={onTitleChange}
                      className="ld-agentsidebar__title"
                      a11yLabel="Edit app name"
                    />
                  ) : (
                    <span className="ld-agentsidebar__title">{title}</span>
                  )}
                </h2>
                {tag ? <span className="ld-agentsidebar__title-tag">{tag}</span> : null}
              </div>
              {subtitle ? (
                <span className="ld-agentsidebar__subtitle">{subtitle}</span>
              ) : null}
            </div>
            {onSearch ? (
              <div className="ld-agentsidebar__search">
                <IconButton
                  ref={searchTriggerRef}
                  a11yLabel="Search"
                  color="tertiary"
                  size="small"
                  onClick={() => {
                    setSearchOpen(true);
                    onSearch?.();
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </div>
            ) : null}
          </>
        )
      ) : null}
    </div>
  );
};

AgentSidebarHeader.displayName = 'AgentSidebarHeader';

// ========================================================================
// Content & Separator
// ========================================================================

export interface AgentSidebarContentProps {
  children?: React.ReactNode;
}

/** The scrollable body between the header and footer. */
export const AgentSidebarContent: React.FC<AgentSidebarContentProps> = ({
  children,
}) => (
  <nav className="ld-agentsidebar__content" aria-label="Workspace navigation">
    {children}
  </nav>
);

AgentSidebarContent.displayName = 'AgentSidebarContent';

/** A thin separator line. */
export const AgentSidebarSeparator: React.FC = () => (
  <div className="ld-agentsidebar__separator">
    <Divider />
  </div>
);

AgentSidebarSeparator.displayName = 'AgentSidebarSeparator';

// ========================================================================
// Primary button item
// ========================================================================

export interface AgentSidebarItemProps {
  children: string;
  /** Leading icon (always shown — it's the collapsed representation). */
  leading: React.ReactNode;
  /** Renders the item as a link. */
  href?: string;
  /** Marks the current page / active item. */
  isCurrent?: boolean;
  /** An optional trailing Tag, shown only when expanded. */
  tag?: React.ReactNode;
  /** Optional trailing content (e.g. an edit / overflow control), expanded only. */
  trailing?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  target?: string;
}

/**
 * A primary navigation item — leading icon + bold label, with an optional Tag
 * or trailing control. Collapses to an icon-only button (the label moves to the
 * accessible name + tooltip).
 */
export const AgentSidebarItem = React.forwardRef<
  HTMLElement,
  AgentSidebarItemProps
>(({children, leading, href, isCurrent, tag, trailing, onClick, target}, ref) => {
  const {collapsed} = useAgentSidebar();

  const className = cx(
    'ld-agentsidebar__item',
    isCurrent && 'ld-agentsidebar__item--current',
  );

  const content = (
    <>
      <span className="ld-agentsidebar__item-icon" aria-hidden="true">
        {leading}
      </span>
      {!collapsed ? (
        <>
          <span className="ld-agentsidebar__item-label">{children}</span>
          {tag ? <span className="ld-agentsidebar__item-tag">{tag}</span> : null}
          {trailing ? (
            <span className="ld-agentsidebar__item-trailing">{trailing}</span>
          ) : null}
        </>
      ) : null}
    </>
  );

  const common = {
    className,
    onClick,
    ...(isCurrent ? {'aria-current': 'page' as const} : {}),
    ...(collapsed ? {title: children, 'aria-label': children} : {}),
  };

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        {...common}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      {...common}
    >
      {content}
    </button>
  );
});

AgentSidebarItem.displayName = 'AgentSidebarItem';

// ========================================================================
// Section
// ========================================================================

export interface AgentSidebarSectionProps {
  /** Section header label (hidden when the sidebar is collapsed). */
  title?: string;
  /**
   * Make the section header a toggle that expands / collapses its content
   * (a chevron appears beside the title). @default false
   */
  collapsible?: boolean;
  /** Initial expanded state when `collapsible`. @default true */
  defaultExpanded?: boolean;
  children?: React.ReactNode;
}

/**
 * A labeled group of secondary text items. When `collapsible`, the header
 * becomes a toggle that shows / hides the group's content.
 */
export const AgentSidebarSection: React.FC<AgentSidebarSectionProps> = ({
  title,
  collapsible = false,
  defaultExpanded = true,
  children,
}) => {
  const {collapsed} = useAgentSidebar();
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  // The header label is only meaningful while the sidebar is expanded.
  const showTitle = Boolean(title) && !collapsed;
  const isCollapsible = collapsible && !collapsed;
  const open = isCollapsible ? expanded : true;

  return (
    <div className="ld-agentsidebar__section">
      {showTitle ? (
        isCollapsible ? (
          <button
            type="button"
            className="ld-agentsidebar__section-title ld-agentsidebar__section-toggle"
            aria-expanded={expanded}
            onClick={() => setExpanded((e) => !e)}
          >
            <span>{title}</span>
            <span
              className={cx(
                'ld-agentsidebar__section-chevron',
                expanded && 'ld-agentsidebar__section-chevron--open',
              )}
              aria-hidden="true"
            >
              <ChevronDownIcon />
            </span>
          </button>
        ) : (
          <div className="ld-agentsidebar__section-title">{title}</div>
        )
      ) : null}
      {open ? children : null}
    </div>
  );
};

AgentSidebarSection.displayName = 'AgentSidebarSection';

// ========================================================================
// Text item (secondary)
// ========================================================================

export interface AgentSidebarOverflowItem {
  label: string;
  onClick?: () => void;
}

export interface AgentSidebarTextItemProps {
  children: string;
  href?: string;
  isCurrent?: boolean;
  /** When set, clicking the label renames it inline; called on commit. */
  onRename?: (next: string) => void;
  /** Items for a trailing "…" overflow menu. */
  overflow?: AgentSidebarOverflowItem[];
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  target?: string;
}

/**
 * A secondary text-label row. Supports inline rename (`onRename`) and a trailing
 * overflow menu (`overflow`). Hidden entirely when the sidebar is collapsed —
 * secondary items don't have an icon representation.
 */
export const AgentSidebarTextItem: React.FC<AgentSidebarTextItemProps> = ({
  children,
  href,
  isCurrent,
  onRename,
  overflow,
  onClick,
  target,
}) => {
  const {collapsed} = useAgentSidebar();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState<MenuPosition>('bottomRight');

  // Location-aware: the overflow menu renders inline (not portaled), so opening
  // downward near the bottom of the sidebar gets it clipped by the sidebar's
  // rounded/overflow edge and can slip under the footer. Measure the trigger on
  // open and flip the menu upward when there isn't room for it below.
  const openMenu = () => {
    const trigger = triggerRef.current;
    if (trigger) {
      const rect = trigger.getBoundingClientRect();
      // Rough menu height: ~40px per row + vertical padding.
      const estimatedHeight = (overflow?.length ?? 1) * 40 + 16;
      // Measure against the clipping container (the scrollable content / sidebar
      // card), not the viewport — the sidebar is a small card, so a downward menu
      // is clipped by its edge long before the window bottom.
      const clip =
        trigger.closest('.ld-agentsidebar__content') ?? trigger.closest('.ld-agentsidebar');
      const bottomBoundary = clip ? clip.getBoundingClientRect().bottom : window.innerHeight;
      const spaceBelow = bottomBoundary - rect.bottom;
      setMenuPosition(spaceBelow < estimatedHeight ? 'topRight' : 'bottomRight');
    }
    setMenuOpen(true);
  };

  if (collapsed) return null;

  const className = cx(
    'ld-agentsidebar__textitem',
    isCurrent && 'ld-agentsidebar__textitem--current',
  );

  const label = onRename ? (
    <EditableLabel
      value={children}
      onCommit={onRename}
      className="ld-agentsidebar__textitem-label"
      inputClassName="ld-agentsidebar__textitem-input"
      a11yLabel="Rename item"
    />
  ) : href ? (
    <a
      href={href}
      target={target}
      onClick={onClick}
      className="ld-agentsidebar__textitem-label ld-agentsidebar__textitem-link"
      {...(isCurrent ? {'aria-current': 'page' as const} : {})}
    >
      {children}
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className="ld-agentsidebar__textitem-label ld-agentsidebar__textitem-link"
    >
      {children}
    </button>
  );

  return (
    <div className={className}>
      {label}
      {overflow && overflow.length > 0 ? (
        <Menu
          isOpen={menuOpen}
          onOpen={openMenu}
          onClose={() => setMenuOpen(false)}
          triggerRef={triggerRef}
          position={menuPosition}
          trigger={
            <IconButton
              ref={triggerRef}
              a11yLabel={`More actions for ${children}`}
              color="tertiary"
              size="xsmall"
            >
              <MoreIcon />
            </IconButton>
          }
        >
          {overflow.map((o) => (
            <MenuItem
              key={o.label}
              onClick={() => {
                setMenuOpen(false);
                o.onClick?.();
              }}
            >
              {o.label}
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </div>
  );
};

AgentSidebarTextItem.displayName = 'AgentSidebarTextItem';

// ========================================================================
// Segment control
// ========================================================================

export interface AgentSidebarSegmentProps {
  items: SegmentedControlItem[];
  value: string;
  onChange: (value: string) => void;
  'aria-label'?: string;
}

/** Approx. px each labelled segment needs before its text starts to crowd. */
const SEGMENT_LABEL_MIN_WIDTH = 96;

/**
 * A segmented control inside the sidebar. It renders the full control with
 * icon + text labels when there's room, but collapses to **icon-only** squares
 * when space runs out, so the labels never crowd or butt up against the rail's
 * right edge:
 *
 *  - **Sidebar collapsed** (icon rail) → only the active segment, icon-only.
 *  - **Expanded but narrow** → all segments, icon-only, hugging their content
 *    (not stretched) so they don't reach the container edge.
 *  - **Expanded with room** → the full control with text, stretched full-width.
 *
 * Each item should provide an `icon` so the collapsed forms have something to
 * render (the label is preserved as the segment's accessible name + tooltip).
 */
export const AgentSidebarSegment: React.FC<AgentSidebarSegmentProps> = ({
  items,
  value,
  onChange,
  'aria-label': ariaLabel,
}) => {
  const {collapsed} = useAgentSidebar();
  const wrapRef = React.useRef<HTMLDivElement>(null);
  // True when the expanded rail is too narrow to fit the text labels.
  const [compact, setCompact] = React.useState(false);

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      setCompact(w > 0 && w < items.length * SEGMENT_LABEL_MIN_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length]);

  // Fully collapsed rail — show just the active segment as one icon square.
  if (collapsed) {
    const active = items.find((i) => i.value === value) ?? items[0];
    return (
      <div className="ld-agentsidebar__segment ld-agentsidebar__segment--collapsed">
        <SegmentedControl
          items={active ? [active] : []}
          value={value}
          onChange={onChange}
          aria-label={ariaLabel}
          iconOnly
        />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className={cx(
        'ld-agentsidebar__segment',
        compact && 'ld-agentsidebar__segment--compact',
      )}
    >
      <SegmentedControl
        items={items}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        iconOnly={compact}
        isFullWidth={!compact}
      />
    </div>
  );
};

AgentSidebarSegment.displayName = 'AgentSidebarSegment';

// ========================================================================
// Footer
// ========================================================================

interface AgentSidebarFooterBase {
  /** The leading avatar (avatar-button / menu-expand types). */
  avatar?: AvatarProps;
  /** Label beside the avatar / icon (expanded only). */
  label?: string;
}

export interface AgentSidebarFooterAvatarButton
  extends AgentSidebarFooterBase {
  type: 'avatar-button';
  onClick?: () => void;
}

/** An accordion (collapsible group) entry within the footer flyout menu. */
export interface AgentSidebarMenuAccordion {
  /** The accordion heading row. */
  accordion: string;
  /** Sub-items revealed when the accordion is open. */
  items: AgentSidebarOverflowItem[];
  /** Initial open state. @default false */
  defaultOpen?: boolean;
}

/** A footer-menu entry: either a plain link or a collapsible accordion group. */
export type AgentSidebarMenuEntry =
  | AgentSidebarOverflowItem
  | AgentSidebarMenuAccordion;

export interface AgentSidebarFooterMenuExpand extends AgentSidebarFooterBase {
  type: 'menu-expand';
  /**
   * Entries shown in the flyout menu — plain links, or an accordion group
   * (`{accordion, items}`) that expands a sub-section without closing the menu.
   */
  menuItems: AgentSidebarMenuEntry[];
  /** Optional segmented control rendered at the bottom of the menu (e.g. theme). */
  segment?: AgentSidebarSegmentProps;
}

export interface AgentSidebarFooterIconButton {
  type: 'icon-button';
  icon: React.ReactNode;
  a11yLabel: string;
  onClick?: () => void;
}

export interface AgentSidebarFooterAccordion {
  type: 'accordion';
  title: string;
  subtext?: string;
  avatar?: AvatarProps;
  /** Expandable content shown above the row. */
  children?: React.ReactNode;
}

export type AgentSidebarFooterProps =
  | AgentSidebarFooterAvatarButton
  | AgentSidebarFooterMenuExpand
  | AgentSidebarFooterIconButton
  | AgentSidebarFooterAccordion;

/** The sidebar footer — one of four interchangeable layouts. */
export const AgentSidebarFooter: React.FC<AgentSidebarFooterProps> = (props) => {
  const {collapsed} = useAgentSidebar();

  if (props.type === 'icon-button') {
    return (
      <div className="ld-agentsidebar__footer">
        <IconButton
          a11yLabel={props.a11yLabel}
          color="tertiary"
          size="small"
          onClick={props.onClick}
        >
          {props.icon}
        </IconButton>
      </div>
    );
  }

  if (props.type === 'avatar-button') {
    return (
      <div className="ld-agentsidebar__footer">
        <button
          type="button"
          className="ld-agentsidebar__footer-button"
          onClick={props.onClick}
          {...(collapsed && props.label
            ? {title: props.label, 'aria-label': props.label}
            : {})}
        >
          {props.avatar ? (
            /* Decorative here — the visible label (or the button's aria-label
               when collapsed) already names the control; labeling the avatar
               too would double the accessible name. */
            <span aria-hidden="true" style={{display: 'contents'}}>
              <Avatar size="small" {...props.avatar} />
            </span>
          ) : null}
          {!collapsed && props.label ? (
            <span className="ld-agentsidebar__footer-label">{props.label}</span>
          ) : null}
        </button>
      </div>
    );
  }

  if (props.type === 'menu-expand') {
    return <FooterMenuExpand {...props} />;
  }

  // accordion
  return <FooterAccordion {...props} />;
};

AgentSidebarFooter.displayName = 'AgentSidebarFooter';

function FooterMenuExpand(props: AgentSidebarFooterMenuExpand) {
  const {collapsed} = useAgentSidebar();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const position: MenuPosition = 'topLeft';

  return (
    <div className="ld-agentsidebar__footer">
      <Menu
        isOpen={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
        position={position}
        trigger={
          <button
            ref={triggerRef}
            type="button"
            className="ld-agentsidebar__footer-button"
            aria-haspopup="menu"
            aria-expanded={open}
            {...(collapsed && props.label
              ? {title: props.label, 'aria-label': props.label}
              : {})}
          >
            {props.avatar ? (
            /* Decorative here — the visible label (or the button's aria-label
               when collapsed) already names the control; labeling the avatar
               too would double the accessible name. */
            <span aria-hidden="true" style={{display: 'contents'}}>
              <Avatar size="small" {...props.avatar} />
            </span>
          ) : null}
            {!collapsed && props.label ? (
              <span className="ld-agentsidebar__footer-label">{props.label}</span>
            ) : null}
          </button>
        }
      >
        {props.menuItems.map((m, i) =>
          'accordion' in m ? (
            <MenuSectionTitleAccordion
              key={`acc-${m.accordion}-${i}`}
              title={m.accordion}
              defaultOpen={m.defaultOpen}
            >
              {m.items.map((s) => (
                <MenuItem
                  key={s.label}
                  onClick={() => {
                    setOpen(false);
                    s.onClick?.();
                  }}
                >
                  {s.label}
                </MenuItem>
              ))}
            </MenuSectionTitleAccordion>
          ) : (
            <MenuItem
              key={`item-${m.label}-${i}`}
              onClick={() => {
                setOpen(false);
                m.onClick?.();
              }}
            >
              {m.label}
            </MenuItem>
          ),
        )}
        {props.segment ? (
          <div className="ld-agentsidebar__footer-menu-segment">
            <SegmentedControl
              items={props.segment.items}
              value={props.segment.value}
              onChange={props.segment.onChange}
              aria-label={props.segment['aria-label']}
              isFullWidth
            />
          </div>
        ) : null}
      </Menu>
    </div>
  );
}

function FooterAccordion(props: AgentSidebarFooterAccordion) {
  const {collapsed} = useAgentSidebar();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="ld-agentsidebar__footer ld-agentsidebar__footer--accordion">
      {open && !collapsed && props.children ? (
        <div className="ld-agentsidebar__footer-accordion-content">
          {props.children}
        </div>
      ) : null}
      <button
        type="button"
        className="ld-agentsidebar__footer-button ld-agentsidebar__footer-accordion-row"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        {...(collapsed
          ? {title: props.title, 'aria-label': props.title}
          : {})}
      >
        {props.avatar ? <Avatar size="small" {...props.avatar} /> : null}
        {!collapsed ? (
          <span className="ld-agentsidebar__footer-accordion-text">
            <span className="ld-agentsidebar__footer-accordion-title">
              {props.title}
            </span>
            {props.subtext ? (
              <span className="ld-agentsidebar__footer-accordion-subtext">
                {props.subtext}
              </span>
            ) : null}
          </span>
        ) : null}
        {!collapsed ? (
          <span
            className={cx(
              'ld-agentsidebar__footer-accordion-chevron',
              open && 'ld-agentsidebar__footer-accordion-chevron--open',
            )}
            aria-hidden="true"
          >
            <ChevronDownIcon />
          </span>
        ) : null}
      </button>
    </div>
  );
}
