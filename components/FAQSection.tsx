"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { animate, stagger } from "animejs";

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
  const faqListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && faqListRef.current) {
            const items = faqListRef.current.children;
            if (items.length > 0) {
              animate(Array.from(items), {
                opacity: [0, 1],
                translateY: [18, 0],
                delay: stagger(60),
                duration: 600,
                ease: "outCubic",
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (faqListRef.current) {
      observer.observe(faqListRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[#f8fafc]" id="faq">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#3b71ad]" />
            <span className="font-mono text-[10px] text-[#3b71ad] uppercase tracking-widest font-semibold">
              Got Questions?
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0f172a] font-light tracking-tight">
            FREQUENTLY ASKED <span className="italic font-serif text-[#3b71ad]">QUESTIONS</span>
          </h2>
          <p className="text-sm sm:text-base text-[#475569] mt-2 font-light leading-relaxed">
            Everything you need to know about our custom measuring, motorisation, and installation process.
          </p>
        </div>

        {/* Accordion FAQ Grid */}
        <div ref={faqListRef} className="max-w-3xl space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#f8fafc] transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-[#0f172a] font-medium">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0 text-[#3b71ad] transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#ebf3fc]" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#475569] font-light leading-relaxed border-t border-[#f1f5f9] animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#f1f5f9] border border-[#e2e8f0] max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-base font-medium text-[#0f172a]">Have a specific architectural requirement?</h4>
            <p className="text-xs text-[#475569] font-light mt-0.5">Call our North Lakes team directly or request a mobile showroom consultation.</p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#3b71ad] to-[#4c84c4] text-white hover:from-[#2d5b8f] hover:to-[#3b71ad] font-mono text-xs uppercase font-bold transition-all shrink-0 cursor-pointer shadow-sm shadow-[#3b71ad]/25"
          >
            Speak With An Expert
          </button>
        </div>

      </div>
    </section>
  );
}
