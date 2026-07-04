import * as React from 'react';

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/app/components/Menubar';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function MenubarPage({embedded = false}: {embedded?: boolean} = {}) {
  const [showLineNumbers, setShowLineNumbers] = React.useState(true);
  const [theme, setTheme] = React.useState('light');

  const sections = (
    <>
      <ExampleSection
        title="File / Edit / View"
        description="Each menu portals its content into the body. Click outside or press Escape to close."
      >
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New window <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Open file… <MenubarShortcut>⌘O</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem disabled>Print…</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarLabel>Display</MenubarLabel>
              <MenubarCheckboxItem
                checked={showLineNumbers}
                onCheckedChange={setShowLineNumbers}
              >
                Line numbers
              </MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarLabel>Theme</MenubarLabel>
              <MenubarRadioGroup value={theme} onValueChange={setTheme}>
                <MenubarRadioItem value="light">Light</MenubarRadioItem>
                <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
                <MenubarRadioItem value="auto">Auto</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </ExampleSection>

      <GuidelinesSection
        description="Use menubars for desktop-style command surfaces with grouped actions. Keep labels concise, reserve checkbox and radio items for stateful settings, and preserve Escape and outside-click dismissal."
      />
    </>
  );

  if (embedded) return sections;
  return (
    <PageWrapper
      title="Menubar"
      category="Shared Components"
      description="Classic desktop menubar. Hand-rolled (no Radix); supports menus, items, checkbox/radio items, labels, separators, and shortcut hints."
    >
      {sections}
    </PageWrapper>
  );
}
