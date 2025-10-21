import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, User, Calendar } from "lucide-react";

export type LoanStatus = "pending" | "under_review" | "approved" | "rejected";

interface LoanCardProps {
  id: string;
  applicantName: string;
  amount: number;
  status: LoanStatus;
  appliedDate: string;
  loanType: string;
}

const statusConfig = {
  pending: {
    label: "Pending Review",
    variant: "warning" as const,
  },
  under_review: {
    label: "Under Review",
    variant: "default" as const,
  },
  approved: {
    label: "Approved",
    variant: "success" as const,
  },
  rejected: {
    label: "Rejected",
    variant: "destructive" as const,
  },
};

export const LoanCard = ({
  id,
  applicantName,
  amount,
  status,
  appliedDate,
  loanType,
}: LoanCardProps) => {
  const config = statusConfig[status];

  return (
    <Card className="p-6 hover:shadow-elevated transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{applicantName}</h3>
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{loanType}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">
            ${amount.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>ID: {id}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{appliedDate}</span>
        </div>
      </div>

      <Button variant="outline" className="w-full group">
        View Details
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Card>
  );
};
