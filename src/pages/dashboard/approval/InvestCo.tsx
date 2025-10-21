import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

const InvestCo = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      dealName: "Tech Corp Acquisition",
      reviewer: "John Smith",
      role: "Investment Committee Chair",
      status: "pending",
      dueDate: "2025-11-02",
      comments: "",
    },
    {
      id: 2,
      dealName: "Green Energy Project",
      reviewer: "Sarah Johnson",
      role: "Risk Manager",
      status: "approved",
      dueDate: "2025-10-28",
      comments: "Strong fundamentals, recommend approval",
    },
    {
      id: 3,
      dealName: "Real Estate Development",
      reviewer: "Michael Chen",
      role: "Finance Director",
      status: "pending",
      dueDate: "2025-11-05",
      comments: "",
    },
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock, label: "Pending" },
      approved: { variant: "default" as const, icon: CheckCircle, label: "Approved" },
      rejected: { variant: "destructive" as const, icon: XCircle, label: "Rejected" },
    };
    const config = variants[status as keyof typeof variants];
    const Icon = config.icon;
    return (
      <Badge variant={config.variant}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">InvestCo Review</h2>
          <p className="text-muted-foreground">Committee workflow and decision tracking</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Committee Members */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Committee Members
          </CardTitle>
          <CardDescription>Current investment committee composition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["John Smith (Chair)", "Sarah Johnson (Risk)", "Michael Chen (Finance)", "Emily Davis (Legal)", "David Wilson (Operations)"].map((member, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 border rounded-lg">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{member.split(" (")[0]}</p>
                  <p className="text-xs text-muted-foreground">{member.match(/\((.*?)\)/)?.[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Reviews */}
      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{review.dealName}</CardTitle>
                  <CardDescription>
                    Reviewer: {review.reviewer} ({review.role})
                  </CardDescription>
                </div>
                {getStatusBadge(review.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Due: {review.dueDate}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{review.dealName}</DialogTitle>
                      <DialogDescription>
                        Committee review for {review.reviewer}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Reviewer Comments</Label>
                        <Textarea
                          placeholder="Add your review comments..."
                          value={review.comments}
                          rows={6}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InvestCo;
