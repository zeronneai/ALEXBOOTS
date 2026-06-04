import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ASSETS } from '../../constants';

interface Props {
  onShopClick: () => void;
  isReady: boolean;
}

const HeroSection: React.FC<Props> = ({ onShopClick, isReady }) => {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const logoRef    = useRef<HTMLImageElement>(null);
  const divRef     = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const btnsRef    = useRef<HTMLDivElement>(null);
  const indRef     = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isReady) return;
    const tl = gsap.timeline();
    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
      .fromTo(logoRef.current,    { opacity: 0, y: 50, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power3.out' }, '-=0.3')
      .fromTo(divRef.current,     { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.7, ease: 'power2.out', transformOrigin: 'center' }, '-=0.8')
      .fromTo(subRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.5')
      .fromTo(btnsRef.current,    { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .fromTo(indRef.current,     { opacity: 0 },        { opacity: 1, duration: 0.6 }, '-=0.3');

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, duration: 1.4, ease: 'power1.inOut', repeat: -1, yoyo: true, delay: 3 }
    );
  }, [isReady]);

  return (
    <section id="hero" className="relative w-full overflow-hidden" style={{ height: '100dvh', minHeight: 640 }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={ASSETS.HERO_BG}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-[#1a1512]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

        <p
          ref={eyebrowRef}
          className="font-main text-[9px] md:text-[10px] tracking-[8px] text-gold uppercase mb-8 md:mb-10"
          style={{ opacity: 0 }}
        >
          Est. 1985 &nbsp;·&nbsp; El Paso, Texas
        </p>

        {/* Large logo — replaces text headline */}
        <img
          ref={logoRef}
          src={ASSETS.LOGO_HERO}
          alt="Ranchers Boot Co."
          loading="eager"
          decoding="async"
          className="w-auto object-contain drop-shadow-[0_4px_32px_rgba(212,175,55,0.25)] mb-7 md:mb-9"
          style={{
            opacity: 0,
            maxHeight: 'clamp(7rem, 22vw, 18rem)',
            maxWidth: '85vw',
          }}
        />

        <div
          ref={divRef}
          className="w-20 h-px bg-gold/60 mb-7 md:mb-9"
          style={{ opacity: 0 }}
        />

        <p
          ref={subRef}
          className="font-main text-[11px] md:text-sm text-cream/60 mb-12 md:mb-14 max-w-xs mx-auto leading-relaxed tracking-[3px] uppercase"
          style={{ opacity: 0 }}
        >
          Handcrafted leather boots.<br />Tradition since 1985.
        </p>

        <div
          ref={btnsRef}
          className="flex flex-col sm:flex-row items-center gap-4"
          style={{ opacity: 0 }}
        >
          <button
            onClick={onShopClick}
            className="font-display text-[10px] tracking-[6px] text-card-bg bg-gold hover:bg-cream uppercase transition-colors duration-300 interactive px-14 py-4 md:py-5"
          >
            Shop the Collection
          </button>
          <button
            onClick={() => document.getElementById('heritage')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-display text-[10px] tracking-[5px] text-cream/55 hover:text-gold uppercase transition-all duration-300 interactive border border-white/20 hover:border-gold/50 px-10 py-4 md:py-5"
          >
            Our Story
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={indRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none select-none"
        style={{ opacity: 0 }}
      >
        <span className="font-main text-[8px] tracking-[5px] text-cream/25 uppercase">Scroll</span>
        <div className="w-px h-14 bg-cream/15 relative overflow-hidden">
          <div ref={lineRef} className="absolute inset-0 bg-gold/70" style={{ transformOrigin: 'top center', scaleY: 0 }} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
