import React, { useEffect, useState } from 'react';
import { useProducts } from './src/hooks/useProducts';
import { useCart }     from './src/hooks/useCart';
import type { ShopifyProduct } from './src/hooks/useProducts';

import Navbar      from './components/Navbar';
import Loader      from './components/Loader';
import HomePage    from './components/HomePage';
import ShopView    from './components/ShopView';
import ProductView from './components/ProductView';
import CartDrawer  from './components/CartDrawer';

type View = 'home' | 'shop' | 'product';

const App: React.FC = () => {
  const [view,            setView]            = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [isCartOpen,      setIsCartOpen]      = useState(false);
  const [isReady,         setIsReady]         = useState(false);

  const { products, loading: productsLoading } = useProducts();
  const { lines, itemCount, total, checkoutUrl, loading: cartLoading, addToCart, removeFromCart } = useCart();

  const openShop    = ()                  => setView('shop');
  const openProduct = (p: ShopifyProduct) => { setSelectedProduct(p); setView('product'); };
  const goHome      = ()                  => setView('home');
  const backToShop  = ()                  => setView('shop');

  // Lock body scroll when overlays are open
  useEffect(() => {
    document.body.style.overflow = (view !== 'home' || isCartOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [view, isCartOpen]);

  return (
    <div className="bg-dark-wood min-h-screen">
      <div className="noise" />

      <Loader onComplete={() => setIsReady(true)} />

      <Navbar
        onShopClick={openShop}
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={goHome}
        itemCount={itemCount}
        isCartOpen={isCartOpen}
        isOverlay={view !== 'home'}
      />

      {/* Home scrolling page — always mounted, overlays stack on top */}
      <HomePage
        products={products}
        productsLoading={productsLoading}
        onSelectProduct={openProduct}
        onShopClick={openShop}
        isReady={isReady}
      />

      {/* Overlays */}
      {view === 'shop' && (
        <ShopView
          products={products}
          loading={productsLoading}
          onBack={goHome}
          onSelectProduct={openProduct}
        />
      )}

      {view === 'product' && selectedProduct && (
        <ProductView
          product={selectedProduct}
          onBack={backToShop}
          onAddToCart={addToCart}
          onCartOpen={() => setIsCartOpen(true)}
          cartLoading={cartLoading}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        lines={lines}
        total={total}
        checkoutUrl={checkoutUrl}
        onRemove={removeFromCart}
        loading={cartLoading}
      />
    </div>
  );
};

export default App;
