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

interface IndividualSubscriber {
  docs: File[];
  name: string;
  nationality: string;
  address: string;
  occupation: string;
  passport: string;
  dob: string;
  phone: string;
  email: string;
  shares: string;
  sharesInTrust: string;
  trustName: string;
}

interface CorporateSubscriber {
  authDocs: File[];
  passportDocs: File[];
  name: string;
  address: string;
  country: string;
  website: string;
  authorizedPerson: string;
  shares: string;
}

interface Director {
  name: string;
  nationality: string;
  address: string;
  dob: string;
  occupation: string;
  passport: string;
  phone: string;
  email: string;
}

interface BeneficialOwnerIndividual {
  docs: File[];
  fullName: string;
  identityNumber: string;
  residentialAddress: string;
  dateOfBirth: string;
  nationality: string;
  occupation: string;
  contactNumber: string;
  emailAddress: string;
  sourceOfFunds: string;
  natureOfOwnership: string;
  ownershipStructure: string;
}

interface BeneficialOwnerCorporate {
  docs: File[];
  entityName: string;
  identificationNumber: string;
  registeredOfficeAddress: string;
  principalPlaceOfBusiness: string;
  placeOfRegistration: string;
  dateOfRegistration: string;
  shareholderDetails: string;
  natureOfOwnership: string;
  ownershipStructure: string;
}

interface PEPIndividual {
  name: string;
  country: string;
  natureOfFunction: string;
  period: string;
  relationship: string;
  sourceOfWealth: string;
  sourceOfFunds: string;
  documents: File[];
}

interface AuthorizedSignatory {
  fullName: string;
  passportNumber: string;
  position: string;
  phoneNumber: string;
  emailAddress: string;
  userRole: string;
  signatureDocs: File[];
}

interface FormData {
  // Section 1: Company Details
  companyNames: string[];
  isTrademarkName: string;
  consentLetter: File[];
  initialShares: string;
  paidUpCapital: string;
  principalActivities: string;

  // Section 2: Applicant Information
  applicantType: string;
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

  // Section 3: Subscriber Information
  subscriberTypes: string[];
  individualSubscribers: IndividualSubscriber[];
  corporateSubscribers: CorporateSubscriber[];

  // Section 4: Directors
  directorDocs: File[];
  directors: Director[];
  registeredOffice: string;
  registeredOfficeOption: string;
  gmcAddress: string;
  waiverEmail: string;
  financialYearEnd: string;
  financialYearEndOption: string;
  financialYearEndOther: string;

  // Section 5: Beneficial Owners
  beneficialOwnerType: string;
  beneficialOwnerIndividuals: BeneficialOwnerIndividual[];
  beneficialOwnerCorporates: BeneficialOwnerCorporate[];

  // Section 6: PEP Information
  isPEP: string;
  pepIndividuals: PEPIndividual[];

  // Section 7: Declaration
  declarantName: string;
  declarantID: string;
  declaration: boolean;

  // Section 8: Special UEN
  wantsSpecialUEN: string;
  specialUEN: string;

  // Section 9: Bank Account
  wantsBankAccount: string;
  bankAccountAgreement: boolean;
  accountType: string;
  operationMode: string;
  authorizedSignatories: AuthorizedSignatory[];
  individualAccountDocs: File[];

  // Feedback
  experienceRating: number;
  feedback: string;
}

// Updated SECTIONS array to match the actual form order
const SECTIONS = [
  { id: "introduction", name: "Introduction", icon: Info },
  { id: "company-details", name: "Company Details", icon: Building2 },
  { id: "applicant", name: "Applicant Information", icon: UserCheck },
  { id: "subscriber", name: "Subscriber Information", icon: User },
  { id: "directors", name: "Directors", icon: Users },
  { id: "beneficial-owners", name: "Beneficial Owners", icon: Shield },
  { id: "pep", name: "PEP Information", icon: Scale },
  { id: "declaration", name: "Declaration", icon: FileText },
  { id: "special-services", name: "Special Services", icon: Star },
  { id: "bank-account", name: "Bank Account", icon: DollarSign },
  { id: "feedback", name: "Feedback", icon: MessageSquare },
];

const createEmptyIndividualSubscriber = (): IndividualSubscriber => ({
  docs: [],
  name: "",
  nationality: "",
  address: "",
  occupation: "",
  passport: "",
  dob: "",
  phone: "",
  email: "",
  shares: "",
  sharesInTrust: "",
  trustName: "",
});

const createEmptyCorporateSubscriber = (): CorporateSubscriber => ({
  authDocs: [],
  passportDocs: [],
  name: "",
  address: "",
  country: "",
  website: "",
  authorizedPerson: "",
  shares: "",
});

const createEmptyDirector = (): Director => ({
  name: "",
  nationality: "",
  address: "",
  dob: "",
  occupation: "",
  passport: "",
  phone: "",
  email: "",
});

const createEmptyBeneficialOwnerIndividual = (): BeneficialOwnerIndividual => ({
  docs: [],
  fullName: "",
  identityNumber: "",
  residentialAddress: "",
  dateOfBirth: "",
  nationality: "",
  occupation: "",
  contactNumber: "",
  emailAddress: "",
  sourceOfFunds: "",
  natureOfOwnership: "",
  ownershipStructure: "",
});

const createEmptyBeneficialOwnerCorporate = (): BeneficialOwnerCorporate => ({
  docs: [],
  entityName: "",
  identificationNumber: "",
  registeredOfficeAddress: "",
  principalPlaceOfBusiness: "",
  placeOfRegistration: "",
  dateOfRegistration: "",
  shareholderDetails: "",
  natureOfOwnership: "",
  ownershipStructure: "",
});

const createEmptyPEPIndividual = (): PEPIndividual => ({
  name: "",
  country: "",
  natureOfFunction: "",
  period: "",
  relationship: "",
  sourceOfWealth: "",
  sourceOfFunds: "",
  documents: [],
});

const createEmptyAuthorizedSignatory = (): AuthorizedSignatory => ({
  fullName: "",
  passportNumber: "",
  position: "",
  phoneNumber: "",
  emailAddress: "",
  userRole: "",
  signatureDocs: [],
});

