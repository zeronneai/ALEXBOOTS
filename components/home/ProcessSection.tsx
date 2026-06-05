import React from 'react';
import { useReveal } from '../../src/hooks/useReveal';

const STEPS = [
  {
    num: '01',
    title: 'Material Selection',
    desc: 'We source the finest exotic leathers — ostrich, caiman, lizard, and full-grain cowhide — from trusted tanneries and premium suppliers committed to quality.',
  },
  {
    num: '02',
    title: 'Custom Design',
    desc: 'Every pair begins as a sketch. Our artisans work with you to define the toe shape, heel height, stitch pattern, and finish.',
  },
  {
    num: '03',
    title: 'Handcrafting',
    desc: 'Skilled hands cut, last, and stitch each boot over several days. No two pairs are identical — that is the mark of true craftsmanship.',
  },
  {
    num: '04',
    title: 'Hand Finishing',
    desc: 'Final shaping, welt stitching, and hand-polishing. Each boot leaves the workshop only when it meets the uncompromising standard of Ranchers Boot Co.',
  },
];

const ProcessSection: React.FC = () => {
  const headerRef = useReveal() as React.RefObject<HTMLDivElement>;
  const stepsRef  = useReveal(0.07) as React.RefObject<HTMLDivElement>;

  return (
    <section id="process-steps" className="bg-dark-3 py-24 md:py-36 px-5 md:px-12 lg:px-20">

      {/* Header */}
      <div ref={headerRef} className="reveal text-center mb-20 md:mb-28">
        <p className="font-main font-semibold text-[11px] tracking-[6px] text-gold uppercase mb-5">From Hide to Boot</p>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-cream uppercase tracking-[0.04em] leading-none mb-6">
          The Process
        </h2>
        <div className="w-16 h-px bg-gold/40 mx-auto" />
      </div>

      {/* Steps grid */}
      <div ref={stepsRef} className="reveal reveal-delay-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 max-w-7xl mx-auto">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className={`relative p-8 md:p-10 lg:p-12 ${
              i < STEPS.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/[0.07]' : ''
            }`}
          >
            {/* Step number */}
            <p className="font-display text-5xl md:text-6xl text-gold/10 leading-none mb-6 select-none">
              {step.num}
            </p>

            {/* Line */}
            <div className="w-10 h-px bg-gold/40 mb-6" />

            {/* Title */}
            <h3 className="font-display text-sm md:text-base text-cream uppercase tracking-[0.12em] mb-4">
              {step.title}
            </h3>

            {/* Description */}
            <p className="font-main text-[11px] md:text-xs text-cream/75 leading-relaxed tracking-wide">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default ProcessSection;
