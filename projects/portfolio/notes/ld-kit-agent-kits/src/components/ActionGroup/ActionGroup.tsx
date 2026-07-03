import * as React from 'react';
import {cx} from '../../common/cx';
import {applyCommonProps} from '../../common/helpers';
import {Button} from '../Button';
import type {ButtonSize} from '../Button';
import {emit} from '../../common/helpers';
import './ActionGroup.css';


export type ActionGroupLayout = 'inline' | 'stacked';
export type ActionGroupPattern =
  | 'primary-secondary'
  | 'primary-tertiary'
  | 'secondary-tertiary'
  | 'tertiary-tertiary'
  | 'three-options';

export interface ActionGroupProps
  extends Omit<React.ComponentPropsWithoutRef<'ul'>, 'className' | 'style'> {
  /** @default 'inline' */
  layout?: ActionGroupLayout;
  /** @default 'primary-secondary' */
  pattern?: ActionGroupPattern;
  /** Button size applied to every action in the group. @default 'medium' */
  size?: ButtonSize;
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
  <li style={{display: 'contents'}}>{children}</li>
);

function PreferredPrimary({label, size = 'medium', fullWidth, onClick, buttonProps}: {label: string; size?: ButtonSize; fullWidth?: boolean; onClick?: React.MouseEventHandler<HTMLButtonElement>; buttonProps?: object}) {
  return <Button variant="primary" size={size} isFullWidth={fullWidth} onClick={(e: React.MouseEvent<HTMLButtonElement>) => { emit('ui:action-group:click', {role: 'preferred', variant: 'primary', label}); onClick?.(e); }} {...buttonProps}>{label}</Button>;
}

function PreferredSecondary({label, size = 'medium', fullWidth, onClick, buttonProps}: {label: string; size?: ButtonSize; fullWidth?: boolean; onClick?: React.MouseEventHandler<HTMLButtonElement>; buttonProps?: object}) {
  return <Button variant="secondary" size={size} isFullWidth={fullWidth} onClick={(e: React.MouseEvent<HTMLButtonElement>) => { emit('ui:action-group:click', {role: 'preferred', variant: 'secondary', label}); onClick?.(e); }} {...buttonProps}>{label}</Button>;
}

function AlternateSecondary({label, size = 'medium', fullWidth, onClick, buttonProps}: {label: string; size?: ButtonSize; fullWidth?: boolean; onClick?: React.MouseEventHandler<HTMLButtonElement>; buttonProps?: object}) {
  return <Button variant="secondary" size={size} isFullWidth={fullWidth} onClick={(e: React.MouseEvent<HTMLButtonElement>) => { emit('ui:action-group:click', {role: 'alternate', variant: 'secondary', label}); onClick?.(e); }} {...buttonProps}>{label}</Button>;
}

function TertiaryButton({label, size = 'medium', fullWidth, onClick, buttonProps}: {label: string; size?: ButtonSize; fullWidth?: boolean; onClick?: React.MouseEventHandler<HTMLButtonElement>; buttonProps?: object}) {
  return <Button variant="tertiary" size={size} isFullWidth={fullWidth} onClick={(e: React.MouseEvent<HTMLButtonElement>) => { emit('ui:action-group:click', {role: 'tertiary', variant: 'tertiary', label}); onClick?.(e); }} {...buttonProps}>{label}</Button>;
}

