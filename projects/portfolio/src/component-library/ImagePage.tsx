import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Image} from '@/app/components/Image/Image';
import {ExampleSection, GuidelinesSection, PageWrapper, DocsGrid, DocsCard} from './shared';

// Self-contained placeholder so the demo never depends on network assets.
const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0053e2"/><stop offset="1" stop-color="#79cdf6"/>
      </linearGradient></defs>
      <rect width="320" height="200" rx="12" fill="url(#g)"/>
      <text x="160" y="108" font-family="sans-serif" font-size="20" fill="#ffffff" text-anchor="middle">Sample image</text>
    </svg>`,
  );

const imgStyle: React.CSSProperties = {width: '100%', height: 'auto', borderRadius: 8, display: 'block'};

export default function ImagePage() {
  return (
    <PageWrapper
      title="Image"
      category="Core Components"
      description="An accessibility-enforced <img> wrapper. It requires either a meaningful alt describing the image, or an explicit decorative opt-out."
    >
      <ExampleSection title="With alt text" description="Provide a concise, meaningful description of what the image conveys.">
        <div style={{maxWidth: 360}}>
          <Image src={PLACEHOLDER} alt="Abstract blue gradient sample" style={imgStyle} />
        </div>
      </ExampleSection>

      <ExampleSection title="Decorative" description="For purely decorative imagery, opt out explicitly with a reason so screen readers skip it.">
        <DocsGrid minColumnWidth={240}>
          <DocsCard title="Meaningful" description="alt describes the content.">
            <Image src={PLACEHOLDER} alt="Abstract blue gradient sample" style={imgStyle} />
          </DocsCard>
          <DocsCard title="Decorative" description="Hidden from assistive tech.">
            <Image src={PLACEHOLDER} unsafeDecorative={{reason: 'Purely decorative gradient in a docs example'}} style={imgStyle} />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Always describe what the image communicates in alt — not the file name. Placeholder strings like '', '...', 'image', or 'photo' are rejected at runtime. Only use the decorative opt-out for pure visual flourish that carries no information, and supply a short justification."
        defaultValue="alt='...'  |  unsafeDecorative={{ reason: '...' }}"
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            Exactly one of <code>alt</code> or <code>unsafeDecorative</code> must be provided. This makes the accessibility decision explicit at every call site.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
