import React, { useState } from 'react';
import { ASSETS } from '../../constants';
import { useReveal } from '../../src/hooks/useReveal';

interface Props {
  onShopClick: () => void;
}

const CATS = [
  { label: "Men's",    sub: 'Exotics, Ropers & Classics',       img: ASSETS.MEN_BG   },
  { label: "Women's",  sub: 'Elegant Silhouettes & Bold Detail', img: ASSETS.WOMEN_BG },
  { label: 'Exotics',  sub: 'Python, Caiman & Rare Leathers',   img: ASSETS.HERO_BG  },
];

const CategoriesSection: React.FC<Props> = ({ onShopClick }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const headerRef = useReveal() as React.RefObject<HTMLDivElement>;
  const cardsRef  = useReveal(0.08) as React.RefObject<HTMLDivElement>;

  return (
    <section id="categories" className="bg-dark-2 py-24 md:py-36 px-5 md:px-12 lg:px-20">

      {/* Header */}
      <div ref={headerRef} className="reveal text-center mb-14 md:mb-20">
        <p className="font-main text-[9px] tracking-[7px] text-gold/45 uppercase mb-5">Browse</p>
        <h2 className="font-display text-3xl md:text-5xl text-cream uppercase tracking-[0.12em]">
          Shop by Category
        </h2>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="reveal reveal-delay-2 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {CATS.map((cat, i) => (
          <button
            key={cat.label}
            onClick={onShopClick}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="interactive relative overflow-hidden aspect-[4/5] md:aspect-[3/4] w-full group"
          >
            <img
              src={cat.img}
              alt={cat.label}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${hovered === i ? 'scale-105 brightness-50' : 'scale-100 brightness-[0.6]'}`}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-wood/90 via-transparent to-transparent" />

            {/* Text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-left">
              <p className="font-main text-[8px] tracking-[5px] text-gold/60 uppercase mb-2 transition-opacity duration-300">
                {cat.sub}
              </p>
              <h3 className="font-display text-xl md:text-2xl text-cream uppercase tracking-[0.1em]">
                {cat.label}
              </h3>
            </div>

            {/* Hover CTA */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-350 ${hovered === i ? 'opacity-100' : 'opacity-0'}`}>
              <span className="font-display text-[9px] tracking-[4px] text-cream uppercase border border-cream/50 px-6 py-3">
                Explore
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
