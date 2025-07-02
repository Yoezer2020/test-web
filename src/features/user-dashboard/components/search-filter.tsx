"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: "all" | "completed" | "pending" | "incomplete";
  onFilterChange: (
    status: "all" | "completed" | "pending" | "incomplete"
  ) => void;
}

export function SearchFilter({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
}: SearchFilterProps) {
  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white border-gray-300 focus:border-black focus:ring-black"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => onFilterChange("all")}
              className={
                filterStatus === "all"
                  ? "bg-black text-white hover:bg-gray-800"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filterStatus === "completed" ? "default" : "outline"}
              onClick={() => onFilterChange("completed")}
              className={
                filterStatus === "completed"
                  ? "bg-black text-white hover:bg-gray-800"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
              size="sm"
            >
              Completed
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              onClick={() => onFilterChange("pending")}
              className={
                filterStatus === "pending"
                  ? "bg-black text-white hover:bg-gray-800"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
              size="sm"
            >
              Pending
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
