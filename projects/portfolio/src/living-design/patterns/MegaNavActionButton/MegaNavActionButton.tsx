/**
 * @source AX
 * @ported-from notes/LD-AX-Starter-Kit V1/client/components/walmart/MegaNavActionButton.tsx
 *
 * AX MegaNav Action Button — vertical icon-over-label tile used inside
 * dark mega-nav strips.
 *
 * Adaptation: `UNSAFE_className` dropped in favour of plain `className`.
 */
import * as React from 'react';

import {cx} from '@/living-design/common/cx';

import './MegaNavActionButton.css';

export interface MegaNavActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export const MegaNavActionButton: React.FC<MegaNavActionButtonProps> = ({
  icon,
  label,
  onClick,
  className,
}) => (
  <button
    type="button"
    className={cx('ax-meganav-action-btn', className)}
    onClick={onClick}
  >
    <span className="ax-meganav-action-btn__icon" aria-hidden>
      {icon}
    </span>
    <span className="ax-meganav-action-btn__label">{label}</span>
  </button>
);

MegaNavActionButton.displayName = 'MegaNavActionButton';

