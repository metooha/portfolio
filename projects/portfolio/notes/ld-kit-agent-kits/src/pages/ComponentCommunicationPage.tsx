import * as React from 'react';
import {Body, Caption} from '../components/Text/Text';
import {Button} from '../components/Button/Button';
import {Badge} from '../components/Badge/Badge';
import {ItemTile} from '../patterns/ItemTile/ItemTile';
import {
  useHeaderCartBindings,
  useItems,
  useLastUiEvent,
  useSharedFulfillment,
  useSharedSearchQuery,
  useStoreConnectedItemBindings,
  setStoreValue,
  emit,
} from '../utils/Store';
import {PRODUCT_IMAGES} from '../common/productImages';
import {Header} from '../patterns/Header/Header';
import {ProductCardGrid} from '../patterns/ProductCardGrid/ProductCardGrid';
import {ProductCardList} from '../patterns/ProductCardList/ProductCardList';
import {CarouselProductCard} from '../patterns/CarouselProductCard/CarouselProductCard';
import {PromotionalItemTile} from '../patterns/PromotionalItemTile/PromotionalItemTile';
import {FlashDealsItemTile} from '../patterns/FlashDealsItemTile/FlashDealsItemTile';
import {SearchResultsHeader} from '../patterns/SearchResultsHeader/SearchResultsHeader';
import {PageWrapper, ExampleSection} from './shared';

type ProductSpec = {
  sku: string;
  name: string;
  price: string;
  cents: string;
  image: string;
};

const FEATURED_PRODUCT: ProductSpec = {
  sku: 'demo-featured-blender',
  name: 'VAVSEA 3-in-1 Blender System...',
  price: '169',
  cents: '98',
  image: PRODUCT_IMAGES.countertopBlender,
};

const RAIL_PRODUCT: ProductSpec = {
  sku: 'demo-rail-cereal',
  name: "Kellogg's Frosted Flakes Family Size",
  price: '3',
  cents: '68',
  image: PRODUCT_IMAGES.starbucksDoubleshot,
};

const QUICK_ADD_PRODUCT: ProductSpec = {
  sku: 'demo-air-fryer',
  name: 'Ninja 4 Qt Air Fryer',
  price: '98',
  cents: '00',
  image: PRODUCT_IMAGES.airFryer,
};

const STEPPER_PRODUCTS: ProductSpec[] = [
  {
    sku: 'demo-stepper-camera',
    name: 'Vivitar Popnap Digital Camera',
    price: '24',
    cents: '88',
    image: PRODUCT_IMAGES.digitalCamera,
  },
  {
    sku: 'demo-stepper-headphones',
    name: 'Noise Canceling Headphones',
    price: '39',
    cents: '99',
    image: PRODUCT_IMAGES.headphones,
  },
  {
    sku: 'demo-stepper-tablet',
    name: '10.1" Android Tablet',
    price: '89',
    cents: '00',
    image: PRODUCT_IMAGES.tablet,
  },
  {
    sku: 'demo-stepper-speaker',
    name: 'Portable Bluetooth Speaker',
    price: '19',
    cents: '97',
    image: PRODUCT_IMAGES.walmartPlaceholder,
  },
  {
    sku: 'demo-stepper-blender-mini',
    name: 'Single Serve Blender',
    price: '29',
    cents: '94',
    image: PRODUCT_IMAGES.handBlenderSet,
  },
];

function toCents(price: string, cents: string): number {
  return parseInt(price, 10) * 100 + parseInt(cents, 10);
}

