import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload, Download, CheckCircle, Clock, XCircle } from "lucide-react";

const BRIC = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      dealName: "Tech Corp Acquisition",
      documentType: "BRIC Package",
      uploadedBy: "John Smith",
      uploadDate: "2025-10-28",
      status: "approved",
      reviewComments: "All documents complete and compliant",
    },
    {
      id: 2,
      dealName: "Green Energy Project",
      documentType: "Risk Assessment",
      uploadedBy: "Sarah Johnson",
      uploadDate: "2025-10-30",
      status: "pending",
      reviewComments: "",
    },
    {
      id: 3,
      dealName: "Real Estate Development",
      documentType: "Compliance Report",
      uploadedBy: "Michael Chen",
      uploadDate: "2025-10-25",
      status: "revision",
      reviewComments: "Additional documentation required",
    },
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock, label: "Pending Review" },
      approved: { variant: "default" as const, icon: CheckCircle, label: "Approved" },
      revision: { variant: "destructive" as const, icon: XCircle, label: "Needs Revision" },
    };
    const config = variants[status as keyof typeof variants];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">BRIC Review</h2>
          <p className="text-muted-foreground">Review and upload BRIC documents</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload BRIC Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload BRIC Document</DialogTitle>
              <DialogDescription>
                Upload a new BRIC package for review
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="dealName">Deal Name</Label>
                <Input id="dealName" placeholder="Enter deal name" />
              </div>
              <div>
                <Label htmlFor="docType">Document Type</Label>
                <Input id="docType" placeholder="e.g., BRIC Package, Risk Assessment" />
              </div>
              <div>
                <Label htmlFor="file">File Upload</Label>
                <Input id="file" type="file" />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any relevant notes..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end">
                <Button>Upload Document</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* BRIC Requirements */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>BRIC Requirements Checklist</CardTitle>
          <CardDescription>Ensure all required documents are submitted</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Credit Risk Assessment",
              "Market Analysis Report",
              "Legal Documentation",
              "Compliance Verification",
              "Financial Projections",
              "Due Diligence Summary",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 border rounded-lg">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="grid gap-4">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {doc.dealName}
                  </CardTitle>
                  <CardDescription>
                    {doc.documentType} • Uploaded by {doc.uploadedBy} on {doc.uploadDate}
                  </CardDescription>
                </div>
                {getStatusBadge(doc.status)}
              </div>
            </CardHeader>
            <CardContent>
              {doc.reviewComments && (
                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Review Comments:</p>
                  <p className="text-sm text-muted-foreground">{doc.reviewComments}</p>
                </div>
              )}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Review Document</DialogTitle>
                      <DialogDescription>
                        {doc.dealName} - {doc.documentType}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Review Comments</Label>
                        <Textarea
                          placeholder="Add your review comments..."
                          defaultValue={doc.reviewComments}
                          rows={6}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Request Revision</Button>
                        <Button>Approve Document</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BRIC;
