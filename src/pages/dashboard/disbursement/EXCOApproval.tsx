import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Plus, 
  Upload, 
  Send,
  Eye,
  AlertCircle,
  UserCheck,
  Landmark
} from "lucide-react";

interface Waiver {
  id: number;
  description: string;
  department: string;
  justification: string;
  type: "Waiver" | "Deferral";
  approved: boolean;
}

interface ExcoMember {
  id: number;
  role: string;
  name: string;
  status: "Approved" | "Pending" | "Declined";
  comment: string;
}

// Division to Department Head mapping
const divisionHeads: Record<string, { name: string; title: string }> = {
  "Financial Services": { name: "Robert Thompson", title: "Head of Financial Services" },
  "Investments": { name: "Maria Garcia", title: "Head of Investments" },
  "Infrastructure": { name: "James Wilson", title: "Head of Infrastructure" },
  "SME Finance": { name: "Patricia Brown", title: "Head of SME Finance" },
  "Private Equity": { name: "John Smith", title: "Head of Private Equity" },
  "Real Estate": { name: "Michael Chen", title: "Head of Real Estate" },
  "Trade Finance": { name: "Amanda Lee", title: "Head of Trade Finance" }
};

// Constant EXCO approvers for all disbursements
const constantApprovers = [
  { id: 1, role: "General Counsel", name: "Sarah Johnson", required: true },
  { id: 2, role: "Chief Risk Officer", name: "Michael Chen", required: true },
  { id: 3, role: "Chief Financial Officer", name: "David Williams", required: true },
  { id: 4, role: "Chief Executive Officer", name: "Jennifer Martinez", required: true }
];

