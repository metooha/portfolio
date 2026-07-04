import * as React from 'react';
import { useState } from "react";
import { Link } from '@/app/components/Link';
import { CloseIcon } from '@/app/components/Icons';
import './OrderStatusCard.css';

interface OrderStatusCardProps {
  image: string;
  statusLine: string;
  deliveryLine: string;
  trackHref?: string;
}

export function OrderStatusCard({
  image,
  statusLine,
  deliveryLine,
  trackHref = "#",
}: OrderStatusCardProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="ld-wcp-order-status-card-root">
      <img
        src={image}
        alt="Order status"
        className="ld-wcp-order-status-card-image"
      />

      <div className="ld-wcp-order-status-card-body">
        <span className="ld-wcp-order-status-card-status">
          {statusLine}
        </span>
        <span className="ld-wcp-order-status-card-delivery">
          {deliveryLine}
        </span>
        <Link href={trackHref}>Track</Link>
      </div>

      <button
        aria-label="Dismiss order status"
        onClick={() => setDismissed(true)}
        className="ld-wcp-order-status-card-dismiss"
      >
        <CloseIcon size="small" />
      </button>
    </div>
  );
}
OrderStatusCard.displayName = 'OrderStatusCard';
