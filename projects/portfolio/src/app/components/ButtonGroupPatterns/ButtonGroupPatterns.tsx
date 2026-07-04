import * as React from 'react';
import {cx} from '../common/cx';
import {applyCommonProps} from '../common/helpers';
import {Button} from '../Button';
import {emit} from '../common/helpers';
import './ButtonGroupPatterns.css';

export type ButtonGroupPatternsLayout = 'inline' | 'stacked';
export type ButtonGroupPatternsPattern =
  | 'primary-secondary'
  | 'primary-tertiary'
  | 'secondary-tertiary'
  | 'tertiary-tertiary'
  | 'three-options';

export interface ButtonGroupPatternsProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  /** @default 'inline' */
  layout?: ButtonGroupPatternsLayout;
  /** @default 'primary-secondary' */
  pattern?: ButtonGroupPatternsPattern;
  preferredLabel?: string;
  alternateLabel?: string;
  thirdLabel?: string;
  /** @default true */
  preferredRight?: boolean;
  /** @default true */
  fullWidth?: boolean;
  onPreferred?: React.MouseEventHandler<HTMLButtonElement>;
  onAlternate?: React.MouseEventHandler<HTMLButtonElement>;
  onThird?: React.MouseEventHandler<HTMLButtonElement>;
  preferredButtonProps?: Omit<React.ComponentPropsWithoutRef<'button'>, 'onClick' | 'children'>;
  alternateButtonProps?: Omit<React.ComponentPropsWithoutRef<'button'>, 'onClick' | 'children'>;
  thirdButtonProps?: Omit<React.ComponentPropsWithoutRef<'button'>, 'onClick' | 'children'>;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

const LI = ({children}: {children: React.ReactNode}) => (
  <div role="listitem" style={{display: 'contents'}}>{children}</div>
);

function PreferredPrimary({label, fullWidth, onClick, buttonProps}: {label: string; fullWidth?: boolean; onClick?: React.MouseEventHandler<HTMLButtonElement>; buttonProps?: object}) {
  return <Button variant="primary" size="medium" isFullWidth={fullWidth} onClick={(e: React.MouseEvent<HTMLButtonElement>) => { emit('ui:button-group:click', {role: 'preferred', variant: 'primary', label}); onClick?.(e); }} {...buttonProps}>{label}</Button>;
}

function PreferredSecondary({label, fullWidth, onClick, buttonProps}: {label: string; fullWidth?: boolean; onClick?: React.MouseEventHandler<HTMLButtonElement>; buttonProps?: object}) {
  return <Button variant="secondary" size="medium" isFullWidth={fullWidth} onClick={(e: React.MouseEvent<HTMLButtonElement>) => { emit('ui:button-group:click', {role: 'preferred', variant: 'secondary', label}); onClick?.(e); }} {...buttonProps}>{label}</Button>;
}

function AlternateSecondary({label, fullWidth, onClick, buttonProps}: {label: string; fullWidth?: boolean; onClick?: React.MouseEventHandler<HTMLButtonElement>; buttonProps?: object}) {
  return <Button variant="secondary" size="medium" isFullWidth={fullWidth} onClick={(e: React.MouseEvent<HTMLButtonElement>) => { emit('ui:button-group:click', {role: 'alternate', variant: 'secondary', label}); onClick?.(e); }} {...buttonProps}>{label}</Button>;
}

function TertiaryButton({label, fullWidth, onClick, buttonProps}: {label: string; fullWidth?: boolean; onClick?: React.MouseEventHandler<HTMLButtonElement>; buttonProps?: object}) {
  return <Button variant="tertiary" size="medium" isFullWidth={fullWidth} onClick={(e: React.MouseEvent<HTMLButtonElement>) => { emit('ui:button-group:click', {role: 'tertiary', variant: 'tertiary', label}); onClick?.(e); }} {...buttonProps}>{label}</Button>;
}

/**
 * Opinionated Button Group patterns documented in Living Design 3.5.
 * Renders pre-defined Primary/Secondary, Primary/Tertiary, etc. layouts
 * for either inline or stacked use. For an unopinionated row of buttons,
 * use the `ButtonGroup` primitive exported from `core/Button` instead.
 */
