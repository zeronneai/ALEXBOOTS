import React from 'react';
import type { CartLine } from '../src/hooks/useCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lines: CartLine[];
  total: { amount: string; currencyCode: string } | null;
  checkoutUrl: string | null;
  onRemove: (lineId: string) => Promise<void>;
  loading: boolean;
}

function fmt(amount: string, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(parseFloat(amount));
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen, onClose, lines, total, checkoutUrl, onRemove, loading,
}) => {
  const itemCount = lines.reduce((s, l) => s + l.quantity, 0);

  const handleEmptyCart = async () => {
    for (const line of lines) {
      await onRemove(line.id);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/75 z-[1900] transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer panel — full width on mobile, 400px on desktop */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:max-w-[400px] bg-[#0a0806] z-[2000]
          flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div>
            <h2 className="font-display text-sm text-gold uppercase tracking-[0.3em]">
              Your Cart
            </h2>
            <p className="font-main text-[10px] text-white/30 tracking-[2px] mt-1 uppercase">
              {itemCount === 0 ? 'Empty' : `${itemCount} item${itemCount !== 1 ? 's' : ''}`}
            </p>
          </div>

          {/* Close button — min 44×44px for touch targets */}
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="w-11 h-11 flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200 interactive flex-shrink-0 -mr-2"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="2" y1="2" x2="16" y2="16" />
              <line x1="16" y1="2" x2="2" y2="16" />
            </svg>
          </button>
        </div>

        {/* ── BODY — scrollable list ──────────────────────────────────────── */}
        <div
          className="flex-1 overflow-y-auto px-6 py-4"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {lines.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-10 h-[1px] bg-gold/15 mb-8" />
              <p className="font-display text-lg text-white/12 uppercase tracking-[0.25em] mb-2">
                Empty
              </p>
              <p className="font-main text-[10px] text-white/20 tracking-[3px] uppercase">
                Add products to get started
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {lines.map((line, i) => (
                <div
                  key={line.id}
                  className={`flex gap-4 items-start py-5 ${i < lines.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  {/* Thumbnail */}
                  <div className="w-[58px] h-[74px] flex-shrink-0 bg-white/4 overflow-hidden">
                    {line.imageUrl
                      ? <img src={line.imageUrl} alt={line.productTitle} className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-white/5" />
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-[11px] text-white/80 uppercase tracking-widest leading-snug mb-1 pr-2">
                      {line.productTitle}
                    </p>
                    {line.variantTitle !== 'Default Title' && (
                      <p className="font-main text-[10px] text-white/35 tracking-[2px] mb-2">
                        {line.variantTitle}
                      </p>
                    )}
                    <div className="flex items-center gap-3">
                      <p className="font-main text-gold text-[11px] tracking-[2px]">
                        {fmt(line.price.amount, line.price.currencyCode)}
                      </p>
                      {line.quantity > 1 && (
                        <p className="font-main text-white/25 text-[10px] tracking-widest">
                          × {line.quantity}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Remove — 44×44px tap area */}
                  <button
                    onClick={() => onRemove(line.id)}
                    disabled={loading}
                    aria-label="Remove item"
                    className="w-11 h-11 flex items-center justify-center text-white/20 hover:text-white/60 transition-colors duration-200 interactive flex-shrink-0 -mr-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <line x1="1" y1="1" x2="13" y2="13" />
                      <line x1="13" y1="1" x2="1" y2="13" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── FOOTER — always visible at bottom ──────────────────────────── */}
        <div className="flex-shrink-0 border-t border-white/8 px-6 pt-5 pb-6">
          {lines.length > 0 ? (
            <>
              {/* Subtotal row */}
              {total && (
                <div className="flex justify-between items-baseline mb-5">
                  <span className="font-main text-[10px] text-white/30 tracking-[3px] uppercase">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl text-white tracking-wide">
                    {fmt(total.amount, total.currencyCode)}
                  </span>
                </div>
              )}

              {/* Checkout CTA */}
              <button
                onClick={() => checkoutUrl && (window.location.href = checkoutUrl)}
                disabled={!checkoutUrl || loading}
                className="w-full py-4 bg-gold text-black font-display text-sm uppercase tracking-[4px] hover:bg-white transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed interactive mb-3"
              >
                {loading ? 'PROCESSING…' : 'CHECKOUT →'}
              </button>

              {/* Empty cart — small, destructive, discrete */}
              <div className="flex items-center justify-between">
                <p className="font-main text-[9px] text-white/18 tracking-[2px] uppercase">
                  Secure checkout via Shopify
                </p>
                <button
                  onClick={handleEmptyCart}
                  disabled={loading}
                  className="font-main text-[9px] text-red-400/50 hover:text-red-400 tracking-[2px] uppercase transition-colors duration-200 interactive disabled:opacity-30"
                >
                  Empty cart
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-4 border border-gold/30 text-gold/60 font-display text-sm uppercase tracking-[4px] hover:border-gold hover:text-gold transition-colors duration-300 interactive"
            >
              Continue Shopping
            </button>
          )}
        </div>

      </div>
    </>
  );
};

export default CartDrawer;
