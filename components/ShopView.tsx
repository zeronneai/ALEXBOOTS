import React from 'react';
import type { ShopifyProduct } from '../src/hooks/useProducts';

interface ShopViewProps {
  products: ShopifyProduct[];
  loading: boolean;
  onBack: () => void;
  onSelectProduct: (product: ShopifyProduct) => void;
}

function fmt(amount: string, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(parseFloat(amount));
}

const ShopView: React.FC<ShopViewProps> = ({ products, loading, onBack, onSelectProduct }) => (
  <div className="fixed inset-0 bg-dark-wood z-[1500] overflow-y-auto">
    {/* Sticky header */}
    <div
      className="sticky top-0 z-10 bg-[#0f0c08]/95 backdrop-blur-sm border-b border-white/5 px-4 md:px-16 py-4 md:py-6 flex items-center justify-between gap-4"
      style={{ paddingTop: 'max(1rem, env(safe-area-inset-top, 0px))' }}
    >
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
            {products.length} PRODUCTS
          </p>
        )}
      </div>
      <div className="w-12 md:w-16 flex-shrink-0" />
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
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
          <div className="w-10 h-[1px] bg-gold/20 mb-8" />
          <p className="font-display text-xl md:text-2xl text-gold/30 uppercase tracking-[0.15em] mb-4">
            Collection Coming Soon
          </p>
          <p className="font-main text-white/20 text-[10px] tracking-[3px] uppercase">
            Products will appear here once the store is connected
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-5 gap-y-10 md:gap-y-14">
          {products.map(p => {
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

export default ShopView;
