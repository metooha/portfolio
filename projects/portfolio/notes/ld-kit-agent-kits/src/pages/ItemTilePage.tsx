import * as React from 'react';
import {ItemTile} from '../patterns/ItemTile/ItemTile';
import {PRODUCT_IMAGES} from '../common/productImages';
import {useStoreConnectedItemBindings} from '../utils/Store';
import {ProductCardList} from '../patterns/ProductCardList/ProductCardList';
import {ProductCardGrid} from '../patterns/ProductCardGrid/ProductCardGrid';
import {CarouselProductCard} from '../patterns/CarouselProductCard/CarouselProductCard';
import {FlashDealsItemTile} from '../patterns/FlashDealsItemTile/FlashDealsItemTile';
import {PromotionalItemTile} from '../patterns/PromotionalItemTile/PromotionalItemTile';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

// ── Shared layout styles ──────────────────────────────────────────────────────

const frameStyle: React.CSSProperties = {
  background: 'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
  borderRadius: 12,
  padding: 16,
  display: 'flex',
  justifyContent: 'center',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 12,
  maxWidth: 430,
  width: '100%',
};

const mobileFrameStyle: React.CSSProperties = {
  maxWidth: 430,
  margin: '0 auto',
  background: 'var(--ld-semantic-color-surface, #ffffff)',
};

const carouselFrameStyle: React.CSSProperties = {
  maxWidth: 430,
  margin: '0 auto',
  background: 'var(--ld-semantic-color-surface, #ffffff)',
  display: 'flex',
  gap: 8,
  padding: 12,
  overflowX: 'auto',
};

const carouselCardStyle: React.CSSProperties = {
  flex: '0 0 140px',
};

/** Like carouselFrameStyle but without overflowX so heart tooltips aren't clipped */
const flashDealsFrameStyle: React.CSSProperties = {
  maxWidth: 430,
  margin: '0 auto',
  background: 'var(--ld-semantic-color-surface, #ffffff)',
  display: 'flex',
  gap: 8,
  padding: 12,
  flexWrap: 'wrap',
};

// ── ItemTile sample data ───────────────────────────────────────────────────

const ITEM_TILE_DEFAULT = {
  sku: 'item-air-fryer',
  image: PRODUCT_IMAGES.airFryer,
  name: 'Ninja 4 Qt Air Fryer, Nonstick Basket...',
  price: '98',
  cents: '00',
  badge: { label: 'Best seller', type: 'bestseller' as const },
};

const ITEM_TILE_SAVINGS = {
  sku: 'item-blender',
  image: PRODUCT_IMAGES.countertopBlender,
  name: 'VAVSEA 3-in-1 Blender System...',
  price: '169',
  cents: '98',
  originalPrice: '$200.00',
  pricePrefix: 'Now',
  priceSuffix: '/mo',
  badge: { label: 'Best seller', type: 'bestseller' as const },
};

const ITEM_TILE_ROLLBACK = {
  sku: 'item-cabinet',
  image: PRODUCT_IMAGES.rattanCabinet,
  name: 'Rattan Storage Cabinet, Modern...',
  price: '89',
  cents: '00',
  originalPrice: '$129.00',
  pricePrefix: 'Now',
  badge: { label: 'Rollback', type: 'rollback' as const },
};

const ITEM_TILE_PLAIN = {
  sku: 'item-camera',
  image: PRODUCT_IMAGES.digitalCamera,
  name: 'Vivitar Popnap Digital Camera...',
  price: '24',
  cents: '88',
};

// ── ProductCardList sample data ───────────────────────────────────────────────

const CDN = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F';

const LIST_SAMPLES = [
  {
    sku: 'list-frosted-flakes',
    name: "Kellogg's Frosted Flakes, Breakfast Cereal, Original, Family Size, 13.5 oz",
    price: '3', cents: '68', unitPrice: '$4.36/lb',
    flag: 'Best seller', flagVariant: 'brand-subtle' as const,
    rating: 4.7, ratingCount: '12,234',
    image: `${CDN}783f38e6d773461b95706408b1a14434?format=webp&width=400`,
    pickup: '2 pm', ebt: true,
  },
  {
    sku: 'list-honey-bunches',
    name: "Post Honey Bunches of Oats with Almonds Cereal, 18 oz",
    price: '3', cents: '48', unitPrice: '$3.09/lb',
    flag: 'Rollback', flagVariant: 'urgent' as const, wasPrice: '$4.28',
    rating: 4.5, ratingCount: '6,442',
    image: `${CDN}783f38e6d773461b95706408b1a14434?format=webp&width=400`,
    pickup: 'Tomorrow', ebt: true,
  },
];

