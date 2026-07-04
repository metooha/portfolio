import * as React from 'react';
import {DotLottieReact} from '@lottiefiles/dotlottie-react';
import {LOTTIE_DATA} from '@/app/assets/walmart-assets/lottie';

import {
  PromptComposer,
  PromptComposerDisclaimer,
  PromptComposerSuggestions,
  type PromptComposerVariant,
  type PromptComposerSize,
  type PromptComposerDictationVariant,
} from '@/app/components/PromptComposer';
import {AgentResponse} from '@/app/components/AgentResponse';
import {useAnnounce} from '@/app/components/A11yAnnouncement';
import {
  AgentCanvas,
  SuggestionButton,
  SuggestionTextLink,
  type SuggestionButtonVariant,
  type SuggestionButtonColor,
  type SuggestionTextLinkColor,
  type SuggestionTextLinkSize,
} from '@/app/components/AgentCanvas';
import {Avatar} from '@/app/components/Avatar';
import {SkeletonText} from '@/app/components/Skeleton/Skeleton';
import {
  UserResponse,
  type UserResponseFill,
  type UserResponseTextColor,
} from '@/app/components/UserResponse';
import {Feedback, type FeedbackRating} from '@/app/components/Feedback';
import {Sources, type SourceCitation} from '@/app/components/Sources';
import {ButtonToggle} from '@/app/components/ButtonToggle';
import {Menu, MenuItem, type MenuPosition} from '@/app/components/Menu/Menu';
import {IconButton} from '@/app/components/IconButton';
import {FloatingButton} from '@/app/components/FloatingButton';
import {Button} from '@/app/components/Button';
import {ActionGroup} from '@/app/components/ActionGroup';
import {Banner} from '@/app/components/Banner';
import {ScrollArea} from '@/app/components/ScrollArea';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  type PanelImperativeHandle,
  type PanelSize,
} from '@/app/components/Resizable';
import {SpotIcon} from '@/app/components/SpotIcon';
import {Card, CardContent, CardHeader} from '@/app/components/Card';
import {Metric} from '@/app/components/Metric';
import {AttachmentTile} from '@/app/components/AttachmentTile';
import {Divider} from '@/app/components/Divider';
import {Body, Caption, Heading} from '@/app/components/Text/Text';
import {Link} from '@/app/components/Link';
import {Chip} from '@/app/components/Chip';
import {Tag} from '@/app/components/Tag/Tag';
import {Checkbox} from '@/app/components/Checkbox';
import {Radio} from '@/app/components/Radio';
import {TabNavigation, TabNavigationItem} from '@/app/components/TabNavigation/TabNavigation';
import {CloseIcon, EditIcon, StarFillIcon, Icon, ChevronRightIcon} from '@/app/components/Icons';
import {Grid, GridColumn} from '@/app/components/Grid/Grid';
import {List, ListItem} from '@/app/components/List/List';
import {Badge} from '@/app/components/Badge/Badge';
import {Image} from '@/app/components/Image/Image';
import {ItemTile} from '@/app/components/patterns/ItemTile/ItemTile';
import {
  AgentSidebar,
  AgentSidebarContent,
  AgentSidebarFooter,
  AgentSidebarHeader,
  AgentSidebarItem,
  AgentSidebarLockToggle,
  AgentSidebarProvider,
  AgentSidebarSection,
  AgentSidebarSegment,
  AgentSidebarSeparator,
  AgentSidebarTextItem,
  type AgentSidebarFooterProps,
} from '@/app/components/patterns/AgentSidebar';
import {PRODUCT_IMAGES} from '@/app/components/common/productImages';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

/* ------------------------------------------------------------------ */
/*  Small inline glyphs without an LD icon equivalent                  */
/* ------------------------------------------------------------------ */
function GlobeGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 8h12M8 1.75c1.8 1.7 2.7 3.9 2.7 6.25S9.8 12.55 8 14.25C6.2 12.55 5.3 10.35 5.3 8S6.2 3.45 8 1.75z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
function DocGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2.75h7L19 8.5v12.75H6V2.75z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13 2.75V8.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
/** The "↳" corner-down-right arrow shown leading each blank-state suggestion. */
function CornerArrowGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M2.75 3v3.25a3 3 0 0 0 3 3h7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 6.5 13.25 9.25 10 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable demo helpers                                              */
/* ------------------------------------------------------------------ */

/** A ButtonToggle pill wired to a flyout Menu — used for the tools + model selectors. */
function SelectorPill({
  label,
  count,
  leading,
  noFill,
  items,
  a11yLabel,
  position = 'topLeft',
}: {
  label: string;
  count?: number;
  leading?: React.ReactNode;
  noFill?: boolean;
  items: string[];
  /** Accessible name — needed when the visible label is just a count. */
  a11yLabel?: string;
  /** Flyout placement relative to the trigger. @default "topLeft" */
  position?: MenuPosition;
}) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  return (
    <Menu
      isOpen={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      triggerRef={triggerRef}
      /* Composers sit at the bottom of their surface, so the selector menus
         open upward — above the ButtonToggle trigger. */
      position={position}
      trigger={
        <ButtonToggle
          ref={triggerRef}
          size="small"
          shape="pill"
          noFill={noFill}
          isOpen={open}
          count={count}
          leading={leading}
          aria-label={a11yLabel}
        >
          {label}
        </ButtonToggle>
      }
    >
      {items.map((item) => (
        <MenuItem key={item} onClick={() => setOpen(false)}>
          {item}
        </MenuItem>
      ))}
    </Menu>
  );
}

/**
 * The tools pill. At smaller composer sizes it collapses to just the leading
 * icon + the total source count (e.g. "🌐 3"), dropping the text label — per
 * the Small 400 / Mobile 343 designs.
 */
function toolsPill(collapsed = false) {
  const items = ['system-polaris-guide', 'web-search', 'code-interpreter', 'connectors…'];
  return collapsed ? (
    <SelectorPill
      label="3"
      leading={<GlobeGlyph />}
      a11yLabel="Knowledge sources, 3 selected"
      items={items}
    />
  ) : (
    <SelectorPill
      label="system-polaris-guide"
      count={2}
      leading={<GlobeGlyph />}
      a11yLabel="Knowledge sources"
      items={items}
    />
  );
}

/** Minimum visual gap (px) the responsive tools pill keeps between itself and
 *  the right side of the composer toolbar (model selector / mic / send) before
 *  it gives up its expanded label and collapses to the icon + count form. */
const RESPONSIVE_TOOLS_PILL_GAP = 16;

/**
 * The tools pill rendered in its natural expanded form (🌐 + `system-polaris-guide`
 * +2) by default, automatically collapsing to its icon-only form (🌐 + total
 * count) only when keeping the expanded form would bring it within
 * {@link RESPONSIVE_TOOLS_PILL_GAP} of the right-hand toolbar cluster (the
 * model selector and the mic / send group).
 *
 * Measurement is driven by a hidden "ghost" copy of the expanded pill: we
 * always know its natural width, so we can decide whether it fits regardless
 * of which form is currently rendered. That makes the decision purely a
 * function of the toolbar's geometry — no hysteresis or flicker when toggling.
 *
 * Use this in any size-aware surface (Chat Side Panel, Chat Overlay, Focus
 * Chat, App Demo, the live Composer demo). For the static state / size demo
 * cards, keep using `toolsPill(true)` so the collapsed form is shown as the
 * reference example.
 */
function ResponsiveToolsPill() {
  const ghostRef = React.useRef<HTMLDivElement>(null);
  const wrapperRef = React.useRef<HTMLSpanElement>(null);
  const [collapsed, setCollapsed] = React.useState(false);

  React.useLayoutEffect(() => {
    const ghost = ghostRef.current;
    const wrapper = wrapperRef.current;
    if (!ghost || !wrapper) return;
    const leftCluster = wrapper.parentElement as HTMLElement | null;
    if (!leftCluster) return;
    const toolbar = leftCluster.parentElement as HTMLElement | null;
    const rightCluster = leftCluster.nextElementSibling as HTMLElement | null;

    const measure = () => {
      const expandedWidth = ghost.getBoundingClientRect().width;
      // `.ld-promptcomposer-toolbarStart` is `flex: 1 1 auto` — it grows to
      // fill all the space the right cluster doesn't claim. So its measured
      // width already represents the room the left side has to work with;
      // we just need to subtract the natural widths of the wrapper's *flow*
      // siblings (the `+` button, an optional selector pill, etc.) and the
      // flex gaps between them. The ghost is `position: absolute` so it's
      // out of flow and doesn't contribute to either width or gap-count.
      const leftWidth = leftCluster.getBoundingClientRect().width;
      const csLeft = window.getComputedStyle(leftCluster);
      const gap = parseFloat(csLeft.columnGap || csLeft.gap || '0') || 0;
      let siblingsWidth = 0;
      let flowChildCount = 0;
      Array.from(leftCluster.children).forEach((child) => {
        if (child === ghost) return;
        const cs = window.getComputedStyle(child);
        if (
          cs.display === 'none' ||
          cs.position === 'absolute' ||
          cs.position === 'fixed'
        ) {
          return;
        }
        flowChildCount += 1;
        if (child === wrapper) return;
        siblingsWidth += (child as HTMLElement).getBoundingClientRect().width;
      });
      const totalGap = Math.max(0, flowChildCount - 1) * gap;
      const available =
        leftWidth - siblingsWidth - totalGap - RESPONSIVE_TOOLS_PILL_GAP;
      setCollapsed(available < expandedWidth);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(leftCluster);
    ro.observe(ghost);
    if (toolbar) ro.observe(toolbar);
    if (rightCluster) ro.observe(rightCluster);
    measure();
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* Off-screen ghost — always renders the expanded form so we can
          measure its natural width regardless of what's currently shown. */}
      <div
        ref={ghostRef}
        aria-hidden
        style={{
          position: 'absolute',
          left: -99999,
          top: 0,
          width: 'max-content',
          visibility: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {toolsPill(false)}
      </div>
      <span ref={wrapperRef} style={{display: 'inline-flex', alignItems: 'center'}}>
        {toolsPill(collapsed)}
      </span>
    </>
  );
}
/**
 * The model selector — always shows the “Instant” text label across every
 * composer size; the toolbar relies on the composer dropping to its small
 * (and ultimately mobile) form factor to fit the row.
 */
function modelSelector() {
  const items = ['Instant', 'Thinking', 'Research'];
  return <SelectorPill label="Instant" noFill items={items} />;
}

/** A horizontal, wrapping group of radio buttons for a single-select control. */
function RadioGroupRow<T extends string>({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: {value: T; label: string}[];
}) {
  return (
    <div role="radiogroup" style={{display: 'flex', flexWrap: 'wrap', gap: '8px 20px'}}>
      {options.map((o) => (
        <Radio
          key={o.value}
          name={name}
          value={o.value}
          label={o.label}
          size="small"
          checked={value === o.value}
          onChange={() => onChange(o.value)}
        />
      ))}
    </div>
  );
}

function fileTile(name: string, description: string) {
  return (
    <AttachmentTile
      variant="icon"
      leading={
        <SpotIcon color="brand" size="small">
          <DocGlyph />
        </SpotIcon>
      }
      title={name}
      description={description}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Chat message composition (page-level, from existing primitives)   */
/* ------------------------------------------------------------------ */

/**
 * A round, elevated scroll button for the chat timeline — a chevron that jumps
 * the conversation up or down. Matches the LD secondary-fill + elevation-100
 * spec from the design library.
 */
function ScrollButton({direction, onClick}: {direction: 'up' | 'down'; onClick: () => void}) {
  return (
    <FloatingButton
      aria-label={direction === 'down' ? 'Scroll to latest' : 'Scroll to top'}
      size="small"
      onClick={onClick}
    >
      <Icon name={direction === 'down' ? 'ChevronDown' : 'ChevronUp'} />
    </FloatingButton>
  );
}

function DateDivider({label}: {label: string}) {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0'}}>
      <div style={{flex: 1}}>
        <Divider />
      </div>
      <Caption color="subtle" style={{whiteSpace: 'nowrap'}}>
        {label}
      </Caption>
      <div style={{flex: 1}}>
        <Divider />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero surface — chat pane + canvas pane                             */
/* ------------------------------------------------------------------ */
type SurfaceBannerVariant = 'error' | 'warning' | 'info' | 'success';

/** Width (px) below which the docked chat drops to the compact composer.
 *  Set well above the chat pane's 464 px min-width floor so the toolbar
 *  (tools pill + model selector + mic + send) drops to its small layout
 *  before the large composer would overflow — covering the common docked
 *  range (Chat Side Panel, Chat Overlay, Focus Chat engaged) where the
 *  default chat width sits around 600–720 px. The panel's hard min still
 *  tracks {@link CHAT_COLLAPSE_PX}; only the composer step-down moves with
 *  this value. */
const CHAT_COMPACT_PX = 760;
/**
 * Width (px) below which the compact composer drops to its tightest (mobile)
 * form. Set to 400 — the small composer's own `min-width` floor — so any pane
 * narrower than 400px renders the fully-fluid mobile composer instead of
 * overflowing the panel. (The mobile target form factor itself is ~343px.)
 *
 * NB: with the chat pane's min-width locked to 464, this band is effectively
 * unreachable in normal use; preserved for the overlay's narrower minimum.
 */
const CHAT_MOBILE_PX = 400;
/** Width (px) below which dragging the divider collapses the chat entirely.
 *  Tracks the body container's 464 px floor — when the chat would be smaller
 *  than the spec floor, it collapses to 0 instead. */
const CHAT_COLLAPSE_PX = 464;

/**
 * Drives a resizable, collapsible chat panel. The panel renders the full-size
 * composer until the user drags it narrower than {@link CHAT_COMPACT_PX}, at
 * which point it switches to the compact (small) composer; dragging it past the
 * panel's `minSize` collapses the chat entirely (handing the width to the
 * canvas). `expand()` brings a collapsed chat back.
 */
function useChatPanelSizing() {
  const panelRef = React.useRef<PanelImperativeHandle | null>(null);
  const [collapsed, setCollapsed] = React.useState(false);
  const [composerSize, setComposerSize] = React.useState<PromptComposerSize>('large');

  const onResize = React.useCallback((size: PanelSize) => {
    setCollapsed(size.asPercentage === 0);
    // Only compact once measured and above zero — a collapsed panel keeps large.
    setComposerSize(size.inPixels > 0 && size.inPixels < CHAT_COMPACT_PX ? 'small' : 'large');
  }, []);

  return {
    panelRef,
    collapsed,
    composerSize,
    onResize,
    expand: () => panelRef.current?.expand(),
  };
}

/**
 * The collapsed chat affordance — shown when the chat panel is dragged shut.
 * Rather than a full-height rail that eats into the canvas, it's a floating
 * action button pinned to the bottom-left corner, so the collapsed chat stays
 * discoverable while handing essentially all of the space to the canvas.
 */
function ShowChatButton({onClick}: {onClick: () => void}) {
  return (
    <div style={{position: 'absolute', left: 16, bottom: 16, zIndex: 6}}>
      <FloatingButton aria-label="Show chat" onClick={onClick}>
        <Icon name="Chat" />
      </FloatingButton>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll-up clearance — banner-aware top offset for the up button    */
/* ------------------------------------------------------------------ */

/** Baseline distance from the top of the chat viewport for the scroll-up button. */
const SCROLL_UP_BASELINE_TOP = 16;
/** Distance from the right edge of the chat viewport for the scroll-up button. */
const SCROLL_UP_RIGHT = 16;
/** Approximate width of the scroll-up button (incl. its right offset) used to
 *  test whether a centered banner extends into the button's region. */
const SCROLL_UP_BUTTON_WIDTH = 56;
/** Spacing added below the banner when shifting the scroll-up button down. */
const SCROLL_UP_BANNER_GAP = 12;

/**
 * Returns the extra px to add to SCROLL_UP_BASELINE_TOP so the floating
 * scroll-up button never sits behind a floating banner.
 *
 * - No banner / banner doesn't overlap the chat viewport's top-right region → 0
 * - Panel-scoped banner (full width of the chat viewport) → shift below banner
 * - Global banner centered over chat + canvas → shift only when its physical
 *   bounds extend into the chat viewport's top-right region
 *
 * `banner` is the element itself (not a ref) so the effect re-runs when the
 * banner is mounted or unmounted — essential when the banner lives in a parent
 * component that toggles visibility while the chat is already engaged.
 */
function useScrollUpBannerClearance(
  banner: HTMLElement | null | undefined,
  scrollWrapRef: React.RefObject<HTMLElement | null>,
): number {
  const [offset, setOffset] = React.useState(0);

  React.useLayoutEffect(() => {
    if (!banner) {
      setOffset(0);
      return;
    }
    const wrap = scrollWrapRef.current;
    if (!wrap) {
      setOffset(0);
      return;
    }

    const measure = () => {
      const b = banner.getBoundingClientRect();
      const w = wrap.getBoundingClientRect();
      const buttonLeftEdge = w.right - SCROLL_UP_RIGHT - SCROLL_UP_BUTTON_WIDTH;
      const horizontalOverlap = b.right > buttonLeftEdge && b.left < w.right;
      const verticalOverlap =
        b.top <= w.top + SCROLL_UP_BASELINE_TOP + SCROLL_UP_BUTTON_WIDTH;
      if (!horizontalOverlap || !verticalOverlap) {
        setOffset(0);
        return;
      }
      const clearance =
        b.bottom - w.top - SCROLL_UP_BASELINE_TOP + SCROLL_UP_BANNER_GAP;
      setOffset(Math.max(0, clearance));
    };

    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(banner);
    ro.observe(wrap);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [banner, scrollWrapRef]);

  return offset;
}

function SurfaceDemo({
  showBanner,
  bannerVariant,
}: {
  showBanner: boolean;
  bannerVariant: SurfaceBannerVariant;
}) {
  const [bannerOpen, setBannerOpen] = React.useState(true);
  const [draft, setDraft] = React.useState('');
  const [messages, setMessages] = React.useState<string[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [bannerEl, setBannerEl] = React.useState<HTMLDivElement | null>(null);
  // The side panel opens with a single docked canvas — clicking "Open in
  // canvas" in the conversation adds more (up to four), at which point the
  // workspace becomes arrangeable. Closing the last one hands the full panel
  // back to the chat.
  const initialCanvases = React.useMemo<WorkspaceCanvas[]>(
    () => [
      {
        id: 'c1',
        title: 'Air fryer comparison',
        body: <CanvasDetailBody />,
        actions: canvasEditAction('Air fryer comparison'),
        footer: canvasFooter('Air fryer comparison'),
      },
    ],
    [],
  );
  const [canvases, setCanvases] = React.useState(initialCanvases);
  // The active canvas (clicked / focused) shows the blue linked accent line.
  const [activeCanvasId, setActiveCanvasId] = React.useState<string | null>('c1');
  const surfaceSeq = React.useRef(initialCanvases.length);
  const chat = useChatPanelSizing();
  // Only split into chat + canvas when the surface is wide enough for both at
  // their mins; otherwise the chat keeps the full width (canvas preserved).
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    setContainerWidth(el.clientWidth);
    const ro = new ResizeObserver(() => setContainerWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const canFitBoth =
    containerWidth === 0 || containerWidth >= CHAT_COLLAPSE_PX + CANVAS_MIN_PX + 12;

  const closeCanvas = (id: string) =>
    setCanvases((cs) => {
      const next = cs.filter((c) => c.id !== id);
      setActiveCanvasId((active) => (active === id ? next[0]?.id ?? null : active));
      return next;
    });

  // Opening a canvas is driven by the chat — clicking a result in the
  // conversation adds it to the workspace (up to four).
  const openCanvas = (title = 'Air fryer comparison') => {
    setCanvases((cs) => {
      if (cs.length >= 4) return cs;
      const id = `sc${++surfaceSeq.current}`;
      setActiveCanvasId(id);
      return [
        ...cs,
        {
          id,
          title,
          body: <CanvasDetailBody />,
          actions: canvasEditAction(title),
          footer: canvasFooter(title),
        },
      ];
    });
    // Move focus into the canvas that just opened so it isn't reset to <body>.
    focusNewestCanvas(rootRef.current);
  };

  // Restore every canvas that's been closed back to the initial set.
  const resetCanvases = () => {
    setCanvases(initialCanvases);
    setActiveCanvasId(initialCanvases[0]?.id ?? null);
  };

  // True once the user has closed at least one canvas — surfaces the Reset
  // affordance so they can bring the canvas(es) back.
  const someCanvasClosed = canvases.length < initialCanvases.length;

  // Re-open the banner whenever it's switched back on from the config controls.
  React.useEffect(() => {
    if (showBanner) setBannerOpen(true);
  }, [showBanner]);

  const send = (text: string) => {
    setMessages((m) => [...m, text]);
    setDraft('');
    setBusy(true);
    window.setTimeout(() => setBusy(false), 1500);
  };

  const canvasClosed = canvases.length === 0;
  // Whether the chat currently shares the surface with a docked canvas.
  const docked = !canvasClosed && canFitBoth;
  // The Chat Side Panel is always docked to the right of a host screen, so
  // its chat pane never gets wide enough to need the full large composer —
  // pin it to the small composer for a consistent docked appearance. (The
  // pane width is still measured for canvas / collapse logic above.)
  const composerSize: PromptComposerSize = 'small';

  // ── Timeline scroll buttons ───────────────────────────────────────────────
  const scrollWrapRef = React.useRef<HTMLDivElement>(null);
  const composerRef = React.useRef<HTMLDivElement>(null);
  const [atTop, setAtTop] = React.useState(true);
  const [atBottom, setAtBottom] = React.useState(true);
  const getViewport = () =>
    scrollWrapRef.current?.querySelector('.ld-scroll-area-viewport') as HTMLElement | null;
  const updateScroll = React.useCallback(() => {
    const v = scrollWrapRef.current?.querySelector('.ld-scroll-area-viewport') as HTMLElement | null;
    if (!v) return;
    setAtTop(v.scrollTop <= 4);
    setAtBottom(v.scrollTop + v.clientHeight >= v.scrollHeight - 4);
  }, []);
  const scrollChat = (dir: 'up' | 'down') => {
    const v = getViewport();
    if (!v) return;
    v.scrollTo({top: dir === 'up' ? 0 : v.scrollHeight, behavior: 'smooth'});
    // The scroll button that triggered this hides once its edge is reached,
    // which would strand focus on <body>. Move focus to a stable target: the
    // composer when jumping to the latest, or the scroll region when jumping up.
    if (dir === 'down') {
      composerRef.current?.querySelector('textarea')?.focus();
    } else {
      v.tabIndex = -1;
      v.focus();
    }
  };
  React.useLayoutEffect(() => {
    updateScroll();
  }, [updateScroll, messages, busy, canvases, showBanner, bannerOpen]);

  // Floating scroll-up button shifts beneath a banner whose bounds overlap the
  // chat viewport's top-right region (panel-scoped or global-center banners).
  const scrollUpOffset = useScrollUpBannerClearance(bannerEl, scrollWrapRef);

  const chatPane = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        // The "main content container" — body holding the conversation + composer.
        // Spec'd minimum width is 464 px; no max-width so it grows freely.
        minWidth: 464,
        boxSizing: 'border-box',
        // Clip content so a collapsed chat panel (width 0) never spills over the
        // canvas docked beside it.
        overflow: 'hidden',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)'}}>
        <Heading as="h4" size="small" style={{margin: 0}}>
          Chat
        </Heading>
        <div style={{flex: 1}} />
        {someCanvasClosed ? (
          <Button
            variant="secondary"
            size="small"
            leading={<Icon name="Refresh" decorative />}
            onClick={resetCanvases}
          >
            Reset canvas
          </Button>
        ) : null}
      </div>

      {/* Message list — ScrollArea shows a scrollbar only on overflow. The
          banner floats sticky over the top of the list (centered) rather than
          pushing the conversation down. */}
      <div
        ref={scrollWrapRef}
        onScrollCapture={updateScroll}
        style={{flex: 1, minHeight: 0, minWidth: 0, position: 'relative'}}
      >
        {!atBottom ? (
          <div style={{position: 'absolute', bottom: 8, right: 8, zIndex: 20}}>
            <ScrollButton direction="down" onClick={() => scrollChat('down')} />
          </div>
        ) : null}
        {!atTop ? (
          <div
            style={{
              position: 'absolute',
              top: SCROLL_UP_BASELINE_TOP + scrollUpOffset,
              right: SCROLL_UP_RIGHT,
              zIndex: 20,
              transition: 'top 0.2s ease-in-out',
            }}
          >
            <ScrollButton direction="up" onClick={() => scrollChat('up')} />
          </div>
        ) : null}
        {showBanner && bannerOpen ? (
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 30,
              pointerEvents: 'none',
            }}
          >
            <div ref={setBannerEl} style={{pointerEvents: 'auto'}}>
              <Banner
                variant={bannerVariant}
                size="small"
                onClose={() => {
                  // Dismissing the banner unmounts its close button; hand focus
                  // to the composer so it isn't stranded on <body>.
                  const target = composerNear(bannerEl);
                  setBannerOpen(false);
                  if (target) requestAnimationFrame(() => target.focus());
                }}
              >
                This is a banner message
              </Banner>
            </div>
          </div>
        ) : null}
        <ScrollArea UNSAFE_style={{height: '100%', width: '100%', overflowX: 'hidden'}}>
          <div style={{display: 'grid', gap: 16, padding: 16, width: '100%', minWidth: 0, boxSizing: 'border-box'}}>
            <DateDivider label="Today" />
            <UserResponse>Find me a highly-rated air fryer under $100.</UserResponse>
            {/* Clicking the result opens it in the canvas workspace — each click
                adds another canvas (up to four), so the workspace grows from the
                conversation rather than a dedicated "add" button. */}
            <div style={{display: 'grid', gap: 6}}>
              <AgentResponse
                hideAvatar
                slot={
                  <ItemTile
                    image={PRODUCT_IMAGES.airFryer}
                    name="Ninja 4 Qt Air Fryer, Nonstick Basket"
                    price="98"
                    cents="00"
                    badge={{label: 'Popular', type: 'popular'}}
                  />
                }
                timestamp="Read · 9:41 AM"
              >
                Here's a popular option that fits your budget:
              </AgentResponse>
              <button
                type="button"
                onClick={() => canvases.length < 4 && openCanvas('Air fryer comparison')}
                aria-disabled={canvases.length >= 4}
                style={{
                  appearance: 'none',
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  font: 'inherit',
                  cursor: canvases.length < 4 ? 'pointer' : 'default',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  justifySelf: 'start',
                }}
              >
                <Icon
                  name="Maximize"
                  decorative
                  style={{fontSize: '0.875rem', color: 'var(--ld-semantic-color-text-subtle, #515357)'}}
                />
                <Caption color="subtle">
                  {canvases.length >= 4 ? 'Canvas limit reached' : 'Open in canvas'}
                </Caption>
              </button>
            </div>
            <UserResponse>Is this “verify your account” email a scam?</UserResponse>
            <SecurityResponse />
            {messages.map((m, i) => (
              <UserResponse key={i}>{m}</UserResponse>
            ))}
            {busy ? <AgentResponse hideAvatar thinking /> : null}
          </div>
        </ScrollArea>
      </div>

      {/* Composer pinned to the bottom — full size until the pane is narrowed. */}
      <div ref={composerRef} style={{padding: 12, display: 'grid', gap: 0, borderTop: '1px solid var(--ld-semantic-color-separator, #e3e4e5)'}}>
        <PromptComposer
          size={composerSize}
          value={draft}
          onValueChange={setDraft}
          onSend={send}
          busy={busy}
          onStop={() => setBusy(false)}
          toolbarStart={<ResponsiveToolsPill />}
          toolbarEnd={modelSelector()}
          onAttachFiles={() => undefined}
        />
        <PromptComposerDisclaimer>
          AI can make mistakes. Be certain to review important info.
        </PromptComposerDisclaimer>
      </div>
    </div>
  );

  const sidePanel = (
    <div
      ref={rootRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'var(--ld-semantic-color-surface, #ffffff)',
        borderLeft: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
      }}
    >
      {!docked ? (
        /* No canvas docked (closed, or panel too narrow for both) — the chat
           fills the whole side panel; the canvas re-docks once there's room. */
        <div style={{height: '100%'}}>{chatPane}</div>
      ) : (
        <>
          <ResizablePanelGroup
            // Remount when the canvas region opens/closes so the panels rebalance.
            key={canvases.length ? 'split' : 'chat'}
            direction="horizontal"
          >
            {/* Chat panel — full composer until narrowed, then compact; drag it
                past its min to collapse the chat entirely. */}
            <ResizablePanel
              panelRef={chat.panelRef}
              onResize={chat.onResize}
              defaultSize="50%"
              minSize={`${CHAT_COLLAPSE_PX}px`}
              collapsible
              collapsedSize={0}
            >
              {chatPane}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="50%" minSize="28%">
              {/* The canvas lives OUTSIDE the chat body container with 16 px
                  of breathing room around it, per the design spec. */}
              <div style={{height: '100%', padding: 16, boxSizing: 'border-box'}}>
                {/* The canvas region is the shared AgentCanvas workspace — a single
                    canvas fills the panel; 2+ become arrangeable (drag to lay side by
                    side or stack, or maximize one). */}
                <CanvasWorkspace
                  items={canvases}
                  onReorder={setCanvases}
                  activeId={activeCanvasId}
                  onActiveChange={setActiveCanvasId}
                  onClose={closeCanvas}
                  allowCloseLast
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
          {chat.collapsed ? <ShowChatButton onClick={chat.expand} /> : null}
        </>
      )}
    </div>
  );

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 640,
        // Wide enough for the host backdrop (~360) plus the side panel at its
        // chat+canvas minimum (~640) plus the outer divider. Narrower than this
        // the canvas drops out of the side panel automatically (chat-only).
        minWidth: 1024,
        minHeight: 420,
        maxWidth: '100%',
        // Drag the bottom edge to resize the surface height; the outer divider
        // owns horizontal width.
        resize: 'vertical',
        border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--ld-semantic-color-surface-subtle, #f7f8f8)',
      }}
    >
      <ResizablePanelGroup direction="horizontal">
        {/* Host screen the side panel docks against — same faint mock used by
            the Chat Overlay example, so the pattern reads as "chat alongside
            the app it's helping you work in." */}
        <ResizablePanel defaultSize="35%" minSize="280px">
          <div style={{position: 'relative', height: '100%', overflow: 'hidden'}}>
            <ChatOverlayBackdropContent />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* Side panel — flush against the right edge of the surface. Drag the
            outer divider to grow or shrink the whole panel; drag the inner
            divider inside it to rebalance chat vs. canvas. */}
        <ResizablePanel
          defaultSize="65%"
          minSize={`${CHAT_COLLAPSE_PX}px`}
        >
          {sidePanel}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

/** The surface example plus its configuration (banner off by default). */
function SurfaceSection() {
  const [showBanner, setShowBanner] = React.useState(false);
  const [bannerVariant, setBannerVariant] = React.useState<SurfaceBannerVariant>('error');

  return (
    <ComponentConfigurationCard
      stack
      controls={
        <>
          <Checkbox
            label="Show banner"
            checked={showBanner}
            onChange={(e) => setShowBanner(e.target.checked)}
          />
          <div style={{display: 'grid', gap: 6}}>
            <Body as="span" size="small" weight="alt">
              Banner variant
            </Body>
            <RadioGroupRow
              name="surface-banner-variant"
              value={bannerVariant}
              onChange={setBannerVariant}
              options={[
                {value: 'error', label: 'Error'},
                {value: 'warning', label: 'Warning'},
                {value: 'info', label: 'Info'},
                {value: 'success', label: 'Success'},
              ]}
            />
          </div>
        </>
      }
      preview={<SurfaceDemo showBanner={showBanner} bannerVariant={bannerVariant} />}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Agent Canvas — multi-canvas workspace                              */
/* ------------------------------------------------------------------ */
/** Demo body content for a canvas. */
function CanvasBody({alt = false}: {alt?: boolean}) {
  return (
    <>
      <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: 1.5}}>
        {alt
          ? 'Items you saved while comparing — drag this canvas, resize it, or open another beside it.'
          : 'The agent renders working details here. Grab the header to move this canvas, drag the divider to resize, or add another canvas.'}
      </Body>
      <DocsGrid minColumnWidth={160}>
        <Metric title="Best value" value="$98.00" textLabel="Ninja 4 Qt" />
        <Metric title="Avg. rating" value="4.6" textLabel="2,304 reviews" />
      </DocsGrid>
    </>
  );
}

/** Richer canvas body (paragraph + metrics + a summary card) used by the chat
 *  experiences, where the canvas docks beside a live conversation. */
function CanvasDetailBody({alt = false}: {alt?: boolean}) {
  return (
    <>
      <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: 1.5}}>
        {alt
          ? 'Items you saved while comparing — the agent keeps them here so you can revisit them as the conversation continues.'
          : 'The agent renders working details here while the conversation continues in the chat — the canvas is where longer-form output, comparisons, and editable artifacts live.'}
      </Body>
      <DocsGrid minColumnWidth={180}>
        <Metric title="Best value" value="$98.00" textLabel="Ninja 4 Qt" />
        <Metric title="Avg. rating" value="4.6" textLabel="2,304 reviews" />
      </DocsGrid>
      <Card>
        <div style={{display: 'grid', gap: 8, padding: 16}}>
          <Body as="div" size="medium" weight="alt" style={{margin: 0}}>
            Summary
          </Body>
          <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: 1.5}}>
            Compact, well-reviewed, and under budget. Good fit for small households.
          </Body>
        </div>
      </Card>
    </>
  );
}

/** The Edit action shown in a canvas header. Parameterised by the canvas title
 *  so each open canvas's Edit control has a unique accessible name. */
const canvasEditAction = (title: string) => (
  <IconButton a11yLabel={`Edit ${title}`} color="tertiary" size="small">
    <EditIcon />
  </IconButton>
);

/** The Dismiss / Add to cart footer for a demo canvas.
 *  ActionGroup gives the pair proper list semantics; primary-tertiary keeps
 *  Add to cart (primary) on the right and Dismiss (tertiary) on the left, and
 *  size="small" + fullWidth={false} preserves the original visual design.
 *  The title is folded into each button's accessible name (the visible text is
 *  preserved, so WCAG 2.5.3 "Label in Name" still holds) so that, with several
 *  canvases open, every Dismiss / Add to cart control is uniquely identifiable. */
const canvasFooter = (title: string) => (
  <ActionGroup
    pattern="primary-tertiary"
    size="small"
    fullWidth={false}
    preferredLabel="Add to cart"
    alternateLabel="Dismiss"
    preferredButtonProps={{'aria-label': `Add to cart, ${title}`}}
    alternateButtonProps={{'aria-label': `Dismiss ${title}`}}
  />
);

let canvasSeq = 2;

type DropZone = 'left' | 'right' | 'top' | 'bottom';

/** Which edge of a canvas the pointer is closest to during a drag. */
function computeDropZone(e: React.DragEvent, el: HTMLElement): DropZone {
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  const dist: Record<DropZone, number> = {left: px, right: 1 - px, top: py, bottom: 1 - py};
  return (Object.keys(dist) as DropZone[]).reduce((a, b) => (dist[b] < dist[a] ? b : a), 'left');
}

/** A translucent brand overlay marking the half a drop will land in. */
function CanvasDropIndicator({zone}: {zone: DropZone}) {
  const pos: React.CSSProperties =
    zone === 'left'
      ? {left: 0, top: 0, bottom: 0, width: '50%'}
      : zone === 'right'
      ? {right: 0, top: 0, bottom: 0, width: '50%'}
      : zone === 'top'
      ? {left: 0, right: 0, top: 0, height: '50%'}
      : {left: 0, right: 0, bottom: 0, height: '50%'};
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        ...pos,
        borderRadius: 12,
        background: 'var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)',
        border: '2px dashed var(--ld-semantic-color-border-brand, #0053e2)',
        pointerEvents: 'none',
        zIndex: 3,
      }}
    />
  );
}

