import React from 'react';
import { CONTACT } from '../../constants';
import { useReveal } from '../../src/hooks/useReveal';

const STORE = {
  name:    'Ranchers Boot Co.',
  address: '2100 Stemmons Freeway, 10963-WTC',
  city:    'Dallas, TX 75207',
  hours: [
    { day: 'Mon – Fri',  time: '9:00 AM – 7:00 PM' },
    { day: 'Saturday',   time: '9:00 AM – 5:00 PM' },
    { day: 'Sunday',     time: 'By Appointment'     },
  ],
};

const MAPS_EMBED =
  'https://www.google.com/maps?q=2100+Stemmons+Freeway,+Dallas,+TX+75207&output=embed';

const MAPS_LINK =
  'https://maps.google.com/?q=2100+Stemmons+Freeway,+Dallas,+TX+75207';

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

        {/* Google Maps embed */}
        <div ref={leftRef} className="reveal relative overflow-hidden border border-white/[0.06]" style={{ minHeight: 400 }}>
          <iframe
            title="Ranchers Boot Co. Location"
            src={MAPS_EMBED}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 400, display: 'block', filter: 'grayscale(30%) invert(5%)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Open in Maps overlay button */}
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-4 right-4 font-display text-[8px] tracking-[3px] text-card-bg bg-gold hover:bg-cream uppercase transition-colors duration-300 px-4 py-2.5 interactive"
          >
            Open in Maps →
          </a>
        </div>

        {/* Store info */}
        <div ref={rightRef} className="reveal reveal-delay-2 flex flex-col justify-center">

          <h3 className="font-display text-xl md:text-2xl text-cream uppercase tracking-[0.1em] mb-8">
            {STORE.name}
          </h3>

          {/* Address */}
          <div className="mb-7 pb-7 border-b border-white/[0.07]">
            <p className="font-main text-[9px] tracking-[5px] text-gold/55 uppercase mb-3">Address</p>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="font-main text-sm text-cream/65 hover:text-cream leading-relaxed tracking-wide transition-colors duration-300 interactive"
            >
              {STORE.address}<br />{STORE.city}
            </a>
          </div>

          {/* Hours */}
          <div className="mb-7 pb-7 border-b border-white/[0.07]">
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

          {/* Phone & Email — clickable */}
          <div className="mb-8 pb-7 border-b border-white/[0.07] space-y-4">
            <div>
              <p className="font-main text-[9px] tracking-[5px] text-gold/55 uppercase mb-2">Phone</p>
              <a
                href={`tel:+19158729526`}
                className="font-main text-sm text-cream/70 hover:text-gold transition-colors duration-300 interactive tracking-wider"
              >
                {CONTACT.phone}
              </a>
            </div>
            <div>
              <p className="font-main text-[9px] tracking-[5px] text-gold/55 uppercase mb-2">Email</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-main text-sm text-cream/70 hover:text-gold transition-colors duration-300 interactive tracking-wider break-all"
              >
                {CONTACT.email}
              </a>
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
              href={`tel:+19158729526`}
              className="flex items-center justify-center gap-2 font-display text-[9px] tracking-[4px] text-cream/60 hover:text-gold uppercase border border-white/15 hover:border-gold/40 transition-all duration-300 px-8 py-3.5 interactive"
            >
              Call Us
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoreSection;
