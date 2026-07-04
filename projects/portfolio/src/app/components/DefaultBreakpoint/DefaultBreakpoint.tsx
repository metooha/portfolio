'use client';

import * as React from 'react';

export type DefaultBreakpoint =
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge';

const DefaultBreakpointContext =
  React.createContext<DefaultBreakpoint>('small');

export interface DefaultBreakpointProviderProps {
  /**
   * The content for the default breakpoint provider.
   */
  children: React.ReactNode;
  /**
   * default breakpoint used in SSR for the default breakpoint provider.
   */
  defaultBreakpoint: DefaultBreakpoint;
}

/**
 * @private
 */
export const DefaultBreakpointProvider: React.FunctionComponent<
  DefaultBreakpointProviderProps
> = (props) => {
  const {children, defaultBreakpoint} = props;

  const contextValue = React.useRef(defaultBreakpoint);

  return (
    <DefaultBreakpointContext.Provider value={contextValue.current}>
      {children}
    </DefaultBreakpointContext.Provider>
  );
};

/**
 * @private
 */
export const useDefaultBreakpoint = () =>
  React.useContext(DefaultBreakpointContext);
