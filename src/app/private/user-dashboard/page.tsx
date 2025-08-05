"use client";

import { useState } from "react";
import { CompanyGrid } from "@/features/user-dashboard/components/company-grid";
import { SearchFilter } from "@/features/user-dashboard/components/search-filter";
import { CompanyDashboardAlert } from "@/features/company-dashboard/components/dashboard-alert";
import { PasswordUpdateModal } from "@/features/user-dashboard/components/password-update-modal";
import { Button } from "@/components/ui/button";
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
    progress: 10,
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
    progress: 10,
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
  const [showAlert, setShowAlert] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const filteredCompanies = mockCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || company.registrationStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
    } catch (error) {
      console.error("Password update error:", error);
      throw error;
    }
  };

  return (
    <>
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

      {/* Page Content */}
      <div className="p-6 space-y-8">
        <Button>
          <Link href={`/private/user-dashboard/expression-of-interest`}>
            Submit another EOI
          </Link>
        </Button>
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />

        <CompanyGrid companies={filteredCompanies} />
      </div>

      <PasswordUpdateModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onPasswordUpdate={handlePasswordUpdateSubmit}
      />
    </>
  );
}
