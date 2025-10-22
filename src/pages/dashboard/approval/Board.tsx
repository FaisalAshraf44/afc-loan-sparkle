import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, Users, Calendar, FileText, Download } from "lucide-react";

const Board = () => {
  const { toast } = useToast();
  const boardDecisions = [
    {
      id: 1,
      dealName: "Tech Corp Acquisition",
      meetingDate: "2025-10-25",
      decision: "approved",
      votingResult: "7-0 (Unanimous)",
      investmentAmount: "$50M",
      conditions: ["Annual compliance audit", "Quarterly performance reviews"],
      notes: "Board expressed strong confidence in the management team and market opportunity.",
    },
    {
      id: 2,
      dealName: "Green Energy Project",
      meetingDate: "2025-10-28",
      decision: "approved",
      votingResult: "6-1",
      investmentAmount: "$35M",
      conditions: ["Environmental impact monitoring", "Technology risk mitigation plan"],
      notes: "One member abstained due to potential conflict of interest.",
    },
    {
      id: 3,
      dealName: "Real Estate Development",
      meetingDate: "2025-11-01",
      decision: "pending",
      votingResult: "TBD",
      investmentAmount: "$75M",
      conditions: [],
      notes: "Scheduled for next board meeting.",
    },
  ];

  const getDecisionBadge = (decision: string) => {
    const variants = {
      approved: { variant: "default" as const, icon: CheckCircle, label: "Approved" },
      rejected: { variant: "destructive" as const, icon: XCircle, label: "Rejected" },
      pending: { variant: "secondary" as const, icon: Clock, label: "Pending" },
    };
    const config = variants[decision as keyof typeof variants];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="text-sm">
        <Icon className="h-4 w-4 mr-1" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Board Approval</h2>
          <p className="text-muted-foreground">Board decision summary and voting records</p>
        </div>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Upcoming Meetings
        </Button>
      </div>

      {/* Board Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Decisions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Deals approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$420M</div>
            <p className="text-xs text-muted-foreground">Year to date</p>
          </CardContent>
        </Card>
      </div>

      {/* Board Decisions */}
      <div className="space-y-4">
        {boardDecisions.map((decision) => (
          <Card key={decision.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{decision.dealName}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {decision.meetingDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {decision.votingResult}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getDecisionBadge(decision.decision)}
                  <Badge variant="outline">{decision.investmentAmount}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Meeting Notes</h4>
                <p className="text-sm text-muted-foreground">{decision.notes}</p>
              </div>

              {decision.conditions.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Approval Conditions</h4>
                    <ul className="space-y-1">
                      {decision.conditions.map((condition, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <Separator />

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Minutes
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Decision
                </Button>
                {decision.decision === "approved" && (
                  <Button size="sm" onClick={() => {
                    toast({
                      title: "Board Approval Recorded",
                      description: "Board approval has been recorded and all Division Heads and Treasury have been notified.",
                    });
                  }}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Record Approval
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Board;
