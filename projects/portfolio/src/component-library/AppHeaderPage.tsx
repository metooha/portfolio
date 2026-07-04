import * as React from 'react';
import {AppHeader} from '@/app/components/patterns/AppHeader';
import {ExampleSection, GuidelinesSection, PageWrapper, DocsGrid, DocsCard} from './shared';

export default function AppHeaderPage() {
  return (
    <PageWrapper
      title="App Header"
      category="Patterns"
      description="The native mobile app header: a simulated status bar, a leading menu / back button, a centered title with optional subtitle, trailing action icons, an account avatar with a menu, and an optional search row."
    >
      <ExampleSection title="Blue (default)" description="The brand-blue header with a title, one action, and the account avatar.">
        <div style={{maxWidth: 390, margin: '0 auto'}}>
          <AppHeader title="For you" showAction1 />
        </div>
      </ExampleSection>

      <ExampleSection title="Variants" description="A white variant, a subtitle, and the search row enabled.">
        <DocsGrid minColumnWidth={340}>
          <DocsCard title="White + subtitle">
            <div style={{maxWidth: 390}}>
              <AppHeader
                variant="white"
                title="Today's Plan"
                subtitle="Tuesday, July 8"
                showSubtitle
              />
            </div>
          </DocsCard>
          <DocsCard title="With search (Android)">
            <div style={{maxWidth: 390}}>
              <AppHeader
                platform="android"
                title="Search"
                showSearch
                showAction1={false}
              />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Back navigation" description="Swap the leading icon to a chevron for a detail / back context.">
        <div style={{maxWidth: 390, margin: '0 auto'}}>
          <AppHeader
            title="Order details"
            menuIconName="ChevronLeft"
            showAvatar={false}
            showAction1={false}
          />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use App Header at the top of mobile associate and shopping surfaces. Pick the blue variant for primary surfaces and white for content-forward pages. Use menuIconName='ChevronLeft' for back navigation, toggle action icons for context, and enable the search row only where in-page search is a primary task. Set platform to match the target OS chrome."
        defaultValue="variant='blue'  platform='ios'  showAvatar={true}"
      />
    </PageWrapper>
  );
}