/** A single canvas rendered inside a {@link CanvasWorkspace}. */
interface WorkspaceCanvas {
  id: string;
  title: string;
  /** The scrollable canvas body. */
  body: React.ReactNode;
  /** Optional header action cluster (e.g. an Edit button). */
  actions?: React.ReactNode;
  /** Optional action footer. */
  footer?: React.ReactNode;
}

/**
 * The shared multi-canvas workspace. Renders one or more {@link AgentCanvas}
 * cards in a resizable group and, when 2+ are open, lets you grab a canvas
 * anywhere and drop it onto the left/right of another to lay them side by side,
 * or onto the top/bottom to stack them — plus maximize one to fill the group.
 *
 * It's the engine behind the standalone workspace demo and the canvas region of
 * the Chat Side Panel, Focus Chat, and Chat Overlay experiences. The parent owns
 * the `items` list (add / close); the workspace owns the arrangement.
 */
function CanvasWorkspace({
  items,
  onReorder,
  activeId,
  onActiveChange,
  onClose,
  onAdd,
  maxItems = 4,
  /** Allow closing the final canvas (hands the area back to the caller). */
  allowCloseLast = false,
  /** Wrap the group in the padded grey showcase box (standalone demo). When
   *  false the group fills its host panel (chat experiences). */
  framed = false,
  caption,
}: {
  items: WorkspaceCanvas[];
  onReorder: (next: WorkspaceCanvas[]) => void;
  activeId: string | null;
  onActiveChange: (id: string) => void;
  onClose?: (id: string) => void;
  onAdd?: () => void;
  maxItems?: number;
  allowCloseLast?: boolean;
  framed?: boolean;
  caption?: React.ReactNode;
}) {
  const [direction, setDirection] = React.useState<'row' | 'column'>('row');
  const [maximized, setMaximized] = React.useState<string | null>(null);
  const dragId = React.useRef<string | null>(null);
  const [draggingId, setDraggingId] = React.useState<string | null>(null);
  const [hint, setHint] = React.useState<{id: string; zone: DropZone} | null>(null);

  // Drop the maximize if its canvas goes away.
  React.useEffect(() => {
    if (maximized && !items.some((c) => c.id === maximized)) setMaximized(null);
  }, [items, maximized]);

  /** Drop `dragId` relative to `targetId` — the zone sets the order and whether
   *  the workspace lays out as a row (side by side) or column (stacked). */
  const place = (targetId: string, zone: DropZone) => {
    const from = dragId.current;
    dragId.current = null;
    setDraggingId(null);
    setHint(null);
    if (!from || from === targetId) return;
    setDirection(zone === 'left' || zone === 'right' ? 'row' : 'column');
    const moved = items.find((c) => c.id === from);
    if (!moved) return;
    const rest = items.filter((c) => c.id !== from);
    const ti = rest.findIndex((c) => c.id === targetId);
    const at = zone === 'right' || zone === 'bottom' ? ti + 1 : ti;
    rest.splice(at, 0, moved);
    onReorder(rest);
  };

  const visible = maximized ? items.filter((c) => c.id === maximized) : items;
  const canArrange = !maximized && visible.length > 1;
  const closable = (id: string) =>
    onClose && (items.length > 1 || allowCloseLast) ? () => onClose(id) : undefined;

  const group = (
    <ResizablePanelGroup
      // Remount on a rearrange so panel sizes rebalance for the new order.
      key={visible.map((c) => c.id).join('-') + direction}
      direction={direction === 'row' ? 'horizontal' : 'vertical'}
    >
      {visible.map((c, i) => (
        <React.Fragment key={c.id}>
          {i > 0 ? (
            <ResizableHandle withHandle />
          ) : null}
          <ResizablePanel defaultSize={100 / visible.length} minSize={18}>
            <div
              style={{height: '100%', padding: 6, boxSizing: 'border-box', position: 'relative'}}
              onDragOver={
                canArrange
                  ? (e) => {
                      e.preventDefault();
                      if (dragId.current && dragId.current !== c.id) {
                        setHint({id: c.id, zone: computeDropZone(e, e.currentTarget)});
                      }
                    }
                  : undefined
              }
              onDragLeave={(e) => {
                if (e.currentTarget === e.target) setHint((h) => (h?.id === c.id ? null : h));
              }}
              onDrop={
                canArrange
                  ? (e) => {
                      e.preventDefault();
                      place(c.id, computeDropZone(e, e.currentTarget));
                    }
                  : undefined
              }
            >
              <AgentCanvas
                title={c.title}
                a11yLabel={`${c.title}, canvas ${i + 1} of ${visible.length}`}
                linked={activeId === c.id}
                onClick={() => onActiveChange(c.id)}
                onClose={closable(c.id)}
                expanded={maximized === c.id}
                onToggleExpand={
                  items.length > 1
                    ? () => setMaximized((m) => (m === c.id ? null : c.id))
                    : undefined
                }
                actions={c.actions}
                footer={c.footer}
                // Grab the whole card (not just the header) to move it — only
                // meaningful once there's a second canvas to arrange against.
                draggable={canArrange}
                UNSAFE_className={`ld-agentcanvas--grabbable${
                  draggingId === c.id ? ' ld-agentcanvas--dragging' : ''
                }`}
                onDragStart={
                  canArrange
                    ? (e) => {
                        if (
                          (e.target as HTMLElement).closest(
                            'button, a, input, textarea, select, [contenteditable="true"]',
                          )
                        ) {
                          e.preventDefault();
                          return;
                        }
                        dragId.current = c.id;
                        setDraggingId(c.id);
                        // setData is required for the drag to start in some browsers.
                        e.dataTransfer.setData('text/plain', c.id);
                        e.dataTransfer.effectAllowed = 'move';
                      }
                    : undefined
                }
                onDragEnd={() => {
                  dragId.current = null;
                  setDraggingId(null);
                  setHint(null);
                }}
              >
                {c.body}
              </AgentCanvas>
              {hint?.id === c.id ? <CanvasDropIndicator zone={hint.zone} /> : null}
            </div>
          </ResizablePanel>
        </React.Fragment>
      ))}
    </ResizablePanelGroup>
  );

  const toolbar =
    onAdd || maximized ? (
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center'}}>
        {onAdd ? (
          <Button
            variant="secondary"
            size="small"
            onClick={onAdd}
            disabled={items.length >= maxItems}
          >
            + Add canvas
          </Button>
        ) : null}
        {maximized ? (
          <Button variant="tertiary" size="small" onClick={() => setMaximized(null)}>
            Restore all
          </Button>
        ) : null}
      </div>
    ) : null;

  if (framed) {
    return (
      <div style={{display: 'grid', gap: 12}}>
        {toolbar}
        <div
          style={{
            height: 560,
            borderRadius: 12,
            background: 'var(--ld-semantic-color-fill-secondary, #f5f5f6)',
            padding: 12,
            boxSizing: 'border-box',
          }}
        >
          {group}
        </div>
        {caption ? <Caption color="subtle">{caption}</Caption> : null}
      </div>
    );
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, minWidth: 0}}>
      {toolbar ? <div style={{padding: '8px 8px 0'}}>{toolbar}</div> : null}
      <div style={{flex: 1, minHeight: 0, minWidth: 0}}>{group}</div>
    </div>
  );
}

/**
 * A workspace of one or more AgentCanvas cards — no dividers. Grab a canvas
 * anywhere and drop it onto the left/right of another to lay them side by side,
 * or onto the top/bottom to stack them. Maximize one, close it, or add another
 * (up to four).
 */
