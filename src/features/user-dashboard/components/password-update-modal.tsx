"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Lock,
  Shield,
} from "lucide-react";

interface PasswordUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordUpdate?: (data: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

export function PasswordUpdateModal({
  isOpen,
  onClose,
  onPasswordUpdate,
}: PasswordUpdateModalProps) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordRequirements = [
    {
      text: "At least 8 characters long",
      test: (pwd: string) => pwd.length >= 8,
    },
    {
      text: "Contains uppercase letter",
      test: (pwd: string) => /[A-Z]/.test(pwd),
    },
    {
      text: "Contains lowercase letter",
      test: (pwd: string) => /[a-z]/.test(pwd),
    },
    { text: "Contains number", test: (pwd: string) => /\d/.test(pwd) },
    {
      text: "Contains special character",
      test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else {
      const failedRequirements = passwordRequirements.filter(
        (req) => !req.test(formData.newPassword)
      );
      if (failedRequirements.length > 0) {
        newErrors.newPassword = "Password does not meet security requirements";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (onPasswordUpdate) {
        await onPasswordUpdate({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Password update:", {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });
      }

      setSuccess(true);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});

      // Close modal after success
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Password update error:", error);
      setErrors({
        submit:
          "Failed to update password. Please check your current password and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const getPasswordStrength = (password: string) => {
    const passedRequirements = passwordRequirements.filter((req) =>
      req.test(password)
    ).length;
    if (passedRequirements === 0) return { strength: 0, label: "", color: "" };
    if (passedRequirements <= 2)
      return { strength: 25, label: "Weak", color: "bg-red-500" };
    if (passedRequirements <= 3)
      return { strength: 50, label: "Fair", color: "bg-yellow-500" };
    if (passedRequirements <= 4)
      return { strength: 75, label: "Good", color: "bg-blue-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const handleClose = () => {
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-white border border-gray-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Lock className="h-5 w-5 text-gray-700" />
            </div>
            Update Password
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">
                Password updated successfully! Your account is now more secure.
              </AlertDescription>
            </Alert>
          )}

          {errors.submit && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 font-medium">
                {errors.submit}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Label
                htmlFor="currentPassword"
                className="text-gray-900 font-medium"
              >
                Current Password *
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  placeholder="Enter your current password"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  className="bg-white border-gray-300 focus:border-black focus:ring-black pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label
                htmlFor="newPassword"
                className="text-gray-900 font-medium"
              >
                New Password *
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  className="bg-white border-gray-300 focus:border-black focus:ring-black pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Password Strength:
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        passwordStrength.strength === 100
                          ? "text-green-600"
                          : passwordStrength.strength >= 75
                          ? "text-blue-600"
                          : passwordStrength.strength >= 50
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    />
                  </div>
                </div>
              )}

              {errors.newPassword && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-gray-900 font-medium"
              >
                Confirm New Password *
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className="bg-white border-gray-300 focus:border-black focus:ring-black pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  Password Requirements:
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {passwordRequirements.map((req, index) => {
                  const isValid = req.test(formData.newPassword);
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          isValid ? "bg-green-100" : "bg-gray-200"
                        }`}
                      >
                        {isValid && (
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          isValid ? "text-green-700" : "text-gray-600"
                        }`}
                      >
                        {req.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-black hover:bg-gray-800 text-white font-semibold shadow-md flex-1"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Updating Password...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Update Password
                  </div>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
