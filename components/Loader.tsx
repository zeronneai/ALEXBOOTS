import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          gsap.set(containerRef.current, { display: 'none' });
        }
        onComplete();
      }
    });

    tl.to(barRef.current, { width: "200px", duration: 1.5, ease: "power2.inOut" })
      .to(textRef.current, { letterSpacing: "10px", duration: 1 }, "-=1")
      .to(containerRef.current, { y: "-100%", duration: 1, ease: "expo.inOut" });

  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full bg-black z-[2000] flex flex-col justify-center items-center">
      <div ref={textRef} className="font-western text-gold text-5xl mb-5 whitespace-nowrap">
        ALEX BOOTS
      </div>
      <div ref={barRef} className="w-0 h-[2px] bg-gold" />
    </div>
  );
};

export default Loader;