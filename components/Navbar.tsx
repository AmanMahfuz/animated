"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, ArrowUpRight, Compass, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3.5 bg-[#060709]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg glass-panel border border-amber-400/40 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-amber-400 font-serif font-bold text-sm tracking-tighter">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-[0.25em] text-white uppercase">
                A U R A
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                Architectural Systems
              </span>
            </div>
          </a>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-zinc-300 uppercase">
            <button
              onClick={() => scrollToSection("hero-scroll-container")}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Circadian Experience
            </button>
            <button
              onClick={() => scrollToSection("architectural-specs")}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Engineering
            </button>
            <button
              onClick={() => scrollToSection("fabric-customizer")}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Material Studio
            </button>
            <button
              onClick={() => scrollToSection("space-estimator")}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Configurator
            </button>
            <button
              onClick={() => scrollToSection("installations")}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Projects
            </button>
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-full font-mono text-xs tracking-wider uppercase text-zinc-100 group cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 rounded-full group-hover:opacity-100 transition-opacity"></span>
              <span className="relative px-5 py-2 transition-all ease-in duration-200 bg-[#0c0e12] rounded-full group-hover:bg-opacity-0 group-hover:text-black font-medium flex items-center gap-1.5">
                <span>Book Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass-panel text-zinc-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#060709]/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden">
          <nav className="flex flex-col gap-6 text-lg font-light tracking-wider text-zinc-200">
            <button
              onClick={() => scrollToSection("hero-scroll-container")}
              className="text-left hover:text-amber-400 py-2 border-b border-white/10"
            >
              01. Circadian Experience
            </button>
            <button
              onClick={() => scrollToSection("architectural-specs")}
              className="text-left hover:text-amber-400 py-2 border-b border-white/10"
            >
              02. Swiss Engineering
            </button>
            <button
              onClick={() => scrollToSection("fabric-customizer")}
              className="text-left hover:text-amber-400 py-2 border-b border-white/10"
            >
              03. Material Studio
            </button>
            <button
              onClick={() => scrollToSection("space-estimator")}
              className="text-left hover:text-amber-400 py-2 border-b border-white/10"
            >
              04. Custom Configurator
            </button>
            <button
              onClick={() => scrollToSection("installations")}
              className="text-left hover:text-amber-400 py-2 border-b border-white/10"
            >
              05. Architectural Portfolio
            </button>
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenConsultation) onOpenConsultation();
            }}
            className="mt-8 w-full py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-mono text-xs uppercase tracking-widest font-semibold"
          >
            Request Private Consultation
          </button>
        </div>
      )}
    </>
  );
}
