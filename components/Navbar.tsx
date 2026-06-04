import React from 'react';
import { ASSETS } from '../constants';

interface NavbarProps {
  onNavigate: (index: number) => void;
  onShopClick: () => void;
  onCartClick: () => void;
  itemCount: number;
  isCartOpen?: boolean;
  isOverlay?: boolean;
}

// Section links: Home=0, Men=1, Women=2, Contact=3, FAQ=4
const SECTION_LINKS = [
  { label: 'Home',    index: 0 },
  { label: 'Men',     index: 1 },
  { label: 'Women',   index: 2 },
  { label: 'Contact', index: 3 },
  { label: 'FAQ',     index: 4 },
];

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onShopClick, onCartClick, itemCount, isCartOpen, isOverlay }) => (
  <nav
    style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    className={`fixed top-0 w-full z-[2100] transition-all duration-300 ${
      isCartOpen || isOverlay ? 'opacity-0 pointer-events-none' : 'mix-blend-difference'
    }`}
  >
    {/* Top row: brand + cart */}
    <div className="flex justify-between items-center px-4 md:px-12 pt-4 md:pt-8 pb-2 md:pb-0">
      <img
        src={ASSETS.LOGO_ICON}
        alt="Ranchers Boot Co."
        onClick={() => onNavigate(0)}
        loading="eager"
        decoding="async"
        className="h-9 md:h-12 w-auto object-contain interactive cursor-pointer drop-shadow-[0_0_12px_rgba(212,175,55,0.3)]"
      />

      {/* Mobile: Shop + Cart */}
      <div className="flex items-center gap-4 md:hidden">
        <button
          onClick={onShopClick}
          className="text-white font-display text-[9px] uppercase tracking-[2px] bg-transparent border-none cursor-pointer interactive"
        >
          Shop
        </button>
        <button
          onClick={onCartClick}
          className="relative text-white interactive cursor-pointer bg-transparent border-none flex items-center"
          aria-label="Open cart"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-black font-main text-[8px] font-bold rounded-full flex items-center justify-center leading-none">
              {itemCount > 9 ? '9+' : itemCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop: full link row */}
      <div className="hidden md:flex gap-6 items-center">
        {SECTION_LINKS.map(({ label, index }) => (
          <button
            key={label}
            onClick={() => onNavigate(index)}
            className="text-white font-display text-sm uppercase tracking-widest relative interactive group bg-transparent border-none cursor-pointer"
          >
            {label}
            <span className="absolute bottom-[-5px] left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
          </button>
        ))}

        <button
          onClick={onShopClick}
          className="text-white font-display text-sm uppercase tracking-widest relative interactive group bg-transparent border-none cursor-pointer"
        >
          Shop
          <span className="absolute bottom-[-5px] left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
        </button>

        <button
          onClick={onCartClick}
          className="relative text-white interactive cursor-pointer bg-transparent border-none flex items-center gap-1 group"
          aria-label="Open cart"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#d4af37] transition-colors duration-300">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-black font-main text-[8px] font-bold rounded-full flex items-center justify-center leading-none">
              {itemCount > 9 ? '9+' : itemCount}
            </span>
          )}
        </button>
      </div>
    </div>

    {/* Mobile: section links horizontal scroll */}
    <div className="touch-scroll-x md:hidden flex gap-4 px-4 pb-3">
      {SECTION_LINKS.map(({ label, index }) => (
        <button
          key={label}
          onClick={() => onNavigate(index)}
          className="text-white font-display text-[9px] uppercase tracking-[2px] bg-transparent border-none cursor-pointer interactive flex-shrink-0 whitespace-nowrap"
        >
          {label}
        </button>
      ))}
    </div>
  </nav>
);

export default Navbar;
