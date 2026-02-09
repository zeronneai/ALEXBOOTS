import React from 'react';
import { ASSETS } from '../constants';

interface CategoriesProps {
  onOpenCategory: (cat: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onOpenCategory }) => {
  const categories = [
    { id: 'MEN', title: "MEN'S BOOTS", img: ASSETS.CAT_MEN },
    { id: 'WOMEN', title: "WOMEN'S BOOTS", img: ASSETS.CAT_WOMEN },
    { id: 'KIDS', title: "KIDS COLLECTION", img: ASSETS.CAT_KIDS },
    { id: 'UNIFORM', title: "WORK & UNIFORM", img: ASSETS.CAT_UNIFORM },
  ];

  return (
    <section className="w-full h-screen flex flex-col md:flex-row bg-black relative" id="collection">
      {categories.map((cat, index) => (
        <div 
          key={cat.id}
          className={`
            relative flex-1 h-full flex justify-center items-center overflow-hidden
            border-b md:border-b-0 md:border-r border-white/10 last:border-0
            grayscale brightness-[0.6] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
            hover:flex-[1.5] md:hover:flex-[3] hover:grayscale-0 hover:brightness-90 group interactable cursor-pointer
          `}
          style={{ 
            backgroundImage: `url(${cat.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={() => onOpenCategory(cat.title)}
        >
          <h2 className="relative z-[2] font-western text-4xl text-white uppercase tracking-[4px] md:-rotate-90 whitespace-nowrap transition-all duration-400 drop-shadow-xl group-hover:rotate-0 group-hover:text-accent-gold group-hover:text-5xl md:group-hover:text-6xl">
            {cat.id}
          </h2>
        </div>
      ))}
    </section>
  );
};

export default Categories;