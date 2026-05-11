import React from 'react';

interface NavbarProps {
  onNavigate: (index: number) => void;
  onShopClick: () => void;
  onCartClick: () => void;
  itemCount: number;
}

// Section links: Home=0, Men=1, Women=2, Kids=3, Uniform=4, Contact=5, FAQ=6, VIP=7
const SECTION_LINKS = [
  { label: 'Home',    index: 0 },
  { label: 'Men',     index: 1 },
  { label: 'Women',   index: 2 },
  { label: 'Kids',    index: 3 },
  { label: 'Uniform', index: 4 },
  { label: 'Contact', index: 5 },
  { label: 'FAQ',     index: 6 },
  { label: 'VIP',     index: 7 },
];

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onShopClick, onCartClick, itemCount }) => (
  <nav className="fixed top-0 w-full px-4 md:px-12 py-4 md:py-8 flex flex-col md:flex-row justify-between items-center z-[2100] mix-blend-difference transition-all duration-300">
    {/* Brand */}
    <div
      className="font-display text-xl md:text-2xl text-gold uppercase interactive cursor-pointer mb-3 md:mb-0"
      onClick={() => onNavigate(0)}
    >
      AB 1985
    </div>

    {/* Links */}
    <div className="flex gap-3 md:gap-6 flex-wrap justify-center items-center">
      {SECTION_LINKS.map(({ label, index }) => (
        <button
          key={label}
          onClick={() => onNavigate(index)}
          className="text-white no-underline font-display text-[10px] md:text-sm uppercase tracking-widest relative interactive group bg-transparent border-none cursor-pointer whitespace-nowrap"
        >
          {label}
          <span className="absolute bottom-[-3px] md:bottom-[-5px] left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
        </button>
      ))}

      {/* Shop — opens ShopView overlay */}
      <button
        onClick={onShopClick}
        className="text-white no-underline font-display text-[10px] md:text-sm uppercase tracking-widest relative interactive group bg-transparent border-none cursor-pointer whitespace-nowrap"
      >
        Shop
        <span className="absolute bottom-[-3px] md:bottom-[-5px] left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
      </button>

      {/* Cart icon */}
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
  </nav>
);

export default Navbar;
