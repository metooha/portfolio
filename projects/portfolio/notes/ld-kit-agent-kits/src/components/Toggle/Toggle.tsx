'use client';

import * as React from 'react';

import {cx} from '../../common/cx';
import {applyCommonProps, type CommonProps} from '../../common/helpers';
import {emit} from '../../common/helpers';
import './Toggle.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ToggleSize = 'small' | 'medium' | 'large';
export type ToggleVariant = 'default' | 'outline';
export type ToggleShape = 'square' | 'rounded';

export interface ToggleProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'className' | 'style'>,
    CommonProps {
  /** Whether the toggle is pressed (controlled). */
  pressed?: boolean;
  /** Default pressed state (uncontrolled). */
  defaultPressed?: boolean;
  /** Callback when pressed state changes. */
  onPressedChange?: (pressed: boolean) => void;
  /** Visual variant. @default "default" */
  variant?: ToggleVariant;
  /** Size of the toggle button. @default "medium" */
  size?: ToggleSize;
  /** Shape of the toggle button. @default "square" */
  shape?: ToggleShape;
}

// ---------------------------------------------------------------------------
// Toggle
// ---------------------------------------------------------------------------

export const Toggle: React.FunctionComponent<ToggleProps> = (props) => {
  const {
    className,
    pressed: controlledPressed,
    defaultPressed = false,
    onPressedChange,
    variant = 'default',
    size = 'medium',
    shape = 'square',
    disabled,
    children,
    onClick,
    ...rest
  } = applyCommonProps(props);

  const isControlled = controlledPressed !== undefined;
  const [internalPressed, setInternalPressed] = React.useState(defaultPressed);
  const isPressed = isControlled ? controlledPressed : internalPressed;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const next = !isPressed;
    if (!isControlled) setInternalPressed(next);
    emit('ui:toggle:change', {pressed: next});
    onPressedChange?.(next);
    onClick?.(e);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isPressed}
      data-state={isPressed ? 'on' : 'off'}
      disabled={disabled}
      className={cx(
        'ld-toggle-root',
        `ld-toggle-root--variant-${variant}`,
        `ld-toggle-root--size-${size}`,
        `ld-toggle-root--shape-${shape}`,
        className,
      )}
      onClick={handleClick}
      {...rest}
    >
      <span className="ld-toggle-content">{children}</span>
    </button>
  );
};

Toggle.displayName = 'Toggle';
