import * as React from 'react';

export type ClockState = 'clocked-out' | 'clocked-in';

export interface ClockStatusProps {
  active: boolean;
}

/**
 * Clock-in / clock-out indicator dot, sourced from the AX Component Library
 * Figma (`AX/Clock Status — Large`).
 */
export const ClockStatus: React.FC<ClockStatusProps> = ({active}) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <circle
      cx="9"
      cy="9"
      r="9"
      fill="var(--ld-semantic-color-background, #ffffff)"
    />
    <circle
      cx="9"
      cy="9"
      r="7.5"
      fill={
        active
          ? 'var(--ld-semantic-color-fill-positive, #2a8703)'
          : 'var(--ld-semantic-color-fill-subtle, #f8f8f8)'
      }
      stroke={
        active
          ? 'var(--ld-semantic-color-border-positive-bold, #1d5f02)'
          : 'var(--ld-semantic-color-border-subtle, #515357)'
      }
      strokeWidth="1"
    />
    {active ? (
      <circle
        cx="9"
        cy="9"
        r="2"
        fill="var(--ld-semantic-color-background, #ffffff)"
      />
    ) : null}
  </svg>
);

export const ClockOut = () => <ClockStatus active={false} />;
export const ClockIn = () => <ClockStatus active />;
