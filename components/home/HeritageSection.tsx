import React from 'react';
import { ASSETS } from '../../constants';
import { useReveal } from '../../src/hooks/useReveal';

const STATS = [
  { value: '40+', label: 'Years of Craft' },
  { value: '100%', label: 'Handmade' },
  { value: 'EP', label: 'El Paso, TX' },
];

const HeritageSection: React.FC = () => {
  const imgRef   = useReveal() as React.RefObject<HTMLDivElement>;
  const textRef  = useReveal() as React.RefObject<HTMLDivElement>;
  const statsRef = useReveal(0.1) as React.RefObject<HTMLDivElement>;

  return (
    <section id="heritage" className="bg-dark-2 overflow-hidden">

      {/* Main split */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20 py-24 md:py-36 flex flex-col md:flex-row gap-14 md:gap-0 items-stretch">

        {/* Image */}
        <div ref={imgRef} className="reveal w-full md:w-[52%] md:pr-16 flex-shrink-0">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={ASSETS.MEN_BG}
              alt="Ranchers Boot Co. Heritage"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover brightness-85 hover:brightness-100 transition-all duration-700"
            />
            {/* Offset border */}
            <div className="absolute bottom-[-14px] right-[-14px] w-full h-full border border-gold/20 pointer-events-none" />
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} className="reveal reveal-delay-2 w-full md:w-[48%] flex flex-col justify-center">
          <p className="font-main font-semibold text-[11px] tracking-[6px] text-gold uppercase mb-6">
            Our Heritage
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream uppercase leading-[0.95] tracking-[0.03em] mb-8">
            The Art of<br />the Border
          </h2>
          <div className="w-12 h-px bg-gold/50 mb-8" />
          <p className="font-main text-sm md:text-[15px] text-cream/80 leading-relaxed mb-5 tracking-wide">
            Handcrafted in the heart of the border. Every pair tells a story of tradition, leather, and legacy — forged across decades in El Paso, Texas and the borderlands of Juárez.
          </p>
          <p className="font-main text-sm md:text-[15px] text-cream/80 leading-relaxed mb-12 tracking-wide">
            From the first cut of exotic skin to the final hand-stitched welt, every boot carries the mark of a craftsman who has dedicated their life to this art. No two pairs are identical. That is the point.
          </p>
          <button
            onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-4 font-display text-[10px] tracking-[5px] text-gold uppercase interactive self-start border border-gold/25 hover:border-gold px-8 py-4 transition-all duration-300 hover:bg-gold/5"
          >
            Contact Us
            <span className="inline-block w-6 h-px bg-gold transition-all duration-300 group-hover:w-10" />
          </button>
        </div>

      </div>

      {/* Stats strip */}
      <div ref={statsRef} className="reveal border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20 py-14 grid grid-cols-3 gap-4">
          {STATS.map((s, i) => (
            <div key={i} className={`text-center ${i > 0 ? 'border-l border-white/[0.06]' : ''}`}>
              <p className="font-display text-2xl md:text-4xl text-gold mb-1.5">{s.value}</p>
              <p className="font-main text-[8px] md:text-[9px] tracking-[4px] text-cream/35 uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default HeritageSection;
