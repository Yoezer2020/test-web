"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Upload,
  FileText,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Download,
  Eye,
  Edit,
  Bell,
  Building2,
  Calculator,
  FileSpreadsheet,
  Shield,
} from "lucide-react";

interface Filing {
  id: string;
  type:
    | "annual-return"
    | "financial-statement"
    | "tax-return"
    | "audit-report"
    | "other";
  title: string;
  description: string;
  dueDate: string;
  status: "completed" | "pending" | "overdue" | "draft";
  filingYear: string;
  documents: FilingDocument[];
  fee: number;
  feeStatus: "paid" | "pending" | "overdue";
  completionPercentage: number;
  lastUpdated: string;
  submittedBy?: string;
  submissionDate?: string;
}

interface FilingDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: "uploaded" | "pending" | "rejected";
  required: boolean;
}

interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  required: boolean;
  uploaded: boolean;
  filingType: string[];
}

const mockFilings: Filing[] = [
  {
    id: "1",
    type: "annual-return",
    title: "Annual Return 2024",
    description: "Annual return filing for the year 2024",
    dueDate: "2024-12-31",
    status: "pending",
    filingYear: "2024",
    documents: [
      {
        id: "1",
        name: "Annual Return Form.pdf",
        type: "pdf",
        size: "2.4 MB",
        uploadDate: "2024-11-15",
        status: "uploaded",
        required: true,
      },
    ],
    fee: 350,
    feeStatus: "pending",
    completionPercentage: 60,
    lastUpdated: "2024-11-15",
  },
  {
    id: "2",
    type: "financial-statement",
    title: "Financial Statements 2023",
    description: "Audited financial statements for fiscal year 2023",
    dueDate: "2024-06-30",
    status: "completed",
    filingYear: "2023",
    documents: [
      {
        id: "2",
        name: "Balance Sheet 2023.pdf",
        type: "pdf",
        size: "1.8 MB",
        uploadDate: "2024-05-20",
        status: "uploaded",
        required: true,
      },
      {
        id: "3",
        name: "Income Statement 2023.pdf",
        type: "pdf",
        size: "1.2 MB",
        uploadDate: "2024-05-20",
        status: "uploaded",
        required: true,
      },
      {
        id: "4",
        name: "Cash Flow Statement 2023.pdf",
        type: "pdf",
        size: "0.9 MB",
        uploadDate: "2024-05-20",
        status: "uploaded",
        required: true,
      },
    ],
    fee: 500,
    feeStatus: "paid",
    completionPercentage: 100,
    lastUpdated: "2024-06-15",
    submittedBy: "Sarah Johnson",
    submissionDate: "2024-06-15",
  },
  {
    id: "3",
    type: "tax-return",
    title: "Corporate Tax Return 2023",
    description: "Annual corporate tax return filing",
    dueDate: "2024-04-15",
    status: "overdue",
    filingYear: "2023",
    documents: [],
    fee: 750,
    feeStatus: "overdue",
    completionPercentage: 0,
    lastUpdated: "2024-03-10",
  },
  {
    id: "4",
    type: "audit-report",
    title: "Independent Audit Report 2024",
    description: "Independent auditor's report for 2024",
    dueDate: "2024-08-31",
    status: "draft",
    filingYear: "2024",
    documents: [
      {
        id: "5",
        name: "Draft Audit Report.docx",
        type: "docx",
        size: "3.2 MB",
        uploadDate: "2024-07-15",
        status: "pending",
        required: true,
      },
    ],
    fee: 1200,
    feeStatus: "pending",
    completionPercentage: 25,
    lastUpdated: "2024-07-15",
  },
];

