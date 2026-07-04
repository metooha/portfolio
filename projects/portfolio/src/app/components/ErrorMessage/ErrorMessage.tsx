import * as React from 'react';

import {applyCommonProps} from '../common/helpers';
import {Body, Heading} from '../Text';
import './ErrorMessage.css';

export interface ErrorMessageProps
  extends Omit<
      React.ComponentPropsWithoutRef<'div'>,
      'className' | 'style' | 'title'
    > {
  /**
   * The actions for the error message.
   */
  actions?: React.ReactNode;
  /**
   * The content for the error message.
   */
  children: React.ReactNode;
  /**
   * The media for the error message.
   */
  media?: React.ReactNode;
  /**
   * The title for the error message.
   */
  title: React.ReactNode;
}

/**
 * @deprecated in @livingdesign/react@v1. This component will be removed in the next major version.
 *
 * Error Messages provide a familiar layout with descriptive content and suggested actions for error scenarios.
 * *
 */
export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = (
  props
) => {
  const {actions, children, media, title, ...rest} = applyCommonProps(props);

  return (
    <div className={'ld-errormessage-errorMessage'} {...rest}>
      {media && <div className={'ld-errormessage-media'}>{media}</div>}

      <Heading
        as="div"
        size={"large"}
        weight={"default"}
        UNSAFE_className={'ld-errormessage-title'}
      >
        {title}
      </Heading>

      <Body
        as="div"
        size={"medium"}
        UNSAFE_className={'ld-errormessage-textLabel'}
      >
        {children}
      </Body>

      {actions && <div className={'ld-errormessage-actions'}>{actions}</div>}
    </div>
  );
};
