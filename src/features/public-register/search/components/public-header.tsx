"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Moon, Sun, Menu } from "lucide-react";
import { useThemeConfig } from "@/components/active-theme";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";

// Logo Component
function LogoComponent() {
  const { isDarkMode } = useThemeConfig();
  const [logoError, setLogoError] = useState({ light: false, dark: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoError = (mode: "light" | "dark") => {
    setLogoError((prev) => ({ ...prev, [mode]: true }));
  };

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <div className="text-2xl">🏢</div>
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          GCRO
        </span>
      </div>
    );
  }

  if (logoError.light && logoError.dark) {
    return (
      <div className="flex items-center space-x-2">
        <div className="text-2xl">🏢</div>
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          GCRO
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-8 h-8">
        {/* Light Mode Logo */}
        {!logoError.light && (
          <Image
            src="/images/logo-dark.svg"
            alt="GCRO Logo"
            width={32}
            height={32}
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
            width={32}
            height={32}
            className={`object-contain transition-opacity duration-500 ${
              isDarkMode ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
            onError={() => handleLogoError("dark")}
            priority
          />
        )}
      </div>
      <span className="text-lg font-bold text-gray-900 dark:text-white">
        Gelephu Corporate Registration Office
      </span>
    </div>
  );
}

// Mode Toggle Component
function ModeToggle() {
  const { isDarkMode, toggleDarkMode } = useThemeConfig();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className="transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

// Navigation Menu Component
function NavigationMenu() {
  return (
    <nav className="hidden items-center space-x-6 lg:flex">
      {/* Navigation items */}
    </nav>
  );
}

// Mobile Navigation Component
function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col space-y-4 mt-8">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Register
            </h3>
            <div className="pl-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                New Registration
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Entity Types
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Requirements
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Manage
            </h3>
            <div className="pl-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                My Entities
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Update Information
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Compliance
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Annual Filing
            </h3>
            <div className="pl-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                File Annual Return
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Filing History
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Deadlines
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Others
            </h3>
            <div className="pl-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                Forms & Guides
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Fees
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Support
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t space-y-2">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            >
              <NextLink href="/public-register/start-business">
                Start a Business
              </NextLink>
            </Button>
            {/* Updated Mobile Login Button */}
            <Button asChild variant="ghost" className="w-full">
              <NextLink href="/login">Login</NextLink>
            </Button>
            <Button className="w-full bg-gray-900 text-white dark:bg-white dark:text-gray-900">
              Sign up free →
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b-2 border-gray-200 dark:border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left side */}
          <div className="flex-shrink-0">
            <NextLink href="/" className="flex items-center">
              <LogoComponent />
            </NextLink>
          </div>

          {/* Navigation - Center */}
          <NavigationMenu />

          {/* Actions - Right side */}
          <div className="flex items-center space-x-2">
            {/* Desktop Auth Buttons - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-2">
              <Button
                asChild
                size="sm"
                className="hidden sm:flex bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <NextLink href="/public-register/start-business">
                  Start a Business
                </NextLink>
              </Button>
              {/* Updated Desktop Login Button */}
              <Button
                asChild
                size="sm"
                className="bg-gray-900 text-white transition-all duration-200 hover:scale-105 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
              >
                <NextLink href="/auth/login">Login →</NextLink>
              </Button>
            </div>

            {/* Theme Toggle */}
            <ModeToggle />

            {/* Mobile Menu */}
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}
