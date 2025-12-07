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
  DollarSign,
  AlertTriangle,
  Building2,
  ArrowRight
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const bricSubmissions = [
  {
    id: 1,
    dealName: "Tech Solutions Ltd",
    amount: "$50M",
    division: "Investment Banking",
    divisionalHead: "James Wilson",
    divisionalApprovalDate: "2024-01-18",
    status: "pending",
    riskRating: 3,
    summary: "Strategic technology investment with strong growth potential",
  },
  {
    id: 2,
    dealName: "Green Energy Corp",
    amount: "$75M",
    division: "Project Finance",
    divisionalHead: "Emma Thompson",
    divisionalApprovalDate: "2024-01-15",
    status: "approved",
    riskRating: 4,
    summary: "Renewable energy infrastructure with government guarantees",
  },
  {
    id: 3,
    dealName: "Manufacturing Inc",
    amount: "$30M",
    division: "Corporate Finance",
    divisionalHead: "Robert Chen",
    divisionalApprovalDate: "2024-01-12",
    status: "review-required",
    riskRating: 6,
    summary: "Industrial expansion with moderate market risks",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return (
        <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          CEO Approved
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="warning" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Awaiting CEO Review
        </Badge>
      );
    case "review-required":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Additional Review Required
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getRiskBadge = (rating: number) => {
  if (rating <= 3) {
    return <Badge variant="success">Low Risk ({rating}/10)</Badge>;
  } else if (rating <= 6) {
    return <Badge variant="warning">Medium Risk ({rating}/10)</Badge>;
  } else {
    return <Badge variant="destructive">High Risk ({rating}/10)</Badge>;
  }
};

const CEOApproval = () => {
  const { toast } = useToast();
  const [selectedSubmission, setSelectedSubmission] = useState(bricSubmissions[0]);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">CEO Approval for BRIC</h2>
          <p className="text-muted-foreground">Review and approve BRIC memos before Board submission</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {bricSubmissions.filter(s => s.status === "pending").length} Pending Review
          </Badge>
        </div>
      </div>

      {/* Process Overview */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <span>InvestCo Approved</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <span>Divisional Head Approved</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">CEO Approval</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-muted-foreground">BRIC Submission</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* Submission List */}
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">BRIC Submissions</CardTitle>
              <CardDescription>Memos awaiting CEO approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {bricSubmissions.map((submission) => (
                <Card
                  key={submission.id}
                  className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
                    selectedSubmission.id === submission.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-sm">{submission.dealName}</p>
                    {getRiskBadge(submission.riskRating)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{submission.amount}</span>
                    {getStatusBadge(submission.status)}
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Submission Details */}
        <div className="col-span-8">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{selectedSubmission.dealName}</CardTitle>
                  <CardDescription>BRIC Memorandum Review</CardDescription>
                </div>
                {getStatusBadge(selectedSubmission.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Information */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Investment Amount</p>
                  <p className="font-bold text-lg">{selectedSubmission.amount}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-warning" />
                  <p className="text-xs text-muted-foreground">Risk Rating</p>
                  <p className="font-bold text-lg">{selectedSubmission.riskRating}/10</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <Building2 className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Division</p>
                  <p className="font-bold text-sm">{selectedSubmission.division}</p>
                </div>
              </div>

              {/* Approval Chain */}
              <div>
                <h4 className="font-semibold mb-3">Approval Chain</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Divisional Head Approval</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedSubmission.divisionalHead} • {selectedSubmission.divisionalApprovalDate}
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    selectedSubmission.status === "approved" 
                      ? "bg-success/5 border border-success/20" 
                      : "bg-warning/5 border border-warning/20"
                  }`}>
                    {selectedSubmission.status === "approved" ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <Clock className="h-5 w-5 text-warning" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm">CEO Approval</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedSubmission.status === "approved" 
                          ? "Approved for BRIC submission" 
                          : "Pending CEO review and approval"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <h4 className="font-semibold mb-2">Investment Summary</h4>
                <p className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg">
                  {selectedSubmission.summary}
                </p>
              </div>

              {/* CEO Actions */}
              {selectedSubmission.status === "pending" && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium mb-2 block">CEO Comments</label>
                    <Textarea 
                      placeholder="Add comments or conditions for approval..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <XCircle className="h-4 w-4 mr-2" />
                          Request Additional Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Request Additional Review</DialogTitle>
                          <DialogDescription>
                            Specify areas requiring further analysis
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Textarea 
                            placeholder="Detail the areas requiring additional review..."
                            className="min-h-[150px]"
                          />
                          <Button className="w-full" variant="destructive" onClick={() => {
                            toast({
                              title: "Additional Review Requested",
                              description: "The divisional head and transaction team have been notified.",
                            });
                          }}>
                            Submit Review Request
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button className="flex-1" onClick={() => {
                      toast({
                        title: "BRIC Memo Approved",
                        description: "The BRIC memo has been approved and submitted to Corporate Secretariat for BRIC circulation.",
                      });
                    }}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve for BRIC
                    </Button>
                  </div>
                </div>
              )}

              {/* Document Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  View BRIC Memo
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  View Risk Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CEOApproval;