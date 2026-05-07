import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ASSETS } from '../constants';
import type { ShopifyProduct, ShopifyVariant } from '../src/hooks/useProducts';

interface CategoryModalProps {
  isOpen: boolean;
  category: string | null;
  onClose: () => void;
  products: ShopifyProduct[];
  onAddToCart: (variantId: string) => Promise<string>;
  cartLoading: boolean;
}

interface CatalogItem {
  title: string;
  img: string;
  actionTarget?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatPrice(price: { amount: string; currencyCode: string }): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(parseFloat(price.amount));
}

function findProduct(itemTitle: string, products: ShopifyProduct[]): ShopifyProduct | undefined {
  const needle = itemTitle.toLowerCase().replace(/[\s-]+/g, '');
  return products.find(p => {
    const handle = p.handle.toLowerCase().replace(/-/g, '');
    const title = p.title.toLowerCase().replace(/[\s-]+/g, '');
    return handle.includes(needle) || title.includes(needle);
  });
}

// ─── Product Detail View ─────────────────────────────────────────────────────

interface ProductViewState {
  product: ShopifyProduct;
  selectedVariantId: string;
}

interface ProductDetailProps {
  state: ProductViewState;
  cartLoading: boolean;
  onVariantSelect: (id: string) => void;
  onAddToCart: () => void;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  state,
  cartLoading,
  onVariantSelect,
  onAddToCart,
  onBack,
}) => {
  const { product, selectedVariantId } = state;
  const image = product.images.edges[0]?.node;
  const selectedVariant = product.variants.edges
    .map(e => e.node)
    .find(v => v.id === selectedVariantId);
  const displayPrice = selectedVariant
    ? formatPrice(selectedVariant.price)
    : formatPrice(product.priceRange.minVariantPrice);

  return (
    <div className="absolute inset-0 bg-card-bg z-20 flex flex-col md:flex-row animate-[fadeIn_0.3s_ease]">
      {/* Image */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-full relative overflow-hidden">
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? product.title}
            className="w-full h-full object-cover brightness-75"
          />
        ) : (
          <div className="w-full h-full bg-black/40 flex items-center justify-center">
            <span className="font-display text-white/20 text-2xl uppercase tracking-widest">
              No Image
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card-bg hidden md:block" />
      </div>

      {/* Details */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-8 md:py-0 overflow-y-auto">
        <button
          onClick={onBack}
          className="font-main text-xs tracking-[3px] text-white/50 hover:text-gold transition-colors duration-300 mb-8 text-left uppercase flex items-center gap-2"
        >
          ← BACK
        </button>

        <h2 className="font-display text-2xl md:text-4xl text-gold uppercase tracking-[0.08em] leading-tight mb-4">
          {product.title}
        </h2>

        <p className="font-main text-xl text-white mb-8 tracking-widest">
          {displayPrice}
        </p>

        {/* Variants */}
        {product.variants.edges.length > 1 && (
          <div className="mb-8">
            <p className="font-main text-[10px] text-white/40 tracking-[3px] uppercase mb-3">
              Size / Style
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variants.edges.map(({ node: v }: { node: ShopifyVariant }) => (
                <button
                  key={v.id}
                  onClick={() => onVariantSelect(v.id)}
                  disabled={!v.availableForSale}
                  className={`
                    px-3 py-2 text-[10px] font-main uppercase tracking-widest border transition-colors duration-200
                    ${selectedVariantId === v.id
                      ? 'bg-gold text-black border-gold'
                      : 'border-white/20 text-white/60 hover:border-gold/50 hover:text-white'}
                    ${!v.availableForSale ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {v.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onAddToCart}
          disabled={cartLoading || !selectedVariantId}
          className="px-10 py-4 bg-gold text-black font-display text-sm uppercase tracking-[3px] hover:bg-white transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed w-fit"
        >
          {cartLoading ? 'ADDING...' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  category,
  onClose,
  products,
  onAddToCart,
  cartLoading,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  const [viewStack, setViewStack] = useState<string[]>([]);
  const [productView, setProductView] = useState<ProductViewState | null>(null);

  // ── Catalog data ───────────────────────────────────────────────────────────

  const rootItems: CatalogItem[] = [
    { title: "MEN'S COLLECTION", img: ASSETS.MEN_BG, actionTarget: "MEN" },
    { title: "WOMEN'S COLLECTION", img: ASSETS.WOMEN_BG, actionTarget: "WOMEN" },
    { title: "KIDS COLLECTION", img: ASSETS.KIDS_BG, actionTarget: "KIDS" },
    { title: "WORK & UNIFORM", img: ASSETS.UNIFORM_BG, actionTarget: "UNIFORM" },
  ];

  const menItems: CatalogItem[] = [
    { title: "EXOTICS", img: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770667642/A_photorealistic_cinematic_4k_202602091404_cqpgr5.jpg", actionTarget: "MEN_EXOTICS" },
    { title: "WESTERN RANCH", img: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770667644/A_rugged_cinematic_4k_202602091403_gzpj2c.jpg", actionTarget: "MEN_WESTERN_RANCH" },
    { title: "EXOTIC PRINT", img: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770667644/A_luxurious_cinematic_4k_202602091403_xscfsi.jpg", actionTarget: "MEN_EXOTIC_PRINT" },
  ];

  const menExoticsItems: CatalogItem[] = [
    { title: "PIRARUCU", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2912&auto=format&fit=crop" },
    { title: "PYTHON", img: "https://images.unsplash.com/photo-1532328014524-7669d2d6c075?q=80&w=2835&auto=format&fit=crop" },
    { title: "OSTRICH", img: "https://images.unsplash.com/photo-1559563458-52c6952d7907?q=80&w=2860&auto=format&fit=crop" },
    { title: "WILD GATOR", img: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2940&auto=format&fit=crop" },
  ];

  const menWesternRanchItems: CatalogItem[] = [
    { title: "ROUGH OUT", img: "https://images.unsplash.com/photo-1520639888713-78db11c0dd5a?q=80&w=2780&auto=format&fit=crop" },
    { title: "WESTERN", img: "https://images.unsplash.com/photo-1533633355057-0b639912c337?q=80&w=1974&auto=format&fit=crop" },
    { title: "TEJIDA", img: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?q=80&w=2787&auto=format&fit=crop" },
    { title: "COWHIDE", img: "https://images.unsplash.com/photo-1589163829023-e18751543fc0?q=80&w=2787&auto=format&fit=crop" },
  ];

  const menExoticPrintItems: CatalogItem[] = [
    { title: "PIRARUCU", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2912&auto=format&fit=crop" },
    { title: "PYTHON", img: "https://images.unsplash.com/photo-1532328014524-7669d2d6c075?q=80&w=2835&auto=format&fit=crop" },
    { title: "STINGRAY", img: "https://images.unsplash.com/photo-1550948537-130a1ce83314?q=80&w=2944&auto=format&fit=crop" },
    { title: "CAIMAN TOP", img: "https://images.unsplash.com/photo-1551655510-555dc3be8633?q=80&w=2787&auto=format&fit=crop" },
    { title: "OSTRICH", img: "https://images.unsplash.com/photo-1559563458-52c6952d7907?q=80&w=2860&auto=format&fit=crop" },
    { title: "LIZARD", img: "https://images.unsplash.com/photo-1548126032-079a0fb00992?q=80&w=2787&auto=format&fit=crop" },
  ];

  const womenItems: CatalogItem[] = [
    { title: "ROUGH OUT", img: "https://images.unsplash.com/photo-1628203022248-e87e1488c594?q=80&w=2940&auto=format&fit=crop" },
    { title: "WESTERN", img: "https://images.unsplash.com/photo-1589163829023-e18751543fc0?q=80&w=2787&auto=format&fit=crop" },
    { title: "TEJIDA", img: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=2940&auto=format&fit=crop" },
    { title: "COWHIDE", img: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=2864&auto=format&fit=crop" },
  ];

  const kidsItems: CatalogItem[] = [
    { title: "PRINT", img: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770668085/A_cool_cinematic_4k_202602091407_xi7gsx.jpg" },
    { title: "WESTERN", img: "https://res.cloudinary.com/dsprn0ew4/image/upload/v1770668107/A_cute_photorealistic_4k_202602091408_dxzseq.jpg" },
  ];

  const uniformItems: CatalogItem[] = [
    { title: "TACTICAL", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2787&auto=format&fit=crop" },
    { title: "WORK", img: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?q=80&w=2787&auto=format&fit=crop" },
  ];

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  useEffect(() => {
    if (isOpen && category) {
      document.body.style.overflow = 'hidden';
      setProductView(null);

      const upperCat = category.toUpperCase();
      let initialView = 'ROOT';
      if (upperCat.includes('MEN') && !upperCat.includes('WO')) initialView = 'MEN';
      else if (upperCat.includes('WOMEN')) initialView = 'WOMEN';
      else if (upperCat.includes('KID') || upperCat.includes('LITTLE')) initialView = 'KIDS';
      else if (upperCat.includes('UNIFORM') || upperCat.includes('WORK')) initialView = 'UNIFORM';

      setViewStack([initialView]);

      gsap.timeline()
        .to(modalRef.current, { y: '0%', duration: 0.8, ease: 'expo.inOut' })
        .to(contentRef.current, { opacity: 1, duration: 0.5 }, '-=0.3');
    } else if (!isOpen) {
      document.body.style.overflow = '';
      gsap.timeline()
        .to(contentRef.current, { opacity: 0, duration: 0.3 })
        .to(modalRef.current, { y: '100%', duration: 0.8, ease: 'expo.inOut' }, '-=0.1');
    }
  }, [isOpen, category]);

  // ── Navigation ─────────────────────────────────────────────────────────────

  const animateTransition = (callback: () => void) => {
    if (itemsContainerRef.current) {
      gsap.to(itemsContainerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          callback();
          gsap.set(itemsContainerRef.current, { y: -20 });
          gsap.to(itemsContainerRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 });
        },
      });
    } else {
      callback();
    }
  };

  const handleItemClick = (item: CatalogItem) => {
    if (item.actionTarget) {
      animateTransition(() => setViewStack(prev => [...prev, item.actionTarget!]));
    } else {
      // Leaf item — open product detail if a matching Shopify product exists
      const product = findProduct(item.title, products);
      if (product) {
        const firstAvailable =
          product.variants.edges.find(e => e.node.availableForSale)?.node ??
          product.variants.edges[0]?.node;
        setProductView({ product, selectedVariantId: firstAvailable?.id ?? '' });
      }
    }
  };

  const handleBack = () => {
    if (productView) {
      setProductView(null);
      return;
    }
    if (viewStack.length > 1) {
      animateTransition(() => setViewStack(prev => prev.slice(0, -1)));
    } else {
      onClose();
    }
  };

  const handleAddToCart = async () => {
    if (!productView?.selectedVariantId) return;
    try {
      const checkoutUrl = await onAddToCart(productView.selectedVariantId);
      window.location.href = checkoutUrl;
    } catch {
      // error is surfaced via cartLoading / error state in parent
    }
  };

  // ── Render helpers ─────────────────────────────────────────────────────────

  const getCurrentViewData = () => {
    const currentView = viewStack[viewStack.length - 1];
    switch (currentView) {
      case 'ROOT':             return { title: 'SELECT DEPARTMENT', items: rootItems };
      case 'MEN':              return { title: "MEN'S COLLECTION", items: menItems };
      case 'MEN_EXOTICS':     return { title: "MEN'S EXOTICS", items: menExoticsItems };
      case 'MEN_WESTERN_RANCH': return { title: 'WESTERN RANCH', items: menWesternRanchItems };
      case 'MEN_EXOTIC_PRINT': return { title: 'EXOTIC PRINT', items: menExoticPrintItems };
      case 'WOMEN':            return { title: "WOMEN'S COLLECTION", items: womenItems };
      case 'KIDS':             return { title: 'LITTLE RANCHERS', items: kidsItems };
      case 'UNIFORM':          return { title: 'WORK & UNIFORM', items: uniformItems };
      default:                 return { title: 'CATALOG', items: [] };
    }
  };

  const { title: displayTitle, items: currentItems } = getCurrentViewData();
  const canGoBack = viewStack.length > 1 || !!productView;

  // ── JSX ────────────────────────────────────────────────────────────────────

  return (
    <div
      ref={modalRef}
      className="fixed top-0 left-0 w-full h-full bg-card-bg z-[2000] translate-y-full flex flex-col pointer-events-auto overflow-hidden"
      style={{ pointerEvents: isOpen ? 'all' : 'none' }}
    >
      {/* Navigation controls */}
      <div className="absolute top-8 w-full px-12 z-50 flex justify-between items-center text-white font-main text-sm tracking-[2px]">
        {canGoBack ? (
          <div
            className="cursor-pointer interactable hover:text-accent-gold transition-colors duration-300 flex items-center gap-2"
            onClick={handleBack}
          >
            <span>[ &lt; ]</span> BACK
          </div>
        ) : (
          <div className="text-white/30">MAIN MENU</div>
        )}
        <div
          className="cursor-pointer interactable hover:text-accent-gold transition-colors duration-300"
          onClick={onClose}
        >
          CLOSE [ X ]
        </div>
      </div>

      {/* Product detail overlay */}
      {productView && (
        <ProductDetail
          state={productView}
          cartLoading={cartLoading}
          onVariantSelect={id =>
            setProductView(prev => prev ? { ...prev, selectedVariantId: id } : prev)
          }
          onAddToCart={handleAddToCart}
          onBack={() => setProductView(null)}
        />
      )}

      {/* Catalog grid */}
      <div
        ref={contentRef}
        className="w-full h-full flex flex-col justify-center items-center opacity-0 px-4 md:px-10 py-10"
      >
        <h2 className="font-display text-3xl md:text-5xl text-accent-gold mb-8 uppercase tracking-[0.1em] whitespace-pre-line text-center">
          {displayTitle}
        </h2>

        {currentItems.length > 0 ? (
          <div
            ref={itemsContainerRef}
            className="flex w-full h-[60vh] gap-2 md:gap-4 max-w-[1600px] overflow-x-auto"
          >
            {currentItems.map((item, idx) => {
              const shopifyProduct = !item.actionTarget
                ? findProduct(item.title, products)
                : undefined;
              const isShoppable = !item.actionTarget && !!shopifyProduct;

              return (
                <div
                  key={idx}
                  onClick={() => handleItemClick(item)}
                  className={`
                    relative flex-1 min-w-[200px] md:min-w-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                    group overflow-hidden border border-white/5 hover:border-gold/50 rounded-sm
                    ${item.actionTarget || isShoppable ? 'cursor-pointer hover:flex-[2.5]' : 'hover:flex-[2]'}
                  `}
                >
                  <img
                    src={shopifyProduct?.images.edges[0]?.node.url ?? item.img}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.5] grayscale-[30%] group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />

                  <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end items-center">
                    <h3 className="font-display text-xl md:text-2xl text-gold tracking-widest text-center transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 drop-shadow-lg">
                      {item.title}
                    </h3>

                    {/* Price badge — only when Shopify product is matched */}
                    {shopifyProduct && (
                      <p className="font-main text-[11px] text-white/70 tracking-[2px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {formatPrice(shopifyProduct.priceRange.minVariantPrice)}
                      </p>
                    )}

                    <span className="font-main text-[10px] text-white/70 tracking-[2px] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 uppercase">
                      {item.actionTarget ? 'Explore' : isShoppable ? 'Shop Now' : ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border border-white/10 p-20 w-full max-w-4xl h-[50vh] bg-white/5">
            <p className="font-main text-[#666] text-xl tracking-widest uppercase">
              Coming Soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryModal;
