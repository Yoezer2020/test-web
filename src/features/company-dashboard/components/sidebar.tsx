"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";
import { SimpleImage } from "@/components/inputs/simple-image/simple-image";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

interface SidebarProps {
  activeItem?: string;
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
  menuItems: MenuItem[];
}

export function CompanyDashboardSidebar({
  activeItem = "dashboard",
  userInfo,
  menuItems,
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const defaultUser = {
    name: "John Doe",
    email: "john.doe@company.com",
    avatar: "",
  };
  const user = userInfo || defaultUser;
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
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
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMobile}
        />
      )}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6">
          {" "}
          <div className="mb-8 flex items-center justify-center">
            <Link href="/private/user-dashboard">
              {" "}
              <SimpleImage
                src="/images/logo-dark.svg"
                alt="Description"
                width={70}
                height={70}
                fallback={
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                }
              />
            </Link>
          </div>
          <div className="flex items-center space-x-3 mb-8 p-3 bg-gray-50 rounded-lg">
            <Avatar className="h-10 w-10 bg-black">
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
          <nav className="flex-1 space-y-2 overflow-y-auto">
            {" "}
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <Link
                  href={item.href}
                  key={item.id}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {" "}
                  <button
                    className={`w-full flex space-y-12 items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-black bg-gray-100 border-l-4 border-black"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-4 w-4 ${
                        isActive ? "text-black" : "text-gray-500"
                      }`}
                    />
                    {item.label}
                  </button>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
