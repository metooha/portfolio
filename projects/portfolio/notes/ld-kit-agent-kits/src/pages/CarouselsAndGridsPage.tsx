import * as React from 'react';
import {FlashDealsCarousel} from '../patterns/FlashDealsCarousel/FlashDealsCarousel';
import {NewArrivalsCarousel} from '../patterns/NewArrivalsCarousel/NewArrivalsCarousel';
import {ContinueShopping} from '../patterns/ContinueShopping/ContinueShopping';
import {JumpRightBackIn} from '../patterns/JumpRightBackIn/JumpRightBackIn';
import {PageWrapper, ExampleSection} from './shared';

export default function CarouselsAndGridsPage() {
  return (
    <PageWrapper title="Carousels & Product Grids" category="WCP PATTERNS" description="Horizontally scrollable product sections used on the Walmart home page. Each carousel uses drag-to-scroll with snap points and optional auto-advance.">
      <ExampleSection title="New Arrivals Carousel" description="Full-bleed hero carousel with auto-advancing slides. Each slide has an eyebrow, headline, CTA button, and background image. Includes prev/next controls and pagination dots.">
        <NewArrivalsCarousel />
      </ExampleSection>

      <ExampleSection title="Jump Right Back In" description="Horizontal scroll row of category cards. Each card contains a header with title and &quot;Shop all&quot; link, plus a 2×2 grid of product tiles. Uses drag-to-scroll.">
        <JumpRightBackIn />
      </ExampleSection>

      <ExampleSection title="Flash Deals Carousel" description="Horizontal scroll of individual deal cards with no background fill. Each card shows a flag badge, heart icon, product image, green savings price, and an action button.">
        <FlashDealsCarousel />
      </ExampleSection>

      <ExampleSection title="Continue Shopping" description="Horizontal scroll row of standalone product tile cards on a subtle background. Header with title and &quot;View all&quot; link. Uses the same drag-to-scroll pattern.">
        <ContinueShopping />
      </ExampleSection>
    </PageWrapper>
  );
}
