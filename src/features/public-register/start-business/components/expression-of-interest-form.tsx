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

  // Auto-save functionality
  // const saveAsDraft = () => {
  //   const { cspACRANotice, cspCompanyProfile, cspFeeSchedule, ...dataToSave } =
  //     formData;
  //   localStorage.setItem("eoi-draft", JSON.stringify(dataToSave));
  //   console.log("data saved:", formData);
  //   toast.success("Draft saved", {
  //     description: "Your progress has been saved locally (files excluded).",
  //   });
  // };

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

  const getCompletionStatus = () => {
    let requiredFields = [
      formData.email,
      formData.entityType,
      formData.businessPlan,
      formData.applicantType,
      formData.countryOfOrigin,
    ];

    if (formData.applicantType === "csp") {
      requiredFields = requiredFields.concat([
        formData.cspContactName,
        formData.cspCompanyName,
        formData.cspUEN,
        formData.cspEstablishmentYear,
        formData.cspWebsite,
        formData.cspRQICount,
        formData.cspExperiencedRQICount,
        formData.cspYearsQualified,
        formData.cspLicenseExpiry,
        formData.cspACRALicense,
        formData.cspServices,
        formData.cspSecurityFeatures,
        formData.cspDifferentiators,
      ]);
    } else {
      requiredFields.push(formData.applicantDescription);
    }

    const completed =
      requiredFields.filter(Boolean).length +
      (formData.applicantType === "csp" && formData.cspClientTypes.length > 0
        ? 1
        : 0) +
      (formData.applicantType === "csp" && formData.cspACRANotice.length > 0
        ? 1
        : 0) +
      (formData.applicantType === "csp" && formData.cspFeeSchedule.length > 0
        ? 1
        : 0);

    const total =
      requiredFields.length + (formData.applicantType === "csp" ? 3 : 0);

    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    };
  };

  if (submitSuccess) {
    return (
      <Card className="border-2 border-green-200 dark:border-green-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Expression of Interest Submitted!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you, GCRO will review your expression of interest and you will
            be notified about the outcome
          </p>
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>Next Steps:</strong> You will receive a confirmation email
              with your application reference number and further instructions.
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
            className="mt-6"
          >
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  const completionStatus = getCompletionStatus();

  return (
    <>
      <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <CardTitle className="text-gray-900 dark:text-white">
                Expression of Interest Form
              </CardTitle>
            </div>
            {/* <Button
              onClick={saveAsDraft}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              <Save className="h-4 w-4" />
              Save Draft
            </Button> */}
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-300 pt-4">
            Please provide accurate information for your business registration
          </CardDescription>

          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Form Completion
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {completionStatus.completed}/{completionStatus.total} sections
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionStatus.percentage}%` }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Basic Information
                </h3>
                <Badge
                  variant={
                    formData.email && formData.entityType
                      ? "default"
                      : "secondary"
                  }
                  className="ml-2"
                >
                  {formData.email && formData.entityType
                    ? "Complete"
                    : "Required"}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-gray-900 dark:text-gray-100"
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
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="entityType"
                    className="text-gray-900 dark:text-gray-100"
                  >
                    Entity Type *
                  </Label>
                  <Select
                    value={formData.entityType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, entityType: value }))
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
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
                    <p className="text-sm text-red-500 dark:text-red-400">
                      {errors.entityType}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* Business Plan & Activities Section */}
            <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Business Plan & Activities
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="businessPlan"
                    className="text-gray-900 dark:text-gray-100"
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
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                  {errors.businessPlan && (
                    <p className="text-sm text-red-500 dark:text-red-400">
                      {errors.businessPlan}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* Applicant Information Section */}
            <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Applicant Information
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-4">
                  <Label className="text-gray-900 dark:text-gray-100">
                    Applicant Type *
                  </Label>
                  <RadioGroup
                    value={formData.applicantType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, applicantType: value }))
                    }
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2 pt-3">
                      <RadioGroupItem
                        value="individual"
                        id="individual"
                        className="border-gray-300 dark:border-gray-600"
                      />
                      <Label
                        htmlFor="individual"
                        className="cursor-pointer text-gray-900 dark:text-gray-100"
                      >
                        <User className="inline h-4 w-4 mr-1" />
                        Individual
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="company"
                        id="company"
                        className="border-gray-300 dark:border-gray-600"
                      />
                      <Label
                        htmlFor="company"
                        className="cursor-pointer text-gray-900 dark:text-gray-100"
                      >
                        <Building2 className="inline h-4 w-4 mr-1" />
                        Company Official
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="csp"
                        id="csp"
                        className="border-gray-300 dark:border-gray-600"
                      />
                      <Label
                        htmlFor="csp"
                        className="cursor-pointer text-gray-900 dark:text-gray-100"
                      >
                        <Building2 className="inline h-4 w-4 mr-1" />
                        CSP (Corporate Service Provider)
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.applicantType && (
                    <p className="text-sm text-red-500 dark:text-red-400">
                      {errors.applicantType}
                    </p>
                  )}
                </div>

                {formData.applicantType === "csp" ? (
                  // Complete CSP section with all 20 requirements
                  <div className="space-y-8">
                    {/* Basic CSP Information */}
                    <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Basic Information
                      </h4>

                      {/* 2. Primary Contact */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="cspContactName"
                          className="text-gray-900 dark:text-gray-100"
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
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                        {errors.cspContactName && (
                          <p className="text-sm text-red-500">
                            {errors.cspContactName}
                          </p>
                        )}
                      </div>

                      {/* 3. Company Name */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="cspCompanyName"
                          className="text-gray-900 dark:text-gray-100"
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
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                        {errors.cspCompanyName && (
                          <p className="text-sm text-red-500">
                            {errors.cspCompanyName}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 4. UEN */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="cspUEN"
                            className="text-gray-900 dark:text-gray-100"
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
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                          />
                          {errors.cspUEN && (
                            <p className="text-sm text-red-500">
                              {errors.cspUEN}
                            </p>
                          )}
                        </div>

                        {/* 5. Year Established */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="cspEstablishmentYear"
                            className="text-gray-900 dark:text-gray-100"
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
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                          />
                          {errors.cspEstablishmentYear && (
                            <p className="text-sm text-red-500">
                              {errors.cspEstablishmentYear}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* 6. Website */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="cspWebsite"
                          className="text-gray-900 dark:text-gray-100"
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
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                        {errors.cspWebsite && (
                          <p className="text-sm text-red-500">
                            {errors.cspWebsite}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Background Information */}
                    <div className="space-y-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Background Information
                      </h4>

                      {/* 7. RQI Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="cspRQICount"
                            className="text-gray-900 dark:text-gray-100"
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
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                          />
                          {errors.cspRQICount && (
                            <p className="text-sm text-red-500">
                              {errors.cspRQICount}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="cspExperiencedRQICount"
                            className="text-gray-900 dark:text-gray-100"
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
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                          />
                          {errors.cspExperiencedRQICount && (
                            <p className="text-sm text-red-500">
                              {errors.cspExperiencedRQICount}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 8. Years Qualified */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="cspYearsQualified"
                            className="text-gray-900 dark:text-gray-100"
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
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                          />
                          {errors.cspYearsQualified && (
                            <p className="text-sm text-red-500">
                              {errors.cspYearsQualified}
                            </p>
                          )}
                        </div>

                        {/* 9. License Expiry */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="cspLicenseExpiry"
                            className="text-gray-900 dark:text-gray-100"
                          >
                            RFA License Expiry Date *
                          </Label>
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
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                          />
                          {errors.cspLicenseExpiry && (
                            <p className="text-sm text-red-500">
                              {errors.cspLicenseExpiry}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* 10. ACRA Notice Upload */}
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

                      {/* 11. ACRA License Status */}
                      <div className="space-y-2">
                        <Label className="text-gray-900 dark:text-gray-100">
                          ACRA Registered Filing Agent Status *
                        </Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Is your company currently licensed or registered with
                          ACRA as a &quot;registered filing agent&quot; as
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
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="acra-yes" />
                            <Label htmlFor="acra-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="acra-no" />
                            <Label htmlFor="acra-no">No</Label>
                          </div>
                        </RadioGroup>
                        {errors.cspACRALicense && (
                          <p className="text-sm text-red-500">
                            {errors.cspACRALicense}
                          </p>
                        )}
                      </div>

                      {/* 12. Services Provided */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="cspServices"
                          className="text-gray-900 dark:text-gray-100"
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
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                        {errors.cspServices && (
                          <p className="text-sm text-red-500">
                            {errors.cspServices}
                          </p>
                        )}
                      </div>

                      {/* 13. Company Profile Upload */}
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

                      {/* 14. Client Types */}
                      <div className="space-y-2">
                        <Label className="text-gray-900 dark:text-gray-100">
                          Client Types Served * (Select all that apply)
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {cspClientTypes.map((clientType) => (
                            <div
                              key={clientType}
                              className="flex items-center space-x-2"
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
                                      cspClientTypes:
                                        prev.cspClientTypes.filter(
                                          (type) => type !== clientType
                                        ),
                                    }));
                                  }
                                }}
                                className="rounded border-gray-300"
                              />
                              <Label
                                htmlFor={`client-${clientType}`}
                                className="text-sm"
                              >
                                {clientType}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {errors.cspClientTypes && (
                          <p className="text-sm text-red-500">
                            {errors.cspClientTypes}
                          </p>
                        )}
                      </div>

                      {/* 15. Security Features */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="cspSecurityFeatures"
                          className="text-gray-900 dark:text-gray-100"
                        >
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
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                        {errors.cspSecurityFeatures && (
                          <p className="text-sm text-red-500">
                            {errors.cspSecurityFeatures}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Miscellaneous Information */}
                    <div className="space-y-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Miscellaneous Information
                      </h4>

                      {/* 17. Fee Schedule Upload */}
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

                      {/* 18. Service Differentiators */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="cspDifferentiators"
                          className="text-gray-900 dark:text-gray-100"
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
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                        {errors.cspDifferentiators && (
                          <p className="text-sm text-red-500">
                            {errors.cspDifferentiators}
                          </p>
                        )}
                      </div>

                      {/* 19. Additional Supporting Information */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="cspAdditionalInfo"
                          className="text-gray-900 dark:text-gray-100"
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
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                      </div>

                      {/* 20. Questions */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="cspQuestions"
                          className="text-gray-900 dark:text-gray-100"
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
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Original applicant description field for individual/company
                  <div className="space-y-2">
                    <Label
                      htmlFor="applicantDescription"
                      className="text-gray-900 dark:text-gray-100"
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
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    />
                    {errors.applicantDescription && (
                      <p className="text-sm text-red-500 dark:text-red-400">
                        {errors.applicantDescription}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="countryOfOrigin"
                    className="text-gray-900 dark:text-gray-100"
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
                    <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                      {countries.map((country) => (
                        <SelectItem
                          key={country}
                          value={country}
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.countryOfOrigin && (
                    <p className="text-sm text-red-500 dark:text-red-400">
                      {errors.countryOfOrigin}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* Online Presence Section */}
            <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Online Presence
                </h3>
                <Badge variant="outline" className="ml-2">
                  Optional
                </Badge>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="onlinePresence"
                  className="text-gray-900 dark:text-gray-100"
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
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
                {errors.onlinePresence && (
                  <p className="text-sm text-red-500 dark:text-red-400">
                    {errors.onlinePresence}
                  </p>
                )}
              </div>
            </div>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 px-8 py-3 text-sm"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Confirm Submission
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Are you sure you want to submit your Expression of Interest?
              Please review all information and uploaded files before
              submitting.
            </p>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              disabled={isSubmitting}
            >
              Go Back
            </Button>
            <Button
              onClick={confirmSubmission}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Submitting..." : "Confirm Submission"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
