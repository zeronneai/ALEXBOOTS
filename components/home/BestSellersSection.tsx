import React, { useEffect, useState } from 'react';
import type { ShopifyProduct } from '../../src/hooks/useProducts';
import { useReveal } from '../../src/hooks/useReveal';
import { filterByGender, type GenderFilter } from '../../src/hooks/useGenderFilter';

interface Props {
  products: ShopifyProduct[];
  loading: boolean;
  onSelectProduct: (p: ShopifyProduct) => void;
  activeFilter?: GenderFilter;
  onFilterChange?: (f: GenderFilter) => void;
  onShopAll?: () => void;
}

function fmt(amount: string, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(parseFloat(amount));
}

const TABS: { label: string; value: GenderFilter }[] = [
  { label: 'All',     value: 'all'   },
  { label: "Men's",   value: 'men'   },
  { label: "Women's", value: 'women' },
];

const Skeleton = () => (
  <div>
    <div className="w-full aspect-[3/4] bg-dark-3 animate-pulse mb-4" />
    <div className="h-2 bg-dark-3 animate-pulse w-3/4 mb-2 rounded" />
    <div className="h-2 bg-dark-3 animate-pulse w-1/3 rounded" />
  </div>
);

function isProductSoldOut(p: ShopifyProduct) {
  return p.variants.edges.length > 0 && p.variants.edges.every(e => !e.node.availableForSale);
}

const ProductCard: React.FC<{
  p: ShopifyProduct;
  onSelect: () => void;
}> = ({ p, onSelect }) => {
  const [hov, setHov] = useState(false);
  const img1 = p.images.edges[0]?.node;
  const img2 = p.images.edges[1]?.node;
  const extraImages = p.images.edges.length > 2 ? p.images.edges.length - 1 : 0;
  const { amount, currencyCode } = p.priceRange.minVariantPrice;
  const soldOut = isProductSoldOut(p);

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="text-left w-full group interactive"
    >
      {/* Image container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-card-bg mb-3 md:mb-4">

        {/* Primary image — zooms out as secondary comes in */}
        {img1 && (
          <img
            src={img1.url}
            alt={img1.altText ?? p.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: hov && img2 ? 0 : 1,
              transform: hov ? (img2 ? 'scale(1.06)' : 'scale(1.07)') : 'scale(1)',
              transition: 'opacity 0.65s ease, transform 0.85s ease',
            }}
          />
        )}

        {/* Secondary image — zooms in from slightly larger */}
        {img2 && (
          <img
            src={img2.url}
            alt={img2.altText ?? p.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: hov ? 1 : 0,
              transform: hov ? 'scale(1)' : 'scale(1.06)',
              transition: 'opacity 0.65s ease, transform 0.85s ease',
            }}
          />
        )}

        {/* No image fallback */}
        {!img1 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-white/10 text-[10px] uppercase tracking-widest">No Image</span>
          </div>
        )}

        {/* Sold Out badge */}
        {soldOut && (
          <div className="absolute top-3 left-3 z-10 bg-dark-wood/90 backdrop-blur-sm px-3 py-1.5 border border-white/10">
            <span className="font-display text-[8px] tracking-[3px] text-cream/55 uppercase">Sold Out</span>
          </div>
        )}

        {/* Image count badge (when 3+ images) */}
        {extraImages > 0 && (
          <div className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-sm w-7 h-7 flex items-center justify-center">
            <span className="font-main text-[9px] text-cream/70">+{extraImages}</span>
          </div>
        )}

        {/* Quick Shop bar — slides up from bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 bg-gold flex items-center justify-center py-3"
          style={{
            transform: hov ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.35s cubic-bezier(0.33, 1, 0.68, 1)',
          }}
        >
          <span className="font-display text-[9px] tracking-[5px] text-card-bg uppercase">
            Quick Shop
          </span>
        </div>

        {/* Border glow on hover */}
        <div
          className="absolute inset-0 pointer-events-none border"
          style={{
            borderColor: hov ? 'rgba(212,175,55,0.45)' : 'rgba(255,255,255,0.06)',
            transition: 'border-color 0.4s ease',
          }}
        />
      </div>

      {/* Product info */}
      <p
        className="font-display text-[10px] md:text-[11px] uppercase tracking-[0.08em] leading-snug mb-1.5 line-clamp-2 transition-colors duration-300"
        style={{ color: hov ? '#f5f0e6' : 'rgba(245,240,230,0.7)' }}
      >
        {p.title}
      </p>
      <p
        className="font-main text-[11px] tracking-[2px] transition-colors duration-300"
        style={{ color: hov ? '#d4af37' : 'rgba(212,175,55,0.75)' }}
      >
        {fmt(amount, currencyCode)}
      </p>
    </button>
  );
};

