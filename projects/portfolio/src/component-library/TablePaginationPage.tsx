import * as React from 'react';

import {Body} from '@/app/components/Text/Text';
import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from '@/app/components/DataTable/DataTable';
import {TablePagination} from '@/app/components/patterns/TablePagination/TablePagination';
import {
  ComponentConfigurationCard,
  DocsCard,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

type Row = {id: number; item: string; category: string; status: string; qty: number};

const CATEGORIES = ['Grocery', 'Apparel', 'Electronics', 'Home', 'Toys'];
const STATUSES = ['In stock', 'Low', 'Backordered'];

const ALL_ROWS: Row[] = Array.from({length: 43}, (_, i) => ({
  id: i + 1,
  item: `SKU-${String(10472 + i)}`,
  category: CATEGORIES[i % CATEGORIES.length],
  status: STATUSES[i % STATUSES.length],
  qty: ((i * 37) % 480) + 12,
}));

// ---------------------------------------------------------------------------
// Live table + pagination demo
// ---------------------------------------------------------------------------

function PaginatedTable({
  hidePageSize = false,
  hidePageJump = false,
}: {
  hidePageSize?: boolean;
  hidePageJump?: boolean;
}) {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);

  const totalItems = ALL_ROWS.length;
  const pageCount = Math.max(Math.ceil(totalItems / pageSize), 1);
  const rows = ALL_ROWS.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{display: 'grid', gap: 16, minWidth: 0}}>
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeader>Item</DataTableHeader>
            <DataTableHeader>Category</DataTableHeader>
            <DataTableHeader>Status</DataTableHeader>
            <DataTableHeader alignment="right">Qty</DataTableHeader>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {rows.map((row) => (
            <DataTableRow key={row.id}>
              <DataTableCell>{row.item}</DataTableCell>
              <DataTableCell>{row.category}</DataTableCell>
              <DataTableCell>{row.status}</DataTableCell>
              <DataTableCell variant="numeric">{row.qty}</DataTableCell>
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>

      <TablePagination
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        totalItems={totalItems}
        pageSizeOptions={[5, 10, 25]}
        hidePageSize={hidePageSize}
        hidePageJump={hidePageJump}
        navigationLabel="Data table pagination"
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </div>
  );
}

// A standalone footer for variant cards — large synthetic totals so the
// numbered window and ellipsis behavior are visible without a real table.
function FooterOnly({page, pageSize = 50, totalItems = 2500, navigationLabel}: {page: number; pageSize?: number; totalItems?: number; navigationLabel?: string}) {
  const [current, setCurrent] = React.useState(page);
  const [size, setSize] = React.useState(pageSize);
  const pageCount = Math.max(Math.ceil(totalItems / size), 1);

  React.useEffect(() => setCurrent(page), [page]);

  return (
    <TablePagination
      page={current}
      pageCount={pageCount}
      pageSize={size}
      navigationLabel={navigationLabel}
      totalItems={totalItems}
      onPageChange={setCurrent}
      onPageSizeChange={(next) => {
        setSize(next);
        setCurrent(1);
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TablePaginationPage() {
  const [hidePageSize, setHidePageSize] = React.useState(false);
  const [hidePageJump, setHidePageJump] = React.useState(false);

  return (
    <PageWrapper
      title="Table Pagination"
      category="PATTERNS"
      description="The footer pattern that pages through large tables and result sets. It pairs Select (items per page) and a range readout on the left with numbered Pagination and a label-less Text Field jump-to-page control on the right."
    >
      <ExampleSection
        title="Component Configuration"
        description="A live Data Table wired to the Table Pagination footer. Change the page size, click a page, or type a page number and press Enter."
      >
        <ComponentConfigurationCard
          stack
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Items per page cluster
                </Body>
              </div>
              <ButtonGroup aria-label="Toggle items-per-page cluster">
                <Button
                  size="small"
                  variant={!hidePageSize ? 'primary' : 'secondary'}
                  aria-pressed={!hidePageSize}
                  onClick={() => setHidePageSize(false)}
                >
                  Shown
                </Button>
                <Button
                  size="small"
                  variant={hidePageSize ? 'primary' : 'secondary'}
                  aria-pressed={hidePageSize}
                  onClick={() => setHidePageSize(true)}
                >
                  Hidden
                </Button>
              </ButtonGroup>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Jump-to-page field
                </Body>
              </div>
              <ButtonGroup aria-label="Toggle jump-to-page field">
                <Button
                  size="small"
                  variant={!hidePageJump ? 'primary' : 'secondary'}
                  aria-pressed={!hidePageJump}
                  onClick={() => setHidePageJump(false)}
                >
                  Shown
                </Button>
                <Button
                  size="small"
                  variant={hidePageJump ? 'primary' : 'secondary'}
                  aria-pressed={hidePageJump}
                  onClick={() => setHidePageJump(true)}
                >
                  Hidden
                </Button>
              </ButtonGroup>
            </>
          }
          preview={
            <DocsCard
              title="Preview"
              description="Page size resets to the first page. The active page is read as aria-current; the jump field commits on Enter or blur."
            >
              <PaginatedTable hidePageSize={hidePageSize} hidePageJump={hidePageJump} />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Pagination Patterns"
        description="The numbered control windows long page ranges with a single ellipsis. The position of the ellipsis follows the active page."
      >
        <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: 24, minWidth: 0}}>
          <DocsCard title="Near the start" description="Leading run of pages, then an ellipsis and the last page.">
            <FooterOnly page={1} navigationLabel="Near start pagination" />
          </DocsCard>
          <DocsCard title="In the middle" description="The active page is centered between two ellipses.">
            <FooterOnly page={6} navigationLabel="Middle pagination" />
          </DocsCard>
          <DocsCard title="Near the end" description="An ellipsis after the first page, then the trailing run.">
            <FooterOnly page={50} navigationLabel="Near end pagination" />
          </DocsCard>
          <DocsCard title="Short range" description="Seven pages or fewer render every page with no ellipsis.">
            <FooterOnly page={2} pageSize={25} totalItems={120} navigationLabel="Short range pagination" />
          </DocsCard>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Pair Table Pagination with a Data Table or any stable, paged result set. Keep the items-per-page select and the page-jump field together so users can control density and navigate directly. Reset to the first page whenever the page size changes. Hide the jump field for short ranges where numbered links are enough. Avoid this pattern for infinite-scroll feeds where users do not expect discrete pages."
        defaultValue="pageSizeOptions={[10, 25, 50, 100]}"
      />
    </PageWrapper>
  );
}
