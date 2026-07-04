import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Button} from '@/app/components/Button/Button';
import {PrimarySection, SecondarySection, TertiarySection} from '@/app/components/Section/Section';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function SectionPage() {
  return (
    <PageWrapper
      title="Section"
      category="Layout"
      description="A section shell that pairs a titled header (with optional actions, divider, and collapse) with a content body. Three levels express hierarchy."
    >
      <ExampleSection title="Levels" description="Primary, secondary, and tertiary sections scale heading size, padding, and elevation.">
        <div style={{display: 'grid', gap: 24}}>
          <PrimarySection title="Primary section" description="Top-level grouping for a page region." divider>
            <Body as="p" size="medium" color="subtle" style={{margin: 0}}>Prominent heading, generous padding, and the strongest elevation.</Body>
          </PrimarySection>
          <SecondarySection title="Secondary section" description="A sub-region within a primary section." divider>
            <Body as="p" size="medium" color="subtle" style={{margin: 0}}>Medium heading with moderate padding.</Body>
          </SecondarySection>
          <TertiarySection title="Tertiary section" description="A compact nested grouping.">
            <Body as="p" size="medium" color="subtle" style={{margin: 0}}>Compact heading with flat styling.</Body>
          </TertiarySection>
        </div>
      </ExampleSection>

      <ExampleSection title="With actions" description="Use the actions slot for controls that operate on the whole section.">
        <SecondarySection
          title="Recent orders"
          description="Placed in the last 30 days"
          divider
          actions={<Button size="small" variant="secondary">View all</Button>}
        >
          <Body as="p" size="medium" color="subtle" style={{margin: 0}}>Section content sits below the header row.</Body>
        </SecondarySection>
      </ExampleSection>

      <ExampleSection title="Collapsible" description="Set collapsible to let users toggle the body. defaultOpen controls the initial state.">
        <SecondarySection title="Advanced settings" collapsible defaultOpen={false}>
          <Body as="p" size="medium" color="subtle" style={{margin: 0}}>Hidden until the user expands the section.</Body>
        </SecondarySection>
      </ExampleSection>

      <GuidelinesSection
        description="Use Section to give a titled, consistently spaced container to a region of content. Match the level to the visual hierarchy rather than the DOM depth. Add a divider when the header needs clear separation from dense content, and only make a section collapsible when hiding it by default genuinely reduces clutter."
        defaultValue="divider={false}  collapsible={false}  defaultOpen={true}"
      />
    </PageWrapper>
  );
}
