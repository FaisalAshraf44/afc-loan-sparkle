import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, FileText, Upload, Download, CheckCircle, Clock } from "lucide-react";

interface NDA {
  id: string;
  clientName: string;
  sentDate: string;
  status: "pending" | "signed" | "expired";
  expiryDate: string;
  documentUrl?: string;
}

const mockNDAs: NDA[] = [
  {
    id: "1",
    clientName: "TechVenture Inc",
    sentDate: "2024-01-10",
    status: "signed",
    expiryDate: "2025-01-10"
  },
  {
    id: "2",
    clientName: "GreenEnergy Solutions",
    sentDate: "2024-01-14",
    status: "pending",
    expiryDate: "2025-01-14"
  },
  {
    id: "3",
    clientName: "Healthcare Plus",
    sentDate: "2024-01-08",
    status: "signed",
    expiryDate: "2025-01-08"
  },
  {
    id: "4",
    clientName: "OldTech Corp",
    sentDate: "2023-01-15",
    status: "expired",
    expiryDate: "2024-01-15"
  }
];

const NDA = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewNDAOpen, setIsNewNDAOpen] = useState(false);
  const { toast } = useToast();

  const getStatusColor = (status: NDA["status"]) => {
    switch (status) {
      case "pending": return "warning";
      case "signed": return "success";
      case "expired": return "destructive";
    }
  };

  const getStatusIcon = (status: NDA["status"]) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "signed": return <CheckCircle className="h-4 w-4" />;
      case "expired": return <FileText className="h-4 w-4" />;
    }
  };

  const filteredNDAs = mockNDAs.filter(nda =>
    nda.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          NDA Management
        </h1>
        <p className="text-muted-foreground">
          Track NDAs sent to clients
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search NDAs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isNewNDAOpen} onOpenChange={setIsNewNDAOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Send NDA
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send New NDA</DialogTitle>
              <DialogDescription>Send an NDA to a client for signature</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Client Name</label>
                <Input placeholder="Enter client name" />
              </div>
              <div>
                <label className="text-sm font-medium">Client Email</label>
                <Input type="email" placeholder="client@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea placeholder="Add any additional notes..." rows={3} />
              </div>
              <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload NDA document or drag and drop
                </p>
              </div>
              <Button className="w-full" onClick={() => {
                setIsNewNDAOpen(false);
                toast({
                  title: "NDA Sent Successfully",
                  description: "The NDA has been emailed to the client for signature.",
                });
              }}>
                Send NDA
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNDAs.map((nda) => (
          <Dialog key={nda.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{nda.clientName}</CardTitle>
                    </div>
                    <Badge variant={getStatusColor(nda.status)} className="gap-1">
                      {getStatusIcon(nda.status)}
                      {nda.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Sent: </span>
                      <span>{new Date(nda.sentDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expires: </span>
                      <span>{new Date(nda.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{nda.clientName} - NDA Details</DialogTitle>
                <DialogDescription>View and manage NDA information</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <div className="mt-1">
                      <Badge variant={getStatusColor(nda.status)} className="gap-1">
                        {getStatusIcon(nda.status)}
                        {nda.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Client Name</label>
                    <p className="text-sm text-muted-foreground mt-1">{nda.clientName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Sent Date</label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(nda.sentDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Expiry Date</label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(nda.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  {nda.status === "pending" && (
                    <Button variant="outline" className="flex-1" onClick={() => {
                      toast({
                        title: "Reminder Sent",
                        description: `A reminder email has been sent to ${nda.clientName}.`,
                      });
                    }}>
                      Send Reminder
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default NDA;
