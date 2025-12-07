import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Download, Eye, Search, FolderOpen, Send, CheckCircle, Clock, AlertCircle, Building2, Shield, Landmark, FileCheck, Phone, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DisbursementDocument {
  id: number;
  name: string;
  category: string;
  documentType: string;
  uploadedBy: string;
  date: string;
  size: string;
  status: "verified" | "pending" | "missing" | "sent";
  deal: string;
  sentTo: string[];
}

const Repository = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeal, setSelectedDeal] = useState("all");
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [sendNotes, setSendNotes] = useState("");

  const deals = [
    { id: "phoenix", name: "Project Phoenix - Tech Innovations Ltd" },
    { id: "evergreen", name: "Project Evergreen - Green Energy Corp" },
    { id: "summit", name: "Project Summit - Retail Ventures LLC" },
  ];

  const documentTypes = [
    { value: "facility-agreement", label: "Facility Agreement", icon: FileText },
    { value: "security-agreement", label: "Security Agreement", icon: Shield },
    { value: "cp-satisfaction-letter", label: "CP Satisfaction Letter", icon: FileCheck },
    { value: "customer-creation-form", label: "Customer Creation Form", icon: Users },
    { value: "disbursement-documentation", label: "Disbursement Documentation", icon: Landmark },
    { value: "callback-recording", label: "Call Back Recording", icon: Phone },
    { value: "legal-opinion", label: "Legal Opinion", icon: FileText },
    { value: "board-resolution", label: "Board Resolution", icon: Building2 },
    { value: "insurance-policy", label: "Insurance Policy", icon: Shield },
  ];

  const departments = [
    { id: "risk-management", name: "Risk Management", icon: Shield },
    { id: "finance-settlements", name: "Finance & Settlements", icon: Landmark },
  ];

  const [documents, setDocuments] = useState<DisbursementDocument[]>([
    {
      id: 1,
      name: "Facility Agreement - Phoenix.pdf",
      category: "Legal",
      documentType: "facility-agreement",
      uploadedBy: "John Smith",
      date: "2025-10-15",
      size: "2.4 MB",
      status: "verified",
      deal: "phoenix",
      sentTo: []
    },
    {
      id: 2,
      name: "Security Agreement - Phoenix.pdf",
      category: "Legal",
      documentType: "security-agreement",
      uploadedBy: "Sarah Johnson",
      date: "2025-10-18",
      size: "1.8 MB",
      status: "verified",
      deal: "phoenix",
      sentTo: []
    },
    {
      id: 3,
      name: "CP Satisfaction Letter - Phoenix.pdf",
      category: "Legal",
      documentType: "cp-satisfaction-letter",
      uploadedBy: "Legal Counsel",
      date: "2025-10-20",
      size: "0.5 MB",
      status: "verified",
      deal: "phoenix",
      sentTo: []
    },
    {
      id: 4,
      name: "Customer Creation Form - Phoenix.pdf",
      category: "Administrative",
      documentType: "customer-creation-form",
      uploadedBy: "Emily Brown",
      date: "2025-10-22",
      size: "0.3 MB",
      status: "pending",
      deal: "phoenix",
      sentTo: []
    },
    {
      id: 5,
      name: "Disbursement Request - Phoenix.pdf",
      category: "Financial",
      documentType: "disbursement-documentation",
      uploadedBy: "Robert Wilson",
      date: "2025-10-23",
      size: "0.8 MB",
      status: "verified",
      deal: "phoenix",
      sentTo: []
    },
    {
      id: 6,
      name: "Call Back Recording - Phoenix.mp3",
      category: "Verification",
      documentType: "callback-recording",
      uploadedBy: "Treasury Team",
      date: "2025-10-24",
      size: "4.7 MB",
      status: "verified",
      deal: "phoenix",
      sentTo: []
    },
    {
      id: 7,
      name: "Facility Agreement - Evergreen.pdf",
      category: "Legal",
      documentType: "facility-agreement",
      uploadedBy: "John Smith",
      date: "2025-10-10",
      size: "2.1 MB",
      status: "sent",
      deal: "evergreen",
      sentTo: ["risk-management", "finance-settlements"]
    },
    {
      id: 8,
      name: "Security Agreement - Evergreen.pdf",
      category: "Legal",
      documentType: "security-agreement",
      uploadedBy: "Sarah Johnson",
      date: "2025-10-11",
      size: "1.6 MB",
      status: "sent",
      deal: "evergreen",
      sentTo: ["risk-management", "finance-settlements"]
    },
  ]);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDeal = selectedDeal === "all" || doc.deal === selectedDeal;
    return matchesSearch && matchesDeal;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"><CheckCircle className="h-3 w-3 mr-1" />Verified</Badge>;
      case "pending":
        return <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"><Clock className="h-3 w-3 mr-1" />Pending Review</Badge>;
      case "missing":
        return <Badge className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"><AlertCircle className="h-3 w-3 mr-1" />Missing</Badge>;
      case "sent":
        return <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"><Send className="h-3 w-3 mr-1" />Sent</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDocumentIcon = (documentType: string) => {
    const docType = documentTypes.find(dt => dt.value === documentType);
    if (docType) {
      const IconComponent = docType.icon;
      return <IconComponent className="h-5 w-5 text-muted-foreground" />;
    }
    return <FileText className="h-5 w-5 text-muted-foreground" />;
  };

  const handleDocumentSelect = (docId: number) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const selectableIds = filteredDocuments
        .filter(doc => doc.status === "verified")
        .map(doc => doc.id);
      setSelectedDocuments(selectableIds);
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleDepartmentToggle = (deptId: string) => {
    setSelectedDepartments(prev =>
      prev.includes(deptId)
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  const handleSendDocuments = () => {
    if (selectedDocuments.length === 0) {
      toast.error("Please select documents to send");
      return;
    }
    if (selectedDepartments.length === 0) {
      toast.error("Please select at least one department");
      return;
    }

    // Update documents with sent status
    setDocuments(prev => prev.map(doc => {
      if (selectedDocuments.includes(doc.id)) {
        return {
          ...doc,
          status: "sent" as const,
          sentTo: [...new Set([...doc.sentTo, ...selectedDepartments])]
        };
      }
      return doc;
    }));

    const deptNames = departments
      .filter(d => selectedDepartments.includes(d.id))
      .map(d => d.name)
      .join(" and ");

    toast.success(`${selectedDocuments.length} document(s) sent to ${deptNames}`, {
      description: "Departments have been notified and can now access the documents."
    });

    setSelectedDocuments([]);
    setSelectedDepartments([]);
    setSendNotes("");
    setSendDialogOpen(false);
  };

  const categories = [...new Set(documents.map(d => d.category))];
  const requiredDocTypes = ["facility-agreement", "security-agreement", "cp-satisfaction-letter", "customer-creation-form", "disbursement-documentation", "callback-recording"];
  
  const getDocumentCompleteness = (dealId: string) => {
    const dealDocs = documents.filter(d => d.deal === dealId);
    const verifiedOrSent = dealDocs.filter(d => d.status === "verified" || d.status === "sent");
    const hasRequired = requiredDocTypes.filter(type => 
      dealDocs.some(d => d.documentType === type && (d.status === "verified" || d.status === "sent"))
    );
    return { total: requiredDocTypes.length, completed: hasRequired.length };
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Disbursement Document Repository</h2>
        <p className="text-muted-foreground">Central repository for deal documentation - submit to Risk Management and Finance & Settlements</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {documents.filter(d => d.status === "verified").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {documents.filter(d => d.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Sent to Depts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {documents.filter(d => d.status === "sent").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deals.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Deal Completeness Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {deals.map(deal => {
          const completeness = getDocumentCompleteness(deal.id);
          const isComplete = completeness.completed === completeness.total;
          return (
            <Card key={deal.id} className={`border-l-4 ${isComplete ? 'border-l-green-500' : 'border-l-amber-500'}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{deal.name}</CardTitle>
                <CardDescription>Required Documents Status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">
                    {completeness.completed}/{completeness.total} Complete
                  </div>
                  {isComplete ? (
                    <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">Ready to Send</Badge>
                  ) : (
                    <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400">In Progress</Badge>
                  )}
                </div>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${isComplete ? 'bg-green-500' : 'bg-amber-500'}`}
                    style={{ width: `${(completeness.completed / completeness.total) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search, Filter and Actions */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedDeal} onValueChange={setSelectedDeal}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Filter by deal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Deals</SelectItem>
            {deals.map(deal => (
              <SelectItem key={deal.id} value={deal.id}>{deal.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Disbursement Document</DialogTitle>
              <DialogDescription>
                Add a new document to the repository
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="doc-deal">Deal</Label>
                <Select>
                  <SelectTrigger id="doc-deal">
                    <SelectValue placeholder="Select deal" />
                  </SelectTrigger>
                  <SelectContent>
                    {deals.map(deal => (
                      <SelectItem key={deal.id} value={deal.id}>{deal.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc-type">Document Type</Label>
                <Select>
                  <SelectTrigger id="doc-type">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc-name">Document Name</Label>
                <Input id="doc-name" placeholder="e.g., Facility Agreement - Phoenix" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc-file">File</Label>
                <Input id="doc-file" type="file" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                toast.success("Document uploaded successfully");
                setUploadDialogOpen(false);
              }}>Upload</Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={selectedDocuments.length === 0}>
              <Send className="mr-2 h-4 w-4" />
              Send to Departments ({selectedDocuments.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Send Documents to Departments</DialogTitle>
              <DialogDescription>
                Select departments to receive the {selectedDocuments.length} selected document(s)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <Label>Recipient Departments</Label>
                {departments.map(dept => (
                  <div key={dept.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                    <Checkbox 
                      id={dept.id}
                      checked={selectedDepartments.includes(dept.id)}
                      onCheckedChange={() => handleDepartmentToggle(dept.id)}
                    />
                    <dept.icon className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor={dept.id} className="flex-1 cursor-pointer font-medium">{dept.name}</Label>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label>Selected Documents</Label>
                <div className="max-h-40 overflow-y-auto space-y-2 p-3 rounded-lg border bg-muted/30">
                  {documents.filter(d => selectedDocuments.includes(d.id)).map(doc => (
                    <div key={doc.id} className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{doc.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="send-notes">Notes (Optional)</Label>
                <Textarea 
                  id="send-notes" 
                  placeholder="Add any notes for the receiving departments..."
                  value={sendNotes}
                  onChange={(e) => setSendNotes(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSendDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSendDocuments}>
                <Send className="mr-2 h-4 w-4" />
                Send Documents
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Document Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    checked={selectedDocuments.length > 0 && selectedDocuments.length === filteredDocuments.filter(d => d.status === "verified").length}
                    onCheckedChange={handleSelectAll}
                  />
                  <CardTitle className="text-lg">All Documents</CardTitle>
                  <Badge variant="secondary">{filteredDocuments.length}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className={`flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors ${selectedDocuments.includes(doc.id) ? 'ring-2 ring-primary' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      {doc.status === "verified" && (
                        <Checkbox 
                          checked={selectedDocuments.includes(doc.id)}
                          onCheckedChange={() => handleDocumentSelect(doc.id)}
                        />
                      )}
                      {doc.status !== "verified" && <div className="w-4" />}
                      {getDocumentIcon(doc.documentType)}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.category} • Uploaded by {doc.uploadedBy} • {doc.date} • {doc.size}
                        </p>
                        {doc.sentTo.length > 0 && (
                          <p className="text-xs text-blue-600 mt-1">
                            Sent to: {departments.filter(d => doc.sentTo.includes(d.id)).map(d => d.name).join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(doc.status)}
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                <CardTitle>Legal Documents</CardTitle>
                <Badge variant="secondary">{filteredDocuments.filter(d => d.category === "Legal").length}</Badge>
              </div>
              <CardDescription>Facility Agreements, Security Agreements, Legal Opinions, CP Satisfaction Letters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDocuments.filter(d => d.category === "Legal").map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getDocumentIcon(doc.documentType)}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded by {doc.uploadedBy} • {doc.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(doc.status)}
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Landmark className="h-5 w-5" />
                <CardTitle>Financial Documents</CardTitle>
                <Badge variant="secondary">{filteredDocuments.filter(d => d.category === "Financial" || d.category === "Administrative").length}</Badge>
              </div>
              <CardDescription>Disbursement Documentation, Customer Creation Forms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDocuments.filter(d => d.category === "Financial" || d.category === "Administrative").map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getDocumentIcon(doc.documentType)}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded by {doc.uploadedBy} • {doc.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(doc.status)}
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <CardTitle>Verification Documents</CardTitle>
                <Badge variant="secondary">{filteredDocuments.filter(d => d.category === "Verification").length}</Badge>
              </div>
              <CardDescription>Call Back Recordings and Verification Evidence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDocuments.filter(d => d.category === "Verification").map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getDocumentIcon(doc.documentType)}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded by {doc.uploadedBy} • {doc.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(doc.status)}
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Repository;