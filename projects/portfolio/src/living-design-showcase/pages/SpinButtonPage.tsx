import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button/Button';
import {Checkbox} from '@/living-design/components/Checkbox/Checkbox';
import {SpinButton} from '@/living-design/components/SpinButton/SpinButton';
import {Body} from '@/living-design/components/Text/Text';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const STEP_OPTIONS = [
  {value: 1, label: '1'},
  {value: 5, label: '5'},
  {value: 10, label: '10'},
];

export default function SpinButtonPage() {
  const [configValue, setConfigValue] = React.useState(5);
  const [configStep, setConfigStep] = React.useState(1);
  const [configDisabled, setConfigDisabled] = React.useState(false);
  const [value2, setValue2] = React.useState(50);
  const [value3, setValue3] = React.useState(0);
  const [boundMin, setBoundMin] = React.useState(0);
  const [boundMax, setBoundMax] = React.useState(10);

  return (
    <PageWrapper
      title="SpinButton"
      category="Core Components"
      description="Numeric input with increment/decrement buttons and keyboard control. Supports min/max bounds, custom step sizes, and disabled state."
    >
      <ExampleSection title="Component Configuration" description="Adjust step size and disabled state to see how SpinButton responds.">
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Step</Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  How much each click increments or decrements the value.
                </Body>
              </div>
              <ButtonGroup aria-label="Step size">
                {STEP_OPTIONS.map((item) => (
                  <Button
                    key={item.value}
                    size="small"
                    variant={configStep === item.value ? 'primary' : 'secondary'}
                    aria-pressed={configStep === item.value}
                    onClick={() => setConfigStep(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </ButtonGroup>
              <div style={{display: 'grid', gap: 16}}>
                <Checkbox
                  label="Disabled"
                  checked={configDisabled}
                  onChange={(event) => setConfigDisabled(event.target.checked)}
                />
              </div>
            </>
          }
          preview={
            <DocsCard title="Preview" description="Live SpinButton with the selected configuration.">
              <SpinButton
                label="Quantity"
                value={configValue}
                onChange={setConfigValue}
                min={0}
                max={99}
                step={configStep}
                disabled={configDisabled}
              />
              <Body as="p" size="small" color="subtle" style={{margin: '8px 0 0'}}>Value: {configValue}</Body>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Range and step" description="Match the step to the underlying domain.">
        <DocsGrid>
          <DocsCard title="Custom step" description="Incrementing by 10 within a 0-100 range." style={{maxWidth: 240}}>
            <SpinButton label="Percentage" value={value2} onChange={setValue2} min={0} max={100} step={10} />
            <Body as="p" size="small" color="subtle" style={{margin: '8px 0 0'}}>Value: {value2}%</Body>
          </DocsCard>
          <DocsCard title="Negative range" description="Allowing negative values." style={{maxWidth: 240}}>
            <SpinButton label="Temperature" value={value3} onChange={setValue3} min={-50} max={50} step={5} />
            <Body as="p" size="small" color="subtle" style={{margin: '8px 0 0'}}>Value: {value3}°</Body>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="States" description="Disabled and at-bounds treatments.">
        <DocsGrid>
          <DocsCard title="Disabled" style={{maxWidth: 240}}>
            <SpinButton label="Locked value" value={42} disabled />
          </DocsCard>
          <DocsCard title="At minimum (0)" description="The decrement button disables when min is reached." style={{maxWidth: 240}}>
            <SpinButton label="At minimum" value={boundMin} onChange={setBoundMin} min={0} max={10} />
          </DocsCard>
          <DocsCard title="At maximum (10)" description="The increment button disables when max is reached." style={{maxWidth: 240}}>
            <SpinButton label="At maximum" value={boundMax} onChange={setBoundMax} min={0} max={10} />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use SpinButton for small, discrete numeric inputs where +/- is the natural mental model — quantity, percentage, count. For continuous values, use Slider. Provide an accessible label and consider matching step to the unit the user is thinking in (1 for items, 5 for time slots, 10 for percentages)."
        defaultValue="step=1, min=0, max=Infinity"
      />
    </PageWrapper>
  );
}
