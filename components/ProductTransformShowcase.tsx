"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface ProductTransformShowcaseProps {
  onOpenBooking?: () => void;
}

const PROGRESSION_STEPS = [
  {
    step: "01 / Material Tactility",
    title: "Belgian Heavyweight Flax",
    desc: "Sourced from the Kortrijk river basin. Double-washed for an ethereal, weighted cascade that catches grazing raking daylight.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvHAqA08x-c1dVCXQG76V-BRTRkwe4mzlHFxFAoJDnlyI4IYsnb3l7MSg6NsV1aUSwdIHu6O9CcCa9duCCjL5FCGdwKgn7cuk8_e1AX1_dyb3p4uGdPtsrouj5hK-01aL9eOnrnB5CZKutuAZhglZM84b2HnW3d6SMOxtk79vUuSD298Y0aPfeRJVhuDaZg3YZRaq3cGhoxriQUvR2TOZpK45sV_F-FQODhYyTJCHW40gP2_nL02JO",
    alt: "Extreme close-up macro texture of Belgian heavyweight slub linen weave",
    badge: "520 g/m² • 100% Pure Linen • Zero Synthetics",
  },
  {
    step: "02 / Architectural Integration",
    title: "Concealed Ceiling Pelmets",
    desc: "Flush-mounted extrusion tracks engineered into drywall and ceiling joists. No exposed brackets, zero visual friction.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGDmhuFqdJfTWCnuR9BmKLCid_YGkM_fdGfvRrEZYo1utT6fRSDYqDKpmr_HYekmgspyy1yl7v957bu6wmhCDS0zOLV7svLmNI4Y7EcpYJk9rZVKoSZ_7UOlu-bkbQEawxTEN6qqJzMdc0kdmMa14bm1LArDO7PCJ9Ob4U1bww9v9u0TTrimwZXqQNSvXdb0JruB-pz5YsR0LjoxlP4PfFT3AZ8xdLGnONc4VL2s0_cJL5OwQ5EbOm",
    alt: "Precision ceiling recessed double track installation with hidden architectural blind reveal",
    badge: "Flush Track Profile • Twin Motor Cavity",
  },
  {
    step: "03 / Holistic Living Space",
    title: "The Orchestrated Room",
    desc: "Light, acoustics, and privacy united in pure tranquility. The room awakens and rests according to the celestial path.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBikXUAhzNhFtwbdJruyMRH9ctlhEZ_CwKXpJN2kIh5eg_rhT-aUsvVXo0_8n-OCuuoFksjsympeFCR3oyBPc5MI0bD1AdgiYlmD3hKYfQSnLhxOe8NidwGNvBj_iqQpuRj8E-a97Aguhe5ReuX5lLIrglieWowJv3eIRo1zhPKl1aBBaxbXc-c0JMmLVkoEodZ8dAGLY_GVRxEWX3QyNOU37Ya4xLFL3Bx4w3nKRJUeOTGF4GYvfmI",
    alt: "Completed holistic luxury bedroom interior with lake view and floor to ceiling draped curtains",
    badge: "Circadian Automation • Bespoke Drop",
  },
];