function AgentCanvasGroupDemo() {
  const [items, setItems] = React.useState<WorkspaceCanvas[]>([
    {id: 'c1', title: 'Air fryer comparison', body: <CanvasBody />, footer: canvasFooter('Air fryer comparison')},
    {id: 'c2', title: 'Saved for later', body: <CanvasBody alt />, footer: canvasFooter('Saved for later')},
  ]);
  const [activeId, setActiveId] = React.useState<string | null>('c1');

  const addCanvas = () =>
    setItems((it) => {
      if (it.length >= 4) return it;
      const id = `c${++canvasSeq}`;
      setActiveId(id);
      return [...it, {id, title: `New canvas ${canvasSeq}`, body: <CanvasBody />, footer: canvasFooter(`New canvas ${canvasSeq}`)}];
    });
  const closeCanvas = (id: string) =>
    setItems((it) => {
      const next = it.filter((c) => c.id !== id);
      if (!next.length) return it;
      setActiveId((active) => (active === id ? next[0]?.id ?? null : active));
      return next;
    });

  return (
    <CanvasWorkspace
      framed
      items={items}
      onReorder={setItems}
      activeId={activeId}
      onActiveChange={setActiveId}
      onClose={closeCanvas}
      onAdd={addCanvas}
      caption="Grab a canvas anywhere to move it — drop on the left or right of another to place them side by side, or on the top or bottom to stack. Maximize one, close it, or add another (up to 4)."
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Chat & user response demos                                         */
/* ------------------------------------------------------------------ */
/** A sample set of cited sources for the Sources + feedback demos. */
const DEMO_SOURCES: SourceCitation[] = [
  {
    title: 'Philips.co.uk',
    description: "What is the OLED TV? What's so special about it? - Philips",
    href: 'https://www.philips.co.uk',
  },
  {
    title: 'ossila.com',
    description: 'What is an OLED? - Ossila',
    href: 'https://www.ossila.com',
  },
  {
    title: 'lgdisplay.com',
    description: 'OLED: Self-emissive Technology | LG Display',
    href: 'https://www.lgdisplay.com',
  },
];

/**
 * The response feedback toolbar — regenerate, save, copy, and more actions, an
 * expandable Sources pill that reveals the cited references below the row, and
 * a "Rate response" control (the interactive {@link Feedback} thumbs).
 */
function ResponseFeedback({
  sources = DEMO_SOURCES,
  defaultSourcesOpen = false,
}: {
  sources?: SourceCitation[];
  defaultSourcesOpen?: boolean;
}) {
  const [sourcesOpen, setSourcesOpen] = React.useState(defaultSourcesOpen);
  return (
    <>
      <IconButton a11yLabel="Regenerate response" color="tertiary" size="small">
        <Icon name="Refresh" />
      </IconButton>
      <IconButton a11yLabel="Save response" color="tertiary" size="small">
        <Icon name="Download" />
      </IconButton>
      <IconButton a11yLabel="Copy response" color="tertiary" size="small">
        <Icon name="Copy" />
      </IconButton>
      <IconButton a11yLabel="More actions" color="tertiary" size="small">
        <Icon name="More" />
      </IconButton>
      <ButtonToggle
        size="small"
        shape="pill"
        isOpen={sourcesOpen}
        aria-label={`Sources, ${sources.length} references`}
        aria-expanded={sourcesOpen}
        onClick={() => setSourcesOpen((o) => !o)}
      >
        Sources
      </ButtonToggle>
      <Feedback label="Rate response" onShareMore={() => undefined} />
      {sourcesOpen ? (
        <div style={{flexBasis: '100%', marginTop: 4}}>
          <Sources sources={sources} />
        </div>
      ) : null}
    </>
  );
}

/** A richer, formatted agent turn with a source header, links, and feedback. */
function SecurityResponse() {
  return (
    <AgentResponse
      hideAvatar
      name="Walmart Security"
      statusColor="var(--ld-semantic-color-fill-warning, #de7921)"
      meta="generated this response"
      info
      feedback={
        <ResponseFeedback
          sources={[
            {
              title: 'consumer.ftc.gov',
              description: 'How to Recognize and Avoid Phishing Scams',
              href: 'https://consumer.ftc.gov',
            },
            {
              title: 'corporate.walmart.com',
              description: 'Report a suspicious email — Walmart Security',
              href: 'https://corporate.walmart.com',
            },
          ]}
        />
      }
    >
      <Body as="p" size="medium" style={{margin: 0, lineHeight: 1.5}}>
        You're right to be cautious. When an email asks you to click a link or provide login
        information — especially with urgent language — it can be a sign of a phishing attempt.
        It's always better to double-check before interacting with the message.
      </Body>
      <Body as="p" size="medium" style={{margin: 0, lineHeight: 1.5}}>
        Phishing is a type of scam where attackers send emails that appear to come from legitimate
        organizations in order to trick people into revealing sensitive information or clicking
        malicious links.
      </Body>
      <Body as="div" size="medium" weight="alt" style={{margin: 0}}>
        How to Report a Suspicious Email
      </Body>
      <Body as="p" size="medium" style={{margin: 0, lineHeight: 1.5}}>
        If you suspect the email may be fraudulent, the safest step is to avoid clicking any links
        or downloading attachments and report the message to Walmart's security team by forwarding
        it to:
      </Body>
      <Link href="mailto:phishing@walmart.com">
        phishing@walmart.com <Icon name="LinkExternal" decorative style={{fontSize: '0.875em'}} />
      </Link>
    </AgentResponse>
  );
}

function ChatResponsesDemo() {
  return (
    <DocsGrid minColumnWidth={340}>
      <DocsCard
        title="Agent response — formatted, with sources & feedback"
        description="A richer turn: a labeled source header, formatted body with a heading and link, and a feedback toolbar."
        style={{gridColumn: '1 / -1'}}
      >
        <SecurityResponse />
      </DocsCard>
      <DocsCard title="Agent response" description="Header, body, and an optional content slot.">
        <AgentResponse
          hideAvatar
          slot={
            <ItemTile
              image={PRODUCT_IMAGES.airFryer}
              name="Ninja 4 Qt Air Fryer, Nonstick Basket"
              price="98"
              cents="00"
              badge={{label: 'Popular', type: 'popular'}}
            />
          }
          link="View more options"
          timestamp="Read · 9:41 AM"
        >
          Here's a popular option that fits your budget:
        </AgentResponse>
      </DocsCard>
      <DocsCard title="Agent response — streaming" description="The thinking state while a reply generates.">
        <AgentResponse hideAvatar thinking />
      </DocsCard>
      <DocsCard title="User response" description="A right-aligned message bubble — brand-bold fill with onfill-brand text by default.">
        <UserResponse>Find me a highly-rated air fryer under $100.</UserResponse>
      </DocsCard>
      <DocsCard title="User response — with content" description="A bubble carrying a content slot.">
        <UserResponse
          slot={
            <div style={{borderRadius: 12, overflow: 'hidden'}}>
              <AttachmentTile
                variant="icon"
                leading={
                  <SpotIcon color="brand" size="small">
                    <DocGlyph />
                  </SpotIcon>
                }
                title="requirements.pdf"
                description="PDF"
              />
            </div>
          }
        >
          Here are my requirements.
        </UserResponse>
      </DocsCard>
    </DocsGrid>
  );
}

/* ------------------------------------------------------------------ */
/*  Chat response — section headers                                    */
/* ------------------------------------------------------------------ */
/** The small agent avatar reused across the header demos. */
function HeaderAvatar() {
  return <Avatar a11yLabel="Polaris agent" name="AI" size="small" />;
}

/** Magic gradient text — used for the "Thinking…" / streaming header label. */
function MagicText({children}: {children: React.ReactNode}) {
  return (
    <Body
      as="span"
      size="small"
      weight="alt"
      UNSAFE_style={{
        backgroundImage:
          'linear-gradient(90deg, var(--ld-semantic-color-text-magic-start, #0053e2), var(--ld-semantic-color-text-magic-middle, #3d90ec), var(--ld-semantic-color-text-magic-stop, #79cdf6))',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {children}
    </Body>
  );
}

/** A header row: optional leading control/avatar + flexible header content. */
function HeaderRow({
  leading,
  align = 'center',
  children,
}: {
  leading?: React.ReactNode;
  align?: 'center' | 'flex-start';
  children: React.ReactNode;
}) {
  return (
    <div style={{display: 'flex', alignItems: align, gap: 8}}>
      {leading}
      {children}
    </div>
  );
}

const HeaderName = ({children}: {children: React.ReactNode}) => (
  <Body as="span" size="small" weight="alt" style={{margin: 0}}>
    {children}
  </Body>
);

/**
 * The Agent Response section-header variants from the design library, shown
 * with real chat copy. Each header pairs the agent avatar with a different
 * combination of name, meta, tag, timestamp, and trailing affordance.
 */
function ChatHeadersDemo() {
  return (
    <DocsGrid minColumnWidth={300}>
      <DocsCard title="Default" description="The agent avatar and its name.">
        <HeaderRow leading={<HeaderAvatar />}>
          <HeaderName>Polaris</HeaderName>
        </HeaderRow>
      </DocsCard>

      <DocsCard title="Thinking (magic)" description="A sparkle + magic-gradient label while a reply streams in.">
        <HeaderRow
          leading={
            <Icon
              name="Magic"
              a11yLabel="Generated by AI"
              style={{color: 'var(--ld-semantic-color-text-magic-middle, #3d90ec)'}}
            />
          }
        >
          <MagicText>Thinking…</MagicText>
        </HeaderRow>
      </DocsCard>

      <DocsCard title="Agent-generated response" description="Name + meta with a trailing info affordance.">
        <HeaderRow leading={<HeaderAvatar />}>
          <HeaderName>Walmart Security</HeaderName>
          <Caption color="subtle" style={{margin: 0}}>
            generated this response
          </Caption>
          <Icon
            name="InfoCircle"
            a11yLabel="About this response"
            style={{color: 'var(--ld-semantic-color-text-subtlest, #74767c)', fontSize: '0.875rem'}}
          />
        </HeaderRow>
      </DocsCard>

      <DocsCard title="With tag & timestamp" description="A secondary brand Tag and a read-receipt time after the name.">
        <HeaderRow leading={<HeaderAvatar />}>
          <HeaderName>Polaris</HeaderName>
          <Tag color="brand" variant="secondary" size="small">
            Beta
          </Tag>
          <Caption color="subtle" style={{margin: 0}}>
            9:41 AM
          </Caption>
        </HeaderRow>
      </DocsCard>

      <DocsCard title="With description" description="A bold title over a subtle, stacked description line.">
        <HeaderRow align="flex-start" leading={<HeaderAvatar />}>
          <div style={{display: 'grid'}}>
            <HeaderName>Order summary</HeaderName>
            <Caption color="subtle" style={{margin: 0}}>
              3 items · arriving Friday
            </Caption>
          </div>
        </HeaderRow>
      </DocsCard>

      <DocsCard title="Dropdown" description="A switcher header — pick the agent or model.">
        <HeaderRow leading={<HeaderAvatar />}>
          <HeaderName>Polaris</HeaderName>
          <Icon
            name="ChevronDown"
            decorative
            style={{color: 'var(--ld-semantic-color-text-subtlest, #74767c)'}}
          />
        </HeaderRow>
      </DocsCard>

      <DocsCard title="Close" description="A leading dismiss control before the agent identity.">
        <HeaderRow
          leading={
            <IconButton a11yLabel="Dismiss response" color="tertiary" size="small">
              <CloseIcon />
            </IconButton>
          }
        >
          <HeaderAvatar />
          <HeaderName>Polaris</HeaderName>
        </HeaderRow>
      </DocsCard>

      <DocsCard title="Multi-weight" description="A bold name paired with a subtle role, no avatar.">
        <HeaderRow>
          <HeaderName>Polaris</HeaderName>
          <Body as="span" size="small" color="subtle" style={{margin: 0}}>
            Assistant
          </Body>
        </HeaderRow>
      </DocsCard>
    </DocsGrid>
  );
}

/**
 * A chat turn while the reply loads — a magic "Thinking…" header above a
 * magic-variant SkeletonText, which animates a gradient sweep to signal the
 * agent is generating.
 */
function MagicLoadingTurn({lines = 3}: {lines?: number}) {
  return (
    <div style={{display: 'flex', gap: 12, alignItems: 'flex-start', maxWidth: 420}}>
      <HeaderAvatar />
      <div style={{display: 'grid', gap: 8, flex: 1, minWidth: 0}}>
        <HeaderRow
          leading={
            <Icon
              name="Magic"
              a11yLabel="Generated by AI"
              style={{color: 'var(--ld-semantic-color-text-magic-middle, #3d90ec)'}}
            />
          }
        >
          <MagicText>Thinking…</MagicText>
        </HeaderRow>
        <SkeletonText isMagic lines={lines} />
      </div>
    </div>
  );
}

function ChatLoadingDemo() {
  return (
    <DocsCard
      title="Loading (magic skeleton)"
      description="While the agent generates, the body is a magic-variant SkeletonText — a gradient sweep that reads as AI activity."
    >
      <MagicLoadingTurn />
    </DocsCard>
  );
}

/**
 * A component configuration for the chat response header — toggle the leading
 * agent avatar on or off (the AgentResponse `hideAvatar` prop).
 */
function ChatHeaderConfigDemo() {
  const [showAvatar, setShowAvatar] = React.useState(true);
  return (
    <ComponentConfigurationCard
      stack
      controls={
        <Checkbox
          label="Show avatar"
          checked={showAvatar}
          onChange={(e) => setShowAvatar(e.target.checked)}
        />
      }
      preview={
        <DocsCard
          title="Chat response"
          description="Toggle the avatar to show or hide the leading agent identity in the header."
        >
          <AgentResponse hideAvatar={!showAvatar} name="Polaris" timestamp="Read · 9:41 AM">
            Here's a popular option that fits your budget — the Ninja 4 Qt Air Fryer at $98.00.
          </AgentResponse>
        </DocsCard>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/*  User response — delivery / error captions                          */
/* ------------------------------------------------------------------ */
/** A single inline action (icon + label) within a delivery caption. */
function CaptionAction({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: 0,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        font: 'inherit',
        color: 'var(--ld-semantic-color-text, #2e2f32)',
      }}
    >
      {icon}
      {label}
    </button>
  );
}

/**
 * A delivery / error caption shown beneath a user bubble — a leading error
 * glyph, a negative status label, and optional inline retry / delete actions.
 */
function DeliveryCaption({
  label,
  actions,
}: {
  label: string;
  actions?: React.ReactNode;
}) {
  return (
    <Caption
      color="negative"
      UNSAFE_style={{display: 'inline-flex', alignItems: 'center', gap: 6}}
    >
      <Icon
        name="ExclamationCircleFill"
        decorative
        style={{color: 'var(--ld-semantic-color-fill-negative, #ea1100)', fontSize: '0.875rem'}}
      />
      <span style={{color: 'var(--ld-semantic-color-text-negative, #a20c00)'}}>{label}</span>
      {actions ? (
        <span style={{display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ld-semantic-color-text, #2e2f32)'}}>
          {actions}
        </span>
      ) : null}
    </Caption>
  );
}

/**
 * A failed user message whose retry action is interactive: pressing "Try again"
 * (or "Retry") clears the error caption and shows a magic SkeletonText while the
 * message re-sends, then falls back to the error so the demo can be replayed.
 */
function RetryableUserResponse({withOptions = false}: {withOptions?: boolean}) {
  const [retrying, setRetrying] = React.useState(false);
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const retry = () => {
    setRetrying(true);
    timer.current = window.setTimeout(() => setRetrying(false), 2200);
  };

  const refreshIcon = <Icon name="Refresh" decorative style={{fontSize: '0.875rem'}} />;

  return (
    <div style={{display: 'grid', gap: 12}}>
      <UserResponse
        caption={
          retrying ? undefined : (
            <DeliveryCaption
              label="Not delivered"
              actions={
                withOptions ? (
                  <>
                    <CaptionAction icon={<Icon name="Trash" decorative style={{fontSize: '0.875rem'}} />} label="Delete" />
                    <span aria-hidden="true">·</span>
                    <CaptionAction icon={refreshIcon} label="Retry" onClick={retry} />
                  </>
                ) : (
                  <CaptionAction icon={refreshIcon} label="Try again" onClick={retry} />
                )
              }
            />
          )
        }
      >
        Find me a highly-rated air fryer under $100.
      </UserResponse>
      {retrying ? <MagicLoadingTurn /> : null}
    </div>
  );
}

/** The delivery-error caption states a user message can show when it fails. */
function UserResponseErrorsDemo() {
  return (
    <DocsGrid minColumnWidth={320}>
      <DocsCard title="Not delivered" description="A failed send with no recovery action.">
        <UserResponse caption={<DeliveryCaption label="Not delivered" />}>
          Find me a highly-rated air fryer under $100.
        </UserResponse>
      </DocsCard>

      <DocsCard title="Try again" description="Press Try again — the caption clears and a magic skeleton animates while the message re-sends.">
        <RetryableUserResponse />
      </DocsCard>

      <DocsCard title="Network error" description="A connectivity failure state.">
        <UserResponse caption={<DeliveryCaption label="Network error — check your connection" />}>
          Find me a highly-rated air fryer under $100.
        </UserResponse>
      </DocsCard>

      <DocsCard title="With options" description="Delete or Retry — Retry animates the magic skeleton while re-sending.">
        <RetryableUserResponse withOptions />
      </DocsCard>
    </DocsGrid>
  );
}

/* ------------------------------------------------------------------ */
/*  User response — color pairings                                     */
/* ------------------------------------------------------------------ */
/** A few of the fill + text pairings a designer can mix and match. */
const USER_RESPONSE_PAIRINGS: {
  title: string;
  fill: UserResponseFill;
  textColor: UserResponseTextColor;
}[] = [
  {title: 'Brand bold (default)', fill: 'brand-bold', textColor: 'onfill-brand'},
  {title: 'Brand subtle', fill: 'brand-subtle', textColor: 'onfill-brand-subtle'},
  {title: 'Neutral subtle', fill: 'subtle', textColor: 'default'},
  {title: 'Inverse', fill: 'inverse', textColor: 'inverse'},
  {title: 'Accent purple', fill: 'accent-purple', textColor: 'inverse'},
  {title: 'Accent teal', fill: 'accent-teal', textColor: 'inverse'},
];

function UserResponseColorsDemo() {
  return (
    <DocsGrid minColumnWidth={300}>
      {USER_RESPONSE_PAIRINGS.map(({title, fill, textColor}) => (
        <DocsCard key={title} title={title} description={`fill="${fill}", textColor="${textColor}"`}>
          <UserResponse fill={fill} textColor={textColor}>
            Find me a highly-rated air fryer under $100.
          </UserResponse>
        </DocsCard>
      ))}
    </DocsGrid>
  );
}

/* ------------------------------------------------------------------ */
/*  Response feedback — interactive thumbs rating                      */
/* ------------------------------------------------------------------ */
/**
 * The Feedback control that pairs with an agent (chat) response. It starts as a
 * prompt beside thumbs up / down; selecting a rating swaps the controls for a
 * confirmation — a thank-you for positive, or a filled thumb plus a "Share more"
 * affordance for negative so the user can give richer detail.
 */
function FeedbackDemo() {
  const [rating, setRating] = React.useState<FeedbackRating | null>(null);
  return (
    <DocsGrid minColumnWidth={300}>
      <DocsCard
        title="Interactive"
        description="Pick a rating — the control confirms your choice. A thumbs up thanks you; a thumbs down invites more detail. Reset to try the other path."
        style={{gridColumn: '1 / -1'}}
      >
        <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16}}>
          <Feedback value={rating} onChange={setRating} onShareMore={() => undefined} />
          {rating !== null ? (
            <Button variant="tertiary" size="small" onClick={() => setRating(null)}>
              Reset
            </Button>
          ) : null}
        </div>
      </DocsCard>
      <DocsCard title="Default" description="The resting prompt beside thumbs up / down.">
        <Feedback value={null} onChange={() => undefined} />
      </DocsCard>
      <DocsCard title="Confirmation — positive" description="Shown after a thumbs up.">
        <Feedback value="positive" onChange={() => undefined} />
      </DocsCard>
      <DocsCard
        title="Confirmation — negative"
        description="Shown after a thumbs down, with a Share more affordance for richer feedback."
      >
        <Feedback value="negative" onShareMore={() => undefined} onChange={() => undefined} />
      </DocsCard>
    </DocsGrid>
  );
}

/* ------------------------------------------------------------------ */
/*  Sources + feedback (expandable cited references)                   */
/* ------------------------------------------------------------------ */
/**
 * The full response footer from the design library: the action toolbar
 * (regenerate, save, copy, more) + an expandable Sources pill + the "Rate
 * response" thumbs. Toggling Sources reveals the cited references below the row.
 */
function SourcesFeedbackDemo() {
  return (
    <DocsGrid minColumnWidth={340}>
      <DocsCard
        title="Sources + feedback toolbar"
        description="The response footer — regenerate, save, copy, and more, plus an expandable Sources pill and the Rate response thumbs. Toggle Sources to reveal the cited references below the row."
        style={{gridColumn: '1 / -1'}}
      >
        <AgentResponse hideAvatar name="Polaris" feedback={<ResponseFeedback />}>
          <Body as="p" size="medium" style={{margin: 0, lineHeight: 1.5}}>
            OLED TVs use self-emissive pixels, so each one makes its own light and switches off
            completely for true blacks and high contrast — no backlight required.
          </Body>
        </AgentResponse>
      </DocsCard>

      <DocsCard
        title="Sources list"
        description="The expanded list on its own — each row pairs a favicon with a bold domain and a one-line snippet. Rows with a URL link out."
      >
        <Sources sources={DEMO_SOURCES} />
      </DocsCard>

      <DocsCard
        title="In a canvas panel"
        description="How the response and its expanded Sources sit inside a chat panel — disclaimer above, the footer pinned beneath the answer."
      >
        <SourcesPanelDemo />
      </DocsCard>
    </DocsGrid>
  );
}

/** A miniature chat panel showing an agent response with Sources expanded. */
function SourcesPanelDemo() {
  return (
    <div
      style={{
        borderRadius: 16,
        border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        boxShadow: 'var(--ld-semantic-elevation-100)',
        background: 'var(--ld-semantic-color-surface, #ffffff)',
        padding: 16,
        display: 'grid',
        gap: 16,
      }}
    >
      <PromptComposerDisclaimer icon align="center">
        AI can make mistakes. Be certain to review important info.
      </PromptComposerDisclaimer>
      <AgentResponse
        hideAvatar
        name="About this item"
        timestamp={'VIZIO 65" Class Quantum 4K QLED HDR Smart TV'}
        feedback={<ResponseFeedback defaultSourcesOpen />}
      >
        <Body as="p" size="medium" style={{margin: 0, lineHeight: 1.5}}>
          Here's a little bit about it — a QLED Quantum Dot panel with Dolby Vision for vivid,
          high-contrast picture, plus built-in streaming and easy casting.
        </Body>
      </AgentResponse>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Interactive configuration demo                                     */
/* ------------------------------------------------------------------ */
function ConfigDemo() {
  const [variant, setVariant] = React.useState<PromptComposerVariant>('default');
  const [size, setSize] = React.useState<PromptComposerSize>('large');
  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [recording, setRecording] = React.useState(false);
  const [dictationVariant, setDictationVariant] =
    React.useState<PromptComposerDictationVariant>('listening');
  const [showCount, setShowCount] = React.useState(false);
  const [showSelector, setShowSelector] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <ComponentConfigurationCard
      stack
      controls={
        <>
          <div style={{display: 'grid', gap: 6}}>
            <Body as="span" size="small" weight="alt">
              Variant
            </Body>
            <RadioGroupRow
              name="composer-variant"
              value={variant}
              onChange={setVariant}
              options={[
                {value: 'default', label: 'Default'},
                {value: 'inline', label: 'Inline'},
              ]}
            />
          </div>
          <div style={{display: 'grid', gap: 6}}>
            <Body as="span" size="small" weight="alt">
              Size
            </Body>
            <RadioGroupRow
              name="composer-size"
              value={size}
              onChange={setSize}
              options={[
                {value: 'large', label: 'Large'},
                {value: 'small', label: 'Small (≈400)'},
                {value: 'mobile', label: 'Mobile (≈343)'},
              ]}
            />
          </div>
          <div style={{display: 'grid', gap: 6}}>
            <Body as="span" size="small" weight="alt">
              Dictation variant
            </Body>
            <RadioGroupRow
              name="composer-dictation"
              value={dictationVariant}
              onChange={setDictationVariant}
              options={[
                {value: 'listening', label: 'Listening (waveform)'},
                {value: 'voice-to-text', label: 'Voice to text (Magic Box)'},
              ]}
            />
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 24px'}}>
            <Checkbox label="Disabled" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
            <Checkbox label="Error" checked={error} onChange={(e) => setError(e.target.checked)} />
            <Checkbox label="Busy (generating)" checked={busy} onChange={(e) => setBusy(e.target.checked)} />
            <Checkbox label="Recording (mic)" checked={recording} onChange={(e) => setRecording(e.target.checked)} />
            <Checkbox label="Show character count" checked={showCount} onChange={(e) => setShowCount(e.target.checked)} />
            <Checkbox label="Show Selector Button" checked={showSelector} onChange={(e) => setShowSelector(e.target.checked)} />
          </div>
        </>
      }
      preview={
        <DocsCard
          title="Live composer"
          description="Type a prompt and press Enter (Shift+Enter for a newline). The frame matches the selected size's target width."
        >
          {/* The container width tracks the size — full for large, the 400px
              small-composer floor for a small panel, ≈343 for a phone — so the
              composer previews at its real target width. No border / padding:
              the composer's own surface provides the visible frame. */}
          <div
            style={{
              width: size === 'mobile' ? 343 : size === 'small' ? 400 : '100%',
              maxWidth: '100%',
              transition: 'width 0.2s ease',
              boxSizing: 'border-box',
            }}
          >
            <PromptComposer
              variant={variant}
              size={size}
              disabled={disabled}
              error={error}
              busy={busy}
              recording={recording}
              dictationVariant={dictationVariant}
              showCount={showCount}
              maxLength={showCount ? 280 : undefined}
              onMicToggle={() => setRecording((r) => !r)}
              value={value}
              onValueChange={setValue}
              onSend={() => setValue('')}
              onStop={() => setBusy(false)}
              toolbarStart={<ResponsiveToolsPill />}
              toolbarEnd={modelSelector()}
              showSelector={showSelector}
              selectorIconUnselected={<Icon name="Magic" />}
              selectorIconSelected={<Icon name="MagicFill" />}
              selectorLabel="Select context"
              onAttachFiles={() => undefined}
            />
          </div>
        </DocsCard>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Dictation state demo (interactive — click the mic)                 */
/* ------------------------------------------------------------------ */
/**
 * An interactive composer for the dictation States cards. It starts idle so
 * the Magic Box (voice-to-text) / waveform (listening) only appears once the
 * user selects the microphone.
 */
function DictationStateDemo({
  dictationVariant,
}: {
  dictationVariant: PromptComposerDictationVariant;
}) {
  const [recording, setRecording] = React.useState(false);
  const [value, setValue] = React.useState('');
  return (
    <PromptComposer
      recording={recording}
      dictationVariant={dictationVariant}
      onMicToggle={() => setRecording((r) => !r)}
      value={value}
      onValueChange={setValue}
      onSend={() => setValue('')}
      toolbarStart={toolsPill(true)}
      toolbarEnd={modelSelector()}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Attachments demo                                                   */
/* ------------------------------------------------------------------ */
function AttachmentsDemo() {
  const [files, setFiles] = React.useState<string[]>(['Q3-report.pdf']);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const removeFile = (i: number) => {
    // Removing a non-last tile: AttachmentTile moves focus to a sibling tile.
    // Removing the last tile unmounts the whole attachments row (no sibling), so
    // return focus to the composer input instead of leaving it on <body>.
    const wasLast = files.length <= 1;
    setFiles((f) => f.filter((_, idx) => idx !== i));
    if (wasLast) {
      requestAnimationFrame(() => wrapRef.current?.querySelector('textarea')?.focus());
    }
  };
  return (
    <div ref={wrapRef}>
      <PromptComposer
        placeholder="Ask about your files…"
        attachments={files.map((name, i) => (
          <AttachmentTile
            key={i}
            variant="icon"
            leading={
              <SpotIcon color="brand" size="small">
                <DocGlyph />
              </SpotIcon>
            }
            title={name}
            description="PDF"
            onRemove={() => removeFile(i)}
          />
        ))}
        onAttachFiles={(dropped) => setFiles((f) => [...f, ...dropped.map((file) => file.name)])}
        toolbarStart={toolsPill()}
        toolbarEnd={modelSelector()}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Generate → stop demo                                               */
/* ------------------------------------------------------------------ */
function GenerateStopDemo() {
  const [busy, setBusy] = React.useState(false);
  const [value, setValue] = React.useState('');
  return (
    <PromptComposer
      value={value}
      onValueChange={setValue}
      busy={busy}
      onSend={() => {
        setValue('');
        setBusy(true);
      }}
      onStop={() => setBusy(false)}
      toolbarStart={toolsPill()}
      toolbarEnd={modelSelector()}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Suggestions demo                                                   */
/* ------------------------------------------------------------------ */
function SuggestionsDemo() {
  const [value, setValue] = React.useState('');
  return (
    <PromptComposer
      value={value}
      onValueChange={setValue}
      onSend={() => setValue('')}
      suggestions={
        <PromptComposerSuggestions
          suggestions={['Summarize this page', 'Draft a reply', 'Find similar items', 'Explain the chart']}
          onSelect={setValue}
        />
      }
      toolbarStart={toolsPill()}
      toolbarEnd={modelSelector()}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar Navigation demos                                           */
/* ------------------------------------------------------------------ */
/** A small brand mark used as the sidebar logo. */
function SidebarLogo() {
  return <Avatar a11yLabel="Polaris" name="P" size="small" color="brand" shape="square" />;
}

/** A height host so the sidebar's full-height `<aside>` has room to render. */
function SidebarFrame({
  children,
  height = 560,
}: {
  children: React.ReactNode;
  height?: number;
}) {
  return (
    <div
      style={{
        height,
        display: 'flex',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        background: 'var(--ld-semantic-color-surface, #ffffff)',
      }}
    >
      {children}
    </div>
  );
}

/** A small framed sidebar (own provider + height host) for variant cards. */
function MiniSidebar({
  collapsed = false,
  height = 220,
  ariaLabel,
  children,
}: {
  collapsed?: boolean;
  height?: number;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <SidebarFrame height={height}>
      <AgentSidebarProvider defaultCollapsed={collapsed}>
        <AgentSidebar aria-label={ariaLabel}>{children}</AgentSidebar>
      </AgentSidebarProvider>
    </SidebarFrame>
  );
}

/** A self-contained editable text item (keeps its own committed value). */
function EditableTextItemDemo({initial}: {initial: string}) {
  const [value, setValue] = React.useState(initial);
  return (
    <AgentSidebarTextItem onRename={setValue}>{value}</AgentSidebarTextItem>
  );
}

/** The shared content (header → items → section → footer) for the demos. */
function SidebarBody({
  footerType = 'avatar-button',
  resizable = false,
  minWidth,
  maxWidth,
}: {
  footerType?: AgentSidebarFooterProps['type'];
  resizable?: boolean;
  /** Minimum expanded width in px (used when `resizable`). */
  minWidth?: number;
  /** Maximum expanded width in px (used when `resizable`). */
  maxWidth?: number;
}) {
  const [appName, setAppName] = React.useState('App Name');
  const [current, setCurrent] = React.useState('home');
  const [filter, setFilter] = React.useState('recent');
  const [theme, setTheme] = React.useState('light');
  const [chats, setChats] = React.useState([
    'Air fryer research',
    'Trip to Tokyo',
    'Q3 planning',
  ]);

  const renameChat = (i: number, next: string) =>
    setChats((c) => c.map((v, idx) => (idx === i ? next : v)));
  const deleteChat = (i: number) =>
    setChats((c) => c.filter((_, idx) => idx !== i));

  const footer: Record<AgentSidebarFooterProps['type'], React.ReactNode> = {
    'avatar-button': (
      <AgentSidebarFooter
        type="avatar-button"
        avatar={{a11yLabel: 'Marc Chen', name: 'MC', color: 'brand'}}
        label="Marc Chen"
        onClick={() => undefined}
      />
    ),
    'menu-expand': (
      <AgentSidebarFooter
        type="menu-expand"
        avatar={{a11yLabel: 'Marc Chen', name: 'MC', color: 'brand'}}
        label="Marc Chen"
        menuItems={[
          {label: 'Terms & Privacy'},
          {
            accordion: 'Help',
            items: [
              {label: 'Documentation'},
              {label: 'Keyboard shortcuts'},
              {label: 'Contact support'},
            ],
          },
          {label: 'Slack community'},
          {label: 'Get started'},
          {label: 'FAQs'},
          {label: 'Submit a ticket'},
        ]}
        segment={{
          items: [
            {value: 'light', label: 'Light'},
            {value: 'dark', label: 'Dark'},
          ],
          value: theme,
          onChange: setTheme,
          'aria-label': 'Theme',
        }}
      />
    ),
    'icon-button': (
      <AgentSidebarFooter
        type="icon-button"
        a11yLabel="Settings"
        icon={<Icon name="Gear" decorative />}
        onClick={() => undefined}
      />
    ),
    accordion: (
      <AgentSidebarFooter
        type="accordion"
        avatar={{a11yLabel: 'Marc Chen', name: 'MC', color: 'brand'}}
        title="Marc Chen"
        subtext="marc@walmart.com"
      >
        <div style={{display: 'grid', gap: 4}}>
          <Body as="span" size="small" color="subtle">
            Account settings
          </Body>
          <Body as="span" size="small" color="subtle">
            Sign out
          </Body>
        </div>
      </AgentSidebarFooter>
    ),
  };

  return (
    <AgentSidebar resizable={resizable} minWidth={minWidth} maxWidth={maxWidth}>
      <AgentSidebarHeader
        logo={<SidebarLogo />}
        title={appName}
        onTitleChange={setAppName}
        onSearch={() => undefined}
      />
      <AgentSidebarContent>
        <AgentSidebarItem
          leading={<Icon name="Home" decorative />}
          isCurrent={current === 'home'}
          onClick={() => setCurrent('home')}
        >
          Home
        </AgentSidebarItem>
        <AgentSidebarItem
          leading={<Icon name="Chat" decorative />}
          isCurrent={current === 'chats'}
          onClick={() => setCurrent('chats')}
          tag={
            <Tag color="brand" variant="tertiary" size="small">
              3 Unread
            </Tag>
          }
        >
          Chats
        </AgentSidebarItem>
        <AgentSidebarItem
          leading={<Icon name="Grid" decorative />}
          isCurrent={current === 'projects'}
          onClick={() => setCurrent('projects')}
        >
          Projects
        </AgentSidebarItem>

        <AgentSidebarSeparator />

        <AgentSidebarSegment
          items={[
            {value: 'recent', label: 'Recent', icon: <Icon name="Calendar" decorative />},
            {value: 'starred', label: 'Starred', icon: <Icon name="Star" decorative />},
          ]}
          value={filter}
          onChange={setFilter}
          aria-label="Filter chats"
        />

        <AgentSidebarSection title="Recent chats" collapsible>
          {chats.map((c, i) => (
            <AgentSidebarTextItem
              key={i}
              onRename={(next) => renameChat(i, next)}
              overflow={[
                {label: 'Rename'},
                {label: 'Delete', onClick: () => deleteChat(i)},
              ]}
            >
              {c}
            </AgentSidebarTextItem>
          ))}
        </AgentSidebarSection>
      </AgentSidebarContent>

      <AgentSidebarLockToggle />
      {footer[footerType]}
    </AgentSidebar>
  );
}

/** The full, interactive sidebar shown in an agent-canvas context. */
function AgentSidebarFullDemo() {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <SidebarFrame>
      <AgentSidebarProvider collapsed={collapsed} onCollapsedChange={setCollapsed}>
        <SidebarBody footerType="menu-expand" resizable />
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            alignItems: 'flex-start',
            padding: 16,
          }}
        >
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: 1.5}}>
            Use the “← Lock” control at the bottom of the rail to collapse the sidebar to an icon
            rail (it becomes a “→” to expand again), or drag the right edge to resize it
            (240–420px). Click the app name or a recent chat to rename it inline; use a chat's “…”
            menu for more actions.
          </Body>
        </div>
      </AgentSidebarProvider>
    </SidebarFrame>
  );
}

/** Config card — collapse + footer type drive a live sidebar preview. */
function AgentSidebarConfigDemo() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [footerType, setFooterType] =
    React.useState<AgentSidebarFooterProps['type']>('avatar-button');
  return (
    <ComponentConfigurationCard
      stack
      controls={
        <>
          <Checkbox
            label="Collapsed (icon rail)"
            checked={collapsed}
            onChange={(e) => setCollapsed(e.target.checked)}
          />
          <div style={{display: 'grid', gap: 6}}>
            <Body as="span" size="small" weight="alt">
              Footer type
            </Body>
            <RadioGroupRow
              name="agentsidebar-footer"
              value={footerType}
              onChange={setFooterType}
              options={[
                {value: 'avatar-button', label: 'Avatar button'},
                {value: 'menu-expand', label: 'Menu-expand'},
                {value: 'icon-button', label: 'Icon button'},
                {value: 'accordion', label: 'Accordion'},
              ]}
            />
          </div>
        </>
      }
      preview={
        <SidebarFrame height={520}>
          <AgentSidebarProvider collapsed={collapsed}>
            <SidebarBody footerType={footerType} resizable />
          </AgentSidebarProvider>
        </SidebarFrame>
      }
    />
  );
}

/** Each footer type, shown in its own compact frame. */
function AgentSidebarFootersDemo() {
  const FOOTERS: {title: string; description: string; type: AgentSidebarFooterProps['type']}[] = [
    {title: 'Avatar button', description: 'Avatar + name; collapses to the avatar.', type: 'avatar-button'},
    {title: 'Menu-expand', description: 'Avatar opens a flyout of links + a theme segment.', type: 'menu-expand'},
    {title: 'Icon button', description: 'A single icon action (e.g. settings).', type: 'icon-button'},
    {title: 'Accordion', description: 'Title + subtext with an expandable content slot.', type: 'accordion'},
  ];
  return (
    <DocsGrid minColumnWidth={320}>
      {FOOTERS.map((f) => (
        <DocsCard key={f.type} title={f.title} description={f.description}>
          <SidebarFrame height={420}>
            <AgentSidebarProvider>
              <SidebarBody footerType={f.type} />
            </AgentSidebarProvider>
          </SidebarFrame>
        </DocsCard>
      ))}
    </DocsGrid>
  );
}

/** Segment control — full when expanded vs the single active pill when collapsed. */
function AgentSidebarSegmentDemo() {
  const [a, setA] = React.useState('recent');
  const [b, setB] = React.useState('recent');
  const items = [
    {value: 'recent', label: 'Recent', icon: <Icon name="Calendar" decorative />},
    {value: 'starred', label: 'Starred', icon: <Icon name="Star" decorative />},
  ];
  return (
    <DocsGrid minColumnWidth={260}>
      <DocsCard title="Expanded" description="Icon + text label for each segment.">
        <SidebarFrame height={160}>
          <AgentSidebarProvider>
            <AgentSidebar aria-label="Expanded segment example">
              <AgentSidebarContent>
                <AgentSidebarSegment items={items} value={a} onChange={setA} aria-label="Filter" />
              </AgentSidebarContent>
            </AgentSidebar>
          </AgentSidebarProvider>
        </SidebarFrame>
      </DocsCard>
      <DocsCard title="Collapsed" description="Only the active segment shows, icon-only — the label is hidden but kept as its accessible name.">
        <SidebarFrame height={160}>
          <AgentSidebarProvider defaultCollapsed>
            <AgentSidebar aria-label="Collapsed segment example">
              <AgentSidebarContent>
                <AgentSidebarSegment items={items} value={b} onChange={setB} aria-label="Filter" />
              </AgentSidebarContent>
            </AgentSidebar>
          </AgentSidebarProvider>
        </SidebarFrame>
      </DocsCard>
    </DocsGrid>
  );
}

/** Expanded vs collapsed — the two overall sidebar states. */
function AgentSidebarStatesDemo() {
  return (
    <DocsGrid minColumnWidth={300}>
      <DocsCard title="Expanded" description="The full 300px rail (resizable to 240–420px).">
        <SidebarFrame height={460}>
          <AgentSidebarProvider>
            <SidebarBody />
          </AgentSidebarProvider>
        </SidebarFrame>
      </DocsCard>
      <DocsCard title="Collapsed" description="The 57px icon rail — labels move to tooltips.">
        <SidebarFrame height={460}>
          <AgentSidebarProvider defaultCollapsed>
            <SidebarBody />
          </AgentSidebarProvider>
        </SidebarFrame>
      </DocsCard>
    </DocsGrid>
  );
}

/** Header variants. */
function AgentSidebarHeaderVariantsDemo() {
  const [name, setName] = React.useState('App Name');
  return (
    <DocsGrid minColumnWidth={280}>
      <DocsCard title="One line" description="Logo + app name.">
        <MiniSidebar ariaLabel="Header one line" height={96}>
          <AgentSidebarHeader logo={<SidebarLogo />} title="App Name" />
        </MiniSidebar>
      </DocsCard>
      <DocsCard title="Two lines" description="App name over a caption.">
        <MiniSidebar ariaLabel="Header two lines" height={96}>
          <AgentSidebarHeader logo={<SidebarLogo />} title="App Name" subtitle="Workspace" />
        </MiniSidebar>
      </DocsCard>
      <DocsCard title="One line + tag" description="App name with an inline Tag.">
        <MiniSidebar ariaLabel="Header with tag" height={96}>
          <AgentSidebarHeader
            logo={<SidebarLogo />}
            title="App Name"
            tag={
              <Tag color="brand" variant="tertiary" size="small">
                Beta
              </Tag>
            }
          />
        </MiniSidebar>
      </DocsCard>
      <DocsCard title="Editable title + search" description="Click the name to rename; trailing search.">
        <MiniSidebar ariaLabel="Header editable" height={96}>
          <AgentSidebarHeader
            logo={<SidebarLogo />}
            title={name}
            onTitleChange={setName}
            onSearch={() => undefined}
          />
        </MiniSidebar>
      </DocsCard>
      <DocsCard title="Collapsed" description="Reduces to the logo only.">
        <MiniSidebar ariaLabel="Header collapsed" collapsed height={96}>
          <AgentSidebarHeader logo={<SidebarLogo />} title="App Name" onSearch={() => undefined} />
        </MiniSidebar>
      </DocsCard>
    </DocsGrid>
  );
}

/** Collapsible section headers — expand / collapse a group of items. */
function AgentSidebarSectionVariantsDemo() {
  return (
    <DocsGrid minColumnWidth={300}>
      <DocsCard
        title="Collapsible section"
        description="The section header toggles its content open and closed. Two sections shown — one open, one collapsed by default."
      >
        <MiniSidebar ariaLabel="Collapsible sections" height={300}>
          <AgentSidebarContent>
            <AgentSidebarSection title="Recent chats" collapsible defaultExpanded>
              <AgentSidebarTextItem>Air fryer research</AgentSidebarTextItem>
              <AgentSidebarTextItem>Trip to Tokyo</AgentSidebarTextItem>
              <AgentSidebarTextItem>Q3 planning</AgentSidebarTextItem>
            </AgentSidebarSection>
            <AgentSidebarSection title="Projects" collapsible defaultExpanded={false}>
              <AgentSidebarTextItem>Polaris</AgentSidebarTextItem>
              <AgentSidebarTextItem>Atlas</AgentSidebarTextItem>
            </AgentSidebarSection>
          </AgentSidebarContent>
        </MiniSidebar>
      </DocsCard>
      <DocsCard
        title="Static section"
        description="A plain, always-visible section header (no toggle)."
      >
        <MiniSidebar ariaLabel="Static section" height={300}>
          <AgentSidebarContent>
            <AgentSidebarSection title="Recent chats">
              <AgentSidebarTextItem>Air fryer research</AgentSidebarTextItem>
              <AgentSidebarTextItem>Trip to Tokyo</AgentSidebarTextItem>
              <AgentSidebarTextItem>Q3 planning</AgentSidebarTextItem>
            </AgentSidebarSection>
          </AgentSidebarContent>
        </MiniSidebar>
      </DocsCard>
    </DocsGrid>
  );
}

/** Primary button-item variants. */
function AgentSidebarItemVariantsDemo() {
  return (
    <DocsGrid minColumnWidth={300}>
      <DocsCard title="Expanded items" description="Default, active/current, with Tag, and with a trailing control.">
        <MiniSidebar ariaLabel="Button item variants" height={240}>
          <AgentSidebarContent>
            <AgentSidebarItem leading={<Icon name="Home" decorative />}>Default</AgentSidebarItem>
            <AgentSidebarItem leading={<Icon name="Chat" decorative />} isCurrent>
              Active / current
            </AgentSidebarItem>
            <AgentSidebarItem
              leading={<Icon name="Star" decorative />}
              tag={
                <Tag color="brand" variant="tertiary" size="small">
                  3 Unread
                </Tag>
              }
            >
              With tag
            </AgentSidebarItem>
            <AgentSidebarItem
              leading={<Icon name="Bookmark" decorative />}
              trailing={
                <IconButton a11yLabel="Edit" color="tertiary" size="xsmall">
                  <EditIcon />
                </IconButton>
              }
            >
              With trailing
            </AgentSidebarItem>
          </AgentSidebarContent>
        </MiniSidebar>
      </DocsCard>
      <DocsCard title="Collapsed items" description="Each item becomes an icon button; the label is its tooltip / a11y name.">
        <MiniSidebar ariaLabel="Collapsed button items" collapsed height={240}>
          <AgentSidebarContent>
            <AgentSidebarItem leading={<Icon name="Home" decorative />}>Home</AgentSidebarItem>
            <AgentSidebarItem leading={<Icon name="Chat" decorative />} isCurrent>
              Chats
            </AgentSidebarItem>
            <AgentSidebarItem leading={<Icon name="Star" decorative />}>Starred</AgentSidebarItem>
            <AgentSidebarItem leading={<Icon name="Bookmark" decorative />}>Saved</AgentSidebarItem>
          </AgentSidebarContent>
        </MiniSidebar>
      </DocsCard>
    </DocsGrid>
  );
}

/** Secondary text-item variants. */
function AgentSidebarTextItemVariantsDemo() {
  return (
    <DocsGrid minColumnWidth={300}>
      <DocsCard
        title="Text items"
        description="Default, current, editable (click to rename), and with a trailing “…” overflow menu."
      >
        <MiniSidebar ariaLabel="Text item variants" height={240}>
          <AgentSidebarContent>
            <AgentSidebarSection title="Recent chats">
              <AgentSidebarTextItem>Default</AgentSidebarTextItem>
              <AgentSidebarTextItem isCurrent>Current</AgentSidebarTextItem>
              <EditableTextItemDemo initial="Editable — click to rename" />
              <AgentSidebarTextItem
                overflow={[{label: 'Rename'}, {label: 'Delete'}]}
              >
                With overflow menu
              </AgentSidebarTextItem>
            </AgentSidebarSection>
          </AgentSidebarContent>
        </MiniSidebar>
      </DocsCard>
    </DocsGrid>
  );
}

/* ------------------------------------------------------------------ */
/*  Focus Chat Container — full-screen blank/greeting state            */
/* ------------------------------------------------------------------ */
/**
 * The fixed-height (56 px) chat top app bar — the row that runs across the
 * top of the main content column and pixel-aligns with the AgentSidebar header
 * across the seam. Children are laid out in a horizontal flex row with a
 * default 12 px gap; use `<div style={{flex: 1}} />` between the leading title
 * cluster and the trailing action cluster.
 */
function ChatTopAppBar({
  children,
  style,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        // Locked height so the bar always pixel-aligns with the 56 px
        // AgentSidebar header — adding taller children should never grow it.
        height: 56,
        flex: '0 0 56px',
        padding: '0 16px',
        boxSizing: 'border-box',
        borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** The header title in the focus container — click to rename inline. */
function EditableTitle({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = () => {
    setEditing(false);
    const trimmed = draft.trim();
    if (trimmed && trimmed !== value) onChange(trimmed);
    else setDraft(value);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        aria-label="Edit title"
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
          else if (e.key === 'Escape') {
            setDraft(value);
            setEditing(false);
          }
        }}
        style={{
          font: 'inherit',
          fontSize: 16,
          fontWeight: 700,
          border: '2px solid var(--ld-semantic-color-field-border-activated, #0071dc)',
          borderRadius: 6,
          padding: '2px 6px',
          maxWidth: 220,
          outline: 'none',
        }}
      />
    );
  }

  return (
    // Heading for the chat/canvas title. h2 (not h1) because this demo page
    // already has an h1 and renders several chat surfaces; in a shipped
    // standalone chat view this would be the h1.
    <h2 style={{margin: 0, display: 'inline-flex'}}>
    <button
      type="button"
      onClick={() => {
        setDraft(value);
        setEditing(true);
      }}
      title="Click to rename"
      style={{
        appearance: 'none',
        border: 'none',
        background: 'none',
        padding: 0,
        cursor: 'pointer',
        font: 'inherit',
        borderRadius: 4,
        outlineOffset: 2,
        outlineColor: 'var(--ld-semantic-color-focused, #0071dc)',
      }}
    >
      {/* Body Medium 16 pt — the spec'd left-side header text size. */}
      <Body as="span" size="medium" weight="alt" UNSAFE_style={{margin: 0}}>
        {value}
      </Body>
    </button>
    </h2>
  );
}

/** True when the user has asked for reduced motion. */
function usePrefersReducedMotion(): boolean {
  return React.useMemo(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );
}

/**
 * Fills its slot in the main column and plays a gentle fade + rise on mount, so
 * swapping the focus chat between its greeting and engaged states reads as a
 * smooth transition rather than an instant cut. Honors reduced-motion.
 */
function FocusFadeIn({children}: {children: React.ReactNode}) {
  const reduce = usePrefersReducedMotion();
  const [shown, setShown] = React.useState(reduce);

  React.useEffect(() => {
    if (reduce) return;
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [reduce]);

  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(10px)',
        transition: reduce
          ? undefined
          : 'opacity 360ms ease, transform 360ms cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

/**
 * The Focus Chat Container — the full-bleed "blank canvas" state of an agent
 * experience. The {@link AgentSidebar} rail sits at the left; the main column
 * carries a top app bar (brand + title, with a trailing action cluster), an
 * optional banner, a vertically-centered greeting + {@link PromptComposer} with
 * starter suggestion chips, and a pinned footer disclaimer. It's where a
 * conversation begins before any messages exist.
 */
function FocusChatContainerDemo({
  showBanner,
  bannerVariant,
}: {
  showBanner: boolean;
  bannerVariant: SurfaceBannerVariant;
}) {
  const [collapsed, setCollapsed] = React.useState(true);
  const [bannerOpen, setBannerOpen] = React.useState(true);
  const [draft, setDraft] = React.useState('');
  const [title, setTitle] = React.useState('Title');
  // Once the user sends a request, the centered greeting gives way to the
  // in-chat experience (message list + pinned composer + docked canvas).
  const [messages, setMessages] = React.useState<string[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [canvasOpen, setCanvasOpen] = React.useState(false);
  const [bannerEl, setBannerEl] = React.useState<HTMLDivElement | null>(null);
  const started = messages.length > 0;

  // Re-open the banner whenever it's switched back on from the config controls.
  React.useEffect(() => {
    if (showBanner) setBannerOpen(true);
  }, [showBanner]);

  const suggestions = [
    'Compare two air fryers',
    'Plan a weekly meal prep',
    'Draft a return request',
  ];

  // Submitting a request engages the chat: append the message and run a brief
  // "thinking" beat. The canvas stays closed until the user explicitly opens it.
  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [...m, value]);
    setDraft('');
    setBusy(true);
    window.setTimeout(() => setBusy(false), 1500);
  };

  // The Close action in the app bar hands the surface back to the greeting.
  const resetToGreeting = () => {
    setMessages([]);
    setCanvasOpen(false);
    setBusy(false);
    setDraft('');
  };

  return (
    <SidebarFrame height={700}>
      <AgentSidebarProvider collapsed={collapsed} onCollapsedChange={setCollapsed}>
        <SidebarBody
          footerType="avatar-button"
          resizable
          minWidth={240}
          maxWidth={600}
        />

        {/* ── Main column ─────────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--ld-semantic-color-surface, #ffffff)',
          }}
        >
          {/* Top app bar — fixed 56 px so it pixel-aligns with the sidebar header. */}
          <ChatTopAppBar>
            <EditableTitle value={title} onChange={setTitle} />
            <div style={{flex: 1}} />
            <IconButton a11yLabel="Share" color="tertiary" size="small">
              <Icon name="Share" decorative />
            </IconButton>
            <IconButton a11yLabel="More actions" color="tertiary" size="small">
              <Icon name="More" decorative />
            </IconButton>
          </ChatTopAppBar>

          {/* Content area below the app bar. The banner floats sticky over the
              top of this area (centered) rather than pushing the content down. */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              minHeight: 0,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {showBanner && bannerOpen ? (
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  zIndex: 30,
                  pointerEvents: 'none',
                }}
              >
                <div ref={setBannerEl} style={{pointerEvents: 'auto'}}>
                  <Banner
                variant={bannerVariant}
                size="small"
                onClose={() => {
                  // Dismissing the banner unmounts its close button; hand focus
                  // to the composer so it isn't stranded on <body>.
                  const target = composerNear(bannerEl);
                  setBannerOpen(false);
                  if (target) requestAnimationFrame(() => target.focus());
                }}
              >
                    This is a banner message
                  </Banner>
                </div>
              </div>
            ) : null}

          {started ? (
            /* ── In-chat experience: chat + docked canvas ──────────── */
            <FocusFadeIn key="engaged">
              <FocusChatEngaged
                messages={messages}
                busy={busy}
                draft={draft}
                onDraftChange={setDraft}
                onSend={send}
                canvasOpen={canvasOpen}
                onOpenCanvas={() => setCanvasOpen(true)}
                onCloseCanvas={() => setCanvasOpen(false)}
                banner={bannerEl}
              />
            </FocusFadeIn>
          ) : (
            /* ── Greeting (blank) state ────────────────────────────── */
            <FocusFadeIn key="greeting">
              <div
                style={{
                  flex: 1,
                  minHeight: 0,
                  // Main content container: 464 px min, no max, 16/8 padding.
                  minWidth: 464,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 24,
                  padding: '8px 16px',
                  boxSizing: 'border-box',
                }}
              >
                <Heading as="h2" size="large" style={{margin: 0, textAlign: 'center'}}>
                  Chat greeting
                </Heading>

                <div style={{width: '100%', maxWidth: 640, display: 'grid', gap: 0}}>
                  <PromptComposer
                    size="large"
                    placeholder="Ask anything"
                    value={draft}
                    onValueChange={setDraft}
                    onSend={send}
                    toolbarStart={toolsPill()}
                    toolbarEnd={modelSelector()}
                    onAttachFiles={() => undefined}
                  />
                  <PromptComposerDisclaimer align="center">
                    AI can make mistakes. Be certain to review important info.
                  </PromptComposerDisclaimer>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 12,
                    justifyContent: 'center',
                    maxWidth: 640,
                  }}
                >
                  {suggestions.map((s) => (
                    <SuggestionButton
                      key={s}
                      variant="icon"
                      color="brandSubtle"
                      leading={<CornerArrowGlyph />}
                      onClick={() => send(s)}
                    >
                      {s}
                    </SuggestionButton>
                  ))}
                </div>
              </div>

              {/* Pinned footer disclaimer */}
              <div style={{padding: '12px 16px'}}>
                <PromptComposerDisclaimer align="center">
                  AI can make mistakes. Be certain to review important info.
                </PromptComposerDisclaimer>
              </div>
            </FocusFadeIn>
          )}
          </div>
        </div>
      </AgentSidebarProvider>
    </SidebarFrame>
  );
}

/**
 * The engaged state of the focus chat: a message list with the pinned composer,
 * and the AgentCanvas docked on the right (with a resize handle). Closing the
 * canvas hands the full width back to the chat; an "Open in canvas" affordance
 * on the agent reply brings it back.
 */
/** The minimum width (px) the floating overlay keeps for its chat pane. */
const CHAT_MIN_PX = 360;
/** The docked canvas's minimum width (px) before the divider stops. */
const CANVAS_MIN_PX = 300;

/**
 * Find the composer textarea nearest a floating element (e.g. a banner about to
 * be dismissed) by walking up to the first ancestor that also contains one.
 * Used to hand focus back to the composer when a floating control unmounts, so
 * focus isn't stranded on <body>. Capture the target BEFORE unmounting, since
 * walking a detached node can't reach the shared ancestor.
 */
function composerNear(el: HTMLElement | null): HTMLElement | null {
  let node: HTMLElement | null = el;
  while (node) {
    const ta = node.querySelector?.('textarea');
    if (ta) return ta as HTMLElement;
    node = node.parentElement;
  }
  return null;
}

/**
 * After a canvas opens/mounts, move focus into the newest canvas (its first
 * control) so opening it doesn't reset focus to <body> / the sidebar. Retries a
 * few frames because the canvas mounts and animates in. Scope to a container so
 * other demo sections' canvases on the page are ignored.
 */
function focusNewestCanvas(scope: HTMLElement | null) {
  let tries = 0;
  const attempt = () => {
    const all = scope?.querySelectorAll<HTMLElement>('.ld-agentcanvas');
    const last = all && all.length ? all[all.length - 1] : null;
    const target = last?.querySelector<HTMLElement>('button, a[href], [tabindex]') ?? null;
    if (target) {
      target.focus();
      if (document.activeElement === target) return;
    }
    if (tries++ < 15) requestAnimationFrame(attempt);
  };
  requestAnimationFrame(attempt);
}

/**
 * Manages focus across the agent chat send/receive cycle so keyboard and
 * screen-reader users keep their place (WCAG 2.4.3 Focus Order). Returns two
 * refs the caller must attach:
 *  - `responseRef` on the newest AgentResponse block (give it tabIndex={-1} and
 *    an aria-label) — focus moves here when a reply arrives so the user can tab
 *    forward through the new content instead of being stranded on <body>.
 *  - `composerWrapRef` on the element wrapping the PromptComposer — on send, if
 *    focus was dropped (e.g. a suggestion button unmounted), it returns here
 *    while the agent generates.
 *
 * It also announces the "thinking" state to screen readers via the shared
 * live-region utility when generation starts, since the visual "Thinking…"
 * label isn't otherwise announced. Pass `thinkingAnnouncement` to customize the
 * copy (default "Thinking…").
 */
function useSendReceiveFocus(
  busy: boolean,
  messageCount: number,
  thinkingAnnouncement = 'Thinking…',
) {
  const responseRef = React.useRef<HTMLDivElement>(null);
  const composerWrapRef = React.useRef<HTMLDivElement>(null);
  const prevBusy = React.useRef(busy);
  const announce = useAnnounce();
  React.useEffect(() => {
    const was = prevBusy.current;
    prevBusy.current = busy;
    if (!was && busy) {
      // Send started — politely announce the loading state (the visual
      // "Thinking…" label is not otherwise exposed to assistive tech)…
      announce.polite(thinkingAnnouncement);
      // …then restore focus to the composer if it was lost, deferring a frame so
      // this runs after the browser settles any unmount's focus reset.
      requestAnimationFrame(() => {
        const wrap = composerWrapRef.current;
        const textarea = wrap?.querySelector('textarea');
        if (wrap && textarea && !wrap.contains(document.activeElement)) {
          textarea.focus();
        }
      });
    } else if (was && !busy && messageCount > 0) {
      // Reply arrived — send focus to the top of the new agent response block.
      responseRef.current?.focus();
    }
  }, [busy, messageCount, announce, thinkingAnnouncement]);
  return {responseRef, composerWrapRef};
}

function FocusChatEngaged({
  messages,
  busy,
  draft,
  onDraftChange,
  onSend,
  canvasOpen,
  onOpenCanvas,
  onCloseCanvas,
  banner,
  composerSize: composerSizeOverride,
}: {
  messages: string[];
  busy: boolean;
  draft: string;
  onDraftChange: (v: string) => void;
  onSend: (v: string) => void;
  canvasOpen: boolean;
  onOpenCanvas: () => void;
  onCloseCanvas: () => void;
  banner?: HTMLElement | null;
  /** Force a specific composer size, bypassing width-based step-down. Used by
   *  the Chat Overlay so the floating window always renders the small
   *  composer regardless of its current width. */
  composerSize?: PromptComposerSize;
}) {
  // The docked canvas region is the shared AgentCanvas workspace. The parent
  // toggles `canvasOpen` (open / hand the width back to chat); this owns the
  // list of open canvases so 2+ can be arranged side by side or stacked.
  const [canvases, setCanvases] = React.useState<WorkspaceCanvas[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const canvasSeqRef = React.useRef(0);

  const makeCanvas = (title: string, alt = false): WorkspaceCanvas => ({
    id: `fc${++canvasSeqRef.current}`,
    title,
    body: <CanvasDetailBody alt={alt} />,
    actions: canvasEditAction(title),
    footer: canvasFooter(title),
  });

  // Seed the first canvas when the region opens; clear it when the parent
  // closes the region. Keyed only on `canvasOpen` so arranging / adding canvases
  // doesn't retrigger it.
  React.useEffect(() => {
    if (canvasOpen && canvases.length === 0) {
      const first = makeCanvas('Air fryer comparison');
      setCanvases([first]);
      setActiveId(first.id);
    } else if (!canvasOpen && canvases.length > 0) {
      setCanvases([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasOpen]);

  const addCanvas = () =>
    setCanvases((cs) => {
      if (cs.length >= 4) return cs;
      const next = makeCanvas(`New canvas ${canvasSeqRef.current + 1}`);
      setActiveId(next.id);
      return [...cs, next];
    });
  // Closing the last canvas hands the full width back to the chat.
  const closeCanvas = (id: string) => {
    const next = canvases.filter((c) => c.id !== id);
    setCanvases(next);
    setActiveId((a) => (a === id ? next[0]?.id ?? null : a));
    if (next.length === 0) onCloseCanvas();
  };

  // Focus lifecycle for the send/receive cycle (see useSendReceiveFocus).
  const {responseRef, composerWrapRef} = useSendReceiveFocus(busy, messages.length);

  // Mic dictation: clicking the mic enters the "Listening" state; the primary
  // submit button (or the ✕) leaves it.
  const [recording, setRecording] = React.useState(false);
  // Timeline scroll buttons.
  const scrollWrapRef = React.useRef<HTMLDivElement>(null);
  const [atTop, setAtTop] = React.useState(true);
  const [atBottom, setAtBottom] = React.useState(true);
  const getViewport = () =>
    scrollWrapRef.current?.querySelector('.ld-scroll-area-viewport') as HTMLElement | null;
  const updateScroll = React.useCallback(() => {
    const v = scrollWrapRef.current?.querySelector('.ld-scroll-area-viewport') as HTMLElement | null;
    if (!v) return;
    setAtTop(v.scrollTop <= 4);
    setAtBottom(v.scrollTop + v.clientHeight >= v.scrollHeight - 4);
  }, []);
  const scrollChat = (dir: 'up' | 'down') => {
    const v = getViewport();
    if (!v) return;
    v.scrollTo({top: dir === 'up' ? 0 : v.scrollHeight, behavior: 'smooth'});
    // The scroll button that triggered this hides once its edge is reached,
    // which would strand focus on <body>. Move focus to a stable target: the
    // composer when jumping to the latest, or the scroll region when jumping up.
    if (dir === 'down') {
      composerWrapRef.current?.querySelector('textarea')?.focus();
    } else {
      v.tabIndex = -1;
      v.focus();
    }
  };
  React.useLayoutEffect(() => {
    updateScroll();
  }, [updateScroll, messages, busy, canvasOpen]);

  // Floating scroll-up button shifts beneath a banner whose bounds overlap the
  // chat viewport's top-right region (panel-scoped or global-center banners).
  const scrollUpOffset = useScrollUpBannerClearance(banner, scrollWrapRef);

  // The chat panel drives its own composer size: full until it's dragged
  // narrower than CHAT_COMPACT_PX, then compact, and collapsed entirely (handing
  // the width to the canvas) once dragged past its min.
  const chat = useChatPanelSizing();
  // The canvas only docks when the container is wide enough for both panes at
  // their mins (so a tiny floating overlay shows the chat full-width and
  // re-docks once widened); the canvas state is preserved meanwhile.
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    setContainerWidth(el.clientWidth);
    const ro = new ResizeObserver(() => setContainerWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const canFitBoth =
    containerWidth === 0 || containerWidth >= CHAT_COLLAPSE_PX + CANVAS_MIN_PX + 12;
  const showCanvasDock = canvases.length > 0 && canFitBoth;
  // Measure the chat pane's own width (docked or full-width) so the composer
  // tracks the space it actually has: large → small → mobile as it narrows.
  const chatPaneRef = React.useRef<HTMLDivElement>(null);
  const [chatWidth, setChatWidth] = React.useState(0);
  React.useEffect(() => {
    const el = chatPaneRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    setChatWidth(el.clientWidth);
    const ro = new ResizeObserver(() => setChatWidth(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [showCanvasDock]);
  const measuredComposerSize: PromptComposerSize =
    chatWidth === 0
      ? 'large'
      : chatWidth < CHAT_MOBILE_PX
      ? 'mobile'
      : chatWidth < CHAT_COMPACT_PX
      ? 'small'
      : 'large';
  const composerSize = composerSizeOverride ?? measuredComposerSize;
  // Opening a canvas is driven by the chat: the first click opens the dock; each
  // later click adds another canvas to the workspace (up to four).
  const openCanvas = () => {
    if (canvases.length === 0) onOpenCanvas();
    else addCanvas();
    // Move focus into the canvas that just opened so it isn't reset to <body>.
    focusNewestCanvas(rootRef.current);
  };

  const chatPane = (
    <div
      ref={chatPaneRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        // The "main content container" — body holding the conversation + composer.
        // Spec'd minimum width is 464 px; no max-width so it grows freely as the
        // browser widens.
        minWidth: 464,
        boxSizing: 'border-box',
        // Clip content so a collapsed chat panel (width 0) never spills over the
        // canvas docked beside it.
        overflow: 'hidden',
      }}
    >
      <div
        ref={scrollWrapRef}
        onScrollCapture={updateScroll}
        style={{flex: 1, minHeight: 0, minWidth: 0, position: 'relative'}}
      >
        {!atBottom ? (
          <div style={{position: 'absolute', bottom: 8, right: 8, zIndex: 20}}>
            <ScrollButton direction="down" onClick={() => scrollChat('down')} />
          </div>
        ) : null}
        {!atTop ? (
          <div
            style={{
              position: 'absolute',
              top: SCROLL_UP_BASELINE_TOP + scrollUpOffset,
              right: SCROLL_UP_RIGHT,
              zIndex: 20,
              transition: 'top 0.2s ease-in-out',
            }}
          >
            <ScrollButton direction="up" onClick={() => scrollChat('up')} />
          </div>
        ) : null}
        {/* Bottom-aligned scroll-fade gradient — sits at the bottom of the
            scroll viewport (immediately above the pinned composer), fading
            transparent → surface so content behind the composer reads as
            falling-off. Hidden when there are no messages or the user is
            already scrolled to the bottom. */}
        {messages.length > 0 && !atBottom ? (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 48,
              pointerEvents: 'none',
              zIndex: 10,
              background:
                'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, var(--ld-semantic-color-surface, #ffffff) 100%)',
            }}
          />
        ) : null}
        <ScrollArea UNSAFE_style={{height: '100%', width: '100%', overflowX: 'hidden'}}>
          <div
            style={{
              display: 'grid',
              // 32 px between turns (user prompt ↔ agent response, agent ↔ next user).
              gap: 32,
              // Body container padding: 16 px L/R, 8 px T/B per spec.
              padding: '8px 16px',
              width: '100%',
              minWidth: 0,
              boxSizing: 'border-box',
            }}
          >
            {messages.map((m, i) => {
              const isLast = i === messages.length - 1;
              return (
                <React.Fragment key={i}>
                  <UserResponse>{m}</UserResponse>
                  {isLast && !busy ? (
                    <div style={{display: 'grid', gap: 6}}>
                      <AgentResponse
                        ref={responseRef}
                        tabIndex={-1}
                        hideAvatar
                        slot={
                          <ItemTile
                            image={PRODUCT_IMAGES.airFryer}
                            name="Ninja 4 Qt Air Fryer, Nonstick Basket"
                            price="98"
                            cents="00"
                            badge={{label: 'Popular', type: 'popular'}}
                          />
                        }
                        timestamp="Read · 9:41 AM"
                      >
                        Here's a popular option — I've opened the details in the canvas.
                      </AgentResponse>
                      <button
                        type="button"
                        onClick={() => canvases.length < 4 && openCanvas()}
                        aria-disabled={canvases.length >= 4}
                        style={{
                          appearance: 'none',
                          border: 'none',
                          background: 'none',
                          padding: 0,
                          font: 'inherit',
                          cursor: canvases.length < 4 ? 'pointer' : 'default',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          justifySelf: 'start',
                        }}
                      >
                        <Icon
                          name="Maximize"
                          decorative
                          style={{fontSize: '0.875rem', color: 'var(--ld-semantic-color-text-subtle, #515357)'}}
                        />
                        <Caption color="subtle">
                          {canvases.length >= 4
                            ? 'Canvas limit reached'
                            : canvases.length === 0
                            ? 'Open in canvas'
                            : 'Open another canvas'}
                        </Caption>
                      </button>
                    </div>
                  ) : null}
                </React.Fragment>
              );
            })}
            {busy ? <AgentResponse hideAvatar thinking /> : null}
          </div>
        </ScrollArea>
      </div>

      {/* Composer pinned to the bottom — body container padding (16 L/R, 8 T/B). */}
      <div
        style={{
          padding: '8px 16px',
          display: 'grid',
          gap: 0,
          borderTop: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        }}
        ref={composerWrapRef}
      >
        <PromptComposer
          size={composerSize}
          placeholder="Ask anything"
          value={draft}
          onValueChange={onDraftChange}
          onSend={onSend}
          busy={busy}
          recording={recording}
          dictationVariant="listening"
          onMicToggle={() =>
            setRecording((r) => {
              const next = !r;
              // Simulate a live transcript arriving while listening so the
              // submit (arrow-up) button always has something to send.
              if (next && !draft) onDraftChange("What's a good air fryer under $100?");
              return next;
            })
          }
          toolbarStart={<ResponsiveToolsPill />}
          toolbarEnd={modelSelector()}
          onAttachFiles={() => undefined}
        />
        <PromptComposerDisclaimer align="center">
          AI can make mistakes. Be certain to review important info.
        </PromptComposerDisclaimer>
      </div>
    </div>
  );

  // Render the docked region once at least one canvas exists. The seed effect
  // opens the first canvas the moment the parent flips `canvasOpen` on.
  return (
    <div ref={rootRef} style={{position: 'relative', flex: 1, minHeight: 0, minWidth: 0}}>
      {showCanvasDock ? (
        <>
          <ResizablePanelGroup direction="horizontal">
            {/* Chat panel — full composer until narrowed, then compact; drag it
                past its min to collapse the chat entirely (the canvas keeps the
                freed width). */}
            <ResizablePanel
              panelRef={chat.panelRef}
              onResize={chat.onResize}
              defaultSize="55%"
              minSize={`${CHAT_COLLAPSE_PX}px`}
              collapsible
              collapsedSize={0}
            >
              {chatPane}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="400px" minSize={`${CANVAS_MIN_PX}px`}>
              {/* The canvas lives OUTSIDE the chat body container with 16 px
                  of breathing room around it, per the design spec. */}
              <div style={{height: '100%', padding: 16, boxSizing: 'border-box'}}>
                {/* A single canvas fills the panel; add a second to arrange them
                    (drag to lay side by side or stack, or maximize one). */}
                <CanvasWorkspace
                  items={canvases}
                  onReorder={setCanvases}
                  activeId={activeId}
                  onActiveChange={setActiveId}
                  onClose={closeCanvas}
                  allowCloseLast
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
          {chat.collapsed ? <ShowChatButton onClick={chat.expand} /> : null}
        </>
      ) : (
        chatPane
      )}
    </div>
  );
}

/** The focus container plus its banner configuration (banner off by default). */
function FocusChatSection() {
  const [showBanner, setShowBanner] = React.useState(false);
  const [bannerVariant, setBannerVariant] = React.useState<SurfaceBannerVariant>('error');

  return (
    <ComponentConfigurationCard
      stack
      controls={
        <>
          <Checkbox
            label="Show banner"
            checked={showBanner}
            onChange={(e) => setShowBanner(e.target.checked)}
          />
          <div style={{display: 'grid', gap: 6}}>
            <Body as="span" size="small" weight="alt">
              Banner variant
            </Body>
            <RadioGroupRow
              name="focus-banner-variant"
              value={bannerVariant}
              onChange={setBannerVariant}
              options={[
                {value: 'error', label: 'Error'},
                {value: 'warning', label: 'Warning'},
                {value: 'info', label: 'Info'},
                {value: 'success', label: 'Success'},
              ]}
            />
          </div>
        </>
      }
      preview={<FocusChatContainerDemo showBanner={showBanner} bannerVariant={bannerVariant} />}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Chat Overlay — floating, draggable, resizable canvas               */
/* ------------------------------------------------------------------ */
/**
 * A faint mock of the "host" screen the overlay floats above — a top app bar
 * and a grid of placeholder product cards. Purely decorative; it never receives
 * pointer events so the overlay above it stays fully interactive.
 */
function ChatOverlayBackdropContent() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        opacity: 0.55,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* Faux app bar */}
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <div style={{width: 28, height: 28, borderRadius: 8, background: 'var(--ld-semantic-color-fill-brand, #0053e2)'}} />
        <div style={{width: 120, height: 12, borderRadius: 6, background: 'var(--ld-semantic-color-fill-secondary, #e3e4e5)'}} />
        <div style={{flex: 1}} />
        <div style={{width: 220, height: 28, borderRadius: 999, background: 'var(--ld-semantic-color-fill-secondary, #e3e4e5)'}} />
        <div style={{width: 28, height: 28, borderRadius: 999, background: 'var(--ld-semantic-color-fill-secondary, #e3e4e5)'}} />
      </div>
      {/* Faux product grid */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 16,
        }}
      >
        {Array.from({length: 12}).map((_, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gap: 8,
              gridTemplateRows: '1fr auto auto',
              padding: 12,
              borderRadius: 12,
              background: 'var(--ld-semantic-color-surface, #ffffff)',
              border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
            }}
          >
            <div style={{borderRadius: 8, background: 'var(--ld-semantic-color-fill-secondary, #f0f1f2)', minHeight: 70}} />
            <div style={{height: 10, width: '80%', borderRadius: 5, background: 'var(--ld-semantic-color-fill-secondary, #e3e4e5)'}} />
            <div style={{height: 10, width: '40%', borderRadius: 5, background: 'var(--ld-semantic-color-fill-secondary, #e3e4e5)'}} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The Chat Overlay — the focus-chat experience packaged as a floating window
 * that hovers above the host screen. Grab the title bar to move it anywhere,
 * drag the bottom-right grip to resize it to any size, maximize it to fill the
 * screen, toggle the side rail, show or hide the docked canvas, or close it.
 */
function ChatOverlayDemo({
  showBanner,
  bannerVariant,
  showSidebar,
  onToggleSidebar,
}: {
  showBanner: boolean;
  bannerVariant: SurfaceBannerVariant;
  showSidebar: boolean;
  onToggleSidebar: () => void;
}) {
  const screenRef = React.useRef<HTMLDivElement>(null);
  const windowRef = React.useRef<HTMLDivElement>(null);
  const dragState = React.useRef<{px: number; py: number; ox: number; oy: number} | null>(null);

  const [open, setOpen] = React.useState(true);
  const [pos, setPos] = React.useState({x: 72, y: 48});
  const [size, setSize] = React.useState({w: 720, h: 520});
  const [maximized, setMaximized] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const [bannerOpen, setBannerOpen] = React.useState(true);
  const [bannerEl, setBannerEl] = React.useState<HTMLDivElement | null>(null);

  // Re-open the banner whenever it's switched back on from the config controls.
  React.useEffect(() => {
    if (showBanner) setBannerOpen(true);
  }, [showBanner]);

  // Chat state — pre-seeded so the engaged experience (chat + docked canvas) is
  // visible the moment the overlay opens.
  const [title, setTitle] = React.useState('Air fryer research');
  const [draft, setDraft] = React.useState('');
  const [messages, setMessages] = React.useState<string[]>([
    'Find me a highly-rated air fryer under $100.',
  ]);
  const [busy, setBusy] = React.useState(false);
  const [canvasOpen, setCanvasOpen] = React.useState(true);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [...m, value]);
    setDraft('');
    setCanvasOpen(true);
    setBusy(true);
    window.setTimeout(() => setBusy(false), 1500);
  };

  // Keep React's size state in sync with the browser's native `resize: both`
  // grip so re-renders (typing, sending) never snap the window back to its
  // starting dimensions.
  React.useEffect(() => {
    const el = windowRef.current;
    if (!el || maximized || !open) return;
    const ro = new ResizeObserver(() => {
      setSize((s) => {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        return s.w === w && s.h === h ? s : {w, h};
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [maximized, open]);

  const onHeaderPointerDown = (e: React.PointerEvent) => {
    if (maximized) return;
    // Don't start a drag from one of the header's controls.
    if ((e.target as HTMLElement).closest('button, a, input, textarea, select')) return;
    const screen = screenRef.current;
    if (!screen) return;
    dragState.current = {px: e.clientX, py: e.clientY, ox: pos.x, oy: pos.y};
    setDragging(true);

    const move = (ev: PointerEvent) => {
      const d = dragState.current;
      if (!d) return;
      const rect = screen.getBoundingClientRect();
      const win = windowRef.current;
      const w = win?.offsetWidth ?? size.w;
      // Clamp so at least a strip of the window stays grabbable on screen.
      const nx = Math.max(0, Math.min(d.ox + (ev.clientX - d.px), rect.width - Math.min(w, 120)));
      const ny = Math.max(0, Math.min(d.oy + (ev.clientY - d.py), rect.height - 48));
      setPos({x: nx, y: ny});
    };
    const up = () => {
      dragState.current = null;
      setDragging(false);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
    e.preventDefault();
  };

  const chrome: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--ld-semantic-color-surface, #ffffff)',
    border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
    borderRadius: 16,
    boxShadow: 'var(--ld-semantic-elevation-300, 0 12px 32px rgba(0,0,0,0.18))',
    overflow: 'hidden',
    zIndex: 2,
  };

  const windowStyle: React.CSSProperties = maximized
    ? {...chrome, left: 12, top: 12, right: 12, bottom: 12, resize: 'none'}
    : {
        ...chrome,
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
        // Keep the chat pane at its small-size minimum (CHAT_MIN_PX + chrome),
        // plus the side rail's own minimum when it's shown, so the composer
        // toolbar never overlaps regardless of how narrow the window is dragged.
        minWidth: CHAT_MIN_PX + 20 + (showSidebar ? 201 : 0),
        minHeight: 360,
        maxWidth: 'calc(100% - 24px)',
        maxHeight: 'calc(100% - 24px)',
        resize: 'both',
      };

  return (
    <div
      ref={screenRef}
      style={{
        position: 'relative',
        height: 660,
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        background: 'var(--ld-semantic-color-surface-subtle, #f7f8f8)',
      }}
    >
      <ChatOverlayBackdropContent />

      {open ? (
        <div ref={windowRef} style={windowStyle}>
          {/* ── Title bar / drag handle (fixed 56 px) ────────────────── */}
          <ChatTopAppBar
            onPointerDown={onHeaderPointerDown}
            style={{
              gap: 8,
              background: 'var(--ld-semantic-color-surface, #ffffff)',
              cursor: maximized ? 'default' : dragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              touchAction: 'none',
            }}
          >
            <IconButton
              a11yLabel={showSidebar ? 'Hide sidebar' : 'Show sidebar'}
              color="tertiary"
              size="small"
              onClick={onToggleSidebar}
            >
              <Icon name={showSidebar ? 'LeftPanelFill' : 'LeftPanel'} />
            </IconButton>
            <EditableTitle value={title} onChange={setTitle} />
            <div style={{flex: 1}} />
            <IconButton
              a11yLabel={maximized ? 'Restore overlay' : 'Maximize overlay'}
              color="tertiary"
              size="small"
              onClick={() => setMaximized((m) => !m)}
            >
              <Icon name={maximized ? 'Minimize' : 'Maximize'} />
            </IconButton>
            <IconButton
              a11yLabel="Close overlay"
              color="tertiary"
              size="small"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </ChatTopAppBar>

          {/* ── Body: optional side rail + chat / docked canvas ─────── */}
          <AgentSidebarProvider collapsed={false}>
            <div style={{flex: 1, minHeight: 0, minWidth: 0, display: 'flex', position: 'relative'}}>
              {/* Banner — floats over the top of the body instead of pushing it down */}
              {showBanner && bannerOpen ? (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 30,
                    padding: 12,
                    display: 'flex',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <div ref={setBannerEl} style={{pointerEvents: 'auto'}}>
                    <Banner
                variant={bannerVariant}
                size="small"
                onClose={() => {
                  // Dismissing the banner unmounts its close button; hand focus
                  // to the composer so it isn't stranded on <body>.
                  const target = composerNear(bannerEl);
                  setBannerOpen(false);
                  if (target) requestAnimationFrame(() => target.focus());
                }}
              >
                      This is a banner message
                    </Banner>
                  </div>
                </div>
              ) : null}
              {showSidebar ? (
                <SidebarBody resizable minWidth={200} maxWidth={320} />
              ) : null}
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  borderLeft: showSidebar
                    ? '1px solid var(--ld-semantic-color-separator, #e3e4e5)'
                    : undefined,
                }}
              >
                <FocusChatEngaged
                  messages={messages}
                  busy={busy}
                  draft={draft}
                  onDraftChange={setDraft}
                  onSend={send}
                  canvasOpen={canvasOpen}
                  onOpenCanvas={() => setCanvasOpen(true)}
                  onCloseCanvas={() => setCanvasOpen(false)}
                  banner={bannerEl}
                  composerSize="small"
                />
              </div>
            </div>
          </AgentSidebarProvider>
        </div>
      ) : (
        /* Closed — a single affordance brings the overlay back. */
        <div
          style={{
            position: 'absolute',
            right: 20,
            bottom: 20,
            zIndex: 2,
          }}
        >
          <Button
            variant="primary"
            leading={<Icon name="Chat" decorative />}
            onClick={() => setOpen(true)}
          >
            Open chat overlay
          </Button>
        </div>
      )}
    </div>
  );
}

/** The Chat Overlay example plus its configuration (banner + side rail). */
function ChatOverlaySection() {
  const [showBanner, setShowBanner] = React.useState(false);
  const [bannerVariant, setBannerVariant] = React.useState<SurfaceBannerVariant>('error');
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <ComponentConfigurationCard
      stack
      controls={
        <>
          <Checkbox
            label="Show sidebar"
            checked={showSidebar}
            onChange={(e) => setShowSidebar(e.target.checked)}
          />
          <Checkbox
            label="Show banner"
            checked={showBanner}
            onChange={(e) => setShowBanner(e.target.checked)}
          />
          <div style={{display: 'grid', gap: 6}}>
            <Body as="span" size="small" weight="alt">
              Banner variant
            </Body>
            <RadioGroupRow
              name="overlay-banner-variant"
              value={bannerVariant}
              onChange={setBannerVariant}
              options={[
                {value: 'error', label: 'Error'},
                {value: 'warning', label: 'Warning'},
                {value: 'info', label: 'Info'},
                {value: 'success', label: 'Success'},
              ]}
            />
          </div>
        </>
      }
      preview={
        <ChatOverlayDemo
          showBanner={showBanner}
          bannerVariant={bannerVariant}
          showSidebar={showSidebar}
          onToggleSidebar={() => setShowSidebar((s) => !s)}
        />
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/*  App Demo — focus chat → docked side panel → overlay flow           */
/* ------------------------------------------------------------------ */

/** The five surface modes the App Demo cycles through. */
type AppDemoMode =
  | 'focus'
  | 'docked'
  | 'overlay-default'
  | 'overlay-large'
  | 'overlay-full';

/** Side-panel width when docked beside the host dashboard. */
const APP_DEMO_DOCK_WIDTH = 384;
/** Default size of the floating chat overlay (small floating window). */
const APP_DEMO_OVERLAY_DEFAULT = {w: 384, h: 540};
/** Large size — the user has expanded the overlay. */
const APP_DEMO_OVERLAY_LARGE = {w: 720, h: 620};

/** A small wrapper that renders one of the published Lottie brand emotes. */
function AppDemoLottie({
  name,
  size = 64,
  label,
}: {
  name: 'MartyEmotes' | 'WibeyEmotes';
  size?: number;
  /** When set, the mark is exposed as an image with this accessible name;
   *  otherwise it is decorative (aria-hidden) — e.g. when a parent already
   *  labels it. */
  label?: string;
}) {
  const raw = LOTTIE_DATA[name];
  const a11y = label
    ? ({role: 'img', 'aria-label': label} as const)
    : ({'aria-hidden': true} as const);
  if (!raw) {
    return (
      <div
        {...a11y}
        style={{
          width: size,
          height: size,
          borderRadius: size <= 28 ? 8 : '50%',
          background:
            name === 'MartyEmotes'
              ? 'linear-gradient(135deg, #c8b8f2 0%, #8b6dd9 100%)'
              : 'linear-gradient(135deg, #6dd6c0 0%, #2fa893 100%)',
        }}
      />
    );
  }
  return (
    <span {...a11y} style={{display: 'inline-flex', lineHeight: 0}}>
      <DotLottieReact
        src={`data:application/zip;base64,${raw}`}
        autoplay
        loop
        style={{
          width: size,
          height: size,
          borderRadius: size <= 28 ? 8 : undefined,
        }}
      />
    </span>
  );
}

/** Faux browser tab chrome that frames the App Demo's host surface. */
function AppDemoBrowserChrome({children}: {children: React.ReactNode}) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--ld-semantic-color-surface-subtle, #f7f8f8)',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
      }}
    >
      {/* Title-bar row — traffic lights + active tab + new tab. */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 14px 0',
          background: 'var(--ld-semantic-color-fill-secondary, #ececee)',
        }}
      >
        <div style={{display: 'flex', gap: 6}}>
          <span style={{width: 12, height: 12, borderRadius: '50%', background: '#ff5f57'}} />
          <span style={{width: 12, height: 12, borderRadius: '50%', background: '#febc2e'}} />
          <span style={{width: 12, height: 12, borderRadius: '50%', background: '#28c840'}} />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            background: 'var(--ld-semantic-color-surface, #ffffff)',
            borderRadius: '8px 8px 0 0',
            minWidth: 180,
            fontSize: 12,
            color: 'var(--ld-semantic-color-text-default, #2e2f32)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" fill="#ffc220" />
          </svg>
          <span>Walmart</span>
          <span style={{flex: 1}} />
          <span style={{color: 'var(--ld-semantic-color-text-subtle, #74767c)', fontSize: 14}}>×</span>
        </div>
        <span style={{color: 'var(--ld-semantic-color-text-subtle, #74767c)', fontSize: 16}}>+</span>
      </div>
      {/* URL bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 14px',
          background: 'var(--ld-semantic-color-surface, #ffffff)',
          borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        }}
      >
        <span style={{color: 'var(--ld-semantic-color-text-subtle, #74767c)', fontSize: 14}}>‹</span>
        <span style={{color: 'var(--ld-semantic-color-text-subtle, #74767c)', fontSize: 14}}>›</span>
        <span style={{color: 'var(--ld-semantic-color-text-subtle, #74767c)', fontSize: 13}}>↻</span>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            background: 'var(--ld-semantic-color-fill-secondary, #f0f1f2)',
            borderRadius: 999,
            fontSize: 11,
            color: 'var(--ld-semantic-color-text-subtle, #74767c)',
          }}
        >
          <span style={{fontSize: 9}}>🔒</span>
          https://www.walmart.com
        </div>
        <span style={{color: 'var(--ld-semantic-color-text-subtle, #74767c)', fontSize: 14}}>⋮</span>
      </div>
      <div style={{flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden'}}>
        {children}
      </div>
    </div>
  );
}

/** A mock dashboard surface that lives behind the docked / overlay chat. */
function AppDemoDashboard() {
  const topSellers = [
    {img: PRODUCT_IMAGES.airFryer, name: 'Ninja 4 Qt Air Fryer', units: '218 sold'},
    {img: PRODUCT_IMAGES.cordlessVacuum, name: 'Cordless Stick Vacuum', units: '184 sold'},
    {img: PRODUCT_IMAGES.headphones, name: 'Wireless Headphones', units: '152 sold'},
  ];

  const activity: Array<{
    color: 'brand' | 'green' | 'yellow' | 'gray';
    label: string;
    meta: string;
  }> = [
    {color: 'brand', label: 'New order #38421', meta: 'Just now'},
    {color: 'green', label: 'Inventory restocked — Aisle 4', meta: '12 min ago'},
    {color: 'yellow', label: 'Pickup pending — 3 orders', meta: '24 min ago'},
    {color: 'gray', label: 'Daily summary emailed', meta: '1 hr ago'},
  ];

  return (
    <div
      style={{
        height: '100%',
        overflow: 'auto',
        padding: 24,
        background: 'var(--ld-semantic-color-surface, #ffffff)',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24}}>
        <Heading as="h2" size="medium" style={{margin: 0}}>
          Hi Mariah, here's your morning
        </Heading>
        <div style={{flex: 1}} />
        <Tag color="green" size="small">Live</Tag>
      </div>

      {/* Metric strip — 4-up at md+, 2-up at sm via the LD grid. */}
      <Grid hasGutter>
        <GridColumn sm={6} md={3}>
          <Metric
            title="Daily orders"
            value="1,284"
            textLabel="12% vs yesterday"
            variant="positiveUp"
          />
        </GridColumn>
        <GridColumn sm={6} md={3}>
          <Metric
            title="Revenue today"
            value="$24,318"
            textLabel="8% vs yesterday"
            variant="positiveUp"
          />
        </GridColumn>
        <GridColumn sm={6} md={3}>
          <Metric
            title="Avg. basket"
            value="$48.20"
            textLabel="2.4 items / order"
          />
        </GridColumn>
        <GridColumn sm={6} md={3}>
          <Metric
            title="Returns"
            value="32"
            textLabel="4% vs yesterday"
            variant="positiveDown"
          />
        </GridColumn>
      </Grid>

      <div style={{height: 16}} />

      {/* Chart card */}
      <Card>
        <CardHeader
          title="Revenue · last 7 days"
          trailing={<Caption color="subtle">$148,902 total</Caption>}
        />
        <CardContent>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 8, height: 96}}>
            {[42, 58, 49, 71, 64, 82, 78].map((v, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${v}%`,
                  borderRadius: '6px 6px 0 0',
                  background:
                    i === 6
                      ? 'var(--ld-semantic-color-fill-brand, #0053e2)'
                      : 'var(--ld-semantic-color-fill-brand-subtle, #c2dafe)',
                }}
              />
            ))}
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 8}}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <Caption key={i} color="subtle">{d}</Caption>
            ))}
          </div>
        </CardContent>
      </Card>

      <div style={{height: 16}} />

      {/* Two-column row: top sellers + recent activity */}
      <Grid hasGutter>
        <GridColumn sm={12} md={6}>
          <Card>
            <CardHeader title="Top sellers" />
            <CardContent>
              <List>
                {topSellers.map((p) => (
                  <ListItem
                    key={p.name}
                    leading={
                      <Image
                        src={p.img}
                        alt={p.name}
                        width={40}
                        height={40}
                        UNSAFE_style={{
                          borderRadius: 6,
                          objectFit: 'cover',
                          background: '#f5f5f7',
                          display: 'block',
                        }}
                      />
                    }
                    title={p.name}
                    trailing={<ChevronRightIcon decorative size="small" />}
                  >
                    {p.units}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </GridColumn>

        <GridColumn sm={12} md={6}>
          <Card>
            <CardHeader title="Recent activity" />
            <CardContent>
              <List>
                {activity.map((row) => (
                  <ListItem
                    key={row.label}
                    leading={<Badge color={row.color} size="small" />}
                    trailing={<Caption color="subtle">{row.meta}</Caption>}
                  >
                    {row.label}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </GridColumn>
      </Grid>
    </div>
  );
}

/** The Wibey chat panel body — greeting + suggestions when blank, message
 *  list once the conversation begins. The composer is always pinned to the
 *  bottom. Shared by the docked side-panel and the overlay variants. */
function WibeyPanelBody({
  messages,
  busy,
  draft,
  onDraftChange,
  onSend,
  composerSize = 'large',
}: {
  messages: string[];
  busy: boolean;
  draft: string;
  onDraftChange: (v: string) => void;
  onSend: (v: string) => void;
  composerSize?: PromptComposerSize;
}) {
  const blank = messages.length === 0;
  const suggestions = [
    'Summarize today\'s top sellers',
    'Forecast next week\'s revenue',
    'Show me low-stock SKUs',
    'Draft a customer follow-up',
  ];

  // Focus lifecycle for the send/receive cycle (see useSendReceiveFocus).
  const {responseRef, composerWrapRef} = useSendReceiveFocus(busy, messages.length);

  return (
    <div style={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column'}}>
      <div style={{flex: 1, minHeight: 0}}>
        <ScrollArea UNSAFE_style={{height: '100%', width: '100%'}}>
          {/* Body container: 16/8 padding, 32 px between turns. */}
          <div style={{display: 'grid', gap: 32, padding: '8px 16px'}}>
            {blank ? (
              <>
                <Heading as="h3" size="medium" style={{margin: 0}}>
                  Hi Mariah
                </Heading>
                <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: 1.5}}>
                  &quot;Lorem ipsum dolor sit amet consectetur. Non aliquam aliquet vehicula
                  dolor id ut donec in. Viverra mi semper sit id. At&quot;
                </Body>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, marginTop: 4}}>
                  {suggestions.map((s) => (
                    <SuggestionButton
                      key={s}
                      variant="icon"
                      color="brandSubtle"
                      leading={<CornerArrowGlyph />}
                      onClick={() => onSend(s)}
                    >
                      {s}
                    </SuggestionButton>
                  ))}
                </div>
              </>
            ) : (
              messages.map((m, i) => {
                const isLast = i === messages.length - 1;
                return (
                  <React.Fragment key={i}>
                    <UserResponse>{m}</UserResponse>
                    {isLast && !busy ? (
                      <AgentResponse
                        ref={responseRef}
                        tabIndex={-1}
                        hideAvatar
                        timestamp="Just now"
                      >
                        Here&apos;s what I found in your dashboard. Want me to drill into a
                        specific metric or compare it to last week?
                      </AgentResponse>
                    ) : null}
                  </React.Fragment>
                );
              })
            )}
            {busy ? <AgentResponse hideAvatar thinking /> : null}
          </div>
        </ScrollArea>
      </div>

      {/* Composer pinned to the bottom — body container padding (16 L/R, 8 T/B). */}
      <div
        style={{
          padding: '8px 16px',
          display: 'grid',
          gap: 0,
          borderTop: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        }}
        ref={composerWrapRef}
      >
        <PromptComposer
          size={composerSize}
          placeholder="Ask anything"
          value={draft}
          onValueChange={onDraftChange}
          onSend={onSend}
          busy={busy}
          toolbarStart={<ResponsiveToolsPill />}
          onAttachFiles={() => undefined}
        />
        <PromptComposerDisclaimer align="center">
          AI can make mistakes. Be certain to review important info.
        </PromptComposerDisclaimer>
      </div>
    </div>
  );
}

/** The brand row at the top of the Wibey chat panel — Lottie mark + name. */
function WibeyHeader({
  showBack,
  onBack,
  trailing,
}: {
  showBack?: boolean;
  onBack?: () => void;
  trailing: React.ReactNode;
}) {
  return (
    <ChatTopAppBar
      style={{
        gap: 10,
        background: 'var(--ld-semantic-color-surface, #ffffff)',
      }}
    >
      {showBack ? (
        <IconButton
          a11yLabel="Back"
          color="tertiary"
          size="small"
          onClick={onBack}
        >
          <Icon name="ArrowLeft" decorative />
        </IconButton>
      ) : null}
      <AppDemoLottie name="WibeyEmotes" size={28} />
      <Body as="span" size="medium" weight="alt" UNSAFE_style={{margin: 0}}>
        Wibey
      </Body>
      <div style={{flex: 1}} />
      {trailing}
    </ChatTopAppBar>
  );
}

/** The focus-chat blank state — full-bleed greeting with the Marty Lottie. */
function AppDemoFocusChat({
  draft,
  onDraftChange,
  onSend,
}: {
  draft: string;
  onDraftChange: (v: string) => void;
  onSend: (v: string) => void;
}) {
  const [title, setTitle] = React.useState('Title');
  const [collapsed, setCollapsed] = React.useState(true);
  const suggestions = [
    'Summarize today\'s top sellers',
    'Forecast next week\'s revenue',
    'Draft a customer follow-up',
  ];

  return (
    <SidebarFrame height={760}>
      <AgentSidebarProvider collapsed={collapsed} onCollapsedChange={setCollapsed}>
        {/* Sidebar — collapsed icon rail with the Marty mark + workspace items + user. */}
        <AgentSidebar aria-label="Workspace">
          <AgentSidebarHeader logo={<AppDemoLottie name="MartyEmotes" size={28} />} title="Marty" />
          <AgentSidebarContent>
            <AgentSidebarItem leading={<Icon name="Chat" decorative />} isCurrent>
              Chats
            </AgentSidebarItem>
            <AgentSidebarItem leading={<Icon name="Article" decorative />}>
              Docs
            </AgentSidebarItem>
            <AgentSidebarItem leading={<Icon name="Bookmark" decorative />}>
              Saved
            </AgentSidebarItem>
          </AgentSidebarContent>
          <AgentSidebarFooter
            type="avatar-button"
            avatar={{a11yLabel: 'Mariah Chen', name: 'MC', color: 'brand'}}
            label="Mariah Chen"
            onClick={() => undefined}
          />
        </AgentSidebar>

        {/* Main column */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--ld-semantic-color-surface, #ffffff)',
          }}
        >
          {/* Top app bar — fixed 56 px so it pixel-aligns with the sidebar header. */}
          <ChatTopAppBar>
            <IconButton
              a11yLabel={collapsed ? 'Show sidebar' : 'Hide sidebar'}
              color="tertiary"
              size="small"
              onClick={() => setCollapsed((c) => !c)}
            >
              <Icon name={collapsed ? 'LeftPanel' : 'LeftPanelFill'} decorative />
            </IconButton>
            <EditableTitle value={title} onChange={setTitle} />
            <div style={{flex: 1}} />
            <IconButton a11yLabel="Share" color="tertiary" size="small">
              <Icon name="Share" decorative />
            </IconButton>
            <IconButton a11yLabel="More actions" color="tertiary" size="small">
              <Icon name="More" decorative />
            </IconButton>
          </ChatTopAppBar>

          {/* Vertically-centered greeting */}
          <FocusFadeIn key="focus-greeting">
            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                padding: '24px 16px',
                boxSizing: 'border-box',
              }}
            >
              <AppDemoLottie name="MartyEmotes" size={88} label="Marty" />
              <div style={{display: 'grid', gap: 10, textAlign: 'center', maxWidth: 640}}>
                <Heading as="h2" size="large" style={{margin: 0}}>
                  Hi Mariah
                </Heading>
                <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: 1.5}}>
                  &quot;Lorem ipsum dolor sit amet consectetur. Non aliquam aliquet vehicula
                  dolor id ut donec in. Viverra mi semper sit id. At&quot;
                </Body>
              </div>

              <div style={{width: '100%', maxWidth: 640, display: 'grid', gap: 12}}>
                <PromptComposer
                  size="large"
                  placeholder="Ask anything"
                  value={draft}
                  onValueChange={onDraftChange}
                  onSend={onSend}
                  toolbarStart={toolsPill()}
                  toolbarEnd={modelSelector()}
                  onAttachFiles={() => undefined}
                />
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10}}>
                  {suggestions.map((s) => (
                    <SuggestionButton
                      key={s}
                      variant="icon"
                      color="brandSubtle"
                      leading={<CornerArrowGlyph />}
                      onClick={() => onSend(s)}
                    >
                      {s}
                    </SuggestionButton>
                  ))}
                </div>
              </div>
            </div>

            <div style={{padding: '12px 16px'}}>
              <PromptComposerDisclaimer align="center">
                AI can make mistakes. Be certain to review important info.
              </PromptComposerDisclaimer>
            </div>
          </FocusFadeIn>
        </div>
      </AgentSidebarProvider>
    </SidebarFrame>
  );
}

/** The docked variant — host dashboard on the left, Wibey panel on the right. */
function AppDemoDocked({
  messages,
  busy,
  draft,
  onDraftChange,
  onSend,
  onPopOut,
  onClose,
}: {
  messages: string[];
  busy: boolean;
  draft: string;
  onDraftChange: (v: string) => void;
  onSend: (v: string) => void;
  onPopOut: () => void;
  onClose: () => void;
}) {
  const moreRef = React.useRef<HTMLButtonElement>(null);
  const [moreOpen, setMoreOpen] = React.useState(false);
  return (
    <div style={{height: 760}}>
      <AppDemoBrowserChrome>
        <div style={{height: '100%', display: 'flex', minHeight: 0}}>
          <div style={{flex: 1, minWidth: 0}}>
            <AppDemoDashboard />
          </div>
          <div
            style={{
              width: APP_DEMO_DOCK_WIDTH,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--ld-semantic-color-surface, #ffffff)',
              borderLeft: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
            }}
          >
            <WibeyHeader
              trailing={
                <>
                  <Menu
                    isOpen={moreOpen}
                    onOpen={() => setMoreOpen(true)}
                    onClose={() => setMoreOpen(false)}
                    triggerRef={moreRef}
                    position="bottomRight"
                    trigger={
                      <IconButton ref={moreRef} a11yLabel="More actions" color="tertiary" size="small" onClick={() => setMoreOpen(o => !o)}>
                        <Icon name="More" decorative />
                      </IconButton>
                    }
                  >
                    <MenuItem onClick={() => setMoreOpen(false)}>Clear conversation</MenuItem>
                    <MenuItem onClick={() => setMoreOpen(false)}>Copy transcript</MenuItem>
                    <MenuItem onClick={() => setMoreOpen(false)}>Settings</MenuItem>
                  </Menu>
                  <IconButton
                    a11yLabel="Pop out chat panel"
                    color="tertiary"
                    size="small"
                    onClick={onPopOut}
                  >
                    <Icon name="PositionRight" decorative />
                  </IconButton>
                  <IconButton a11yLabel="Close chat" color="tertiary" size="small" onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </>
              }
            />
            <FocusFadeIn key="docked">
              <WibeyPanelBody
                messages={messages}
                busy={busy}
                draft={draft}
                onDraftChange={onDraftChange}
                onSend={onSend}
                composerSize="small"
              />
            </FocusFadeIn>
          </div>
        </div>
      </AppDemoBrowserChrome>
    </div>
  );
}

/** The overlay variant — the Wibey panel detaches as a draggable, resizable
 *  floating window above the host dashboard. Supports three sizes (default,
 *  large, full) and can be re-docked or closed. */
function AppDemoOverlay({
  size,
  onSizeChange,
  onDock,
  onClose,
  messages,
  busy,
  draft,
  onDraftChange,
  onSend,
}: {
  size: 'overlay-default' | 'overlay-large' | 'overlay-full';
  onSizeChange: (next: 'overlay-default' | 'overlay-large' | 'overlay-full') => void;
  onDock: () => void;
  onClose: () => void;
  messages: string[];
  busy: boolean;
  draft: string;
  onDraftChange: (v: string) => void;
  onSend: (v: string) => void;
}) {
  const moreRef = React.useRef<HTMLButtonElement>(null);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const screenRef = React.useRef<HTMLDivElement>(null);
  const dragState = React.useRef<{px: number; py: number; ox: number; oy: number} | null>(null);
  const [pos, setPos] = React.useState({x: 360, y: 80});
  const [dragging, setDragging] = React.useState(false);

  const dims =
    size === 'overlay-default'
      ? APP_DEMO_OVERLAY_DEFAULT
      : size === 'overlay-large'
      ? APP_DEMO_OVERLAY_LARGE
      : null;

  // Keep the default size anchored to the lower-right of the screen, similar
  // to the figma; the large size centers; full takes the whole surface.
  React.useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;
    const rect = screen.getBoundingClientRect();
    if (size === 'overlay-default') {
      setPos({
        x: Math.max(12, rect.width - APP_DEMO_OVERLAY_DEFAULT.w - 24),
        y: Math.max(12, rect.height - APP_DEMO_OVERLAY_DEFAULT.h - 24),
      });
    } else if (size === 'overlay-large') {
      setPos({
        x: Math.max(12, (rect.width - APP_DEMO_OVERLAY_LARGE.w) / 2),
        y: Math.max(12, (rect.height - APP_DEMO_OVERLAY_LARGE.h) / 2),
      });
    }
  }, [size]);

  const onHeaderPointerDown = (e: React.PointerEvent) => {
    if (size === 'overlay-full') return;
    if ((e.target as HTMLElement).closest('button, a, input, textarea, select')) return;
    const screen = screenRef.current;
    if (!screen) return;
    dragState.current = {px: e.clientX, py: e.clientY, ox: pos.x, oy: pos.y};
    setDragging(true);

    const move = (ev: PointerEvent) => {
      const d = dragState.current;
      if (!d || !dims) return;
      const rect = screen.getBoundingClientRect();
      const nx = Math.max(0, Math.min(d.ox + (ev.clientX - d.px), rect.width - 120));
      const ny = Math.max(0, Math.min(d.oy + (ev.clientY - d.py), rect.height - 48));
      setPos({x: nx, y: ny});
    };
    const up = () => {
      dragState.current = null;
      setDragging(false);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
    e.preventDefault();
  };

  const overlayStyle: React.CSSProperties =
    size === 'overlay-full'
      ? {
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          background: 'var(--ld-semantic-color-surface, #ffffff)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
        }
      : {
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          width: dims?.w,
          height: dims?.h,
          background: 'var(--ld-semantic-color-surface, #ffffff)',
          border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
          borderRadius: 16,
          boxShadow: 'var(--ld-semantic-elevation-300, 0 12px 32px rgba(0,0,0,0.18))',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
          transition: dragging ? undefined : 'left 200ms ease, top 200ms ease, width 200ms ease, height 200ms ease',
        };

  // Trailing icons differ slightly across overlay sizes — the figma uses the
  // diagonal Expander glyph at default / large (expand outward), and the
  // ExpanderDiagonal collapse glyph at full size to restore.
  const sizeButton =
    size === 'overlay-full' ? (
      <IconButton
        a11yLabel="Restore overlay"
        color="tertiary"
        size="small"
        onClick={() => onSizeChange('overlay-large')}
      >
        <Icon name="ExpanderDiagonal" decorative />
      </IconButton>
    ) : size === 'overlay-large' ? (
      <IconButton
        a11yLabel="Maximize overlay"
        color="tertiary"
        size="small"
        onClick={() => onSizeChange('overlay-full')}
      >
        <Icon name="Expander" decorative />
      </IconButton>
    ) : (
      <IconButton
        a11yLabel="Expand overlay"
        color="tertiary"
        size="small"
        onClick={() => onSizeChange('overlay-large')}
      >
        <Icon name="Expander" decorative />
      </IconButton>
    );

  return (
    <div style={{height: 760}}>
      <AppDemoBrowserChrome>
        <div ref={screenRef} style={{position: 'relative', height: '100%'}}>
          {/* Host dashboard sits behind the overlay */}
          <div style={{position: 'absolute', inset: 0, opacity: size === 'overlay-full' ? 0 : 1}}>
            <AppDemoDashboard />
          </div>

          <div
            style={overlayStyle}
            onPointerDown={onHeaderPointerDown}
          >
            <WibeyHeader
              showBack={size === 'overlay-large' || size === 'overlay-full'}
              onBack={() => onSizeChange('overlay-default')}
              trailing={
                <>
                  <Menu
                    isOpen={moreOpen}
                    onOpen={() => setMoreOpen(true)}
                    onClose={() => setMoreOpen(false)}
                    triggerRef={moreRef}
                    position="bottomRight"
                    trigger={
                      <IconButton ref={moreRef} a11yLabel="More actions" color="tertiary" size="small" onClick={() => setMoreOpen(o => !o)}>
                        <Icon name="More" decorative />
                      </IconButton>
                    }
                  >
                    <MenuItem onClick={() => setMoreOpen(false)}>Clear conversation</MenuItem>
                    <MenuItem onClick={() => setMoreOpen(false)}>Copy transcript</MenuItem>
                    <MenuItem onClick={() => setMoreOpen(false)}>Settings</MenuItem>
                  </Menu>
                  {sizeButton}
                  <IconButton
                    a11yLabel="Dock chat panel"
                    color="tertiary"
                    size="small"
                    onClick={onDock}
                  >
                    <Icon name="PositionTopRight" decorative />
                  </IconButton>
                  <IconButton a11yLabel="Close chat" color="tertiary" size="small" onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </>
              }
            />
            <FocusFadeIn key={size}>
              <WibeyPanelBody
                messages={messages}
                busy={busy}
                draft={draft}
                onDraftChange={onDraftChange}
                onSend={onSend}
                composerSize={size === 'overlay-default' ? 'small' : 'large'}
              />
            </FocusFadeIn>
          </div>
        </div>
      </AppDemoBrowserChrome>
    </div>
  );
}

/** The App Demo example — a complete agent application flow. Sending a prompt
 *  drops the focus chat into the host dashboard with the Wibey panel docked;
 *  popping the panel out detaches it as a draggable overlay that can grow to
 *  a large size or fill the screen, and re-dock when the user wants the
 *  dashboard back. */
function AppDemoSection() {
  const [mode, setMode] = React.useState<AppDemoMode>('focus');
  const [draft, setDraft] = React.useState('');
  const [messages, setMessages] = React.useState<string[]>([]);
  const [busy, setBusy] = React.useState(false);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [...m, value]);
    setDraft('');
    setBusy(true);
    window.setTimeout(() => setBusy(false), 1500);
    if (mode === 'focus') setMode('docked');
  };

  const reset = () => {
    setMode('focus');
    setMessages([]);
    setDraft('');
    setBusy(false);
  };

  const closePanel = () => {
    reset();
  };

  // Toggling dock ↔ pop-out swaps the whole panel component, so the button that
  // was clicked unmounts and focus falls to <body>. Remember the equivalent
  // control in the destination layout and restore focus to it after the switch
  // so keyboard/screen-reader users keep their place. Retry across a few frames
  // because the overlay animates in.
  const focusAfterModeChange = React.useRef<string | null>(null);
  const popOut = () => {
    focusAfterModeChange.current = 'Dock chat panel';
    setMode('overlay-default');
  };
  const dock = () => {
    focusAfterModeChange.current = 'Pop out chat panel';
    setMode('docked');
  };
  React.useEffect(() => {
    const label = focusAfterModeChange.current;
    if (!label) return;
    focusAfterModeChange.current = null;
    let raf = 0;
    let tries = 0;
    const attempt = () => {
      const btn = document.querySelector<HTMLElement>(`[aria-label="${label}"]`);
      if (btn) {
        btn.focus();
        if (document.activeElement === btn) return;
      }
      if (tries++ < 15) raf = requestAnimationFrame(attempt);
    };
    raf = requestAnimationFrame(attempt);
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  // ── Header label changes with the current mode. ───────────────────────────
  const modeLabel: Record<AppDemoMode, string> = {
    focus: 'Focus chat',
    docked: 'Docked side panel',
    'overlay-default': 'Floating overlay',
    'overlay-large': 'Floating overlay — large',
    'overlay-full': 'Floating overlay — fullscreen',
  };

  return (
    <div style={{display: 'grid', gap: 12}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 12px',
          background: 'var(--ld-semantic-color-surface-subtle, #f7f8f8)',
          borderRadius: 8,
        }}
      >
        <Caption color="subtle">Current mode:</Caption>
        <Tag size="small" color={mode === 'focus' ? 'brand' : 'green'}>
          {modeLabel[mode]}
        </Tag>
        <div style={{flex: 1}} />
        {mode !== 'focus' ? (
          <Button variant="tertiary" size="small" onClick={reset} leading={<Icon name="Refresh" decorative />}>
            Reset to focus chat
          </Button>
        ) : null}
      </div>

      {mode === 'focus' ? (
        <AppDemoFocusChat draft={draft} onDraftChange={setDraft} onSend={send} />
      ) : mode === 'docked' ? (
        <AppDemoDocked
          messages={messages}
          busy={busy}
          draft={draft}
          onDraftChange={setDraft}
          onSend={send}
          onPopOut={popOut}
          onClose={closePanel}
        />
      ) : (
        <AppDemoOverlay
          size={mode}
          onSizeChange={setMode}
          onDock={dock}
          onClose={closePanel}
          messages={messages}
          busy={busy}
          draft={draft}
          onDraftChange={setDraft}
          onSend={send}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Suggestion Button demo                                             */
/* ------------------------------------------------------------------ */
type SuggestionRadius = 'pill' | 'rounded' | 'square';

const SUGGESTION_RADII: Record<SuggestionRadius, string | undefined> = {
  pill: undefined,
  rounded: '0.75rem',
  square: '0.25rem',
};

const SUGGESTION_COLORS: {value: SuggestionButtonColor; label: string}[] = [
  {value: 'default', label: 'Default'},
  {value: 'brandSubtle', label: 'Brand Subtle'},
];

/**
 * The Suggestion Button — a pill-shaped chat starter. The `icon` variant shows
 * a bare leading icon with a regular-weight label; the `image` variant frames
 * an image in a round holder with a bolder label. Both share the Default /
 * Brand Subtle colors, and designers can override the fill, text, and radius.
 */
function SuggestionButtonSection() {
  const [variant, setVariant] = React.useState<SuggestionButtonVariant>('icon');
  const [color, setColor] = React.useState<SuggestionButtonColor>('default');
  const [radius, setRadius] = React.useState<SuggestionRadius>('pill');
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const leadingNode =
    variant === 'image' ? (
      <img src={PRODUCT_IMAGES.airFryer} alt="" />
    ) : (
      <span style={{display: 'inline-flex'}}>
        <CornerArrowGlyph />
      </span>
    );

  return (
    <ComponentConfigurationCard
      controls={
        <>
          <div style={{display: 'grid', gap: 6}}>
            <Body as="span" size="small" weight="alt">
              Variant
            </Body>
            <RadioGroupRow
              name="suggestion-variant"
              value={variant}
              onChange={setVariant}
              options={[
                {value: 'icon', label: 'Icon'},
                {value: 'image', label: 'Image'},
              ]}
            />
          </div>
          <div style={{display: 'grid', gap: 6}}>
            <Body as="span" size="small" weight="alt">
              Color
            </Body>
            <RadioGroupRow
              name="suggestion-color"
              value={color}
              onChange={setColor}
              options={SUGGESTION_COLORS}
            />
          </div>
          <div style={{display: 'grid', gap: 6}}>
            <Body as="span" size="small" weight="alt">
              Corner radius
            </Body>
            <RadioGroupRow
              name="suggestion-radius"
              value={radius}
              onChange={setRadius}
              options={[
                {value: 'pill', label: 'Pill'},
                {value: 'rounded', label: 'Rounded'},
                {value: 'square', label: 'Square'},
              ]}
            />
          </div>
          <Checkbox
            label="Loading"
            checked={loading}
            onChange={(e) => setLoading(e.target.checked)}
          />
          <Checkbox
            label="Disabled"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
          />
        </>
      }
      preview={
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            minHeight: 160,
            borderRadius: 12,
            background: 'var(--ld-semantic-color-surface-subtle, #f7f8f8)',
          }}
        >
          <SuggestionButton
            variant={variant}
            color={color}
            leading={leadingNode}
            radius={SUGGESTION_RADII[radius]}
            loading={loading}
            disabled={disabled}
          >
            Compare two air fryers
          </SuggestionButton>
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Suggestion Text Link demo                                          */
/* ------------------------------------------------------------------ */
const SUGGESTION_TEXT_LINK_COLORS: {value: SuggestionTextLinkColor; label: string}[] = [
  {value: 'default', label: 'Default'},
  {value: 'white', label: 'White'},
];

const SUGGESTION_TEXT_LINK_SIZES: {value: SuggestionTextLinkSize; label: string}[] = [
  {value: 'small', label: 'Small'},
  {value: 'medium', label: 'Medium'},
];

/**
 * The Suggestion Text Link — a text-link chat starter with an optional leading
 * icon. No fill or border; underlines on hover, focus, and press. Two sizes
 * (small / medium) and two color treatments (Default for light surfaces, White
 * for dark or brand-filled surfaces).
 */
function SuggestionTextLinkSection() {
  const [color, setColor] = React.useState<SuggestionTextLinkColor>('default');
  const [size, setSize] = React.useState<SuggestionTextLinkSize>('small');
  const [showLeading, setShowLeading] = React.useState(true);
  const [disabled, setDisabled] = React.useState(false);

  const leadingIcon = (
    <span style={{display: 'inline-flex', fontSize: '1rem'}}>
      <CornerArrowGlyph />
    </span>
  );

  const previewBg =
    color === 'white'
      ? 'var(--ld-semantic-color-surface-inverse, #2e2f32)'
      : 'var(--ld-semantic-color-surface-subtle, #f7f8f8)';

  return (
    <ComponentConfigurationCard
      controls={
        <>
          <div style={{display: 'grid', gap: 6}}>
            <Body as="span" size="small" weight="alt">
              Color
            </Body>
            <RadioGroupRow
              name="suggestion-textlink-color"
              value={color}
              onChange={setColor}
              options={SUGGESTION_TEXT_LINK_COLORS}
            />
          </div>
          <div style={{display: 'grid', gap: 6}}>
            <Body as="span" size="small" weight="alt">
              Size
            </Body>
            <RadioGroupRow
              name="suggestion-textlink-size"
              value={size}
              onChange={setSize}
              options={SUGGESTION_TEXT_LINK_SIZES}
            />
          </div>
          <Checkbox
            label="Leading icon"
            checked={showLeading}
            onChange={(e) => setShowLeading(e.target.checked)}
          />
          <Checkbox
            label="Disabled"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
          />
        </>
      }
      preview={
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            minHeight: 160,
            borderRadius: 12,
            background: previewBg,
            transition: 'background 0.2s ease',
          }}
        >
          <SuggestionTextLink
            color={color}
            size={size}
            leading={showLeading ? leadingIcon : undefined}
            disabled={disabled}
          >
            Compare two air fryers
          </SuggestionTextLink>
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
type AgentCanvasTab =
  | 'app'
  | 'sidepanel'
  | 'focus'
  | 'overlay'
  | 'canvas'
  | 'suggestion'
  | 'response'
  | 'composer'
  | 'disclaimer'
  | 'sidebar';

export default function AgentCanvasPage() {
  const [tab, setTab] = React.useState<AgentCanvasTab>('app');

  const tabItem = (id: AgentCanvasTab, label: string) => (
    <TabNavigationItem
      href="#"
      isCurrent={tab === id}
      onClick={(e) => {
        e.preventDefault();
        setTab(id);
      }}
    >
      {label}
    </TabNavigationItem>
  );

  return (
    <PageWrapper
      title="Agent Canvas"
      category="Patterns"
      description="The Agent Canvas hosts the components that power agent-driven experiences. Its first component is the Prompt Composer — the input people use to talk to an AI agent — shown here in its real Chat pane + Canvas pane surface."
    >
      <div style={{marginBottom: 24}}>
        <TabNavigation aria-label="Agent Canvas sections">
          {tabItem('app', 'App Demo')}
          {tabItem('sidepanel', 'Chat Side Panel')}
          {tabItem('focus', 'Focus Chat')}
          {tabItem('overlay', 'Chat Overlay')}
          {tabItem('canvas', 'Canvas')}
          {tabItem('suggestion', 'Suggestion')}
          {tabItem('response', 'Response')}
          {tabItem('composer', 'Prompt Composer')}
          {tabItem('sidebar', 'Sidebar')}
          {tabItem('disclaimer', 'Disclaimer')}
        </TabNavigation>
      </div>

      {/* ── App Demo ───────────────────────────────────────────── */}
      {tab === 'app' && (
      <AppDemoSection />
      )}

      {/* ── Chat Side Panel ────────────────────────────────────── */}
      {tab === 'sidepanel' && (
      <ExampleSection
        title="Surface example"
        description="The Chat Side Panel docks the chat experience to the right of the host screen, sharing space with the app it's helping you work in. Drag the outer divider to grow or shrink the entire side panel against the host backdrop; drag the inner divider to rebalance the chat against the docked canvas. One canvas is open by default — clicking 'Open in canvas' in the conversation adds another (up to four), turning the workspace into an arrangeable group you can lay side by side, stack, or maximize. As the side panel narrows, the composer steps down to its compact and mobile forms, and collapsing the chat hands the full panel width to the canvas (with a floating affordance to bring the chat back)."
      >
        <SurfaceSection />
      </ExampleSection>
      )}

      {/* ── Canvas ─────────────────────────────────────────────── */}
      {tab === 'canvas' && (
      <ExampleSection
        title="Agent Canvas — workspace"
        description="The AgentCanvas component is a floating, rounded, elevated work surface (header with close, title, actions, and an expand control; a scrollable body; an action footer). Compose several in a resizable group: grab a canvas header to move it, drag a divider to expand or shrink, maximize one, or add another canvas."
      >
        <AgentCanvasGroupDemo />
      </ExampleSection>
      )}

      {/* ── Focus Chat Container ────────────────────────────────── */}
      {tab === 'focus' && (
      <ExampleSection
        title="Focus chat container"
        description="The full-bleed blank state where a conversation begins. The Agent Sidebar rail sits at the left (collapsed to icons here — toggle the panel control in the app bar to expand it); the main column carries a top app bar with the brand mark and an editable title, an optional banner, a vertically-centered greeting, the Prompt Composer with starter suggestion buttons, and a pinned footer disclaimer. Send a request (or pick a suggestion) and the greeting expands into the in-chat experience: the message list with the pinned composer, and the AgentCanvas docked on the right (drag the handle to rebalance, or close it to hand the full width back to the chat). Add a second canvas to make the dock an arrangeable workspace — drag to lay them side by side or stack, or maximize one. The app-bar Close returns to the greeting."
      >
        <FocusChatSection />
      </ExampleSection>
      )}

      {/* ── Chat Overlay ────────────────────────────────────────── */}
      {tab === 'overlay' && (
      <ExampleSection
        title="Chat overlay"
        description="The focus-chat experience packaged as a floating window that hovers above the host screen, so people can keep working in their app while they chat. Grab the title bar to move the overlay anywhere; drag the bottom-right grip to resize it to any size; or maximize it to fill the screen. The leading panel control shows or hides the side rail, the trailing panel control docks or undocks the AgentCanvas, and Close tucks the overlay away behind a single re-open affordance. Add a second canvas to turn the dock into an arrangeable workspace — drag to lay them side by side or stack, or maximize one."
      >
        <ChatOverlaySection />
      </ExampleSection>
      )}

      {/* ── Suggestion Button ───────────────────────────────────── */}
      {tab === 'suggestion' && (
      <ExampleSection
        title="Suggestion button"
        description="A pill-shaped chat starter with a short label. The Icon variant pairs a bare leading icon with a regular-weight label; the Image variant frames an image in a round holder with a bolder label. Both share the subtle Default and light-blue Brand Subtle colors, and designers can recolor the fill and text or change the corner radius. A loading state shows a spinner (icon) or skeleton (image) while the suggestion is prepared."
      >
        <SuggestionButtonSection />
      </ExampleSection>
      )}

      {/* ── Suggestion Text Link ────────────────────────────────── */}
      {tab === 'suggestion' && (
      <ExampleSection
        title="Suggestion text link"
        description="A text-link chat starter — no fill or border, just a label with an optional leading icon. Underlines on hover, focus, and press. Two sizes (small / medium) and two color treatments: Default for light surfaces and White for dark or brand-filled backgrounds."
      >
        <SuggestionTextLinkSection />
      </ExampleSection>
      )}

      {/* ── Response ───────────────────────────────────────────── */}
      {tab === 'response' && (
      <>
      <ExampleSection
        title="Component configuration"
        description="Toggle the leading agent avatar to see the chat response header with or without it."
      >
        <ChatHeaderConfigDemo />
      </ExampleSection>

      <ExampleSection
        title="Chat response headers"
        description="The section header at the top of an agent (chat) response, shown with real copy. The same header row carries the agent identity and can add a meta line, a status tag and timestamp, a stacked description, a switcher dropdown, a dismiss control, or a magic 'Thinking…' label while a reply streams."
      >
        <ChatHeadersDemo />
      </ExampleSection>

      <ExampleSection
        title="Loading & streaming"
        description="While the agent is generating, pair the magic 'Thinking…' header with a magic-variant SkeletonText so the loading state reads as AI activity rather than a generic placeholder."
      >
        <ChatLoadingDemo />
      </ExampleSection>

      <ExampleSection
        title="Chat & user responses"
        description="The message building blocks rendered inside the chat pane — the agent (chat) response with its content slot and the user response bubble — composed from existing LD primitives."
      >
        <ChatResponsesDemo />
      </ExampleSection>

      <ExampleSection
        title="Response feedback"
        description="The Feedback control pairs with an agent response so the user can rate it. It's interactive: the resting prompt with thumbs up / down swaps for a confirmation once a rating is given — a thank-you for a thumbs up, or a 'Share more' affordance for a thumbs down so the user can give richer detail."
      >
        <FeedbackDemo />
      </ExampleSection>

      <ExampleSection
        title="Sources & response feedback"
        description="The response footer pairs the action toolbar (regenerate, save, copy, more) with an expandable Sources pill and the Rate response thumbs. Toggling Sources reveals the cited references — a favicon, domain, and snippet per row — beneath the toolbar, shown here standalone and inside a canvas panel."
      >
        <SourcesFeedbackDemo />
      </ExampleSection>

      <ExampleSection
        title="User response — delivery errors"
        description="When a user message fails to send, show a delivery caption beneath the bubble — a negative status label with an error glyph, plus optional inline retry or delete actions."
      >
        <UserResponseErrorsDemo />
      </ExampleSection>

      <ExampleSection
        title="User response — color pairings"
        description="The user bubble defaults to the brand-bold fill paired with onfill-brand text, but a designer can mix and match any UserResponseFill with any UserResponseTextColor to fit the brand or surface."
      >
        <UserResponseColorsDemo />
      </ExampleSection>
      </>
      )}

      {/* ── Prompt Composer ────────────────────────────────────── */}
      {tab === 'composer' && (
      <>
      <ExampleSection
        title="Component Configuration"
        description="Toggle the variant, size, and states to see the live Prompt Composer respond."
      >
        <ConfigDemo />
      </ExampleSection>

      {/* 5. Variants */}
      <ExampleSection
        title="Variants"
        description="Default is the full two-row composer; Inline is a single row for narrow panels and compact surfaces."
      >
        <div style={{display: 'grid', gap: 24}}>
          <DocsCard title="Default" description="Two-row layout with a full toolbar.">
            <PromptComposer toolbarStart={toolsPill()} toolbarEnd={modelSelector()} onAttachFiles={() => undefined} />
          </DocsCard>
          <DocsCard title="Inline" description="Single-row layout for tight spaces.">
            <PromptComposer variant="inline" size="small" toolbarEnd={modelSelector()} />
          </DocsCard>
        </div>
      </ExampleSection>

      {/* 6. States */}
      <ExampleSection
        title="States"
        description="The composer covers the full interaction and validation matrix."
      >
        <DocsGrid minColumnWidth={448}>
          <DocsCard title="Default" description="Resting state.">
            <PromptComposer toolbarStart={toolsPill(true)} toolbarEnd={modelSelector()} />
          </DocsCard>
          <DocsCard title="Disabled" description="Non-interactive.">
            <PromptComposer disabled toolbarStart={toolsPill(true)} toolbarEnd={modelSelector()} />
          </DocsCard>
          <DocsCard title="Error" description="Negative styling with a message.">
            <PromptComposer error="Your message is too long." toolbarStart={toolsPill(true)} toolbarEnd={modelSelector()} />
          </DocsCard>
          <DocsCard title="Busy (generating)" description="Send becomes Stop while streaming.">
            <PromptComposer busy toolbarStart={toolsPill(true)} toolbarEnd={modelSelector()} />
          </DocsCard>
          <DocsCard title="Dictation — listening" description="Select the mic: the input field is replaced by a 'Listening' label + live waveform, ✕ cancels, and send becomes an equalizer.">
            <DictationStateDemo dictationVariant="listening" />
          </DocsCard>
          <DocsCard title="Dictation — voice to text" description="Select the mic: it fills in and a Magic Box pulses with the live voice level.">
            <DictationStateDemo dictationVariant="voice-to-text" />
          </DocsCard>
          <DocsCard title="Context selection" description="Select the selector button: the cursor becomes a crosshair, and anything you click in the chat or canvas is attached as additional context for the next prompt.">
            <PromptComposer
              showSelector
              selectorIconUnselected={<Icon name="Magic" />}
              selectorIconSelected={<Icon name="MagicFill" />}
              selectorLabel="Select context"
              toolbarStart={toolsPill(true)}
              toolbarEnd={modelSelector()}
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      {/* 7. Sizes / responsive */}
      <ExampleSection
        title="Sizes & responsive behavior"
        description="The composer scales by size so it can shrink inside a narrow panel — large uses 16px text and 24px icons; small uses 14px text and 16px icons with tighter padding. In the surface above, the panel width drives this automatically."
      >
        <div style={{display: 'grid', gap: 16}}>
          <DocsCard title="Large" description="Full space (Optimal / Expanded).">
            <PromptComposer size="large" toolbarStart={toolsPill()} toolbarEnd={modelSelector()} />
          </DocsCard>
          <DocsCard title="Small (≈400)" description="Narrow panel (Compact) — sits at the composer’s 400px min-width floor; the tools pill collapses to icon + count.">
            <div style={{maxWidth: 400, marginInline: 'auto'}}>
              <PromptComposer size="small" toolbarStart={toolsPill(true)} toolbarEnd={modelSelector()} />
            </div>
          </DocsCard>
          <DocsCard title="Mobile (≈343)" description="Phone width — tightest padding, compact pill.">
            <div style={{maxWidth: 343, marginInline: 'auto'}}>
              <PromptComposer size="mobile" toolbarStart={toolsPill(true)} toolbarEnd={modelSelector()} />
            </div>
          </DocsCard>
        </div>
      </ExampleSection>

      {/* 8. Attachments */}
      <ExampleSection
        title="Attachments & upload"
        description="Attach via the + button, drag-and-drop a file onto the composer, paste an image from the clipboard or select an element via the selector button from the chat or canvas. Tiles are removable."
      >
        <DocsCard>
          <AttachmentsDemo />
        </DocsCard>
      </ExampleSection>

      {/* 9. Generate & stop */}
      <ExampleSection
        title="Generate & stop"
        description="Sending sets the composer busy and flips the send button to a Stop control; press it (or Escape) to abort."
      >
        <DocsCard>
          <GenerateStopDemo />
        </DocsCard>
      </ExampleSection>

      {/* 10. Add menu, tools & model selectors */}
      <ExampleSection
        title="Tools & model selectors"
        description="The tools pill and the model selector are LD Button Toggles wired to Menus. Use toolbarStart for context/tools and toolbarEnd for the model/mode."
      >
        <DocsCard>
          <PromptComposer toolbarStart={toolsPill()} toolbarEnd={modelSelector()} onAttachFiles={() => undefined} />
        </DocsCard>
      </ExampleSection>

      {/* 11. Suggestions */}
      <ExampleSection
        title="Suggestions (blank state)"
        description="Starter chips shown above an empty composer; selecting one fills the input."
      >
        <DocsCard>
          <SuggestionsDemo />
        </DocsCard>
      </ExampleSection>
      </>
      )}

      {/* ── Sidebar ────────────────────────────────────────────── */}
      {tab === 'sidebar' && (
      <>
      <ExampleSection
        title="Sidebar in context"
        description="The Agent Sidebar is the agent-canvas left rail. It extends the core Side Navigation with a collapse-to-icon rail, a drag-to-resize edge, an editable app name, primary button items, sections of renamable text items with overflow menus, a segment control, and a footer. Toggle the panel control to collapse it, or drag the right edge to resize."
      >
        <AgentSidebarFullDemo />
      </ExampleSection>

      <ExampleSection
        title="Component configuration"
        description="Collapse the sidebar to its icon rail and swap between the four footer types to see the live result."
      >
        <AgentSidebarConfigDemo />
      </ExampleSection>

      <ExampleSection
        title="States"
        description="The two overall states: the full expanded rail (drag the right edge to resize between 240–420px) and the collapsed icon rail, where labels move to tooltips."
      >
        <AgentSidebarStatesDemo />
      </ExampleSection>

      <ExampleSection
        title="Header variants"
        description="The app-name header comes in three layouts — one line, two lines (name over a caption), and one line with an inline Tag. The name can also be made editable (click to rename) with an optional trailing search; collapsed, the header reduces to the logo."
      >
        <AgentSidebarHeaderVariantsDemo />
      </ExampleSection>

      <ExampleSection
        title="Button item variants"
        description="Primary navigation items: default, active/current (rounded blue pill), with a trailing Tag, or with a trailing control. When collapsed every item becomes an icon button with the label as its tooltip."
      >
        <AgentSidebarItemVariantsDemo />
      </ExampleSection>

      <ExampleSection
        title="Section headers"
        description="A section groups secondary items under a header. Make it collapsible so the header toggles its content open and closed with a chevron, or leave it static."
      >
        <AgentSidebarSectionVariantsDemo />
      </ExampleSection>

      <ExampleSection
        title="Text item variants"
        description="Secondary items inside a section: default, current, editable (inline rename), and with a trailing “…” overflow menu."
      >
        <AgentSidebarTextItemVariantsDemo />
      </ExampleSection>

      <ExampleSection
        title="Segment control — collapsed behavior"
        description="When expanded the sidebar renders the full segmented control; when collapsed it shows only the active segment as a single pill."
      >
        <AgentSidebarSegmentDemo />
      </ExampleSection>

      <ExampleSection
        title="Footer types"
        description="Four interchangeable footers: an avatar button, an avatar that opens a flyout menu (with an in-menu “Help” accordion and a theme segment), a single icon button, and an expandable accordion."
      >
        <AgentSidebarFootersDemo />
      </ExampleSection>
      </>
      )}

      {/* ── Disclaimer ─────────────────────────────────────────── */}
      {tab === 'disclaimer' && (
      <ExampleSection
        title="Disclaimer patterns"
        description="The safety caption shown beneath the composer, configurable by copy, sparkle icon, and alignment."
      >
        <DocsGrid minColumnWidth={320}>
          <DocsCard title="Links" description="Privacy & terms links, centered.">
            <PromptComposerDisclaimer>
              View <Link href="#">Privacy Notes</Link> and <Link href="#">Terms of Use</Link>.
            </PromptComposerDisclaimer>
          </DocsCard>
          <DocsCard title="AI note — short" description="Concise caption with sparkle.">
            <PromptComposerDisclaimer icon>
              AI can make mistakes. Be certain to review important info.
            </PromptComposerDisclaimer>
          </DocsCard>
          <DocsCard title="AI note — long" description="Fuller safety guidance.">
            <PromptComposerDisclaimer icon align="center" size="body">
              Our AI-powered assistant is designed to help, but may make mistakes. Never share
              sensitive info like a password or credit card.
            </PromptComposerDisclaimer>
          </DocsCard>
          <DocsCard title="Left-aligned" description="No icon, start alignment.">
            <PromptComposerDisclaimer align="start">
              AI can make mistakes. Be certain to review important info.
            </PromptComposerDisclaimer>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>
      )}

      {tab !== 'app' && (
      <GuidelinesSection
        defaultValue="variant='default', size='large', submitOn='enter'"
        description={
          <>
            Use the <strong>default</strong> two-row variant when the composer has room (a main
            agent surface or wide panel); switch to <strong>inline</strong> + <strong>small</strong>{' '}
            inside narrow side panels. Enter sends and Shift+Enter inserts a newline by default
            (set <code>submitOn='mod+enter'</code> to require Cmd/Ctrl+Enter). While the agent is
            generating, set <code>busy</code> so the send button becomes a Stop control. Wire{' '}
            <code>onAttachFiles</code> to support the file picker, drag-and-drop, and clipboard
            paste, and render attached files as <code>AttachmentTile</code>s. Pair the composer
            with <code>PromptComposerDisclaimer</code> for the safety caption.
          </>
        }
      >
        <div style={{display: 'grid', gap: 8}}>
          <Body as="span" size="small" weight="alt">
            Accessibility
          </Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: 1.5}}>
            The send, stop, mic, and add controls all carry accessible labels; the mic exposes{' '}
            <code>aria-pressed</code> while recording, the character counter is announced via{' '}
            <code>aria-live</code>, and the error message is exposed as an alert.
          </Body>
          <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginTop: 8}}>
            <Chip leading={<StarFillIcon size="small" decorative />}>Retry</Chip>
            <Chip>Try again</Chip>
          </div>
        </div>
      </GuidelinesSection>
      )}
    </PageWrapper>
  );
}