const BestSellersSection: React.FC<Props> = ({
  products, loading, onSelectProduct, activeFilter, onFilterChange, onShopAll,
}) => {
  const [localFilter, setLocalFilter] = useState<GenderFilter>('all');

  const currentFilter = activeFilter ?? localFilter;

  useEffect(() => {
    if (activeFilter !== undefined) setLocalFilter(activeFilter);
  }, [activeFilter]);

  const handleTab = (f: GenderFilter) => {
    setLocalFilter(f);
    onFilterChange?.(f);
  };

  const visible = filterByGender(products, currentFilter);
  const headerRef = useReveal() as React.RefObject<HTMLDivElement>;

  return (
    <section id="collection" className="bg-dark-wood py-24 md:py-36 px-5 md:px-12 lg:px-20">

      {/* Header */}
      <div ref={headerRef} className="reveal mb-14 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div>
            <p className="font-main font-semibold text-[11px] tracking-[6px] text-gold uppercase mb-4">
              Handcrafted Collection
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-cream uppercase tracking-[0.03em] leading-none">
              The Collection
            </h2>
          </div>
          {onShopAll && (
            <button
              onClick={onShopAll}
              className="hidden md:flex items-center gap-3 font-display text-[9px] tracking-[4px] text-cream/45 hover:text-gold uppercase interactive transition-colors duration-300 group flex-shrink-0"
            >
              Shop All
              <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-14" />
            </button>
          )}
        </div>

        <div className="w-full h-px bg-white/[0.07] mb-8" />

        {/* Filter tabs */}
        <div className="flex items-center gap-0 border border-white/10 w-fit">
          {TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => handleTab(tab.value)}
              className={`px-7 md:px-12 py-2.5 font-display text-[9px] tracking-[4px] uppercase transition-all duration-300 interactive ${
                currentFilter === tab.value
                  ? 'bg-gold text-card-bg'
                  : 'text-cream/40 hover:text-cream hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)}
        </div>
      ) : visible.length === 0 ? (
        <div className="text-center py-32">
          <p className="font-display text-xl text-gold/25 uppercase tracking-[0.2em] mb-6">
            {products.length === 0 ? 'Collection Coming Soon' : 'No products in this category'}
          </p>
          {products.length > 0 && (
            <button
              onClick={() => handleTab('all')}
              className="font-display text-[10px] tracking-[4px] text-cream/30 hover:text-gold uppercase transition-colors duration-300 interactive border border-white/10 hover:border-gold/30 px-8 py-3"
            >
              View All →
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {visible.map(p => (
              <ProductCard key={p.id} p={p} onSelect={() => onSelectProduct(p)} />
            ))}
          </div>

          {onShopAll && (
            <div className="mt-16 md:mt-20 text-center">
              <div className="w-full h-px bg-white/[0.07] mb-12" />
              <button
                onClick={onShopAll}
                className="inline-flex items-center gap-4 font-display text-[10px] tracking-[6px] text-cream/50 hover:text-gold uppercase interactive transition-colors duration-300 group"
              >
                <span className="w-8 h-px bg-current group-hover:w-14 transition-all duration-300" />
                Shop Full Collection
                <span className="w-8 h-px bg-current group-hover:w-14 transition-all duration-300" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BestSellersSection;
