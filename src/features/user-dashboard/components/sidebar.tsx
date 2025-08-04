"use client";

import { SimpleImage } from "@/components/inputs/simple-image/simple-image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, Settings } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  activeItem?: string;
  userInfo?: {
    name: string;
    email: string;
    initials: string;
  };
  onItemClick?: (itemId: string) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/user-dashboard" },
  {
    id: "settings",
    label: "Account Setting",
    icon: Settings,
    href: "/private/user-dashboard/user-settings",
  },
];

export function UserDashboardSidebar({
  activeItem = "dashboard",
  userInfo,
  onItemClick,
}: SidebarProps) {
  const defaultUser = {
    name: "Tenzin Yoezer",
    email: "tenzinoser2@gmail.com",
    initials: "TY",
  };

  const user = userInfo || defaultUser;

  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="mb-8 flex items-center justify-center">
          <Link href="/private/user-dashboard">
            <SimpleImage
              src="/images/logo-dark.svg"
              alt="Description"
              width={70}
              height={70}
              fallback={<div className="w-10 h-10 bg-gray-200 rounded-full" />}
            />
          </Link>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 mb-8 p-3 bg-gray-50 rounded-lg">
          <Avatar className="h-10 w-10 bg-black">
            <AvatarFallback className="bg-black text-white font-bold text-sm">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-600 truncate">{user.email}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <Link href={item.href} key={item.id}>
                <button
                  onClick={() => onItemClick?.(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
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
  );
}
