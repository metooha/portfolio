import * as React from 'react';
import {ILLUSTRATION_SVGS, ILLUSTRATION_META} from './data';
import manifest from './manifest.json';

/**
 * Public API for inline-SVG illustrations, ported from the Living Design kit.
 * The illustration data in `./data.ts` is a curated subset extracted from the
 * kit's Airtable-synced set — grow it by re-running the extract script.
 *
 * Usage:
 *   import {Illustration} from '@/app/components';
 *   <Illustration type="mono-small" name="Delivery" size={72} />
 *   <Illustration type="spot" name="AssociateOnTheWay" width={240} height={250} />
 */

export type IllustrationType = 'mono-small' | 'mono-large' | 'spot';

export interface IllustrationLookup {
  svg: string;
  width: number;
  height: number;
}

/** Resolve an illustration to its inline SVG string and source dimensions. */
export function getIllustration(
  type: IllustrationType,
  name: string,
): IllustrationLookup | null {
  const svgs = ILLUSTRATION_SVGS[type];
  const meta = ILLUSTRATION_META[type];
  const svg = svgs?.[name];
  if (!svg) {
    if (
      typeof process !== 'undefined' &&
      process.env &&
      process.env.NODE_ENV !== 'production'
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        `[Illustration] Unknown ${type} illustration: "${name}". Add it to the curated set in src/app/assets/walmart-assets/illustrations.`,
      );
    }
    return null;
  }
  const dims = meta?.[name] ?? {width: 0, height: 0};
  return {svg, width: dims.width, height: dims.height};
}

/** All illustration names available for a given type. */
export function listIllustrations(type: IllustrationType): string[] {
  const svgs = ILLUSTRATION_SVGS[type];
  return svgs ? Object.keys(svgs) : [];
}

/** Display label and count for a type — convenient for tab UIs. */
export function getIllustrationTypeInfo(
  type: IllustrationType,
): {label: string; count: number} {
  const entry = (manifest as Record<string, {label: string; count: number}>)[type];
  return entry ?? {label: type, count: 0};
}

// ─── React component ──────────────────────────────────────────────

export interface IllustrationProps {
  type: IllustrationType;
  name: string;
  /** Optional accessible label. Defaults to the name. Pass "" to mark decorative. */
  title?: string;
  width?: number | string;
  height?: number | string;
  /** Sets the longer source dimension; the shorter scales proportionally. */
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Render an inline-SVG illustration. Purely presentational. */
export function Illustration(props: IllustrationProps) {
  const {type, name, title, width, height, size, className, style} = props;
  const lookup = getIllustration(type, name);
  if (!lookup) return null;

  const {svg, width: srcW, height: srcH} = lookup;
  const aspectRatio = srcW > 0 && srcH > 0 ? `${srcW} / ${srcH}` : undefined;

  let resolvedWidth: number | string | undefined = width;
  let resolvedHeight: number | string | undefined = height;
  if (
    resolvedWidth === undefined &&
    resolvedHeight === undefined &&
    size !== undefined
  ) {
    if (srcW >= srcH) resolvedWidth = size;
    else resolvedHeight = size;
  }

  const labelProps: React.HTMLAttributes<HTMLSpanElement> =
    title === ''
      ? {'aria-hidden': true}
      : {role: 'img', 'aria-label': title ?? name};

  return (
    <span
      {...labelProps}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: resolvedWidth,
        height: resolvedHeight,
        aspectRatio:
          resolvedWidth !== undefined && resolvedHeight !== undefined
            ? undefined
            : aspectRatio,
        ...style,
      }}
      dangerouslySetInnerHTML={{__html: svg}}
    />
  );
}

Illustration.displayName = 'Illustration';
