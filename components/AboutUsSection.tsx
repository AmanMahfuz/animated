"use client";

import React, { useEffect, useRef } from "react";
import { Check, ShieldCheck, Award, ThumbsUp, Sparkles, Building, Home, Hammer, RefreshCw } from "lucide-react";
import { animate, stagger } from "animejs";

interface AboutUsSectionProps {
  onOpenBooking?: () => void;
}

const PROPERTY_SOLUTIONS = [
  {
    title: "New Builds",
    desc: "Complete your new architectural home with custom window furnishings designed and wired to fit perfectly from day one.",
    icon: Home,
    tag: "Pre-construction Wiring"
  },
  {
    title: "Renovations",
    desc: "Refresh your living spaces with modern curtains, blinds, and plantation shutters that elevate style, airflow, and comfort.",
    icon: RefreshCw,
    tag: "Retrofit & Upgrade"
  },
  {
    title: "Luxury Homes",
    desc: "Premium natural textiles, tailored double-height S-fold drops, and whisper-silent motorisation for prestigious residences.",
    icon: Sparkles,
    tag: "Bespoke Specification"
  },
  {
    title: "Commercial Spaces",
    desc: "Heavy-duty commercial fire-rated solar fabrics and motorized systems for executive offices, boutique hospitality, and retail.",
    icon: Building,
    tag: "Commercial Grade"
  }
];

const WHY_CHOOSE_US = [
  {
    title: "10+ Years Local QLD Experience",
    desc: "Deep expertise in custom shading engineered specifically for Queensland's intense sun, humidity, and coastal weather."
  },
  {
    title: "Fully Licensed & Insured Installers",
    desc: "Certified master technicians who guarantee spotless, millimeter-accurate fitting on every window opening."
  },
  {
    title: "5-Star Rated Google Reputation",
    desc: "Over 69+ verified 5-star reviews from satisfied homeowners across Brisbane, Moreton Bay, and the Sunshine Coast."
  },
  {
    title: "Custom Made to Measure",
    desc: "Every drape, blind, and shutter is custom-milled to your exact window dimensions with zero compromises."
  }
];

