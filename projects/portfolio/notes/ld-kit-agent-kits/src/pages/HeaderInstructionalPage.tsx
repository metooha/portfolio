import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button';
import {Checkbox} from '../components/Checkbox';
import {Body} from '../components/Text/Text';
import {
  HeaderInstructional,
  type HeaderInstructionalNavigation,
} from '../components/HeaderInstructional';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const NAVIGATION: Array<{label: string; value: HeaderInstructionalNavigation}> = [
  {label: 'None', value: 'None'},
  {label: 'Chevron', value: 'Chevron'},
  {label: 'LinkButton', value: 'LinkButton'},
];

const FRAME: React.CSSProperties = {
  borderRadius: 8,
  background: 'var(--ld-semantic-color-surface, #ffffff)',
  maxWidth: 520,
  overflow: 'hidden',
};

export default function HeaderInstructionalPage() {
  const [navigation, setNavigation] = React.useState<HeaderInstructionalNavigation>('None');
  const [showCount, setShowCount] = React.useState(true);
  const [showDescription, setShowDescription] = React.useState(true);
  const [bottomPadding, setBottomPadding] = React.useState(false);

  return (
    <PageWrapper
      title="Header Instructional"
      category="Subsystem Components"
      description="A top-of-screen instructional header that sets context for an L2 screen and optionally exposes a trailing navigation action."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview count, description, bottom spacing, and trailing action behavior."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Trailing action</Body>
                <ButtonGroup>
                  {NAVIGATION.map((item) => (
                    <Button
                      key={item.value}
                      size="small"
                      variant={navigation === item.value ? 'primary' : 'secondary'}
                      onClick={() => setNavigation(item.value)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <Checkbox label="Show count" checked={showCount} onChange={(event) => setShowCount(event.target.checked)} />
              <Checkbox label="Show description" checked={showDescription} onChange={(event) => setShowDescription(event.target.checked)} />
              <Checkbox label="Add bottom padding" checked={bottomPadding} onChange={(event) => setBottomPadding(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description="Header Instructional is intended for top-level screen context.">
              <div style={FRAME}>
                <HeaderInstructional
                  title="Review and start an action"
                  count={showCount ? 5 : null}
                  description={showDescription ? 'Your personalized actions are shown below in order of impact.' : null}
                  navigation={navigation}
                  trailingLabel="See all"
                  bottomPadding={bottomPadding}
                  onTrailingAction={() => {}}
                />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Patterns" description="Choose the smallest header shape that communicates the screen purpose.">
        <DocsGrid>
          <DocsCard title="Title only" description="Use when the surrounding view already provides enough context.">
            <div style={FRAME}><HeaderInstructional title="Review actions" /></div>
          </DocsCard>
          <DocsCard title="Title and count" description="Counts summarize the size of the following work set.">
            <div style={FRAME}><HeaderInstructional title="Pending tasks" count={5} /></div>
          </DocsCard>
          <DocsCard title="Description and action" description="Use an explicit action label when the destination is not obvious.">
            <div style={FRAME}>
              <HeaderInstructional title="Today's plan" count={3} description="Review the highest-impact work first." navigation="LinkButton" trailingLabel="See all" />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use this header once at the top of an instructional screen. Keep titles short, reserve counts for item totals, and prefer LinkButton when the trailing action needs a visible label."
        defaultValue="navigation='None', bottomPadding=false"
      />
    </PageWrapper>
  );
}