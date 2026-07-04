import * as React from 'react';
import { cx } from '../common/cx';
import { applyCommonProps } from '../common/helpers';
import { PolymorphicElementWithoutRef } from '../common/types';
import './CaseStudyText.css';

export type CaseStudyHeroTextElement = 'div' | 'p' | 'span' | 'h1';

export type PageTitleTextElement = CaseStudyHeroTextElement;

export type CaseStudyBadgeColor = 'yellow' | 'green' | 'muted';

interface CaseStudyHeroTextBaseProps {
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export type CaseStudyHeroTextProps<T extends CaseStudyHeroTextElement> = PolymorphicElementWithoutRef<
  T,
  CaseStudyHeroTextBaseProps
>;

export type PageTitleTextProps<T extends PageTitleTextElement> = PolymorphicElementWithoutRef<
  T,
  CaseStudyHeroTextBaseProps
>;

/** Fluid hero overlay title — themeable under Display → Hero. */
export const CaseStudyHeroText = <T extends CaseStudyHeroTextElement = 'p'>(props: CaseStudyHeroTextProps<T>) => {
  const { as: Component = 'p' as CaseStudyHeroTextElement, className, ...rest } = applyCommonProps(
    props as CaseStudyHeroTextProps<CaseStudyHeroTextElement>,
  );

  return (
    <Component
      className={cx('ld-case-study-text', 'ld-case-study-text-hero', className)}
      {...rest}
    />
  );
};
CaseStudyHeroText.displayName = 'CaseStudyHeroText';

/** Case study overview title — themeable under Display → Page title. */
export const PageTitleText = <T extends PageTitleTextElement = 'p'>(props: PageTitleTextProps<T>) => {
  const { as: Component = 'p' as PageTitleTextElement, className, ...rest } = applyCommonProps(
    props as PageTitleTextProps<PageTitleTextElement>,
  );

  return (
    <Component
      className={cx('ld-case-study-text', 'ld-text-page-title', className)}
      {...rest}
    />
  );
};
PageTitleText.displayName = 'PageTitleText';

export function CaseStudyBadge({
  color,
  children,
  className,
}: {
  color: CaseStudyBadgeColor;
  children: React.ReactNode;
  className?: string;
}) {
  const badgeClass =
    color === 'yellow'
      ? 'ld-case-study-badge-yellow'
      : color === 'green'
        ? 'ld-case-study-badge-green'
        : 'ld-case-study-badge-muted';

  return (
    <div className={cx('ld-case-study-badge', badgeClass, className)} data-name="Count">
      {children}
    </div>
  );
}
