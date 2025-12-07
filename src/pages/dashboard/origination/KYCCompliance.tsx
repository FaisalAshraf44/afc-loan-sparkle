import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Plus, 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Upload,
  Globe,
  User,
  Building2,
  XCircle,
  Send
} from "lucide-react";

interface KYCRecord {
  id: string;
  clientName: string;
  projectCode: string;
  submittedDate: string;
  status: "pending" | "in_review" | "approved" | "flagged" | "rejected";
  completionPercentage: number;
  documents: {
    afcKycInfo: boolean;
    worldCheckReport: boolean;
    sanctionsCheck: boolean;
    pepScreening: boolean;
    uboDeclaration: boolean;
  };
  riskLevel?: "low" | "medium" | "high";
  reviewer?: string;
  notes?: string;
}

const mockKYCRecords: KYCRecord[] = [
  {
    id: "1",
    clientName: "TechVenture Inc",
    projectCode: "PROJ-2024-001",
    submittedDate: "2024-01-15",
    status: "approved",
    completionPercentage: 100,
    documents: {
      afcKycInfo: true,
      worldCheckReport: true,
      sanctionsCheck: true,
      pepScreening: true,
      uboDeclaration: true
    },
    riskLevel: "low",
    reviewer: "Corporate Secretariat"
  },
  {
    id: "2",
    clientName: "GreenEnergy Solutions",
    projectCode: "PROJ-2024-002",
    submittedDate: "2024-01-14",
    status: "in_review",
    completionPercentage: 80,
    documents: {
      afcKycInfo: true,
      worldCheckReport: true,
      sanctionsCheck: true,
      pepScreening: true,
      uboDeclaration: false
    },
    riskLevel: "medium",
    reviewer: "Risk Management"
  },
  {
    id: "3",
    clientName: "Healthcare Plus",
    projectCode: "PROJ-2024-003",
    submittedDate: "2024-01-13",
    status: "flagged",
    completionPercentage: 60,
    documents: {
      afcKycInfo: true,
      worldCheckReport: true,
      sanctionsCheck: false,
      pepScreening: false,
      uboDeclaration: false
    },
    riskLevel: "high",
    reviewer: "Risk Management",
    notes: "PEP match detected - requires enhanced due diligence"
  },
  {
    id: "4",
    clientName: "AgriTech Corp",
    projectCode: "PROJ-2024-004",
    submittedDate: "2024-01-12",
    status: "pending",
    completionPercentage: 40,
    documents: {
      afcKycInfo: true,
      worldCheckReport: true,
      sanctionsCheck: false,
      pepScreening: false,
      uboDeclaration: false
    }
  }
];

const KYCCompliance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<KYCRecord | null>(null);
  const [isNewSubmissionOpen, setIsNewSubmissionOpen] = useState(false);
  const { toast } = useToast();

  const getStatusColor = (status: KYCRecord["status"]) => {
    switch (status) {
      case "pending": return "secondary";
      case "in_review": return "warning";
      case "approved": return "success";
      case "flagged": return "destructive";
      case "rejected": return "destructive";
    }
  };

  const getStatusIcon = (status: KYCRecord["status"]) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "in_review": return <FileText className="h-4 w-4" />;
      case "approved": return <CheckCircle className="h-4 w-4" />;
      case "flagged": return <AlertTriangle className="h-4 w-4" />;
      case "rejected": return <XCircle className="h-4 w-4" />;
    }
  };

  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case "low": return "text-emerald-500";
      case "medium": return "text-amber-500";
      case "high": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  const filteredRecords = mockKYCRecords.filter(record =>
    record.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.projectCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: mockKYCRecords.length,
    approved: mockKYCRecords.filter(r => r.status === "approved").length,
    pending: mockKYCRecords.filter(r => r.status === "pending" || r.status === "in_review").length,
    flagged: mockKYCRecords.filter(r => r.status === "flagged").length,
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          KYC & Compliance
        </h1>
        <p className="text-muted-foreground">
          Submit KYC documents to Corporate Secretariat and Risk Management for review
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Submissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-500">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-500">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-500">{stats.flagged}</div>
            <p className="text-xs text-muted-foreground">Flagged</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by client or project code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isNewSubmissionOpen} onOpenChange={setIsNewSubmissionOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Submission
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit KYC Documents</DialogTitle>
              <DialogDescription>
                Submit KYC documents to Corporate Secretariat and Risk Management
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Client Name</Label>
                  <Input placeholder="Enter client name" />
                </div>
                <div>
                  <Label>Project Code</Label>
                  <Input placeholder="PROJ-2024-XXX" />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Required Documents</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors">
                  <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">AFC KYC Information Form</p>
                </div>
                <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors">
                  <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">World Check Reports</p>
                </div>
                <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors">
                  <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">UBO Declaration</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1">
                  Save as Draft
                </Button>
                <Button className="flex-1" onClick={() => {
                  setIsNewSubmissionOpen(false);
                  toast({
                    title: "KYC Submitted",
                    description: "Documents have been submitted to Corporate Secretariat for review.",
                  });
                }}>
                  <Send className="h-4 w-4 mr-2" />
                  Submit for Review
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Submissions</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="flagged">Flagged</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredRecords.map((record) => (
            <Card key={record.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{record.clientName}</h3>
                      <p className="text-sm text-muted-foreground">{record.projectCode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {record.riskLevel && (
                      <Badge variant="outline" className={getRiskColor(record.riskLevel)}>
                        {record.riskLevel.toUpperCase()} RISK
                      </Badge>
                    )}
                    <Badge variant={getStatusColor(record.status)} className="gap-1">
                      {getStatusIcon(record.status)}
                      {record.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Document Checklist</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        {record.documents.afcKycInfo ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>AFC KYC Information</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {record.documents.worldCheckReport ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>World Check Report</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {record.documents.sanctionsCheck ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>Sanctions Screening</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {record.documents.pepScreening ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>PEP Screening</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {record.documents.uboDeclaration ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>UBO Declaration</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Completion</p>
                    <Progress value={record.completionPercentage} className="mb-2" />
                    <p className="text-sm">{record.completionPercentage}% Complete</p>
                    {record.reviewer && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Reviewer: {record.reviewer}
                      </p>
                    )}
                  </div>
                </div>

                {record.notes && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm font-medium">{record.notes}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">View Details</Button>
                  {record.status === "flagged" && (
                    <Button variant="outline" size="sm" className="text-amber-600">
                      Respond to Flag
                    </Button>
                  )}
                  {(record.status === "pending" || record.status === "in_review") && (
                    <Button size="sm" onClick={() => {
                      toast({
                        title: "Reminder Sent",
                        description: "A reminder has been sent to the review team.",
                      });
                    }}>
                      Send Reminder
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending">
          <p className="text-muted-foreground">Pending submissions will appear here.</p>
        </TabsContent>
        <TabsContent value="flagged">
          <p className="text-muted-foreground">Flagged submissions will appear here.</p>
        </TabsContent>
        <TabsContent value="approved">
          <p className="text-muted-foreground">Approved submissions will appear here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KYCCompliance;
