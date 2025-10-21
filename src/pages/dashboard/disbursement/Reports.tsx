import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, Download, TrendingUp, PieChart, Activity } from "lucide-react";

const monthlyData = [
  { month: "Jan", disbursements: 3, amount: "$5.25M", status: "Completed" },
  { month: "Feb", disbursements: 2, amount: "$3.80M", status: "In Progress" },
  { month: "Mar", disbursements: 4, amount: "$6.50M", status: "Approved" },
];

const sectorDistribution = [
  { sector: "Technology", count: 8, percentage: 35, status: "Active" },
  { sector: "Healthcare", count: 6, percentage: 26, status: "Active" },
  { sector: "Energy", count: 5, percentage: 22, status: "Active" },
  { sector: "Retail", count: 4, percentage: 17, status: "Active" },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, string> = {
    "Completed": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    "In Progress": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    "Approved": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    "Active": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  };
  
  return <Badge className={variants[status] || "bg-muted text-muted-foreground"}>{status}</Badge>;
};

export default function Reports() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Visual summaries and performance analytics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="p-6 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Total Disbursements
          </div>
          <div className="text-3xl font-bold">$15.55M</div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 12% from last quarter</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-purple-500">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            Active Loans
          </div>
          <div className="text-3xl font-bold">23</div>
          <p className="text-xs text-muted-foreground mt-1">Across 4 sectors</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-green-500">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Avg Processing Time
          </div>
          <div className="text-3xl font-bold">14 days</div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">↓ 3 days from last month</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <PieChart className="h-5 w-5 text-emerald-600" />
            Success Rate
          </div>
          <div className="text-3xl font-bold">96%</div>
          <p className="text-xs text-muted-foreground mt-1">No defaults YTD</p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Monthly Disbursements</h2>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyData.map((item) => (
                <TableRow key={item.month}>
                  <TableCell className="font-medium">{item.month}</TableCell>
                  <TableCell>{item.disbursements}</TableCell>
                  <TableCell className="font-semibold">{item.amount}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card>
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Sector Distribution</h2>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sector</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sectorDistribution.map((item) => (
                <TableRow key={item.sector}>
                  <TableCell className="font-medium">{item.sector}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{item.percentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent">
        <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-5 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-lg">
            <p className="text-sm text-muted-foreground">Best Performing Sector</p>
            <p className="text-2xl font-bold mt-1">Technology</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">35% of portfolio</p>
          </div>
          <div className="p-5 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-lg">
            <p className="text-sm text-muted-foreground">Fastest Approval Time</p>
            <p className="text-2xl font-bold mt-1">9 days</p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Achieved in Q1 2024</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