function InteractionSummary() {
  const {summary, favorites, addToCart, heartItem, clearCart} = useItems();
  const searchQuery = useSharedSearchQuery();
  const fulfillment = useSharedFulfillment();

  const loadDemoState = React.useCallback(() => {
    addToCart(
      FEATURED_PRODUCT.sku,
      FEATURED_PRODUCT.name,
      toCents(FEATURED_PRODUCT.price, FEATURED_PRODUCT.cents),
      1,
    );
    addToCart(
      RAIL_PRODUCT.sku,
      RAIL_PRODUCT.name,
      toCents(RAIL_PRODUCT.price, RAIL_PRODUCT.cents),
      2,
    );
    heartItem(
      FEATURED_PRODUCT.sku,
      FEATURED_PRODUCT.name,
      toCents(FEATURED_PRODUCT.price, FEATURED_PRODUCT.cents),
    );
    setStoreValue('ui:search:query', 'blender', {persist: true});
    emit('ui:header:search-submit', {query: 'blender'});
    STEPPER_PRODUCTS.forEach((product) => {
      addToCart(
        product.sku,
        product.name,
        toCents(product.price, product.cents),
        1,
      );
    });
  }, [addToCart, heartItem]);

  const resetDemoState = React.useCallback(() => {
    clearCart();
    setStoreValue('ui:search:query', '', {persist: true});
    setStoreValue('ui:header:fulfillment', 'none', {persist: true});
  }, [clearCart]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
        <Badge color="info">{summary.totalQty} items in cart</Badge>
        <Badge color="green">{favorites.length} favorites</Badge>
        <Badge color="gray">search: {searchQuery || 'none yet'}</Badge>
        <Badge color="blue">fulfillment: {fulfillment}</Badge>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
        <Button variant="primary" size="small" onClick={loadDemoState}>
          Load populated state
        </Button>
        <Button variant="tertiary" size="small" onClick={resetDemoState}>
          Reset to empty
        </Button>
      </div>
      <Body as="p" size="small" color="subtle" style={{margin: 0}}>
        Tip: Use the controls below and watch these badges update live.
      </Body>
    </div>
  );
}

function HeaderShowcase() {
  const {cartCount, cartPrice} = useHeaderCartBindings();
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <div style={{border: '1px solid #E6E6E8', borderRadius: '8px', overflow: 'visible'}}>
        <Header cartCount={cartCount} cartPrice={cartPrice} a11yNavLabel="Desktop header account and cart demo" a11yMobileSearchLabel="Desktop demo search" />
      </div>
      <div style={{maxWidth: '400px', border: '1px solid #E6E6E8', borderRadius: '8px', overflow: 'hidden'}}>
          <Header cartCount={cartCount} cartPrice={cartPrice} a11yNavLabel="Mobile header account and cart demo" a11yMobileSearchLabel="Mobile demo search" />
      </div>
    </div>
  );
}

