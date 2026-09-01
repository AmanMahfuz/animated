"use client";

import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, Send, Calendar, ShieldCheck } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studio: "",
    projectType: "Private Villa / Penthouse",
    timeline: "Q3 - Q4 2026",
    notes: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-xl glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl bg-[#0b0d13] text-white">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full glass-panel hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-6 text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-light text-white mb-2">
              Consultation Scheduled
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mb-8">
              An Aura Senior Systems Architect has been assigned to your project. We will contact you within 24 hours with custom CAD pocket details and sample swatches.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-[10px] font-mono tracking-widest text-amber-300 uppercase mb-3">
              <Sparkles className="w-3 h-3 text-amber-400" />
              PRIVATE ARCHITECTURAL DESK
            </div>

            <h3 className="text-2xl sm:text-3xl font-light text-white mb-2">
              Request Project Consultation
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Connect directly with our Swiss engineering team for motorized pocket sizing, bus integration, and bespoke textile curation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marcello Rossi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase block mb-1">
                    Professional Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="m.rossi@studio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase block mb-1">
                    Studio / Architecture Firm
                  </label>
                  <input
                    type="text"
                    placeholder="Rossi & Partners Architects"
                    value={formData.studio}
                    onChange={(e) => setFormData({ ...formData, studio: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase block mb-1">
                    Commission Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#12151d] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>Private Villa / Penthouse</option>
                    <option>Boutique Luxury Hospitality</option>
                    <option>High-Rise Residential Tower</option>
                    <option>Mega Yacht Interior</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 uppercase block mb-1">
                  Project Notes & Aperture Specifications
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. 14m curved alpine glazing facing south-west, recessed ceiling detail required."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Architectural Dossier</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