const CURATED_PRODUCTS = [
  {
    category: "Signature Drapery",
    title: "Custom Architectural Curtains",
    desc: "Hand-finished hems, lead-weighted bottoms, and micro-pleated headers tailored to the exact ceiling-to-floor millimeter drop.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1ex0TK93s-ovJOWjFruruRaxEPKERJD7KEb2e-blvaKLKm-DrrBScbQRk9PiTYerpevWEwffDHpUK45FfcIaKD5aq4j3xO1r-v4Qxjpns7s4RAkXBwtcSlG1QVC47CW27sYOtIbBxAh2Ma9SMe0WBGfRYAPEKcTleM-hxkFLMpDTysXHp36cXZYlJmp7ITd98_xc3ZtwHJm838OYF3lD9YYisyYECVnlNOAi28kfEy8uAVDiV-C5I",
    tag: "Wave-Fold & Pinch",
    spec: "140+ Fabric Weaves",
  },
  {
    category: "Precision Shading",
    title: "Architectural Roller & Venetian",
    desc: "Ultra-slimline bottom rails with zero side-bleed light gaps. German engineered cassettes engineered for seamless window reveal integration.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGDmhuFqdJfTWCnuR9BmKLCid_YGkM_fdGfvRrEZYo1utT6fRSDYqDKpmr_HYekmgspyy1yl7v957bu6wmhCDS0zOLV7svLmNI4Y7EcpYJk9rZVKoSZ_7UOlu-bkbQEawxTEN6qqJzMdc0kdmMa14bm1LArDO7PCJ9Ob4U1bww9v9u0TTrimwZXqQNSvXdb0JruB-pz5YsR0LjoxlP4PfFT3AZ8xdLGnONc4VL2s0_cJL5OwQ5EbOm",
    tag: "Dual & Cellular",
    spec: "Solar Screen 1% - 5%",
  },
  {
    category: "Timber Craft",
    title: "Bespoke Plantation Shutters",
    desc: "Sustainably harvested White Teak and Paulownia hardwood with hidden tilt-rods and mortise and tenon joinery built for generations.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrSGqYlUNiHJ1PxJG4MujSSJGQLhXYX_qRlBL0aTDuH0fOjlT5iSOvZugERWAGrtjJE5T1FM3Bfr0pqSYzJqpCYnrZq6SLSMrHCiWCQbLNzAR513oqT2WfKdQqToq7g4cSXk3lU_nXploxfDfjgpVFB1SyU1eLNSEPw1iSr-NQGBetpHFUeMlpP86y91wfAtDOOHm9N6pOlxsTO5qRUbjIMaFYnadQnWy4Tgv3j8gmSaNH-JIlxdDW",
    tag: "Sustainably Milled",
    spec: "63mm / 89mm Louvers",
  },
  {
    category: "Exterior Architecture",
    title: "Motorised External Zip-Screens",
    desc: "Heavy-duty architectural external blinds preventing 90% of solar heat gain prior to glass penetration. Marine-grade alloy cassettes.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_2Hzu3isBm-mcF84g3Sg9rL5aan2dhcvmLELE3TazbjPM0UDA7IQqkYR3xcZHrpptwKVhTI3MdKewV7kbfx638ZfDZvQohFCYPOIbv7IJ1iE2ilzMZnW3jkqrubcClKMhR_zI5zzseddKzhVKetUgN4bjU28d8nCFFz1a1wAPNaKe1j6tmHt4abIJxAK-Vx534yIPyfHt6T0gA91maq4Kk0hwA8DuYdws7aQwImQAKqniHyIRGzHa",
    tag: "Wind Tested to 120km/h",
    spec: "UV Protection 99%",
  },
  {
    category: "Smart Home Guild",
    title: "Concealed Motorisation Systems",
    desc: "Acoustically insulated brushless motors operating below 32dB. Lithium-ion solar trickle options and native Apple HomeKit integration.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMOFBGP8S9V9Ku6lWRWHVH_LldfKfpt8v_cJbvaBldZP-RfBXpJra5By7fBd67he2N2fpS2UBnvQ-miV0ldDf6tKlSqqctMD5XlSbsA9MYBC6vy5cWmm799NukjF7FxENXDyt0cr3gbh8ZdMqHiBkSqXDrWVU4wIhukoHoTJjyg2vAZhu2-N9zjDTVPkcz0pPzZkiukH5Rn33QCDwHwMlhTF7Wln2JRGVDocPenpMt-0yYwzZUanxh",
    tag: "Somfy & Matter",
    spec: "<32 dB Sound Signature",
  },
  {
    category: "Light Sculpting",
    title: "Light-Filtering Botanical Sheers",
    desc: "Delicately spun fibers blending Japanese mulberry, wild nettle, and organic flax that soften blinding afternoon glare into calming ambient glow.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBikXUAhzNhFtwbdJruyMRH9ctlhEZ_CwKXpJN2kIh5eg_rhT-aUsvVXo0_8n-OCuuoFksjsympeFCR3oyBPc5MI0bD1AdgiYlmD3hKYfQSnLhxOe8NidwGNvBj_iqQpuRj8E-a97Aguhe5ReuX5lLIrglieWowJv3eIRo1zhPKl1aBBaxbXc-c0JMmLVkoEodZ8dAGLY_GVRxEWX3QyNOU37Ya4xLFL3Bx4w3nKRJUeOTGF4GYvfmI",
    tag: "Woven Flax & Washi",
    spec: "Natural Slub Weave",
  },
];

