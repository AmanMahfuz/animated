"use client";

import React, { useState, useMemo } from "react";
import { Sliders, Calculator, Check, ArrowRight, Download, Send, CheckCircle } from "lucide-react";

export function SpaceEstimator() {
  const [spanWidth, setSpanWidth] = useState<number>(6.5); // meters
  const [ceilingHeight, setCeilingHeight] = useState<number>(3.2); // meters
  const [trackType, setTrackType] = useState<"center-split" | "one-way" | "dual-zone">("center-split");
  const [controlType, setControlType] = useState<"matter" | "lutron" | "knx">("matter");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  // Live Engineering Calculations
  const calculations = useMemo(() => {
    const area = spanWidth * ceilingHeight; // sq meters
    const fabricWeightKg = area * 0.65; // ~650g/m2 + hardware
    const travelDistance = trackType === "center-split" ? spanWidth / 2 : spanWidth;
    const glideSpeed = 0.12; // 12 cm/sec whisper mode
    const travelTimeSec = Math.round(travelDistance / glideSpeed);
    const noiseLevel = travelDistance > 5 ? 18.5 : 16.2;
    const estimatedCost = Math.round(area * 420 + (trackType === "dual-zone" ? 1800 : 1100));

    return {
      area: area.toFixed(1),
      weight: fabricWeightKg.toFixed(1),
      travelTime: travelTimeSec,
      noise: noiseLevel.toFixed(1),
      cost: estimatedCost.toLocaleString()
    };
  }, [spanWidth, ceilingHeight, trackType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      // Auto reset or keep state
    }, 4000);
  };

  return (
    <section id="space-estimator" className="relative py-28 px-4 sm:px-8 bg-[#060709] border-t border-white/5 overflow-hidden">
      
      {/* Background Ambient Aura */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-amber-500/30 text-[11px] font-mono tracking-widest text-amber-300 uppercase mb-4">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            ENGINEERING ESTIMATOR
          </div>

          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-6">
            Configure Your Space. <br />
            <span className="gold-gradient-text font-serif italic">Real-Time Technical Metrics.</span>
          </h2>

          <p className="text-base text-zinc-400 font-normal leading-relaxed">
            Specify window aperture dimensions and smart bus protocols to compute fabric weight loads, glide duration, and acoustic ratings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
            <h3 className="text-xl font-light text-white mb-6 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>Architectural Parameters</span>
            </h3>

            {/* Slider 1: Glazing Span Width */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-mono text-zinc-300 uppercase tracking-wider">
                  Glazing Span Width
                </label>
                <span className="text-base font-mono text-amber-300 font-bold">
                  {spanWidth.toFixed(1)} meters <span className="text-xs text-zinc-500 font-normal">({(spanWidth * 3.28084).toFixed(1)} ft)</span>
                </span>
              </div>
              <input
                type="range"
                min="2.5"
                max="16.0"
                step="0.1"
                value={spanWidth}
                onChange={(e) => setSpanWidth(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:accent-amber-300"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-1">
                <span>2.5m (Compact Bay)</span>
                <span>8.0m (Standard Villa)</span>
                <span>16.0m (Grand Panorama)</span>
              </div>
            </div>

            {/* Slider 2: Ceiling Height */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-mono text-zinc-300 uppercase tracking-wider">
                  Clear Ceiling Height
                </label>
                <span className="text-base font-mono text-amber-300 font-bold">
                  {ceilingHeight.toFixed(1)} meters <span className="text-xs text-zinc-500 font-normal">({(ceilingHeight * 3.28084).toFixed(1)} ft)</span>
                </span>
              </div>
              <input
                type="range"
                min="2.4"
                max="6.5"
                step="0.1"
                value={ceilingHeight}
                onChange={(e) => setCeilingHeight(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:accent-amber-300"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-1">
                <span>2.4m (Standard)</span>
                <span>4.0m (Double Height)</span>
                <span>6.5m (Cathedral Loft)</span>
              </div>
            </div>

            {/* Track Draw Pattern Selector */}
            <div className="mb-8">
              <label className="text-xs font-mono text-zinc-300 uppercase tracking-wider block mb-3">
                Motor Track Configuration
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "center-split", label: "Center Bi-Parting", desc: "Dual drapes meeting in center" },
                  { id: "one-way", label: "One-Way Draw", desc: "Single continuous glide to side" },
                  { id: "dual-zone", label: "Dual Motor Zone", desc: "Sheer + Blackout stacked" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTrackType(item.id as typeof trackType)}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      trackType === item.id
                        ? "bg-amber-400/10 border-amber-400 text-white shadow-lg"
                        : "bg-white/[0.02] border-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                    }`}
                  >
                    <div className="text-xs font-mono font-medium text-white mb-1">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Smart Protocol Selector */}
            <div>
              <label className="text-xs font-mono text-zinc-300 uppercase tracking-wider block mb-3">
                Building Bus Protocol
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "matter", label: "Matter / Thread" },
                  { id: "lutron", label: "Lutron QSX" },
                  { id: "knx", label: "KNX / RS485" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setControlType(item.id as typeof controlType)}
                    className={`p-3 rounded-2xl text-center font-mono text-xs border transition-all cursor-pointer ${
                      controlType === item.id
                        ? "bg-amber-400/20 border-amber-400 text-amber-300 font-semibold"
                        : "bg-white/[0.02] border-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results & Schedule Output Card */}
          <div className="lg:col-span-5 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                SYSTEM TELEMETRY SUMMARY
              </span>
              <h3 className="text-2xl font-light text-white mt-1 mb-6">
                Engineered Performance
              </h3>

              <div className="space-y-4 font-mono">
                
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Total Acoustic Surface Area</span>
                  <span className="text-base text-white font-bold">{calculations.area} m²</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Fabric + Hem Suspended Mass</span>
                  <span className="text-base text-amber-300 font-bold">{calculations.weight} kg</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Full Cycle Transit Time</span>
                  <span className="text-base text-sky-300 font-bold">{calculations.travelTime} sec</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Acoustic Motor Sound Signature</span>
                  <span className="text-base text-emerald-300 font-bold">&lt; {calculations.noise} dBA</span>
                </div>

                <div className="p-5 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-amber-300 uppercase tracking-wider">Estimated System Spec</span>
                    <span className="text-[10px] text-zinc-400">Includes Swiss MagLev Track + Custom Weave</span>
                  </div>
                  <span className="text-2xl font-bold text-white">${calculations.cost}</span>
                </div>

              </div>
            </div>

            {/* Email Dispatch / Specification Download Form */}
            <div className="mt-8 pt-6 border-t border-white/10">
              {submitted ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs font-mono">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>CAD drawing schedule & engineering packet sent to {email}</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <span className="text-xs font-mono text-zinc-400">
                    Receive Comprehensive Architectural CAD Pack
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="architect@studio.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shrink-0 flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
