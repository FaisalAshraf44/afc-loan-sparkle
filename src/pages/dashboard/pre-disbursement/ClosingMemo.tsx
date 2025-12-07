import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Send, 
  Save, 
  CheckCircle2, 
  Upload, 
  ExternalLink,
  Building2,
  Scale,
  ShieldCheck,
  Landmark,
  FileCheck,
  Leaf,
  AlertTriangle,
  ArrowRight,
  Clock,
  UserCheck,
  XCircle,
  Plus,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";

interface DealChange {
  id: string;
  category: string;
  originalValue: string;
  newValue: string;
  reason: string;
  approvedBy: string;
}

interface CPWaiver {
  id: string;
  cpName: string;
  status: "waived" | "deferred" | "modified";
  reason: string;
  riskMitigation: string;
  approvedBy: string;
  approvalDate: string;
}

const ClosingMemo = () => {
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<string>("");
  const [activeTab, setActiveTab] = useState("overview");
  
  // Approval workflow state
  const [approvalStatus, setApprovalStatus] = useState<"draft" | "pending-divisional" | "divisional-approved" | "pending-exco" | "exco-approved">("draft");
  const [divisionalApprovalDate, setDivisionalApprovalDate] = useState<string>("");
  const [divisionalApprover, setDivisionalApprover] = useState<string>("");
  
  // Deal structure changes
  const [dealChanges, setDealChanges] = useState<DealChange[]>([
    {
      id: "1",
      category: "Facility Amount",
      originalValue: "$5,000,000",
      newValue: "$4,800,000",
      reason: "Reduced based on updated project costs",
      approvedBy: "InvestCo"
    }
  ]);
  
  // CP Waivers/Deferrals
  const [cpWaivers, setCpWaivers] = useState<CPWaiver[]>([
    {
      id: "1",
      cpName: "Audited Financial Statements FY2024",
      status: "deferred",
      reason: "Audit in progress, expected completion within 30 days",
      riskMitigation: "Unaudited statements reviewed; withhold 10% of disbursement until received",
      approvedBy: "Risk Committee",
      approvalDate: "2025-10-20"
    }
  ]);
  
  // Departmental clearances state
  const [clearances, setClearances] = useState({
    legal: "",
    risk: "",
    treasury: "",
    corporate: "",
    environmental: ""
  });

  // List of approved applications with all CPs satisfied
  const applications = [
    { 
      id: "AFC-2025-001", 
      name: "Tech Corp Acquisition", 
      code: "TCA-001",
      borrower: "Tech Corp Ltd",
      division: "Private Equity",
      divisionalHead: "John Smith",
      facilityType: "Term Loan",
      approvedAmount: 5000000,
      approvalLevel: "Board",
      approvalDate: "2025-10-15",
      totalCPs: 12,
      completedCPs: 12,
      deferredCPs: 0
    },
    { 
      id: "AFC-2025-002", 
      name: "Green Energy Project", 
      code: "GEP-002",
      borrower: "GreenTech Solutions",
      division: "Infrastructure",
      divisionalHead: "Sarah Johnson",
      facilityType: "Project Finance",
      approvedAmount: 8500000,
      approvalLevel: "Board",
      approvalDate: "2025-10-10",
      totalCPs: 15,
      completedCPs: 14,
      deferredCPs: 1
    },
    { 
      id: "AFC-2025-003", 
      name: "Real Estate Development", 
      code: "RED-003",
      borrower: "Cityscape Developers",
      division: "Real Estate",
      divisionalHead: "Michael Chen",
      facilityType: "Senior Debt",
      approvedAmount: 12000000,
      approvalLevel: "BRIC",
      approvalDate: "2025-10-08",
      totalCPs: 18,
      completedCPs: 18,
      deferredCPs: 0
    },
  ];

  const selectedApp = applications.find(app => app.id === selectedApplication);

  // Calculate departmental clearance progress
  const clearanceCount = Object.values(clearances).filter(val => val === "yes").length;
  const clearanceProgress = (clearanceCount / 5) * 100;

  // Handle submit to Divisional Head
  const handleSubmitToDivisional = () => {
    if (!selectedApplication) {
      toast({
        title: "Validation Error",
        description: "Please select an application first.",
        variant: "destructive"
      });
      return;
    }

    setApprovalStatus("pending-divisional");
    toast({
      title: "Submitted for Divisional Approval",
      description: `Closing memo sent to ${selectedApp?.divisionalHead} for approval.`,
    });
  };

  // Handle Divisional Head approval
  const handleDivisionalApproval = () => {
    setApprovalStatus("divisional-approved");
    setDivisionalApprovalDate(new Date().toISOString().split('T')[0]);
    setDivisionalApprover(selectedApp?.divisionalHead || "");
    toast({
      title: "Divisional Head Approved",
      description: "Closing memo approved by Divisional Head. Ready for EXCO Secretary submission.",
    });
  };

  // Handle submit to EXCO Secretary
  const handleSubmitToEXCO = () => {
    if (approvalStatus !== "divisional-approved") {
      toast({
        title: "Approval Required",
        description: "Divisional Head approval is required before submitting to EXCO Secretary.",
        variant: "destructive"
      });
      return;
    }

    setApprovalStatus("pending-exco");
    toast({
      title: "Submitted to EXCO Secretary",
      description: "Closing memo submitted to EXCO Secretary for EXCO approval to proceed to disbursement.",
    });
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Closing memo saved as draft.",
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Download Complete",
      description: "Closing memo downloaded successfully.",
    });
  };

  // Add new deal change
  const addDealChange = () => {
    const newChange: DealChange = {
      id: Date.now().toString(),
      category: "",
      originalValue: "",
      newValue: "",
      reason: "",
      approvedBy: ""
    };
    setDealChanges([...dealChanges, newChange]);
  };

  // Add new CP waiver
  const addCPWaiver = () => {
    const newWaiver: CPWaiver = {
      id: Date.now().toString(),
      cpName: "",
      status: "waived",
      reason: "",
      riskMitigation: "",
      approvedBy: "",
      approvalDate: ""
    };
    setCpWaivers([...cpWaivers, newWaiver]);
  };

  const getApprovalStatusBadge = () => {
    switch (approvalStatus) {
      case "draft":
        return <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" /> Draft</Badge>;
      case "pending-divisional":
        return <Badge variant="outline" className="border-amber-500 text-amber-600"><Clock className="mr-1 h-3 w-3" /> Pending Divisional Approval</Badge>;
      case "divisional-approved":
        return <Badge variant="outline" className="border-green-500 text-green-600"><CheckCircle2 className="mr-1 h-3 w-3" /> Divisional Approved</Badge>;
      case "pending-exco":
        return <Badge variant="outline" className="border-blue-500 text-blue-600"><Clock className="mr-1 h-3 w-3" /> Pending EXCO Review</Badge>;
      case "exco-approved":
        return <Badge className="bg-green-600"><CheckCircle2 className="mr-1 h-3 w-3" /> EXCO Approved</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Closing Memo</h2>
            <p className="text-muted-foreground">Pre-disbursement clearance with deal changes and CP status</p>
          </div>
          {selectedApp && getApprovalStatusBadge()}
        </div>
      </div>

      {/* Approval Workflow Progress */}
      {selectedApp && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between gap-2 text-sm">
              <div className={`flex flex-col items-center flex-1 ${approvalStatus !== "draft" ? "text-green-600" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${approvalStatus !== "draft" ? "bg-green-100" : "bg-muted"}`}>
                  <FileText className="h-4 w-4" />
                </div>
                <span className="text-xs text-center">Draft</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className={`flex flex-col items-center flex-1 ${["divisional-approved", "pending-exco", "exco-approved"].includes(approvalStatus) ? "text-green-600" : approvalStatus === "pending-divisional" ? "text-amber-600" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${["divisional-approved", "pending-exco", "exco-approved"].includes(approvalStatus) ? "bg-green-100" : approvalStatus === "pending-divisional" ? "bg-amber-100" : "bg-muted"}`}>
                  <UserCheck className="h-4 w-4" />
                </div>
                <span className="text-xs text-center">Divisional Head</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className={`flex flex-col items-center flex-1 ${approvalStatus === "exco-approved" ? "text-green-600" : approvalStatus === "pending-exco" ? "text-blue-600" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${approvalStatus === "exco-approved" ? "bg-green-100" : approvalStatus === "pending-exco" ? "bg-blue-100" : "bg-muted"}`}>
                  <Send className="h-4 w-4" />
                </div>
                <span className="text-xs text-center">EXCO Secretary</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className={`flex flex-col items-center flex-1 ${approvalStatus === "exco-approved" ? "text-green-600" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${approvalStatus === "exco-approved" ? "bg-green-100" : "bg-muted"}`}>
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="text-xs text-center">EXCO Approval</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {/* Section 1: Transaction Overview */}
        <Card>
          <CardHeader className="border-b border-primary/20">
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-primary rounded" />
              <CardTitle>Transaction Overview</CardTitle>
            </div>
            <CardDescription>Select application and review deal information</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="application">Select Application *</Label>
                <Select value={selectedApplication} onValueChange={setSelectedApplication}>
                  <SelectTrigger id="application">
                    <SelectValue placeholder="Select an approved application" />
                  </SelectTrigger>
                  <SelectContent>
                    {applications.map((app) => (
                      <SelectItem key={app.id} value={app.id}>
                        {app.name} - {app.borrower} (${(app.approvedAmount / 1000000).toFixed(1)}M)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedApp && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Deal Name</Label>
                      <p className="font-medium">{selectedApp.name}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Project Code</Label>
                      <p className="font-medium">{selectedApp.code}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Borrower</Label>
                      <p className="font-medium">{selectedApp.borrower}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Division</Label>
                      <p className="font-medium">{selectedApp.division}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Facility Type</Label>
                      <p className="font-medium">{selectedApp.facilityType}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Approved Amount</Label>
                      <p className="font-medium">${selectedApp.approvedAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Approval Level</Label>
                      <Badge variant="default">{selectedApp.approvalLevel}</Badge>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Approval Date</Label>
                      <p className="font-medium">{selectedApp.approvalDate}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {selectedApp && (
          <>
            {/* Section 2: CP Summary */}
            <Card>
              <CardHeader className="border-b border-primary/20">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-12 bg-primary rounded" />
                  <CardTitle>Conditions Precedent Summary</CardTitle>
                </div>
                <CardDescription>Review status of all conditions precedent</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary/5 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-primary">{selectedApp.totalCPs}</p>
                      <p className="text-sm text-muted-foreground">Total CPs</p>
                    </div>
                    <div className="bg-green-500/10 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">{selectedApp.completedCPs}</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                    <div className="bg-amber-500/10 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-amber-600">{selectedApp.deferredCPs}</p>
                      <p className="text-sm text-muted-foreground">Deferred/Waived</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cp-summary">CP Summary Notes</Label>
                    <Textarea
                      id="cp-summary"
                      placeholder="Provide detailed notes on CP completion status..."
                      rows={3}
                    />
                  </div>

                  <Button variant="outline" asChild className="w-full">
                    <Link to="/dashboard/pre-disbursement/cp-tracker">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View CP Tracker
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Deal Structure Changes */}
            <Card>
              <CardHeader className="border-b border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-12 bg-primary rounded" />
                      <CardTitle>Deal Structure Changes</CardTitle>
                    </div>
                    <CardDescription>Document any changes from the original approved terms</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={addDealChange}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add Change
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {dealChanges.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileCheck className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No deal structure changes recorded</p>
                    <p className="text-sm">Click "Add Change" if there are modifications to the original terms</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dealChanges.map((change, index) => (
                      <div key={change.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">Change #{index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setDealChanges(dealChanges.filter(c => c.id !== change.id))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Category</Label>
                            <Select
                              value={change.category}
                              onValueChange={(val) => {
                                const updated = dealChanges.map(c => c.id === change.id ? {...c, category: val} : c);
                                setDealChanges(updated);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="facility-amount">Facility Amount</SelectItem>
                                <SelectItem value="interest-rate">Interest Rate</SelectItem>
                                <SelectItem value="tenor">Tenor</SelectItem>
                                <SelectItem value="security">Security Package</SelectItem>
                                <SelectItem value="covenants">Covenants</SelectItem>
                                <SelectItem value="disbursement">Disbursement Schedule</SelectItem>
                                <SelectItem value="repayment">Repayment Terms</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Approved By</Label>
                            <Select
                              value={change.approvedBy}
                              onValueChange={(val) => {
                                const updated = dealChanges.map(c => c.id === change.id ? {...c, approvedBy: val} : c);
                                setDealChanges(updated);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select approver" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Sub-InvestCo">Sub-InvestCo</SelectItem>
                                <SelectItem value="InvestCo">InvestCo</SelectItem>
                                <SelectItem value="BRIC">BRIC</SelectItem>
                                <SelectItem value="Board">Board</SelectItem>
                                <SelectItem value="Divisional Head">Divisional Head</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Original Value</Label>
                            <Input
                              value={change.originalValue}
                              onChange={(e) => {
                                const updated = dealChanges.map(c => c.id === change.id ? {...c, originalValue: e.target.value} : c);
                                setDealChanges(updated);
                              }}
                              placeholder="Original approved value"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>New Value</Label>
                            <Input
                              value={change.newValue}
                              onChange={(e) => {
                                const updated = dealChanges.map(c => c.id === change.id ? {...c, newValue: e.target.value} : c);
                                setDealChanges(updated);
                              }}
                              placeholder="Updated value"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Reason for Change</Label>
                          <Textarea
                            value={change.reason}
                            onChange={(e) => {
                              const updated = dealChanges.map(c => c.id === change.id ? {...c, reason: e.target.value} : c);
                              setDealChanges(updated);
                            }}
                            placeholder="Explain why this change was made..."
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section 4: CP Waivers & Deferrals */}
            <Card>
              <CardHeader className="border-b border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-12 bg-primary rounded" />
                      <CardTitle>CP Waivers & Deferrals</CardTitle>
                    </div>
                    <CardDescription>Document any conditions that were waived, deferred, or modified</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={addCPWaiver}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add Waiver/Deferral
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {cpWaivers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>All conditions precedent satisfied as originally approved</p>
                    <p className="text-sm">Click "Add Waiver/Deferral" if any CPs were modified</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cpWaivers.map((waiver, index) => (
                      <div key={waiver.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">CP #{index + 1}</h4>
                            {waiver.status === "waived" && (
                              <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" /> Waived</Badge>
                            )}
                            {waiver.status === "deferred" && (
                              <Badge variant="outline" className="border-amber-500 text-amber-600"><Clock className="mr-1 h-3 w-3" /> Deferred</Badge>
                            )}
                            {waiver.status === "modified" && (
                              <Badge variant="outline" className="border-blue-500 text-blue-600"><AlertTriangle className="mr-1 h-3 w-3" /> Modified</Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setCpWaivers(cpWaivers.filter(w => w.id !== waiver.id))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Condition Precedent Name</Label>
                            <Input
                              value={waiver.cpName}
                              onChange={(e) => {
                                const updated = cpWaivers.map(w => w.id === waiver.id ? {...w, cpName: e.target.value} : w);
                                setCpWaivers(updated);
                              }}
                              placeholder="Name of the condition"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                              value={waiver.status}
                              onValueChange={(val: "waived" | "deferred" | "modified") => {
                                const updated = cpWaivers.map(w => w.id === waiver.id ? {...w, status: val} : w);
                                setCpWaivers(updated);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="waived">Waived</SelectItem>
                                <SelectItem value="deferred">Deferred</SelectItem>
                                <SelectItem value="modified">Modified</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Reason</Label>
                          <Textarea
                            value={waiver.reason}
                            onChange={(e) => {
                              const updated = cpWaivers.map(w => w.id === waiver.id ? {...w, reason: e.target.value} : w);
                              setCpWaivers(updated);
                            }}
                            placeholder="Explain why this CP was waived/deferred/modified..."
                            rows={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Risk Mitigation Measures</Label>
                          <Textarea
                            value={waiver.riskMitigation}
                            onChange={(e) => {
                              const updated = cpWaivers.map(w => w.id === waiver.id ? {...w, riskMitigation: e.target.value} : w);
                              setCpWaivers(updated);
                            }}
                            placeholder="What measures are in place to mitigate the risk of this waiver/deferral..."
                            rows={2}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Approved By</Label>
                            <Select
                              value={waiver.approvedBy}
                              onValueChange={(val) => {
                                const updated = cpWaivers.map(w => w.id === waiver.id ? {...w, approvedBy: val} : w);
                                setCpWaivers(updated);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select approver" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Risk Committee">Risk Committee</SelectItem>
                                <SelectItem value="InvestCo">InvestCo</SelectItem>
                                <SelectItem value="BRIC">BRIC</SelectItem>
                                <SelectItem value="Board">Board</SelectItem>
                                <SelectItem value="Divisional Head">Divisional Head</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Approval Date</Label>
                            <Input
                              type="date"
                              value={waiver.approvalDate}
                              onChange={(e) => {
                                const updated = cpWaivers.map(w => w.id === waiver.id ? {...w, approvalDate: e.target.value} : w);
                                setCpWaivers(updated);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section 5: Departmental Clearances */}
            <Card>
              <CardHeader className="border-b border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-12 bg-primary rounded" />
                      <CardTitle>Departmental Clearances</CardTitle>
                    </div>
                    <CardDescription>Obtain clearance from all required departments</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{clearanceCount}/5</p>
                    <p className="text-xs text-muted-foreground">Cleared</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm">Overall Progress</Label>
                      <span className="text-sm font-medium">{clearanceProgress.toFixed(0)}%</span>
                    </div>
                    <Progress value={clearanceProgress} className="h-2" />
                  </div>

                  {/* Legal Clearance */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Scale className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Legal Clearance</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="legal-status">Status *</Label>
                        <Select value={clearances.legal} onValueChange={(val) => setClearances({...clearances, legal: val})}>
                          <SelectTrigger id="legal-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes - Cleared</SelectItem>
                            <SelectItem value="no">No - Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="legal-doc">Upload Document</Label>
                        <div className="flex gap-2">
                          <Input id="legal-doc" type="file" className="flex-1" />
                          <Button size="icon" variant="outline">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="legal-comment">Comments</Label>
                      <Textarea id="legal-comment" placeholder="Add any notes..." rows={2} />
                    </div>
                  </div>

                  {/* Risk Clearance */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Risk Clearance</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="risk-status">Status *</Label>
                        <Select value={clearances.risk} onValueChange={(val) => setClearances({...clearances, risk: val})}>
                          <SelectTrigger id="risk-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes - Cleared</SelectItem>
                            <SelectItem value="no">No - Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="risk-doc">Upload Document</Label>
                        <div className="flex gap-2">
                          <Input id="risk-doc" type="file" className="flex-1" />
                          <Button size="icon" variant="outline">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="risk-comment">Comments</Label>
                      <Textarea id="risk-comment" placeholder="Add any notes..." rows={2} />
                    </div>
                  </div>

                  {/* Treasury Readiness */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Landmark className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Treasury Readiness</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="treasury-status">Status *</Label>
                        <Select value={clearances.treasury} onValueChange={(val) => setClearances({...clearances, treasury: val})}>
                          <SelectTrigger id="treasury-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes - Cleared</SelectItem>
                            <SelectItem value="no">No - Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="treasury-doc">Upload Document</Label>
                        <div className="flex gap-2">
                          <Input id="treasury-doc" type="file" className="flex-1" />
                          <Button size="icon" variant="outline">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="treasury-comment">Comments</Label>
                      <Textarea id="treasury-comment" placeholder="Add any notes..." rows={2} />
                    </div>
                  </div>

                  {/* Corporate Secretariat */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Corporate Secretariat Clearance</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="corporate-status">Status *</Label>
                        <Select value={clearances.corporate} onValueChange={(val) => setClearances({...clearances, corporate: val})}>
                          <SelectTrigger id="corporate-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes - Cleared</SelectItem>
                            <SelectItem value="no">No - Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="corporate-doc">Upload Document</Label>
                        <div className="flex gap-2">
                          <Input id="corporate-doc" type="file" className="flex-1" />
                          <Button size="icon" variant="outline">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="corporate-comment">Comments</Label>
                      <Textarea id="corporate-comment" placeholder="Add any notes..." rows={2} />
                    </div>
                  </div>

                  {/* E&S Clearance */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Environmental & Social (E&S) Clearance</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="environmental-status">Status *</Label>
                        <Select value={clearances.environmental} onValueChange={(val) => setClearances({...clearances, environmental: val})}>
                          <SelectTrigger id="environmental-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes - Cleared</SelectItem>
                            <SelectItem value="no">No - Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="environmental-doc">Upload Document</Label>
                        <div className="flex gap-2">
                          <Input id="environmental-doc" type="file" className="flex-1" />
                          <Button size="icon" variant="outline">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="environmental-comment">Comments</Label>
                      <Textarea id="environmental-comment" placeholder="Add any notes..." rows={2} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Financial Details */}
            <Card>
              <CardHeader className="border-b border-primary/20">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-12 bg-primary rounded" />
                  <CardTitle>Financial Details</CardTitle>
                </div>
                <CardDescription>Specify disbursement and funding information</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="disbursement-amount">Disbursement Amount *</Label>
                      <Input 
                        id="disbursement-amount" 
                        type="number" 
                        placeholder="Enter amount"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="disbursement-currency">Disbursement Currency *</Label>
                      <Select required>
                        <SelectTrigger id="disbursement-currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD</SelectItem>
                          <SelectItem value="eur">EUR</SelectItem>
                          <SelectItem value="gbp">GBP</SelectItem>
                          <SelectItem value="local">Local Currency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="disbursement-date">Disbursement Date *</Label>
                      <Input 
                        id="disbursement-date" 
                        type="date" 
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="funding-source">Funding Source *</Label>
                      <Select required>
                        <SelectTrigger id="funding-source">
                          <SelectValue placeholder="Select funding source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="own-funds">Own Funds</SelectItem>
                          <SelectItem value="syndication">Syndication</SelectItem>
                          <SelectItem value="donor">Donor Funding</SelectItem>
                          <SelectItem value="mixed">Mixed Funding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bank-details">Bank / Account Details *</Label>
                    <Textarea
                      id="bank-details"
                      placeholder="Bank name, account number, SWIFT code, etc."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="treasury-notes">Treasury Notes</Label>
                    <Textarea
                      id="treasury-notes"
                      placeholder="Additional treasury instructions or notes..."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 5: Approvals & Attachments */}
            <Card>
              <CardHeader className="border-b border-primary/20">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-12 bg-primary rounded" />
                  <CardTitle>Approvals & Attachments</CardTitle>
                </div>
                <CardDescription>Final sign-off and supporting documents</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prepared-by">Prepared By</Label>
                      <Input 
                        id="prepared-by" 
                        value="Current User" 
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-prepared">Date Prepared</Label>
                      <Input 
                        id="date-prepared" 
                        type="date"
                        value={new Date().toISOString().split('T')[0]}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reviewed-by">Reviewed By</Label>
                      <Select>
                        <SelectTrigger id="reviewed-by">
                          <SelectValue placeholder="Select reviewer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="head-legal">Head of Legal</SelectItem>
                          <SelectItem value="head-risk">Head of Risk</SelectItem>
                          <SelectItem value="cfo">CFO</SelectItem>
                          <SelectItem value="coo">COO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="approved-by">Approved By</Label>
                      <Input 
                        id="approved-by" 
                        value="Pending EXCO Review" 
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supporting-docs">Attach Supporting Documents</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="supporting-docs" 
                        type="file" 
                        multiple
                        className="flex-1"
                      />
                      <Button size="icon" variant="outline">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Upload signed clearance memos, legal opinions, and other supporting documents
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional-notes">Additional Notes</Label>
                    <Textarea
                      id="additional-notes"
                      placeholder="Any other relevant information..."
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  {/* Divisional Approval Section */}
                  {approvalStatus === "draft" && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <UserCheck className="h-5 w-5 text-amber-600" />
                        <h4 className="font-semibold text-amber-800">Step 1: Divisional Head Approval Required</h4>
                      </div>
                      <p className="text-sm text-amber-700 mb-3">
                        The closing memo must be approved by {selectedApp?.divisionalHead} before submission to EXCO Secretary.
                      </p>
                      <Button onClick={handleSubmitToDivisional} className="bg-amber-600 hover:bg-amber-700">
                        <Send className="mr-2 h-4 w-4" />
                        Submit to Divisional Head
                      </Button>
                    </div>
                  )}

                  {approvalStatus === "pending-divisional" && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-amber-600" />
                        <h4 className="font-semibold text-amber-800">Awaiting Divisional Head Approval</h4>
                      </div>
                      <p className="text-sm text-amber-700 mb-3">
                        Submitted to {selectedApp?.divisionalHead} for review and approval.
                      </p>
                      {/* For demo purposes, allow simulating approval */}
                      <Button onClick={handleDivisionalApproval} variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-100">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Simulate Divisional Approval
                      </Button>
                    </div>
                  )}

                  {approvalStatus === "divisional-approved" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <h4 className="font-semibold text-green-800">Step 2: Ready for EXCO Secretary Submission</h4>
                      </div>
                      <div className="text-sm text-green-700 mb-3">
                        <p>Approved by: <strong>{divisionalApprover}</strong></p>
                        <p>Approval Date: <strong>{divisionalApprovalDate}</strong></p>
                      </div>
                      <Button onClick={handleSubmitToEXCO}>
                        <Send className="mr-2 h-4 w-4" />
                        Submit to EXCO Secretary
                      </Button>
                    </div>
                  )}

                  {approvalStatus === "pending-exco" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold text-blue-800">Pending EXCO Approval</h4>
                      </div>
                      <p className="text-sm text-blue-700">
                        The closing memo has been submitted to the EXCO Secretary and is awaiting EXCO approval to proceed to disbursement.
                      </p>
                    </div>
                  )}

                  <Separator />

                  <div className="flex flex-col md:flex-row gap-3">
                    <Button 
                      onClick={handleSaveDraft}
                      variant="outline" 
                      className="flex-1"
                      disabled={approvalStatus !== "draft"}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Draft
                    </Button>
                    <Button 
                      onClick={handleDownloadPDF}
                      variant="secondary" 
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default ClosingMemo;
