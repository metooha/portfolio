import * as React from 'react';
import {useViewport} from '@/app/components/utils/Layout';
import {Alert} from '@/app/components/Alert/Alert';
import {Body, Caption, Display, Heading} from '@/app/components/Text/Text';
import {Badge} from '@/app/components/Badge/Badge';
import {Breadcrumb, BreadcrumbItem} from '@/app/components/Breadcrumb/Breadcrumb';
import {Button} from '@/app/components/Button/Button';
import {Callout} from '@/app/components/Callout/Callout';
import {Card, CardContent, CardHeader} from '@/app/components/Card/Card';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {Chip} from '@/app/components/Chip/Chip';
import {ContentMessage} from '@/app/components/ContentMessage/ContentMessage';
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableCellStatus,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from '@/app/components/DataTable/DataTable';
import {DatePicker} from '@/app/components/DatePicker/DatePicker';
import {Divider} from '@/app/components/Divider/Divider';
import {FormGroup} from '@/app/components/FormGroup/FormGroup';
import {IconButton} from '@/app/components/IconButton/IconButton';
import {IconSelector} from '@/app/components/IconSelector/IconSelector';
import {Link} from '@/app/components/Link/Link';
import {LinkButton} from '@/app/components/LinkButton/LinkButton';
import {List, ListItem} from '@/app/components/List/List';
import {MagicBox} from '@/app/components/MagicBox/MagicBox';
import {Metric} from '@/app/components/Metric/Metric';
import {Nudge} from '@/app/components/Nudge/Nudge';
import {ProgressIndicator} from '@/app/components/ProgressIndicator/ProgressIndicator';
import {ProgressTracker, ProgressTrackerItem} from '@/app/components/ProgressTracker/ProgressTracker';
import {Radio} from '@/app/components/Radio/Radio';
import {Rating} from '@/app/components/Rating/Rating';
import {RichTextEditor} from '@/app/components/RichTextEditor/RichTextEditor';
import {Select} from '@/app/components/Select/Select';
import {Skeleton} from '@/app/components/Skeleton/Skeleton';
import {Spinner} from '@/app/components/Spinner/Spinner';
import {SpotIcon} from '@/app/components/SpotIcon/SpotIcon';
import {Switch} from '@/app/components/Switch/Switch';
import {TabNavigation, TabNavigationItem} from '@/app/components/TabNavigation/TabNavigation';
import {Tag} from '@/app/components/Tag/Tag';
import {TextArea} from '@/app/components/TextArea/TextArea';
import {TextField} from '@/app/components/TextField/TextField';
import {Icon, SearchIcon, SettingsIcon, StarIcon, XIcon} from '@/app/components/Icons/Icons';
import {ItemTile} from '@/app/components/patterns/ItemTile/ItemTile';
import {SignatureTrigger} from '@/app/components/SignatureCapture/SignatureCapture';
import {UploadImage} from '@/app/components/UploadImage/UploadImage';
import {TimerView} from '@/app/components/TimerView/TimerView';
import './OverviewPage.css';

import {Slider} from '@/app/components/Slider/Slider';

// Extra Component Imports
import {Tree} from '@/app/components/SideNavigation/Tree';

import {Avatar} from '@/app/components/Avatar/Avatar';
import {Accordion, AccordionItem, AccordionHeader, AccordionPanel} from '@/app/components/patterns/Accordion/Accordion';
import {SpinButton} from '@/app/components/SpinButton/SpinButton';
import {Tooltip} from '@/app/components/Tooltip/Tooltip';
import {FluentMenu, FluentMenuTrigger, FluentMenuList, FluentMenuItem} from '@/app/components/FluentMenu/FluentMenu';
// WCP Component Imports
import {BasicBanner} from '@/app/components/BasicBanner/BasicBanner';
import {ActionGroup} from '@/app/components/ActionGroup';
import {Flag} from '@/app/components/Flag/Flag';
import {FloatingButton} from '@/app/components/FloatingButton/FloatingButton';
import {HeartView} from '@/app/components/HeartView/HeartView';
import {SearchBar} from '@/app/components/SearchBar/SearchBar';

