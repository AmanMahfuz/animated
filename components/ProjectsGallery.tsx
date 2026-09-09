"use client";

import React, { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface ProjectsGalleryProps {
  onOpenBooking?: () => void;
}

interface ProjectItem {
  id: string;
  category: "all" | "curtains" | "blinds" | "shutters" | "motorised";
  commission: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
  colSpan: "col7" | "col5";
  specs: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "carseldine-curtains",
    category: "curtains",
    commission: "Recent Installation • Carseldine, Brisbane",
    title: "Dual Curtains @ Carseldine Brisbane",
    desc: "Ceiling-recessed double S-Fold track combining textured Belgian sheer linen with 100% acoustic blackout curtains for sun-drenched Queensland living.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1ex0TK93s-ovJOWjFruruRaxEPKERJD7KEb2e-blvaKLKm-DrrBScbQRk9PiTYerpevWEwffDHpUK45FfcIaKD5aq4j3xO1r-v4Qxjpns7s4RAkXBwtcSlG1QVC47CW27sYOtIbBxAh2Ma9SMe0WBGfRYAPEKcTleM-hxkFLMpDTysXHp36cXZYlJmp7ITd98_xc3ZtwHJm838OYF3lD9YYisyYECVnlNOAi28kfEy8uAVDiV-C5I",
    alt: "Dual Curtains installation in Carseldine Brisbane",
    colSpan: "col7",
    specs: "Type: S-Fold Sheers & Blackout • Drop: 3.2m • Track: White Recessed",
  },
  {
    id: "figtree-honeycomb",
    category: "motorised",
    commission: "Recent Installation • Figtree Pocket, Brisbane",
    title: "Motorised Honeycomb Blinds @ Figtree Pocket",
    desc: "Automated Duette® cellular blinds integrated with smart home voice scenes, eliminating solar heat transfer on expansive west-facing glass.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGDmhuFqdJfTWCnuR9BmKLCid_YGkM_fdGfvRrEZYo1utT6fRSDYqDKpmr_HYekmgspyy1yl7v957bu6wmhCDS0zOLV7svLmNI4Y7EcpYJk9rZVKoSZ_7UOlu-bkbQEawxTEN6qqJzMdc0kdmMa14bm1LArDO7PCJ9Ob4U1bww9v9u0TTrimwZXqQNSvXdb0JruB-pz5YsR0LjoxlP4PfFT3AZ8xdLGnONc4VL2s0_cJL5OwQ5EbOm",
    alt: "Motorised Honeycomb blinds in Figtree Pocket Brisbane",
    colSpan: "col5",
    specs: "Type: Duette® Cellular • Control: Somfy WireFree & Alexa",
  },
  {
    id: "caboolture-shutters",
    category: "shutters",
    commission: "Recent Installation • Caboolture, Brisbane",
    title: "Plantation Shutters @ Caboolture Brisbane",
    desc: "Custom-fitted timber plantation shutters with clearview hidden tilt-rods, providing timeless aesthetic elegance and maximum tropical ventilation.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrSGqYlUNiHJ1PxJG4MujSSJGQLhXYX_qRlBL0aTDuH0fOjlT5iSOvZugERWAGrtjJE5T1FM3Bfr0pqSYzJqpCYnrZq6SLSMrHCiWCQbLNzAR513oqT2WfKdQqToq7g4cSXk3lU_nXploxfDfjgpVFB1SyU1eLNSEPw1iSr-NQGBetpHFUeMlpP86y91wfAtDOOHm9N6pOlxsTO5qRUbjIMaFYnadQnWy4Tgv3j8gmSaNH-JIlxdDW",
    alt: "Plantation Shutters in Caboolture Brisbane",
    colSpan: "col5",
    specs: "Material: Paulownia Hardwood • Louver: 89mm Clearview",
  },
  {
    id: "bridgeman-sheers",
    category: "curtains",
    commission: "Recent Installation • Bridgeman Downs, Brisbane",
    title: "Sheer Curtains @ Bridgeman Downs",
    desc: "Floor-to-ceiling sheer voiles diffusing harsh Queensland sun into calming ambient light across open-plan architectural living spaces.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBikXUAhzNhFtwbdJruyMRH9ctlhEZ_CwKXpJN2kIh5eg_rhT-aUsvVXo0_8n-OCuuoFksjsympeFCR3oyBPc5MI0bD1AdgiYlmD3hKYfQSnLhxOe8NidwGNvBj_iqQpuRj8E-a97Aguhe5ReuX5lLIrglieWowJv3eIRo1zhPKl1aBBaxbXc-c0JMmLVkoEodZ8dAGLY_GVRxEWX3QyNOU37Ya4xLFL3Bx4w3nKRJUeOTGF4GYvfmI",
    alt: "Sheer Curtains in Bridgeman Downs Brisbane",
    colSpan: "col7",
    specs: "Fabric: Natural Slub Linen Voile • Heading: S-Fold Wave",
  },
];

