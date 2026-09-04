"use client";

import React from "react";

interface SwatchToastProps {
  isVisible: boolean;
}

export function SwatchToast({ isVisible }: SwatchToastProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transform transition-all duration-300 animate-in slide-in-from-bottom-5">
      <div className="bg-white text-[#1b1c1a] p-4 rounded-2xl shadow-2xl border border-[#d4c4b7] flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#d4a574]/20 text-[#7c572d] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[24px]">inventory_2</span>
        </div>
        <div>
          <p className="font-serif text-sm font-medium text-[#1b1c1a]">Complimentary Swatches Added</p>
          <p className="text-xs text-[#50453b] font-light">Belgian Linen (Flanders, 520g) will arrive in 48 hours.</p>
        </div>
      </div>
    </div>
  );
}
