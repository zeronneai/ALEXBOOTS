import React, { useRef, useState } from 'react';
import type { ShopifyProduct } from '../../src/hooks/useProducts';
import { useReveal } from '../../src/hooks/useReveal';

interface Props {
  products: ShopifyProduct[];
  loading: boolean;
  onSelectProduct: (p: ShopifyProduct) => void;
}

function fmt(amount: string, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(parseFloat(amount));
}

const Skeleton = () => (
  <div>
    <div className="w-full aspect-[3/4] bg-dark-3 animate-pulse mb-4" />
    <div className="h-2.5 bg-dark-3 animate-pulse w-3/4 mb-2 rounded" />
    <div className="h-2.5 bg-dark-3 animate-pulse w-1/3 rounded" />
  </div>
);

const BestSellersSection: React.FC<Props> = ({ products, loading, onSelectProduct }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const headerRef = useReveal() as React.RefObject<HTMLDivElement>;
  const gridRef   = useReveal(0.06) as React.RefObject<HTMLDivElement>;

  return (
    <section id="collection" className="bg-dark-2 py-24 md:py-36 px-5 md:px-12 lg:px-20">

      {/* Section header */}
      <div ref={headerRef} className="reveal text-center mb-16 md:mb-24">
        <p className="font-main text-[9px] tracking-[7px] text-gold/45 uppercase mb-5">
          Handcrafted Collection
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-cream uppercase tracking-[0.12em] mb-5">
          The Collection
        </h2>
        <div className="w-14 h-px bg-gold/40 mx-auto" />
      </div>

      {/* Product grid */}
      <div ref={gridRef} className="reveal reveal-delay-2">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-display text-xl text-gold/25 uppercase tracking-[0.2em]">Collection Coming Soon</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {products.map(p => {
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
                  {/* Image */}
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
                    {/* Hover overlay */}
                    <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-350 ${isHov ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="font-display text-[9px] tracking-[4px] text-cream uppercase border border-cream/50 px-5 py-3">
                        View Product
                      </span>
                    </div>
                  </div>

                  {/* Info */}
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
      </div>
    </section>
  );
};

export default BestSellersSection;
