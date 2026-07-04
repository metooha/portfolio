import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {BottomNav} from '@/app/components/BottomNav/BottomNav';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function BottomNavPage() {
  const [tab, setTab] = React.useState<'shop' | 'heart' | 'user'>('shop');
  return (
    <PageWrapper
      title="Bottom Nav"
      category="Navigation"
      description="A mobile bottom tab bar for switching between top-level destinations. An animated indicator tracks the active tab."
    >
      <ExampleSection title="Default" description="Tap a tab to change the active destination. Rendered contained for documentation.">
        <div style={{maxWidth: 390, margin: '0 auto', position: 'relative'}}>
          <BottomNav activeTab={tab} onTabChange={setTab} contained />
          <Body as="p" size="small" color="subtle" style={{margin: '12px 0 0', textAlign: 'center'}}>
            Active tab: <code>{tab}</code>
          </Body>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Bottom Nav for the primary destinations of a mobile app — keep it to three to five tabs, each with a clear icon and a single active state. It's a mobile pattern; on wider layouts prefer a header or side navigation. In production it fixes to the bottom of the viewport; use contained only for embedding in documentation."
        defaultValue="activeTab='shop'  contained={false}"
      />
    </PageWrapper>
  );
}
