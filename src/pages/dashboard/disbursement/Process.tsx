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
  const variants: Record<string, { variant: "default" | "secondary" | "outline" | "destructive", icon: any }> = {
    "Approved": { variant: "default", icon: CheckCircle },
    "In Progress": { variant: "secondary", icon: Clock },
    "Completed": { variant: "outline", icon: CheckCircle },
  };
  
  const config = variants[status] || { variant: "outline" as const, icon: AlertCircle };
  const Icon = config.icon;
  
  return (
    <Badge variant={config.variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {status}
    </Badge>
  );
};

export default function Process() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Disbursement Process</h1>
        <p className="text-muted-foreground mt-2">
          Track disbursement approvals and processing stages
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <CheckCircle className="h-4 w-4" />
            Approved
          </div>
          <div className="text-2xl font-bold">1</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Clock className="h-4 w-4" />
            In Progress
          </div>
          <div className="text-2xl font-bold">2</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <CheckCircle className="h-4 w-4" />
            Completed
          </div>
          <div className="text-2xl font-bold">1</div>
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
