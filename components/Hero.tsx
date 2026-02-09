import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ASSETS } from '../constants';

interface HeroProps {
  loaderComplete: boolean;
}

const Hero: React.FC<HeroProps> = ({ loaderComplete }) => {
  const logoRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaderComplete) {
      gsap.from(logoRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      });

      gsap.from(badgeRef.current, {
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
      });
    }
  }, [loaderComplete]);

  return (
    <section className="h-screen w-full flex justify-center items-center relative overflow-hidden">
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-[-1] grayscale contrast-110 pointer-events-none"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src={ASSETS.VIDEO_BG} type="video/mp4" />
      </video>
      
      <div className="text-center z-10 pt-12">
        <img 
          ref={logoRef}
          src={ASSETS.LOGO} 
          alt="Alex Boots Emblem" 
          className="max-w-[450px] w-[80vw] h-auto mx-auto drop-shadow-2xl interactable block"
        />
        <div 
          ref={badgeRef}
          className="font-display text-base text-accent-gold tracking-[4px] uppercase mt-8"
        >
          Hand Made Collection
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70">
        <span className="font-display text-[0.7rem] tracking-[3px] mb-2.5">SCROLL</span>
        <div className="w-[1px] h-[60px] bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-accent-gold animate-scrollLine"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;