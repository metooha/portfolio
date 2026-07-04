import * as React from 'react';
import {ContentCard} from '@/living-design/components/ContentCard/ContentCard';
import {Body, Caption} from '@/living-design/components/Text/Text';
import {PRODUCT_IMAGES} from '@/living-design/common/productImages';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

function VariantRow({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
      <Caption as="span" weight="alt" style={{textTransform: 'uppercase', letterSpacing: '0.06em'}}>
        {label}
      </Caption>
      {children}
    </div>
  );
}

export default function ContentCardPage() {
  const [clicks, setClicks] = React.useState(0);
  const incrementClicks = () => setClicks((value) => value + 1);

  return (
    <PageWrapper
      title="Content Card"
      category="Shared Components"
      description="A marketing/promotional content card used in homepage grids and content sections. Supports vertical, horizontal, and background layout variants with optional eyebrow, headline, subtext, and CTA. When `ctaHref` is provided the CTA renders as a real `<Link>` hyperlink."
    >
      <ExampleSection
        title="Variants"
        description="Three layout modes for different content contexts."
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          <VariantRow label="Vertical (default)">
            <div style={{maxWidth: 'min(320px, 100%)'}}>
              <ContentCard
                imageSrc={PRODUCT_IMAGES.headphones}
                imageAlt="Wireless headphones"
                eyebrow="Sony, Bose, JBL & more"
                headline="Top headphones"
                subtext="Noise-cancelling picks for spring"
                ctaLabel="Shop now"
                ctaHref="#headphones"
              />
            </div>
          </VariantRow>

          <VariantRow label="Horizontal">
            <div style={{maxWidth: 'min(480px, 100%)'}}>
              <ContentCard
                variant="horizontal"
                imageSrc={PRODUCT_IMAGES.boucleArmchair}
                imageAlt="Bouclé accent armchair"
                headline="Patio & living refresh"
                subtext="Up to 30% off select armchairs & sofas"
                ctaLabel="Shop furniture"
                ctaHref="#furniture"
              />
            </div>
          </VariantRow>

          <VariantRow label="Background">
            <div style={{maxWidth: 'min(400px, 100%)'}}>
              <ContentCard
                variant="background"
                imageSrc={PRODUCT_IMAGES.leatherHandbag}
                imageAlt="Leather handbag"
                eyebrow="New arrivals"
                headline="Spring fashion refresh"
                subtext="Bags, totes & more starting at $12"
                ctaLabel="Shop now"
                ctaHref="#fashion"
              />
            </div>
          </VariantRow>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Grid Layout"
        description="Content cards arranged in a responsive grid, as seen on the Walmart homepage."
      >
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px'}}>
          <ContentCard
            imageSrc={PRODUCT_IMAGES.tablet}
            imageAlt="Tablet"
            headline="Top electronics deals"
            subtext="Save on TVs, laptops & more"
            ctaLabel="Shop electronics"
            ctaHref="#electronics"
          />
          <ContentCard
            imageSrc={PRODUCT_IMAGES.eggs6Count}
            imageAlt="Eggs and grocery essentials"
            eyebrow="Weekly savings"
            headline="Grocery essentials"
            subtext="Stock up on everyday items"
            ctaLabel="Shop grocery"
            ctaHref="#grocery"
          />
          <ContentCard
            imageSrc={PRODUCT_IMAGES.comforterSet}
            imageAlt="Comforter set"
            headline="Refresh your space"
            subtext="Spring home decor from $5"
            ctaLabel="Shop home"
            ctaHref="#home"
          />
          <ContentCard
            imageSrc={PRODUCT_IMAGES.cookwareSet}
            imageAlt="Cookware set"
            headline="Cookware upgrades"
            subtext="Non-stick sets & more"
            ctaLabel="Shop cookware"
            ctaHref="#cookware"
          />
        </div>
      </ExampleSection>

      <ExampleSection
        title="Clickable"
        description="When `onClick` is provided the card renders as a button with hover effects. Mutually exclusive with the CTA link to avoid nested interactives."
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start'}}>
          <div style={{maxWidth: 'min(320px, 100%)'}}>
            <ContentCard
              imageSrc={PRODUCT_IMAGES.airFryer}
              imageAlt="Air fryer"
              headline="Flash Deals"
              subtext="Limited-time savings on top brands"
              ctaLabel="Shop deals"
              onClick={incrementClicks}
            />
          </div>
          <Body as="p" size="small" color="subtle" style={{margin: 0}}>
            Clicked {clicks} time{clicks === 1 ? '' : 's'}.
          </Body>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Content Card for promotional and editorial tiles on commerce surfaces. Pair imagery with a short eyebrow, scannable headline, and one clear CTA. Choose vertical for dense grids, horizontal for list-style placements, and background when the imagery should dominate. Pass `ctaHref` to render a real `<Link>` hyperlink, or `onClick` to make the entire card a button — not both."
        defaultValue="variant='vertical'"
      />
    </PageWrapper>
  );
}
