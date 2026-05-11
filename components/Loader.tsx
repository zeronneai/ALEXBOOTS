import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const BRAND_IMG = 'https://res.cloudinary.com/dsprn0ew4/image/upload/v1778536281/ChatGPT_Image_May_11_2026_03_50_31_PM_mljyx4.png';

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef       = useRef<HTMLImageElement>(null);
  const barRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) gsap.set(containerRef.current, { display: 'none' });
        onComplete();
      },
    });

    tl.fromTo(imgRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' })
      .to(barRef.current, { width: '160px', duration: 1.2, ease: 'power2.inOut' }, '-=0.5')
      .to([imgRef.current, barRef.current], { opacity: 0, duration: 0.5 }, '+=0.4')
      .to(containerRef.current, { y: '-100%', duration: 0.9, ease: 'expo.inOut' });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#070504] z-[3000] flex flex-col items-center justify-center"
    >
      <img
        ref={imgRef}
        src={BRAND_IMG}
        alt="Ranchers Boot Co."
        className="w-[220px] md:w-[280px] object-contain opacity-0 drop-shadow-[0_0_30px_rgba(212,175,55,0.25)]"
      />
      <div
        ref={barRef}
        className="w-0 h-[1px] bg-gold mt-8"
      />
    </div>
  );
};

export default Loader;
