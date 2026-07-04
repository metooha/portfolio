import * as React from 'react';

import {AxBottomNav} from '@/app/components/patterns/AxBottomNav/AxBottomNav';
import '@/app/components/patterns/AxBottomNav/AxBottomNav.css';
import type {BottomNavTab} from '@/app/components/patterns/AxBottomNav/AxBottomNav';
import {MobileMenuPanel} from '@/app/components/patterns/MobileMenuPanel';
import {AppHeader} from '@/app/components/patterns/AppHeader/AppHeader';
import '@/app/components/patterns/AppHeader/AppHeader.css';
import type {
  AppHeaderPlatform,
  AppHeaderVariant,
} from '@/app/components/patterns/AppHeader/AppHeader';
import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Icon} from '@/app/components/Icons';
import {Panel} from '@/app/components/Panel/Panel';
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from '@/app/components/DataTable/DataTable';
import {Select} from '@/app/components/Select/Select';
import {Body, Heading} from '@/app/components/Text/Text';
import {TextField} from '@/app/components/TextField/TextField';
import {UploadImage, type UploadedImage} from '@/app/components/UploadImage/UploadImage';

import {ExampleSection, GuidelinesSection, PageWrapper} from '../shared';

type DeviceMode = 'mobile' | 'tablet';

type PageLevelExample = {
  name: string;
  description: string;
  props: {
    variant: AppHeaderVariant;
    platform?: AppHeaderPlatform;
    title: string;
    menuIconName: string;
    showAvatar?: boolean;
    showAction1?: boolean;
    showAction2?: boolean;
    action1IconName?: string;
    action2IconName?: string;
  };
  contentHint: string;
};

const PAGE_LEVELS: PageLevelExample[] = [
  {
    name: 'L1: For You',
    description: 'Top-level associate home surface with menu, screen title, chat shortcut, and associate avatar.',
    props: {
      variant: 'blue',
      title: 'For You',
      menuIconName: 'Menu',
      showAction1: true,
      action1IconName: 'Chat',
      showAvatar: true,
    },
    contentHint: 'For You content',
  },
  {
    name: "L1: Today's Plan",
    description: 'Top-level plan page using the same L1 navigation treatment with a page-specific title.',
    props: {
      variant: 'blue',
      title: "Today's Plan",
      menuIconName: 'Menu',
      showAction1: true,
      action1IconName: 'Chat',
      showAvatar: true,
    },
    contentHint: "Today's Plan content",
  },
  {
    name: 'L1: Your Team',
    description: 'Top-level team page variant with the standard L1 shortcut actions.',
    props: {
      variant: 'blue',
      title: 'Your Team',
      menuIconName: 'Menu',
      showAction1: true,
      action1IconName: 'Chat',
      showAvatar: true,
    },
    contentHint: 'Your Team content',
  },
  {
    name: 'Sub-page',
    description: 'Hierarchical child page with a back action and optional trailing shortcut.',
    props: {
      variant: 'blue',
      title: 'Screen Title',
      menuIconName: 'ChevronLeft',
      showAction1: true,
      action1IconName: 'Image',
      showAvatar: false,
    },
    contentHint: 'Sub-page content',
  },
  {
    name: 'Overlay',
    description: 'Overlay surface with a close action and optional trailing shortcut.',
    props: {
      variant: 'blue',
      title: 'Screen Title',
      menuIconName: 'Close',
      showAction1: true,
      action1IconName: 'Image',
      showAvatar: false,
    },
    contentHint: 'Overlay content',
  },
  {
    name: 'Assistant: Main',
    description: 'Assistant entry point with a white surface, close action, centered title, and help shortcut.',
    props: {
      variant: 'white',
      title: 'Screen Title',
      menuIconName: 'Close',
      showAction1: true,
      action1IconName: 'InfoCircle',
      showAvatar: false,
    },
    contentHint: 'Assistant content',
  },
  {
    name: 'Assistant: Sub-page',
    description: 'Assistant nested page with a white surface and back navigation.',
    props: {
      variant: 'white',
      title: 'Screen Title',
      menuIconName: 'ChevronLeft',
      showAction1: false,
      showAvatar: false,
    },
    contentHint: 'Assistant sub-page content',
  },
];

