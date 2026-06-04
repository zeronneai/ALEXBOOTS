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

const TABS: { label: string; value: GenderFilter }[] = [
  { label: 'All',     value: 'all'   },
  { label: "Men's",   value: 'men'   },
  { label: "Women's", value: 'women' },
];

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
            {visible.map(p => {
              const img = p.images.edges[0]?.node;
              const { amount, currencyCode } = p.priceRange.minVariantPrice;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="group text-left interactive w-full"
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-card-bg mb-3">
                    {img ? (
                      <img
                        src={img.url}
                        alt={img.altText ?? p.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover brightness-90 group-hover:brightness-105 group-hover:scale-[1.04] transition-all duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-white/10 text-xs uppercase tracking-widest">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <h3 className="font-display text-[10px] md:text-sm text-white/65 group-hover:text-white/90 uppercase tracking-[0.08em] leading-snug mb-1 md:mb-2 transition-colors duration-300 line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="font-main text-gold/70 group-hover:text-gold text-[10px] md:text-[11px] tracking-[2px] md:tracking-[3px] transition-colors duration-300">
                    {fmt(amount, currencyCode)}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopView;
