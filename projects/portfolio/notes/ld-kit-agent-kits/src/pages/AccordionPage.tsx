import * as React from 'react';
import {Accordion, AccordionItem, AccordionHeader, AccordionPanel} from '../patterns/Accordion/Accordion';
import {Button, ButtonGroup} from '../components/Button';
import {Checkbox} from '../components/Checkbox';
import {Body} from '../components/Text/Text';
import {ComponentConfigurationCard, DocsCard, DocsGrid, PageWrapper, ExampleSection, GuidelinesSection} from './shared';

const FAQ_ITEMS = [
  {value: '1', title: 'What is Living Design?', body: 'Living Design is a portable design system that provides consistent UI components across different platforms and frameworks.'},
  {value: '2', title: 'How do I get started?', body: 'Import the components from the generated directory and use them directly in your React application.'},
  {value: '3', title: 'Is it accessible?', body: 'Yes. All components follow WAI-ARIA patterns with proper keyboard navigation and screen reader support.'},
];

function AccordionExample({multiple = false, collapsible = true}: {multiple?: boolean; collapsible?: boolean}) {
  return (
    <Accordion multiple={multiple} collapsible={collapsible} defaultOpenItems={['1']}>
      {FAQ_ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionHeader>{item.title}</AccordionHeader>
          <AccordionPanel>
            <Body as="p" size="medium">{item.body}</Body>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default function AccordionPage() {
  const [openItems, setOpenItems] = React.useState<Array<string | number>>(['1']);
  const [multiple, setMultiple] = React.useState(false);
  const [collapsible, setCollapsible] = React.useState(true);

  return (
    <PageWrapper title="Accordion" category="Shared Components" description="Expandable sections for organizing content into collapsible panels. Supports single and multiple open panels with controlled and uncontrolled modes.">
      <ExampleSection title="Component Configuration" description="Preview single or multiple open panels and whether the final open panel can collapse.">
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Selection mode</Body>
                <ButtonGroup aria-label="Accordion selection mode">
                  <Button size="small" variant={!multiple ? 'primary' : 'secondary'} onClick={() => setMultiple(false)}>Single</Button>
                  <Button size="small" variant={multiple ? 'primary' : 'secondary'} onClick={() => setMultiple(true)}>Multiple</Button>
                </ButtonGroup>
              </div>
              <Checkbox label="Collapsible" checked={collapsible} onChange={(event) => setCollapsible(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description={multiple ? 'Multiple panels may stay open.' : 'Opening one panel closes the previous panel.'}>
              <AccordionExample key={`${multiple}-${collapsible}`} multiple={multiple} collapsible={collapsible} />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Single panel (default)" description="Only one panel can be open at a time.">
        <DocsCard><AccordionExample /></DocsCard>
      </ExampleSection>

      <ExampleSection title="Multiple panels" description="Multiple panels can be open simultaneously.">
        <DocsGrid>
          <DocsCard title="Shipping and returns"><AccordionExample multiple /></DocsCard>
          <DocsCard title="Non-collapsible" description="At least one panel remains open."><AccordionExample collapsible={false} /></DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Controlled" description="Open items managed via state with onToggle callback.">
        <div>
          <Body as="p" size="small" color="subtle" style={{ marginBottom: '12px' }}>Open: {openItems.length > 0 ? openItems.join(', ') : 'none'}</Body>
          <Accordion openItems={openItems} onToggle={setOpenItems}>
            <AccordionItem value="1">
              <AccordionHeader>First</AccordionHeader>
              <AccordionPanel><Body as="p" size="medium">First panel content.</Body></AccordionPanel>
            </AccordionItem>
            <AccordionItem value="2">
              <AccordionHeader>Second</AccordionHeader>
              <AccordionPanel><Body as="p" size="medium">Second panel content.</Body></AccordionPanel>
            </AccordionItem>
            <AccordionItem value="3">
              <AccordionHeader>Third</AccordionHeader>
              <AccordionPanel><Body as="p" size="medium">Third panel content.</Body></AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Accordions for optional supporting information, not primary task steps. Keep headers concise, make panel content scannable, and use non-collapsible mode only when at least one answer must remain visible."
        defaultValue="multiple=false, collapsible=true"
      />
    </PageWrapper>
  );
}
