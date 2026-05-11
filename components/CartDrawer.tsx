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
      {/* Overlay — sits above navbar (z-[2100]) so mix-blend-difference can't bleed through */}
      <div
        onClick={onClose}
        style={{ zIndex: 9998 }}
        className={`fixed inset-0 bg-black/70 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer panel */}
      <div
        style={{ zIndex: 9999, backgroundColor: '#0a0a0a' }}
        className={`fixed top-0 right-0 h-screen w-screen md:w-[400px] flex flex-col
          transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >

        {/* ── HEADER — 60px, gold border ──────────────────────────────────── */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-6"
          style={{ height: 60, borderBottom: '1px solid #d4af37' }}
        >
          <h2 className="font-display text-sm uppercase tracking-[0.3em]" style={{ color: '#d4af37' }}>
            YOUR CART
            {itemCount > 0 && (
              <span className="font-main text-[10px] text-white/40 tracking-[2px] ml-3 normal-case">
                {itemCount} item{itemCount !== 1 ? 's' : ''}
              </span>
            )}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close cart"
            className="flex items-center gap-2 interactive"
            style={{ color: 'rgba(255,255,255,0.5)', minWidth: 44, minHeight: 44 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="1" y1="1" x2="15" y2="15" />
              <line x1="15" y1="1" x2="1" y2="15" />
            </svg>
            <span className="font-main text-[9px] uppercase tracking-[2px]">CLOSE</span>
          </button>
        </div>

        {/* ── BODY — flex:1, scrollable ───────────────────────────────────── */}
        <div
          className="flex-1 overflow-y-auto px-6 py-4"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {lines.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div style={{ width: 40, height: 1, backgroundColor: 'rgba(212,175,55,0.15)', marginBottom: 32 }} />
              <p className="font-display text-base uppercase tracking-[0.25em] mb-2" style={{ color: 'rgba(255,255,255,0.12)' }}>
                Empty
              </p>
              <p className="font-main text-[10px] tracking-[3px] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Add products to get started
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {lines.map((line, i) => (
                <div
                  key={line.id}
                  className="flex gap-4 items-start py-5"
                  style={i < lines.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.05)' } : {}}
                >
                  <div className="flex-shrink-0 overflow-hidden" style={{ width: 58, height: 74, backgroundColor: 'rgba(255,255,255,0.04)' }}>
                    {line.imageUrl
                      ? <img src={line.imageUrl} alt={line.productTitle} className="w-full h-full object-cover" />
                      : <div className="w-full h-full" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} />
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-display text-[11px] uppercase tracking-widest leading-snug mb-1 pr-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      {line.productTitle}
                    </p>
                    {line.variantTitle !== 'Default Title' && (
                      <p className="font-main text-[10px] tracking-[2px] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {line.variantTitle}
                      </p>
                    )}
                    <div className="flex items-center gap-3">
                      <p className="font-main text-[11px] tracking-[2px]" style={{ color: '#d4af37' }}>
                        {fmt(line.price.amount, line.price.currencyCode)}
                      </p>
                      {line.quantity > 1 && (
                        <p className="font-main text-[10px] tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
                          × {line.quantity}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemove(line.id)}
                    disabled={loading}
                    aria-label="Remove item"
                    className="flex items-center justify-center interactive flex-shrink-0"
                    style={{ width: 44, height: 44, color: 'rgba(255,255,255,0.2)', marginRight: -8 }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <line x1="1" y1="1" x2="11" y2="11" />
                      <line x1="11" y1="1" x2="1" y2="11" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── FOOTER — always visible ───────────────────────────────────── */}
        <div className="flex-shrink-0 px-6" style={{ paddingTop: 20, paddingBottom: 28, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {lines.length > 0 ? (
            <>
              {/* Empty cart — top of footer, small red */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleEmptyCart}
                  disabled={loading}
                  className="font-main text-[9px] uppercase tracking-[2px] interactive disabled:opacity-30"
                  style={{ color: 'rgba(248,113,113,0.5)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgb(248,113,113)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,113,113,0.5)')}
                >
                  EMPTY CART
                </button>
              </div>

              <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginBottom: 20 }} />

              {/* Total */}
              {total && (
                <div className="flex justify-between items-baseline mb-5">
                  <span className="font-main text-[10px] uppercase tracking-[3px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Total
                  </span>
                  <span className="font-display text-2xl tracking-wide" style={{ color: '#ffffff' }}>
                    {fmt(total.amount, total.currencyCode)}
                  </span>
                </div>
              )}

              {/* Checkout */}
              <button
                onClick={() => checkoutUrl && (window.location.href = checkoutUrl)}
                disabled={!checkoutUrl || loading}
                className="w-full font-display text-sm uppercase tracking-[4px] interactive disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300"
                style={{ padding: '16px 0', backgroundColor: '#d4af37', color: '#000000' }}
                onMouseEnter={e => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#ffffff')}
                onMouseLeave={e => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#d4af37')}
              >
                {loading ? 'PROCESSING…' : 'CHECKOUT →'}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full font-display text-sm uppercase tracking-[4px] interactive transition-colors duration-300"
              style={{ padding: '16px 0', border: '1px solid rgba(212,175,55,0.3)', color: 'rgba(212,175,55,0.6)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#d4af37'; e.currentTarget.style.color = '#d4af37'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.color = 'rgba(212,175,55,0.6)'; }}
            >
              CONTINUE SHOPPING
            </button>
          )}
        </div>

      </div>
    </>
  );
};

export default CartDrawer;
