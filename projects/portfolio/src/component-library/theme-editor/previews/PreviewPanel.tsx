import * as React from 'react';
import {
  AgentCanvas,
  AgentResponse,
  Alert,
  Badge,
  Body,
  Button,
  ButtonGroup,
  Caption,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FilterChip,
  Heading,
  Icon,
  IconButton,
  Link,
  MetricGroup,
  ProcessingTrace,
  PromptComposer,
  PromptComposerDisclaimer,
  ScrollArea,
  SegmentedControl,
  Tag,
  TvIcon,
  UserResponse,
} from '@/app/components';
import {
  AgentSidebar,
  AgentSidebarContent,
  AgentSidebarFooter,
  AgentSidebarHeader,
  AgentSidebarItem,
  AgentSidebarProvider,
  AgentSidebarSection,
  AgentSidebarTextItem,
} from '@/app/components/patterns/AgentSidebar';
import type { CustomTheme } from '@/app/components/utils/customThemes';
import amyHaLogo from '@/app/assets/pages/profile/shared/amy-ha-logo.png';
import { CaseStudyTemplatePreview } from '../../CaseStudyTemplatePreview';
import { TypographyStylesPreviewPage } from '../../TypographyStylesPreviewPage';
import {
  AppNavPreview,
  CampaignDashboardPreview,
  type PreviewDevice,
} from '../../CampaignDashboardPreview';
import { PageExamplePicker } from '../PageExamplePicker';
import { ThemeEditorScrollRegion } from '../ThemeEditorScrollRegion';
import { ThemePreviewScope } from '../ThemePreviewScope';
import { ThemeColorA11yMonitor } from '../ThemeColorA11yMonitor';
import { BASE_SURFACE_TOKENS } from '../surfaceTokens';
import type { EditorTab, PreviewPageExample, PreviewView } from '../types';

/* ── live preview ──────────────────────────────────────────────── */


const PREVIEW_PAGE_MIN_HEIGHT = 'calc(100vh - 200px)';
const PREVIEW_AGENT_CANVAS_HEIGHT = '768px';

const PREVIEW_DEVICE_WIDTH: Record<PreviewDevice, string> = {
  desktop: '100%',
  mobile: '375px',
};

function PreviewDeviceSwitcher({
  value,
  onChange,
}: {
  value: PreviewDevice;
  onChange: (device: PreviewDevice) => void;
}) {
  const devices: { id: PreviewDevice; label: string; icon: React.ReactNode }[] = [
    { id: 'desktop', label: 'Desktop preview', icon: <TvIcon decorative /> },
    { id: 'mobile', label: 'Mobile preview', icon: <Icon name="Mobile" decorative /> },
  ];

  return (
    <div
      role="group"
      aria-label="Preview device"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
      }}
    >
      {devices.map((device) => (
        <IconButton
          key={device.id}
          a11yLabel={device.label}
          size="xsmall"
          color={value === device.id ? 'primary' : 'default'}
          aria-pressed={value === device.id}
          onClick={() => onChange(device.id)}
        >
          {device.icon}
        </IconButton>
      ))}
    </div>
  );
}

function ThemePreviewFrame({
  theme,
  device,
  children,
  fillPage = false,
  pageHeight,
}: {
  theme: CustomTheme;
  device: PreviewDevice;
  children: React.ReactNode;
  fillPage?: boolean;
  pageHeight?: string;
}) {
  const isConstrained = device !== 'desktop';
  const isFullPageDesktop = fillPage && !isConstrained;
  const resolvedPageHeight = pageHeight ?? PREVIEW_PAGE_MIN_HEIGHT;

  return (
    <div
      className="theme-editor-preview-chrome"
      style={{
        borderRadius: '10px',
        padding: isConstrained ? '16px 12px' : '12px',
        ...(isFullPageDesktop
          ? {
              height: resolvedPageHeight,
              minHeight: resolvedPageHeight,
              display: 'flex',
              flexDirection: 'column',
            }
          : {}),
      }}
    >
      <ThemePreviewScope
        theme={theme}
        className="theme-editor-preview-frame"
        style={{
          width: PREVIEW_DEVICE_WIDTH[device],
          maxWidth: '100%',
          margin: '0 auto',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: isConstrained ? '0 8px 24px rgba(0,0,0,0.12)' : 'none',
          ...(isFullPageDesktop
            ? {
                flex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
              }
            : {}),
        }}
      >
        {children}
      </ThemePreviewScope>
    </div>
  );
}

