"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Calendar, Sparkles, MapPin, User, Mail, Phone, Home, ArrowRight } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPreset?: string;
}

export function BookingModal({ isOpen, onClose, initialPreset }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    postcode: "",
    roomType: "Living Room & Lounge",
    productInterest: initialPreset || "Bespoke S-Fold Curtains & Sheers",
    preferredTime: "Morning (09:00 - 12:00)"
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="max-w-xl w-full rounded-3xl border border-[#3b71ad]/30 bg-[#0f172a] shadow-2xl relative p-6 sm:p-10 max-h-[92vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b71ad]/15 border border-[#80a8d8]/30 text-[#80a8d8] text-[10px] font-mono tracking-widest uppercase mb-3">
                <Sparkles className="w-3 h-3 text-[#e86b73]" />
                <span>Zero-Obligation Service</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">
                Book Your In-Home Measure
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                A senior design specialist will arrive with luxury fabric collections to measure your windows down to the millimeter.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:border-[#3b71ad] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0412 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:border-[#3b71ad] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Postcode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@example.com.au"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:border-[#3b71ad] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    Property Postcode / City *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. North Lakes, QLD 4509"
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:border-[#3b71ad] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                  Room or Space Scope
                </label>
                <select
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1e293b] border border-white/10 text-white text-xs focus:border-[#3b71ad] focus:outline-none transition-colors"
                >
                  <option value="Living Room & Lounge">Living Room & Open Plan Lounge</option>
                  <option value="Master Bedroom Suite">Master Bedroom Suite & Dressing Room</option>
                  <option value="Entire Residence (Full Home)">Entire Residence (Full Architectural Refit)</option>
                  <option value="Home Cinema / Entertainment">Home Cinema / Media Room Blackout</option>
                  <option value="Outdoor Terrace / Patio">Outdoor Terrace / Patio Alfresco</option>
                  <option value="Commercial / Hospitality">Commercial / Boutique Hospitality</option>
                </select>
              </div>

              {/* Product Interest */}
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                  Preferred Furnishing Style
                </label>
                <select
                  value={formData.productInterest}
                  onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1e293b] border border-white/10 text-white text-xs focus:border-[#3b71ad] focus:outline-none transition-colors"
                >
                  <option value="Bespoke S-Fold Curtains & Sheers">Bespoke S-Fold Curtains & Sheers (Belgian Linen)</option>
                  <option value="Architectural Roller & Duette Blinds">Architectural Roller & Duette Honeycomb Blinds</option>
                  <option value="Smart Motorisation (Lutron / HomeKit / Matter)">Smart Motorisation (Lutron / HomeKit / Matter)</option>
                  <option value="Plantation Timber Hardwood Shutters">Plantation Timber Hardwood Shutters</option>
                  <option value="Outdoor Zip-Track Shading">Outdoor Zip-Track Shading</option>
                  <option value="Complete Multi-Product System">Complete Multi-Product Tailored System</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-[#3b71ad] to-[#518ad0] text-white font-mono text-xs uppercase tracking-widest font-bold shadow-xl shadow-[#3b71ad]/25 hover:from-[#2d5b8f] hover:to-[#3b71ad] hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Free In-Home Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[10px] text-slate-400 font-mono mt-3">
                Zero pushy sales. We respect your privacy and never share your details.
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-8 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#10b981]/20 border border-[#10b981]/50 flex items-center justify-center text-[#10b981] mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">
              Appointment Request Received
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <span className="text-[#80a8d8] font-medium">{formData.name}</span>. A senior design concierge will contact you on <span className="text-white font-mono">{formData.phone}</span> within 2 hours to confirm your tailored fabric samples and appointment slot.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs font-mono max-w-md mx-auto mb-8 space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Scope:</span>
                <span className="text-white">{formData.roomType}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Style:</span>
                <span className="text-[#80a8d8]">{formData.productInterest}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Location:</span>
                <span className="text-white">{formData.postcode}</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-8 py-3.5 rounded-full bg-[#3b71ad] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#2d5b8f] transition-all cursor-pointer shadow-lg shadow-[#3b71ad]/30"
            >
              Return to BWF Atelier
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
