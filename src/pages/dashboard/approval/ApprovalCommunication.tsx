import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, Send, Bell, FileText, Users, AlertTriangle, Mail } from "lucide-react";

const ApprovalCommunication = () => {
  const { toast } = useToast();
  const [selectedDeal, setSelectedDeal] = useState<number | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [acknowledgedConditions, setAcknowledgedConditions] = useState<Record<number, boolean[]>>({});

  const approvedDeals = [
    {
      id: 1,
      dealName: "Tech Corp Acquisition",
      codeName: "Project Phoenix",
      approvalSource: "BRIC",
      approvalDate: "2025-11-05",
      decision: "approved",
      investmentAmount: "$50M",
      dealTeam: ["John Smith", "Sarah Johnson", "Michael Lee"],
      dealTeamEmails: ["john.smith@afc.com", "sarah.johnson@afc.com", "michael.lee@afc.com"],
      conditions: [
        { id: 1, condition: "Annual compliance audit required", deadline: "2025-12-31", priority: "high" },
        { id: 2, condition: "Quarterly performance reviews with Board", deadline: "Every Quarter", priority: "medium" },
        { id: 3, condition: "Enhanced KYC documentation for key stakeholders", deadline: "2025-11-20", priority: "high" },
      ],
      communicationStatus: "pending",
      riskRating: 3,
    },
    {
      id: 2,
      dealName: "Green Energy Project",
      codeName: "Project Aurora",
      approvalSource: "Board",
      approvalDate: "2025-11-08",
      decision: "approved",
      investmentAmount: "$35M",
      dealTeam: ["Emily Chen", "David Brown"],
      dealTeamEmails: ["emily.chen@afc.com", "david.brown@afc.com"],
      conditions: [
        { id: 1, condition: "Environmental impact monitoring program", deadline: "2025-12-15", priority: "high" },
        { id: 2, condition: "Technology risk mitigation plan submission", deadline: "2025-11-25", priority: "high" },
        { id: 3, condition: "Monthly progress reports to InvestCo", deadline: "Monthly", priority: "medium" },
      ],
      communicationStatus: "sent",
      riskRating: 4,
    },
    {
      id: 3,
      dealName: "Infrastructure Fund",
      codeName: "Project Titan",
      approvalSource: "EXCO",
      approvalDate: "2025-11-10",
      decision: "approved",
      investmentAmount: "$15M",
      dealTeam: ["Robert Wilson"],
      dealTeamEmails: ["robert.wilson@afc.com"],
      conditions: [
        { id: 1, condition: "Mandate letter execution within 14 days", deadline: "2025-11-24", priority: "high" },
      ],
      communicationStatus: "acknowledged",
      riskRating: 2,
    },
    {
      id: 4,
      dealName: "Manufacturing Expansion",
      codeName: "Project Forge",
      approvalSource: "BRIC",
      approvalDate: "2025-11-02",
      decision: "stepped_down",
      investmentAmount: "$80M",
      dealTeam: ["Amanda White", "Chris Taylor"],
      dealTeamEmails: ["amanda.white@afc.com", "chris.taylor@afc.com"],
      conditions: [
        { id: 1, condition: "Additional financial due diligence required", deadline: "2025-12-01", priority: "high" },
        { id: 2, condition: "Revised term sheet with modified pricing", deadline: "2025-11-30", priority: "high" },
        { id: 3, condition: "Enhanced legal review of shareholder agreements", deadline: "2025-12-05", priority: "medium" },
      ],
      communicationStatus: "pending",
      riskRating: 6,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock, label: "Pending Communication" },
      sent: { variant: "default" as const, icon: Send, label: "Communicated" },
      acknowledged: { variant: "outline" as const, icon: CheckCircle, label: "Acknowledged" },
    };
    const config = variants[status as keyof typeof variants];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="text-xs">
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getDecisionBadge = (decision: string) => {
    const variants = {
      approved: { variant: "default" as const, icon: CheckCircle, label: "Approved", color: "bg-green-500/10 text-green-600 border-green-200" },
      stepped_down: { variant: "secondary" as const, icon: AlertTriangle, label: "Stepped Down", color: "bg-yellow-500/10 text-yellow-600 border-yellow-200" },
      rejected: { variant: "destructive" as const, icon: XCircle, label: "Rejected", color: "bg-red-500/10 text-red-600 border-red-200" },
    };
    const config = variants[decision as keyof typeof variants];
    const Icon = config.icon;
    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === "high") return <Badge variant="destructive" className="text-xs">High Priority</Badge>;
    return <Badge variant="secondary" className="text-xs">Medium Priority</Badge>;
  };

  const handleSendCommunication = (dealId: number, dealName: string, dealTeam: string[]) => {
    toast({
      title: "Approval Communicated",
      description: `Approval notification with conditions sent to deal team: ${dealTeam.join(", ")}`,
    });
    setAdditionalNotes("");
    setSelectedDeal(null);
  };

  const handleAcknowledgeCondition = (dealId: number, conditionIndex: number, checked: boolean) => {
    setAcknowledgedConditions(prev => ({
      ...prev,
      [dealId]: {
        ...(prev[dealId] || []),
        [conditionIndex]: checked,
      }
    }));
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Approval Communication</h2>
          <p className="text-muted-foreground">Communicate BRIC/Board/EXCO approvals and conditions to deal teams</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-sm">
            <Bell className="h-3 w-3 mr-1" />
            {approvedDeals.filter(d => d.communicationStatus === "pending").length} Pending
          </Badge>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedDeals.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending Communication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {approvedDeals.filter(d => d.communicationStatus === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting notification</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Communicated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {approvedDeals.filter(d => d.communicationStatus === "sent").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting acknowledgment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {approvedDeals.filter(d => d.communicationStatus === "acknowledged").length}
            </div>
            <p className="text-xs text-muted-foreground">Conditions accepted</p>
          </CardContent>
        </Card>
      </div>

      {/* Approval Cards */}
      <div className="space-y-4">
        {approvedDeals.map((deal) => (
          <Card key={deal.id} className={deal.communicationStatus === "pending" ? "border-yellow-200 bg-yellow-50/30" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>{deal.dealName}</CardTitle>
                    <Badge variant="outline" className="text-xs">{deal.codeName}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {deal.approvalSource} Approval
                    </span>
                    <span>Approved: {deal.approvalDate}</span>
                    <span>Risk Rating: {deal.riskRating}/10</span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getDecisionBadge(deal.decision)}
                  {getStatusBadge(deal.communicationStatus)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Deal Team */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Deal Team
                </h4>
                <div className="flex flex-wrap gap-2">
                  {deal.dealTeam.map((member, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {member}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Conditions */}
              <div>
                <h4 className="text-sm font-medium mb-3">Approval Conditions from {deal.approvalSource}</h4>
                <div className="space-y-3">
                  {deal.conditions.map((condition, idx) => (
                    <div key={condition.id} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                      <Checkbox
                        id={`condition-${deal.id}-${idx}`}
                        checked={acknowledgedConditions[deal.id]?.[idx] || false}
                        onCheckedChange={(checked) => handleAcknowledgeCondition(deal.id, idx, checked as boolean)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getPriorityBadge(condition.priority)}
                          <span className="text-xs text-muted-foreground">Deadline: {condition.deadline}</span>
                        </div>
                        <p className="text-sm">{condition.condition}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex gap-2">
                {deal.communicationStatus === "pending" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedDeal(deal.id)}>
                        <Send className="h-4 w-4 mr-2" />
                        Send to Deal Team
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Communicate Approval</DialogTitle>
                        <DialogDescription>
                          Send approval notification with conditions to the deal team for {deal.dealName}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Recipients</h4>
                          <div className="space-y-1">
                            {deal.dealTeamEmails.map((email, idx) => (
                              <p key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                <Mail className="h-3 w-3" />
                                {email}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Conditions to be communicated</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {deal.conditions.map((c, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-3 w-3 mt-1 text-primary" />
                                {c.condition}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Additional Notes (Optional)</h4>
                          <Textarea
                            placeholder="Add any additional instructions or context for the deal team..."
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedDeal(null)}>Cancel</Button>
                        <Button onClick={() => handleSendCommunication(deal.id, deal.dealName, deal.dealTeam)}>
                          <Send className="h-4 w-4 mr-2" />
                          Send Notification
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
                
                {deal.communicationStatus === "sent" && (
                  <Button variant="outline" onClick={() => {
                    toast({
                      title: "Reminder Sent",
                      description: `Reminder sent to deal team: ${deal.dealTeam.join(", ")} to acknowledge conditions.`,
                    });
                  }}>
                    <Bell className="h-4 w-4 mr-2" />
                    Send Reminder
                  </Button>
                )}

                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Full Decision
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApprovalCommunication;
