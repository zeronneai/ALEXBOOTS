import React, { useState } from 'react';
import { CONTACT } from '../../constants';

const FooterSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer id="footer" className="bg-footer-bg border-t border-white/5">

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-base text-gold uppercase tracking-[0.15em] mb-3">
              Ranchers Boot Co.
            </p>
            <p className="font-main text-[10px] text-cream/40 leading-relaxed tracking-wider mb-8">
              Est. 1985 · El Paso, Texas.<br />
              Handcrafted exotic leather boots for those who live the tradition.
            </p>
            {/* Socials */}
            <div className="flex gap-4">
              {[
                { label: 'IG', href: CONTACT.instagram },
                { label: 'FB', href: CONTACT.facebook  },
                { label: 'WA', href: CONTACT.whatsapp  },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-main text-[9px] tracking-[2px] text-cream/35 hover:text-gold transition-colors duration-300 uppercase interactive"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="font-display text-[10px] tracking-[4px] text-cream/50 uppercase mb-5">Shop</p>
            <ul className="space-y-3">
              {["Men's Collection", "Women's Collection", 'Exotic Leathers', 'New Arrivals'].map(l => (
                <li key={l}>
                  <button
                    onClick={() => scrollTo('collection')}
                    className="font-main text-[11px] text-cream/40 hover:text-cream transition-colors duration-300 interactive tracking-wider"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="font-display text-[10px] tracking-[4px] text-cream/50 uppercase mb-5">About</p>
            <ul className="space-y-3">
              {[
                { label: 'Our Story',   id: 'heritage'   },
                { label: 'The Process', id: 'process'    },
                { label: 'Contact',     id: 'footer'     },
                { label: 'FAQ',         id: 'footer'     },
              ].map(l => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="font-main text-[11px] text-cream/40 hover:text-cream transition-colors duration-300 interactive tracking-wider"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <p className="font-display text-[10px] tracking-[4px] text-cream/50 uppercase mb-5">Contact</p>
            <ul className="space-y-3 mb-8">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="font-main text-[11px] text-cream/40 hover:text-gold transition-colors duration-300 interactive tracking-wider">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="font-main text-[11px] text-cream/40 hover:text-gold transition-colors duration-300 interactive tracking-wider">
                  WhatsApp
                </a>
              </li>
              <li>
                <p className="font-main text-[11px] text-cream/30 tracking-wider">El Paso, Texas — Est. 1985</p>
              </li>
            </ul>

            {/* Newsletter */}
            <p className="font-display text-[10px] tracking-[4px] text-cream/50 uppercase mb-4">Newsletter</p>
            <form
              onSubmit={e => { e.preventDefault(); setEmail(''); }}
              className="flex gap-0 border border-white/10 hover:border-gold/30 transition-colors duration-300"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-3 py-2.5 font-main text-[10px] text-cream/60 placeholder:text-cream/20 focus:outline-none tracking-wider"
              />
              <button
                type="submit"
                className="bg-gold/0 hover:bg-gold px-4 py-2.5 font-display text-[9px] tracking-[3px] text-gold hover:text-card-bg uppercase transition-all duration-300 interactive border-l border-white/10 hover:border-gold"
              >
                →
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-5 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="font-main text-[9px] text-cream/20 tracking-[2px] uppercase">
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
