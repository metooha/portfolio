import * as React from 'react';
import {cx} from '@/living-design/common/cx';
import {applyCommonProps} from '@/living-design/common/helpers';
import {TimerView, TimerBadgeColor, useWCPTimer} from '@/living-design/components/TimerView';
import {Button} from '@/living-design/components/Button';
import {LinkButton} from '@/living-design/components/LinkButton';
import './QueueItemCard.css';

export interface QueueItem {
  id: string;
  productImage?: string;
  productImageAlt?: string;
  description: string;
  price: string;
  originalPrice?: string;
  endTime: Date | number | string;
  onView?: () => void;
  onLeave?: () => void;
}

export interface QueueItemCardProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'> {
  item: QueueItem;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export const QueueItemCard: React.FunctionComponent<QueueItemCardProps> = (props) => {
  const {item, className, ...rest} = applyCommonProps(props);
  const timer = useWCPTimer(item.endTime);

  let badgeColor: TimerBadgeColor = 'blue';
  if (timer.urgency === 'critical') badgeColor = 'negative';
  else if (timer.urgency === 'warning') badgeColor = 'spark';

  return (
    <div className={cx('ld-wcp-queueitemcard-card', className)} {...rest}>
      <div className="ld-wcp-queueitemcard-cardContent">
        <div className="ld-wcp-queueitemcard-timerRow">
          <TimerView endTime={item.endTime} variant="badge" badgeColor={badgeColor} size="small" />
          <span className="ld-wcp-queueitemcard-timerLabel">estimated wait</span>
        </div>
        <div className="ld-wcp-queueitemcard-productRow">
          {item.productImage ? (
            <img src={item.productImage} alt={item.productImageAlt || item.description} className="ld-wcp-queueitemcard-productImg" />
          ) : (
            <div className="ld-wcp-queueitemcard-productImgPlaceholder" />
          )}
          <span className="ld-wcp-queueitemcard-productDescription">{item.description}</span>
          <div className="ld-wcp-queueitemcard-pricing">
            <span className="ld-wcp-queueitemcard-currentPrice">{item.price}</span>
            {item.originalPrice && <span className="ld-wcp-queueitemcard-originalPrice">{item.originalPrice}</span>}
          </div>
        </div>
        <div className="ld-wcp-queueitemcard-actionsRow">
          {item.onLeave && <LinkButton onClick={item.onLeave}>Leave line</LinkButton>}
          {item.onView && <Button variant="secondary" size="small" onClick={item.onView}>View</Button>}
        </div>
      </div>
    </div>
  );
};
QueueItemCard.displayName = 'QueueItemCard';
