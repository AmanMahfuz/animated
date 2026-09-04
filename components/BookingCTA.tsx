"use client";

import React, { useState } from "react";
import { Phone } from "lucide-react";

export function BookingCTA() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    postcode: "",
    scope: "Blinds & Curtains (Full Home)",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 7000);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[#e4e2df]" id="consultation-booking">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Guarantees & Value Pitch (Col 6) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-[#7c572d]" />
              <span className="font-mono text-[10px] text-[#7c572d] uppercase tracking-widest font-semibold">
                Brisbane, Moreton Bay &amp; Sunshine Coast
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1b1c1a] font-light tracking-tight">
              BOOK YOUR FREE MEASURE &amp; <br className="hidden sm:inline" />
              <span className="italic font-serif text-[#7c572d]">QUOTE TODAY</span>
            </h2>

            <p className="text-sm sm:text-base text-[#50453b] font-light leading-relaxed">
              Experience the convenience of our mobile showroom. We bring a full range of blinds, shutters, curtains, and motorisation samples directly to your doorstep for an accurate on-site consultation.
            </p>

            {/* 3 Value Guarantees */}
            <div className="flex flex-col gap-4 pt-2">
              
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#7c572d] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div>
                  <h4 className="font-serif text-sm font-medium text-[#1b1c1a]">10+ Years Local QLD Experience</h4>
                  <p className="text-xs text-[#50453b] font-light mt-0.5">High-quality custom window furnishings built specifically for Queensland climates.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#7c572d] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div>
                  <h4 className="font-serif text-sm font-medium text-[#1b1c1a]">100% Perfect Fit Guarantee</h4>
                  <p className="text-xs text-[#50453b] font-light mt-0.5">Precision laser measuring by licensed technicians with full aftercare and warranty.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#7c572d] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div>
                  <h4 className="font-serif text-sm font-medium text-[#1b1c1a]">Zero Pushy Sales, Competitive Quotes</h4>
                  <p className="text-xs text-[#50453b] font-light mt-0.5">Transparent, genuine pricing with tailored advice for your specific aesthetic.</p>
                </div>
              </div>

            </div>

            {/* Direct Phone Link */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-[#1b1c1a]">
                <Phone className="w-4 h-4 text-[#7c572d]" />
                <span>Call Now: <strong>1300 73 72 79</strong> / <strong>0448 169 967</strong></span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Fast Booking Form (Col 6) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-[#d4c4b7]/60 flex flex-col gap-6">
              <div>
                <span className="font-mono text-[10px] text-[#7c572d] uppercase tracking-wider font-semibold">
                  Fast Online Request
                </span>
                <h3 className="font-serif text-2xl text-[#1b1c1a] font-medium mt-1">
                  Request Your Free Quote
                </h3>
                <p className="text-xs text-[#50453b] font-light mt-1">
                  Takes 30 seconds. Our Brisbane team responds promptly to schedule your consultation.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-[#827569] uppercase tracking-wider font-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-[#f5f3f0] text-[#1b1c1a] text-xs focus:outline-none focus:ring-1 focus:ring-[#7c572d] placeholder:text-[#827569] border border-[#e4e2df]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-[#827569] uppercase tracking-wider font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0412 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-[#f5f3f0] text-[#1b1c1a] text-xs focus:outline-none focus:ring-1 focus:ring-[#7c572d] placeholder:text-[#827569] border border-[#e4e2df]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-[#827569] uppercase tracking-wider font-semibold">
                      Suburb / Postcode
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. North Lakes, QLD 4509"
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-[#f5f3f0] text-[#1b1c1a] text-xs focus:outline-none focus:ring-1 focus:ring-[#7c572d] placeholder:text-[#827569] border border-[#e4e2df]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-[#827569] uppercase tracking-wider font-semibold">
                      Product Interest
                    </label>
                    <select
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-[#f5f3f0] text-[#1b1c1a] text-xs focus:outline-none focus:ring-1 focus:ring-[#7c572d] border border-[#e4e2df]"
                    >
                      <option>Blinds &amp; Curtains (Full Home)</option>
                      <option>Plantation Shutters (PVC or Timber)</option>
                      <option>S-Fold Sheer Curtains &amp; Blockout Tracks</option>
                      <option>Motorised Blinds &amp; Home Automation</option>
                      <option>Outdoor Awnings &amp; Zipscreen</option>
                      <option>Security Screens &amp; Fly Doors</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] text-[#827569] uppercase tracking-wider font-semibold">
                    Property Type or Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. New build in Bridgeman Downs; need advice on living & bedrooms"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-[#f5f3f0] text-[#1b1c1a] text-xs focus:outline-none focus:ring-1 focus:ring-[#7c572d] placeholder:text-[#827569] border border-[#e4e2df]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-12 mt-2 bg-[#d4a574] hover:bg-[#7c572d] text-[#2c1700] hover:text-white font-mono text-[11px] uppercase font-bold rounded-full shadow-md transition-all duration-300 tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                  <span>Book Free Measure &amp; Quote</span>
                </button>

                {isSubmitted && (
                  <div className="p-4 rounded-xl bg-[#6cbf8e]/30 text-[#0d6c43] text-xs text-center border border-[#0d6c43]/20 font-medium">
                    ✓ Thank you! Your free measure request has been sent. Hari and the team will contact you shortly.
                  </div>
                )}

                <span className="text-[11px] text-center text-[#827569] font-mono">
                  No obligation. We respect your privacy and never share your details.
                </span>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
