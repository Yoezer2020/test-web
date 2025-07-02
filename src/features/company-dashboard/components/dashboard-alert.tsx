"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X } from "lucide-react";

interface DashboardAlertProps {
  message?: string;
  actionText?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  variant?: "warning" | "info" | "error";
}

export function CompanyDashboardAlert({
  message = "For security reasons, please update your password. Your current password expires soon.",
  actionText = "UPDATE PASSWORD",
  onAction,
  onDismiss,
}: // variant = "warning",
DashboardAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const handleAction = () => {
    onAction?.();
  };

  if (!isVisible) return null;

  return (
    <Alert className="bg-black text-white border-0 rounded-none relative">
      <AlertTriangle className="h-4 w-4 text-white" />
      <AlertDescription className="text-white font-medium flex items-center justify-between w-full">
        <span className="flex-1 text-center">{message}</span>
        <div className="flex items-center gap-3 ml-4">
          <Button
            onClick={handleAction}
            variant="secondary"
            size="sm"
            className="bg-white text-black hover:bg-gray-100 font-semibold px-4 py-1 h-8 border-0"
          >
            {actionText}
          </Button>
          <button
            onClick={handleDismiss}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
