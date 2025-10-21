import { StatsCard } from "@/components/StatsCard";
import { LoanCard, LoanStatus } from "@/components/LoanCard";
import { WorkflowStages } from "@/components/WorkflowStages";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, DollarSign, CheckCircle, Clock } from "lucide-react";

const mockLoans = [
  {
    id: "LN-2024-001",
    applicantName: "Sarah Johnson",
    amount: 250000,
    status: "approved" as LoanStatus,
    appliedDate: "2024-01-15",
    loanType: "Home Mortgage",
  },
  {
    id: "LN-2024-002",
    applicantName: "Michael Chen",
    amount: 45000,
    status: "under_review" as LoanStatus,
    appliedDate: "2024-01-18",
    loanType: "Auto Loan",
  },
  {
    id: "LN-2024-003",
    applicantName: "Emily Rodriguez",
    amount: 15000,
    status: "pending" as LoanStatus,
    appliedDate: "2024-01-20",
    loanType: "Personal Loan",
  },
  {
    id: "LN-2024-004",
    applicantName: "David Kim",
    amount: 180000,
    status: "approved" as LoanStatus,
    appliedDate: "2024-01-12",
    loanType: "Business Loan",
  },
  {
    id: "LN-2024-005",
    applicantName: "Jessica Martinez",
    amount: 30000,
    status: "rejected" as LoanStatus,
    appliedDate: "2024-01-19",
    loanType: "Personal Loan",
  },
  {
    id: "LN-2024-006",
    applicantName: "Robert Taylor",
    amount: 95000,
    status: "under_review" as LoanStatus,
    appliedDate: "2024-01-21",
    loanType: "Home Equity",
  },
];

const Index = () => {
  const filterByStatus = (status?: LoanStatus) => {
    if (!status) return mockLoans;
    return mockLoans.filter((loan) => loan.status === status);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AFC Loan Workflow
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track loan applications efficiently
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Applications"
            value={mockLoans.length}
            icon={FileText}
            trend={{ value: "12% from last month", isPositive: true }}
          />
          <StatsCard
            title="Pending Review"
            value={filterByStatus("pending").length}
            icon={Clock}
          />
          <StatsCard
            title="Under Review"
            value={filterByStatus("under_review").length}
            icon={DollarSign}
          />
          <StatsCard
            title="Approved"
            value={filterByStatus("approved").length}
            icon={CheckCircle}
            trend={{ value: "8% approval rate", isPositive: true }}
          />
        </div>

        {/* Workflow Example */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Loan Processing Workflow</h2>
          <WorkflowStages currentStage={2} />
        </Card>

        {/* Loan Applications */}
        <Card className="p-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Applications</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="under_review">Under Review</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockLoans.map((loan) => (
                  <LoanCard key={loan.id} {...loan} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filterByStatus("pending").map((loan) => (
                  <LoanCard key={loan.id} {...loan} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="under_review">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filterByStatus("under_review").map((loan) => (
                  <LoanCard key={loan.id} {...loan} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="approved">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filterByStatus("approved").map((loan) => (
                  <LoanCard key={loan.id} {...loan} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rejected">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filterByStatus("rejected").map((loan) => (
                  <LoanCard key={loan.id} {...loan} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default Index;
