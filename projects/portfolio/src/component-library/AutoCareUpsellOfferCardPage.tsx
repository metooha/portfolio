import * as React from 'react';
import {AutoCareUpsellOfferCard} from '@/app/components/patterns/AutoCareUpsellOfferCard';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function AutoCareUpsellOfferCardPage() {
  return (
    <PageWrapper
      title="Auto Care Upsell Offer Card"
      category="Patterns"
      description="A time-limited service offer for the Auto Care Center: an offer header with a discount badge, member vs. regular pricing with savings, an expiry countdown, optional value bullets, a collapsible terms section, and accept / decline actions."
    >
      <ExampleSection title="Default" description="A discounted service offer with value bullets and terms.">
        <div style={{maxWidth: 520}}>
          <AutoCareUpsellOfferCard
            vehicle="2019 Honda Civic"
            vehicleSub="62,400 miles"
            serviceName="synthetic oil change"
            discountPct={25}
            regularPrice="$59.88"
            memberPrice="$44.91"
            savings="$14.97"
            expiresInDays={3}
            valueBullets={[
              'Up to 5 quarts of synthetic oil',
              'New oil filter included',
              'Complimentary multi-point inspection',
            ]}
            terms="Offer valid at participating Auto Care Centers for the listed vehicle only. Cannot be combined with other offers. Taxes and fees extra."
          />
        </div>
      </ExampleSection>

      <ExampleSection title="Minimal" description="Just the offer, pricing, and expiry — no bullets or terms.">
        <div style={{maxWidth: 520}}>
          <AutoCareUpsellOfferCard
            vehicle="2022 Toyota RAV4"
            vehicleSub="18,900 miles"
            serviceName="tire rotation"
            discountPct={20}
            regularPrice="$24.00"
            memberPrice="$19.20"
            savings="$4.80"
            expiresInDays={1}
          />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Auto Care Upsell Offer Card to present a personalized, time-limited service discount. Keep discountPct, pricing, and savings internally consistent, and make expiresInDays a real deadline to create honest urgency. Use value bullets to justify the service and tuck legal copy into the collapsible terms so the card stays scannable."
        defaultValue="discountPct  regularPrice  memberPrice  savings  expiresInDays"
      />
    </PageWrapper>
  );
}
