"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Star, Info } from "lucide-react";

// Mock data for CSPs
interface CSP {
  id: string;
  name: string;
  services: string[];
  location: string;
  rating: number;
  clients: number;
  description: string;
  email: string;
  phone: string;
}

const mockCSPs: CSP[] = [
  {
    id: "csp1",
    name: "Global Corporate Solutions",
    services: ["Company Formation", "Compliance", "Accounting", "Tax Advisory"],
    location: "Gelephu",
    rating: 4.8,
    clients: 120,
    description:
      "Leading provider of comprehensive corporate services for businesses in GMC and beyond.",
    email: "info@globalcorp.com",
    phone: "+975 17123001",
  },
  {
    id: "csp2",
    name: "Bhutan Business Hub",
    services: ["Company Secretarial", "Payroll", "HR Consulting"],
    location: "Thimphu",
    rating: 4.5,
    clients: 85,
    description:
      "Your trusted partner for efficient business operations and regulatory compliance in Bhutan.",
    email: "contact@bhutanbizhub.bt",
    phone: "+975 17123002",
  },
  {
    id: "csp3",
    name: "GMC Legal & Advisory",
    services: ["Legal Advisory", "Licensing", "Dispute Resolution"],
    location: "Gelephu",
    rating: 4.9,
    clients: 50,
    description:
      "Specializing in legal and regulatory guidance for companies operating within Gelephu Mindfulness City.",
    email: "legal@gmc-advisory.bt",
    phone: "+975 17123003",
  },
  {
    id: "csp4",
    name: "Apex Accounting Services",
    services: ["Accounting", "Audit", "Tax Advisory"],
    location: "Phuntsholing",
    rating: 4.2,
    clients: 150,
    description:
      "Reliable and accurate accounting services to keep your finances in order.",
    email: "accounts@apex.bt",
    phone: "+975 17123004",
  },
  {
    id: "csp5",
    name: "Digital Compliance Partners",
    services: ["Compliance", "Data Protection", "Cybersecurity Advisory"],
    location: "Gelephu",
    rating: 4.7,
    clients: 70,
    description:
      "Ensuring your business meets all digital and regulatory compliance standards.",
    email: "support@digitalcomp.com",
    phone: "+975 17123005",
  },
];

const allServices = Array.from(
  new Set(mockCSPs.flatMap((csp) => csp.services))
);
const allLocations = Array.from(new Set(mockCSPs.map((csp) => csp.location)));

export default function CSPDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [minRating, setMinRating] = useState(0);

  const filteredCSPs = mockCSPs.filter((csp) => {
    const matchesSearchTerm =
      csp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      csp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      csp.services.some((service) =>
        service.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesService =
      selectedService === "all" || csp.services.includes(selectedService);
    const matchesLocation =
      selectedLocation === "all" || csp.location === selectedLocation;
    const matchesRating = csp.rating >= minRating;

    return (
      matchesSearchTerm && matchesService && matchesLocation && matchesRating
    );
  });

  return (
    <div className="p-6 space-y-8 text-gray-900">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">
          Find Your Corporate Service Provider
        </h1>
        <p className="text-lg text-gray-600">
          Browse and connect with trusted CSPs to manage your company&lsquo;s
          needs.
        </p>
      </div>

      {/* Search and Filter Section */}
      <Card className="shadow-lg border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Search className="h-5 w-5 text-gray-700" />
            Search & Filter CSPs
          </CardTitle>
          <CardDescription>
            Find the perfect service provider by name, service, or location.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            placeholder="Search by CSP name, service, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-gray-300 focus:border-gray-500 rounded-md"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="border-gray-300 focus:border-gray-500 rounded-md">
                <SelectValue placeholder="Filter by Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {allServices.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="border-gray-300 focus:border-gray-500 rounded-md">
                <SelectValue placeholder="Filter by Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {allLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={String(minRating)}
              onValueChange={(value) => setMinRating(Number(value))}
            >
              <SelectTrigger className="border-gray-300 focus:border-gray-500 rounded-md">
                <SelectValue placeholder="Minimum Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any Rating</SelectItem>
                <SelectItem value="4">4 Stars & Up</SelectItem>
                <SelectItem value="4.5">4.5 Stars & Up</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* CSP Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCSPs.length > 0 ? (
          filteredCSPs.map((csp) => (
            <Card
              key={csp.id}
              className="shadow-md border border-gray-200 bg-white flex flex-col"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{csp.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-gray-600">
                  <MapPin className="h-4 w-4" /> {csp.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>
                    {csp.rating} ({csp.clients} clients)
                  </span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {csp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {csp.services.map((service) => (
                    <Badge
                      key={service}
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 border-gray-300"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <div className="p-6 pt-0 flex flex-col gap-2">
                <Button
                  variant="default"
                  className="w-full bg-gray-900 text-white hover:bg-gray-700"
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-900 hover:bg-gray-100 bg-transparent"
                >
                  Contact CSP
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center p-8">
            <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              No CSPs Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
