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

const BestSellersSection: React.FC<Props> = ({
  products, loading, onSelectProduct, activeFilter, onFilterChange, onShopAll,
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
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
            <p className="font-main text-[9px] tracking-[7px] text-gold/60 uppercase mb-4">
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
            {visible.map(p => {
              const img1 = p.images.edges[0]?.node;
              const img2 = p.images.edges[1]?.node;
              const { amount, currencyCode } = p.priceRange.minVariantPrice;
              const isHov = hovered === p.id;

              return (
                <button
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="text-left interactive group w-full"
                >
                  <div className="product-card-border relative w-full aspect-[3/4] overflow-hidden bg-card-bg mb-4 border border-white/[0.06]">
                    {img1 ? (
                      <>
                        <img
                          src={img1.url}
                          alt={img1.altText ?? p.title}
                          loading="lazy"
                          decoding="async"
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                            isHov ? (img2 ? 'opacity-0' : 'scale-[1.04] brightness-75') : 'opacity-100 scale-100'
                          }`}
                        />
                        {img2 && (
                          <img
                            src={img2.url}
                            alt={img2.altText ?? p.title}
                            loading="lazy"
                            decoding="async"
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHov ? 'opacity-100' : 'opacity-0'}`}
                          />
                        )}
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-white/10 text-[10px] uppercase tracking-widest">No Image</span>
                      </div>
                    )}
                    <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${isHov ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="font-display text-[9px] tracking-[5px] text-cream uppercase border border-cream/60 px-6 py-3">
                        View Product
                      </span>
                    </div>
                  </div>
                  <p className="font-display text-[10px] md:text-[11px] text-cream/70 group-hover:text-cream uppercase tracking-[0.08em] leading-snug mb-2 transition-colors duration-300 line-clamp-2">
                    {p.title}
                  </p>
                  <p className="font-main text-gold/80 group-hover:text-gold text-[11px] tracking-[2px] transition-colors duration-300">
                    {fmt(amount, currencyCode)}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Shop all CTA */}
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
