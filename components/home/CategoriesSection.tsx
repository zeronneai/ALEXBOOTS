import React, { useState } from 'react';
import { ASSETS } from '../../constants';
import { useReveal } from '../../src/hooks/useReveal';
import type { GenderFilter } from '../../src/hooks/useGenderFilter';

interface Props {
  onCategoryClick: (filter: GenderFilter) => void;
}

const CATS: { num: string; label: string; sub: string; img: string; filter: GenderFilter }[] = [
  { num: '01', label: "Men's",   sub: 'Exotics, Ropers & Classics',       img: ASSETS.MEN_BG,   filter: 'men'   },
  { num: '02', label: "Women's", sub: 'Elegant Silhouettes & Bold Detail', img: ASSETS.WOMEN_BG, filter: 'women' },
];

const CategoriesSection: React.FC<Props> = ({ onCategoryClick }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const headerRef = useReveal() as React.RefObject<HTMLDivElement>;
  const cardsRef  = useReveal(0.06) as React.RefObject<HTMLDivElement>;

  return (
    <section id="categories" className="bg-dark-2 py-24 md:py-36 px-5 md:px-12 lg:px-20">

      {/* Header */}
      <div ref={headerRef} className="reveal text-center mb-16 md:mb-24">
        <p className="font-main text-[9px] tracking-[7px] text-gold/60 uppercase mb-5">Shop by Category</p>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-cream uppercase tracking-[0.05em] leading-none">
          Find Your Pair
        </h2>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="reveal reveal-delay-2 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-5xl mx-auto">
        {CATS.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => onCategoryClick(cat.filter)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="interactive relative overflow-hidden w-full group"
            style={{ aspectRatio: '3/4' }}
          >
            {/* Image */}
            <img
              src={cat.img}
              alt={cat.label}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                hovered === i ? 'scale-[1.06] brightness-[0.35]' : 'scale-100 brightness-[0.55]'
              }`}
            />

            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Number badge */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8">
              <span className="font-display text-[10px] tracking-[4px] text-gold/50 uppercase">{cat.num}</span>
            </div>

            {/* Card text — bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10 text-left">
              <p className="font-main text-[8px] tracking-[5px] text-gold/70 uppercase mb-3">
                {cat.sub}
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-cream uppercase tracking-[0.05em] leading-none mb-5">
                {cat.label}
              </h3>
              <div className={`flex items-center gap-3 transition-all duration-300 ${hovered === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                <span className="font-display text-[9px] tracking-[5px] text-gold uppercase">Shop {cat.label}</span>
                <span className="w-8 h-px bg-gold inline-block" />
              </div>
            </div>

            {/* Center CTA on hover */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered === i ? 'opacity-100' : 'opacity-0'}`}>
              <span className="font-display text-[10px] tracking-[6px] text-cream uppercase border border-cream/50 px-10 py-4">
                Explore →
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
