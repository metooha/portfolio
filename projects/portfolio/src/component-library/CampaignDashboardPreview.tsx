import * as React from 'react';
import {
  AreaChart,
  BarChart,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Caption,
  Card,
  CardContent,
  CardHeader,
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableCellSelect,
  DataTableHead,
  DataTableHeader,
  DataTableHeaderSelect,
  DataTableRow,
  DonutChart,
  FilterChip,
  Heading,
  Icon,
  Masthead,
  MetricGroup,
  Switch,
  Tag,
} from '@/app/components';
import amyHaLogo from '@/app/assets/pages/profile/shared/amy-ha-logo.png';

export type PreviewDevice = 'desktop' | 'mobile';

const CAMPAIGN_SPEND_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const CAMPAIGN_SPEND_SERIES = [
  { label: 'Spend', colorIndex: 0, data: [32, 38, 35, 42, 44, 46] },
  { label: 'Impressions (K)', colorIndex: 1, data: [180, 195, 190, 210, 220, 240] },
];
const CAMPAIGN_CHANNEL_MIX = [
  { label: 'Display', value: 42, colorIndex: 0 },
  { label: 'Search', value: 28, colorIndex: 1 },
  { label: 'Social', value: 18, colorIndex: 2 },
  { label: 'Email', value: 12, colorIndex: 3 },
];
const CAMPAIGN_BAR_SERIES = [
  { label: 'Display', colorIndex: 0, data: [18, 22, 20, 24, 26, 28] },
  { label: 'Search', colorIndex: 1, data: [12, 14, 16, 15, 18, 20] },
  { label: 'Social', colorIndex: 2, data: [8, 10, 9, 12, 11, 14] },
];

