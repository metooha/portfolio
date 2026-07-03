import * as React from 'react';

import {A11yAnnouncementProvider} from '@/living-design/components/A11yAnnouncement';
import {QuantityStepper} from '@/living-design/components/QuantityStepper/QuantityStepper';
import {Body, Heading} from '@/living-design/components/Text/Text';
import {
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  flexWrap: 'wrap',
};

type StepperVariant = 'primary' | 'secondary' | 'tertiary';

const VARIANT_DESCRIPTIONS: Record<StepperVariant, string> = {
  primary: 'Solid blue background. Use for primary add-to-cart actions.',
  secondary: 'White background with dark border. The default variant.',
  tertiary: 'Transparent background with subtle border.',
};

function VariantBlock({variant}: {variant: StepperVariant}) {
  return (
    <div style={{display: 'grid', gap: 16}}>
      <DocsCard title="+ Add (small / medium / large / disabled)">
        <div style={rowStyle}>
          <QuantityStepper variant={variant} size="small" />
          <QuantityStepper variant={variant} size="medium" />
          <QuantityStepper variant={variant} size="large" />
          <QuantityStepper variant={variant} size="medium" disabled />
        </div>
      </DocsCard>

      <DocsCard title="Icon-only (no label)">
        <div style={rowStyle}>
          <QuantityStepper variant={variant} size="small" showAddLabel={false} />
          <QuantityStepper variant={variant} size="medium" showAddLabel={false} />
          <QuantityStepper variant={variant} size="large" showAddLabel={false} />
        </div>
      </DocsCard>

      <DocsCard title="Add to cart">
        <div style={rowStyle}>
          <QuantityStepper variant={variant} size="small" cartLabel="Add to cart" />
          <QuantityStepper variant={variant} size="medium" cartLabel="Add to cart" />
          <QuantityStepper variant={variant} size="large" cartLabel="Add to cart" />
          <QuantityStepper variant={variant} size="medium" cartLabel="Add to cart" disabled />
        </div>
      </DocsCard>

      <DocsCard title="Active stepper (defaultCount=1)">
        <div style={rowStyle}>
          <QuantityStepper variant={variant} size="small" defaultCount={1} />
          <QuantityStepper variant={variant} size="medium" defaultCount={1} />
          <QuantityStepper variant={variant} size="large" defaultCount={1} />
        </div>
      </DocsCard>

      <DocsCard title="Max quantity reached (5 of 5)">
        <div style={rowStyle}>
          <QuantityStepper variant={variant} size="small" defaultCount={5} maxQuantity={5} />
          <QuantityStepper variant={variant} size="medium" defaultCount={5} maxQuantity={5} />
          <QuantityStepper variant={variant} size="large" defaultCount={5} maxQuantity={5} />
        </div>
      </DocsCard>
    </div>
  );
}

function OnChangeExample() {
  const [lastValue, setLastValue] = React.useState<number | null>(null);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap'}}>
      <QuantityStepper
        variant="secondary"
        size="medium"
        addLabel="Add Great Value Milk"
        onChange={(count) => setLastValue(count)}
      />
      <Body as="span" size="small" color="subtle">
        {lastValue !== null ? `onChange fired: ${lastValue}` : 'Interact with the stepper'}
      </Body>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Accessibility: unique-names product grid example
// ---------------------------------------------------------------------------

const DEMO_PRODUCTS = [
  {sku: '001', name: 'Great Value Whole Milk, 1 gal'},
  {sku: '002', name: 'Marketside Brioche Buns, 8 ct'},
  {sku: '003', name: 'Fresh Organic Bananas, 1 bunch'},
];

function A11yUniqueNamesExample() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
      }}
    >
      {DEMO_PRODUCTS.map((product) => (
        <div
          key={product.sku}
          style={{
            border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
            borderRadius: 8,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <Body as="p" size="small" style={{margin: 0}}>
            {product.name}
          </Body>
          {/* addLabel includes the product name → unique aria-label per card */}
          <QuantityStepper
            variant="primary"
            size="medium"
            addLabel={`Add ${product.name}`}
          />
        </div>
      ))}
    </div>
  );
}

