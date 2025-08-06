"use client";
import { UserDashboardHeader } from "@/features/user-dashboard/components/header";
import { UserDashboardSidebar } from "@/features/user-dashboard/components/sidebar";
import { useState } from "react";

export default function DashboardLayout({ children }: any) {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle

  const userInfo = {
    name: "User",
    email: "user@example.com",
    initials: "U".substring(0, 2).toUpperCase(),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <UserDashboardSidebar
          activeItem={activeItem}
          userInfo={userInfo}
          onItemClick={setActiveItem}
        />
      </div>

      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div className="flex-1 md:ml-64 transition-all duration-300">
        <UserDashboardHeader />
        <main className="min-h-screen p-4">{children}</main>
      </div>
    </div>
  );
}
