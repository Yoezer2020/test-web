"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { useThemeConfig } from "@/components/active-theme";
import Image from "next/image";
import NextLink from "next/link";

// Mode Toggle Component
function ModeToggle() {
  const { isDarkMode, toggleDarkMode } = useThemeConfig();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleDarkMode}
      className="hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 transition-all duration-200"
    >
      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b-2 border-gray-200 dark:border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center group">
            <div className="relative">
              {/* Show fallback if both logos fail */}

              <>
                <Image
                  src="/images/gmc_color_logo.svg" // Your light mode logo
                  alt="GCRO Logo"
                  width={60}
                  height={60}
                  className={`object-contain drop-shadow-lg transition-all duration-300 group-hover:scale-110 "relative opacity-100" : "absolute opacity-0"
                  }`}
                  priority
                />
              </>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
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

          {/* Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Register
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-2 border-gray-200 dark:border-white/20">
                <DropdownMenuItem className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  New Registration
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  Entity Types
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  Requirements
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Manage
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-2 border-gray-200 dark:border-white/20">
                <DropdownMenuItem className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  My Entities
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  Update Information
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  Compliance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Annual Filing
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-2 border-gray-200 dark:border-white/20">
                <DropdownMenuItem className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  File Annual Return
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  Filing History
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  Deadlines
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Others
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-2 border-gray-200 dark:border-white/20">
                <DropdownMenuItem className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  Forms & Guides
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  Fees
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  Support
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <ModeToggle />

            <Button
              variant="ghost"
              size="sm"
              className="transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Login
            </Button>
            <Button
              size="sm"
              className="bg-gray-900 text-white transition-all duration-200 hover:scale-105 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Sign up free →
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
