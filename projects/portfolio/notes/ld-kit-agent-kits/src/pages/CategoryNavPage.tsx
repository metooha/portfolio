import * as React from 'react';
import {CategoryNav} from '../components/CategoryNav/CategoryNav';
import {Body} from '../components/Text/Text';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

export default function CategoryNavPage() {
  const [activeItem, setActiveItem] = React.useState('Rollbacks & More');

  return (
    <PageWrapper
      title="Category Nav"
      category="Shared Components"
      description="A horizontal navigation strip that sits below the main header on a light-blue surface. Displays all items in a single flat row spread across the full width, matching the Walmart homepage pattern."
    >
      <ExampleSection
        title="Default"
        description="The default configuration includes the standard Walmart homepage navigation items on the blue-10 surface."
      >
        <CategoryNav aria-label="Default category navigation" activeItem={activeItem} onItemClick={setActiveItem} />
      </ExampleSection>

      <ExampleSection
        title="Custom Items"
        description="Override the default items with a custom list."
      >
        <CategoryNav
          aria-label="Electronics category navigation"
          items={[
            {label: 'All'},
            {label: 'TVs & Home Theater'},
            {label: 'Computers'},
            {label: 'Cell Phones'},
            {label: 'Headphones'},
            {label: 'Cameras'},
            {label: 'Wearable Technology'},
            {label: 'Smart Home'},
          ]}
          activeItem="TVs & Home Theater"
          onItemClick={() => {}}
        />
      </ExampleSection>

      <ExampleSection
        title="No Active Item"
        description="When no activeItem is set, all items render in their default weight."
      >
        <CategoryNav
          aria-label="Store category navigation"
          items={[
            {label: 'Top Deals'},
            {label: 'Grocery'},
            {label: 'Fashion'},
            {label: 'Home'},
            {label: 'Toys'},
            {label: 'Baby'},
            {label: 'Pets'},
            {label: 'Pharmacy'},
          ]}
          onItemClick={() => {}}
        />
      </ExampleSection>

      <GuidelinesSection
        description="Use Category Nav directly below the primary header on commerce surfaces. Keep labels short and scannable so the row fits on a single line at desktop widths. Set an activeItem when the page belongs to a specific category so users can locate themselves quickly; omit activeItem on neutral pages where no category is highlighted."
        defaultValue="items={WALMART_CATEGORY_ITEMS}"
      >
        <div style={{display: 'grid', gap: 8}}>
          <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Accessibility — aria-label</Body>
          <Body as="p" size="medium" color="subtle" style={{margin: 0, lineHeight: '1.6'}}>
            The <code>{'<nav>'}</code> renders with <code>aria-label="Category navigation"</code> by default. <strong>Override this with a label that describes the specific surface</strong> — e.g. <code>aria-label="Department navigation"</code> or <code>aria-label="Grocery categories"</code>. Every landmark on a page must have a unique label so screen reader users can distinguish them via the landmark list.
          </Body>
        </div>
      </GuidelinesSection>
    </PageWrapper>
  );
}
