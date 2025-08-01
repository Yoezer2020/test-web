"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { NotificationDropdown } from "./notification-drop-down";

export function UserDashboardHeader({}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // await signOut({
      //   redirect: false,
      // });
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4"></div>

        <div className="flex items-center space-x-3">
          <NotificationDropdown />
          <Button
            onClick={handleLogout}
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
