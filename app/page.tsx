"use client";

import React, { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroCanvas } from "@/components/HeroCanvas";
import { HeroOverlayHUD } from "@/components/HeroOverlayHUD";
import { EngineeringSpecs } from "@/components/EngineeringSpecs";
import { FabricCustomizer } from "@/components/FabricCustomizer";
import { SpaceEstimator } from "@/components/SpaceEstimator";
import { InstallationsGallery } from "@/components/InstallationsGallery";
import { Footer } from "@/components/Footer";
import { ConsultationModal } from "@/components/ConsultationModal";

export default function Home() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleChapterChange = useCallback((chapterIdx: number) => {
    setActiveChapterIndex(chapterIdx);
  }, []);

  return (
    <main className="min-h-screen bg-[#060709] text-[#f4f4f5] selection:bg-amber-400 selection:text-black">
      {/* Top Navbar */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Hero Canvas Section with Sticky Viewport & 168 Frame Smooth Scroll Engine */}
      <div className="relative">
        <HeroCanvas onChapterChange={handleChapterChange} />
        <HeroOverlayHUD activeChapterIndex={activeChapterIndex} />
      </div>

      {/* Swiss Architectural Engineering Deep-Dive */}
      <EngineeringSpecs />

      {/* Material & Acoustic Textile Atelier */}
      <FabricCustomizer />

      {/* Live Room Dimension & Metric Estimator */}
      <SpaceEstimator />

      {/* Global Architectural Portfolio */}
      <InstallationsGallery />

      {/* Luxury Footer */}
      <Footer />

      {/* Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
}
