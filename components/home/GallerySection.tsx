import React, { useState } from 'react';
import { ASSETS } from '../../constants';
import { useReveal } from '../../src/hooks/useReveal';

// Replace these with real image URLs when available
// Each item: { src, caption, span } — span controls grid size
const GALLERY_ITEMS = [
  { src: ASSETS.HERO_BG,   caption: 'The Collection',        span: 'large'  },
  { src: ASSETS.MEN_BG,    caption: "Men's Exotics",         span: 'tall'   },
  { src: ASSETS.WOMEN_BG,  caption: "Women's Silhouettes",   span: 'normal' },
  { src: null,             caption: 'The Workshop',          span: 'normal' },
  { src: null,             caption: 'Hand Stitching',        span: 'normal' },
  { src: ASSETS.MEN_BG,   caption: 'Exotic Leathers',       span: 'wide'   },
  { src: null,             caption: 'Custom Orders',         span: 'normal' },
  { src: null,             caption: 'El Paso Heritage',      span: 'normal' },
];

type SpanType = 'large' | 'tall' | 'wide' | 'normal';

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
        <p className="font-main text-[10px] md:text-[11px] text-cream/35 tracking-[3px] uppercase max-w-xs text-right leading-relaxed">
          A look inside the workshop,<br />the leather, and the craft.
        </p>
      </div>

      {/* Mosaic grid */}
      <div
        ref={gridRef}
        className="reveal reveal-delay-2 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[200px] md:auto-rows-[220px]"
      >
        {GALLERY_ITEMS.map((item, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`relative overflow-hidden bg-dark-3 cursor-pointer ${spanClasses[item.span as SpanType]}`}
          >
            {item.src ? (
              <>
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: hoveredIdx === i ? 'scale(1.06)' : 'scale(1)',
                    filter: hoveredIdx === i ? 'brightness(0.5)' : 'brightness(0.75)',
                    transition: 'transform 0.7s ease, filter 0.5s ease',
                  }}
                />
                {/* Caption */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-black/70 to-transparent"
                  style={{
                    opacity: hoveredIdx === i ? 1 : 0,
                    transform: hoveredIdx === i ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                  }}
                >
                  <p className="font-display text-[9px] tracking-[4px] text-cream uppercase">{item.caption}</p>
                </div>

                {/* Border glow */}
                <div
                  className="absolute inset-0 pointer-events-none border"
                  style={{
                    borderColor: hoveredIdx === i ? 'rgba(212,175,55,0.4)' : 'transparent',
                    transition: 'border-color 0.4s ease',
                  }}
                />
              </>
            ) : (
              /* Placeholder slot */
              <div className="absolute inset-0 flex flex-col items-center justify-center border border-dashed border-white/[0.08]">
                <div className="w-8 h-px bg-gold/20 mb-3" />
                <p className="font-display text-[8px] tracking-[4px] text-cream/20 uppercase text-center px-4">
                  {item.caption}
                </p>
                <p className="font-main text-[7px] tracking-[2px] text-cream/15 uppercase mt-2">
                  Photo coming soon
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

    </section>
  );
};

export default GallerySection;