export const ButtonGroupPatterns = React.forwardRef<HTMLDivElement, ButtonGroupPatternsProps>((props, ref) => {
  const {
    layout = 'inline', pattern = 'primary-secondary',
    preferredLabel = 'Preferred', alternateLabel = 'Alternate', thirdLabel = 'Alternate',
    preferredRight = true, fullWidth = true,
    onPreferred, onAlternate, onThird,
    preferredButtonProps, alternateButtonProps, thirdButtonProps,
    className, ...rest
  } = applyCommonProps(props);

  const isStacked = layout === 'stacked';

  if (isStacked && pattern === 'three-options') {
    return (
      <div ref={ref} role="list" className={cx('ld-buttongroup-patterns', 'ld-buttongroup-patterns-stacked', 'ld-buttongroup-patterns-threeOptions', className)} {...rest}>
        <div role="listitem"><AlternateSecondary label={alternateLabel} fullWidth onClick={onAlternate} buttonProps={alternateButtonProps} /></div>
        <div role="listitem"><PreferredPrimary label={preferredLabel} fullWidth onClick={onPreferred} buttonProps={preferredButtonProps} /></div>
        <div role="listitem"><TertiaryButton label={thirdLabel} fullWidth onClick={onThird} buttonProps={thirdButtonProps} /></div>
      </div>
    );
  }

  if (isStacked) {
    const preferred = (pattern === 'primary-secondary' || pattern === 'primary-tertiary')
      ? <PreferredPrimary label={preferredLabel} fullWidth onClick={onPreferred} buttonProps={preferredButtonProps} />
      : <PreferredSecondary label={preferredLabel} fullWidth onClick={onPreferred} buttonProps={preferredButtonProps} />;
    const alternate = pattern === 'primary-secondary'
      ? <AlternateSecondary label={alternateLabel} fullWidth onClick={onAlternate} buttonProps={alternateButtonProps} />
      : <TertiaryButton label={alternateLabel} fullWidth onClick={onAlternate} buttonProps={alternateButtonProps} />;
    return (
      <div ref={ref} role="list" className={cx('ld-buttongroup-patterns', 'ld-buttongroup-patterns-stacked', className)} {...rest}>
        <LI>{preferred}</LI>
        <LI>{alternate}</LI>
      </div>
    );
  }

  function renderInline() {
    switch (pattern) {
      case 'primary-secondary': {
        const alt = <LI key="alt"><AlternateSecondary label={alternateLabel} fullWidth={fullWidth} onClick={onAlternate} buttonProps={alternateButtonProps} /></LI>;
        const pref = <LI key="pref"><PreferredPrimary label={preferredLabel} fullWidth={fullWidth} onClick={onPreferred} buttonProps={preferredButtonProps} /></LI>;
        return preferredRight ? <>{alt}{pref}</> : <>{pref}{alt}</>;
      }
      case 'primary-tertiary': {
        const alt = <LI key="alt"><TertiaryButton label={alternateLabel} fullWidth={fullWidth} onClick={onAlternate} buttonProps={alternateButtonProps} /></LI>;
        const prim = <LI key="prim"><PreferredPrimary label={preferredLabel} fullWidth={fullWidth} onClick={onPreferred} buttonProps={preferredButtonProps} /></LI>;
        return preferredRight ? <>{alt}{prim}</> : <>{prim}{alt}</>;
      }
      case 'secondary-tertiary': {
        const alt = <LI key="alt"><TertiaryButton label={alternateLabel} fullWidth={fullWidth} onClick={onAlternate} buttonProps={alternateButtonProps} /></LI>;
        const sec = <LI key="sec"><PreferredSecondary label={preferredLabel} fullWidth={fullWidth} onClick={onPreferred} buttonProps={preferredButtonProps} /></LI>;
        return preferredRight ? <>{alt}{sec}</> : <>{sec}{alt}</>;
      }
      case 'tertiary-tertiary': {
        return (
          <>
            <LI key="alt"><TertiaryButton label={alternateLabel} fullWidth={fullWidth} onClick={onAlternate} buttonProps={alternateButtonProps} /></LI>
            <LI key="pref"><TertiaryButton label={preferredLabel} fullWidth={fullWidth} onClick={onPreferred} buttonProps={preferredButtonProps} /></LI>
          </>
        );
      }
      default: return null;
    }
  }

  return (
    <div ref={ref} role="list" className={cx('ld-buttongroup-patterns', 'ld-buttongroup-patterns-inline', fullWidth && 'ld-buttongroup-patterns-inlineFullWidth', className)} {...rest}>
      {renderInline()}
    </div>
  );
});

ButtonGroupPatterns.displayName = 'ButtonGroupPatterns';
