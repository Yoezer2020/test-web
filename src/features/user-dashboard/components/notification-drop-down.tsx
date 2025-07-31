"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useState } from "react";

// Dummy notification data
const notifications = [
  {
    id: 1,
    title: "New Application Received",
    description: "Your expression of interest has been submitted successfully.",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Document Update",
    description: "Your business plan document has been reviewed.",
    time: "1 day ago",
  },
  {
    id: 3,
    title: "Profile Update",
    description: "Please update your company information.",
    time: "3 days ago",
  },
];

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative text-gray-600 hover:text-black hover:bg-gray-100"
          size="sm"
        >
          <Bell className="h-4 w-4" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
              {notifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex flex-col items-start"
            >
              <span className="font-medium">{notification.title}</span>
              <span className="text-sm text-gray-500">
                {notification.description}
              </span>
              <span className="text-xs text-gray-400">{notification.time}</span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem>No new notifications</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
