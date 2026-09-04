"use client";

import React, { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

interface HeaderProps {
  onOpenBooking?: () => void;
}

export function Header({ onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#fbf9f6]/92 backdrop-blur-md border-b border-[#d4c4b7]/60 shadow-xs">
        <div className="h-14 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-[#7c572d] text-white flex items-center justify-center font-serif font-bold text-sm shadow-sm group-hover:bg-[#d4a574] group-hover:text-[#2c1700] transition-colors">
              B
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base tracking-tight text-[#1b1c1a] leading-none font-medium">
                Brisbane Window Furnishings
              </span>
              <span className="text-[9px] font-mono tracking-[0.18em] text-[#827569] uppercase font-semibold">
                Brisbane &amp; Sunshine Coast
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-[13px] text-[#50453b]">
            <button
              onClick={() => scrollToSection("hero-section")}
              className="text-[#1b1c1a] font-medium hover:text-[#7c572d] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about-us")}
              className="hover:text-[#1b1c1a] transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="hover:text-[#1b1c1a] transition-colors cursor-pointer"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="hover:text-[#1b1c1a] transition-colors cursor-pointer"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("motorisation")}
              className="hover:text-[#1b1c1a] transition-colors cursor-pointer"
            >
              Motorisation
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="hover:text-[#1b1c1a] transition-colors cursor-pointer"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="hover:text-[#1b1c1a] transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("consultation-booking")}
              className="hover:text-[#1b1c1a] transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Button & Hotline */}
          <div className="flex items-center gap-3.5">
            <a
              href="tel:1300737279"
              className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-[#7c572d] font-bold px-3 py-1.5 rounded-full bg-[#d4a574]/15 hover:bg-[#d4a574]/25 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>1300 73 72 79</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center h-9 px-5 bg-[#d4a574] text-[#2c1700] text-[11px] font-mono font-bold uppercase rounded-full hover:bg-[#7c572d] hover:text-white transition-colors duration-200 tracking-wider cursor-pointer shadow-sm"
            >
              Free Quote
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 rounded-lg border border-[#d4c4b7] text-[#1b1c1a]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#fbf9f6]/98 backdrop-blur-xl flex flex-col justify-between p-8 xl:hidden pt-20 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-4 text-base font-serif text-[#1b1c1a]">
            <button
              onClick={() => scrollToSection("hero-section")}
              className="text-left py-2 border-b border-[#e4e2df] flex justify-between items-center"
            >
              <span>Home</span>
              <span className="text-xs font-mono text-[#827569]">Staging</span>
            </button>
            <button
              onClick={() => scrollToSection("about-us")}
              className="text-left py-2 border-b border-[#e4e2df] flex justify-between items-center"
            >
              <span>About Us</span>
              <span className="text-xs font-mono text-[#827569]">QLD Living</span>
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="text-left py-2 border-b border-[#e4e2df] flex justify-between items-center"
            >
              <span>Products</span>
              <span className="text-xs font-mono text-[#827569]">Curtains &amp; Blinds</span>
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-left py-2 border-b border-[#e4e2df] flex justify-between items-center"
            >
              <span>Portfolio</span>
              <span className="text-xs font-mono text-[#827569]">Recent Projects</span>
            </button>
            <button
              onClick={() => scrollToSection("motorisation")}
              className="text-left py-2 border-b border-[#e4e2df] flex justify-between items-center"
            >
              <span>Motorisation</span>
              <span className="text-xs font-mono text-[#827569]">Smart Controls</span>
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-left py-2 border-b border-[#e4e2df] flex justify-between items-center"
            >
              <span>Your Journey</span>
              <span className="text-xs font-mono text-[#827569]">4 Steps</span>
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-left py-2 border-b border-[#e4e2df] flex justify-between items-center"
            >
              <span>FAQ</span>
              <span className="text-xs font-mono text-[#827569]">Questions</span>
            </button>
            <button
              onClick={() => scrollToSection("consultation-booking")}
              className="text-left py-2 border-b border-[#e4e2df] flex justify-between items-center"
            >
              <span>Contact Us</span>
              <span className="text-xs font-mono text-[#827569]">Free Measure</span>
            </button>
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href="tel:1300737279"
              className="w-full py-3.5 rounded-full bg-[#efeeeb] text-[#1b1c1a] font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#7c572d]" />
              <span>Call 1300 73 72 79</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-[#d4a574] text-[#2c1700] font-mono text-xs uppercase tracking-widest font-bold shadow-md hover:bg-[#7c572d] hover:text-white transition-colors"
            >
              Book Free Measure &amp; Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
}
