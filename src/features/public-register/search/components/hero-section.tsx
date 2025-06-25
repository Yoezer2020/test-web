"use client";

import { SectionContainer } from "@/components/layout/section-container";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useThemeConfig } from "@/components/active-theme";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";

export function HeroSection() {
  const { isDarkMode } = useThemeConfig();
  const [logoError, setLogoError] = useState({ light: false, dark: false });
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoError = (mode: "light" | "dark") => {
    setLogoError((prev) => ({ ...prev, [mode]: true }));
  };

  const LogoComponent = () => {
    if (!mounted) {
      // Show placeholder while mounting
      return (
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-4xl sm:text-6xl">🏢</div>
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            GCRO
          </span>
        </div>
      );
    }

    // If both logos failed to load, show fallback
    if (logoError.light && logoError.dark) {
      return (
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-4xl sm:text-6xl">🏢</div>
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            GCRO
          </span>
        </div>
      );
    }

    return (
      <div className="relative flex items-center justify-center">
        {/* Light Mode Logo */}
        {!logoError.light && (
          <Image
            src="/images/logo-dark.svg"
            alt="GCRO Logo"
            width={150}
            height={150}
            className={`object-contain transition-opacity duration-500 ${
              isDarkMode ? "opacity-0 absolute inset-0" : "opacity-100"
            }`}
            onError={() => handleLogoError("light")}
            priority
          />
        )}

        {/* Dark Mode Logo */}
        {!logoError.dark && (
          <Image
            src="/images/logo-light.svg"
            alt="GCRO Logo"
            width={150}
            height={150}
            className={`object-contain transition-opacity duration-500 ${
              isDarkMode ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
            onError={() => handleLogoError("dark")}
            priority
          />
        )}
      </div>
    );
  };

  return (
    <SectionContainer
      size="xl"
      padding="lg"
      className="relative overflow-hidden"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="space-y-4 text-center sm:space-y-6 lg:text-left">
          <h1 className="text-3xl leading-tight font-bold text-gray-900 sm:text-4xl lg:text-5xl xl:text-6xl dark:text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              GCRO
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl lg:mx-0 dark:text-gray-300">
            Your one-stop digital service portal for business registration,
            filing and information
          </p>
        </div>
        {/* Call to Action Button */}

        <div className="relative mx-auto max-w-lg lg:max-w-none">
          <LogoComponent />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <NextLink href="/public-register/start-business">
              Start a Business
            </NextLink>
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
