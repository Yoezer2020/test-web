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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building2,
  Calendar,
  MapPin,
  Mail,
  FileText,
  Users,
  TrendingUp,
  Shield,
  Edit,
  Download,
  Share2,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
} from "lucide-react";

// Mock company data
const companyData = {
  id: "1",
  name: "DRUK GLOBAL LLC",
  type: "Company",
  registrationStatus: "registered",
  dateCreated: "2024-01-15",
  lastActivity: "2024-01-20",
  progress: 100,
  uen: "202401234A",
  description: "International trading and consulting services",
  state: "WY",
  orderNo: "223032493547",
  email: "cringnidupgmail.com",
  incorporationDate: "2024-01-15",
  registeredAddress: "1309 Coffeen Avenue, Sheridan, WY 82801",
  businessAddress: "1309 Coffeen Avenue, Sheridan, WY 82801",
  authorizedCapital: "$50,000",
  paidUpCapital: "$25,000",
};

// Mock directors data
const directors = [
  {
    id: "1",
    name: "John Smith",
    position: "Chief Executive Officer",
    nationality: "American",
    appointmentDate: "2024-01-15",
    email: "john.smith@drukglobal.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    position: "Chief Financial Officer",
    nationality: "Canadian",
    appointmentDate: "2024-01-15",
    email: "sarah.johnson@drukglobal.com",
    phone: "+1 (555) 234-5678",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

// Mock shareholders data
const shareholders = [
  {
    id: "1",
    name: "John Smith",
    shares: 15000,
    percentage: 60,
    shareClass: "Ordinary",
    certificateNo: "001",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    shares: 7500,
    percentage: 30,
    shareClass: "Ordinary",
    certificateNo: "002",
  },
  {
    id: "3",
    name: "Investment Holdings Ltd",
    shares: 2500,
    percentage: 10,
    shareClass: "Ordinary",
    certificateNo: "003",
  },
];

// Mock beneficial owners data
const beneficialOwners = [
  {
    id: "1",
    name: "John Smith",
    nationality: "American",
    ownershipPercentage: 60,
    controlType: "Direct Ownership",
    identificationNo: "123-45-6789",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    nationality: "Canadian",
    ownershipPercentage: 30,
    controlType: "Direct Ownership",
    identificationNo: "987-65-4321",
  },
];

// Mock team members data
const teamMembers = [
  {
    id: "1",
    name: "Michael Chen",
    position: "Operations Manager",
    department: "Operations",
    email: "michael.chen@drukglobal.com",
    joinDate: "2024-02-01",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Emily Rodriguez",
    position: "Marketing Specialist",
    department: "Marketing",
    email: "emily.rodriguez@drukglobal.com",
    joinDate: "2024-02-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "David Kim",
    position: "Business Analyst",
    department: "Strategy",
    email: "david.kim@drukglobal.com",
    joinDate: "2024-03-01",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "registered":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "payment":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "incomplete":
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "registered":
      return "bg-green-100 text-green-800 border-green-200";
    case "payment":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "incomplete":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function CompanyProfilePage() {
  // const resolvedParams = use(params);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Company Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{companyData.name}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30"
                    >
                      {companyData.type}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(companyData.registrationStatus)}
                      <span className="text-sm font-medium capitalize">
                        {companyData.registrationStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-lg max-w-2xl">
                {companyData.description}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      UEN
                    </label>
                    <p className="text-sm font-semibold">{companyData.uen}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Order Number
                    </label>
                    <p className="text-sm font-semibold">
                      {companyData.orderNo}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      State
                    </label>
                    <p className="text-sm font-semibold">{companyData.state}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Incorporation Date
                    </label>
                    <p className="text-sm font-semibold">
                      {companyData.incorporationDate}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-sm font-semibold">{companyData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Authorized Capital
                    </label>
                    <p className="text-sm font-semibold">
                      {companyData.authorizedCapital}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Paid Up Capital
                    </label>
                    <p className="text-sm font-semibold">
                      {companyData.paidUpCapital}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Last Activity
                    </label>
                    <p className="text-sm font-semibold">
                      {companyData.lastActivity}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Registered Address
                </label>
                <p className="text-sm font-semibold">
                  {companyData.registeredAddress}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Business Address
                </label>
                <p className="text-sm font-semibold">
                  {companyData.businessAddress}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Directors */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Directors
              </CardTitle>
              <CardDescription>
                Company directors and their information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {directors.map((director) => (
                  <div
                    key={director.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={director.avatar || "/placeholder.svg"}
                          alt={director.name}
                        />
                        <AvatarFallback>
                          {director.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{director.name}</h4>
                        <p className="text-sm text-gray-600">
                          {director.position}
                        </p>
                        <p className="text-xs text-gray-500">
                          Appointed: {director.appointmentDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {director.nationality}
                      </p>
                      <p className="text-xs text-gray-500">{director.email}</p>
                      <p className="text-xs text-gray-500">{director.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shareholders */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Shareholders
              </CardTitle>
              <CardDescription>
                Share ownership and distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Shares</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Certificate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shareholders.map((shareholder) => (
                    <TableRow key={shareholder.id}>
                      <TableCell className="font-medium">
                        {shareholder.name}
                      </TableCell>
                      <TableCell>
                        {shareholder.shares.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{shareholder.percentage}%</span>
                          <Progress
                            value={shareholder.percentage}
                            className="w-16 h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{shareholder.shareClass}</TableCell>
                      <TableCell>{shareholder.certificateNo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Members
              </CardTitle>
              <CardDescription>Company team and staff members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    <Avatar>
                      <AvatarImage
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                      />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{member.name}</h4>
                      <p className="text-xs text-gray-600">{member.position}</p>
                      <p className="text-xs text-gray-500">
                        {member.department}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        Joined: {member.joinDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Company Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Registration</span>
                <Badge
                  className={getStatusColor(companyData.registrationStatus)}
                >
                  {companyData.registrationStatus}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-semibold">
                  {companyData.progress}%
                </span>
              </div>
              <Progress value={companyData.progress} className="w-full" />
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Created: {companyData.dateCreated}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>State: {companyData.state}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="truncate">{companyData.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Beneficial Owners */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5" />
                Beneficial Owners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {beneficialOwners.map((owner) => (
                  <div key={owner.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{owner.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {owner.ownershipPercentage}%
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">
                        Nationality: {owner.nationality}
                      </p>
                      <p className="text-xs text-gray-600">
                        Control: {owner.controlType}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {owner.identificationNo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                View Financials
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
              >
                <Edit className="h-4 w-4 mr-2" />
                Update Information
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
