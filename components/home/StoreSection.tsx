import React from 'react';
import { CONTACT } from '../../constants';
import { useReveal } from '../../src/hooks/useReveal';

// TODO: Update with real store info
const STORE = {
  name:    'Ranchers Boot Co. — El Paso',
  address: '1234 Western Ave',        // ← update
  city:    'El Paso, Texas 79901',    // ← update
  hours: [
    { day: 'Mon – Fri',  time: '9:00 AM – 7:00 PM' },
    { day: 'Saturday',   time: '9:00 AM – 5:00 PM' },
    { day: 'Sunday',     time: 'By Appointment'     },
  ],
  phone: '+1 (915) 000-0000',         // ← update
};

const StoreSection: React.FC = () => {
  const leftRef  = useReveal() as React.RefObject<HTMLDivElement>;
  const rightRef = useReveal() as React.RefObject<HTMLDivElement>;

  return (
    <section id="store" className="bg-dark-2 py-24 md:py-36 px-5 md:px-12 lg:px-20">

      {/* Header */}
      <div className="text-center mb-16 md:mb-24">
        <p className="font-main text-[9px] tracking-[7px] text-gold/60 uppercase mb-5">Come Find Us</p>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-cream uppercase tracking-[0.04em] leading-none">
          Visit the Store
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">

        {/* Map placeholder */}
        <div ref={leftRef} className="reveal relative overflow-hidden bg-dark-3 border border-white/[0.06]" style={{ minHeight: 380 }}>
          {/* Decorative map placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            {/* Pin icon */}
            <svg className="w-10 h-10 text-gold/30 mb-6" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5" strokeLinecap="round"/>
            </svg>
            <p className="font-display text-lg md:text-xl text-cream/30 uppercase tracking-[0.1em] mb-2">
              El Paso, Texas
            </p>
            <p className="font-main text-[10px] text-cream/20 tracking-[3px] uppercase mb-8">
              Border Country · Est. 1985
            </p>
            <a
              href={`https://maps.google.com/?q=El+Paso+Texas`}
              target="_blank"
              rel="noreferrer"
              className="font-display text-[9px] tracking-[4px] text-gold/60 hover:text-gold uppercase border border-gold/25 hover:border-gold/50 px-8 py-3 transition-all duration-300"
            >
              Open in Maps →
            </a>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/20" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/20" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/20" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/20" />
        </div>

        {/* Store info */}
        <div ref={rightRef} className="reveal reveal-delay-2 flex flex-col justify-center">

          <h3 className="font-display text-xl md:text-2xl text-cream uppercase tracking-[0.1em] mb-8">
            {STORE.name}
          </h3>

          {/* Address */}
          <div className="mb-8 pb-8 border-b border-white/[0.07]">
            <p className="font-main text-[9px] tracking-[5px] text-gold/55 uppercase mb-3">Address</p>
            <p className="font-main text-sm text-cream/65 leading-relaxed tracking-wide">
              {STORE.address}<br />{STORE.city}
            </p>
          </div>

          {/* Hours */}
          <div className="mb-8 pb-8 border-b border-white/[0.07]">
            <p className="font-main text-[9px] tracking-[5px] text-gold/55 uppercase mb-4">Store Hours</p>
            <div className="space-y-2.5">
              {STORE.hours.map(h => (
                <div key={h.day} className="flex justify-between items-center">
                  <span className="font-main text-[11px] text-cream/50 tracking-wider">{h.day}</span>
                  <span className="font-main text-[11px] text-cream/70 tracking-wider">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 font-display text-[9px] tracking-[4px] text-card-bg bg-gold hover:bg-cream uppercase transition-colors duration-300 px-8 py-3.5 interactive"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center justify-center gap-2 font-display text-[9px] tracking-[4px] text-cream/60 hover:text-gold uppercase border border-white/15 hover:border-gold/40 transition-all duration-300 px-8 py-3.5 interactive"
            >
              Email Us
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoreSection;