const MenuPanelIcon = ({name}: {name: string}) => (
  <Icon name={name} decorative size="medium" />
);

const UploadedMenuIcon = ({image}: {image: UploadedImage}) => (
  <img
    src={image.src}
    alt=""
    style={{display: 'block', width: 24, height: 24, objectFit: 'contain'}}
  />
);

const menuActionTiles = [
  {id: 'sidekick', label: 'Sidekick', icon: <MenuPanelIcon name="Magic" />},
  {id: 'scan', label: 'Scan item', icon: <MenuPanelIcon name="Barcode" />},
  {id: 'notes', label: 'Notes', icon: <MenuPanelIcon name="Note" />},
];

const menuFooterLinks = [
  {label: 'Give app feedback'},
  {label: 'Share an idea or concern', external: true},
  {label: 'Settings'},
  {label: "What's new"},
];

function getMenuSections(customFirstIcon?: React.ReactNode) {
  return [
    {
      id: 'me',
      label: 'Me',
      icon: customFirstIcon ?? <MenuPanelIcon name="User" />,
      title: 'Me',
      links: [
        {label: 'For you'},
        {label: 'Calls'},
        {label: 'Full schedule'},
        {label: 'Inbox'},
        {label: 'Your team'},
        {label: 'Time off requests'},
        {label: 'Translator', external: true},
        {label: 'My performance tracker'},
      ],
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: <MenuPanelIcon name="Box" />,
      title: 'Availability',
      links: [
        {label: 'Aisle locations'},
        {label: 'Features'},
        {label: 'Item information'},
        {label: 'Manager approvals'},
        {label: 'Modulars'},
        {label: 'Pinpoint'},
        {label: 'Price changes'},
        {label: 'Receiving'},
        {label: 'RFID scanning'},
        {label: 'Shelf availability'},
        {label: 'Topstock'},
        {label: 'VizPick'},
      ],
    },
    {
      id: 'checkout',
      label: 'Checkout\n& returns',
      icon: <MenuPanelIcon name="Receipt" />,
      title: 'Checkouts & returns',
      links: [
        {label: 'Checkout'},
        {label: 'Receipt check'},
        {label: 'Returns'},
      ],
    },
    {
      id: 'facility',
      label: 'Facility\nmanagement',
      icon: <MenuPanelIcon name="Facility" />,
      title: 'Facility management',
      links: [
        {label: 'Overview'},
        {label: 'Report an issue'},
        {label: 'Needs attention'},
        {label: 'Refrigeration alarms'},
        {label: 'Issues'},
        {label: 'Global issues'},
        {label: 'Schedule services'},
        {label: 'Shop GNRF', external: true},
        {label: 'Digital key'},
      ],
    },
  ];
}

const ICON_OPTIONS = ['Chat', 'Bell', 'Box', 'Image', 'More', 'Search', 'Share'];

function ToggleButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      size="small"
      variant={active ? 'primary' : 'secondary'}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function ControlGroup({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div style={{display: 'grid', gap: 8}}>
      <Body as="span" size="small" weight="alt">
        {label}
      </Body>
      {children}
    </div>
  );
}

function SelectControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <Select
      label={label}
      size="small"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
}

function OnOffControl({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <ControlGroup label={label}>
      <ButtonGroup>
        <ToggleButton active={checked} onClick={() => onChange(true)}>
          On
        </ToggleButton>
        <ToggleButton active={!checked} onClick={() => onChange(false)}>
          Off
        </ToggleButton>
      </ButtonGroup>
    </ControlGroup>
  );
}