export default function QuantityStepperPage() {
  return (
    // A11yAnnouncementProvider is required for QuantityStepper's live region
    // announcements to reach screen reader users. Without it, useA11yAnnouncement()
    // silently no-ops and AT users receive no feedback on quantity changes.
    <A11yAnnouncementProvider>
    <PageWrapper
      title="Quantity Stepper"
      category="Shared Components"
      description="A 3-mode quantity stepper that transitions between initial (Add), expanded (stepper), and collapsed (count) states. Supports primary, secondary, and tertiary variants in three sizes."
    >
      <ExampleSection title="Primary variant" description={VARIANT_DESCRIPTIONS.primary}>
        <VariantBlock variant="primary" />
      </ExampleSection>

      <ExampleSection title="Secondary variant" description={VARIANT_DESCRIPTIONS.secondary}>
        <VariantBlock variant="secondary" />
      </ExampleSection>

      <ExampleSection title="Tertiary variant" description={VARIANT_DESCRIPTIONS.tertiary}>
        <VariantBlock variant="tertiary" />
      </ExampleSection>

      <ExampleSection
        title="Trash on remove"
        description="Use showTrashOnRemove in cart/bag contexts. When count equals 1, the minus button becomes a trash icon. Clicking it removes the item entirely (sets count to 0)."
      >
        <DocsGrid>
          <DocsCard title="Secondary (start at 1)">
            <div style={rowStyle}>
              <QuantityStepper variant="secondary" size="small" defaultCount={1} showTrashOnRemove />
              <QuantityStepper variant="secondary" size="medium" defaultCount={1} showTrashOnRemove />
              <QuantityStepper variant="secondary" size="large" defaultCount={1} showTrashOnRemove />
            </div>
          </DocsCard>
          <DocsCard title="Tertiary (start at 1)">
            <div style={rowStyle}>
              <QuantityStepper variant="tertiary" size="small" defaultCount={1} showTrashOnRemove />
              <QuantityStepper variant="tertiary" size="medium" defaultCount={1} showTrashOnRemove />
              <QuantityStepper variant="tertiary" size="large" defaultCount={1} showTrashOnRemove />
            </div>
          </DocsCard>
          <DocsCard title="Primary (start at 1)">
            <div style={rowStyle}>
              <QuantityStepper variant="primary" size="small" defaultCount={1} showTrashOnRemove />
              <QuantityStepper variant="primary" size="medium" defaultCount={1} showTrashOnRemove />
              <QuantityStepper variant="primary" size="large" defaultCount={1} showTrashOnRemove />
            </div>
          </DocsCard>
          <DocsCard title="Count &gt; 1 shows minus button (not trash)">
            <div style={rowStyle}>
              <QuantityStepper variant="secondary" size="medium" defaultCount={3} showTrashOnRemove />
              <QuantityStepper variant="tertiary" size="medium" defaultCount={5} maxQuantity={5} showTrashOnRemove />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Disabled state" description="All variants in disabled state.">
        <DocsCard>
          <div style={{display: 'grid', gap: 16}}>
            <div style={rowStyle}>
              <QuantityStepper variant="primary" size="medium" disabled />
              <QuantityStepper variant="secondary" size="medium" disabled />
              <QuantityStepper variant="tertiary" size="medium" disabled />
            </div>
            <div style={rowStyle}>
              <QuantityStepper variant="primary" size="medium" cartLabel="Add to cart" disabled />
              <QuantityStepper variant="secondary" size="medium" cartLabel="Add to cart" disabled />
              <QuantityStepper variant="tertiary" size="medium" cartLabel="Add to cart" disabled />
            </div>
          </div>
        </DocsCard>
      </ExampleSection>

      <ExampleSection title="onChange callback" description="Track quantity changes via the onChange prop.">
        <DocsCard>
          <OnChangeExample />
        </DocsCard>
      </ExampleSection>

      <ExampleSection
        title="Accessibility: unique names in a product grid"
        description="When multiple steppers appear on the same page, every instance must have a unique accessible name (WCAG 2.4.6). Pass the product name through addLabel or cartLabel so screen reader users can distinguish them. Screen reader announcements are delivered via A11yAnnouncementProvider — which this page mounts as a wrapper."
      >
        <DocsCard title="addLabel includes product name → unique aria-label per card">
          <A11yUniqueNamesExample />
        </DocsCard>
        <DocsCard title="Code pattern">
          <pre
            style={{
              margin: 0,
              padding: '12px 16px',
              borderRadius: 6,
              background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
              fontSize: 13,
              lineHeight: 1.6,
              overflowX: 'auto',
              whiteSpace: 'pre',
            }}
          >
{`// ✅ Unique name — screen readers can distinguish each button
<QuantityStepper addLabel={\`Add \${product.name}\`} />

// ✅ Cart context — unique + action-oriented
<QuantityStepper cartLabel={\`Add \${product.name} to cart\`} />

// ❌ Generic — all steppers sound identical to screen reader users
<QuantityStepper addLabel="Add" />`}
          </pre>
        </DocsCard>
      </ExampleSection>

      <GuidelinesSection
        description="Use Quantity Stepper for cart and bag flows where add → set quantity → remove is the core interaction. Pick the variant that matches the surface (primary on tiles, secondary inside cards, tertiary inside dense rows). Enable showTrashOnRemove only in cart/bag contexts where removing the item entirely is the expected behavior at count 1."
        defaultValue="variant='secondary', size='medium', defaultCount=0"
      >
        <div style={{display: 'grid', gap: 12}}>
          <Heading as="h3" size="small" style={{margin: 0}}>
            Accessibility requirements
          </Heading>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.6'}}>
            <strong>1. Unique accessible names (WCAG 2.4.6).</strong> The{' '}
            <code>addLabel</code> / <code>cartLabel</code> props become the button's{' '}
            <code>aria-label</code> in initial mode. Always include the product name —
            never leave the default <code>"Add"</code> in a grid where multiple steppers
            are visible at once.
          </Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.6'}}>
            <strong>2. A11yAnnouncementProvider (required).</strong> QuantityStepper
            announces quantity changes via <code>useA11yAnnouncement()</code>. Without an{' '}
            <code>{'<A11yAnnouncementProvider>'}</code> ancestor the hook silently no-ops.
            Pages wrapped by <code>{'<LivingDesign>'}</code> are covered automatically;
            standalone pages must add the provider explicitly.
          </Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.6'}}>
            <strong>3. Focus management.</strong> When the stepper expands from initial
            mode, focus moves to the Increase quantity (+) button. When decremented to
            zero, focus returns to the pill (now a button). This prevents focus from
            silently falling to <code>document.body</code>.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
    </A11yAnnouncementProvider>
  );
}