function MultiSurfaceProductDemo() {
  const bindItem = useStoreConnectedItemBindings();
  const featured = bindItem({
    sku: FEATURED_PRODUCT.sku,
    name: FEATURED_PRODUCT.name,
    priceCents: toCents(FEATURED_PRODUCT.price, FEATURED_PRODUCT.cents),
  });

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <Body as="p" size="small" color="subtle" style={{margin: 0}}>
        This is the same product shown in different component styles. Heart or change quantity in any card.
      </Body>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'start'}}>
        <div style={{maxWidth: '220px'}}>
          <ItemTile
            image={FEATURED_PRODUCT.image}
            name={FEATURED_PRODUCT.name}
            price={FEATURED_PRODUCT.price}
            cents={FEATURED_PRODUCT.cents}
            originalPrice="$200.00"
            pricePrefix="Now"
            badge={{label: 'Best seller', type: 'bestseller'}}
            hearted={featured.hearted}
            onHeartChange={featured.onHeartChange}
          />
        </div>

        <ProductCardGrid
          image={FEATURED_PRODUCT.image}
          name={FEATURED_PRODUCT.name}
          price={FEATURED_PRODUCT.price}
          cents={FEATURED_PRODUCT.cents}
          wasPrice="$200.00"
          flag="Best seller"
          rating={4.6}
          ratingCount="3,892"
          pickup="2 pm"
          hearted={featured.hearted}
          onHeartChange={featured.onHeartChange}
          cartQty={featured.cartQty}
          onCartQtyChange={featured.onCartQtyChange}
          onAddToCart={featured.onAddToCart}
        />

        <div style={{maxWidth: '220px'}}>
          <FlashDealsItemTile
            image={FEATURED_PRODUCT.image}
            name={FEATURED_PRODUCT.name}
            price={FEATURED_PRODUCT.price}
            cents={FEATURED_PRODUCT.cents}
            originalPrice="$200.00"
            pricePrefix="Now"
            badge={{label: 'Deal', type: 'deal'}}
            actionType="add"
            idx={1}
            hearted={featured.hearted}
            onHeartChange={featured.onHeartChange}
            cartQty={featured.cartQty}
            onCartQtyChange={featured.onCartQtyChange}
            onAddToCart={featured.onAddToCart}
          />
        </div>
      </div>

      <div style={{maxWidth: '430px'}}>
        <ProductCardList
          image={FEATURED_PRODUCT.image}
          name={FEATURED_PRODUCT.name}
          price={FEATURED_PRODUCT.price}
          cents={FEATURED_PRODUCT.cents}
          wasPrice="$200.00"
          flag="Best seller"
          rating={4.6}
          ratingCount="3,892"
          pickup="2 pm"
          ebt
          cartQty={featured.cartQty}
          onCartQtyChange={featured.onCartQtyChange}
          onAddToCart={featured.onAddToCart}
        />
      </div>
    </div>
  );
}

function RailSyncDemo() {
  const bindItem = useStoreConnectedItemBindings();
  const rail = bindItem({
    sku: RAIL_PRODUCT.sku,
    name: RAIL_PRODUCT.name,
    priceCents: toCents(RAIL_PRODUCT.price, RAIL_PRODUCT.cents),
  });

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <Body as="p" size="small" color="subtle" style={{margin: 0}}>
        Compact cards also stay in sync with each other.
      </Body>
      <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
        <div style={{width: '150px'}}>
          <CarouselProductCard
            image={RAIL_PRODUCT.image}
            price={RAIL_PRODUCT.price}
            cents={RAIL_PRODUCT.cents}
            cartQty={rail.cartQty}
            onCartQtyChange={rail.onCartQtyChange}
            onAddToCart={rail.onAddToCart}
          />
        </div>
        <div style={{width: '150px'}}>
          <PromotionalItemTile
            image={RAIL_PRODUCT.image}
            name={RAIL_PRODUCT.name}
            price={RAIL_PRODUCT.price}
            cents={RAIL_PRODUCT.cents}
            cartQty={rail.cartQty}
            onCartQtyChange={rail.onCartQtyChange}
            onAddToCart={rail.onAddToCart}
          />
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Badge color="neutral">shared quantity: {rail.cartQty}</Badge>
        </div>
      </div>
    </div>
  );
}

