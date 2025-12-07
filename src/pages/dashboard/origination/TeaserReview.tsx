import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, FileText, Upload, Calendar, Building2, Phone, CheckCircle, Clock, XCircle } from "lucide-react";

interface Teaser {
  id: string;
  clientName: string;
  projectTitle: string;
  sector: string;
  dealSize: string;
  submittedDate: string;
  status: "pending" | "reviewed" | "call_scheduled" | "rejected";
  summary: string;
  introCallDate?: string;
  introCallNotes?: string;
}

const mockTeasers: Teaser[] = [
  {
    id: "1",
    clientName: "TechVenture Inc",
    projectTitle: "Series B Expansion",
    sector: "Technology",
    dealSize: "$25M",
    submittedDate: "2024-01-15",
    status: "call_scheduled",
    summary: "AI-powered logistics platform seeking expansion capital for African markets",
    introCallDate: "2024-01-20",
    introCallNotes: "Call scheduled with CEO and CFO to discuss market entry strategy"
  },
  {
    id: "2",
    clientName: "GreenEnergy Solutions",
    projectTitle: "Solar Farm Development",
    sector: "Renewable Energy",
    dealSize: "$50M",
    submittedDate: "2024-01-14",
    status: "reviewed",
    summary: "Development of 100MW solar farm in West Africa with PPA agreements"
  },
  {
    id: "3",
    clientName: "Healthcare Plus",
    projectTitle: "Hospital Network Expansion",
    sector: "Healthcare",
    dealSize: "$18M",
    submittedDate: "2024-01-13",
    status: "pending",
    summary: "Expansion of private hospital network across 5 new locations"
  },
  {
    id: "4",
    clientName: "AgriTech Corp",
    projectTitle: "Smart Farming Initiative",
    sector: "Agriculture",
    dealSize: "$12M",
    submittedDate: "2024-01-10",
    status: "rejected",
    summary: "IoT-based farming solutions - declined due to early stage"
  }
];

const TeaserReview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewTeaserOpen, setIsNewTeaserOpen] = useState(false);
  const [isScheduleCallOpen, setIsScheduleCallOpen] = useState(false);
  const [selectedTeaser, setSelectedTeaser] = useState<Teaser | null>(null);
  const { toast } = useToast();

  const getStatusColor = (status: Teaser["status"]) => {
    switch (status) {
      case "pending": return "warning";
      case "reviewed": return "secondary";
      case "call_scheduled": return "success";
      case "rejected": return "destructive";
    }
  };

  const getStatusIcon = (status: Teaser["status"]) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "reviewed": return <FileText className="h-4 w-4" />;
      case "call_scheduled": return <Phone className="h-4 w-4" />;
      case "rejected": return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: Teaser["status"]) => {
    switch (status) {
      case "pending": return "Pending Review";
      case "reviewed": return "Reviewed";
      case "call_scheduled": return "Call Scheduled";
      case "rejected": return "Rejected";
    }
  };

  const filteredTeasers = mockTeasers.filter(teaser =>
    teaser.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teaser.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: mockTeasers.length,
    pending: mockTeasers.filter(t => t.status === "pending").length,
    callScheduled: mockTeasers.filter(t => t.status === "call_scheduled").length,
    reviewed: mockTeasers.filter(t => t.status === "reviewed").length,
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Teaser Review
        </h1>
        <p className="text-muted-foreground">
          Review client investment teasers and schedule introductory calls
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Teasers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-500">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-500">{stats.callScheduled}</div>
            <p className="text-xs text-muted-foreground">Calls Scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-500">{stats.reviewed}</div>
            <p className="text-xs text-muted-foreground">Reviewed</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teasers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isNewTeaserOpen} onOpenChange={setIsNewTeaserOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Log New Teaser
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Log New Client Teaser</DialogTitle>
              <DialogDescription>Record a new investment teaser received from a client</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Client Name</Label>
                <Input placeholder="Enter client/company name" />
              </div>
              <div>
                <Label>Project Title</Label>
                <Input placeholder="Enter project title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Sector</Label>
                  <Input placeholder="e.g., Technology" />
                </div>
                <div>
                  <Label>Deal Size</Label>
                  <Input placeholder="e.g., $25M" />
                </div>
              </div>
              <div>
                <Label>Investment Summary</Label>
                <Textarea placeholder="Brief summary of the investment opportunity..." rows={3} />
              </div>
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
                <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Upload teaser document (PDF, PPT)
                </p>
              </div>
              <Button className="w-full" onClick={() => {
                setIsNewTeaserOpen(false);
                toast({
                  title: "Teaser Logged",
                  description: "The teaser has been recorded and is pending review.",
                });
              }}>
                Log Teaser
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeasers.map((teaser) => (
          <Card key={teaser.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{teaser.clientName}</CardTitle>
                </div>
                <Badge variant={getStatusColor(teaser.status)} className="gap-1">
                  {getStatusIcon(teaser.status)}
                  {getStatusLabel(teaser.status)}
                </Badge>
              </div>
              <CardDescription className="font-medium">{teaser.projectTitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">{teaser.summary}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{teaser.sector}</span>
                  <span className="font-semibold text-primary">{teaser.dealSize}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Received: {new Date(teaser.submittedDate).toLocaleDateString()}</span>
                </div>
                {teaser.introCallDate && (
                  <div className="flex items-center gap-2 text-sm text-emerald-600">
                    <Phone className="h-4 w-4" />
                    <span>Call: {new Date(teaser.introCallDate).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  {teaser.status === "pending" && (
                    <>
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => {
                        toast({
                          title: "Teaser Reviewed",
                          description: "The teaser has been marked as reviewed.",
                        });
                      }}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Reviewed
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex-1">
                            <Phone className="h-4 w-4 mr-1" />
                            Schedule Call
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Schedule Introductory Call</DialogTitle>
                            <DialogDescription>
                              Schedule a call with {teaser.clientName} to discuss the opportunity
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Call Date & Time</Label>
                              <Input type="datetime-local" />
                            </div>
                            <div>
                              <Label>Attendees</Label>
                              <Input placeholder="Enter attendee emails..." />
                            </div>
                            <div>
                              <Label>Call Agenda</Label>
                              <Textarea placeholder="Discussion points for the call..." rows={3} />
                            </div>
                            <Button className="w-full" onClick={() => {
                              toast({
                                title: "Call Scheduled",
                                description: "Introductory call has been scheduled and invites sent.",
                              });
                            }}>
                              Schedule Call
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                  {teaser.status === "reviewed" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="w-full">
                          <Phone className="h-4 w-4 mr-1" />
                          Schedule Intro Call
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Schedule Introductory Call</DialogTitle>
                          <DialogDescription>
                            Schedule a call with {teaser.clientName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Call Date & Time</Label>
                            <Input type="datetime-local" />
                          </div>
                          <div>
                            <Label>Attendees</Label>
                            <Input placeholder="Enter attendee emails..." />
                          </div>
                          <Button className="w-full" onClick={() => {
                            toast({
                              title: "Call Scheduled",
                              description: "Introductory call has been scheduled.",
                            });
                          }}>
                            Schedule Call
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  {teaser.status === "call_scheduled" && (
                    <Button size="sm" variant="outline" className="w-full">
                      View Call Details
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeaserReview;
