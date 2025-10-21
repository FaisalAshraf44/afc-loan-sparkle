import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { FileText, Send, Save, Eye } from "lucide-react";

const ClosingMemo = () => {
  const recentMemos = [
    { id: 1, dealName: "Tech Corp Acquisition", status: "approved", date: "2025-10-15", reviewer: "Board" },
    { id: 2, dealName: "Green Energy Project", status: "pending", date: "2025-10-20", reviewer: "Unassigned" },
    { id: 3, dealName: "Real Estate Development", status: "approved", date: "2025-10-10", reviewer: "Legal Team" },
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

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Closing Memo</h2>
        <p className="text-muted-foreground">Submit closing memo for approval</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Create New Closing Memo
              </CardTitle>
              <CardDescription>
                Prepare the closing memo for final approval
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Deal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Deal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deal-name">Deal Name</Label>
                    <Input id="deal-name" placeholder="e.g., Tech Corp Acquisition" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deal-value">Deal Value (USD)</Label>
                    <Input id="deal-value" type="number" placeholder="e.g., 5000000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="borrower">Borrower</Label>
                    <Input id="borrower" placeholder="Company name" />
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
                <h3 className="font-semibold">Conditions Precedent Status</h3>
                <div className="space-y-2">
                  <Label htmlFor="cp-status">CP Completion Status</Label>
                  <Select>
                    <SelectTrigger id="cp-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-complete">All Conditions Met</SelectItem>
                      <SelectItem value="substantial">Substantially Complete</SelectItem>
                      <SelectItem value="pending">Pending Items Remain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cp-notes">CP Notes</Label>
                  <Textarea
                    id="cp-notes"
                    placeholder="Any outstanding conditions or waiver requests..."
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              {/* Legal Opinion */}
              <div className="space-y-4">
                <h3 className="font-semibold">Legal Opinion</h3>
                <div className="space-y-2">
                  <Label htmlFor="legal-opinion">Legal Review Status</Label>
                  <Select>
                    <SelectTrigger id="legal-opinion">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="approved-conditions">Approved with Conditions</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legal-comments">Legal Comments</Label>
                  <Textarea
                    id="legal-comments"
                    placeholder="Legal team comments and recommendations..."
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
                <Button className="flex-1">
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
        </div>

        {/* Sidebar - Recent Memos */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Memos</CardTitle>
              <CardDescription>Previously submitted closing memos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMemos.map((memo) => (
                  <div
                    key={memo.id}
                    className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm">{memo.dealName}</p>
                      {getStatusBadge(memo.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {memo.date} • {memo.reviewer}
                    </p>
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
                <li>• Ensure all CPs are completed</li>
                <li>• Obtain legal team approval</li>
                <li>• Verify disbursement instructions</li>
                <li>• Attach supporting documents</li>
                <li>• Get required approvals before closing</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClosingMemo;