export function ProjectsGallery({ onOpenBooking }: ProjectsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const galleryGridRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const filteredProjects = activeCategory === "all"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && galleryGridRef.current) {
            const cards = galleryGridRef.current.children;
            if (cards.length > 0) {
              animate(Array.from(cards), {
                opacity: [0, 1],
                translateY: [24, 0],
                delay: stagger(80),
                duration: 650,
                ease: "outCubic",
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (galleryGridRef.current) {
      observer.observe(galleryGridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (galleryGridRef.current) {
      const cards = galleryGridRef.current.children;
      if (cards.length > 0) {
        animate(Array.from(cards), {
          opacity: [0.2, 1],
          scale: [0.97, 1],
          translateY: [12, 0],
          delay: stagger(60),
          duration: 500,
          ease: "outCubic",
        });
      }
    }
  }, [activeCategory]);

  return (
    <section className="w-full py-16 md:py-24 bg-[#f8fafc]" id="projects">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#3b71ad]" />
              <span className="font-mono text-[10px] text-[#3b71ad] uppercase tracking-widest font-semibold">
                Recent Projects Across Brisbane
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0f172a] font-light tracking-tight">
              WINDOWS AS FRAMES
            </h2>
            <p className="text-sm sm:text-base text-[#475569] mt-2 font-light max-w-xl leading-relaxed">
              We've completed stunning window furnishings installations across homes, renovations, and luxury residences in Brisbane &amp; the Sunshine Coast.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { id: "all", name: "All Projects" },
              { id: "curtains", name: "Curtains" },
              { id: "blinds", name: "Blinds" },
              { id: "shutters", name: "Shutters" },
              { id: "motorised", name: "Motorised" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[10px] sm:text-[11px] uppercase font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#3b71ad] text-white shadow-xs shadow-[#3b71ad]/30"
                    : "bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] border border-[#e2e8f0]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Bento Gallery Grid */}
        <div ref={galleryGridRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {filteredProjects.map((proj) => {
            const isCol7 = proj.colSpan === "col7";
            return (
              <div
                key={proj.id}
                onClick={onOpenBooking}
                className={`group relative rounded-2xl overflow-hidden shadow-md bg-[#e2e8f0] cursor-pointer ${
                  isCol7 ? "md:col-span-7" : "md:col-span-5"
                }`}
              >
                <div className="aspect-[4/3] sm:aspect-[16/11] md:aspect-auto md:h-[500px] w-full overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Reveal Overlay on Hover / Mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/45 to-transparent p-5 sm:p-8 flex flex-col justify-end text-white transition-opacity duration-300">
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#cbe0f8] uppercase tracking-widest font-semibold">
                    {proj.commission}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white mt-1 font-light leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg mt-1.5 sm:mt-2 font-light leading-relaxed">
                    {proj.desc}
                  </p>
                  <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono text-[#80a8d8] border-t border-white/15 mt-2 sm:mt-3">
                    {proj.specs}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
