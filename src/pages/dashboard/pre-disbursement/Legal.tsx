import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, AlertCircle, FileCheck, MessageSquare } from "lucide-react";
import { useState } from "react";

const Legal = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Credit Agreement",
      type: "Legal",
      status: "approved",
      reviewer: "Jane Wilson",
      date: "2025-10-20",
      comments: "All terms reviewed and approved. Ready for execution.",
      issues: []
    },
    {
      id: 2,
      name: "Security Documents",
      type: "Legal",
      status: "pending",
      reviewer: "Unassigned",
      date: null,
      comments: "",
      issues: ["Missing witness signature on page 5", "Date format incorrect on Schedule A"]
    },
    {
      id: 3,
      name: "Guarantor Agreement",
      type: "Legal",
      status: "rejected",
      reviewer: "Michael Chen",
      date: "2025-10-18",
      comments: "Personal guarantee clause needs revision per legal requirements.",
      issues: ["Clause 3.2 needs amendment", "Missing jurisdiction specification"]
    },
    {
      id: 4,
      name: "Mortgage Deed",
      type: "Legal",
      status: "approved",
      reviewer: "Jane Wilson",
      date: "2025-10-19",
      comments: "Document verified. Property description matches title deed.",
      issues: []
    },
    {
      id: 5,
      name: "Assignment of Receivables",
      type: "Legal",
      status: "under-review",
      reviewer: "David Park",
      date: null,
      comments: "",
      issues: ["Awaiting debtor notification confirmation"]
    },
  ]);

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", icon: any, label: string }> = {
      approved: { variant: "default", icon: CheckCircle, label: "Approved" },
      pending: { variant: "secondary", icon: AlertCircle, label: "Pending" },
      "under-review": { variant: "outline", icon: AlertCircle, label: "Under Review" },
      rejected: { variant: "destructive", icon: XCircle, label: "Rejected" }
    };
    const config = configs[status] || configs.pending;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const statusCounts = {
    approved: documents.filter(d => d.status === "approved").length,
    pending: documents.filter(d => d.status === "pending").length,
    underReview: documents.filter(d => d.status === "under-review").length,
    rejected: documents.filter(d => d.status === "rejected").length,
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Legal Review</h2>
        <p className="text-muted-foreground">Document verification and approval workflow</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              Under Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.underReview}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for filtering */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {documents.map((doc) => (
            <Card key={doc.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      {doc.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Reviewer: {doc.reviewer} {doc.date && `• ${doc.date}`}
                    </CardDescription>
                  </div>
                  {getStatusBadge(doc.status)}
                </div>
              </CardHeader>
              <CardContent>
                {doc.issues.length > 0 && (
                  <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Issues Identified:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {doc.issues.map((issue, idx) => (
                        <li key={idx}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {doc.comments && (
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Comments:
                    </p>
                    <p className="text-sm text-muted-foreground">{doc.comments}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">Review Document</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Review: {doc.name}</DialogTitle>
                        <DialogDescription>
                          Provide your review comments and decision
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Review Comments</Label>
                          <Textarea
                            placeholder="Enter your review comments..."
                            rows={4}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Issues (if any)</Label>
                          <Textarea
                            placeholder="List any issues or required changes..."
                            rows={3}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="destructive">Reject</Button>
                        <Button variant="outline">Request Changes</Button>
                        <Button>Approve</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" variant="outline">View Document</Button>
                  <Button size="sm" variant="ghost">History</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {documents.filter(d => d.status === "pending" || d.status === "under-review").map((doc) => (
            <Card key={doc.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{doc.name}</CardTitle>
                  {getStatusBadge(doc.status)}
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4 mt-6">
          {documents.filter(d => d.status === "approved").map((doc) => (
            <Card key={doc.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{doc.name}</CardTitle>
                  {getStatusBadge(doc.status)}
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4 mt-6">
          {documents.filter(d => d.status === "rejected").map((doc) => (
            <Card key={doc.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{doc.name}</CardTitle>
                  {getStatusBadge(doc.status)}
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Legal;
