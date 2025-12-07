import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { 
  FileText, 
  Send, 
  CheckCircle, 
  Clock, 
  Eye,
  Edit,
  Plus,
  AlertTriangle,
  Shield,
  Users,
  Megaphone,
  FileCheck,
  XCircle
} from "lucide-react";

interface Disclosure {
  id: string;
  dealName: string;
  client: string;
  division: string;
  investmentType: string;
  amount: string;
  summary: string;
  status: "draft" | "pending_approval" | "approved" | "submitted" | "published" | "rejected";
  createdBy: string;
  createdAt: string;
  divisionalHead?: string;
  approvalDate?: string;
  submittedDate?: string;
  policyCompliant: boolean;
  formatCompliant: boolean;
  rejectionReason?: string;
}

const initialDisclosures: Disclosure[] = [
  {
    id: "DISC-001",
    dealName: "Project Alpha",
    client: "Tech Innovations Ltd",
    division: "Infrastructure",
    investmentType: "Senior Debt",
    amount: "$25,000,000",
    summary: "AFC has provided a $25 million senior debt facility to Tech Innovations Ltd for the development of renewable energy infrastructure in West Africa.",
    status: "submitted",
    createdBy: "John Smith",
    createdAt: "2024-01-15",
    divisionalHead: "Sarah Johnson",
    approvalDate: "2024-01-16",
    submittedDate: "2024-01-16",
    policyCompliant: true,
    formatCompliant: true,
  },
  {
    id: "DISC-002",
    dealName: "Project Beta",
    client: "Green Energy Corp",
    division: "Energy",
    investmentType: "Equity Investment",
    amount: "$15,000,000",
    summary: "AFC announces equity investment in Green Energy Corp's solar power expansion project.",
    status: "pending_approval",
    createdBy: "Michael Brown",
    createdAt: "2024-01-18",
    policyCompliant: true,
    formatCompliant: true,
  },
  {
    id: "DISC-003",
    dealName: "Project Gamma",
    client: "Retail Ventures LLC",
    division: "Trade Finance",
    investmentType: "Trade Finance Facility",
    amount: "$8,500,000",
    summary: "Draft disclosure for trade finance facility.",
    status: "draft",
    createdBy: "Emily Davis",
    createdAt: "2024-01-20",
    policyCompliant: false,
    formatCompliant: false,
  },
];

const disclosureTemplate = `[INVESTMENT DISCLOSURE SUMMARY]

Transaction Title: [Deal Name]
Client/Counterparty: [Client Name]
Investment Type: [Type]
Investment Amount: [Amount]
Sector: [Sector]
Country/Region: [Location]

EXECUTIVE SUMMARY:
[Brief description of the investment, its purpose, and expected impact]

DEVELOPMENT IMPACT:
[Description of expected development outcomes and alignment with AFC's mandate]

ENVIRONMENTAL & SOCIAL CONSIDERATIONS:
[Brief note on E&S classification and key considerations]

---
This disclosure is prepared in accordance with AFC's Public Disclosure Policy.
For media inquiries, please contact the Communications Team.`;

