import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, TrendingUp, AlertTriangle } from "lucide-react";

const portfolioProjects = [
  {
    id: "PROJ-001",
    client: "Tech Innovations Ltd",
    sector: "Technology",
    disbursedAmount: "$2,500,000",
    disbursedDate: "2024-01-14",
    maturityDate: "2026-01-14",
    performance: "On Track",
    healthScore: 95,
  },
  {
    id: "PROJ-002",
    client: "Green Energy Corp",
    sector: "Energy",
    disbursedAmount: "$1,800,000",
    disbursedDate: "2023-11-20",
    maturityDate: "2025-11-20",
    performance: "On Track",
    healthScore: 88,
  },
  {
    id: "PROJ-003",
    client: "Retail Ventures LLC",
    sector: "Retail",
    disbursedAmount: "$950,000",
    disbursedDate: "2024-01-10",
    maturityDate: "2025-07-10",
    performance: "Needs Attention",
    healthScore: 72,
  },
  {
    id: "PROJ-004",
    client: "Medical Solutions Inc",
    sector: "Healthcare",
    disbursedAmount: "$3,200,000",
    disbursedDate: "2023-09-15",
    maturityDate: "2026-09-15",
    performance: "On Track",
    healthScore: 92,
  },
];

const getPerformanceBadge = (performance: string) => {
  const variants: Record<string, "default" | "secondary" | "destructive"> = {
    "On Track": "default",
    "Needs Attention": "secondary",
    "At Risk": "destructive",
  };
  
  return <Badge variant={variants[performance] || "outline"}>{performance}</Badge>;
};

const getHealthScoreColor = (score: number) => {
  if (score >= 85) return "text-success";
  if (score >= 70) return "text-warning";
  return "text-destructive";
};

export default function Portfolio() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Portfolio Management</h1>
        <p className="text-muted-foreground mt-2">
          Post-disbursement project tracking and monitoring
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Activity className="h-4 w-4" />
            Active Projects
          </div>
          <div className="text-2xl font-bold">4</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <TrendingUp className="h-4 w-4" />
            Total Disbursed
          </div>
          <div className="text-2xl font-bold">$8.45M</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Activity className="h-4 w-4" />
            Avg Health Score
          </div>
          <div className="text-2xl font-bold">86.8</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <AlertTriangle className="h-4 w-4" />
            Needs Attention
          </div>
          <div className="text-2xl font-bold">1</div>
        </Card>
      </div>

      <Card>
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Portfolio Overview</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Disbursed Amount</TableHead>
              <TableHead>Disbursement Date</TableHead>
              <TableHead>Maturity Date</TableHead>
              <TableHead>Health Score</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolioProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.id}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>{project.sector}</TableCell>
                <TableCell className="font-semibold">{project.disbursedAmount}</TableCell>
                <TableCell>{project.disbursedDate}</TableCell>
                <TableCell>{project.maturityDate}</TableCell>
                <TableCell>
                  <span className={`font-semibold ${getHealthScoreColor(project.healthScore)}`}>
                    {project.healthScore}
                  </span>
                </TableCell>
                <TableCell>{getPerformanceBadge(project.performance)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Monitor</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
