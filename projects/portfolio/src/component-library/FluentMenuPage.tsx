import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Button} from '@/app/components/Button/Button';
import {Icon} from '@/app/components/Icons/Icons';
import {FluentMenu, FluentMenuTrigger, FluentMenuList, FluentMenuItem} from '@/app/components/FluentMenu/FluentMenu';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function FluentMenuPage() {
  const [last, setLast] = React.useState<string>('');
  return (
    <PageWrapper
      title="Fluent Menu"
      category="Core Components"
      description="A keyboard-accessible dropdown menu. Compose a trigger with a list of actionable items; the menu handles focus management, outside-click, and Escape."
    >
      <ExampleSection title="Default" description="Open the menu, then use arrow keys and Enter to navigate. Items can carry a leading icon.">
        <div style={{display: 'grid', gap: 12, justifyItems: 'start'}}>
          <FluentMenu>
            <FluentMenuTrigger>
              <Button variant="secondary">Actions</Button>
            </FluentMenuTrigger>
            <FluentMenuList>
              <FluentMenuItem icon={<Icon name="Pencil" decorative />} onClick={() => setLast('Edit')}>Edit</FluentMenuItem>
              <FluentMenuItem icon={<Icon name="Copy" decorative />} onClick={() => setLast('Duplicate')}>Duplicate</FluentMenuItem>
              <FluentMenuItem icon={<Icon name="Trash" decorative />} disabled>Delete</FluentMenuItem>
            </FluentMenuList>
          </FluentMenu>
          <Body as="p" size="small" color="subtle" style={{margin: 0}}>
            Last action: <code>{last || '—'}</code>
          </Body>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Fluent Menu for a compact list of actions triggered from a button. Keep items short and verb-led, group related actions, and disable (rather than hide) actions that are temporarily unavailable. For command palettes use Command; for site navigation use Navigation Menu."
      >
        <div style={{display: 'grid', gap: 6}}>
          <Body as="span" size="small" weight="alt">Accessibility</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            The trigger exposes <code>aria-haspopup</code> and <code>aria-expanded</code>; the list uses a menu role with roving focus, and Escape or an outside click dismisses it.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
