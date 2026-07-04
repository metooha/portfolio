'use client';

import * as React from 'react';

import {cx} from '../common/cx';
import {setStyleProperty, applyCommonProps} from '../common/helpers';
import { useCSSTransition } from '../hooks/hooks';
import './Collapse.css';
export interface CollapseProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  /**
   * If the component is collapsed.
   *
   * @default false
   */
  isOpen?: boolean;
}

/**
 * Collapse is a utility component that is used to put long sections of information under a block that users can expand or collapse.
 *
 */
export const Collapse: React.FunctionComponent<CollapseProps> = (props) => {
  const {
    children,
    className,
    isOpen = false,
    ...rest
  } = applyCommonProps(props);

  const ref = React.useRef<HTMLDivElement>(null);

  const clearNodeStyleHeight = React.useCallback(() => {
    const node = ref.current;

    if (node) {
      setStyleProperty(node, 'height', '');
    }
  }, [ref]);

  const setNodeStyleHeight = React.useCallback(() => {
    const node = ref.current;

    if (node) {
      setStyleProperty(node, 'height', `${node.scrollHeight}px`);
    }
  }, [ref]);

  const {shouldMount} = useCSSTransition({
    classNames: {
      enter: 'ld-collapse-enter',
      enterActive: 'ld-collapse-enterActive',
      exit: 'ld-collapse-exit',
      exitActive: 'ld-collapse-exitActive',
    },
    onEntering: setNodeStyleHeight,
    onEntered: clearNodeStyleHeight,
    onExit: setNodeStyleHeight,
    onExiting: clearNodeStyleHeight,
    in: isOpen,
    mountOnEnter: true,
    nodeRef: ref,
    timeout: {
      enter: 300,
      exit: 250,
    },
    unmountOnExit: true,
  });

  return (
    shouldMount && <div
      className={cx('ld-collapse-collapse', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
};

Collapse.displayName = 'Collapse';
