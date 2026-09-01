"use client";

import React from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import { AudioAtmosphere } from "./AudioAtmosphere";

interface HeroOverlayHUDProps {
  activeChapterIndex: number;
}

const CHAPTERS = [
  {
    tag: "01 // ALPINE DAYLIGHT",
    title: "Unbroken Vista",
    desc: "18mm slimline frames with panoramic lake reflections",
  },
  {
    tag: "02 // CIRCADIAN AUTOMATION",
    title: "Twilight Tracking",
    desc: "Autonomous solar detection initiating motor travel",
  },
  {
    tag: "03 // ACOUSTIC LEVITATION",
    title: "Whisper Glide",
    desc: "Cashmere-linen weave gliding silently under 18 dBA",
  },
  {
    tag: "04 // EVENING SANCTUARY",
    title: "Architectural Privacy",
    desc: "Complete acoustic sealing and 2400K warm cove light",
  },
];

export function HeroOverlayHUD({ activeChapterIndex }: HeroOverlayHUDProps) {
  const current = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  const handleJumpToChapter = (chapterIdx: number) => {
    const container = document.getElementById("hero-scroll-container");
    if (!container) return;

    const containerTop = container.offsetTop;
    const scrollableDist = container.offsetHeight - window.innerHeight;
    const targetProgress =
      chapterIdx === 0 ? 0 : chapterIdx === 1 ? 0.35 : chapterIdx === 2 ? 0.65 : 0.95;

    window.scrollTo({
      top: containerTop + targetProgress * scrollableDist,
      behavior: "smooth",
    });
  };

  const handleScrollToSpecs = () => {
    const specsSection = document.getElementById("architectural-specs");
    if (specsSection) {
      specsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-8 select-none">
      
      {/* Top Bar (Unobtrusive) */}
      <header className="flex items-center justify-between pointer-events-auto w-full max-w-7xl mx-auto pt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-zinc-200 uppercase">
              AURA ARCHITECTURAL
            </span>
          </div>
        </div>

        {/* Top Right Tools */}
        <div className="flex items-center gap-3">
          <AudioAtmosphere scrollProgress={activeChapterIndex / 3} />

          <button
            onClick={handleScrollToSpecs}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 border border-white/10 text-[11px] font-mono tracking-wider uppercase text-zinc-200 transition-colors cursor-pointer shadow-lg"
          >
            <span>Specs</span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </header>

      {/* Center is completely clear to let the user enjoy the majestic view! */}

      {/* Bottom Floating Minimalist Story Pill (Floating gently above timeline) */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto pb-14 sm:pb-12">
        
        {/* Sleek Minimal Title Overlay */}
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 shadow-2xl transition-all duration-300">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <span className="text-[10px] font-mono text-amber-300 tracking-widest uppercase font-semibold">
              {current.tag}
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="text-xs font-medium text-white tracking-wide">
              {current.title}
            </span>
            <span className="hidden md:inline text-zinc-400 text-xs">
              — {current.desc}
            </span>
          </div>
        </div>

        {/* Chapter Quick Jump Pills */}
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-lg">
          {CHAPTERS.map((ch, idx) => {
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleJumpToChapter(idx)}
                className={`px-3 py-1 rounded-full font-mono text-[10px] tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-amber-400 text-black font-bold shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                0{idx + 1}
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}
