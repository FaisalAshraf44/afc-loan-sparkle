import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Download, CheckCircle, Clock } from "lucide-react";

const fundReleases = [
  {
    id: "FR-001",
    client: "Tech Innovations Ltd",
    amount: "$2,500,000",
    account: "****1234",
    scheduleDate: "2024-01-20",
    status: "Approved",
    treasury: "Ready for Release",
  },
  {
    id: "FR-002",
    client: "Green Energy Corp",
    amount: "$1,800,000",
    account: "****5678",
    scheduleDate: "2024-01-22",
    status: "In Progress",
    treasury: "Pending Verification",
  },
  {
    id: "FR-003",
    client: "Retail Ventures LLC",
    amount: "$950,000",
    account: "****9012",
    scheduleDate: "2024-01-18",
    status: "Completed",
    treasury: "Funds Released",
  },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, string> = {
    "Approved": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    "In Progress": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    "Completed": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  };
  
  return <Badge className={variants[status] || "bg-muted text-muted-foreground"}>{status}</Badge>;
};

export default function Treasury() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Treasury Execution</h1>
        <p className="text-muted-foreground mt-2">
          Fund release workflow and execution tracking
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6 border-l-4 border-l-green-500 bg-gradient-to-br from-green-500/5 to-transparent">
          <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400 mb-2">
            <CheckCircle className="h-5 w-5" />
            Ready for Release
          </div>
          <div className="text-3xl font-bold">$2.5M</div>
          <p className="text-sm text-muted-foreground mt-1">1 disbursement pending</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-500/5 to-transparent">
          <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400 mb-2">
            <Clock className="h-5 w-5" />
            Pending Verification
          </div>
          <div className="text-3xl font-bold">$1.8M</div>
          <p className="text-sm text-muted-foreground mt-1">Under review</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-500/5 to-transparent">
          <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400 mb-2">
            <DollarSign className="h-5 w-5" />
            Released This Month
          </div>
          <div className="text-3xl font-bold">$950K</div>
          <p className="text-sm text-muted-foreground mt-1">1 completed</p>
        </Card>
      </div>

      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Fund Release Queue</h2>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Release ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Scheduled Date</TableHead>
              <TableHead>Treasury Status</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fundReleases.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.client}</TableCell>
                <TableCell className="font-semibold">{item.amount}</TableCell>
                <TableCell>{item.account}</TableCell>
                <TableCell>{item.scheduleDate}</TableCell>
                <TableCell>{item.treasury}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {item.status === "Approved" && (
                      <Button size="sm">Release Funds</Button>
                    )}
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