// ── ProductCardGrid sample data ──────────────────────────────────────────────

const GRID_CARD_SAMPLES = [
  {
    sku: 'grid-maxi-dress',
    name: "Time and Tru Women's Sleeveless Tiered Maxi Dress",
    price: '18', cents: '98', rating: 4.4, ratingCount: '1,247',
    image: PRODUCT_IMAGES.walmartPlaceholder,
    pickup: 'Tomorrow',
  },
  {
    sku: 'grid-midi-dress',
    name: "Sofia Jeans Women's Knit Midi Dress with Flutter Sleeves",
    price: '24', cents: '98',
    flag: 'Best seller', flagVariant: 'brand-subtle' as const,
    rating: 4.6, ratingCount: '3,892',
    image: PRODUCT_IMAGES.walmartPlaceholder,
    pickup: '2 pm',
  },
];

// ── CarouselProductCard sample data ──────────────────────────────────────────

const CAROUSEL_SAMPLES = [
  { price: '3', cents: '68', image: `${CDN}783f38e6d773461b95706408b1a14434?format=webp&width=400` },
  { price: '6', cents: '98', image: `${CDN}2e3ad9b09a894c658b053653b52ae341?format=webp&width=400` },
  { price: '4', cents: '48', image: `${CDN}3b1c6c21fa734099a7e94fb02336f7a3?format=webp&width=400` },
];

// ── FlashDealsItemTile sample data ──────────────────────────────────────────

const FLASH_DEALS_SAMPLES = [
  {
    image: PRODUCT_IMAGES.flashEarrings,
    name: 'CZ Stud Earrings, 14K Gold Plated Round...',
    price: '4', cents: '97',
    originalPrice: '$12.99', pricePrefix: 'Now',
    badge: { label: 'Deal', type: 'deal' as const },
    actionType: 'add' as const,
    idx: 100,
  },
  {
    image: PRODUCT_IMAGES.flashHumidifier,
    name: 'Cool Mist Humidifier, 2.5L Top Fill...',
    price: '19', cents: '88',
    originalPrice: '$34.99', pricePrefix: 'Now',
    badge: { label: 'Best seller', type: 'bestseller' as const },
    actionType: 'options' as const,
    optionsText: '3 options',
    idx: 101,
  },
  {
    image: PRODUCT_IMAGES.flashTankTops,
    name: "Time & Tru Women's Tank Top, 3-Pack...",
    price: '8', cents: '96',
    badge: { label: 'Rollback', type: 'rollback' as const },
    actionType: 'add' as const,
    idx: 102,
  },
];

// ── PromotionalItemTile sample data ──────────────────────────────────────────

const PROMO_TILE_SAMPLES = [
  { image: PRODUCT_IMAGES.starbucksDoubleshot, name: 'Starbucks Doubleshot', price: '3', cents: '68' },
  { image: PRODUCT_IMAGES.oatlyOatMilk, name: 'Oatly Oat Milk', price: '4', cents: '98' },
  { image: PRODUCT_IMAGES.skinnyPopPopcorn, name: 'SkinnyPop Popcorn', price: '3', cents: '48' },
  { image: PRODUCT_IMAGES.freshStrawberries, name: 'Fresh Strawberries', price: '2', cents: '97' },
];

// ── Page ────────────────────────────────────────────────────────────────────

/** Helper: build SKU from a tile's price + index/name for stable identity */
function tileSku(prefix: string, id: string | number) {
  return `${prefix}-${id}`;
}

/** Helper: parse price string pair to cents */
function toCents(price: string, cents: string) {
  return parseInt(price) * 100 + parseInt(cents);
}

