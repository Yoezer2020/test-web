"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { SearchResults, type EntityData } from "./search-results";
import { SectionContainer } from "./section-container";

// Updated dummy data with FSL entities
const dummyEntities: EntityData[] = [
  {
    id: "1",
    entityName: "DIGITAL INNOVATIONS PTE. LTD.",
    uen: "202301234A",
    entityStatus: "Registered",
    address: "1 Marina Bay, #20-01, Singapore 018989",
    registeredDate: "2023-01-15",
    entityType: "Private Company Limited by Shares",
    businessActivity: "Software Development and IT Services",
    licenses: "None",
  },
  {
    id: "2",
    entityName: "GCRO FINANCIAL SERVICES LTD.",
    uen: "202205678B",
    entityStatus: "Registered",
    address: "Financial District, Thimphu, Bhutan",
    registeredDate: "2022-05-20",
    entityType: "Branch",
    businessActivity: "Financial Services and Investment Management",
    licenses: "Financial Services License",
    fslNumber: "FSL-2022-001",
    dateOfFSLIssue: "2022-06-01",
    firmContactDetails: {
      email: "contact@gcrofinancial.bt",
      phone: "+975-2-123456",
      address: "GMC Building, Floor 3, Thimphu 11001",
    },
    regulatedActivities: [
      "Investment Management",
      "Securities Trading",
      "Financial Advisory",
      "Custody Services",
    ],
    gfsoRestrictions: [
      "Maximum client investment limit of BTN 10 million",
      "Quarterly reporting required for high-risk transactions",
    ],
    keyIndividuals: {
      ceo: "Tenzin Wangchuk",
      boardDirectors: [
        "Karma Dorji (Chairman)",
        "Pema Lhamo",
        "Sonam Tshering",
      ],
      complianceOfficer: "Deki Choden",
    },
  },
  {
    id: "3",
    entityName: "HIMALAYAN INVESTMENT BANK",
    uen: "202109876C",
    entityStatus: "Registered",
    address: "Banking Square, Thimphu, Bhutan",
    registeredDate: "2021-09-10",
    entityType: "Private Company Limited by Shares",
    businessActivity: "Commercial Banking and Financial Services",
    licenses: "Financial Services License",
    fslNumber: "FSL-2021-005",
    dateOfFSLIssue: "2021-10-15",
    firmContactDetails: {
      email: "info@himalayanbank.bt",
      phone: "+975-2-987654",
      address: "Banking Square, Level 5, Thimphu 11001",
    },
    regulatedActivities: [
      "Commercial Banking",
      "Foreign Exchange",
      "Trade Finance",
      "Retail Banking",
      "Corporate Banking",
    ],
    keyIndividuals: {
      ceo: "Ugyen Tshering",
      boardDirectors: [
        "Jigme Namgyal (Chairman)",
        "Chimi Lhamo",
        "Norbu Wangdi",
        "Sangay Choden",
      ],
      complianceOfficer: "Tashi Penjor",
    },
  },
  {
    id: "4",
    entityName: "TECH SOLUTIONS BHUTAN PTE. LTD.",
    uen: "202312345D",
    entityStatus: "Registered",
    address: "IT Park, Thimphu, Bhutan",
    registeredDate: "2023-12-01",
    entityType: "Private Company Limited by Shares",
    businessActivity: "Information Technology and Software Solutions",
    licenses: "None",
  },
  {
    id: "5",
    entityName: "DRAGON CAPITAL MANAGEMENT",
    uen: "202011111E",
    entityStatus: "Deregistered",
    address: "Former Financial Center, Thimphu",
    registeredDate: "2020-03-15",
    entityType: "Branch",
    businessActivity: "Asset Management and Investment Services",
    licenses: "Financial Services License",
    fslNumber: "FSL-2020-003",
    dateOfFSLIssue: "2020-04-01",
    firmContactDetails: {
      email: "legacy@dragoncapital.bt",
      phone: "+975-2-555555",
      address: "Closed - Former operations in Thimphu",
    },
    regulatedActivities: ["Asset Management", "Portfolio Management"],
    gfsoRestrictions: ["License suspended - No active operations permitted"],
    keyIndividuals: {
      ceo: "Former CEO - Kinley Dorji",
      complianceOfficer: "Former Officer - Pelden Lhamo",
    },
  },
];

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<EntityData[]>([]);
  const [activeTab, setActiveTab] = useState("entity");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filtered = dummyEntities.filter(
        (entity) =>
          entity.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entity.uen.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
    setHasSearched(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SectionContainer size="xl" padding="lg">
      <Card className="hover:shadow-3xl border-2 border-gray-200 bg-white/95 shadow-2xl backdrop-blur-sm transition-all duration-300 dark:border-white/20 dark:bg-gray-800/95">
        <CardHeader className="pb-6 text-center sm:pb-8">
          <CardTitle className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            Search for business information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:space-y-6 sm:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid h-auto w-full grid-cols-2 border bg-gray-100 sm:grid-cols-4 dark:border-white/10 dark:bg-gray-700">
              <TabsTrigger
                value="entity"
                className="py-2 text-xs transition-colors hover:bg-gray-200 data-[state=active]:bg-gray-900 data-[state=active]:text-white sm:py-3 sm:text-sm dark:hover:bg-gray-600 dark:data-[state=active]:bg-white dark:data-[state=active]:text-gray-900"
              >
                Entity
              </TabsTrigger>
              {/* <TabsTrigger
                value='industry'
                className='py-2 text-xs transition-colors hover:bg-gray-200 data-[state=active]:bg-gray-900 data-[state=active]:text-white sm:py-3 sm:text-sm dark:hover:bg-gray-600 dark:data-[state=active]:bg-white dark:data-[state=active]:text-gray-900'
              >
                Industry
              </TabsTrigger>
              <TabsTrigger
                value='people'
                className='py-2 text-xs transition-colors hover:bg-gray-200 data-[state=active]:bg-gray-900 data-[state=active]:text-white sm:py-3 sm:text-sm dark:hover:bg-gray-600 dark:data-[state=active]:bg-white dark:data-[state=active]:text-gray-900'
              >
                People
              </TabsTrigger>
              <TabsTrigger
                value='reserved'
                className='py-2 text-xs transition-colors hover:bg-gray-200 data-[state=active]:bg-gray-900 data-[state=active]:text-white sm:py-3 sm:text-sm dark:hover:bg-gray-600 dark:data-[state=active]:bg-white dark:data-[state=active]:text-gray-900'
              >
                Reserved
              </TabsTrigger> */}
            </TabsList>

            <TabsContent value="entity" className="space-y-4 sm:space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 sm:left-4 sm:h-5 sm:w-5" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter entity name or UEN to begin search"
                    className="rounded-xl border-2 border-gray-200 py-3 pl-10 text-base transition-colors hover:border-gray-400 focus:border-gray-900 sm:py-4 sm:pl-12 sm:text-lg dark:border-gray-600 dark:hover:border-gray-400 dark:focus:border-white"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="rounded-xl bg-gray-900 px-6 py-3 font-semibold whitespace-nowrap text-white transition-all duration-200 hover:scale-105 hover:bg-gray-800 sm:px-8 sm:py-4 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                >
                  Search
                </Button>
              </div>

              <p className="text-center text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </p>

              {hasSearched && (
                <div className="w-full space-y-4">
                  <SearchResults
                    results={searchResults}
                    searchQuery={searchQuery}
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="industry">
              <div className="py-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Industry search functionality coming soon...
                </p>
              </div>
            </TabsContent>

            <TabsContent value="people">
              <div className="py-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  People search functionality coming soon...
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reserved">
              <div className="py-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Reserved name search functionality coming soon...
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </SectionContainer>
  );
}
