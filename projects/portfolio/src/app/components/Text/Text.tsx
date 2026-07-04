'use client';

import * as React from 'react';
import {cx} from '../common/cx';
import {applyCommonProps} from '../common/helpers';
import {PolymorphicElementWithoutRef} from '../common/types';
import './Text.css';

// TextColor service
export type TextColor =
  | 'accentBlue' | 'accentCyan' | 'accentGray' | 'accentGreen' | 'accentOrange'
  | 'accentPink' | 'accentPurple' | 'accentRed' | 'accentSpark' | 'accentYellow'
  | 'activated' | 'brand' | 'disabled' | 'edited' | 'info' | 'inverse'
  | 'negative' | 'onFill' | 'positive' | 'subtle' | 'subtlest' | 'warning';

function getTextColorClassName(color: TextColor): string {
  return `ld-text-textcolor-${color}`;
}

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

export type BodyColor = TextColor;
export type BodyElement = 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
export type BodySize = 'large' | 'medium' | 'small';
export type BodyWeight = 'default' | 'alt';

interface BodyBaseProps {
  color?: BodyColor;
  isMonospace?: boolean;
  size?: BodySize;
  weight?: BodyWeight;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export type BodyProps<T extends BodyElement> = PolymorphicElementWithoutRef<T, BodyBaseProps>;

export const Body = <T extends BodyElement = 'span'>(props: BodyProps<T>) => {

  const {as: Component = 'span' as any, className, color, isMonospace = false, size = 'medium', weight = 'default', ...rest} = applyCommonProps(props as any);
  return (
    <Component
      className={cx(
        'ld-text-body-body',
        isMonospace && 'ld-text-body-isMonospace',
        size === 'large' && 'ld-text-body-large',
        size === 'medium' && 'ld-text-body-medium',
        size === 'small' && 'ld-text-body-small',
        weight === 'default' && 'ld-text-body-weightDefault',
        weight === 'alt' && 'ld-text-body-weightAlt',
        color && getTextColorClassName(color),
        className,
      )}
      style={(rest as any).style}
      {...rest}
    />
  );
};
Body.displayName = 'Body';

// ---------------------------------------------------------------------------
// Caption
// ---------------------------------------------------------------------------

export type CaptionColor = TextColor;
export type CaptionElement = 'div' | 'p' | 'small' | 'span';
export type CaptionWeight = 'default' | 'alt';

interface CaptionBaseProps {
  color?: CaptionColor;
  isMonospace?: boolean;
  weight?: CaptionWeight;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export type CaptionProps<T extends CaptionElement> = PolymorphicElementWithoutRef<T, CaptionBaseProps>;

export const Caption = <T extends CaptionElement = 'span'>(props: CaptionProps<T>) => {

  const {as: Component = 'span' as any, className, color, isMonospace = false, weight = 'default', ...rest} = applyCommonProps(props as any);
  return (
    <Component
      className={cx(
        'ld-text-caption-caption',
        isMonospace && 'ld-text-caption-isMonospace',
        weight === 'default' && 'ld-text-caption-weightDefault',
        weight === 'alt' && 'ld-text-caption-weightAlt',
        color && getTextColorClassName(color),
        className,
      )}
      style={(rest as any).style}
      {...rest}
    />
  );
};
Caption.displayName = 'Caption';

// ---------------------------------------------------------------------------
// Heading
// ---------------------------------------------------------------------------

export type HeadingColor = TextColor;
export type HeadingElement = 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
export type HeadingSize = 'large' | 'medium' | 'small';
export type HeadingWeight = 'default' | 'alt';

interface HeadingBaseProps {
  color?: HeadingColor;
  size?: HeadingSize;
  weight?: HeadingWeight;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export type HeadingProps<T extends HeadingElement> = PolymorphicElementWithoutRef<T, HeadingBaseProps>;

export const Heading = <T extends HeadingElement = 'span'>(props: HeadingProps<T>) => {

  const {as: Component = 'span' as any, className, color, size = 'medium', weight = 'default', ...rest} = applyCommonProps(props as any);
  return (
    <Component
      className={cx(
        'ld-text-heading-heading',
        size === 'large' && 'ld-text-heading-large',
        size === 'medium' && 'ld-text-heading-medium',
        size === 'small' && 'ld-text-heading-small',
        weight === 'default' && 'ld-text-heading-weightDefault',
        weight === 'alt' && 'ld-text-heading-weightAlt',
        color && getTextColorClassName(color),
        className,
      )}
      style={(rest as any).style}
      {...rest}
    />
  );
};
Heading.displayName = 'Heading';

// ---------------------------------------------------------------------------
// Display
// ---------------------------------------------------------------------------

export type DisplayColor = TextColor;
export type DisplayElement = 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
export type DisplaySize = 'large' | 'small';
export type DisplayWeight = 'default' | 'alt';

interface DisplayBaseProps {
  color?: DisplayColor;
  size?: DisplaySize;
  weight?: DisplayWeight;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export type DisplayProps<T extends DisplayElement> = PolymorphicElementWithoutRef<T, DisplayBaseProps>;

export const Display = <T extends DisplayElement = 'span'>(props: DisplayProps<T>) => {

  const {as: Component = 'span' as any, className, color, size = 'large', weight = 'default', ...rest} = applyCommonProps(props as any);
  return (
    <Component
      className={cx(
        'ld-text-display-display',
        size === 'large' && 'ld-text-display-large',
        size === 'small' && 'ld-text-display-small',
        weight === 'default' && 'ld-text-display-weightDefault',
        weight === 'alt' && 'ld-text-display-weightAlt',
        color && getTextColorClassName(color),
        className,
      )}
      style={(rest as any).style}
      {...rest}
    />
  );
};
Display.displayName = 'Display';
