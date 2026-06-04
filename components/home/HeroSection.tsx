import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ASSETS } from '../../constants';

interface Props {
  onShopClick: () => void;
  isReady: boolean;
}

const HeroSection: React.FC<Props> = ({ onShopClick, isReady }) => {
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const btnRef      = useRef<HTMLButtonElement>(null);
  const indRef      = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isReady) return;
    const tl = gsap.timeline();
    tl.fromTo(eyebrowRef.current,  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
      .fromTo(titleRef.current,    { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }, '-=0.4')
      .fromTo(subRef.current,      { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1,   ease: 'power2.out' }, '-=0.9')
      .fromTo(btnRef.current,      { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.7')
      .fromTo(indRef.current,      { opacity: 0 },        { opacity: 1,        duration: 0.6               }, '-=0.3');

    // Scroll line loop
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, duration: 1.3, ease: 'power1.inOut', repeat: -1, yoyo: true, delay: 2.8 }
    );
  }, [isReady]);

  return (
    <section id="hero" className="relative w-full overflow-hidden" style={{ height: '100dvh', minHeight: 620 }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={ASSETS.HERO_BG}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        {/* Gradient: dark vignette top/bottom, fades to bg color at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-[#1a1512]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p
          ref={eyebrowRef}
          className="font-main text-[9px] tracking-[7px] text-gold/60 uppercase mb-8"
          style={{ opacity: 0 }}
        >
          Est. 1985 · El Paso, Texas
        </p>

        <h1
          ref={titleRef}
          className="font-display uppercase leading-none tracking-[0.04em] text-cream mb-8"
          style={{
            opacity: 0,
            fontSize: 'clamp(3.2rem, 11vw, 7rem)',
          }}
        >
          Ranchers<br />Boot Co.
        </h1>

        <p
          ref={subRef}
          className="font-main text-sm md:text-base text-cream/60 mb-12 max-w-sm mx-auto leading-relaxed tracking-wider"
          style={{ opacity: 0 }}
        >
          Handcrafted in the heart of the border.<br />
          Tradition, leather, and legacy — since 1985.
        </p>

        <button
          ref={btnRef}
          onClick={onShopClick}
          className="font-display text-[10px] tracking-[5px] text-card-bg bg-gold px-12 py-4 uppercase hover:bg-cream transition-colors duration-400 interactive"
          style={{ opacity: 0 }}
        >
          Shop the Collection
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        ref={indRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none select-none"
        style={{ opacity: 0 }}
      >
        <span className="font-main text-[8px] tracking-[5px] text-cream/25 uppercase">Scroll</span>
        <div className="w-px h-14 bg-cream/15 relative overflow-hidden">
          <div ref={lineRef} className="absolute inset-0 bg-gold/60" style={{ transformOrigin: 'top center', scaleY: 0 }} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
