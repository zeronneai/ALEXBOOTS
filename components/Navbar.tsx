import React, { useEffect, useState } from 'react';
import { ASSETS } from '../constants';

interface NavbarProps {
  onShopClick:  () => void;
  onCartClick:  () => void;
  onHomeClick:  () => void;
  itemCount:    number;
  isCartOpen?:  boolean;
  isOverlay?:   boolean;
}

const CartIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const NAV_LINKS = [
  { label: 'Collection', id: 'collection' },
  { label: 'Heritage',   id: 'heritage'   },
  { label: 'Contact',    id: 'footer'     },
];

const Navbar: React.FC<NavbarProps> = ({
  onShopClick, onCartClick, onHomeClick, itemCount, isCartOpen, isOverlay,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), menuOpen ? 300 : 0);
  };

  const hidden = isCartOpen || isOverlay;

  return (
    <>
      {/* Announcement bar */}
      {!hidden && (
        <div className={`fixed top-0 w-full z-[2200] transition-all duration-500 ${scrolled ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100'}`}>
          <div className="bg-gold flex items-center justify-center px-4 py-2.5">
            <p className="font-display text-[9px] md:text-[10px] tracking-[5px] text-card-bg uppercase text-center">
              Free Shipping on Orders $150+ &nbsp;·&nbsp; Handcrafted in El Paso, TX
            </p>
          </div>
        </div>
      )}

      {/* Main navbar */}
      <nav
        style={{ paddingTop: scrolled ? 'env(safe-area-inset-top, 0px)' : 'calc(env(safe-area-inset-top, 0px) + 36px)' }}
        className={`fixed top-0 w-full z-[2100] transition-all duration-500 ${
          hidden ? 'opacity-0 pointer-events-none' : ''
        } ${scrolled || menuOpen
          ? 'bg-dark-wood/97 backdrop-blur-md border-b border-white/[0.06]'
          : ''}`}
      >
        <div className="flex items-center justify-between px-5 md:px-12 py-3.5 md:py-4">

          {/* Logo */}
          <button
            onClick={() => { onHomeClick(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="interactive flex-shrink-0"
            aria-label="Home"
          >
            <img
              src={ASSETS.LOGO_ICON}
              alt="Ranchers Boot Co."
              loading="eager"
              decoding="async"
              className="h-9 md:h-11 w-auto object-contain drop-shadow-[0_0_14px_rgba(212,175,55,0.3)]"
            />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10 lg:gap-12">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={label}
                onClick={() => scrollTo(id)}
                className="relative group font-display text-[9px] tracking-[4px] text-cream/60 hover:text-cream uppercase transition-colors duration-300 interactive"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-400 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={onShopClick}
              className="font-display text-[9px] tracking-[4px] text-card-bg bg-gold hover:bg-gold-light uppercase transition-colors duration-300 interactive px-5 py-2"
            >
              Shop Now
            </button>
          </div>

          {/* Right: cart + hamburger */}
          <div className="flex items-center gap-5 md:gap-6">
            <button
              onClick={onCartClick}
              className="relative text-cream/60 hover:text-gold transition-colors duration-300 interactive"
              aria-label="Open cart"
            >
              <CartIcon size={19} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-card-bg font-main text-[8px] font-bold rounded-full flex items-center justify-center leading-none">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden flex flex-col gap-[5px] w-6 interactive"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`ham-line ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`ham-line ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`ham-line ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-[2050] bg-dark-wood flex flex-col items-center justify-center transition-all duration-400 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-10">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={label}
              onClick={() => scrollTo(id)}
              className="font-display text-3xl tracking-[0.15em] text-cream/75 hover:text-gold uppercase transition-colors duration-300 interactive"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { onShopClick(); setMenuOpen(false); }}
            className="mt-4 font-display text-[11px] tracking-[6px] text-card-bg bg-gold px-10 py-4 uppercase interactive"
          >
            Shop Now
          </button>
        </nav>
        <div className="absolute bottom-14 flex flex-col items-center gap-2">
          <div className="w-12 h-px bg-gold/30 mb-4" />
          <p className="font-main text-[9px] tracking-[4px] text-cream/25 uppercase">Est. 1985 · El Paso, TX</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
