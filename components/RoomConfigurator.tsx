"use client";

import React, { useState } from "react";

interface RoomConfiguratorProps {
  onOrderSwatch?: () => void;
  onOpenBooking?: () => void;
}

export function RoomConfigurator({ onOrderSwatch, onOpenBooking }: RoomConfiguratorProps) {
  const [lightValue, setLightValue] = useState<number>(33);
  const [privacyValue, setPrivacyValue] = useState<number>(66);
  const [activeKelvin, setActiveKelvin] = useState<"morning" | "afternoon" | "evening" | "night">("afternoon");

  const getKelvinColor = () => {
    switch (activeKelvin) {
      case "morning":
        return "rgba(255, 235, 200, 0.18)";
      case "afternoon":
        return "rgba(255, 255, 255, 0.05)";
      case "evening":
        return "rgba(230, 160, 80, 0.28)";
      case "night":
        return "rgba(40, 60, 100, 0.35)";
    }
  };

  const getLightBadgeText = () => {
    if (lightValue < 25) return `${lightValue}% Sun Ingress`;
    if (lightValue < 65) return `${lightValue}% Filtered`;
    return `${lightValue}% Secluded`;
  };

  const getLuxStat = () => {
    if (lightValue < 25) return "1,200 Lux (Direct Solar)";
    if (lightValue < 65) return "480 Lux (Diffused Gentle)";
    return "80 Lux (Intimate Sanctuary)";
  };

  const getCardOpacity = () => {
    if (lightValue < 25) return "12% Minimal Sheer";
    if (lightValue < 65) return "33% Semi-Sheer Flax";
    return "95% Total Blockout";
  };

  const getPrivacyBadgeText = () => {
    if (privacyValue < 30) return `${privacyValue}% Open View`;
    if (privacyValue < 70) return `${privacyValue}% Daytime Private`;
    return `${privacyValue}% Full Seclusion`;
  };

  const getThermalValue = () => {
    if (privacyValue < 30) return "U-Value 2.1 W/m²K";
    if (privacyValue < 70) return "U-Value 1.4 W/m²K";
    return "U-Value 0.9 W/m²K";
  };

  const handleReset = () => {
    setLightValue(33);
    setPrivacyValue(66);
    setActiveKelvin("morning");
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[#fbf9f6]" id="interactive-configurator">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#7c572d]" />
              <span className="font-mono text-[10px] text-[#7c572d] uppercase tracking-widest font-semibold">
                Precision Atelier Simulator
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1b1c1a] font-light tracking-tight">
              HOW DO YOU WANT YOUR ROOM TO FEEL?
            </h2>
            <p className="text-sm sm:text-base text-[#50453b] mt-2 font-light leading-relaxed">
              Adjust sunlight penetration, thermal privacy, and circadian kelvin temperature to experience how BWF architectural fabrics orchestrate your domestic atmosphere.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-end">
            <div className="px-4 py-2 rounded-full bg-[#eae8e5] flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#0d6c43]">tune</span>
              <span className="font-mono text-[11px] text-[#1b1c1a] uppercase font-semibold">
                Direct Calibration Engine
              </span>
            </div>
          </div>
        </div>

        {/* 60 / 40 Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Interactive Room Preview Canvas (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-xl bg-[#eae8e5]">
              
              {/* Room Image Base */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGDmhuFqdJfTWCnuR9BmKLCid_YGkM_fdGfvRrEZYo1utT6fRSDYqDKpmr_HYekmgspyy1yl7v957bu6wmhCDS0zOLV7svLmNI4Y7EcpYJk9rZVKoSZ_7UOlu-bkbQEawxTEN6qqJzMdc0kdmMa14bm1LArDO7PCJ9Ob4U1bww9v9u0TTrimwZXqQNSvXdb0JruB-pz5YsR0LjoxlP4PfFT3AZ8xdLGnONc4VL2s0_cJL5OwQ5EbOm"
                alt="Architectural Living room staging with dual blinds and Belgian sheer linen curtains"
                className="w-full h-full object-cover transition-transform duration-700"
              />

              {/* Dynamic Opacity & Privacy Drop Screen Filter */}
              <div
                className="absolute inset-0 transition-all duration-300 pointer-events-none"
                style={{
                  backgroundColor: `rgba(18, 17, 16, ${(lightValue / 100) * 0.75})`,
                }}
              />

              {/* Warmth / Kelvin Color Matrix Wash */}
              <div
                className="absolute inset-0 mix-blend-color transition-all duration-500 pointer-events-none"
                style={{ backgroundColor: getKelvinColor() }}
              />

              {/* Visual Sheen Wave-Fold Specular Highlight */}
              <div
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/20 to-transparent pointer-events-none transition-opacity duration-300"
                style={{ opacity: privacyValue < 30 ? 0.2 : privacyValue < 70 ? 0.6 : 0.9 }}
              />

              {/* Top Left Lux Readout Overlay */}
              <div className="absolute top-5 left-5 p-3 rounded-xl bg-[#fbf9f6]/90 backdrop-blur-md shadow-md flex items-center gap-3">
                <span className="material-symbols-outlined text-[#7c572d] text-[20px]">wb_twilight</span>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-[#827569] uppercase tracking-wider font-semibold">
                    Lux Transmission
                  </span>
                  <span className="text-xs sm:text-sm text-[#1b1c1a] font-semibold">
                    {getLuxStat()}
                  </span>
                </div>
              </div>

              {/* Bottom Right Motor Active Tag */}
              <div className="absolute bottom-5 right-5 px-3 py-2 rounded-xl bg-[#fbf9f6]/90 backdrop-blur-md shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4a574] animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#1b1c1a] font-semibold">
                  Architectural Drop: Motor Active
                </span>
              </div>
            </div>

            {/* Bottom Micro Specs Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#f5f3f0] shadow-sm border border-[#e4e2df]">
              <div>
                <span className="font-mono text-[9px] text-[#827569] uppercase tracking-wider block font-semibold">
                  Fabric Opacity
                </span>
                <span className="text-xs sm:text-sm text-[#1b1c1a] font-medium">
                  {getCardOpacity()}
                </span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#827569] uppercase tracking-wider block font-semibold">
                  Thermal Shield
                </span>
                <span className="text-xs sm:text-sm text-[#1b1c1a] font-medium">
                  {getThermalValue()}
                </span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#827569] uppercase tracking-wider block font-semibold">
                  Acoustic Dampening
                </span>
                <span className="text-xs sm:text-sm text-[#1b1c1a] font-medium">
                  NRC 0.65 Class C
                </span>
              </div>
            </div>
          </div>

          {/* Right: Precision Architectural Controls Card (Col 5) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#e4e2df] flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#eae8e5]">
              <div>
                <span className="font-mono text-[10px] text-[#7c572d] uppercase tracking-widest font-semibold">
                  Atelier Dial
                </span>
                <h3 className="font-serif text-xl text-[#1b1c1a] font-medium">
                  Aura &amp; Ingress Staging
                </h3>
              </div>
              <button
                onClick={handleReset}
                className="font-mono text-[11px] text-[#827569] hover:text-[#1b1c1a] uppercase tracking-wider cursor-pointer font-semibold"
              >
                Reset
              </button>
            </div>

            {/* CONTROL 1: LIGHT INGRESS SLIDER */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[11px] text-[#1b1c1a] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#7c572d]">light_mode</span>
                  <span>Light Ingress</span>
                </label>
                <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#efeeeb] text-[#1b1c1a] uppercase font-semibold">
                  {getLightBadgeText()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={lightValue}
                onChange={(e) => setLightValue(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between font-mono text-[9px] text-[#827569] uppercase font-medium">
                <span>0% Full Sun</span>
                <span>33% Filtered</span>
                <span>66% Soft</span>
                <span>100% Blackout</span>
              </div>
            </div>

            {/* CONTROL 2: PRIVACY BARRIER SLIDER */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[11px] text-[#1b1c1a] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#7c572d]">visibility</span>
                  <span>Privacy Barrier</span>
                </label>
                <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#efeeeb] text-[#1b1c1a] uppercase font-semibold">
                  {getPrivacyBadgeText()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={privacyValue}
                onChange={(e) => setPrivacyValue(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between font-mono text-[9px] text-[#827569] uppercase font-medium">
                <span>0% Open Bleed</span>
                <span>33% Vision Sheer</span>
                <span>66% Day Private</span>
                <span>100% Secluded</span>
              </div>
            </div>

            {/* CONTROL 3: AMBIENCE KELVIN SELECTOR */}
            <div className="flex flex-col gap-2.5">
              <label className="font-mono text-[11px] text-[#1b1c1a] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#7c572d]">thermostat</span>
                <span>Solar Temperature &amp; Tone</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "morning", name: "Morning", k: "4500K" },
                  { id: "afternoon", name: "Afternoon", k: "3500K" },
                  { id: "evening", name: "Evening", k: "2700K" },
                  { id: "night", name: "Night", k: "2200K" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveKelvin(item.id as any)}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer flex flex-col items-center text-center ${
                      activeKelvin === item.id
                        ? "bg-[#eae8e5] ring-1 ring-[#7c572d] shadow-sm"
                        : "bg-[#efeeeb] hover:bg-[#eae8e5]"
                    }`}
                  >
                    <span className="font-mono text-[9px] text-[#827569] uppercase font-semibold">
                      {item.name}
                    </span>
                    <span className="text-xs text-[#1b1c1a] font-semibold mt-0.5">
                      {item.k}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* DYNAMIC RECOMMENDATION CARD */}
            <div className="p-4 rounded-xl bg-[#f5f3f0] border border-[#e4e2df] flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-[#7c572d]">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
                  Recommended Custom Solution
                </span>
              </div>
              <p className="text-sm font-serif font-medium text-[#1b1c1a]">
                Architectural Dual Roller Blinds + Wave-Fold Sheer Belgian Linen Drapery
              </p>
              <p className="text-xs text-[#50453b] font-light leading-relaxed">
                Provides unobstructed daylight during high zenith sun with complete acoustic and light seclusion on demand.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onOrderSwatch}
                className="flex-1 h-11 px-5 rounded-full bg-[#d4a574] hover:bg-[#7c572d] text-[#2c1700] hover:text-white font-mono text-[11px] uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                <span>Order Swatch Box (Free)</span>
              </button>
              <button
                onClick={onOpenBooking}
                className="flex-1 h-11 px-5 rounded-full bg-[#efeeeb] hover:bg-[#e4e2df] text-[#1b1c1a] font-mono text-[11px] uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#e4e2df]"
              >
                <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                <span>Customise in 3D</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
