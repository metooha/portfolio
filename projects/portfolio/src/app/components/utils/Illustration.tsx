import * as React from 'react';
import {
  ILLUSTRATION_SVGS,
  ILLUSTRATION_META,
  MONO_SMALL_ILLUSTRATION_SVGS,
  MONO_LARGE_ILLUSTRATION_SVGS,
  SPOT_ILLUSTRATION_SVGS,
} from '../../assets/walmart-assets/illustrations';
import manifest from '../../assets/walmart-assets/illustrations/manifest.json';

/**
 * Public API for inline-SVG illustrations. The illustration assets and their
 * metadata are generated at build time by the Airtable sync — see
 * `airtable-sync/lib/illustration-pipeline.mjs`. This file is the only place
 * application code should reach into that generated layer; consumers should
 * import the `Illustration` component or the `getIllustration` helper below.
 *
 * Usage:
 *
 *   import {Illustration} from './Illustration';
 *
 *   <Illustration type="mono-small" name="WalmartBusiness" />
 *   <Illustration type="mono-large" name="Coupons" size={120} />
 *   <Illustration type="spot" name="AssociateOnTheWay" width={240} height={250} />
 *
 * Names autocomplete based on `type`, so renaming an illustration in Airtable
 * surfaces as a TS error in every consumer after the next sync.
 */

/** Map from each illustration type to the literal union of its valid names.
 *  The generated `ILLUSTRATION_SVGS` barrel is typed as `Record<string, …>`
 *  for runtime ergonomics, so `keyof` it would widen to `string`. We pin the
 *  type union here instead — the airtable-sync `ILLUSTRATION_TYPES` config in
 *  `airtable-sync/config.mjs` is the single source of truth; if you add a new
 *  type there, also add it here. */
export type IllustrationNamesByType = {
  'mono-small': keyof typeof MONO_SMALL_ILLUSTRATION_SVGS;
  'mono-large': keyof typeof MONO_LARGE_ILLUSTRATION_SVGS;
  'spot': keyof typeof SPOT_ILLUSTRATION_SVGS;
};

export type IllustrationType = keyof IllustrationNamesByType;

export type IllustrationName<T extends IllustrationType> = IllustrationNamesByType[T];

export interface IllustrationLookup {
  svg: string;
  width: number;
  height: number;
}

/**
 * Resolve an illustration to its inline SVG string and source dimensions.
 * Returns `null` when the name doesn't exist for the given type — that should
 * only happen if a generated module went stale, so it warns once in dev.
 */
export function getIllustration<T extends IllustrationType>(
  type: T,
  name: IllustrationName<T>,
): IllustrationLookup | null {
  const svgs = ILLUSTRATION_SVGS[type];
  const meta = ILLUSTRATION_META[type];
  const key = name as string;
  const svg = svgs?.[key];
  if (!svg) {
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`[Illustration] Unknown ${type} illustration: "${key}". Run npm run airtable:pull-illustrations.`);
    }
    return null;
  }
  const dims = meta?.[key] ?? {width: 0, height: 0};
  return {svg, width: dims.width, height: dims.height};
}

/** All illustration names for a given type, sorted as the manifest emits them. */
export function listIllustrations<T extends IllustrationType>(type: T): Array<IllustrationName<T>> {
  const entry = manifest[type];
  if (!entry) return [];
  return entry.items.map((i) => i.name) as Array<IllustrationName<T>>;
}

/** Display label and count for a type — convenient for tab UIs. */
export function getIllustrationTypeInfo(type: IllustrationType): {label: string; count: number} {
  const entry = manifest[type];
  return {label: entry.label, count: entry.count};
}

// ─── React component ──────────────────────────────────────────────

type IllustrationBaseProps = {
  /** Optional accessible label. Defaults to the illustration name. Pass empty
   *  string to mark the SVG decorative (`aria-hidden`). */
  title?: string;
  /** Pixel width of the rendered box. If only `size` is given, applies to the
   *  longer dimension and the other is derived from the source aspect ratio. */
  width?: number | string;
  /** Pixel height of the rendered box. */
  height?: number | string;
  /** Square-ish convenience: sets max(width, height). Use for single-axis
   *  sizing when you don't care which dimension drives. */
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

export type IllustrationProps<T extends IllustrationType = IllustrationType> = {
  type: T;
  name: IllustrationName<T>;
} & IllustrationBaseProps;

/**
 * Render an inline-SVG illustration. The component is purely presentational —
 * no async loading, no theming. Sizing strategy:
 *
 *   • If `width` and `height` are both given, the box uses both literally.
 *   • If only one is given, the other derives from the source aspect ratio.
 *   • If `size` is given, it sets the longer source dimension; the shorter
 *     dimension scales proportionally.
 *   • If nothing is given, the box renders at 100% width with the source
 *     aspect ratio preserved via `aspect-ratio` CSS.
 */
export function Illustration<T extends IllustrationType>(props: IllustrationProps<T>) {
  const {type, name, title, width, height, size, className, style} = props;
  const lookup = getIllustration(type, name);
  if (!lookup) return null;

  const {svg, width: srcW, height: srcH} = lookup;
  const aspectRatio = srcW > 0 && srcH > 0 ? `${srcW} / ${srcH}` : undefined;

  let resolvedWidth: number | string | undefined = width;
  let resolvedHeight: number | string | undefined = height;
  if (resolvedWidth === undefined && resolvedHeight === undefined && size !== undefined) {
    if (srcW >= srcH) {
      resolvedWidth = size;
    } else {
      resolvedHeight = size;
    }
  }

  const labelProps: React.HTMLAttributes<HTMLSpanElement> =
    title === ''
      ? {'aria-hidden': true}
      : {role: 'img', 'aria-label': title ?? String(name)};

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
        aspectRatio: resolvedWidth !== undefined && resolvedHeight !== undefined ? undefined : aspectRatio,
        ...style,
      }}
      dangerouslySetInnerHTML={{__html: svg}}
    />
  );
}
