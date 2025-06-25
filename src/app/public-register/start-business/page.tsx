"use client";

import { useState, useEffect } from "react";
import { SectionContainer } from "@/components/layout/section-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, FileText, Users, Globe } from "lucide-react";
import { ExpressionOfInterestForm } from "@/features/public-register/start-business/components/expression-of-interest-form";

const steps = [
  {
    icon: FileText,
    title: "Expression of Interest",
    description: "Submit your initial business proposal",
    status: "current" as const,
  },
  {
    icon: Users,
    title: "Review Process",
    description: "Our team reviews your application",
    status: "upcoming" as const,
  },
  {
    icon: Building2,
    title: "Registration",
    description: "Complete your business registration",
    status: "upcoming" as const,
  },
  {
    icon: Globe,
    title: "Go Live",
    description: "Start operating your business",
    status: "upcoming" as const,
  },
];

export default function StartBusinessPage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = "/images/bhutanese-background.png"; // 👈 CHANGE THIS TO YOUR BACKGROUND IMAGE
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image Layer */}
      {imageLoaded && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/images/bhutanese-background.png')`, // 👈 CHANGE THIS TO YOUR BACKGROUND IMAGE
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "scroll",
          }}
        />
      )}

      {/* Overlay Layer */}
      <div className="absolute inset-0 z-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm" />

      {/* Content Layer */}
      <div className="relative z-10 py-8">
        <SectionContainer size="xl" padding="lg">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Start Your Business Journey
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Begin with an Expression of Interest to register your business
                entity in Bhutan
              </p>
            </div>

            {/* Progress Steps */}
            <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Registration Process
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Follow these steps to complete your business registration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center text-center p-4 rounded-lg border-2 transition-all duration-200 ${
                        step.status === "current"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white/50 dark:bg-gray-800/50"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-full mb-3 transition-all duration-200 ${
                          step.status === "current"
                            ? "bg-blue-500 text-white shadow-lg"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        <step.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Form */}
            <ExpressionOfInterestForm />
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
