import * as React from 'react';
import {SearchResults, type SearchResultProduct} from '@/app/components/patterns/SearchResults/SearchResults';
import {PRODUCT_IMAGES} from '@/app/components/common/productImages';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const FILTERS = ['In-store', 'EBT eligible', 'Brand', 'Flavor', 'Price', 'Special offers'] as const;

const PRODUCTS: SearchResultProduct[] = [
  {
    id: 'frosted-flakes',
    image: PRODUCT_IMAGES.cheerios,
    name: "Kellogg's Frosted Flakes, Breakfast Cereal, Original, Family Size, 13.5 oz",
    price: '3', cents: '68', unitPrice: '$4.36/lb',
    flag: 'Best seller', flagVariant: 'brand-subtle',
    rating: 4.7, ratingCount: '12,234', pickup: '2 pm', ebt: true,
  },
  {
    id: 'cheerios',
    image: PRODUCT_IMAGES.cheerios,
    name: 'General Mills Cheerios Heart Healthy Cereal, Gluten Free, 8.9 oz',
    price: '3', cents: '98', unitPrice: '$7.15/lb',
    rating: 4.6, ratingCount: '8,901', pickup: '2 pm', ebt: true,
  },
  {
    id: 'honey-bunches',
    image: PRODUCT_IMAGES.honeyNutCheerios,
    name: 'Post Honey Bunches of Oats with Almonds Cereal, 18 oz',
    price: '3', cents: '48', unitPrice: '$3.09/lb',
    flag: 'Rollback', flagVariant: 'savings-bold', wasPrice: '$4.28',
    rating: 4.5, ratingCount: '6,442', pickup: 'Tomorrow', ebt: true,
  },
];

const GRID_PRODUCTS: SearchResultProduct[] = [
  {id: 'cheerios-orig', image: PRODUCT_IMAGES.cheerios, name: 'Cheerios Cereal, Gluten Free, Original Flavor, 18 oz', price: '4', cents: '98', rating: 4.8, ratingCount: '8,542', pickup: 'Tomorrow'},
  {id: 'honey-nut', image: PRODUCT_IMAGES.honeyNutCheerios, name: 'Honey Nut Cheerios Gluten Free Cereal, 10.8 oz', price: '3', cents: '24', flag: 'Best seller', flagVariant: 'brand-subtle', rating: 4.9, ratingCount: '6,789', pickup: '2 pm'},
  {id: 'frosted-grid', image: PRODUCT_IMAGES.cheerios, name: "Kellogg's Frosted Flakes Breakfast Cereal, Original, 13.5 oz", price: '3', cents: '68', rating: 4.7, ratingCount: '12,234', pickup: '2 pm'},
  {id: 'bunches-grid', image: PRODUCT_IMAGES.honeyNutCheerios, name: 'Post Honey Bunches of Oats with Almonds, 18 oz', price: '3', cents: '48', wasPrice: '$4.28', flag: 'Rollback', flagVariant: 'savings-bold', rating: 4.5, ratingCount: '6,442'},
];

export default function SearchResultsPage() {
  return (
    <PageWrapper title="Search Results" category="WCP Patterns" description="The SearchResults pattern is a drop-in section that combines the search header, filter bar, and product list/grid into one component. Pass it the active query, filter chip labels, and products — pick `layout='list'` or `layout='grid'`.">
      <ExampleSection title="List layout" description="Default — full-width row cards stacked vertically. Best for dense text-heavy search results.">
        <div style={{ maxWidth: '600px', border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)', borderRadius: '8px', overflow: 'hidden' }}>
          <SearchResults query="cereal" filters={FILTERS} products={PRODUCTS} onAddToCart={() => {}} />
        </div>
      </ExampleSection>

      <ExampleSection title="Grid layout" description="Auto-fitting product grid. Use for visual categories like clothing, home decor, or browse pages.">
        <div style={{ maxWidth: '900px', border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)', borderRadius: '8px', padding: '16px' }}>
          <SearchResults query="cereal" filters={FILTERS} products={GRID_PRODUCTS} layout="grid" onAddToCart={() => {}} />
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use SearchResults as a drop-in for product browse and search surfaces. Pick layout='list' for grocery / staple categories where the metadata matters, and layout='grid' for apparel, home decor, and other visual categories. Keep the filter chip set short and intent-driven; longer filter lists belong inside a SearchFilterBar with All Filters."
        defaultValue="layout='list'"
      />
    </PageWrapper>
  );
}
