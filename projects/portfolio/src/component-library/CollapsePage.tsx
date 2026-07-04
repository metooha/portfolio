import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Button} from '@/app/components/Button/Button';
import {Collapse} from '@/app/components/Collapse/Collapse';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function CollapsePage() {
  const [open, setOpen] = React.useState(false);
  return (
    <PageWrapper
      title="Collapse"
      category="Core Components"
      description="An animated show/hide utility. Toggle isOpen to expand or collapse a block of content with a smooth height transition."
    >
      <ExampleSection title="Default" description="Drive the isOpen prop from your own state or trigger.">
        <div style={{display: 'grid', gap: 12, maxWidth: 480}}>
          <div>
            <Button variant="secondary" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              {open ? 'Hide details' : 'Show details'}
            </Button>
          </div>
          <Collapse isOpen={open}>
            <div style={{
              padding: 16,
              borderRadius: 8,
              border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
            }}>
              <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                This content mounts and animates open when isOpen is true, and animates closed (then unmounts) when it becomes false.
              </Body>
            </div>
          </Collapse>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Collapse for progressive disclosure of secondary content behind an explicit trigger. Wire the trigger's aria-expanded to the same state that drives isOpen. For a structured header + content pattern, prefer Collapsible or Accordion, which manage the trigger relationship for you."
        defaultValue="isOpen={false}"
      />
    </PageWrapper>
  );
}