const requiredDocuments: RequiredDocument[] = [
  {
    id: "1",
    name: "Annual Return Form",
    description: "Completed annual return form with company details",
    required: true,
    uploaded: true,
    filingType: ["annual-return"],
  },
  {
    id: "2",
    name: "Balance Sheet",
    description: "Audited balance sheet for the fiscal year",
    required: true,
    uploaded: true,
    filingType: ["financial-statement", "annual-return"],
  },
  {
    id: "3",
    name: "Income Statement",
    description: "Profit and loss statement for the fiscal year",
    required: true,
    uploaded: true,
    filingType: ["financial-statement", "annual-return"],
  },
  {
    id: "4",
    name: "Cash Flow Statement",
    description: "Statement of cash flows for the fiscal year",
    required: true,
    uploaded: true,
    filingType: ["financial-statement"],
  },
  {
    id: "5",
    name: "Director's Report",
    description: "Report from the board of directors",
    required: true,
    uploaded: false,
    filingType: ["annual-return"],
  },
  {
    id: "6",
    name: "Auditor's Report",
    description: "Independent auditor's report and opinion",
    required: true,
    uploaded: false,
    filingType: ["financial-statement", "audit-report"],
  },
  {
    id: "7",
    name: "Tax Computation",
    description: "Corporate tax computation and calculations",
    required: true,
    uploaded: false,
    filingType: ["tax-return"],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "overdue":
      return "bg-red-100 text-red-800 border-red-200";
    case "draft":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "overdue":
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case "draft":
      return <Edit className="h-4 w-4 text-gray-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const getFilingTypeIcon = (type: string) => {
  switch (type) {
    case "annual-return":
      return <Building2 className="h-5 w-5 text-blue-600" />;
    case "financial-statement":
      return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
    case "tax-return":
      return <Calculator className="h-5 w-5 text-purple-600" />;
    case "audit-report":
      return <Shield className="h-5 w-5 text-orange-600" />;
    default:
      return <FileText className="h-5 w-5 text-gray-600" />;
  }
};

const getFeeStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "overdue":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getDaysUntilDue = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function AnnualFiling() {
  // const [filings, setFilings] = useState<Filing[]>(mockFilings);
  const [isNewFilingDialogOpen, setIsNewFilingDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");

  const upcomingFilings = mockFilings.filter((filing) => {
    const daysUntil = getDaysUntilDue(filing.dueDate);
    return daysUntil <= 30 && daysUntil >= 0 && filing.status !== "completed";
  });

  const overdueFilings = mockFilings.filter(
    (filing) => filing.status === "overdue"
  );
  const completedFilings = mockFilings.filter(
    (filing) => filing.status === "completed"
  );
  const totalFees = mockFilings.reduce((sum, filing) => sum + filing.fee, 0);
  const paidFees = mockFilings
    .filter((f) => f.feeStatus === "paid")
    .reduce((sum, filing) => sum + filing.fee, 0);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Annual Filing</h1>
          <p className="text-gray-600 mt-1">
            Manage annual returns, financial statements, and compliance filings
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog
            open={isNewFilingDialogOpen}
            onOpenChange={setIsNewFilingDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New Filing
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Filing</DialogTitle>
                <DialogDescription>
                  Start a new annual filing process
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Filing Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select filing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual-return">
                        Annual Return
                      </SelectItem>
                      <SelectItem value="financial-statement">
                        Financial Statements
                      </SelectItem>
                      <SelectItem value="tax-return">Tax Return</SelectItem>
                      <SelectItem value="audit-report">Audit Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Filing Year</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter filing description..." />
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => setIsNewFilingDialogOpen(false)}
                  >
                    Create Filing
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsNewFilingDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button className="bg-black hover:bg-gray-800">
            <Upload className="h-4 w-4 mr-2" />
            Upload Documents
          </Button>
        </div>
      </div>

      {/* Alert for Overdue Filings */}
      {overdueFilings.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Overdue Filings</h3>
                <p className="text-sm text-red-700">
                  You have {overdueFilings.length} overdue filing
                  {overdueFilings.length > 1 ? "s" : ""} that require immediate
                  attention.
                </p>
              </div>
              <Button size="sm" className="ml-auto bg-red-600 hover:bg-red-700">
                View Overdue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{upcomingFilings.length}</p>
                <p className="text-sm text-gray-600">Upcoming Filings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{completedFilings.length}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{overdueFilings.length}</p>
                <p className="text-sm text-gray-600">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  ${paidFees.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Fees Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="filings">All Filings</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingFilings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingFilings.map((filing) => {
                    const daysUntil = getDaysUntilDue(filing.dueDate);
                    return (
                      <div
                        key={filing.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          {getFilingTypeIcon(filing.type)}
                          <div>
                            <h4 className="font-semibold">{filing.title}</h4>
                            <p className="text-sm text-gray-600">
                              {filing.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getStatusColor(filing.status)}>
                                {filing.status}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Due in {daysUntil} day
                                {daysUntil !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium">
                              {filing.completionPercentage}% Complete
                            </span>
                            <Progress
                              value={filing.completionPercentage}
                              className="w-20 h-2"
                            />
                          </div>
                          <Button size="sm">Continue Filing</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No upcoming deadlines in the next 30 days
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium">
                        Financial Statements 2023 completed
                      </p>
                      <p className="text-xs text-gray-500">
                        Submitted by Sarah Johnson - 2 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium">
                        Annual Return Form uploaded
                      </p>
                      <p className="text-xs text-gray-500">
                        Document added to Annual Return 2024 - 5 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium">
                        Filing fee payment pending
                      </p>
                      <p className="text-xs text-gray-500">
                        Annual Return 2024 - 1 week ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fee Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Fees</span>
                    <span className="font-semibold">
                      ${totalFees.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Paid</span>
                    <span className="font-semibold text-green-600">
                      ${paidFees.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Outstanding</span>
                    <span className="font-semibold text-red-600">
                      ${(totalFees - paidFees).toLocaleString()}
                    </span>
                  </div>
                  <Separator />
                  <Progress
                    value={(paidFees / totalFees) * 100}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 text-center">
                    {Math.round((paidFees / totalFees) * 100)}% of fees paid
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="filings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Filings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filing</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFilings.map((filing) => {
                    const daysUntil = getDaysUntilDue(filing.dueDate);
                    return (
                      <TableRow key={filing.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {getFilingTypeIcon(filing.type)}
                            <div>
                              <p className="font-medium">{filing.title}</p>
                              <p className="text-sm text-gray-500">
                                {filing.description}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {filing.type.replace("-", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>{filing.filingYear}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{filing.dueDate}</p>
                            {daysUntil >= 0 &&
                              filing.status !== "completed" && (
                                <p className="text-xs text-gray-500">
                                  {daysUntil === 0
                                    ? "Due today"
                                    : `${daysUntil} days left`}
                                </p>
                              )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(filing.status)}
                            <Badge className={getStatusColor(filing.status)}>
                              {filing.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={filing.completionPercentage}
                              className="w-16 h-2"
                            />
                            <span className="text-xs">
                              {filing.completionPercentage}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">${filing.fee}</p>
                            <Badge
                              className={`text-xs ${getFeeStatusColor(
                                filing.feeStatus
                              )}`}
                            >
                              {filing.feeStatus}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Required Documents Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requiredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Checkbox checked={doc.uploaded} />
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-gray-600">
                          {doc.description}
                        </p>
                        <div className="flex gap-1 mt-1">
                          {doc.filingType.map((type) => (
                            <Badge
                              key={type}
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {type.replace("-", " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {doc.uploaded ? (
                        <>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </>
                      ) : (
                        <Button size="sm">
                          <Upload className="h-4 w-4 mr-1" />
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filing Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockFilings.map((filing) => {
                  const daysUntil = getDaysUntilDue(filing.dueDate);
                  return (
                    <Card
                      key={filing.id}
                      className="border-l-4 border-l-blue-500"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getFilingTypeIcon(filing.type)}
                            <Badge className={getStatusColor(filing.status)}>
                              {filing.status}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-500">
                            {filing.filingYear}
                          </span>
                        </div>
                        <h4 className="font-semibold mb-1">{filing.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {filing.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">
                              Due: {filing.dueDate}
                            </p>
                            {daysUntil >= 0 &&
                              filing.status !== "completed" && (
                                <p className="text-xs text-gray-500">
                                  {daysUntil === 0
                                    ? "Due today"
                                    : `${daysUntil} days left`}
                                </p>
                              )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">${filing.fee}</p>
                            <Badge
                              className={`text-xs ${getFeeStatusColor(
                                filing.feeStatus
                              )}`}
                            >
                              {filing.feeStatus}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
