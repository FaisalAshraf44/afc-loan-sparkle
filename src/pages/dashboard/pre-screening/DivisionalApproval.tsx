import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  FileText,
  User,
  Calendar,
  MessageSquare,
  Tag
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const pendingApprovals = [
  {
    id: 1,
    dealName: "Tech Solutions Ltd",
    documentType: "EIM",
    submittedBy: "John Analyst",
    submittedDate: "2024-01-15",
    division: "Investment Banking",
    status: "pending",
    summary: "Strong investment opportunity in tech sector with 15% projected IRR",
  },
  {
    id: 2,
    dealName: "Green Energy Corp",
    documentType: "FIM",
    submittedBy: "Sarah Manager",
    submittedDate: "2024-01-14",
    division: "Project Finance",
    status: "approved",
    codeName: "Project Sunrise",
    summary: "Renewable energy infrastructure investment with government backing",
  },
  {
    id: 3,
    dealName: "Manufacturing Inc",
    documentType: "BRIC Memo",
    submittedBy: "Mike Analyst",
    submittedDate: "2024-01-13",
    division: "Corporate Finance",
    status: "revision-required",
    summary: "Industrial manufacturing expansion project",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return (
        <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Approved
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="warning" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending Review
        </Badge>
      );
    case "revision-required":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Revision Required
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getDocTypeBadge = (type: string) => {
  const colors: Record<string, string> = {
    "EIM": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "FIM": "bg-purple-500/10 text-purple-500 border-purple-500/20",
    "BRIC Memo": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  };
  return (
    <Badge variant="outline" className={colors[type] || ""}>
      {type}
    </Badge>
  );
};

const DivisionalApproval = () => {
  const { toast } = useToast();
  const [selectedApproval, setSelectedApproval] = useState(pendingApprovals[0]);
  const [codeName, setCodeName] = useState("");

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Divisional Head Approval</h2>
          <p className="text-muted-foreground">Review and approve investment documents for committee presentation</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {pendingApprovals.filter(a => a.status === "pending").length} Pending
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Approval Queue */}
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Approval Queue</CardTitle>
              <CardDescription>Documents awaiting divisional approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {pendingApprovals.map((approval) => (
                <Card
                  key={approval.id}
                  className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
                    selectedApproval.id === approval.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedApproval(approval)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-sm">{approval.dealName}</p>
                    {getDocTypeBadge(approval.documentType)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{approval.division}</span>
                    {getStatusBadge(approval.status)}
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Approval Details */}
        <div className="col-span-8">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle>{selectedApproval.dealName}</CardTitle>
                    {getDocTypeBadge(selectedApproval.documentType)}
                  </div>
                  <CardDescription>{selectedApproval.division}</CardDescription>
                </div>
                {getStatusBadge(selectedApproval.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Document Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Submitted By</p>
                    <p className="font-medium text-sm">{selectedApproval.submittedBy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Submission Date</p>
                    <p className="font-medium text-sm">{selectedApproval.submittedDate}</p>
                  </div>
                </div>
              </div>

              {/* Code Name (for approved items) */}
              {selectedApproval.codeName && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <Tag className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Project Code Name</p>
                    <p className="font-semibold text-primary">{selectedApproval.codeName}</p>
                  </div>
                </div>
              )}

              {/* Executive Summary */}
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Executive Summary
                </h4>
                <p className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg">
                  {selectedApproval.summary}
                </p>
              </div>

              {/* Review Actions */}
              {selectedApproval.status === "pending" && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <Label className="mb-2 block">Assign Project Code Name</Label>
                    <Input 
                      placeholder="e.g., Project Phoenix" 
                      value={codeName}
                      onChange={(e) => setCodeName(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      This code name will be circulated with the approved document
                    </p>
                  </div>

                  <div>
                    <Label className="mb-2 block">Review Comments</Label>
                    <Textarea 
                      placeholder="Add your review comments..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <XCircle className="h-4 w-4 mr-2" />
                          Request Revision
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Request Revision</DialogTitle>
                          <DialogDescription>
                            Specify the changes required before approval
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Textarea 
                            placeholder="Detail the required revisions..."
                            className="min-h-[150px]"
                          />
                          <Button className="w-full" variant="destructive" onClick={() => {
                            toast({
                              title: "Revision Requested",
                              description: "The transaction team has been notified of required changes.",
                            });
                          }}>
                            Submit Revision Request
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button className="flex-1" onClick={() => {
                      toast({
                        title: `${selectedApproval.documentType} Approved`,
                        description: `${selectedApproval.dealName} has been approved and circulated to the division with code name: ${codeName || "Project Alpha"}.`,
                      });
                    }}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve & Circulate
                    </Button>
                  </div>
                </div>
              )}

              {/* View Document */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  View Full Document
                </Button>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Comments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DivisionalApproval;