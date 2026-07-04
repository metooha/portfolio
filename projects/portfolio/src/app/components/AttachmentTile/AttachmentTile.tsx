'use client';

import * as React from 'react';

import {cx} from '../common/cx';
import {applyCommonProps, CommonProps} from '../common/helpers';
import {CloseIcon} from '../Icons';
import './AttachmentTile.css';

// ---------------------------------------------------------------------------
// AttachmentTileCloseButton (inlined sub-component)
// ---------------------------------------------------------------------------

export interface AttachmentTileCloseButtonProps
  extends Omit<
    React.ComponentPropsWithRef<'button'>,
    'children' | 'className' | 'style' | 'type'
  > {}

/**
 * @private
 */
export const AttachmentTileCloseButton = React.forwardRef<
  HTMLButtonElement,
  AttachmentTileCloseButtonProps
>((props, ref) => {
  const {className, ...rest} = applyCommonProps(props);

  return (
    <button
      className={cx('ld-attachmenttile-close', className)}
      ref={ref}
      type="button"
      {...rest}
    >
      <CloseIcon size="small" className={'ld-attachmenttile-closeIcon'} />
    </button>
  );
});

AttachmentTileCloseButton.displayName = 'AttachmentTileCloseButton';

/**
 * Attachment Tile variant:
 * - `icon` → a leading pictogram/icon with a title and description (≈176×64).
 * - `image` → a compact image thumbnail with no text (≈88×56).
 */
export type AttachmentTileVariant = 'icon' | 'image';

export interface AttachmentTileProps
  extends CommonProps,
    Omit<
      React.ComponentPropsWithoutRef<'div'>,
      'className' | 'style' | 'title'
    > {
  /**
   * The props spread to the tile's close (remove) button.
   */
  closeButtonProps?: AttachmentTileCloseButtonProps;
  /**
   * The description shown under the title. Only rendered for the `icon`
   * variant.
   */
  description?: React.ReactNode;
  /**
   * If the tile is disabled.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * The image (thumbnail) content for the `image` variant — typically an
   * `<img>`. Sized and rounded by the tile.
   */
  image?: React.ReactNode;
  /**
   * The leading content for the `icon` variant — typically a `SpotIcon` or a
   * file-type pictogram.
   */
  leading?: React.ReactNode;
  /**
   * The callback fired when the tile's close (remove) button is clicked.
   */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * The accessible label for the close (remove) button.
   *
   * @default "Remove attachment"
   */
  removeLabel?: string;
  /**
   * The title for the `icon` variant.
   */
  title?: React.ReactNode;
  /**
   * The variant for the tile.
   *
   * @default "icon"
   */
  variant?: AttachmentTileVariant;
}

/**
 * Attachment Tiles represent an attached file or image as a compact, removable
 * chip. The `icon` variant pairs a leading pictogram with a title and
 * description; the `image` variant shows a square thumbnail. The trailing close
 * button is hidden by default and revealed on hover (or when the tile receives
 * keyboard focus); wire it with `onRemove`. Tiles also respond to hover, focus,
 * and pressed input.
 */
export const AttachmentTile = React.forwardRef<
  HTMLDivElement,
  AttachmentTileProps
>((props, ref) => {
  const {
    className,
    closeButtonProps,
    description,
    disabled = false,
    image,
    leading,
    onRemove,
    removeLabel,
    title,
    variant = 'icon',
    ...rest
  } = applyCommonProps(props);

  // Fold the file name into the remove control's accessible name so that, with
  // several attachments, each "Remove" button is uniquely identifiable
  // ("Remove Q3-report.pdf"). An explicit removeLabel still wins.
  const titleText = typeof title === 'string' ? title : undefined;
  const resolvedRemoveLabel = removeLabel ?? (titleText ? `Remove ${titleText}` : 'Remove attachment');

  // Keep a handle on the tile so we can move focus to a neighbouring tile's
  // remove button before this tile unmounts (otherwise focus falls to <body>).
  const tileRef = React.useRef<HTMLDivElement | null>(null);
  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      tileRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  return (
    <div
      className={cx(
        'ld-attachmenttile-tile',
        variant === 'icon' && 'ld-attachmenttile-icon',
        variant === 'image' && 'ld-attachmenttile-image',
        disabled && 'ld-attachmenttile-disabled',
        className
      )}
      ref={setRefs}
      {...rest}
    >
      {variant === 'image'
        ? image && <span className={'ld-attachmenttile-imageSlot'}>{image}</span>
        : leading && (
            <span className={'ld-attachmenttile-leading'} aria-hidden="true">
              {leading}
            </span>
          )}

      {variant === 'icon' && (title || description) && (
        <span className={'ld-attachmenttile-text'}>
          {title && <span className={'ld-attachmenttile-title'}>{title}</span>}
          {description && (
            <span className={'ld-attachmenttile-description'}>{description}</span>
          )}
        </span>
      )}

      <AttachmentTileCloseButton
        aria-label={resolvedRemoveLabel}
        disabled={disabled}
        {...closeButtonProps}
        onClick={(event) => {
          closeButtonProps?.onClick?.(event);

          // Move focus to a neighbouring tile's remove button before this tile
          // is unmounted by the consumer, so focus isn't stranded on <body>.
          const el = tileRef.current;
          const tiles = el
            ? Array.from(
                el.parentElement?.querySelectorAll<HTMLElement>('.ld-attachmenttile-tile') ?? [],
              )
            : [];
          const i = el ? tiles.indexOf(el) : -1;
          const sibling = i >= 0 ? tiles[i + 1] ?? tiles[i - 1] ?? null : null;
          const target = sibling?.querySelector<HTMLElement>('.ld-attachmenttile-close');

          onRemove?.(event);

          if (target) requestAnimationFrame(() => target.focus());
        }}
      />
    </div>
  );
});

AttachmentTile.displayName = 'AttachmentTile';
