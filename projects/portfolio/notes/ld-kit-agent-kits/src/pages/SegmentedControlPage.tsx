import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button/Button';
import {Checkbox} from '../components/Checkbox/Checkbox';
import {SegmentedControl} from '../components/SegmentedControl/SegmentedControl';
import {Body} from '../components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type SegmentCount = 2 | 3 | 4 | 5;

const COUNT_OPTIONS: SegmentCount[] = [2, 3, 4, 5];

function makeItems(count: SegmentCount) {
  return Array.from({length: count}).map((_, index) => ({
    value: String.fromCharCode(97 + index),
    label: `Label ${String.fromCharCode(65 + index)}`,
  }));
}

export default function SegmentedControlPage() {
  const [count, setCount] = React.useState<SegmentCount>(3);
  const [isFullWidth, setIsFullWidth] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [value, setValue] = React.useState('a');
  const items = makeItems(count);

  return (
    <PageWrapper
      title="Segmented Control"
      category="Shared Components"
      description="A linear set of 2-5 mutually exclusive segments, each functioning as a button. Used for switching between related views or filtering content."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview segment count, full-width layout, and disabled state."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Segment count</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Segmented Control supports 2 through 5 segments. Use ButtonGroup for more.
                </Body>
              </div>
              <ButtonGroup aria-label="Segment count">
                {COUNT_OPTIONS.map((option) => (
                  <Button
                    key={option}
                    size="small"
                    variant={count === option ? 'primary' : 'secondary'}
                    aria-pressed={count === option}
                    onClick={() => {
                      setCount(option);
                      setValue('a');
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox label="Full width" checked={isFullWidth} onChange={(event) => setIsFullWidth(event.target.checked)} />
                <Checkbox label="Disabled" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
              </div>
            </>
          }
          preview={
            <DocsCard title={`${count}-segment control`} description="The active value is mirrored from the controls above.">
              <SegmentedControl
                aria-label={`${count}-segment preview`}
                value={value}
                onChange={setValue}
                isFullWidth={isFullWidth}
                disabled={disabled}
                items={items}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Layout and states" description="Use full width when the segmented control should span a form column or surface.">
        <DocsGrid>
          <DocsCard title="Full width" description="The control stretches to fill its container width.">
            <SegmentedControl
              aria-label="Full width example"
              value="a"
              onChange={() => {}}
              isFullWidth
              items={[
                {value: 'a', label: 'Daily'},
                {value: 'b', label: 'Weekly'},
                {value: 'c', label: 'Monthly'},
              ]}
            />
          </DocsCard>
          <DocsCard title="Disabled" description="All segments are disabled and non-interactive.">
            <SegmentedControl
              aria-label="Disabled example"
              value="a"
              onChange={() => {}}
              disabled
              items={makeItems(3)}
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Segmented Control for switching between two and five mutually exclusive views or filters. Keep labels parallel, short, and equal in visual weight. Switch to ButtonGroup or Tab Navigation when the choices need more than five segments or carry distinct emphasis."
        defaultValue="value=first option, isFullWidth=false"
      />
    </PageWrapper>
  );
}
