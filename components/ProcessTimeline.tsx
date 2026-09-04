"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface ProcessTimelineProps {
  onOpenBooking?: () => void;
}

const PROCESS_STEPS = [
  {
    step: "01",
    isPrimary: true,
    title: "Consultation & Laser Measure",
    desc: "Our lead architectural surveyor visits your residence with millimeter laser optics to assess orientation, wall structural capacity, and thermal dynamics.",
    badge: "Includes complimentary daylight audit",
  },
  {
    step: "02",
    isPrimary: false,
    title: "Design & Curated Swatches",
    desc: "Receive a presentation box with generous 30cm fabric swatches, machined brass and graphite track sections, and 3D architectural elevations.",
    badge: "Over 280 tactile linen finishes",
  },
  {
    step: "03",
    isPrimary: false,
    title: "Artisan Tailoring",
    desc: "Our guild workrooms hand-cut and stitch each drop. Hems are weighted with natural lead beads, blind-stitched, and steamed to achieve immaculate wave drape.",
    badge: "10-Day bench crafting cycle",
  },
  {
    step: "04",
    isPrimary: false,
    title: "White-Glove Installation",
    desc: "Our certified in-house technicians install concealed pelmets, dress the drapery, calibrate the motors, and integrate automations into your smart home system.",
    badge: "100% Perfect fit guarantee",
  },
];

export function ProcessTimeline({ onOpenBooking }: ProcessTimelineProps) {
  const stepsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && stepsGridRef.current) {
            const cards = stepsGridRef.current.children;
            if (cards.length > 0) {
              animate(Array.from(cards), {
                opacity: [0, 1],
                translateY: [24, 0],
                delay: stagger(90),
                duration: 650,
                ease: "outCubic",
              });
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (stepsGridRef.current) {
      observer.observe(stepsGridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-16 md:py-24 bg-[#f8fafc]" id="process">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-[#3b71ad]" />
            <span className="font-mono text-[10px] text-[#3b71ad] uppercase tracking-widest font-semibold">
              White-Glove Atelier Service
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0f172a] font-light tracking-tight">
            YOUR JOURNEY WITH US
          </h2>
          <p className="text-sm sm:text-base text-[#475569] mt-2 font-light leading-relaxed">
            From the initial architectural laser survey to bespoke European milling and whisper-quiet installation.
          </p>
        </div>

        {/* 4-Step Connecting Timeline Grid */}
        <div ref={stepsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PROCESS_STEPS.map((s, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 bg-white p-6 sm:p-7 rounded-2xl border border-[#e2e8f0] shadow-xs justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl font-semibold shadow-xs ${
                      s.isPrimary
                        ? "bg-gradient-to-br from-[#3b71ad] to-[#518ad0] text-white"
                        : "bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0]"
                    }`}
                  >
                    {s.step}
                  </div>
                  <span className="h-px flex-1 bg-[#e2e8f0]" />
                </div>

                <h3 className="font-serif text-lg text-[#0f172a] font-medium">
                  {s.title}
                </h3>

                <p className="text-xs text-[#475569] font-light leading-relaxed mt-2">
                  {s.desc}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#f8fafc] text-[10px] font-mono text-[#3b71ad] uppercase font-semibold border border-[#e2e8f0]">
                {s.badge}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
