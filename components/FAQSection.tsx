"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Do you supply and install motorized blinds and curtains?",
    answer: "Yes. We specialize in smart home integration. We provide hardwired or rechargeable battery-operated motorized roller blinds, curtains, and exterior awnings using premium motors from leading brands like Somfy and Matter. These can be integrated seamlessly into your home automation system, smartphone app, or operated via handheld wand and remote."
  },
  {
    question: "Are your external window shades suitable for Brisbane's high-wind areas?",
    answer: "Absolutely. Our outdoor blinds and zip-screen systems are engineered and tested to withstand high Queensland coastal wind gusts up to 120km/h. They feature heavy-duty aluminum side channels and welded lock-zip edges to prevent fabric blow-out during storms."
  },
  {
    question: "We are building a new custom home. When should we contact you?",
    answer: "The ideal time to reach out is during the framing or electrical rough-in stage before plasterboard is installed. This allows us to work with your builder to incorporate concealed ceiling pelmets and run low-voltage power cables for invisible motorized drapery tracks."
  },
  {
    question: "Can you handle large commercial window furnishings projects?",
    answer: "Yes, we regularly service commercial projects across Brisbane, including executive corporate offices, boutique medical clinics, schools, and multi-residential developments with fire-rated, UV-certified commercial shading fabrics."
  },
  {
    question: "What's the difference between custom window furnishings and off-the-shelf options?",
    answer: "Custom window furnishings are precision-measured to the millimeter for your exact window reveal, eliminating unsightly light gaps, sagging headers, and uneven drops. They use commercial-grade components and high-UV textiles built to last 10+ years in the Queensland climate."
  },
  {
    question: "Do you service my specific suburb?",
    answer: "We service the entire Greater Brisbane area, Moreton Bay region, and the Sunshine Coast — including North Lakes, Carseldine, Bridgeman Downs, Caboolture, Figtree Pocket, Kuraby, Toorak, Albany Creek, Caloundra, Maroochydore, and surrounding suburbs with our mobile showroom."
  }
];

export function FAQSection({ onOpenBooking }: { onOpenBooking?: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[#fbf9f6]" id="faq">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#7c572d]" />
            <span className="font-mono text-[10px] text-[#7c572d] uppercase tracking-widest font-semibold">
              Got Questions?
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1b1c1a] font-light tracking-tight">
            FREQUENTLY ASKED <span className="italic font-serif text-[#7c572d]">QUESTIONS</span>
          </h2>
          <p className="text-sm sm:text-base text-[#50453b] mt-2 font-light leading-relaxed">
            Everything you need to know about our custom measuring, motorisation, and installation process.
          </p>
        </div>

        {/* Accordion FAQ Grid */}
        <div className="max-w-3xl space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#e4e2df] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg text-[#1b1c1a] font-medium">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-[#f5f3f0] flex items-center justify-center shrink-0 text-[#7c572d] transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#d4a574]/20" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#50453b] font-light leading-relaxed border-t border-[#efeeeb] animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#f5f3f0] border border-[#e4e2df] max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-base font-medium text-[#1b1c1a]">Have a specific architectural requirement?</h4>
            <p className="text-xs text-[#50453b] font-light mt-0.5">Call our North Lakes team directly or request a mobile showroom consultation.</p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-full bg-[#7c572d] text-white hover:bg-[#d4a574] hover:text-[#2c1700] font-mono text-xs uppercase font-bold transition-colors shrink-0 cursor-pointer"
          >
            Speak With An Expert
          </button>
        </div>

      </div>
    </section>
  );
}
