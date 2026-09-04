"use client";

import React from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutUsSection } from "@/components/AboutUsSection";
import { ProductTransformShowcase } from "@/components/ProductTransformShowcase";
import { ProjectsGallery } from "@/components/ProjectsGallery";
import { MotorisationSmartHub } from "@/components/MotorisationSmartHub";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { BookingCTA } from "@/components/BookingCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  const scrollToBooking = () => {
    const elem = document.getElementById("consultation-booking");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a] antialiased selection:bg-[#80a8d8]/30 selection:text-[#0f2744]">
      {/* 56px Sticky Navigation */}
      <Header onOpenBooking={scrollToBooking} />

      {/* 1. Hero Section: "YOUR WINDOWS. YOUR LIGHT. YOUR SPACE." */}
      <HeroSection onOpenBooking={scrollToBooking} />

      {/* 2. About Us: "REFRESH YOUR SPACE WITH BESPOKE WINDOW SOLUTIONS" */}
      <AboutUsSection onOpenBooking={scrollToBooking} />

      {/* 3. Products: "FABRIC → WINDOW → ROOM" & Curated Systems */}
      <ProductTransformShowcase onOpenBooking={scrollToBooking} />

      {/* 4. Portfolio: "WINDOWS AS FRAMES" — Recent Projects Across Brisbane */}
      <ProjectsGallery onOpenBooking={scrollToBooking} />

      {/* 5. Motorisation: "ONE TAP CHANGES THE ROOM" */}
      <MotorisationSmartHub onOpenBooking={scrollToBooking} />

      {/* 6. Process: "YOUR JOURNEY WITH US" */}
      <ProcessTimeline onOpenBooking={scrollToBooking} />

      {/* 7. Testimonials: "HEAR WHAT OUR CUSTOMERS SAY" (5-Star Google Reviews) */}
      <TestimonialsSection />

      {/* 8. FAQ: "FREQUENTLY ASKED QUESTIONS" */}
      <FAQSection onOpenBooking={scrollToBooking} />

      {/* 9. Consultation Booking: "BOOK YOUR FREE MEASURE & QUOTE TODAY" */}
      <BookingCTA />

      {/* 10. Footer */}
      <Footer />
    </main>
  );
}
