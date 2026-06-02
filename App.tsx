import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SECTIONS_DATA } from './constants';
import { useProducts } from './src/hooks/useProducts';
import { useCart } from './src/hooks/useCart';
import type { ShopifyProduct } from './src/hooks/useProducts';

import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Section from './components/Section';
import CategoryModal from './components/CategoryModal';
import ShopView from './components/ShopView';
import ProductView from './components/ProductView';
import CartDrawer from './components/CartDrawer';

type View = 'home' | 'shop' | 'product';

const App: React.FC = () => {
  // ── View routing ──────────────────────────────────────────────────────────
  const [view, setView]                   = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [isCartOpen, setIsCartOpen]       = useState(false);

  // ── Section scroll (home) ─────────────────────────────────────────────────
  const [currentIndex, setCurrentIndex]   = useState(0);
  const [isModalOpen, setIsModalOpen]     = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const currentIndexRef = useRef(0);
  const isAnimating     = useRef(false);
  const sectionsRef     = useRef<(HTMLElement | null)[]>([]);

  // ── Data hooks ────────────────────────────────────────────────────────────
  const { products, loading: productsLoading } = useProducts();
  const { lines, itemCount, total, checkoutUrl, loading: cartLoading, addToCart, removeFromCart } = useCart();

  // ── Navigation helpers ────────────────────────────────────────────────────
  const openShop    = ()                    => setView('shop');
  const openProduct = (p: ShopifyProduct)   => { setSelectedProduct(p); setView('product'); };
  const goHome      = ()                    => setView('home');
  const backToShop  = ()                    => setView('shop');

  // ── Loader + hero animation ───────────────────────────────────────────────
  const handleLoaderComplete = () => {
    const hero = sectionsRef.current[0];
    if (!hero) return;
    gsap.set(hero, { opacity: 1, visibility: 'visible', zIndex: 10 });
    gsap.timeline()
      .fromTo(hero.querySelector('.section-bg'), { scale: 1.2 }, { scale: 1, duration: 2, ease: 'power2.out' })
      .to(hero.querySelector('.floating-logo'), { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }, '-=1.5')
      .to(hero.querySelector('.big-title'),     { opacity: 1, y: 0,    duration: 1 }, '-=1')
      .to(hero.querySelector('.subtitle'),      { opacity: 1, y: 0,    duration: 1 }, '-=0.8')
      .to(hero.querySelector('.btn-western'),   { opacity: 1, y: 0,    duration: 1 }, '-=0.6');
  };

  const handleOpenCatalog = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setIsModalOpen(true);
  };

  // ── Section slide animation ───────────────────────────────────────────────
  const goToSection = (index: number) => {
    if (isAnimating.current || index === currentIndexRef.current || index < 0 || index >= SECTIONS_DATA.length) return;

    isAnimating.current = true;
    const direction      = index > currentIndexRef.current ? 1 : -1;
    const currentSection = sectionsRef.current[currentIndexRef.current];
    const nextSection    = sectionsRef.current[index];
    if (!currentSection || !nextSection) return;

    currentIndexRef.current = index;
    setCurrentIndex(index);

    gsap.set(nextSection, { zIndex: 20, opacity: 1, visibility: 'visible' });
    gsap.set(currentSection, { zIndex: 10 });

    const nextBg     = nextSection.querySelector('.section-bg');
    const nextTitle  = nextSection.querySelector('.big-title');
    const nextSub    = nextSection.querySelector('.subtitle');
    const nextBtn    = nextSection.querySelector('.btn-western');
    const nextCustom = nextSection.querySelector('.custom-content');
    const nextLogo   = nextSection.querySelector('.floating-logo');

    gsap.set([nextTitle, nextSub, nextBtn, nextLogo, nextCustom].filter(Boolean), { opacity: 0, y: 50 });
    if (nextLogo) gsap.set(nextLogo, { scale: 0.8 });
    gsap.set(nextBg, { scale: 1.2 });

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        gsap.set(currentSection, { opacity: 0, visibility: 'hidden', zIndex: 0 });
      },
    });

    if (direction === 1) {
      gsap.fromTo(nextSection, { y: '100%' }, { y: '0%', duration: 1.2, ease: 'power4.inOut' });
      gsap.to(currentSection.querySelector('.section-bg'), { y: '-20%', duration: 1.2, ease: 'power4.inOut' });
    } else {
      gsap.fromTo(nextSection, { y: '-100%' }, { y: '0%', duration: 1.2, ease: 'power4.inOut' });
      gsap.to(currentSection.querySelector('.section-bg'), { y: '20%', duration: 1.2, ease: 'power4.inOut' });
    }

    tl.to(nextBg, { scale: 1, duration: 1.5, ease: 'power2.out' }, '-=0.5');
    if (nextLogo) tl.to(nextLogo, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.7)' }, '-=1');
    tl.to(nextTitle,  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.8')
      .to(nextSub,    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .to(nextBtn,    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .to(nextCustom, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.8');
  };

  // ── Wheel navigation (home only) ──────────────────────────────────────────
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isModalOpen || view !== 'home') return;
      if (Math.abs(e.deltaY) < 20) return;
      if (e.deltaY > 0) goToSection(currentIndexRef.current + 1);
      else              goToSection(currentIndexRef.current - 1);
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isModalOpen, view]);

  // ── Touch swipe navigation (home only) ───────────────────────────────────
  useEffect(() => {
    let startY = 0;
    let startX = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isModalOpen || view !== 'home') return;
      const dy = startY - e.changedTouches[0].clientY;
      const dx = Math.abs(startX - e.changedTouches[0].clientX);
      // Only trigger vertical swipe when swipe is more vertical than horizontal
      if (Math.abs(dy) < 50 || dx > Math.abs(dy) * 0.8) return;
      if (dy > 0) goToSection(currentIndexRef.current + 1);
      else        goToSection(currentIndexRef.current - 1);
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isModalOpen, view]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="relative w-full h-screen bg-dark-wood overflow-hidden">
      <div className="noise" />
      <Loader onComplete={handleLoaderComplete} />

      {/* Always-on-top navbar */}
      <Navbar
        onNavigate={(idx) => { goHome(); setTimeout(() => goToSection(idx), 50); }}
        onShopClick={openShop}
        onCartClick={() => setIsCartOpen(true)}
        itemCount={itemCount}
        isCartOpen={isCartOpen}
      />

      {/* Category modal (section catalog browsing) */}
      <CategoryModal
        isOpen={isModalOpen}
        category={selectedCategory}
        onClose={() => setIsModalOpen(false)}
        products={products}
        onAddToCart={addToCart}
        onCartOpen={() => setIsCartOpen(true)}
        cartLoading={cartLoading}
      />

      {/* Side indicators — home only */}
      {view === 'home' && (
        <div className="fixed right-10 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-[1000]">
          {SECTIONS_DATA.map((_, idx) => (
            <div
              key={idx}
              onClick={() => goToSection(idx)}
              className={`w-[10px] h-[10px] border border-white/30 rounded-full transition-all duration-300 interactive cursor-pointer
                ${idx === currentIndex ? 'bg-gold border-gold shadow-[0_0_10px_#d4af37]' : ''}`}
            />
          ))}
        </div>
      )}

      {/* Home: section scroll */}
      <div className="w-full h-full relative">
        {SECTIONS_DATA.map((section, index) => (
          <Section
            key={section.id}
            data={section}
            onOpenCatalog={() => handleOpenCatalog(section.title)}
            ref={(el) => { sectionsRef.current[index] = el; }}
          />
        ))}
      </div>

      {/* Shop view overlay */}
      {view === 'shop' && (
        <ShopView
          products={products}
          loading={productsLoading}
          onBack={goHome}
          onSelectProduct={openProduct}
        />
      )}

      {/* Product detail overlay */}
      {view === 'product' && selectedProduct && (
        <ProductView
          product={selectedProduct}
          onBack={backToShop}
          onAddToCart={addToCart}
          onCartOpen={() => setIsCartOpen(true)}
          cartLoading={cartLoading}
        />
      )}

      {/* Cart drawer */}
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
