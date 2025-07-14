"use client";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Building2,
  User,
  Shield,
  CheckCircle2,
  AlertCircle,
  Upload,
  Info,
  Briefcase,
  DollarSign,
  Users,
  FileText,
  UserCheck,
  Scale,
  Star,
  MessageSquare,
  ArrowLeft,
  Save,
} from "lucide-react";
import { FileUpload } from "@/components/inputs/single-file-upload/file-upload-single";
import Link from "next/link";

interface FormData {
  // Section 1: Company Details
  companyNames: string[];
  isTrademarkName: string;
  consentLetter: File[];
  initialShares: string;
  paidUpCapital: string;
  principalActivities: string;

  // Section 2: Subscriber Information
  subscriberType: "individual" | "corporation" | "";

  // Individual Subscriber
  subscriberDocs: File[];
  subscriberName: string;
  subscriberNationality: string;
  subscriberAddress: string;
  subscriberOccupation: string;
  subscriberPassport: string;
  subscriberDOB: string;
  subscriberPhone: string;
  subscriberEmail: string;
  subscriberShares: string;
  sharesInTrust: string;
  trustName: string;

  // Corporate Subscriber
  corporateAuthDocs: File[];
  corporatePassportDocs: File[];
  corporateName: string;
  corporateAddress: string;
  corporateCountry: string;
  corporateWebsite: string;
  corporateAuthorizedPerson: string;
  corporateShares: string;

  // Section 3: Directors
  directorDocs: File[];
  directors: Array<{
    name: string;
    nationality: string;
    address: string;
    dob: string;
    occupation: string;
    passport: string;
    phone: string;
    email: string;
  }>;

  // Section 4: Company Details
  registeredOffice: string;
  financialYearEnd: string;

  // Section 5: Applicant Information
  applicantType: "individual" | "company" | "";

  // Individual Applicant
  applicantDocs: File[];
  applicantName: string;
  applicantCapacity: string;
  applicantAddress: string;
  applicantID: string;
  applicantDOB: string;
  applicantGender: string;
  applicantNationality: string;
  applicantOccupation: string;
  applicantPhone: string;
  applicantEmail: string;
  applicantFundsSource: string;
  applicantBusinessPurpose: string;

  // Company Applicant
  companyDocs: File[];
  companyName: string;
  companyUEN: string;
  companyAddresses: string;
  companyIncorporationPlace: string;
  companyIncorporationDate: string;
  companyContactNumber: string;
  companyEmailAddress: string;
  companyWebsiteAddress: string;
  companyBusinessNature: string;
  companyTransactionCountries: string;
  companyFundsSource: string;
  companyConnectedParties: string;
  companyBusinessRelationship: string;

  // Section 6: Beneficial Owners
  beneficialOwnerType: "individual" | "corporation" | "none" | "";

  // Section 7: PEP Information
  isPEP: string;
  pepDetails: Array<{
    name: string;
    country: string;
    function: string;
    period: string;
    relationship: string;
    wealthSource: string;
    fundsSource: string;
  }>;

  // Section 8: Declaration
  declarantName: string;
  declarantID: string;
  declaration: boolean;

  // Section 9: Special UEN
  wantsSpecialUEN: string;
  specialUEN: string;

  // Section 10: Bank Account
  wantsBankAccount: string;
  accountType: string;
  operationMode: string;

  // Feedback
  experienceRating: number;
  feedback: string;
}

const SECTIONS = [
  { id: "introduction", name: "Introduction", icon: Info },
  { id: "company-details", name: "Company Details", icon: Building2 },
  { id: "subscriber", name: "Subscriber Information", icon: User },
  { id: "directors", name: "Directors", icon: Users },
  { id: "applicant", name: "Applicant Information", icon: UserCheck },
  { id: "beneficial-owners", name: "Beneficial Owners", icon: Shield },
  { id: "pep", name: "PEP Information", icon: Scale },
  { id: "declaration", name: "Declaration", icon: FileText },
  { id: "special-services", name: "Special Services", icon: Star },
  { id: "bank-account", name: "Bank Account", icon: DollarSign },
  { id: "feedback", name: "Feedback", icon: MessageSquare },
];

