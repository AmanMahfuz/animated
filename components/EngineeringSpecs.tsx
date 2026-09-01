"use client";

import React from "react";
import { 
  Zap, 
  ShieldCheck, 
  Sliders, 
  VolumeX, 
  Cpu, 
  Maximize, 
  Layers, 
  Activity,
  CheckCircle2
} from "lucide-react";

const SPECS = [
  {
    icon: VolumeX,
    tag: "ACOUSTIC SILENCE",
    title: "Sub-18dB Whisper Drive",
    description:
      "Swiss-engineered magnetic levitation track geometry isolates vibration from structural beams, resulting in near-silent operation imperceptible to the human ear.",
    highlight: "< 18 dBA Sound Pressure"
  },
  {
    icon: Cpu,
    tag: "CIRCADIAN INTELLIGENCE",
    title: "Solar Azimuth & Lux Sync",
    description:
      "Autonomous onboard microcontrollers calculate real-time sun altitude and indoor solar gain, adjusting drape closure angles dynamically throughout the seasonal cycle.",
    highlight: "100% Autonomous Tracking"
  },
  {
    icon: Maximize,
    tag: "CONCEALED ARCHITECTURE",
    title: "Zero-Profile Pocket Integration",
    description:
      "Fully recessed into structural ceiling pockets with a minimal 14mm hairline shadow gap. Power, data, and motor housing remain completely invisible.",
    highlight: "14mm Architectural Reveal"
  },
  {
    icon: Layers,
    tag: "THERMAL MATRIX",
    title: "Triple-Pass Acoustic Weave",
    description:
      "Combines natural European linen, high-density modal, and an ultra-thin metallized thermal barrier providing R-4.2 insulation and 0.85 NRC sound absorption.",
    highlight: "0.85 Noise Reduction (NRC)"
  }
];

const INTEGRATIONS = [
  "Apple HomeKit Native",
  "Lutron HomeWorks QSX",
  "Matter / Thread Protocol",
  "KNX Architectural Bus",
  "Control4 Certified",
  "Crestron Home OS"
];

export function EngineeringSpecs() {
  return (
    <section id="architectural-specs" className="relative py-28 px-4 sm:px-8 bg-[#060709] border-t border-white/5 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-500/30 text-[11px] font-mono tracking-widest text-amber-300 uppercase mb-4">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            SWISS ARCHITECTURAL ENGINEERING
          </div>

          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-6">
            Engineered for Silence. <br />
            <span className="gold-gradient-text font-serif italic">Crafted for Sanctuary.</span>
          </h2>

          <p className="text-base text-zinc-400 font-normal leading-relaxed">
            Every millimeter of the Aura Drapery System is designed to integrate invisibly into world-class residential architecture while delivering unrivaled acoustic and thermal performance.
          </p>
        </div>

        {/* 4-Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {SPECS.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <div
                key={i}
                className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-white/[0.02] rounded-bl-full pointer-events-none group-hover:bg-amber-400/[0.04] transition-colors" />

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-6 text-amber-300 group-hover:scale-110 group-hover:bg-amber-400/20 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-semibold">
                    {spec.tag}
                  </span>

                  <h3 className="text-xl font-light text-white mt-1 mb-3">
                    {spec.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {spec.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-300 font-semibold tracking-wide">
                    {spec.highlight}
                  </span>
                  <Activity className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Smart Home Integrations Bar */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col max-w-md text-center lg:text-left">
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest mb-1">
              PROTOCOL CERTIFICATION
            </span>
            <h4 className="text-xl font-light text-white">
              Native Integration with Leading Ecosystems
            </h4>
            <p className="text-xs text-zinc-400 mt-2">
              Instant pairing with building management systems via dual 2.4GHz Thread mesh and isolated RS485 dry contact bus.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            {INTEGRATIONS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/5 text-xs font-mono text-zinc-300 hover:text-white hover:border-amber-400/30 transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
