import * as React from 'react';
import {useViewport} from '../../utils/Layout';
import {DesktopFooter} from '../DesktopFooter';
import {MwebFooter} from '../MwebFooter';

export interface FooterProps {
  /**
   * Force a specific variant. By default the wrapper picks based on viewport
   * (mobile → mweb, large+ → desktop). Useful for previews and doc pages.
   */
  variant?: 'auto' | 'desktop' | 'mweb';
}

/**
 * Drop-in site footer. Picks the appropriate layout based on viewport
 * (mobile-web vs desktop). Override with `variant` for previews.
 */
export function Footer({variant = 'auto'}: FooterProps) {
  const {isAtLeastLarge} = useViewport();

  if (variant === 'desktop') return <DesktopFooter />;
  if (variant === 'mweb') return <MwebFooter contained />;

  return isAtLeastLarge ? <DesktopFooter /> : <MwebFooter contained />;
}

Footer.displayName = 'Footer';
