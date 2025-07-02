"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

interface ActionItem {
  id: string;
  title: string;
  description: string;
  companyName: string;
  orderNo: string;
  action: string;
  state?: string;
}

interface ActionItemsProps {
  items?: ActionItem[];
}

const defaultActionItems: ActionItem[] = [
  {
    id: "1",
    title: "REGISTERED AGENT EXPIRED",
    description: "Registered agent service has expired and needs renewal",
    companyName: "DRUK GLOBAL LLC",
    orderNo: "223032493547",
    action: "Renew Service",
    state: "WY",
  },
];

export function ActionItems({ items = defaultActionItems }: ActionItemsProps) {
  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle className="text-xl font-bold text-gray-900">
            Action Items
          </CardTitle>
          <Badge className="bg-black text-white font-semibold">
            {items.length}
          </Badge>
        </div>
        <CardDescription className="text-gray-600">
          Important actions that require your attention.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  {item.state && (
                    <p className="text-sm text-gray-600 mb-2">({item.state})</p>
                  )}
                  <p className="font-semibold text-gray-900 mb-3">
                    {item.companyName}
                  </p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Order No.</span>{" "}
                      {item.orderNo}
                    </p>
                    <p>
                      <span className="font-medium">Action.</span>{" "}
                      <span className="italic">{item.action}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
