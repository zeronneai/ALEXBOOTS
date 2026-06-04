import React from 'react';
import { ASSETS } from '../../constants';
import { useReveal } from '../../src/hooks/useReveal';

const VideoSection: React.FC = () => {
  const contentRef = useReveal(0.2) as React.RefObject<HTMLDivElement>;

  return (
    <section id="process" className="relative w-full overflow-hidden" style={{ minHeight: '70vh' }}>
      {/* Background — women's boots image acts as cinematic backdrop */}
      <div className="absolute inset-0">
        <img
          src={ASSETS.WOMEN_BG}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-wood/70 via-dark-3/50 to-dark-wood/80" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="reveal relative z-10 flex flex-col items-center justify-center text-center px-6 py-32 md:py-48"
        style={{ minHeight: '70vh' }}
      >
        {/* Decorative circle (play button feel) */}
        <div className="w-20 h-20 rounded-full border border-gold/40 flex items-center justify-center mb-10">
          <div className="w-0 h-0 ml-1.5" style={{ borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '18px solid rgba(212,175,55,0.7)' }} />
        </div>

        <p className="font-main text-[9px] tracking-[7px] text-gold/50 uppercase mb-6">
          The Process
        </p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-cream uppercase tracking-[0.08em] leading-tight mb-6">
          The Art of<br />the Boot
        </h2>
        <p className="font-main text-sm md:text-base text-cream/55 tracking-widest uppercase">
          Crafted by Hand · El Paso, Texas
        </p>
      </div>
    </section>
  );
};

export default VideoSection;
