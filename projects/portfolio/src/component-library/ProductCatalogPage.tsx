import * as React from 'react';
import {Body, Caption, Heading} from '@/app/components/Text/Text';
import {Button} from '@/app/components/Button/Button';
import {Badge} from '@/app/components/Badge/Badge';
import {Tag} from '@/app/components/Tag/Tag';
import {Chip} from '@/app/components/Chip/Chip';
import type {ItemTileBadgeType} from '@/app/components/patterns/ItemTile/ItemTile';
import {ProductCardGrid} from '@/app/components/patterns/ProductCardGrid/ProductCardGrid';
import {ItemTile} from '@/app/components/patterns/ItemTile/ItemTile';
import {CarouselProductCard} from '@/app/components/patterns/CarouselProductCard/CarouselProductCard';
import {FlashDealsItemTile} from '@/app/components/patterns/FlashDealsItemTile/FlashDealsItemTile';
import {Header} from '@/app/components/patterns/Header/Header';
import {SearchResultsHeader} from '@/app/components/patterns/SearchResultsHeader/SearchResultsHeader';
import {
  useHeaderCartBindings,
  useStoreConnectedItemBindings,
  useItems,
  useSharedSearchQuery,
  setStoreValue,
  emit,
} from '@/app/components/utils/Store';
import {PageWrapper, ExampleSection} from './shared';
import {NewArrivalsCarousel, type CarouselSlide} from '@/app/components/patterns/NewArrivalsCarousel/NewArrivalsCarousel';
import {
  getCategories,
  getAllProducts,
  getHeroBanners,
  getMarketingTiles,
  searchProducts,
  getCatalogStats,
  type Product,
  type Category,
  type HeroBanner,
  type MarketingTile,
} from '@/app/components/utils/ProductService';

// ---------------------------------------------------------------------------
// Hero Banner Carousel (uses NewArrivalsCarousel)
// ---------------------------------------------------------------------------

function HeroBannerCarousel() {
  const banners = getHeroBanners();

  const slides: CarouselSlide[] = banners.map((b) => ({
    image: b.imageUrl ?? '',
    bgColor: b.backgroundColor,
    eyebrow: b.subtitle,
    headline: b.title,
    ctaText: b.ctaLabel,
  }));

  return <NewArrivalsCarousel slides={slides} />;
}

// ---------------------------------------------------------------------------
// Marketing Tiles
// ---------------------------------------------------------------------------

function MarketingTilesRow() {
  const tiles = getMarketingTiles();
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 16}}>
      {tiles.map((tile: MarketingTile) => (
        <button
          key={tile.id}
          type="button"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
        >
          {/* Rounded colored tile with product cutout image */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1 / 1',
              borderRadius: 16,
              backgroundColor: '#ffffff',
              overflow: 'hidden',
            }}
          >
            {tile.imageUrl ? (
              <img
                src={tile.imageUrl}
                alt="" /* decorative — visible text label below the image already describes the category */
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: 12,
                  boxSizing: 'border-box',
                  display: 'block',
                }}
              />
            ) : (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
              }}>
                <span style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#001e60',
                  lineHeight: 1.15,
                  textAlign: 'center',
                }}>
                  {tile.title}
                </span>
              </div>
            )}
          </div>

          {/* Label below */}
          <span style={{
            fontSize: 14,
            fontWeight: 400,
            color: '#2e2f32',
            lineHeight: 1.3,
            textAlign: 'center',
          }}>
            {tile.title}
          </span>
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Catalog Stats Strip
// ---------------------------------------------------------------------------

