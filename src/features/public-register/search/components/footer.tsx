"use client";

import { Button } from "@/components/ui/button";
import { Info, Newspaper, BookOpen, MessageSquare, Phone } from "lucide-react";

const footerLinks = {
  main: [
    {
      title: "About Us",
      icon: Info,
      href: "/about",
    },
    {
      title: "News Room",
      icon: Newspaper,
      href: "/news",
    },
    {
      title: "Guides",
      icon: BookOpen,
      href: "/guides",
    },
    {
      title: "Feedback",
      icon: MessageSquare,
      href: "/feedback",
    },
    {
      title: "Contact Us",
      icon: Phone,
      href: "/contact",
    },
  ],
  legal: [
    {
      title: "Report vulnerability",
      href: "/report-vulnerability",
    },
    {
      title: "Privacy statement",
      href: "/privacy",
    },
    {
      title: "Terms of use",
      href: "/terms",
    },
    {
      title: "Sitemap",
      href: "/sitemap",
    },
  ],
};

export function Footer() {
  return (
    <footer className="w-full">
      {/* Orange accent bar */}
      <div className="h-1 border-t border-gray-300 dark:border-white/20" />

      {/* Main footer content */}
      <div className="border-b bg-gray-800 text-gray-300 dark:bg-gray-950 dark:text-gray-400">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Logo and branding */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white lg:text-2xl dark:text-white">
                    GCRO
                  </h3>
                  <p className="max-w-xs text-sm leading-tight text-white-500 lg:text-base dark:text-gray-300">
                    GELEPHU COMPANY
                    <br />
                    REGISTRATION AND OPERATION
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {footerLinks.main.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="group h-auto justify-start p-3 transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800"
                  asChild
                >
                  <a href={link.href} className="flex items-center space-x-3">
                    <link.icon className="h-5 w-5 text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300" />
                    <span className="font-medium text-white-500 transition-colors group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white">
                      {link.title}
                    </span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
