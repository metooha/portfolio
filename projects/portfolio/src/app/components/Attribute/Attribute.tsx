/**
 * @source AX
 * @ported-from notes/LD-AX-Starter-Kit V1/client/components/walmart/Attribute.tsx
 *
 * AX Attribute — leading-icon + label pattern with size (small / large) and
 * 5 color variants. Optionally appends a `→ secondary label` to the right.
 *
 * ---
 * ## Accessibility
 *
 * By default the leading icon is decorative (`aria-hidden`) — the `label` text
 * carries all the meaning. When the icon conveys additional context that the
 * label alone does not express, pass `iconLabel` to give it a spoken name:
 *
 * ```tsx
 * // SR reads: "Coupon, Limit 2"
 * <Attribute icon={<TagIcon />} iconLabel="Coupon" label="Limit 2" />
 *
 * // SR reads: "Scheduled time, 2 hours → 3 hours"
 * <Attribute icon={<ClockIcon />} iconLabel="Scheduled time" label="2 hours"
 *   additionalLabel label2="3 hours" />
 * ```
 *
 * When `iconLabel` is omitted the icon is hidden from assistive technology
 * and only the label is announced — correct for purely decorative icons.
 */
import * as React from 'react';

import {cx} from '../common/cx';
import {Icon} from '../Icons';

import './Attribute.css';

export type AttributeSize = 'small' | 'large';
export type AttributeColor =
  | 'default'
  | 'brand'
  | 'negative'
  | 'inverse'
  | 'highlight';

export interface AttributeProps {
  /** Display label. */
  label: string;
  /** @default 'small' */
  size?: AttributeSize;
  /** @default 'default' */
  color?: AttributeColor;
  /** Leading icon. Defaults to the LD `Tag` icon. */
  icon?: React.ReactNode;
  /**
   * Accessible name for the leading icon. When provided the icon is announced
   * by screen readers (e.g. `iconLabel="Coupon"` → SR reads "Coupon, Limit 2").
   * Omit when the icon is purely decorative and the label text is self-explanatory.
   */
  iconLabel?: string;
  /** When true, appends `→ label2` after the label. @default false */
  additionalLabel?: boolean;
  /** Secondary label rendered when `additionalLabel` is true. */
  label2?: string;
  className?: string;
}

const ICON_SIZE: Record<AttributeSize, number> = {small: 16, large: 20};

function ArrowRightIcon({size = 16}: {size?: number}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      role="img"
      aria-label="Compared to"
      className="ax-attribute__additional-icon"
    >
      <path
        d="M9 3.5 13.5 8 9 12.5M13 8H2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Attribute({
  label,
  size = 'small',
  color = 'default',
  icon,
  iconLabel,
  additionalLabel = false,
  label2 = 'Label 2',
  className,
}: AttributeProps) {
  const iconSize = ICON_SIZE[size];
  const resolvedIcon = icon ?? (
    <Icon name="Tag" decorative style={{fontSize: iconSize}} />
  );

  return (
    <span
      className={cx(
        'ax-attribute',
        `ax-attribute--${size}`,
        `ax-attribute--color-${color}`,
        className,
      )}
    >
      {/* When iconLabel is provided the wrapper becomes a named img role so
          screen readers announce it. Otherwise aria-hidden hides the icon. */}
      <span
        className="ax-attribute__icon"
        role={iconLabel ? 'img' : undefined}
        aria-label={iconLabel}
        aria-hidden={iconLabel ? undefined : true}
      >
        {resolvedIcon}
      </span>
      {additionalLabel ? (
        <span className="ax-attribute__additional-container">
          <span className={cx('ax-attribute__label', `ax-attribute__label--${size}`)}>
            {label}
          </span>
          <ArrowRightIcon />
          <span className={cx('ax-attribute__label', `ax-attribute__label--${size}`)}>
            {label2}
          </span>
        </span>
      ) : (
        <span className={cx('ax-attribute__label', `ax-attribute__label--${size}`)}>
          {label}
        </span>
      )}
    </span>
  );
}


Attribute.displayName = 'Attribute';
