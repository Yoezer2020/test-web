"use client";
import { CompanyDashboardHeader } from "@/features/company-dashboard/components/dashboard-header";
import { CompanyDashboardSidebar } from "@/features/company-dashboard/components/sidebar";
import {
  Building2,
  FileCheck,
  FolderOpen,
  LayoutDashboard,
  NotebookText,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import type React from "react";

// Define the menu items structure with static hrefs
const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/private/company-dashboard",
  },
  {
    id: "documents",
    label: "Document Center",
    icon: FolderOpen,
    href: "/private/company-dashboard/company-documents",
  },
  {
    id: "profile",
    label: "Company Profile",
    icon: Building2,
    href: "/private/company-dashboard/company-profile",
  },
  {
    id: "compliance",
    label: "Annual Filing",
    icon: FileCheck,
    href: "/private/company-dashboard/annual-filing",
  },
  {
    id: "cspRegistry",
    label: "CSP Registry",
    icon: NotebookText,
    href: "/private/company-dashboard/csp-registry",
  },
];

export default function CompanyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  const companyData = {
    "1": { name: "DRUK GLOBAL LLC", initials: "DG" },
    "2": { name: "TECH INNOVATIONS PTE LTD", initials: "TI" },
    "3": { name: "SINGAPORE BRANCH OFFICE", initials: "SB" },
    "4": { name: "GREEN ENERGY SOLUTIONS", initials: "GE" },
  };
  const companyId = "1"; // Static company ID
  const company = companyData[companyId as keyof typeof companyData] || {
    name: "Digital kidu",
    initials: "DK",
  };
  const userInfo = {
    name: "Tenzin Yoezer",
    email: "tenzinoser2@gmail.com",
    avatar: "",
  };

  // Function to get the active menu item based on the current path
  const getActiveMenuItem = (path: string) => {
    const normalizedPath = path.replace(/\/$/, "").toLowerCase();
    const sortedItems = [...menuItems].sort(
      (a, b) => b.href.length - a.href.length
    );

    for (const item of sortedItems) {
      const normalizedHref = item.href.replace(/\/$/, "").toLowerCase();
      if (normalizedPath === normalizedHref) {
        return item.id;
      }
      if (normalizedPath.startsWith(normalizedHref + "/")) {
        return item.id;
      }
    }
    return "dashboard"; // Default to "dashboard" if no match
  };

  const activeMenuItem = getActiveMenuItem(pathname || "");

  const handleLogout = () => {
    router.push("/private/user-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <CompanyDashboardSidebar
        activeItem={activeMenuItem}
        userInfo={userInfo}
        menuItems={menuItems} // Pass static menu items to sidebar
      />
      {/* Main Content Area */}
      <div className="md:ml-64 transition-all duration-300">
        {/* Header */}
        <CompanyDashboardHeader
          companyName={company.name}
          companyInitials={company.initials}
          onLogout={handleLogout}
        />
        <main className="min-h-screen p-4">{children}</main>
      </div>
    </div>
  );
}
