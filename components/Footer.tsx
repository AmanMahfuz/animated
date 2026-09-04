"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterJoined, setNewsletterJoined] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterJoined(true);
      setTimeout(() => setNewsletterJoined(false), 5000);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#f1f5f9] border-t border-[#e2e8f0] pt-16 md:pt-20 pb-12 text-[#475569]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Company Info & Contact (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/Logo-forbwf-Prints.webp"
                alt="Brisbane Window Furnishings - way you see around"
                width={220}
                height={55}
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </div>
            
            <p className="text-xs sm:text-sm text-[#475569] max-w-sm font-light leading-relaxed">
              Custom blinds, plantation shutters, curtains, and outdoor shades for homes, renovations, and commercial spaces across Brisbane, Moreton Bay, and the Sunshine Coast.
            </p>

            <div className="pt-2 flex flex-col gap-2.5 font-mono text-xs">
              <a href="tel:1300737279" className="text-[#0f172a] font-bold hover:text-[#3b71ad] flex items-center gap-2 transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#3b71ad]" />
                <span>1300 73 72 79 / 0448 169 967</span>
              </a>
              <a href="mailto:admin@brisbanewindowfurnishings.com.au" className="text-[#0f172a] hover:text-[#3b71ad] flex items-center gap-2 transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#3b71ad]" />
                <span>admin@brisbanewindowfurnishings.com.au</span>
              </a>
              <div className="text-[#475569] flex items-start gap-2 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#e86b73] shrink-0 mt-0.5" />
                <span>8/51 Cook Court, North Lakes, Brisbane, QLD 4509</span>
              </div>
            </div>
          </div>

          {/* Product Range (Col 3) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <p className="font-mono text-[10px] text-[#64748b] uppercase tracking-widest font-bold mb-1">
              Our Products
            </p>
            
            <nav className="flex flex-col gap-2 text-xs font-light">
              <a href="#products" className="hover:text-[#3b71ad] transition-colors">Roller, Venetian &amp; Vertical Blinds</a>
              <a href="#products" className="hover:text-[#3b71ad] transition-colors">S-Fold, Sheer &amp; Blockout Curtains</a>
              <a href="#products" className="hover:text-[#3b71ad] transition-colors">PVC &amp; Basswood Timber Shutters</a>
              <a href="#products" className="hover:text-[#3b71ad] transition-colors">Outdoor Awnings &amp; Zipscreen</a>
              <a href="#motorisation" className="hover:text-[#3b71ad] transition-colors">Smart Shade Motorisation &amp; Automation</a>
              <a href="#products" className="hover:text-[#3b71ad] transition-colors">Security Screens &amp; Fly Doors</a>
            </nav>
          </div>

          {/* Quick Links (Col 2) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <p className="font-mono text-[10px] text-[#64748b] uppercase tracking-widest font-bold mb-1">
              Company
            </p>
            <nav className="flex flex-col gap-2 text-xs font-light">
              <a href="#about-us" className="hover:text-[#3b71ad] transition-colors">About Us</a>
              <a href="#projects" className="hover:text-[#3b71ad] transition-colors">Portfolio</a>
              <a href="#testimonials" className="hover:text-[#3b71ad] transition-colors">Testimonials</a>
              <a href="#process" className="hover:text-[#3b71ad] transition-colors">Our Process</a>
              <a href="#faq" className="hover:text-[#3b71ad] transition-colors">FAQ</a>
              <a href="#consultation-booking" className="hover:text-[#3b71ad] transition-colors">Contact Us</a>
            </nav>
          </div>

          {/* Free Measure & Newsletter (Col 3) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <p className="font-mono text-[10px] text-[#64748b] uppercase tracking-widest font-bold mb-1">
              Free Mobile Showroom
            </p>
            <p className="text-xs text-[#475569] font-light">
              We bring our curated fabric and shutter samples directly to your doorstep across Brisbane &amp; Sunshine Coast.
            </p>

            <form onSubmit={handleNewsletter} className="flex flex-col gap-2 pt-2">
              <div className="flex items-center border-b border-[#cbd5e1] hover:border-[#3b71ad] transition-colors py-1.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-transparent text-xs text-[#0f172a] focus:outline-none placeholder:text-[#94a3b8]"
                />
                <button
                  type="submit"
                  className="font-mono text-[11px] uppercase text-[#3b71ad] hover:text-[#2d5b8f] transition-colors shrink-0 pl-2 font-bold cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
              {newsletterJoined ? (
                <span className="text-[11px] text-[#10b981] font-medium">Thank you for subscribing.</span>
              ) : (
                <span className="text-[10px] text-[#64748b] font-mono">Discretion guaranteed. No spam.</span>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#e2e8f0] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <p>© 2025 Brisbane Window Furnishings. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#0f172a] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#0f172a] transition-colors">Terms &amp; Conditions</a>
            <a href="#" className="hover:text-[#0f172a] transition-colors">10-Year Warranty</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
