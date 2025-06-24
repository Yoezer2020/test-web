"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Calendar,
  Phone,
  Mail,
  FileText,
  Shield,
  Users,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

export interface EntityData {
  id: string;
  entityName: string;
  uen: string;
  entityStatus: "Registered" | "Deregistered";
  address?: string;
  registeredDate: string;
  entityType: string;
  businessActivity: string;
  licenses: "None" | "Financial Services License";
  // FSL specific fields
  fslNumber?: string;
  dateOfFSLIssue?: string;
  firmContactDetails?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  regulatedActivities?: string[];
  gfsoRestrictions?: string[];
  keyIndividuals?: {
    ceo?: string;
    boardDirectors?: string[];
    complianceOfficer?: string;
  };
}

interface SearchResultsProps {
  results: EntityData[];
  searchQuery: string;
}

function EntityCard({ entity }: { entity: EntityData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFinancialInstitution =
    entity.licenses === "Financial Services License";

  return (
    <Card className="border-2 border-gray-200 bg-white transition-all duration-300 hover:border-gray-400 hover:shadow-lg dark:border-white/20 dark:bg-gray-800 dark:hover:border-white/40">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <h3 className="text-lg font-bold text-gray-900 transition-colors hover:text-gray-700 sm:text-xl dark:text-white dark:hover:text-gray-200">
            {entity.entityName}
          </h3>
          <div className="flex gap-2">
            <Badge
              variant={
                entity.entityStatus === "Registered" ? "default" : "secondary"
              }
              className={
                entity.entityStatus === "Registered"
                  ? "border bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-900 dark:text-green-200"
                  : "border bg-red-100 text-red-800 dark:border-red-700 dark:bg-red-900 dark:text-red-200"
              }
            >
              {entity.entityStatus}
            </Badge>
            {isFinancialInstitution && (
              <Badge className="border bg-blue-100 text-blue-800 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-200">
                <Shield className="mr-1 h-3 w-3" />
                FSL
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Common Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Building2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  UEN:
                </span>
                <span className="ml-2 text-sm text-gray-900 dark:text-white">
                  {entity.uen}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Entity Type:
                </span>
                <span className="ml-2 text-sm text-gray-900 dark:text-white">
                  {entity.entityType}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Registered:
                </span>
                <span className="ml-2 text-sm text-gray-900 dark:text-white">
                  {entity.registeredDate}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {entity.address && (
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Address:
                  </span>
                  <span className="ml-2 text-sm break-words text-gray-900 dark:text-white">
                    {entity.address}
                  </span>
                </div>
              </div>
            )}

            <div className="flex items-start gap-2">
              <Building2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Business Activity:
                </span>
                <span className="ml-2 text-sm break-words text-gray-900 dark:text-white">
                  {entity.businessActivity}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Licenses:
                </span>
                {entity.licenses === "None" ? (
                  <span className="ml-2 text-sm text-gray-900 dark:text-white">
                    None
                  </span>
                ) : (
                  <Button
                    variant="link"
                    className="ml-2 h-auto p-0 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Financial Services License
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Institution Additional Fields */}
        {isFinancialInstitution && (
          <>
            <Separator className="my-4" />

            <div className="flex items-center justify-between">
              <h4 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                <Shield className="h-4 w-4" />
                Financial Services License Details
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="mr-1 h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-1 h-4 w-4" />
                    Show More
                  </>
                )}
              </Button>
            </div>

            {isExpanded && (
              <div className="space-y-4 pt-2">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    {entity.fslNumber && (
                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          FSL Number:
                        </span>
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">
                          {entity.fslNumber}
                        </span>
                      </div>
                    )}

                    {entity.dateOfFSLIssue && (
                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Date of FSL Issue:
                        </span>
                        <span className="ml-2 text-sm text-gray-900 dark:text-white">
                          {entity.dateOfFSLIssue}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {entity.firmContactDetails && (
                      <div>
                        <span className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-400">
                          Firm Contact Details:
                        </span>
                        <div className="ml-2 space-y-1">
                          {entity.firmContactDetails.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-900 dark:text-white">
                                {entity.firmContactDetails.email}
                              </span>
                            </div>
                          )}
                          {entity.firmContactDetails.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-900 dark:text-white">
                                {entity.firmContactDetails.phone}
                              </span>
                            </div>
                          )}
                          {entity.firmContactDetails.address && (
                            <div className="flex items-start gap-2">
                              <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm break-words text-gray-900 dark:text-white">
                                {entity.firmContactDetails.address}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {entity.regulatedActivities &&
                  entity.regulatedActivities.length > 0 && (
                    <div>
                      <span className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-400">
                        Regulated Financial Services Activities:
                      </span>
                      <div className="ml-2 flex flex-wrap gap-2">
                        {entity.regulatedActivities.map((activity, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {entity.gfsoRestrictions &&
                  entity.gfsoRestrictions.length > 0 && (
                    <div>
                      <span className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-400">
                        GFSO-imposed Restrictions:
                      </span>
                      <div className="ml-2 space-y-1">
                        {entity.gfsoRestrictions.map((restriction, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 text-sm text-red-700 dark:text-red-400"
                          >
                            <span className="mt-1 text-red-500">•</span>
                            <span>{restriction}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {entity.keyIndividuals && (
                  <div>
                    <span className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4" />
                      Key Individuals:
                    </span>
                    <div className="ml-2 space-y-2">
                      {entity.keyIndividuals.ceo && (
                        <div>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            CEO:
                          </span>
                          <span className="ml-2 text-sm text-gray-900 dark:text-white">
                            {entity.keyIndividuals.ceo}
                          </span>
                        </div>
                      )}
                      {entity.keyIndividuals.boardDirectors &&
                        entity.keyIndividuals.boardDirectors.length > 0 && (
                          <div>
                            <span className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                              Board Directors:
                            </span>
                            <div className="ml-2 space-y-1">
                              {entity.keyIndividuals.boardDirectors.map(
                                (director, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-2 text-sm text-gray-900 dark:text-white"
                                  >
                                    <span className="mt-1 text-gray-400">
                                      •
                                    </span>
                                    <span>{director}</span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      {entity.keyIndividuals.complianceOfficer && (
                        <div>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Compliance Officer / MLRO:
                          </span>
                          <span className="ml-2 text-sm text-gray-900 dark:text-white">
                            {entity.keyIndividuals.complianceOfficer}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function SearchResults({ results, searchQuery }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="mb-2 text-gray-500 dark:text-gray-400">
          No results found
        </div>
        <div className="text-sm text-gray-400 dark:text-gray-500">
          Try adjusting your search terms or check the spelling
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Entity search result(s) - {results.length} matching registered entity
          record(s) for {searchQuery}
        </p>
      </div>

      <div className="space-y-4">
        {results.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>
    </div>
  );
}
