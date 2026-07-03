import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {
  SectionHeader,
  type SectionHeaderSize,
  type SectionHeaderTrailing,
} from '@/living-design/components/SectionHeader/SectionHeader';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const SIZES: Array<{value: SectionHeaderSize; label: string}> = [
  {value: 'large', label: 'Large'},
  {value: 'small', label: 'Small'},
];

const TRAILING_OPTIONS: Array<{value: SectionHeaderTrailing; label: string}> = [
  {value: 'none', label: 'None'},
  {value: 'link', label: 'Link button'},
  {value: 'chevron', label: 'Chevron (expand)'},
];

export default function SectionHeaderPage() {
  const [size, setSize] = React.useState<SectionHeaderSize>('large');
  const [trailing, setTrailing] = React.useState<SectionHeaderTrailing>('link');
  const [showCount, setShowCount] = React.useState(true);
  const [showDescription, setShowDescription] = React.useState(true);
  const [showDivider, setShowDivider] = React.useState(true);
  const [expanded, setExpanded] = React.useState(true);

  return (
    <PageWrapper
      title="Section Header"
      category="Shared Components"
      description="AX section header with title, optional count, description, and configurable trailing (link button or expand/collapse chevron). Two sizes: Large (heading/medium, 20px) and Small (heading/small, 18px)."
    >
      <ExampleSection
        title="Component Configuration"
        description="Use the control panel to configure size, trailing, and optional slots."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Size</Body>
              </div>
              <ButtonGroup aria-label="Section header size">
                {SIZES.map((item) => (
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

              <div style={{display: 'grid', gap: 8, minWidth: 0, marginTop: 8}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Trailing</Body>
              </div>
              <ButtonGroup aria-label="Trailing type">
                {TRAILING_OPTIONS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={trailing === item.value ? 'primary' : 'secondary'}
                    aria-pressed={trailing === item.value}
                    onClick={() => setTrailing(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>

              <div style={{display: 'grid', gap: 16, marginTop: 8}}>
                <Checkbox
                  label="Count"
                  checked={showCount}
                  onChange={(e) => setShowCount(e.target.checked)}
                />
                <Checkbox
                  label="Description"
                  checked={showDescription}
                  onChange={(e) => setShowDescription(e.target.checked)}
                />
                <Checkbox
                  label="Divider"
                  checked={showDivider}
                  onChange={(e) => setShowDivider(e.target.checked)}
                />
              </div>
            </>
          }
          preview={
            <DocsCard>
              <SectionHeader
                size={size}
                title="Title/instruction"
                count={showCount ? 5 : undefined}
                description={showDescription ? 'Description text' : undefined}
                trailing={trailing}
                trailingLabel="Button label"
                onTrailingClick={() => {}}
                expanded={expanded}
                onExpandChange={setExpanded}
                divider={showDivider}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Variants"
        description="Four combinations of size and trailing type."
      >
        <DocsGrid minColumnWidth={320}>
          <DocsCard>
            <SectionHeader
              size="large"
              title="Title/instruction"
              count={5}
              description="Description text"
              trailing="link"
              trailingLabel="Button label"
              onTrailingClick={() => {}}
            />
          </DocsCard>
          <DocsCard>
            <SectionHeader
              size="large"
              title="Title/instruction"
              count={5}
              description="Description text"
              trailing="chevron"
              expanded={true}
              onExpandChange={() => {}}
            />
          </DocsCard>
          <DocsCard>
            <SectionHeader
              size="small"
              title="Title/instruction"
              count={5}
              description="Description text"
              trailing="link"
              trailingLabel="Button label"
              onTrailingClick={() => {}}
            />
          </DocsCard>
          <DocsCard>
            <SectionHeader
              size="small"
              title="Title/instruction"
              count={5}
              description="Description text"
              trailing="chevron"
              expanded={true}
              onExpandChange={() => {}}
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Large for primary section breaks and Small for sub-sections within a screen. Use the link trailing for navigation to a full list or detail view. Use the chevron trailing for collapsible content panels. Count is optional — show it when the number of items is meaningful to the user."
        defaultValue="size='large', trailing='none', divider=true"
      />
    </PageWrapper>
  );
}
