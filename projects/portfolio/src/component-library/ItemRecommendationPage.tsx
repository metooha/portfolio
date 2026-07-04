import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button';
import {Checkbox} from '@/app/components/Checkbox';
import {Body} from '@/app/components/Text/Text';
import {
  ItemRecommendation,
  type ItemRecommendationAction,
} from '@/app/components/patterns/ItemRecommendation';
import {getProductBySku} from '@/app/components/utils/ProductService';

import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

const CARD_FRAME: React.CSSProperties = {maxWidth: 380};
const ACTIONS: ItemRecommendationAction[] = ['navigate', 'linkButton', 'checkbox', 'none'];

const recommendedItem = getProductBySku('fresh-strawberries-1lb');

const catalogPrice = recommendedItem
  ? `$${recommendedItem.price}.${recommendedItem.cents} ea`
  : '$2.96 ea';

function buildRecommendationProps() {
  return {
    eyebrowText: 'Product recommendation',
    tagLabel: recommendedItem?.badge?.label ?? 'Best seller',
    imageUrl: recommendedItem?.imageUrl,
    imageAlt: recommendedItem?.name ?? 'Fresh Strawberries, 1 lb Container',
    itemName: recommendedItem?.name ?? 'Fresh Strawberries, 1 lb Container',
    itemColor: recommendedItem?.subcategoryName ?? 'Fresh Produce',
    price: catalogPrice,
    wasPrice: recommendedItem?.originalPrice ?? '',
    pricingDetails: recommendedItem?.pickup ?? 'Pickup today',
    unitPrice: recommendedItem?.ebt ? 'EBT eligible' : undefined,
    attributes: [
      {key: 'SKU', value: recommendedItem?.sku ?? 'fresh-strawberries-1lb'},
      {key: 'Category', value: recommendedItem?.categoryName ?? 'Grocery'},
    ],
    metrics: [
      {label: 'Rating', value: recommendedItem?.rating.toFixed(1) ?? '4.6'},
      {label: 'Reviews', value: recommendedItem?.ratingCount ?? '101,547'},
    ],
  };
}

export default function ItemRecommendationPage() {
  const [trailingAction, setTrailingAction] = React.useState<ItemRecommendationAction>('navigate');
  const [checked, setChecked] = React.useState(false);
  const [showMetrics, setShowMetrics] = React.useState(true);
  const [showLocation, setShowLocation] = React.useState(true);
  const [showInsight, setShowInsight] = React.useState(true);
  const [showAlert, setShowAlert] = React.useState(false);

  const baseProps = buildRecommendationProps();

  return (
    <PageWrapper
      title="Item Recommendation"
      category="Subsystem Components"
      description="AI-assisted product recommendation cards with item metadata, optional metrics, location context, insight copy, and decision actions."
    >
      <ExampleSection
        title="Component Configuration"
        description="Preview trailing actions, insight support, metrics, alert state, and location details."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8}}>
                <Body as="span" size="small" weight="alt">Trailing action</Body>
                <ButtonGroup aria-label="Item recommendation trailing action">
                  {ACTIONS.map((item) => (
                    <Button key={item} size="small" variant={trailingAction === item ? 'primary' : 'secondary'} onClick={() => setTrailingAction(item)}>
                      {item}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              <Checkbox label="Show metrics" checked={showMetrics} onChange={(event) => setShowMetrics(event.target.checked)} />
              <Checkbox label="Show location" checked={showLocation} onChange={(event) => setShowLocation(event.target.checked)} />
              <Checkbox label="Show insight" checked={showInsight} onChange={(event) => setShowInsight(event.target.checked)} />
              <Checkbox label="Show alert" checked={showAlert} onChange={(event) => setShowAlert(event.target.checked)} />
            </>
          }
          preview={
            <DocsCard title="Preview" description="The checkbox action is controlled so selected state is visible in the header.">
              <div style={CARD_FRAME}>
                <ItemRecommendation
                  {...baseProps}
                  trailingAction={trailingAction}
                  checked={checked}
                  onCheckedChange={setChecked}
                  linkButtonLabel="Review"
                  metrics={showMetrics ? baseProps.metrics : []}
                  locationCode={showLocation ? 'A12-3' : undefined}
                  additionalLocations={showLocation ? 3 : undefined}
                  insightText="Best seller with high pickup demand today. Keep the item visible for associate substitutions."
                  showInsight={showInsight}
                  showAlert={showAlert}
                  alertMessage="Inventory confidence is lower than usual."
                  alertActionLabel="Refresh"
                  alternateLabel="Dismiss"
                  preferredLabel="Use item"
                />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Recommendation Patterns" description="Use different trailing controls based on whether the card navigates, opens supporting content, or participates in selection.">
        <DocsGrid>
          <DocsCard title="Navigate trailing" description="Use for a recommendation that opens item detail or a deeper comparison view.">
            <div style={CARD_FRAME}>
              <ItemRecommendation
                {...baseProps}
                trailingAction="navigate"
                locationCode="A12-3"
                additionalLocations={3}
                insightText="Best seller with high pickup demand today."
                alternateLabel="Dismiss"
                preferredLabel="Use item"
              />
            </div>
          </DocsCard>
          <DocsCard title="Link button" description="Use when the trailing action is a named command instead of navigation.">
            <div style={CARD_FRAME}>
              <ItemRecommendation
                {...baseProps}
                trailingAction="linkButton"
                linkButtonLabel="Compare"
                showInsight={false}
                alternateLabel="Skip"
                preferredLabel="Recommend"
              />
            </div>
          </DocsCard>
          <DocsCard title="Checkbox selection" description="Use for batch selection or approval workflows.">
            <div style={CARD_FRAME}>
              <ItemRecommendation
                {...baseProps}
                trailingAction="checkbox"
                checked={checked}
                onCheckedChange={setChecked}
                showAlert
                alertMessage="This item may need manager approval."
                alertActionLabel="Review"
                alternateLabel="Alternate"
                preferredLabel="Preferred"
              />
            </div>
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Item Recommendation when an AI or rules engine suggests a specific product decision. Keep item metadata scannable, show metrics only when they support the choice, and make alternate and preferred actions explicit."
        defaultValue="trailingAction='navigate', showInsight=true"
      />
    </PageWrapper>
  );
}