import * as React from 'react';

import {ActionTile} from '../components/ActionTile/ActionTile';
import {Button, ButtonGroup} from '../components/Button/Button';
import {Card, CardActions, CardContent, CardHeader, type CardSize} from '../components/Card/Card';
import {
  CardInteractive,
  CardInteractiveContent,
  CardInteractiveHeader,
  type CardInteractiveLayout,
  type CardInteractiveSize,
  type CardInteractiveVariant,
} from '../components/Card/InteractiveCard';
import {Badge} from '../components/Badge/Badge';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {Divider} from '../components/Divider/Divider';
import {List, ListItem} from '../components/List/List';
import {IconButton} from '../components/IconButton/IconButton';
import {LinkButton} from '../components/LinkButton/LinkButton';
import {Switch} from '../components/Switch/Switch';
import {Tag} from '../components/Tag/Tag';
import {Body, Heading} from '../components/Text/Text';
import {Icon, CloseIcon, ChevronUpIcon, SettingsIcon} from '../components/Icons/Icons';
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableCellSelect,
  DataTableHead,
  DataTableHeader,
  DataTableHeaderSelect,
  DataTableRow,
} from '../components/DataTable/DataTable';
import {AreaChart} from '../components/DataViz';
import {Spinner} from '../components/Spinner/Spinner';
import {SpotIcon} from '../components/SpotIcon/SpotIcon';
import {TextField} from '../components/TextField/TextField';
import {TabNavigation, TabNavigationItem} from '../components/TabNavigation/TabNavigation';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

function HomeIcon() {
  return <i aria-hidden="true" className="ld ld-Home" />;
}

function ChevronRightIcon() {
  return <i aria-hidden="true" className="ld ld-ChevronRight" />;
}

function ChevronDownIcon() {
  return <i aria-hidden="true" className="ld ld-ChevronDown" />;
}

function ReasoningCard() {
  const [isExpanded, setIsExpanded] = React.useState(true);
  return (
    <CardInteractive variant="elevated" onClick={() => {}}>
      <CardInteractiveHeader
        leading={
          <span
            aria-hidden="true"
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'var(--ld-semantic-color-fill-accent-green, #2a8703)',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
        }
        title="Reasoning steps"
        trailing={
          <span style={{display: 'inline-flex', alignItems: 'center', gap: 6}}>
            <Body size="small" color="subtle">Processing</Body>
            <Spinner variant="generic" color="brand" size="small" a11yLabel="Processing" />
          </span>
        }
        trailingControl={
          <IconButton
            a11yLabel={isExpanded ? 'Collapse reasoning' : 'Expand reasoning'}
            size="medium"
            onClick={() => setIsExpanded((v) => !v)}
          >
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </IconButton>
        }
      />
      {isExpanded && (
        <CardInteractiveContent>
          <div
            style={{
              maxHeight: 300,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              paddingRight: 4,
            }}
          >
            {([
              {
                section: 'Initializing analysis',
                items: [
                  {label: 'Building a plan based on your data and question', done: true},
                  {label: 'Understanding context behind UPB, AUR, and Units', done: true},
                  {label: 'Identifying key trends and relationships', done: true},
                ],
              },
              {
                section: 'Metric analysis',
                items: [
                  {label: 'Parsing UPB, AUR, and Units changes', done: true},
                  {label: 'Identifying direction and magnitude of trends', done: true},
                  {label: 'Recognizing pricing vs volume signals', done: false},
                ],
              },
              {
                section: 'Understanding the dynamics',
                items: [
                  {label: 'Higher prices driving revenue per unit', done: false},
                  {label: 'Lower unit volume indicating demand softness', done: false},
                ],
              },
              {
                section: 'Interpreting the impact',
                items: [
                  {label: 'Revenue likely stable or slightly pressured', done: false},
                  {label: 'Strategy leans toward price optimization', done: false},
                  {label: 'Potential risk of overpricing or reduced demand', done: false},
                ],
              },
            ] as const).map((group) => (
              <div key={group.section}>
                <Body size="small" weight="alt">{group.section}</Body>
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    style={{display: 'flex', alignItems: 'center', gap: 8, padding: '2px 0'}}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        flexShrink: 0,
                        background: item.done
                          ? 'var(--ld-semantic-color-fill-accent-green, #2a8703)'
                          : 'var(--ld-semantic-color-text-subtle, #74767c)',
                      }}
                    />
                    <Body size="small">{item.label}</Body>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardInteractiveContent>
      )}
    </CardInteractive>
  );
}

function SampleCard({
  size,
  showLeading,
  showTrailing,
  showActions,
  title = 'Order summary',
  body = 'Review fulfillment details, substitutions, and delivery timing before continuing.',
}: {
  size: CardSize;
  showLeading?: boolean;
  showTrailing?: boolean;
  showActions?: boolean;
  title?: string;
  body?: string;
}) {
  return (
    <Card size={size}>
      <CardHeader
        title={title}
        leadingIcon={showLeading ? <HomeIcon /> : undefined}
        trailing={showTrailing ? <LinkButton>View</LinkButton> : undefined}
      />
      <CardContent>
        <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
          {body}
        </Body>
      </CardContent>
      {showActions && (
        <CardActions>
          <ButtonGroup>
            <Button variant="tertiary" size="small">Dismiss</Button>
            <Button variant="primary" size="small">Continue</Button>
          </ButtonGroup>
        </CardActions>
      )}
    </Card>
  );
}

const RECENT_ACTIVITY: Array<{label: string; detail: string; dotColor: string}> = [
  {label: 'Order #1234 shipped', detail: '2 hours ago', dotColor: 'var(--ld-semantic-color-fill-accent-green, #2a8703)'},
  {label: 'Payment received', detail: 'Yesterday', dotColor: 'var(--ld-semantic-color-fill-accent-blue, #0053e2)'},
  {label: 'Account updated', detail: 'Mar 2', dotColor: 'var(--ld-semantic-color-fill-accent-gray, #74767c)'},
];

type CardPageTab = 'card' | 'interactive';

// ---------------------------------------------------------------------------
// PromptQueueCard — stateful drag-to-reorder
// ---------------------------------------------------------------------------

const DRAG_HANDLE_SVG = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{color: 'var(--ld-semantic-color-text-subtle, #74767c)', cursor: 'grab', flexShrink: 0}}>
    <path d="M10.5 6C10.5 6.82843 9.82843 7.5 9 7.5C8.17157 7.5 7.5 6.82843 7.5 6C7.5 5.17157 8.17157 4.5 9 4.5C9.82843 4.5 10.5 5.17157 10.5 6Z" fill="currentColor" />
    <path d="M10.5 12C10.5 12.8284 9.82843 13.5 9 13.5C8.17157 13.5 7.5 12.8284 7.5 12C7.5 11.1716 8.17157 10.5 9 10.5C9.82843 10.5 10.5 11.1716 10.5 12Z" fill="currentColor" />
    <path d="M10.5 18C10.5 18.8284 9.82843 19.5 9 19.5C8.17157 19.5 7.5 18.8284 7.5 18C7.5 17.1716 8.17157 16.5 9 16.5C9.82843 16.5 16.5 17.1716 16.5 18Z" fill="currentColor" />
    <path d="M16.5 6C16.5 6.82843 15.8284 7.5 15 7.5C14.1716 7.5 13.5 6.82843 13.5 6C13.5 5.17157 14.1716 4.5 15 4.5C15.8284 4.5 16.5 5.17157 16.5 6Z" fill="currentColor" />
    <path d="M16.5 12C16.5 12.8284 15.8284 13.5 15 13.5C14.1716 13.5 13.5 12.8284 13.5 12C13.5 11.1716 14.1716 10.5 15 10.5C15.8284 10.5 16.5 11.1716 16.5 12Z" fill="currentColor" />
    <path d="M16.5 18C16.5 18.8284 15.8284 19.5 15 19.5C14.1716 19.5 13.5 18.8284 13.5 18C13.5 17.1716 14.1716 16.5 15 16.5C15.8284 16.5 16.5 17.1716 16.5 18Z" fill="currentColor" />
  </svg>
);

