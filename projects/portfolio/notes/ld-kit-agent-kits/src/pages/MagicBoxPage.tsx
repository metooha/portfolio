import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {StarIcon} from '../components/Icons/Icons';
import {
  MagicBox,
  type MagicBoxBorderRadius,
  type MagicBoxState,
} from '../components/MagicBox/MagicBox';
import {Body, Heading} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const STATES: Array<{value: MagicBoxState; label: string; description: string}> = [
  {value: 'idle', label: 'Idle', description: 'A calm static treatment for ready AI content.'},
  {value: 'loading', label: 'Loading', description: 'A more active treatment for generation or processing.'},
  {value: 'active', label: 'Active', description: 'A subtle treatment for ongoing AI assistance.'},
];

/*
 * The MagicBox `borderRadius` prop maps to a primitive scale token in CSS.
 * Mirroring those tokens here lets the inner container the MagicBox borders
 * resolve to the *same* token — so the magic stroke and the content card's
 * own corner stay perfectly aligned across themes, instead of relying on
 * hard-coded pixel matches.
 */
const RADIUS_TOKEN: Record<MagicBoxBorderRadius, string> = {
  '25': 'var(--ld-primitive-scale-border-radius-25, 0.125rem)',
  '50': 'var(--ld-primitive-scale-border-radius-50, 0.25rem)',
  '100': 'var(--ld-primitive-scale-border-radius-100, 0.5rem)',
  '200': 'var(--ld-primitive-scale-border-radius-200, 1rem)',
  round: 'var(--ld-primitive-scale-border-radius-round, 62.5rem)',
};

const RADII: Array<{value: MagicBoxBorderRadius; label: string}> = [
  {value: '25', label: '25'},
  {value: '50', label: '50'},
  {value: '100', label: '100'},
  {value: '200', label: '200'},
  {value: 'round', label: 'Round'},
];

const baseCardStyle: React.CSSProperties = {
  background: 'var(--ld-semantic-color-surface, #ffffff)',
  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  borderRadius: RADIUS_TOKEN['200'],
  padding: 'var(--ld-primitive-scale-space-400, 2rem)',
};

function ContentCard({
  title,
  body,
  textAlign = 'center',
  icon,
}: {
  title: string;
  body: string;
  textAlign?: 'left' | 'center';
  icon?: React.ReactNode;
}) {
  return (
    <div style={{...baseCardStyle, textAlign}}>
      {icon ? <div style={{marginBottom: 12, color: 'var(--ld-semantic-color-action-fill-primary, #0071dc)'}}>{icon}</div> : null}
      <Heading as="h3" size="small" style={{margin: '0 0 8px'}}>{title}</Heading>
      <Body as="p" size="medium" color="subtle" style={{margin: 0}}>{body}</Body>
    </div>
  );
}