export default function InvestmentDisclosure() {
  const [disclosures, setDisclosures] = useState<Disclosure[]>(initialDisclosures);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedDisclosure, setSelectedDisclosure] = useState<Disclosure | null>(null);
  
  // Create form state
  const [newDisclosure, setNewDisclosure] = useState({
    dealName: "",
    client: "",
    division: "",
    investmentType: "",
    amount: "",
    summary: "",
  });
  
  const [complianceChecks, setComplianceChecks] = useState({
    policyCompliant: false,
    formatCompliant: false,
    sensitiveInfoRemoved: false,
    legalReviewed: false,
  });

  // Approval state
  const [approvalDecision, setApprovalDecision] = useState<"approve" | "reject" | "">("");
  const [rejectionReason, setRejectionReason] = useState("");

  const getStatusBadge = (status: string) => {
    const config: Record<string, { class: string; label: string; icon: typeof Clock }> = {
      draft: { class: "bg-gray-500/20 text-gray-400 border-gray-500/30", label: "Draft", icon: Edit },
      pending_approval: { class: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", label: "Pending Approval", icon: Clock },
      approved: { class: "bg-green-500/20 text-green-400 border-green-500/30", label: "Approved", icon: CheckCircle },
      submitted: { class: "bg-blue-500/20 text-blue-400 border-blue-500/30", label: "Submitted to Comms", icon: Send },
      published: { class: "bg-purple-500/20 text-purple-400 border-purple-500/30", label: "Published", icon: Megaphone },
      rejected: { class: "bg-red-500/20 text-red-400 border-red-500/30", label: "Rejected", icon: XCircle },
    };
    
    const { class: className, label, icon: Icon } = config[status] || config.draft;
    
    return (
      <Badge className={className}>
        <Icon className="h-3 w-3 mr-1" />
        {label}
      </Badge>
    );
  };

  const handleCreateDisclosure = () => {
    if (!newDisclosure.dealName || !newDisclosure.client || !newDisclosure.summary) {
      toast.error("Please fill in all required fields");
      return;
    }

    const disclosure: Disclosure = {
      id: `DISC-${String(disclosures.length + 1).padStart(3, '0')}`,
      ...newDisclosure,
      status: "draft",
      createdBy: "Current User",
      createdAt: new Date().toISOString().split('T')[0],
      policyCompliant: complianceChecks.policyCompliant,
      formatCompliant: complianceChecks.formatCompliant,
    };

    setDisclosures(prev => [disclosure, ...prev]);
    toast.success("Disclosure Draft Created", {
      description: "Investment disclosure summary has been saved as draft"
    });

    setShowCreateDialog(false);
    setNewDisclosure({ dealName: "", client: "", division: "", investmentType: "", amount: "", summary: "" });
    setComplianceChecks({ policyCompliant: false, formatCompliant: false, sensitiveInfoRemoved: false, legalReviewed: false });
  };

  const handleSubmitForApproval = (disclosure: Disclosure) => {
    if (!disclosure.policyCompliant || !disclosure.formatCompliant) {
      toast.error("Disclosure must be policy and format compliant before submission");
      return;
    }

    setDisclosures(prev => prev.map(d => 
      d.id === disclosure.id 
        ? { ...d, status: "pending_approval" as const }
        : d
    ));

    toast.success("Submitted for Approval", {
      description: "Disclosure sent to Divisional Head for approval"
    });
  };

  const handleApprovalDecision = () => {
    if (!selectedDisclosure || !approvalDecision) return;

    if (approvalDecision === "approve") {
      setDisclosures(prev => prev.map(d => 
        d.id === selectedDisclosure.id 
          ? { 
              ...d, 
              status: "approved" as const,
              divisionalHead: "Sarah Johnson",
              approvalDate: new Date().toISOString().split('T')[0]
            }
          : d
      ));

      toast.success("Disclosure Approved", {
        description: "Ready to submit to Communications Team"
      });
    } else {
      setDisclosures(prev => prev.map(d => 
        d.id === selectedDisclosure.id 
          ? { 
              ...d, 
              status: "rejected" as const,
              rejectionReason
            }
          : d
      ));

      toast.error("Disclosure Rejected", {
        description: "Returned to Transaction Team for revision"
      });
    }

    setShowApprovalDialog(false);
    setApprovalDecision("");
    setRejectionReason("");
  };

  const handleSubmitToComms = (disclosure: Disclosure) => {
    setDisclosures(prev => prev.map(d => 
      d.id === disclosure.id 
        ? { 
            ...d, 
            status: "submitted" as const,
            submittedDate: new Date().toISOString().split('T')[0]
          }
        : d
    ));

    toast.success("Submitted to Communications Team", {
      description: "Investment disclosure has been sent for publication processing"
    });
  };

  const draftCount = disclosures.filter(d => d.status === "draft").length;
  const pendingCount = disclosures.filter(d => d.status === "pending_approval").length;
  const approvedCount = disclosures.filter(d => d.status === "approved").length;
  const submittedCount = disclosures.filter(d => d.status === "submitted" || d.status === "published").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Investment Disclosure</h1>
          <p className="text-muted-foreground mt-1">Draft and submit investment disclosure summaries to Communications Team</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Disclosure
        </Button>
      </div>

      {/* Policy Notice */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-blue-500/20">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Public Disclosure Policy</h3>
              <p className="text-sm text-muted-foreground mt-1">
                All investment disclosures must align with AFC's Public Disclosure Policy and follow the pre-agreed format. 
                Disclosures require Divisional Head approval before submission to the Communications Team.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-500/20">
                <Edit className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold">{draftCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">{approvedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Send className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="text-2xl font-bold">{submittedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Disclosures</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="approved">Ready to Submit</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <DisclosureTable 
            disclosures={disclosures}
            getStatusBadge={getStatusBadge}
            onView={(d) => { setSelectedDisclosure(d); setShowViewDialog(true); }}
            onSubmitForApproval={handleSubmitForApproval}
            onApprove={(d) => { setSelectedDisclosure(d); setShowApprovalDialog(true); }}
            onSubmitToComms={handleSubmitToComms}
          />
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          <DisclosureTable 
            disclosures={disclosures.filter(d => d.status === "draft")}
            getStatusBadge={getStatusBadge}
            onView={(d) => { setSelectedDisclosure(d); setShowViewDialog(true); }}
            onSubmitForApproval={handleSubmitForApproval}
            onApprove={(d) => { setSelectedDisclosure(d); setShowApprovalDialog(true); }}
            onSubmitToComms={handleSubmitToComms}
          />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <DisclosureTable 
            disclosures={disclosures.filter(d => d.status === "pending_approval")}
            getStatusBadge={getStatusBadge}
            onView={(d) => { setSelectedDisclosure(d); setShowViewDialog(true); }}
            onSubmitForApproval={handleSubmitForApproval}
            onApprove={(d) => { setSelectedDisclosure(d); setShowApprovalDialog(true); }}
            onSubmitToComms={handleSubmitToComms}
          />
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <DisclosureTable 
            disclosures={disclosures.filter(d => d.status === "approved")}
            getStatusBadge={getStatusBadge}
            onView={(d) => { setSelectedDisclosure(d); setShowViewDialog(true); }}
            onSubmitForApproval={handleSubmitForApproval}
            onApprove={(d) => { setSelectedDisclosure(d); setShowApprovalDialog(true); }}
            onSubmitToComms={handleSubmitToComms}
          />
        </TabsContent>
      </Tabs>

      {/* Create Disclosure Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Create Investment Disclosure
            </DialogTitle>
            <DialogDescription>
              Draft a new investment disclosure summary following AFC's disclosure policy
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Deal/Project Name *</Label>
                <Input 
                  placeholder="e.g., Project Alpha"
                  value={newDisclosure.dealName}
                  onChange={(e) => setNewDisclosure(prev => ({ ...prev, dealName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Client/Counterparty *</Label>
                <Input 
                  placeholder="e.g., Tech Innovations Ltd"
                  value={newDisclosure.client}
                  onChange={(e) => setNewDisclosure(prev => ({ ...prev, client: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Division</Label>
                <Select value={newDisclosure.division} onValueChange={(v) => setNewDisclosure(prev => ({ ...prev, division: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="Energy">Energy</SelectItem>
                    <SelectItem value="Trade Finance">Trade Finance</SelectItem>
                    <SelectItem value="Financial Services">Financial Services</SelectItem>
                    <SelectItem value="Natural Resources">Natural Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Investment Type</Label>
                <Select value={newDisclosure.investmentType} onValueChange={(v) => setNewDisclosure(prev => ({ ...prev, investmentType: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Senior Debt">Senior Debt</SelectItem>
                    <SelectItem value="Subordinated Debt">Subordinated Debt</SelectItem>
                    <SelectItem value="Equity Investment">Equity Investment</SelectItem>
                    <SelectItem value="Mezzanine Finance">Mezzanine Finance</SelectItem>
                    <SelectItem value="Trade Finance Facility">Trade Finance Facility</SelectItem>
                    <SelectItem value="Guarantee">Guarantee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Investment Amount</Label>
              <Input 
                placeholder="e.g., $25,000,000"
                value={newDisclosure.amount}
                onChange={(e) => setNewDisclosure(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Disclosure Summary *</Label>
              <Textarea 
                placeholder="Enter the investment disclosure summary following the pre-agreed format..."
                value={newDisclosure.summary}
                onChange={(e) => setNewDisclosure(prev => ({ ...prev, summary: e.target.value }))}
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Ensure the summary aligns with AFC's public disclosure policy and follows the standard format.
              </p>
            </div>

            <Card className="bg-muted/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileCheck className="h-4 w-4" />
                  Compliance Checklist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="policy" 
                    checked={complianceChecks.policyCompliant}
                    onCheckedChange={(checked) => setComplianceChecks(prev => ({ ...prev, policyCompliant: !!checked }))}
                  />
                  <label htmlFor="policy" className="text-sm">Aligned with AFC's Public Disclosure Policy</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="format" 
                    checked={complianceChecks.formatCompliant}
                    onCheckedChange={(checked) => setComplianceChecks(prev => ({ ...prev, formatCompliant: !!checked }))}
                  />
                  <label htmlFor="format" className="text-sm">Follows pre-agreed disclosure format</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sensitive" 
                    checked={complianceChecks.sensitiveInfoRemoved}
                    onCheckedChange={(checked) => setComplianceChecks(prev => ({ ...prev, sensitiveInfoRemoved: !!checked }))}
                  />
                  <label htmlFor="sensitive" className="text-sm">No confidential/sensitive information included</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="legal" 
                    checked={complianceChecks.legalReviewed}
                    onCheckedChange={(checked) => setComplianceChecks(prev => ({ ...prev, legalReviewed: !!checked }))}
                  />
                  <label htmlFor="legal" className="text-sm">Legal review completed (if required)</label>
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateDisclosure}>
              <FileText className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Divisional Head Approval
            </DialogTitle>
            <DialogDescription>
              Review and approve disclosure for {selectedDisclosure?.dealName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDisclosure && (
            <div className="space-y-4">
              <Card className="bg-muted/50">
                <CardContent className="pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deal:</span>
                    <span className="font-medium">{selectedDisclosure.dealName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Client:</span>
                    <span>{selectedDisclosure.client}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-semibold">{selectedDisclosure.amount}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="p-4 border rounded-lg bg-muted/30">
                <Label className="text-sm font-medium">Disclosure Summary</Label>
                <p className="text-sm mt-2">{selectedDisclosure.summary}</p>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  {selectedDisclosure.policyCompliant ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className="text-sm">Policy Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedDisclosure.formatCompliant ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className="text-sm">Format Compliant</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Decision *</Label>
                <Select value={approvalDecision} onValueChange={(v) => setApprovalDecision(v as "approve" | "reject")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select decision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">Approve</SelectItem>
                    <SelectItem value="reject">Reject / Request Changes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {approvalDecision === "reject" && (
                <div className="space-y-2">
                  <Label>Rejection Reason *</Label>
                  <Textarea 
                    placeholder="Provide reason for rejection or changes required..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleApprovalDecision}
              variant={approvalDecision === "reject" ? "destructive" : "default"}
            >
              {approvalDecision === "approve" ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </>
              ) : approvalDecision === "reject" ? (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </>
              ) : (
                "Submit Decision"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Investment Disclosure Details</DialogTitle>
          </DialogHeader>
          
          {selectedDisclosure && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{selectedDisclosure.id}</span>
                {getStatusBadge(selectedDisclosure.status)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Deal Name</Label>
                  <p className="font-medium">{selectedDisclosure.dealName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Client</Label>
                  <p>{selectedDisclosure.client}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Division</Label>
                  <p>{selectedDisclosure.division}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Investment Type</Label>
                  <p>{selectedDisclosure.investmentType}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Amount</Label>
                  <p className="font-semibold">{selectedDisclosure.amount}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Created By</Label>
                  <p>{selectedDisclosure.createdBy} on {selectedDisclosure.createdAt}</p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Disclosure Summary</Label>
                <p className="mt-1 p-3 bg-muted/50 rounded-lg text-sm">{selectedDisclosure.summary}</p>
              </div>

              {selectedDisclosure.divisionalHead && (
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Approved By</Label>
                    <p>{selectedDisclosure.divisionalHead}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Approval Date</Label>
                    <p>{selectedDisclosure.approvalDate}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Disclosure Table Component
interface DisclosureTableProps {
  disclosures: Disclosure[];
  getStatusBadge: (status: string) => JSX.Element;
  onView: (disclosure: Disclosure) => void;
  onSubmitForApproval: (disclosure: Disclosure) => void;
  onApprove: (disclosure: Disclosure) => void;
  onSubmitToComms: (disclosure: Disclosure) => void;
}

function DisclosureTable({ 
  disclosures, 
  getStatusBadge, 
  onView, 
  onSubmitForApproval, 
  onApprove, 
  onSubmitToComms 
}: DisclosureTableProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Deal / Client</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Compliance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disclosures.map((disclosure) => (
              <TableRow key={disclosure.id}>
                <TableCell className="font-mono text-sm">{disclosure.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{disclosure.dealName}</p>
                    <p className="text-xs text-muted-foreground">{disclosure.client}</p>
                  </div>
                </TableCell>
                <TableCell>{disclosure.division}</TableCell>
                <TableCell className="font-semibold">{disclosure.amount}</TableCell>
                <TableCell>{getStatusBadge(disclosure.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {disclosure.policyCompliant && disclosure.formatCompliant ? (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Compliant
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Review
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onView(disclosure)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {disclosure.status === "draft" && disclosure.policyCompliant && disclosure.formatCompliant && (
                      <Button size="sm" onClick={() => onSubmitForApproval(disclosure)}>
                        Submit
                      </Button>
                    )}
                    {disclosure.status === "pending_approval" && (
                      <Button size="sm" variant="outline" onClick={() => onApprove(disclosure)}>
                        Review
                      </Button>
                    )}
                    {disclosure.status === "approved" && (
                      <Button size="sm" onClick={() => onSubmitToComms(disclosure)}>
                        <Send className="h-4 w-4 mr-1" />
                        Send to Comms
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
