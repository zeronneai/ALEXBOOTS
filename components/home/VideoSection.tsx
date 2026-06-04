import React from 'react';
import { ASSETS } from '../../constants';
import { useReveal } from '../../src/hooks/useReveal';

const VideoSection: React.FC = () => {
  const contentRef = useReveal(0.15) as React.RefObject<HTMLDivElement>;

  return (
    <section id="process" className="relative w-full overflow-hidden" style={{ minHeight: '75vh' }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={ASSETS.WOMEN_BG}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-2/80 via-transparent to-dark-wood/90" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="reveal relative z-10 flex flex-col items-center justify-center text-center px-6 py-36 md:py-52"
        style={{ minHeight: '75vh' }}
      >
        <p className="font-main text-[9px] tracking-[7px] text-gold/60 uppercase mb-8">
          The Process
        </p>

        <h2
          className="font-display text-cream uppercase leading-[0.9] tracking-[0.02em] mb-8"
          style={{ fontSize: 'clamp(2.8rem, 9vw, 7rem)' }}
        >
          Crafted<br />by Hand
        </h2>

        <div className="w-16 h-px bg-gold/50 mb-8" />

        <p className="font-main text-[11px] md:text-sm text-cream/50 tracking-[4px] uppercase max-w-xs leading-relaxed">
          El Paso, Texas &nbsp;·&nbsp; Est. 1985<br />Every stitch. Every cut. Every pair.
        </p>

        {/* Decorative marks */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6">
          <div className="w-10 h-px bg-gold/20" />
          <div className="w-1.5 h-1.5 border border-gold/30 rotate-45" />
          <div className="w-10 h-px bg-gold/20" />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
