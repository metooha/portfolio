import * as React from 'react';

import {PlaceholderMedia} from '../common/PlaceholderMedia';

import {ExampleSection, PageWrapper} from './shared';

export default function PlaceholderMediaPage() {
  return (
    <PageWrapper
      title="Placeholder Media"
      category="System"
      description="Gray rect or circle used anywhere the AX or PX starter kits originally rendered an image, Lottie animation, or branded illustration. No assets are copied into the repo — every ported component swaps in one of these."
    >
      <ExampleSection title="Shapes">
        <div style={{display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap'}}>
          <PlaceholderMedia shape="rect" width={160} height={120} label="rect" />
          <PlaceholderMedia shape="circle" width={96} height={96} label="circle" />
        </div>
      </ExampleSection>

      <ExampleSection title="Rect sizes">
        <div style={{display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap'}}>
          <PlaceholderMedia shape="rect" width={48} height={48} />
          <PlaceholderMedia shape="rect" width={96} height={72} label="S" />
          <PlaceholderMedia shape="rect" width={160} height={120} label="M" />
          <PlaceholderMedia shape="rect" width={240} height={160} label="L" />
          <PlaceholderMedia shape="rect" width={320} height={200} label="XL" />
        </div>
      </ExampleSection>

      <ExampleSection title="Circle sizes">
        <div style={{display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'}}>
          <PlaceholderMedia shape="circle" width={24} height={24} />
          <PlaceholderMedia shape="circle" width={32} height={32} />
          <PlaceholderMedia shape="circle" width={48} height={48} />
          <PlaceholderMedia shape="circle" width={64} height={64} label="64" />
          <PlaceholderMedia shape="circle" width={96} height={96} label="96" />
          <PlaceholderMedia shape="circle" width={128} height={128} label="128" />
        </div>
      </ExampleSection>

      <ExampleSection
        title="Aspect ratios (rect)"
        description="When no explicit height is set, pass aspectRatio to let the container drive sizing."
      >
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 720}}>
          <PlaceholderMedia shape="rect" aspectRatio="1 / 1" label="1:1" />
          <PlaceholderMedia shape="rect" aspectRatio="4 / 3" label="4:3" />
          <PlaceholderMedia shape="rect" aspectRatio="16 / 9" label="16:9" />
        </div>
      </ExampleSection>
    </PageWrapper>
  );
}
