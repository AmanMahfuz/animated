"use client";

import React from "react";
import { Check, ShieldCheck, Award, ThumbsUp, Sparkles, Building, Home, Hammer, RefreshCw } from "lucide-react";

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
  return (
    <section className="w-full py-16 md:py-24 bg-[#fbf9f6]" id="about-us">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#7c572d]" />
              <span className="font-mono text-[10px] text-[#7c572d] uppercase tracking-widest font-semibold">
                Brisbane &amp; Sunshine Coast Specialists
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1b1c1a] font-light tracking-tight">
              REFRESH YOUR SPACE WITH <br className="hidden sm:inline" />
              <span className="italic font-serif text-[#7c572d]">BESPOKE WINDOW SOLUTIONS</span>
            </h2>
            <p className="text-sm sm:text-base text-[#50453b] mt-3 font-light leading-relaxed">
              Looking for high-quality window furnishings that local homeowners and businesses trust? We specialise in delivering custom window furnishings — combining style, functionality, and durability designed specifically for the unique demands of the Queensland climate.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
            <div className="px-4 py-2 rounded-full bg-[#eae8e5] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0d6c43]" />
              <span className="font-mono text-[11px] text-[#1b1c1a] uppercase font-semibold">
                Designed for Queensland Living
              </span>
            </div>
            <div className="px-4 py-2 rounded-full bg-[#eae8e5] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7c572d]" />
              <span className="font-mono text-[11px] text-[#1b1c1a] uppercase font-semibold">
                Mobile Showroom Service
              </span>
            </div>
          </div>
        </div>

        {/* 3 Value Pillars Hero Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#d4a574]/15 text-[#7c572d] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#1b1c1a] font-medium mb-2">
                Designed for QLD Living
              </h3>
              <p className="text-xs sm:text-sm text-[#50453b] font-light leading-relaxed">
                UV-stabilized fabrics, thermal blockout backings, and corrosion-resistant hardware engineered to withstand tropical storms and high solar heat.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#efeeeb] font-mono text-[10px] text-[#7c572d] uppercase font-semibold">
              Tropical UV Protection
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#d4a574]/15 text-[#7c572d] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#1b1c1a] font-medium mb-2">
                Professionally Measured
              </h3>
              <p className="text-xs sm:text-sm text-[#50453b] font-light leading-relaxed">
                We bring our mobile showroom to your home or site with hundreds of fabric samples, taking millimeter-accurate laser dimensions on site.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#efeeeb] font-mono text-[10px] text-[#7c572d] uppercase font-semibold">
              100% Perfect Fit Guarantee
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#d4a574]/15 text-[#7c572d] flex items-center justify-center mb-4">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#1b1c1a] font-medium mb-2">
                Expertly Installed
              </h3>
              <p className="text-xs sm:text-sm text-[#50453b] font-light leading-relaxed">
                Clean, efficient installation by experienced licensed professionals who take pride in leaving your home spotless and your curtains perfectly dressed.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#efeeeb] font-mono text-[10px] text-[#7c572d] uppercase font-semibold">
              Fully Licensed &amp; Insured
            </div>
          </div>
        </div>

        {/* Tailored Solutions for Every Property */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="font-mono text-[10px] text-[#827569] uppercase tracking-widest font-semibold">
              Tailored Scope
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1b1c1a] font-light mt-1">
              Solutions For Every Property
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROPERTY_SOLUTIONS.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-[#e4e2df] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#f5f3f0] text-[#7c572d] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[9px] text-[#7c572d] uppercase font-bold tracking-wider">
                      {sol.tag}
                    </span>
                    <h4 className="font-serif text-lg text-[#1b1c1a] font-medium mt-1 mb-2">
                      {sol.title}
                    </h4>
                    <p className="text-xs text-[#50453b] font-light leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Brisbane Window Furnishings Grid */}
        <div className="bg-[#f5f3f0] p-8 sm:p-12 rounded-3xl border border-[#e4e2df]">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-[10px] text-[#7c572d] uppercase tracking-widest font-semibold">
              The BWF Advantage
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1b1c1a] font-light mt-1">
              Why Homeowners &amp; Builders Choose Us
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3.5 bg-white p-6 rounded-2xl border border-[#e4e2df]">
                <div className="w-6 h-6 rounded-full bg-[#7c572d] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-medium text-[#1b1c1a]">{item.title}</h4>
                  <p className="text-xs text-[#50453b] font-light mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-[#e4e2df] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#50453b] font-light">
              Servicing Brisbane, Moreton Bay, Sunshine Coast &amp; Gold Coast.
            </div>
            <button
              onClick={onOpenBooking}
              className="px-7 py-3 rounded-full bg-[#d4a574] text-[#2c1700] hover:bg-[#7c572d] hover:text-white font-mono text-xs uppercase font-bold transition-colors cursor-pointer shadow-sm"
            >
              Request Free Measure &amp; Quote
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
