import * as React from 'react';
import {ProductCardGrid} from '@/app/components/patterns/ProductCardGrid';
import {ExampleSection, GuidelinesSection, PageWrapper, DocsGrid} from './shared';

const PRODUCT_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><rect width="240" height="240" fill="#f5f5f6"/><circle cx="120" cy="120" r="64" fill="#0053e2"/></svg>`,
  );

export default function ProductCardGridPage() {
  const [qty, setQty] = React.useState(0);
  const [hearted, setHearted] = React.useState(false);

  return (
    <PageWrapper
      title="Product Card (Grid)"
      category="Patterns"
      description="The vertical product tile used in grid layouts: image with a promo flag and favorite heart, a price row with optional savings, name, rating, pickup, and an add-to-cart action that swaps to a quantity stepper."
    >
      <ExampleSection title="Default" description="A grid tile with a savings price, flag, rating, and pickup.">
        <div style={{maxWidth: 240}}>
          <ProductCardGrid
            image={PRODUCT_IMAGE}
            name="Great Value Whole Vitamin D Milk, Gallon"
            price="3"
            cents="47"
            wasPrice="$4.12"
            flag="Rollback"
            rating={4.5}
            ratingCount="1.2k"
            pickup="Today"
            hearted={hearted}
            onHeartChange={setHearted}
            cartQty={qty}
            onCartQtyChange={setQty}
          />
        </div>
      </ExampleSection>

      <ExampleSection title="Variants" description="Without savings the price renders in default color and the CTA is a plain button.">
        <DocsGrid minColumnWidth={220}>
          <ProductCardGrid
            image={PRODUCT_IMAGE}
            name={'Onn. 50" 4K UHD Smart TV'}
            price="228"
            cents="00"
            rating={4}
            ratingCount="864"
            pickup="Tomorrow"
            onAddToCart={() => {}}
          />
          <ProductCardGrid
            image={PRODUCT_IMAGE}
            name="Marketside Fresh Strawberries, 1 lb"
            price="2"
            cents="98"
            wasPrice="$3.98"
            flag="Flash deal"
            rating={4.8}
            ratingCount="320"
            onAddToCart={() => {}}
          />
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Product Card (Grid) in multi-column browse and search results. Pass wasPrice to surface savings styling and a flag for promotions (the flag variant is inferred from common labels). Provide cartQty / onCartQtyChange to enable the inline quantity stepper; otherwise supply onAddToCart for a single add button."
        defaultValue="flagVariant inferred from flag label"
      />
    </PageWrapper>
  );
}
