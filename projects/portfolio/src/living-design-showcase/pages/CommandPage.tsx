import * as React from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
} from '@/living-design/components/Command/Command';
import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

function CommandPreview({
  showSettings = true,
  disabledAdmin = true,
  onSelect,
}: {
  showSettings?: boolean;
  disabledAdmin?: boolean;
  onSelect?: (value: string) => void;
}) {
  return (
    <Command UNSAFE_style={{maxWidth: 'min(540px, 100%)'}}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => onSelect?.('Calendar')}>
            Calendar<CommandShortcut>Ctrl+C</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => onSelect?.('Search Emoji')}>Search Emoji</CommandItem>
          <CommandItem onSelect={() => onSelect?.('Calculator')}>Calculator</CommandItem>
        </CommandGroup>
        {showSettings ? (
          <>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => onSelect?.('Profile')}>
                Profile<CommandShortcut>Ctrl+P</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => onSelect?.('Billing')}>Billing</CommandItem>
              <CommandItem disabled={disabledAdmin} onSelect={() => onSelect?.('Admin')}>Admin</CommandItem>
            </CommandGroup>
          </>
        ) : null}
      </CommandList>
    </Command>
  );
}

export default function CommandPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
  const [showSettings, setShowSettings] = React.useState(true);
  const [disabledAdmin, setDisabledAdmin] = React.useState(true);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setDialogOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <PageWrapper
      title="Command"
      category="Shared Components"
      description="A command palette component for searching and selecting from a list of actions. Supports keyboard navigation, filtering, grouped items, and modal dialog mode."
    >
      <ExampleSection title="Component Configuration" description="Preview grouped command items, disabled options, and the dialog presentation.">
        <ComponentConfigurationCard
          controls={
            <>
              <Checkbox
                label="Show settings group"
                checked={showSettings}
                onChange={(event) => setShowSettings(event.target.checked)}
              />
              <Checkbox
                label="Disable admin item"
                checked={disabledAdmin}
                onChange={(event) => setDisabledAdmin(event.target.checked)}
              />
              <ButtonGroup aria-label="Command dialog controls">
                <Button size="small" variant="primary" onClick={() => setDialogOpen(true)}>Open dialog</Button>
                <Button size="small" variant="secondary" onClick={() => setSelectedItem(null)}>Clear selection</Button>
              </ButtonGroup>
            </>
          }
          preview={
            <DocsCard title="Preview" description={selectedItem ? `Selected: ${selectedItem}` : 'Use the input to filter available commands.'}>
              <CommandPreview showSettings={showSettings} disabledAdmin={disabledAdmin} onSelect={setSelectedItem} />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Inline command palette"
        description="A command menu embedded directly in the page with grouped items, a search input, and keyboard navigation."
      >
        <CommandPreview onSelect={setSelectedItem} />
        {selectedItem && (
          <Body as="p" size="small" color="subtle" style={{marginTop: '12px'}}>
            Selected: <strong>{selectedItem}</strong>
          </Body>
        )}
      </ExampleSection>

      <ExampleSection
        title="Command dialog"
        description="A modal command palette triggered by a keyboard shortcut. Press Ctrl+K (or Cmd+K on Mac) to open it."
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start'}}>
          <Body as="p" size="small" style={{margin: 0}}>
            Press{' '}
            <kbd
              style={{
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid var(--ld-semantic-color-border-moderate, #c5c6c8)',
                fontFamily: 'monospace',
                fontSize: '12px',
                backgroundColor: 'var(--ld-semantic-color-surface-secondary, #f5f5f5)',
              }}
            >
              Ctrl+K
            </kbd>{' '}
            to open the command dialog, or click the button below.
          </Body>
          <Button variant="secondary" onClick={() => setDialogOpen(true)}>
            Open Command Dialog
          </Button>
        </div>

        <CommandDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => { setDialogOpen(false); setSelectedItem('New File'); }}>
                New File
                <CommandShortcut>Ctrl+N</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => { setDialogOpen(false); setSelectedItem('Open File'); }}>
                Open File
                <CommandShortcut>Ctrl+O</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => { setDialogOpen(false); setSelectedItem('Save'); }}>
                Save
                <CommandShortcut>Ctrl+S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => { setDialogOpen(false); setSelectedItem('Go to Dashboard'); }}>
                Go to Dashboard
              </CommandItem>
              <CommandItem onSelect={() => { setDialogOpen(false); setSelectedItem('Go to Settings'); }}>
                Go to Settings
              </CommandItem>
              <CommandItem disabled onSelect={() => { setDialogOpen(false); setSelectedItem('Go to Admin'); }}>
                Go to Admin (disabled)
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </ExampleSection>

      <GuidelinesSection
        description="Use Command for keyboard-first action search, command palettes, and dense action lists. Group related commands, include shortcuts only when they exist, and close dialogs immediately after a successful selection."
        defaultValue="dialogOpen=false, selectedIndex=0"
      />
    </PageWrapper>
  );
}
