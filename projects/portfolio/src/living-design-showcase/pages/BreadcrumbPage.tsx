import * as React from 'react';

import {Breadcrumb, BreadcrumbItem} from '@/living-design/components/Breadcrumb/Breadcrumb';
import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type BreadcrumbPattern = 'product' | 'settings' | 'documents';

interface BreadcrumbCrumb {
  label: string;
  href: string;
}

const BREADCRUMB_PATTERNS: Record<
  BreadcrumbPattern,
  {label: string; description: string; a11yLabel: string; crumbs: BreadcrumbCrumb[]}
> = {
  product: {
    label: 'Product path',
    description: 'Use for commerce category depth before a product detail page.',
    a11yLabel: 'Product category breadcrumb',
    crumbs: [
      {label: 'Home', href: '#home'},
      {label: 'Electronics', href: '#electronics'},
      {label: 'Computers', href: '#computers'},
      {label: 'Laptops', href: '#laptops'},
      {label: 'MacBook Pro 16"', href: '#macbook-pro'},
    ],
  },
  settings: {
    label: 'Settings path',
    description: 'Use for short account, admin, or product settings hierarchies.',
    a11yLabel: 'Settings breadcrumb',
    crumbs: [
      {label: 'Account', href: '#account'},
      {label: 'Settings', href: '#settings'},
      {label: 'Privacy', href: '#privacy'},
    ],
  },
  documents: {
    label: 'Document path',
    description: 'Use for file, report, or content hierarchies with clear parent levels.',
    a11yLabel: 'Document breadcrumb',
    crumbs: [
      {label: 'Documents', href: '#documents'},
      {label: '2024', href: '#2024'},
      {label: 'Q1 Reports', href: '#q1-reports'},
      {label: 'Sales Summary', href: '#sales-summary'},
    ],
  },
};

const displaySurfaceStyle: React.CSSProperties = {
  minWidth: 0,
  padding: 16,
  borderRadius: 8,
  background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
};

function ConfiguredBreadcrumb({
  crumbs,
  a11yLabel,
  includeRoot = true,
  markCurrent = true,
  openParentsInNewTab = false,
}: {
  crumbs: BreadcrumbCrumb[];
  a11yLabel: string;
  includeRoot?: boolean;
  markCurrent?: boolean;
  openParentsInNewTab?: boolean;
}) {
  const visibleCrumbs = includeRoot ? crumbs : crumbs.slice(1);
  const lastIndex = visibleCrumbs.length - 1;

  return (
    <Breadcrumb a11yLabel={a11yLabel}>
      {visibleCrumbs.map((crumb, index) => {
        const isLast = index === lastIndex;
        return (
          <BreadcrumbItem
            key={crumb.href}
            href={crumb.href}
            isCurrent={markCurrent && isLast}
            target={!isLast && openParentsInNewTab ? '_blank' : undefined}
          >
            {crumb.label}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}

export default function BreadcrumbPage() {
  const [pattern, setPattern] = React.useState<BreadcrumbPattern>('product');
  const [includeRoot, setIncludeRoot] = React.useState(true);
  const [markCurrent, setMarkCurrent] = React.useState(true);
  const [openParentsInNewTab, setOpenParentsInNewTab] = React.useState(false);
  const selectedPattern = BREADCRUMB_PATTERNS[pattern];

  return (
    <PageWrapper
      title="Breadcrumb"
      category="Core Components"
      description="Secondary navigation that shows the current page within a hierarchy and lets users move back to parent levels."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview path length, landmark label, current location, and parent link behavior."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Path pattern
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose a hierarchy that matches where the breadcrumb appears.
                </Body>
              </div>
              <ButtonGroup aria-label="Breadcrumb path pattern">
                {(Object.keys(BREADCRUMB_PATTERNS) as BreadcrumbPattern[]).map((item) => (
                  <Button
                    key={item}
                    size="small"
                    variant={pattern === item ? 'primary' : 'secondary'}
                    aria-pressed={pattern === item}
                    onClick={() => setPattern(item)}
                  >
                    {BREADCRUMB_PATTERNS[item].label}
                  </Button>
                ))}
              </ButtonGroup>
              <Checkbox
                label="Include root crumb"
                checked={includeRoot}
                onChange={(event) => setIncludeRoot(event.target.checked)}
              />
              <Checkbox
                label="Mark final crumb as current"
                checked={markCurrent}
                onChange={(event) => setMarkCurrent(event.target.checked)}
              />
              <Checkbox
                label="Open parent links in new tab"
                checked={openParentsInNewTab}
                onChange={(event) => setOpenParentsInNewTab(event.target.checked)}
              />
            </>
          }
          preview={
            <DocsCard title={selectedPattern.label} description={selectedPattern.description}>
              <div style={displaySurfaceStyle}>
                {/* Append "interactive preview" so this nav landmark is distinct from
                    the same pattern rendered in the "Hierarchy patterns" grid below */}
                <ConfiguredBreadcrumb
                  crumbs={selectedPattern.crumbs}
                  a11yLabel={`${selectedPattern.a11yLabel} interactive preview`}
                  includeRoot={includeRoot}
                  markCurrent={markCurrent}
                  openParentsInNewTab={openParentsInNewTab}
                />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Hierarchy patterns"
        description="Use breadcrumbs when the path helps users understand where they are and how to move up."
      >
        <DocsGrid>
          {(Object.keys(BREADCRUMB_PATTERNS) as BreadcrumbPattern[]).map((item) => {
            const example = BREADCRUMB_PATTERNS[item];
            return (
              <DocsCard key={item} title={example.label} description={example.description}>
                <div style={displaySurfaceStyle}>
                  <ConfiguredBreadcrumb crumbs={example.crumbs} a11yLabel={example.a11yLabel} />
                </div>
              </DocsCard>
            );
          })}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Current location"
        description="Only the final crumb should represent the current page when the complete hierarchy is known."
      >
        <DocsGrid>
          <DocsCard title="Current final crumb" description="The current crumb is not underlined and receives aria-current='location'.">
            <div style={displaySurfaceStyle}>
              <ConfiguredBreadcrumb crumbs={BREADCRUMB_PATTERNS.settings.crumbs} a11yLabel="Settings breadcrumb example" />
            </div>
          </DocsCard>
          <DocsCard title="Parent links only" description="Omit the current state when the current page title is already adjacent or duplicated nearby.">
            <div style={displaySurfaceStyle}>
              <ConfiguredBreadcrumb
                crumbs={BREADCRUMB_PATTERNS.documents.crumbs}
                a11yLabel="Document parent links breadcrumb"
                markCurrent={false}
              />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Breadcrumb as secondary navigation for hierarchical pages, not as the primary wayfinding control. Keep labels short, preserve the order from broadest parent to current page, and provide a specific a11yLabel when more than one navigation landmark appears on the screen. Mark only the final crumb as current, and make parent crumbs real links to navigable parent destinations."
        defaultValue="a11yLabel='breadcrumb'"
      />
    </PageWrapper>
  );
}
