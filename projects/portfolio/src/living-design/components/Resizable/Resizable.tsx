/**
 * @source AX
 * @ported-from notes/LD-AX-Starter-Kit V1/client/components/ui/Resizable.tsx
 *
 * AX Resizable — thin wrapper around `react-resizable-panels` (v4)
 * exposing `ResizablePanelGroup`, `ResizablePanel`, and
 * `ResizableHandle`.
 *
 * Adaptation: Tailwind utility classes from the shadcn source are
 * replaced with plain `.css` BEM classes; the `withHandle` grip is a
 * plain styled box (no icon glyph).
 *
 * This portfolio uses `react-resizable-panels` v2, whose public exports are
 * `PanelGroup`, `Panel`, and `PanelResizeHandle`.
 */
import * as React from 'react';
import {
  ImperativePanelGroupHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';

import {cx} from '../../common/cx';

import './Resizable.css';

// ---------------------------------------------------------------------------
// Internal context — shares the Group imperative handle with child Handles
// ---------------------------------------------------------------------------

const GroupRefContext = React.createContext<React.RefObject<ImperativePanelGroupHandle | null> | null>(null);

// ---------------------------------------------------------------------------
// ResizablePanelGroup
// ---------------------------------------------------------------------------

type ResizablePanelGroupProps = Omit<React.ComponentProps<typeof PanelGroup>, 'direction'> & {
  /**
   * AX/PX legacy alias. The migrated source used `orientation`; this app's
   * installed react-resizable-panels version uses `direction`.
   */
  direction?: 'horizontal' | 'vertical';
  orientation?: 'horizontal' | 'vertical';
};

export const ResizablePanelGroup = ({
  className,
  direction,
  orientation,
  ...props
}: ResizablePanelGroupProps) => {
  const groupRef = React.useRef<ImperativePanelGroupHandle | null>(null);

  return (
    <GroupRefContext.Provider value={groupRef}>
      <PanelGroup
        className={cx('ax-resizable__panel-group', className)}
        direction={orientation ?? direction ?? 'horizontal'}
        ref={groupRef}
        {...props}
      />
    </GroupRefContext.Provider>
  );
};

// ---------------------------------------------------------------------------
// ResizablePanel
// ---------------------------------------------------------------------------

export const ResizablePanel = Panel;

// ---------------------------------------------------------------------------
// ResizableHandle
// ---------------------------------------------------------------------------

type ResizableHandleProps = React.ComponentProps<typeof PanelResizeHandle> & {
  /**
   * Renders the six-dot grip indicator inside the handle.
   */
  withHandle?: boolean;
  /** Render the larger (square) grip box used for diagonal/full-canvas expansion. */
  expand?: boolean;
};

export const ResizableHandle = ({
  withHandle,
  expand,
  className,
  ...props
}: ResizableHandleProps) => {
  React.useContext(GroupRefContext);

  return (
    <PanelResizeHandle
      className={cx('ax-resizable__handle', className)}
      aria-label="Resize panels"
      {...props}
    >
      {withHandle || expand ? (
        <div className={cx('ax-resizable__grip', expand && 'ax-resizable__grip--expand')} aria-hidden>
          {!expand && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <circle cx="3" cy="3" r="0.8" />
              <circle cx="3" cy="5" r="0.8" />
              <circle cx="3" cy="7" r="0.8" />
              <circle cx="7" cy="3" r="0.8" />
              <circle cx="7" cy="5" r="0.8" />
              <circle cx="7" cy="7" r="0.8" />
            </svg>
          )}
        </div>
      ) : null}
    </PanelResizeHandle>
  );
};


ResizablePanelGroup.displayName = 'ResizablePanelGroup';
ResizablePanel.displayName = 'ResizablePanel';
ResizableHandle.displayName = 'ResizableHandle';