export function BrowserUrlBar({ url = 'https://app.livingcreative.com/dashboard' }: { url?: string }) {
  return (
    <div
      style={{
        background: '#F2F3F5',
        borderBottom: '1px solid #E6E6E8',
        padding: '8px 12px',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '6px',
          padding: '6px 10px',
          fontSize: '11px',
          color: '#74767C',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {url}
      </div>
    </div>
  );
}

export function AppNavPreview({
  appName,
  device = 'desktop',
}: {
  appName: string;
  device?: PreviewDevice;
}) {
  const isMobile = device === 'mobile';

  return (
    <Masthead
      leftSlot={isMobile ? <Icon name="Menu" size="small" decorative /> : undefined}
      appLogo={(
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <img
            src={amyHaLogo}
            alt=""
            className="ld-masthead__app-logo"
            style={{ width: '36px', height: '18px' }}
          />
          <span className="ld-masthead__app-name">{appName}</span>
        </div>
      )}
      onNotificationClick={() => undefined}
      onHelpClick={() => undefined}
      onAccountClick={() => undefined}
    />
  );
}

export function CampaignDashboardPreview({
  device = 'desktop',
  showUrlBar = true,
  compact = false,
}: {
  device?: PreviewDevice;
  showUrlBar?: boolean;
  compact?: boolean;
}) {
  const [filter, setFilter] = React.useState('all');
  const [liveData, setLiveData] = React.useState(true);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const isMobile = device === 'mobile';

  const rows = [
    { id: 'spring', name: 'Spring savings push', status: 'Active', statusKey: 'active', spend: '$12,400' },
    { id: 'back-to-school', name: 'Back to school', status: 'Paused', statusKey: 'paused', spend: '$8,200' },
    { id: 'holiday', name: 'Holiday preview', status: 'Draft', statusKey: 'draft', spend: '$0' },
  ];

  const filteredRows = filter === 'all'
    ? rows
    : rows.filter((row) => row.statusKey === filter);

  const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);
  const visibleIds = React.useMemo(() => filteredRows.map((row) => row.id), [filteredRows]);
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedSet.has(id));
  const someVisibleSelected = visibleIds.some((id) => selectedSet.has(id));

  const toggleAllVisible = (checked: boolean) => {
    setSelectedIds((prev) => {
      if (checked) return [...new Set([...prev, ...visibleIds])];
      return prev.filter((id) => !visibleIds.includes(id));
    });
  };

  const toggleRow = (id: string, checked: boolean) => {
    setSelectedIds((prev) => (
      checked ? [...new Set([...prev, id])] : prev.filter((rowId) => rowId !== id)
    ));
  };

  const chartHeight = compact ? 140 : isMobile ? 180 : 220;
  const barChartHeight = compact ? 120 : isMobile ? 140 : 168;
  const donutSize = compact ? 120 : isMobile ? 140 : 168;
  const chartGridColumns = compact || isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: showUrlBar ? 1 : undefined,
        minHeight: showUrlBar ? '100%' : undefined,
      }}
    >
      {showUrlBar && <BrowserUrlBar />}

      <AppNavPreview appName="PX Platform" device={device} />

      <div
        style={{
          flex: 1,
          padding: isMobile ? '14px' : '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Breadcrumb>
          <BreadcrumbItem href="#" onClick={(e) => e.preventDefault()}>Home</BreadcrumbItem>
          <BreadcrumbItem href="#" onClick={(e) => e.preventDefault()}>Campaigns</BreadcrumbItem>
          <BreadcrumbItem href="#" isCurrent onClick={(e) => e.preventDefault()}>Overview</BreadcrumbItem>
        </Breadcrumb>

        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'stretch' : 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <Heading as="h2" size="small">Campaign Overview</Heading>
          <ButtonGroup>
            <Button variant="secondary" size="small">Export</Button>
            <Button variant="primary" size="small">+ New Campaign</Button>
          </ButtonGroup>
        </div>

        <MetricGroup
          metrics={[
            { title: 'Total Spend', value: '44,600', unit: '$', variant: 'positiveUp' },
            { title: 'Impressions', value: '2.4', unit: 'M' },
            { title: 'Avg. CTR', value: '3.1', unit: '%', variant: 'positiveUp' },
            { title: 'Campaigns', value: '6' },
          ]}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'wrap',
            alignItems: isMobile ? 'stretch' : 'center',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', flex: 1 }}>
            {(['all', 'active', 'paused', 'draft'] as const).map((id) => (
              <FilterChip
                key={id}
                selected={filter === id}
                onSelectedChange={(selected) => {
                  if (selected) setFilter(id);
                }}
              >
                {id === 'all' ? 'All campaigns' : id.charAt(0).toUpperCase() + id.slice(1)}
              </FilterChip>
            ))}
            <FilterChip isMultiSelect selected={false}>
              Last 30 days
            </FilterChip>
            <FilterChip isMultiSelect selected={false}>
              All channels
            </FilterChip>
          </div>
          <Switch label="Live data" isOn={liveData} onClick={() => setLiveData(!liveData)} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: chartGridColumns,
            gap: '16px',
          }}
        >
          <Card>
            <CardHeader
              title="Spend trend"
              headingLevel="h3"
              trailing={<Caption as="span" color="subtle">Last 6 mo</Caption>}
            />
            <CardContent>
              <AreaChart
                series={CAMPAIGN_SPEND_SERIES}
                xLabels={CAMPAIGN_SPEND_MONTHS}
                smooth
                showRightAxis
                height={chartHeight}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Channel mix"
              headingLevel="h3"
              trailing={<Caption as="span" color="subtle">Share of spend</Caption>}
            />
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
                <DonutChart
                  data={CAMPAIGN_CHANNEL_MIX}
                  size={donutSize}
                  centerValue="44.6K"
                  centerLabel="total spend"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Performance by channel"
              headingLevel="h3"
              trailing={<Caption as="span" color="subtle">Stacked monthly</Caption>}
            />
            <CardContent>
              <BarChart
                series={CAMPAIGN_BAR_SERIES}
                labels={CAMPAIGN_SPEND_MONTHS}
                orientation="vertical"
                height={barChartHeight}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Campaigns"
            headingLevel="h3"
            trailing={(
              <Caption as="span" color="subtle">
                {filteredRows.length} of {rows.length} shown
              </Caption>
            )}
          />
          <CardContent UNSAFE_style={{ padding: 0 }}>
            <div style={{ overflowX: 'auto' }}>
              <DataTable>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableHeaderSelect
                      checked={allVisibleSelected}
                      indeterminate={someVisibleSelected && !allVisibleSelected}
                      onChange={(event) => toggleAllVisible(event.target.checked)}
                    />
                    <DataTableHeader>Campaign</DataTableHeader>
                    <DataTableHeader>Status</DataTableHeader>
                    <DataTableHeader>Spend</DataTableHeader>
                    <DataTableHeader>Actions</DataTableHeader>
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  {filteredRows.map((row) => {
                    const labelId = `campaign-row-${row.id}`;
                    return (
                      <DataTableRow key={row.id} selected={selectedSet.has(row.id)}>
                        <DataTableCellSelect
                          a11yLabelledBy={labelId}
                          checked={selectedSet.has(row.id)}
                          onChange={(event) => toggleRow(row.id, event.target.checked)}
                        />
                        <DataTableCell id={labelId}>{row.name}</DataTableCell>
                        <DataTableCell>
                          <Tag color={row.status === 'Active' ? 'green' : row.status === 'Paused' ? 'yellow' : 'gray'}>
                            {row.status}
                          </Tag>
                        </DataTableCell>
                        <DataTableCell>{row.spend}</DataTableCell>
                        <DataTableCell>
                          <ButtonGroup>
                            <Button variant="tertiary" size="small">Edit</Button>
                            <Button variant="secondary" size="small">View</Button>
                          </ButtonGroup>
                        </DataTableCell>
                      </DataTableRow>
                    );
                  })}
                </DataTableBody>
              </DataTable>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function CaseStudyBrowserMock() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 520,
        minHeight: 320,
        border: '1px solid var(--ld-semantic-color-border, #E6E6E8)',
        borderRadius: 'var(--ld-primitive-scale-border-radius-200, 16px)',
        overflow: 'hidden',
        background: 'var(--ld-semantic-color-fill, #fff)',
      }}
    >
      <BrowserUrlBar />
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          overscrollBehavior: 'contain',
        }}
      >
        <CampaignDashboardPreview device="desktop" showUrlBar={false} compact />
      </div>
    </div>
  );
}
