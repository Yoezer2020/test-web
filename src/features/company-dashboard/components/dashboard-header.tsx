"use client";

import { Button } from "@/components/ui/button";
import { Plus, FileText, LogOut } from "lucide-react";

interface CompanyDashboardHeaderProps {
  companyName?: string;
  companyInitials?: string;
  onStartNewCompany?: () => void;
  onFilingServices?: () => void;
  onLogout?: () => void;
}

export function CompanyDashboardHeader({
  companyName = "DRUK GLOBAL LLC",
  companyInitials = "DG",
  onStartNewCompany,
  onFilingServices,
  onLogout,
}: CompanyDashboardHeaderProps) {
  return (
    <header className="bg-white border-b-2 border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo and Company Info */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-black">
              <span>GCRO</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 ml-8">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">
                {companyInitials}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{companyName}</h1>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            onClick={onStartNewCompany}
            className="bg-black hover:bg-gray-800 text-white font-semibold shadow-md"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            START A NEW COMPANY
          </Button>

          <Button
            onClick={onFilingServices}
            variant="outline"
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white font-semibold"
            size="sm"
          >
            <FileText className="h-4 w-4 mr-2" />
            FILING SERVICES
          </Button>

          <Button
            onClick={onLogout}
            variant="ghost"
            className="text-gray-600 hover:text-black hover:bg-gray-100 font-medium"
            size="sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
