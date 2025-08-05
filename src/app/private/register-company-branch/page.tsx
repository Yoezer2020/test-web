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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Building2,
  User,
  Shield,
  CheckCircle2,
  AlertCircle,
  Info,
  FileText,
  UserCheck,
  MapPin,
  MessageSquare,
  ArrowLeft,
  Save,
  Users,
  Building,
  Globe,
  Calendar,
  Plus,
  Trash2,
  Briefcase,
  Scale,
  DollarSign,
  Home,
  Award,
  CheckCircle,
  Upload,
  FileCheck,
  CreditCard,
  Star,
} from "lucide-react";
import Link from "next/link";
import { FileUpload } from "@/components/inputs/single-file-upload/file-upload-single";

interface Director {
  fullName: string;
  residentialAddress: string;
  identificationNumber: string;
  identificationType: string;
  nationality: string;
  dateOfAppointment: string;
  documents: File[];
}

interface AuthorizedRepresentative {
  fullName: string;
  identificationType: string;
  nationality: string;
  passportNumber: string;
  contactNumber: string;
  emailAddress: string;
  residentialAddress: string;
}

interface FormData {
  // Section 3: Name Application
  companyType: string;
  foreignCompanyName: string;
  proposedNames: string[];
  isTrademarkName: string;
  consentLetter: File[];
  // Section 4: Information on FC/GC Part I
  principalActivities: string;
  countryOfIncorporation: string;
  dateOfIncorporation: string;
  legalForm: string;
  registeredCountries: string;
  hasShareCapital: string;
  registeredOfficeAddress: string;
  certificateNumber: string;
  certifyingAuthority: string;
  certificationDate: string;
  incorporationDocuments: File[];
  // Section 5: Information on FC/GC Part II
  constitutiveDocumentType: string;
  charterCertifyingAuthority: string;
  charterCertificationDate: string;
  constitutiveDocuments: File[];
  directorsBeneficiaryDocs: File[];
  // Section 6: Information on FC/GC Part III
  financialYearEnd: string;
  // Section 7: Details of Authorised Representatives
  consentStatement: File[];
  representativePassports: File[];
  // Section 8 & 9: Authorised Representatives
  authorizedRepresentatives: AuthorizedRepresentative[];
  hasAdditionalRepresentative: string;
  // Section 10: Directors
  directors: Director[];
  // Section 11-13: Registered Office
  hasRegisteredOffice: string;
  registeredOfficeAddressGMC: string;
  workingDays: string;
  workingHours: string;
  emailForCommunications: string;
  // Section 14: Declaration
  declarantName: string;
  declarantIdNumber: string;
  declarantDesignation: string;
  declaration: boolean;
  // Section 15: Feedback
  experienceRating: number;
  feedback: string;
}

const SECTIONS = [
  { id: "introduction", name: "Introduction", icon: Info },
  { id: "name-application", name: "Name Application", icon: Building2 },
  { id: "fc-gc-info-1", name: "FC/GC Information I", icon: Globe },
  { id: "fc-gc-info-2", name: "FC/GC Information II", icon: FileText },
  { id: "fc-gc-info-3", name: "FC/GC Information III", icon: Calendar },
  {
    id: "authorized-reps",
    name: "Authorized Representatives",
    icon: UserCheck,
  },
  { id: "rep-1", name: "Representative 1", icon: User },
  { id: "rep-2", name: "Representative 2", icon: User },
  { id: "directors", name: "Directors", icon: Users },
  { id: "registered-office", name: "Registered Office", icon: MapPin },
  { id: "declaration", name: "Declaration", icon: Shield },
  { id: "feedback", name: "Feedback", icon: MessageSquare },
];

const createEmptyDirector = (): Director => ({
  fullName: "",
  residentialAddress: "",
  identificationNumber: "",
  identificationType: "",
  nationality: "",
  dateOfAppointment: "",
  documents: [],
});

const createEmptyAuthorizedRepresentative = (): AuthorizedRepresentative => ({
  fullName: "",
  identificationType: "",
  nationality: "",
  passportNumber: "",
  contactNumber: "",
  emailAddress: "",
  residentialAddress: "",
});

