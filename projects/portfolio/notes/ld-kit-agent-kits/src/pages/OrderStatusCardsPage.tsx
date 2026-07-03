import * as React from 'react';
import {OrderStatusSection, type OrderStatusEntry} from '../patterns/OrderStatusSection/OrderStatusSection';
import {PRODUCT_IMAGES} from '../common/productImages';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const ON_THE_WAY: OrderStatusEntry = {
  id: 'otw',
  image: PRODUCT_IMAGES.headphones,
  statusLine: 'Your order is on the way',
  deliveryLine: 'Arrives tomorrow by 8pm',
};

const DELIVERED: OrderStatusEntry = {
  id: 'delivered',
  image: PRODUCT_IMAGES.airFryer,
  statusLine: 'Delivered',
  deliveryLine: 'Left at front door today at 2:34pm',
};

const BANNER: OrderStatusEntry = {
  id: 'banner',
  image: '',
  statusLine: '',
  deliveryLine: '',
  asBanner: true,
};

export default function OrderStatusCardsPage() {
  return (
    <PageWrapper title="Order Status" category="WCP Patterns" description="The OrderStatusSection renders a list of order notifications. Each entry picks the full card or the slim banner via `asBanner`. Drop it at the top of any account page.">
      <ExampleSection title="Single card — on the way">
        <div style={{ maxWidth: '400px' }}>
          <OrderStatusSection orders={[ON_THE_WAY]} />
        </div>
      </ExampleSection>

      <ExampleSection title="Single card — delivered">
        <div style={{ maxWidth: '400px' }}>
          <OrderStatusSection orders={[DELIVERED]} />
        </div>
      </ExampleSection>

      <ExampleSection title="Slim banner variant">
        <OrderStatusSection orders={[BANNER]} />
      </ExampleSection>

      <ExampleSection title="Stacked — multiple entries">
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <OrderStatusSection orders={[ON_THE_WAY, DELIVERED, BANNER]} />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Order Status entries for concise delivery or pickup updates at the top of account pages. Use the full card variant when imagery + status + delivery context all matter; use asBanner for slim placements where the user already sees order detail nearby. Avoid showing more than one competing status module for the same order."
        defaultValue="entries with asBanner=false render the full card"
      />
    </PageWrapper>
  );
}
