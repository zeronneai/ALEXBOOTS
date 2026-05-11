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

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/70 z-[1900] transition-opacity duration-400
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[420px] bg-[#090705] z-[2000] flex flex-col
          transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="px-8 py-7 border-b border-white/5 flex justify-between items-start flex-shrink-0">
          <div>
            <h2 className="font-display text-base text-gold uppercase tracking-[0.25em]">
              Your Cart
            </h2>
            <p className="font-main text-[10px] text-white/25 tracking-[2px] mt-1">
              {itemCount === 0 ? 'EMPTY' : `${itemCount} ITEM${itemCount !== 1 ? 'S' : ''}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="font-main text-[10px] tracking-[3px] text-white/30 hover:text-gold transition-colors uppercase interactive mt-1"
          >
            CLOSE [ X ]
          </button>
        </div>

        {/* Line items */}
        <div className="flex-1 overflow-y-auto px-8 py-6" style={{ scrollbarWidth: 'none' }}>
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-8 h-[1px] bg-gold/15 mb-8" />
              <p className="font-display text-xl text-white/15 uppercase tracking-[0.2em] mb-3">
                Empty
              </p>
              <p className="font-main text-white/15 text-[10px] tracking-[3px] uppercase">
                Add products to get started
              </p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-white/5">
              {lines.map(line => (
                <div key={line.id} className="flex gap-4 items-start py-5">
                  {/* Image */}
                  <div className="w-[60px] h-[76px] flex-shrink-0 bg-card-bg overflow-hidden">
                    {line.imageUrl ? (
                      <img
                        src={line.imageUrl}
                        alt={line.productTitle}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-[11px] text-white/75 uppercase tracking-widest truncate mb-1">
                      {line.productTitle}
                    </p>
                    {line.variantTitle !== 'Default Title' && (
                      <p className="font-main text-[10px] text-white/35 tracking-[2px] mb-2">
                        {line.variantTitle}
                      </p>
                    )}
                    <p className="font-main text-gold text-[11px] tracking-[3px]">
                      {fmt(line.price.amount, line.price.currencyCode)}
                    </p>
                    {line.quantity > 1 && (
                      <p className="font-main text-white/25 text-[10px] tracking-widest mt-1">
                        QTY {line.quantity}
                      </p>
                    )}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => onRemove(line.id)}
                    disabled={loading}
                    className="text-white/20 hover:text-gold/80 transition-colors duration-200 text-xl leading-none interactive flex-shrink-0 mt-0.5"
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="px-8 py-7 border-t border-white/5 flex-shrink-0">
            {total && (
              <div className="flex justify-between items-center mb-6">
                <span className="font-main text-[10px] text-white/35 tracking-[3px] uppercase">
                  Subtotal
                </span>
                <span className="font-display text-xl text-gold tracking-widest">
                  {fmt(total.amount, total.currencyCode)}
                </span>
              </div>
            )}
            <button
              onClick={() => checkoutUrl && (window.location.href = checkoutUrl)}
              disabled={!checkoutUrl || loading}
              className="w-full py-4 bg-gold text-black font-display text-sm uppercase tracking-[3px] hover:bg-white transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed interactive"
            >
              {loading ? 'PROCESSING...' : 'CHECKOUT →'}
            </button>
            <p className="font-main text-[9px] text-white/20 tracking-[2px] text-center mt-3 uppercase">
              Secure checkout via Shopify
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
