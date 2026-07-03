import * as React from 'react';

import {TabNavigation, TabNavigationItem} from '@/living-design/components/TabNavigation/TabNavigation';
import {Body, Heading} from '@/living-design/components/Text/Text';
import {
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const TABS = [
  {id: 'tab1', label: 'Overview'},
  {id: 'tab2', label: 'Performance'},
  {id: 'tab3', label: 'Settings'},
];

export default function TabNavigationPage() {
  const [activeTab, setActiveTab] = React.useState('tab1');
  const activeLabel = TABS.find((tab) => tab.id === activeTab)?.label ?? 'Overview';

  return (
    <PageWrapper
      title="Tab Navigation"
      category="Core Components"
      description="Page-level navigation tabs with selected state and icon support. Supports a tablist pattern for in-page content switching and a navigation pattern for URL-based routing."
    >
      <ExampleSection
        title="Tablist pattern (default)"
        description="Use when tabs reveal in-page content panels without navigating to a new URL. Arrow keys move between tabs; Tab key moves focus out of the tab group."
      >
        <DocsCard title="Interactive tablist" description={`Active: ${activeLabel}`}>
          <TabNavigation aria-label="Primary tab navigation">
            {TABS.map((tab) => (
              <TabNavigationItem
                key={tab.id}
                isCurrent={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </TabNavigationItem>
            ))}
          </TabNavigation>
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-label={activeLabel}
            style={{
              padding: 24,
              background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
              borderRadius: '0 0 8px 8px',
            }}
          >
            <Body as="p" size="medium" color="subtle" style={{margin: 0}}>
              Content for: <strong>{activeLabel}</strong>
            </Body>
          </div>
        </DocsCard>
      </ExampleSection>

      <ExampleSection
        title="Navigation pattern"
        description='Use pattern="navigation" when each tab navigates to a distinct URL or route. Links use aria-current="page" to mark the active destination.'
      >
        <DocsGrid>
          <DocsCard title="Three tabs" description="Most page-level navigation uses 2–5 visible tabs.">
            <TabNavigation pattern="navigation" aria-label="Order management navigation">
              <TabNavigationItem href="#orders" isCurrent>Orders</TabNavigationItem>
              <TabNavigationItem href="#shipments">Shipments</TabNavigationItem>
              <TabNavigationItem href="#returns">Returns</TabNavigationItem>
            </TabNavigation>
          </DocsCard>
          <DocsCard title="Five tabs" description="Use this density only when the labels remain short and scannable.">
            <TabNavigation pattern="navigation" aria-label="Status filter navigation">
              <TabNavigationItem href="#all" isCurrent>All</TabNavigationItem>
              <TabNavigationItem href="#new">New</TabNavigationItem>
              <TabNavigationItem href="#open">Open</TabNavigationItem>
              <TabNavigationItem href="#pending">Pending</TabNavigationItem>
              <TabNavigationItem href="#archived">Archived</TabNavigationItem>
            </TabNavigation>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description='Use Tab Navigation for peer views of related content. Keep labels short, parallel, and under 20 characters. Switch to Side Navigation when the views are unrelated parent destinations.'
        defaultValue='pattern="tablist"'
      >
        <div style={{display: 'grid', gap: 16}}>
          <Heading as="h3" size="small" style={{margin: 0}}>
            Choosing a pattern
          </Heading>
          <div style={{display: 'grid', gap: 12}}>
            <div style={{display: 'grid', gap: 4}}>
              <Body as="span" size="small" weight="alt">tablist (default)</Body>
              <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                Renders <code>role="tablist"</code> with <code>role="tab"</code> buttons. Use when tabs switch visible content panels on the same page without a URL change. Arrow keys (←→) move between tabs; Tab key exits the group. Pair each tab with a <code>role="tabpanel"</code> element via <code>aria-controls</code> for full APG compliance.
              </Body>
            </div>
            <div style={{display: 'grid', gap: 4}}>
              <Body as="span" size="small" weight="alt">navigation</Body>
              <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                Renders a <code>&lt;nav&gt;</code> landmark with list items and anchor links. Use when each tab maps to a distinct URL or route. The active link receives <code>aria-current="page"</code>. Tab key moves sequentially through each link.
              </Body>
            </div>
          </div>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