export default function ItemTilePage() {
  const bindItem = useStoreConnectedItemBindings();

  return (
    <PageWrapper
      title="Item Tile"
      category="WCP Components"
      description="Product tile and card components used across search results, category pages, home-page carousels, and 2x2 category grids. Each card is a standalone component — combine them to build rich product browsing experiences."
    >
      {/* ── ItemTile ─────────────────────────────────────────── */}
      <ExampleSection
        title="ItemTile"
        description="Compact product tile used inside 2x2 category grids (e.g. 'Jump right back in' on the home page). Features a product image, Flag badge, HeartView toggle, and flexible price display with default and savings variants."
      >
        <div />
      </ExampleSection>

      <ExampleSection
        title="Default price"
        description="Standard price display with dollar superscript, dollar value at 24px, and cents superscript. Used when no pricePrefix is set."
      >
        <div style={frameStyle}>
          <div style={gridStyle}>
            {[ITEM_TILE_DEFAULT, ITEM_TILE_PLAIN].map(({sku, ...tile}) => {
              const {hearted, onHeartChange} = bindItem({
                sku,
                name: tile.name,
                priceCents: toCents(tile.price, tile.cents),
              });
              return (
                <ItemTile
                  key={sku}
                  {...tile}
                  hearted={hearted}
                  onHeartChange={onHeartChange}
                />
              );
            })}
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Reduced price"
        description="Green price row triggered by setting pricePrefix to 'Now'. Shows strikethrough original price and optional /mo suffix."
      >
        <div style={frameStyle}>
          <div style={gridStyle}>
            {[ITEM_TILE_SAVINGS, ITEM_TILE_ROLLBACK].map(({sku, ...tile}) => {
              const {hearted, onHeartChange} = bindItem({
                sku,
                name: tile.name,
                priceCents: toCents(tile.price, tile.cents),
              });
              return (
                <ItemTile
                  key={sku}
                  {...tile}
                  hearted={hearted}
                  onHeartChange={onHeartChange}
                />
              );
            })}
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="2x2 Grid layout"
        description="Four tiles in a grid as used inside the 'Jump right back in' category cards. All tiles have consistent sizing."
      >
        <div style={frameStyle}>
          <div style={gridStyle}>
            {[ITEM_TILE_SAVINGS, ITEM_TILE_DEFAULT, ITEM_TILE_ROLLBACK, ITEM_TILE_PLAIN].map(({sku, ...tile}) => {
              const {hearted, onHeartChange} = bindItem({
                sku,
                name: tile.name,
                priceCents: toCents(tile.price, tile.cents),
              });
              return (
                <ItemTile
                  key={sku}
                  {...tile}
                  hearted={hearted}
                  onHeartChange={onHeartChange}
                />
              );
            })}
          </div>
        </div>
      </ExampleSection>

      {/* ── ProductCardList ──────────────────────────────────────── */}
      <ExampleSection
        title="ProductCardList"
        description="Full-width row card best suited for grocery and staple categories. Features a tall product image column on the left and rich metadata on the right including price, name, rating, EBT eligibility, and pickup time."
      >
        <div style={frameStyle}>
          <div style={mobileFrameStyle}>
            {LIST_SAMPLES.map(({sku, ...p}) => {
              const binding = bindItem({
                sku,
                name: p.name,
                priceCents: toCents(p.price, p.cents),
              });
              return (
                <ProductCardList
                  key={sku}
                  {...p}
                  cartQty={binding.cartQty}
                  onCartQtyChange={binding.onCartQtyChange}
                  onAddToCart={binding.onAddToCart}
                />
              );
            })}
          </div>
        </div>
      </ExampleSection>

      {/* ── ProductCardGrid ─────────────────────────────────────── */}
      <ExampleSection
        title="ProductCardGrid"
        description="Two-column image-first tile best suited for apparel, home decor, and other visual categories. Features a large image area at the top and compact metadata below."
      >
        <div style={frameStyle}>
          <div style={gridStyle}>
            {GRID_CARD_SAMPLES.map(({sku, ...p}) => (
              <ProductCardGrid
                key={sku}
                {...p}
                {...bindItem({
                  sku,
                  name: p.name,
                  priceCents: toCents(p.price, p.cents),
                })}
              />
            ))}
          </div>
        </div>
      </ExampleSection>

      {/* ── CarouselProductCard ──────────────────────────────────── */}
      <ExampleSection
        title="CarouselProductCard"
        description="Compact card used inside horizontal carousels such as 'New Arrivals' and 'Jump Right Back In' on the home page. Shows a product image, price, and an inline add-to-cart control."
      >
        <div style={frameStyle}>
          <div style={carouselFrameStyle} tabIndex={0}>
            {CAROUSEL_SAMPLES.map((p, i) => {
              const sku = `carousel-${i}`;
              const binding = bindItem({
                sku,
                name: 'Carousel Product',
                priceCents: toCents(p.price, p.cents),
              });
              return (
                <div key={sku} style={carouselCardStyle}>
                  <CarouselProductCard
                    {...p}
                    cartQty={binding.cartQty}
                    onCartQtyChange={binding.onCartQtyChange}
                    onAddToCart={binding.onAddToCart}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </ExampleSection>

      {/* ── FlashDealsItemTile ───────────────────────────────────── */}
      <ExampleSection
        title="FlashDealsItemTile"
        description="Card variant used inside the Flash Deals carousel on the home page. Features a Flag badge overlay, HeartView toggle, green 'Now' savings pricing, and a compact '+ Add' or 'Options' action button."
      >
        <div />
      </ExampleSection>

      <ExampleSection
        title="Deal card with Add action"
        description="Uses actionType 'add' — tapping the button immediately adds the item to the cart."
      >
        <div style={frameStyle}>
          <div style={flashDealsFrameStyle}>
            {FLASH_DEALS_SAMPLES.filter(s => s.actionType === 'add').map((p) => {
              const sku = tileSku('flash', p.idx);
              const binding = bindItem({
                sku,
                name: p.name,
                priceCents: toCents(p.price, p.cents),
              });
              return (
                <div key={sku} style={{ flex: '0 0 180px' }}>
                  <FlashDealsItemTile
                    {...p}
                    {...binding}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Options variant"
        description="Uses actionType 'options' with an optionsText label. Useful when the product has multiple sizes or colors."
      >
        <div style={frameStyle}>
          <div style={flashDealsFrameStyle}>
            {FLASH_DEALS_SAMPLES.map((p) => {
              const sku = tileSku('flash', p.idx);
              const binding = bindItem({
                sku,
                name: p.name,
                priceCents: toCents(p.price, p.cents),
              });
              return (
                <div key={sku} style={{ flex: '0 0 180px' }}>
                  <FlashDealsItemTile
                    {...p}
                    {...binding}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </ExampleSection>

      {/* ── PromotionalItemTile ──────────────────────────────────── */}
      <ExampleSection
        title="PromotionalItemTile"
        description="Compact tile variant used inside promotional carousels (e.g. 'Continue shopping' and 'Buy it again'). Shows a product image, price, and an inline add-to-cart control. No product name or badge — optimized for minimal horizontal footprint."
      >
        <div style={frameStyle}>
          <div style={carouselFrameStyle} tabIndex={0}>
            {PROMO_TILE_SAMPLES.map((p, i) => {
              const sku = `promo-${i}`;
              const binding = bindItem({
                sku,
                name: 'Promotional Product',
                priceCents: toCents(p.price, p.cents),
              });
              return (
                <div key={sku} style={carouselCardStyle}>
                  <PromotionalItemTile
                    {...p}
                    cartQty={binding.cartQty}
                    onCartQtyChange={binding.onCartQtyChange}
                    onAddToCart={binding.onAddToCart}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Pick the tile that matches the surface: ItemTile for 2x2 category grids, ProductCardList for full-width grocery rows, ProductCardGrid for visual apparel/home grids, CarouselProductCard for horizontal carousels, FlashDealsItemTile for time-limited deals with overlays, and PromotionalItemTile for minimal name-less promotional rows. Keep prices, savings, and badges consistent across tiles in the same row."
        defaultValue="frame=mobile (max-width 430px)"
      />
    </PageWrapper>
  );
}
