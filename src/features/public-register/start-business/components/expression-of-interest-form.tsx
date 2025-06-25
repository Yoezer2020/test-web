"use client";

import type React from "react";
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
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
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FormData {
  email: string;
  entityType: string;
  businessPlan: string;
  expectedActivities: string[];
  applicantType: string;
  applicantDescription: string;
  countryOfOrigin: string;
  onlinePresence: string;
  hasWebsite: boolean;
  websiteUrl: string;
  hasSocialMedia: boolean;
  socialMediaLinks: string;
}

const businessActivities = [
  "Financial Services",
  "Technology & Software",
  "Manufacturing",
  "Trading & Import/Export",
  "Tourism & Hospitality",
  "Agriculture & Food Processing",
  "Healthcare Services",
  "Education & Training",
  "Construction & Real Estate",
  "Transportation & Logistics",
  "Consulting Services",
  "Retail & E-commerce",
  "Other",
];

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

export function ExpressionOfInterestForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    entityType: "",
    businessPlan: "",
    expectedActivities: [],
    applicantType: "",
    applicantDescription: "",
    countryOfOrigin: "",
    onlinePresence: "",
    hasWebsite: false,
    websiteUrl: "",
    hasSocialMedia: false,
    socialMediaLinks: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    business: true,
    applicant: true,
    online: false,
  });

  const handleActivityToggle = (activity: string) => {
    setFormData((prev) => ({
      ...prev,
      expectedActivities: prev.expectedActivities.includes(activity)
        ? prev.expectedActivities.filter((a) => a !== activity)
        : [...prev.expectedActivities, activity],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Basic Information
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.entityType) newErrors.entityType = "Entity type is required";

    // Business Plan & Activities
    if (!formData.businessPlan || formData.businessPlan.length < 100)
      newErrors.businessPlan = "Business plan must be at least 100 characters";
    if (formData.expectedActivities.length === 0)
      newErrors.expectedActivities = "Please select at least one activity";

    // Applicant Information
    if (!formData.applicantType)
      newErrors.applicantType = "Applicant type is required";
    if (
      !formData.applicantDescription ||
      formData.applicantDescription.length < 50
    )
      newErrors.applicantDescription =
        "Please provide a detailed description (at least 50 characters)";
    if (!formData.countryOfOrigin)
      newErrors.countryOfOrigin = "Country of origin is required";

    // Online Presence (conditional)
    if (formData.hasWebsite && !formData.websiteUrl)
      newErrors.websiteUrl =
        "Website URL is required when 'We have a website' is checked";
    if (formData.hasSocialMedia && !formData.socialMediaLinks)
      newErrors.socialMediaLinks =
        "Social media links are required when 'We have social media presence' is checked";

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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getCompletionStatus = () => {
    const requiredFields = [
      formData.email,
      formData.entityType,
      formData.businessPlan.length >= 100,
      formData.expectedActivities.length > 0,
      formData.applicantType,
      formData.applicantDescription.length >= 50,
      formData.countryOfOrigin,
    ];

    const completed = requiredFields.filter(Boolean).length;
    const total = requiredFields.length;

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
            Thank you for your submission. We will review your application and
            contact you within 3-5 business days.
          </p>
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>Next Steps:</strong> You will receive a confirmation email
              with your application reference number and further instructions.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const completionStatus = getCompletionStatus();

  return (
    <>
      <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            Expression of Interest Form
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <Collapsible
              open={expandedSections.basic}
              onOpenChange={() => toggleSection("basic")}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
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
                {expandedSections.basic ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-6 pt-6">
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    This will be used to issue your credentials and communicate
                    updates
                  </p>
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formData.entityType === "PCLBS" &&
                      "A private company with share capital"}
                    {formData.entityType === "Branch" &&
                      "A branch office of a foreign company"}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* Business Plan & Activities Section */}
            <Collapsible
              open={expandedSections.business}
              onOpenChange={() => toggleSection("business")}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Business Plan & Activities
                  </h3>
                  <Badge
                    variant={
                      formData.businessPlan.length >= 100 &&
                      formData.expectedActivities.length > 0
                        ? "default"
                        : "secondary"
                    }
                    className="ml-2"
                  >
                    {formData.businessPlan.length >= 100 &&
                    formData.expectedActivities.length > 0
                      ? "Complete"
                      : "Required"}
                  </Badge>
                </div>
                {expandedSections.business ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-6 pt-6">
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formData.businessPlan.length}/100 characters minimum
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-900 dark:text-gray-100">
                    Expected Business Activities *
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Select all activities your business will engage in
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {businessActivities.map((activity) => (
                      <div
                        key={activity}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={activity}
                          checked={formData.expectedActivities.includes(
                            activity
                          )}
                          onCheckedChange={() => handleActivityToggle(activity)}
                          className="border-gray-300 dark:border-gray-600"
                        />
                        <Label
                          htmlFor={activity}
                          className="text-sm cursor-pointer text-gray-900 dark:text-gray-100"
                        >
                          {activity}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.expectedActivities && (
                    <p className="text-sm text-red-500 dark:text-red-400">
                      {errors.expectedActivities}
                    </p>
                  )}
                  {formData.expectedActivities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.expectedActivities.map((activity) => (
                        <Badge
                          key={activity}
                          variant="secondary"
                          className="cursor-pointer bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/50"
                          onClick={() => handleActivityToggle(activity)}
                        >
                          {activity} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* Applicant Information Section */}
            <Collapsible
              open={expandedSections.applicant}
              onOpenChange={() => toggleSection("applicant")}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Applicant Information
                  </h3>
                  <Badge
                    variant={
                      formData.applicantType &&
                      formData.applicantDescription.length >= 50 &&
                      formData.countryOfOrigin
                        ? "default"
                        : "secondary"
                    }
                    className="ml-2"
                  >
                    {formData.applicantType &&
                    formData.applicantDescription.length >= 50 &&
                    formData.countryOfOrigin
                      ? "Complete"
                      : "Required"}
                  </Badge>
                </div>
                {expandedSections.applicant ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-6 pt-6">
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
                    <div className="flex items-center space-x-2 pt-5">
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
                  </RadioGroup>
                  {errors.applicantType && (
                    <p className="text-sm text-red-500 dark:text-red-400">
                      {errors.applicantType}
                    </p>
                  )}
                </div>

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
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formData.applicantDescription.length}/50 characters minimum
                  </p>
                </div>

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
              </CollapsibleContent>
            </Collapsible>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* Online Presence Section */}
            <Collapsible
              open={expandedSections.online}
              onOpenChange={() => toggleSection("online")}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Online Presence
                  </h3>
                  <Badge variant="outline" className="ml-2">
                    Optional
                  </Badge>
                </div>
                {expandedSections.online ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-6 pt-6">
                <Alert className="border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
                  <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-800 dark:text-blue-200">
                    This section is optional but helps us understand your
                    digital presence and marketing strategy.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasWebsite"
                      checked={formData.hasWebsite}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          hasWebsite: checked as boolean,
                        }))
                      }
                      className="border-gray-300 dark:border-gray-600"
                    />
                    <Label
                      htmlFor="hasWebsite"
                      className="text-gray-900 dark:text-gray-100"
                    >
                      We have a website
                    </Label>
                  </div>

                  {formData.hasWebsite && (
                    <div className="space-y-2 ml-6">
                      <Label
                        htmlFor="websiteUrl"
                        className="text-gray-900 dark:text-gray-100"
                      >
                        Website URL
                      </Label>
                      <Input
                        id="websiteUrl"
                        type="url"
                        placeholder="https://www.yourwebsite.com"
                        value={formData.websiteUrl}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            websiteUrl: e.target.value,
                          }))
                        }
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                      />
                      {errors.websiteUrl && (
                        <p className="text-sm text-red-500 dark:text-red-400">
                          {errors.websiteUrl}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasSocialMedia"
                      checked={formData.hasSocialMedia}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          hasSocialMedia: checked as boolean,
                        }))
                      }
                      className="border-gray-300 dark:border-gray-600"
                    />
                    <Label
                      htmlFor="hasSocialMedia"
                      className="text-gray-900 dark:text-gray-100"
                    >
                      We have social media presence
                    </Label>
                  </div>

                  {formData.hasSocialMedia && (
                    <div className="space-y-2 ml-6">
                      <Label
                        htmlFor="socialMediaLinks"
                        className="text-gray-900 dark:text-gray-100"
                      >
                        Social Media Links
                      </Label>
                      <Textarea
                        id="socialMediaLinks"
                        placeholder="List your social media profiles (Facebook, LinkedIn, Twitter, etc.)"
                        value={formData.socialMediaLinks}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            socialMediaLinks: e.target.value,
                          }))
                        }
                        rows={3}
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                      />
                      {errors.socialMediaLinks && (
                        <p className="text-sm text-red-500 dark:text-red-400">
                          {errors.socialMediaLinks}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label
                      htmlFor="onlinePresence"
                      className="text-gray-900 dark:text-gray-100"
                    >
                      Additional Online Presence
                    </Label>
                    <Textarea
                      id="onlinePresence"
                      placeholder="Describe any other online presence, digital marketing strategies, or e-commerce platforms you use..."
                      value={formData.onlinePresence}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          onlinePresence: e.target.value,
                        }))
                      }
                      rows={3}
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

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
            <div className="flex items-start gap-4">
              <div className="space-y-2">
                <h6 className="font-medium text-gray-500 dark:text-gray-100">
                  Are you sure you want to submit your Expression of Interest?
                </h6>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Go Back
            </Button>
            <Button
              onClick={confirmSubmission}
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
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
                "Confirm Submission"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
