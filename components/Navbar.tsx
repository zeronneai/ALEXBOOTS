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
    const handler = () => setScrolled(window.scrollY > 70);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll when mobile menu is open
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
      {/* Main navbar */}
      <nav
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        className={`fixed top-0 w-full z-[2100] transition-all duration-500 ${
          hidden ? 'opacity-0 pointer-events-none' : ''
        } ${scrolled || menuOpen ? 'bg-dark-wood/95 backdrop-blur-md shadow-[0_1px_0_rgba(212,175,55,0.08)]' : ''}`}
      >
        <div className="flex items-center justify-between px-5 md:px-12 py-4 md:py-5">

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
              className="h-8 md:h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.25)]"
            />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={label}
                onClick={() => scrollTo(id)}
                className="relative group font-display text-[10px] tracking-[3px] text-cream/70 hover:text-cream uppercase transition-colors duration-300 interactive"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={onShopClick}
              className="relative group font-display text-[10px] tracking-[3px] text-cream/70 hover:text-cream uppercase transition-colors duration-300 interactive"
            >
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </button>
          </div>

          {/* Right: cart + hamburger */}
          <div className="flex items-center gap-5 md:gap-6">
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative text-cream/70 hover:text-gold transition-colors duration-300 interactive"
              aria-label="Open cart"
            >
              <CartIcon size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-card-bg font-main text-[8px] font-bold rounded-full flex items-center justify-center leading-none">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            {/* Hamburger (mobile only) */}
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
        className={`fixed inset-0 z-[2050] bg-dark-wood/98 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-400 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={label}
              onClick={() => scrollTo(id)}
              className="font-display text-2xl tracking-[0.15em] text-cream/80 hover:text-gold uppercase transition-colors duration-300 interactive"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { onShopClick(); setMenuOpen(false); }}
            className="font-display text-2xl tracking-[0.15em] text-cream/80 hover:text-gold uppercase transition-colors duration-300 interactive"
          >
            Shop
          </button>
        </nav>
        <div className="absolute bottom-12 flex flex-col items-center gap-2">
          <div className="w-10 h-px bg-gold/25 mb-4" />
          <p className="font-main text-[9px] tracking-[4px] text-cream/25 uppercase">Est. 1985 · El Paso, TX</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
