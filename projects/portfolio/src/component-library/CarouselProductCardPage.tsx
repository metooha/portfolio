import * as React from 'react';
import {CarouselProductCard} from '@/app/components/patterns/CarouselProductCard';
import {ExampleSection, GuidelinesSection, PageWrapper, DocsGrid} from './shared';

const PRODUCT_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" fill="#f5f5f6"/><circle cx="80" cy="80" r="44" fill="#0053e2"/></svg>`,
  );

export default function CarouselProductCardPage() {
  const [qty, setQty] = React.useState(0);

  return (
    <PageWrapper
      title="Carousel Product Card"
      category="Patterns"
      description="A minimal, compact product tile for horizontal carousels — just an image, a price, and a tertiary add button that swaps to a quantity stepper. Optimized for dense 'you might also like' rows."
    >
      <ExampleSection title="Default" description="A single carousel tile with an interactive add control.">
        <div style={{maxWidth: 160}}>
          <CarouselProductCard
            image={PRODUCT_IMAGE}
            price="12"
            cents="98"
            cartQty={qty}
            onCartQtyChange={setQty}
          />
        </div>
      </ExampleSection>

      <ExampleSection title="In a row" description="Several tiles as they'd appear inside a scrolling carousel.">
        <DocsGrid minColumnWidth={150}>
          <CarouselProductCard image={PRODUCT_IMAGE} price="8" cents="47" onAddToCart={() => {}} />
          <CarouselProductCard image={PRODUCT_IMAGE} price="14" cents="00" onAddToCart={() => {}} />
          <CarouselProductCard image={PRODUCT_IMAGE} price="5" cents="96" onAddToCart={() => {}} />
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Carousel Product Card for compact, image-led recommendation carousels where space is tight and shoppers scan quickly. Keep it to image + price + add — for richer metadata (name, rating, flags) use Product Card (Grid) instead. Provide cartQty / onCartQtyChange for the stepper or onAddToCart for a single add."
        defaultValue="variant='tertiary'  size='small'"
      />
    </PageWrapper>
  );
}