export function AboutUsSection({ onOpenBooking }: AboutUsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const stat4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger pillars
            if (pillarsRef.current) {
              const cards = pillarsRef.current.children;
              animate(Array.from(cards), {
                opacity: [0, 1],
                translateY: [24, 0],
                delay: stagger(100),
                duration: 700,
                ease: "outCubic",
              });
            }

            // Stagger solutions
            if (solutionsRef.current) {
              const solCards = solutionsRef.current.children;
              animate(Array.from(solCards), {
                opacity: [0, 1],
                translateY: [20, 0],
                delay: stagger(80, { start: 150 }),
                duration: 650,
                ease: "outCubic",
              });
            }

            // Animate Stats Numbers
            const countObj = { s1: 0, s2: 0, s3: 0, s4: 0 };
            animate(countObj, {
              s1: 10,
              s2: 69,
              s3: 100,
              s4: 280,
              duration: 1400,
              ease: "outCubic",
              onUpdate: () => {
                if (stat1Ref.current) stat1Ref.current.textContent = `${Math.round(countObj.s1)}+`;
                if (stat2Ref.current) stat2Ref.current.textContent = `${Math.round(countObj.s2)}+`;
                if (stat3Ref.current) stat3Ref.current.textContent = `${Math.round(countObj.s3)}%`;
                if (stat4Ref.current) stat4Ref.current.textContent = `${Math.round(countObj.s4)}+`;
              },
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-[#f8fafc]" id="about-us">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#3b71ad]" />
              <span className="font-mono text-[10px] text-[#3b71ad] uppercase tracking-widest font-semibold">
                Brisbane &amp; Sunshine Coast Specialists
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0f172a] font-light tracking-tight">
              REFRESH YOUR SPACE WITH <br className="hidden sm:inline" />
              <span className="italic font-serif text-[#3b71ad]">BESPOKE WINDOW SOLUTIONS</span>
            </h2>
            <p className="text-sm sm:text-base text-[#475569] mt-3 font-light leading-relaxed">
              Looking for high-quality window furnishings that local homeowners and businesses trust? We specialise in delivering custom window furnishings — combining style, functionality, and durability designed specifically for the unique demands of the Queensland climate.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
            <div className="px-4 py-2 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="font-mono text-[11px] text-[#0f172a] uppercase font-semibold">
                Designed for Queensland Living
              </span>
            </div>
            <div className="px-4 py-2 rounded-full bg-[#ebf3fc] border border-[#80a8d8]/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3b71ad]" />
              <span className="font-mono text-[11px] text-[#1e3a63] uppercase font-semibold">
                Mobile Showroom Service
              </span>
            </div>
          </div>
        </div>

        {/* Live Animated Numbers Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 p-6 sm:p-8 rounded-3xl bg-white border border-[#e2e8f0] shadow-xs">
          <div className="flex flex-col items-center sm:items-start border-r border-[#f1f5f9] last:border-none pr-4">
            <span ref={stat1Ref} className="font-serif text-3xl sm:text-4xl text-[#3b71ad] font-bold">10+</span>
            <span className="font-mono text-[10px] text-[#64748b] uppercase tracking-wider mt-1">Years QLD Experience</span>
          </div>
          <div className="flex flex-col items-center sm:items-start border-r border-[#f1f5f9] last:border-none pr-4">
            <span ref={stat2Ref} className="font-serif text-3xl sm:text-4xl text-[#e86b73] font-bold">69+</span>
            <span className="font-mono text-[10px] text-[#64748b] uppercase tracking-wider mt-1">5-Star Google Reviews</span>
          </div>
          <div className="flex flex-col items-center sm:items-start border-r border-[#f1f5f9] last:border-none pr-4">
            <span ref={stat3Ref} className="font-serif text-3xl sm:text-4xl text-[#3b71ad] font-bold">100%</span>
            <span className="font-mono text-[10px] text-[#64748b] uppercase tracking-wider mt-1">Perfect Fit Guarantee</span>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <span ref={stat4Ref} className="font-serif text-3xl sm:text-4xl text-[#0f172a] font-bold">280+</span>
            <span className="font-mono text-[10px] text-[#64748b] uppercase tracking-wider mt-1">Curated Fabric Weaves</span>
          </div>
        </div>

        {/* 3 Value Pillars Hero Banner */}
        <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#ebf3fc] text-[#3b71ad] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#0f172a] font-medium mb-2">
                Designed for QLD Living
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] font-light leading-relaxed">
                UV-stabilized fabrics, thermal blockout backings, and corrosion-resistant hardware engineered to withstand tropical storms and high solar heat.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#f1f5f9] font-mono text-[10px] text-[#3b71ad] uppercase font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b71ad]" />
              Tropical UV Protection
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#fdf0f1] text-[#e86b73] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#0f172a] font-medium mb-2">
                Professionally Measured
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] font-light leading-relaxed">
                We bring our mobile showroom to your home or site with hundreds of fabric samples, taking millimeter-accurate laser dimensions on site.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#f1f5f9] font-mono text-[10px] text-[#e86b73] uppercase font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e86b73]" />
              100% Perfect Fit Guarantee
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#e2e8f0] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#ebf3fc] text-[#3b71ad] flex items-center justify-center mb-4">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#0f172a] font-medium mb-2">
                Expertly Installed
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] font-light leading-relaxed">
                Clean, efficient installation by experienced licensed professionals who take pride in leaving your home spotless and your curtains perfectly dressed.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#f1f5f9] font-mono text-[10px] text-[#3b71ad] uppercase font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b71ad]" />
              Fully Licensed &amp; Insured
            </div>
          </div>
        </div>

        {/* Tailored Solutions for Every Property */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="font-mono text-[10px] text-[#64748b] uppercase tracking-widest font-semibold">
              Tailored Scope
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#0f172a] font-light mt-1">
              Solutions For Every Property
            </h3>
          </div>

          <div ref={solutionsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROPERTY_SOLUTIONS.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#f1f5f9] text-[#3b71ad] group-hover:bg-[#ebf3fc] transition-colors flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[9px] text-[#3b71ad] uppercase font-bold tracking-wider">
                      {sol.tag}
                    </span>
                    <h4 className="font-serif text-lg text-[#0f172a] font-medium mt-1 mb-2">
                      {sol.title}
                    </h4>
                    <p className="text-xs text-[#475569] font-light leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Brisbane Window Furnishings Grid */}
        <div className="bg-[#f1f5f9] p-8 sm:p-12 rounded-3xl border border-[#e2e8f0]">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-[10px] text-[#3b71ad] uppercase tracking-widest font-semibold">
              The BWF Advantage
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#0f172a] font-light mt-1">
              Why Homeowners &amp; Builders Choose Us
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3.5 bg-white p-6 rounded-2xl border border-[#e2e8f0]">
                <div className="w-6 h-6 rounded-full bg-[#3b71ad] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-medium text-[#0f172a]">{item.title}</h4>
                  <p className="text-xs text-[#475569] font-light mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#475569] font-light">
              Servicing Brisbane, Moreton Bay, Sunshine Coast &amp; Gold Coast.
            </div>
            <button
              onClick={onOpenBooking}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#3b71ad] to-[#4c84c4] text-white hover:from-[#2d5b8f] hover:to-[#3b71ad] font-mono text-xs uppercase font-bold transition-all cursor-pointer shadow-sm shadow-[#3b71ad]/25"
            >
              Request Free Measure &amp; Quote
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
