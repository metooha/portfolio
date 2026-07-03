import * as React from 'react';

import {Slider} from '../components/Slider/Slider';
import {Body, Heading} from '../components/Text/Text';
import {
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

export default function SliderPage() {
  const [value1, setValue1] = React.useState([50]);
  const [value2, setValue2] = React.useState([25]);
  const [value3, setValue3] = React.useState([0]);
  const [price, setPrice] = React.useState([40]);
  const [rangeValue, setRangeValue] = React.useState([20, 80]);
  const [priceRange, setPriceRange] = React.useState([150, 650]);

  return (
    <PageWrapper
      title="Slider"
      category="Shared Components"
      description="Sliders allow users to select a value from a continuous or discrete range by dragging a thumb along a track. Supports mouse drag, click-to-seek, and full keyboard navigation."
    >
      <ExampleSection title="Component Configuration" description="A single-value slider with default range 0-100.">
        <DocsCard title="Basic slider" style={{maxWidth: 'min(480px, 100%)'}}>
          <Slider value={value1} onValueChange={setValue1} max={100} step={1} ariaLabel="Basic slider" />
          <Body as="p" size="small" color="subtle" style={{margin: '12px 0 0'}}>
            Value: {value1[0]}
          </Body>
        </DocsCard>
      </ExampleSection>

      <ExampleSection title="Ranges and steps" description="Configure min, max, and step to match the underlying domain.">
        <DocsGrid>
          <DocsCard title="Custom range (0-200, step 5)" description="A slider with custom min, max, and step values.">
            <Slider value={value2} onValueChange={setValue2} min={0} max={200} step={5} ariaLabel="Custom range slider" />
            <Body as="p" size="small" color="subtle" style={{margin: '12px 0 0'}}>
              Value: {value2[0]}
            </Body>
          </DocsCard>
          <DocsCard title="Custom steps (step=10)" description="A slider that snaps to increments of 10.">
            <Slider value={value3} onValueChange={setValue3} min={0} max={100} step={10} ariaLabel="Custom steps slider" />
            <Body as="p" size="small" color="subtle" style={{margin: '12px 0 0'}}>
              Value: {value3[0]}
            </Body>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Labels and values"
        description="Add a label and value header plus min/max captions. Pass valueLabel as a node (e.g. a formatted string) or as true to render the raw value."
      >
        <DocsGrid>
          <DocsCard title="Label, value, and min/max" description="The full PX layout with header and footer chrome.">
            <Slider
              value={price}
              onValueChange={setPrice}
              min={0}
              max={100}
              step={1}
              label="Brightness"
              valueLabel={`${price[0]}%`}
              minLabel="0%"
              maxLabel="100%"
            />
          </DocsCard>
          <DocsCard title="Auto value (valueLabel)" description="Pass valueLabel={true} to render the current value automatically.">
            <Slider
              defaultValue={[60]}
              min={0}
              max={100}
              step={5}
              label="Volume"
              valueLabel
              minLabel="Min value"
              maxLabel="Max value"
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Type: single and range"
        description="A range slider has two thumbs and a value of [low, high]. The number of thumbs is inferred from the value array length."
      >
        <DocsGrid>
          <DocsCard title="Range" description="Two thumbs select a low and high bound.">
            <Slider
              value={rangeValue}
              onValueChange={setRangeValue}
              min={0}
              max={100}
              step={1}
              label="Range"
              valueLabel={`${rangeValue[0]} – ${rangeValue[1]}`}
              minLabel="Min value"
              maxLabel="Max value"
            />
          </DocsCard>
          <DocsCard title="Price range" description="A range slider used to filter a price band.">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={1000}
              step={10}
              label="Price"
              valueLabel={`$${priceRange[0]} – $${priceRange[1]}`}
              minLabel="$0"
              maxLabel="$1,000"
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Use size to switch between the large (default) and small variants. Small uses a thinner track, smaller thumb, and a 12px semibold label."
      >
        <DocsGrid>
          <DocsCard title="Large (default)" description="8px track, 20px thumb, 14px bold label.">
            <Slider
              defaultValue={[50]}
              size="large"
              label="Large"
              valueLabel
              minLabel="Min value"
              maxLabel="Max value"
            />
          </DocsCard>
          <DocsCard title="Small" description="6px track, 16px thumb, 12px semibold label.">
            <Slider
              defaultValue={[50]}
              size="small"
              label="Small"
              valueLabel
              minLabel="Min value"
              maxLabel="Max value"
            />
          </DocsCard>
          <DocsCard title="Small range" description="The small variant also supports range mode.">
            <Slider
              defaultValue={[30, 70]}
              size="small"
              label="Small range"
              valueLabel
              minLabel="Min value"
              maxLabel="Max value"
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="States" description="Uncontrolled, disabled, and form integration.">
        <DocsGrid>
          <DocsCard title="Uncontrolled with defaultValue" description="A slider with an initial value of 60, uncontrolled.">
            <Slider defaultValue={[60]} max={100} step={1} ariaLabel="Uncontrolled slider" />
          </DocsCard>
          <DocsCard title="Disabled" description="A disabled slider cannot be interacted with.">
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              disabled
              label="Disabled"
              valueLabel
              minLabel="Min value"
              maxLabel="Max value"
            />
          </DocsCard>
          <DocsCard title="Disabled range" description="The disabled state applies to range sliders too.">
            <Slider
              defaultValue={[30, 70]}
              max={100}
              step={1}
              disabled
              label="Disabled range"
              valueLabel
              minLabel="Min value"
              maxLabel="Max value"
            />
          </DocsCard>
          <DocsCard title="With form name" description='Hidden input name for form submission.'>
            <Slider defaultValue={[40]} max={100} step={1} name="volume" ariaLabel="Volume" />
            <Body as="p" size="small" color="subtle" style={{margin: '12px 0 0'}}>
              Hidden input name: &quot;volume&quot;
            </Body>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Slider when the value is part of a continuous range that benefits from a visual position (volume, brightness, ratings, count windows). Provide step values that match the underlying domain so keyboard users get predictable increments. For discrete option sets, use Segmented Control or Radio instead."
        defaultValue="defaultValue=[0], min=0, max=100, step=1"
      >
        <div style={{display: 'grid', gap: 8}}>
          <Heading as="h3" size="small" style={{margin: 0}}>
            ♿ Accessibility recommendation
          </Heading>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            For optimal accessibility, pair every Slider with a visible text input field that shows and accepts the current value. Sliders rely on drag gestures that are difficult for motor-impaired users and impossible for users who rely on screen-reader browse mode. A companion input lets users type an exact value directly, satisfying WCAG 2.1 Success Criterion 2.5.1 (Pointer Gestures) and ensuring the control is operable without a pointer device.
          </Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
            The Slider itself remains keyboard-accessible (arrow keys, Home, End), but pairing with an input is strongly recommended for any production use case where users may enter precise values.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
