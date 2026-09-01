"use client";

import React, { useState } from "react";
import { Sparkles, ShieldCheck, Sun, Layers, Droplets, Check, ArrowRight } from "lucide-react";

interface FabricOption {
  id: string;
  name: string;
  origin: string;
  composition: string;
  weight: string;
  soundAbsorption: string;
  thermalRValue: string;
  lightBlockout: string;
  colorHex: string;
  accentGlow: string;
  description: string;
}

const FABRICS: FabricOption[] = [
  {
    id: "cashmere-velvet",
    name: "St. Moritz Cashmere Velvet",
    origin: "Biella, Italy",
    composition: "65% Virgin Wool, 35% Cashmere Blend",
    weight: "680 g/m²",
    soundAbsorption: "NRC 0.92 (Master Acoustic)",
    thermalRValue: "R-4.8 (High Alpine Rating)",
    lightBlockout: "99.9% Total Optical Blackout",
    colorHex: "#d6c7b2",
    accentGlow: "rgba(214, 199, 178, 0.4)",
    description:
      "Engineered for high-altitude thermal retention and cinema-grade light occlusion with a sumptuous, warm matte nap."
  },
  {
    id: "belgian-linen",
    name: "Flanders Raw Structured Linen",
    origin: "Kortrijk, Belgium",
    composition: "100% Organic Long-Staple Flax",
    weight: "440 g/m²",
    soundAbsorption: "NRC 0.74 (Ambient Dampening)",
    thermalRValue: "R-3.2 (Solar Deflection)",
    lightBlockout: "85% Soft Diffused Luminescence",
    colorHex: "#e3dad0",
    accentGlow: "rgba(227, 218, 208, 0.4)",
    description:
      "Textured organic weave allowing warm daylight to filter through with soft sculptural pleat memory."
  },
  {
    id: "slate-monolith",
    name: "Monolith Slate Acoustic Weave",
    origin: "Lyon, France",
    composition: "50% Silk Modal, 50% Recycled Poly-Acoustic",
    weight: "520 g/m²",
    soundAbsorption: "NRC 0.88 (Echo Elimination)",
    thermalRValue: "R-4.0 (Metallized Backing)",
    lightBlockout: "99.5% Blackout",
    colorHex: "#3d4047",
    accentGlow: "rgba(90, 96, 108, 0.5)",
    description:
      "A deep charcoal micro-grain textile bonded with an ultra-thin vapor-deposited thermal barrier for modern brutalist interiors."
  },
  {
    id: "alpine-boucle",
    name: "Engadin Chunky Bouclé",
    origin: "Graubünden, Switzerland",
    composition: "80% Alpine Wool, 20% Silk Filament",
    weight: "610 g/m²",
    soundAbsorption: "NRC 0.89 (High Frequency Trap)",
    thermalRValue: "R-4.4 (Sub-Zero Barrier)",
    lightBlockout: "98.0% Architectural Shading",
    colorHex: "#f0ede6",
    accentGlow: "rgba(240, 237, 230, 0.4)",
    description:
      "A rich, three-dimensional tactile loop construction providing natural warmth and architectural softness."
  }
];

export function FabricCustomizer() {
  const [selectedId, setSelectedId] = useState<string>("cashmere-velvet");
  const selectedFabric = FABRICS.find((f) => f.id === selectedId) || FABRICS[0];

  return (
    <section id="fabric-customizer" className="relative py-28 px-4 sm:px-8 bg-[#08090d] border-t border-white/5 overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-500/30 text-[11px] font-mono tracking-widest text-amber-300 uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            MATERIAL ATELIER
          </div>

          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-6">
            Haute Couture Textiles. <br />
            <span className="gold-gradient-text font-serif italic">Precision Acoustic Performance.</span>
          </h2>

          <p className="text-base text-zinc-400 font-normal leading-relaxed">
            Choose from artisanal heritage weaves sourced from Northern Italy, Belgium, and the Swiss Alps, each tailored with bonded thermal-acoustic backings.
          </p>
        </div>

        {/* Interactive Customizer Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Swatches Column */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
              Select Architectural Textile
            </span>

            {FABRICS.map((fabric) => {
              const isSelected = fabric.id === selectedId;
              return (
                <button
                  key={fabric.id}
                  onClick={() => setSelectedId(fabric.id)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                    isSelected
                      ? "glass-panel bg-white/[0.08] border-amber-400/80 shadow-xl shadow-amber-400/5 translate-x-2"
                      : "glass-panel border-white/5 hover:border-white/20 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Color Swatch Circle */}
                    <div
                      className="w-10 h-10 rounded-full border-2 border-white/20 shadow-inner flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: fabric.colorHex }}
                    >
                      {isSelected && (
                        <Check className="w-4 h-4 text-black drop-shadow" />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">
                        {fabric.name}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {fabric.origin} • {fabric.weight}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-amber-300">
                    {isSelected ? "Active" : "View"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Fabric Specimen Card */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl backdrop-blur-2xl">
              
              {/* Dynamic Textile Glow */}
              <div
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700"
                style={{ backgroundColor: selectedFabric.accentGlow }}
              />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                    SPECIFICATION PROFILE // {selectedFabric.origin}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light text-white mt-1">
                    {selectedFabric.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-zinc-300">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedFabric.colorHex }}
                  />
                  <span>Swatch Code #{selectedFabric.id.slice(0, 6).toUpperCase()}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed my-6">
                {selectedFabric.description}
              </p>

              {/* Technical Data Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                    Composition
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-zinc-200 font-medium">
                    {selectedFabric.composition}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                    Sound Dampening
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-emerald-300 font-medium">
                    {selectedFabric.soundAbsorption}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                    Thermal Rating
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-amber-300 font-medium">
                    {selectedFabric.thermalRValue}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                    Optical Density
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-sky-300 font-medium">
                    {selectedFabric.lightBlockout}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                    Fabric Mass
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-zinc-200 font-medium">
                    {selectedFabric.weight}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                    Fire Classification
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-zinc-200 font-medium">
                    Class A / NFPA 701
                  </span>
                </div>
              </div>

              {/* Sample Box CTA */}
              <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <Droplets className="w-5 h-5 text-amber-400 shrink-0 hidden sm:block" />
                  <span className="text-xs text-amber-200 font-mono">
                    Complimentary physical sample binder dispatched to registered architects.
                  </span>
                </div>

                <a
                  href="#space-estimator"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-black font-mono text-xs font-semibold tracking-wider uppercase hover:bg-amber-300 transition-colors shrink-0"
                >
                  Configure In Space
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
