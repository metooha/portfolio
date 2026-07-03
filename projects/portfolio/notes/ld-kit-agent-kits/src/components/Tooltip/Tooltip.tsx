'use client';

import * as React from 'react';

import {cx} from '../../common/cx';
import {useStableId, getPositionStyle, applyCommonProps, type CommonProps} from '../../common/helpers';
import {VisuallyHidden} from '../VisuallyHidden';
import './Tooltip.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TooltipPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'right'
  | 'left'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';
export type TooltipRelationship = 'label' | 'description';

export interface TooltipProps extends CommonProps {
  children: React.ReactElement;
  content: string;
  /** Where the tooltip appears relative to its trigger. Matches Figma position variant names. */
  position?: TooltipPosition;
  relationship?: TooltipRelationship;
  showDelay?: number;
  hideDelay?: number;
}

// ---------------------------------------------------------------------------
// Position constants
// ---------------------------------------------------------------------------

// NUBBIN_HEIGHT: height of the CSS border-triangle caret (from Figma spec).
// GAP: distance from nubbin tip to trigger edge.
// NUBBIN_INSET: desired distance from nubbin's outer edge to tooltip edge (CSS right/left value).
// NUBBIN_CENTER: actual distance from tooltip edge to the nubbin tip.
//   `right: NUBBIN_INSET` in CSS places the border-box edge NUBBIN_INSET px from the tooltip edge,
//   so the visual center of the 0×0 border-triangle element is NUBBIN_HEIGHT px further inward.
const NUBBIN_HEIGHT = 8;
const GAP = 4;
const NUBBIN_INSET = 12;
const NUBBIN_CENTER = NUBBIN_INSET + NUBBIN_HEIGHT; // 20px — where the nubbin tip actually lands

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------

export const Tooltip: React.FunctionComponent<TooltipProps> = (props) => {
  const {
    children,
    content,
    position = 'topCenter',
    relationship = 'description',
    showDelay = 250,
    hideDelay = 250,
    className,
    style,
  } = applyCommonProps(props);

  const tooltipId = useStableId();
  // Separate ID for the always-mounted VisuallyHidden span that satisfies
  // aria-labelledby / aria-describedby even when the visual tooltip is unmounted.
  const ariaTargetId = useStableId();
  const triggerRef = React.useRef<HTMLElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const showTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [tooltipStyle, setTooltipStyle] = React.useState<React.CSSProperties>({
    visibility: 'hidden',
  });

  const clearTimers = () => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const show = React.useCallback(() => {
    clearTimers();
    showTimerRef.current = setTimeout(() => setVisible(true), showDelay);
  }, [showDelay]);

  const hide = React.useCallback(() => {
    clearTimers();
    hideTimerRef.current = setTimeout(() => setVisible(false), hideDelay);
  }, [hideDelay]);

  const updatePosition = React.useCallback(() => {
    const style = getPositionStyle({
      calculatePosition({referrerHeight, referrerWidth, targetHeight, targetWidth}) {
        const totalOffset = GAP + NUBBIN_HEIGHT;
        const triggerCenterX = targetWidth / 2;

        switch (position) {
          case 'topLeft':
            return {top: -(referrerHeight + totalOffset), left: triggerCenterX - referrerWidth + NUBBIN_CENTER};
          case 'topCenter':
            return {top: -(referrerHeight + totalOffset), left: (targetWidth - referrerWidth) / 2};
          case 'topRight':
            return {top: -(referrerHeight + totalOffset), left: triggerCenterX - NUBBIN_CENTER};
          case 'bottomLeft':
            return {top: targetHeight + totalOffset, left: triggerCenterX - referrerWidth + NUBBIN_CENTER};
          case 'bottomCenter':
            return {top: targetHeight + totalOffset, left: (targetWidth - referrerWidth) / 2};
          case 'bottomRight':
            return {top: targetHeight + totalOffset, left: triggerCenterX - NUBBIN_CENTER};
          case 'left':
            return {top: (targetHeight - referrerHeight) / 2, left: -(referrerWidth + totalOffset)};
          case 'right':
            return {top: (targetHeight - referrerHeight) / 2, left: targetWidth + totalOffset};
          default: {
            const _exhaustive: never = position;
            void _exhaustive;
            return {top: 0, left: 0};
          }
        }
      },
      referrerRef: tooltipRef,
      targetRef: triggerRef,
    });
    setTooltipStyle(style);
  }, [position]);

  // Position before paint — useLayoutEffect prevents visibility flash on first render.
  // content is a dep so position recalculates when text changes while the tooltip is open.
  React.useLayoutEffect(() => {
    if (!visible) return;
    updatePosition();
  }, [visible, content, updatePosition]);

  // Recompute on scroll/resize — rAF-debounced to avoid layout thrash on rapid events.
  // Capture-phase scroll catches ancestor scroll containers, not just the window.
  React.useEffect(() => {
    if (!visible) return;
    let rafId: ReturnType<typeof requestAnimationFrame>;
    const onUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePosition);
    };
    window.addEventListener('resize', onUpdate);
    window.addEventListener('scroll', onUpdate, true);
    return () => {
      window.removeEventListener('resize', onUpdate);
      window.removeEventListener('scroll', onUpdate, true);
      cancelAnimationFrame(rafId);
    };
  }, [visible, updatePosition]);

  // Reset style when hidden so next open starts invisible.
  React.useEffect(() => {
    if (!visible) setTooltipStyle({visibility: 'hidden'});
  }, [visible]);

  // Cleanup timers on unmount
  React.useEffect(() => {
    return clearTimers;
  }, []);

  // WCAG 1.4.13 — tooltip must be dismissable via Escape without moving focus.
  React.useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearTimers();
        setVisible(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible]);

  // Augment trigger child with event handlers + ARIA
  const triggerChild = React.Children.only(children);
  const triggerProps: Record<string, unknown> = {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent) => {
      ((triggerChild.props as Record<string, unknown>).onMouseEnter as ((e: React.MouseEvent) => void) | undefined)?.(e);
      show();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      ((triggerChild.props as Record<string, unknown>).onMouseLeave as ((e: React.MouseEvent) => void) | undefined)?.(e);
      hide();
    },
    onFocus: (e: React.FocusEvent) => {
      ((triggerChild.props as Record<string, unknown>).onFocus as ((e: React.FocusEvent) => void) | undefined)?.(e);
      show();
    },
    onBlur: (e: React.FocusEvent) => {
      ((triggerChild.props as Record<string, unknown>).onBlur as ((e: React.FocusEvent) => void) | undefined)?.(e);
      hide();
    },
  };

  if (relationship === 'label') {
    triggerProps['aria-labelledby'] = ariaTargetId;
  } else {
    triggerProps['aria-describedby'] = ariaTargetId;
  }

  const augmentedTrigger = React.cloneElement(triggerChild, triggerProps as Record<string, unknown>);

  // Always-mounted hidden span — keeps aria-labelledby / aria-describedby
  // resolvable even while the visual tooltip is unmounted between interactions.
  const ariaTarget = (
    <VisuallyHidden id={ariaTargetId}>{content}</VisuallyHidden>
  );

  return (
    <span className={cx('ld-tooltip-wrapper', className)} style={style}>
      {augmentedTrigger}
      {ariaTarget}
      {visible && (
        <div
          aria-hidden="true"
          className={cx('ld-tooltip-tooltip', `ld-tooltip-${position}`)}
          id={tooltipId}
          ref={tooltipRef}
          role="tooltip"
          style={tooltipStyle}
        >
          {content}
        </div>
      )}
    </span>
  );
};

Tooltip.displayName = 'Tooltip';
