"use client";
import { SimpleImage } from "@/components/inputs/simple-image/simple-image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, Settings, Mail, FileText } from "lucide-react";

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
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "mailbox", label: "Virtual Mailbox", icon: Mail },
  { id: "orders", label: "All Orders/Receipts", icon: FileText },
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
          <SimpleImage
            src="/images/logo-dark.svg"
            alt="Description"
            width={70}
            height={70}
            fallback={<div className="w-10 h-10 bg-gray-200 rounded-full" />}
          />
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
              <button
                key={item.id}
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
            );
          })}
        </nav>
      </div>
    </div>
  );
}
