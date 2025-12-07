import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ClipboardCheck, Bell, AlertTriangle, CheckCircle2, Plus, FileText, Scale, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Condition {
  id: number;
  name: string;
  status: "completed" | "pending" | "deferred" | "waived";
  category: string;
  responsibleParty: string;
  dueDate?: string;
  notes?: string;
}

interface LegalRiskIssue {
  id: number;
  stage: "InvestCo" | "BRIC";
  type: "Legal" | "Risk";
  description: string;
  status: "open" | "addressed" | "resolved";
  resolution?: string;
  raisedDate: string;
  resolvedDate?: string;
}

const CPTracker = () => {
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<string>("");
  const [newConditionName, setNewConditionName] = useState("");
  const [newConditionCategory, setNewConditionCategory] = useState("");
  const [newConditionParty, setNewConditionParty] = useState("");
  
  const applications = [
    { id: "1", name: "Project Atlas - $5M", borrower: "TechCorp Industries" },
    { id: "2", name: "Project Neptune - $3.2M", borrower: "Global Energy Ltd" },
    { id: "3", name: "Project Titan - $7.5M", borrower: "Industrial Manufacturing Co" },
  ];

  const [conditions, setConditions] = useState<Condition[]>([
    { id: 1, name: "Board Resolution", status: "completed", category: "Corporate", responsibleParty: "Legal Team", dueDate: "2024-01-25" },
    { id: 2, name: "Shareholder Approval", status: "completed", category: "Corporate", responsibleParty: "Corporate Secretary", dueDate: "2024-01-26" },
    { id: 3, name: "Credit Agreement Signed", status: "pending", category: "Legal", responsibleParty: "Legal Counsel", dueDate: "2024-01-30" },
    { id: 4, name: "Security Documents Executed", status: "pending", category: "Legal", responsibleParty: "Legal Team", dueDate: "2024-02-01" },
    { id: 5, name: "Insurance Policies in Place", status: "deferred", category: "Insurance", responsibleParty: "Insurance Broker", dueDate: "2024-02-05" },
    { id: 6, name: "Environmental Clearance", status: "completed", category: "E&S", responsibleParty: "ESG Officer", dueDate: "2024-01-20" },
    { id: 7, name: "Title Verification Complete", status: "pending", category: "Legal", responsibleParty: "Legal Counsel", dueDate: "2024-01-28" },
    { id: 8, name: "Financial Statements Audited", status: "completed", category: "Financial", responsibleParty: "Finance Team", dueDate: "2024-01-22" },
    { id: 9, name: "Social Impact Assessment", status: "pending", category: "E&S", responsibleParty: "ESG Officer", dueDate: "2024-02-03" },
    { id: 10, name: "Valuation Report Received", status: "deferred", category: "Financial", responsibleParty: "Valuation Team", dueDate: "2024-02-10" },
  ]);

  const [legalRiskIssues, setLegalRiskIssues] = useState<LegalRiskIssue[]>([
    { 
      id: 1, 
      stage: "InvestCo", 
      type: "Legal", 
      description: "Ensure proper corporate authorization for guarantor entities", 
      status: "resolved",
      resolution: "Board resolutions obtained from all guarantor entities",
      raisedDate: "2024-01-10",
      resolvedDate: "2024-01-18"
    },
    { 
      id: 2, 
      stage: "InvestCo", 
      type: "Risk", 
      description: "Currency exposure mitigation strategy required", 
      status: "addressed",
      resolution: "Hedging arrangement being finalized with Treasury",
      raisedDate: "2024-01-10"
    },
    { 
      id: 3, 
      stage: "BRIC", 
      type: "Legal", 
      description: "Cross-default provisions to be aligned with existing facilities", 
      status: "open",
      raisedDate: "2024-01-15"
    },
    { 
      id: 4, 
      stage: "BRIC", 
      type: "Risk", 
      description: "Additional collateral coverage required for 1.25x asset cover", 
      status: "addressed",
      resolution: "Client agreed to provide additional pledged receivables",
      raisedDate: "2024-01-15"
    },
  ]);

  const updateConditionStatus = (id: number, newStatus: string) => {
    setConditions(prev =>
      prev.map(cond =>
        cond.id === id ? { ...cond, status: newStatus as Condition["status"] } : cond
      )
    );
    toast({
      title: "Status Updated",
      description: "Condition precedent status has been updated.",
    });
  };

  const updateIssueStatus = (id: number, newStatus: string, resolution?: string) => {
    setLegalRiskIssues(prev =>
      prev.map(issue =>
        issue.id === id ? { 
          ...issue, 
          status: newStatus as LegalRiskIssue["status"],
          resolution: resolution || issue.resolution,
          resolvedDate: newStatus === "resolved" ? new Date().toISOString().split('T')[0] : issue.resolvedDate
        } : issue
      )
    );
    toast({
      title: "Issue Updated",
      description: "Legal/Risk issue status has been updated.",
    });
  };

  const notifyResponsibleParty = (condition: Condition) => {
    toast({
      title: "Notification Sent Successfully",
      description: `${condition.responsibleParty} has been notified about "${condition.name}"`,
    });
  };

  const addNewCondition = () => {
    if (!newConditionName || !newConditionCategory || !newConditionParty) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const newCondition: Condition = {
      id: conditions.length + 1,
      name: newConditionName,
      status: "pending",
      category: newConditionCategory,
      responsibleParty: newConditionParty,
    };
    
    setConditions(prev => [...prev, newCondition]);
    setNewConditionName("");
    setNewConditionCategory("");
    setNewConditionParty("");
    
    toast({
      title: "Condition Added",
      description: `New CP "${newConditionName}" has been added to the checklist.`,
    });
  };

  const completedCount = conditions.filter(c => c.status === "completed").length;
  const progressPercent = (completedCount / conditions.length) * 100;

  const categories = ["Corporate", "Legal", "Insurance", "Financial", "E&S"];

  const getIssueStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20"><CheckCircle2 className="h-3 w-3 mr-1" />Resolved</Badge>;
      case "addressed":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20"><AlertTriangle className="h-3 w-3 mr-1" />Addressed</Badge>;
      default:
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Open</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Conditions Precedent Tracker</h2>
        <p className="text-muted-foreground">Track CPs and Legal/Risk issues from InvestCo and BRIC stages</p>
      </div>

      {/* Application Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Application</CardTitle>
          <CardDescription>Choose a deal to track its conditions precedent</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedApplication} onValueChange={setSelectedApplication}>
            <SelectTrigger>
              <SelectValue placeholder="Select a deal..." />
            </SelectTrigger>
            <SelectContent>
              {applications.map((app) => (
                <SelectItem key={app.id} value={app.id}>
                  {app.name} - {app.borrower}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {!selectedApplication ? (
        <Card>
          <CardContent className="py-12 text-center">
            <ClipboardCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Deal Selected</h3>
            <p className="text-muted-foreground">
              Please select a deal to view and track its conditions precedent and outstanding issues
            </p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="conditions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="conditions">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Conditions Precedent
            </TabsTrigger>
            <TabsTrigger value="issues">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Legal & Risk Issues
            </TabsTrigger>
          </TabsList>

          {/* Conditions Precedent Tab */}
          <TabsContent value="conditions" className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5" />
                    Overall Progress
                  </CardTitle>
                  <CardDescription>
                    {completedCount} of {conditions.length} conditions completed
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Condition
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Condition Precedent</DialogTitle>
                      <DialogDescription>
                        Add a new condition to the CP checklist
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium">Condition Name</label>
                        <Textarea 
                          placeholder="Describe the condition precedent..."
                          value={newConditionName}
                          onChange={(e) => setNewConditionName(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Category</label>
                        <Select value={newConditionCategory} onValueChange={setNewConditionCategory}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Responsible Party</label>
                        <Select value={newConditionParty} onValueChange={setNewConditionParty}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select responsible party" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Legal Team">Legal Team</SelectItem>
                            <SelectItem value="Legal Counsel">Legal Counsel</SelectItem>
                            <SelectItem value="Corporate Secretary">Corporate Secretary</SelectItem>
                            <SelectItem value="Finance Team">Finance Team</SelectItem>
                            <SelectItem value="ESG Officer">ESG Officer</SelectItem>
                            <SelectItem value="Insurance Broker">Insurance Broker</SelectItem>
                            <SelectItem value="Valuation Team">Valuation Team</SelectItem>
                            <SelectItem value="Treasury">Treasury</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={addNewCondition} className="w-full">
                        Add Condition
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercent} className="mb-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{progressPercent.toFixed(0)}% Complete</span>
                  <span>{conditions.length - completedCount} remaining</span>
                </div>
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {conditions.filter(c => c.status === "completed").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {conditions.filter(c => c.status === "pending").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400" />
                    Deferred
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {conditions.filter(c => c.status === "deferred").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    Waived
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {conditions.filter(c => c.status === "waived").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Conditions by Department */}
            <div className="space-y-6">
              {categories.map((category) => {
                const categoryConditions = conditions.filter(c => c.category === category);
                if (categoryConditions.length === 0) return null;
                
                const categoryCompleted = categoryConditions.filter(c => c.status === "completed").length;
                const categoryProgress = (categoryCompleted / categoryConditions.length) * 100;

                return (
                  <Card key={category}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <CardTitle>{category}</CardTitle>
                        <Badge variant="secondary">
                          {categoryCompleted}/{categoryConditions.length} Completed
                        </Badge>
                      </div>
                      <Progress value={categoryProgress} className="h-2" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {categoryConditions.map((condition) => (
                          <div
                            key={condition.id}
                            className="flex items-center justify-between gap-4 p-4 rounded-lg border bg-card"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="font-medium mb-1">{condition.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Responsible: {condition.responsibleParty}
                              </div>
                              {condition.dueDate && (
                                <div className="text-xs text-muted-foreground">
                                  Due: {condition.dueDate}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Select
                                value={condition.status}
                                onValueChange={(value) => updateConditionStatus(condition.id, value)}
                              >
                                <SelectTrigger className="w-[130px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="deferred">Deferred</SelectItem>
                                  <SelectItem value="waived">Waived</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => notifyResponsibleParty(condition)}
                              >
                                <Bell className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Legal & Risk Issues Tab */}
          <TabsContent value="issues" className="space-y-6">
            {/* Issues Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    Open Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">
                    {legalRiskIssues.filter(i => i.status === "open").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Require immediate attention</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Being Addressed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">
                    {legalRiskIssues.filter(i => i.status === "addressed").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Resolution in progress</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Resolved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {legalRiskIssues.filter(i => i.status === "resolved").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Successfully closed</p>
                </CardContent>
              </Card>
            </div>

            {/* InvestCo Issues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  InvestCo Stage Issues
                </CardTitle>
                <CardDescription>
                  Legal and Risk issues identified during InvestCo review
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {legalRiskIssues.filter(i => i.stage === "InvestCo").map((issue) => (
                  <div key={issue.id} className="p-4 rounded-lg border space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {issue.type === "Legal" ? (
                          <Scale className="h-4 w-4 text-purple-500" />
                        ) : (
                          <Shield className="h-4 w-4 text-amber-500" />
                        )}
                        <Badge variant="outline">{issue.type}</Badge>
                        {getIssueStatusBadge(issue.status)}
                      </div>
                      <span className="text-xs text-muted-foreground">Raised: {issue.raisedDate}</span>
                    </div>
                    <p className="text-sm">{issue.description}</p>
                    {issue.resolution && (
                      <div className="p-3 rounded bg-muted/50">
                        <p className="text-xs font-medium mb-1">Resolution:</p>
                        <p className="text-sm text-muted-foreground">{issue.resolution}</p>
                      </div>
                    )}
                    {issue.status !== "resolved" && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateIssueStatus(issue.id, "addressed")}
                        >
                          Mark as Addressed
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => updateIssueStatus(issue.id, "resolved")}
                        >
                          Mark as Resolved
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* BRIC Issues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  BRIC Stage Issues
                </CardTitle>
                <CardDescription>
                  Legal and Risk issues identified during BRIC review
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {legalRiskIssues.filter(i => i.stage === "BRIC").map((issue) => (
                  <div key={issue.id} className="p-4 rounded-lg border space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {issue.type === "Legal" ? (
                          <Scale className="h-4 w-4 text-purple-500" />
                        ) : (
                          <Shield className="h-4 w-4 text-amber-500" />
                        )}
                        <Badge variant="outline">{issue.type}</Badge>
                        {getIssueStatusBadge(issue.status)}
                      </div>
                      <span className="text-xs text-muted-foreground">Raised: {issue.raisedDate}</span>
                    </div>
                    <p className="text-sm">{issue.description}</p>
                    {issue.resolution && (
                      <div className="p-3 rounded bg-muted/50">
                        <p className="text-xs font-medium mb-1">Resolution:</p>
                        <p className="text-sm text-muted-foreground">{issue.resolution}</p>
                      </div>
                    )}
                    {issue.status !== "resolved" && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateIssueStatus(issue.id, "addressed")}
                        >
                          Mark as Addressed
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => updateIssueStatus(issue.id, "resolved")}
                        >
                          Mark as Resolved
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default CPTracker;
