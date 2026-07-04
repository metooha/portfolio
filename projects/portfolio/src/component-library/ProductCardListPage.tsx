import * as React from 'react';
import {ProductCardList} from '@/app/components/patterns/ProductCardList';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const PRODUCT_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" fill="#f5f5f6"/><circle cx="80" cy="80" r="44" fill="#0053e2"/></svg>`,
  );

export default function ProductCardListPage() {
  const [qty, setQty] = React.useState(0);

  return (
    <PageWrapper
      title="Product Card (List)"
      category="Patterns"
      description="The horizontal product row for list layouts: a left image with a promo flag beside a rich content column — price, unit price, name, cue, rating, EBT, pickup, stock, and an add-to-cart action."
    >
      <ExampleSection title="Default" description="A list row with savings, unit price, rating, EBT, pickup, and stock warning.">
        <div style={{maxWidth: 520}}>
          <ProductCardList
            image={PRODUCT_IMAGE}
            name="Great Value Large White Eggs, 12 Count"
            price="2"
            cents="12"
            wasPrice="$2.68"
            flag="Rollback"
            flagVariant="savings-bold"
            unitPrice="17.7¢/ea"
            rating={4.6}
            ratingCount="3.4k"
            ebt
            pickup="Today"
            stock="Only 5 left"
            cue="Popular in your area"
            cartQty={qty}
            onCartQtyChange={setQty}
          />
        </div>
      </ExampleSection>

      <ExampleSection title="Minimal" description="Only the required fields, with a single add-to-cart button.">
        <div style={{maxWidth: 520}}>
          <ProductCardList
            image={PRODUCT_IMAGE}
            name="Freshness Guaranteed Bananas, per lb"
            price="0"
            cents="58"
            rating={4.9}
            ratingCount="12k"
            onAddToCart={() => {}}
          />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Product Card (List) in single-column list views where the extra metadata (unit price, EBT, stock, cue) helps shoppers decide. Reserve wasPrice for genuine markdowns and match the flagVariant to the promotion type. Enable the quantity stepper with cartQty / onCartQtyChange, or fall back to onAddToCart."
        defaultValue="flagVariant='brand-subtle'"
      />
    </PageWrapper>
  );
}
