"use client";

import React, { useState } from "react";
import { Star, Quote, ArrowUpRight, CheckCircle2 } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Erica McHeyzer",
    time: "1 month ago",
    stars: 5,
    highlight: "Refreshing small business that offers great products, fair prices, and genuine customer service.",
    text: "We couldn't be happier with our blinds from Brisbane Window Furnishings. When we first started looking at blinds, we had no idea where to begin. From the moment Hari came to our home, everything was easy. He was friendly, professional, and genuinely helpful without ever being pushy. His quote was very reasonable, and he guided us through all options. The installation was quick, the quality is fantastic, and the whole experience was seamless.",
    location: "North Lakes, Brisbane"
  },
  {
    name: "R Manda",
    time: "1 month ago",
    stars: 5,
    highlight: "Completely transformed our newly built home.",
    text: "I recently purchased Blockout, Verishade and Sheer curtains, roller blinds and plantation shutters for our newly built home. The team was extremely helpful throughout the selection process and provided honest advice that perfectly suited our space. The pricing was very reasonable considering the quality of the materials.",
    location: "Bridgeman Downs, Brisbane"
  },
  {
    name: "Rajesh K. Raveendran",
    time: "1 week ago",
    stars: 5,
    highlight: "Love the new curtains — they look fantastic!",
    text: "The overall service was excellent, and I'm very happy with the result. Highly recommended for anyone in Brisbane looking for top quality window furnishings.",
    location: "Carseldine, Brisbane"
  },
  {
    name: "Bibi Krishnan",
    time: "1 week ago",
    stars: 5,
    highlight: "Excellent and easy to work with!",
    text: "They attended to all our needs and addressed all the aesthetics we wanted. Would definitely go with them again if I ever build another home.",
    location: "Sunshine Coast"
  },
  {
    name: "Ankit Trivedi",
    time: "2 months ago",
    stars: 5,
    highlight: "Plantation shutters and ceiling-to-floor curtains.",
    text: "Excellent service on our plantation shutters and ceiling-to-floor curtains. Always on time and very responsive with the best value for money I came across.",
    location: "Figtree Pocket, Brisbane"
  },
  {
    name: "Edward Koirala",
    time: "3 months ago",
    stars: 5,
    highlight: "Sheer curtains done at our Geebung property.",
    text: "Excellent work, got my sheer curtains done at my property at Geebung, Brisbane. Highly satisfied with workmanship and customer service from start to finish.",
    location: "Geebung, Brisbane"
  }
];

export function TestimonialsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-16 md:py-24 bg-[#f5f3f0]" id="testimonials">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#7c572d]" />
              <span className="font-mono text-[10px] text-[#7c572d] uppercase tracking-widest font-semibold">
                Customer Testimonials
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1b1c1a] font-light tracking-tight">
              HEAR WHAT OUR <span className="italic font-serif text-[#7c572d]">CUSTOMERS SAY</span>
            </h2>
            <p className="text-sm sm:text-base text-[#50453b] mt-2 font-light leading-relaxed">
              Read authentic feedback from homeowners and builders across Brisbane and the Sunshine Coast.
            </p>
          </div>

          {/* Google 5-Star Trust Badge */}
          <div className="bg-white px-5 py-3 rounded-2xl border border-[#e4e2df] shadow-sm flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-mono text-[11px] text-[#1b1c1a] font-bold mt-1">
                5.0 EXCELLENT (69+ Google Reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Testimonials 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-2xl border border-[#e4e2df] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-[#827569]">{review.time}</span>
                </div>

                <p className="font-serif text-sm font-medium text-[#1b1c1a] mb-2 leading-snug">
                  "{review.highlight}"
                </p>

                <p className="text-xs text-[#50453b] font-light leading-relaxed mb-4">
                  {expandedIndex === idx ? review.text : `${review.text.slice(0, 160)}...`}
                </p>
                {review.text.length > 160 && (
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                    className="text-[11px] font-mono text-[#7c572d] hover:underline font-semibold cursor-pointer mb-4"
                  >
                    {expandedIndex === idx ? "Read less" : "Read more"}
                  </button>
                )}
              </div>

              <div className="pt-3 border-t border-[#efeeeb] flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#1b1c1a] flex items-center gap-1">
                    <span>{review.name}</span>
                    <CheckCircle2 className="w-3 h-3 text-[#0d6c43]" />
                  </div>
                  <div className="text-[10px] font-mono text-[#827569]">{review.location}</div>
                </div>
                <span className="text-[10px] font-mono text-[#7c572d] bg-[#d4a574]/15 px-2 py-0.5 rounded">
                  Verified Client
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Google Reviews Action */}
        <div className="text-center mt-10">
          <a
            href="https://www.google.com/maps/place/Brisbane+Window+Furnishings/@-27.0635319,152.9931964,233890m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8f55c94aac77f11f:0xe9e605993c7800dd!8m2!3d-27.0635319!4d152.9931964!16s%2Fg%2F11xkpv5z9h"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#7c572d] hover:text-[#1b1c1a] font-bold uppercase tracking-wider"
          >
            <span>Read All Google Reviews</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
