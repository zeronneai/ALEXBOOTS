import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll('.reveal-text');
    
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
    <section ref={containerRef} className="py-40 px-8 text-center max-w-[900px] mx-auto relative">
      <h2 className="reveal-text font-display text-3xl md:text-5xl lg:text-6xl leading-[1.2] text-accent-gold mb-8">
        NOTHING BUT THE BEST
      </h2>
      <p className="reveal-text font-main text-lg text-[#999] leading-[1.8] max-w-[600px] mx-auto">
        For 40 years, we have been crafting the finest boots in El Paso, Texas. Leather, grit, and glory. Welcome to the Alex Boots legacy.
      </p>
    </section>
  );
};

export default About;