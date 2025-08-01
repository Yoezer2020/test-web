"use client";

import { CompanyDashboardHeader } from "@/features/company-dashboard/components/dashboard-header";
import { CompanyDashboardSidebar } from "@/features/company-dashboard/components/sidebar";
import { useRouter } from "next/navigation";
import type React from "react";

export default function CompanyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ companyId: string }>;
}) {
  const companyId = "1"; // You would normally get this from the resolved params
  const router = useRouter();

  const companyData = {
    "1": { name: "DRUK GLOBAL LLC", initials: "DG" },
    "2": { name: "TECH INNOVATIONS PTE LTD", initials: "TI" },
    "3": { name: "SINGAPORE BRANCH OFFICE", initials: "SB" },
    "4": { name: "GREEN ENERGY SOLUTIONS", initials: "GE" },
  };

  const company = companyData[companyId as keyof typeof companyData] || {
    name: "Digital kidu",
    initials: "DK",
  };

  const userInfo = {
    name: "Tenzin Yoezer",
    email: "tenzinoser2@gmail.com",
    avatar: "",
  };

  const handleLogout = () => {
    router.push("/user-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alert Banner */}

      {/* Sidebar */}
      <CompanyDashboardSidebar
        // activeItem={activeMenuItem}
        userInfo={userInfo}
      />

      {/* Main Content Area */}
      <div className="md:ml-64 transition-all duration-300">
        {/* Header */}
        <CompanyDashboardHeader
          companyName={company.name}
          companyInitials={company.initials}
          onLogout={handleLogout}
        />
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
