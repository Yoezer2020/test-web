"use client";

import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
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
import { useAppDispatch } from "@/redux/store";
import { submitExpressionOfInterest } from "@/redux/slice/expression-of-interest/expressionInterestSlice";
import { checkUserEmail } from "@/redux/slice/users/usersSlice";

const defaultValues: FormData = {
  email: "",
  entityType: "",
  businessPlan: "",
  applicantDescription: "",
  countryOfOrigin: "",
  onlinePresence: "",
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
});

// Type definition for the form data
export type FormData = z.infer<typeof baseSchema>;

export function ExpressionOfInterestForm(): ReactElement {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState<FormData | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [emailExistMessage, setEmailExistMessage] = useState("");

  const methods = useForm<FormData>({
    resolver: zodResolver(baseSchema),
    mode: "onChange",
    defaultValues,
  });

  const {
    watch,
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const checkEmail = watch("email");

  // Handle form submission
  const onSubmit = async (data: any) => {
    setFormDataToSubmit(data);
    setShowConfirmation(true);
  };

  // Handle confirmation from dialog
  const confirmSubmission = async () => {
    console.log("form data during submission:", formDataToSubmit);
    if (!formDataToSubmit) return;
    const formData = {
      email: formDataToSubmit?.email,
      entityType: formDataToSubmit?.entityType,
      businessPlans: formDataToSubmit?.businessPlan,
      applicantType: "applicant",
      companyInformation: formDataToSubmit?.applicantDescription,
      country: formDataToSubmit?.countryOfOrigin,
      onlinePresence: formDataToSubmit?.onlinePresence || "",
    };
    setShowConfirmation(false);
    setIsSubmitting(true);
    dispatch(submitExpressionOfInterest(formData))
      .unwrap()
      .then(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setErrorMessage("");
      })
      .catch((err) => {
        setIsSubmitting(false);
        setErrorMessage(err);
      });
  };

  // Reset form when submission is successful
  useEffect(() => {
    if (submitSuccess) {
      reset(defaultValues);
    }
  }, [submitSuccess, reset]);

  const checkEmailMethod = async (checkEmail: any) => {
    // if (!checkEmail) return;
    dispatch(checkUserEmail({ email: checkEmail }))
      .unwrap()
      .then(() => {
        setEmailExistMessage("The email is available");
        setIsSubmitting(false);
      })
      .catch((error: any) => {
        const errorMsg =
          error?.message ||
          error?.data?.message ||
          "This email is already registered.";
        setEmailExistMessage(errorMsg);
        setIsSubmitting(false);
      });
  };

  // useEffect(() => {
  //   if (checkEmail && !errors.email) {
  //     checkEmailMethod(checkEmail);
  //   }
  // }, [checkEmail]);

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
                // reset(defaultValues);
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
                      <FormItem className="space-y-2">
                        <FormLabel className="text-gray-900 dark:text-gray-100 font-medium">
                          Email Address *
                        </FormLabel>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              className={`bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-offset-2 ${
                                emailExistMessage
                                  ? emailExistMessage.includes("available")
                                    ? "border-green-500 ring-green-200 dark:ring-green-900"
                                    : "border-red-500 ring-red-200 dark:ring-red-900"
                                  : ""
                              }`}
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              if (field.value) checkEmailMethod(field.value);
                            }}
                            disabled={isSubmitting || !field.value}
                            className="shrink-0 sm:w-auto border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 hover:border-blue-600 dark:hover:border-blue-500 disabled:border-gray-300 disabled:text-gray-500 whitespace-nowrap font-medium"
                          >
                            {isSubmitting
                              ? "Checking..."
                              : "Check Availability"}
                          </Button>
                        </div>
                        <FormMessage />
                        {emailExistMessage && (
                          <div
                            className={`text-sm p-2 rounded-md mt-1 flex items-center gap-2 ${
                              emailExistMessage.includes("available")
                                ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-300"
                                : "bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300"
                            }`}
                          >
                            {emailExistMessage.includes("available") ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <AlertCircle className="h-4 w-4" />
                            )}
                            {String(emailExistMessage)}
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
