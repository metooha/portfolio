'use client';

import * as React from 'react';

import {cx} from '../../common/cx';
import {applyCommonProps, CommonProps} from '../../common/helpers';
import {Heading, Body} from '../Text';
import './InteractiveCard.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CardInteractiveVariant = 'elevated' | 'outlined' | 'border' | 'frameless';
export type CardInteractiveLayout = 'default' | 'inline';
export type CardInteractiveSize = 'small' | 'medium' | 'large';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface CardInteractiveContextValue {
  size: CardInteractiveSize;
  layout: CardInteractiveLayout;
}

export const CardInteractiveContext = React.createContext<CardInteractiveContextValue>({
  size: 'large',
  layout: 'default',
});

// ---------------------------------------------------------------------------
// CardInteractiveHeader
// ---------------------------------------------------------------------------

export interface CardInteractiveHeaderProps
  extends CommonProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style' | 'title'> {
  /**
   * The title for the card header. Typography is driven by `size` context.
   * - large → Heading/small
   * - medium → Body/large (bold)
   * - small → Body/medium (bold)
   */
  title: React.ReactNode;
  /**
   * Visual leading slot — accepts an icon, avatar, spot-icon, or a non-interactive
   * `Tag` (size "small") used as a status/category label.
   * The slot renders as-is; each child is responsible for its own accessibility
   * (icons should carry `aria-hidden`, Tags are read by assistive tech).
   */
  leading?: React.ReactNode;
  /**
   * Interactive leading slot — accepts `IconButton`, `LinkButton`, `Tag`, etc.
   * Wrapped in a container that calls `stopPropagation` on click/keydown so the
   * inner control fires independently without also triggering the card's onClick.
   */
  leadingControl?: React.ReactNode;
  /**
   * Optional subtitle rendered below the title as Body/small in a subtle color.
   * Useful for data cards that need a secondary label or description in the header.
   */
  description?: React.ReactNode;
  /**
   * Trailing slot (e.g. chevron, badge, metadata).
   * In `inline` layout this slot is CSS-ordered to the far right of the row.
   * No default is provided — the consumer is responsible for supplying it.
   */
  trailing?: React.ReactNode;
  /**
   * Interactive trailing slot — accepts `IconButton` (e.g. a dismiss close button).
   * Wrapped in a container that calls `stopPropagation` on click/keydown so the
   * inner control fires independently without also triggering the card's onClick.
   */
  trailingControl?: React.ReactNode;
}

export const CardInteractiveHeader: React.FunctionComponent<CardInteractiveHeaderProps> = (
  props,
) => {
  const {title, description, leading, leadingControl, trailing, trailingControl, className, ...rest} =
    applyCommonProps(props);
  const {size, layout} = React.useContext(CardInteractiveContext);

  const handleControlInteraction = (
    e: React.MouseEvent | React.KeyboardEvent | React.PointerEvent,
  ) => {
    e.stopPropagation();
  };

  const titleNode =
    size === 'large' ? (
      <Heading UNSAFE_className={'ld-interactivecard-header-title'} size="small">
        {title}
      </Heading>
    ) : size === 'medium' ? (
      <Body UNSAFE_className={'ld-interactivecard-header-title'} size="large" weight="alt">
        {title}
      </Body>
    ) : (
      <Body UNSAFE_className={'ld-interactivecard-header-title'} size="medium" weight="alt">
        {title}
      </Body>
    );

  return (
    <div
      className={cx(
        'ld-interactivecard-header',
        layout === 'inline' && 'ld-interactivecard-header-inline',
        className,
      )}
      {...rest}
    >
      {leadingControl && (
        <span
          className={'ld-interactivecard-header-leading-control'}
          onClick={handleControlInteraction}
          onKeyDown={handleControlInteraction}
          onPointerDown={handleControlInteraction}
        >
          {leadingControl}
        </span>
      )}

      {leading && !leadingControl && (
        <span className={'ld-interactivecard-header-leading'}>
          {leading}
        </span>
      )}

      {titleNode}

      {description && (
        <Body UNSAFE_className={'ld-interactivecard-header-description'} size="small" color="subtle">
          {description}
        </Body>
      )}

      {trailing && (
        <span className={'ld-interactivecard-header-trailing'}>{trailing}</span>
      )}

      {trailingControl && (
        <span
          className={'ld-interactivecard-header-trailing-control'}
          onClick={handleControlInteraction}
          onKeyDown={handleControlInteraction}
          onPointerDown={handleControlInteraction}
        >
          {trailingControl}
        </span>
      )}
    </div>
  );
};

CardInteractiveHeader.displayName = 'CardInteractiveHeader';

// ---------------------------------------------------------------------------
// CardInteractiveContent
// ---------------------------------------------------------------------------

export interface CardInteractiveContentProps
  extends CommonProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  /**
   * The content slot — accepts media, body text, images, or arbitrary markup.
   * Typography size and padding are driven by the parent card's `size` context.
   */
  children: React.ReactNode;
}

