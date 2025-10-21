import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ClipboardCheck, AlertCircle } from "lucide-react";
import { useState } from "react";

const CPTracker = () => {
  const [conditions, setConditions] = useState([
    { id: 1, name: "Board Resolution", status: "completed", category: "Corporate", checked: true },
    { id: 2, name: "Shareholder Approval", status: "completed", category: "Corporate", checked: true },
    { id: 3, name: "Credit Agreement Signed", status: "pending", category: "Legal", checked: false },
    { id: 4, name: "Security Documents Executed", status: "pending", category: "Legal", checked: false },
    { id: 5, name: "Insurance Policies in Place", status: "deferred", category: "Insurance", checked: false },
    { id: 6, name: "Environmental Clearance", status: "completed", category: "Regulatory", checked: true },
    { id: 7, name: "Title Verification Complete", status: "pending", category: "Legal", checked: false },
    { id: 8, name: "Financial Statements Audited", status: "completed", category: "Financial", checked: true },
    { id: 9, name: "Tax Clearance Certificate", status: "pending", category: "Regulatory", checked: false },
    { id: 10, name: "Valuation Report Received", status: "deferred", category: "Financial", checked: false },
  ]);

  const toggleCondition = (id: number) => {
    setConditions(prev =>
      prev.map(cond =>
        cond.id === id
          ? {
              ...cond,
              checked: !cond.checked,
              status: !cond.checked ? "completed" : "pending"
            }
          : cond
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
      completed: { variant: "default", label: "Completed" },
      pending: { variant: "secondary", label: "Pending" },
      deferred: { variant: "outline", label: "Deferred" }
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const completedCount = conditions.filter(c => c.checked).length;
  const progressPercent = (completedCount / conditions.length) * 100;

  const categories = [...new Set(conditions.map(c => c.category))];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">CP Tracker</h2>
        <p className="text-muted-foreground">Track Conditions Precedent for disbursement</p>
      </div>

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

      {/* Conditions by Category */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryConditions = conditions.filter(c => c.category === category);
          const categoryCompleted = categoryConditions.filter(c => c.checked).length;

          return (
            <Card key={category}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{category}</CardTitle>
                  <Badge variant="secondary">
                    {categoryCompleted}/{categoryConditions.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryConditions.map((condition) => (
                    <div
                      key={condition.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Checkbox
                          id={`condition-${condition.id}`}
                          checked={condition.checked}
                          onCheckedChange={() => toggleCondition(condition.id)}
                        />
                        <label
                          htmlFor={`condition-${condition.id}`}
                          className={`text-sm font-medium cursor-pointer ${
                            condition.checked ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {condition.name}
                        </label>
                      </div>
                      {getStatusBadge(condition.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <Button>
          <AlertCircle className="mr-2 h-4 w-4" />
          Request Extension
        </Button>
        <Button variant="outline">Export Report</Button>
      </div>
    </div>
  );
};

export default CPTracker;
