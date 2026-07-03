import * as React from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
} from '@/living-design/components/ContextMenu/ContextMenu';
import {Checkbox} from '@/living-design/components/Checkbox';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

function TriggerSurface({children}: {children: React.ReactNode}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px',
        maxWidth: '600px',
        border: '2px dashed var(--ld-semantic-color-border-moderate, #C1C2C3)',
        borderRadius: '8px',
        backgroundColor: 'var(--ld-semantic-color-fill-surface-primary, #F8F8F8)',
        cursor: 'context-menu',
      }}
    >
      <Body as="p" size="medium" color="subtle" style={{margin: 0}}>{children}</Body>
    </div>
  );
}

export default function ContextMenuPage() {
  const [includeDisabled, setIncludeDisabled] = React.useState(true);
  const [showBookmarks, setShowBookmarks] = React.useState(true);
  const [showFullUrls, setShowFullUrls] = React.useState(false);
  const [position, setPosition] = React.useState('bottom');

  return (
    <PageWrapper
      title="Context Menu"
      category="Shared Components"
      description="A context menu appears on right-click and offers contextual actions at the cursor — the menu equivalent of an overflow button tied to a specific surface. Its items run commands or navigate; it can also carry view toggles. Built on the SelectDropdown primitive with a context-menu trigger mode."
    >
      <ExampleSection title="Component Configuration" description="Right-click the preview surface to open contextual actions at the cursor.">
        <ComponentConfigurationCard
          controls={
            <Checkbox
              label="Include disabled item"
              checked={includeDisabled}
              onChange={(event) => setIncludeDisabled(event.target.checked)}
            />
          }
          preview={
            <DocsCard title="Edit actions" description="Right-click to cut, copy, paste, or delete.">
              <ContextMenu>
                <ContextMenuTrigger><TriggerSurface>Right click for actions</TriggerSurface></ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>Cut</ContextMenuItem>
                  <ContextMenuItem>Copy</ContextMenuItem>
                  <ContextMenuItem disabled={includeDisabled}>{includeDisabled ? 'Paste (unavailable)' : 'Paste'}</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem destructive>Delete</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Contextual actions" description="The primary use: commands and navigation tied to the surface under the cursor.">
        <DocsGrid>
          <DocsCard title="Browser actions">
            <ContextMenu>
              <ContextMenuTrigger><TriggerSurface>Right click here</TriggerSurface></ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Back</ContextMenuItem>
                <ContextMenuItem disabled>Forward</ContextMenuItem>
                <ContextMenuItem>Reload</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>View Page Source</ContextMenuItem>
                <ContextMenuItem>Inspect</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </DocsCard>

          <DocsCard title="Item actions">
            <ContextMenu>
              <ContextMenuTrigger><TriggerSurface>Right click an item</TriggerSurface></ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Open</ContextMenuItem>
                <ContextMenuItem>Rename</ContextMenuItem>
                <ContextMenuItem>Duplicate</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem destructive>Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="View toggles" description="A context menu may also carry checkbox and radio items to toggle view state, alongside its actions.">
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <ContextMenu>
            <ContextMenuTrigger><TriggerSurface>Right click for view options</TriggerSurface></ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>Show Bookmarks</ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem checked={showFullUrls} onCheckedChange={setShowFullUrls}>Show Full URLs</ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuLabel>Panel Position</ContextMenuLabel>
              <ContextMenuRadioGroup value={position} onValueChange={setPosition}>
                <ContextMenuRadioItem value="top">Top</ContextMenuRadioItem>
                <ContextMenuRadioItem value="bottom">Bottom</ContextMenuRadioItem>
                <ContextMenuRadioItem value="right">Right</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
          <div style={{display: 'grid', gap: 4}}>
            <Body as="p" size="small" color="subtle" style={{margin: 0}}>Bookmarks: {showBookmarks ? 'visible' : 'hidden'}</Body>
            <Body as="p" size="small" color="subtle" style={{margin: 0}}>Full URLs: {showFullUrls ? 'visible' : 'hidden'}</Body>
            <Body as="p" size="small" color="subtle" style={{margin: 0}}>Position: {position}</Body>
          </div>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Context Menu for secondary actions tied to a specific surface or item, opened by right-click. Lead with commands and navigation; keep destructive actions separated. View toggles (checkbox/radio) are welcome alongside actions, but for a primary value picker use Select Dropdown. Make every context-menu action reachable through another visible path."
        defaultValue="trigger='context-menu'"
      />
    </PageWrapper>
  );
}
