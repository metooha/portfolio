import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {Modal, type ModalSize} from '../components/Modal/Modal';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const MODAL_SIZES: Array<{value: ModalSize; label: string; description: string}> = [
  {value: 'small', label: 'Small', description: 'Best for focused confirmations and short messages.'},
  {value: 'medium', label: 'Medium', description: 'Best for moderate forms or detail summaries.'},
  {value: 'large', label: 'Large', description: 'Best for richer content that still needs a blocking dialog.'},
];

function ModalBody({longContent}: {longContent?: boolean}) {
  return (
    <div style={{display: 'grid', gap: 12}}>
      <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
        Review the details before continuing. The dialog keeps focus on this decision until it is closed.
      </Body>
      {longContent ? (
        <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
          Longer modal content should stay concise and scannable. If the task needs multiple sections, complex navigation, or extended reading, move it to a page or panel instead.
        </Body>
      ) : null}
    </div>
  );
}

function ModalTrigger({
  size = 'small',
  showActions = true,
  longContent = false,
  label,
}: {
  size?: ModalSize;
  showActions?: boolean;
  longContent?: boolean;
  label: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const title = `${size[0].toUpperCase()}${size.slice(1)} modal`;

  return (
    <>
      <Button variant="primary" size="medium" onClick={() => setIsOpen(true)}>
        {label}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        size={size}
        actions={
          showActions ? (
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>Confirm</Button>
            </>
          ) : undefined
        }
      >
        <ModalBody longContent={longContent} />
      </Modal>
    </>
  );
}

export default function ModalPage() {
  const [size, setSize] = React.useState<ModalSize>('small');
  const [showActions, setShowActions] = React.useState(true);
  const [longContent, setLongContent] = React.useState(false);
  const active = MODAL_SIZES.find((item) => item.value === size) ?? MODAL_SIZES[0];

  return (
    <PageWrapper
      title="Modal"
      category="Core Components"
      description="Centered overlay dialogs that block the underlying page until the user confirms, cancels, or dismisses."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview size, footer actions, and content length in one modal trigger."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Size</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose the modal size that matches the task scope.
                </Body>
              </div>
              <ButtonGroup aria-label="Modal size">
                {MODAL_SIZES.map((item) => (
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
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Show footer actions" checked={showActions} onChange={(event) => setShowActions(event.target.checked)} />
                <Checkbox label="Use longer content" checked={longContent} onChange={(event) => setLongContent(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title={`${active.label} modal`} description={active.description}>
              <div style={{display: 'grid', gap: 12, justifyItems: 'start'}}>
                <Body as="p" size="small" color="subtle" style={{margin: 0}}>
                  Open the modal to preview the configured size and actions.
                </Body>
                <ModalTrigger size={size} showActions={showActions} longContent={longContent} label="Open modal" />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Sizes" description="Each size hosts a different content footprint.">
        <DocsGrid>
          {MODAL_SIZES.map((item) => (
            <DocsCard key={item.value} title={item.label} description={item.description}>
              <ModalTrigger size={item.value} label={`Open ${item.label.toLowerCase()}`} />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Patterns" description="Modal works for confirmations and short focused decisions.">
        <DocsGrid>
          <DocsCard title="Confirm + cancel" description="Pair primary and secondary buttons so the user always has an escape path.">
            <ModalTrigger size="small" showActions label="Open confirmation" />
          </DocsCard>
          <DocsCard title="Long content" description="Keep modal bodies short. Move multi-step or long-read tasks to a page or panel.">
            <ModalTrigger size="medium" showActions longContent label="Open long modal" />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Modal for blocking decisions that depend on the surrounding context. Keep the body short, the title direct, and provide both a confirm and a cancel action whenever possible. Avoid using Modal for multi-step workflows, broad navigation, or long reading."
        defaultValue="size='small', isOpen=false"
      />
    </PageWrapper>
  );
}