function CatalogStatsStrip() {
  const stats = getCatalogStats();
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
      <Badge color="info">{stats.totalProducts} products</Badge>
      <Badge color="green">{stats.totalCategories} categories</Badge>
      <Badge color="gray">{stats.totalSubcategories} subcategories</Badge>
      <Badge color="blue">{stats.ebtEligibleCount} EBT eligible</Badge>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Connected Product Card (reusable)
// ---------------------------------------------------------------------------

function ConnectedGridCard({item}: {item: Product}) {
  const bindItem = useStoreConnectedItemBindings();
  const bindings = bindItem({sku: item.sku, name: item.name, priceCents: item.priceCents});

  return (
    <ProductCardGrid
      image={item.imageUrl}
      name={item.name}
      price={item.price}
      cents={item.cents}
      wasPrice={item.originalPrice ?? undefined}
      flag={item.flag ?? undefined}
      rating={item.rating}
      ratingCount={item.ratingCount}
      pickup={item.pickup}
      hearted={bindings.hearted}
      onHeartChange={bindings.onHeartChange}
      cartQty={bindings.cartQty}
      onCartQtyChange={bindings.onCartQtyChange}
      onAddToCart={bindings.onAddToCart}
    />
  );
}

function ConnectedItemTile({item}: {item: Product}) {
  const bindItem = useStoreConnectedItemBindings();
  const bindings = bindItem({sku: item.sku, name: item.name, priceCents: item.priceCents});

  return (
    <ItemTile
      image={item.imageUrl}
      name={item.name}
      price={item.price}
      cents={item.cents}
      originalPrice={item.originalPrice ?? undefined}
      pricePrefix={item.originalPrice ? 'Now' : undefined}
      badge={item.badge ? {label: item.badge.label, type: item.badge.type as ItemTileBadgeType} : undefined}
      hearted={bindings.hearted}
      onHeartChange={bindings.onHeartChange}
    />
  );
}

function ConnectedCarouselCard({item}: {item: Product}) {
  const bindItem = useStoreConnectedItemBindings();
  const bindings = bindItem({sku: item.sku, name: item.name, priceCents: item.priceCents});

  return (
    <CarouselProductCard
      image={item.imageUrl}
      price={item.price}
      cents={item.cents}
      cartQty={bindings.cartQty}
      onCartQtyChange={bindings.onCartQtyChange}
      onAddToCart={bindings.onAddToCart}
    />
  );
}

function ConnectedFlashDealTile({item, idx}: {item: Product; idx: number}) {
  const bindItem = useStoreConnectedItemBindings();
  const bindings = bindItem({sku: item.sku, name: item.name, priceCents: item.priceCents});

  return (
    <FlashDealsItemTile
      image={item.imageUrl}
      name={item.name}
      price={item.price}
      cents={item.cents}
      originalPrice={item.originalPrice ?? undefined}
      pricePrefix={item.originalPrice ? 'Now' : undefined}
      badge={item.badge ? {label: item.badge.label, type: item.badge.type as ItemTileBadgeType} : undefined}
      actionType="add"
      idx={idx}
      hearted={bindings.hearted}
      onHeartChange={bindings.onHeartChange}
      cartQty={bindings.cartQty}
      onCartQtyChange={bindings.onCartQtyChange}
      onAddToCart={bindings.onAddToCart}
    />
  );
}

// ---------------------------------------------------------------------------
// "Flash Deals" Row — picks items with originalPrice
// ---------------------------------------------------------------------------

function FlashDealsRow() {
  const deals = getAllProducts().filter((i) => i.originalPrice);

  return (
    <div style={{display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4}} tabIndex={0}>
      {deals.map((item, idx) => (
        <div key={item.sku} style={{flex: '0 0 180px'}}>
          <ConnectedFlashDealTile item={item} idx={idx} />
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// All Products — every category & subcategory, all items visible
// ---------------------------------------------------------------------------

function AllProducts({filterCategoryId}: {filterCategoryId: string | null}) {
  const categories = getCategories();
  const displayed = filterCategoryId
    ? categories.filter((c) => c.id === filterCategoryId)
    : categories;

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 32}}>
      {displayed.map((cat) => (
        <div key={cat.id}>
          {/* Category header */}
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16}}>
            <Heading as="h3" size="medium" style={{margin: 0}}>
              {cat.name}
            </Heading>
            <Badge color="info">{cat.allProducts.length} items</Badge>
          </div>

          {/* Subcategory sections */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
            {cat.subcategories.map((sub) => (
              <div key={sub.id}>
                <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12}}>
                  <Heading as="h3" size="small" style={{margin: 0}}>
                    {sub.name}
                  </Heading>
                  <Tag color="gray">{sub.products.length}</Tag>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: 16,
                    alignItems: 'start',
                  }}
                >
                  {sub.products.map((item) => (
                    <ConnectedGridCard key={item.sku} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Category Filter Bar
// ---------------------------------------------------------------------------

function CategoryFilterBar({
  activeCategoryId,
  onSelect,
}: {
  activeCategoryId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const categories = getCategories();

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8}}>
      <Chip selected={activeCategoryId === null} onClick={() => onSelect(null)}>
        All ({getAllProducts().length})
      </Chip>
      {categories.map((cat: Category) => (
        <Chip
          key={cat.id}
          selected={cat.id === activeCategoryId}
          onClick={() => onSelect(cat.id === activeCategoryId ? null : cat.id)}
        >
          {cat.name} ({cat.allProducts.length})
        </Chip>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Search Demo — uses ProductService.searchProducts
// ---------------------------------------------------------------------------

function SearchDemo() {
  const searchQuery = useSharedSearchQuery();
  const {cartCount, cartPrice} = useHeaderCartBindings();
  const [localQuery, setLocalQuery] = React.useState('');
  const results = searchProducts(localQuery || searchQuery || '');
  const displayed = results.slice(0, 12);

  const doSearch = (q: string) => {
    setLocalQuery(q);
    setStoreValue('ui:search:query', q, {persist: true});
    emit('ui:header:search-submit', {query: q});
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      <div style={{maxWidth: 500, border: '1px solid #E6E6E8', borderRadius: 8, overflow: 'hidden'}}>
        <Header cartCount={cartCount} cartPrice={cartPrice} a11yNavLabel="Preview header account and cart" a11yMobileSearchLabel="Walmart preview" />
      </div>

      <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
        {['air fryer', 'strawberries', 'laptop', 'dress', 'cerave', 'patio'].map((term) => (
          <Button key={term} variant="secondary" size="small" onClick={() => doSearch(term)}>
            {term}
          </Button>
        ))}
        <Button variant="tertiary" size="small" onClick={() => doSearch('')}>
          Clear
        </Button>
      </div>

      {(localQuery || searchQuery) && (
        <SearchResultsHeader query={localQuery || searchQuery || ''} />
      )}

      <Body as="p" size="small" color="subtle" style={{margin: 0}}>
        Showing {displayed.length} of {results.length} results
      </Body>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
          alignItems: 'start',
        }}
      >
        {displayed.map((item) => (
          <ConnectedGridCard key={item.sku} item={item} />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Quick Add & Cart Demo
// ---------------------------------------------------------------------------

function QuickAddDemo() {
  const {addToCart, summary, cartLines, clearCart} = useItems();
  const categories = getCategories();

  const addRandomItem = () => {
    const all = getAllProducts();
    const item = all[Math.floor(Math.random() * all.length)]!;
    addToCart(item.sku, item.name, item.priceCents, 1);
  };

  const addCategoryBundle = (catId: string) => {
    const cat = categories.find((c) => c.id === catId);
    if (!cat) return;
    const picks = cat.allProducts.slice(0, 3);
    picks.forEach((item) => addToCart(item.sku, item.name, item.priceCents, 1));
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center'}}>
        <Button variant="primary" size="small" onClick={addRandomItem}>
          Add random item
        </Button>
        {categories.map((cat) => (
          <Button key={cat.id} variant="secondary" size="small" onClick={() => addCategoryBundle(cat.id)}>
            Add {cat.name} bundle
          </Button>
        ))}
        <Button variant="tertiary" size="small" onClick={clearCart}>
          Clear cart
        </Button>
      </div>

      <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
        <Badge color="blue">{summary.totalQty} items</Badge>
        <Badge color="green">{summary.lineCount} lines</Badge>
        <Badge color="info">${(summary.subtotalCents / 100).toFixed(2)}</Badge>
      </div>

      {cartLines.length > 0 && (
        <div
          style={{
            border: '1px solid #E6E6E8',
            borderRadius: 8,
            padding: 12,
            maxHeight: 200,
            overflowY: 'auto',
          }}
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
            {cartLines.map((line) => (
              <div
                key={line.sku}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid #E6E6E8',
                  borderRadius: 6,
                  padding: '6px 10px',
                }}
              >
                <Body as="span" size="small" style={{flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                  {line.name}
                </Body>
                <Badge color="blue">{line.cartQty}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tile Gallery — mixed card formats
// ---------------------------------------------------------------------------

function TileGallery() {
  const items = getAllProducts();
  const tileItems = items.slice(0, 6);
  const carouselItems = items.slice(6, 14);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
      <Body as="p" size="small" color="subtle" style={{margin: 0}}>
        Items shown in multiple card formats — all wired to the same Store for synchronized state.
      </Body>

      <div>
        <Caption as="p" style={{margin: '0 0 8px', color: '#74767C'}}>Item Tiles</Caption>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12}}>
          {tileItems.map((item) => (
            <div key={item.sku} style={{maxWidth: 220}}>
              <ConnectedItemTile item={item} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Caption as="p" style={{margin: '0 0 8px', color: '#74767C'}}>Carousel Cards</Caption>
        <div style={{display: 'flex', gap: 12, overflowX: 'auto'}} tabIndex={0}>
          {carouselItems.map((item) => (
            <div key={item.sku} style={{flex: '0 0 150px'}}>
              <ConnectedCarouselCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function ProductCatalogPage() {
  const {cartCount, cartPrice} = useHeaderCartBindings();
  const [filterCategoryId, setFilterCategoryId] = React.useState<string | null>(null);

  return (
    <PageWrapper
      title="Product Catalog"
      category="WCP PATTERNS"
      description="A full product catalog powered by ProductService — 69 real Walmart products across 7 categories. Browse, search, and interact with Store-connected cards."
    >
      {/* Live header */}
      <ExampleSection
        title="Live Header"
        description="Cart count and price update live as you add products from any section below."
      >
        <Header cartCount={cartCount} cartPrice={cartPrice} a11yNavLabel="Product catalog header account and cart" a11yMobileSearchLabel="Walmart product catalog" />
      </ExampleSection>

      {/* Hero Banners */}
      <ExampleSection
        title="Hero Banners"
        description="Auto-rotating promotional banners for seasonal campaigns and events."
      >
        <HeroBannerCarousel />
      </ExampleSection>

      {/* Marketing Tiles */}
      <ExampleSection
        title="Marketing Tiles"
        description="Quick-access promotional tiles for key shopping experiences."
      >
        <MarketingTilesRow />
      </ExampleSection>

      {/* Catalog Stats */}
      <ExampleSection
        title="Catalog Overview"
        description="ProductService provides categorized real product data crawled from walmart.com."
      >
        <CatalogStatsStrip />
      </ExampleSection>

      {/* Flash Deals */}
      <ExampleSection
        title="Flash Deals"
        description="Products with marked-down prices shown as flash deal tiles — fully connected to the Store."
      >
        <FlashDealsRow />
      </ExampleSection>

      {/* Tile Gallery */}
      <ExampleSection
        title="Multi-Format Tile Gallery"
        description="The same catalog items rendered in Item Tile and Carousel Card formats — all sharing Store state."
      >
        <TileGallery />
      </ExampleSection>

      {/* All Products — Full Catalog */}
      <ExampleSection
        title="All Products"
        description="Every product in the catalog, organized by category and subcategory. Click a chip to filter, or view all 69 products."
      >
        <CategoryFilterBar activeCategoryId={filterCategoryId} onSelect={setFilterCategoryId} />
        <AllProducts filterCategoryId={filterCategoryId} />
      </ExampleSection>

      {/* Search Demo */}
      <ExampleSection
        title="Search the Catalog"
        description="Type or click a preset to search. Uses ProductService.searchProducts() and displays results with Store-connected grid cards."
      >
        <SearchDemo />
      </ExampleSection>

      {/* Quick Add & Cart Demo */}
      <ExampleSection
        title="Quick Add & Cart Demo"
        description="Add random items or category bundles to test cart reactivity across the entire page."
      >
        <QuickAddDemo />
      </ExampleSection>
    </PageWrapper>
  );
}
