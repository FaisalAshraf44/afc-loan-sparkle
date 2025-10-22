import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Users, FileText, CheckCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const meetings = [
  {
    id: 1,
    company: "Tech Solutions Ltd",
    date: "2024-01-20",
    time: "10:00 AM",
    attendees: 8,
    status: "approved",
    outcome: "Approved for next stage",
  },
  {
    id: 2,
    company: "Green Energy Corp",
    date: "2024-01-22",
    time: "2:00 PM",
    attendees: 6,
    status: "pending",
    outcome: "Awaiting final decision",
  },
  {
    id: 3,
    company: "Manufacturing Inc",
    date: "2024-01-18",
    time: "11:00 AM",
    attendees: 7,
    status: "stepped-down",
    outcome: "Not proceeding with investment",
  },
];

const agendaItems = [
  "Review EIM document and key findings",
  "Present financial projections and analysis",
  "Discuss risk assessment outcomes",
  "Address divisional feedback and concerns",
  "Vote on investment recommendation",
  "Outline next steps and timeline",
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved": return "success";
    case "pending": return "warning";
    case "stepped-down": return "destructive";
    default: return "default";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved": return <CheckCircle className="h-4 w-4" />;
    case "pending": return <Clock className="h-4 w-4" />;
    case "stepped-down": return <XCircle className="h-4 w-4" />;
    default: return null;
  }
};

const SubInvestCo = () => {
  const { toast } = useToast();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Sub-InvestCo Meeting</h2>
        <p className="text-muted-foreground">Agenda and meeting outcomes</p>
      </div>

      <div className="grid gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Upcoming Meetings</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Sub-InvestCo Meeting</DialogTitle>
                  <DialogDescription>
                    Set up a new investment committee meeting
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Company / Deal Name</Label>
                    <Input placeholder="Enter company name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Meeting Date</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label>Meeting Time</Label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div>
                    <Label>Expected Attendees</Label>
                    <Input type="number" placeholder="Number of attendees" />
                  </div>
                  <Button className="w-full">Schedule Meeting</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-4">
            {meetings.map((meeting) => (
              <Card key={meeting.id} className="p-4 hover:bg-accent/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">{meeting.company}</h4>
                      <Badge variant={getStatusColor(meeting.status)} className="flex items-center gap-1">
                        {getStatusIcon(meeting.status)}
                        {meeting.status === "stepped-down" ? "Stepped Down" : meeting.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {meeting.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {meeting.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {meeting.attendees} attendees
                      </div>
                    </div>
                    <p className="text-sm">{meeting.outcome}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{meeting.company} - Meeting Details</DialogTitle>
                        <DialogDescription>
                          {meeting.date} at {meeting.time}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Meeting Agenda
                          </h4>
                          <ol className="space-y-2">
                            {agendaItems.map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <span className="font-medium text-muted-foreground">{index + 1}.</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <Label className="text-base mb-2 block">Meeting Outcome</Label>
                          <Textarea
                            placeholder="Document meeting outcome and decisions..."
                            className="min-h-[100px]"
                            defaultValue={meeting.outcome}
                          />
                        </div>
                        <div>
                          <Label className="text-base mb-2 block">Action Items</Label>
                          <Textarea
                            placeholder="List action items and responsible parties..."
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Save Draft</Button>
                          <Button onClick={() => {
                            toast({
                              title: "Committee Decision Shared",
                              description: "The committee decision has been shared with the Transaction Team and Legal department.",
                            });
                          }}>Finalize Outcome</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SubInvestCo;
