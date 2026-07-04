import * as React from 'react';
import {SkylineBanner} from '@/app/components/SkylineBanner/SkylineBanner';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const PRODUCT_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="160" height="120" rx="8" fill="#e6f1fd"/><rect x="52" y="30" width="56" height="56" rx="8" fill="#0053e2"/></svg>`,
  );

export default function SkylineBannerPage() {
  return (
    <PageWrapper
      title="Skyline Banner"
      category="Marketing"
      description="A sponsored, full-width promotional banner: a brand logo and headline on the left, a 'Sponsored' label with an ad-info affordance and a product image on the right."
    >
      <ExampleSection title="Default" description="A sponsored banner with a headline, subtext, and product image.">
        <SkylineBanner
          headline="Save on everyday essentials"
          subtext="Free shipping on orders over $35"
          imageSrc={PRODUCT_IMAGE}
          imageAlt="Featured product"
        />
      </ExampleSection>

      <GuidelinesSection
        description="Use Skyline Banner for paid, sponsored placements at the top of a browse or search surface. Keep the headline short and benefit-led, always provide meaningful imageAlt for the product image, and preserve the 'Sponsored' label and ad-info affordance for disclosure compliance. Supply logoSrc to co-brand the placement."
        defaultValue="headline  subtext  imageSrc  imageAlt"
      />
    </PageWrapper>
  );
}