export function ProductTransformShowcase({ onOpenBooking }: ProductTransformShowcaseProps) {
  const progressionRef = useRef<HTMLDivElement>(null);
  const productsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === progressionRef.current) {
              const cards = progressionRef.current?.children;
              if (cards) {
                animate(Array.from(cards), {
                  opacity: [0, 1],
                  translateY: [24, 0],
                  delay: stagger(100),
                  duration: 700,
                  ease: "outCubic",
                });
              }
            }

            if (entry.target === productsGridRef.current) {
              const items = productsGridRef.current?.children;
              if (items) {
                animate(Array.from(items), {
                  opacity: [0, 1],
                  translateY: [20, 0],
                  delay: stagger(70),
                  duration: 650,
                  ease: "outCubic",
                });
              }
            }
          }
        });
      },
      { threshold: 0.12 }
    );

    if (progressionRef.current) observer.observe(progressionRef.current);
    if (productsGridRef.current) observer.observe(productsGridRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-16 md:py-24 bg-[#f1f5f9]" id="products">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Progression Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#3b71ad]" />
            <span className="font-mono text-[10px] text-[#3b71ad] uppercase tracking-widest font-semibold">
              Artisanal Continuum
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0f172a] font-light tracking-tight">
              FABRIC → WINDOW → ROOM
            </h2>
            <p className="text-sm sm:text-base text-[#475569] max-w-md font-light leading-relaxed">
              From the raw tactile weave of pure Flanders flax to the micrometer-calibrated motorized track and the finished sensory sanctuary.
            </p>
          </div>
        </div>

        {/* 3-Stage Visual Progression Triptych */}
        <div ref={progressionRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {PROGRESSION_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow border border-[#e2e8f0]"
            >
              <div className="relative aspect-square overflow-hidden bg-[#e2e8f0]">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md font-mono text-[10px] uppercase tracking-widest text-[#0f172a] font-semibold shadow-xs">
                  {step.step}
                </div>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <h4 className="font-serif text-lg text-[#0f172a] font-medium">
                  {step.title}
                </h4>
                <p className="text-xs text-[#475569] font-light leading-relaxed">
                  {step.desc}
                </p>
                <div className="pt-3 flex items-center gap-2 font-mono text-[10px] text-[#64748b] font-medium border-t border-[#f1f5f9] mt-1">
                  {step.badge}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Curated Systems Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-mono text-[10px] text-[#64748b] uppercase tracking-widest font-semibold">
              Collections
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#0f172a] font-light mt-0.5">
              Curated Systems
            </h3>
          </div>
          <button
            onClick={onOpenBooking}
            className="font-mono text-[11px] uppercase text-[#3b71ad] hover:text-[#2d5b8f] tracking-wider flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>Full Catalog Specifications</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* 6 Curated Category Cards Grid */}
        <div ref={productsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CURATED_PRODUCTS.map((prod, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group border border-[#e2e8f0]"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e2e8f0]">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md font-mono text-[10px] uppercase text-[#0f172a] font-semibold shadow-xs">
                    {prod.tag}
                  </span>
                </div>
                <div className="p-6">
                  <span className="font-mono text-[10px] text-[#3b71ad] uppercase tracking-wider font-bold">
                    {prod.category}
                  </span>
                  <h4 className="font-serif text-lg text-[#0f172a] font-medium mt-1">
                    {prod.title}
                  </h4>
                  <p className="text-xs text-[#475569] font-light leading-relaxed mt-2">
                    {prod.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-[#f1f5f9]">
                <span className="font-mono text-[10px] text-[#64748b] uppercase font-semibold">
                  {prod.spec}
                </span>
                <button
                  onClick={onOpenBooking}
                  className="font-mono text-[11px] text-[#3b71ad] hover:text-[#2d5b8f] uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold cursor-pointer"
                >
                  Explore Range →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
