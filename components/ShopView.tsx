import React, { useState } from 'react';
import type { ShopifyProduct } from '../src/hooks/useProducts';
import { filterByGender, type GenderFilter } from '../src/hooks/useGenderFilter';

interface ShopViewProps {
  products: ShopifyProduct[];
  loading: boolean;
  onBack: () => void;
  onSelectProduct: (product: ShopifyProduct) => void;
  initialFilter?: GenderFilter;
}

function fmt(amount: string, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(parseFloat(amount));
}

function isProductSoldOut(p: ShopifyProduct) {
  return p.variants.edges.length > 0 && p.variants.edges.every(e => !e.node.availableForSale);
}

const TABS: { label: string; value: GenderFilter }[] = [
  { label: 'All',     value: 'all'   },
  { label: "Men's",   value: 'men'   },
  { label: "Women's", value: 'women' },
];

const ShopProductCard: React.FC<{
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
      className="group text-left interactive w-full"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-card-bg mb-3">

        {/* Primary image */}
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

        {/* Secondary image */}
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

        {!img1 && (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-white/10 text-xs uppercase tracking-widest">No Image</span>
          </div>
        )}

        {/* Sold Out badge */}
        {soldOut && (
          <div className="absolute top-3 left-3 z-10 bg-dark-wood/90 backdrop-blur-sm px-3 py-1.5 border border-white/10">
            <span className="font-display text-[8px] tracking-[3px] text-cream/55 uppercase">Sold Out</span>
          </div>
        )}

        {/* Image count */}
        {extraImages > 0 && (
          <div className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-sm w-7 h-7 flex items-center justify-center">
            <span className="font-main text-[9px] text-cream/70">+{extraImages}</span>
          </div>
        )}

        {/* Quick Shop bar */}
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

        {/* Border glow */}
        <div
          className="absolute inset-0 pointer-events-none border"
          style={{
            borderColor: hov ? 'rgba(212,175,55,0.45)' : 'rgba(255,255,255,0.06)',
            transition: 'border-color 0.4s ease',
          }}
        />
      </div>

      <h3
        className="font-display text-[10px] md:text-sm uppercase tracking-[0.08em] leading-snug mb-1 md:mb-2 line-clamp-2 transition-colors duration-300"
        style={{ color: hov ? '#f5f0e6' : 'rgba(245,240,230,0.65)' }}
      >
        {p.title}
      </h3>
      <p
        className="font-main text-[10px] md:text-[11px] tracking-[2px] md:tracking-[3px] transition-colors duration-300"
        style={{ color: hov ? '#d4af37' : 'rgba(212,175,55,0.70)' }}
      >
        {fmt(amount, currencyCode)}
      </p>
    </button>
  );
};

const ShopView: React.FC<ShopViewProps> = ({ products, loading, onBack, onSelectProduct, initialFilter = 'all' }) => {
  const [filter, setFilter] = useState<GenderFilter>(initialFilter);
  const visible = filterByGender(products, filter);

  return (
    <div className="fixed inset-0 bg-dark-wood z-[1500] overflow-y-auto">
      {/* Sticky header */}
      <div
        className="sticky top-0 z-10 bg-[#0f0c08]/95 backdrop-blur-sm border-b border-white/5 px-4 md:px-16 py-4 md:py-6"
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top, 0px))' }}
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={onBack}
            className="font-main text-[10px] tracking-[3px] text-white/40 hover:text-gold transition-colors duration-300 uppercase flex items-center gap-2 interactive flex-shrink-0"
          >
            ← BACK
          </button>
          <div className="text-center flex-1 min-w-0">
            <h1 className="font-display text-sm md:text-xl text-gold uppercase tracking-[0.15em] md:tracking-[0.25em] truncate">
              Our Collection
            </h1>
            {!loading && products.length > 0 && (
              <p className="font-main text-[9px] text-white/25 tracking-[3px] mt-1">
                {visible.length} PRODUCTS
              </p>
            )}
          </div>
          <div className="w-12 md:w-16 flex-shrink-0" />
        </div>

        {/* Gender filter tabs */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-0 border border-white/10">
            {TABS.map(tab => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-6 md:px-10 py-2 font-display text-[9px] tracking-[4px] uppercase transition-all duration-300 interactive ${
                  filter === tab.value
                    ? 'bg-gold text-card-bg'
                    : 'text-cream/40 hover:text-cream hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 md:px-16 py-8 md:py-12 pb-24">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-5 gap-y-10 md:gap-y-14">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <div className="w-full aspect-[3/4] bg-white/5 animate-pulse mb-3" />
                <div className="h-3 bg-white/5 animate-pulse w-2/3 mb-2" />
                <div className="h-3 bg-white/5 animate-pulse w-1/3" />
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <div className="w-10 h-[1px] bg-gold/20 mb-8" />
            <p className="font-display text-xl md:text-2xl text-gold/30 uppercase tracking-[0.15em] mb-4">
              {products.length === 0 ? 'Collection Coming Soon' : 'No products in this category'}
            </p>
            {products.length > 0 && (
              <button
                onClick={() => setFilter('all')}
                className="font-main text-[10px] tracking-[3px] text-white/30 hover:text-gold uppercase transition-colors duration-300 interactive mt-2"
              >
                View all →
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-5 gap-y-10 md:gap-y-14">
            {visible.map(p => (
              <ShopProductCard key={p.id} p={p} onSelect={() => onSelectProduct(p)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopView;
