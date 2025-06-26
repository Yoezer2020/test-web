"use client";

import { useState, useEffect } from "react";
import { SectionContainer } from "@/components/layout/section-container";
import { ExpressionOfInterestForm } from "@/features/public-register/start-business/components/expression-of-interest-form";

export default function StartBusinessPage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = "/images/Gelephu Dzo.svg";
  }, []);

  return (
    <div className="relative w-full min-h-screen">
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
      <div className="absolute inset-0 z-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm" />

      {/* Content Layer */}
      <div className="relative z-10 py-8">
        <SectionContainer size="xl" padding="lg">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Start Your Business Journey
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Begin with an Expression of Interest to register your business
                entity in Bhutan
              </p>
            </div>

            {/* Form */}
            <ExpressionOfInterestForm />
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
