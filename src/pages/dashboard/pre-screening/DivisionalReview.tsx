import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const reviews = [
  {
    id: 1,
    company: "Tech Solutions Ltd",
    reviewer: "Head of Technology",
    status: "approved",
    feedback: "Strong technical foundation and experienced team. Recommend proceeding.",
    date: "2024-01-15",
  },
  {
    id: 2,
    company: "Green Energy Corp",
    reviewer: "Head of Sustainability",
    status: "pending",
    feedback: "Awaiting additional environmental impact assessment data.",
    date: "2024-01-14",
  },
  {
    id: 3,
    company: "Manufacturing Inc",
    reviewer: "Head of Operations",
    status: "stepped-down",
    feedback: "Operational risks too high given current market conditions.",
    date: "2024-01-13",
  },
  {
    id: 4,
    company: "FinTech Innovations",
    reviewer: "Head of Finance",
    status: "approved",
    feedback: "Financial metrics exceed minimum requirements. Strong approval.",
    date: "2024-01-12",
  },
  {
    id: 5,
    company: "Retail Chain Co",
    reviewer: "Head of Retail",
    status: "pending",
    feedback: "Requesting clarification on expansion strategy.",
    date: "2024-01-11",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved": return "success";
    case "pending": return "warning";
    case "stepped-down": return "destructive";
    default: return "default";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved": return <ThumbsUp className="h-4 w-4" />;
    case "pending": return <AlertCircle className="h-4 w-4" />;
    case "stepped-down": return <ThumbsDown className="h-4 w-4" />;
    default: return null;
  }
};

const DivisionalReview = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Divisional Review</h2>
        <p className="text-muted-foreground">Divisional head feedback list</p>
      </div>

      <div className="mb-4 flex gap-2">
        <Button variant="outline" size="sm">All ({reviews.length})</Button>
        <Button variant="outline" size="sm">
          Approved ({reviews.filter(r => r.status === "approved").length})
        </Button>
        <Button variant="outline" size="sm">
          Pending ({reviews.filter(r => r.status === "pending").length})
        </Button>
        <Button variant="outline" size="sm">
          Stepped Down ({reviews.filter(r => r.status === "stepped-down").length})
        </Button>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{review.company}</h3>
                  <Badge variant={getStatusColor(review.status)} className="flex items-center gap-1">
                    {getStatusIcon(review.status)}
                    {review.status === "stepped-down" ? "Stepped Down" : review.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Reviewed by <span className="font-medium">{review.reviewer}</span> • {review.date}
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{review.company}</DialogTitle>
                    <DialogDescription>
                      Review by {review.reviewer}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Status</label>
                      <Badge variant={getStatusColor(review.status)}>
                        {review.status === "stepped-down" ? "Stepped Down" : review.status}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Feedback</label>
                      <p className="text-sm">{review.feedback}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Add Response</label>
                      <Textarea placeholder="Type your response..." className="min-h-[100px]" />
                      <Button className="mt-2" size="sm">Submit Response</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-sm">{review.feedback}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DivisionalReview;