export default function CompanyRegistrationPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  // Add subscriberTypes to FormData type definition above this line
  // interface FormData { ... subscriberTypes: string[]; ... }
  const [formData, setFormData] = useState<FormData>({
    // Company Details
    companyNames: ["", "", ""],
    isTrademarkName: "",
    consentLetter: [],
    initialShares: "",
    paidUpCapital: "",
    principalActivities: "",

    // Applicant Information
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

    // Subscriber Information
    subscriberTypes: [],
    individualSubscribers: [createEmptyIndividualSubscriber()],
    corporateSubscribers: [createEmptyCorporateSubscriber()],

    // Directors
    directorDocs: [],
    directors: [createEmptyDirector()],
    registeredOffice: "",
    registeredOfficeOption: "",
    gmcAddress: "",
    waiverEmail: "",
    financialYearEnd: "",
    financialYearEndOption: "",
    financialYearEndOther: "",

    // Beneficial Owners
    beneficialOwnerType: "",
    beneficialOwnerIndividuals: [createEmptyBeneficialOwnerIndividual()],
    beneficialOwnerCorporates: [createEmptyBeneficialOwnerCorporate()],

    // PEP Information
    isPEP: "",
    pepIndividuals: [],

    // Declaration
    declarantName: "",
    declarantID: "",
    declaration: false,

    // Special UEN
    wantsSpecialUEN: "",
    specialUEN: "",

    // Bank Account
    wantsBankAccount: "",
    bankAccountAgreement: false,
    accountType: "",
    operationMode: "",
    authorizedSignatories: [createEmptyAuthorizedSignatory()],
    individualAccountDocs: [],

    // Feedback
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
        // Ensure arrays exist with proper structure
        const draftWithDefaults = {
          ...parsedDraft,
          subscriberTypes: Array.isArray(parsedDraft.subscriberTypes)
            ? parsedDraft.subscriberTypes
            : [], // Fallback to empty array
          individualSubscribers:
            parsedDraft.individualSubscribers?.length > 0
              ? parsedDraft.individualSubscribers
              : [createEmptyIndividualSubscriber()],
          corporateSubscribers:
            parsedDraft.corporateSubscribers?.length > 0
              ? parsedDraft.corporateSubscribers
              : [createEmptyCorporateSubscriber()],
          directors:
            parsedDraft.directors?.length > 0
              ? parsedDraft.directors
              : [createEmptyDirector()],
          pepIndividuals: parsedDraft.pepIndividuals || [],
          authorizedSignatories:
            parsedDraft.authorizedSignatories?.length > 0
              ? parsedDraft.authorizedSignatories
              : [createEmptyAuthorizedSignatory()],
        };
        setFormData(draftWithDefaults);
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
      ...(field === "isPEP" && value === "no" ? { pepIndividuals: [] } : {}),
      ...(field === "isPEP" &&
      value === "yes" &&
      prev.pepIndividuals.length === 0
        ? { pepIndividuals: [createEmptyPEPIndividual()] }
        : {}),
      ...(field === "operationMode" && value === "single"
        ? { authorizedSignatories: [createEmptyAuthorizedSignatory()] }
        : {}),
      ...(field === "operationMode" &&
      (value === "joint-and" || value === "joint-any")
        ? {
            authorizedSignatories: [
              createEmptyAuthorizedSignatory(),
              createEmptyAuthorizedSignatory(),
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

  const addDirector = () => {
    setFormData((prev) => ({
      ...prev,
      directors: [...prev.directors, createEmptyDirector()],
    }));
  };

  const updateDirector = (
    index: number,
    field: keyof Director,
    value: string
  ) => {
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

  const addIndividualSubscriber = () => {
    setFormData((prev) => ({
      ...prev,
      individualSubscribers: [
        ...prev.individualSubscribers,
        createEmptyIndividualSubscriber(),
      ],
    }));
  };

  const updateIndividualSubscriber = <K extends keyof IndividualSubscriber>(
    index: number,
    field: K,
    value: IndividualSubscriber[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      individualSubscribers: prev.individualSubscribers.map((subscriber, i) =>
        i === index ? { ...subscriber, [field]: value } : subscriber
      ),
    }));
  };

  const removeIndividualSubscriber = (index: number) => {
    if (formData.individualSubscribers.length > 1) {
      setFormData((prev) => ({
        ...prev,
        individualSubscribers: prev.individualSubscribers.filter(
          (_, i) => i !== index
        ),
      }));
    }
  };

  const addCorporateSubscriber = () => {
    setFormData((prev) => ({
      ...prev,
      corporateSubscribers: [
        ...prev.corporateSubscribers,
        createEmptyCorporateSubscriber(),
      ],
    }));
  };

  const updateCorporateSubscriber = <K extends keyof CorporateSubscriber>(
    index: number,
    field: K,
    value: CorporateSubscriber[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      corporateSubscribers: prev.corporateSubscribers.map((subscriber, i) =>
        i === index ? { ...subscriber, [field]: value } : subscriber
      ),
    }));
  };
  const removeCorporateSubscriber = (index: number) => {
    if (formData.corporateSubscribers.length > 1) {
      setFormData((prev) => ({
        ...prev,
        corporateSubscribers: prev.corporateSubscribers.filter(
          (_, i) => i !== index
        ),
      }));
    }
  };

  const addBeneficialOwnerIndividual = () => {
    setFormData((prev) => ({
      ...prev,
      beneficialOwnerIndividuals: [
        ...prev.beneficialOwnerIndividuals,
        createEmptyBeneficialOwnerIndividual(),
      ],
    }));
  };

  const updateBeneficialOwnerIndividual = <
    K extends keyof BeneficialOwnerIndividual
  >(
    index: number,
    field: K,
    value: BeneficialOwnerIndividual[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      beneficialOwnerIndividuals: prev.beneficialOwnerIndividuals.map(
        (owner, i) => (i === index ? { ...owner, [field]: value } : owner)
      ),
    }));
  };

  const removeBeneficialOwnerIndividual = (index: number) => {
    if (formData.beneficialOwnerIndividuals.length > 1) {
      setFormData((prev) => ({
        ...prev,
        beneficialOwnerIndividuals: prev.beneficialOwnerIndividuals.filter(
          (_, i) => i !== index
        ),
      }));
    }
  };

  const addBeneficialOwnerCorporate = () => {
    setFormData((prev) => ({
      ...prev,
      beneficialOwnerCorporates: [
        ...prev.beneficialOwnerCorporates,
        createEmptyBeneficialOwnerCorporate(),
      ],
    }));
  };

  const updateBeneficialOwnerCorporate = <
    K extends keyof BeneficialOwnerCorporate
  >(
    index: number,
    field: K,
    value: BeneficialOwnerCorporate[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      beneficialOwnerCorporates: prev.beneficialOwnerCorporates.map(
        (owner, i) => (i === index ? { ...owner, [field]: value } : owner)
      ),
    }));
  };

  const removeBeneficialOwnerCorporate = (index: number) => {
    if (formData.beneficialOwnerCorporates.length > 1) {
      setFormData((prev) => ({
        ...prev,
        beneficialOwnerCorporates: prev.beneficialOwnerCorporates.filter(
          (_, i) => i !== index
        ),
      }));
    }
  };

  const addPEPIndividual = () => {
    setFormData((prev: FormData) => ({
      ...prev,
      pepIndividuals: [...prev.pepIndividuals, createEmptyPEPIndividual()],
    }));
  };

  const updatePEPIndividual = <K extends keyof PEPIndividual>(
    index: number,
    field: K,
    value: PEPIndividual[K]
  ) => {
    setFormData((prev: FormData) => ({
      ...prev,
      pepIndividuals: prev.pepIndividuals.map((pep, i) =>
        i === index ? { ...pep, [field]: value } : pep
      ),
    }));
  };

  const removePEPIndividual = (index: number) => {
    if (formData.pepIndividuals.length > 1) {
      setFormData((prev: FormData) => ({
        ...prev,
        pepIndividuals: prev.pepIndividuals.filter((_, i) => i !== index),
      }));
    }
  };

  const addAuthorizedSignatory = () => {
    setFormData((prev: FormData) => ({
      ...prev,
      authorizedSignatories: [
        ...prev.authorizedSignatories,
        createEmptyAuthorizedSignatory(),
      ],
    }));
  };

  const updateAuthorizedSignatory = <K extends keyof AuthorizedSignatory>(
    index: number,
    field: K,
    value: AuthorizedSignatory[K]
  ) => {
    setFormData((prev: FormData) => ({
      ...prev,
      authorizedSignatories: prev.authorizedSignatories.map((signatory, i) =>
        i === index ? { ...signatory, [field]: value } : signatory
      ),
    }));
  };
  const removeAuthorizedSignatory = (index: number) => {
    if (formData.authorizedSignatories.length > 2) {
      setFormData((prev: FormData) => ({
        ...prev,
        authorizedSignatories: prev.authorizedSignatories.filter(
          (_, i) => i !== index
        ),
      }));
    }
  };

  useEffect(() => {
    const totalShares = [
      ...formData.individualSubscribers,
      ...formData.corporateSubscribers,
    ].reduce((sum, subscriber) => {
      const shares = parseInt(subscriber.shares) || 0;
      return sum + shares;
    }, 0);

    const initialShares = parseInt(formData.initialShares) || 0;

    if (totalShares > initialShares) {
      setErrors((prev) => ({
        ...prev,
        totalShares: `Total shares (${totalShares}) cannot exceed initial shares (${initialShares})`,
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.totalShares;
        return newErrors;
      });
    }
  }, [
    formData.individualSubscribers,
    formData.corporateSubscribers,
    formData.initialShares,
  ]);

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
    <>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg border-r border-gray-200 fixed h-full overflow-y-auto hidden sm:block">
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
        <div className="flex-1 sm:ml-80">
          <div className="max-w-4xl mx-auto p-8 space-y-12">
            {/* Introduction Section */}
            <section id="introduction" className="scroll-mt-8">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Building2 className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Application for Incorporation of GMC Company
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Welcome to the Gelephu Mindfulness City company incorporation
                  process. This form will guide you through registering your
                  Private Limited Company.
                </p>
              </div>

              <Card className="border-amber-200 bg-amber-50 mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <Shield className="h-5 w-5" />
                    Data Protection Notice
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-amber-700 space-y-3">
                  <p>
                    We may collect, use and/or disclose personal data for the
                    purposes of providing services to you and/or in the ordinary
                    course of our work. We may disclose such personal data to
                    our affiliated entities, third party service providers and
                    agents, other professional advisors and consultants with
                    whom we are dealing on your behalf, and any necessary
                    governmental authorities. Details about how we process
                    personal data are set out in our personal data protection
                    policy (as updated from time to time), a copy of which will
                    be made available at https://gmc.bt/. Where you provide us
                    with any personal data of any third party, we may collect,
                    use and/or disclose the same on the understanding that you
                    have obtained all necessary consents (as may be applicable)
                    in accordance with the laws of the GMC.
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
                      Propose up to 3 company names
                    </CardTitle>
                    <CardDescription>
                      Each must end with &ldquo;Private Limited&ldquo; or
                      &ldquo;Pte Ltd&ldquo;
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
                      Is the proposed company name a trademark/patent name or
                      name of a company elsewhere?
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
                        <Label
                          htmlFor="trademark-yes"
                          className="cursor-pointer"
                        >
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="no" id="trademark-no" />
                        <Label
                          htmlFor="trademark-no"
                          className="cursor-pointer"
                        >
                          No
                        </Label>
                      </div>
                    </RadioGroup>

                    {formData.isTrademarkName === "yes" && (
                      <div className="mt-4">
                        <FileUpload
                          id="consentLetter"
                          label="Upload Letter of Consent from Owner"
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
                      <CardTitle className="flex items-center gap-2 text-md">
                        <DollarSign className="h-3 w-5 text-green-600" />
                        What is the initial number of shares the company wishes
                        to issue?
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
                      <CardTitle className="flex items-center gap-2 text-md">
                        <DollarSign className="h-3 w-5 text-green-600" />
                        How much is the initial paid-up capital (US$) of the
                        company?
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
                        <RadioGroupItem
                          value="company"
                          id="applicant-company"
                        />
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
                            <Label htmlFor="applicantDOB">
                              Date of Birth *
                            </Label>
                            <Input
                              id="applicantDOB"
                              type="date"
                              value={formData.applicantDOB}
                              onChange={(e) =>
                                updateFormData("applicantDOB", e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-4">
                            <Label htmlFor="applicantGender">Gender *</Label>
                            <RadioGroup
                              value={formData.applicantGender}
                              onValueChange={(value) =>
                                updateFormData("applicantGender", value)
                              }
                              className="flex gap-4 mt-4"
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
                                <RadioGroupItem
                                  value="other"
                                  id="gender-other"
                                />
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
                                updateFormData(
                                  "applicantAddress",
                                  e.target.value
                                )
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
                            <Label htmlFor="applicantPhone">
                              Phone Number *
                            </Label>
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

                    <Card>
                      <CardHeader>
                        <CardTitle>Source of Funds</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Label htmlFor="applicantFundsSource">
                          Please state the individual&ldquo;s source of funds /
                          source of wealth in financing the entity.(e.g.
                          personal or joint savings, employment income, sale of
                          assets, inheritance or gifts, compensation, profits
                          from business activities or investments)
                        </Label>
                        <Textarea
                          id="applicantFundsSource"
                          placeholder="Describe the source of funds for this investment"
                          value={formData.applicantFundsSource}
                          className="mt-5"
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
                )}

                {/* Company Applicant Details */}
                {formData.applicantType === "company" && (
                  <div className="space-y-6">
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
                                updateFormData(
                                  "companyAddresses",
                                  e.target.value
                                )
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

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Upload className="h-5 w-5 text-blue-600" />
                          Required Documents
                        </CardTitle>
                        <CardDescription>
                          Upload company registration and authorization
                          documents
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
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="companyFundsSource">
                            Source of Funds
                          </Label>
                          <p className="text-sm text-muted-foreground mt-2">
                            Please state the source of funds/wealth behind the
                            entity. Examples include but are not limited to:
                            retained earnings, trade income, profits,
                            investments, loans or debt capital, equity capital,
                            venture capital, grants, crowdfunding.
                          </p>
                          <Textarea
                            id="companyFundsSource"
                            placeholder="Describe the source of funds for this investment"
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
                          <p className="text-sm text-muted-foreground mt-2">
                            Please state the name(s) of all connected parties of
                            the Applicant (and identify if they are
                            director/partners). A connected party includes the
                            following: (a) in relation to a legal person (other
                            than a partnership), means any director or any
                            natural person having executive authority (eg: Chief
                            Executive Officers, Managing Directors etc.) in the
                            legal person; (b) in relation to a legal person that
                            is in a partnership, means any partner or manager;
                            and (c) in relation to a legal arrangement, means
                            any natural person having executive authority in the
                            legal arrangement.
                          </p>
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
                            className="mt-4"
                            rows={2}
                          />
                        </div>
                      </CardContent>
                    </Card>

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

            {/* Subscriber Information Section */}
            <section id="subscriber" className="scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Subscriber Information
                </h2>
                <p className="text-gray-600">
                  Information about the company subscribers
                </p>
              </div>

              <div className="space-y-8">
                {/* Subscriber Type Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Subscriber Type</CardTitle>
                    <CardDescription>
                      Select the types of subscribers (at least one is required)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          id="subscriber-individual"
                          checked={formData.subscriberTypes.includes(
                            "individual"
                          )}
                          onChange={(e) => {
                            const newTypes = e.target.checked
                              ? [...formData.subscriberTypes, "individual"]
                              : formData.subscriberTypes.filter(
                                  (type) => type !== "individual"
                                );
                            if (newTypes.length === 0) {
                              setErrors((prev) => ({
                                ...prev,
                                subscriberTypes:
                                  "At least one subscriber type must be selected",
                              }));
                            } else {
                              setErrors((prev) => {
                                const newErrors = { ...prev };
                                delete newErrors.subscriberTypes;
                                return newErrors;
                              });
                            }
                            updateFormData("subscriberTypes", newTypes);
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                              Personal subscribers
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          id="subscriber-corporation"
                          checked={formData.subscriberTypes.includes(
                            "corporation"
                          )}
                          onChange={(e) => {
                            const newTypes = e.target.checked
                              ? [...formData.subscriberTypes, "corporation"]
                              : formData.subscriberTypes.filter(
                                  (type) => type !== "corporation"
                                );
                            if (newTypes.length === 0) {
                              setErrors((prev) => ({
                                ...prev,
                                subscriberTypes:
                                  "At least one subscriber type must be selected",
                              }));
                            } else {
                              setErrors((prev) => {
                                const newErrors = { ...prev };
                                delete newErrors.subscriberTypes;
                                return newErrors;
                              });
                            }
                            updateFormData("subscriberTypes", newTypes);
                          }}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
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
                              Corporate subscribers
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {errors.subscriberTypes && (
                      <p className="text-sm text-red-600 flex items-center gap-1 mt-4">
                        <AlertCircle className="h-3 w-3" />
                        {errors.subscriberTypes}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Display error for total shares */}
                {errors.totalShares && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.totalShares}</AlertDescription>
                  </Alert>
                )}

                {/* Individual Subscriber Details */}
                {formData.subscriberTypes.includes("individual") && (
                  <div className="space-y-8">
                    {formData.individualSubscribers.map((subscriber, index) => (
                      <Card key={index} className="border-2 border-blue-100">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <User className="h-5 w-5 text-blue-600" />
                              Individual Subscriber {index + 1}
                            </CardTitle>
                            {formData.individualSubscribers.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  removeIndividualSubscriber(index)
                                }
                                className="text-red-600 hover:text-red-700"
                              >
                                Remove Subscriber
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                              <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Full Name *</Label>
                                  <Input
                                    placeholder="Enter full name"
                                    value={subscriber.name}
                                    onChange={(e) =>
                                      updateIndividualSubscriber(
                                        index,
                                        "name",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Nationality/Citizenship *</Label>
                                  <Input
                                    placeholder="Enter nationality"
                                    value={subscriber.nationality}
                                    onChange={(e) =>
                                      updateIndividualSubscriber(
                                        index,
                                        "nationality",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Current Occupation *</Label>
                                  <Input
                                    placeholder="Enter occupation"
                                    value={subscriber.occupation}
                                    onChange={(e) =>
                                      updateIndividualSubscriber(
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
                                    placeholder="Enter passport or ID number or FIN"
                                    value={subscriber.passport}
                                    onChange={(e) =>
                                      updateIndividualSubscriber(
                                        index,
                                        "passport",
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
                                  <Label>Residential Address *</Label>
                                  <Textarea
                                    placeholder="Enter full residential address"
                                    value={subscriber.address}
                                    onChange={(e) =>
                                      updateIndividualSubscriber(
                                        index,
                                        "address",
                                        e.target.value
                                      )
                                    }
                                    rows={3}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Date of Birth *</Label>
                                  <Input
                                    type="date"
                                    value={subscriber.dob}
                                    onChange={(e) =>
                                      updateIndividualSubscriber(
                                        index,
                                        "dob",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Phone Number *</Label>
                                  <Input
                                    placeholder="Enter phone number"
                                    value={subscriber.phone}
                                    onChange={(e) =>
                                      updateIndividualSubscriber(
                                        index,
                                        "phone",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Email Address *</Label>
                                  <Input
                                    type="email"
                                    placeholder="Enter email address"
                                    value={subscriber.email}
                                    onChange={(e) =>
                                      updateIndividualSubscriber(
                                        index,
                                        "email",
                                        e.target.value
                                      )
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
                                  <Label>Number of Shares *</Label>
                                  <Input
                                    type="number"
                                    placeholder="Enter number of shares"
                                    value={subscriber.shares}
                                    onChange={(e) =>
                                      updateIndividualSubscriber(
                                        index,
                                        "shares",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Are shares held in trust? *</Label>
                                  <RadioGroup
                                    value={subscriber.sharesInTrust}
                                    onValueChange={(value) =>
                                      updateIndividualSubscriber(
                                        index,
                                        "sharesInTrust",
                                        value
                                      )
                                    }
                                    className="flex gap-4"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="yes"
                                        id={`trust-yes-${index}`}
                                      />
                                      <Label htmlFor={`trust-yes-${index}`}>
                                        Yes
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="no"
                                        id={`trust-no-${index}`}
                                      />
                                      <Label htmlFor={`trust-no-${index}`}>
                                        No
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                </div>
                              </div>
                              {subscriber.sharesInTrust === "yes" && (
                                <div className="space-y-2">
                                  <Label>Name of Trust *</Label>
                                  <Input
                                    placeholder="Enter trust name"
                                    value={subscriber.trustName}
                                    onChange={(e) =>
                                      updateIndividualSubscriber(
                                        index,
                                        "trustName",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </CardContent>
                          </Card>

                          {/* Required Documents */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Upload className="h-5 w-5 text-blue-600" />
                                Required Documents
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <FileUpload
                                id={`subscriberDocs-${index}`}
                                label="Documents"
                                description="Upload (1) passport/identity card and (2) proof of residential address"
                                required={true}
                                multiple={true}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                onFileChange={(files) =>
                                  updateIndividualSubscriber(
                                    index,
                                    "docs",
                                    files
                                  )
                                }
                              />
                            </CardContent>
                          </Card>
                        </CardContent>
                      </Card>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addIndividualSubscriber}
                      className="w-full border-dashed bg-transparent border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Add Another Individual Subscriber
                    </Button>
                  </div>
                )}

                {/* Corporate Subscriber Details */}
                {formData.subscriberTypes.includes("corporation") && (
                  <div className="space-y-8">
                    {formData.corporateSubscribers.map((subscriber, index) => (
                      <Card key={index} className="border-2 border-green-100">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <Building2 className="h-5 w-5 text-green-600" />
                              Corporate Subscriber {index + 1}
                            </CardTitle>
                            {formData.corporateSubscribers.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeCorporateSubscriber(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Remove Subscriber
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                              <CardHeader>
                                <CardTitle>Corporate Information</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Full Corporate Name *</Label>
                                  <Input
                                    placeholder="Enter corporate name"
                                    value={subscriber.name}
                                    onChange={(e) =>
                                      updateCorporateSubscriber(
                                        index,
                                        "name",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Country of Incorporation *</Label>
                                  <Input
                                    placeholder="Enter country"
                                    value={subscriber.country}
                                    onChange={(e) =>
                                      updateCorporateSubscriber(
                                        index,
                                        "country",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Website Address *</Label>
                                  <Input
                                    type="url"
                                    placeholder="https://www.example.com"
                                    value={subscriber.website}
                                    onChange={(e) =>
                                      updateCorporateSubscriber(
                                        index,
                                        "website",
                                        e.target.value
                                      )
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
                                  <Label>Registered Office Address *</Label>
                                  <Textarea
                                    placeholder="Enter registered office address"
                                    value={subscriber.address}
                                    onChange={(e) =>
                                      updateCorporateSubscriber(
                                        index,
                                        "address",
                                        e.target.value
                                      )
                                    }
                                    rows={3}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Authorized Person&apos;s Name *</Label>
                                  <Input
                                    placeholder="Enter authorized person's full name"
                                    value={subscriber.authorizedPerson}
                                    onChange={(e) =>
                                      updateCorporateSubscriber(
                                        index,
                                        "authorizedPerson",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Number of Shares *</Label>
                                  <Input
                                    type="number"
                                    placeholder="Enter number of shares"
                                    value={subscriber.shares}
                                    onChange={(e) =>
                                      updateCorporateSubscriber(
                                        index,
                                        "shares",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Required Documents */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Upload className="h-5 w-5 text-blue-600" />
                                Required Documents
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <FileUpload
                                  id={`corporateAuthDocs-${index}`}
                                  label="Power of Attorney or Board Resolution"
                                  description="Upload notarized power of attorney or board resolution"
                                  required={true}
                                  accept=".pdf,.doc,.docx"
                                  onFileChange={(files) =>
                                    updateCorporateSubscriber(
                                      index,
                                      "authDocs",
                                      files
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <FileUpload
                                  id={`corporatePassportDocs-${index}`}
                                  label="Authorized Person's Passport/ID"
                                  description="Upload notarized passport/ID of authorized person"
                                  required={true}
                                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                  onFileChange={(files) =>
                                    updateCorporateSubscriber(
                                      index,
                                      "passportDocs",
                                      files
                                    )
                                  }
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </CardContent>
                      </Card>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addCorporateSubscriber}
                      className="w-full border-dashed bg-transparent border-green-300 text-green-600 hover:bg-green-50"
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      Add Another Corporate Subscriber
                    </Button>
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
                {/* Directors Information */}
                {formData.directors.map((director, index) => (
                  <Card key={index} className="border-2 border-purple-100">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-purple-600" />
                          Director {index + 1}
                        </CardTitle>
                        {formData.directors.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeDirector(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove Director
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
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
                                  updateDirector(
                                    index,
                                    "passport",
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
                              <Label>Residential Address *</Label>
                              <Textarea
                                placeholder="Enter full residential address"
                                value={director.address}
                                onChange={(e) =>
                                  updateDirector(
                                    index,
                                    "address",
                                    e.target.value
                                  )
                                }
                                rows={3}
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
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addDirector}
                  className="w-full border-dashed bg-transparent border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Add Another Director
                </Button>

                <Card>
                  <CardHeader>
                    <CardTitle>Registered Office</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label
                      htmlFor="registeredOffice"
                      className="text-gray-900 dark:text-gray-100 mb-2"
                    >
                      It is a requirement under the GMC Companies Act that all
                      companies must have a registered office address in the
                      GMC. A registered office address refers to the place where
                      all communications and notices to the company may be
                      addressed, and the place where the company&apos;s register
                      and records are kept. The requirement for a registered
                      office address will be waived for 12 months, commencing 1
                      May 2025 and until 30 April 2026 (Waiver Period). In the
                      interim, it will be sufficient to provide the Gelephu
                      Corporate Registration Office (GCRO) with an email address
                      which can receive communications and notices addressed to
                      the company. The company bears responsibility for all
                      matters and/or documents which must be maintained at the
                      registered office address during the Waiver Period. If the
                      company is unable to provide the GCRO with a registered
                      office address in GMC on/after 1 May 2026, the GCRO
                      reserves the power to take enforcement action against the
                      Company.
                    </Label>
                    <Label className="text-gray-900 dark:text-gray-100 space-y-2">
                      Please select one option:
                    </Label>
                    <RadioGroup
                      value={formData.registeredOfficeOption}
                      onValueChange={(value) =>
                        updateFormData("registeredOfficeOption", value)
                      }
                      className="mt-5"
                    >
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value="gmcAddress" id="gmcAddress" />
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="gmcAddress">
                            The Company&apos;s address in the GMC is at:
                          </Label>
                          <Input
                            placeholder="Enter GMC address"
                            value={formData.gmcAddress}
                            onChange={(e) =>
                              updateFormData("gmcAddress", e.target.value)
                            }
                            disabled={
                              formData.registeredOfficeOption !== "gmcAddress"
                            }
                          />
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value="waiverEmail" id="waiverEmail" />
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="waiverEmail">
                            During the Waiver Period, the Company&apos;s email
                            address is:
                          </Label>
                          <Input
                            placeholder="Enter email address"
                            value={formData.waiverEmail}
                            onChange={(e) =>
                              updateFormData("waiverEmail", e.target.value)
                            }
                            disabled={
                              formData.registeredOfficeOption !== "waiverEmail"
                            }
                          />
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-md">
                      What is the last day of the first financial year of the
                      proposed Company? (Day/Month)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={formData.financialYearEndOption}
                      onValueChange={(value) =>
                        updateFormData("financialYearEndOption", value)
                      }
                      className="space-y-3"
                    >
                      {[
                        { value: "31/03", label: "31 March" },
                        { value: "30/06", label: "30 June" },
                        { value: "30/09", label: "30 September" },
                        { value: "31/12", label: "31 December" },
                        { value: "other", label: "Other (please specify)" },
                      ].map((item) => (
                        <div
                          key={item.value}
                          className="flex items-center gap-3"
                        >
                          <RadioGroupItem value={item.value} id={item.value} />
                          <Label htmlFor={item.value}>{item.label}</Label>
                          {item.value === "other" &&
                            formData.financialYearEndOption === "other" && (
                              <Input
                                placeholder="DD/MM"
                                value={formData.financialYearEndOther}
                                onChange={(e) =>
                                  updateFormData(
                                    "financialYearEndOther",
                                    e.target.value
                                  )
                                }
                                className="w-32"
                              />
                            )}
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Beneficial Owners Section */}
            <section id="beneficial-owners" className="scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Information of the Applicants Beneficial Owner(s)
                </h2>
                <p className="text-gray-600">
                  Detailed information about beneficial ownership (25% or more
                  ownership)
                </p>
              </div>

              <div className="space-y-8">
                {/* Definition Card */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-blue-800">
                      What is a Beneficial Owner?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-blue-700 space-y-3">
                    <p>
                      <strong>Beneficial owner</strong> in relation to a
                      customer means:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        an individual who ultimately owns or controls (whether
                        direct or indirect ownership or control) more than 25%
                        of the shares or voting rights of the customer; or
                      </li>
                      <li>
                        otherwise exercises control over the management of the
                        customer.
                      </li>
                    </ul>
                    <p className="mt-3">
                      Beneficial owners may be corporate entities (e.g.
                      immediate holding and ultimate holding companies); or
                      individuals.
                    </p>
                  </CardContent>
                </Card>

                {/* Exemption Notice */}
                <Card className="border-amber-200 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-amber-800">
                      Important Notice
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-amber-700">
                    <p className="font-medium mb-2">
                      Please do not fill up this section if the Applicant is:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>a GMC government entity;</li>
                      <li>a foreign government entity;</li>
                      <li>
                        an entity listed on a stock exchange which is regulated
                        by an authority of a country or territory regulating the
                        provision of financial services;
                      </li>
                      <li>a GMC financial institution;</li>
                      <li>
                        a financial institution incorporated or established
                        outside of the GMC and subject to AML/CFT requirements
                        consistent with FATF standards; or
                      </li>
                      <li>
                        an investment vehicle the managers of which are GMC
                        financial institutions or financial institutions
                        incorporated or established outside of the GMC and
                        subject to Anti-Money Laundering / Combating Financing
                        of Terrorism (AML/CFT) requirements consistent with FATF
                        standards.
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Beneficial Owner Type Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Select the Applicant&apos;s Beneficial Owner Type *
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={formData.beneficialOwnerType}
                      onValueChange={(value) =>
                        updateFormData("beneficialOwnerType", value)
                      }
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="corporation" id="bo-corp" />
                        <div className="flex items-center gap-3">
                          <Building2 className="h-6 w-6 text-green-600" />
                          <div>
                            <Label
                              htmlFor="bo-corp"
                              className="cursor-pointer font-medium"
                            >
                              Corporate
                            </Label>
                            <p className="text-sm text-gray-600">
                              Corporate beneficial owner
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="individual" id="bo-ind" />
                        <div className="flex items-center gap-3">
                          <User className="h-6 w-6 text-blue-600" />
                          <div>
                            <Label
                              htmlFor="bo-ind"
                              className="cursor-pointer font-medium"
                            >
                              Individual
                            </Label>
                            <p className="text-sm text-gray-600">
                              Individual beneficial owner
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="none" id="bo-none" />
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-6 w-6 text-gray-600" />
                          <div>
                            <Label
                              htmlFor="bo-none"
                              className="cursor-pointer font-medium"
                            >
                              None
                            </Label>
                            <p className="text-sm text-gray-600">
                              No beneficial owner or exempted
                            </p>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Corporate Beneficial Owner Details */}
                {formData.beneficialOwnerType === "corporation" && (
                  <div className="space-y-8">
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-green-800">
                          Corporate Beneficial Owner Section
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-green-700">
                        <p>
                          As the Applicant&apos;s beneficial owner is a
                          corporation, please fill up this subsection.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Corporate Entities */}
                    {formData.beneficialOwnerCorporates.map(
                      (corporate, index) => (
                        <Card key={index} className="border-2 border-green-100">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-green-600" />
                                Corporate Entity {index + 1} - Details
                              </CardTitle>
                              {formData.beneficialOwnerCorporates.length >
                                1 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    removeBeneficialOwnerCorporate(index)
                                  }
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Remove Entity
                                </Button>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Entity Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <div className="space-y-2">
                                    <Label>Name of the entity *</Label>
                                    <Input
                                      placeholder="Enter entity name"
                                      value={corporate.entityName}
                                      onChange={(e) =>
                                        updateBeneficialOwnerCorporate(
                                          index,
                                          "entityName",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>
                                      Identification no./UEN of the entity *
                                    </Label>
                                    <Input
                                      placeholder="Enter identification number or UEN"
                                      value={corporate.identificationNumber}
                                      onChange={(e) =>
                                        updateBeneficialOwnerCorporate(
                                          index,
                                          "identificationNumber",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>
                                      Place of registration/incorporation of the
                                      entity *
                                    </Label>
                                    <Input
                                      placeholder="Enter place of registration/incorporation"
                                      value={corporate.placeOfRegistration}
                                      onChange={(e) =>
                                        updateBeneficialOwnerCorporate(
                                          index,
                                          "placeOfRegistration",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>
                                      Date of registration/incorporation of the
                                      entity *
                                    </Label>
                                    <Input
                                      type="date"
                                      value={corporate.dateOfRegistration}
                                      onChange={(e) =>
                                        updateBeneficialOwnerCorporate(
                                          index,
                                          "dateOfRegistration",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle>Address Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <div className="space-y-2">
                                    <Label>
                                      Entity&apos;s registered office
                                      address/address of place of business *
                                    </Label>
                                    <Textarea
                                      placeholder="Enter registered office address"
                                      value={corporate.registeredOfficeAddress}
                                      onChange={(e) =>
                                        updateBeneficialOwnerCorporate(
                                          index,
                                          "registeredOfficeAddress",
                                          e.target.value
                                        )
                                      }
                                      rows={3}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>
                                      Address of principal place of business (if
                                      different from above)
                                    </Label>
                                    <Textarea
                                      placeholder="Enter principal place of business address"
                                      value={corporate.principalPlaceOfBusiness}
                                      onChange={(e) =>
                                        updateBeneficialOwnerCorporate(
                                          index,
                                          "principalPlaceOfBusiness",
                                          e.target.value
                                        )
                                      }
                                      rows={3}
                                    />
                                  </div>
                                </CardContent>
                              </Card>
                            </div>

                            <Card>
                              <CardHeader>
                                <CardTitle>
                                  Ownership & Control Information
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <Label>
                                    Details on who are the shareholders of the
                                    entity / overall shareholding structure *
                                  </Label>
                                  <Textarea
                                    placeholder="Provide details on shareholders and shareholding structure"
                                    value={corporate.shareholderDetails}
                                    onChange={(e) =>
                                      updateBeneficialOwnerCorporate(
                                        index,
                                        "shareholderDetails",
                                        e.target.value
                                      )
                                    }
                                    rows={4}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>
                                    Information of nature of beneficial
                                    ownership or persons/group of persons having
                                    executive authority (e.g. more than 25% of
                                    ownership of the applicant) *
                                  </Label>
                                  <Textarea
                                    placeholder="Describe the nature of beneficial ownership and executive authority"
                                    value={corporate.natureOfOwnership}
                                    onChange={(e) =>
                                      updateBeneficialOwnerCorporate(
                                        index,
                                        "natureOfOwnership",
                                        e.target.value
                                      )
                                    }
                                    rows={4}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>
                                    Information on ownership and control
                                    structure of, or over the Applicant (e.g.
                                    organisation chart or structure) *
                                  </Label>
                                  <Textarea
                                    placeholder="Describe the ownership and control structure"
                                    value={corporate.ownershipStructure}
                                    onChange={(e) =>
                                      updateBeneficialOwnerCorporate(
                                        index,
                                        "ownershipStructure",
                                        e.target.value
                                      )
                                    }
                                    rows={4}
                                  />
                                </div>
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2">
                                    <Upload className="h-5 w-5 text-blue-600" />
                                    <Label className="text-lg font-semibold text-gray-900">
                                      Required Documents for Corporate
                                      Beneficial Owner
                                    </Label>
                                  </div>
                                  Please upload the following documents for each
                                  beneficial owner:
                                  <ul className="text-md list-disc list-inside mt-2 space-y-1">
                                    <li>
                                      The original or copy of the certificate of
                                      incorporation
                                    </li>
                                    <li>
                                      Business Profile Equivalent, Register of
                                      Members, Certificate of Incumbency, or
                                      Organisation Chart
                                    </li>
                                  </ul>
                                  <span className="block mt-2 italic text-gray-500">
                                    Note: If uploading copies, please provide
                                    notarised copies or certified true copies by
                                    an Advocate & Solicitor.
                                  </span>
                                  <FileUpload
                                    id={`corporateBeneficialOwnerDocs-${index}`}
                                    label="Corporate Documents *"
                                    description="Upload certificate of incorporation and business profile documents"
                                    required={true}
                                    multiple={true}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onFileChange={(files) =>
                                      updateBeneficialOwnerCorporate(
                                        index,
                                        "docs",
                                        files
                                      )
                                    }
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          </CardContent>
                        </Card>
                      )
                    )}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addBeneficialOwnerCorporate}
                      className="w-full border-dashed bg-transparent border-green-300 text-green-600 hover:bg-green-50"
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      Add Another Corporate Beneficial Owner
                    </Button>
                  </div>
                )}

                {/* Individual Beneficial Owner Details */}
                {formData.beneficialOwnerType === "individual" && (
                  <div className="space-y-8">
                    <Card className="border-blue-200 bg-blue-50">
                      <CardHeader>
                        <CardTitle className="text-blue-800">
                          Individual Beneficial Owner Section
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-blue-700">
                        <p>
                          As the Applicant&apos;s beneficial owner is an
                          individual, please fill up this subsection.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Individual Beneficial Owners */}
                    {formData.beneficialOwnerIndividuals.map(
                      (individual, index) => (
                        <Card key={index} className="border-2 border-blue-100">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                Individual {index + 1} - Details
                              </CardTitle>
                              {formData.beneficialOwnerIndividuals.length >
                                1 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    removeBeneficialOwnerIndividual(index)
                                  }
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Remove Individual
                                </Button>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Personal Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <div className="space-y-2">
                                    <Label>
                                      Full name of the beneficial owner *
                                    </Label>
                                    <Input
                                      placeholder="Enter full name"
                                      value={individual.fullName}
                                      onChange={(e) =>
                                        updateBeneficialOwnerIndividual(
                                          index,
                                          "fullName",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>
                                      Identity no./passport no. (including
                                      expiry date) *
                                    </Label>
                                    <Input
                                      placeholder="Enter identity/passport number with expiry date"
                                      value={individual.identityNumber}
                                      onChange={(e) =>
                                        updateBeneficialOwnerIndividual(
                                          index,
                                          "identityNumber",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Date of birth *</Label>
                                    <Input
                                      type="date"
                                      value={individual.dateOfBirth}
                                      onChange={(e) =>
                                        updateBeneficialOwnerIndividual(
                                          index,
                                          "dateOfBirth",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Nationality *</Label>
                                    <Input
                                      placeholder="Enter nationality"
                                      value={individual.nationality}
                                      onChange={(e) =>
                                        updateBeneficialOwnerIndividual(
                                          index,
                                          "nationality",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Occupation *</Label>
                                    <Input
                                      placeholder="Enter occupation"
                                      value={individual.occupation}
                                      onChange={(e) =>
                                        updateBeneficialOwnerIndividual(
                                          index,
                                          "occupation",
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
                                    <Label>
                                      Residential address / registered office
                                      address / address of place of business *
                                    </Label>
                                    <Textarea
                                      placeholder="Enter full address"
                                      value={individual.residentialAddress}
                                      onChange={(e) =>
                                        updateBeneficialOwnerIndividual(
                                          index,
                                          "residentialAddress",
                                          e.target.value
                                        )
                                      }
                                      rows={3}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Contact number *</Label>
                                    <Input
                                      placeholder="Enter contact number"
                                      value={individual.contactNumber}
                                      onChange={(e) =>
                                        updateBeneficialOwnerIndividual(
                                          index,
                                          "contactNumber",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Email address *</Label>
                                    <Input
                                      type="email"
                                      placeholder="Enter email address"
                                      value={individual.emailAddress}
                                      onChange={(e) =>
                                        updateBeneficialOwnerIndividual(
                                          index,
                                          "emailAddress",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </CardContent>
                              </Card>
                            </div>

                            <Card>
                              <CardHeader>
                                <CardTitle>
                                  Financial & Ownership Information
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <Label>
                                    Source of funds / source of wealth (e.g.
                                    personal or joint savings, employment
                                    income, sale of assets, inheritance or
                                    gifts, compensation, profits from business
                                    activities or investments) *
                                  </Label>
                                  <Textarea
                                    placeholder="Describe the source of funds and wealth"
                                    value={individual.sourceOfFunds}
                                    onChange={(e) =>
                                      updateBeneficialOwnerIndividual(
                                        index,
                                        "sourceOfFunds",
                                        e.target.value
                                      )
                                    }
                                    rows={4}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>
                                    Information of the nature of beneficial
                                    ownership or person having executive
                                    authority (e.g. more than 25% ownership of
                                    the Applicant) *
                                  </Label>
                                  <Textarea
                                    placeholder="Describe the nature of beneficial ownership and executive authority"
                                    value={individual.natureOfOwnership}
                                    onChange={(e) =>
                                      updateBeneficialOwnerIndividual(
                                        index,
                                        "natureOfOwnership",
                                        e.target.value
                                      )
                                    }
                                    rows={4}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>
                                    Information on ownership and control
                                    structure of, or over the Applicant (e.g.
                                    organisation chart or structure) *
                                  </Label>
                                  <Textarea
                                    placeholder="Describe the ownership and control structure"
                                    value={individual.ownershipStructure}
                                    onChange={(e) =>
                                      updateBeneficialOwnerIndividual(
                                        index,
                                        "ownershipStructure",
                                        e.target.value
                                      )
                                    }
                                    rows={4}
                                  />
                                </div>
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2">
                                    <Upload className="h-5 w-5 text-blue-600" />
                                    <Label className="text-lg font-semibold text-gray-900">
                                      Required Documents for Individual
                                      Beneficial Owner
                                    </Label>
                                  </div>
                                  Please upload the following documents for each
                                  beneficial owner:
                                  <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>
                                      The original or copy of the
                                      individual&apos;s Identity Card / Passport
                                    </li>
                                    <li>
                                      Proof of residential address (e.g.,
                                      utilities or telephone bill)
                                    </li>
                                  </ul>
                                  <span className="block mt-2 italic text-gray-500">
                                    Note: If uploading copies, please provide
                                    notarised copies or certified true copies by
                                    an Advocate & Solicitor.
                                  </span>
                                  <FileUpload
                                    id={`individualBeneficialOwnerDocs-${index}`}
                                    label="Individual Documents *"
                                    description="Upload identity card/passport and proof of residential address"
                                    required={true}
                                    multiple={true}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onFileChange={(files) =>
                                      updateBeneficialOwnerIndividual(
                                        index,
                                        "docs",
                                        files
                                      )
                                    }
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          </CardContent>
                        </Card>
                      )
                    )}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addBeneficialOwnerIndividual}
                      className="w-full border-dashed bg-transparent border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Add Another Individual Beneficial Owner
                    </Button>
                  </div>
                )}

                {/* No Beneficial Owner Confirmation */}
                {formData.beneficialOwnerType === "none" && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Confirmed:</strong> No beneficial owners with 25%
                      or more ownership/control, or the applicant falls under
                      the exempted categories.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </section>

            {/* PEP Information Section */}
            <section id="pep" className="scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Information on Politically Exposed Persons (PEP)
                </h2>
                <p className="text-gray-600">
                  Politically Exposed Person information
                </p>
              </div>

              <div className="space-y-8">
                {/* PEP Definition Card */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-blue-800">
                      What is a Politically Exposed Person (PEP)?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-blue-700 space-y-2">
                    <p>A Politically Exposed Person (PEP) includes:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        A person who is or has been entrusted with any prominent
                        public function in GMC, a country or territory outside
                        GMC, or by an international organization at present;
                      </li>
                      <li>
                        A person who has been entrusted with any prominent
                        public function in GMC, a country or territory outside
                        of the GMC, or by an international organisation who has
                        stepped down from his prominent public function;
                      </li>
                      <li>
                        An immediate family member or a close associate of a
                        politically exposed person or a politically exposed
                        person who has stepped down.
                      </li>
                    </ul>
                    A &ldquo;close associate&ldquo; of a PEP means a natural
                    person who is closely connected to a PEP either socially or
                    professionally, including:
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-1">
                      <li>
                        An immediate family member (spouse, child, adopted
                        child, step child, sibling, or parent) of a politically
                        exposed person;
                      </li>
                      <li>
                        A natural person that the PEP may have significant
                        influence over due to the level of exposure to the PEP.
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* PEP Status Declaration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="h-5 w-5 text-purple-600" />
                      PEP Status Declaration
                    </CardTitle>
                    <CardDescription>
                      Are the Applicant, agent, beneficial owner, or any party
                      connected to the Applicant a Politically Exposed Person
                      (PEP)?
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
                            <p className="text-sm text-gray-600">
                              No PEP status
                            </p>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* PEP Details Section */}
                {formData.isPEP === "yes" && (
                  <div className="space-y-8">
                    <Card className="border-amber-200 bg-amber-50">
                      <CardHeader>
                        <CardTitle className="text-amber-800">
                          PEP Details Required
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-amber-700">
                        <p>
                          Additional information is required for PEP status
                          verification. Please provide details for each PEP
                          below.
                        </p>
                      </CardContent>
                    </Card>

                    {/* PEP Individuals */}
                    {formData.pepIndividuals.map((pep, index) => (
                      <Card key={index} className="border-2 border-amber-100">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <User className="h-5 w-5 text-amber-600" />
                              PEP {index + 1} - Details
                            </CardTitle>
                            {formData.pepIndividuals.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removePEPIndividual(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Remove PEP
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                              <CardHeader>
                                <CardTitle>PEP Information</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Name of the PEP *</Label>
                                  <Input
                                    placeholder="Enter full name of the PEP"
                                    value={pep.name}
                                    onChange={(e) =>
                                      updatePEPIndividual(
                                        index,
                                        "name",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>
                                    Country of prominent public function *
                                  </Label>
                                  <Input
                                    placeholder="Enter country"
                                    value={pep.country}
                                    onChange={(e) =>
                                      updatePEPIndividual(
                                        index,
                                        "country",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>
                                    Nature of prominent public function *
                                  </Label>
                                  <Textarea
                                    placeholder="Describe the nature of the public function (e.g., domestic PEP, foreign PEP, or PEP of an international organisation)"
                                    value={pep.natureOfFunction}
                                    onChange={(e) =>
                                      updatePEPIndividual(
                                        index,
                                        "natureOfFunction",
                                        e.target.value
                                      )
                                    }
                                    rows={4}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Period of PEP status *</Label>
                                  <Input
                                    placeholder="Enter period (e.g., 2010-2015)"
                                    value={pep.period}
                                    onChange={(e) =>
                                      updatePEPIndividual(
                                        index,
                                        "period",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle>
                                  Relationship and Financial Information
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <Label>
                                    Nature of PEP relationship with the
                                    Applicant *
                                  </Label>
                                  <Input
                                    placeholder="Enter relationship (e.g., self, family member, close associate, ultimate beneficial owner)"
                                    value={pep.relationship}
                                    onChange={(e) =>
                                      updatePEPIndividual(
                                        index,
                                        "relationship",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Source of wealth *</Label>
                                  <Textarea
                                    placeholder="Describe the source of wealth"
                                    value={pep.sourceOfWealth}
                                    onChange={(e) =>
                                      updatePEPIndividual(
                                        index,
                                        "sourceOfWealth",
                                        e.target.value
                                      )
                                    }
                                    rows={4}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>
                                    Source of funds in the proposed business
                                    relationship *
                                  </Label>
                                  <Textarea
                                    placeholder="Describe the source of funds"
                                    value={pep.sourceOfFunds}
                                    onChange={(e) =>
                                      updatePEPIndividual(
                                        index,
                                        "sourceOfFunds",
                                        e.target.value
                                      )
                                    }
                                    rows={4}
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Document Upload for PEP */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Upload className="h-5 w-5 text-blue-600" />
                                Required Documents for PEP
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <Label className="text-lg font-semibold text-gray-900">
                                    Required Documents
                                  </Label>
                                </div>
                                <p className="text-sm text-gray-600">
                                  Please upload the following documents for each
                                  PEP:
                                  <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>Detailed PEP declaration form</li>
                                    <li>Source of wealth documentation</li>
                                    <li>Enhanced due diligence documents</li>
                                    <li>
                                      Relationship details (if family
                                      member/close associate of PEP)
                                    </li>
                                  </ul>
                                  <span className="block mt-2 italic text-gray-500">
                                    Note: Our compliance team may contact you
                                    separately to collect additional
                                    information.
                                  </span>
                                </p>
                                <FileUpload
                                  id={`pepDocs-${index}`}
                                  label="PEP Documents *"
                                  description="Upload PEP declaration, source of wealth, and due diligence documents"
                                  required={true}
                                  multiple={true}
                                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                  onFileChange={(files) =>
                                    updatePEPIndividual(
                                      index,
                                      "documents",
                                      files
                                    )
                                  }
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </CardContent>
                      </Card>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addPEPIndividual}
                      className="w-full border-dashed bg-transparent border-amber-300 text-amber-600 hover:bg-amber-50"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Add Another PEP
                    </Button>
                  </div>
                )}

                {/* No PEP Confirmation */}
                {formData.isPEP === "no" && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Confirmed:</strong> No PEP status declared for any
                      parties involved in this application.
                    </AlertDescription>
                  </Alert>
                )}
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
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      Business Entity / Representative of Business Entity
                      Declaration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="space-y-4 text-sm text-gray-700">
                        <p>
                          The person designated below is to declare that the
                          information provided in this form is true and correct,
                          and that he/she agrees to all the terms stated in this
                          document, including the data protection section at the
                          start of this document.
                        </p>
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
                        declare that the information provided is true and
                        correct. I agree to the terms of this form, including
                        any data protection issues (as stated at the front of
                        the form). Your response of &ldquo;yes&ldquo; below acts
                        as an e-signature as confirmation of the above.
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                      <div className="space-y-2">
                        <Label htmlFor="declarantName">
                          Name of Business Entity / Representative of Business
                          Entity *
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
                        <Label htmlFor="declarantID">
                          Identity No./Passport No. of Declarant *
                        </Label>
                        <Input
                          id="declarantID"
                          placeholder="Enter ID or passport number"
                          value={formData.declarantID}
                          onChange={(e) =>
                            updateFormData("declarantID", e.target.value)
                          }
                          className="mt-5"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Special Services Section */}
            <section id="special-services" className="scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Special Unique Entity Number
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
                    <CardDescription className="mt-5">
                      The GMC Unique Entity Number (UEN) is a 9-digit company
                      identification code in the format XnnnnnnnY, where:
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
                        <li>
                          X represents the entity type (e.g., &ldquo;A&ldquo;
                          for typical incorporated company, &ldquo;F&ldquo; for
                          filing agent)
                        </li>
                        <li>
                          The middle 7 digits (nnnnnnn) are pseudorandomly
                          generated
                        </li>
                        <li>Y is a checksum letter for error detection</li>
                      </ul>
                      <p className="mt-2 text-sm text-gray-600">
                        For example, a typical incorporated company might have a
                        UEN like A3251384P. <br />
                        Entities can choose a &ldquo;Special UEN&ldquo; to
                        choose the middle 7 digits (nnnnnnn) by paying a $3,000
                        fee, with some restrictions on the number sequence to
                        maintain system integrity. The &ldquo;X&ldquo; and
                        &ldquo;Y&ldquo; cannot be changed and are generated
                        based on the entity type and the chosen digits,
                        respectively.
                      </p>
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
                              Yes, I want to choose a Special UEN
                            </Label>
                            <p className="text-sm text-gray-600">
                              The GCRO will apply a one-time fee of USD 3,000
                              for a Special UEN
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
                              No, I want to be randomly assigned a UEN
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
                            Preferred Special UEN (7 digits only) *
                          </Label>
                          <Input
                            id="specialUEN"
                            placeholder="e.g., 1010101"
                            value={formData.specialUEN}
                            onChange={(e) =>
                              updateFormData("specialUEN", e.target.value)
                            }
                          />
                          <p className="text-sm text-gray-600">
                            Please specify your desired UEN number (7 digits
                            only), with the following restrictions:
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              <li>
                                The number cannot start with &ldquo;000&ldquo;
                                or &ldquo;001&ldquo;
                              </li>
                              <li>
                                The number cannot be made up of all repeated
                                digits (e.g., 8888888)
                              </li>
                              <li>
                                The number cannot be an ascending or descending
                                sequential pattern (e.g., 1234567 or 9876543)
                              </li>
                            </ul>
                            <span className="block mt-2">
                              An example of a valid Special UEN would be:
                              1010101
                            </span>
                            <span className="block mt-2 italic text-gray-500">
                              Note: The fee will be added to the incorporation
                              fee invoice. Special UEN requests are subject to
                              availability and approval. Alternative options
                              will be provided if the requested UEN is
                              unavailable.
                            </span>
                          </p>
                        </div>

                        <Alert className="border-amber-200 bg-amber-50">
                          <Info className="h-4 w-4 text-amber-600" />
                          <AlertDescription className="text-amber-800">
                            <strong>Special UEN Service:</strong>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                              <li>
                                Additional processing fee of USD 3,000 applies
                              </li>
                              <li>Subject to availability and approval</li>
                              <li>May extend processing time</li>
                              <li>
                                Alternative options will be provided if
                                requested UEN is unavailable
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
                      <p className="text-sm text-gray-600 mt-5">
                        Digital Kidu (DK) Bank is the appointed bank which will
                        serve the needs of all corporate needs in the GMC. Once
                        your proposed company is incorporated, DK Bank will be
                        able to assist with the opening of a corporate bank
                        account for the proposed Company, as well as the opening
                        of individual bank accounts for its directors.
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        To facilitate the bank account opening process, you have
                        the option to authorize the Gelephu Corporate
                        Registration Office (GCRO) to share the relevant bank
                        account opening information with DK Bank.
                      </p>
                      <p className="mt-4 font-medium text-gray-900">
                        DATA PROTECTION NOTICE
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        The GCRO may collect, use and/or disclose personal data
                        provided by you through (i) this incorporation form (in
                        previous sections) and (ii) this additional annex for
                        bank account opening, for the purposes of providing
                        services to you and/or in the ordinary course of our
                        work.
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        The GCRO will disclose such personal data to Digital
                        Kidu Limited (and its affiliates, third party service
                        providers and agents) (&ldquo;DK&ldquo;), for the sole
                        purposes of 1) opening a corporate bank account with DK,
                        and/or 2) opening individual bank accounts for the
                        directors associated with the proposed company.
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        Details about how we process personal data are set out
                        in our personal data protection policy (as updated from
                        time to time), a copy of which will be made available at{" "}
                        <a
                          href="https://gmc.bt/"
                          className="text-blue-600 underline"
                        >
                          https://gmc.bt/
                        </a>
                        . Where you provide us with any personal data of any
                        third party, we may collect, use and/or disclose the
                        same on the understanding that you have obtained all
                        necessary consents (as may be applicable) in accordance
                        with the laws of the GMC.
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        By selecting &ldquo;Yes&ldquo; below, the Applicant
                        provides its consent pursuant to the data protection
                        notice above, and indemnifies the GCRO from any damages
                        or harm which may arise from the transfer above.
                      </p>
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
                              Yes
                            </Label>
                            <p className="text-sm text-gray-600">
                              I authorize GCRO to assist with bank account
                              opening by sharing information with DK Bank
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
                              No
                            </Label>
                            <p className="text-sm text-gray-600">
                              I will handle bank account setup independently
                            </p>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {formData.wantsBankAccount === "yes" && (
                  <div className="space-y-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-green-600" />
                          Corporate Bank Account Opening
                        </CardTitle>
                        <CardDescription>
                          As you are applying to open a corporate bank account
                          with DK Limited, please confirm the following:
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id="bankAccountAgreement"
                            checked={formData.bankAccountAgreement}
                            onChange={(e) =>
                              updateFormData(
                                "bankAccountAgreement",
                                e.target.checked
                              )
                            }
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <Label
                            htmlFor="bankAccountAgreement"
                            className="text-sm cursor-pointer"
                          >
                            <span className="font-medium text-red-600">*</span>{" "}
                            To DK Limited, I/We would like to open a corporate
                            account with your bank. I/We agree to abide by DK
                            Limited&apos;s rules and amendments, in effect from
                            time to time.
                          </Label>
                        </div>

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
                                    value="local"
                                    id="account-local"
                                  />
                                  <Label
                                    htmlFor="account-local"
                                    className="cursor-pointer"
                                  >
                                    Local currency (BTN)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                                  <RadioGroupItem
                                    value="foreign"
                                    id="account-foreign"
                                  />
                                  <Label
                                    htmlFor="account-foreign"
                                    className="cursor-pointer"
                                  >
                                    Foreign currency (USD)
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
                                    Both
                                  </Label>
                                </div>
                              </RadioGroup>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">
                                Mode of Account Operation
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
                                    className="text-sm cursor-pointer"
                                  >
                                    Single: a single authorized signatory will
                                    both be the maker and checker of
                                    transactions
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                                  <RadioGroupItem
                                    value="joint-and"
                                    id="operation-joint-and"
                                  />
                                  <Label
                                    htmlFor="operation-joint-and"
                                    className="text-sm cursor-pointer"
                                  >
                                    Joint (And): makers and checkers must be
                                    different authorized signatories, and all
                                    authorized signatories designated as
                                    &ldquo;checkers&ldquo; must approve a
                                    transaction
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                                  <RadioGroupItem
                                    value="joint-any"
                                    id="operation-joint-any"
                                  />
                                  <Label
                                    htmlFor="operation-joint-any"
                                    className="text-sm cursor-pointer"
                                  >
                                    Joint (Any): any of the authorized
                                    signatories can be makers, checkers or both.
                                    In case of multiple checkers, one checker is
                                    sufficient to authorize a transaction
                                  </Label>
                                </div>
                              </RadioGroup>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>

                    {formData.operationMode === "single" && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-600" />
                            Single Operator - Corporate Account Opening
                          </CardTitle>
                          <CardDescription>
                            Please provide the relevant information of the
                            Authorized Signatory.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Signatory Information
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <Label>
                                    Authorized Signatory&apos;s Full Name *
                                  </Label>
                                  <Input
                                    placeholder="Enter full name"
                                    value={
                                      formData.authorizedSignatories[0]
                                        ?.fullName || ""
                                    }
                                    onChange={(e) =>
                                      updateAuthorizedSignatory(
                                        0,
                                        "fullName",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>
                                    Passport or Work Permit Number *
                                  </Label>
                                  <Input
                                    placeholder="Enter passport or work permit number"
                                    value={
                                      formData.authorizedSignatories[0]
                                        ?.passportNumber || ""
                                    }
                                    onChange={(e) =>
                                      updateAuthorizedSignatory(
                                        0,
                                        "passportNumber",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>
                                    Position in the Proposed Company *
                                  </Label>
                                  <Input
                                    placeholder="Enter position"
                                    value={
                                      formData.authorizedSignatories[0]
                                        ?.position || ""
                                    }
                                    onChange={(e) =>
                                      updateAuthorizedSignatory(
                                        0,
                                        "position",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Contact Phone Number *</Label>
                                  <Input
                                    placeholder="Enter contact phone number"
                                    value={
                                      formData.authorizedSignatories[0]
                                        ?.phoneNumber || ""
                                    }
                                    onChange={(e) =>
                                      updateAuthorizedSignatory(
                                        0,
                                        "phoneNumber",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Email Address *</Label>
                                  <Input
                                    type="email"
                                    placeholder="Enter email address"
                                    value={
                                      formData.authorizedSignatories[0]
                                        ?.emailAddress || ""
                                    }
                                    onChange={(e) =>
                                      updateAuthorizedSignatory(
                                        0,
                                        "emailAddress",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Signature Specimen
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2">
                                    <Upload className="h-5 w-5 text-blue-600" />
                                    <Label className="text-lg font-semibold text-gray-900">
                                      Signature Specimen *
                                    </Label>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    Please upload two signature specimens of the
                                    authorized representative.
                                    <span className="block mt-2 italic text-gray-500">
                                      Note: Accepted formats are PDF, DOC, DOCX,
                                      JPG, JPEG, PNG.
                                    </span>
                                  </p>
                                  <FileUpload
                                    id="single-signatory-docs"
                                    label="Signature Documents *"
                                    description="Upload two signature specimens"
                                    required={true}
                                    multiple={true}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onFileChange={(files) =>
                                      updateAuthorizedSignatory(
                                        0,
                                        "signatureDocs",
                                        files
                                      )
                                    }
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {(formData.operationMode === "joint-and" ||
                      formData.operationMode === "joint-any") && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            {formData.operationMode === "joint-and"
                              ? "Joint (And)"
                              : "Joint (Any)"}{" "}
                            Account Operation - Corporate Account Opening
                          </CardTitle>
                          <CardDescription>
                            {formData.operationMode === "joint-and"
                              ? 'Joint (And) account operation means that makers and checkers must be different authorized signatories, and all authorized signatories designated as "checkers" must approve a transaction.'
                              : "Joint (Any) account operation means that any of the authorized signatories can be makers, checkers or both. In case of multiple checkers, one checker is sufficient to authorize a transaction."}
                            <br />
                            Please provide the relevant information of the
                            Authorized Signatories (at least 2, up to 3).
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {formData.authorizedSignatories
                            .slice(0, 3)
                            .map((signatory, index) => (
                              <Card
                                key={index}
                                className="border-2 border-blue-100"
                              >
                                <CardHeader>
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                      <User className="h-5 w-5 text-blue-600" />
                                      Authorized Signatory {index + 1}{" "}
                                      {index < 2 ? "(Mandatory)" : "(Optional)"}
                                    </CardTitle>
                                    {index >= 2 && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          removeAuthorizedSignatory(index)
                                        }
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        Remove Signatory
                                      </Button>
                                    )}
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg">
                                          Signatory Information
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                          <Label>Full Name *</Label>
                                          <Input
                                            placeholder="Enter full name"
                                            value={signatory.fullName || ""}
                                            onChange={(e) =>
                                              updateAuthorizedSignatory(
                                                index,
                                                "fullName",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label>
                                            Passport or Work Permit Number *
                                          </Label>
                                          <Input
                                            placeholder="Enter passport or work permit number"
                                            value={
                                              signatory.passportNumber || ""
                                            }
                                            onChange={(e) =>
                                              updateAuthorizedSignatory(
                                                index,
                                                "passportNumber",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label>
                                            Position in the Proposed Company *
                                          </Label>
                                          <Input
                                            placeholder="Enter position"
                                            value={signatory.position || ""}
                                            onChange={(e) =>
                                              updateAuthorizedSignatory(
                                                index,
                                                "position",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label>Contact Phone Number *</Label>
                                          <Input
                                            placeholder="Enter contact phone number"
                                            value={signatory.phoneNumber || ""}
                                            onChange={(e) =>
                                              updateAuthorizedSignatory(
                                                index,
                                                "phoneNumber",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label>Email Address *</Label>
                                          <Input
                                            type="email"
                                            placeholder="Enter email address"
                                            value={signatory.emailAddress || ""}
                                            onChange={(e) =>
                                              updateAuthorizedSignatory(
                                                index,
                                                "emailAddress",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-lg">
                                          User Role and Signature
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                          <Label>User Role *</Label>
                                          <RadioGroup
                                            value={signatory.userRole || ""}
                                            onValueChange={(value) =>
                                              updateAuthorizedSignatory(
                                                index,
                                                "userRole",
                                                value
                                              )
                                            }
                                            className="space-y-3"
                                          >
                                            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                                              <RadioGroupItem
                                                value="maker"
                                                id={`role-maker-${index}`}
                                              />
                                              <Label
                                                htmlFor={`role-maker-${index}`}
                                                className="cursor-pointer"
                                              >
                                                Maker: initiates transactions
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                                              <RadioGroupItem
                                                value="checker"
                                                id={`role-checker-${index}`}
                                              />
                                              <Label
                                                htmlFor={`role-checker-${index}`}
                                                className="cursor-pointer"
                                              >
                                                Checker: approves transactions
                                              </Label>
                                            </div>
                                            {formData.operationMode ===
                                              "joint-any" && (
                                              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                                                <RadioGroupItem
                                                  value="both"
                                                  id={`role-both-${index}`}
                                                />
                                                <Label
                                                  htmlFor={`role-both-${index}`}
                                                  className="cursor-pointer"
                                                >
                                                  Both
                                                </Label>
                                              </div>
                                            )}
                                          </RadioGroup>
                                        </div>
                                        <div className="space-y-4">
                                          <div className="flex items-center gap-2">
                                            <Upload className="h-5 w-5 text-blue-600" />
                                            <Label className="text-lg font-semibold text-gray-900">
                                              Signature Specimen *
                                            </Label>
                                          </div>
                                          <p className="text-sm text-gray-600">
                                            Please upload two signature
                                            specimens of the authorized
                                            representative.
                                            <span className="block mt-2 italic text-gray-500">
                                              Note: Accepted formats are PDF,
                                              DOC, DOCX, JPG, JPEG, PNG.
                                            </span>
                                          </p>
                                          <FileUpload
                                            id={`signatory-docs-${index}`}
                                            label="Signature Documents *"
                                            description="Upload two signature specimens"
                                            required={true}
                                            multiple={true}
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                            onFileChange={(files) =>
                                              updateAuthorizedSignatory(
                                                index,
                                                "signatureDocs",
                                                files
                                              )
                                            }
                                          />
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}

                          {formData.authorizedSignatories.length < 3 && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={addAuthorizedSignatory}
                              className="w-full border-dashed bg-transparent border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                              <User className="h-4 w-4 mr-2" />
                              Add Another Authorized Signatory
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    {formData.wantsBankAccount === "yes" && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-600" />
                            Individual Account Opening
                          </CardTitle>
                          <CardDescription>
                            If there are any Directors for which you would like
                            to open individual bank accounts, you may do so
                            here.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Upload className="h-5 w-5 text-blue-600" />
                              <Label className="text-lg font-semibold text-gray-900">
                                Individual Bank Account Request Form
                              </Label>
                            </div>
                            <p className="text-sm text-gray-600">
                              Please download the individual bank account
                              request form{" "}
                              <a
                                href="https://gmc.bt/individual-bank-account-form"
                                className="text-blue-600 underline"
                              >
                                here
                              </a>{" "}
                              and re-upload a filled version.
                              <span className="block mt-2 italic text-gray-500">
                                Note: Accepted formats are PDF, DOC, DOCX, JPG,
                                JPEG, PNG.
                              </span>
                            </p>
                            <FileUpload
                              id="individual-account-docs"
                              label="Individual Account Documents *"
                              description="Upload the filled individual bank account request form"
                              required={true}
                              multiple={true}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onFileChange={(files) =>
                                updateFormData("individualAccountDocs", files)
                              }
                            />
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
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
                      Please share any suggestions, issues, or comments about
                      the registration process
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Your feedback helps us improve our services. Please share your thoughts, suggestions, or any issues you encountered during the registration process..."
                      value={formData.feedback}
                      onChange={(e) =>
                        updateFormData("feedback", e.target.value)
                      }
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
                      Thank you for taking the time to complete this
                      comprehensive registration form. Your application will be
                      reviewed by our team, and we will contact you within 5-7
                      business days with updates on your company registration
                      status.
                    </p>
                    <p className="mt-3">
                      If you have any urgent questions, please contact our
                      support team at{" "}
                      <a
                        href="mailto:support@gmc.bt"
                        className="underline font-medium"
                      >
                        gcro@gmc.bt
                      </a>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
