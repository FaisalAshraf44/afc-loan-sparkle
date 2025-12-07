import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  FileText, 
  Download, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileSignature,
  Scale,
  Building2,
  Shield,
  Users,
  Send,
  Eye,
  Edit,
  MessageSquare
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  status: "not-started" | "drafting" | "internal-review" | "client-review" | "negotiation" | "executed";
  assignedTo: string;
  lastUpdated: string;
  version: number;
  comments: number;
}

interface Deal {
  id: string;
  codeName: string;
  client: string;
  approvalDate: string;
  approvalType: string;
  conditions: string[];
  documents: Document[];
  legalCounsel: string;
  progress: number;
}

const DealDocumentation = () => {
  const [deals] = useState<Deal[]>([
    {
      id: "1",
      codeName: "Project Atlas",
      client: "TechCorp Industries",
      approvalDate: "2024-01-15",
      approvalType: "BRIC",
      conditions: ["Enhanced due diligence required", "Security package confirmation"],
      legalCounsel: "Sarah Mitchell",
      progress: 45,
      documents: [
        { id: "d1", name: "Term Sheet", type: "term-sheet", status: "executed", assignedTo: "Sarah Mitchell", lastUpdated: "2024-01-18", version: 3, comments: 5 },
        { id: "d2", name: "Facility Agreement", type: "facility", status: "negotiation", assignedTo: "Sarah Mitchell", lastUpdated: "2024-01-20", version: 2, comments: 12 },
        { id: "d3", name: "Security Agreement", type: "security", status: "internal-review", assignedTo: "John Adams", lastUpdated: "2024-01-19", version: 1, comments: 3 },
        { id: "d4", name: "Guarantee Agreement", type: "guarantee", status: "drafting", assignedTo: "Sarah Mitchell", lastUpdated: "2024-01-21", version: 1, comments: 0 },
        { id: "d5", name: "Legal Opinion", type: "opinion", status: "not-started", assignedTo: "External Counsel", lastUpdated: "-", version: 0, comments: 0 },
      ]
    },
    {
      id: "2",
      codeName: "Project Neptune",
      client: "Global Energy Ltd",
      approvalDate: "2024-01-10",
      approvalType: "InvestCo",
      conditions: ["Environmental assessment clearance"],
      legalCounsel: "Michael Chen",
      progress: 70,
      documents: [
        { id: "d6", name: "Term Sheet", type: "term-sheet", status: "executed", assignedTo: "Michael Chen", lastUpdated: "2024-01-12", version: 2, comments: 3 },
        { id: "d7", name: "Facility Agreement", type: "facility", status: "executed", assignedTo: "Michael Chen", lastUpdated: "2024-01-16", version: 4, comments: 8 },
        { id: "d8", name: "Security Agreement", type: "security", status: "client-review", assignedTo: "Michael Chen", lastUpdated: "2024-01-18", version: 2, comments: 5 },
        { id: "d9", name: "E&S Side Letter", type: "side-letter", status: "negotiation", assignedTo: "E&S Team", lastUpdated: "2024-01-19", version: 1, comments: 2 },
      ]
    },
  ]);

  const [selectedDeal, setSelectedDeal] = useState<Deal>(deals[0]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode }> = {
      "not-started": { label: "Not Started", variant: "outline", icon: <Clock className="h-3 w-3" /> },
      "drafting": { label: "Drafting", variant: "secondary", icon: <Edit className="h-3 w-3" /> },
      "internal-review": { label: "Internal Review", variant: "secondary", icon: <Eye className="h-3 w-3" /> },
      "client-review": { label: "Client Review", variant: "default", icon: <Users className="h-3 w-3" /> },
      "negotiation": { label: "Negotiation", variant: "destructive", icon: <MessageSquare className="h-3 w-3" /> },
      "executed": { label: "Executed", variant: "default", icon: <CheckCircle2 className="h-3 w-3" /> },
    };
    const config = statusConfig[status] || statusConfig["not-started"];
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const getDocumentIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      "term-sheet": <FileSignature className="h-5 w-5 text-primary" />,
      "facility": <FileText className="h-5 w-5 text-blue-500" />,
      "security": <Shield className="h-5 w-5 text-amber-500" />,
      "guarantee": <Building2 className="h-5 w-5 text-green-500" />,
      "opinion": <Scale className="h-5 w-5 text-purple-500" />,
      "side-letter": <FileText className="h-5 w-5 text-cyan-500" />,
    };
    return icons[type] || <FileText className="h-5 w-5" />;
  };

  const documentTemplates = [
    { id: "t1", name: "Term Sheet Template", type: "term-sheet" },
    { id: "t2", name: "Facility Agreement Template", type: "facility" },
    { id: "t3", name: "Security Agreement Template", type: "security" },
    { id: "t4", name: "Guarantee Agreement Template", type: "guarantee" },
    { id: "t5", name: "Legal Opinion Request", type: "opinion" },
    { id: "t6", name: "Side Letter Template", type: "side-letter" },
    { id: "t7", name: "Conditions Precedent Checklist", type: "checklist" },
  ];

  const handleDownloadTemplate = (templateName: string) => {
    toast.success(`Downloading ${templateName}`);
  };

  const handleSendForReview = (docName: string) => {
    toast.success(`${docName} sent for client review`, {
      description: "Client and legal counsel have been notified via email."
    });
  };

  const handleUploadVersion = () => {
    toast.success("New version uploaded successfully", {
      description: "All stakeholders have been notified of the update."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Deal Documentation</h1>
        <p className="text-muted-foreground">
          Manage legal documentation for approved transactions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deals.length}</div>
            <p className="text-xs text-muted-foreground">In documentation phase</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents in Progress</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deals.reduce((acc, deal) => acc + deal.documents.filter(d => d.status !== "executed" && d.status !== "not-started").length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Being drafted or reviewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Execution</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deals.reduce((acc, deal) => acc + deal.documents.filter(d => d.status === "negotiation" || d.status === "client-review").length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting signatures</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Executed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deals.reduce((acc, deal) => acc + deal.documents.filter(d => d.status === "executed").length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Completed documents</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Deal List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Active Deals</CardTitle>
            <CardDescription>Select a deal to manage documentation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {deals.map((deal) => (
              <div
                key={deal.id}
                onClick={() => setSelectedDeal(deal)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedDeal.id === deal.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{deal.codeName}</span>
                  <Badge variant="outline">{deal.approvalType}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{deal.client}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Documentation Progress</span>
                    <span>{deal.progress}%</span>
                  </div>
                  <Progress value={deal.progress} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Legal Counsel: {deal.legalCounsel}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Document Management */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedDeal.codeName} - Documentation</CardTitle>
                <CardDescription>
                  Approved on {selectedDeal.approvalDate} by {selectedDeal.approvalType}
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Templates
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Document Templates</DialogTitle>
                    <DialogDescription>
                      Download standardized templates for deal documentation
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2 mt-4">
                    {documentTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          {getDocumentIcon(template.type)}
                          <span className="text-sm font-medium">{template.name}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleDownloadTemplate(template.name)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Approval Conditions */}
            {selectedDeal.conditions.length > 0 && (
              <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span className="font-medium text-amber-700 dark:text-amber-400">Approval Conditions</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {selectedDeal.conditions.map((condition, idx) => (
                    <li key={idx}>• {condition}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Documents */}
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Documents</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="executed">Executed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4 space-y-3">
                {selectedDeal.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      {getDocumentIcon(doc.type)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{doc.name}</span>
                          {doc.version > 0 && (
                            <span className="text-xs text-muted-foreground">v{doc.version}</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Assigned to: {doc.assignedTo}
                        </p>
                        {doc.lastUpdated !== "-" && (
                          <p className="text-xs text-muted-foreground">
                            Last updated: {doc.lastUpdated}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {doc.comments > 0 && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {doc.comments}
                        </Badge>
                      )}
                      {getStatusBadge(doc.status)}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedDocument(doc)}>
                            Manage
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{doc.name}</DialogTitle>
                            <DialogDescription>
                              Manage document workflow and versions
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Current Status</label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {getStatusBadge(doc.status)}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Assigned To</label>
                                <p className="text-sm text-muted-foreground mt-1">{doc.assignedTo}</p>
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium">Update Status</label>
                              <Select>
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select new status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="drafting">Drafting</SelectItem>
                                  <SelectItem value="internal-review">Internal Review</SelectItem>
                                  <SelectItem value="client-review">Client Review</SelectItem>
                                  <SelectItem value="negotiation">Negotiation</SelectItem>
                                  <SelectItem value="executed">Executed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Comments</label>
                              <Textarea 
                                placeholder="Add comments or notes about this document..."
                                className="mt-1"
                              />
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline" className="flex-1" onClick={handleUploadVersion}>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload New Version
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </div>
                            
                            <Button 
                              className="w-full"
                              onClick={() => handleSendForReview(doc.name)}
                            >
                              <Send className="mr-2 h-4 w-4" />
                              Send for Client Review
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="in-progress" className="mt-4 space-y-3">
                {selectedDeal.documents
                  .filter(d => d.status !== "executed" && d.status !== "not-started")
                  .map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        {getDocumentIcon(doc.type)}
                        <div>
                          <span className="font-medium">{doc.name}</span>
                          <p className="text-sm text-muted-foreground">
                            Assigned to: {doc.assignedTo}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(doc.status)}
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="executed" className="mt-4 space-y-3">
                {selectedDeal.documents
                  .filter(d => d.status === "executed")
                  .map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        {getDocumentIcon(doc.type)}
                        <div>
                          <span className="font-medium">{doc.name}</span>
                          <p className="text-sm text-muted-foreground">
                            Executed on: {doc.lastUpdated}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(doc.status)}
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DealDocumentation;
