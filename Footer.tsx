import React from 'react';
import { SOCIALS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-color py-24 px-8 text-center border-t border-[#1a1a1a] relative z-[2]">
      <div className="font-western text-5xl text-[#333] mb-8 inline-block">
        ALEX BOOTS
      </div>
      <p className="text-[#666] mb-8 uppercase tracking-widest text-xs">
        EST. 1985 • EL PASO, TEXAS
      </p>
      <div className="flex justify-center gap-5">
        {SOCIALS.map((social) => (
          <a 
            key={social.name}
            href={social.url} 
            className="text-[#666] no-underline transition-colors duration-300 hover:text-accent-gold interactable"
          >
            {social.name}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;