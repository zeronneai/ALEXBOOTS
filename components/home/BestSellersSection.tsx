import React, { useEffect, useState } from 'react';
import type { ShopifyProduct } from '../../src/hooks/useProducts';
import { useReveal } from '../../src/hooks/useReveal';
import { filterByGender, type GenderFilter } from '../../src/hooks/useGenderFilter';

interface Props {
  products: ShopifyProduct[];
  loading: boolean;
  onSelectProduct: (p: ShopifyProduct) => void;
  activeFilter?: GenderFilter;         // driven externally (from category cards)
  onFilterChange?: (f: GenderFilter) => void;
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
    <div className="h-2.5 bg-dark-3 animate-pulse w-3/4 mb-2 rounded" />
    <div className="h-2.5 bg-dark-3 animate-pulse w-1/3 rounded" />
  </div>
);

const BestSellersSection: React.FC<Props> = ({
  products, loading, onSelectProduct, activeFilter, onFilterChange,
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [localFilter, setLocalFilter] = useState<GenderFilter>('all');

  const currentFilter = activeFilter ?? localFilter;

  // Sync local state when parent drives the filter (category card click)
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
    <section id="collection" className="bg-dark-2 py-24 md:py-36 px-5 md:px-12 lg:px-20">

      {/* Header + filter tabs */}
      <div ref={headerRef} className="reveal text-center mb-12 md:mb-16">
        <p className="font-main text-[9px] tracking-[7px] text-gold/45 uppercase mb-5">
          Handcrafted Collection
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-cream uppercase tracking-[0.12em] mb-8">
          The Collection
        </h2>

        {/* Gender filter tabs */}
        <div className="flex items-center justify-center gap-0 border border-white/10 w-fit mx-auto">
          {TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => handleTab(tab.value)}
              className={`px-6 md:px-10 py-2.5 font-display text-[9px] tracking-[4px] uppercase transition-all duration-300 interactive ${
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
          <p className="font-display text-xl text-gold/25 uppercase tracking-[0.2em] mb-4">
            {products.length === 0 ? 'Collection Coming Soon' : 'No products in this category'}
          </p>
          {products.length > 0 && (
            <button
              onClick={() => handleTab('all')}
              className="font-main text-[10px] tracking-[3px] text-cream/30 hover:text-gold uppercase transition-colors duration-300 interactive"
            >
              View all →
            </button>
          )}
        </div>
      ) : (
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
                <div className="product-card-border relative w-full aspect-[3/4] overflow-hidden bg-card-bg mb-4 border border-white/5">
                  {img1 ? (
                    <>
                      <img
                        src={img1.url}
                        alt={img1.altText ?? p.title}
                        loading="lazy"
                        decoding="async"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHov && img2 ? 'opacity-0' : 'opacity-100'}`}
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
                    <span className="font-display text-[9px] tracking-[4px] text-cream uppercase border border-cream/50 px-5 py-3">
                      View Product
                    </span>
                  </div>
                </div>
                <p className="font-display text-[10px] md:text-[11px] text-cream/65 group-hover:text-cream uppercase tracking-[0.07em] leading-snug mb-1.5 transition-colors duration-300 line-clamp-2">
                  {p.title}
                </p>
                <p className="font-main text-gold/75 group-hover:text-gold text-[10px] md:text-[11px] tracking-[2px] transition-colors duration-300">
                  {fmt(amount, currencyCode)}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default BestSellersSection;
