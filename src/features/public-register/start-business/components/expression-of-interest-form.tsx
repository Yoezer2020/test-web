"use client";

import type React from "react";
import type { ReactElement } from "react";
import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Mail,
  Building2,
  Globe,
  User,
  Users,
  Calendar,
  Shield,
  Award,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileUpload } from "@/components/inputs/single-file-upload/file-upload-single";
import { toast } from "sonner";

interface FormData {
  email: string;
  entityType: string;
  businessPlan: string;
  applicantType: string;
  applicantDescription: string;
  countryOfOrigin: string;
  onlinePresence: string;
  // CSP specific fields - updated to match requirements
  cspContactName: string;
  cspCompanyName: string;
  cspUEN: string;
  cspEstablishmentYear: string;
  cspWebsite: string;
  cspRQICount: string;
  cspExperiencedRQICount: string;
  cspYearsQualified: string;
  cspLicenseExpiry: string;
  cspACRALicense: string;
  cspServices: string;
  cspClientTypes: string[];
  cspSecurityFeatures: string;
  cspDifferentiators: string;
  cspAdditionalInfo: string;
  cspQuestions: string;
  // File upload fields
  cspACRANotice: File[];
  cspCompanyProfile: File[];
  cspFeeSchedule: File[];
}

const countries = [
  "Bhutan",
  "India",
  "China",
  "Singapore",
  "United States",
  "United Kingdom",
  "Australia",
  "Canada",
  "Germany",
  "Japan",
  "Other",
];

const cspClientTypes = [
  "Small and Medium Enterprises",
  "Large Corporations",
  "Multinational Corporations",
  "Listed Companies",
  "Financial Institutions",
  "Family Offices",
];

