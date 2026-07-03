import * as React from 'react';

import {Button, ButtonGroup} from '@/living-design/components/Button';
import {Checkbox} from '@/living-design/components/Checkbox';
import {Body} from '@/living-design/components/Text/Text';
import {
  ItemTileCondensed,
  type ItemTileCondensedVariant,
} from '@/living-design/patterns/ItemTileCondensed';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const VARIANTS: Array<{label: string; value: ItemTileCondensedVariant}> = [
  {label: 'Primary', value: 'primary'},
  {label: 'Tertiary', value: 'tertiary'},
  {label: 'Edit', value: 'edit'},
];

function TileGrid({variant}: {variant: ItemTileCondensedVariant}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: 16,
        maxWidth: 520,
      }}
    >
      <ItemTileCondensed variant={variant} price="3" cents="25" tag="5 oz" name="Blueberries" onAddToCart={() => {}} />
      <ItemTileCondensed variant={variant} price="4" cents="99" tag="12 ct" name="Eggs" onAddToCart={() => {}} isChecked />
      <ItemTileCondensed variant={variant} price="2" cents="49" tag="1 lb" name="Bananas" onAddToCart={() => {}} isChecked={false} />
    </div>
  );
}

export default function ItemTileCondensedPage() {
  const [variant, setVariant] = React.useState<ItemTileCondensedVariant>('primary');
  const [loading, setLoading] = React.useState(false);
  const [fillContainer, setFillContainer] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [quantity, setQuantity] = React.useState(2);

  return (
    <PageWrapper
      title="Item Tile Condensed"
      category="Subsystem Components"
      description="A compact product tile for grocery and reorder grids, pairing a product image, price, optional size tag, and compact add-to-cart controls."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview tile mode, loading state, image fill behavior, and edit selection."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Variant</Body>
                <ButtonGroup>
                  {VARIANTS.map((item) => (
                    <Button
                      key={item.value}
                      size="small"
                      variant={variant === item.value ? 'primary' : 'secondary'}
                      onClick={() => setVariant(item.value)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <Checkbox label="Loading" checked={loading} onChange={(event) => setLoading(event.target.checked)} />
              <Checkbox label="Fill image container" checked={fillContainer} onChange={(event) => setFillContainer(event.target.checked)} />
              <Checkbox label="Selected in edit mode" checked={checked} disabled={variant !== 'edit'} onChange={(event) => setChecked(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description="Edit mode reveals selection and quantity controls below the tile.">
              <ItemTileCondensed
                variant={variant}
                price="3"
                cents="25"
                tag="5 oz"
                name="Blueberries"
                loading={loading}
                fillContainer={fillContainer}
                isChecked={checked}
                quantity={quantity}
                onCheckChange={setChecked}
                onQuantityChange={setQuantity}
                onAddToCart={setQuantity}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Shopping Grid" description="Use the primary variant for compact add-to-cart moments in reorder grids.">
        <DocsCard>
          <TileGrid variant="primary" />
        </DocsCard>
      </ExampleSection>

      <ExampleSection title="Modes" description="Use tertiary for quieter surfaces and edit for list management flows.">
        <DocsGrid>
          <DocsCard title="Tertiary" description="Lower-emphasis quantity control for dense surfaces.">
            <TileGrid variant="tertiary" />
          </DocsCard>
          <DocsCard title="Edit" description="Selection affordance and quantity controls appear below each item.">
            <TileGrid variant="edit" />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use condensed tiles where product identity is secondary to quick repeat purchase. Keep tags short, keep edit controls reserved for management states, and avoid mixing product-card patterns in the same grid."
        defaultValue="variant='primary', quantity=2"
      />
    </PageWrapper>
  );
}