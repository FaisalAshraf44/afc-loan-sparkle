import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardCheck, Bell } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const CPTracker = () => {
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<string>("");
  
  const applications = [
    { id: "1", name: "Tech Corp Acquisition - $5M", borrower: "Tech Corp Ltd" },
    { id: "2", name: "Green Energy Project - $3.2M", borrower: "GreenPower Inc" },
    { id: "3", name: "Manufacturing Expansion - $7.5M", borrower: "Industrial Co" },
  ];

  const [conditions, setConditions] = useState([
    { id: 1, name: "Board Resolution", status: "completed", category: "Corporate", responsibleParty: "Legal Team" },
    { id: 2, name: "Shareholder Approval", status: "completed", category: "Corporate", responsibleParty: "Corporate Secretary" },
    { id: 3, name: "Credit Agreement Signed", status: "pending", category: "Legal", responsibleParty: "Legal Counsel" },
    { id: 4, name: "Security Documents Executed", status: "pending", category: "Legal", responsibleParty: "Legal Team" },
    { id: 5, name: "Insurance Policies in Place", status: "deferred", category: "Insurance", responsibleParty: "Insurance Broker" },
    { id: 6, name: "Environmental Clearance", status: "completed", category: "E&S", responsibleParty: "ESG Officer" },
    { id: 7, name: "Title Verification Complete", status: "pending", category: "Legal", responsibleParty: "Legal Counsel" },
    { id: 8, name: "Financial Statements Audited", status: "completed", category: "Financial", responsibleParty: "Finance Team" },
    { id: 9, name: "Social Impact Assessment", status: "pending", category: "E&S", responsibleParty: "ESG Officer" },
    { id: 10, name: "Valuation Report Received", status: "deferred", category: "Financial", responsibleParty: "Valuation Team" },
  ]);

  const updateConditionStatus = (id: number, newStatus: string) => {
    setConditions(prev =>
      prev.map(cond =>
        cond.id === id ? { ...cond, status: newStatus } : cond
      )
    );
  };

  const notifyResponsibleParty = (condition: typeof conditions[0]) => {
    toast({
      title: "Notification Sent Successfully",
      description: `${condition.responsibleParty} has been notified about "${condition.name}"`,
    });
  };

  const completedCount = conditions.filter(c => c.status === "completed").length;
  const progressPercent = (completedCount / conditions.length) * 100;

  const categories = ["Corporate", "Legal", "Insurance", "Financial", "E&S"];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">CP Tracker</h2>
        <p className="text-muted-foreground">Track Conditions Precedent for disbursement</p>
      </div>

      {/* Application Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Application</CardTitle>
          <CardDescription>Choose a loan application to track its conditions precedent</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedApplication} onValueChange={setSelectedApplication}>
            <SelectTrigger>
              <SelectValue placeholder="Select an application..." />
            </SelectTrigger>
            <SelectContent>
              {applications.map((app) => (
                <SelectItem key={app.id} value={app.id}>
                  {app.name}
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
            <h3 className="text-lg font-semibold mb-2">No Application Selected</h3>
            <p className="text-muted-foreground">
              Please select a loan application to view and track its conditions precedent
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Progress Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5" />
                Overall Progress
              </CardTitle>
              <CardDescription>
                {completedCount} of {conditions.length} conditions completed
              </CardDescription>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
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
                  <div className="h-2 w-2 rounded-full bg-muted" />
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
                  <div className="h-2 w-2 rounded-full bg-border" />
                  Deferred
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {conditions.filter(c => c.status === "deferred").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conditions by Department */}
          <div className="space-y-6">
            {categories.map((category) => {
              const categoryConditions = conditions.filter(c => c.category === category);
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
        </>
      )}
    </div>
  );
};

export default CPTracker;
