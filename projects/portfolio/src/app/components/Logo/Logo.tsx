'use client';

import type {CSSProperties} from 'react';
import {
  getCurrentTheme,
  getThemePrimaryIconFont,
  useThemeMediaKey,
  type ThemeName,
} from '../utils/Theming';
import {MEDIA_SVGS} from '../../assets/walmart-assets/media';
import './Logo.css';

interface LogoProps {
  /** Glyph name as it appears in Airtable (e.g. "Logo", "Wordmark", "LogoInverse"). Default: "Logo". */
  name?: string;
  /** Logo height in px. Width follows the SVG's intrinsic aspect ratio. */
  size?: number;
  /** Override the active tenant; defaults to the current theme. */
  tenant?: ThemeName;
  /** Accessible label. Defaults to `${tenant} Homepage`. */
  a11yLabel?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

export function Logo({
  name = 'Logo',
  size = 36,
  tenant,
  a11yLabel,
  className,
  style,
  title,
}: LogoProps) {
  const runtimeKey = useThemeMediaKey();
  const mediaKey = tenant ? getThemePrimaryIconFont(tenant) : runtimeKey;
  const svg = MEDIA_SVGS[mediaKey]?.[name];
  if (!svg) return null;

  const label = a11yLabel ?? `${tenant ?? getCurrentTheme()} Homepage`;

  return (
    <span
      role="img"
      aria-label={label}
      title={title}
      className={`ld-logo${className ? ` ${className}` : ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: size,
        lineHeight: 0,
        ...style,
      }}
      dangerouslySetInnerHTML={{__html: svg}}
    />
  );
}