const INITIAL_PENDING_ITEMS = [
  {id: 'pq-1', label: 'List item text'},
  {id: 'pq-2', label: 'List item text'},
];

function PromptQueueCard() {
  const [pendingItems, setPendingItems] = React.useState(INITIAL_PENDING_ITEMS);
  const dragIndexRef = React.useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);
  const handleOriginatedRef = React.useRef(false);

  const handleDragStart = (index: number) => (e: React.DragEvent<HTMLLIElement>) => {
    if (!handleOriginatedRef.current) {
      e.preventDefault();
      return;
    }
    dragIndexRef.current = index;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (index: number) => (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDrop = (dropIndex: number) => (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    const from = dragIndexRef.current;
    if (from === null || from === dropIndex) {
      dragIndexRef.current = null;
      setDragOverIndex(null);
      return;
    }
    setPendingItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(dropIndex, 0, moved);
      return next;
    });
    dragIndexRef.current = null;
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    dragIndexRef.current = null;
    setDragOverIndex(null);
    handleOriginatedRef.current = false;
  };

  return (
    <Card>
      <CardHeader
        title={
          <span style={{display: 'inline-flex', alignItems: 'center', gap: 4}}>
            Prompt Queue <Badge>{2 + pendingItems.length}</Badge>
          </span>
        }
        leadingIcon={<i aria-hidden="true" className="ld ld-ChevronUp" />}
        trailing={
          <div style={{display: 'flex', alignItems: 'center', gap: 4}}>
            <IconButton a11yLabel="Pause" size="small">
              <i aria-hidden="true" className="ld ld-Pause" />
            </IconButton>
            <IconButton a11yLabel="Delete queue" size="small">
              <i aria-hidden="true" className="ld ld-Trash" />
            </IconButton>
          </div>
        }
      />
      <CardContent>
        <List>
          <ListItem
            leading={
              <span style={{display: 'inline-flex', alignItems: 'center', height: '1.5rem'}}>
                <i aria-hidden="true" className="ld ld-CheckCircleFill" style={{color: 'var(--ld-semantic-color-fill-accent-green, #2a8703)', fontSize: '1rem'}} />
              </span>
            }
          >
            List item text
          </ListItem>
          <ListItem
            leading={
              <span style={{display: 'inline-flex', alignItems: 'center', height: '1.5rem'}}>
                <Spinner variant="generic" color="brand" size="small" a11yLabel="In progress" />
              </span>
            }
          >
            List item text
          </ListItem>
          {pendingItems.map((item, index) => (
            <li
              key={item.id}
              draggable
              onDragStart={handleDragStart(index)}
              onDragOver={handleDragOver(index)}
              onDrop={handleDrop(index)}
              onDragEnd={handleDragEnd}
              style={{
                opacity: dragIndexRef.current === index ? 0.4 : 1,
                borderTop: dragOverIndex === index && dragIndexRef.current !== index ? '2px solid var(--ld-semantic-color-border-focus, #0053e2)' : '2px solid transparent',
                listStyle: 'none',
                transition: 'border-color 0.1s',
              }}
            >
              <ListItem
                leading={
                  <span
                    onPointerDown={() => { handleOriginatedRef.current = true; }}
                    onPointerUp={() => { handleOriginatedRef.current = false; }}
                    style={{display: 'inline-flex', alignItems: 'center', height: '1.5rem', cursor: 'grab'}}
                  >
                    {DRAG_HANDLE_SVG}
                  </span>
                }
                trailing={
                  <span style={{display: 'inline-flex', gap: 8, alignItems: 'center'}}>
                    <IconButton a11yLabel="Copy item" size="small">
                      <i aria-hidden="true" className="ld ld-Copy" />
                    </IconButton>
                    <IconButton a11yLabel="Remove item" size="small">
                      <CloseIcon />
                    </IconButton>
                  </span>
                }
              >
                {item.label}
              </ListItem>
            </li>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Data Cards helpers
// ---------------------------------------------------------------------------

const DATA_CARD_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DATA_CARD_AREA_SERIES = [
  {label: 'Category', colorIndex: 0, data: [42, 70, 58, 49, 52, 60, 55, 72, 64, 30, 38, 47]},
  {label: 'Category', colorIndex: 1, data: [28, 40, 30, 36, 45, 55, 60, 58, 62, 64, 50, 38]},
  {label: 'Category', colorIndex: 2, data: [35, 58, 78, 48, 44, 62, 50, 60, 88, 70, 46, 22]},
  {label: 'Category', colorIndex: 3, data: [80, 26, 18, 30, 48, 60, 64, 55, 40, 36, 58, 30]},
  {label: 'Category', colorIndex: 4, data: [22, 30, 24, 28, 26, 30, 28, 34, 30, 58, 42, 26]},
];

const DATA_CARD_COLUMNS = ['Label', 'Label', 'Label', 'Label', 'Label'];
const DATA_CARD_ROWS = Array.from({length: 8}, (_, i) => ({id: String(i)}));

function DataCardHeaderIcons() {
  return (
    <span style={{display: 'flex', gap: 2}}>
      <IconButton a11yLabel="Copy" size="small" variant="round" onClick={() => {}}>
        <Icon name="Copy" size="small" />
      </IconButton>
      <IconButton a11yLabel="User" size="small" variant="round" onClick={() => {}}>
        <Icon name="User" size="small" />
      </IconButton>
      <IconButton a11yLabel="Download" size="small" variant="round" onClick={() => {}}>
        <Icon name="Download" size="small" />
      </IconButton>
      <IconButton a11yLabel="View detail" size="small" variant="round" onClick={() => {}}>
        <ChevronRightIcon />
      </IconButton>
    </span>
  );
}

function DataTableDataCard() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);
  const allSelected = selectedIds.length === DATA_CARD_ROWS.length;
  const isIndeterminate = selectedIds.length > 0 && !allSelected;

  const toggleAll = (checked: boolean) =>
    setSelectedIds(checked ? DATA_CARD_ROWS.map((r) => r.id) : []);

  const toggleRow = (id: string, checked: boolean) =>
    setSelectedIds((prev) =>
      checked ? [...new Set([...prev, id])] : prev.filter((s) => s !== id),
    );

  const stopProp = (e: React.MouseEvent | React.KeyboardEvent | React.PointerEvent) =>
    e.stopPropagation();

  return (
    <CardInteractive onClick={() => {}} variant="outlined">
      <CardInteractiveHeader
        title="Data Table Example"
        description="Labore et dolore as magna"
        trailingControl={<DataCardHeaderIcons />}
      />
      <CardInteractiveContent>
        {/* Wrap all interactive content to stop propagation to the card */}
        <div onClick={stopProp} onKeyDown={stopProp} onPointerDown={stopProp}>
          {/* Search bar */}
          <div style={{marginBottom: 10}}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
                borderRadius: 999,
                padding: '6px 12px',
                background: 'var(--ld-semantic-color-surface, #fff)',
              }}
            >
              <Icon name="Search" size="small" style={{color: 'var(--ld-semantic-color-text-subtle, #74767c)', flexShrink: 0}} />
              <span style={{flex: 1, fontSize: '0.875rem', color: 'var(--ld-semantic-color-text-subtle, #74767c)', lineHeight: '1.25rem', userSelect: 'none'}}>
                Search by SKU
              </span>
              <ChevronDownIcon />
            </div>
          </div>

          {/* Filter row */}
          <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12}}>
            {(['Filter label', 'Filter label', 'Filter label'] as const).map((label, i) => (
              <Button key={i} size="small" variant="secondary" trailing={<ChevronDownIcon />} onClick={() => {}}>
                {label}
              </Button>
            ))}
            <Button size="small" variant="ghost" onClick={() => {}}>All filters</Button>
            <span style={{marginLeft: 'auto', display: 'flex', gap: 4}}>
              <IconButton a11yLabel="Download table" size="small" variant="round" onClick={() => {}}>
                <Icon name="Download" size="small" />
              </IconButton>
              <IconButton a11yLabel="Table settings" size="small" variant="round" onClick={() => {}}>
                <SettingsIcon size="small" />
              </IconButton>
            </span>
          </div>

          {/* Table */}
          <div style={{border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)', borderRadius: 8, overflow: 'hidden'}}>
            <div style={{overflowX: 'auto'}}>
              <DataTable>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableHeaderSelect
                      checked={allSelected}
                      indeterminate={isIndeterminate}
                      onChange={(e) => toggleAll(e.target.checked)}
                    />
                    {DATA_CARD_COLUMNS.map((col, i) => (
                      <DataTableHeader key={i}>{col}</DataTableHeader>
                    ))}
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  {DATA_CARD_ROWS.map((row) => {
                    const labelId = `data-card-row-${row.id}`;
                    return (
                      <DataTableRow key={row.id} selected={selectedSet.has(row.id)}>
                        <DataTableCellSelect
                          a11yLabelledBy={labelId}
                          checked={selectedSet.has(row.id)}
                          onChange={(e) => toggleRow(row.id, e.target.checked)}
                        />
                        {DATA_CARD_COLUMNS.map((_, ci) => (
                          <DataTableCell key={ci} id={ci === 0 ? labelId : undefined}>
                            <LinkButton onClick={() => {}}>Data</LinkButton>
                          </DataTableCell>
                        ))}
                      </DataTableRow>
                    );
                  })}
                </DataTableBody>
              </DataTable>
            </div>
          </div>
        </div>
      </CardInteractiveContent>
    </CardInteractive>
  );
}

