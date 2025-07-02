"use client";

import { CompanyDashboardHeader } from "@/features/company-dashboard/components/dashboard-header";
import { CompanyDashboardSidebar } from "@/features/company-dashboard/components/sidebar";
import type React from "react";

export default function CompanyDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ companyId: string }>;
}) {
  // Since params is now a Promise, we need to handle it accordingly
  // In a real app, you would likely use async/await or React Suspense
  // For demonstration, we'll use a mock value
  const companyId = "1"; // You would normally get this from the resolved params

  // Mock company data - in real app, fetch based on companyId
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

  const handleStartNewCompany = () => {
    console.log("Starting new company registration...");
  };

  const handleFilingServices = () => {
    console.log("Opening filing services...");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    console.log(params);
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
          onStartNewCompany={handleStartNewCompany}
          onFilingServices={handleFilingServices}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
