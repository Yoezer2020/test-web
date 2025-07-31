"use client";

import { useState } from "react";
import { UserDashboardHeader } from "@/features/user-dashboard/components/header";
import { UserDashboardSidebar } from "@/features/user-dashboard/components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeItem, setActiveItem] = useState("dashboard");

  const userInfo = {
    name: "User",
    email: "user@example.com",
    initials: "U".substring(0, 2).toUpperCase(),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <UserDashboardSidebar
        activeItem={activeItem}
        userInfo={userInfo}
        onItemClick={setActiveItem}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <UserDashboardHeader />

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
