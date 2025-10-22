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
  Leaf
} from "lucide-react";
import { Link } from "react-router-dom";

const ClosingMemo = () => {
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<string>("");
  
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

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedApplication) {
      toast({
        title: "Validation Error",
        description: "Please select an application first.",
        variant: "destructive"
      });
      return;
    }

    // Basic validation
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    requiredFields.forEach(field => {
      if (!(field as HTMLInputElement).value) {
        isValid = false;
      }
    });

    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Closing Memo Submitted",
      description: "Closing memo submitted successfully to EXCO Secretary.",
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

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Closing Memo Form</h2>
        <p className="text-muted-foreground">Final pre-disbursement clearance documentation</p>
      </div>

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

            {/* Section 3: Departmental Clearances */}
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
                <div className="flex flex-col md:flex-row gap-3">
                  <Button 
                    onClick={handleSaveDraft}
                    variant="outline" 
                    className="flex-1"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    className="flex-1"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit for EXCO Review
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
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default ClosingMemo;
