import * as React from 'react';
import {Body, Heading, Caption} from '@/living-design/components/Text/Text';
import {Button, ButtonGroup} from '@/living-design/components/Button';
import {ButtonGroupPatterns} from '@/living-design/components/ButtonGroupPatterns';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

function SectionTitle({children}: {children: React.ReactNode}) {
  return (
    <Heading
      as="h2"
      size="medium"
      style={{margin: '0 0 8px 0', fontSize: '22px', fontWeight: 700, color: 'var(--ld-semantic-color-text-default, #2E2F32)'}}
    >
      {children}
    </Heading>
  );
}

function SectionDesc({children}: {children: React.ReactNode}) {
  return (
    <Body
      as="p"
      size="medium"
      color="subtle"
      style={{margin: '0 0 24px 0', lineHeight: '1.6', maxWidth: '680px'}}
    >
      {children}
    </Body>
  );
}

function PatternCard({
  name,
  tag,
  description,
  children,
}: {
  name: string;
  tag?: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      border: '1px solid var(--ld-semantic-color-separator, #E6E6E8)',
      borderRadius: '12px',
      padding: '24px',
      backgroundColor: 'var(--ld-semantic-color-surface, #fff)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
        <Body as="span" size="medium" style={{fontWeight: 700}}>
          {name}
        </Body>
        {tag && (
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--ld-semantic-color-text-info, #0071CE)',
            backgroundColor: 'var(--ld-semantic-color-fill-info-subtle, #EDF4FF)',
            border: '1px solid var(--ld-semantic-color-border-info, #C2D9F5)',
            borderRadius: '100px',
            padding: '2px 8px',
            lineHeight: '1.6',
          }}>
            {tag}
          </span>
        )}
      </div>
      <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
        {description}
      </Body>
      <div style={{
        backgroundColor: 'var(--ld-semantic-color-surface-subtle, #F7F8FA)',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {children}
      </div>
    </div>
  );
}

function VariantGroup({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
      <Caption as="span" style={{fontSize: '11px', fontWeight: 600, color: 'var(--ld-semantic-color-text-subtle, #74767C)', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
        {label}
      </Caption>
      {children}
    </div>
  );
}

function PatternGrid({children}: {children: React.ReactNode}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
    }}>
      {children}
    </div>
  );
}

