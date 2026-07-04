import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button';
import {Checkbox} from '@/app/components/Checkbox';
import {Body} from '@/app/components/Text/Text';
import {LocationBreadcrumb} from '@/app/components/LocationBreadcrumb';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const SHORT_CRUMBS = [
  {label: 'All', href: '#all'},
  {label: 'Grocery', href: '#grocery'},
  {label: 'Aisle 12'},
];

const LONG_CRUMBS = [
  {label: 'All', href: '#all'},
  {label: 'Home', href: '#home'},
  {label: 'Storage', href: '#storage'},
  {label: 'Garage shelving'},
];

export default function LocationBreadcrumbPage() {
  const [pathLength, setPathLength] = React.useState<'short' | 'long'>('short');
  const [showCount, setShowCount] = React.useState(true);
  const [countLoading, setCountLoading] = React.useState(false);
  const crumbs = pathLength === 'short' ? SHORT_CRUMBS : LONG_CRUMBS;

  return (
    <PageWrapper
      title="Location Breadcrumb"
      category="Subsystem Components"
      description="A location path composed from core Breadcrumb with optional trailing count metadata for aisle, category, and section headers."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview path length, count visibility, and the loading count skeleton."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Path length</Body>
                <ButtonGroup>
                  <Button size="small" variant={pathLength === 'short' ? 'primary' : 'secondary'} onClick={() => setPathLength('short')}>Short</Button>
                  <Button size="small" variant={pathLength === 'long' ? 'primary' : 'secondary'} onClick={() => setPathLength('long')}>Long</Button>
                </ButtonGroup>
              </div>
              <Checkbox label="Show count" checked={showCount} onChange={(event) => setShowCount(event.target.checked)} />
              <Checkbox label="Count loading" checked={countLoading} disabled={!showCount} onChange={(event) => setCountLoading(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description="The final crumb represents the current location.">
              <LocationBreadcrumb crumbs={crumbs} count={showCount ? 48 : undefined} countLabel="items" countLoading={showCount && countLoading} />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Breadcrumb Patterns" description="Use count metadata only when it helps users understand the current list or section size.">
        <DocsGrid>
          <DocsCard title="Path and count">
            <LocationBreadcrumb aria-label="Path and count breadcrumb" crumbs={SHORT_CRUMBS} count={48} countLabel="items" />
          </DocsCard>
          <DocsCard title="Loading count" description="Use the loading state while list totals are resolving.">
            <LocationBreadcrumb aria-label="Loading count breadcrumb" crumbs={LONG_CRUMBS} count={0} countLabel="items" countLoading />
          </DocsCard>
          <DocsCard title="Path only" description="Hide count when totals are irrelevant or unavailable.">
            <LocationBreadcrumb aria-label="Path only breadcrumb" crumbs={SHORT_CRUMBS} />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Location Breadcrumb at the top of lists, departments, or location-scoped panels. Keep labels short, make intermediate crumbs navigable when possible, and reserve countLoading for brief data-fetching states."
        defaultValue="countLabel='count', aria-label='Location breadcrumb'"
      />
    </PageWrapper>
  );
}