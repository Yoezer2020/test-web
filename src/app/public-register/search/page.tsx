"use client";

import { useState, useEffect } from "react";
import { EnablingBusiness } from "@/features/public-register/search/components/enabling-business";
import { HeroSection } from "@/features/public-register/search/components/hero-section";
import { InformationGuides } from "@/features/public-register/search/components/information-guides";
import { PopularSection } from "@/features/public-register/search/components/popular-section";
import { SearchSection } from "@/features/public-register/search/components/search-section";
import { Footer } from "@/features/public-register/search/components/footer";

export default function PublicRegisterPage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = "/images/Gelephu Dzo.svg";
  }, []);

  return (
    <div className="relative w-full max-w-screen overflow-x-hidden transition-all duration-500">
      {/* Background Image Layer (full, responsive) */}
      {imageLoaded && (
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url('/images/Gelephu Dzo.svg')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "scroll",
            backgroundColor: "#fff",
            filter: "blur(2px)",
          }}
        />
      )}

      {/* Overlay Layer */}
      <div className="absolute inset-0 z-0 bg-white/85 dark:bg-gray-900/85" />

      {/* Content Layer */}
      <div className="relative z-10">
        <HeroSection />
        <SearchSection />
        <PopularSection />
        <InformationGuides />
        <EnablingBusiness />
        <Footer />
      </div>
    </div>
  );
}
