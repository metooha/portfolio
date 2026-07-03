import * as React from 'react';

import {Button} from '../components/Button/Button';
import {IconButton} from '../components/IconButton/IconButton';
import {SettingsIcon, XIcon} from '../components/Icons/Icons';
import {Link} from '../components/Link/Link';
import {Body} from '../components/Text/Text';
import {Tooltip, type TooltipPosition} from '../components/Tooltip/Tooltip';
import {
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const POSITIONS: Array<{value: TooltipPosition; label: string} | null> = [
  {value: 'left', label: 'Left'},
  {value: 'topLeft', label: 'Top left'},
  {value: 'topCenter', label: 'Top center'},
  {value: 'topRight', label: 'Top right'},
  {value: 'bottomLeft', label: 'Bottom left'},
  {value: 'bottomCenter', label: 'Bottom center'},
  {value: 'bottomRight', label: 'Bottom right'},
  {value: 'right', label: 'Right'},
];

function TooltipDemo({
  position,
  content,
  label,
}: {
  position: TooltipPosition;
  content: string;
  label: string;
}) {
  return (
    <Tooltip content={content} position={position}>
      <Button variant="secondary" size="small">
        {label}
      </Button>
    </Tooltip>
  );
}

export default function TooltipPage() {
  return (
    <PageWrapper
      title="Tooltip"
      category="Shared Components"
      description="Hover or focus-triggered contextual information popup. Provides helpful supplemental text or accessible labels for its trigger element."
    >
      <ExampleSection
        title="Positions"
        description="Tooltip placement relative to the trigger element. Careted positions ensure visual clarity for trigger association."
      >
        <DocsGrid minColumnWidth={250}>
          {POSITIONS.map((item, i) =>
            item === null ? (
              <div key={`empty-${i}`} />
            ) : (
              <DocsCard key={item.value} title={item.label} description={`position='${item.value}'`}>
                <div style={{display: 'flex', justifyContent: 'center', padding: '56px 12px'}}>
                  <TooltipDemo
                    position={item.value}
                    content={`Shows ${item.label.toLowerCase()}`}
                    label={item.label}
                  />
                </div>
              </DocsCard>
            )
          )}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Relationships" description="Tooltip can label the trigger or supplement it with additional context.">
        <DocsGrid>
          <DocsCard title="Label" description="Tooltip provides the accessible name (aria-labelledby) for the trigger.">
            <div style={{display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', padding: '32px 16px'}}>
              <Tooltip content="Settings" relationship="label" position="bottomCenter">
                <IconButton a11yLabel="Settings" variant="round" size="small">
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip content="Dismiss" relationship="label" position="bottomCenter">
                <IconButton a11yLabel="Dismiss" variant="round" size="small">
                  <XIcon />
                </IconButton>
              </Tooltip>
            </div>
          </DocsCard>
          <DocsCard title="Description" description="Tooltip provides supplemental information (aria-describedby) for an already-labeled control.">
            <div style={{display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', padding: '32px 16px'}}>
              <Tooltip content="This will permanently remove the item and cannot be undone" relationship="description" position="bottomCenter">
                <Button variant="secondary" size="small">Delete</Button>
              </Tooltip>
              <Tooltip content="Save changes and return to the dashboard" relationship="description" position="bottomCenter">
                <Button variant="primary" size="small">Save</Button>
              </Tooltip>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Content width"
        description="Tooltip width adapts to content up to a maximum of 15 rem (240 px). Short copy stays on one line; longer copy wraps at the boundary."
      >
        <DocsGrid>
          <DocsCard title="Short — single line" description="Fits within 240 px, rendered on one line.">
            <div style={{display: 'flex', justifyContent: 'center', padding: '48px 16px'}}>
              <Tooltip content="Add to cart" position="topCenter">
                <Button variant="secondary" size="small">Hover me</Button>
              </Tooltip>
            </div>
          </DocsCard>
          <DocsCard title="Long — wraps at 240 px" description="Exceeds 240 px, text wraps within the max-width boundary.">
            <div style={{display: 'flex', justifyContent: 'center', padding: '48px 16px'}}>
              <Tooltip content="This will permanently delete the item and the action cannot be undone" position="topCenter">
                <Button variant="secondary" size="small">Hover me</Button>
              </Tooltip>
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="On various elements" description="Tooltips work on any focusable element.">
        <DocsCard>
          <div style={{display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', padding: '32px 16px'}}>
            <Tooltip content="Click to learn more" position="topCenter">
              <Link href="#" onClick={(event) => event.preventDefault()}>
                Help link
              </Link>
            </Tooltip>
            <Tooltip content="This badge indicates new items" position="topCenter">
              <span
                tabIndex={0}
                style={{
                  padding: '4px 12px',
                  borderRadius: 12,
                  background: 'var(--ld-semantic-color-fill-brand-subtle, #ebf0ff)',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                3 new
              </span>
            </Tooltip>
          </div>
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use Tooltip to label icon-only triggers (relationship='label') or to add supplemental context to a labeled control (relationship='description'). Keep copy short — under ~35 characters to guarantee a single line; content wider than 240 px (15 rem) wraps automatically. Avoid putting critical information in a tooltip since touch users may never see it. For tap-friendly explanations, use Callout or inline copy instead."
        defaultValue="position='bottomCenter', relationship='description'"
      >
        <div style={{display: 'grid', gap: 6, minWidth: 0}}>
          <Body as="span" size="small" weight="alt">
            Accessibility constraint
          </Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            Never place interactive elements (links, buttons, inputs) inside a Tooltip. Tooltip
            content is not focusable — keyboard and screen reader users cannot reach or activate
            anything inside it. Use a Callout or a modal dialog for interactive supplemental content.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
