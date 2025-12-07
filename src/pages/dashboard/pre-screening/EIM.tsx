import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, Upload, Send, Clock, AlertTriangle, CheckCircle, Calendar } from "lucide-react";
import { differenceInBusinessDays, format, addBusinessDays } from "date-fns";

const eimDrafts = [
  { id: 1, company: "Tech Solutions Ltd", status: "approved", updatedAt: "2024-01-15", subInvestCoDate: "2024-01-22", submittedDate: "2024-01-15" },
  { id: 2, company: "Green Energy Corp", status: "pending", updatedAt: "2024-01-14", subInvestCoDate: "2024-01-23", submittedDate: null },
  { id: 3, company: "Manufacturing Inc", status: "stepped-down", updatedAt: "2024-01-13", subInvestCoDate: "2024-01-18", submittedDate: "2024-01-11" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved": return "success";
    case "pending": return "warning";
    case "stepped-down": return "destructive";
    default: return "default";
  }
};

const getDeadlineStatus = (subInvestCoDate: string, submittedDate: string | null) => {
  const meetingDate = new Date(subInvestCoDate);
  const today = new Date();
  const daysUntilMeeting = differenceInBusinessDays(meetingDate, today);
  const submissionDeadline = addBusinessDays(meetingDate, -5);
  
  if (submittedDate) {
    const submitted = new Date(submittedDate);
    const daysBeforeMeeting = differenceInBusinessDays(meetingDate, submitted);
    if (daysBeforeMeeting >= 5) {
      return { status: "on-time", message: `Submitted ${daysBeforeMeeting} business days before meeting`, color: "success" };
    } else {
      return { status: "late", message: `Submitted ${daysBeforeMeeting} business days before (5 required)`, color: "warning" };
    }
  }
  
  if (daysUntilMeeting < 5) {
    return { status: "overdue", message: `Deadline passed - Meeting in ${daysUntilMeeting} days`, color: "destructive" };
  } else if (daysUntilMeeting <= 7) {
    return { status: "urgent", message: `Submit by ${format(submissionDeadline, "MMM d")} (${daysUntilMeeting - 5} days left)`, color: "warning" };
  } else {
    return { status: "ok", message: `Deadline: ${format(submissionDeadline, "MMM d, yyyy")}`, color: "default" };
  }
};

const EIM = () => {
  const [selectedDraft, setSelectedDraft] = useState(eimDrafts[0]);
  const { toast } = useToast();

  const deadlineInfo = getDeadlineStatus(selectedDraft.subInvestCoDate, selectedDraft.submittedDate);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">EIM Drafting</h2>
        <p className="text-muted-foreground">Template-based EIM document editor</p>
      </div>

      {/* 5-Day Deadline Alert */}
      <Card className="mb-6 p-4 border-warning/50 bg-warning/5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-sm">Sub-Investment Committee Submission Requirement</p>
            <p className="text-xs text-muted-foreground mt-1">
              EIM documents must be submitted to Corporate Secretariat and Risk at least <strong>5 business days</strong> before the proposed Sub-Investment Committee meeting (every Tuesday).
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar List */}
        <div className="col-span-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Drafts</h3>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-2" />
                New EIM
              </Button>
            </div>
            <div className="space-y-2">
              {eimDrafts.map((draft) => {
                const deadline = getDeadlineStatus(draft.subInvestCoDate, draft.submittedDate);
                return (
                  <Card
                    key={draft.id}
                    className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
                      selectedDraft.id === draft.id ? "border-primary" : ""
                    }`}
                    onClick={() => setSelectedDraft(draft)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{draft.company}</p>
                        <p className="text-xs text-muted-foreground">{draft.updatedAt}</p>
                      </div>
                      <Badge variant={getStatusColor(draft.status)}>
                        {draft.status === "stepped-down" ? "Stepped Down" : draft.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs mt-2">
                      <Calendar className="h-3 w-3" />
                      <span className="text-muted-foreground">Sub-InvestCo: {draft.subInvestCoDate}</span>
                    </div>
                    <Badge variant={deadline.color as any} className="mt-2 text-xs">
                      {deadline.status === "on-time" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {deadline.status === "overdue" && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {deadline.status === "urgent" && <Clock className="h-3 w-3 mr-1" />}
                      {deadline.message}
                    </Badge>
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{selectedDraft.company}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={deadlineInfo.color as any} className="flex items-center gap-1">
                    {deadlineInfo.status === "on-time" && <CheckCircle className="h-3 w-3" />}
                    {deadlineInfo.status === "overdue" && <AlertTriangle className="h-3 w-3" />}
                    {deadlineInfo.status === "urgent" && <Clock className="h-3 w-3" />}
                    {deadlineInfo.message}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" onClick={() => {
                  toast({
                    title: "EIM Submitted for Review",
                    description: "The EIM has been submitted and the Divisional Head and Risk Team have been notified.",
                  });
                }}>
                  <Send className="h-4 w-4 mr-2" />
                  Submit for Review
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Executive Summary</label>
                  <Textarea
                    placeholder="Enter executive summary..."
                    className="min-h-[120px]"
                    defaultValue="This investment opportunity presents a compelling case for..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Investment Rationale</label>
                  <Textarea
                    placeholder="Enter investment rationale..."
                    className="min-h-[120px]"
                    defaultValue="Strategic fit with portfolio objectives..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Key Risks</label>
                  <Textarea
                    placeholder="Enter key risks..."
                    className="min-h-[120px]"
                    defaultValue="Market volatility, regulatory changes..."
                  />
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Upload Documents
                  </Button>
                </div>
                <div className="space-y-2">
                  <Card className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">Financial_Statements_2023.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </Card>
                  <Card className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">Business_Plan.docx</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="space-y-4">
                <div>
                  <Textarea
                    placeholder="Add a comment..."
                    className="min-h-[100px]"
                  />
                  <Button className="mt-2" size="sm">
                    Post Comment
                  </Button>
                </div>
                <div className="space-y-3">
                  <Card className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium">JD</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">John Doe</span>
                          <span className="text-xs text-muted-foreground">2 hours ago</span>
                        </div>
                        <p className="text-sm">
                          The financial projections look solid. Recommend approval pending legal review.
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium">SM</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">Sarah Miller</span>
                          <span className="text-xs text-muted-foreground">1 day ago</span>
                        </div>
                        <p className="text-sm">
                          Need clarification on the market analysis section.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EIM;
