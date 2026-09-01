"use client";

import React from "react";
import { Compass, ArrowUpRight, MapPin, Eye, Building2 } from "lucide-react";

const PROJECTS = [
  {
    title: "The Corvatsch Alpine Penthouse",
    location: "St. Moritz, Switzerland",
    architect: "Studio Graubünden",
    year: "2025",
    aperture: "14.8m Continuous Curved Glazing",
    fabric: "St. Moritz Cashmere Velvet (Warm Oatmeal)",
    tag: "High Alpine Residence"
  },
  {
    title: "Villa Smeralda Lakefront",
    location: "Lake Como, Italy",
    architect: "Lombardi Architettura",
    year: "2025",
    aperture: "18.2m Triple-Height Glass Facade",
    fabric: "Flanders Raw Structured Linen (Natural Flax)",
    tag: "Historic Waterfront"
  },
  {
    title: "Aspen Shadow Ridge Sanctuary",
    location: "Aspen, Colorado",
    architect: "Peak Modernist Collective",
    year: "2026",
    aperture: "12.0m Motorized Corner Glazing",
    fabric: "Engadin Chunky Bouclé (Alabaster)",
    tag: "Alpine Modern"
  },
  {
    title: "Aoyama Monolith Sky Suite",
    location: "Tokyo, Japan",
    architect: "Kengo Takahashi Works",
    year: "2026",
    aperture: "9.5m Minimalist Ribbon Aperture",
    fabric: "Monolith Slate Acoustic Weave (Charcoal)",
    tag: "Metropolitan High-Rise"
  }
];

export function InstallationsGallery() {
  return (
    <section id="installations" className="relative py-28 px-4 sm:px-8 bg-[#08090d] border-t border-white/5 overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-500/30 text-[11px] font-mono tracking-widest text-amber-300 uppercase mb-4">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              GLOBAL PORTFOLIO
            </div>

            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
              Selected Private <br />
              <span className="gold-gradient-text font-serif italic">Architectural Commissions.</span>
            </h2>
          </div>

          <p className="text-sm text-zinc-400 max-w-md font-normal leading-relaxed">
            Installed in the world’s most demanding private residences, where acoustic perfection and total visual refinement are uncompromising requirements.
          </p>
        </div>

        {/* 2x2 Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((proj, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-amber-400/40 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle gold hover glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300 uppercase tracking-widest">
                    {proj.tag}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    {proj.year}
                  </span>
                </div>

                <h3 className="text-2xl font-light text-white mb-2 group-hover:text-amber-200 transition-colors">
                  {proj.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mb-6">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{proj.location}</span>
                  <span className="text-zinc-600">•</span>
                  <span>{proj.architect}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col gap-2 font-mono text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span className="text-zinc-500">Glazing Span:</span>
                  <span className="text-zinc-200 font-medium">{proj.aperture}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span className="text-zinc-500">Specified Textile:</span>
                  <span className="text-amber-300 font-medium">{proj.fabric}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
