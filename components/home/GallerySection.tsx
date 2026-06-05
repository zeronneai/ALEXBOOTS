import React, { useState } from 'react';
import { ASSETS } from '../../constants';
import { useReveal } from '../../src/hooks/useReveal';

type SpanType = 'large' | 'tall' | 'wide' | 'normal';

const GALLERY_ITEMS: { idx: number; caption: string; span: SpanType }[] = [
  { idx: 0, caption: 'The Collection',      span: 'large'  },
  { idx: 1, caption: "Men's Exotics",       span: 'tall'   },
  { idx: 2, caption: "Women's Silhouettes", span: 'normal' },
  { idx: 3, caption: 'The Workshop',        span: 'normal' },
  { idx: 4, caption: 'Hand Stitching',      span: 'normal' },
  { idx: 5, caption: 'Exotic Leathers',     span: 'wide'   },
  { idx: 6, caption: 'Custom Orders',       span: 'normal' },
  { idx: 7, caption: 'American Heritage',   span: 'normal' },
];

const spanClasses: Record<SpanType, string> = {
  large:  'md:col-span-2 md:row-span-2',
  tall:   'md:row-span-2',
  wide:   'md:col-span-2',
  normal: '',
};

const GallerySection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const headerRef = useReveal() as React.RefObject<HTMLDivElement>;
  const gridRef   = useReveal(0.06) as React.RefObject<HTMLDivElement>;

  return (
    <section id="gallery" className="bg-dark-wood py-24 md:py-36 px-5 md:px-12 lg:px-20">

      {/* Header */}
      <div ref={headerRef} className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <p className="font-main font-semibold text-[11px] tracking-[6px] text-gold uppercase mb-4">Behind the Boot</p>
          <h2 className="font-display text-4xl md:text-6xl text-cream uppercase tracking-[0.04em] leading-none">
            Gallery
          </h2>
        </div>
        <p className="font-main text-[10px] md:text-[11px] text-cream/55 tracking-[3px] uppercase max-w-xs text-right leading-relaxed">
          A look inside the workshop,<br />the leather, and the craft.
        </p>
      </div>

      {/* Mosaic grid */}
      <div
        ref={gridRef}
        className="reveal reveal-delay-2 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[200px] md:auto-rows-[220px]"
      >
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.idx}
            onMouseEnter={() => setHoveredIdx(item.idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`relative overflow-hidden bg-dark-3 cursor-pointer ${spanClasses[item.span]}`}
          >
            <img
              src={ASSETS.GALLERY[item.idx]}
              alt={item.caption}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: hoveredIdx === item.idx ? 'scale(1.06)' : 'scale(1)',
                filter:    hoveredIdx === item.idx ? 'brightness(0.45)' : 'brightness(0.8)',
                transition: 'transform 0.7s ease, filter 0.5s ease',
              }}
            />

            {/* Caption — slides up on hover */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-black/75 to-transparent"
              style={{
                opacity:   hoveredIdx === item.idx ? 1 : 0,
                transform: hoveredIdx === item.idx ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              <p className="font-display text-[9px] tracking-[4px] text-cream uppercase">{item.caption}</p>
            </div>

            {/* Border glow */}
            <div
              className="absolute inset-0 pointer-events-none border"
              style={{
                borderColor: hoveredIdx === item.idx ? 'rgba(212,175,55,0.45)' : 'transparent',
                transition: 'border-color 0.4s ease',
              }}
            />
          </div>
        ))}
      </div>

    </section>
  );
};

export default GallerySection;