function SearchJourneyDemo() {
  const searchQuery = useSharedSearchQuery();
  const fulfillment = useSharedFulfillment();

  const lastSearch = useLastUiEvent<{query?: string}>('ui:header:search-submit');
  const lastHeart = useLastUiEvent<{activated?: boolean}>('ui:heart:toggle');
  const lastFulfillment = useLastUiEvent<{selection?: string}>('ui:header:fulfillment');

  const applySearchPreset = React.useCallback((query: string) => {
    setStoreValue('ui:search:query', query, {persist: true});
    emit('ui:header:search-submit', {query});
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
        <Button variant="secondary" size="small" onClick={() => applySearchPreset('blender')}>
          Search blender
        </Button>
        <Button variant="secondary" size="small" onClick={() => applySearchPreset('cereal')}>
          Search cereal
        </Button>
        <Button variant="secondary" size="small" onClick={() => applySearchPreset('patio chairs')}>
          Search patio chairs
        </Button>
      </div>

      <div style={{maxWidth: '420px', border: '1px solid #E6E6E8', borderRadius: '8px', overflow: 'hidden'}}>
        <Header a11yNavLabel="Search demo header account and cart" a11yMobileSearchLabel="Search demo" />
      </div>

      <div style={{maxWidth: '420px', border: '1px solid #E6E6E8', borderRadius: '8px', overflow: 'hidden'}}>
        <SearchResultsHeader query={searchQuery || 'Start a search above'} />
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px'}}>
        <div style={{border: '1px solid #E6E6E8', borderRadius: '8px', padding: '12px'}}>
          <Caption as="p" style={{margin: '0 0 4px', color: '#74767C'}}>Current search</Caption>
          <Body as="p" size="small" style={{margin: 0}}>{searchQuery || 'No search yet'}</Body>
        </div>
        <div style={{border: '1px solid #E6E6E8', borderRadius: '8px', padding: '12px'}}>
          <Caption as="p" style={{margin: '0 0 4px', color: '#74767C'}}>Fulfillment selection</Caption>
          <Body as="p" size="small" style={{margin: 0}}>{fulfillment}</Body>
        </div>
        <div style={{border: '1px solid #E6E6E8', borderRadius: '8px', padding: '12px'}}>
          <Caption as="p" style={{margin: '0 0 4px', color: '#74767C'}}>Latest search moment</Caption>
          <Body as="p" size="small" style={{margin: 0}}>
            {lastSearch?.payload?.query ? `"${lastSearch.payload.query}"` : 'None yet'}
          </Body>
        </div>
        <div style={{border: '1px solid #E6E6E8', borderRadius: '8px', padding: '12px'}}>
          <Caption as="p" style={{margin: '0 0 4px', color: '#74767C'}}>Latest favorite moment</Caption>
          <Body as="p" size="small" style={{margin: 0}}>
            {lastHeart ? (lastHeart.payload?.activated ? 'Added to favorites' : 'Removed from favorites') : 'None yet'}
          </Body>
        </div>
        <div style={{border: '1px solid #E6E6E8', borderRadius: '8px', padding: '12px'}}>
          <Caption as="p" style={{margin: '0 0 4px', color: '#74767C'}}>Latest fulfillment moment</Caption>
          <Body as="p" size="small" style={{margin: 0}}>
            {lastFulfillment?.payload?.selection || 'None yet'}
          </Body>
        </div>
      </div>
    </div>
  );
}

function StepperValidationDemo() {
  const bindItem = useStoreConnectedItemBindings();
  const {addToCart, clearCart, cartLines, summary} = useItems();
  const listProduct = STEPPER_PRODUCTS[0]!;
  const gridProduct = STEPPER_PRODUCTS[1]!;
  const carouselProduct = STEPPER_PRODUCTS[2]!;
  const promoProduct = STEPPER_PRODUCTS[3]!;
  const flashProduct = STEPPER_PRODUCTS[4]!;

  const listBinding = bindItem({
    sku: listProduct.sku,
    name: listProduct.name,
    priceCents: toCents(listProduct.price, listProduct.cents),
  });
  const gridBinding = bindItem({
    sku: gridProduct.sku,
    name: gridProduct.name,
    priceCents: toCents(gridProduct.price, gridProduct.cents),
  });
  const carouselBinding = bindItem({
    sku: carouselProduct.sku,
    name: carouselProduct.name,
    priceCents: toCents(carouselProduct.price, carouselProduct.cents),
  });
  const promoBinding = bindItem({
    sku: promoProduct.sku,
    name: promoProduct.name,
    priceCents: toCents(promoProduct.price, promoProduct.cents),
  });
  const flashBinding = bindItem({
    sku: flashProduct.sku,
    name: flashProduct.name,
    priceCents: toCents(flashProduct.price, flashProduct.cents),
  });

  const addOneEach = React.useCallback(() => {
    STEPPER_PRODUCTS.forEach((product) => {
      addToCart(
        product.sku,
        product.name,
        toCents(product.price, product.cents),
        1,
      );
    });
  }, [addToCart]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
        <Button variant="primary" size="small" onClick={addOneEach}>
          Add one of each
        </Button>
        <Button variant="tertiary" size="small" onClick={clearCart}>
          Clear all quantities
        </Button>
        <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          <Caption as="span" style={{color: '#74767C'}}>Total units</Caption>
          <Badge color="blue">{summary.totalQty}</Badge>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          <Caption as="span" style={{color: '#74767C'}}>Active lines</Caption>
          <Badge color="green">{summary.lineCount}</Badge>
        </div>
      </div>

      <Body as="p" size="small" color="subtle" style={{margin: 0}}>
        Realistic mix: every card below is a different product. Use this to validate stepper behavior without duplicate clutter.
      </Body>

      <div
        style={{
          border: '1px solid #E6E6E8',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px'}}>
          <Body as="p" size="small" weight="alt" style={{margin: 0}}>
            {listProduct.name}
          </Body>
          <Badge color="blue">{listBinding.cartQty}</Badge>
        </div>
        <ProductCardList
          image={listProduct.image}
          name={listProduct.name}
          price={listProduct.price}
          cents={listProduct.cents}
          flag="Best seller"
          rating={4.5}
          ratingCount="2,104"
          pickup="2 pm"
          cartQty={listBinding.cartQty}
          onCartQtyChange={listBinding.onCartQtyChange}
          onAddToCart={listBinding.onAddToCart}
        />
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'start'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px'}}>
            <Caption as="p" style={{margin: 0, color: '#74767C'}}>{gridProduct.name}</Caption>
            <Badge color="blue">{gridBinding.cartQty}</Badge>
          </div>
          <ProductCardGrid
            image={gridProduct.image}
            name={gridProduct.name}
            price={gridProduct.price}
            cents={gridProduct.cents}
            rating={4.6}
            ratingCount="3,912"
            pickup="Today"
            hearted={gridBinding.hearted}
            onHeartChange={gridBinding.onHeartChange}
            cartQty={gridBinding.cartQty}
            onCartQtyChange={gridBinding.onCartQtyChange}
            onAddToCart={gridBinding.onAddToCart}
          />
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px'}}>
            <Caption as="p" style={{margin: 0, color: '#74767C'}}>{carouselProduct.name}</Caption>
            <Badge color="blue">{carouselBinding.cartQty}</Badge>
          </div>
          <div style={{width: '150px'}}>
            <CarouselProductCard
              image={carouselProduct.image}
              price={carouselProduct.price}
              cents={carouselProduct.cents}
              cartQty={carouselBinding.cartQty}
              onCartQtyChange={carouselBinding.onCartQtyChange}
              onAddToCart={carouselBinding.onAddToCart}
            />
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px'}}>
            <Caption as="p" style={{margin: 0, color: '#74767C'}}>{promoProduct.name}</Caption>
            <Badge color="blue">{promoBinding.cartQty}</Badge>
          </div>
          <div style={{width: '150px'}}>
            <PromotionalItemTile
              image={promoProduct.image}
              name={promoProduct.name}
              price={promoProduct.price}
              cents={promoProduct.cents}
              cartQty={promoBinding.cartQty}
              onCartQtyChange={promoBinding.onCartQtyChange}
              onAddToCart={promoBinding.onAddToCart}
            />
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px'}}>
            <Caption as="p" style={{margin: 0, color: '#74767C'}}>{flashProduct.name}</Caption>
            <Badge color="blue">{flashBinding.cartQty}</Badge>
          </div>
          <div style={{width: '190px'}}>
            <FlashDealsItemTile
              image={flashProduct.image}
              name={flashProduct.name}
              price={flashProduct.price}
              cents={flashProduct.cents}
              originalPrice={`$${parseInt(flashProduct.price, 10) + 20}.00`}
              pricePrefix="Now"
              badge={{label: 'Deal', type: 'deal'}}
              actionType="add"
              idx={901}
              hearted={flashBinding.hearted}
              onHeartChange={flashBinding.onHeartChange}
              cartQty={flashBinding.cartQty}
              onCartQtyChange={flashBinding.onCartQtyChange}
              onAddToCart={flashBinding.onAddToCart}
            />
          </div>
        </div>
      </div>

      <div style={{border: '1px solid #E6E6E8', borderRadius: '8px', padding: '12px'}}>
        <Caption as="p" style={{margin: '0 0 8px', color: '#74767C'}}>
          Live cart lines
        </Caption>
        {cartLines.length === 0 ? (
          <Body as="p" size="small" style={{margin: 0}}>
            No quantities added yet.
          </Body>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
            {cartLines.map((line) => (
              <div
                key={line.sku}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid #E6E6E8',
                  borderRadius: '6px',
                  padding: '8px 10px',
                }}
              >
                <Body as="span" size="small">{line.name}</Body>
                <Badge color="blue">{line.cartQty}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QuickAddStrip() {
  const {addToCart} = useItems();

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
      <Button
        variant="primary"
        size="small"
        onClick={() =>
          addToCart(
            QUICK_ADD_PRODUCT.sku,
            QUICK_ADD_PRODUCT.name,
            toCents(QUICK_ADD_PRODUCT.price, QUICK_ADD_PRODUCT.cents),
            1,
          )
        }
      >
        Add Air Fryer
      </Button>
      <Button
        variant="secondary"
        size="small"
        onClick={() =>
          addToCart(
            FEATURED_PRODUCT.sku,
            FEATURED_PRODUCT.name,
            toCents(FEATURED_PRODUCT.price, FEATURED_PRODUCT.cents),
            1,
          )
        }
      >
        Add Blender
      </Button>
      <Button
        variant="secondary"
        size="small"
        onClick={() =>
          addToCart(
            RAIL_PRODUCT.sku,
            RAIL_PRODUCT.name,
            toCents(RAIL_PRODUCT.price, RAIL_PRODUCT.cents),
            1,
          )
        }
      >
        Add Snack
      </Button>
    </div>
  );
}

export default function ComponentCommunicationPage() {
  return (
    <PageWrapper
      title="Connected Component Experiences"
      category="GETTING STARTED"
      description="A designer-friendly interaction gallery: place components on a page and they stay in sync automatically across cart, favorites, search, and fulfillment."
    >
      <ExampleSection
        title="Start Here"
        description="Set up a quick scenario, then explore the sections below to see shared behavior in action."
      >
        <InteractionSummary />
      </ExampleSection>

      <ExampleSection
        title="Headers Stay Aligned"
        description="Cart count and price update together across desktop and mobile."
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <QuickAddStrip />
          <HeaderShowcase />
        </div>
      </ExampleSection>

      <ExampleSection
        title="One Product Across Many Components"
        description="Different card styles can represent the same product and remain perfectly synchronized."
      >
        <MultiSurfaceProductDemo />
      </ExampleSection>

      <ExampleSection
        title="Compact Rails Also Sync"
        description="Small carousel and promotional cards share the same quantity."
      >
        <RailSyncDemo />
      </ExampleSection>

      <ExampleSection
        title="Stepper Validation Playground"
        description="Use this section for realistic stepper validation across unique products. Duplicate-item behavior is showcased above in the multi-surface demo."
      >
        <StepperValidationDemo />
      </ExampleSection>

      <ExampleSection
        title="Search Context Carries Through"
        description="Search intent and interaction history are reusable across experiences."
      >
        <SearchJourneyDemo />
      </ExampleSection>
    </PageWrapper>
  );
}
