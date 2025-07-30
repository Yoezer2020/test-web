"use client";

import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import { useForm, useWatch, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Mail,
  Building2,
  Globe,
  Users,
  Award,
  Calendar,
  Shield,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileUpload } from "@/components/inputs/single-file-upload/file-upload-single";
import { Label } from "@/components/ui/label";
import { submitExpressionOfInterest } from "@/redux/slice/expression-of-interest/expressionInterestSlice";
import { useAppDispatch } from "@/redux/store";
import {
  submitCSPExpressionOfInterest,
  uploadCSPDetails,
} from "@/redux/slice/corporate-service-provider/corporateServiceSlice";

const cspClientTypes = [
  "Small and Medium Enterprises",
  "Large Corporations",
  "Multinational Corporations",
  "Listed Companies",
  "Financial Institutions",
  "Family Offices",
] as const;

// Define default values with proper types
const defaultValues: z.infer<typeof eoiSchema> = {
  email: "",
  entityType: "",
  businessPlan: "",
  applicantDescription: "",
  countryOfOrigin: "",
  onlinePresence: "",
  registerAsCSP: false,
  cspContactName: "",
  cspCompanyName: "",
  cspUEN: "",
  cspEstablishmentYear: "",
  cspWebsite: "",
  cspRQICount: "",
  cspExperiencedRQICount: "",
  cspYearsQualified: "",
  cspLicenseExpiry: "",
  cspACRALicense: false,
  cspServices: "",
  cspClientTypes: [],
  cspSecurityFeatures: "",
  cspDifferentiators: "",
  cspAdditionalInfo: "",
  cspQuestions: "",
  cspACRANotice: [],
  cspCompanyProfile: [],
  cspFeeSchedule: [],
};

// Base schema for common fields
const baseSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  entityType: z
    .string()
    .min(1, "Entity type is required")
    .refine((value) => ["pclbs", "branch_office"].includes(value), {
      message: "Invalid entity type",
    }),
  businessPlan: z.string().min(1, "Business plan is required"),
  applicantDescription: z.string().min(1, "Applicant description is required"),
  countryOfOrigin: z.string().min(1, "Country of origin is required"),
  onlinePresence: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^https?:\/\/.+/.test(value),
      "Please enter a valid URL (starting with http:// or https://)"
    ),
  registerAsCSP: z.boolean(),
});

// CSP specific schema
const cspSchema = z.object({
  cspContactName: z
    .string()
    .min(1, "Primary contact name and position is required"),
  cspCompanyName: z.string().min(1, "Official company name is required"),
  cspUEN: z.string().min(1, "UEN is required"),
  cspEstablishmentYear: z
    .string()
    .min(1, "Year established is required")
    .refine(
      (value) => {
        const year = Number.parseInt(value);
        return !isNaN(year) && year >= 1900 && year <= new Date().getFullYear();
      },
      {
        message: `Year must be between 1900 and ${new Date().getFullYear()}`,
      }
    ),
  cspWebsite: z
    .string()
    .min(1, "Official website address is required")
    .url("Please enter a valid URL"),
  cspRQICount: z
    .string()
    .min(1, "Number of RQIs is required")
    .refine((value) => Number.parseInt(value) >= 0, {
      message: "Number of RQIs must be non-negative",
    }),
  cspExperiencedRQICount: z
    .string()
    .min(1, "Number of experienced RQIs is required")
    .refine((value) => Number.parseInt(value) >= 0, {
      message: "Number of experienced RQIs must be non-negative",
    }),
  cspYearsQualified: z
    .string()
    .min(1, "Years qualified as CSP is required")
    .refine((value) => Number.parseInt(value) >= 0, {
      message: "Years qualified must be non-negative",
    }),
  cspLicenseExpiry: z.string().min(1, "RFA license expiry date is required"),
  cspACRALicense: z
    .boolean()
    .refine((value) => value === true || value === false, {
      message: "ACRA registered filing agent status must be a boolean",
    }),
  cspServices: z.string().min(1, "Services description is required"),
  cspClientTypes: z
    .array(z.enum(cspClientTypes))
    .min(1, "At least one client type must be selected"),
  cspSecurityFeatures: z
    .string()
    .min(1, "Security features description is required"),
  cspDifferentiators: z.string().min(1, "CSP differentiators are required"),
  cspAdditionalInfo: z.string().optional(),
  cspQuestions: z.string().optional(),
  cspACRANotice: z.any().refine((files) => files?.length > 0, {
    message: "ACRA notice upload is required",
  }),
  cspCompanyProfile: z.any().optional(),
  cspFeeSchedule: z.any().refine((files) => files?.length > 0, {
    message: "Fee schedule upload is required",
  }),
});

