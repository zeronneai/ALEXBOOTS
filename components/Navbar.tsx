import React from 'react';

interface NavbarProps {
  onNavigate: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const links = ["Home", "Men", "Women", "Kids", "Uniform"];

  return (
    <nav className="fixed top-0 w-full px-4 md:px-12 py-4 md:py-8 flex flex-col md:flex-row justify-between items-center z-[1000] mix-blend-difference transition-all duration-300">
      <div 
        className="font-western text-xl md:text-2xl text-gold uppercase interactive cursor-pointer mb-3 md:mb-0" 
        onClick={() => onNavigate(0)}
      >
        AB 1985
      </div>
      <div className="flex gap-3 md:gap-8 flex-wrap justify-center">
        {links.map((link, index) => (
          <button 
            key={link} 
            onClick={() => onNavigate(index)}
            className="text-white no-underline font-display text-[10px] md:text-sm uppercase tracking-widest relative interactive group bg-transparent border-none cursor-pointer whitespace-nowrap"
          >
            {link}
            <span className="absolute bottom-[-3px] md:bottom-[-5px] left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;