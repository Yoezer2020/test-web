// app/user-dashboard/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CompanyGrid } from "@/features/user-dashboard/components/company-grid";
import { SearchFilter } from "@/features/user-dashboard/components/search-filter";
import { UserDashboardHeader } from "@/features/user-dashboard/components/header";
import { UserDashboardSidebar } from "@/features/user-dashboard/components/sidebar";
import { CompanyDashboardAlert } from "@/features/company-dashboard/components/dashboard-alert";
import { PasswordUpdateModal } from "@/features/user-dashboard/components/password-update-modal";
import Link from "next/link";

interface Company {
  id: string;
  name: string;
  type: "Company" | "Branch";
  registrationStatus: "registered" | "incomplete" | "underreview" | "payment";
  dateCreated: string;
  lastActivity: string;
  progress: number;
  uen?: string;
  description?: string;
  state?: string;
  orderNo?: string;
  email?: string;
}

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "DRUK GLOBAL LLC",
    type: "Company",
    registrationStatus: "registered",
    dateCreated: "2024-01-15",
    lastActivity: "2024-01-20",
    progress: 100,
    uen: "202401234A",
    description: "International trading and consulting services",
    state: "WY",
    orderNo: "223032493547",
    email: "cringnidupgmail.com",
  },
  {
    id: "2",
    name: "TECH INNOVATIONS PTE LTD",
    type: "Company",
    registrationStatus: "payment",
    dateCreated: "2024-01-18",
    lastActivity: "2024-01-19",
    progress: 100,
    description: "Software development and technology solutions",
    state: "SG",
    orderNo: "223032493548",
    email: "cringnidupgmail.com",
  },
  {
    id: "3",
    name: "SINGAPORE BRANCH OFFICE",
    type: "Branch",
    registrationStatus: "incomplete",
    dateCreated: "2024-01-20",
    lastActivity: "2024-01-20",
    progress: 100,
    description: "Regional branch operations for parent company",
    state: "SG",
    orderNo: "223032493549",
    email: "cringnidupgmail.com",
  },
  {
    id: "4",
    name: "SINGAPORE COMPANY OFFICE",
    type: "Company",
    registrationStatus: "incomplete",
    dateCreated: "2024-01-20",
    lastActivity: "2024-01-20",
    progress: 100,
    description: "Regional branch operations for parent company",
    state: "SG",
    orderNo: "223032493549",
    email: "cringnidupgmail.com",
  },
  {
    id: "5",
    name: "GREEN ENERGY SOLUTIONS",
    type: "Company",
    registrationStatus: "registered",
    dateCreated: "2023-12-10",
    lastActivity: "2024-01-18",
    progress: 100,
    uen: "202312567B",
    description: "Renewable energy consulting and implementation",
    state: "SG",
    orderNo: "223032493550",
    email: "cringnidupgmail.com",
  },
];

export default function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | Company["registrationStatus"]
  >("all");
  const [activeItem, setActiveItem] = useState("dashboard");
  const [showAlert, setShowAlert] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // if (status === "loading") {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //       <div className="flex items-center gap-2">
  //         <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
  //         <span>Loading...</span>
  //       </div>
  //     </div>
  //   );
  // }

  const userInfo = {
    name: "User",
    email: "user@example.com",
    initials: "U".substring(0, 2).toUpperCase(),
  };

  const filteredCompanies = mockCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || company.registrationStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // const stats = {
  //   total: mockCompanies.length,
  //   registered: mockCompanies.filter((c) => c.registrationStatus === "registered")
  //     .length,
  //   incomplete: mockCompanies.filter((c) => c.registrationStatus === "incomplete")
  //     .length,
  //   incomplete: mockCompanies.filter(
  //     (c) => c.registrationStatus === "incomplete"
  //   ).length,
  // };

  const handlePasswordUpdate = () => {
    console.log("Opening password update modal...");
    setShowPasswordModal(true);
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
  };

  const handlePasswordUpdateSubmit = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Password update:", data);

      // Hide the alert after successful password update
      setShowAlert(false);

      // Add your actual password update API call here
      // const response = await fetch('/api/update-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })

      // if (!response.ok) throw new Error('Password update failed')
    } catch (error) {
      console.error("Password update error:", error);
      throw error; // Re-throw to let the modal handle the error
    }
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
        {/* Alert Banner */}
        {showAlert && (
          <CompanyDashboardAlert
            message="For security reasons, please update your password. Your current password expires soon."
            actionText="UPDATE PASSWORD"
            onAction={handlePasswordUpdate}
            onDismiss={handleAlertDismiss}
            variant="warning"
          />
        )}

        {/* Header */}
        <UserDashboardHeader />

        {/* Page Content */}
        <main className="flex-1 p-6 space-y-8">
          {/* <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col lg:flex-row gap-2">
              <Link
                href={`/user-dashboard/register-company`}
                className="flex-1"
              >
                <Button className="bg-gray-900 hover:bg-gray-700 text-white font-semibold shadow-md w-fit">
                  <Plus className="h-4 w-4 mr-2" />
                  Register New Company
                </Button>
              </Link>
              <Link
                href={`/user-dashboard/register-company-branch`}
                className="flex-1"
              >
                <Button className="bg-blue-900 hover:bg-blue-400 text-white font-semibold shadow-md w-fit">
                  <Plus className="h-4 w-4 mr-2" />
                  Register New Company Branch
                </Button>
              </Link>
            </div>
          </div> */}

          {/* Search and Filter Section */}
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
          />

          {/* Companies Grid */}
          <CompanyGrid companies={filteredCompanies} />
        </main>
      </div>

      {/* Password Update Modal */}
      <PasswordUpdateModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onPasswordUpdate={handlePasswordUpdateSubmit}
      />
    </div>
  );
}
