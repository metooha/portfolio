import * as React from 'react';
import './fonts/index.css';
import './themes/index.css';
import { createRoot } from 'react-dom/client';
import { THEME_NAMES, useInitializeTheming } from './utils/Theming';
import { useInitializeStore } from './utils/Store';
import { useInitializeLayout } from './utils/Layout';
import DevToolsPanel from './utils/DevToolsPanel';
import Index from './pages/IndexPage';
import {A11yAnnouncementProvider} from './components/A11yAnnouncement/A11yAnnouncement';

export default function App() {

  // ── Theme ─────────────────────────────────────────────────────
  // Set the active theme for this app. Change the name to match the target brand.
  // Supported themes:
  //   'Walmart' | "Sam's Club" | 'Walmart B2B' | 'Bodega' | 'Cashi MX'
  //   'Data Ventures' | 'Sparky' | 'Walmart Legacy' | 'Walmart+' | "Member's Mark"
  useInitializeTheming('Walmart', THEME_NAMES);

  useInitializeStore();

  // ── Responsive layout ─────────────────────────────────────────
  // Tracks the active canonical breakpoint tier (small/medium/large/xLarge/
  // xxLarge from src/themes/base.css) and writes `data-ld-viewport` onto
  // <html> so any component — JS via useViewport() or pure CSS via
  // [data-ld-viewport="small"] — can react to size changes.
  useInitializeLayout();

  // ── Store Bindings (REQUIRED for headers & product interactions) ──
  // Every page with a header MUST use useHeaderCartBindings() so cart
  // count and price update live as items are added/removed:
  //
  //   import { useHeaderCartBindings, useStoreConnectedItemBindings } from './utils/Store';
  //
  //   const { cartCount, cartPrice } = useHeaderCartBindings();
  //   <WCPHeader cartCount={cartCount} cartPrice={cartPrice} />
  //
  // Every product card/tile MUST use useStoreConnectedItemBindings() so
  // cart qty, heart state, and header totals stay in sync across all
  // components that reference the same SKU:
  //
  //   const bindItem = useStoreConnectedItemBindings();
  //   const product = bindItem({ sku: "ABC", name: "Item", priceCents: 1999 });
  //
  //   <WCPHeartView activated={product.hearted} onChange={product.onHeartChange} />
  //   {product.cartQty === 0
  //     ? <Button variant="primary" onClick={product.onAddToCart}>Add to cart</Button>
  //     : <QuantityStepper count={product.cartQty} onChange={product.onCartQtyChange} />}
  //
  // NEVER use local useState for cart/heart state. NEVER use addToCart()
  // with QuantityStepper — it increments; use onCartQtyChange (sets exact qty).

  return (
    // A11yAnnouncementProvider mounts ONE global assertive + polite aria-live
    // pair in the DOM at page load — available to all pages via useAnnounce().
    // Pages that use LivingDesignProvider get a nested provider (innermost wins)
    // which is fine. Components inside aria-modal dialogs should render their
    // own in-dialog live regions in addition to calling useAnnounce().
    <A11yAnnouncementProvider>
      <Index />
      <DevToolsPanel />
    </A11yAnnouncementProvider>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