export const ActionGroup = React.forwardRef<HTMLUListElement, ActionGroupProps>((props, ref) => {
  const {
    layout = 'inline', pattern = 'primary-secondary', size = 'medium',
    preferredLabel = 'Preferred', alternateLabel = 'Alternate', thirdLabel = 'Alternate',
    preferredRight = true, fullWidth = true,
    onPreferred, onAlternate, onThird,
    preferredButtonProps, alternateButtonProps, thirdButtonProps,
    className, ...rest
  } = applyCommonProps(props);

  const isStacked = layout === 'stacked';

  if (isStacked && pattern === 'three-options') {
    return (
      <ul ref={ref} className={cx('ld-wcp-actiongroup-group', 'ld-wcp-actiongroup-stacked', 'ld-wcp-actiongroup-threeOptions', className)} {...rest}>
        <LI><AlternateSecondary label={alternateLabel} fullWidth size={size} onClick={onAlternate} buttonProps={alternateButtonProps} /></LI>
        <LI><PreferredPrimary label={preferredLabel} fullWidth size={size} onClick={onPreferred} buttonProps={preferredButtonProps} /></LI>
        <LI><TertiaryButton label={thirdLabel} fullWidth size={size} onClick={onThird} buttonProps={thirdButtonProps} /></LI>
      </ul>
    );
  }

  if (isStacked) {
    const preferred = (pattern === 'primary-secondary' || pattern === 'primary-tertiary')
      ? <PreferredPrimary label={preferredLabel} fullWidth size={size} onClick={onPreferred} buttonProps={preferredButtonProps} />
      : <PreferredSecondary label={preferredLabel} fullWidth size={size} onClick={onPreferred} buttonProps={preferredButtonProps} />;
    const alternate = pattern === 'primary-secondary'
      ? <AlternateSecondary label={alternateLabel} fullWidth size={size} onClick={onAlternate} buttonProps={alternateButtonProps} />
      : <TertiaryButton label={alternateLabel} fullWidth size={size} onClick={onAlternate} buttonProps={alternateButtonProps} />;
    return (
      <ul ref={ref} className={cx('ld-wcp-actiongroup-group', 'ld-wcp-actiongroup-stacked', className)} {...rest}>
        <LI>{preferred}</LI>
        <LI>{alternate}</LI>
      </ul>
    );
  }

  // Inline
  function renderInline() {
    switch (pattern) {
      case 'primary-secondary': {
        const alt = <LI key="alt"><AlternateSecondary label={alternateLabel} fullWidth={fullWidth} size={size} onClick={onAlternate} buttonProps={alternateButtonProps} /></LI>;
        const pref = <LI key="pref"><PreferredPrimary label={preferredLabel} fullWidth={fullWidth} size={size} onClick={onPreferred} buttonProps={preferredButtonProps} /></LI>;
        return preferredRight ? <>{alt}{pref}</> : <>{pref}{alt}</>;
      }
      case 'primary-tertiary': {
        const alt = <LI key="alt"><TertiaryButton label={alternateLabel} fullWidth={fullWidth} size={size} onClick={onAlternate} buttonProps={alternateButtonProps} /></LI>;
        const prim = <LI key="prim"><PreferredPrimary label={preferredLabel} fullWidth={fullWidth} size={size} onClick={onPreferred} buttonProps={preferredButtonProps} /></LI>;
        return preferredRight ? <>{alt}{prim}</> : <>{prim}{alt}</>;
      }
      case 'secondary-tertiary': {
        const alt = <LI key="alt"><TertiaryButton label={alternateLabel} fullWidth={fullWidth} size={size} onClick={onAlternate} buttonProps={alternateButtonProps} /></LI>;
        const sec = <LI key="sec"><PreferredSecondary label={preferredLabel} fullWidth={fullWidth} size={size} onClick={onPreferred} buttonProps={preferredButtonProps} /></LI>;
        return preferredRight ? <>{alt}{sec}</> : <>{sec}{alt}</>;
      }
      case 'tertiary-tertiary': {
        return (
          <>
            <LI key="alt"><TertiaryButton label={alternateLabel} fullWidth={fullWidth} size={size} onClick={onAlternate} buttonProps={alternateButtonProps} /></LI>
            <LI key="pref"><TertiaryButton label={preferredLabel} fullWidth={fullWidth} size={size} onClick={onPreferred} buttonProps={preferredButtonProps} /></LI>
          </>
        );
      }
      default: return null;
    }
  }

  return (
    <ul ref={ref} className={cx('ld-wcp-actiongroup-group', 'ld-wcp-actiongroup-inline', fullWidth && 'ld-wcp-actiongroup-inlineFullWidth', className)} {...rest}>
      {renderInline()}
    </ul>
  );
});

ActionGroup.displayName = 'ActionGroup';