// WCP Pattern Preview Imports
import {Header} from '@/app/components/patterns/Header/Header';
import {AccountSideNav} from '@/app/components/patterns/AccountSideNav/AccountSideNav';
import {OrderCard} from '@/app/components/patterns/OrderCard/OrderCard';
import {OrderStatusBanner} from '@/app/components/patterns/OrderStatusBanner/OrderStatusBanner';
import {QueueBanner} from '@/app/components/patterns/QueueBanner/QueueBanner';
import {SearchResultsHeader} from '@/app/components/patterns/SearchResultsHeader/SearchResultsHeader';
import {SearchFilterBar} from '@/app/components/patterns/SearchFilterBar/SearchFilterBar';
import {Gauge} from '@/app/components/Gauge/Gauge';
import {BottomNav} from '@/app/components/BottomNav/BottomNav';
import {NewArrivalsCarousel} from '@/app/components/patterns/NewArrivalsCarousel/NewArrivalsCarousel';
import {PRODUCT_IMAGES} from '@/app/components/common/productImages';


/* ── Types ────────────────────────────────────────────────────── */

interface ComponentEntry {
  title: string;
  description: string;
  id: string;
  preview?: React.ReactNode;
}

/* ── Core Component Entries ───────────────────────────────────── */

const calloutPreviewTriggerRef = React.createRef<HTMLButtonElement>();

