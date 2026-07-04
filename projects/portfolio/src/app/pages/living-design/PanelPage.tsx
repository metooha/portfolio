import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {Panel, type PanelPosition, type PanelSize} from '@/living-design/components/Panel/Panel';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const PANEL_SIZES: Array<{value: PanelSize; label: string; description: string}> = [
  {value: 'small', label: 'Small', description: 'Use for quick filters and short supporting content.'},
  {value: 'medium', label: 'Medium', description: 'Use for detail views and moderate forms.'},
  {value: 'large', label: 'Large', description: 'Use for richer panels with longer summaries or grouped fields.'},
];

const PANEL_POSITIONS: Array<{value: PanelPosition; label: string}> = [
  {value: 'left', label: 'Left'},
  {value: 'right', label: 'Right'},
];

function PanelContent({longContent}: {longContent?: boolean}) {
  return (
    <div style={{display: 'grid', gap: 16}}>
      <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
        Panels provide supplemental information or editing controls without leaving the current page.
      </Body>
      {longContent ? (
        <>
          {['Campaign name', 'Audience', 'Schedule', 'Budget'].map((label) => (
            <div key={label} style={{display: 'grid', gap: 4}}>
              <Body as="p" size="small" weight="alt" style={{margin: 0}}>{label}</Body>
              <div
                style={{
                  height: 40,
                  borderRadius: 4,
                  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
                  background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
                }}
              />
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
}

function PanelTrigger({
  size = 'small',
  position = 'left',
  showActions = true,
  longContent = false,
  label,
}: {
  size?: PanelSize;
  position?: PanelPosition;
  showActions?: boolean;
  longContent?: boolean;
  label: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button variant="primary" size="medium" onClick={() => setIsOpen(true)}>{label}</Button>
      <Panel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${size[0].toUpperCase()}${size.slice(1)} panel`}
        size={size}
        position={position}
        actions={
          showActions ? (
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>Apply</Button>
            </>
          ) : undefined
        }
      >
        <PanelContent longContent={longContent} />
      </Panel>
    </>
  );
}

export default function PanelPage() {
  const [size, setSize] = React.useState<PanelSize>('small');
  const [position, setPosition] = React.useState<PanelPosition>('left');
  const [showActions, setShowActions] = React.useState(true);
  const [longContent, setLongContent] = React.useState(false);
  const active = PANEL_SIZES.find((item) => item.value === size) ?? PANEL_SIZES[0];

  return (
    <PageWrapper
      title="Panel"
      category="Core Components"
      description="Slide-out panels for supplemental content, detail views, and side forms without leaving the current page."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview size, position, footer actions, and content length in one panel trigger."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Size</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the panel size that matches the task scope.
                </Body>
              </div>
              <ButtonGroup aria-label="Panel size">
                {PANEL_SIZES.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={size === item.value ? 'primary' : 'secondary'}
                    aria-pressed={size === item.value}
                    onClick={() => setSize(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Position</Body>
              </div>
              <ButtonGroup aria-label="Panel position">
                {PANEL_POSITIONS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={position === item.value ? 'primary' : 'secondary'}
                    aria-pressed={position === item.value}
                    onClick={() => setPosition(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Show footer actions" checked={showActions} onChange={(event) => setShowActions(event.target.checked)} />
                <Checkbox label="Use longer content" checked={longContent} onChange={(event) => setLongContent(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title={`${active.label} panel`} description={active.description}>
              <div style={{display: 'grid', gap: 12, justifyItems: 'start'}}>
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Open the panel to preview the configured size, position, and actions.
                </Body>
                <PanelTrigger
                  size={size}
                  position={position}
                  showActions={showActions}
                  longContent={longContent}
                  label="Open panel"
                />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Sizes" description="Match panel size to the depth of the task.">
        <DocsGrid>
          {PANEL_SIZES.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.description}>
              <PanelTrigger size={item.value} label={`Open ${item.label.toLowerCase()}`} />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Position" description="Pick the side that matches the surrounding navigation pattern.">
        <DocsGrid>
          {PANEL_POSITIONS.map((item) => (
            <DocsCard key={item.value} title={`${item.label} panel`}>
              <PanelTrigger position={item.value} label={`Open ${item.label.toLowerCase()}`} />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Panel for supplemental tasks that benefit from keeping the page context visible — filters, detail views, side forms. Keep the title direct and prefer cancel + apply footer actions when the user has unsaved input. Avoid Panel for broad navigation or fully blocking decisions (use Modal for those)."
        defaultValue="size='small', position='left'"
      />
    </PageWrapper>
  );
}
