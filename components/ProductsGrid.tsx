import React, { forwardRef, useState } from 'react';
import type { ShopifyProduct } from '../src/hooks/useProducts';

interface ProductsGridProps {
  products: ShopifyProduct[];
  loading: boolean;
  onAddToCart: (variantId: string) => Promise<string>;
  cartLoading: boolean;
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}

const ProductsGrid = forwardRef<HTMLElement, ProductsGridProps>(
  ({ products, loading, onAddToCart, cartLoading }, ref) => {
    const [addingId, setAddingId] = useState<string | null>(null);

    const handleAddToCart = async (variantId: string, productId: string) => {
      setAddingId(productId);
      try {
        const url = await onAddToCart(variantId);
        window.location.href = url;
      } catch {
        setAddingId(null);
      }
    };

    const displayed = products.slice(0, 6);

    const renderCards = () => {
      if (loading) {
        return Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="w-full aspect-[3/4] bg-white/5 animate-pulse rounded-sm" />
            <div className="h-4 bg-white/5 animate-pulse rounded w-3/4" />
            <div className="h-3 bg-white/5 animate-pulse rounded w-1/3" />
            <div className="h-8 bg-white/5 animate-pulse rounded" />
          </div>
        ));
      }

      if (displayed.length === 0) {
        return (
          <div className="col-span-2 md:col-span-3 flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-[1px] bg-gold/30 mb-8" />
            <p className="font-display text-xl md:text-2xl text-gold/40 uppercase tracking-[0.2em] mb-4">
              Collection Coming Soon
            </p>
            <p className="font-main text-white/30 text-xs tracking-[3px] uppercase">
              Explore our catalog to browse all styles
            </p>
          </div>
        );
      }

      return displayed.map(product => {
        const image = product.images.edges[0]?.node;
        const { amount, currencyCode } = product.priceRange.minVariantPrice;
        const firstAvailable =
          product.variants.edges.find(e => e.node.availableForSale)?.node ??
          product.variants.edges[0]?.node;
        const isAdding = addingId === product.id && cartLoading;

        return (
          <div key={product.id} className="group flex flex-col">
            {/* Image */}
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-card-bg mb-3 md:mb-4">
              {image ? (
                <img
                  src={image.url}
                  alt={image.altText ?? product.title}
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display text-white/10 text-sm uppercase tracking-widest">
                    No Image
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Info */}
            <h3 className="font-display text-xs md:text-sm text-white/80 uppercase tracking-[0.12em] truncate mb-1">
              {product.title}
            </h3>
            <p className="font-main text-gold text-xs tracking-[3px] mb-3">
              {formatPrice(amount, currencyCode)}
            </p>
            <button
              onClick={() => firstAvailable && handleAddToCart(firstAvailable.id, product.id)}
              disabled={isAdding || !firstAvailable}
              className="mt-auto w-full py-2 border border-gold/40 text-gold font-main text-[9px] md:text-[10px] uppercase tracking-[2px] hover:bg-gold hover:text-black hover:border-gold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed interactive"
            >
              {isAdding ? 'ADDING...' : 'ADD TO CART'}
            </button>
          </div>
        );
      });
    };

    return (
      <section
        ref={ref}
        className="w-full h-full absolute top-0 left-0 flex flex-col bg-dark-wood opacity-0 invisible overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

        <div className="relative z-10 flex flex-col h-full px-8 md:px-16 pt-28 pb-8">
          {/* Header */}
          <div className="mb-6 md:mb-8 flex-shrink-0">
            <p className="font-main text-[9px] tracking-[5px] text-gold/50 uppercase mb-2">
              EST. 1985 · EL PASO, TEXAS
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-gold uppercase tracking-[0.06em]">
              Our Collection
            </h2>
            <div className="w-14 h-[1px] bg-gold/40 mt-4" />
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 flex-1 min-h-0 overflow-y-auto overflow-x-hidden pb-4"
               style={{ scrollbarWidth: 'none' }}
               onWheel={e => e.stopPropagation()}
          >
            {renderCards()}
          </div>
        </div>
      </section>
    );
  }
);

ProductsGrid.displayName = 'ProductsGrid';

export default ProductsGrid;
