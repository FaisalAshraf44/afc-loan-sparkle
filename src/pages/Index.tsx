import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  DollarSign, 
  AlertCircle, 
  TrendingUp, 
  ArrowRight,
  Activity,
  Clock,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Index = () => {
  const navigate = useNavigate();

  const deals = [
    { id: "DL-2025-001", client: "ABC Corporation", amount: "$5.2M", stage: "FIM Preparation", status: "In Progress", risk: "Medium" },
    { id: "DL-2025-002", client: "XYZ Industries", amount: "$8.7M", stage: "Board Approval", status: "Pending", risk: "Low" },
    { id: "DL-2025-003", client: "Tech Innovations Ltd", amount: "$3.5M", stage: "CP Tracker", status: "In Progress", risk: "High" },
    { id: "DL-2025-004", client: "Global Enterprises", amount: "$12.4M", stage: "Treasury Execution", status: "Approved", risk: "Low" },
    { id: "DL-2025-005", client: "Smart Solutions Inc", amount: "$6.8M", stage: "Risk Assessment", status: "In Progress", risk: "Medium" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "In Progress": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
      "Pending": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
      "Approved": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    };
    return <Badge className={variants[status] || ""}>{status}</Badge>;
  };

  const getRiskBadge = (risk: string) => {
    const variants: Record<string, string> = {
      "High": "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
      "Medium": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
      "Low": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    };
    return <Badge className={variants[risk] || ""}>{risk}</Badge>;
  };

  const riskDistribution = [
    { level: "Low Risk", count: 12, percentage: 48, color: "bg-green-500" },
    { level: "Medium Risk", count: 9, percentage: 36, color: "bg-amber-500" },
    { level: "High Risk", count: 4, percentage: 16, color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AFC Loan Workflow System
              </h1>
              <p className="text-muted-foreground mt-1">
                Overview of deals and their current stage
              </p>
            </div>
            <Button onClick={() => navigate("/dashboard/origination/crm")} size="lg">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Summary Widgets */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Active Deals</CardDescription>
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-3xl">25</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500">+12%</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Pending Approval</CardDescription>
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <CardTitle className="text-3xl">7</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span>Requires attention</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Total Disbursements</CardDescription>
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <CardTitle className="text-3xl">$124.8M</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4" />
                <span>YTD performance</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Avg. Processing Time</CardDescription>
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <CardTitle className="text-3xl">28d</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500">-5 days</span>
                <span className="text-muted-foreground">improvement</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Score Distribution</CardTitle>
            <CardDescription>Portfolio risk analysis across all active deals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskDistribution.map((item) => (
              <div key={item.level} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="font-medium">{item.level}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{item.count} deals</span>
                    <span className="font-semibold w-12 text-right">{item.percentage}%</span>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Deals Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Active Deals</CardTitle>
                <CardDescription>Latest deals moving through the workflow pipeline</CardDescription>
              </div>
              <Button variant="outline" onClick={() => navigate("/dashboard/pipeline")}>
                View All Deals
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deal ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Current Stage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((deal) => (
                  <TableRow key={deal.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">{deal.id}</TableCell>
                    <TableCell className="font-medium">{deal.client}</TableCell>
                    <TableCell className="font-semibold">{deal.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{deal.stage}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(deal.status)}</TableCell>
                    <TableCell>{getRiskBadge(deal.risk)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/dashboard/origination/crm")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Start New Deal
              </CardTitle>
              <CardDescription>Initiate deal origination process</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/dashboard/approval/tracking")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Track Approvals
              </CardTitle>
              <CardDescription>Monitor pending approvals</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/dashboard/disbursement/reports")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                View Reports
              </CardTitle>
              <CardDescription>Access analytics and insights</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
