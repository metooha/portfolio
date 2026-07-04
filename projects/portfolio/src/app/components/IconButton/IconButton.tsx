import * as React from 'react';

import {cx} from '../common/cx';
import {invariant, getTarget, onAnchorKeyDown, applyCommonProps} from '../common/helpers';
import {WithIconProps} from '../common/types';
import {emit} from '../common/helpers';
import './IconButton.css';
export type IconButtonSize = 'large' | 'medium' | 'small' | 'xsmall';
export type IconButtonColor =
  | 'default'
  | 'white'
  | 'primary'
  | 'secondary'
  | 'tertiary';
export type IconButtonVariant = 'round' | 'full';

interface IconButtonBaseProps {
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
  /**
   * The accessible label for the icon button.
   */
  a11yLabel: string;
  /**
   * The content for the icon button.
   */
  children: React.ReactNode;
  /**
   * The color of the icon button. `primary`, `secondary`, and `tertiary`
   * mirror the Button emphasis levels.
   *
   * @default "default"
   */
  color?: IconButtonColor;
  /**
   * The size for the icon button.
   *
   * @default "small"
   */
  size?: IconButtonSize;
  /**
   * The variant for the icon button.
   *
   * @default "round"
   */
  variant?: IconButtonVariant;
}

export type IconButtonAnchorProps = IconButtonBaseProps &
  Omit<JSX.IntrinsicElements['a'], 'className' | 'style'> & {
    /**
     * The href for the icon button (Anchor only).
     */
    href: string;
  };

export type IconButtonButtonProps = IconButtonBaseProps &
  Omit<JSX.IntrinsicElements['button'], 'className' | 'style'> & {
    /**
     * If the icon button is disabled (Button only).
     *
     * @default false
     */
    disabled?: boolean;
  };

export type IconButtonProps = IconButtonAnchorProps | IconButtonButtonProps;

export type IconButtonPolymorphicType = {
  (props: IconButtonAnchorProps): JSX.Element;
  (props: IconButtonButtonProps): JSX.Element;
  displayName?: string;
};

const isAnchor = (props: IconButtonProps): props is IconButtonAnchorProps =>
  'href' in props;

/* eslint-disable-next-line @typescript-eslint/naming-convention */
const _IconButton = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  IconButtonProps
>((props, ref) => {
  const {
    a11yLabel,
    children,
    className,
    size = 'small',
    color = 'default',
    variant = 'round',
    ...rest
  } = applyCommonProps(props);

  invariant(
    !!a11yLabel,
    '`IconButton` accessibility violation. `IconButton` requires an `a11yLabel`.'
  );

  const classes = cx('ld-iconbutton-iconButton', color === 'white' && 'ld-iconbutton-white', color === 'default' && 'ld-iconbutton-defaultColor', color === 'primary' && 'ld-iconbutton-primary', color === 'secondary' && 'ld-iconbutton-secondary', color === 'tertiary' && 'ld-iconbutton-tertiary', size === 'xsmall' && 'ld-iconbutton-xsmall', variant == 'round' && 'ld-iconbutton-round', variant === 'full' && 'ld-iconbutton-full', className);

  const content = React.isValidElement<WithIconProps>(children)
    ? React.cloneElement(children, {size: size === 'xsmall' ? 'small' : size})
    : children;

  if (isAnchor(props)) {
    const {
      href,
      onClick,
      onKeyDown: anchorOnKeyDown,
      target,
      ...anchorProps
    } = rest as Partial<IconButtonAnchorProps>;

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      emit('ui:icon-button:click', {a11yLabel, href});
      onClick?.(e);
    };

    const onKeyDown = onAnchorKeyDown({
      href,
      onClick,
      onKeyDown: anchorOnKeyDown,
    });

    return (
      <a
        aria-label={a11yLabel}
        className={classes}
        href={href}
        onClick={handleAnchorClick}
        onKeyDown={onKeyDown}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        {...getTarget(target)}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const {onClick: onButtonClick, ...buttonRest} = rest as Partial<IconButtonButtonProps>;

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    emit('ui:icon-button:click', {a11yLabel});
    onButtonClick?.(e);
  };

  return (
    <button
      aria-label={a11yLabel}
      className={classes}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      type="button"
      onClick={handleButtonClick}
      {...buttonRest}
    >
      {content}
    </button>
  );
});

_IconButton.displayName = 'IconButton';

/**
 * Icon Buttons trigger actions and rely solely on icons to convey their purpose.
 * *
 */
export const IconButton = _IconButton as IconButtonPolymorphicType;
