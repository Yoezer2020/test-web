"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Upload,
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  Search,
  Plus,
  MoreHorizontal,
  FolderOpen,
  CheckCircle,
  Clock,
  X,
  File,
  FileSpreadsheet,
  FileImage,
  FileIcon as FilePdf,
  FileVideo,
  Folder,
  Star,
  Share2,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  size: string;
  uploadDate: string;
  lastModified: string;
  uploadedBy: string;
  status: "approved" | "pending" | "rejected" | "draft";
  version: string;
  description?: string;
  tags: string[];
  isStarred: boolean;
  downloadCount: number;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Articles of Incorporation",
    type: "pdf",
    category: "Legal",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    lastModified: "2024-01-20",
    uploadedBy: "John Smith",
    status: "approved",
    version: "v2.1",
    description: "Official articles of incorporation document",
    tags: ["legal", "incorporation", "official"],
    isStarred: true,
    downloadCount: 15,
  },
  {
    id: "2",
    name: "Business License",
    type: "pdf",
    category: "Legal",
    size: "1.8 MB",
    uploadDate: "2024-01-18",
    lastModified: "2024-01-18",
    uploadedBy: "Sarah Johnson",
    status: "approved",
    version: "v1.0",
    description: "Current business operating license",
    tags: ["license", "legal", "business"],
    isStarred: false,
    downloadCount: 8,
  },
  {
    id: "3",
    name: "Financial Statement Q1 2024",
    type: "xlsx",
    category: "Financial",
    size: "3.2 MB",
    uploadDate: "2024-03-31",
    lastModified: "2024-04-02",
    uploadedBy: "Michael Chen",
    status: "pending",
    version: "v1.2",
    description: "Quarterly financial statements and analysis",
    tags: ["financial", "quarterly", "statements"],
    isStarred: true,
    downloadCount: 12,
  },
  {
    id: "4",
    name: "Employee Handbook",
    type: "docx",
    category: "HR",
    size: "5.1 MB",
    uploadDate: "2024-02-10",
    lastModified: "2024-03-15",
    uploadedBy: "Emily Rodriguez",
    status: "approved",
    version: "v3.0",
    description: "Updated employee policies and procedures",
    tags: ["hr", "policies", "handbook"],
    isStarred: false,
    downloadCount: 25,
  },
  {
    id: "5",
    name: "Tax Returns 2023",
    type: "pdf",
    category: "Tax",
    size: "4.7 MB",
    uploadDate: "2024-04-10",
    lastModified: "2024-04-12",
    uploadedBy: "David Kim",
    status: "draft",
    version: "v0.9",
    description: "Annual tax return documents",
    tags: ["tax", "annual", "returns"],
    isStarred: false,
    downloadCount: 3,
  },
  {
    id: "6",
    name: "Company Logo Assets",
    type: "zip",
    category: "Marketing",
    size: "12.3 MB",
    uploadDate: "2024-01-25",
    lastModified: "2024-02-01",
    uploadedBy: "Sarah Johnson",
    status: "approved",
    version: "v2.0",
    description: "Brand assets and logo variations",
    tags: ["branding", "logo", "assets"],
    isStarred: true,
    downloadCount: 18,
  },
];

const categories = [
  "All",
  "Legal",
  "Financial",
  "HR",
  "Tax",
  "Marketing",
  "Operations",
];
const statuses = ["All", "approved", "pending", "rejected", "draft"];

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "pdf":
      return <FilePdf className="h-5 w-5 text-red-600" />;
    case "docx":
    case "doc":
      return <FileText className="h-5 w-5 text-blue-600" />;
    case "xlsx":
    case "xls":
      return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <FileImage className="h-5 w-5 text-purple-600" />;
    case "mp4":
    case "avi":
    case "mov":
      return <FileVideo className="h-5 w-5 text-orange-600" />;
    case "zip":
    case "rar":
      return <Folder className="h-5 w-5 text-yellow-600" />;
    default:
      return <File className="h-5 w-5 text-gray-600" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "draft":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "rejected":
      return <X className="h-4 w-4 text-red-600" />;
    case "draft":
      return <Edit className="h-4 w-4 text-gray-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

export default function DocumentRepository() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || doc.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || doc.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleStarToggle = (docId: string) => {
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === docId ? { ...doc, isStarred: !doc.isStarred } : doc
      )
    );
  };

  const handleDownload = (doc: Document) => {
    setDocuments((docs) =>
      docs.map((d) =>
        d.id === doc.id ? { ...d, downloadCount: d.downloadCount + 1 } : d
      )
    );
    // Simulate download
    console.log(`Downloading ${doc.name}`);
  };

  const handlePreview = (doc: Document) => {
    setSelectedDocument(doc);
    setIsPreviewOpen(true);
  };

  const handleDelete = (docId: string) => {
    setDocuments((docs) => docs.filter((doc) => doc.id !== docId));
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Document Repository
          </h1>
          <p className="text-gray-600 mt-1">
            Store, preview, download, and manage your documents
          </p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-black hover:bg-gray-800">
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>
                Add a new document to your repository
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Drag and drop files here, or click to browse
                </p>
                <Button variant="outline" className="mt-2 bg-transparent">
                  Choose Files
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="Enter document description..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input placeholder="Enter tags separated by commas" />
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => setIsUploadDialogOpen(false)}
                >
                  Upload
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsUploadDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{documents.length}</p>
                <p className="text-sm text-gray-600">Total Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {documents.filter((d) => d.status === "approved").length}
                </p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">
                  {documents.filter((d) => d.status === "pending").length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {documents.reduce((sum, d) => sum + d.downloadCount, 0)}
                </p>
                <p className="text-sm text-gray-600">Downloads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "All"
                      ? "All Statuses"
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "list" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Modified</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {getFileIcon(doc.type)}
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{doc.name}</p>
                            {doc.isStarred && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{doc.version}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{doc.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(doc.status)}
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>{doc.lastModified}</TableCell>
                    <TableCell>{doc.downloadCount}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handlePreview(doc)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(doc)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStarToggle(doc.id)}
                          >
                            <Star className="h-4 w-4 mr-2" />
                            {doc.isStarred ? "Unstar" : "Star"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Update
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((doc) => (
                <Card
                  key={doc.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getFileIcon(doc.type)}
                        {doc.isStarred && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handlePreview(doc)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(doc)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStarToggle(doc.id)}
                          >
                            <Star className="h-4 w-4 mr-2" />
                            {doc.isStarred ? "Unstar" : "Star"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{doc.version}</p>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {doc.category}
                      </Badge>
                      <Badge
                        className={`text-xs ${getStatusColor(doc.status)}`}
                      >
                        {doc.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{doc.size}</span>
                      <span>{doc.downloadCount} downloads</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedDocument && getFileIcon(selectedDocument.type)}
              {selectedDocument?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedDocument?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <Label className="text-gray-500">Category</Label>
                  <p className="font-medium">{selectedDocument.category}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Size</Label>
                  <p className="font-medium">{selectedDocument.size}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Version</Label>
                  <p className="font-medium">{selectedDocument.version}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Status</Label>
                  <Badge className={getStatusColor(selectedDocument.status)}>
                    {selectedDocument.status}
                  </Badge>
                </div>
              </div>
              <Separator />
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="mb-4">{getFileIcon(selectedDocument.type)}</div>
                <p className="text-gray-600 mb-4">
                  Document preview not available
                </p>
                <p className="text-sm text-gray-500">
                  Click download to view the full document
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleDownload(selectedDocument)}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Update
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
