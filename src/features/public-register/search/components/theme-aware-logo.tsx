"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useThemeConfig } from "@/components/active-theme";

interface ThemeAwareLogoProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  // Optional: Different logos for different color themes
  themeLogos?: {
    [key: string]: {
      light: string;
      dark: string;
    };
  };
}

export function ThemeAwareLogo({
  lightSrc,
  darkSrc,
  alt,
  width = 120,
  height = 120,
  className = "",
  priority = false,
  themeLogos,
}: ThemeAwareLogoProps) {
  const { activeTheme, isDarkMode } = useThemeConfig() as {
    activeTheme: string;
    isDarkMode: boolean;
  };
  const [logoError, setLogoError] = useState({ light: false, dark: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoError = (mode: "light" | "dark") => {
    setLogoError((prev) => ({ ...prev, [mode]: true }));
  };

  // Reset logo errors when theme changes
  useEffect(() => {
    setLogoError({ light: false, dark: false });
  }, [activeTheme]);

  // Get theme-specific logo sources
  const getLogoSources = () => {
    if (themeLogos && themeLogos[activeTheme]) {
      return {
        light: themeLogos[activeTheme].light,
        dark: themeLogos[activeTheme].dark,
      };
    }
    return {
      light: lightSrc,
      dark: darkSrc,
    };
  };

  // Show fallback while mounting or if both logos fail
  if (!mounted || (logoError.light && logoError.dark)) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="text-4xl sm:text-6xl">🏢</div>
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          GCRO
        </span>
      </div>
    );
  }

  const logoSources = getLogoSources();

  return (
    <div className="relative flex items-center justify-center">
      {/* Light Mode Logo */}
      {!logoError.light && (
        <Image
          src={logoSources.light || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={`object-contain transition-all duration-500 ${className} ${
            isDarkMode ? "absolute inset-0 opacity-0" : "opacity-100"
          }`}
          onError={() => handleLogoError("light")}
          priority={priority}
        />
      )}

      {/* Dark Mode Logo */}
      {!logoError.dark && (
        <Image
          src={logoSources.dark || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={`object-contain transition-all duration-500 ${className} ${
            isDarkMode ? "opacity-100" : "absolute inset-0 opacity-0"
          }`}
          onError={() => handleLogoError("dark")}
          priority={priority}
        />
      )}

      {/* Theme indicator (optional) */}
      {mounted && (
        <div className="absolute -right-2 -bottom-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div
            className={`h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${getThemeColor()}`}
          />
        </div>
      )}
    </div>
  );

  function getThemeColor() {
    switch (activeTheme) {
      case "blue":
      case "blue-scaled":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "amber":
        return "bg-amber-500";
      case "mono-scaled":
        return "bg-gray-500";
      default:
        return "bg-gray-900 dark:bg-white";
    }
  }
}