export default function BranchRegistrationPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    // Name Application
    companyType: "",
    foreignCompanyName: "",
    proposedNames: ["", ""],
    isTrademarkName: "",
    consentLetter: [],
    // FC/GC Information Part I
    principalActivities: "",
    countryOfIncorporation: "",
    dateOfIncorporation: "",
    legalForm: "",
    registeredCountries: "",
    hasShareCapital: "",
    registeredOfficeAddress: "",
    certificateNumber: "",
    certifyingAuthority: "",
    certificationDate: "",
    incorporationDocuments: [],
    // FC/GC Information Part II
    constitutiveDocumentType: "",
    charterCertifyingAuthority: "",
    charterCertificationDate: "",
    constitutiveDocuments: [],
    directorsBeneficiaryDocs: [],
    // FC/GC Information Part III
    financialYearEnd: "",
    // Authorized Representatives
    consentStatement: [],
    representativePassports: [],
    authorizedRepresentatives: [createEmptyAuthorizedRepresentative()],
    hasAdditionalRepresentative: "",
    // Directors
    directors: [createEmptyDirector()],
    // Registered Office
    hasRegisteredOffice: "",
    registeredOfficeAddressGMC: "",
    workingDays: "",
    workingHours: "",
    emailForCommunications: "",
    // Declaration
    declarantName: "",
    declarantIdNumber: "",
    declarantDesignation: "",
    declaration: false,
    // Feedback
    experienceRating: 0,
    feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(
        "gmc-branch-registration-draft",
        JSON.stringify(formData)
      );
      setLastSaved(new Date());
    }, 2000);
    return () => clearTimeout(timer);
  }, [formData]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("gmc-branch-registration-draft");
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
    setFormData((prev: FormData) => ({
      ...prev,
      [field]: value,
      ...(field === "hasAdditionalRepresentative" && value === "no"
        ? { authorizedRepresentatives: [prev.authorizedRepresentatives[0]] }
        : {}),
      ...(field === "hasAdditionalRepresentative" &&
      value === "yes" &&
      prev.authorizedRepresentatives.length === 1
        ? {
            authorizedRepresentatives: [
              ...prev.authorizedRepresentatives,
              createEmptyAuthorizedRepresentative(),
            ],
          }
        : {}),
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const updateAuthorizedRepresentative = <
    K extends keyof AuthorizedRepresentative
  >(
    index: number,
    field: K,
    value: AuthorizedRepresentative[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      authorizedRepresentatives: prev.authorizedRepresentatives.map((rep, i) =>
        i === index ? { ...rep, [field]: value } : rep
      ),
    }));
  };

  const updateDirector = <K extends keyof Director>(
    index: number,
    field: K,
    value: Director[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      directors: prev.directors.map((director, i) =>
        i === index ? { ...director, [field]: value } : director
      ),
    }));
  };

  const addDirector = () => {
    setFormData((prev) => ({
      ...prev,
      directors: [...prev.directors, createEmptyDirector()],
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

  const handleSubmitClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Branch registration form submitted:", formData);
      localStorage.removeItem("gmc-branch-registration-draft");
      // Redirect to success page or dashboard
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-xl border-r border-gray-200 fixed h-full overflow-y-auto hidden sm:block">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r ">
            <Link
              href="/private/user-dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-xl font-bold text-gray-900">
              GMC Branch Registration
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Register a branch of your company in GMC
            </p>
            {lastSaved && (
              <div className="flex items-center gap-2 mt-3 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
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
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200 shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          isActive ? "text-blue-600" : "text-gray-400"
                        }`}
                      />
                      <span className="text-sm font-medium">
                        {section.name}
                      </span>
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
              onClick={handleSubmitClick}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
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
        <div className="flex-1 sm:ml-80">
          <div className="max-w-4xl mx-auto p-8 space-y-12">
            {/* Introduction Section */}
            <section id="introduction" className="scroll-mt-8">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Building className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Application Form for Registration of a Branch of a Company in
                  Gelephu Mindfulness City (GMC)
                </h2>
              </div>
              <div className="space-y-6 mt-8">
                <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <Info className="h-5 w-5" />
                      Registration Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-blue-700 space-y-3">
                    <p>
                      A branch of a foreign company or a GMC-incorporated
                      company can be registered in the GMC through the
                      submission of this Application Form to the Gelephu
                      Corporate Registration Office (&ldquo;GCRO&ldquo;) and
                      upon receiving the approval in writing from the GCRO.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-800">
                      <AlertCircle className="h-5 w-5" />
                      Submitting an Application
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-amber-700">
                    <p>
                      Please do not submit this application form before first
                      having contacted the GCRO for a preliminary discussion.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-800">
                      <Shield className="h-5 w-5" />
                      Data Protection Notice
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-amber-800 space-y-3">
                    <p>
                      We may collect, use and/or disclose personal data for the
                      purposes of providing services to you and/or in the
                      ordinary course of our work. We may disclose such personal
                      data to our affiliated entities, third party service
                      providers and agents, other professional advisors and
                      consultants with whom we are dealing on your behalf, and
                      any necessary governmental authorities. Details about how
                      we process personal data are set out in our personal data
                      protection policy (as updated from time to time), a copy
                      of which will be made available at https://gmc.bt/. Where
                      you provide us with any personal data of any third party,
                      we may collect, use and/or disclose the same on the
                      understanding that you have obtained all necessary
                      consents (as may be applicable) in accordance with the
                      laws of the GMC.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Name Application Section */}
            <section id="name-application" className="scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Name Application
                </h2>
                <p className="text-gray-600">
                  Information about the company and proposed branch name
                </p>
              </div>
              <div className="space-y-8">
                {/* Company Type */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      Company Type
                    </CardTitle>
                    <CardDescription>
                      Please state the type of Company seeking to register a
                      branch in GMC.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2">
                    <RadioGroup
                      value={formData.companyType}
                      onValueChange={(value) =>
                        updateFormData("companyType", value)
                      }
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <RadioGroupItem
                          value="foreign-company"
                          id="foreign-company"
                        />
                        <Label
                          htmlFor="foreign-company"
                          className="cursor-pointer font-medium"
                        >
                          Foreign Company
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <RadioGroupItem value="gmc-company" id="gmc-company" />
                        <Label
                          htmlFor="gmc-company"
                          className="cursor-pointer font-medium"
                        >
                          GMC Company
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Foreign Company Name */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-blue-600" />
                      Company Name
                    </CardTitle>
                    <CardDescription>
                      What is the name of the Foreign Company (FC) in place of
                      incorporation/registration or name of GMC Company (GC)
                      incorporated in GMC?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <Label
                      htmlFor="foreignCompanyName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Company Name *
                    </Label>
                    <Input
                      id="foreignCompanyName"
                      value={formData.foreignCompanyName}
                      onChange={(e) =>
                        updateFormData("foreignCompanyName", e.target.value)
                      }
                      placeholder="Enter the full legal name of your company"
                      className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                    />
                  </CardContent>
                </Card>

                {/* Proposed Names */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Proposed Branch Names
                    </CardTitle>
                    <CardDescription>
                      What is the proposed name of your company? Please provide
                      2 names.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 space-y-6">
                    <Alert className="border-blue-200 bg-blue-50">
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Note:</strong> The proposed name of the GMC
                        Branch must be identical to the name of the FC / GC (as
                        appropriate) as registered in the country of its
                        incorporation. You may also wish to add any of the
                        following suffixes to the proposed name:
                        <br />- (GMC Branch)
                        <br />- GMC Branch
                        <br />- Branch Office
                        <br />- Branch Office GMC
                        <br />
                        <br />
                        E.g. Wonderful Stars LLC (GMC Branch)
                        <br />
                        E.g. Wonderful Stars Pte Ltd (GMC Branch)
                      </AlertDescription>
                    </Alert>
                    {formData.proposedNames.map((name, index) => (
                      <div key={index} className="space-y-2">
                        <Label
                          htmlFor={`proposedName${index + 1}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          Proposed Name {index + 1} *
                        </Label>
                        <Input
                          id={`proposedName${index + 1}`}
                          placeholder={`Enter your ${
                            index === 0 ? "first" : "second"
                          } choice for branch name`}
                          value={name}
                          onChange={(e) => {
                            const newNames = [...formData.proposedNames];
                            newNames[index] = e.target.value;
                            updateFormData("proposedNames", newNames);
                          }}
                          className="border-2 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Trademark Question */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Trademark/Patent Information
                    </CardTitle>
                    <CardDescription>
                      Is the proposed company name the trademark/patent name of
                      a product or the name of a company elsewhere?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <RadioGroup
                      value={formData.isTrademarkName}
                      onValueChange={(value) =>
                        updateFormData("isTrademarkName", value)
                      }
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <RadioGroupItem value="yes" id="trademark-yes" />
                        <Label
                          htmlFor="trademark-yes"
                          className="cursor-pointer font-medium"
                        >
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <RadioGroupItem value="no" id="trademark-no" />
                        <Label
                          htmlFor="trademark-no"
                          className="cursor-pointer font-medium"
                        >
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                    {formData.isTrademarkName === "yes" && (
                      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <FileUpload
                          id="consentLetter"
                          label="Upload Letter of Consent from Owner"
                          description="If your answer was yes, please upload the letter of consent from the owner."
                          required={true}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          maxSize={10}
                          multiple={false}
                          onFileChange={(files) =>
                            updateFormData("consentLetter", files)
                          }
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* FC/GC Information Part I Section */}
            <section id="fc-gc-info-1" className="scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Information on FC/GC - Part I
                </h2>
                <p className="text-gray-600">FC/GC Incorporation Information</p>
              </div>
              <div className="space-y-8">
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                      Principal Activities
                    </CardTitle>
                    <CardDescription>
                      Please state the details of the principal activities of
                      the Branch. You may put up to 2 activities.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <Textarea
                      placeholder="Describe the main business activities that the branch will conduct in GMC..."
                      value={formData.principalActivities}
                      onChange={(e) =>
                        updateFormData("principalActivities", e.target.value)
                      }
                      className="min-h-[120px] border-2 focus:border-blue-500 rounded-xl"
                    />
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-lg border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-blue-600" />
                        Country of Incorporation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <Label
                        htmlFor="countryOfIncorporation"
                        className="text-sm font-medium text-gray-700"
                      >
                        Country/Region of Incorporation/Registration *
                      </Label>
                      <Input
                        id="countryOfIncorporation"
                        value={formData.countryOfIncorporation}
                        onChange={(e) =>
                          updateFormData(
                            "countryOfIncorporation",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Singapore, United States, etc."
                        className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                      />
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        Date of Incorporation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <Label
                        htmlFor="dateOfIncorporation"
                        className="text-sm font-medium text-gray-700"
                      >
                        Date of Incorporation/Registration *
                      </Label>
                      <Input
                        id="dateOfIncorporation"
                        type="date"
                        value={formData.dateOfIncorporation}
                        onChange={(e) =>
                          updateFormData("dateOfIncorporation", e.target.value)
                        }
                        className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                      />
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="h-5 w-5 text-blue-600" />
                      Legal Form
                    </CardTitle>
                    <CardDescription>
                      Please state the legal form/entity of the FC/GC (e.g. is
                      it a company, corporation, corporate society, corporate
                      association, other incorporated body or other
                      unincorporated society or association)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <Input
                      placeholder="e.g., Private Limited Company, Corporation, LLC, etc."
                      value={formData.legalForm}
                      onChange={(e) =>
                        updateFormData("legalForm", e.target.value)
                      }
                      className="border-2 focus:border-blue-500 rounded-xl"
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      Registered Countries
                    </CardTitle>
                    <CardDescription>
                      Please state the countries in which the FC/GC is
                      registered as a foreign company (if none, please type
                      &ldquo;NIL&ldquo;)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Textarea
                      placeholder="List all countries where your company is registered as a foreign entity, or type 'NIL' if none..."
                      value={formData.registeredCountries}
                      onChange={(e) =>
                        updateFormData("registeredCountries", e.target.value)
                      }
                      className="border-2 focus:border-blue-500 rounded-xl"
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      Share Capital
                    </CardTitle>
                    <CardDescription>
                      Does the foreign company have a share capital?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <RadioGroup
                      value={formData.hasShareCapital}
                      onValueChange={(value) =>
                        updateFormData("hasShareCapital", value)
                      }
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <RadioGroupItem value="yes" id="share-capital-yes" />
                        <Label
                          htmlFor="share-capital-yes"
                          className="cursor-pointer font-medium"
                        >
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <RadioGroupItem value="no" id="share-capital-no" />
                        <Label
                          htmlFor="share-capital-no"
                          className="cursor-pointer font-medium"
                        >
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-blue-600" />
                      Registered Office Address
                    </CardTitle>
                    <CardDescription>
                      Please state the registered office address of the FC/GC in
                      place of incorporation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <Textarea
                      placeholder="Enter the complete registered office address including street, city, state/province, postal code, and country..."
                      value={formData.registeredOfficeAddress}
                      onChange={(e) =>
                        updateFormData(
                          "registeredOfficeAddress",
                          e.target.value
                        )
                      }
                      className="border-2 focus:border-blue-500 rounded-xl"
                    />
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-lg border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-blue-600" />
                        Certificate Number
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <Label
                        htmlFor="certificateNumber"
                        className="text-sm font-medium text-gray-700"
                      >
                        Certificate/Registration Number *
                      </Label>
                      <Input
                        id="certificateNumber"
                        value={formData.certificateNumber}
                        onChange={(e) =>
                          updateFormData("certificateNumber", e.target.value)
                        }
                        placeholder="Enter certificate or registration number"
                        className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                      />
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        Certifying Authority
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <Label
                        htmlFor="certifyingAuthority"
                        className="text-sm font-medium text-gray-700"
                      >
                        Designation and Certifying Authority *
                      </Label>
                      <Input
                        id="certifyingAuthority"
                        value={formData.certifyingAuthority}
                        onChange={(e) =>
                          updateFormData("certifyingAuthority", e.target.value)
                        }
                        placeholder="Authority that certified the copies as true copies"
                        className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                      />
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Certification Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <Label
                      htmlFor="certificationDate"
                      className="text-sm font-medium text-gray-700"
                    >
                      Date Document was Certified True *
                    </Label>
                    <Input
                      id="certificationDate"
                      type="date"
                      value={formData.certificationDate}
                      onChange={(e) =>
                        updateFormData("certificationDate", e.target.value)
                      }
                      className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-blue-600" />
                      Incorporation Documents
                    </CardTitle>
                    <CardDescription>
                      Please upload: (1) a copy of the Certificate of
                      Incorporation or Registration of the FC / GC and/or (2) a
                      copy of the Certificate of Name Change or other evidence
                      of name change (if applicable)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <FileUpload
                      id="incorporationDocuments"
                      label="Upload Incorporation Documents"
                      description="If you are uploading a copy, please provide certified true copies by the Registrar of Companies or the equivalent officer at the place of incorporation. If the document(s) you are uploading is not in English language, please attach the corresponding translated version, in addition to the original document."
                      required={true}
                      accept=".pdf,.jpg,.jpeg,.png"
                      maxSize={10}
                      multiple={true}
                      onFileChange={(files) =>
                        updateFormData("incorporationDocuments", files)
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* FC/GC Information Part II Section */}
            <section id="fc-gc-info-2" className="scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Information on FC/GC - Part II
                </h2>
                <p className="text-gray-600">
                  Constitutive documents of FC / GC (Copy of Charter / Statute /
                  Memorandum and Articles / Other Constitutional Instruments)
                </p>
              </div>
              <div className="space-y-8">
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Constitutive Document Type
                    </CardTitle>
                    <CardDescription>
                      State the type of constitutive document of the FC /GC
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <Select
                      value={formData.constitutiveDocumentType}
                      onValueChange={(value) =>
                        updateFormData("constitutiveDocumentType", value)
                      }
                    >
                      <SelectTrigger className="border-2 focus:border-blue-500 rounded-xl">
                        <SelectValue placeholder="Select the type of constitutive document" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="charter">Charter</SelectItem>
                        <SelectItem value="statute">Statute</SelectItem>
                        <SelectItem value="memorandum-articles">
                          Memorandum and Articles
                        </SelectItem>
                        <SelectItem value="constitutional-instruments">
                          Other Constitutional Instruments
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-lg border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        Charter Certifying Authority
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <Label
                        htmlFor="charterCertifyingAuthority"
                        className="text-sm font-medium text-gray-700"
                      >
                        Designation and Certifying Authority who is certifying
                        true the copy of the Charter
                      </Label>
                      <Input
                        id="charterCertifyingAuthority"
                        value={formData.charterCertifyingAuthority}
                        onChange={(e) =>
                          updateFormData(
                            "charterCertifyingAuthority",
                            e.target.value
                          )
                        }
                        placeholder="Enter the certifying authority details"
                        className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                      />
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        Charter Certification Date
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <Label
                        htmlFor="charterCertificationDate"
                        className="text-sm font-medium text-gray-700"
                      >
                        Date on which the document was certified true
                      </Label>
                      <Input
                        id="charterCertificationDate"
                        type="date"
                        value={formData.charterCertificationDate}
                        onChange={(e) =>
                          updateFormData(
                            "charterCertificationDate",
                            e.target.value
                          )
                        }
                        className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                      />
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-blue-600" />
                      Constitutive Documents
                    </CardTitle>
                    <CardDescription>
                      Please upload the Certified Copy of Charter / Statute /
                      Memorandum and Articles / Other Constitutional
                      Instruments. Where applicable, please upload the latest
                      financial statements of the FC/GC, if required to be
                      prepared in place of incorporation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <FileUpload
                      id="constitutiveDocuments"
                      label="Upload Constitutive Documents"
                      description="If the document(s) you are uploading is not in English language, please attach the corresponding translated version, in addition to the original document."
                      required={true}
                      accept=".pdf,.jpg,.jpeg,.png"
                      maxSize={10}
                      multiple={true}
                      onFileChange={(files) =>
                        updateFormData("constitutiveDocuments", files)
                      }
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Directors and Beneficial Owners Documents
                    </CardTitle>
                    <CardDescription>
                      Please upload CTC documents of: (1) List of FC/ GC&apos;s
                      director(s) and CEO (if applicable) (2) List of
                      FC/GC&apos;s beneficial owners
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <FileUpload
                      id="directorsBeneficiaryDocs"
                      label="Upload Directors and Beneficial Owners Documents"
                      description="Upload certified true copies of the lists of directors, CEO, and beneficial owners"
                      required={true}
                      accept=".pdf,.jpg,.jpeg,.png"
                      maxSize={10}
                      multiple={true}
                      onFileChange={(files) =>
                        updateFormData("directorsBeneficiaryDocs", files)
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* FC/GC Information Part III Section */}
            <section id="fc-gc-info-3" className="scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Information on FC/GC - Part III
                </h2>
                <p className="text-gray-600">Financial Year End of FC/ GC</p>
              </div>
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Financial Year End
                  </CardTitle>
                  <CardDescription>
                    Please state the FC/GC&apos;s financial year end date (in
                    DD/MM format)
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <Label
                    htmlFor="financialYearEnd"
                    className="text-sm font-medium text-gray-700"
                  >
                    Financial Year End Date *
                  </Label>
                  <Input
                    id="financialYearEnd"
                    placeholder="DD/MM (e.g., 31/12 for December 31st)"
                    value={formData.financialYearEnd}
                    onChange={(e) =>
                      updateFormData("financialYearEnd", e.target.value)
                    }
                    className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                  />
                </CardContent>
              </Card>
            </section>

            {/* Authorized Representatives Section */}
            <section id="authorized-reps" className="scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Details of Authorised Representative(s)
                </h2>
                <p className="text-gray-600">
                  Information about authorized representatives
                </p>
              </div>
              <div className="space-y-8">
                <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-blue-800">
                      Important Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-blue-700 space-y-3">
                    <p>
                      The GMC Branch must appoint at least one person resident
                      in GMC to act as its authorised representative to accept,
                      on its behalf, service of any process or notices which may
                      be served upon the branch from time to time.
                    </p>
                    <p>
                      Generally, any resident or any person having a valid work
                      visa or an employment pass issued by the GMCA would be
                      considered resident in GMC.
                    </p>
                    <p>
                      If the GMC Branch intends to appoint an individual who
                      holds a work visa or an employment pass issued by the GMCA
                      as its authorised representative, the individual will be
                      required to obtain a relevant Letter of Consent from the
                      GMCA before his/her appointment as an authorised
                      representative of the GMC Branch.
                    </p>
                    <p>
                      An authorised representative is personally liable for all
                      penalties imposed on the GMC Branch for any contravention
                      of any of the provisions of the GMC Companies Act.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5 text-blue-600" />
                      Consent Statement
                    </CardTitle>
                    <CardDescription>
                      Please upload a consent statement by or on behalf of the
                      FC / GC in the prescribed form confirming that each of its
                      authorised representatives referred to in this section has
                      consented to act as such.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <FileUpload
                      id="consentStatement"
                      label="Upload Consent Statement"
                      description="Upload the consent statement in the prescribed form"
                      required={true}
                      accept=".pdf,.jpg,.jpeg,.png"
                      maxSize={10}
                      multiple={true}
                      onFileChange={(files) =>
                        updateFormData("consentStatement", files)
                      }
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      Representative Passports
                    </CardTitle>
                    <CardDescription>
                      Please upload a certified true copy (certified by a Notary
                      Public or Advocate & Solicitor) of a passport or identity
                      card of persons mentioned in the consent statement.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <FileUpload
                      id="representativePassports"
                      label="Upload Representative Passports/ID Cards"
                      description="Upload certified true copies of passports or identity cards"
                      required={true}
                      accept=".pdf,.jpg,.jpeg,.png"
                      maxSize={10}
                      multiple={true}
                      onFileChange={(files) =>
                        updateFormData("representativePassports", files)
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Authorized Representative 1 Section */}
            <section id="rep-1" className="scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Authorised Representative 1
                </h2>
                <p className="text-gray-600">This section is compulsory.</p>
              </div>
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Representative 1 Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Label
                      htmlFor="rep1FullName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Full Name (per passport/official documentation) *
                    </Label>
                    <Input
                      id="rep1FullName"
                      value={
                        formData.authorizedRepresentatives[0]?.fullName || ""
                      }
                      onChange={(e) =>
                        updateAuthorizedRepresentative(
                          0,
                          "fullName",
                          e.target.value
                        )
                      }
                      placeholder="Enter full name as per official documents"
                      className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="rep1IdType"
                      className="text-sm font-medium text-gray-700"
                    >
                      Identification Type *
                    </Label>
                    <Select
                      value={
                        formData.authorizedRepresentatives[0]
                          ?.identificationType || ""
                      }
                      onValueChange={(value) =>
                        updateAuthorizedRepresentative(
                          0,
                          "identificationType",
                          value
                        )
                      }
                    >
                      <SelectTrigger className="mt-2 border-2 focus:border-blue-500 rounded-xl">
                        <SelectValue placeholder="Select identification type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="national-id">National ID</SelectItem>
                        <SelectItem value="citizenship-id">
                          Citizenship ID
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="rep1Nationality"
                        className="text-sm font-medium text-gray-700"
                      >
                        Nationality/Citizenship *
                      </Label>
                      <Input
                        id="rep1Nationality"
                        value={
                          formData.authorizedRepresentatives[0]?.nationality ||
                          ""
                        }
                        onChange={(e) =>
                          updateAuthorizedRepresentative(
                            0,
                            "nationality",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Bhutanese, Indian, etc."
                        className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="rep1PassportNo"
                        className="text-sm font-medium text-gray-700"
                      >
                        Passport/Identification No. *
                      </Label>
                      <Input
                        id="rep1PassportNo"
                        value={
                          formData.authorizedRepresentatives[0]
                            ?.passportNumber || ""
                        }
                        onChange={(e) =>
                          updateAuthorizedRepresentative(
                            0,
                            "passportNumber",
                            e.target.value
                          )
                        }
                        placeholder="Enter passport or ID number"
                        className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="rep1Contact"
                        className="text-sm font-medium text-gray-700"
                      >
                        Local Contact Number *
                      </Label>
                      <Input
                        id="rep1Contact"
                        value={
                          formData.authorizedRepresentatives[0]
                            ?.contactNumber || ""
                        }
                        onChange={(e) =>
                          updateAuthorizedRepresentative(
                            0,
                            "contactNumber",
                            e.target.value
                          )
                        }
                        placeholder="e.g., +975 17123456"
                        className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="rep1Email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="rep1Email"
                        type="email"
                        value={
                          formData.authorizedRepresentatives[0]?.emailAddress ||
                          ""
                        }
                        onChange={(e) =>
                          updateAuthorizedRepresentative(
                            0,
                            "emailAddress",
                            e.target.value
                          )
                        }
                        placeholder="representative@example.com"
                        className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="rep1Address"
                      className="text-sm font-medium text-gray-700"
                    >
                      Residential Address *
                    </Label>
                    <Textarea
                      id="rep1Address"
                      value={
                        formData.authorizedRepresentatives[0]
                          ?.residentialAddress || ""
                      }
                      onChange={(e) =>
                        updateAuthorizedRepresentative(
                          0,
                          "residentialAddress",
                          e.target.value
                        )
                      }
                      placeholder="Enter complete residential address including street, city, postal code..."
                      className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Do you have an additional authorised representative? *
                    </Label>
                    <RadioGroup
                      value={formData.hasAdditionalRepresentative}
                      onValueChange={(value) =>
                        updateFormData("hasAdditionalRepresentative", value)
                      }
                      className="grid grid-cols-2 gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <RadioGroupItem value="yes" id="additional-rep-yes" />
                        <Label
                          htmlFor="additional-rep-yes"
                          className="cursor-pointer font-medium"
                        >
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <RadioGroupItem value="no" id="additional-rep-no" />
                        <Label
                          htmlFor="additional-rep-no"
                          className="cursor-pointer font-medium"
                        >
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Authorized Representative 2 Section */}
            {formData.hasAdditionalRepresentative === "yes" && (
              <section id="rep-2" className="scroll-mt-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Authorised Representative 2
                  </h2>
                  <p className="text-gray-600">
                    If applicable, please fill up this subsection with the
                    authorised representative&apos;s details.
                  </p>
                </div>
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      Representative 2 Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <Label
                        htmlFor="rep2FullName"
                        className="text-sm font-medium text-gray-700"
                      >
                        Full Name (per passport/official documentation)
                      </Label>
                      <Input
                        id="rep2FullName"
                        value={
                          formData.authorizedRepresentatives[1]?.fullName || ""
                        }
                        onChange={(e) =>
                          updateAuthorizedRepresentative(
                            1,
                            "fullName",
                            e.target.value
                          )
                        }
                        placeholder="Enter full name as per official documents"
                        className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="rep2IdType"
                        className="text-sm font-medium text-gray-700"
                      >
                        Identification Type
                      </Label>
                      <Select
                        value={
                          formData.authorizedRepresentatives[1]
                            ?.identificationType || ""
                        }
                        onValueChange={(value) =>
                          updateAuthorizedRepresentative(
                            1,
                            "identificationType",
                            value
                          )
                        }
                      >
                        <SelectTrigger className="mt-2 border-2 focus:border-blue-500 rounded-xl">
                          <SelectValue placeholder="Select identification type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="national-id">
                            National ID
                          </SelectItem>
                          <SelectItem value="citizenship-id">
                            Citizenship ID
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="rep2Nationality"
                          className="text-sm font-medium text-gray-700"
                        >
                          Nationality/Citizenship
                        </Label>
                        <Input
                          id="rep2Nationality"
                          value={
                            formData.authorizedRepresentatives[1]
                              ?.nationality || ""
                          }
                          onChange={(e) =>
                            updateAuthorizedRepresentative(
                              1,
                              "nationality",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Bhutanese, Indian, etc."
                          className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="rep2PassportNo"
                          className="text-sm font-medium text-gray-700"
                        >
                          Passport/Identification No.
                        </Label>
                        <Input
                          id="rep2PassportNo"
                          value={
                            formData.authorizedRepresentatives[1]
                              ?.passportNumber || ""
                          }
                          onChange={(e) =>
                            updateAuthorizedRepresentative(
                              1,
                              "passportNumber",
                              e.target.value
                            )
                          }
                          placeholder="Enter passport or ID number"
                          className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="rep2Contact"
                          className="text-sm font-medium text-gray-700"
                        >
                          Local Contact Number
                        </Label>
                        <Input
                          id="rep2Contact"
                          value={
                            formData.authorizedRepresentatives[1]
                              ?.contactNumber || ""
                          }
                          onChange={(e) =>
                            updateAuthorizedRepresentative(
                              1,
                              "contactNumber",
                              e.target.value
                            )
                          }
                          placeholder="e.g., +975 17123456"
                          className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="rep2Email"
                          className="text-sm font-medium text-gray-700"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="rep2Email"
                          type="email"
                          value={
                            formData.authorizedRepresentatives[1]
                              ?.emailAddress || ""
                          }
                          onChange={(e) =>
                            updateAuthorizedRepresentative(
                              1,
                              "emailAddress",
                              e.target.value
                            )
                          }
                          placeholder="representative@example.com"
                          className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="rep2Address"
                        className="text-sm font-medium text-gray-700"
                      >
                        Residential Address
                      </Label>
                      <Textarea
                        id="rep2Address"
                        value={
                          formData.authorizedRepresentatives[1]
                            ?.residentialAddress || ""
                        }
                        onChange={(e) =>
                          updateAuthorizedRepresentative(
                            1,
                            "residentialAddress",
                            e.target.value
                          )
                        }
                        placeholder="Enter complete residential address including street, city, postal code..."
                        className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                      />
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Directors Section */}
            <section id="directors" className="scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Details of the Directors of the FC/GC
                </h2>
                <p className="text-gray-600">
                  Please fill up this section with the details of each of the
                  directors in the FC/GC.
                </p>
              </div>
              <div className="space-y-8">
                {/* Directors */}
                {formData.directors.map((director, index) => (
                  <Card key={index} className="shadow-lg border-0 bg-white">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            Director {index + 1}
                            {index === 0 && " (Required)"}
                          </CardTitle>
                          {index > 0 && (
                            <CardDescription>
                              Additional director information
                            </CardDescription>
                          )}
                        </div>
                        {index > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeDirector(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <Label
                          htmlFor={`director${index}Name`}
                          className="text-sm font-medium text-gray-700"
                        >
                          Full Name of the Director {index === 0 && "*"}
                        </Label>
                        <Input
                          id={`director${index}Name`}
                          value={director.fullName}
                          onChange={(e) =>
                            updateDirector(index, "fullName", e.target.value)
                          }
                          placeholder="Enter director's full name as per official documents"
                          className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor={`director${index}Address`}
                          className="text-sm font-medium text-gray-700"
                        >
                          Director&apos;s Residential Address{" "}
                          {index === 0 && "*"}
                        </Label>
                        <Textarea
                          id={`director${index}Address`}
                          value={director.residentialAddress}
                          onChange={(e) =>
                            updateDirector(
                              index,
                              "residentialAddress",
                              e.target.value
                            )
                          }
                          placeholder="Enter complete residential address including street, city, postal code, country..."
                          className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor={`director${index}IdNumber`}
                            className="text-sm font-medium text-gray-700"
                          >
                            Director&apos;s Identification Number{" "}
                            {index === 0 && "*"}
                          </Label>
                          <Input
                            id={`director${index}IdNumber`}
                            value={director.identificationNumber}
                            onChange={(e) =>
                              updateDirector(
                                index,
                                "identificationNumber",
                                e.target.value
                              )
                            }
                            placeholder="Enter passport or ID number"
                            className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`director${index}IdType`}
                            className="text-sm font-medium text-gray-700"
                          >
                            Director&apos;s Identification Type{" "}
                            {index === 0 && "*"}
                          </Label>
                          <Input
                            id={`director${index}IdType`}
                            value={director.identificationType}
                            onChange={(e) =>
                              updateDirector(
                                index,
                                "identificationType",
                                e.target.value
                              )
                            }
                            placeholder="e.g., Passport, National ID, etc."
                            className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor={`director${index}Nationality`}
                            className="text-sm font-medium text-gray-700"
                          >
                            Nationality/Citizenship {index === 0 && "*"}
                          </Label>
                          <Input
                            id={`director${index}Nationality`}
                            value={director.nationality}
                            onChange={(e) =>
                              updateDirector(
                                index,
                                "nationality",
                                e.target.value
                              )
                            }
                            placeholder="e.g., Bhutanese, Indian, etc."
                            className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`director${index}Appointment`}
                            className="text-sm font-medium text-gray-700"
                          >
                            Director&apos;s Date of Appointment{" "}
                            {index === 0 && "*"}
                          </Label>
                          <Input
                            id={`director${index}Appointment`}
                            type="date"
                            value={director.dateOfAppointment}
                            onChange={(e) =>
                              updateDirector(
                                index,
                                "dateOfAppointment",
                                e.target.value
                              )
                            }
                            className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                          />
                        </div>
                      </div>
                      <div>
                        <FileUpload
                          id={`directorDocuments${index}`}
                          label={`Director ${index + 1} Documents`}
                          description="Please upload (1) a copy of the passport or identity card and (2) address proof of this director (notarised by a notary public or certified true copy by an Advocate and Solicitor)"
                          required={index === 0}
                          accept=".pdf,.jpg,.jpeg,.png"
                          maxSize={10}
                          multiple={true}
                          onFileChange={(files) =>
                            updateDirector(index, "documents", files)
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Director Button */}
                <div className="text-center">
                  <Button
                    onClick={addDirector}
                    variant="outline"
                    className="border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-600 hover:text-blue-600 px-6 py-3 rounded-xl bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Director
                  </Button>
                </div>
              </div>
            </section>

            {/* Registered Office Section */}
            <section id="registered-office" className="scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Details of Registered Office in GMC and Working Hours
                </h2>
                <p className="text-gray-600">
                  Registered office requirements and contact information
                </p>
              </div>
              <div className="space-y-8">
                <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-blue-800">
                      Important Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-blue-700 space-y-3">
                    <p>
                      Under the GMC Companies Act, the GMC Branch is required to
                      establish a registered office in the GMC where all
                      communications and notices may be addressed to. It shall
                      be open and accessible to the public for not less the 5
                      hours between 9:00 a.m. and 5:00 p.m. on a business day.
                    </p>
                    <p>
                      This requirement will be waived for 12 months commencing 1
                      May 2025 and until 30 April 2026 (&ldquo;Waiver
                      Period&ldquo;).
                    </p>
                    <p>
                      In the interim, the company has to provide an email which
                      can receive communications and notices addressed to the
                      company. The company bears responsibility for all matters
                      and/or documents which must be maintained at the
                      registered office address during the Waiver Period.
                    </p>
                    <p>
                      If the company is unable to provide the GCRO with a
                      registered office address in GMC on/after 1 May 2026, the
                      GCRO reserves the power to revoke the company&apos;s
                      registration.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      Registered Office Availability
                    </CardTitle>
                    <CardDescription>
                      Are the details of the registered branch office address in
                      GMC and working hours available?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3">
                    <RadioGroup
                      value={formData.hasRegisteredOffice}
                      onValueChange={(value) =>
                        updateFormData("hasRegisteredOffice", value)
                      }
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <RadioGroupItem value="yes" id="office-available-yes" />
                        <Label
                          htmlFor="office-available-yes"
                          className="cursor-pointer font-medium"
                        >
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <RadioGroupItem value="no" id="office-available-no" />
                        <Label
                          htmlFor="office-available-no"
                          className="cursor-pointer font-medium"
                        >
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {formData.hasRegisteredOffice === "yes" && (
                  <Card className="shadow-lg border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Home className="h-5 w-5 text-blue-600" />
                        Registered Office Address and Working Hours
                      </CardTitle>
                      <CardDescription>
                        Where this information is available
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 space-y-6">
                      <div>
                        <Label
                          htmlFor="registeredOfficeAddressGMC"
                          className="text-sm font-medium text-gray-700"
                        >
                          Registered Office Address of the Branch in GMC *
                        </Label>
                        <Textarea
                          id="registeredOfficeAddressGMC"
                          value={formData.registeredOfficeAddressGMC}
                          onChange={(e) =>
                            updateFormData(
                              "registeredOfficeAddressGMC",
                              e.target.value
                            )
                          }
                          placeholder="Enter the complete registered office address in GMC including building name, street, area, postal code..."
                          className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="workingDays"
                          className="text-sm font-medium text-gray-700"
                        >
                          Days and Hours Open to Public *
                        </Label>
                        <Textarea
                          id="workingDays"
                          value={formData.workingDays}
                          onChange={(e) =>
                            updateFormData("workingDays", e.target.value)
                          }
                          placeholder="Please describe the days and hours during which the registered office in GMC is open and accessible to the public (e.g., Monday to Friday, 9:00 AM to 5:00 PM)"
                          className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="workingHours"
                          className="text-sm font-medium text-gray-700"
                        >
                          Working Hours of GMC Branch *
                        </Label>
                        <Input
                          id="workingHours"
                          value={formData.workingHours}
                          onChange={(e) =>
                            updateFormData("workingHours", e.target.value)
                          }
                          placeholder="If available, else indicate N/A for now (e.g., 9:00 AM - 6:00 PM)"
                          className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {formData.hasRegisteredOffice === "no" && (
                  <Card className="shadow-lg border-0 bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Home className="h-5 w-5 text-blue-600" />
                        Registered Office Address and Working Hours
                      </CardTitle>
                      <CardDescription>
                        Where this information is not available yet
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div>
                        <Label
                          htmlFor="emailForCommunications"
                          className="text-sm font-medium text-gray-700"
                        >
                          Email Address for Communications *
                        </Label>
                        <Input
                          id="emailForCommunications"
                          type="email"
                          value={formData.emailForCommunications}
                          onChange={(e) =>
                            updateFormData(
                              "emailForCommunications",
                              e.target.value
                            )
                          }
                          placeholder="Please state the email address of the company which is capable of receiving service of communications and notices"
                          className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>

            {/* Declaration Section */}
            <section id="declaration" className="scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Business Entity / Representative of Business Entity
                  Declaration
                </h2>
                <p className="text-gray-600">
                  The person designated below is to declare that the information
                  provided in this form is true and correct, and that he/she
                  agrees to all the terms stated in this document, including the
                  data protection section at the start of this document.
                </p>
              </div>
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Declaration Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Label
                      htmlFor="declarantName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Name of the Director / Officer of FC/GC *
                    </Label>
                    <Input
                      id="declarantName"
                      value={formData.declarantName}
                      onChange={(e) =>
                        updateFormData("declarantName", e.target.value)
                      }
                      placeholder="Please state the name of the Director / Officer of FC/GC who will declare that the information in this form is true and correct"
                      className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="declarantIdNumber"
                      className="text-sm font-medium text-gray-700"
                    >
                      Identity No./Passport No. of the Person Declaring *
                    </Label>
                    <Input
                      id="declarantIdNumber"
                      value={formData.declarantIdNumber}
                      onChange={(e) =>
                        updateFormData("declarantIdNumber", e.target.value)
                      }
                      placeholder="Please state the identity no./passport no. of the person declaring"
                      className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="declarantDesignation"
                      className="text-sm font-medium text-gray-700"
                    >
                      Person&apos;s Designation in FC/GC *
                    </Label>
                    <Input
                      id="declarantDesignation"
                      value={formData.declarantDesignation}
                      onChange={(e) =>
                        updateFormData("declarantDesignation", e.target.value)
                      }
                      placeholder="Please state the person's designation in FC/GC (e.g., Director, CEO, Managing Director)"
                      className="mt-2 border-2 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div className="border-2 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="declaration"
                        checked={formData.declaration}
                        onCheckedChange={(checked) =>
                          updateFormData("declaration", checked as boolean)
                        }
                        className="mt-1"
                      />
                      <div className="space-y-2">
                        <Label
                          htmlFor="declaration"
                          className="text-sm font-medium cursor-pointer"
                        >
                          Declaration *
                        </Label>
                        <div className="text-sm text-gray-600">
                          <p>
                            I, being engaged in the registration of the GMC
                            Branch, hereby declare to the GCRO that the
                            information provided above is complete and accurate.
                            I agree to the terms of this form, including any
                            data protection issues (as stated at the front of
                            the form). Your response of &ldquo;yes&ldquo; below
                            acts as a e-signature as confirmation of the above.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Feedback Section */}
            <section id="feedback" className="scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Optional Feedback
                </h2>
                <p className="text-gray-600">
                  GMC is committed to making company incorporation as smooth as
                  possible. If you have a moment, we highly appreciate your
                  feedback.
                </p>
              </div>
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-600" />
                    Your Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      How would you rate your overall experience using this form
                      to complete your branch registration process?
                    </Label>
                    <div className="flex items-center gap-2 mt-4">
                      <span className="text-sm text-gray-600">
                        Very difficult/confusing
                      </span>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() =>
                            updateFormData("experienceRating", rating)
                          }
                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                            formData.experienceRating >= rating
                              ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                              : "border-gray-300 text-gray-600 hover:border-blue-400 hover:bg-blue-50"
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                      <span className="text-sm text-gray-600">Excellent</span>
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="feedback"
                      className="text-sm font-medium text-gray-700"
                    >
                      Do you have any feedback on how we could improve this form
                      or the branch registration process?
                    </Label>
                    <Textarea
                      id="feedback"
                      value={formData.feedback}
                      onChange={(e) =>
                        updateFormData("feedback", e.target.value)
                      }
                      placeholder="Please share any feedback, suggestions, or comments that could help us improve the registration process..."
                      className="min-h-[120px] mt-2 border-2 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Final Submission */}
            <div className="text-center py-8">
              <Alert className="mb-6 border-blue-200 bg-blue-50">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Please review all sections carefully before submitting. Once
                  submitted, modifications may require additional processing
                  time.
                </AlertDescription>
              </Alert>
              <Button
                onClick={handleSubmitClick}
                disabled={isSubmitting || !formData.declaration}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-8 py-3 text-lg shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                By submitting this application, you agree to our terms and
                conditions and confirm that all information provided is
                accurate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit the form?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSubmit}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl"
            >
              Yes, Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