const coreComponentEntries: ComponentEntry[] = [
  {
    title: 'Alert', description: 'Banner messages for info, success, warning, and error states', id: 'components-alert',
    preview: <Alert variant="info" title="Informational">This is an informational alert.</Alert>,
  },
  {
    title: 'Badge', description: 'Count badges, status indicators, and semantic color variants', id: 'components-badge',
    preview: (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Badge color="blue">3</Badge>
        <Badge color="green">12</Badge>
        <Badge color="red">5</Badge>
      </div>
    ),
  },
  {
    title: 'Bottom Sheet', description: 'Slide-up overlays anchored to the bottom of the screen', id: 'components-bottom-sheet',
    preview: (
      <div
        inert=""
        style={{
          width: '100%',
          height: 56,
          borderRadius: '12px 12px 0 0',
          background: 'var(--ld-semantic-color-surface)',
          boxShadow: 'var(--ld-semantic-elevation-200)',
          border: '1px solid var(--ld-semantic-color-separator)',
          borderBottom: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 8,
        }}
      >
        <div style={{width: 32, height: 4, borderRadius: 2, background: 'var(--ld-semantic-color-separator)'}} />
        <Body as="span" size="small" weight="alt" style={{marginTop: 12}}>Bottom Sheet</Body>
      </div>
    ),
  },
  {
    title: 'Breadcrumb', description: 'Navigation breadcrumbs with support for 2-5 levels', id: 'components-breadcrumb',
    preview: (
      <Breadcrumb>
        <BreadcrumbItem key="home" href="#">Home</BreadcrumbItem>
        <BreadcrumbItem key="products" href="#">Products</BreadcrumbItem>
        <BreadcrumbItem key="current" href="#" isCurrent>Current</BreadcrumbItem>
      </Breadcrumb>
    ),
  },
  {
    title: 'Button', description: 'Primary, secondary, tertiary, and destructive button variants', id: 'components-button',
    preview: (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
    ),
  },
  {
    title: 'Card', description: 'Card containers with headers, actions, and content areas', id: 'components-card',
    preview: (
      <Card>
        <CardHeader title="Card Title" />
        <CardContent><Body as="p" size="small" color="subtle" style={{margin: 0}}>Card content area</Body></CardContent>
      </Card>
    ),
  },
  {
    title: 'Callout', description: 'Contextual overlays for onboarding or helper messaging', id: 'components-callout',
    preview: (
      <Callout
        a11yContentLabel="Learn more about damage reports."
        isOpen={false}
        onClose={() => {}}
        position="bottomRight"
        triggerRef={calloutPreviewTriggerRef}
        trigger={<Button ref={calloutPreviewTriggerRef} variant="primary">Damage report</Button>}
      >
        Use this control to learn more about damage reports.
      </Callout>
    ),
  },
  {
    title: 'Checkbox', description: 'Single and grouped checkboxes with indeterminate state', id: 'components-checkbox',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Checkbox label="Checked" checked onChange={() => {}} />
        <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
      </div>
    ),
  },
  {
    title: 'Chip', description: 'Interactive, selectable buttons for categories and selections', id: 'components-chip',
    preview: (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Chip selected>Selected</Chip>
        <Chip>Default</Chip>
      </div>
    ),
  },
  {
    title: 'Content Message', description: 'Full-page state messages for errors and permissions', id: 'components-content-message',
    preview: <ContentMessage title="No Results Found"><p style={{ margin: 0, fontSize: '13px' }}>Try adjusting your search.</p></ContentMessage>,
  },
  {
    title: 'Data Table', description: 'Tabular layout for displaying structured rows and columns', id: 'components-data-table',
    preview: (
      <div style={{ overflowX: 'auto' }} tabIndex={0}>
        <DataTable>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader>ID</DataTableHeader>
              <DataTableHeader>Name</DataTableHeader>
              <DataTableHeader alignment="right">Away Missions</DataTableHeader>
              <DataTableHeader>Status</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            <DataTableRow>
              <DataTableCell>1</DataTableCell>
              <DataTableCell>James T. Kirk</DataTableCell>
              <DataTableCell variant="numeric">96</DataTableCell>
              <DataTableCellStatus>
                <Tag variant="tertiary" color="purple">Deceased</Tag>
              </DataTableCellStatus>
            </DataTableRow>
            <DataTableRow>
              <DataTableCell>2</DataTableCell>
              <DataTableCell>Jean-Luc Picard</DataTableCell>
              <DataTableCell variant="numeric">239</DataTableCell>
              <DataTableCellStatus>
                <Tag variant="tertiary" color="positive">Active duty</Tag>
              </DataTableCellStatus>
            </DataTableRow>
          </DataTableBody>
        </DataTable>
      </div>
    ),
  },
  {
    title: 'Date Picker', description: 'Calendar-assisted date selection for single-date workflows', id: 'components-date-picker',
    preview: (
      <div style={{ maxWidth: '220px' }}>
        <DatePicker
          isOpen={false}
          label="Date (MM/DD/YYYY)"
          locale="en-US"
          onClose={() => {}}
          onOpen={() => {}}
          onSelect={() => {}}
          size="large"
          value={new Date(2026, 1, 25)}
        />
      </div>
    ),
  },
  {
    title: 'Divider', description: 'Horizontal separators for content sections', id: 'components-divider',
    preview: (
      <div>
        <Body as="p" size="small" color="subtle" style={{margin: '0 0 8px'}}>Above</Body>
        <Divider />
        <Body as="p" size="small" color="subtle" style={{margin: '8px 0 0'}}>Below</Body>
      </div>
    ),
  },
  {
    title: 'Form Group', description: 'Fieldset containers for checkbox and radio groups', id: 'components-form-group',
    preview: (
      <FormGroup label="Select interests">
        <Checkbox label="Design" onChange={() => {}} />
        <Checkbox label="Code" onChange={() => {}} />
      </FormGroup>
    ),
  },
  {
    title: 'Icons', description: 'Icon font gallery with categorized glyphs and labels', id: 'icons',
    preview: (
      <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
        <Icon name="Search" decorative style={{fontSize: 24}} />
        <Icon name="Home" decorative style={{fontSize: 24}} />
        <Icon name="User" decorative style={{fontSize: 24}} />
      </div>
    ),
  },
  {
    title: 'Icon Button', description: 'Icon-only buttons for compact actions', id: 'components-icon-button',
    preview: (
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <IconButton a11yLabel="Settings"><SettingsIcon /></IconButton>
        <IconButton a11yLabel="Search"><SearchIcon /></IconButton>
        <IconButton a11yLabel="Close"><XIcon /></IconButton>
      </div>
    ),
  },
  {
    title: 'Icon Selector', description: 'Binary on/off icon controls with paired icons', id: 'components-icon-selector',
    preview: (
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <IconSelector a11yLabel="Favorite" iconUnselected={<Icon name="Heart" />} iconSelected={<Icon name="HeartFill" />} />
        <IconSelector a11yLabel="Bookmark" defaultSelected iconUnselected={<Icon name="Bookmark" />} iconSelected={<Icon name="BookmarkFill" />} />
        <IconSelector a11yLabel="Star" color="primary" defaultSelected iconUnselected={<Icon name="Star" />} iconSelected={<Icon name="StarFill" />} />
      </div>
    ),
  },
  {
    title: 'Link Button', description: 'Link-styled interactive elements with icon support', id: 'components-link-button',
    preview: <LinkButton>Default Link Button</LinkButton>,
  },
  {
    title: 'Link', description: 'Text links with semantic color variants', id: 'components-link',
    preview: <Link href="#">Default Link</Link>,
  },
  {
    title: 'List', description: 'Vertical lists with leading icons and trailing content', id: 'components-list',
    preview: (
      <List>
        <ListItem key="first">First item</ListItem>
        <ListItem key="second">Second item</ListItem>
        <ListItem key="third">Third item</ListItem>
      </List>
    ),
  },
  {
    title: 'Component Provider', description: 'Root-level provider utilities and context orchestration', id: 'components-provider',
    preview: (
      <pre
        inert=""
        style={{
          margin: 0,
          padding: 12,
          borderRadius: 6,
          background: 'var(--ld-semantic-color-fill-subtle)',
          border: '1px solid var(--ld-semantic-color-separator)',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 12,
          lineHeight: 1.5,
          color: 'var(--ld-semantic-color-text)',
          whiteSpace: 'pre',
          overflow: 'hidden',
        }}
      >{`<LivingDesignProvider
  defaultBreakpoint="large"
>
  <App />
</LivingDesignProvider>`}</pre>
    ),
  },
  {
    title: 'Magic Box', description: 'AI-powered loading animation with sparkle effects', id: 'components-magic-box',
    preview: (
      <MagicBox active state="loading" borderRadius="200">
        <div
          style={{
            backgroundColor: 'var(--ld-semantic-color-surface)',
            border: '1px solid var(--ld-semantic-color-border-subtle)',
            borderRadius: 16,
            padding: 24,
            textAlign: 'center',
          }}
        >
          <Body as="p" size="medium" weight="alt" style={{margin: '0 0 4px'}}>AI is generating your content…</Body>
          <Body as="p" size="small" color="subtle" style={{margin: 0}}>The glowing border appears only while AI is active.</Body>
        </div>
      </MagicBox>
    ),
  },
  {
    title: 'Metric', description: 'Display critical data points with trend indicators', id: 'components-metric',
    preview: <Metric title="Impressions" value="1.2M" />,
  },
  {
    title: 'Modal', description: 'Centered overlay dialogs with size variants', id: 'components-modal',
    preview: (
      <div
        inert=""
        style={{
          width: '100%',
          padding: 16,
          borderRadius: 8,
          background: 'var(--ld-semantic-color-surface)',
          border: '1px solid var(--ld-semantic-color-separator)',
          boxShadow: 'var(--ld-semantic-elevation-300)',
        }}
      >
        <Body as="span" size="medium" weight="alt">Confirm action</Body>
        <Body as="p" size="small" color="subtle" style={{margin: '4px 0 12px'}}>This will apply changes to your account.</Body>
        <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
          <Button size="small" variant="secondary">Cancel</Button>
          <Button size="small" variant="primary">Confirm</Button>
        </div>
      </div>
    ),
  },
  {
    title: 'Nudge', description: 'Non-critical supportive information with actions', id: 'components-nudge',
    preview: <Nudge title="Did you know?"><p style={{ margin: 0, fontSize: '13px' }}>Keyboard shortcuts speed things up.</p></Nudge>,
  },
  {
    title: 'Panel', description: 'Slide-out panels for supplemental content', id: 'components-panel',
    preview: (
      <div
        inert=""
        style={{
          width: '100%',
          height: 80,
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'var(--ld-semantic-color-fill-subtle)',
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '60%',
            background: 'var(--ld-semantic-color-surface)',
            borderLeft: '1px solid var(--ld-semantic-color-separator)',
            boxShadow: 'var(--ld-semantic-elevation-200)',
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <Body as="span" size="small" weight="alt">Panel title</Body>
          <Body as="span" size="small" color="subtle">Supplemental content</Body>
        </div>
      </div>
    ),
  },
  {
    title: 'Progress Indicator', description: 'Linear progress indicators for loading states', id: 'components-progress-indicator',
    preview: <ProgressIndicator label="Uploading…" value={60} valueLabel="60%" />,
  },
  {
    title: 'Progress Tracker', description: 'Step-by-step progress visualization', id: 'components-progress-tracker',
    preview: (
      <ProgressTracker activeIndex={1}>
        <ProgressTrackerItem>Setup</ProgressTrackerItem>
        <ProgressTrackerItem>Details</ProgressTrackerItem>
        <ProgressTrackerItem>Review</ProgressTrackerItem>
      </ProgressTracker>
    ),
  },
  {
    title: 'Radio', description: 'Mutually exclusive selection within a group', id: 'components-radio',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Radio name="preview-radio" value="a" label="Option A" checked onChange={() => {}} />
        <Radio name="preview-radio" value="b" label="Option B" onChange={() => {}} />
      </div>
    ),
  },
  {
    title: 'Rating', description: 'Star ratings with whole and half-star values', id: 'components-rating',
    preview: <Rating value={4} />,
  },
  {
    title: 'Rich Text Editor', description: 'Formatted multi-line input with a styling toolbar', id: 'components-rich-text-editor',
    preview: (
      <div style={{maxWidth: 'min(280px, 100%)'}}>
        <RichTextEditor label="Description" toolbar={['bold', 'italic', 'bulletList']} placeholder="Start typing…" />
      </div>
    ),
  },
  {
    title: 'Select', description: 'Dropdown select with error states and accessibility', id: 'components-select',
    preview: (
      <div style={{ maxWidth: '240px' }}>
        <Select label="Choose option" onChange={() => {}}>
          <option value="">Select…</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
      </div>
    ),
  },
  {
    title: 'Skeleton', description: 'Loading placeholder animations for content', id: 'components-skeleton',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Skeleton height="14px" width="60%" />
        <Skeleton height="14px" width="100%" />
        <Skeleton height="14px" width="80%" />
      </div>
    ),
  },
  {
    title: 'Spinner', description: 'Loading indicators with color and size variants', id: 'components-spinner',
    preview: <Spinner size="small" a11yLabel="Loading" />,
  },
  {
    title: 'Spot Icon', description: 'Decorative icon containers with color variants', id: 'components-spot-icon',
    preview: (
      <div style={{ display: 'flex', gap: '12px' }}>
        <SpotIcon color="brand"><StarIcon /></SpotIcon>
        <SpotIcon color="neutral"><SettingsIcon /></SpotIcon>
      </div>
    ),
  },
  {
    title: 'Switch', description: 'Toggle controls for binary on/off settings', id: 'components-switch',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Switch label="Enabled" isOn={true} />
        <Switch label="Disabled" isOn={false} />
      </div>
    ),
  },
  {
    title: 'Tab Navigation', description: 'Page-level navigation tabs with selected state', id: 'components-tab-navigation',
    preview: (
      <TabNavigation>
        <TabNavigationItem href="#" isCurrent>Overview</TabNavigationItem>
        <TabNavigationItem href="#">Settings</TabNavigationItem>
      </TabNavigation>
    ),
  },
  {
    title: 'Tag', description: 'Non-interactive label for item attributes, status, or short metadata', id: 'components-tag',
    preview: (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Tag color="brand">Brand</Tag>
        <Tag color="info">Info</Tag>
        <Tag color="positive">Success</Tag>
      </div>
    ),
  },
  {
    title: 'Text Area', description: 'Multi-line text input with character counting', id: 'components-text-area',
    preview: (
      <div style={{ maxWidth: '280px' }}>
        <TextArea label="Description" onChange={() => {}} textAreaProps={{ rows: 2 }} />
      </div>
    ),
  },
  {
    title: 'Text Field', description: 'Single-line text inputs with labels and error states', id: 'components-text-field',
    preview: (
      <div style={{ maxWidth: '280px' }}>
        <TextField label="Email" onChange={() => {}} />
      </div>
    ),
  },
];

