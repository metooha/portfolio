import * as React from 'react';

import {cx} from '../../common/cx';
import {applyCommonProps} from '../../common/helpers';
import './Container.css';
export interface ContainerProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  /**
   * The content for the container.
   */
  children: React.ReactNode;
}

/**
 * Container is a utility component that sets a maximum width for layouts.
 * *
 */
export const Container: React.FunctionComponent<ContainerProps> = (props) => {
  const {children, className, ...rest} = applyCommonProps(props);

  return (
    <div className={cx('ld-container-container', className)} {...rest}>
      {children}
    </div>
  );
};

Container.displayName = 'Container';
