import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Building2, DollarSign, Calendar, User } from "lucide-react";

interface Lead {
  id: string;
  companyName: string;
  contactPerson: string;
  dealSize: string;
  stage: "new" | "contacted" | "qualified" | "negotiating";
  lastContact: string;
  sector: string;
}

const mockLeads: Lead[] = [
  {
    id: "1",
    companyName: "TechVenture Inc",
    contactPerson: "Sarah Johnson",
    dealSize: "$2.5M",
    stage: "negotiating",
    lastContact: "2024-01-15",
    sector: "Technology"
  },
  {
    id: "2",
    companyName: "GreenEnergy Solutions",
    contactPerson: "Michael Chen",
    dealSize: "$5.0M",
    stage: "qualified",
    lastContact: "2024-01-14",
    sector: "Renewable Energy"
  },
  {
    id: "3",
    companyName: "Healthcare Plus",
    contactPerson: "Emily Davis",
    dealSize: "$1.8M",
    stage: "contacted",
    lastContact: "2024-01-13",
    sector: "Healthcare"
  },
  {
    id: "4",
    companyName: "Manufacturing Co",
    contactPerson: "David Brown",
    dealSize: "$3.2M",
    stage: "new",
    lastContact: "2024-01-12",
    sector: "Manufacturing"
  }
];

const CRM = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const getStageColor = (stage: Lead["stage"]) => {
    switch (stage) {
      case "new": return "default";
      case "contacted": return "secondary";
      case "qualified": return "warning";
      case "negotiating": return "success";
    }
  };

  const filteredLeads = mockLeads.filter(lead =>
    lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          CRM & Leads
        </h1>
        <p className="text-muted-foreground">
          Manage deal leads and opportunities
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Lead
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeads.map((lead) => (
          <Dialog key={lead.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{lead.companyName}</CardTitle>
                    </div>
                    <Badge variant={getStageColor(lead.stage)}>
                      {lead.stage}
                    </Badge>
                  </div>
                  <CardDescription>{lead.sector}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{lead.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{lead.dealSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Last contact: {new Date(lead.lastContact).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{lead.companyName}</DialogTitle>
                <DialogDescription>Deal opportunity details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Contact Person</label>
                    <p className="text-sm text-muted-foreground">{lead.contactPerson}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Deal Size</label>
                    <p className="text-sm text-muted-foreground">{lead.dealSize}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Sector</label>
                    <p className="text-sm text-muted-foreground">{lead.sector}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Stage</label>
                    <Badge variant={getStageColor(lead.stage)} className="mt-1">
                      {lead.stage}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Last Contact Date</label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(lead.lastContact).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Update Lead</Button>
                  <Button variant="outline" className="flex-1">Schedule Follow-up</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default CRM;