export const CardInteractiveContent: React.FunctionComponent<
  CardInteractiveContentProps
> = (props) => {
  const {children, className, ...rest} = applyCommonProps(props);
  const {size, layout} = React.useContext(CardInteractiveContext);

  return (
    <div
      className={cx(
        'ld-interactivecard-content',
        layout === 'inline' && 'ld-interactivecard-content-inline',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

CardInteractiveContent.displayName = 'CardInteractiveContent';

// ---------------------------------------------------------------------------
// CardInteractive (root)
// ---------------------------------------------------------------------------

export interface CardInteractiveProps
  extends CommonProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style' | 'onClick'> {
  /**
   * The compound children — typically `CardInteractiveHeader` and/or
   * `CardInteractiveContent`.
   */
  children: React.ReactNode;
  /**
   * The single action handler for the card. Required — the entire surface is
   * a single interactive control.
   */
  onClick: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
  /**
   * The container style for the card.
   * - `elevated` — white surface with box-shadow (default)
   * - `outlined` — white surface with 1px border, no shadow
   * - `border` — transparent fill with 1px border
   * - `frameless` — transparent fill, no visible border
   *
   * @default "elevated"
   */
  variant?: CardInteractiveVariant;
  /**
   * Controls whether header and content stack (`default`) or appear side-by-side
   * on a single row (`inline`).
   *
   * @default "default"
   */
  layout?: CardInteractiveLayout;
  /**
   * The size for the card — drives padding and title typography.
   * - `small` — 4 px padding, Body/medium title
   * - `medium` — 8 px padding, Body/large title
   * - `large` — 16 px padding, Heading/small title (default)
   *
   * @default "large"
   */
  size?: CardInteractiveSize;
  /**
   * If true, the card is non-interactive and visually dimmed.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the card renders with a blue border and tinted background to
   * indicate a selected/activated state. Sets `aria-pressed` on the button.
   *
   * @default false
   */
  activated?: boolean;
  /**
   * If true, the card is display-only: no button role, no tab stop, no pointer
   * events, no interactive state fills.
   *
   * @default false
   */
  readOnly?: boolean;
  /**
   * Accessible label for the card button. Recommended when the visible heading
   * text is not descriptive enough in isolation (e.g. "View details" without
   * context). When omitted, assistive technology reads the heading text.
   */
  a11yLabel?: string;
}

/* eslint-disable-next-line @typescript-eslint/naming-convention */
const _CardInteractive = React.forwardRef<HTMLDivElement, CardInteractiveProps>(
  (props, ref) => {
    const {
      children,
      className,
      onClick,
      variant = 'elevated',
      layout = 'default',
      size = 'large',
      disabled = false,
      activated = false,
      readOnly = false,
      a11yLabel,
      ...rest
    } = applyCommonProps(props);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || readOnly) return;
      onClick(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled || readOnly) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        onClick(e);
      } else if (e.key === ' ') {
        // Prevent page scroll on Space
        e.preventDefault();
        onClick(e);
      }
    };

    const contextValue = React.useMemo<CardInteractiveContextValue>(
      () => ({size, layout}),
      [size, layout],
    );

    return (
      <CardInteractiveContext.Provider value={contextValue}>
        <div
          aria-disabled={disabled || undefined}
          aria-label={a11yLabel}
          aria-pressed={!readOnly && activated ? true : undefined}
          className={cx(
            'ld-interactivecard-root',
            variant === 'elevated' && 'ld-interactivecard-elevated',
            variant === 'outlined' && 'ld-interactivecard-outlined',
            variant === 'border' && 'ld-interactivecard-border',
            variant === 'frameless' && 'ld-interactivecard-frameless',
            layout === 'default' && 'ld-interactivecard-layout-default',
            layout === 'inline' && 'ld-interactivecard-layout-inline',
            size === 'small' && 'ld-interactivecard-size-small',
            size === 'medium' && 'ld-interactivecard-size-medium',
            size === 'large' && 'ld-interactivecard-size-large',
            disabled && 'ld-interactivecard-disabled',
            activated && !readOnly && 'ld-interactivecard-activated',
            readOnly && 'ld-interactivecard-readonly',
            className,
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          ref={ref}
          role={readOnly ? undefined : 'button'}
          tabIndex={readOnly ? undefined : disabled ? -1 : 0}
          {...rest}
        >
          {children}
        </div>
      </CardInteractiveContext.Provider>
    );
  },
);

_CardInteractive.displayName = 'CardInteractive';

/**
 * CardInteractive is a single-action card whose entire surface navigates or
 * triggers one handler. It supports a slottable header (with visual and
 * interactive leading slots) and a free-form content area.
 *
 * Use `CardInteractiveHeader` and `CardInteractiveContent` as children.
 * Choose a `layout` (`default` = stacked, `inline` = single-row) and a
 * container `variant` (`elevated` | `outlined` | `border` | `frameless`).
 */
export const CardInteractive = _CardInteractive;
