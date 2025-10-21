import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";

const disbursements = [
  {
    id: "DISB-001",
    client: "Tech Innovations Ltd",
    amount: "$2,500,000",
    requestDate: "2024-01-15",
    approver: "John Smith",
    status: "Approved",
    stage: "Final Approval",
  },
  {
    id: "DISB-002",
    client: "Green Energy Corp",
    amount: "$1,800,000",
    requestDate: "2024-01-16",
    approver: "Sarah Johnson",
    status: "In Progress",
    stage: "Treasury Review",
  },
  {
    id: "DISB-003",
    client: "Medical Solutions Inc",
    amount: "$3,200,000",
    requestDate: "2024-01-17",
    approver: "Pending",
    status: "In Progress",
    stage: "Legal Review",
  },
  {
    id: "DISB-004",
    client: "Retail Ventures LLC",
    amount: "$950,000",
    requestDate: "2024-01-14",
    approver: "Mike Chen",
    status: "Completed",
    stage: "Disbursed",
  },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, { className: string, icon: any }> = {
    "Approved": { className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20", icon: CheckCircle },
    "In Progress": { className: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20", icon: Clock },
    "Completed": { className: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20", icon: CheckCircle },
  };
  
  const config = variants[status] || { className: "bg-muted text-muted-foreground border-muted", icon: AlertCircle };
  const Icon = config.icon;
  
  return (
    <Badge className={`gap-1 ${config.className}`}>
      <Icon className="h-3 w-3" />
      {status}
    </Badge>
  );
};

export default function Process() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Disbursement Process</h1>
        <p className="text-muted-foreground mt-2">
          Track disbursement approvals and processing stages
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6 border-l-4 border-l-green-500">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Approved
          </div>
          <div className="text-3xl font-bold">1</div>
          <p className="text-sm text-muted-foreground mt-1">$2.5M ready</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-amber-500">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Clock className="h-4 w-4 text-amber-600" />
            In Progress
          </div>
          <div className="text-3xl font-bold">2</div>
          <p className="text-sm text-muted-foreground mt-1">$5.0M pending</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            Completed
          </div>
          <div className="text-3xl font-bold">1</div>
          <p className="text-sm text-muted-foreground mt-1">$950K released</p>
        </Card>
      </div>

      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Disbursement Requests</h2>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Current Stage</TableHead>
              <TableHead>Approver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disbursements.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.client}</TableCell>
                <TableCell className="font-semibold">{item.amount}</TableCell>
                <TableCell>{item.requestDate}</TableCell>
                <TableCell>{item.stage}</TableCell>
                <TableCell>{item.approver}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