function SurfacePreviewCard({
  title,
  description,
  surfaceToken,
}: {
  title: string;
  description: string;
  surfaceToken: string;
}) {
  return (
    <Card
      size="small"
      UNSAFE_style={{
        background: `var(${surfaceToken})`,
        height: '100%',
      }}
    >
      <CardHeader title={title} />
      <CardContent>
        <Body as="p" color="subtle" style={{ margin: 0 }}>
          {description}
        </Body>
        <Caption as="p" color="subtlest" style={{ margin: '8px 0 0' }}>
          {surfaceToken}
        </Caption>
      </CardContent>
      <CardActions>
        <ButtonGroup>
          <Button variant="primary" size="small">Save</Button>
          <Button variant="secondary" size="small">Cancel</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}

function PreviewSeedSection({
  label,
  tokenLabel,
  children,
  noPadding,
}: {
  label: string;
  tokenLabel: string;
  children: React.ReactNode;
  noPadding?: boolean;
}) {
  return (
    <div
      style={{
        border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        borderRadius: '10px',
        background: 'var(--ld-semantic-color-surface, #fff)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '10px 14px',
          borderBottom: noPadding ? undefined : '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
        }}
      >
        <Caption
          as="span"
          color="subtlest"
          style={{ textTransform: 'uppercase', letterSpacing: '0.4px', fontWeight: 700 }}
        >
          {label}
        </Caption>
        <Caption
          as="span"
          color="subtle"
          style={{ fontSize: '11px', whiteSpace: 'nowrap' }}
        >
          {tokenLabel}
        </Caption>
      </div>
      <div style={{ padding: noPadding ? 0 : '14px' }}>{children}</div>
    </div>
  );
}

function ComponentsPreview({ device, theme }: { device: PreviewDevice; theme: CustomTheme }) {
  const [chipFilter, setChipFilter] = React.useState('all');

  return (
    <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ThemeColorA11yMonitor theme={theme} />
      <PreviewSeedSection label="Top navigation" tokenLabel="Top Navigation tokens" noPadding>
        <AppNavPreview appName="Amy Ha" device={device} />
      </PreviewSeedSection>

      {/* Positive + negative seeds — metrics */}
      <PreviewSeedSection label="Metrics" tokenLabel="Positive / Negative tokens">
        <MetricGroup
          metrics={[
            {
              title: 'Revenue',
              value: '48,200',
              unit: '$',
              variant: 'positiveUp',
              textLabel: '+12% vs last month',
            },
            {
              title: 'Orders',
              value: '1,834',
              variant: 'negativeDown',
              textLabel: '-3% vs last month',
            },
          ]}
        />
      </PreviewSeedSection>

      {/* Primary + secondary action tokens — buttons */}
      <PreviewSeedSection label="Buttons" tokenLabel="Primary / Secondary Action tokens">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <ButtonGroup>
            <Button variant="primary" size="small">Primary</Button>
            <Button variant="secondary" size="small">Secondary</Button>
            <Button variant="tertiary" size="small">Tertiary</Button>
            <Button variant="destructive" size="small">Destructive</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="primary" size="small">Primary sm</Button>
            <Button variant="secondary" size="small">Secondary sm</Button>
            <Button variant="tertiary" size="small">Tertiary sm</Button>
            <Button variant="destructive" size="small">Destructive sm</Button>
          </ButtonGroup>
        </div>
      </PreviewSeedSection>

      {/* Primary / brand seed — badges & tags */}
      <PreviewSeedSection label="Badges & tags" tokenLabel="Brand tokens">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge color="brand">3</Badge>
            <Badge color="brand">12</Badge>
            <Badge color="green">5</Badge>
            <Badge color="yellow">99</Badge>
            <Badge color="red">0</Badge>
            <Badge color="neutral">0</Badge>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Tag color="brand">Brand</Tag>
            <Tag color="positive">Positive</Tag>
            <Tag color="negative">Negative</Tag>
            <Tag color="warning">Warning</Tag>
            <Tag color="info">Info</Tag>
            <Tag color="purple">Purple</Tag>
          </div>
        </div>
      </PreviewSeedSection>

      {/* Surface / filter tokens — chips */}
      <PreviewSeedSection label="Chips" tokenLabel="Filter tokens">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['all', 'active', 'paused', 'draft'] as const).map((id) => (
            <FilterChip
              key={id}
              selected={chipFilter === id}
              onSelectedChange={(selected) => {
                if (selected) setChipFilter(id);
              }}
            >
              {id === 'all' ? 'All' : id.charAt(0).toUpperCase() + id.slice(1)}
            </FilterChip>
          ))}
        </div>
      </PreviewSeedSection>

      {/* Status seeds — alerts */}
      <PreviewSeedSection label="Alerts" tokenLabel="Status tokens">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Alert variant="info">Informational alert with a helpful message.</Alert>
          <Alert variant="success">Your changes were saved successfully.</Alert>
          <Alert variant="error">Something went wrong — please try again.</Alert>
          <Alert variant="warning">Double-check this field before continuing.</Alert>
        </div>
      </PreviewSeedSection>

      {/* Surface tokens — one card per surface style */}
      <PreviewSeedSection label="Surface" tokenLabel="Surface · subtle · brand">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '12px',
          }}
        >
          {BASE_SURFACE_TOKENS.map((row) => (
            <SurfacePreviewCard
              key={row.token}
              title={row.label}
              description={row.description}
              surfaceToken={row.token}
            />
          ))}
        </div>
      </PreviewSeedSection>

      {/* Warning seed — secondary semantic */}
      <PreviewSeedSection label="Links & controls" tokenLabel="Primary / Brand tokens">
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Text link</Link>
          <Link href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Brand link</Link>
        </div>
      </PreviewSeedSection>
    </div>
  );
}



