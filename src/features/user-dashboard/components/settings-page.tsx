"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PasswordUpdateForm } from "./password-update-form";
import { User, Mail, Calendar, Edit } from "lucide-react";
import { useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  joinDate: string;
  initials: string;
}

interface SettingsPageProps {
  userProfile?: UserProfile;
  onProfileUpdate?: (data: Partial<UserProfile>) => Promise<void>;
  onPasswordUpdate?: (data: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

const SettingsPage = ({
  userProfile,
  onProfileUpdate,
  onPasswordUpdate,
}: SettingsPageProps) => {
  const defaultProfile: UserProfile = {
    name: "Tshering Nidup",
    email: "cringnidupgmail.com",
    phone: "+65 9123 4567",
    address: "Singapore",
    company: "Tech Innovations Pte Ltd",
    joinDate: "2024-01-15",
    initials: "TN",
  };

  const profile = userProfile || defaultProfile;
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(profile);

  const handleProfileUpdate = async () => {
    try {
      if (onProfileUpdate) {
        await onProfileUpdate(profileData);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Profile updated:", profileData);
      }
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Account Settings
        </h1>
        <p className="text-gray-600 font-medium">
          Manage your account information and security settings
        </p>
      </div>

      {/* Profile Information */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <User className="h-5 w-5 text-gray-700" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Update your personal information and contact details
                </CardDescription>
              </div>
            </div>
            <Button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              size="sm"
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditingProfile ? "Cancel" : "Edit"}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-20 w-20 bg-black">
                <AvatarFallback className="bg-black text-white font-bold text-lg">
                  {profile.initials}
                </AvatarFallback>
              </Avatar>
              {isEditingProfile && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs bg-transparent"
                >
                  Change Photo
                </Button>
              )}
            </div>

            {/* Profile Form */}
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-900 font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    disabled={!isEditingProfile}
                    className="bg-white border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    disabled={!isEditingProfile}
                    className="bg-white border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-900 font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone || ""}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    disabled={!isEditingProfile}
                    className="bg-white border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="company"
                    className="text-gray-900 font-medium"
                  >
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={profileData.company || ""}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    disabled={!isEditingProfile}
                    className="bg-white border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-900 font-medium">
                  Address
                </Label>
                <Input
                  id="address"
                  value={profileData.address || ""}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  disabled={!isEditingProfile}
                  className="bg-white border-gray-300 focus:border-black focus:ring-black"
                />
              </div>

              {/* Account Info */}
              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Member since:{" "}
                      {new Date(profile.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>Email verified</span>
                  </div>
                </div>
              </div>

              {isEditingProfile && (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleProfileUpdate}
                    className="bg-black hover:bg-gray-800 text-white font-semibold shadow-md"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => {
                      setProfileData(profile);
                      setIsEditingProfile(false);
                    }}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Update */}
      <PasswordUpdateForm onPasswordUpdate={onPasswordUpdate} />

      {/* Account Actions */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-bold text-gray-900 text-red-600">
            Danger Zone
          </CardTitle>
          <CardDescription className="text-gray-600">
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
              <div>
                <h4 className="font-semibold text-red-900">Delete Account</h4>
                <p className="text-sm text-red-700">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
