import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SECTIONS_DATA } from './constants';

import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Section from './components/Section';
import CategoryModal from './components/CategoryModal';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // We use a ref for logic to avoid stale closures in event listeners
  const currentIndexRef = useRef(0);
  const isAnimating = useRef(false);
  
  // Refs for section elements
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Initial setup and Loader animation
  const handleLoaderComplete = () => {
    // Initial animation for the first section (Hero)
    const hero = sectionsRef.current[0];
    if (hero) {
      gsap.set(hero, { opacity: 1, visibility: 'visible', zIndex: 10 });
      
      const tl = gsap.timeline();
      tl.fromTo(hero.querySelector('.section-bg'), { scale: 1.2 }, { scale: 1, duration: 2, ease: "power2.out" })
        .to(hero.querySelector('.floating-logo'), { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }, "-=1.5")
        .to(hero.querySelector('.big-title'), { opacity: 1, y: 0, duration: 1 }, "-=1")
        .to(hero.querySelector('.subtitle'), { opacity: 1, y: 0, duration: 1 }, "-=0.8")
        .to(hero.querySelector('.btn-western'), { opacity: 1, y: 0, duration: 1 }, "-=0.6");
    }
  };

  const handleOpenCatalog = (categoryTitle: string) => {
    console.log('Click detectado');
    setSelectedCategory(categoryTitle);
    setIsModalOpen(true);
  };

  const goToSection = (index: number) => {
    if (isAnimating.current || index === currentIndexRef.current || index < 0 || index >= SECTIONS_DATA.length) return;
    
    isAnimating.current = true;
    const direction = index > currentIndexRef.current ? 1 : -1;
    const currentSection = sectionsRef.current[currentIndexRef.current];
    const nextSection = sectionsRef.current[index];

    if (!currentSection || !nextSection) return;

    currentIndexRef.current = index;
    setCurrentIndex(index);

    // Prepare next section
    gsap.set(nextSection, { zIndex: 20, opacity: 1, visibility: 'visible' });
    gsap.set(currentSection, { zIndex: 10 });

    // Reset next section elements for animation
    const nextBg = nextSection.querySelector('.section-bg');
    const nextTitle = nextSection.querySelector('.big-title');
    const nextSub = nextSection.querySelector('.subtitle');
    const nextBtn = nextSection.querySelector('.btn-western');
    const nextLogo = nextSection.querySelector('.floating-logo');
    
    gsap.set([nextTitle, nextSub, nextBtn, nextLogo].filter(Boolean), { opacity: 0, y: 50 });
    if(nextLogo) gsap.set(nextLogo, { scale: 0.8 });
    gsap.set(nextBg, { scale: 1.2 });

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        gsap.set(currentSection, { opacity: 0, visibility: 'hidden', zIndex: 0 });
      }
    });

    // Slide transition
    if (direction === 1) {
      // Down
      gsap.fromTo(nextSection, { y: "100%" }, { y: "0%", duration: 1.2, ease: "power4.inOut" });
      gsap.to(currentSection.querySelector('.section-bg'), { y: "-20%", duration: 1.2, ease: "power4.inOut" });
    } else {
      // Up
      gsap.fromTo(nextSection, { y: "-100%" }, { y: "0%", duration: 1.2, ease: "power4.inOut" });
      gsap.to(currentSection.querySelector('.section-bg'), { y: "20%", duration: 1.2, ease: "power4.inOut" });
    }

    // Animate content in
    tl.to(nextBg, { scale: 1, duration: 1.5, ease: "power2.out" }, "-=0.5");
    if (nextLogo) tl.to(nextLogo, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }, "-=1");
    tl.to(nextTitle, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.8")
      .to(nextSub, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .to(nextBtn, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't scroll if modal is open
      if (isModalOpen) return;

      // Debounce small movements
      if (Math.abs(e.deltaY) < 20) return;
      
      if (e.deltaY > 0) {
        goToSection(currentIndexRef.current + 1);
      } else {
        goToSection(currentIndexRef.current - 1);
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isModalOpen]);

  return (
    <div className="relative w-full h-screen bg-dark-wood overflow-hidden">
      <div className="noise" />
      <Cursor />
      <Loader onComplete={handleLoaderComplete} />
      <CategoryModal 
        isOpen={isModalOpen} 
        category={selectedCategory} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <Navbar onNavigate={goToSection} />

      {/* Side Indicators */}
      <div className="fixed right-10 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-[1000]">
        {SECTIONS_DATA.map((_, idx) => (
          <div 
            key={idx}
            onClick={() => goToSection(idx)}
            className={`w-[10px] h-[10px] border border-white/30 rounded-full transition-all duration-300 interactive cursor-pointer
              ${idx === currentIndex ? 'bg-gold border-gold shadow-[0_0_10px_#d4af37]' : ''}
            `}
          />
        ))}
      </div>

      <div className="w-full h-full relative">
        {SECTIONS_DATA.map((section, index) => (
          <Section 
            key={section.id} 
            data={section} 
            onOpenCatalog={() => handleOpenCatalog(section.title)}
            ref={(el) => { sectionsRef.current[index] = el; }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;