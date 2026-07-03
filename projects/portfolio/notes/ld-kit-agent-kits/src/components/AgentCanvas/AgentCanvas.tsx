'use client';

import * as React from 'react';

import {cx} from '../../common/cx';
import {applyCommonProps, CommonProps} from '../../common/helpers';
import {IconButton} from '../IconButton/IconButton';
import {Icon} from '../Icons';
import {ScrollArea} from '../ScrollArea';
import {Heading} from '../Text/Text';
import './AgentCanvas.css';

export interface AgentCanvasProps
  extends CommonProps,
    Omit<React.ComponentPropsWithoutRef<'section'>, 'className' | 'style' | 'title'> {
  /** The canvas title shown in the header. */
  title: React.ReactNode;
  /**
   * Heading element for the title. A canvas is a top-level work surface, so it
   * defaults to `h2` to keep the document outline valid (avoid skipping levels);
   * override when nesting the canvas under a deeper heading.
   * @default "h2"
   */
  titleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Accessible name for the canvas `<section>`, exposing it as a distinct
   * region landmark. In a multi-canvas workspace pass a value that includes the
   * canvas position (e.g. "Air fryer comparison, canvas 2 of 3") so each region
   * is uniquely identifiable. Defaults to the title when it is a string.
   */
  a11yLabel?: string;
  /** Optional leading media in the header (icon / avatar). */
  icon?: React.ReactNode;
  /** Fired when the leading close (✕) control is pressed. Hidden when omitted. */
  onClose?: () => void;
  /** Accessible label for the close control. @default "Close canvas" */
  closeLabel?: string;
  /** Whether the canvas is expanded (maximized). Drives the expand toggle icon. */
  expanded?: boolean;
  /** Fired when the expand / restore control is pressed. Hidden when omitted. */
  onToggleExpand?: () => void;
  /** Extra trailing header actions (e.g. edit, more) placed before expand. */
  actions?: React.ReactNode;
  /** The body content. Scrolls (scrollbar on hover) when it overflows. */
  children: React.ReactNode;
  /** Footer content — typically the action Buttons. Hidden when omitted. */
  footer?: React.ReactNode;
  /**
   * Props spread onto the header bar — use to make the header a drag handle
   * (e.g. `draggable`, `onDragStart`) so the canvas can be grabbed and moved.
   */
  headerProps?: React.HTMLAttributes<HTMLDivElement> & {draggable?: boolean};
  /**
   * Marks this canvas as the active reference for the current chat turn — the
   * header's divider line picks up a subtle brand accent to tie it back to the
   * message it was opened from.
   */
  linked?: boolean;
}

/**
 * AgentCanvas is the floating work surface beside an agent chat. It's a rounded,
 * elevated card with a header (close, title, actions, expand), a scrollable
 * body, and an optional action footer. Compose several inside a resizable group
 * to split, stack, move, and add canvases.
 */
export const AgentCanvas = React.forwardRef<HTMLElement, AgentCanvasProps>(
  (props, ref) => {
    const {
      className,
      title,
      titleAs = 'h2',
      a11yLabel,
      icon,
      onClose,
      closeLabel,
      expanded = false,
      onToggleExpand,
      actions,
      children,
      footer,
      headerProps,
      linked = false,
      ...rest
    } = applyCommonProps(props);

    // Derive the icon-button labels from the title so that, with multiple
    // canvases open, each "Close" / "Expand" control has a unique accessible
    // name (e.g. "Close Air fryer comparison") instead of N identical ones.
    const titleText = typeof title === 'string' ? title : undefined;
    const sectionLabel = a11yLabel ?? titleText;
    const resolvedCloseLabel = closeLabel ?? (titleText ? `Close ${titleText}` : 'Close canvas');
    const expandLabel = expanded
      ? titleText
        ? `Restore ${titleText}`
        : 'Restore canvas'
      : titleText
        ? `Expand ${titleText}`
        : 'Expand canvas';

    return (
      <section
        ref={ref}
        aria-label={sectionLabel}
        className={cx('ld-agentcanvas', linked && 'ld-agentcanvas--linked', className)}
        {...rest}
      >
        <div
          className={cx('ld-agentcanvas-header', headerProps?.draggable && 'ld-agentcanvas-header--draggable')}
          {...headerProps}
        >
          {onClose ? (
            <IconButton a11yLabel={resolvedCloseLabel} color="tertiary" size="small" onClick={onClose}>
              <Icon name="Close" />
            </IconButton>
          ) : null}
          {icon ? <span className="ld-agentcanvas-icon" aria-hidden="true">{icon}</span> : null}
          <Heading as={titleAs} size="small" UNSAFE_className="ld-agentcanvas-title">
            {title}
          </Heading>
          <span className="ld-agentcanvas-headerActions">
            {actions}
            {onToggleExpand ? (
              <IconButton
                a11yLabel={expandLabel}
                color="tertiary"
                size="small"
                onClick={onToggleExpand}
              >
                <Icon name={expanded ? 'Minimize' : 'Maximize'} />
              </IconButton>
            ) : null}
          </span>
        </div>

        <div className="ld-agentcanvas-body">
          <ScrollArea UNSAFE_style={{height: '100%'}}>
            <div className="ld-agentcanvas-bodyInner">{children}</div>
          </ScrollArea>
        </div>

        {footer ? <div className="ld-agentcanvas-footer">{footer}</div> : null}
      </section>
    );
  }
);

AgentCanvas.displayName = 'AgentCanvas';