/* ── Extra Component Entries ──────────────────────────────────── */

const extraComponentEntries: ComponentEntry[] = [
  {
    title: 'Accordion',
    description: 'Expandable sections for organizing content into collapsible panels',
    id: 'components-accordion',
    preview: (
      <Accordion defaultOpenItems={['1']}>
        <AccordionItem value="1">
          <AccordionHeader>Section One</AccordionHeader>
          <AccordionPanel>Content for the first section.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionHeader>Section Two</AccordionHeader>
          <AccordionPanel>Content for the second section.</AccordionPanel>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    title: 'Avatar',
    description: 'User identity with image, initials, or icon fallback in multiple sizes',
    id: 'components-avatar',
    preview: (
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Avatar a11yLabel="John Doe" name="John Doe" size="small" />
        <Avatar a11yLabel="Jane Smith" name="Jane Smith" size="medium" color="neutral" />
        <Avatar a11yLabel="User photo" image={{src: 'https://via.placeholder.com/40', alt: 'User'}} size="large" />
      </div>
    ),
  },
  {
    title: 'Menu',
    description: 'Click-triggered dropdown menu with keyboard navigation and positioning',
    id: 'components-menu',
    preview: (
      <FluentMenu>
        <FluentMenuTrigger>
          <Button variant="secondary" size="small">Open Menu</Button>
        </FluentMenuTrigger>
        <FluentMenuList>
          <FluentMenuItem>Edit</FluentMenuItem>
          <FluentMenuItem>Duplicate</FluentMenuItem>
          <FluentMenuItem>Delete</FluentMenuItem>
        </FluentMenuList>
      </FluentMenu>
    ),
  },
  {
    title: 'Slider',
    description: 'Range inputs for selecting values along a track with optional labels and tick marks',
    id: 'components-slider',
    preview: (
      <div style={{ maxWidth: '240px' }}>
        <Slider ariaLabel="Adjust value" value={[60]} />
      </div>
    ),
  },
  {
    title: 'SpinButton',
    description: 'Numeric input with increment/decrement buttons and keyboard control',
    id: 'components-spinbutton',
    preview: (
      <div style={{ maxWidth: '180px' }}>
        <SpinButton label="Quantity" value={5} min={0} max={99} />
      </div>
    ),
  },
  {
    title: 'Tooltip',
    description: 'Hover/focus-triggered contextual information with positioning',
    id: 'components-tooltip',
    preview: (
      <Tooltip content="This is helpful information" position="topCenter">
        <Button variant="secondary" size="small">Hover me</Button>
      </Tooltip>
    ),
  },
  {
    title: 'Tree',
    description: 'Hierarchical tree view for displaying nested data with expand/collapse',
    id: 'components-tree',
    preview: (
      <Tree
        label="Files"
        data={[
          {id: 'components-1', label: 'Documents', children: [
            {id: 'components-1-1', label: 'Reports'},
            {id: 'components-1-2', label: 'Invoices'},
          ]},
          {id: 'components-2', label: 'Images', children: [
            {id: 'components-2-1', label: 'Photos'},
          ]},
          {id: 'components-3', label: 'README.md'},
        ]}
        defaultExpandedIds={['1']}
      />
    ),
  },
];

/* ── WCP Component Entries ────────────────────────────────────── */

const wcpComponentEntries: ComponentEntry[] = [
  {
    title: 'Basic Banner',
    description: 'Promotional banners with brand, default, and inverse variants',
    id: 'components-basic-banner',
    preview: <BasicBanner text="New items available" variant="brand" />,
  },
  {
    title: 'Action Group',
    description: 'Structured primary/secondary action pair with prescribed variants',
    id: 'components-action-group',
    preview: <ActionGroup preferredLabel="Add to cart" alternateLabel="Save for later" />,
  },
  {
    title: 'Country Select',
    description: 'Country selection with bottom sheet and dropdown variants',
    id: 'components-country-select',
    preview: (
      <div
        inert=""
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          borderRadius: 6,
          background: 'var(--ld-semantic-color-surface)',
          border: '1px solid var(--ld-semantic-color-separator)',
        }}
      >
        <span style={{fontSize: 18}}>🇺🇸</span>
        <Body as="span" size="small">United States</Body>
        <Icon name="ChevronDown" decorative style={{fontSize: 14, color: 'var(--ld-semantic-color-text-subtle)'}} />
      </div>
    ),
  },
  {
    title: 'Flag',
    description: 'Promotional flags for best seller, savings, and scarcity indicators',
    id: 'components-flag',
    preview: (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Flag label="Best Seller" variant="confidence" />
        <Flag label="Rollback" variant="savings-bold" />
      </div>
    ),
  },
  {
    title: 'Floating Button',
    description: 'Floating action button with multiple sizes',
    id: 'components-floating-button',
    preview: (
      <FloatingButton aria-label="Add">
        <span style={{ fontSize: '20px', lineHeight: 1 }}>+</span>
      </FloatingButton>
    ),
  },
  {
    title: 'Heart View',
    description: 'Animated heart/favorite toggle with list integration',
    id: 'components-heart-view',
    preview: (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <HeartView activated />
        <HeartView />
      </div>
    ),
  },
  {
    title: 'Item Tile',
    description: 'Product tile with image, pricing, badges, and heart',
    id: 'components-item-tile',
    preview: (
      <div style={{maxWidth: 200}}>
        <ItemTile
          image={PRODUCT_IMAGES.headphones}
          name="Wireless Headphones"
          price="$99"
          cents=".99"
          originalPrice="$149.99"
          badge={{label: 'Rollback', type: 'rollback'}}
        />
      </div>
    ),
  },
  {
    title: 'Rich Media Sheet',
    description: 'Bottom sheet with rich media content and multiple header variants',
    id: 'components-rich-media-sheet',
    preview: (
      <div
        inert=""
        style={{
          width: '100%',
          borderRadius: '12px 12px 0 0',
          background: 'var(--ld-semantic-color-surface)',
          border: '1px solid var(--ld-semantic-color-separator)',
          borderBottom: 'none',
          overflow: 'hidden',
        }}
      >
        <div style={{height: 60, background: 'var(--ld-semantic-color-fill-accent-blue-subtle)'}} />
        <div style={{padding: 12, display: 'flex', alignItems: 'center', gap: 8}}>
          <div style={{width: 24, height: 4, borderRadius: 2, background: 'var(--ld-semantic-color-separator)'}} />
          <Body as="span" size="small" weight="alt">Rich content</Body>
        </div>
      </div>
    ),
  },
  {
    title: 'Rich Snackbar',
    description: 'Enhanced snackbar notifications with color and layout variants',
    id: 'components-rich-snackbar',
    preview: (
      <div
        inert=""
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: 8,
          background: 'var(--ld-semantic-color-fill-inverse)',
          color: 'var(--ld-semantic-color-text-inverse)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: 'var(--ld-semantic-elevation-300)',
        }}
      >
        <Icon name="CheckCircle" decorative style={{fontSize: 18, color: 'var(--ld-semantic-color-text-inverse)'}} />
        <span style={{flex: 1, fontSize: 13, fontWeight: 600}}>Saved to your list</span>
        <span style={{fontSize: 13, textDecoration: 'underline'}}>Undo</span>
      </div>
    ),
  },
  {
    title: 'Search Bar',
    description: 'Search input with clear/cancel actions and mobile-friendly focus',
    id: 'components-search-bar',
    preview: <SearchBar value="" onChange={() => {}} placeholder="Search products..." />,
  },
  {
    title: 'Signature Capture',
    description: 'Canvas-based signature capture in panel and bottom sheet modes',
    id: 'components-signature-capture',
    preview: (
      <div style={{maxWidth: 280}}>
        <SignatureTrigger subText="Tap to sign your delivery receipt." onAgreeAndSign={() => {}} />
      </div>
    ),
  },
  {
    title: 'Timer View',
    description: 'Countdown timer with normal, warning, and critical urgency states',
    id: 'components-timer-view',
    preview: (
      <div style={{display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap'}}>
        <TimerView variant="waiting" timeDisplay="12:34" />
        <TimerView variant="warning" timeDisplay="02:15" />
        <TimerView variant="expiring" timeDisplay="00:42" />
      </div>
    ),
  },
  {
    title: 'Upload Image',
    description: 'Image upload with preview, compression, and multi-file support',
    id: 'components-upload-image',
    preview: (
      <div style={{maxWidth: 280}}>
        <UploadImage label="Add photos" subLabel="Up to 5" maxImages={5} />
      </div>
    ),
  },
];

/* ── WCP Pattern Entries ──────────────────────────────────────── */

const wcpPatternEntries: ComponentEntry[] = [
  {
    title: 'Carousels & Grids',
    description: 'Product card carousels, grids, and lists for browsing experiences',
    id: 'patterns-carousels-grids',
    preview: (
      <div style={{ overflow: 'hidden', borderRadius: '6px' }}>
        <NewArrivalsCarousel />
      </div>
    ),
  },
  {
    title: 'Data Viz',
    description: 'Gauge and Circular Progress for scores, health, and completion',
    id: 'patterns-data-viz',
    preview: (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
        <Gauge value={72} color="auto" label="Score" size={120} />
      </div>
    ),
  },
  {
    title: 'Footer Patterns',
    description: 'Desktop and mobile footer layouts with navigation links',
    id: 'patterns-footer',
    preview: (
      <div style={{ borderRadius: '6px', overflow: 'hidden' }}>
        <BottomNav contained />
      </div>
    ),
  },
  {
    title: 'Header',
    description: 'Mobile and desktop header patterns with search, nav, and delivery banners',
    id: 'patterns-header',
    preview: (
      <div style={{ borderRadius: '6px', overflow: 'hidden' }}>
          <Header mobileVariant="topnav-blue" />
      </div>
    ),
  },
  {
    title: 'Order Card Patterns',
    description: 'Order tracking cards for delivery, curbside, shipping, and auto care',
    id: 'patterns-order-card',
    preview: (
      <div style={{ borderRadius: '6px', overflow: 'hidden' }}>
        <OrderCard
          orderType="delivery"
          location="Carrollton Supercenter"
          statusHeading="Arriving tomorrow by 8pm"
          timelineStep="preparing"
          timelineVariant="delivery"
          products={[
            { src: PRODUCT_IMAGES.milk, alt: 'Milk' },
            { src: PRODUCT_IMAGES.eggs, alt: 'Eggs' },
            { src: PRODUCT_IMAGES.bananas, alt: 'Bananas' },
          ]}
          actions={[
            { label: 'Track order', variant: 'primary' },
            { label: 'View details', variant: 'secondary' },
          ]}
          orderTotal="$85.00"
        />
      </div>
    ),
  },
  {
    title: 'Order Status Cards',
    description: 'Order status banners and delayed delivery notification cards',
    id: 'patterns-order-status',
    preview: (
      <div style={{ borderRadius: '6px', overflow: 'hidden' }}>
        <OrderStatusBanner />
      </div>
    ),
  },
  {
    title: 'Queue Patterns',
    description: 'Queue management cards, banners, panels, and landing pages',
    id: 'patterns-queue',
    preview: (
      <div style={{ borderRadius: '6px', overflow: 'hidden' }}>
        <QueueBanner variant="lineJoined" timeDisplay="12 mins" />
      </div>
    ),
  },
  {
    title: 'Search Results',
    description: 'Search results header and filter bar patterns',
    id: 'patterns-search-results',
    preview: (
      <div style={{ borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <SearchResultsHeader query="headphones" />
        <SearchFilterBar chips={['Brand', 'Price', 'Rating']} />
      </div>
    ),
  },
  {
    title: 'Side Navigation',
    description: 'Account side navigation with grouped sections and icons',
    id: 'patterns-side-navigation',
    preview: (
      <div style={{ borderRadius: '6px', overflow: 'hidden', maxHeight: '200px' }}>
        <AccountSideNav />
      </div>
    ),
  },
];

/* ── Main Component ───────────────────────────────────────────── */

export default function OverviewPage({navigate}: {navigate: (r: string) => void}) {
  const {isAtLeastMedium, isAtLeastLarge} = useViewport();
  // Tighten the root padding and grid minmax on narrow viewports so cards
  // breathe without the sidebar slot eating horizontal space.
  const rootPadding = isAtLeastLarge ? '48px' : isAtLeastMedium ? '32px' : '20px';
  const gridMinmax = isAtLeastMedium ? '300px' : '240px';

  /* ── Card Renderer (one function for both component cards and
       wider pattern cards — the previous duplicate `renderPatternCard`
       was an exact copy and has been collapsed) ───────────────────── */

  const renderCard = (entry: ComponentEntry) => (
    <div
      key={entry.id}
      role="link"
      tabIndex={0}
      onClick={() => { navigate(entry.id); }}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(entry.id); } }}
      className="ld-overview-card"
    >
      {entry.preview && (
        <div className="ld-overview-card-preview">
          <div inert="" style={{width: '100%'}}>{entry.preview}</div>
        </div>
      )}
      <div style={{padding: 20}}>
        <Heading as="h3" size="small" style={{marginBottom: 16}}>{entry.title}</Heading>
        <Body as="p" size="small" color="subtle">{entry.description}</Body>
      </div>
    </div>
  );

  /* ── Section Divider ────────────────────────────────────────── */

  const SectionDivider = ({title, count}: {title: string; count: number}) => (
    <div style={{margin: '48px 0 24px', display: 'flex', alignItems: 'center', gap: 16}}>
      <Heading as="h2" size="medium" UNSAFE_style={{whiteSpace: 'nowrap'}}>{title}</Heading>
      <Badge color="blue">{count}</Badge>
      <div style={{flex: 1, height: 1, background: 'var(--ld-semantic-color-separator)'}} />
    </div>
  );

  return (
    <div style={{ padding: rootPadding, maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <Display as="h1" size="large" style={{ marginBottom: '8px' }}>Component Library</Display>
        <Body as="p" size="large" color="subtle" style={{ maxWidth: '600px' }}>
          A portable kit of reusable components.
          Each component follows the system specification with proper accessibility,
          semantic tokens, and responsive behavior.
        </Body>
      </div>

      {/* Core Components */}
      <SectionDivider title="Core Components" count={coreComponentEntries.length} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${gridMinmax}, 1fr))`,
        gap: '24px',
      }}>
        {coreComponentEntries.map(renderCard)}
      </div>

      {/* Extra Components */}
      <SectionDivider title="Extra Components" count={extraComponentEntries.length} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${gridMinmax}, 1fr))`,
        gap: '24px',
      }}>
        {extraComponentEntries.map(renderCard)}
      </div>

      {/* WCP Components */}
      <SectionDivider title="WCP Components" count={wcpComponentEntries.length} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${gridMinmax}, 1fr))`,
        gap: '24px',
      }}>
        {wcpComponentEntries.map(renderCard)}
      </div>

      {/* WCP Patterns */}
      <SectionDivider title="WCP Patterns" count={wcpPatternEntries.length} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '16px',
      }}>
        {wcpPatternEntries.map(renderCard)}
      </div>
    </div>
  );
}
