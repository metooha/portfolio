import * as React from 'react';
import {cx} from '@/living-design/common/cx';
import {applyCommonProps} from '@/living-design/common/helpers';
import {Panel} from '@/living-design/components/Panel';
import {QueueItemCard, QueueItem} from '../QueueItemCard';
import './QueuePanel.css';

export type {QueueItem} from '../QueueItemCard';

export interface QueuePanelProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  isOpen: boolean;
  onClose: () => void;
  items: QueueItem[];
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export const QueuePanel: React.FunctionComponent<QueuePanelProps> = (props) => {
  const {isOpen, onClose, items, className, ...rest} = applyCommonProps(props);
  const itemCount = items.length;
  const title = `You're in line for ${itemCount} item${itemCount !== 1 ? 's' : ''}`;

  return (
    <Panel isOpen={isOpen} onClose={onClose} title={title} size="medium" position="right">
      <div className={cx('ld-wcp-queuepanel-cardList', className)} {...rest}>
        {items.map((item) => (
          <QueueItemCard key={item.id} item={item} />
        ))}
      </div>
    </Panel>
  );
};
QueuePanel.displayName = 'QueuePanel';
