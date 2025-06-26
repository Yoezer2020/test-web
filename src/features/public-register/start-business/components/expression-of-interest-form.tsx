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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FormData {
  email: string;
  entityType: string;
  businessPlan: string;
  applicantType: string;
  applicantDescription: string;
  countryOfOrigin: string;
  onlinePresence: string;
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

export function ExpressionOfInterestForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    entityType: "",
    businessPlan: "",
    applicantType: "",
    applicantDescription: "",
    countryOfOrigin: "",
    onlinePresence: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Basic Information
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.entityType) newErrors.entityType = "Entity type is required";

    // Business Plan & Activities
    if (!formData.businessPlan)
      newErrors.businessPlan = "Business plan is required";

    // Applicant Information
    if (!formData.applicantType)
      newErrors.applicantType = "Applicant type is required";
    if (!formData.applicantDescription)
      newErrors.applicantDescription = "Detailed description is required";
    if (!formData.countryOfOrigin)
      newErrors.countryOfOrigin = "Country of origin is required";

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

      // Here you would normally send the data to your API
      console.log("Form data being submitted:", formData);

      setSubmitSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      // You could add error handling here
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCompletionStatus = () => {
    const requiredFields = [
      formData.email,
      formData.entityType,
      formData.businessPlan,
      formData.applicantType,
      formData.applicantDescription,
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
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            Expression of Interest Form
          </CardTitle>
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

              <Alert className="border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  This section is optional but helps us understand your digital
                  presence and marketing strategy.
                </AlertDescription>
              </Alert>

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
                  placeholder="https://www.yourwebsite.com or https://facebook.com/yourpage"
                  value={formData.onlinePresence}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      onlinePresence: e.target.value,
                    }))
                  }
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Share your website, Facebook page, LinkedIn profile, or any
                  other online presence
                </p>
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
                  "Submit "
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