function DeviceShell({children, isTablet = false}: {children: React.ReactNode; isTablet?: boolean}) {
  return (
    <div
      style={{
        width: isTablet ? 680 : 375,
        maxWidth: '100%',
        border: '8px solid #2E2F32',
        borderRadius: isTablet ? 24 : 40,
        overflow: 'hidden',
        position: 'relative',
        background: '#F2F2F7',
        boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.12)',
      }}
    >
      {children}
    </div>
  );
}

function PreviewContent({children, minHeight}: {children: React.ReactNode; minHeight: number}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight,
        color: 'var(--ld-semantic-color-text-subtle, #515357)',
        fontSize: 13,
      }}
    >
      {children}
    </div>
  );
}

function VariantFrame({level, isTablet = false}: {level: PageLevelExample; isTablet?: boolean}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const sections = React.useMemo(() => getMenuSections(), []);

  return (
    <div
      style={{
        border: '1px solid #E6E6E8',
        borderRadius: 8,
        background: '#ffffff',
        overflow: 'hidden',
      }}
    >
      <div style={{display: 'grid', gap: 6, padding: 16, borderBottom: '1px solid #E6E6E8'}}>
        <Heading as="h3" size="small" style={{margin: 0}}>
          {level.name}
        </Heading>
        <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: 1.5}}>
          {level.description}
        </Body>
      </div>
      <div style={{padding: 24, background: '#E6E6E8', overflowX: 'auto'}} tabIndex={0}>
        <DeviceShell isTablet={isTablet}>
          <AppHeader
            {...level.props}
            platform={level.props.platform ?? 'ios'}
            isTablet={isTablet}
            showAction2={level.props.showAction2 ?? false}
            showAction3={false}
            showAction4={false}
            onMenuClick={level.props.menuIconName === 'Menu' ? () => setMenuOpen(true) : undefined}
          />
          <MobileMenuPanel
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            clockLabel="Time clock"
            actionTiles={menuActionTiles}
            sections={sections}
            footerLinks={menuFooterLinks}
            isContainedOverlay
          />
          <PreviewContent minHeight={isTablet ? 400 : 220}>
            {level.contentHint}
          </PreviewContent>
        </DeviceShell>
      </div>
    </div>
  );
}

