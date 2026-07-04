import * as React from 'react';
import {AxBottomNav, type BottomNavTab} from '@/app/components/patterns/AxBottomNav';
import {ExampleSection, GuidelinesSection, PageWrapper, DocsGrid, DocsCard} from './shared';

export default function AxBottomNavPage() {
  const [tab, setTab] = React.useState<BottomNavTab>('for-you');

  return (
    <PageWrapper
      title="Associate Bottom Nav"
      category="Patterns"
      description="The bottom tab bar for the associate (Ax) mobile experience. iOS adds a floating Squiggly AI agent button above the bar and a home indicator; Android adds a fourth 'More' tab. Render contained inside documentation and app frames."
    >
      <ExampleSection title="iOS (default)" description="Three tabs, the floating agent button, and the home indicator.">
        <div style={{maxWidth: 390, margin: '0 auto', position: 'relative', minHeight: 120}}>
          <AxBottomNav contained activeTab={tab} onTabChange={setTab} />
        </div>
      </ExampleSection>

      <ExampleSection title="Platforms" description="Android surfaces a fourth 'More' tab and drops the floating agent button.">
        <DocsGrid minColumnWidth={320}>
          <DocsCard title="iOS">
            <div style={{position: 'relative', minHeight: 120}}>
              <AxBottomNav contained platform="ios" />
            </div>
          </DocsCard>
          <DocsCard title="Android">
            <div style={{position: 'relative', minHeight: 100}}>
              <AxBottomNav contained platform="android" />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Associate Bottom Nav as the primary navigation for the Ax mobile app. Keep it contained inside documentation and device frames; in the real app it's fixed to the viewport bottom. The active tab is controlled via activeTab / onTabChange. Match platform to the target OS so the correct chrome (agent button, More tab, home indicator) renders."
        defaultValue="activeTab='for-you'  platform='ios'  showAgentButton={true}"
      />
    </PageWrapper>
  );
}
