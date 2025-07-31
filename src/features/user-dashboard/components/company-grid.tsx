"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  FileEdit,
  Calendar,
  TrendingUp,
  Building2,
  Plus,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

interface Company {
  id: string;
  name: string;
  type: "Company" | "Branch";
  registrationStatus: "registered" | "incomplete" | "underreview" | "payment";
  dateCreated: string;
  lastActivity: string;
  progress: number;
  uen?: string;
  description?: string;
  state?: string;
  orderNo?: string;
  email?: string;
}

interface CompanyGridProps {
  companies: Company[];
}

const getStatusColor = (status: Company["registrationStatus"]) => {
  switch (status) {
    case "registered":
      return "bg-green-100 text-green-800 border-green-200";
    case "underreview":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "payment":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "incomplete":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusIcon = (status: Company["registrationStatus"]) => {
  switch (status) {
    case "registered":
      return <CheckCircle2 className="h-4 w-4" />;
    case "incomplete":
      return <Clock className="h-4 w-4" />;
    case "incomplete":
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

export function CompanyGrid({ companies }: CompanyGridProps) {
  if (companies.length === 0) {
    return (
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-12 text-center">
          <div className="p-6 bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Building2 className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No Companies Found
          </h3>
          <p className="text-gray-600 mb-6 font-medium">
            No companies match your current search or filter criteria.
          </p>
          <Button className="bg-black hover:bg-gray-800 text-white font-semibold shadow-md">
            <Plus className="h-4 w-4 mr-2" />
            Register Your First Company
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Card
            key={company.id}
            className="border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-400 h-full flex flex-col"
          >
            <CardHeader className="pb-4 flex-shrink-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">
                      {company.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <Badge
                      variant="outline"
                      className="border-gray-300 text-gray-700 text-xs font-semibold mb-2"
                    >
                      {company.type}
                    </Badge>
                  </div>
                </div>
                <Badge
                  className={`${getStatusColor(
                    company.registrationStatus
                  )} text-xs font-semibold flex items-center gap-1`}
                >
                  {getStatusIcon(company.registrationStatus)}
                  {company.registrationStatus.charAt(0).toUpperCase() +
                    company.registrationStatus.slice(1)}
                </Badge>
              </div>

              <CardTitle className="text-lg font-bold text-gray-900 mb-2">
                {company.name}
              </CardTitle>
              {company.uen && (
                <p className="text-sm text-gray-600 font-medium">
                  UEN: {company.uen}
                </p>
              )}
              {company.state && (
                <p className="text-sm text-gray-600 font-medium">
                  State: {company.state}
                </p>
              )}
            </CardHeader>

            <CardContent className="pt-0 flex-grow flex flex-col">
              <CardDescription className="text-sm text-gray-600 mb-4 min-h-[2.5rem] font-medium">
                {company.description}
              </CardDescription>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Registration Progress
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {company.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      company.progress === 100
                        ? "bg-green-500"
                        : company.progress >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${company.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Company Details */}
              <div className="space-y-2 mb-6 flex-grow">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">
                    Created:{" "}
                    {new Date(company.dateCreated).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span className="font-medium">
                    Last Activity:{" "}
                    {new Date(company.lastActivity).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                {company.registrationStatus === "registered" ? (
                  <Link
                    href={
                      company.type === "Company"
                        ? `/company-dashboard`
                        : `/branch-dashboard`
                    }
                    className="flex-1"
                  >
                    <Button className="w-full bg-black hover:bg-gray-800 text-white font-semibold shadow-md transition-all duration-200">
                      <Eye className="h-4 w-4 mr-2" />
                      View {company.type === "Company" ? "Company" : "Branch"}
                    </Button>
                  </Link>
                ) : company.registrationStatus === "payment" ? (
                  <Link
                    href={
                      company.type === "Company"
                        ? `/payment-page`
                        : `/branch-payment-page`
                    }
                    className="flex-1"
                  >
                    <Button className="w-full bg-black hover:bg-gray-800 text-white font-semibold shadow-md transition-all duration-200">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Make Payment
                    </Button>
                  </Link>
                ) : (
                  <Link
                    href={
                      company.type === "Company"
                        ? `/register-company`
                        : `/register-company-branch`
                    }
                    className="flex-1"
                  >
                    <Button className="w-full bg-black hover:bg-gray-800 text-white font-semibold shadow-md transition-all duration-200">
                      <FileEdit className="h-4 w-4 mr-2" />
                      Complete{" "}
                      {company.type === "Company" ? "Company" : "Branch"}{" "}
                      Registration
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