export default function NativeNavigationPage() {
  const [configPanelOpen, setConfigPanelOpen] = React.useState(false);
  const [device, setDevice] = React.useState<DeviceMode>('tablet');
  const [variant, setVariant] = React.useState<AppHeaderVariant>('blue');
  const [platform, setPlatform] = React.useState<AppHeaderPlatform>('ios');
  const [title, setTitle] = React.useState('Title');
  const [showSubtitle, setShowSubtitle] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [showAvatar, setShowAvatar] = React.useState(true);
  const [showAction1, setShowAction1] = React.useState(true);
  const [showAction2, setShowAction2] = React.useState(false);
  const [showAction3, setShowAction3] = React.useState(false);
  const [showAction4, setShowAction4] = React.useState(false);
  const [menuIcon, setMenuIcon] = React.useState('Menu');
  const [action1Icon, setAction1Icon] = React.useState('Chat');
  const [action2Icon, setAction2Icon] = React.useState('Box');
  const [action3Icon, setAction3Icon] = React.useState('Image');
  const [action4Icon, setAction4Icon] = React.useState('More');
  const [activeBottomTab, setActiveBottomTab] = React.useState<BottomNavTab>('for-you');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [baseMenuOpen, setBaseMenuOpen] = React.useState(false);
  const [uploadedMenuIcons, setUploadedMenuIcons] = React.useState<UploadedImage[]>([]);
  const isTablet = device === 'tablet';
  const uploadedMenuIcon = uploadedMenuIcons[0];
  const menuSections = React.useMemo(
    () => getMenuSections(uploadedMenuIcon ? <UploadedMenuIcon image={uploadedMenuIcon} /> : undefined),
    [uploadedMenuIcon],
  );

  return (
    <PageWrapper
      title="Native Navigation"
      category="Subsystem Components"
      description="Native navigation patterns for AX screens, including the top app header and bottom navigation used across iOS and Android app surfaces."
    >
      <ExampleSection
        title="Component Configuration"
        description="Interactive preview for testing device size, platform, surface color, title, and action combinations."
      >
        <div
          tabIndex={0}
          style={{
            display: 'grid',
            gap: 20,
            padding: 24,
            overflowX: 'auto',
            border: '1px solid #E6E6E8',
            borderRadius: 8,
            background: '#F7F7F8',
          }}
        >
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button
              type="button"
              variant="primary"
              onClick={(event) => {
                event.stopPropagation();
                window.setTimeout(() => setConfigPanelOpen(true), 0);
              }}
            >
              Open configuration panel
            </Button>
          </div>

          <div style={{display: 'flex', justifyContent: 'center'}}>
            <DeviceShell isTablet={isTablet}>
              <AppHeader
                variant={variant}
                platform={platform}
                isTablet={isTablet}
                title={title}
                showSubtitle={showSubtitle}
                subtitle="Subtitle"
                showSearch={showSearch}
                showAvatar={showAvatar}
                showAction1={showAction1}
                showAction2={showAction2}
                showAction3={showAction3}
                showAction4={showAction4}
                menuIconName={menuIcon}
                action1IconName={action1Icon}
                action2IconName={action2Icon}
                action3IconName={action3Icon}
                action4IconName={action4Icon}
                onMenuClick={menuIcon === 'Menu' ? () => setMenuOpen(true) : undefined}
              />
              <MobileMenuPanel
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
                clockLabel="Time clock"
                actionTiles={menuActionTiles}
                sections={menuSections}
                footerLinks={menuFooterLinks}
                isContainedOverlay
              />
              <PreviewContent minHeight={isTablet ? 680 : 600}>
                {variant === 'blue' ? 'Home page content' : 'Search results / inner page content'}
              </PreviewContent>
              <AxBottomNav
                contained
                platform={platform}
                activeTab={activeBottomTab}
                onTabChange={setActiveBottomTab}
              />
            </DeviceShell>
          </div>

          <Panel
            isOpen={configPanelOpen}
            onClose={() => setConfigPanelOpen(false)}
            position="right"
            size="medium"
            title="Configuration"
            actions={
              <Button type="button" variant="primary" onClick={() => setConfigPanelOpen(false)}>
                Done
              </Button>
            }
          >
            <div style={{display: 'grid', gap: 16}}>
            <ControlGroup label="Device">
              <ButtonGroup>
                <ToggleButton active={device === 'mobile'} onClick={() => setDevice('mobile')}>
                  Native Mobile
                </ToggleButton>
                <ToggleButton active={device === 'tablet'} onClick={() => setDevice('tablet')}>
                  Native Tablet
                </ToggleButton>
              </ButtonGroup>
            </ControlGroup>

            <ControlGroup label="Color variant">
              <ButtonGroup>
                <ToggleButton active={variant === 'blue'} onClick={() => setVariant('blue')}>
                  Blue (Home)
                </ToggleButton>
                <ToggleButton active={variant === 'white'} onClick={() => setVariant('white')}>
                  White (Search)
                </ToggleButton>
              </ButtonGroup>
            </ControlGroup>

            <ControlGroup label="OS Platform">
              <ButtonGroup>
                <ToggleButton active={platform === 'ios'} onClick={() => setPlatform('ios')}>
                  iOS
                </ToggleButton>
                <ToggleButton active={platform === 'android'} onClick={() => setPlatform('android')}>
                  Android
                </ToggleButton>
              </ButtonGroup>
            </ControlGroup>

            <ControlGroup label="Bottom nav active tab">
              <ButtonGroup>
                <ToggleButton active={activeBottomTab === 'for-you'} onClick={() => setActiveBottomTab('for-you')}>
                  For you
                </ToggleButton>
                <ToggleButton active={activeBottomTab === 'todays-plan'} onClick={() => setActiveBottomTab('todays-plan')}>
                  Today's Plan
                </ToggleButton>
                <ToggleButton active={activeBottomTab === 'your-team'} onClick={() => setActiveBottomTab('your-team')}>
                  Your team
                </ToggleButton>
                {platform === 'android' && (
                  <ToggleButton active={activeBottomTab === 'more'} onClick={() => setActiveBottomTab('more')}>
                    More
                  </ToggleButton>
                )}
              </ButtonGroup>
            </ControlGroup>

            <SelectControl
              label="Leading icon"
              value={menuIcon}
              options={['Menu', 'ChevronLeft', 'Close']}
              onChange={setMenuIcon}
            />

            <ControlGroup label="Menu section icon upload">
              <UploadImage
                images={uploadedMenuIcons}
                onChange={setUploadedMenuIcons}
                maxImages={1}
                label="Upload custom menu icon"
                subLabel="PNG, JPG, GIF, or SVG. Used for the first menu section."
                photoTip="Upload any image or SVG asset to preview it inside the mobile menu panel."
              />
            </ControlGroup>

            <TextField
              label="Title"
              size="small"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <OnOffControl label="Subtitle" checked={showSubtitle} onChange={setShowSubtitle} />
            <OnOffControl label="Search field" checked={showSearch} onChange={setShowSearch} />
            <OnOffControl label="Avatar button" checked={showAvatar} onChange={setShowAvatar} />
            <OnOffControl label="Action button 1" checked={showAction1} onChange={setShowAction1} />
            <SelectControl
              label="Action 1 icon"
              value={action1Icon}
              options={ICON_OPTIONS}
              onChange={setAction1Icon}
            />
            <OnOffControl label="Action button 2" checked={showAction2} onChange={setShowAction2} />
            <SelectControl
              label="Action 2 icon"
              value={action2Icon}
              options={ICON_OPTIONS}
              onChange={setAction2Icon}
            />
            <OnOffControl label="Action button 3" checked={showAction3} onChange={setShowAction3} />
            <SelectControl
              label="Action 3 icon"
              value={action3Icon}
              options={ICON_OPTIONS}
              onChange={setAction3Icon}
            />
            {isTablet && (
              <>
                <OnOffControl label="Action button 4" checked={showAction4} onChange={setShowAction4} />
                <SelectControl
                  label="Action 4 icon"
                  value={action4Icon}
                  options={ICON_OPTIONS}
                  onChange={setAction4Icon}
                />
              </>
            )}
            </div>
          </Panel>
        </div>
      </ExampleSection>

      <ExampleSection
        title="App Header"
        description="Base component example separated from the page-level preview gallery."
      >
        <div style={{display: 'grid', gap: 24}}>
          <div
            style={{
              display: 'grid',
              gap: 16,
              padding: 24,
              border: '1px solid #E6E6E8',
              borderRadius: 8,
              background: '#ffffff',
            }}
          >
            <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: 1.5}}>
              Use <code>AppHeader</code> directly when a screen needs the AX native header treatment. Pass a page-level configuration for navigation behavior, title, trailing actions, and avatar visibility.
            </Body>
          </div>

          <div
            tabIndex={0}
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: 24,
              overflowX: 'auto',
              border: '1px solid #E6E6E8',
              borderRadius: 8,
              background: '#F7F7F8',
            }}
          >
            <DeviceShell isTablet>
              <AppHeader
                variant="blue"
                platform="ios"
                isTablet
                title="For You"
                menuIconName="Menu"
                showAction1
                action1IconName="Chat"
                showAvatar
                onMenuClick={() => setBaseMenuOpen(true)}
              />
              <MobileMenuPanel
                isOpen={baseMenuOpen}
                onClose={() => setBaseMenuOpen(false)}
                clockLabel="Time clock"
                actionTiles={menuActionTiles}
                sections={menuSections}
                footerLinks={menuFooterLinks}
                isContainedOverlay
              />
              <PreviewContent minHeight={400}>App content</PreviewContent>
              <AxBottomNav contained platform="ios" activeTab="for-you" />
            </DeviceShell>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Bottom Nav"
        description="Native bottom navigation for primary app destinations. iOS uses a glassmorphic tab bar with the floating Squiggly agent affordance, while Android uses a material-style tab bar."
      >
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 24}}>
          <div
            style={{
              display: 'grid',
              gap: 16,
              padding: 24,
              border: '1px solid #E6E6E8',
              borderRadius: 8,
              background: '#F7F7F8',
            }}
          >
            <Heading as="h3" size="small" style={{margin: 0}}>
              Bottom Nav (iOS)
            </Heading>
            <DeviceShell>
              <PreviewContent minHeight={260}>App content above the nav bar</PreviewContent>
              <AxBottomNav contained platform="ios" activeTab="for-you" />
            </DeviceShell>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 16,
              padding: 24,
              border: '1px solid #E6E6E8',
              borderRadius: 8,
              background: '#F7F7F8',
            }}
          >
            <Heading as="h3" size="small" style={{margin: 0}}>
              Bottom Nav (Android)
            </Heading>
            <DeviceShell>
              <PreviewContent minHeight={260}>App content above the nav bar</PreviewContent>
              <AxBottomNav contained platform="android" activeTab="more" />
            </DeviceShell>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Page Levels"
        description="Named variants from the AX Figma component. Use these page levels to choose the correct leading navigation affordance, surface color, title treatment, and trailing actions."
      >
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))', gap: 24}}>
          {PAGE_LEVELS.map((level) => (
            <VariantFrame key={level.name} level={level} />
          ))}
        </div>
      </ExampleSection>

      <ExampleSection title="Import Reference">
        <DataTable>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader width="30%">Component</DataTableHeader>
              <DataTableHeader width="35%">Usage</DataTableHeader>
              <DataTableHeader>Import path</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            <DataTableRow>
              <DataTableCell>L1 page</DataTableCell>
              <DataTableCell>
                <code>{'<AppHeader variant="blue" title="For You" menuIconName="Menu" />'}</code>
              </DataTableCell>
              <DataTableCell>
                <code>../components/shared/AppHeader</code>
              </DataTableCell>
            </DataTableRow>
            <DataTableRow>
              <DataTableCell>Sub-page</DataTableCell>
              <DataTableCell>
                <code>{'<AppHeader title="Screen Title" menuIconName="ChevronLeft" showAvatar={false} />'}</code>
              </DataTableCell>
              <DataTableCell>
                <code>../components/shared/AppHeader</code>
              </DataTableCell>
            </DataTableRow>
            <DataTableRow>
              <DataTableCell>Assistant page</DataTableCell>
              <DataTableCell>
                <code>{'<AppHeader variant="white" title="Screen Title" menuIconName="Close" />'}</code>
              </DataTableCell>
              <DataTableCell>
                <code>../components/shared/AppHeader</code>
              </DataTableCell>
            </DataTableRow>
            <DataTableRow>
              <DataTableCell>Bottom Nav (iOS)</DataTableCell>
              <DataTableCell>
                <code>{'<AxBottomNav platform="ios" activeTab="for-you" />'}</code>
              </DataTableCell>
              <DataTableCell>
                <code>../components/AxBottomNav</code>
              </DataTableCell>
            </DataTableRow>
            <DataTableRow>
              <DataTableCell>Bottom Nav (Android)</DataTableCell>
              <DataTableCell>
                <code>{'<AxBottomNav platform="android" activeTab="more" />'}</code>
              </DataTableCell>
              <DataTableCell>
                <code>../components/AxBottomNav</code>
              </DataTableCell>
            </DataTableRow>
          </DataTableBody>
        </DataTable>
      </ExampleSection>

      <GuidelinesSection
        description="Use Native Navigation for AX app surfaces that need platform-aware top and bottom navigation. Match the page level to the user's location in the workflow, keep action icons predictable, and test menu overlays in both mobile and tablet shells."
        defaultValue="variant='blue', platform='ios', isTablet=false"
      />
    </PageWrapper>
  );
}
