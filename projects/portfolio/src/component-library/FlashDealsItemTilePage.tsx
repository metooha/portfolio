import * as React from 'react';
import {FlashDealsItemTile} from '@/app/components/patterns/FlashDealsItemTile';
import {ExampleSection, GuidelinesSection, PageWrapper, DocsGrid} from './shared';

const PRODUCT_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><rect width="180" height="180" fill="#f5f5f6"/><circle cx="90" cy="90" r="52" fill="#0053e2"/></svg>`,
  );

export default function FlashDealsItemTilePage() {
  const [qty, setQty] = React.useState(0);
  const [hearted, setHearted] = React.useState(false);

  return (
    <PageWrapper
      title="Flash Deals Item Tile"
      category="Patterns"
      description="A deal-focused product tile: promo badge, favorite heart, image, a savings price with original-price strike, optional options text, name, and an add or options action."
    >
      <ExampleSection title="Add action" description="A savings tile whose footer is an add-to-cart control.">
        <div style={{maxWidth: 200}}>
          <FlashDealsItemTile
            image={PRODUCT_IMAGE}
            name="Apple AirPods (2nd Generation)"
            price="79"
            cents="00"
            pricePrefix="Now"
            originalPrice="$129.00"
            badge={{label: 'Flash deal', type: 'deal'}}
            actionType="add"
            idx={0}
            hearted={hearted}
            onHeartChange={setHearted}
            cartQty={qty}
            onCartQtyChange={setQty}
          />
        </div>
      </ExampleSection>

      <ExampleSection title="Options action" description="Tiles with multiple variants show an 'Options' button instead of add.">
        <DocsGrid minColumnWidth={190}>
          <FlashDealsItemTile
            image={PRODUCT_IMAGE}
            name="Men's Running Shoes"
            price="24"
            cents="98"
            badge={{label: 'Rollback', type: 'rollback'}}
            optionsText="6 colors available"
            actionType="options"
            idx={1}
          />
          <FlashDealsItemTile
            image={PRODUCT_IMAGE}
            name="Bluetooth Speaker"
            price="18"
            cents="88"
            badge={{label: 'Best seller', type: 'bestseller'}}
            actionType="add"
            idx={2}
            onAddToCart={() => {}}
          />
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Flash Deals Item Tile in time-limited deal carousels and flash-sale strips. Pass pricePrefix (e.g. 'Now') with originalPrice to show the markdown, and choose the badge type to color the promo flag. Set actionType='options' for products with variants, otherwise 'add' with cartQty / onCartQtyChange or onAddToCart."
        defaultValue="actionType  idx  badge.type"
      />
    </PageWrapper>
  );
}
