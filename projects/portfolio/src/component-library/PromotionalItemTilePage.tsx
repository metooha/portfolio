import * as React from 'react';
import {PromotionalItemTile} from '@/app/components/patterns/PromotionalItemTile';
import {ExampleSection, GuidelinesSection, PageWrapper, DocsGrid} from './shared';

const PRODUCT_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" fill="#fff4e6"/><circle cx="80" cy="80" r="44" fill="#ff6600"/></svg>`,
  );

export default function PromotionalItemTilePage() {
  const [qty, setQty] = React.useState(0);

  return (
    <PageWrapper
      title="Promotional Item Tile"
      category="Patterns"
      description="A compact promotional product tile — image, price, and a tertiary add button that swaps to a quantity stepper. The product name is required and becomes the image alt text for accessibility."
    >
      <ExampleSection title="Default" description="A promotional tile with an interactive add control.">
        <div style={{maxWidth: 160}}>
          <PromotionalItemTile
            image={PRODUCT_IMAGE}
            name="Great Value Trail Mix, 26 oz"
            price="6"
            cents="98"
            cartQty={qty}
            onCartQtyChange={setQty}
          />
        </div>
      </ExampleSection>

      <ExampleSection title="In a promo strip" description="Tiles as they'd appear in a sponsored promotional row.">
        <DocsGrid minColumnWidth={150}>
          <PromotionalItemTile image={PRODUCT_IMAGE} name="Sparkling Water, 12 pk" price="4" cents="88" onAddToCart={() => {}} />
          <PromotionalItemTile image={PRODUCT_IMAGE} name="Protein Bars, 15 ct" price="11" cents="24" onAddToCart={() => {}} />
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Promotional Item Tile inside sponsored or promotional strips where the surrounding context supplies the offer framing. Always pass a meaningful name — it doubles as the image alt text (the component asserts it in development). Provide cartQty / onCartQtyChange for the stepper or onAddToCart for a single add button."
        defaultValue="variant='tertiary'  size='small'"
      />
    </PageWrapper>
  );
}
