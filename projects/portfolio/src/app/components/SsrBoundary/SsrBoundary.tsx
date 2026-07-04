import * as React from 'react';

export type SsrBoundaryProps = React.ComponentPropsWithoutRef<'div'>;

const isDomEnvironment =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';

/**
 * @private
 *
 * Boundary to prevent rendering of nested components during SSR. (This is necessary for
 * components that access DOM elements, e.g., component adds a portal element to the DOM.)
 */
export const SsrBoundary: React.FunctionComponent<SsrBoundaryProps> = (
  props
) => {
  const {children} = props;

  // For an explanation of this eslint-disable, see: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md#allowexpressions
  return isDomEnvironment ? <>{children}</> : null;
};
