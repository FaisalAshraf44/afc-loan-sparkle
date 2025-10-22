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
import { FileText, Send, Save, Eye, CheckCircle2 } from "lucide-react";

const ClosingMemo = () => {
  const { toast } = useToast();
  const [selectedFIM, setSelectedFIM] = useState<number | null>(null);
  
  // List of approved FIMs with all CPs satisfied
  const approvedFIMs = [
    { 
      id: 1, 
      dealName: "Tech Corp Acquisition", 
      dealValue: 5000000,
      borrower: "Tech Corp Ltd",
      approvalDate: "2025-10-15", 
      approvedBy: "Board",
      cpStatus: "all-complete",
      cpNotes: "All conditions precedent have been satisfied",
      legalStatus: "approved",
      legalComments: "All legal documentation complete and reviewed"
    },
    { 
      id: 2, 
      dealName: "Green Energy Project", 
      dealValue: 8500000,
      borrower: "GreenTech Solutions",
      approvalDate: "2025-10-10", 
      approvedBy: "Board",
      cpStatus: "all-complete",
      cpNotes: "Environmental permits received, all conditions met",
      legalStatus: "approved",
      legalComments: "Legal due diligence complete"
    },
    { 
      id: 3, 
      dealName: "Real Estate Development", 
      dealValue: 12000000,
      borrower: "Cityscape Developers",
      approvalDate: "2025-10-08", 
      approvedBy: "Board",
      cpStatus: "all-complete",
      cpNotes: "Title deeds verified, construction permits obtained",
      legalStatus: "approved",
      legalComments: "All agreements executed"
    },
  ];

  const getStatusBadge = (status: string) => {
    return status === "approved" ? (
      <Badge variant="default">Approved</Badge>
    ) : status === "rejected" ? (
      <Badge variant="destructive">Rejected</Badge>
    ) : (
      <Badge variant="secondary">Pending</Badge>
    );
  };

  const selectedFIMData = approvedFIMs.find(fim => fim.id === selectedFIM);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Closing Memo</h2>
        <p className="text-muted-foreground">Create closing memo for approved FIMs with satisfied CPs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Approved FIMs List */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Approved FIMs</CardTitle>
              <CardDescription>Select a FIM to create closing memo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {approvedFIMs.map((fim) => (
                  <div
                    key={fim.id}
                    onClick={() => setSelectedFIM(fim.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedFIM === fim.id 
                        ? 'bg-primary/10 border-primary' 
                        : 'bg-card hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-sm">{fim.dealName}</p>
                      <Badge variant="default" className="ml-2">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Ready
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {fim.borrower}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        ${(fim.dealValue / 1000000).toFixed(1)}M
                      </span>
                      <span className="text-muted-foreground">
                        {fim.approvalDate}
                      </span>
                    </div>
                    <div className="mt-2 pt-2 border-t">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        All CPs Satisfied
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Select an approved FIM with satisfied CPs</li>
                <li>• Review deal information and conditions</li>
                <li>• Verify disbursement instructions</li>
                <li>• Submit for EXCO approval</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {!selectedFIM ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No FIM Selected</h3>
                <p className="text-muted-foreground">
                  Please select an approved FIM from the list to create a closing memo
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Create Closing Memo
                </CardTitle>
                <CardDescription>
                  Prepare closing memo for {selectedFIMData?.dealName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Deal Information */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Deal Information</h3>
                    <Badge variant="outline">
                      Approved: {selectedFIMData?.approvalDate}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deal-name">Deal Name</Label>
                      <Input 
                        id="deal-name" 
                        value={selectedFIMData?.dealName}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deal-value">Deal Value (USD)</Label>
                      <Input 
                        id="deal-value" 
                        type="number" 
                        value={selectedFIMData?.dealValue}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="borrower">Borrower</Label>
                      <Input 
                        id="borrower" 
                        value={selectedFIMData?.borrower}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="closing-date">Expected Closing Date</Label>
                      <Input id="closing-date" type="date" />
                    </div>
                  </div>
                </div>

              <Separator />

              {/* Executive Summary */}
              <div className="space-y-4">
                <h3 className="font-semibold">Executive Summary</h3>
                <div className="space-y-2">
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea
                    id="summary"
                    placeholder="Provide a brief overview of the transaction..."
                    rows={4}
                  />
                </div>
              </div>

              <Separator />

              {/* Conditions Status */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Conditions Precedent Status</h3>
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    All Complete
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cp-notes">CP Summary</Label>
                  <Textarea
                    id="cp-notes"
                    value={selectedFIMData?.cpNotes}
                    readOnly
                    className="bg-muted"
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              {/* Legal Opinion */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Legal Opinion</h3>
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Approved
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legal-comments">Legal Comments</Label>
                  <Textarea
                    id="legal-comments"
                    value={selectedFIMData?.legalComments}
                    readOnly
                    className="bg-muted"
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              {/* Disbursement Instructions */}
              <div className="space-y-4">
                <h3 className="font-semibold">Disbursement Instructions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="disbursement-amount">Disbursement Amount</Label>
                    <Input id="disbursement-amount" type="number" placeholder="Amount" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disbursement-date">Disbursement Date</Label>
                    <Input id="disbursement-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank-details">Bank Account Details</Label>
                  <Textarea
                    id="bank-details"
                    placeholder="Beneficiary account information..."
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              {/* Approvals */}
              <div className="space-y-4">
                <h3 className="font-semibold">Required Approvals</h3>
                <div className="space-y-2">
                  <Label htmlFor="approver">Primary Approver</Label>
                  <Select>
                    <SelectTrigger id="approver">
                      <SelectValue placeholder="Select approver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ceo">CEO</SelectItem>
                      <SelectItem value="cfo">CFO</SelectItem>
                      <SelectItem value="board">Board Chair</SelectItem>
                      <SelectItem value="legal">Legal Director</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button className="flex-1" onClick={() => {
                  toast({
                    title: "Closing Memo Submitted",
                    description: "The Closing Memo has been submitted and the EXCO Secretary has been notified.",
                  });
                }}>
                  <Send className="mr-2 h-4 w-4" />
                  Submit for Approval
                </Button>
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button variant="ghost">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClosingMemo;
