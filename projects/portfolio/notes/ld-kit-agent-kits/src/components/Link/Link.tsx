import * as React from 'react';

import {cx} from '../../common/cx';
import {getTarget, applyCommonProps} from '../../common/helpers';
import './Link.css';
export type LinkColor = 'default' | 'subtle' | 'white';

export interface LinkProps
  extends Omit<React.ComponentPropsWithRef<'a'>, 'className' | 'style'> {
  /**
   * The content for the link.
   */
  children: React.ReactNode;
  /**
   * The color for the link.
   *
   * @default "default"
   */
  color?: LinkColor;
  /**
   * The href for the link.
   */
  href: string;
  /**
   * The callback fired when the link is clicked.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /**
   * The target for the link.
   */
  target?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

/**
 * Links are navigational elements.
 * *
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const {
      children,
      color = 'default',
      className,
      target,
      ...rest
    } = applyCommonProps(props);

    return (
      <a
        className={cx('ld-link-link', color === 'subtle' && 'ld-link-subtle', color === 'white' && 'ld-link-white', className)}
        ref={ref}
        {...getTarget(target)}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';
