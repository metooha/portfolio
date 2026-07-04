import * as React from 'react';

import {cx} from '../common/cx';
import {applyCommonProps} from '../common/helpers';
import {PolymorphicElementWithoutRef} from '../common/types';
import './VisuallyHidden.css';
interface VisuallyHiddenBaseProps
  extends Omit<
      React.ComponentPropsWithoutRef<React.ElementType>,
      'className' | 'style'
    > {
  /**
   * The content for the visually hidden.
   */
  children: React.ReactNode;
  /**
   * Whether the element should become visible on focus for the visually hidden.
   *
   * @default false;
   */
  isFocusable?: boolean;
}

export type VisuallyHiddenProps<T extends React.ElementType> =
  PolymorphicElementWithoutRef<T, VisuallyHiddenBaseProps>;

/**
 * Visually Hidden is a utility component that makes content available for screen readers only.
 *
 * {@link https://digitaltoolkit.livingdesign.walmart.com/develop/react/utilities/visually-hidden/ React documentation}
 *
 */
export const VisuallyHidden = React.forwardRef(
  <T extends React.ElementType = 'span'>(
    props: VisuallyHiddenProps<T>,
    ref: React.Ref<Element>,
  ) => {
    const {
      as: Component = 'span',
      className,
      isFocusable = false,
      ...rest
    } = applyCommonProps(props);

    return (
      <Component
        ref={ref}
        className={cx('ld-visuallyhidden-visuallyHidden', isFocusable && 'ld-visuallyhidden-visuallyHiddenFocusable', className)}
        {...(rest as React.ComponentPropsWithoutRef<T>)}
      />
    );
  },
) as {
  <T extends React.ElementType = 'span'>(
    props: VisuallyHiddenProps<T> & {ref?: React.Ref<Element>}
  ): JSX.Element;
  displayName?: string;
};

VisuallyHidden.displayName = 'VisuallyHidden';
