import React from 'react';
import { ASSETS } from '../../constants';
import { useReveal } from '../../src/hooks/useReveal';

const HeritageSection: React.FC = () => {
  const imgRef  = useReveal() as React.RefObject<HTMLDivElement>;
  const textRef = useReveal() as React.RefObject<HTMLDivElement>;

  return (
    <section id="heritage" className="bg-dark-wood py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20 flex flex-col md:flex-row gap-12 md:gap-0 items-center">

        {/* Image */}
        <div ref={imgRef} className="reveal w-full md:w-[52%] md:pr-16 flex-shrink-0">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={ASSETS.MEN_BG}
              alt="Ranchers Boot Co. Heritage"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover brightness-90"
            />
            {/* Decorative gold border */}
            <div className="absolute bottom-[-12px] right-[-12px] w-full h-full border border-gold/25 pointer-events-none" />
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} className="reveal reveal-delay-2 w-full md:w-[48%]">
          <p className="font-main text-[9px] tracking-[7px] text-gold/50 uppercase mb-6">
            Our Heritage
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream uppercase leading-tight tracking-[0.05em] mb-8">
            The Art of<br />the Border
          </h2>
          <div className="w-10 h-px bg-gold/40 mb-8" />
          <p className="font-main text-sm md:text-base text-cream/60 leading-relaxed mb-6">
            Handcrafted in the heart of the border. Every pair tells a story of tradition, leather, and legacy — forged across decades in El Paso, Texas and the borderlands of Juárez.
          </p>
          <p className="font-main text-sm md:text-base text-cream/60 leading-relaxed mb-10">
            From the first cut of exotic skin to the final hand-stitched welt, every boot carries the mark of a craftsman who has dedicated their life to this art. No two pairs are identical. That is the point.
          </p>
          <button
            onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-3 font-display text-[10px] tracking-[4px] text-gold uppercase interactive"
          >
            Contact Us
            <span className="inline-block w-8 h-px bg-gold transition-all duration-300 group-hover:w-16" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default HeritageSection;
