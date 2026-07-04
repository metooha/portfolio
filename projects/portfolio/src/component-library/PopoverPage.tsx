import * as React from 'react';

import {Button} from '@/app/components/Button/Button';
import {Checkbox} from '@/app/components/Checkbox/Checkbox';
import {Popover, type PopoverPosition} from '@/app/components/Popover/Popover';
import {Body} from '@/app/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const POSITIONS: Array<{value: PopoverPosition; label: string}> = [
  {value: 'topLeft', label: 'Top left'},
  {value: 'topCenter', label: 'Top center'},
  {value: 'topRight', label: 'Top right'},
  {value: 'right', label: 'Right'},
  {value: 'bottomRight', label: 'Bottom right'},
  {value: 'bottomCenter', label: 'Bottom center'},
  {value: 'bottomLeft', label: 'Bottom left'},
  {value: 'left', label: 'Left'},
];

const CONTROL_WRAP_STYLE: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  minWidth: 0,
};

function PopoverContent({richContent, position}: {richContent?: boolean; position: PopoverPosition}) {
  if (richContent) {
    return (
      <div style={{display: 'grid', gap: 12, padding: 12, maxWidth: 280}}>
        <Body as="p" size="medium" weight="alt" style={{margin: 0}}>
          Publish campaign
        </Body>
        <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
          This contextual action affects selected channels. Review settings before publishing.
        </Body>
        <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
          <Button variant="secondary" size="small">
            Cancel
          </Button>
          <Button variant="primary" size="small">
            Publish
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{padding: '8px 4px', maxWidth: 220}}>
      <Body as="p" size="small" style={{margin: 0, lineHeight: '1.5', whiteSpace: 'nowrap'}}>
        Anchored at <strong>{position}</strong>.
      </Body>
    </div>
  );
}

function PopoverDemo({
  position,
  hasNubbin = true,
  richContent = false,
  label,
}: {
  position: PopoverPosition;
  hasNubbin?: boolean;
  richContent?: boolean;
  label: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Popover
      a11yContentLabel="Start of popover content"
      content={<PopoverContent richContent={richContent} position={position} />}
      hasNubbin={hasNubbin}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position={position}
      triggerRef={triggerRef}
    >
      <Button
        ref={triggerRef}
        variant={isOpen ? 'primary' : 'secondary'}
        size="small"
        onClick={() => setIsOpen((previous) => !previous)}
      >
        {label}
      </Button>
    </Popover>
  );
}

export default function PopoverPage() {
  const [position, setPosition] = React.useState<PopoverPosition>('bottomCenter');
  const [hasNubbin, setHasNubbin] = React.useState(true);
  const [richContent, setRichContent] = React.useState(false);
  const selectedPosition = POSITIONS.find((item) => item.value === position) ?? POSITIONS[5];

  return (
    <PageWrapper
      title="Popover"
      category="Core Components"
      description="Anchored overlays for contextual content that appears from a trigger and closes when focus or pointer intent leaves the layer."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview placement, nubbin visibility, and content density on a single popover trigger."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Position
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose where the popover appears relative to its trigger.
                </Body>
              </div>
              <div aria-label="Popover position" role="list" style={CONTROL_WRAP_STYLE}>
                {POSITIONS.map((item) => (
                  <div key={item.value} role="listitem">
                    <Button
                      size="small"
                      variant={position === item.value ? 'primary' : 'secondary'}
                      aria-pressed={position === item.value}
                      onClick={() => setPosition(item.value)}
                    >
                      {item.label}
                    </Button>
                  </div>
                ))}
              </div>
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox
                  label="Show nubbin"
                  checked={hasNubbin}
                  onChange={(event) => setHasNubbin(event.target.checked)}
                />
                <Checkbox
                  label="Use rich content"
                  checked={richContent}
                  onChange={(event) => setRichContent(event.target.checked)}
                />
              </div>
            </>
          }
          preview={
            <DocsCard title={selectedPosition.label} description="Click the trigger to inspect the live anchored layer.">
              <div style={{display: 'flex', justifyContent: 'center', padding: '96px 24px'}}>
                <PopoverDemo
                  position={position}
                  hasNubbin={hasNubbin}
                  richContent={richContent}
                  label="Trigger popover"
                />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Positions"
        description="Each card keeps enough breathing room for the popover to render beside the trigger."
      >
        <DocsGrid minColumnWidth={220}>
          {POSITIONS.map((item) => (
            <DocsCard key={item.value} title={item.label} description={`position='${item.value}'`}>
              <div style={{display: 'flex', justifyContent: 'center', padding: '56px 12px'}}>
                <PopoverDemo position={item.value} label="Open" />
              </div>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Popover for contextual information or compact controls tied to a visible trigger. Keep content brief, return focus to the trigger on close, and avoid using popovers for blocking confirmations or full forms. Choose the position that keeps the layer inside the viewport and close the popover after the user completes the contextual action."
        defaultValue="position='bottomCenter' hasNubbin={false}"
      />
    </PageWrapper>
  );
}