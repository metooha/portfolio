import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {SideNavigation, SideNavigationItem} from '../components/SideNavigation/SideNavigation';
import {Tree, type TreeItemData} from '../components/SideNavigation/Tree';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type SideNavPattern = 'flat' | 'icons' | 'tree';

const PATTERNS: Array<{value: SideNavPattern; label: string; description: string}> = [
  {value: 'flat', label: 'Flat', description: 'Primary links with a current page state.'},
  {value: 'icons', label: 'Icons', description: 'Leading content for scannable navigation.'},
  {value: 'tree', label: 'Tree', description: 'Nested navigation with expandable groups.'},
];

const TREE_DATA: TreeItemData[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    children: [
      {id: 'installation', label: 'Installation'},
      {id: 'quickstart', label: 'Quick Start'},
    ],
  },
  {
    id: 'components',
    label: 'Components',
    children: [
      {id: 'button', label: 'Button'},
      {id: 'modal', label: 'Modal'},
      {id: 'tabs', label: 'Tabs'},
    ],
  },
  {id: 'accessibility', label: 'Accessibility'},
];

const navFrame: React.CSSProperties = {
  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  borderRadius: 8,
  overflow: 'hidden',
  width: 280,
  background: 'var(--ld-semantic-color-surface, #ffffff)',
};

function IconMark({label}: {label: string}) {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 16,
        height: 16,
        borderRadius: 8,
        background: 'var(--ld-semantic-color-action-fill-primary, #0053e2)',
        color: 'var(--ld-semantic-color-action-text-on-primary, #ffffff)',
        fontSize: 9,
        fontWeight: 700,
      }}
    >
      {label}
    </span>
  );
}

function LinkList({withIcons = false, navigationLabel}: {withIcons?: boolean; navigationLabel?: string}) {
  const [currentItem, setCurrentItem] = React.useState('home');

  return (
    <div style={navFrame}>
      <SideNavigation aria-label={navigationLabel ?? (withIcons ? 'Icon navigation' : 'Main navigation')}>
        {[
          {id: 'home', label: 'Home', icon: 'H'},
          {id: 'inbox', label: 'Inbox', icon: 'I'},
          {id: 'settings', label: 'Settings', icon: 'S'},
        ].map((item) => (
          <SideNavigationItem
            key={item.id}
            href="#"
            isCurrent={currentItem === item.id}
            leading={withIcons ? <IconMark label={item.icon} /> : undefined}
            onClick={(event) => {
              event.preventDefault();
              setCurrentItem(item.id);
            }}
          >
            {item.label}
          </SideNavigationItem>
        ))}
      </SideNavigation>
    </div>
  );
}

function TreeNavigation() {
  const [selectedTree, setSelectedTree] = React.useState('installation');

  return (
    <div style={{...navFrame, padding: 8}}>
      <Tree
        label="Documentation"
        data={TREE_DATA}
        defaultExpandedIds={['getting-started', 'components']}
        selectedId={selectedTree}
        onSelect={setSelectedTree}
      />
    </div>
  );
}

function SideNavPreview({pattern, showIcons}: {pattern: SideNavPattern; showIcons: boolean}) {
  if (pattern === 'tree') return <TreeNavigation />;
  return <LinkList withIcons={pattern === 'icons' || showIcons} />;
}

export default function SideNavigationPage() {
  const [pattern, setPattern] = React.useState<SideNavPattern>('flat');
  const [showIcons, setShowIcons] = React.useState(false);
  const activePattern = PATTERNS.find((item) => item.value === pattern) ?? PATTERNS[0];

  return (
    <PageWrapper
      title="Side Navigation"
      category="Core Components"
      description="Side Navigation provides primary links or nested tree navigation for related destinations."
    >
      <ExampleSection
        title="Component Configuration"
        description="Compare flat links, leading content, and nested tree navigation."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Navigation pattern
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the side navigation structure for the destination set.
                </Body>
              </div>
              <ButtonGroup aria-label="Side navigation pattern">
                {PATTERNS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={pattern === item.value ? 'primary' : 'secondary'}
                    aria-pressed={pattern === item.value}
                    onClick={() => setPattern(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <Checkbox
                label="Show leading icons"
                checked={showIcons}
                disabled={pattern === 'tree'}
                onChange={(event) => setShowIcons(event.target.checked)}
              />
            </>
          }
          preview={
            <DocsCard title={activePattern.label} description={activePattern.description}>
              <SideNavPreview pattern={pattern} showIcons={showIcons} />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Patterns" description="Use cards to compare current page state and nested navigation behavior.">
        <DocsGrid>
          <DocsCard title="Flat links" description="Use isCurrent to mark the active destination.">
            <LinkList navigationLabel="Flat links navigation" />
          </DocsCard>
          <DocsCard title="Leading content" description="Use leading for recognizable icons or small marks.">
            <LinkList withIcons navigationLabel="Icon links navigation" />
          </DocsCard>
          <DocsCard title="Tree" description="Use Tree when the navigation hierarchy is meaningful.">
            <TreeNavigation />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Side Navigation for stable, left-side destination lists. Keep labels short, mark exactly one current page when the current view is represented, and use leading content only when it improves recognition. Use Tree for meaningful hierarchy, not as a way to hide unrelated links."
        defaultValue="isCurrent={false}"
      />
    </PageWrapper>
  );
}