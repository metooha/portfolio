'use client';

import * as React from 'react';

import {cx} from '../common/cx';
import {applyCommonProps, type CommonProps} from '../common/helpers';
import './ScrollArea.css';

// ---------------------------------------------------------------------------
// ScrollArea
// ---------------------------------------------------------------------------

export interface ScrollAreaProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
  /**
   * Accessible label for the scrollable region. Announced by screen readers
   * when keyboard focus enters the viewport.
   *
   * @default "Scrollable content"
   */
  a11yLabel?: string;
}

export const ScrollArea: React.FunctionComponent<ScrollAreaProps> = (props) => {
  const {className, children, a11yLabel = 'Scrollable content', ...rest} = applyCommonProps(props);

  return (
    <div className={cx('ld-scroll-area-root', className)} {...rest}>
      {/* tabIndex={0} makes the scrollable region keyboard-accessible (WCAG 2.1.1).
          role="group" + aria-label announce the region's purpose to AT when focused. */}
      <div
        className="ld-scroll-area-viewport"
        tabIndex={0}
        role="group"
        aria-label={a11yLabel}
      >
        {children}
      </div>
    </div>
  );
};

ScrollArea.displayName = 'ScrollArea';

// ---------------------------------------------------------------------------
// ScrollBar
// ---------------------------------------------------------------------------

export interface ScrollBarProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  /** Orientation of the scrollbar. @default "vertical" */
  orientation?: 'vertical' | 'horizontal';
}

export const ScrollBar: React.FunctionComponent<ScrollBarProps> = (props) => {
  const {className, orientation = 'vertical', ...rest} = applyCommonProps(props);

  return (
    <div
      className={cx(
        'ld-scroll-area-scrollbar',
        `ld-scroll-area-scrollbar--${orientation}`,
        className,
      )}
      {...rest}
    />
  );
};

ScrollBar.displayName = 'ScrollBar';