// Main schema with conditional validation
export const eoiSchema = baseSchema.and(
  z.discriminatedUnion("registerAsCSP", [
    z.object({
      registerAsCSP: z.literal(false),
    }),
    z.object({
      registerAsCSP: z.literal(true),
      ...cspSchema.shape,
    }),
  ])
);

// Type definition for the form data
export type FormData = z.infer<typeof eoiSchema>;

export function ExpressionOfInterestForm(): ReactElement {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState<FormData | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");

  const methods = useForm<FormData>({
    resolver: zodResolver(eoiSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = methods;

  const watchRegisterAsCSP = useWatch({ control, name: "registerAsCSP" });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setFormDataToSubmit(data);
    setShowConfirmation(true);
  };

  // Handle confirmation from dialog
  const confirmSubmission = async () => {
    if (!formDataToSubmit) return;

    setShowConfirmation(false);
    setIsSubmitting(true);

    function isCSPFormData(
      data: FormData
    ): data is FormData & { registerAsCSP: true } & z.infer<typeof cspSchema> {
      return data.registerAsCSP === true;
    }

    const basicEntity = {
      email: formDataToSubmit.email,
      entityType: formDataToSubmit.entityType,
      businessPlans: formDataToSubmit.businessPlan,
      applicantType: "applicant",
      companyInformation: formDataToSubmit.applicantDescription,
      country: formDataToSubmit.countryOfOrigin,
      onlinePresence: formDataToSubmit.onlinePresence,
    };

    try {
      const eoiResponse = await dispatch(
        submitExpressionOfInterest(basicEntity)
      ).unwrap();

      if (isCSPFormData(formDataToSubmit)) {
        const cspEntity = {
          eoiId: eoiResponse.id,
          contactDetails: formDataToSubmit.cspContactName,
          companyName: formDataToSubmit.cspCompanyName,
          UEN: formDataToSubmit.cspUEN,
          yearEstablished: formDataToSubmit.cspEstablishmentYear,
          website: formDataToSubmit.cspWebsite,
          numberOfRqi: formDataToSubmit.cspRQICount,
          fiveYearsRoi: formDataToSubmit.cspExperiencedRQICount,
          qualifiedYears: formDataToSubmit.cspYearsQualified,
          rfaExpiryDate: formDataToSubmit.cspLicenseExpiry,
          registeredFillingAgent: formDataToSubmit.cspACRALicense,
          servicesProvided: formDataToSubmit.cspServices,
          clientTypeServed: formDataToSubmit.cspClientTypes,
          security: formDataToSubmit.cspSecurityFeatures,
          serviceDifferentiators: formDataToSubmit.cspDifferentiators,
          questions: formDataToSubmit.cspQuestions,
        };

        try {
          const cspResponse = await dispatch(
            submitCSPExpressionOfInterest(cspEntity)
          ).unwrap();

          const files = new FormData();
          files.append("acra", formDataToSubmit.cspACRANotice[0]);

          if (formDataToSubmit.cspCompanyProfile?.[0]) {
            files.append(
              "companyProfile",
              formDataToSubmit.cspCompanyProfile[0]
            );
          }

          files.append(
            "currentFeeSchedule",
            formDataToSubmit.cspFeeSchedule[0]
          );

          try {
            await dispatch(
              uploadCSPDetails({ id: cspResponse.id, fileData: files })
            ).unwrap();

            setSubmitSuccess(true);
            setIsSubmitting(false);
            setFormDataToSubmit(null);
          } catch (err: any) {
            setErrorMessage(
              err?.response?.data?.message ??
                "Failed to upload CSP supporting documents"
            );
            setIsSubmitting(false);
          }
        } catch (err: any) {
          setErrorMessage(
            err?.response?.data?.message ??
              "Failed to submit Expression of Interest for CSP"
          );
          setIsSubmitting(false);
        }
      } else {
        // Non-CSP submission is successful
        setSubmitSuccess(true);
        setIsSubmitting(false);
        setFormDataToSubmit(null);
      }
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.message ??
          "Failed to submit Expression of Interest"
      );
      setIsSubmitting(false);
    }
  };

  // Reset form when submission is successful
  useEffect(() => {
    if (submitSuccess) {
      reset(defaultValues);
    }
  }, [submitSuccess, reset]);

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-4 flex items-center justify-center">
        <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg max-w-2xl w-full">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <CheckCircle2 className="h-20 w-20 text-green-500 dark:text-white mx-auto mb-4" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Expression of Interest Submitted!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Thank you, GCRO will review your expression of interest and you
              will be notified about the outcome
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <p className="font-semibold text-gray-900 dark:text-white">
                  Next Steps
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You will receive a confirmation email with your application
                reference number and further instructions.
              </p>
            </div>
            <Button
              onClick={() => {
                setSubmitSuccess(false);
                reset(defaultValues);
              }}
              variant="outline"
              className="mt-6 px-8 py-3 text-lg border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Submit Another Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader className="bg-gray-900 dark:bg-gray-800 text-white border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                Expression of Interest Form
              </CardTitle>
              <CardDescription className="text-gray-300 mt-2">
                Please provide accurate information for your business
                registration
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {errors.root && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                  <p className="text-red-600 dark:text-red-300">
                    {errors.root.message}
                  </p>
                </div>
              )}

              {/* Basic Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <Mail className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Basic Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                          Email Address *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="entityType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                          Entity Type *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600`}
                            >
                              <SelectValue placeholder="Select entity type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pclbs">
                              PCLBS (Private Company Limited by Shares)
                            </SelectItem>
                            <SelectItem value="branch_office">
                              Branch Office
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator className="bg-gray-200 dark:bg-gray-700" />

              {/* Applicant Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <Users className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Applicant Information
                  </h3>
                </div>
                <FormField
                  control={control}
                  name="applicantDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                        Applicant Background *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide background information on the applicant, e.g. information about individual or parent company"
                          rows={4}
                          className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 resize-none`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="countryOfOrigin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                        Country of Origin *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter country of origin"
                          rows={4}
                          className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 resize-none`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="bg-gray-200 dark:bg-gray-700" />

              {/* Business Plan Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <Building2 className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Business Plan & Activities
                  </h3>
                </div>
                <FormField
                  control={control}
                  name="businessPlan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                        Business Plan *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your business concept, target market, revenue model, and growth strategy..."
                          rows={6}
                          className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 resize-none`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="bg-gray-200 dark:bg-gray-700" />

              {/* CSP Registration Checkbox */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <Award className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Additional Services
                  </h3>
                </div>
                <FormField
                  control={control}
                  name="registerAsCSP"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer text-gray-900 dark:text-gray-100 flex items-center gap-2">
                          <Award className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          Register as a CSP Provider
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* CSP Provider Section */}
              {watchRegisterAsCSP && (
                <>
                  <Separator className="bg-gray-200 dark:bg-gray-700" />
                  <div className="space-y-8">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <Award className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        CSP Provider Information
                      </h3>
                    </div>

                    {/* Basic Information */}
                    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 mb-4">
                        <Building2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                          Basic Information
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={control}
                          name="cspContactName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                                Primary Contact Name and Position *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Full name and position/title of primary contact person"
                                  className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="cspCompanyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                                Official Company Name *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Company name as officially registered"
                                  className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="cspUEN"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                                UEN *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Unique Entity Number"
                                  className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="cspEstablishmentYear"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                                Year Established *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="YYYY"
                                  min="1900"
                                  max={new Date().getFullYear()}
                                  className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={control}
                        name="cspWebsite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                              Official Website Address *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="https://www.yourcompany.com"
                                className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Background Information */}
                    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                          Background Information
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={control}
                          name="cspRQICount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                                Number of RQIs Employed *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  placeholder="Total RQIs"
                                  className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="cspExperiencedRQICount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                                RQIs with 5+ Years Experience *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  placeholder="Experienced RQIs"
                                  className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="cspYearsQualified"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                                Years Qualified as CSP in Singapore *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  placeholder="Years"
                                  className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="cspLicenseExpiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                                RFA License Expiry Date *
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                  <Input
                                    type="date"
                                    className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 pl-10`}
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={control}
                        name="cspACRANotice"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FileUpload
                                id="cspACRANotice"
                                label="ACRA Notice Upload"
                                description="Upload the notice from ACRA stating the validity of your RFA license and date of expiry"
                                required={true}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                onFileChange={(files) => field.onChange(files)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="cspACRALicense"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              ACRA Registered Filing Agent Status
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) =>
                                  field.onChange(value === "true")
                                }
                                value={field.value.toString()}
                                className="flex gap-6"
                              >
                                <div className="flex items-center space-x-2 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                  <RadioGroupItem value="true" id="acra-yes" />
                                  <Label
                                    htmlFor="acra-yes"
                                    className="cursor-pointer"
                                  >
                                    Yes
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                  <RadioGroupItem value="false" id="acra-no" />
                                  <Label
                                    htmlFor="acra-no"
                                    className="cursor-pointer"
                                  >
                                    No
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="cspServices"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                              Services Provided *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please state all services provided by your company, eg CSP, registered office, accounting, tax, trust, private client, etc."
                                rows={3}
                                className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 resize-none`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="cspCompanyProfile"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FileUpload
                                id="cspCompanyProfile"
                                label="Company Profile and Services Listing"
                                description="If you have a listing of your services and/or company profile, please upload"
                                required={false}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                multiple={true}
                                onFileChange={(files) => field.onChange(files)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="cspClientTypes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                              Client Types Served * (Select all that apply)
                            </FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {cspClientTypes.map((clientType) => (
                                <div
                                  key={clientType}
                                  className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                                >
                                  <Checkbox
                                    id={`client-${clientType}`}
                                    checked={field.value.includes(clientType)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([
                                          ...field.value,
                                          clientType,
                                        ]);
                                      } else {
                                        field.onChange(
                                          field.value.filter(
                                            (type) => type !== clientType
                                          )
                                        );
                                      }
                                    }}
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="cspSecurityFeatures"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900 dark:text-gray-100 font-medium flex items-center gap-2">
                              <Shield className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                              Security Features and Data Protection *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please briefly describe the security features your company has in place to handle sensitive documents, and ensure data protection and client confidentiality"
                                rows={4}
                                className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 resize-none`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Miscellaneous Information */}
                    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                          Miscellaneous Information
                        </h4>
                      </div>
                      <FormField
                        control={control}
                        name="cspFeeSchedule"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FileUpload
                                id="cspFeeSchedule"
                                label="Current Fee Schedule"
                                description="Please provide your current fee schedule for CSP services carried out by your company"
                                required={true}
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                                onFileChange={(files) => field.onChange(files)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="cspDifferentiators"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                              Service Differentiators *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="What differentiates your company's CSP services from others in the market?"
                                rows={3}
                                className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 resize-none`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="cspAdditionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                              Additional Supporting Information
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please provide any additional information that you believe may support your company's Expression of Interest"
                                rows={3}
                                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="cspQuestions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                              Questions about GMC/GCRO
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any questions about the GMC and/or for the GCRO?"
                                rows={3}
                                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </>
              )}

              <Separator className="bg-gray-200 dark:bg-gray-700" />

              {/* Online Presence Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <Globe className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Online Presence
                  </h3>
                  <Badge
                    variant="outline"
                    className="ml-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                  >
                    Optional
                  </Badge>
                </div>
                <FormField
                  control={control}
                  name="onlinePresence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                        Website or Social Media Link
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://www.yourwebsite.com"
                          className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="bg-gray-200 dark:bg-gray-700" />
              {errorMessage && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-300" />
                    <p className="text-red-600 dark:text-red-300">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white dark:border-gray-900"></div>
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
          </FormProvider>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-white">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                <AlertCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
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
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-700 dark:text-gray-300">
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
              className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 text-white shadow-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-gray-900"></div>
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
