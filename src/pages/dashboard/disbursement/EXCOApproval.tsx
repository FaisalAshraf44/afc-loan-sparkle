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
  AlertCircle
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

export default function EXCOApproval() {
  const [selectedDeal] = useState({
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

  const [deptHead, setDeptHead] = useState({
    division: "",
    headName: "",
    approval: "Pending",
    comment: ""
  });

  const [excoMembers, setExcoMembers] = useState<ExcoMember[]>([
    { id: 1, role: "General Counsel", name: "Sarah Johnson", status: "Approved", comment: "" },
    { id: 2, role: "Chief Risk Officer", name: "Michael Chen", status: "Approved", comment: "" },
    { id: 3, role: "Chief Financial Officer", name: "David Williams", status: "Pending", comment: "" },
    { id: 4, role: "Chief Executive Officer", name: "Jennifer Martinez", status: "Pending", comment: "" }
  ]);

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

  const handleDeptHeadApproval = () => {
    if (!deptHead.division) {
      toast({
        title: "Missing Information",
        description: "Please select a division.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Department Head approval recorded successfully."
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
        description: "Please select an approval date.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "EXCO approval submitted successfully."
    });
  };

  const handleNotifyTeam = () => {
    toast({
      title: "Success",
      description: "Notification sent to Transaction Team."
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

      {/* Section 3: Departmental Head Approval */}
      <Card>
        <CardHeader>
          <CardTitle>Department Head Approval</CardTitle>
          <CardDescription>Record approval from the responsible department head</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dept-division">Select Division *</Label>
              <Select value={deptHead.division} onValueChange={(value) => setDeptHead({ ...deptHead, division: value, headName: value === "Financial Services" ? "Robert Thompson" : "Maria Garcia" })}>
                <SelectTrigger id="dept-division">
                  <SelectValue placeholder="Select division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Financial Services">Financial Services</SelectItem>
                  <SelectItem value="Investments">Investments</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="SME Finance">SME Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dept-head">Department Head Name</Label>
              <Input 
                id="dept-head"
                value={deptHead.headName}
                readOnly
                className="bg-muted"
                placeholder="Auto-filled from division"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dept-approval">Approval Status</Label>
              <Select value={deptHead.approval} onValueChange={(value) => setDeptHead({ ...deptHead, approval: value })}>
                <SelectTrigger id="dept-approval">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dept-doc">Signed Approval Form (optional)</Label>
              <Input id="dept-doc" type="file" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dept-comment">Comment (optional)</Label>
            <Textarea 
              id="dept-comment"
              value={deptHead.comment}
              onChange={(e) => setDeptHead({ ...deptHead, comment: e.target.value })}
              placeholder="Enter any comments or notes"
              rows={3}
            />
          </div>
          <Button onClick={handleDeptHeadApproval} className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Record Department Head Approval
          </Button>
        </CardContent>
      </Card>

      {/* Section 4: EXCO Member Approvals */}
      <Card>
        <CardHeader>
          <CardTitle>EXCO Member Sign-Offs</CardTitle>
          <CardDescription>Executive Committee member approvals</CardDescription>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">EXCO Approvals Progress</span>
                <span className="text-sm font-semibold text-primary">{approvedExcoCount} of {excoMembers.length} Completed</span>
              </div>
              <Progress value={excoProgress} className="h-2" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {excoMembers.map((member) => (
              <Card key={member.id} className="border-l-4" style={{ borderLeftColor: member.status === "Approved" ? "hsl(var(--success))" : member.status === "Declined" ? "hsl(var(--destructive))" : "hsl(var(--warning))" }}>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div>
                      <Label className="text-xs text-muted-foreground">Role</Label>
                      <p className="font-semibold text-foreground">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.name}</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`status-${member.id}`}>Status</Label>
                      <Select value={member.status} onValueChange={(value: "Approved" | "Pending" | "Declined") => handleExcoStatusChange(member.id, value)}>
                        <SelectTrigger id={`status-${member.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Declined">Declined</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`comment-${member.id}`}>Comment (optional)</Label>
                      <Input 
                        id={`comment-${member.id}`}
                        value={member.comment}
                        onChange={(e) => handleExcoCommentChange(member.id, e.target.value)}
                        placeholder="Enter comment"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(member.status)}
                      {member.status !== "Approved" && (
                        <Button 
                          size="sm"
                          onClick={() => handleExcoMemberApproval(member.id)}
                          className="gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 5: Final Decision & Communication */}
      <Card className="border-primary">
        <CardHeader>
          <CardTitle>Final EXCO Decision</CardTitle>
          <CardDescription>Record the executive committee's final disbursement decision</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="final-approval">Disbursement Approval *</Label>
              <Select 
                value={finalDecision.approved ? "Approved" : "Rejected"} 
                onValueChange={(value) => setFinalDecision({ ...finalDecision, approved: value === "Approved" })}
              >
                <SelectTrigger id="final-approval">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="approval-date">Approval Date *</Label>
              <Input 
                id="approval-date"
                type="date"
                value={finalDecision.approvalDate}
                onChange={(e) => setFinalDecision({ ...finalDecision, approvalDate: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="exco-notes">Notes</Label>
            <Textarea 
              id="exco-notes"
              value={finalDecision.notes}
              onChange={(e) => setFinalDecision({ ...finalDecision, notes: e.target.value })}
              placeholder="Enter EXCO comments and decision notes"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signed-resolution">Attach Signed Resolution</Label>
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
            <Button variant="secondary" onClick={handleNotifyTeam} className="gap-2">
              <Send className="h-4 w-4" />
              Notify Transaction Team
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