export default function EXCOApproval() {
  const [selectedDeal, setSelectedDeal] = useState({
    dealName: "Tech Corp Acquisition",
    projectCode: "AFC-2025-001",
    division: "Financial Services",
    approvedAmount: 5000000,
    currency: "USD",
    totalCPs: 18,
    completedCPs: 16,
    deferredCPs: 2,
    submissionDate: "2025-10-18"
  });

  const [waivers, setWaivers] = useState<Waiver[]>([
    {
      id: 1,
      description: "Environmental Impact Assessment - Final Report",
      department: "E&S",
      justification: "Preliminary assessment completed. Final report to follow post-disbursement.",
      type: "Deferral",
      approved: false
    },
    {
      id: 2,
      description: "Insurance Certificate - Property Damage",
      department: "Insurance",
      justification: "Client has temporary coverage. Full policy renewal scheduled for next week.",
      type: "Waiver",
      approved: false
    }
  ]);

  // Department Head approval - tied to the division whose disbursement is being processed
  const [deptHead, setDeptHead] = useState({
    division: "Financial Services",
    headName: divisionHeads["Financial Services"]?.name || "",
    headTitle: divisionHeads["Financial Services"]?.title || "",
    approval: "Pending" as "Pending" | "Approved" | "Declined",
    comment: "",
    approvalDate: ""
  });

  // Update department head when division changes
  const handleDivisionChange = (division: string) => {
    const head = divisionHeads[division];
    setDeptHead({
      ...deptHead,
      division,
      headName: head?.name || "",
      headTitle: head?.title || ""
    });
    setSelectedDeal({
      ...selectedDeal,
      division
    });
  };

  // Constant EXCO approvers - always required for all disbursements
  const [excoMembers, setExcoMembers] = useState<ExcoMember[]>(
    constantApprovers.map(approver => ({
      id: approver.id,
      role: approver.role,
      name: approver.name,
      status: "Pending" as "Approved" | "Pending" | "Declined",
      comment: ""
    }))
  );

  // Track if EXCO approval is complete
  const [excoDecisionCommunicated, setExcoDecisionCommunicated] = useState(false);

  const [finalDecision, setFinalDecision] = useState({
    approved: true,
    approvalDate: "",
    notes: "",
    resolution: null as File | null
  });

  const [isWaiverModalOpen, setIsWaiverModalOpen] = useState(false);
  const [newWaiver, setNewWaiver] = useState({
    description: "",
    type: "Waiver" as "Waiver" | "Deferral",
    justification: "",
    department: ""
  });

  const approvedExcoCount = excoMembers.filter(m => m.status === "Approved").length;
  const excoProgress = (approvedExcoCount / excoMembers.length) * 100;

  const handleWaiverApproval = (id: number, approved: boolean) => {
    setWaivers(waivers.map(w => w.id === id ? { ...w, approved } : w));
  };

  const handleAddWaiver = () => {
    if (!newWaiver.description || !newWaiver.justification || !newWaiver.department) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const waiver: Waiver = {
      id: waivers.length + 1,
      description: newWaiver.description,
      department: newWaiver.department,
      justification: newWaiver.justification,
      type: newWaiver.type,
      approved: false
    };

    setWaivers([...waivers, waiver]);
    setNewWaiver({ description: "", type: "Waiver", justification: "", department: "" });
    setIsWaiverModalOpen(false);
    
    toast({
      title: "Success",
      description: "Waiver/Deferral added successfully."
    });
  };

  const handleDeptHeadApproval = (status: "Approved" | "Declined") => {
    if (!deptHead.division) {
      toast({
        title: "Missing Information",
        description: "Please select a division.",
        variant: "destructive"
      });
      return;
    }

    setDeptHead({
      ...deptHead,
      approval: status,
      approvalDate: new Date().toISOString().split('T')[0]
    });

    toast({
      title: "Success",
      description: `Department Head (${deptHead.headName}) ${status.toLowerCase()} the disbursement.`
    });
  };

  const handleExcoMemberApproval = (id: number) => {
    setExcoMembers(excoMembers.map(m => 
      m.id === id ? { ...m, status: "Approved" } : m
    ));
    
    const member = excoMembers.find(m => m.id === id);
    toast({
      title: "Success",
      description: `Approval recorded for ${member?.role}.`
    });
  };

  const handleExcoStatusChange = (id: number, status: "Approved" | "Pending" | "Declined") => {
    setExcoMembers(excoMembers.map(m => 
      m.id === id ? { ...m, status } : m
    ));
  };

  const handleExcoCommentChange = (id: number, comment: string) => {
    setExcoMembers(excoMembers.map(m => 
      m.id === id ? { ...m, comment } : m
    ));
  };

  const handleSaveDraft = () => {
    toast({
      title: "Success",
      description: "EXCO approval saved as draft."
    });
  };

  const handleSubmitDecision = () => {
    if (!finalDecision.approvalDate) {
      toast({
        title: "Missing Information",
        description: "Please select a decision date.",
        variant: "destructive"
      });
      return;
    }

    // Validate that all required approvals are in place
    const allExcoApproved = excoMembers.every(m => m.status === "Approved");
    const deptHeadApproved = deptHead.approval === "Approved";
    
    if (!deptHeadApproved) {
      toast({
        title: "Approval Required",
        description: "Divisional Department Head approval is required before submitting the decision.",
        variant: "destructive"
      });
      return;
    }

    if (!allExcoApproved) {
      toast({
        title: "Approvals Incomplete",
        description: "All EXCO member approvals (GC, CRO, CFO, CEO) are required.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: `EXCO ${finalDecision.approved ? "approved" : "rejected"} the disbursement for ${selectedDeal.dealName}.`
    });
  };

  const handleNotifyTeam = () => {
    setExcoDecisionCommunicated(true);
    toast({
      title: "Success",
      description: `EXCO decision communicated to Transaction Team for ${selectedDeal.dealName}. They can now proceed with disbursement processing.`
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge variant="success" className="gap-1"><CheckCircle className="h-3 w-3" />Approved</Badge>;
      case "Pending":
        return <Badge variant="warning" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case "Declined":
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">EXCO Approval</h1>
          <p className="text-muted-foreground mt-1">Executive Committee Review & Disbursement Approval</p>
        </div>
        <Link to="/dashboard/pre-disbursement/closing-memo">
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            View Closing Memo
          </Button>
        </Link>
      </div>

      {/* Section 1: Header & Summary */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Transaction Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-muted-foreground text-xs">Deal / Application Name</Label>
              <p className="font-semibold text-foreground">{selectedDeal.dealName}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Project Code</Label>
              <p className="font-semibold text-foreground">{selectedDeal.projectCode}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Division</Label>
              <p className="font-semibold text-foreground">{selectedDeal.division}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Approved Amount</Label>
              <p className="font-semibold text-foreground">{selectedDeal.currency} {selectedDeal.approvedAmount.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Total CPs Completed</Label>
              <p className="font-semibold text-success">{selectedDeal.completedCPs} / {selectedDeal.totalCPs}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Deferred / Waived CPs</Label>
              <p className="font-semibold text-warning">{selectedDeal.deferredCPs}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Submission Date</Label>
              <p className="font-semibold text-foreground">{selectedDeal.submissionDate}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Disbursement Currency</Label>
              <p className="font-semibold text-foreground">{selectedDeal.currency}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Waivers & Deferrals Review */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                Waivers & Deferrals
              </CardTitle>
              <CardDescription>Review and approve deferred or waived conditions precedent</CardDescription>
            </div>
            <Dialog open={isWaiverModalOpen} onOpenChange={setIsWaiverModalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Waiver / Deferral
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Waiver / Deferral</DialogTitle>
                  <DialogDescription>Record a new condition precedent waiver or deferral</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="waiver-desc">Condition Description *</Label>
                    <Input 
                      id="waiver-desc"
                      value={newWaiver.description}
                      onChange={(e) => setNewWaiver({ ...newWaiver, description: e.target.value })}
                      placeholder="Enter condition description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waiver-dept">Department *</Label>
                    <Select value={newWaiver.department} onValueChange={(value) => setNewWaiver({ ...newWaiver, department: value })}>
                      <SelectTrigger id="waiver-dept">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                        <SelectItem value="Financial">Financial</SelectItem>
                        <SelectItem value="E&S">E&S</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waiver-type">Type *</Label>
                    <Select value={newWaiver.type} onValueChange={(value: "Waiver" | "Deferral") => setNewWaiver({ ...newWaiver, type: value })}>
                      <SelectTrigger id="waiver-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Waiver">Waiver</SelectItem>
                        <SelectItem value="Deferral">Deferral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waiver-justification">Justification *</Label>
                    <Textarea 
                      id="waiver-justification"
                      value={newWaiver.justification}
                      onChange={(e) => setNewWaiver({ ...newWaiver, justification: e.target.value })}
                      placeholder="Enter justification for this waiver or deferral"
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waiver-doc">Attach Document (optional)</Label>
                    <Input id="waiver-doc" type="file" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsWaiverModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddWaiver}>Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {waivers.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No waivers or deferrals recorded</p>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-semibold text-sm">CP Description</th>
                      <th className="text-left p-3 font-semibold text-sm">Department</th>
                      <th className="text-left p-3 font-semibold text-sm">Type</th>
                      <th className="text-left p-3 font-semibold text-sm">Justification</th>
                      <th className="text-center p-3 font-semibold text-sm">Approved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waivers.map((waiver) => (
                      <tr key={waiver.id} className="border-t">
                        <td className="p-3 text-sm">{waiver.description}</td>
                        <td className="p-3 text-sm">
                          <Badge variant="outline">{waiver.department}</Badge>
                        </td>
                        <td className="p-3 text-sm">
                          <Badge variant={waiver.type === "Waiver" ? "secondary" : "default"}>
                            {waiver.type}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{waiver.justification}</td>
                        <td className="p-3 text-center">
                          <Checkbox 
                            checked={waiver.approved}
                            onCheckedChange={(checked) => handleWaiverApproval(waiver.id, checked as boolean)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Divisional Department Head Approval */}
      <Card className={deptHead.approval === "Approved" ? "border-l-4 border-l-green-500" : deptHead.approval === "Declined" ? "border-l-4 border-l-red-500" : ""}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Divisional Department Head Approval
              </CardTitle>
              <CardDescription>
                Approval from the Department Head of the division whose disbursement is being processed
              </CardDescription>
            </div>
            {deptHead.approval !== "Pending" && getStatusBadge(deptHead.approval)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              <AlertCircle className="h-4 w-4 inline mr-1" />
              The Department Head approval is tied to the specific division whose transaction is being disbursed.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dept-division">Division *</Label>
              <Select value={deptHead.division} onValueChange={handleDivisionChange}>
                <SelectTrigger id="dept-division">
                  <SelectValue placeholder="Select division" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(divisionHeads).map((division) => (
                    <SelectItem key={division} value={division}>{division}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dept-head">Department Head</Label>
              <Input 
                id="dept-head"
                value={deptHead.headName}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dept-title">Title</Label>
              <Input 
                id="dept-title"
                value={deptHead.headTitle}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dept-comment">Comment (optional)</Label>
              <Textarea
                id="dept-comment"
                value={deptHead.comment}
                onChange={(e) => setDeptHead({ ...deptHead, comment: e.target.value })}
                placeholder="Add any comments or conditions..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dept-doc">Signed Approval Form (optional)</Label>
              <Input id="dept-doc" type="file" className="mt-2" />
            </div>
          </div>
          
          {deptHead.approval === "Pending" ? (
            <div className="flex gap-2">
              <Button onClick={() => handleDeptHeadApproval("Approved")} className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Approve
              </Button>
              <Button variant="destructive" onClick={() => handleDeptHeadApproval("Declined")} className="gap-2">
                <XCircle className="h-4 w-4" />
                Decline
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">
                {deptHead.approval === "Approved" ? "✓" : "✗"} {deptHead.approval} by <strong>{deptHead.headName}</strong> on {deptHead.approvalDate}
              </span>
              <Button variant="outline" size="sm" onClick={() => setDeptHead({ ...deptHead, approval: "Pending", approvalDate: "" })}>
                Reset
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 4: Constant EXCO Member Approvals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-primary" />
            EXCO Member Approvals
          </CardTitle>
          <CardDescription>
            The following approvals are required for ALL disbursements regardless of division
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> General Counsel, Chief Risk Officer, Chief Financial Officer, and Chief Executive Officer approvals are constant requirements for all disbursements.
            </p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Approval Progress</span>
              <span className="text-sm font-semibold">{approvedExcoCount} / {excoMembers.length}</span>
            </div>
            <Progress value={excoProgress} className="h-2" />
          </div>
          
          <div className="space-y-4">
            {excoMembers.map((member) => (
              <div key={member.id} className={`border rounded-lg p-4 ${member.status === "Approved" ? "border-green-200 bg-green-50/50 dark:bg-green-950/20" : member.status === "Declined" ? "border-red-200 bg-red-50/50 dark:bg-red-950/20" : ""}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.name}</p>
                  </div>
                  {getStatusBadge(member.status)}
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor={`comment-${member.id}`}>Comment</Label>
                    <Textarea
                      id={`comment-${member.id}`}
                      value={member.comment}
                      onChange={(e) => handleExcoCommentChange(member.id, e.target.value)}
                      placeholder="Add comment..."
                      rows={2}
                    />
                  </div>
                  
                  {member.status === "Pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleExcoMemberApproval(member.id)} className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleExcoStatusChange(member.id, "Declined")} className="gap-1">
                        <XCircle className="h-3 w-3" />
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 5: Final EXCO Decision & Communication */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Final EXCO Decision
          </CardTitle>
          <CardDescription>Record the executive committee's final disbursement decision and communicate to Transaction Team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Approval Summary */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Approval Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Divisional Head:</span>
                <p className="font-medium">{deptHead.approval === "Approved" ? "✓ Approved" : deptHead.approval === "Declined" ? "✗ Declined" : "⏳ Pending"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">General Counsel:</span>
                <p className="font-medium">{excoMembers.find(m => m.role === "General Counsel")?.status === "Approved" ? "✓ Approved" : "⏳ Pending"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Chief Risk Officer:</span>
                <p className="font-medium">{excoMembers.find(m => m.role === "Chief Risk Officer")?.status === "Approved" ? "✓ Approved" : "⏳ Pending"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Chief Financial Officer:</span>
                <p className="font-medium">{excoMembers.find(m => m.role === "Chief Financial Officer")?.status === "Approved" ? "✓ Approved" : "⏳ Pending"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Chief Executive Officer:</span>
                <p className="font-medium">{excoMembers.find(m => m.role === "Chief Executive Officer")?.status === "Approved" ? "✓ Approved" : "⏳ Pending"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Waivers Approved:</span>
                <p className="font-medium">{waivers.filter(w => w.approved).length} / {waivers.length}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="final-approval">Disbursement Decision *</Label>
              <Select 
                value={finalDecision.approved ? "Approved" : "Rejected"} 
                onValueChange={(value) => setFinalDecision({ ...finalDecision, approved: value === "Approved" })}
              >
                <SelectTrigger id="final-approval">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Approved">Approved - Proceed to Disbursement</SelectItem>
                  <SelectItem value="Rejected">Rejected - Return to Transaction Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="approval-date">Decision Date *</Label>
              <Input 
                id="approval-date"
                type="date"
                value={finalDecision.approvalDate}
                onChange={(e) => setFinalDecision({ ...finalDecision, approvalDate: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="exco-notes">EXCO Resolution Notes</Label>
            <Textarea 
              id="exco-notes"
              value={finalDecision.notes}
              onChange={(e) => setFinalDecision({ ...finalDecision, notes: e.target.value })}
              placeholder="Enter EXCO resolution notes, conditions, and any special instructions for disbursement..."
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signed-resolution">Attach Signed EXCO Resolution</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="signed-resolution"
                type="file"
                onChange={(e) => setFinalDecision({ ...finalDecision, resolution: e.target.files?.[0] || null })}
              />
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleSaveDraft} className="gap-2">
              <FileText className="h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={handleSubmitDecision} className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Submit Decision
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleNotifyTeam} 
              className="gap-2"
              disabled={excoDecisionCommunicated}
            >
              <Send className="h-4 w-4" />
              {excoDecisionCommunicated ? "Team Notified" : "Notify Transaction Team"}
            </Button>
          </div>
          
          {excoDecisionCommunicated && (
            <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                EXCO decision has been communicated to the Transaction Team. They can now proceed with disbursement processing.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
