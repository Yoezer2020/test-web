"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionContainer } from "./section-container";

const businessPrograms = [
  {
    title: "GoBusiness",
    description:
      "Access resources and guides for licences, government assistance and more, tailored to your business needs.",
    image: "🏢",
    color:
      "from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20",
    href: "#",
  },
  {
    title: "SME Go Digital Programme",
    description:
      "Support to help your business go digital and adopt digital solutions.",
    image: "💻",
    color:
      "from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20",
    href: "#",
  },
  {
    title: "Essentials of Starting a Business",
    description:
      "Free online course to guide aspiring entrepreneurs on starting a business in Singapore.",
    image: "🚀",
    color:
      "from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20",
    href: "#",
  },
  {
    title: "Business Grants Portal",
    description:
      "Discover and apply for government grants to support your business growth and innovation.",
    image: "💰",
    color:
      "from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
    href: "#",
  },
];

export function EnablingBusiness() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= businessPrograms.length ? 0 : prev + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(0, businessPrograms.length - itemsPerPage)
        : Math.max(0, prev - itemsPerPage)
    );
  };

  const visiblePrograms = businessPrograms.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <SectionContainer size="xl" padding="lg">
      <Card className="border-0 bg-white/90 shadow-2xl backdrop-blur-sm dark:bg-gray-800/90">
        <CardContent className="p-8">
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Enabling your business
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover support and resources to grow your business.
            </p>
          </div>

          <div className="relative">
            <div className="mb-8 grid gap-6 md:grid-cols-3">
              {visiblePrograms.map((program, index) => (
                <Card
                  key={currentIndex + index}
                  className="group flex h-full flex-col border-2 border-gray-100 transition-all duration-300 hover:border-orange-200 hover:shadow-xl dark:border-gray-700 dark:hover:border-orange-700"
                >
                  <div
                    className={`h-48 bg-gradient-to-br ${program.color} flex items-center justify-center`}
                  >
                    <div className="text-6xl">{program.image}</div>
                  </div>
                  <CardContent className="flex h-full flex-col p-6">
                    <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                      {program.title}
                    </h3>
                    <p className="mb-6 flex-1 leading-relaxed text-gray-600 dark:text-gray-300">
                      {program.description}
                    </p>
                    <Button
                      variant="outline"
                      className="group/btn mt-auto w-full hover:border-orange-200 hover:bg-orange-50 dark:hover:border-orange-700 dark:hover:bg-orange-900/20"
                      asChild
                    >
                      <a href={program.href}>Visit site</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {Array.from({
                  length: Math.ceil(businessPrograms.length / itemsPerPage),
                }).map((_, index) => (
                  <button
                    key={index}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      Math.floor(currentIndex / itemsPerPage) === index
                        ? "bg-orange-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    onClick={() => setCurrentIndex(index * itemsPerPage)}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  disabled={
                    currentIndex + itemsPerPage >= businessPrograms.length
                  }
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionContainer>
  );
}