function AreaChartDataCard() {
  const stopProp = (e: React.MouseEvent | React.KeyboardEvent | React.PointerEvent) =>
    e.stopPropagation();

  return (
    <CardInteractive onClick={() => {}} variant="outlined">
      <CardInteractiveHeader
        title="Data Table Example"
        description="Labore et dolore as magna"
        trailingControl={<DataCardHeaderIcons />}
      />
      <CardInteractiveContent>
        <div onClick={stopProp} onKeyDown={stopProp} onPointerDown={stopProp}>
          <AreaChart series={DATA_CARD_AREA_SERIES} xLabels={DATA_CARD_MONTHS} smooth showRightAxis />
        </div>
      </CardInteractiveContent>
    </CardInteractive>
  );
}

function DataCardsSection() {
  return (
    <ExampleSection
      title="Data cards"
      description="Dashboard-style data cards using CardInteractive in readOnly mode. The card surface is non-interactive so embedded controls (tables, charts) receive pointer events directly."
    >
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(480px, 100%), 1fr))', gap: 24, alignItems: 'start'}}>
        <DataTableDataCard />
        <AreaChartDataCard />
      </div>
    </ExampleSection>
  );
}

export default function CardPage() {
  const [tab, setTab] = React.useState<CardPageTab>('card');
  const tabItem = (id: CardPageTab, label: string) => (
    <TabNavigationItem
      href="#"
      isCurrent={tab === id}
      onClick={(e) => {
        e.preventDefault();
        setTab(id);
      }}
    >
      {label}
    </TabNavigationItem>
  );

  const [size, setSize] = React.useState<CardSize>('small');
  const [showLeading, setShowLeading] = React.useState(true);
  const [showTrailing, setShowTrailing] = React.useState(true);
  const [showActions, setShowActions] = React.useState(false);

  // Interactive card configuration state
  const [icVariant, setIcVariant] = React.useState<CardInteractiveVariant>('elevated');
  const [icLayout, setIcLayout] = React.useState<CardInteractiveLayout>('default');
  const [icSize, setIcSize] = React.useState<CardInteractiveSize>('large');
  const [icState, setIcState] = React.useState<'enabled' | 'activated' | 'readonly'>('enabled');
  const [showIcLeading, setShowIcLeading] = React.useState(false);
  const [showIcTrailing, setShowIcTrailing] = React.useState(true);
  const [icAppended, setIcAppended] = React.useState<'none' | 'tag' | 'caption'>('none');
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [somethingElse, setSomethingElse] = React.useState('');

  return (
    <PageWrapper
      title="Card"
      category="Core Components"
      description="Containers that group related content, headers, actions, and controls into scannable sections."
    >
      <div style={{marginBottom: 24}}>
        <TabNavigation aria-label="Card sections">
          {tabItem('card', 'Card')}
          {tabItem('interactive', 'Interactive Card')}
        </TabNavigation>
      </div>

      {/* ── Card ─────────────────────────────────────────────────── */}
      {tab === 'card' && (<>
      <ExampleSection
        title="Component Configuration"
        description="Preview card size, header slots, and optional actions in one reusable card structure."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Size
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Use small for dense layouts and large when the card needs stronger emphasis.
                </Body>
              </div>

              <ButtonGroup aria-label="Card size">
                {(['small', 'large'] as CardSize[]).map((item) => (
                  <Button
                    key={item}
                    size="small"
                    variant={size === item ? 'primary' : 'secondary'}
                    aria-pressed={size === item}
                    onClick={() => setSize(item)}
                  >
                    {item === 'small' ? 'Small' : 'Large'}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Show leading icon" checked={showLeading} onChange={(event) => setShowLeading(event.target.checked)} />
                <Checkbox label="Show trailing action" checked={showTrailing} onChange={(event) => setShowTrailing(event.target.checked)} />
                <Checkbox label="Show action footer" checked={showActions} onChange={(event) => setShowActions(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title={`${size === 'small' ? 'Small' : 'Large'} card`} description="Configured card preview with the selected header and action options.">
              <SampleCard size={size} showLeading={showLeading} showTrailing={showTrailing} showActions={showActions} />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Header patterns"
        description="Card headers can include a title, leading icon, and trailing action."
      >
        <DocsGrid>
          <DocsCard title="Title only" description="Use a simple title when the content is self-explanatory.">
            <SampleCard size="small" title="Store details" body="Address, pickup hours, and department availability." />
          </DocsCard>
          <DocsCard title="Leading icon" description="Use an icon when it helps users recognize the card category quickly.">
            <SampleCard size="small" showLeading title="Home delivery" body="Delivery windows and address preferences." />
          </DocsCard>
          <DocsCard title="Trailing action" description="Use one trailing action for lightweight card-level navigation or details.">
            <SampleCard size="small" showTrailing title="Performance" body="Campaign metrics and recent trend changes." />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Layouts and scenarios"
        description="Cards work best when each card contains one clear topic or task."
      >
        <DocsGrid>
          <DocsCard title="Product card" description="Use cards to group product information and related purchase actions.">
            <Card>
              <CardHeader title="Wireless Headphones" trailing={<LinkButton>Details</LinkButton>} />
              <CardContent>
                <div style={{display: 'grid', gap: 8}}>
                  <Body as="p" size="medium" color="subtle" style={{margin: 0}}>
                    Premium noise-cancelling headphones with 30-hour battery life.
                  </Body>
                  <Heading as="h3" size="small" style={{margin: 0}}>$199.99</Heading>
                </div>
              </CardContent>
              <CardActions>
                <ButtonGroup>
                  <Button variant="secondary" size="small">Add to cart</Button>
                  <Button variant="primary" size="small">Buy now</Button>
                </ButtonGroup>
              </CardActions>
            </Card>
          </DocsCard>

          <DocsCard title="Settings card" description="Use a card to group related controls with clear labels and separators.">
            <Card>
              <CardHeader title="Account settings" />
              <CardContent>
                <div style={{display: 'grid', gap: 12}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16}}>
                    <Body as="span" size="medium" id="email-notifications-label">Email notifications</Body>
                    <Switch a11yLabelledBy="email-notifications-label" isOn onClick={() => {}} />
                  </div>
                  <Divider />
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16}}>
                    <Body as="span" size="medium" id="sms-notifications-label">SMS notifications</Body>
                    <Switch a11yLabelledBy="sms-notifications-label" isOn={false} onClick={() => {}} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </DocsCard>

          <DocsCard title="Activity card" description="Use semantic accent tokens for status dots so the legend stays themable.">
            <Card>
              <CardHeader title="Recent activity" trailing={<LinkButton>View all</LinkButton>} />
              <CardContent>
                <div style={{display: 'grid'}}>
                  {RECENT_ACTIVITY.map((item, index) => (
                    <React.Fragment key={item.label}>
                      {index > 0 && <Divider />}
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', gap: 12}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: 8, minWidth: 0}}>
                          <span aria-hidden="true" style={{width: 8, height: 8, borderRadius: '50%', background: item.dotColor, flexShrink: 0}} />
                          <Body as="span" size="medium">{item.label}</Body>
                        </div>
                        <Body as="span" size="small" color="subtle">{item.detail}</Body>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Dashboard grid"
        description="Use a consistent grid when cards represent peer sections or metrics."
      >
        <DocsGrid minColumnWidth={220}>
          {[
            ['Total sales', '$12,450'],
            ['Orders', '342'],
            ['Customers', '1,234'],
          ].map(([label, value]) => (
            <Card key={label}>
              <CardContent>
                <div style={{display: 'grid', gap: 8, padding: 8}}>
                  <Body as="h3" size="small" color="subtle" style={{margin: 0}}>{label}</Body>
                  <Heading as="p" size="small" style={{margin: 0}}>{value}</Heading>
                </div>
              </CardContent>
            </Card>
          ))}
        </DocsGrid>
      </ExampleSection>

      </>)}

      {/* ── CardInteractive ──────────────────────────────────────── */}
      {tab === 'interactive' && (<>
      <ExampleSection
        title="Component Configuration"
        description="A single-action card whose entire surface triggers one handler. Supports stacked (default) and inline layouts across three sizes and four container styles."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>Variant</Body>
              </div>
              <ButtonGroup aria-label="Container variant">
                {(['elevated', 'outlined', 'border', 'frameless'] as CardInteractiveVariant[]).map((v) => (
                  <Button
                    key={v}
                    size="small"
                    variant={icVariant === v ? 'primary' : 'secondary'}
                    aria-pressed={icVariant === v}
                    onClick={() => setIcVariant(v)}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>Layout</Body>
              </div>
              <ButtonGroup aria-label="Card layout">
                {(['default', 'inline'] as CardInteractiveLayout[]).map((l) => (
                  <Button
                    key={l}
                    size="small"
                    variant={icLayout === l ? 'primary' : 'secondary'}
                    aria-pressed={icLayout === l}
                    onClick={() => setIcLayout(l)}
                  >
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>Size</Body>
              </div>
              <ButtonGroup aria-label="Card size">
                {(['small', 'medium', 'large'] as CardInteractiveSize[]).map((s) => (
                  <Button
                    key={s}
                    size="small"
                    variant={icSize === s ? 'primary' : 'secondary'}
                    aria-pressed={icSize === s}
                    onClick={() => setIcSize(s)}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Show leading icon" checked={showIcLeading} onChange={(e) => setShowIcLeading(e.target.checked)} />
                <Checkbox label="Show trailing action" checked={showIcTrailing} onChange={(e) => setShowIcTrailing(e.target.checked)} />
              </div>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>Appended Content</Body>
              </div>
              <ButtonGroup aria-label="Appended content">
                {(
                  [
                    {value: 'none',    label: 'None'},
                    {value: 'tag',     label: 'Tag'},
                    {value: 'caption', label: 'Caption'},
                  ] as const
                ).map(({value, label}) => (
                  <Button
                    key={value}
                    size="small"
                    variant={icAppended === value ? 'primary' : 'secondary'}
                    aria-pressed={icAppended === value}
                    onClick={() => setIcAppended(value)}
                  >
                    {label}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h4" size="medium" weight="alt" style={{margin: 0}}>State</Body>
              </div>
              <ButtonGroup aria-label="Card state">
                {(
                  [
                    {value: 'enabled',   label: 'Enabled'},
                    {value: 'activated', label: 'Activated'},
                    {value: 'readonly',  label: 'Read-only'},
                  ] as const
                ).map(({value, label}) => (
                  <Button
                    key={value}
                    size="small"
                    variant={icState === value ? 'primary' : 'secondary'}
                    aria-pressed={icState === value}
                    onClick={() => setIcState(value)}
                  >
                    {label}
                  </Button>
                ))}
              </ButtonGroup>
            </>
          }
          preview={
            <DocsCard
              title="Interactive card preview"
              description="Click the card surface to trigger the action."
            >
              <CardInteractive
                variant={icVariant}
                layout={icLayout}
                size={icSize}
                activated={icState === 'activated'}
                readOnly={icState === 'readonly'}
                onClick={() => alert('Card action triggered')}
              >
                <CardInteractiveHeader
                  title="View order details"
                  leading={showIcLeading ? <HomeIcon /> : undefined}
                  trailing={
                    (showIcTrailing || icAppended !== 'none') ? (
                      <span style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
                        {icAppended === 'tag' && (
                          <Tag color="blue" size="small" variant="secondary">New</Tag>
                        )}
                        {icAppended === 'caption' && (
                          <Body size="small" color="subtle">Caption</Body>
                        )}
                        {showIcTrailing && <ChevronRightIcon />}
                      </span>
                    ) : undefined
                  }
                />
                <CardInteractiveContent>
                  <Body size="medium" color="subtle">Arrives Tuesday, June 17</Body>
                </CardInteractiveContent>
              </CardInteractive>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Container variants"
        description="Four surface styles: elevated carries depth, outlined and border use a 1 px edge, frameless is transparent."
      >
        <DocsGrid>
          <DocsCard title="Elevated" description="Default style — white surface with box-shadow.">
            <CardInteractive variant="elevated" onClick={() => {}}>
              <CardInteractiveHeader title="Elevated card" trailing={<ChevronRightIcon />} />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">Navigate to a detail view.</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>

          <DocsCard title="Outlined" description="White fill with a 1 px border and no shadow.">
            <CardInteractive variant="outlined" onClick={() => {}}>
              <CardInteractiveHeader title="Outlined card" trailing={<ChevronRightIcon />} />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">Use on surfaces that already have depth.</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>

          <DocsCard title="Border" description="Transparent fill with a 1 px border — light-weight on busy backgrounds.">
            <CardInteractive variant="border" onClick={() => {}}>
              <CardInteractiveHeader title="Border card" trailing={<ChevronRightIcon />} />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">Recedes on light backgrounds.</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>

          <DocsCard title="Frameless" description="No border, no shadow — the hover/focus state reveals the card boundary.">
            <CardInteractive variant="frameless" onClick={() => {}}>
              <CardInteractiveHeader title="Frameless card" trailing={<ChevronRightIcon />} />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">Blends into the page until interacted with.</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Layouts"
        description="Default stacks header above content. Inline places them side-by-side on one row with the trailing slot pinned to the far right."
      >
        <DocsGrid>
          <DocsCard title="Default layout" description="Header and content stacked vertically.">
            <CardInteractive variant="elevated" layout="default" onClick={() => {}}>
              <CardInteractiveHeader
                title="Sam's Club membership"
                leading={<HomeIcon />}
                trailing={<ChevronRightIcon />}
              />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">Renews July 1, 2026</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>

          <DocsCard title="Inline layout" description="Title and description on one row; trailing pinned to the far right.">
            <CardInteractive variant="elevated" layout="inline" onClick={() => {}}>
              <CardInteractiveHeader
                title="Sam's Club membership"
                trailing={<ChevronRightIcon />}
              />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">Renews July 1, 2026</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Header leading slot patterns"
        description="The leading slot accepts a static visual (icon, spot icon) or a real interactive control (Tag) that fires independently of the card action."
      >
        <DocsGrid>
          <DocsCard title="Icon" description="Static icon in the leading slot. The icon carries its own aria-hidden.">
            <CardInteractive variant="outlined" onClick={() => {}}>
              <CardInteractiveHeader
                title="Home delivery"
                leading={<HomeIcon />}
                trailing={<ChevronRightIcon />}
              />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">Delivery window and address preferences.</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>

          <DocsCard title="Tag" description="Interactive Tag fires independently of the card via leadingControl.">
            <CardInteractive variant="outlined" onClick={() => {}}>
              <CardInteractiveHeader
                title="Walmart+ membership"
                leadingControl={<Tag color="positive" variant="secondary">Active</Tag>}
                trailing={<ChevronRightIcon />}
              />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">Renews July 1, 2026</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Size scale"
        description="Three sizes drive both padding and title typography."
      >
        <DocsGrid>
          <DocsCard title="Small (4 px)" description="Body/medium title — use in dense lists or sidebars.">
            <CardInteractive variant="elevated" size="small" onClick={() => {}}>
              <CardInteractiveHeader title="Quick action" trailing={<ChevronRightIcon />} />
              <CardInteractiveContent>
                <Body size="small" color="subtle">Compact content area.</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>

          <DocsCard title="Medium (8 px)" description="Body/large title — balanced for standard list items.">
            <CardInteractive variant="elevated" size="medium" onClick={() => {}}>
              <CardInteractiveHeader title="Standard action" trailing={<ChevronRightIcon />} />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">Medium content area.</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>

          <DocsCard title="Large (16 px) — default" description="Heading/small title — prominent surface for key actions.">
            <CardInteractive variant="elevated" size="large" onClick={() => {}}>
              <CardInteractiveHeader title="Primary action" trailing={<ChevronRightIcon />} />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">Spacious content area for richer detail.</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Interaction states"
        description="Enabled cards use neutral surface tokens across hover, pressed, and focused states. Activated cards swap to the blue-tinted activated token scale while preserving the same state progression."
      >
        <DocsGrid minColumnWidth={280}>
          <DocsCard title="Enabled — default" description="Resting state: white surface, no interaction feedback.">
            <CardInteractive variant="elevated" onClick={() => {}}>
              <CardInteractiveHeader title="Card title" trailing={<ChevronRightIcon />} />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">Description</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>

          <DocsCard title="Activated — default" description="Blue border + surface-activated background (#f0f5ff).">
            <CardInteractive variant="elevated" activated onClick={() => {}}>
              <CardInteractiveHeader title="Card title" trailing={<ChevronRightIcon />} />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">Description</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>

          <DocsCard title="Read-only" description="Non-interactive: no role, no tab stop, no state fills. Content stays fully legible.">
            <CardInteractive variant="elevated" readOnly onClick={() => {}}>
              <CardInteractiveHeader title="Card title" />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">Description</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Card types"
        description="Common usage patterns for CardInteractive across five categories: standard navigation, dismissible suggestions, AI reasoning traces, list content, and questionnaire options."
      >
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24}}>
          <DocsCard
            title="Standard"
            description="Standard navigable card — the entire surface is one action. Use a leading icon for category context and a trailing chevron to signal navigation."
          >
            <CardInteractive variant="elevated" onClick={() => {}}>
              <CardInteractiveHeader
                title="Review suggested changes"
                leading={<HomeIcon />}
                trailing={<ChevronRightIcon />}
              />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">3 files modified · Click to review</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>

          <DocsCard
            title="Dismissable"
            description="Card with an independent close control pinned to the top-right — the X fires without also triggering card navigation."
          >
            <CardInteractive variant="outlined" onClick={() => {}}>
              <CardInteractiveHeader
                title="Pro tip"
                trailingControl={
                  <IconButton a11yLabel="Dismiss" size="medium">
                    <CloseIcon />
                  </IconButton>
                }
              />
              <CardInteractiveContent>
                <Body size="medium" color="subtle">Press ⌘K to open the command palette quickly.</Body>
              </CardInteractiveContent>
            </CardInteractive>
          </DocsCard>

          <DocsCard
            title="Read-only"
            description="Display-only card — no interaction, no hover state. Use for AI-generated content or non-actionable summaries."
          >
            <CardInteractive variant="outlined" readOnly onClick={() => {}}>
              <CardInteractiveHeader
                leading={<i aria-hidden="true" className="ld ld-Notebook" style={{fontSize: '1.5rem'}} />}
                title={
                  <span>
                    Ultimately, fostering a collaborative DevOps culture accelerates delivery timelines and aligns development objectives with business goals.{' '}
                    <span style={{verticalAlign: 'middle', display: 'inline-flex'}}><Tag size="small">&lt;/&gt; cp /Users/a0v0cb...</Tag></span>
                  </span>
                }
              />
            </CardInteractive>
          </DocsCard>

          <DocsCard
            title="Single action"
            description="Inline card with a SpotIcon leading slot and a LinkButton trailing action — use for single-purpose prompts or feature callouts."
          >
            <CardInteractive variant="elevated" layout="inline" onClick={() => {}}>
              <CardInteractiveHeader
                leading={
                  <SpotIcon color="brand" shape="circle" size="medium">
                    <i aria-hidden="true" className="ld ld-Receipt" />
                  </SpotIcon>
                }
                title="Share all of your information"
                trailing={<LinkButton>Learn more</LinkButton>}
              />
            </CardInteractive>
          </DocsCard>

          <DocsCard
            title="Multi-action"
            description="Card with a title, body copy, and two actions — Cancel dismisses, Save confirms."
          >
            <Card>
              <CardHeader title="Share all of your information" />
              <CardContent>
                <Body size="medium" color="subtle">Excepteur sint occaecat cupidatat non proident et lopus sed</Body>
              </CardContent>
              <CardActions>
                <ButtonGroup>
                  <Button variant="secondary" size="small">Cancel</Button>
                  <Button variant="primary" size="small">Save</Button>
                </ButtonGroup>
              </CardActions>
            </Card>
          </DocsCard>

          <DocsCard
            title="Multi-action (inline)"
            description="Compact inline layout with a SpotIcon leading slot, body copy, and two trailing actions."
          >
            <Card style={{width: 'fit-content'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px'}}>
                <SpotIcon color="brand" shape="circle" size="medium">
                  <i aria-hidden="true" className="ld ld-Receipt" />
                </SpotIcon>
                <div style={{flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2}}>
                  <Body size="medium" weight="alt">Share all of your information</Body>
                  <Body size="small" color="subtle">Excepteur sint occaecat cupidatat non proident and lopus seddo.</Body>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0}}>
                  <LinkButton>Learn more</LinkButton>
                  <Button variant="primary" size="small">Share</Button>
                </div>
              </div>
            </Card>
          </DocsCard>

          <DocsCard
            title="Questionnaire"
            description="Multi-choice question card — selectable ActionTile rows for each option, an open-ended text field for freeform answers, and Card-level action buttons."
          >
            <div style={{width: '600px'}}>
            <Card>
              <CardHeader
                title="What kind of trip are you looking for?"
                trailing={
                  <div style={{display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0}}>
                    <Body size="small" color="subtle">1 of 5</Body>
                    <IconButton a11yLabel="Dismiss" size="medium">
                      <CloseIcon />
                    </IconButton>
                  </div>
                }
              />
              <CardContent>
                <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                  {(
                    [
                      {icon: <i aria-hidden="true" className="wcp wcp-Grocery" style={{fontSize: '1.5rem'}} />,      label: 'Food & culture'},
                      {icon: <i aria-hidden="true" className="wcp wcp-GardenCenter" style={{fontSize: '1.5rem'}} />, label: 'Adventure & outdoors'},
                      {icon: <Icon name="Heart" decorative size="medium" />,                                         label: 'Relaxation & beach'},
                      {icon: <i aria-hidden="true" className="ld ld-Facility" style={{fontSize: '1.5rem'}} />,       label: 'City exploration'},
                      {icon: <Icon name="Services" decorative size="medium" />,                                      label: 'Mix of everything'},
                    ]
                  ).map((option) => (
                    <ActionTile
                      key={option.label}
                      variant="horizontal"
                      selected={selectedOption === option.label}
                      titleWeight="bold"
                      leading={option.icon}
                      UNSAFE_style={{width: '100%'}}
                      onClick={() => setSelectedOption(
                        selectedOption === option.label ? null : option.label
                      )}
                    >
                      {option.label}
                    </ActionTile>
                  ))}
                  <TextField
                    label="Something else"
                    value={somethingElse}
                    onChange={(e) => setSomethingElse(e.target.value)}
                    textFieldProps={{placeholder: 'Value goes here'}}
                  />
                </div>
              </CardContent>
              <CardActions>
                <ButtonGroup>
                  <Button variant="secondary" size="small">Cancel</Button>
                  <Button variant="primary" size="small">Save</Button>
                </ButtonGroup>
              </CardActions>
            </Card>
            </div>
          </DocsCard>

          <DocsCard
            title="Reasoning"
            description="Reasoning trace with expand/collapse via trailing chevron."
          >
            <ReasoningCard />
          </DocsCard>

          <DocsCard
            title="Prompt Queue"
            description="Queue card with status-tinted leading icons (completed, in-progress, pending) and per-row copy and remove actions. Pending items can be dragged by the grip handle to reorder."
          >
            <PromptQueueCard />
          </DocsCard>

          <DocsCard
            title="Checkbox List"
            description="Todo list card with Checkbox rows — checked items render bold, unchecked items expose copy and remove actions."
          >
            <Card style={{width: 'fit-content'}}>
              <CardHeader
                title={
                  <span style={{display: 'inline-flex', alignItems: 'center', gap: 4}}>
                    Card with Checkbox List <Badge>{1 + [0, 1, 2].length}</Badge>
                  </span>
                }
                leadingIcon={<i aria-hidden="true" className="ld ld-List" />}
                trailing={
                  <IconButton a11yLabel="Collapse" size="small">
                    <i aria-hidden="true" className="ld ld-ChevronUp" />
                  </IconButton>
                }
              />
              <CardContent>
                <List>
                  <ListItem
                    leading={
                      <Checkbox a11yLabelledBy="todo-done-label" checked onChange={() => {}} />
                    }
                    title={<span id="todo-done-label">List item text</span>}
                  >
                    {''}
                  </ListItem>
                  {[0, 1, 2].map((i) => (
                    <ListItem
                      key={i}
                      leading={
                        <Checkbox a11yLabelledBy={`todo-item-label-${i}`} checked={false} onChange={() => {}} />
                      }
                      trailing={
                        <span style={{display: 'inline-flex', gap: 8, alignItems: 'center'}}>
                          <IconButton a11yLabel="Copy item" size="small">
                            <i aria-hidden="true" className="ld ld-Copy" />
                          </IconButton>
                          <IconButton a11yLabel="Remove item" size="small">
                            <CloseIcon />
                          </IconButton>
                        </span>
                      }
                    >
                      <span id={`todo-item-label-${i}`}>List item text</span>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </DocsCard>
        </div>
      </ExampleSection>

      <DataCardsSection />

      </>)}

      <GuidelinesSection
        description="Use cards to group related content that users can scan as a unit. Keep one clear topic per card, use a concise header, and reserve trailing or footer actions for card-level actions only. Use consistent grid sizing when cards are peers, and avoid nesting decorative cards inside other decorative cards unless the inner card is the component being demonstrated. For cards that navigate or trigger a single action, use CardInteractive instead of Card so the entire surface is the interaction target."
        defaultValue="size='large'"
      />
    </PageWrapper>
  );
}
