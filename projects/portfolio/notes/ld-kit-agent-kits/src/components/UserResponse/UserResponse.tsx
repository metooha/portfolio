'use client';

import * as React from 'react';

import {cx} from '../../common/cx';
import {applyCommonProps} from '../../common/helpers';
import {Body} from '../Text/Text';
import {VisuallyHidden} from '../VisuallyHidden';
import './UserResponse.css';

/**
 * The bubble fill. Each value maps to an `--ld-semantic-color-fill-*` token so
 * the bubble stays theme-aware. Pair any fill with any {@link UserResponseTextColor}.
 *
 * @default "brand-bold"
 */
export type UserResponseFill =
  | 'brand-bold'
  | 'brand'
  | 'brand-subtle'
  | 'accent-blue'
  | 'accent-blue-subtle'
  | 'accent-purple'
  | 'accent-purple-subtle'
  | 'accent-teal'
  | 'accent-teal-subtle'
  | 'accent-green'
  | 'accent-green-subtle'
  | 'accent-pink'
  | 'accent-pink-subtle'
  | 'accent-gray'
  | 'accent-gray-subtle'
  | 'positive'
  | 'negative'
  | 'info'
  | 'warning'
  | 'inverse'
  | 'subtle';

/**
 * The bubble text color. `onfill-*` values are tuned to read on a bold fill of
 * the same family; the rest map to standard text tokens.
 *
 * @default "onfill-brand"
 */
export type UserResponseTextColor =
  | 'onfill-brand'
  | 'onfill-brand-subtle'
  | 'onfill-positive'
  | 'onfill-negative'
  | 'onfill-warning'
  | 'onfill'
  | 'inverse'
  | 'default'
  | 'subtle';

/** Fill value → CSS color (token with a hex fallback). */
const FILL_COLORS: Record<UserResponseFill, string> = {
  'brand-bold': 'var(--ld-semantic-color-fill-brand-bold, #001e60)',
  brand: 'var(--ld-semantic-color-fill-brand, #0053e2)',
  'brand-subtle': 'var(--ld-semantic-color-fill-brand-subtle, #e6f1fd)',
  'accent-blue': 'var(--ld-semantic-color-fill-accent-blue, #0053e2)',
  'accent-blue-subtle': 'var(--ld-semantic-color-fill-accent-blue-subtle, #e6f1fd)',
  'accent-purple': 'var(--ld-semantic-color-fill-accent-purple, #63327e)',
  'accent-purple-subtle': 'var(--ld-semantic-color-fill-accent-purple-subtle, #f3ebf7)',
  'accent-teal': 'var(--ld-semantic-color-fill-accent-teal, #00809e)',
  'accent-teal-subtle': 'var(--ld-semantic-color-fill-accent-teal-subtle, #e0f3f8)',
  'accent-green': 'var(--ld-semantic-color-fill-accent-green, #2a8703)',
  'accent-green-subtle': 'var(--ld-semantic-color-fill-accent-green-subtle, #e9f5e1)',
  'accent-pink': 'var(--ld-semantic-color-fill-accent-pink, #cb2c90)',
  'accent-pink-subtle': 'var(--ld-semantic-color-fill-accent-pink-subtle, #fbe9f4)',
  'accent-gray': 'var(--ld-semantic-color-fill-accent-gray, #74767c)',
  'accent-gray-subtle': 'var(--ld-semantic-color-fill-accent-gray-subtle, #f0f1f2)',
  positive: 'var(--ld-semantic-color-fill-positive, #2a8703)',
  negative: 'var(--ld-semantic-color-fill-negative, #ea1100)',
  info: 'var(--ld-semantic-color-fill-info, #0053e2)',
  warning: 'var(--ld-semantic-color-fill-warning, #ffc107)',
  inverse: 'var(--ld-semantic-color-fill-inverse, #2e2f32)',
  subtle: 'var(--ld-semantic-color-fill-subtle, #f0f1f2)',
};

/** Text value → CSS color (token with a hex fallback). */
const TEXT_COLORS: Record<UserResponseTextColor, string> = {
  'onfill-brand': 'var(--ld-semantic-color-text-onfill-brand, #ffffff)',
  'onfill-brand-subtle': 'var(--ld-semantic-color-text-onfill-brand-subtle, #114ab6)',
  'onfill-positive': 'var(--ld-semantic-color-text-onfill-positive, #ffffff)',
  'onfill-negative': 'var(--ld-semantic-color-text-onfill-negative, #ffffff)',
  'onfill-warning': 'var(--ld-semantic-color-text-onfill-warning, #2e2f32)',
  onfill: 'var(--ld-semantic-color-text-onfill-transparent, #2e2f32)',
  inverse: 'var(--ld-semantic-color-text-inverse, #ffffff)',
  default: 'var(--ld-semantic-color-text, #2e2f32)',
  subtle: 'var(--ld-semantic-color-text-subtle, #515357)',
};

export interface UserResponseProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style' | 'slot'> {
  /** The user's message. */
  children: React.ReactNode;
  /** Optional rich content rendered beneath the message (e.g. an attachment). */
  slot?: React.ReactNode;
  /**
   * Optional delivery caption rendered below the bubble, right-aligned — e.g.
   * a "Not delivered · Try again" status when a message fails to send.
   */
  caption?: React.ReactNode;
  /**
   * The bubble fill. Pair freely with `textColor`.
   *
   * @default "brand-bold"
   */
  fill?: UserResponseFill;
  /**
   * The bubble text color.
   *
   * @default "onfill-brand"
   */
  textColor?: UserResponseTextColor;
}

/**
 * UserResponse renders a right-aligned user chat bubble. The default pairs the
 * `brand-bold` fill with `onfill-brand` text, but a designer can pick any
 * combination of {@link UserResponseFill} and {@link UserResponseTextColor}.
 */
export const UserResponse = React.forwardRef<HTMLDivElement, UserResponseProps>(
  (props, ref) => {
    const {
      children,
      className,
      slot,
      caption,
      fill = 'brand-bold',
      textColor = 'onfill-brand',
      ...rest
    } = applyCommonProps(props);

    const fillColor = FILL_COLORS[fill];
    const textColorValue = TEXT_COLORS[textColor];

    return (
      <div ref={ref} className={cx('ld-userresponse', className)} {...rest}>
        <div
          className="ld-userresponse-bubble"
          style={{background: fillColor, color: textColorValue}}
        >
          {/* Screen-reader-only ownership: visual right-alignment tells sighted
              users who sent this; announce it for assistive tech. */}
          <VisuallyHidden>Sent message</VisuallyHidden>
          <Body
            as="div"
            size="medium"
            UNSAFE_className="ld-userresponse-body"
            UNSAFE_style={{color: textColorValue}}
          >
            {children}
          </Body>
          {slot ? <div className="ld-userresponse-slot">{slot}</div> : null}
        </div>
        {caption ? <div className="ld-userresponse-caption">{caption}</div> : null}
      </div>
    );
  }
);

UserResponse.displayName = 'UserResponse';
