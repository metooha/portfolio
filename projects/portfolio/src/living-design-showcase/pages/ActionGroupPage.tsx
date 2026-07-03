import * as React from 'react';
import {ActionGroup} from '@/living-design/components/ActionGroup/ActionGroup';
import {Tag} from '@/living-design/components/Tag';
import {Body, Caption} from '@/living-design/components/Text/Text';
import {
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type InlinePattern = 'primary-secondary' | 'primary-tertiary' | 'secondary-tertiary' | 'tertiary-tertiary';
type StackedPattern = 'primary-secondary' | 'primary-tertiary' | 'secondary-tertiary' | 'three-options';

const INLINE_PATTERNS: Array<{
  pattern: InlinePattern;
  label: string;
  tag?: string;
  description: string;
}> = [
  {
    pattern: 'primary-secondary',
    label: 'Primary / Secondary',
    tag: 'Most common',
    description: "The standard two-button pattern. Use for key decision points like 'Confirm / Cancel' or 'Check in / View details'.",
  },
  {
    pattern: 'primary-tertiary',
    label: 'Primary / Tertiary',
    description: 'Strong primary action paired with a lower-emphasis alternative. Use when the alternate path is optional or destructive.',
  },
  {
    pattern: 'secondary-tertiary',
    label: 'Secondary / Tertiary',
    description: "Use when neither action is the primary CTA — e.g. 'Reschedule / Cancel' inside a card with a primary action above.",
  },
  {
    pattern: 'tertiary-tertiary',
    label: 'Tertiary / Tertiary',
    description: "Two equal-weight text link buttons. Use only when both actions are supplementary — e.g. 'Learn more / Skip' inside an informational card.",
  },
];

const STACKED_PATTERNS: Array<{
  pattern: StackedPattern;
  label: string;
  tag?: string;
  description: string;
  hasThird?: boolean;
}> = [
  {
    pattern: 'primary-secondary',
    label: 'Primary / Secondary',
    tag: 'Most common',
    description: 'The standard stacked pattern — preferred primary action on top, alternate secondary below. Common in checkout flows and bottom sheets.',
  },
  {
    pattern: 'primary-tertiary',
    label: 'Primary / Tertiary',
    description: "Strong primary action with a lower-emphasis alternative below. Use when the alternate is a 'dismiss' or 'skip' type action.",
  },
  {
    pattern: 'secondary-tertiary',
    label: 'Secondary / Tertiary',
    description: 'Use when a primary action already exists above the button group — e.g. inside a card where the main CTA is the card title or image link.',
  },
  {
    pattern: 'three-options',
    label: '3 Options',
    tag: 'Complex',
    description: "An inline Primary/Secondary row on top with a tertiary link below. Use sparingly — only when a third, lower-priority path is required (e.g. 'Get it now / Edit items' + 'Cancel order').",
    hasThird: true,
  },
];

function CardTitle({name, tag}: {name: string; tag?: string}) {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flexWrap: 'wrap'}}>
      <Body as="span" size="medium" weight="alt">{name}</Body>
      {tag ? <Tag color="blue">{tag}</Tag> : null}
    </div>
  );
}

function VariantGroup({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
      <Caption as="span" weight="alt" style={{textTransform: 'uppercase', letterSpacing: '0.5px'}}>
        {label}
      </Caption>
      {children}
    </div>
  );
}

export default function ActionGroupPage() {
  return (
    <PageWrapper
      title="Action Groups"
      category="WCP Components"
      description="WCP button group patterns for mobile cards, action footers, and bottom sheets. Each pattern specifies which LD 3.5 button variants to pair and in what order — primary action always on the right (inline) or top (stacked)."
    >
      <ExampleSection
        title="Inline patterns"
        description="Side-by-side buttons on the same row. Use when two actions are equally visible and screen width allows. The Preferred (primary) action is always on the right. Supports full-width and auto-width."
      >
        <DocsGrid minColumnWidth={320}>
          {INLINE_PATTERNS.map((item) => (
            <DocsCard key={item.pattern} description={item.description}>
              <CardTitle name={item.label} tag={item.tag} />
              <VariantGroup label="Full width">
                <ActionGroup
                  layout="inline"
                  pattern={item.pattern}
                  fullWidth
                  preferredLabel="Preferred"
                  alternateLabel="Alternate"
                />
              </VariantGroup>
              <VariantGroup label="Auto width">
                <ActionGroup
                  layout="inline"
                  pattern={item.pattern}
                  fullWidth={false}
                  preferredLabel="Preferred"
                  alternateLabel="Alternate"
                />
              </VariantGroup>
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Stacked patterns"
        description="Vertically stacked full-width buttons. Use in narrow contexts like bottom sheets or action footers where horizontal space is constrained. The Preferred action is always on top."
      >
        <DocsGrid minColumnWidth={320}>
          {STACKED_PATTERNS.map((item) => (
            <DocsCard key={item.pattern} description={item.description}>
              <CardTitle name={item.label} tag={item.tag} />
              <ActionGroup
                layout="stacked"
                pattern={item.pattern}
                preferredLabel="Preferred"
                alternateLabel="Alternate"
                thirdLabel={item.hasThird ? 'Alternate' : undefined}
              />
            </DocsCard>
          ))}
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Pair Action Groups by emphasis: pick the lowest-emphasis pattern that still reads as actionable. The preferred (primary) action always sits on the right when inline and on top when stacked, so users encounter it last in the reading order. Use stacked layouts in narrow contexts (cards, bottom sheets, mobile footers); use inline layouts when the surface can hold both buttons without truncation."
        defaultValue="layout='inline', pattern='primary-secondary', fullWidth=true"
      />
    </PageWrapper>
  );
}