function AgentCanvasPreview({
  device,
  onPromptSend,
}: {
  device: PreviewDevice;
  onPromptSend?: (prompt: string) => boolean;
}) {
  const isMobile = device === 'mobile';
  const [collapsed, setCollapsed] = React.useState(device !== 'desktop');

  React.useEffect(() => {
    setCollapsed(device !== 'desktop');
  }, [device]);

  const chatPane = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <div style={{ flex: 1, minHeight: 0, minWidth: 0, position: 'relative' }}>
        <ScrollArea UNSAFE_style={{ height: '100%', width: '100%', overflowX: 'hidden' }}>
          <div
            style={{
              display: 'grid',
              gap: '24px',
              padding: '8px 16px',
              width: '100%',
              minWidth: 0,
              boxSizing: 'border-box',
            }}
          >
            <div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                {['campaigns.csv', 'spend-report.q1'].map((file) => (
                  <span
                    key={file}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
                      background: 'var(--ld-semantic-color-surface-subtle, #f7f8f8)',
                      fontSize: '12px',
                      color: 'var(--ld-semantic-color-text-subtle, #515357)',
                    }}
                  >
                    <Icon name="Article" size="small" decorative />
                    {file}
                  </span>
                ))}
              </div>
              <UserResponse>Compare Q1 vs Q2 campaign spend and summarize the biggest drivers.</UserResponse>
            </div>

            <AgentResponse name="Assistant" hideAvatar timestamp="Just now">
              <div style={{ display: 'grid', gap: '12px' }}>
                <Body as="p" color="subtle" style={{ margin: 0 }}>
                  I pulled spend from your campaign exports and grouped the delta by channel.
                </Body>
                <ProcessingTrace state="success" label="Worked 6s · 3 tools" defaultOpen>
                  <ProcessingTrace.FileTool
                    name="campaigns.csv"
                    statusLabel="Done · 120ms"
                    icon={<Icon name="Article" decorative />}
                    maxHeight="72px"
                  >
                    {`campaign,channel,q1_spend,q2_spend\nSpring savings,Display,8200,12400\nBack to school,Search,6100,7800`}
                  </ProcessingTrace.FileTool>
                  <ProcessingTrace.FileTool
                    name="spend-report.q1"
                    statusLabel="Done · 95ms"
                    icon={<Icon name="Article" decorative />}
                    maxHeight="72px"
                  >
                    {`SELECT channel, SUM(spend) FROM campaigns\nWHERE quarter = 'Q1' GROUP BY channel;`}
                  </ProcessingTrace.FileTool>
                  <ProcessingTrace.FileTool
                    name="bash"
                    label="Compare channel totals"
                    statusLabel="Done · 240ms"
                    icon={<Icon name="Terminal" decorative />}
                    maxHeight="48px"
                  >
                    grep -E &quot;Display|Search|Social&quot; spend-report.q1
                  </ProcessingTrace.FileTool>
                </ProcessingTrace>
                <Body as="p" style={{ margin: 0 }}>
                  Q2 spend is up 12% overall. Spring savings and back-to-school campaigns drove most of the lift.
                </Body>
                <ol style={{ margin: 0, paddingLeft: '20px', display: 'grid', gap: '6px', fontSize: '14px', lineHeight: 1.5 }}>
                  <li>Display spend rose 18% quarter over quarter.</li>
                  <li>Search held steady while Social dipped slightly.</li>
                  <li>Spring savings alone accounts for 41% of the Q2 increase.</li>
                </ol>
                <Caption as="p" color="subtle" style={{ margin: 0 }}>
                  Full analysis opened in the canvas →
                </Caption>
              </div>
            </AgentResponse>
          </div>
        </ScrollArea>
      </div>
      <div
        style={{
          padding: '8px 16px',
          display: 'grid',
          gap: 0,
          borderTop: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
          flexShrink: 0,
          background: 'var(--ld-semantic-color-surface, #ffffff)',
        }}
      >
        <PromptComposer
          placeholder="Ask anything…"
          size={isMobile ? 'small' : 'small'}
          onSend={(value) => {
            onPromptSend?.(value);
          }}
        />
        <PromptComposerDisclaimer align="center">
          AI can make mistakes. Be certain to review important info.
        </PromptComposerDisclaimer>
      </div>
    </div>
  );

  const canvasDocument = (
    <>
      <Heading as="h2" size="medium" style={{ margin: '0 0 8px' }}>
        Q2 Campaign Spend Analysis
      </Heading>
      <Body as="p" color="subtle" style={{ margin: '0 0 16px', lineHeight: 1.5 }}>
        A quarter-over-quarter comparison of paid media spend across active campaigns,
        with channel-level breakdowns and testing notes.
      </Body>

      <Heading as="h3" size="small" style={{ margin: '0 0 8px' }}>Overview</Heading>
      <Body as="p" color="subtle" style={{ margin: '0 0 16px', lineHeight: 1.5 }}>
        Total spend increased from $38.2K in Q1 to $44.6K in Q2 (+12%). Display and search
        channels contributed the majority of growth while social spend remained flat.
      </Body>

      <Heading as="h3" size="small" style={{ margin: '0 0 8px' }}>Key findings</Heading>
      <ul style={{ margin: '0 0 16px', paddingLeft: '20px', display: 'grid', gap: '6px', fontSize: '14px', lineHeight: 1.5 }}>
        <li>Spring savings push added $4.2K incremental spend in Q2.</li>
        <li>Back-to-school preview is paused but still accruing draft budget.</li>
        <li>Display CTR improved 0.4 pts despite higher spend.</li>
      </ul>

      <Heading as="h3" size="small" style={{ margin: '0 0 8px' }}>By channel</Heading>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)' }}>
              <th style={{ padding: '8px 10px 8px 0', fontWeight: 600 }}>Channel</th>
              <th style={{ padding: '8px 10px', fontWeight: 600 }}>Q1</th>
              <th style={{ padding: '8px 10px', fontWeight: 600 }}>Q2</th>
              <th style={{ padding: '8px 0 8px 10px', fontWeight: 600 }}>Change</th>
            </tr>
          </thead>
          <tbody>
            {[
              { channel: 'Display', q1: '$18.4K', q2: '$21.7K', change: '+18%' },
              { channel: 'Search', q1: '$12.1K', q2: '$12.4K', change: '+2%' },
              { channel: 'Social', q1: '$7.7K', q2: '$7.5K', change: '−3%' },
            ].map((row) => (
              <tr key={row.channel} style={{ borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)' }}>
                <td style={{ padding: '10px 10px 10px 0' }}>{row.channel}</td>
                <td style={{ padding: '10px' }}>{row.q1}</td>
                <td style={{ padding: '10px' }}>{row.q2}</td>
                <td style={{ padding: '10px 0 10px 10px' }}>{row.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        minHeight: isMobile ? 360 : 0,
        overflow: 'hidden',
        background: 'var(--ld-semantic-color-surface, #ffffff)',
      }}
    >
      <AgentSidebarProvider collapsed={collapsed} onCollapsedChange={setCollapsed}>
        <div
          style={{
            display: 'flex',
            flex: 1,
            width: '100%',
            height: '100%',
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
        <AgentSidebar aria-label="Workspace">
          <AgentSidebarHeader
            logo={(
              <img
                src={amyHaLogo}
                alt=""
                style={{ display: 'block', height: '24px', width: 'auto' }}
              />
            )}
            title="Amy Ha"
          />
          <AgentSidebarContent>
            <AgentSidebarItem leading={<Icon name="Chat" decorative />} isCurrent>
              Chats
            </AgentSidebarItem>
            <AgentSidebarItem leading={<Icon name="Article" decorative />}>
              Docs
            </AgentSidebarItem>
            <AgentSidebarSection title="Recent chats" collapsible defaultExpanded>
              <AgentSidebarTextItem isCurrent>Campaign analysis</AgentSidebarTextItem>
              <AgentSidebarTextItem>Q2 planning</AgentSidebarTextItem>
              <AgentSidebarTextItem>Budget review</AgentSidebarTextItem>
            </AgentSidebarSection>
          </AgentSidebarContent>
          <AgentSidebarFooter
            type="avatar-button"
            avatar={{ a11yLabel: 'Amy Ha', name: 'AH', color: 'brand' }}
            label="Amy Ha"
            onClick={() => undefined}
          />
        </AgentSidebar>

        <div
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--ld-semantic-color-surface, #ffffff)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              height: '56px',
              flex: '0 0 56px',
              padding: '0 16px',
              boxSizing: 'border-box',
              borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
            }}
          >
            <IconButton
              a11yLabel={collapsed ? 'Show sidebar' : 'Hide sidebar'}
              color="tertiary"
              size="small"
              onClick={() => setCollapsed((value) => !value)}
            >
              <Icon name={collapsed ? 'LeftPanel' : 'LeftPanelFill'} decorative />
            </IconButton>
            <Body as="span" size="small" weight="alt">Campaign analysis</Body>
            <div style={{ flex: 1 }} />
            <IconButton a11yLabel="Share" color="tertiary" size="small">
              <Icon name="Share" decorative />
            </IconButton>
            <IconButton a11yLabel="More actions" color="tertiary" size="small">
              <Icon name="More" decorative />
            </IconButton>
          </div>

          <div
            style={{
              flex: 1,
              minHeight: 0,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {isMobile ? (
              chatPane
            ) : (
              <div
                style={{
                  flex: 1,
                  minHeight: 0,
                  minWidth: 0,
                  display: 'grid',
                  gridTemplateColumns: 'minmax(260px, 2fr) 2px minmax(300px, 3fr)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ minHeight: 0, minWidth: 0, overflow: 'hidden', display: 'flex' }}>
                  {chatPane}
                </div>
                <div
                  role="separator"
                  aria-orientation="vertical"
                  style={{ background: 'var(--ld-semantic-color-separator, #e3e4e5)' }}
                />
                <div
                  style={{
                    minHeight: 0,
                    minWidth: 0,
                    padding: '16px',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    display: 'flex',
                  }}
                >
                  <AgentCanvas
                    title="Q2 spend analysis"
                    linked
                    actions={<Tag color="brand">Document</Tag>}
                  >
                    {canvasDocument}
                  </AgentCanvas>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </AgentSidebarProvider>
    </div>
  );
}

function CaseStudyPreview() {
  return <CaseStudyTemplatePreview />;
}

function TypographyPreview() {
  return <TypographyStylesPreviewPage />;
}

function PageExamplePreview({
  example,
  device,
  onPromptSend,
}: {
  example: PreviewPageExample;
  device: PreviewDevice;
  onPromptSend?: (prompt: string) => boolean;
}) {
  const preview = (() => {
    switch (example) {
      case 'agentCanvas':
        return <AgentCanvasPreview device={device} onPromptSend={onPromptSend} />;
      case 'caseStudy':
        return <CaseStudyPreview />;
      default:
        return <CampaignDashboardPreview device={device} />;
    }
  })();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
        height: '100%',
      }}
    >
      {preview}
    </div>
  );
}


export function PreviewPanel({
  theme,
  fillHeight = false,
  editorTab,
  onPromptSend,
}: {
  theme: CustomTheme;
  fillHeight?: boolean;
  editorTab?: EditorTab;
  onPromptSend?: (prompt: string) => boolean;
}) {
  const [previewView, setPreviewView] = React.useState<PreviewView>('components');
  const [previewDevice, setPreviewDevice] = React.useState<PreviewDevice>('desktop');
  const [previewPageExample, setPreviewPageExample] = React.useState<PreviewPageExample>('campaign');
  const isPageFill = previewView === 'page' && previewDevice === 'desktop';
  const previewFrameHeight = previewPageExample === 'agentCanvas' ? PREVIEW_AGENT_CANVAS_HEIGHT : undefined;

  React.useEffect(() => {
    if (editorTab === 'typography') {
      setPreviewView('typography');
    }
  }, [editorTab]);

  return (
    <div
      className="theme-editor-card"
      style={{
        borderRadius: '12px',
        ...(fillHeight
          ? {
              height: '100%',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }
          : {}),
      }}
    >
      <div className="theme-editor-card__header">
        <SegmentedControl
          pattern="tablist"
          aria-label="Preview mode"
          value={previewView}
          onChange={(value) => setPreviewView(value as PreviewView)}
          items={[
            {
              value: 'components',
              label: 'Components',
              panelId: 'theme-preview-components',
              icon: <Icon name="Grid" decorative />,
            },
            {
              value: 'typography',
              label: 'Typography',
              panelId: 'theme-preview-typography',
              icon: <Icon name="Write" decorative />,
            },
            {
              value: 'page',
              label: 'Page Example',
              panelId: 'theme-preview-page',
              icon: <Icon name="Article" decorative />,
            },
          ]}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {previewView === 'page' && (
            <PageExamplePicker
              value={previewPageExample}
              onChange={setPreviewPageExample}
            />
          )}
          <PreviewDeviceSwitcher value={previewDevice} onChange={setPreviewDevice} />
        </div>
      </div>

      <ThemeEditorScrollRegion
        a11yLabel="Theme preview"
        rootStyle={fillHeight ? { flex: 1, minHeight: 0 } : undefined}
        style={{ padding: '14px' }}
      >
        <ThemePreviewFrame
          theme={theme}
          device={previewDevice}
          fillPage={isPageFill}
          pageHeight={previewFrameHeight}
        >
          {previewView === 'components' && (
            <div id="theme-preview-components" role="tabpanel">
              <ComponentsPreview device={previewDevice} theme={theme} />
            </div>
          )}
          {previewView === 'typography' && (
            <div id="theme-preview-typography" role="tabpanel">
              <TypographyPreview />
            </div>
          )}
          {previewView === 'page' && (
            <div
              id="theme-preview-page"
              role="tabpanel"
              style={
                isPageFill
                  ? { flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }
                  : undefined
              }
            >
              <PageExamplePreview
                key={previewPageExample}
                example={previewPageExample}
                device={previewDevice}
                onPromptSend={onPromptSend}
              />
            </div>
          )}
        </ThemePreviewFrame>
      </ThemeEditorScrollRegion>
    </div>
  );
}
