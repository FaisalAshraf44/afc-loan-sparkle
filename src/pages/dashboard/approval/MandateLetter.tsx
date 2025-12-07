import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  Upload, 
  Send, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileSignature,
  Calendar
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mandateLetters = [
  {
    id: 1,
    dealName: "Tech Solutions Ltd",
    status: "executed",
    sentDate: "2024-01-10",
    executedDate: "2024-01-15",
    client: "John Smith",
    amount: "$50M",
  },
  {
    id: 2,
    dealName: "Green Energy Corp",
    status: "pending-signature",
    sentDate: "2024-01-18",
    executedDate: null,
    client: "Sarah Johnson",
    amount: "$75M",
  },
  {
    id: 3,
    dealName: "Manufacturing Inc",
    status: "draft",
    sentDate: null,
    executedDate: null,
    client: "Mike Brown",
    amount: "$30M",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "executed":
      return (
        <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Executed
        </Badge>
      );
    case "pending-signature":
      return (
        <Badge variant="warning" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending Signature
        </Badge>
      );
    case "draft":
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <FileText className="h-3 w-3" />
          Draft
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const MandateLetter = () => {
  const { toast } = useToast();
  const [selectedLetter, setSelectedLetter] = useState(mandateLetters[0]);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Mandate Letter Management</h2>
          <p className="text-muted-foreground">Draft, send, and track mandate letter execution</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <FileSignature className="h-4 w-4 mr-2" />
              New Mandate Letter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Mandate Letter</DialogTitle>
              <DialogDescription>
                Generate a mandate letter from template for client signature
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Deal Name</Label>
                  <Input placeholder="Enter deal name" />
                </div>
                <div>
                  <Label>Client Name</Label>
                  <Input placeholder="Enter client name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Investment Amount</Label>
                  <Input placeholder="e.g., $50,000,000" />
                </div>
                <div>
                  <Label>Mandate Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debt">Debt Financing</SelectItem>
                      <SelectItem value="equity">Equity Investment</SelectItem>
                      <SelectItem value="advisory">Financial Advisory</SelectItem>
                      <SelectItem value="hybrid">Hybrid Structure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Key Terms</Label>
                <Textarea 
                  placeholder="Enter key terms and conditions..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Mandate Letter Created",
                    description: "The mandate letter draft has been saved successfully.",
                  });
                }}>
                  Create Draft
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Letter List */}
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Mandate Letters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mandateLetters.map((letter) => (
                <Card
                  key={letter.id}
                  className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
                    selectedLetter.id === letter.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedLetter(letter)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-sm">{letter.dealName}</p>
                    {getStatusBadge(letter.status)}
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Client: {letter.client}</p>
                    <p>Amount: {letter.amount}</p>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Letter Details */}
        <div className="col-span-8">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{selectedLetter.dealName}</CardTitle>
                  <CardDescription>Mandate Letter Details</CardDescription>
                </div>
                {getStatusBadge(selectedLetter.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Client</p>
                  <p className="font-medium">{selectedLetter.client}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Investment Amount</p>
                  <p className="font-medium">{selectedLetter.amount}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Sent Date</p>
                  <p className="font-medium">{selectedLetter.sentDate || "Not sent"}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Execution Date</p>
                  <p className="font-medium">{selectedLetter.executedDate || "Pending"}</p>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-semibold mb-4">Execution Timeline</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Draft Created</p>
                      <p className="text-xs text-muted-foreground">Mandate letter template generated</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      selectedLetter.sentDate ? "bg-success/20" : "bg-muted"
                    }`}>
                      {selectedLetter.sentDate ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">Sent to Client</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedLetter.sentDate || "Awaiting approval to send"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      selectedLetter.executedDate ? "bg-success/20" : "bg-muted"
                    }`}>
                      {selectedLetter.executedDate ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">Client Signature</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedLetter.executedDate || "Pending client execution"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Signed Copy
                </Button>
                {selectedLetter.status === "draft" && (
                  <Button onClick={() => {
                    toast({
                      title: "Mandate Letter Sent",
                      description: "The mandate letter has been sent to the client for review and signature.",
                    });
                  }}>
                    <Send className="h-4 w-4 mr-2" />
                    Send to Client
                  </Button>
                )}
                {selectedLetter.status === "pending-signature" && (
                  <Button onClick={() => {
                    toast({
                      title: "Execution Recorded",
                      description: "The mandate letter execution has been recorded. Proceeding to FIM stage.",
                    });
                  }}>
                    <FileSignature className="h-4 w-4 mr-2" />
                    Record Execution
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MandateLetter;