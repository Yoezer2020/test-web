"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  FileText,
  Users,
  FolderOpen,
  Building2,
  Shield,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  activeItem?: string;
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const menuItems = [
  // { id: "dashboard", label: "Dashboard", icon: Home, href: "#" },
  // { id: "applications", label: "My Applications", icon: FileText, href: "#" },
  // { id: "team", label: "Team Management", icon: Users, href: "#" },
  { id: "documents", label: "Document Center", icon: FolderOpen, href: "#" },
  { id: "profile", label: "Company Profile", icon: Building2, href: "#" },
  // { id: "compliance", label: "Compliance & Updates", icon: Shield, href: "#" },
  // { id: "support", label: "Support", icon: HelpCircle, href: "#" },
  { id: "settings", label: "Account Settings", icon: Settings, href: "#" },
];

export function CompanyDashboardSidebar({
  activeItem = "dashboard",
  userInfo,
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const defaultUser = {
    name: "John Doe",
    email: "john.doe@company.com",
    avatar: "",
  };

  const user = userInfo || defaultUser;

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout logic here
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-lg border border-gray-200 hover:bg-gray-50"
        onClick={toggleMobile}
      >
        {isMobileOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Back to Companies Button */}
          {/* <div className="p-4 border-b border-gray-200">
            <Link
              href="/"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Companies
            </Link>
          </div> */}

          {/* User Profile Section */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-gray-300">
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                />
                <AvatarFallback className="bg-black text-white font-bold text-sm">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-600 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-black text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-black"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? "text-white" : "text-gray-500"
                    }`}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-black hover:bg-gray-100 font-medium"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
