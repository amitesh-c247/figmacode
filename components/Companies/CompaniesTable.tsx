import { useState } from "react";
import { MoreHorizontal, Search, Download, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  industry: string;
  status: "active" | "inactive" | "accepted";
  initials: string;
  color: string;
}

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Alpha Dynamics",
    description: "Leading provider of automation solutions.",
    industry: "Robotics",
    status: "active",
    initials: "AD",
    color: "bg-green-500"
  },
  {
    id: "2",
    name: "BetaWorks Tech",
    description: "Focused on AI-driven SaaS platforms.",
    industry: "Software",
    status: "accepted",
    initials: "BT",
    color: "bg-cyan-500"
  },
  {
    id: "3",
    name: "GreenSprout Ltd.",
    description: "Eco-friendly packaging products supplier.",
    industry: "Manufacturing",
    status: "inactive",
    initials: "GS",
    color: "bg-purple-500"
  },
];

interface CompaniesTableProps {
  onAddCompany: () => void;
}

export function CompaniesTable({ onAddCompany }: CompaniesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(mockCompanies);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = mockCompanies.filter(company =>
      company.name.toLowerCase().includes(value.toLowerCase()) ||
      company.industry.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const getStatusBadge = (status: Company["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>;
      case "accepted":
        return <Badge className="bg-green-50 text-green-700 hover:bg-green-50">Accepted</Badge>;
      case "inactive":
        return <Badge className="bg-orange-50 text-orange-700 hover:bg-orange-50">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with search and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
            <Download className="h-4 w-4 mr-2" />
            Import Companies
          </Button>
          <Button onClick={onAddCompany} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Company
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-600 hover:bg-purple-600">
                <TableHead className="text-white font-bold">Company Name</TableHead>
                <TableHead className="text-white font-bold">Description</TableHead>
                <TableHead className="text-white font-bold">Industry</TableHead>
                <TableHead className="text-white font-bold">Status</TableHead>
                <TableHead className="text-white font-bold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company, index) => (
                <TableRow key={company.id} className={index % 2 === 1 ? "bg-purple-25" : ""}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 ${company.color} rounded-full flex items-center justify-center`}>
                        <span className="text-white text-xs font-medium uppercase">
                          {company.initials}
                        </span>
                      </div>
                      <span className="font-medium">{company.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 text-sm">{company.description}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 text-sm">{company.industry}</span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(company.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-purple-100 hover:bg-purple-200 text-purple-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                        <Trash2 className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Go to page</span>
            <Input className="w-16 h-8" defaultValue="100" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Per page</span>
            <Input className="w-16 h-8" defaultValue="30" />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">01</Button>
          <Button variant="outline" size="sm">02</Button>
          <Button variant="ghost" size="sm">03</Button>
        </div>
      </div>
    </div>
  );
}