export default function MagicBoxPage() {
  const [state, setState] = React.useState<MagicBoxState>('loading');
  const [radius, setRadius] = React.useState<MagicBoxBorderRadius>('200');
  const [active, setActive] = React.useState(true);

  return (
    <PageWrapper
      title="Magic Box"
      category="Core Components"
      description="MagicBox wraps AI-enhanced content with an animated gradient border so users can quickly recognize active AI-driven areas."
    >
      <ExampleSection
        title="Component Configuration"
        description="Toggle the magic effect, switch between idle/loading/active states, and pick a border radius."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>State</Body>
              </div>
              <ButtonGroup aria-label="Magic box state">
                {STATES.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={state === item.value ? 'primary' : 'secondary'}
                    aria-pressed={state === item.value}
                    onClick={() => setState(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Border radius</Body>
              </div>
              <ButtonGroup aria-label="Magic box border radius">
                {RADII.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={radius === item.value ? 'primary' : 'secondary'}
                    aria-pressed={radius === item.value}
                    onClick={() => setRadius(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>

              <Checkbox label="Active (show glow)" checked={active} onChange={(event) => setActive(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description="The glow only renders while active is true.">
              <MagicBox active={active} state={state} borderRadius={radius}>
                <ContentCard
                  title="AI is generating your content"
                  body="The glowing border appears only while AI is active."
                  icon={<StarIcon size="large" />}
                />
              </MagicBox>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Real-world recommendation"
        description="Pair MagicBox with accessible status messaging for recommendations and other live AI updates."
      >
        <DocsCard>
          <div
            role="status"
            aria-live="polite"
            style={{height: 1, overflow: 'hidden', position: 'absolute', width: 1}}
          >
            AI is generating personalized recommendations.
          </div>

          <MagicBox active state="loading" borderRadius="200">
            <div style={baseCardStyle}>
              <div style={{display: 'flex', gap: 16, alignItems: 'flex-start'}}>
                <div
                  aria-hidden
                  style={{
                    alignItems: 'center',
                    background: 'var(--ld-semantic-color-fill-subtle-info, #edf4ff)',
                    borderRadius: 8,
                    color: 'var(--ld-semantic-color-text, #2e2f32)',
                    display: 'flex',
                    flexShrink: 0,
                    fontSize: 12,
                    fontWeight: 700,
                    height: 84,
                    justifyContent: 'center',
                    width: 84,
                  }}
                >
                  AI
                </div>
                <div style={{flex: 1}}>
                  <Body as="p" size="medium" weight="alt" style={{margin: '0 0 8px'}}>AI-powered recommendation</Body>
                  <Body as="p" size="small" color="subtle" style={{margin: '0 0 12px', lineHeight: '1.5'}}>
                    Based on your recent activity, this item is predicted to match your preferences.
                  </Body>
                  <ButtonGroup>
                    <Button variant="primary" size="small">View details</Button>
                    <Button variant="tertiary" size="small">Dismiss</Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </MagicBox>
        </DocsCard>
      </ExampleSection>

      <ExampleSection
        title="Multiple AI items"
        description="Use MagicBox selectively within mixed layouts so users can scan which cards are AI-assisted at a glance."
      >
        <DocsGrid minColumnWidth={240}>
          <MagicBox active state="loading" borderRadius="200">
            <ContentCard
              textAlign="left"
              title="Suggestion 1"
              body="AI is analyzing your behavior to draft this recommendation."
            />
          </MagicBox>
          <MagicBox active state="active" borderRadius="200">
            <ContentCard
              textAlign="left"
              title="Suggestion 2"
              body="AI enhancement remains active and adapts to new interactions."
            />
          </MagicBox>
          <ContentCard
            textAlign="left"
            title="Regular content"
            body="This card has no AI processing and intentionally uses no magic border."
          />
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Border radius variants"
        description="MagicBox supports multiple radius options to align with pills, cards, and dense utility surfaces. The inner container resolves to the same `border-radius-*` token as the MagicBox so the magic stroke borders the content edge precisely."
      >
        <DocsCard>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--ld-primitive-scale-space-150, 12px)',
            }}
          >
            {RADII.map((item) => (
              <MagicBox key={item.value} active state="active" borderRadius={item.value}>
                <div
                  style={{
                    ...baseCardStyle,
                    /* Same primitive radius token as the MagicBox variant so
                     * the inner container's corner stays exactly aligned with
                     * the magic stroke regardless of theme. */
                    borderRadius: RADIUS_TOKEN[item.value],
                    padding: 'var(--ld-primitive-scale-space-200, 1rem)',
                    minWidth: 160,
                  }}
                >
                  <Body as="p" size="small" weight="alt" style={{margin: 0}}>
                    Radius: {item.label}
                  </Body>
                </div>
              </MagicBox>
            ))}
          </div>
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use MagicBox to label AI-assisted surfaces — recommendations, generated copy, drafts. Toggle active off when AI is idle so users do not see a glow tied to static content. Pair with a visually-hidden live region so screen reader users get the same status without relying on the animation."
        defaultValue="active=false, state='idle', borderRadius='100'"
      />
    </PageWrapper>
  );
}
