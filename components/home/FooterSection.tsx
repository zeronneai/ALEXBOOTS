import React, { useState } from 'react';
import { CONTACT } from '../../constants';

const FooterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setEmail('');
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <footer id="footer" className="bg-footer-bg">

      {/* Pre-footer CTA */}
      <div className="bg-dark-3 border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-5 md:px-12 py-20 md:py-28 text-center">
          <p className="font-main text-[9px] tracking-[7px] text-gold/55 uppercase mb-5">Ready to Find Yours?</p>
          <h2
            className="font-display text-cream uppercase leading-none tracking-[0.04em] mb-10"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 5rem)' }}
          >
            Built to Last.<br />Made for You.
          </h2>
          <button
            onClick={() => scrollTo('collection')}
            className="font-display text-[10px] tracking-[6px] text-card-bg bg-gold hover:bg-cream uppercase transition-colors duration-300 interactive px-14 py-4"
          >
            Shop the Collection
          </button>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-sm text-gold uppercase tracking-[0.2em] mb-3">
              Ranchers Boot Co.
            </p>
            <p className="font-main text-[10px] text-cream/35 leading-relaxed tracking-wider mb-8 max-w-[200px]">
              Est. 1985 · El Paso, Texas.<br />
              Handcrafted exotic leather boots for those who live the tradition.
            </p>
            <div className="flex gap-5">
              {[
                { label: 'Instagram', href: CONTACT.instagram },
                { label: 'Facebook',  href: CONTACT.facebook  },
                { label: 'WhatsApp',  href: CONTACT.whatsapp  },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-main text-[8px] tracking-[2px] text-cream/30 hover:text-gold transition-colors duration-300 uppercase interactive"
                >
                  {s.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="font-display text-[9px] tracking-[5px] text-cream/40 uppercase mb-6">Shop</p>
            <ul className="space-y-4">
              {["Men's Collection", "Women's Collection", 'New Arrivals', 'Best Sellers'].map(l => (
                <li key={l}>
                  <button
                    onClick={() => scrollTo('collection')}
                    className="font-main text-[11px] text-cream/35 hover:text-cream transition-colors duration-300 interactive tracking-wider"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="font-display text-[9px] tracking-[5px] text-cream/40 uppercase mb-6">About</p>
            <ul className="space-y-4">
              {[
                { label: 'Our Story',   id: 'heritage' },
                { label: 'The Process', id: 'process'  },
                { label: 'Contact',     id: 'footer'   },
              ].map(l => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="font-main text-[11px] text-cream/35 hover:text-cream transition-colors duration-300 interactive tracking-wider"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <p className="font-display text-[9px] tracking-[5px] text-cream/40 uppercase mb-6">Contact</p>
            <ul className="space-y-4 mb-10">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="font-main text-[11px] text-cream/35 hover:text-gold transition-colors duration-300 interactive tracking-wider">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="font-main text-[11px] text-cream/35 hover:text-gold transition-colors duration-300 interactive tracking-wider">
                  WhatsApp
                </a>
              </li>
              <li>
                <p className="font-main text-[11px] text-cream/25 tracking-wider">El Paso, Texas</p>
              </li>
            </ul>

            <p className="font-display text-[9px] tracking-[5px] text-cream/40 uppercase mb-4">Newsletter</p>
            {sent ? (
              <p className="font-main text-[10px] tracking-[3px] text-gold uppercase">Thank you ✓</p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex gap-0 border border-white/10 hover:border-gold/30 transition-colors duration-300"
              >
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-transparent px-3 py-2.5 font-main text-[10px] text-cream/60 placeholder:text-cream/20 focus:outline-none tracking-wider min-w-0"
                />
                <button
                  type="submit"
                  className="bg-transparent hover:bg-gold px-4 py-2.5 font-display text-[9px] tracking-[3px] text-gold hover:text-card-bg uppercase transition-all duration-300 interactive border-l border-white/10 hover:border-gold flex-shrink-0"
                >
                  →
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04] px-5 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="font-main text-[9px] text-cream/18 tracking-[2px] uppercase">
          © {new Date().getFullYear()} Ranchers Boot Co. All rights reserved.
        </p>
        <p className="font-main text-[9px] text-cream/15 tracking-[2px] uppercase">
          Handcrafted in El Paso, Texas
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
