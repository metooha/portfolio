import * as React from 'react';

import {Button, ButtonGroup} from '../components/Button';
import {Checkbox} from '../components/Checkbox';
import {Body} from '../components/Text/Text';
import {
  ToggleGroup,
  ToggleGroupItem,
  type ToggleGroupSize,
  type ToggleGroupVariant,
} from '../components/ToggleGroup';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const SIZES: ToggleGroupSize[] = ['small', 'medium', 'large'];
const VARIANTS: ToggleGroupVariant[] = ['default', 'outline'];

export default function ToggleGroupPage() {
  const [selectionType, setSelectionType] = React.useState<'single' | 'multiple'>('single');
  const [size, setSize] = React.useState<ToggleGroupSize>('medium');
  const [variant, setVariant] = React.useState<ToggleGroupVariant>('default');
  const [disableMiddle, setDisableMiddle] = React.useState(false);
  const [singleValue, setSingleValue] = React.useState('center');
  const [multipleValue, setMultipleValue] = React.useState<string[]>(['bold']);

  return (
    <PageWrapper
      title="Toggle Group"
      category="Subsystem Components"
      description="Grouped toggle buttons for single-choice segmented controls and multi-select formatting toolbars."
    >
      <ExampleSection title="Component Configuration" description="Preview selection mode, visual variant, size, and disabled item behavior.">
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Selection</Body>
                <ButtonGroup aria-label="Toggle group type">
                  <Button size="small" variant={selectionType === 'single' ? 'primary' : 'secondary'} onClick={() => setSelectionType('single')}>Single</Button>
                  <Button size="small" variant={selectionType === 'multiple' ? 'primary' : 'secondary'} onClick={() => setSelectionType('multiple')}>Multiple</Button>
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Variant</Body>
                <ButtonGroup aria-label="Toggle group variant">
                  {VARIANTS.map((item) => <Button key={item} size="small" variant={variant === item ? 'primary' : 'secondary'} onClick={() => setVariant(item)}>{item}</Button>)}
                </ButtonGroup>
              </div>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Size</Body>
                <ButtonGroup aria-label="Toggle group size">
                  {SIZES.map((item) => <Button key={item} size="small" variant={size === item ? 'primary' : 'secondary'} onClick={() => setSize(item)}>{item}</Button>)}
                </ButtonGroup>
              </div>
              <Checkbox label="Disable middle item" checked={disableMiddle} onChange={(event) => setDisableMiddle(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description={selectionType === 'single' ? `Active: ${singleValue || 'none'}` : `Active: ${multipleValue.join(', ') || 'none'}`}>
              {selectionType === 'single' ? (
                <ToggleGroup type="single" value={singleValue} onValueChange={setSingleValue} variant={variant} size={size} aria-label="Text alignment">
                  <ToggleGroupItem value="left">Left</ToggleGroupItem>
                  <ToggleGroupItem value="center" disabled={disableMiddle}>Center</ToggleGroupItem>
                  <ToggleGroupItem value="right">Right</ToggleGroupItem>
                </ToggleGroup>
              ) : (
                <ToggleGroup type="multiple" value={multipleValue} onValueChange={setMultipleValue} variant={variant} size={size} aria-label="Text formatting">
                  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
                  <ToggleGroupItem value="italic" disabled={disableMiddle}>Italic</ToggleGroupItem>
                  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
                </ToggleGroup>
              )}
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Toggle Patterns" description="Use controlled values when the surrounding view needs to reflect or submit selection state.">
        <DocsGrid>
          <DocsCard title="Single selection">
            <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment example">
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
          </DocsCard>
          <DocsCard title="Multiple selection" description="Useful for toolbars where multiple formatting options may be active.">
            <ToggleGroup type="multiple" defaultValue={['bold']} variant="outline" aria-label="Text formatting example">
              <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
              <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
              <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
            </ToggleGroup>
          </DocsCard>
          <DocsCard title="Sizes">
            <div style={{display: 'grid', gap: 16}}>
              {SIZES.map((item) => (
                <ToggleGroup key={item} type="single" defaultValue="one" size={item} aria-label={`${item} toggle group`}>
                  <ToggleGroupItem value="one">One</ToggleGroupItem>
                  <ToggleGroupItem value="two">Two</ToggleGroupItem>
                </ToggleGroup>
              ))}
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Toggle Group when options are mutually exclusive or when compact multi-select controls are needed. Provide an accessible group label, avoid long item text, and make disabled options visibly unavailable without changing group dimensions."
        defaultValue="type='single', variant='default', size='medium'"
      />
    </PageWrapper>
  );
}