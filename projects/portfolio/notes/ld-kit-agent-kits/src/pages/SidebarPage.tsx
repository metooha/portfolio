import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarShell,
  SidebarTrigger,
  type SidebarShellMenuItem,
} from '../patterns/Sidebar';
import {Body} from '../components/Text/Text';
import {Icon} from '../components/Icons';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type SidebarPattern = 'composable' | 'shell';

// Nav icons render the theme font via the shared Icon component. They keep
// an SVGProps signature so they remain drop-in for SidebarShellMenuItem.Icon;
// the SVG props are ignored. `Inbox` has no LD glyph, so it maps to `Email`.
const HomeIcon = (_props: React.SVGProps<SVGSVGElement>) => <Icon name="Home" style={{fontSize: 20}} decorative />;

const InboxIcon = (_props: React.SVGProps<SVGSVGElement>) => <Icon name="Email" style={{fontSize: 20}} decorative />;

const SettingsIcon = (_props: React.SVGProps<SVGSVGElement>) => <Icon name="Gear" style={{fontSize: 20}} decorative />;

const CalendarIcon = (_props: React.SVGProps<SVGSVGElement>) => <Icon name="Calendar" style={{fontSize: 20}} decorative />;

const SHELL_MENU: SidebarShellMenuItem[] = [
  {id: 'home', label: 'Home', route: '/', Icon: HomeIcon},
  {
    id: 'inbox',
    label: 'Inbox',
    route: '/inbox',
    Icon: InboxIcon,
    submenuItems: [
      {id: 'inbox-all', label: 'All messages', route: '/inbox'},
      {id: 'inbox-unread', label: 'Unread', route: '/inbox/unread'},
      {id: 'inbox-archive', label: 'Archive', route: '/inbox/archive'},
    ],
  },
  {id: 'calendar', label: 'Calendar', route: '/calendar', Icon: CalendarIcon},
  {id: 'settings', label: 'Settings', route: '/settings', Icon: SettingsIcon},
];

const shellFrame: React.CSSProperties = {
  display: 'flex',
  height: 360,
  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  borderRadius: 8,
  overflow: 'hidden',
};

function ComposableSidebarDemo({defaultOpen = true, ariaLabel = 'Demo workspace navigation'}: {defaultOpen?: boolean; ariaLabel?: string}) {
  return (
    <div style={{...shellFrame, height: 380}}>
      <SidebarProvider defaultOpen={defaultOpen} style={{minHeight: '100%', height: '100%'}}>
        <Sidebar collapsible="icon" aria-label={ariaLabel}>
          <SidebarHeader>
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <SidebarTrigger />
              <span style={{fontWeight: 600}}>App</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem><SidebarMenuButton isActive><HomeIcon />Home</SidebarMenuButton></SidebarMenuItem>
                  <SidebarMenuItem><SidebarMenuButton><InboxIcon />Tasks</SidebarMenuButton></SidebarMenuItem>
                  <SidebarMenuItem><SidebarMenuButton><CalendarIcon />Schedule</SidebarMenuButton></SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Reports</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Analytics</SidebarMenuButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem><SidebarMenuSubButton href="#">Overview</SidebarMenuSubButton></SidebarMenuSubItem>
                      <SidebarMenuSubItem><SidebarMenuSubButton href="#" isActive>Details</SidebarMenuSubButton></SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenuButton><SettingsIcon />Settings</SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>
        {/* as="div" avoids duplicate <main> landmarks in the demo page context */}
        <SidebarInset as="div">
          <div style={{padding: 24}}>
            <Body as="h3" size="large" weight="alt" style={{margin: '0 0 8px'}}>Main content</Body>
            <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
              Use the trigger to collapse or expand the sidebar.
            </Body>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

function ShellSidebarDemo({defaultLocked = false, ariaLabel = 'Application navigation'}: {defaultLocked?: boolean; ariaLabel?: string}) {
  const [active, setActive] = React.useState('home');

  return (
    <div style={shellFrame}>
      <SidebarShell
        menuItems={SHELL_MENU}
        activeMenuItem={active}
        onMenuItemClick={(id) => setActive(id)}
        defaultLocked={defaultLocked}
        aria-label={ariaLabel}
      />
      <div style={{flex: 1, padding: 16}}>
        <Body as="p" size="medium" style={{margin: 0}}>Active: <strong>{active}</strong></Body>
        <Body as="p" size="small" color="subtle" style={{margin: '8px 0 0', lineHeight: '1.5'}}>
          Hover, lock, and resize behavior is included in SidebarShell.
        </Body>
      </div>
    </div>
  );
}

export default function SidebarPage() {
  const [pattern, setPattern] = React.useState<SidebarPattern>('composable');
  const [defaultOpen, setDefaultOpen] = React.useState(true);
  const [defaultLocked, setDefaultLocked] = React.useState(false);

  return (
    <PageWrapper
      title="Sidebar"
      category="Core Components"
      description="Layout sidebar primitives and a data-driven shell for application navigation."
    >
      <ExampleSection
        title="Component Configuration"
        description="Choose between custom composition and the complete shell navigation pattern."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Sidebar pattern
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Primitive composition gives layout control; shell is data-driven.
                </Body>
              </div>
              <ButtonGroup aria-label="Sidebar pattern">
                <Button size="small" variant={pattern === 'composable' ? 'primary' : 'secondary'} aria-pressed={pattern === 'composable'} onClick={() => setPattern('composable')}>Composable</Button>
                <Button size="small" variant={pattern === 'shell' ? 'primary' : 'secondary'} aria-pressed={pattern === 'shell'} onClick={() => setPattern('shell')}>Shell</Button>
              </ButtonGroup>
              {pattern === 'composable' ? (
                <Checkbox label="Start expanded" checked={defaultOpen} onChange={(event) => setDefaultOpen(event.target.checked)} />
              ) : (
                <Checkbox label="Start locked open" checked={defaultLocked} onChange={(event) => setDefaultLocked(event.target.checked)} />
              )}
            </>
          }
          preview={
            <DocsCard title={pattern === 'composable' ? 'Composable' : 'Shell'} description={pattern === 'composable' ? 'Build a sidebar from structural parts.' : 'Render a complete nav from menuItems.'}>
              {pattern === 'composable' ? <ComposableSidebarDemo defaultOpen={defaultOpen} ariaLabel="Configuration demo navigation" /> : <ShellSidebarDemo defaultLocked={defaultLocked} ariaLabel="Configuration shell navigation" />}
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Patterns" description="Both variants support application navigation, but at different levels of control.">
        <DocsGrid>
          <DocsCard title="Composable" description="Use provider and primitives when the layout needs custom sections.">
            <ComposableSidebarDemo ariaLabel="Demo workspace navigation" />
          </DocsCard>
          <DocsCard title="Shell" description="Use menuItems for a ready sidebar with hover, lock, resize, and submenu behavior.">
            <ShellSidebarDemo ariaLabel="Application navigation" />
          </DocsCard>
          <DocsCard title="Locked shell" description="defaultLocked starts the shell expanded for persistent navigation.">
            <ShellSidebarDemo defaultLocked ariaLabel="Locked application navigation" />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Sidebar for persistent application navigation. Choose composable primitives when page structure or grouping is custom; choose SidebarShell when data-driven navigation is enough. Keep labels short, group related items, and make sure collapsed states retain accessible labels."
        defaultValue="SidebarProvider defaultOpen={true}"
      />
    </PageWrapper>
  );
}