import type { Metadata, Viewport } from "next";
import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeConfigProvider } from "@/components/active-theme";
import { Providers } from "@/redux/Provider";

const inter = Inter({ subsets: ["latin"] });

const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const metadata: Metadata = {
  title: "GCRO - Business Registry",
  description:
    "Your one-stop digital service portal for business registration, filing and information",
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeConfigProvider>
          {" "}
          <Providers>{children}</Providers>
        </ThemeConfigProvider>
      </body>
    </html>
  );
}