export function ExpressionOfInterestForm(): ReactElement {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    entityType: "",
    businessPlan: "",
    applicantType: "",
    applicantDescription: "",
    countryOfOrigin: "",
    onlinePresence: "",
    // CSP fields
    cspContactName: "",
    cspCompanyName: "",
    cspUEN: "",
    cspEstablishmentYear: "",
    cspWebsite: "",
    cspRQICount: "",
    cspExperiencedRQICount: "",
    cspYearsQualified: "",
    cspLicenseExpiry: "",
    cspACRALicense: "",
    cspServices: "",
    cspClientTypes: [],
    cspSecurityFeatures: "",
    cspDifferentiators: "",
    cspAdditionalInfo: "",
    cspQuestions: "",
    // File uploads
    cspACRANotice: [],
    cspCompanyProfile: [],
    cspFeeSchedule: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load draft on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDraft = localStorage.getItem("eoi-draft");
      if (savedDraft) {
        try {
          const parsedDraft = JSON.parse(savedDraft);
          setFormData((prev) => ({ ...prev, ...parsedDraft }));
          toast.success("Draft loaded", {
            description: "Your previous progress has been restored.",
          });
        } catch (error) {
          console.error("Error loading draft:", error);
        }
      }
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Basic Information
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.entityType) newErrors.entityType = "Entity type is required";
    if (!formData.businessPlan)
      newErrors.businessPlan = "Business plan is required";
    if (!formData.applicantType)
      newErrors.applicantType = "Applicant type is required";

    if (formData.applicantType === "csp") {
      // CSP specific validation - all 20 requirements
      if (!formData.cspContactName)
        newErrors.cspContactName =
          "Primary contact name and position is required";
      if (!formData.cspCompanyName)
        newErrors.cspCompanyName = "Official company name is required";
      if (!formData.cspUEN) newErrors.cspUEN = "UEN is required";
      if (!formData.cspEstablishmentYear)
        newErrors.cspEstablishmentYear = "Year established is required";
      if (!formData.cspWebsite)
        newErrors.cspWebsite = "Official website address is required";
      if (!formData.cspRQICount)
        newErrors.cspRQICount = "Number of RQIs is required";
      if (!formData.cspExperiencedRQICount)
        newErrors.cspExperiencedRQICount =
          "Number of experienced RQIs is required";
      if (!formData.cspYearsQualified)
        newErrors.cspYearsQualified = "Years qualified as CSP is required";
      if (!formData.cspLicenseExpiry)
        newErrors.cspLicenseExpiry = "RFA license expiry date is required";
      if (formData.cspACRANotice.length === 0)
        newErrors.cspACRANotice = "ACRA notice upload is required";
      if (!formData.cspACRALicense)
        newErrors.cspACRALicense =
          "ACRA registered filing agent status is required";
      if (!formData.cspServices)
        newErrors.cspServices = "Services description is required";
      if (formData.cspClientTypes.length === 0)
        newErrors.cspClientTypes = "At least one client type must be selected";
      if (!formData.cspSecurityFeatures)
        newErrors.cspSecurityFeatures =
          "Security features description is required";
      if (formData.cspFeeSchedule.length === 0)
        newErrors.cspFeeSchedule = "Fee schedule upload is required";
      if (!formData.cspDifferentiators)
        newErrors.cspDifferentiators = "Service differentiators are required";
    } else {
      if (!formData.applicantDescription) {
        newErrors.applicantDescription = "Detailed description is required";
      }
    }

    if (!formData.countryOfOrigin)
      newErrors.countryOfOrigin = "Country of origin is required";

    // Optional URL validation
    if (
      formData.onlinePresence &&
      !/^https?:\/\/.+/.test(formData.onlinePresence)
    ) {
      newErrors.onlinePresence =
        "Please enter a valid URL (starting with http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const confirmSubmission = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form data being submitted:", formData);
      // Clear draft after successful submission
      localStorage.removeItem("eoi-draft");
      setSubmitSuccess(true);
      toast.success("Application submitted successfully!", {
        description: "You will receive a confirmation email shortly.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission failed", {
        description:
          "Please try again or contact support if the problem persists.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900/20 p-4 flex items-center justify-center">
        <Card className="border-2 border-green-200 dark:border-green-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl max-w-2xl w-full">
          <CardContent className="p-12 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full animate-pulse"></div>
              <CheckCircle2 className="h-20 w-20 text-green-500 dark:text-green-400 mx-auto relative animate-bounce" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Expression of Interest Submitted!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Thank you, GCRO will review your expression of interest and you
              will be notified about the outcome
            </p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-6 rounded-xl border border-green-200 dark:border-green-700 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                <p className="font-semibold text-green-800 dark:text-green-200">
                  Next Steps
                </p>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                You will receive a confirmation email with your application
                reference number and further instructions.
              </p>
            </div>
            <Button
              onClick={() => {
                setSubmitSuccess(false);
                setFormData({
                  email: "",
                  entityType: "",
                  businessPlan: "",
                  applicantType: "",
                  applicantDescription: "",
                  countryOfOrigin: "",
                  onlinePresence: "",
                  cspContactName: "",
                  cspCompanyName: "",
                  cspUEN: "",
                  cspEstablishmentYear: "",
                  cspWebsite: "",
                  cspRQICount: "",
                  cspExperiencedRQICount: "",
                  cspYearsQualified: "",
                  cspLicenseExpiry: "",
                  cspACRALicense: "",
                  cspServices: "",
                  cspClientTypes: [],
                  cspSecurityFeatures: "",
                  cspDifferentiators: "",
                  cspAdditionalInfo: "",
                  cspQuestions: "",
                  cspACRANotice: [],
                  cspCompanyProfile: [],
                  cspFeeSchedule: [],
                });
                setErrors({});
              }}
              variant="outline"
              className="mt-6 px-8 py-3 text-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
            >
              Submit Another Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                Expression of Interest Form
              </CardTitle>
              <CardDescription className="text-blue-100 mt-2">
                Please provide accurate information for your business
                registration
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500 dark:bg-blue-600 rounded-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-gray-900 dark:text-gray-100 font-medium"
                  >
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="entityType"
                    className="text-gray-900 dark:text-gray-100 font-medium"
                  >
                    Entity Type *
                  </Label>
                  <Select
                    value={formData.entityType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        entityType: value,
                      }))
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                      <SelectItem
                        value="PCLBS"
                        className="text-gray-900 dark:text-gray-100"
                      >
                        PCLBS (Private Company Limited by Shares)
                      </SelectItem>
                      <SelectItem
                        value="Branch"
                        className="text-gray-900 dark:text-gray-100"
                      >
                        Branch Office
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.entityType && (
                    <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.entityType}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

            {/* Business Plan & Activities Section */}
            <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500 dark:bg-green-600 rounded-lg">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Business Plan & Activities
                </h3>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="businessPlan"
                  className="text-gray-900 dark:text-gray-100 font-medium"
                >
                  Business Plan *
                </Label>
                <Textarea
                  id="businessPlan"
                  placeholder="Describe your business concept, target market, revenue model, and growth strategy..."
                  value={formData.businessPlan}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      businessPlan: e.target.value,
                    }))
                  }
                  rows={6}
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200 resize-none"
                />
                {errors.businessPlan && (
                  <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.businessPlan}
                  </p>
                )}
              </div>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

            {/* Applicant Information Section */}
            <div className="space-y-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500 dark:bg-purple-600 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Applicant Information
                </h3>
              </div>

              <div className="space-y-4">
                <Label className="text-gray-900 dark:text-gray-100 font-medium">
                  Applicant Type *
                </Label>
                <RadioGroup
                  value={formData.applicantType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      applicantType: value,
                    }))
                  }
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                    <RadioGroupItem
                      value="individual"
                      id="individual"
                      className="border-gray-300 dark:border-gray-600"
                    />
                    <Label
                      htmlFor="individual"
                      className="cursor-pointer text-gray-900 dark:text-gray-100 flex items-center gap-2"
                    >
                      <User className="h-4 w-4 text-blue-500" />
                      Individual
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                    <RadioGroupItem
                      value="company"
                      id="company"
                      className="border-gray-300 dark:border-gray-600"
                    />
                    <Label
                      htmlFor="company"
                      className="cursor-pointer text-gray-900 dark:text-gray-100 flex items-center gap-2"
                    >
                      <Building2 className="h-4 w-4 text-green-500" />
                      Company Official
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                    <RadioGroupItem
                      value="csp"
                      id="csp"
                      className="border-gray-300 dark:border-gray-600"
                    />
                    <Label
                      htmlFor="csp"
                      className="cursor-pointer text-gray-900 dark:text-gray-100 flex items-center gap-2"
                    >
                      <Award className="h-4 w-4 text-purple-500" />
                      CSP Provider
                    </Label>
                  </div>
                </RadioGroup>

                {errors.applicantType && (
                  <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.applicantType}
                  </p>
                )}
              </div>

              {formData.applicantType === "csp" ? (
                // Complete CSP section with enhanced styling
                <div className="space-y-8">
                  {/* Basic CSP Information */}
                  <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                        Basic Information
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Primary Contact */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="cspContactName"
                          className="text-gray-900 dark:text-gray-100 font-medium"
                        >
                          Primary Contact Name and Position *
                        </Label>
                        <Input
                          id="cspContactName"
                          placeholder="Full name and position/title of primary contact person"
                          value={formData.cspContactName}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              cspContactName: e.target.value,
                            }))
                          }
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                        {errors.cspContactName && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.cspContactName}
                          </p>
                        )}
                      </div>

                      {/* Company Name */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="cspCompanyName"
                          className="text-gray-900 dark:text-gray-100 font-medium"
                        >
                          Official Company Name *
                        </Label>
                        <Input
                          id="cspCompanyName"
                          placeholder="Company name as officially registered"
                          value={formData.cspCompanyName}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              cspCompanyName: e.target.value,
                            }))
                          }
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                        {errors.cspCompanyName && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.cspCompanyName}
                          </p>
                        )}
                      </div>

                      {/* UEN */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="cspUEN"
                          className="text-gray-900 dark:text-gray-100 font-medium"
                        >
                          UEN *
                        </Label>
                        <Input
                          id="cspUEN"
                          placeholder="Unique Entity Number"
                          value={formData.cspUEN}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              cspUEN: e.target.value,
                            }))
                          }
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                        {errors.cspUEN && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.cspUEN}
                          </p>
                        )}
                      </div>

                      {/* Year Established */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="cspEstablishmentYear"
                          className="text-gray-900 dark:text-gray-100 font-medium"
                        >
                          Year Established *
                        </Label>
                        <Input
                          id="cspEstablishmentYear"
                          type="number"
                          placeholder="YYYY"
                          min="1900"
                          max={new Date().getFullYear()}
                          value={formData.cspEstablishmentYear}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              cspEstablishmentYear: e.target.value,
                            }))
                          }
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                        {errors.cspEstablishmentYear && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.cspEstablishmentYear}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Website */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="cspWebsite"
                        className="text-gray-900 dark:text-gray-100 font-medium"
                      >
                        Official Website Address *
                      </Label>
                      <Input
                        id="cspWebsite"
                        type="url"
                        placeholder="https://www.yourcompany.com"
                        value={formData.cspWebsite}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            cspWebsite: e.target.value,
                          }))
                        }
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                      {errors.cspWebsite && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.cspWebsite}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Background Information */}
                  <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                        Background Information
                      </h4>
                    </div>

                    {/* RQI Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="cspRQICount"
                          className="text-gray-900 dark:text-gray-100 font-medium"
                        >
                          Number of RQIs Employed *
                        </Label>
                        <Input
                          id="cspRQICount"
                          type="number"
                          min="0"
                          placeholder="Total RQIs"
                          value={formData.cspRQICount}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              cspRQICount: e.target.value,
                            }))
                          }
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
                        />
                        {errors.cspRQICount && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.cspRQICount}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="cspExperiencedRQICount"
                          className="text-gray-900 dark:text-gray-100 font-medium"
                        >
                          RQIs with 5+ Years Experience *
                        </Label>
                        <Input
                          id="cspExperiencedRQICount"
                          type="number"
                          min="0"
                          placeholder="Experienced RQIs"
                          value={formData.cspExperiencedRQICount}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              cspExperiencedRQICount: e.target.value,
                            }))
                          }
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
                        />
                        {errors.cspExperiencedRQICount && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.cspExperiencedRQICount}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="cspYearsQualified"
                          className="text-gray-900 dark:text-gray-100 font-medium"
                        >
                          Years Qualified as CSP in Singapore *
                        </Label>
                        <Input
                          id="cspYearsQualified"
                          type="number"
                          min="0"
                          placeholder="Years"
                          value={formData.cspYearsQualified}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              cspYearsQualified: e.target.value,
                            }))
                          }
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
                        />
                        {errors.cspYearsQualified && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.cspYearsQualified}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="cspLicenseExpiry"
                          className="text-gray-900 dark:text-gray-100 font-medium"
                        >
                          RFA License Expiry Date *
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="cspLicenseExpiry"
                            type="date"
                            value={formData.cspLicenseExpiry}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                cspLicenseExpiry: e.target.value,
                              }))
                            }
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 pl-10"
                          />
                        </div>
                        {errors.cspLicenseExpiry && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.cspLicenseExpiry}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* ACRA Notice Upload */}
                    <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <FileUpload
                        id="cspACRANotice"
                        label="ACRA Notice Upload"
                        description="Upload the notice from ACRA stating the validity of your RFA license and date of expiry"
                        required={true}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onFileChange={(files) =>
                          setFormData((prev) => ({
                            ...prev,
                            cspACRANotice: files,
                          }))
                        }
                        error={errors.cspACRANotice}
                      />
                    </div>

                    {/* ACRA License Status */}
                    <div className="space-y-3">
                      <Label className="text-gray-900 dark:text-gray-100 font-medium">
                        ACRA Registered Filing Agent Status *
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Is your company currently licensed or registered with
                        ACRA as a &ldquo;registered filing agent&ldquo; as
                        defined under section 31 of the Singapore ACRA Act?
                      </p>
                      <RadioGroup
                        value={formData.cspACRALicense}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            cspACRALicense: value,
                          }))
                        }
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <RadioGroupItem value="yes" id="acra-yes" />
                          <Label htmlFor="acra-yes" className="cursor-pointer">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <RadioGroupItem value="no" id="acra-no" />
                          <Label htmlFor="acra-no" className="cursor-pointer">
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors.cspACRALicense && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.cspACRALicense}
                        </p>
                      )}
                    </div>

                    {/* Services Provided */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="cspServices"
                        className="text-gray-900 dark:text-gray-100 font-medium"
                      >
                        Services Provided *
                      </Label>
                      <Textarea
                        id="cspServices"
                        placeholder="Please state all services provided by your company, eg CSP, registered office, accounting, tax, trust, private client, etc."
                        value={formData.cspServices}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            cspServices: e.target.value,
                          }))
                        }
                        rows={3}
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 resize-none"
                      />
                      {errors.cspServices && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.cspServices}
                        </p>
                      )}
                    </div>

                    {/* Company Profile Upload */}
                    <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <FileUpload
                        id="cspCompanyProfile"
                        label="Company Profile and Services Listing"
                        description="If you have a listing of your services and/or company profile, please upload"
                        required={false}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        multiple={true}
                        onFileChange={(files) =>
                          setFormData((prev) => ({
                            ...prev,
                            cspCompanyProfile: files,
                          }))
                        }
                      />
                    </div>

                    {/* Client Types */}
                    <div className="space-y-3">
                      <Label className="text-gray-900 dark:text-gray-100 font-medium">
                        Client Types Served * (Select all that apply)
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cspClientTypes.map((clientType) => (
                          <div
                            key={clientType}
                            className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                          >
                            <input
                              type="checkbox"
                              id={`client-${clientType}`}
                              checked={formData.cspClientTypes.includes(
                                clientType
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    cspClientTypes: [
                                      ...prev.cspClientTypes,
                                      clientType,
                                    ],
                                  }));
                                } else {
                                  setFormData((prev) => ({
                                    ...prev,
                                    cspClientTypes: prev.cspClientTypes.filter(
                                      (type) => type !== clientType
                                    ),
                                  }));
                                }
                              }}
                              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <Label
                              htmlFor={`client-${clientType}`}
                              className="text-sm cursor-pointer"
                            >
                              {clientType}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.cspClientTypes && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.cspClientTypes}
                        </p>
                      )}
                    </div>

                    {/* Security Features */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="cspSecurityFeatures"
                        className="text-gray-900 dark:text-gray-100 font-medium flex items-center gap-2"
                      >
                        <Shield className="h-4 w-4 text-green-600" />
                        Security Features and Data Protection *
                      </Label>
                      <Textarea
                        id="cspSecurityFeatures"
                        placeholder="Please briefly describe the security features your company has in place to handle sensitive documents, and ensure data protection and client confidentiality"
                        value={formData.cspSecurityFeatures}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            cspSecurityFeatures: e.target.value,
                          }))
                        }
                        rows={4}
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 resize-none"
                      />
                      {errors.cspSecurityFeatures && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.cspSecurityFeatures}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Miscellaneous Information */}
                  <div className="space-y-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                        Miscellaneous Information
                      </h4>
                    </div>

                    {/* Fee Schedule Upload */}
                    <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <FileUpload
                        id="cspFeeSchedule"
                        label="Current Fee Schedule"
                        description="Please provide your current fee schedule for CSP services carried out by your company"
                        required={true}
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onFileChange={(files) =>
                          setFormData((prev) => ({
                            ...prev,
                            cspFeeSchedule: files,
                          }))
                        }
                        error={errors.cspFeeSchedule}
                      />
                    </div>

                    {/* Service Differentiators */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="cspDifferentiators"
                        className="text-gray-900 dark:text-gray-100 font-medium"
                      >
                        Service Differentiators *
                      </Label>
                      <Textarea
                        id="cspDifferentiators"
                        placeholder="What differentiates your company's CSP services from others in the market?"
                        value={formData.cspDifferentiators}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            cspDifferentiators: e.target.value,
                          }))
                        }
                        rows={3}
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 resize-none"
                      />
                      {errors.cspDifferentiators && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.cspDifferentiators}
                        </p>
                      )}
                    </div>

                    {/* Additional Supporting Information */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="cspAdditionalInfo"
                        className="text-gray-900 dark:text-gray-100 font-medium"
                      >
                        Additional Supporting Information
                      </Label>
                      <Textarea
                        id="cspAdditionalInfo"
                        placeholder="Please provide any additional information that you believe may support your company's Expression of Interest"
                        value={formData.cspAdditionalInfo}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            cspAdditionalInfo: e.target.value,
                          }))
                        }
                        rows={3}
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 resize-none"
                      />
                    </div>

                    {/* Questions */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="cspQuestions"
                        className="text-gray-900 dark:text-gray-100 font-medium"
                      >
                        Questions about GMC/GCRO
                      </Label>
                      <Textarea
                        id="cspQuestions"
                        placeholder="Any questions about the GMC and/or for the GCRO?"
                        value={formData.cspQuestions}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            cspQuestions: e.target.value,
                          }))
                        }
                        rows={3}
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 resize-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // Original applicant description field for individual/company
                <div className="space-y-2">
                  <Label
                    htmlFor="applicantDescription"
                    className="text-gray-900 dark:text-gray-100 font-medium"
                  >
                    {formData.applicantType === "individual"
                      ? "Personal Background"
                      : "Company Information"}{" "}
                    *
                  </Label>
                  <Textarea
                    id="applicantDescription"
                    placeholder={
                      formData.applicantType === "individual"
                        ? "Describe your professional background, experience, and qualifications..."
                        : "Provide company details, registration information, and authorized representative details..."
                    }
                    value={formData.applicantDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        applicantDescription: e.target.value,
                      }))
                    }
                    rows={4}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 resize-none"
                  />
                  {errors.applicantDescription && (
                    <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.applicantDescription}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="countryOfOrigin"
                  className="text-gray-900 dark:text-gray-100 font-medium"
                >
                  Country of Origin *
                </Label>
                <Select
                  value={formData.countryOfOrigin}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      countryOfOrigin: value,
                    }))
                  }
                >
                  <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    {countries.map((country) => (
                      <SelectItem
                        key={country}
                        value={country}
                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.countryOfOrigin && (
                  <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.countryOfOrigin}
                  </p>
                )}
              </div>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

            {/* Online Presence Section */}
            <div className="space-y-6 p-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl border border-orange-200 dark:border-orange-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500 dark:bg-orange-600 rounded-lg">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Online Presence
                </h3>
                <Badge
                  variant="outline"
                  className="ml-2 border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300"
                >
                  Optional
                </Badge>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="onlinePresence"
                  className="text-gray-900 dark:text-gray-100 font-medium"
                >
                  Website or Social Media Link
                </Label>
                <Input
                  id="onlinePresence"
                  type="url"
                  placeholder="https://www.yourwebsite.com"
                  value={formData.onlinePresence}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      onlinePresence: e.target.value,
                    }))
                  }
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 transition-all duration-200"
                />
                {errors.onlinePresence && (
                  <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.onlinePresence}
                  </p>
                )}
              </div>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting Application...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Submit
                  </span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-white">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              Confirm Submission
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-6">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Are you sure you want to submit your Expression of Interest?
              Please review all information and uploaded files before
              submitting.
            </p>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> Once submitted, you cannot modify your
                application. You will receive a confirmation email with further
                instructions.
              </p>
            </div>
          </div>
          <DialogFooter className="gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              disabled={isSubmitting}
              className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Review Again
            </Button>
            <Button
              onClick={confirmSubmission}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </span>
              ) : (
                "Confirm Submission"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
