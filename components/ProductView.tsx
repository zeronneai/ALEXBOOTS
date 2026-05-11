import React, { useState } from 'react';
import type { ShopifyProduct, ShopifyVariant } from '../src/hooks/useProducts';

interface ProductViewProps {
  product: ShopifyProduct;
  onBack: () => void;
  onAddToCart: (variantId: string) => Promise<void>;
  onCartOpen: () => void;
  cartLoading: boolean;
}

function fmt(amount: string, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(parseFloat(amount));
}

const ProductView: React.FC<ProductViewProps> = ({
  product, onBack, onAddToCart, onCartOpen, cartLoading,
}) => {
  const images   = product.images.edges.map(e => e.node);
  const variants = product.variants.edges.map(e => e.node);

  const [activeImg, setActiveImg]     = useState(0);
  const [selected, setSelected]       = useState<ShopifyVariant | null>(
    variants.find(v => v.availableForSale) ?? variants[0] ?? null
  );
  const [adding, setAdding] = useState(false);
  const [added,  setAdded]  = useState(false);

  const displayPrice = selected
    ? fmt(selected.price.amount, selected.price.currencyCode)
    : fmt(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode);

  const showVariants = variants.length > 0 && !(variants.length === 1 && variants[0].title === 'Default Title');

  const handleAdd = async () => {
    if (!selected || adding) return;
    setAdding(true);
    try {
      await onAddToCart(selected.id);
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
      onCartOpen();
    } catch { /* error surfaced by cart hook */ }
    finally { setAdding(false); }
  };

  return (
    <div className="fixed inset-0 bg-dark-wood z-[1600] overflow-y-auto">
      {/* Back */}
      <button
        onClick={onBack}
        className="fixed top-8 left-8 md:left-16 font-main text-[10px] tracking-[3px] text-white/35 hover:text-gold transition-colors duration-300 uppercase flex items-center gap-3 z-20 interactive"
      >
        ← BACK
      </button>

      <div className="min-h-screen flex flex-col md:flex-row">

        {/* ── Left: Gallery ───────────────────────────────────── */}
        <div className="w-full md:w-[55%] md:sticky md:top-0 md:h-screen flex flex-col">
          {/* Main image */}
          <div className="flex-1 bg-card-bg overflow-hidden min-h-[50vh] md:min-h-0">
            {images[activeImg] ? (
              <img
                src={images[activeImg].url}
                alt={images[activeImg].altText ?? product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-white/10 uppercase tracking-widest">No Image</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 p-3 bg-[#0a0806] overflow-x-auto flex-shrink-0"
                 style={{ scrollbarWidth: 'none' }}>
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-14 h-14 overflow-hidden transition-all duration-200 interactive
                    ${activeImg === i ? 'ring-1 ring-gold opacity-100' : 'opacity-30 hover:opacity-60'}`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Details ────────────────────────────────────── */}
        <div className="w-full md:w-[45%] px-8 md:px-12 lg:px-16 pt-24 md:pt-28 pb-20 flex flex-col">

          {/* Title + price */}
          <p className="font-main text-[9px] tracking-[5px] text-gold/40 uppercase mb-4">
            EST. 1985 · EL PASO, TEXAS
          </p>
          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-white uppercase tracking-[0.06em] leading-tight mb-5">
            {product.title}
          </h1>
          <p className="font-main text-gold text-xl tracking-[4px] mb-8">
            {displayPrice}
          </p>
          <div className="w-12 h-[1px] bg-gold/25 mb-8" />

          {/* Variant selector */}
          {showVariants && (
            <div className="mb-8">
              <p className="font-main text-[10px] tracking-[3px] text-white/35 uppercase mb-4">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {variants.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setSelected(v)}
                    disabled={!v.availableForSale}
                    className={`
                      px-4 py-2 text-[11px] font-main uppercase tracking-widest border transition-all duration-200 interactive
                      ${selected?.id === v.id
                        ? 'bg-gold text-black border-gold'
                        : 'border-white/15 text-white/50 hover:border-gold/50 hover:text-white/80'}
                      ${!v.availableForSale ? 'opacity-20 cursor-not-allowed' : ''}
                    `}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={adding || cartLoading || !selected}
            className="w-full py-4 bg-gold text-black font-display text-sm uppercase tracking-[3px] hover:bg-white transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed interactive mb-4"
          >
            {adding ? 'ADDING...' : added ? 'ADDED TO CART ✓' : 'ADD TO CART'}
          </button>
          <p className="font-main text-[9px] text-white/20 tracking-[2px] text-center uppercase mb-10">
            Secure checkout via Shopify
          </p>

          {/* Description */}
          {product.description && (
            <div className="border-t border-white/5 pt-8">
              <p className="font-main text-[10px] tracking-[3px] text-white/30 uppercase mb-4">
                Description
              </p>
              <p className="font-main text-white/50 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductView;
