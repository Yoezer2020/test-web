"use client";

import { SessionProvider } from "@/components/session-provider";
import type React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
