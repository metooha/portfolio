import * as React from 'react';
import {Icon} from '@/app/components/Icons/Icons';
import {Tag} from '@/app/components/Tag';
import {
  AgentSidebar,
  AgentSidebarProvider,
  AgentSidebarHeader,
  AgentSidebarContent,
  AgentSidebarItem,
  AgentSidebarSection,
  AgentSidebarTextItem,
  AgentSidebarSeparator,
  AgentSidebarLockToggle,
  AgentSidebarFooter,
} from '@/app/components/patterns/AgentSidebar';
import {ExampleSection, GuidelinesSection, PageWrapper, DocsGrid, DocsCard} from './shared';

function DemoSidebar({defaultCollapsed = false}: {defaultCollapsed?: boolean}) {
  return (
    <AgentSidebarProvider defaultCollapsed={defaultCollapsed}>
      <div style={{height: 460, display: 'flex'}}>
        <AgentSidebar aria-label="Workspace">
          <AgentSidebarHeader
            logo={<Icon name="Magic" decorative />}
            title="Polaris"
            tag={<Tag>Beta</Tag>}
            onSearch={() => {}}
          />
          <AgentSidebarContent>
            <AgentSidebarItem leading={<Icon name="Home" decorative />} isCurrent>
              Home
            </AgentSidebarItem>
            <AgentSidebarItem leading={<Icon name="Chat" decorative />} tag={<Tag>3</Tag>}>
              Chats
            </AgentSidebarItem>
            <AgentSidebarItem leading={<Icon name="Star" decorative />}>
              Saved
            </AgentSidebarItem>

            <AgentSidebarSeparator />

            <AgentSidebarSection title="Recent" collapsible>
              <AgentSidebarTextItem
                overflow={[
                  {label: 'Rename', onClick: () => {}},
                  {label: 'Delete', onClick: () => {}},
                ]}
              >
                Q3 planning summary
              </AgentSidebarTextItem>
              <AgentSidebarTextItem>Inventory forecast</AgentSidebarTextItem>
              <AgentSidebarTextItem>Store 1234 report</AgentSidebarTextItem>
            </AgentSidebarSection>
          </AgentSidebarContent>

          <AgentSidebarLockToggle />
          <AgentSidebarFooter
            type="avatar-button"
            avatar={{a11yLabel: 'Sam Carter', name: 'Sam Carter'}}
            label="Sam Carter"
            onClick={() => {}}
          />
        </AgentSidebar>
      </div>
    </AgentSidebarProvider>
  );
}

export default function AgentSidebarPage() {
  return (
    <PageWrapper
      title="Agent Sidebar"
      category="Patterns"
      description="The agent-canvas left rail — a compound sidebar that collapses to an icon-only rail. It adds an editable app-name header, primary icon items, labeled sections with inline rename and overflow menus, a lock/expand toggle, and a configurable footer on top of the core side-navigation styling."
    >
      <ExampleSection title="Expanded" description="The full rail with a header, primary items, a collapsible section, and an avatar footer.">
        <div style={{maxWidth: 340}}>
          <DemoSidebar />
        </div>
      </ExampleSection>

      <ExampleSection title="States" description="Toggle the lock control (bottom of each rail) to collapse to the icon-only rail.">
        <DocsGrid minColumnWidth={300}>
          <DocsCard title="Expanded">
            <div style={{maxWidth: 320}}>
              <DemoSidebar />
            </div>
          </DocsCard>
          <DocsCard title="Collapsed">
            <div style={{maxWidth: 320}}>
              <DemoSidebar defaultCollapsed />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Agent Sidebar for agent-driven canvases that need a collapsible, self-contained navigation rail. Wrap the tree in AgentSidebarProvider and read collapse state with useAgentSidebar. Give every primary AgentSidebarItem a leading icon — it's the collapsed representation. Reserve AgentSidebarTextItem (secondary, no icon) for lists like recent chats, and pin AgentSidebarLockToggle near the bottom as the canonical collapse affordance."
        defaultValue="defaultCollapsed={false}  resizable={false}"
      />
    </PageWrapper>
  );
}
