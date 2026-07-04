import * as React from 'react';
import {DelayedDeliveryCard} from '@/app/components/patterns/DelayedDeliveryCard';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const THUMB = (hue: number) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" rx="6" fill="hsl(${hue} 70% 90%)"/><circle cx="24" cy="24" r="14" fill="hsl(${hue} 70% 55%)"/></svg>`,
  );

export default function DelayedDeliveryCardPage() {
  return (
    <PageWrapper
      title="Delayed Delivery Card"
      category="Patterns"
      description="An order status card for a delayed delivery: a warning banner, a status heading, a delay-estimate alert, a progress tracker stuck in the warning state, product thumbnails, and recovery actions (reschedule, pickup, details, cancel)."
    >
      <ExampleSection title="Default" description="A delayed order with a revised estimate and recovery actions.">
        <div style={{maxWidth: 640}}>
          <DelayedDeliveryCard
            statusHeading="Your delivery is running late"
            delayEstimate="Now arriving by 6:30 PM"
            orderTotal="$84.23"
            products={[
              {src: THUMB(210), alt: 'Gallon of milk'},
              {src: THUMB(20), alt: 'Bananas'},
              {src: THUMB(140), alt: 'Salad greens'},
            ]}
            onReschedule={() => {}}
            onPickupInstead={() => {}}
            onViewDetails={() => {}}
            onCancelOrder={() => {}}
          />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Delayed Delivery Card to proactively surface a late order and give shoppers clear recovery paths. Keep the statusHeading empathetic and the delayEstimate specific (a concrete revised time). Wire the action callbacks to real flows — reschedule and pickup are the primary recovery options; details and cancel are secondary. The progress tracker intentionally holds at the 'Preparing' step in a warning state."
        defaultValue="products: { src, alt }[]"
      />
    </PageWrapper>
  );
}
