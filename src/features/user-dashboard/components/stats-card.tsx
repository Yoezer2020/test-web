"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Building2, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface StatsCardsProps {
  stats?: {
    total: number;
    completed: number;
    pending: number;
    incomplete: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const defaultStats = {
    total: 4,
    completed: 2,
    pending: 1,
    incomplete: 1,
  };

  const data = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Total Companies
              </p>
              <p className="text-3xl font-bold text-gray-900">{data.total}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <Building2 className="h-8 w-8 text-gray-700" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Completed
              </p>
              <p className="text-3xl font-bold text-green-600">
                {data.completed}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Pending
              </p>
              <p className="text-3xl font-bold text-yellow-600">
                {data.pending}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Incomplete
              </p>
              <p className="text-3xl font-bold text-red-600">
                {data.incomplete}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
