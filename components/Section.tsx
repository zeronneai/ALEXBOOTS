import React, { forwardRef, useState } from 'react';
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
    isContact?: boolean;
    isFaq?: boolean;
    isNewsletter?: boolean;
    faqItems?: { question: string; answer: string }[];
  };
  onOpenCatalog: () => void;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(({ data, onOpenCatalog }, ref) => {
  const isRight = data.align === 'right';
  const isCenter = data.align === 'center';
  const isLeft = !isRight && !isCenter;

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const renderContent = () => {
    if (data.isContact) {
      return (
        <div className="custom-content flex gap-8 justify-center translate-y-[20px] opacity-0">
             {/* Email */}
             <a href="mailto:info@alexboots.com" className="group interactive">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white transition-all duration-300 group-hover:text-gold group-hover:scale-110">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
             </a>
             {/* WhatsApp */}
             <a href="https://wa.me/19158729526" target="_blank" rel="noreferrer" className="group interactive">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white transition-all duration-300 group-hover:text-gold group-hover:scale-110">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
                </svg>
             </a>
             {/* Instagram */}
             <a href="https://instagram.com/alexbootscompany" target="_blank" rel="noreferrer" className="group interactive">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white transition-all duration-300 group-hover:text-gold group-hover:scale-110">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
             </a>
             {/* Facebook */}
             <a href="https://www.facebook.com/botasalex/?locale=es_LA" target="_blank" rel="noreferrer" className="group interactive">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white transition-all duration-300 group-hover:text-gold group-hover:scale-110">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
             </a>
        </div>
      );
    }

    if (data.isFaq && data.faqItems) {
      return (
        <div className="custom-content w-full max-w-2xl translate-y-[20px] opacity-0">
          {data.faqItems.map((item, idx) => (
            <div key={idx} className="mb-4 border-b border-white/20 pb-4">
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center text-left focus:outline-none interactive group"
              >
                <span className="font-display text-lg md:text-xl text-gold tracking-wide group-hover:text-white transition-colors duration-300">
                  {item.question}
                </span>
                <span className={`text-gold text-2xl transition-transform duration-300 ${expandedFaq === idx ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedFaq === idx ? 'max-h-[200px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
              >
                <p className="font-main text-white/80 leading-relaxed text-sm md:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (data.isNewsletter) {
      return (
        <div className="custom-content w-full max-w-md flex flex-col gap-6 translate-y-[20px] opacity-0">
          <p className="font-main text-white/70 text-center mb-4">
            Recibe acceso anticipado a nuevas colecciones, ofertas exclusivas y lanzamientos limitados antes que nadie.
          </p>
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Tu Correo Electrónico" 
              className="w-full bg-transparent border-b border-white/30 py-3 text-white font-main text-center focus:outline-none focus:border-gold transition-colors duration-300 placeholder:text-white/30"
            />
            <button 
              className="mx-auto btn-western px-10 py-4 border border-gold text-gold bg-transparent font-display uppercase tracking-[2px] w-fit transition-all duration-300 hover:bg-gold hover:text-black interactive pointer-events-auto"
            >
              SUSCRIBIRME
            </button>
          </form>
        </div>
      );
    }

    // Default Button
    return (
      <button 
        onClick={onOpenCatalog}
        className="btn-western px-10 py-4 border border-gold text-gold bg-transparent font-display uppercase tracking-[2px] w-fit transition-all duration-300 translate-y-[20px] opacity-0 hover:bg-gold hover:text-black interactive relative z-50 pointer-events-auto"
      >
        {data.button}
      </button>
    );
  };

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
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>
      
      <div className={`
        relative z-[2] px-[10%] flex flex-col justify-center h-full w-full md:w-[70%]
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
        
        {!data.isNewsletter && (
          <p className="subtitle font-main text-lg text-[#ccc] mb-10 max-w-[500px] leading-relaxed translate-y-[30px] opacity-0">
            {data.subtitle}
          </p>
        )}
        
        {renderContent()}

      </div>
    </section>
  );
});

export default Section;