export default function ButtonGroupPage() {
  return (
    <PageWrapper
      title="Button Group"
      category="Core Components"
      description="Layout container for arranging multiple related buttons. The unopinionated `ButtonGroup` primitive (from `core/Button`) just lays buttons out in a row with consistent spacing. The `ButtonGroupPatterns` helper renders the recommended Living Design 3.5 patterns — primary/secondary, stacked, three-options — for you."
    >
      <ExampleSection
        title="Default — three actions"
        description="The simple primitive lays children out in a horizontal row with consistent LD spacing and a `role=&quot;list&quot;` for assistive tech."
      >
        <ButtonGroup aria-label="Document actions">
          <Button variant="primary">Save</Button>
          <Button variant="secondary">Discard</Button>
          <Button variant="tertiary">Preview</Button>
        </ButtonGroup>
      </ExampleSection>

      <ExampleSection
        title="Mixed variants"
        description="Combine primary and tertiary buttons for a strong CTA + cancel."
      >
        <ButtonGroup aria-label="Order actions">
          <Button variant="primary">Submit Order</Button>
          <Button variant="tertiary">Cancel</Button>
        </ButtonGroup>
      </ExampleSection>

      <ExampleSection
        title="Many buttons"
        description="Wraps automatically on narrow viewports."
      >
        <ButtonGroup aria-label="Filter actions">
          <Button variant="secondary">All</Button>
          <Button variant="secondary">Pending</Button>
          <Button variant="secondary">Processing</Button>
          <Button variant="secondary">Shipped</Button>
          <Button variant="secondary">Delivered</Button>
        </ButtonGroup>
      </ExampleSection>

      <div style={{marginTop: '48px'}}>
        <SectionTitle>Inline Patterns</SectionTitle>
        <SectionDesc>
          Side-by-side buttons on the same row. Use when two actions are equally visible and screen width allows. The <strong>Preferred</strong> (primary) action is always on the right. Supports full-width (fills container) and auto-width variants.
        </SectionDesc>

        <PatternGrid>
          <PatternCard
            name="Primary / Secondary"
            tag="Most common"
            description="The standard two-button pattern. Use for key decision points like 'Confirm / Cancel' or 'Check in / View details'."
          >
            <VariantGroup label="Full width">
              <ButtonGroupPatterns layout="inline" pattern="primary-secondary" fullWidth preferredLabel="Preferred" alternateLabel="Alternate" />
            </VariantGroup>
            <VariantGroup label="Auto width">
              <ButtonGroupPatterns layout="inline" pattern="primary-secondary" fullWidth={false} preferredLabel="Preferred" alternateLabel="Alternate" />
            </VariantGroup>
          </PatternCard>

          <PatternCard
            name="Primary / Tertiary"
            description="Strong primary action paired with a lower-emphasis alternative. Use when the alternate path is optional or destructive."
          >
            <VariantGroup label="Full width">
              <ButtonGroupPatterns layout="inline" pattern="primary-tertiary" fullWidth preferredLabel="Preferred" alternateLabel="Alternate" />
            </VariantGroup>
            <VariantGroup label="Auto width">
              <ButtonGroupPatterns layout="inline" pattern="primary-tertiary" fullWidth={false} preferredLabel="Preferred" alternateLabel="Alternate" />
            </VariantGroup>
          </PatternCard>

          <PatternCard
            name="Secondary / Tertiary"
            description="Use when neither action is the primary CTA — e.g. 'Reschedule / Cancel' inside a card with a primary action above."
          >
            <VariantGroup label="Full width">
              <ButtonGroupPatterns layout="inline" pattern="secondary-tertiary" fullWidth preferredLabel="Preferred" alternateLabel="Alternate" />
            </VariantGroup>
            <VariantGroup label="Auto width">
              <ButtonGroupPatterns layout="inline" pattern="secondary-tertiary" fullWidth={false} preferredLabel="Preferred" alternateLabel="Alternate" />
            </VariantGroup>
          </PatternCard>

          <PatternCard
            name="Tertiary / Tertiary"
            description="Two equal-weight text link buttons. Use only when both actions are supplementary — e.g. 'Learn more / Skip' inside an informational card."
          >
            <VariantGroup label="Full width">
              <ButtonGroupPatterns layout="inline" pattern="tertiary-tertiary" fullWidth preferredLabel="Preferred" alternateLabel="Alternate" />
            </VariantGroup>
            <VariantGroup label="Auto width">
              <ButtonGroupPatterns layout="inline" pattern="tertiary-tertiary" fullWidth={false} preferredLabel="Preferred" alternateLabel="Alternate" />
            </VariantGroup>
          </PatternCard>
        </PatternGrid>
      </div>

      <div style={{marginTop: '48px'}}>
        <SectionTitle>Stacked Patterns</SectionTitle>
        <SectionDesc>
          Vertically stacked full-width buttons. Use in narrow contexts like bottom sheets or action footers where horizontal space is constrained. The <strong>Preferred</strong> action is always on top.
        </SectionDesc>

        <PatternGrid>
          <PatternCard
            name="Primary / Secondary"
            tag="Most common"
            description="The standard stacked pattern — preferred primary action on top, alternate secondary below. Common in checkout flows and bottom sheets."
          >
            <ButtonGroupPatterns layout="stacked" pattern="primary-secondary" preferredLabel="Preferred" alternateLabel="Alternate" />
          </PatternCard>

          <PatternCard
            name="Primary / Tertiary"
            description="Strong primary action with a lower-emphasis alternative below. Use when the alternate is a 'dismiss' or 'skip' type action."
          >
            <ButtonGroupPatterns layout="stacked" pattern="primary-tertiary" preferredLabel="Preferred" alternateLabel="Alternate" />
          </PatternCard>

          <PatternCard
            name="Secondary / Tertiary"
            description="Use when a primary action already exists above the button group — e.g. inside a card where the main CTA is the card title or image link."
          >
            <ButtonGroupPatterns layout="stacked" pattern="secondary-tertiary" preferredLabel="Preferred" alternateLabel="Alternate" />
          </PatternCard>

          <PatternCard
            name="3 Options"
            tag="Complex"
            description="An inline Primary/Secondary row on top with a tertiary link below. Use sparingly — only when a third, lower-priority path is required (e.g. 'Get it now / Edit items' + 'Cancel order')."
          >
            <ButtonGroupPatterns layout="stacked" pattern="three-options" preferredLabel="Preferred" alternateLabel="Alternate" thirdLabel="Alternate" />
          </PatternCard>
        </PatternGrid>
      </div>

      <GuidelinesSection
        description="Use a button group when actions belong to the same decision or workflow step. Limit groups to the fewest choices possible, keep preferred action placement consistent, and switch to stacked patterns when horizontal space is constrained."
      />
    </PageWrapper>
  );
}
