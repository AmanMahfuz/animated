"use client";

import React from "react";
import { ArrowUpRight, ShieldCheck, Download, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#040507] border-t border-white/10 pt-20 pb-12 px-4 sm:px-8 text-zinc-400 font-normal">
      <div className="max-w-7xl mx-auto">
        
        {/* Top CTA Banner */}
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-white/10 mb-20 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest mb-2 block">
              ARCHITECTURAL PARTNERSHIP
            </span>
            <h3 className="text-2xl sm:text-4xl font-light text-white mb-3">
              Integrate Aura into your next commission.
            </h3>
            <p className="text-sm text-zinc-400">
              Direct access to our Swiss engineering team, dedicated CAD drafting desk, and tailored physical textile sample library.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#space-estimator"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-mono text-xs font-bold uppercase tracking-wider text-center hover:opacity-95 transition-opacity"
            >
              Configure Schedule
            </a>
            <button
              onClick={scrollToTop}
              className="px-6 py-3.5 rounded-full glass-panel border border-white/10 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Back To Top
            </button>
          </div>
        </div>

        {/* 4 Columns Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10 text-xs">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-lg glass-panel border border-amber-400/40 flex items-center justify-center">
                <span className="text-amber-400 font-serif font-bold text-xs">A</span>
              </div>
              <span className="text-sm font-semibold tracking-[0.25em] text-white uppercase">
                A U R A
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed max-w-sm mb-6">
              Precision automated architectural drapery and circadian living systems for high-altitude villas and luxury residences worldwide.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>10-Year Comprehensive Motor Warranty</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-white text-xs uppercase tracking-wider mb-4">
              Engineering
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#architectural-specs" className="hover:text-amber-400 transition-colors">MagLev Track Profile</a></li>
              <li><a href="#architectural-specs" className="hover:text-amber-400 transition-colors">Circadian Solar Sync</a></li>
              <li><a href="#architectural-specs" className="hover:text-amber-400 transition-colors">Acoustic Decibel Data</a></li>
              <li><a href="#architectural-specs" className="hover:text-amber-400 transition-colors">Matter & KNX Bus</a></li>
              <li><a href="#architectural-specs" className="hover:text-amber-400 transition-colors">Recessed Pockets</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-white text-xs uppercase tracking-wider mb-4">
              Textiles
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#fabric-customizer" className="hover:text-amber-400 transition-colors">St. Moritz Cashmere</a></li>
              <li><a href="#fabric-customizer" className="hover:text-amber-400 transition-colors">Belgian Raw Linen</a></li>
              <li><a href="#fabric-customizer" className="hover:text-amber-400 transition-colors">Slate Monolith Weave</a></li>
              <li><a href="#fabric-customizer" className="hover:text-amber-400 transition-colors">Engadin Alpine Bouclé</a></li>
              <li><a href="#fabric-customizer" className="hover:text-amber-400 transition-colors">Sample Binder Box</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-white text-xs uppercase tracking-wider mb-4">
              Ateliers
            </h4>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li className="text-zinc-300">Zurich • Bahnhofstrasse 42</li>
              <li className="text-zinc-300">Milan • Via Montenapoleone 18</li>
              <li className="text-zinc-300">London • Mayfair Square 9</li>
              <li className="text-zinc-300">New York • Madison Ave 650</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} AURA Architectural Systems AG. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300">Architect Portal</a>
            <a href="#" className="hover:text-zinc-300">BIM / Revit Models</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