export default function CompanyRegistrationPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [formData, setFormData] = useState<FormData>({
    companyNames: ["", "", ""],
    isTrademarkName: "",
    consentLetter: [],
    initialShares: "",
    paidUpCapital: "",
    principalActivities: "",
    subscriberType: "",
    subscriberDocs: [],
    subscriberName: "",
    subscriberNationality: "",
    subscriberAddress: "",
    subscriberOccupation: "",
    subscriberPassport: "",
    subscriberDOB: "",
    subscriberPhone: "",
    subscriberEmail: "",
    subscriberShares: "",
    sharesInTrust: "",
    trustName: "",
    corporateAuthDocs: [],
    corporatePassportDocs: [],
    corporateName: "",
    corporateAddress: "",
    corporateCountry: "",
    corporateWebsite: "",
    corporateAuthorizedPerson: "",
    corporateShares: "",
    directorDocs: [],
    directors: [
      {
        name: "",
        nationality: "",
        address: "",
        dob: "",
        occupation: "",
        passport: "",
        phone: "",
        email: "",
      },
    ],
    registeredOffice: "",
    financialYearEnd: "",
    applicantType: "",
    applicantDocs: [],
    applicantName: "",
    applicantCapacity: "",
    applicantAddress: "",
    applicantID: "",
    applicantDOB: "",
    applicantGender: "",
    applicantNationality: "",
    applicantOccupation: "",
    applicantPhone: "",
    applicantEmail: "",
    applicantFundsSource: "",
    applicantBusinessPurpose: "",
    companyDocs: [],
    companyName: "",
    companyUEN: "",
    companyAddresses: "",
    companyIncorporationPlace: "",
    companyIncorporationDate: "",
    companyContactNumber: "",
    companyEmailAddress: "",
    companyWebsiteAddress: "",
    companyBusinessNature: "",
    companyTransactionCountries: "",
    companyFundsSource: "",
    companyConnectedParties: "",
    companyBusinessRelationship: "",
    beneficialOwnerType: "",
    isPEP: "",
    pepDetails: [],
    declarantName: "",
    declarantID: "",
    declaration: false,
    wantsSpecialUEN: "",
    specialUEN: "",
    wantsBankAccount: "",
    accountType: "",
    operationMode: "",
    experienceRating: 0,
    feedback: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("gmc-registration-draft", JSON.stringify(formData));
      setLastSaved(new Date());
    }, 2000);
    return () => clearTimeout(timer);
  }, [formData]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("gmc-registration-draft");
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, []);

  // Handle scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map((section) =>
        document.getElementById(section.id)
      );
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateFormData = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const addDirector = () => {
    setFormData((prev) => ({
      ...prev,
      directors: [
        ...prev.directors,
        {
          name: "",
          nationality: "",
          address: "",
          dob: "",
          occupation: "",
          passport: "",
          phone: "",
          email: "",
        },
      ],
    }));
  };

  const updateDirector = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      directors: prev.directors.map((director, i) =>
        i === index ? { ...director, [field]: value } : director
      ),
    }));
  };

  const removeDirector = (index: number) => {
    if (formData.directors.length > 1) {
      setFormData((prev) => ({
        ...prev,
        directors: prev.directors.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      setErrors(errors);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);
      localStorage.removeItem("gmc-registration-draft");
      // Redirect to success page or dashboard
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg border-r border-gray-200 fixed h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <Link
            href="/user-dashboard"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-xl font-bold text-gray-900">
            GMC Company Registration
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Complete your incorporation application
          </p>

          {lastSaved && (
            <div className="flex items-center gap-2 mt-3 text-xs text-green-600">
              <Save className="h-3 w-3" />
              Last saved: {lastSaved.toLocaleTimeString()}
            </div>
          )}
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {SECTIONS.map((section, index) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isActive ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    <span className="text-sm font-medium">{section.name}</span>
                    <span
                      className={`ml-auto text-xs px-2 py-1 rounded-full ${
                        isActive
                          ? "bg-blue-200 text-blue-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 mt-auto">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Submit Application
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-80">
        <div className="max-w-4xl mx-auto p-8 space-y-12">
          {/* Introduction Section */}
          <section id="introduction" className="scroll-mt-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Building2 className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                GMC Company Incorporation Application
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Welcome to the Gelephu Mindfulness City company incorporation
                process. This form will guide you through registering your
                Private Limited Company.
              </p>
            </div>

            <Alert className="border-blue-200 bg-blue-50 mt-8">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Important:</strong> Please contact GMCA for a
                preliminary discussion before submitting this application.
              </AlertDescription>
            </Alert>

            <Card className="border-amber-200 bg-amber-50 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Shield className="h-5 w-5" />
                  Data Protection Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-amber-700 space-y-3">
                <p>
                  We may collect, use and/or disclose personal data for
                  providing services to you. We may disclose such data to
                  affiliated entities, service providers, and governmental
                  authorities.
                </p>
                <p>
                  Details about data processing are in our privacy policy at{" "}
                  <a href="https://gmc.bt/" className="underline font-medium">
                    https://gmc.bt/
                  </a>
                </p>
                <p>
                  By proceeding, you confirm you have obtained necessary
                  consents for any third-party data provided.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Company Details Section */}
          <section id="company-details" className="scroll-mt-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Company Details
              </h2>
              <p className="text-gray-600">
                Basic information about your proposed company
              </p>
            </div>

            <div className="space-y-8">
              {/* Company Names */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    Proposed Company Names
                  </CardTitle>
                  <CardDescription>
                    Provide up to 3 company names. Each must end with
                    &ldquo;Private Limited&ldquo; or &ldquo;Pte Ltd&ldquo;
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.companyNames.map((name, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`companyName${index + 1}`}>
                        Company Name {index + 1} {index === 0 && "*"}
                      </Label>
                      <Input
                        id={`companyName${index + 1}`}
                        placeholder={`Enter company name ${index + 1}`}
                        value={name}
                        onChange={(e) => {
                          const newNames = [...formData.companyNames];
                          newNames[index] = e.target.value;
                          updateFormData("companyNames", newNames);
                        }}
                        className={
                          errors[`companyName${index + 1}`]
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {errors[`companyName${index + 1}`] && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors[`companyName${index + 1}`]}
                        </p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Trademark Question */}
              <Card>
                <CardHeader>
                  <CardTitle>Trademark/Patent Information</CardTitle>
                  <CardDescription>
                    Is the proposed company name a trademark/patent name or name
                    of a company elsewhere?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.isTrademarkName}
                    onValueChange={(value) =>
                      updateFormData("isTrademarkName", value)
                    }
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="yes" id="trademark-yes" />
                      <Label htmlFor="trademark-yes" className="cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="no" id="trademark-no" />
                      <Label htmlFor="trademark-no" className="cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.isTrademarkName === "yes" && (
                    <div className="mt-4">
                      <Label>Upload Letter of Consent from Owner *</Label>
                      <FileUpload
                        id="consentLetter"
                        label=""
                        description="Upload the consent letter from the trademark/patent owner"
                        required={true}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onFileChange={(files) =>
                          updateFormData("consentLetter", files)
                        }
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Share Capital */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Initial Shares
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label htmlFor="initialShares">Number of Shares *</Label>
                    <Input
                      id="initialShares"
                      type="number"
                      placeholder="e.g., 1000"
                      value={formData.initialShares}
                      onChange={(e) =>
                        updateFormData("initialShares", e.target.value)
                      }
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Paid-up Capital
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label htmlFor="paidUpCapital">Amount (US$) *</Label>
                    <Input
                      id="paidUpCapital"
                      type="number"
                      placeholder="e.g., 10000"
                      value={formData.paidUpCapital}
                      onChange={(e) =>
                        updateFormData("paidUpCapital", e.target.value)
                      }
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Principal Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                    Principal Activities
                  </CardTitle>
                  <CardDescription>
                    Describe the main business activities (up to 2 activities)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe your company's principal business activities..."
                    value={formData.principalActivities}
                    onChange={(e) =>
                      updateFormData("principalActivities", e.target.value)
                    }
                    rows={4}
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Subscriber Information Section */}
          <section id="subscriber" className="scroll-mt-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Subscriber Information
              </h2>
              <p className="text-gray-600">
                Information about the company subscriber
              </p>
            </div>

            <div className="space-y-8">
              {/* Subscriber Type Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Subscriber Type</CardTitle>
                  <CardDescription>
                    Is the subscriber an individual or a corporation?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.subscriberType}
                    onValueChange={(value) =>
                      updateFormData(
                        "subscriberType",
                        value as "individual" | "corporation"
                      )
                    }
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem
                        value="individual"
                        id="subscriber-individual"
                      />
                      <div className="flex items-center gap-3">
                        <User className="h-6 w-6 text-blue-600" />
                        <div>
                          <Label
                            htmlFor="subscriber-individual"
                            className="cursor-pointer font-medium"
                          >
                            Individual
                          </Label>
                          <p className="text-sm text-gray-600">
                            Personal subscriber
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem
                        value="corporation"
                        id="subscriber-corporation"
                      />
                      <div className="flex items-center gap-3">
                        <Building2 className="h-6 w-6 text-green-600" />
                        <div>
                          <Label
                            htmlFor="subscriber-corporation"
                            className="cursor-pointer font-medium"
                          >
                            Corporation
                          </Label>
                          <p className="text-sm text-gray-600">
                            Corporate subscriber
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Individual Subscriber Details */}
              {formData.subscriberType === "individual" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5 text-blue-600" />
                        Required Documents
                      </CardTitle>
                      <CardDescription>
                        Upload passport/ID and proof of address (notarized or
                        certified copies)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FileUpload
                        id="subscriberDocs"
                        label="Documents"
                        description="Upload (1) passport/identity card and (2) proof of residential address"
                        required={true}
                        multiple={true}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onFileChange={(files) =>
                          updateFormData("subscriberDocs", files)
                        }
                      />
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="subscriberName">Full Name *</Label>
                          <Input
                            id="subscriberName"
                            placeholder="Enter full name"
                            value={formData.subscriberName}
                            onChange={(e) =>
                              updateFormData("subscriberName", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subscriberNationality">
                            Nationality/Citizenship *
                          </Label>
                          <Input
                            id="subscriberNationality"
                            placeholder="Enter nationality"
                            value={formData.subscriberNationality}
                            onChange={(e) =>
                              updateFormData(
                                "subscriberNationality",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subscriberOccupation">
                            Current Occupation *
                          </Label>
                          <Input
                            id="subscriberOccupation"
                            placeholder="Enter occupation"
                            value={formData.subscriberOccupation}
                            onChange={(e) =>
                              updateFormData(
                                "subscriberOccupation",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subscriberPassport">
                            Passport/ID Number or FIN *
                          </Label>
                          <Input
                            id="subscriberPassport"
                            placeholder="Enter passport or ID number or FIN"
                            value={formData.subscriberPassport}
                            onChange={(e) =>
                              updateFormData(
                                "subscriberPassport",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="subscriberAddress">
                            Residential Address *
                          </Label>
                          <Textarea
                            id="subscriberAddress"
                            placeholder="Enter full residential address"
                            value={formData.subscriberAddress}
                            onChange={(e) =>
                              updateFormData(
                                "subscriberAddress",
                                e.target.value
                              )
                            }
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subscriberDOB">Date of Birth *</Label>
                          <Input
                            id="subscriberDOB"
                            type="date"
                            value={formData.subscriberDOB}
                            onChange={(e) =>
                              updateFormData("subscriberDOB", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subscriberPhone">
                            Phone Number *
                          </Label>
                          <Input
                            id="subscriberPhone"
                            placeholder="Enter phone number"
                            value={formData.subscriberPhone}
                            onChange={(e) =>
                              updateFormData("subscriberPhone", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subscriberEmail">
                            Email Address *
                          </Label>
                          <Input
                            id="subscriberEmail"
                            type="email"
                            placeholder="Enter email address"
                            value={formData.subscriberEmail}
                            onChange={(e) =>
                              updateFormData("subscriberEmail", e.target.value)
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Share Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Share Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="subscriberShares">
                            Number of Shares *
                          </Label>
                          <Input
                            id="subscriberShares"
                            type="number"
                            placeholder="Enter number of shares"
                            value={formData.subscriberShares}
                            onChange={(e) =>
                              updateFormData("subscriberShares", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Are shares held in trust? *</Label>
                          <RadioGroup
                            value={formData.sharesInTrust}
                            onValueChange={(value) =>
                              updateFormData("sharesInTrust", value)
                            }
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="trust-yes" />
                              <Label htmlFor="trust-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="trust-no" />
                              <Label htmlFor="trust-no">No</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      {formData.sharesInTrust === "yes" && (
                        <div className="space-y-2">
                          <Label htmlFor="trustName">Name of Trust *</Label>
                          <Input
                            id="trustName"
                            placeholder="Enter trust name"
                            value={formData.trustName}
                            onChange={(e) =>
                              updateFormData("trustName", e.target.value)
                            }
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Corporate Subscriber Details */}
              {formData.subscriberType === "corporation" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5 text-blue-600" />
                        Required Documents
                      </CardTitle>
                      <CardDescription>
                        Upload authorization documents and passport copies
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Power of Attorney or Board Resolution *</Label>
                        <FileUpload
                          id="corporateAuthDocs"
                          label=""
                          description="Upload notarized power of attorney or board resolution"
                          required={true}
                          accept=".pdf,.doc,.docx"
                          onFileChange={(files) =>
                            updateFormData("corporateAuthDocs", files)
                          }
                        />
                      </div>

                      <div>
                        <Label>Authorized Person&apos;s Passport/ID *</Label>
                        <FileUpload
                          id="corporatePassportDocs"
                          label=""
                          description="Upload notarized passport/ID of authorized person"
                          required={true}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onFileChange={(files) =>
                            updateFormData("corporatePassportDocs", files)
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Corporate Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="corporateName">
                            Full Corporate Name *
                          </Label>
                          <Input
                            id="corporateName"
                            placeholder="Enter corporate name"
                            value={formData.corporateName}
                            onChange={(e) =>
                              updateFormData("corporateName", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="corporateCountry">
                            Country of Incorporation *
                          </Label>
                          <Input
                            id="corporateCountry"
                            placeholder="Enter country"
                            value={formData.corporateCountry}
                            onChange={(e) =>
                              updateFormData("corporateCountry", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="corporateWebsite">
                            Website Address *
                          </Label>
                          <Input
                            id="corporateWebsite"
                            type="url"
                            placeholder="https://www.example.com"
                            value={formData.corporateWebsite}
                            onChange={(e) =>
                              updateFormData("corporateWebsite", e.target.value)
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Authorization Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="corporateAddress">
                            Registered Office Address *
                          </Label>
                          <Textarea
                            id="corporateAddress"
                            placeholder="Enter registered office address"
                            value={formData.corporateAddress}
                            onChange={(e) =>
                              updateFormData("corporateAddress", e.target.value)
                            }
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="corporateAuthorizedPerson">
                            Authorized Person&apos;s Name *
                          </Label>
                          <Input
                            id="corporateAuthorizedPerson"
                            placeholder="Enter authorized person's full name"
                            value={formData.corporateAuthorizedPerson}
                            onChange={(e) =>
                              updateFormData(
                                "corporateAuthorizedPerson",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="corporateShares">
                            Number of Shares *
                          </Label>
                          <Input
                            id="corporateShares"
                            type="number"
                            placeholder="Enter number of shares"
                            value={formData.corporateShares}
                            onChange={(e) =>
                              updateFormData("corporateShares", e.target.value)
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Directors Section */}
          <section id="directors" className="scroll-mt-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Directors & Company Details
              </h2>
              <p className="text-gray-600">
                Information about company directors and additional details
              </p>
            </div>

            <div className="space-y-8">
              {/* Director Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-blue-600" />
                    Director Documents
                  </CardTitle>
                  <CardDescription>
                    Upload notarized passport/ID and proof of address for all
                    directors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    id="directorDocs"
                    label="Documents"
                    description="Upload documents for all directors (passport/ID and proof of address)"
                    required={true}
                    multiple={true}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onFileChange={(files) =>
                      updateFormData("directorDocs", files)
                    }
                  />
                </CardContent>
              </Card>

              {/* Directors Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Directors Information
                  </CardTitle>
                  <CardDescription>
                    Add information for each director
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {formData.directors.map((director, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Director {index + 1}</h4>
                        {formData.directors.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeDirector(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Full Name *</Label>
                          <Input
                            placeholder="Enter full name"
                            value={director.name}
                            onChange={(e) =>
                              updateDirector(index, "name", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Nationality *</Label>
                          <Input
                            placeholder="Enter nationality"
                            value={director.nationality}
                            onChange={(e) =>
                              updateDirector(
                                index,
                                "nationality",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Date of Birth *</Label>
                          <Input
                            type="date"
                            value={director.dob}
                            onChange={(e) =>
                              updateDirector(index, "dob", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Occupation *</Label>
                          <Input
                            placeholder="Enter occupation"
                            value={director.occupation}
                            onChange={(e) =>
                              updateDirector(
                                index,
                                "occupation",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Passport/ID Number or FIN *</Label>
                          <Input
                            placeholder="Enter passport/ID number or FIN"
                            value={director.passport}
                            onChange={(e) =>
                              updateDirector(index, "passport", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Phone Number *</Label>
                          <Input
                            placeholder="Enter phone number"
                            value={director.phone}
                            onChange={(e) =>
                              updateDirector(index, "phone", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Email Address *</Label>
                          <Input
                            type="email"
                            placeholder="Enter email address"
                            value={director.email}
                            onChange={(e) =>
                              updateDirector(index, "email", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Residential Address *</Label>
                        <Textarea
                          placeholder="Enter full residential address"
                          value={director.address}
                          onChange={(e) =>
                            updateDirector(index, "address", e.target.value)
                          }
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addDirector}
                    className="w-full border-dashed bg-transparent"
                  >
                    Add Another Director
                  </Button>
                </CardContent>
              </Card>

              {/* Additional Company Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Registered Office</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label htmlFor="registeredOffice">
                      Registered Office Address *
                    </Label>
                    <Textarea
                      id="registeredOffice"
                      placeholder="Enter registered office address"
                      value={formData.registeredOffice}
                      onChange={(e) =>
                        updateFormData("registeredOffice", e.target.value)
                      }
                      rows={3}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Financial Year</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label htmlFor="financialYearEnd">
                      Financial Year End *
                    </Label>
                    <Input
                      id="financialYearEnd"
                      type="date"
                      value={formData.financialYearEnd}
                      onChange={(e) =>
                        updateFormData("financialYearEnd", e.target.value)
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Applicant Information Section */}
          <section id="applicant" className="scroll-mt-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Applicant Information
              </h2>
              <p className="text-gray-600">
                Information about the application submitter
              </p>
            </div>

            <div className="space-y-8">
              {/* Applicant Type Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Applicant Type</CardTitle>
                  <CardDescription>
                    Who is submitting this application?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.applicantType}
                    onValueChange={(value) =>
                      updateFormData(
                        "applicantType",
                        value as "company" | "individual"
                      )
                    }
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem
                        value="individual"
                        id="applicant-individual"
                      />
                      <div className="flex items-center gap-3">
                        <User className="h-6 w-6 text-blue-600" />
                        <div>
                          <Label
                            htmlFor="applicant-individual"
                            className="cursor-pointer font-medium"
                          >
                            Individual
                          </Label>
                          <p className="text-sm text-gray-600">
                            Personal applicant
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="company" id="applicant-company" />
                      <div className="flex items-center gap-3">
                        <Building2 className="h-6 w-6 text-green-600" />
                        <div>
                          <Label
                            htmlFor="applicant-company"
                            className="cursor-pointer font-medium"
                          >
                            Company
                          </Label>
                          <p className="text-sm text-gray-600">
                            Corporate applicant
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Individual Applicant Details */}
              {formData.applicantType === "individual" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5 text-blue-600" />
                        Required Documents
                      </CardTitle>
                      <CardDescription>
                        Upload passport/ID and proof of address (notarized or
                        certified copies)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FileUpload
                        id="applicantDocs"
                        label="Documents"
                        description="Upload (1) passport/identity card and (2) proof of residential address"
                        required={true}
                        multiple={true}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onFileChange={(files) =>
                          updateFormData("applicantDocs", files)
                        }
                      />
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="applicantName">Full Name *</Label>
                          <Input
                            id="applicantName"
                            placeholder="Enter full name"
                            value={formData.applicantName}
                            onChange={(e) =>
                              updateFormData("applicantName", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="applicantCapacity">
                            Capacity/Role *
                          </Label>
                          <Input
                            id="applicantCapacity"
                            placeholder="e.g., Director, Authorized Representative"
                            value={formData.applicantCapacity}
                            onChange={(e) =>
                              updateFormData(
                                "applicantCapacity",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="applicantID">
                            ID/Passport Number *
                          </Label>
                          <Input
                            id="applicantID"
                            placeholder="Enter ID or passport number"
                            value={formData.applicantID}
                            onChange={(e) =>
                              updateFormData("applicantID", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="applicantDOB">Date of Birth *</Label>
                          <Input
                            id="applicantDOB"
                            type="date"
                            value={formData.applicantDOB}
                            onChange={(e) =>
                              updateFormData("applicantDOB", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="applicantGender">Gender *</Label>
                          <RadioGroup
                            value={formData.applicantGender}
                            onValueChange={(value) =>
                              updateFormData("applicantGender", value)
                            }
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="gender-male" />
                              <Label htmlFor="gender-male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="female"
                                id="gender-female"
                              />
                              <Label htmlFor="gender-female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="gender-other" />
                              <Label htmlFor="gender-other">Other</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Contact & Background</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="applicantAddress">
                            Residential Address *
                          </Label>
                          <Textarea
                            id="applicantAddress"
                            placeholder="Enter full residential address"
                            value={formData.applicantAddress}
                            onChange={(e) =>
                              updateFormData("applicantAddress", e.target.value)
                            }
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="applicantNationality">
                            Nationality *
                          </Label>
                          <Input
                            id="applicantNationality"
                            placeholder="Enter nationality"
                            value={formData.applicantNationality}
                            onChange={(e) =>
                              updateFormData(
                                "applicantNationality",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="applicantOccupation">
                            Occupation *
                          </Label>
                          <Input
                            id="applicantOccupation"
                            placeholder="Enter occupation"
                            value={formData.applicantOccupation}
                            onChange={(e) =>
                              updateFormData(
                                "applicantOccupation",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="applicantPhone">Phone Number *</Label>
                          <Input
                            id="applicantPhone"
                            placeholder="Enter phone number"
                            value={formData.applicantPhone}
                            onChange={(e) =>
                              updateFormData("applicantPhone", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="applicantEmail">
                            Email Address *
                          </Label>
                          <Input
                            id="applicantEmail"
                            type="email"
                            placeholder="Enter email address"
                            value={formData.applicantEmail}
                            onChange={(e) =>
                              updateFormData("applicantEmail", e.target.value)
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Source of Funds</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Label htmlFor="applicantFundsSource">
                          Source of Funds *
                        </Label>
                        <Textarea
                          id="applicantFundsSource"
                          placeholder="Describe the source of funds for this investment"
                          value={formData.applicantFundsSource}
                          onChange={(e) =>
                            updateFormData(
                              "applicantFundsSource",
                              e.target.value
                            )
                          }
                          rows={3}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Business Purpose</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Label htmlFor="applicantBusinessPurpose">
                          Purpose of Business Relationship *
                        </Label>
                        <Textarea
                          id="applicantBusinessPurpose"
                          placeholder="Describe the purpose of the business relationship"
                          value={formData.applicantBusinessPurpose}
                          onChange={(e) =>
                            updateFormData(
                              "applicantBusinessPurpose",
                              e.target.value
                            )
                          }
                          rows={3}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Company Applicant Details */}
              {formData.applicantType === "company" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5 text-blue-600" />
                        Required Documents
                      </CardTitle>
                      <CardDescription>
                        Upload company registration and authorization documents
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FileUpload
                        id="companyDocs"
                        label="Documents"
                        description="Upload company registration certificate, memorandum & articles, and board resolution"
                        required={true}
                        multiple={true}
                        accept=".pdf,.doc,.docx"
                        onFileChange={(files) =>
                          updateFormData("companyDocs", files)
                        }
                      />
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Company Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">
                            Full Company Name *
                          </Label>
                          <Input
                            id="companyName"
                            placeholder="Enter full company name"
                            value={formData.companyName}
                            onChange={(e) =>
                              updateFormData("companyName", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyUEN">
                            UEN/Registration Number *
                          </Label>
                          <Input
                            id="companyUEN"
                            placeholder="Enter UEN or registration number"
                            value={formData.companyUEN}
                            onChange={(e) =>
                              updateFormData("companyUEN", e.target.value)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyIncorporationPlace">
                            Place of Incorporation *
                          </Label>
                          <Input
                            id="companyIncorporationPlace"
                            placeholder="Enter place of incorporation"
                            value={formData.companyIncorporationPlace}
                            onChange={(e) =>
                              updateFormData(
                                "companyIncorporationPlace",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyIncorporationDate">
                            Date of Incorporation *
                          </Label>
                          <Input
                            id="companyIncorporationDate"
                            type="date"
                            value={formData.companyIncorporationDate}
                            onChange={(e) =>
                              updateFormData(
                                "companyIncorporationDate",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyAddresses">
                            Registered Office Address *
                          </Label>
                          <Textarea
                            id="companyAddresses"
                            placeholder="Enter registered office address"
                            value={formData.companyAddresses}
                            onChange={(e) =>
                              updateFormData("companyAddresses", e.target.value)
                            }
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyContactNumber">
                            Contact Number *
                          </Label>
                          <Input
                            id="companyContactNumber"
                            placeholder="Enter contact number"
                            value={formData.companyContactNumber}
                            onChange={(e) =>
                              updateFormData(
                                "companyContactNumber",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyEmailAddress">
                            Email Address *
                          </Label>
                          <Input
                            id="companyEmailAddress"
                            type="email"
                            placeholder="Enter email address"
                            value={formData.companyEmailAddress}
                            onChange={(e) =>
                              updateFormData(
                                "companyEmailAddress",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyWebsiteAddress">
                            Website Address
                          </Label>
                          <Input
                            id="companyWebsiteAddress"
                            type="url"
                            placeholder="https://www.example.com"
                            value={formData.companyWebsiteAddress}
                            onChange={(e) =>
                              updateFormData(
                                "companyWebsiteAddress",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Business Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyBusinessNature">
                            Nature of Business *
                          </Label>
                          <Textarea
                            id="companyBusinessNature"
                            placeholder="Describe the nature and purpose of business"
                            value={formData.companyBusinessNature}
                            onChange={(e) =>
                              updateFormData(
                                "companyBusinessNature",
                                e.target.value
                              )
                            }
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyTransactionCountries">
                            Countries of Transaction *
                          </Label>
                          <Textarea
                            id="companyTransactionCountries"
                            placeholder="List countries where transactions will occur"
                            value={formData.companyTransactionCountries}
                            onChange={(e) =>
                              updateFormData(
                                "companyTransactionCountries",
                                e.target.value
                              )
                            }
                            rows={2}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Financial Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyFundsSource">
                            Source of Funds *
                          </Label>
                          <Textarea
                            id="companyFundsSource"
                            placeholder="Describe the source of funds"
                            value={formData.companyFundsSource}
                            onChange={(e) =>
                              updateFormData(
                                "companyFundsSource",
                                e.target.value
                              )
                            }
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyConnectedParties">
                            Connected Parties
                          </Label>
                          <Textarea
                            id="companyConnectedParties"
                            placeholder="List any connected parties or related companies"
                            value={formData.companyConnectedParties}
                            onChange={(e) =>
                              updateFormData(
                                "companyConnectedParties",
                                e.target.value
                              )
                            }
                            rows={2}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Business Relationship</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Label htmlFor="companyBusinessRelationship">
                        Purpose of Business Relationship *
                      </Label>
                      <Textarea
                        id="companyBusinessRelationship"
                        placeholder="Describe the purpose of the business relationship with GMC"
                        value={formData.companyBusinessRelationship}
                        onChange={(e) =>
                          updateFormData(
                            "companyBusinessRelationship",
                            e.target.value
                          )
                        }
                        rows={3}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </section>

          {/* Beneficial Owners Section */}
          <section id="beneficial-owners" className="scroll-mt-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Beneficial Owners
              </h2>
              <p className="text-gray-600">
                Information about beneficial ownership (25% or more ownership)
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Beneficial Owner Type</CardTitle>
                  <CardDescription>
                    Are there any beneficial owners with 25% or more
                    ownership/control?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.beneficialOwnerType}
                    onValueChange={(value) =>
                      updateFormData(
                        "beneficialOwnerType",
                        value as "individual" | "corporation" | "none"
                      )
                    }
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="individual" id="bo-individual" />
                      <div className="flex items-center gap-3">
                        <User className="h-6 w-6 text-blue-600" />
                        <div>
                          <Label
                            htmlFor="bo-individual"
                            className="cursor-pointer font-medium"
                          >
                            Individual
                          </Label>
                          <p className="text-sm text-gray-600">
                            Person with beneficial ownership
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="corporation" id="bo-corporation" />
                      <div className="flex items-center gap-3">
                        <Building2 className="h-6 w-6 text-green-600" />
                        <div>
                          <Label
                            htmlFor="bo-corporation"
                            className="cursor-pointer font-medium"
                          >
                            Corporation
                          </Label>
                          <p className="text-sm text-gray-600">
                            Corporate beneficial owner
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="none" id="bo-none" />
                      <div className="flex items-center gap-3">
                        <Shield className="h-6 w-6 text-gray-600" />
                        <div>
                          <Label
                            htmlFor="bo-none"
                            className="cursor-pointer font-medium"
                          >
                            None
                          </Label>
                          <p className="text-sm text-gray-600">
                            No beneficial owners above 25%
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {formData.beneficialOwnerType &&
                formData.beneficialOwnerType !== "none" && (
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Note:</strong> Detailed beneficial owner
                      information will be collected separately as per regulatory
                      requirements. Please ensure you have all necessary
                      documentation ready.
                    </AlertDescription>
                  </Alert>
                )}

              {formData.beneficialOwnerType === "none" && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Confirmed:</strong> No beneficial owners with 25% or
                    more ownership/control.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </section>

          {/* PEP Information Section */}
          <section id="pep" className="scroll-mt-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                PEP Information
              </h2>
              <p className="text-gray-600">
                Politically Exposed Person information
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-purple-600" />
                    PEP Status Declaration
                  </CardTitle>
                  <CardDescription>
                    Are you, any director, subscriber, or beneficial owner a
                    Politically Exposed Person (PEP) or related to a PEP?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.isPEP}
                    onValueChange={(value) => updateFormData("isPEP", value)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="yes" id="pep-yes" />
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                        <div>
                          <Label
                            htmlFor="pep-yes"
                            className="cursor-pointer font-medium"
                          >
                            Yes
                          </Label>
                          <p className="text-sm text-gray-600">
                            PEP status applies
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="no" id="pep-no" />
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        <div>
                          <Label
                            htmlFor="pep-no"
                            className="cursor-pointer font-medium"
                          >
                            No
                          </Label>
                          <p className="text-sm text-gray-600">No PEP status</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {formData.isPEP === "yes" && (
                <Card>
                  <CardHeader>
                    <CardTitle>PEP Details Required</CardTitle>
                    <CardDescription>
                      Additional information will be required for PEP status
                      verification
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="border-amber-200 bg-amber-50">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-800">
                        <strong>Additional Documentation Required:</strong>
                        <ul className="mt-2 list-disc list-inside space-y-1">
                          <li>Detailed PEP declaration form</li>
                          <li>Source of wealth documentation</li>
                          <li>Enhanced due diligence documents</li>
                          <li>
                            Relationship details (if family member/close
                            associate of PEP)
                          </li>
                        </ul>
                        <p className="mt-3">
                          Our compliance team will contact you separately to
                          collect this information.
                        </p>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}

              {formData.isPEP === "no" && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Confirmed:</strong> No PEP status declared for any
                    parties involved in this application.
                  </AlertDescription>
                </Alert>
              )}

              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">
                    What is a PEP?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-blue-700 space-y-2">
                  <p>A Politically Exposed Person (PEP) includes:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Current or former senior government officials</li>
                    <li>Senior executives of state-owned corporations</li>
                    <li>Important political party officials</li>
                    <li>Senior judicial or military officials</li>
                    <li>Family members or close associates of the above</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Declaration Section */}
          <section id="declaration" className="scroll-mt-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Declaration
              </h2>
              <p className="text-gray-600">Final declaration and signature</p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Declarant Information
                  </CardTitle>
                  <CardDescription>
                    Information about the person making this declaration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="declarantName">
                        Full Name of Declarant *
                      </Label>
                      <Input
                        id="declarantName"
                        placeholder="Enter full name of person making declaration"
                        value={formData.declarantName}
                        onChange={(e) =>
                          updateFormData("declarantName", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="declarantID">ID/Passport Number *</Label>
                      <Input
                        id="declarantID"
                        placeholder="Enter ID or passport number"
                        value={formData.declarantID}
                        onChange={(e) =>
                          updateFormData("declarantID", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Declaration Statement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <div className="space-y-4 text-sm text-gray-700">
                      <p className="font-medium text-gray-900">
                        I hereby declare that:
                      </p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>
                          All information provided in this application is true,
                          complete, and accurate to the best of my knowledge.
                        </li>
                        <li>
                          I understand that providing false or misleading
                          information may result in rejection of this
                          application or cancellation of registration.
                        </li>
                        <li>
                          I authorize GMCA to verify the information provided
                          and to contact relevant parties for verification
                          purposes.
                        </li>
                        <li>
                          I understand that additional documentation may be
                          required during the review process.
                        </li>
                        <li>
                          I agree to notify GMCA immediately of any material
                          changes to the information provided.
                        </li>
                        <li>
                          I understand that this application does not guarantee
                          approval of company registration.
                        </li>
                        <li>
                          I have read and understood the terms and conditions of
                          company registration in GMC.
                        </li>
                        <li>
                          I consent to the collection, use, and disclosure of
                          personal data as outlined in the privacy policy.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="declaration"
                      checked={formData.declaration}
                      onChange={(e) =>
                        updateFormData("declaration", e.target.checked)
                      }
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label
                      htmlFor="declaration"
                      className="text-sm cursor-pointer"
                    >
                      <span className="font-medium text-red-600">*</span> I
                      acknowledge that I have read, understood, and agree to all
                      the statements in this declaration. By checking this box,
                      I am providing my electronic signature to this
                      application.
                    </Label>
                  </div>

                  {formData.declaration && (
                    <Alert className="mt-4 border-green-200 bg-green-50">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        <strong>Declaration Accepted:</strong> Your electronic
                        signature has been recorded.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Special Services Section */}
          <section id="special-services" className="scroll-mt-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Special Services
              </h2>
              <p className="text-gray-600">
                Optional special UEN and additional services
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    Special UEN Request
                  </CardTitle>
                  <CardDescription>
                    Would you like to request a special/customized UEN for your
                    company?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.wantsSpecialUEN}
                    onValueChange={(value) =>
                      updateFormData("wantsSpecialUEN", value)
                    }
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="yes" id="special-uen-yes" />
                      <div className="flex items-center gap-3">
                        <Star className="h-6 w-6 text-yellow-600" />
                        <div>
                          <Label
                            htmlFor="special-uen-yes"
                            className="cursor-pointer font-medium"
                          >
                            Yes, I want a special UEN
                          </Label>
                          <p className="text-sm text-gray-600">
                            Customized UEN (additional fees apply)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="no" id="special-uen-no" />
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        <div>
                          <Label
                            htmlFor="special-uen-no"
                            className="cursor-pointer font-medium"
                          >
                            No, standard UEN is fine
                          </Label>
                          <p className="text-sm text-gray-600">
                            System-generated UEN
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  {formData.wantsSpecialUEN === "yes" && (
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="specialUEN">
                          Preferred Special UEN *
                        </Label>
                        <Input
                          id="specialUEN"
                          placeholder="Enter your preferred UEN (subject to availability)"
                          value={formData.specialUEN}
                          onChange={(e) =>
                            updateFormData("specialUEN", e.target.value)
                          }
                        />
                        <p className="text-xs text-gray-600">
                          Note: Special UEN requests are subject to availability
                          and additional fees. GMCA will confirm availability
                          during processing.
                        </p>
                      </div>

                      <Alert className="border-amber-200 bg-amber-50">
                        <Info className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-amber-800">
                          <strong>Special UEN Service:</strong>
                          <ul className="mt-2 list-disc list-inside space-y-1">
                            <li>Additional processing fee applies</li>
                            <li>Subject to availability and approval</li>
                            <li>May extend processing time</li>
                            <li>
                              Alternative options will be provided if requested
                              UEN is unavailable
                            </li>
                          </ul>
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Bank Account Section */}
          <section id="bank-account" className="scroll-mt-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Bank Account Opening
              </h2>
              <p className="text-gray-600">
                Optional corporate bank account setup assistance
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Bank Account Assistance
                  </CardTitle>
                  <CardDescription>
                    Would you like assistance with opening a corporate bank
                    account?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.wantsBankAccount}
                    onValueChange={(value) =>
                      updateFormData("wantsBankAccount", value)
                    }
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="yes" id="bank-account-yes" />
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-6 w-6 text-green-600" />
                        <div>
                          <Label
                            htmlFor="bank-account-yes"
                            className="cursor-pointer font-medium"
                          >
                            Yes, I need assistance
                          </Label>
                          <p className="text-sm text-gray-600">
                            Help with bank account opening
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="no" id="bank-account-no" />
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-gray-600" />
                        <div>
                          <Label
                            htmlFor="bank-account-no"
                            className="cursor-pointer font-medium"
                          >
                            No, I&apos;ll handle it myself
                          </Label>
                          <p className="text-sm text-gray-600">
                            Independent bank account setup
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  {formData.wantsBankAccount === "yes" && (
                    <div className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              Account Type
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <RadioGroup
                              value={formData.accountType}
                              onValueChange={(value) =>
                                updateFormData("accountType", value)
                              }
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                                <RadioGroupItem
                                  value="current"
                                  id="account-current"
                                />
                                <Label
                                  htmlFor="account-current"
                                  className="cursor-pointer"
                                >
                                  Current Account (Business operations)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                                <RadioGroupItem
                                  value="savings"
                                  id="account-savings"
                                />
                                <Label
                                  htmlFor="account-savings"
                                  className="cursor-pointer"
                                >
                                  Savings Account (Capital preservation)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                                <RadioGroupItem
                                  value="both"
                                  id="account-both"
                                />
                                <Label
                                  htmlFor="account-both"
                                  className="cursor-pointer"
                                >
                                  Both Current & Savings
                                </Label>
                              </div>
                            </RadioGroup>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              Operation Mode
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <RadioGroup
                              value={formData.operationMode}
                              onValueChange={(value) =>
                                updateFormData("operationMode", value)
                              }
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                                <RadioGroupItem
                                  value="single"
                                  id="operation-single"
                                />
                                <Label
                                  htmlFor="operation-single"
                                  className="cursor-pointer"
                                >
                                  Single Signatory
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                                <RadioGroupItem
                                  value="joint"
                                  id="operation-joint"
                                />
                                <Label
                                  htmlFor="operation-joint"
                                  className="cursor-pointer"
                                >
                                  Joint Signatories (Any two to sign)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                                <RadioGroupItem
                                  value="all"
                                  id="operation-all"
                                />
                                <Label
                                  htmlFor="operation-all"
                                  className="cursor-pointer"
                                >
                                  All Signatories Required
                                </Label>
                              </div>
                            </RadioGroup>
                          </CardContent>
                        </Card>
                      </div>

                      <Alert className="border-blue-200 bg-blue-50">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          <strong>Bank Account Opening Service:</strong>
                          <ul className="mt-2 list-disc list-inside space-y-1">
                            <li>
                              We will facilitate introductions to partner banks
                            </li>
                            <li>Assistance with documentation requirements</li>
                            <li>Guidance on minimum deposit requirements</li>
                            <li>
                              Support throughout the account opening process
                            </li>
                            <li>Additional service fees may apply</li>
                          </ul>
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Feedback Section */}
          <section id="feedback" className="scroll-mt-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Feedback
              </h2>
              <p className="text-gray-600">
                Help us improve the registration process
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    Rate Your Experience
                  </CardTitle>
                  <CardDescription>
                    How would you rate your experience with this registration
                    form?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center gap-2 py-4">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() =>
                          updateFormData("experienceRating", rating)
                        }
                        className={`p-2 rounded-full transition-colors ${
                          formData.experienceRating >= rating
                            ? "text-yellow-500 hover:text-yellow-600"
                            : "text-gray-300 hover:text-gray-400"
                        }`}
                      >
                        <Star
                          className={`h-8 w-8 ${
                            formData.experienceRating >= rating
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {formData.experienceRating > 0 && (
                    <p className="text-center text-sm text-gray-600">
                      You rated: {formData.experienceRating} star
                      {formData.experienceRating !== 1 ? "s" : ""}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Additional Comments
                  </CardTitle>
                  <CardDescription>
                    Please share any suggestions, issues, or comments about the
                    registration process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Your feedback helps us improve our services. Please share your thoughts, suggestions, or any issues you encountered during the registration process..."
                    value={formData.feedback}
                    onChange={(e) => updateFormData("feedback", e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    This feedback is optional but greatly appreciated. Your
                    comments will be reviewed by our team to enhance the user
                    experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800">Thank You!</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-green-700">
                  <p>
                    Thank you for taking the time to complete this comprehensive
                    registration form. Your application will be reviewed by our
                    team, and we will contact you within 5-7 business days with
                    updates on your company registration status.
                  </p>
                  <p className="mt-3">
                    If you have any urgent questions, please contact our support
                    team at{" "}
                    <a
                      href="mailto:support@gmc.bt"
                      className="underline font-medium"
                    >
                      support@gmc.bt
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
