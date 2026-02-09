import React, { forwardRef } from 'react';
import { ASSETS } from '../constants';

interface SectionProps {
  data: {
    id: number;
    title: string;
    subtitle: string;
    img: string;
    button: string;
    align: string;
    isHero?: boolean;
  };
  onOpenCatalog: () => void;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(({ data, onOpenCatalog }, ref) => {
  const isRight = data.align === 'right';
  const isCenter = data.align === 'center';
  // Explicitly handle left alignment as fallback
  const isLeft = !isRight && !isCenter;

  return (
    <section 
      ref={ref}
      className="w-full h-full absolute top-0 left-0 flex overflow-hidden opacity-0 invisible bg-dark-wood"
      style={{ zIndex: 0 }}
    >
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
         <img 
          src={data.img} 
          alt={data.title} 
          className="section-bg w-full h-full object-cover scale-110 brightness-[0.5]" 
        />
        {/* Gradient overlay to ensure text contrast and separation */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-transparent to-black/40" />
      </div>
      
      <div className={`
        relative z-[2] px-[10%] flex flex-col justify-center h-full w-full md:w-[60%]
        ${isRight ? 'ml-auto items-end text-right' : ''}
        ${isLeft ? 'mr-auto items-start text-left' : ''}
        ${isCenter ? 'mx-auto items-center text-center' : ''}
      `}>
        {data.isHero && (
          <img 
            src={ASSETS.LOGO_ICON} 
            alt="Logo" 
            className="floating-logo w-[300px] mb-8 drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] opacity-0 scale-75"
          />
        )}
        
        <h1 className="big-title font-western text-[5vw] text-gold leading-none mb-5 drop-shadow-xl translate-y-[50px] opacity-0 whitespace-pre-line">
          {data.title}
        </h1>
        
        <p className="subtitle font-main text-lg text-[#ccc] mb-10 max-w-[500px] leading-relaxed translate-y-[30px] opacity-0">
          {data.subtitle}
        </p>
        
        <button 
          onClick={onOpenCatalog}
          className="btn-western px-10 py-4 border border-gold text-gold bg-transparent font-display uppercase tracking-[2px] w-fit transition-all duration-300 translate-y-[20px] opacity-0 hover:bg-gold hover:text-black interactive relative z-50 pointer-events-auto"
        >
          {data.button}
        </button>
      </div>
    </section>
  );
});

export default Section;