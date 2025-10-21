import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const Tracking = () => {
  const deals = [
    {
      id: 1,
      name: "Tech Corp Acquisition",
      stages: [
        { name: "EIM", status: "completed", date: "2025-10-15" },
        { name: "FIM", status: "completed", date: "2025-10-22" },
        { name: "BRIC", status: "completed", date: "2025-10-28" },
        { name: "Board", status: "completed", date: "2025-11-05" },
      ],
      currentStage: 4,
    },
    {
      id: 2,
      name: "Green Energy Project",
      stages: [
        { name: "EIM", status: "completed", date: "2025-10-18" },
        { name: "FIM", status: "completed", date: "2025-10-25" },
        { name: "BRIC", status: "in-progress", date: null },
        { name: "Board", status: "pending", date: null },
      ],
      currentStage: 2,
    },
    {
      id: 3,
      name: "Real Estate Development",
      stages: [
        { name: "EIM", status: "completed", date: "2025-10-20" },
        { name: "FIM", status: "in-progress", date: null },
        { name: "BRIC", status: "pending", date: null },
        { name: "Board", status: "pending", date: null },
      ],
      currentStage: 1,
    },
  ];

  const getStageIcon = (status: string) => {
    if (status === "completed") return CheckCircle;
    if (status === "in-progress") return Clock;
    return Circle;
  };

  const getStageColor = (status: string) => {
    if (status === "completed") return "text-primary";
    if (status === "in-progress") return "text-yellow-500";
    return "text-muted-foreground";
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Approval Tracking</h2>
        <p className="text-muted-foreground">Timeline of all committee approvals</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">In approval pipeline</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">At EIM Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Early review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">At FIM/BRIC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Under review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Board Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Deal Timelines */}
      <div className="space-y-6">
        {deals.map((deal) => (
          <Card key={deal.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{deal.name}</CardTitle>
                  <CardDescription>
                    Current stage: {deal.stages[deal.currentStage].name}
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  Stage {deal.currentStage + 1} of 4
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Timeline */}
              <div className="relative">
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-border" />
                
                <div className="relative grid grid-cols-4 gap-4">
                  {deal.stages.map((stage, idx) => {
                    const Icon = getStageIcon(stage.status);
                    const colorClass = getStageColor(stage.status);
                    const isCompleted = stage.status === "completed";
                    const isInProgress = stage.status === "in-progress";

                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center z-10",
                            isCompleted && "bg-primary",
                            isInProgress && "bg-yellow-500",
                            !isCompleted && !isInProgress && "bg-muted"
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-6 w-6",
                              (isCompleted || isInProgress) && "text-primary-foreground",
                              !isCompleted && !isInProgress && colorClass
                            )}
                          />
                        </div>
                        <div className="mt-3 text-center">
                          <p className="font-medium text-sm">{stage.name}</p>
                          {stage.date && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {stage.date}
                            </p>
                          )}
                          {!stage.date && stage.status === "in-progress" && (
                            <p className="text-xs text-yellow-600 mt-1">In Progress</p>
                          )}
                          {!stage.date && stage.status === "pending" && (
                            <p className="text-xs text-muted-foreground mt-1">Pending</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tracking;
