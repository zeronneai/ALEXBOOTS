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
      {/* Sticky back bar */}
      <div className="sticky top-0 z-20 bg-dark-wood/90 backdrop-blur-sm border-b border-white/5 px-4 md:px-16 py-4 flex items-center">
        <button
          onClick={onBack}
          className="font-main text-[10px] tracking-[3px] text-white/40 hover:text-gold transition-colors duration-300 uppercase flex items-center gap-2 interactive"
        >
          ← BACK
        </button>
      </div>

      <div className="flex flex-col md:flex-row">

        {/* ── Left: Gallery ─────────────────────────────────────────────── */}
        <div className="w-full md:w-[55%] md:sticky md:top-[57px] md:h-[calc(100vh-57px)] flex flex-col">
          <div className="flex-1 bg-card-bg overflow-hidden" style={{ minHeight: '55vw' }}>
            {images[activeImg] ? (
              <img
                src={images[activeImg].url}
                alt={images[activeImg].altText ?? product.title}
                className="w-full h-full object-cover"
                style={{ minHeight: '55vw' }}
              />
            ) : (
              <div className="w-full flex items-center justify-center" style={{ minHeight: '55vw' }}>
                <span className="font-display text-white/10 uppercase tracking-widest text-sm">No Image</span>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div
              className="touch-scroll-x flex gap-2 p-3 bg-[#0a0806] flex-shrink-0"
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 overflow-hidden transition-all duration-200 interactive
                    ${activeImg === i ? 'ring-1 ring-gold opacity-100' : 'opacity-30 hover:opacity-60'}`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Details ────────────────────────────────────────────────── */}
        <div className="w-full md:w-[45%] px-5 md:px-12 lg:px-16 pt-8 md:pt-12 pb-24 flex flex-col">
          <p className="font-main text-[9px] tracking-[4px] text-gold/40 uppercase mb-3">
            EST. 1985 · EL PASO, TEXAS
          </p>
          <h1 className="font-display text-xl md:text-3xl lg:text-4xl text-white uppercase tracking-[0.06em] leading-tight mb-4">
            {product.title}
          </h1>
          <p className="font-main text-gold text-lg md:text-xl tracking-[4px] mb-6">
            {displayPrice}
          </p>
          <div className="w-10 h-[1px] bg-gold/25 mb-6" />

          {showVariants && (
            <div className="mb-6">
              <p className="font-main text-[10px] tracking-[3px] text-white/35 uppercase mb-3">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {variants.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setSelected(v)}
                    disabled={!v.availableForSale}
                    className={`
                      px-3 md:px-4 py-2 text-[10px] md:text-[11px] font-main uppercase tracking-widest border transition-all duration-200 interactive
                      ${selected?.id === v.id
                        ? 'bg-gold text-black border-gold'
                        : 'border-white/20 text-white/60 hover:border-gold/50 hover:text-white/90'}
                      ${!v.availableForSale ? 'opacity-20 cursor-not-allowed' : ''}
                    `}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAdd}
            disabled={adding || cartLoading || !selected}
            className="w-full py-4 bg-gold text-black font-display text-sm uppercase tracking-[3px] hover:bg-white transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed interactive mb-3"
          >
            {adding ? 'ADDING...' : added ? 'ADDED TO CART ✓' : 'ADD TO CART'}
          </button>
          <p className="font-main text-[9px] text-white/20 tracking-[2px] text-center uppercase mb-8">
            Secure checkout via Shopify
          </p>

          {product.description && (
            <div className="border-t border-white/5 pt-6">
              <p className="font-main text-[10px] tracking-[3px] text-white/30 uppercase mb-3">
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
