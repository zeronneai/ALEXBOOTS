import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Showcase: React.FC = () => {
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imgRef.current && imgContainerRef.current) {
      gsap.to(imgRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: imgContainerRef.current,
          scrub: true
        }
      });
    }

    const elements = textRef.current?.querySelectorAll('.reveal-text');
    elements?.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });
  }, []);

  return (
    <section className="py-32 px-[5%] bg-[#0f0f0f] grid grid-cols-1 md:grid-cols-2 gap-16 items-center border-t border-[#222]">
      <div ref={imgContainerRef} className="w-full h-[700px] overflow-hidden relative interactable">
        <img 
          ref={imgRef}
          src={ASSETS.SHOWCASE_IMG} 
          alt="Boot Detail" 
          className="w-full h-full object-cover"
        />
      </div>
      <div ref={textRef} className="showcase-text">
        <h2 className="reveal-text font-display text-4xl md:text-6xl text-white mb-8">
          EXOTIC SKINS
        </h2>
        <p className="reveal-text text-[#888] leading-relaxed mb-12 text-lg">
          Discover our premium selection of Ostrich, Caiman, and Python leathers. Built for durability, designed for the spotlight.
        </p>
        <a href="#" className="inline-block px-12 py-5 border border-accent-gold text-accent-gold uppercase tracking-[2px] text-sm relative overflow-hidden transition-colors duration-400 group interactable hover:text-black">
          <span className="relative z-10">View Catalog</span>
          <div className="absolute top-0 left-0 w-0 h-full bg-accent-gold -z-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full"></div>
        </a>
      </div>
    </section>
  );
};

export default Showcase;