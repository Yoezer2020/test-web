"use client";

import type React from "react";
import { use } from "react";
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
  RefreshCw,
  Calculator,
  FileEdit,
  Globe,
  AlertCircle,
  Calendar,
  User,
} from "lucide-react";

interface RecommendationCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  actionText: string;
  onAction?: () => void;
  status?: "active" | "inactive" | "pending";
}

interface Props {
  params: Promise<{ companyId: string }>;
  //   searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const recommendations: RecommendationCard[] = [
  {
    id: "reinstatement",
    title: "Reinstatement",
    description: "Used to formally restore a company to good standing.",
    icon: RefreshCw,
    actionText: "File Now",
    status: "inactive",
  },
  {
    id: "tax-consultation",
    title: "Tax Consultation",
    description:
      "Receive a free, no-obligation, 30-minute consultation with a certified tax professional.",
    icon: Calculator,
    actionText: "Schedule Consultation",
  },
  {
    id: "amendment",
    title: "Amendment",
    description:
      "Filed if a company requires changes to membership, addresses or company name.",
    icon: FileEdit,
    actionText: "File Now",
  },
  {
    id: "website",
    title: "Website Builder",
    description:
      "Build a professional website without the hassle. Let us create it for you.",
    icon: Globe,
    actionText: "Learn More",
  },
];

export default function CompanyDashboardPage({ params }: Props) {
  // Use the 'use' hook to unwrap the Promise
  const resolvedParams = use(params);

  const handleCardAction = (cardId: string) => {
    // You can now access resolvedParams.companyId
    console.log(
      `Action clicked for: ${cardId} in company ${resolvedParams.companyId}`
    );
    // Add specific action logic here
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Company Status Alert */}
      <Card className="border-2 border-gray-300 bg-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-lg border border-gray-200">
                <AlertCircle className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  Your Business Status
                </h3>
                <p className="text-sm text-gray-600 mt-1 font-medium">
                  Company Inactive
                </p>
              </div>
            </div>
            <Button className="bg-black hover:bg-gray-800 text-white font-semibold shadow-md">
              Reinstate Your Company
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Section */}
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Recommendations
          </h2>
          <p className="text-gray-600 font-medium">
            Tailored suggestions for your business
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendations.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.id}
                className="hover:shadow-xl transition-all duration-300 border-2 border-gray-200 bg-white hover:border-gray-400"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gray-100 rounded-lg border border-gray-200">
                      <Icon className="h-6 w-6 text-gray-700" />
                    </div>
                    {card.status && (
                      <Badge
                        variant={
                          card.status === "inactive" ? "destructive" : "default"
                        }
                        className={`text-xs font-semibold ${
                          card.status === "inactive"
                            ? "bg-gray-800 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {card.status}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-gray-600 mb-6 min-h-[3rem] font-medium">
                    {card.description}
                  </CardDescription>
                  <Button
                    onClick={() => handleCardAction(card.id)}
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold shadow-md transition-all duration-200"
                    size="sm"
                  >
                    {card.actionText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-gray-200 bg-white shadow-lg">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="flex items-center gap-3 text-xl font-bold">
              <Calendar className="h-6 w-6 text-gray-700" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="font-bold text-sm text-gray-900">
                    Annual Report Due
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    Due in 15 days
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="border-gray-400 text-gray-700 font-semibold"
                >
                  Pending
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="font-bold text-sm text-gray-900">Tax Filing</p>
                  <p className="text-xs text-gray-600 font-medium">
                    Overdue by 3 days
                  </p>
                </div>
                <Badge className="bg-gray-800 text-white font-semibold">
                  Overdue
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 bg-white shadow-lg">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="flex items-center gap-3 text-xl font-bold">
              <User className="h-6 w-6 text-gray-700" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Document uploaded
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    Articles of Incorporation - 2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Profile updated
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    Company address changed - 1 day ago
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Payment processed
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    Annual fee payment - 3 days ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
