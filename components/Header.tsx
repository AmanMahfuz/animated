"use client";

import React, { useState } from "react";
import Image from "next/image";
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
      <header className="fixed top-0 left-0 w-full z-50 bg-[#ffffff]/92 backdrop-blur-md border-b border-[#e2e8f0]/90 shadow-xs">
        <div className="h-16 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            <Image
              src="/Logo-forbwf-Prints.webp"
              alt="Brisbane Window Furnishings - way you see around"
              width={200}
              height={50}
              priority
              className="h-8 sm:h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-[13px] text-[#475569]">
            <button
              onClick={() => scrollToSection("hero-section")}
              className="text-[#0f172a] font-medium hover:text-[#3b71ad] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about-us")}
              className="hover:text-[#3b71ad] transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="hover:text-[#3b71ad] transition-colors cursor-pointer"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="hover:text-[#3b71ad] transition-colors cursor-pointer"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("motorisation")}
              className="hover:text-[#3b71ad] transition-colors cursor-pointer"
            >
              Motorisation
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="hover:text-[#3b71ad] transition-colors cursor-pointer"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="hover:text-[#3b71ad] transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("consultation-booking")}
              className="hover:text-[#3b71ad] transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Button & Hotline */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            <a
              href="tel:1300737279"
              className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-[#2d5b8f] font-bold px-3.5 py-1.5 rounded-full bg-[#ebf3fc] hover:bg-[#dce9f8] transition-colors border border-[#80a8d8]/25"
            >
              <Phone className="w-3.5 h-3.5 text-[#3b71ad]" />
              <span>1300 73 72 79</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center h-8 sm:h-9 px-3.5 sm:px-5 bg-gradient-to-r from-[#3b71ad] to-[#4c84c4] text-white text-[10px] sm:text-[11px] font-mono font-bold uppercase rounded-full hover:from-[#2d5b8f] hover:to-[#3b71ad] transition-all duration-200 tracking-wider cursor-pointer shadow-sm shadow-[#3b71ad]/25"
            >
              Free Quote
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 rounded-lg border border-[#cbd5e1] text-[#0f172a] hover:bg-[#f1f5f9]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#ffffff]/98 backdrop-blur-xl flex flex-col justify-between p-8 xl:hidden pt-20 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-4 text-base font-serif text-[#0f172a]">
            <button
              onClick={() => scrollToSection("hero-section")}
              className="text-left py-2 border-b border-[#e2e8f0] flex justify-between items-center"
            >
              <span>Home</span>
              <span className="text-xs font-mono text-[#64748b]">Staging</span>
            </button>
            <button
              onClick={() => scrollToSection("about-us")}
              className="text-left py-2 border-b border-[#e2e8f0] flex justify-between items-center"
            >
              <span>About Us</span>
              <span className="text-xs font-mono text-[#64748b]">QLD Living</span>
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="text-left py-2 border-b border-[#e2e8f0] flex justify-between items-center"
            >
              <span>Products</span>
              <span className="text-xs font-mono text-[#64748b]">Curtains &amp; Blinds</span>
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-left py-2 border-b border-[#e2e8f0] flex justify-between items-center"
            >
              <span>Portfolio</span>
              <span className="text-xs font-mono text-[#64748b]">Recent Projects</span>
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-left py-2 border-b border-[#e2e8f0] flex justify-between items-center"
            >
              <span>Your Journey</span>
              <span className="text-xs font-mono text-[#64748b]">4 Steps</span>
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-left py-2 border-b border-[#e2e8f0] flex justify-between items-center"
            >
              <span>FAQ</span>
              <span className="text-xs font-mono text-[#64748b]">Questions</span>
            </button>
            <button
              onClick={() => scrollToSection("consultation-booking")}
              className="text-left py-2 border-b border-[#e2e8f0] flex justify-between items-center"
            >
              <span>Contact Us</span>
              <span className="text-xs font-mono text-[#64748b]">Free Measure</span>
            </button>
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href="tel:1300737279"
              className="w-full py-3.5 rounded-full bg-[#f1f5f9] text-[#0f172a] font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 border border-[#e2e8f0]"
            >
              <Phone className="w-4 h-4 text-[#3b71ad]" />
              <span>Call 1300 73 72 79</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#3b71ad] to-[#4c84c4] text-white font-mono text-xs uppercase tracking-widest font-bold shadow-md hover:from-[#2d5b8f] hover:to-[#3b71ad] transition-all"
            >
              Book Free Measure &amp; Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
}
