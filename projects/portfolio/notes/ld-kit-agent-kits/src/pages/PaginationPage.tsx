import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Body} from '../components/Text/Text';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../components/Pagination/Pagination';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

function PaginationExample({activePage = 2, extended = false, navigationLabel = 'Pagination'}: {activePage?: number; extended?: boolean; navigationLabel?: string}) {
  const pages = extended ? [1, 2, 3, 4, 5] : [1, 2, 3];
  return (
    <Pagination navigationLabel={navigationLabel}>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href="#" isActive={page === activePage}>{page}</PaginationLink>
          </PaginationItem>
        ))}
        {extended ? (
          <>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationLink href="#">10</PaginationLink></PaginationItem>
          </>
        ) : null}
        <PaginationItem><PaginationNext href="#" /></PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default function PaginationPage() {
  const [activePage, setActivePage] = React.useState(2);
  const [extended, setExtended] = React.useState(false);

  return (
    <PageWrapper
      title="Pagination"
      category="Shared Components"
      description="Navigation controls for paging through large result sets, tables, and filtered lists."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview compact and extended pagination with different active pages."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Active page</Body>
              </div>
              <ButtonGroup aria-label="Pagination active page">
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    size="small"
                    variant={activePage === page ? 'primary' : 'secondary'}
                    aria-pressed={activePage === page}
                    onClick={() => setActivePage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Density</Body>
              </div>
              <ButtonGroup aria-label="Pagination density">
                <Button size="small" variant={!extended ? 'primary' : 'secondary'} aria-pressed={!extended} onClick={() => setExtended(false)}>Compact</Button>
                <Button size="small" variant={extended ? 'primary' : 'secondary'} aria-pressed={extended} onClick={() => setExtended(true)}>Extended</Button>
              </ButtonGroup>
            </>
          }
          preview={
            <DocsCard title="Preview" description="The active page link uses isActive and is read as aria-current.">
              <PaginationExample activePage={activePage} extended={extended} />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Pagination Patterns" description="Use ellipses when the available page range is larger than the visible page links.">
        <DocsGrid>
          <DocsCard title="Basic pagination" description="Three visible pages plus previous and next.">
            <PaginationExample activePage={2} navigationLabel="Basic pagination" />
          </DocsCard>
          <DocsCard title="Extended pagination" description="Show the first run of pages, an ellipsis, and the last page for long ranges.">
            <PaginationExample activePage={3} extended navigationLabel="Extended pagination" />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Pagination when a large set is divided into stable pages. Keep previous and next controls available, mark the current page with isActive, and use ellipses instead of rendering every page in long ranges. Avoid Pagination for infinite-scroll feeds where users do not expect a page concept."
        defaultValue="active page link uses isActive"
      />
    </PageWrapper>
  );
}
