import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const assessments = [
  { id: 1, company: "Tech Solutions Ltd", riskLevel: "low", score: 85, status: "approved" },
  { id: 2, company: "Green Energy Corp", riskLevel: "medium", score: 65, status: "pending" },
  { id: 3, company: "Manufacturing Inc", riskLevel: "high", score: 35, status: "stepped-down" },
];

const getRiskColor = (level: string) => {
  switch (level) {
    case "low": return "success";
    case "medium": return "warning";
    case "high": return "destructive";
    default: return "default";
  }
};

const getRiskIcon = (level: string) => {
  switch (level) {
    case "low": return <TrendingUp className="h-4 w-4" />;
    case "medium": return <Minus className="h-4 w-4" />;
    case "high": return <TrendingDown className="h-4 w-4" />;
    default: return null;
  }
};

const RiskAssessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState(assessments[0]);
  const [selectedRisk, setSelectedRisk] = useState("medium");
  const { toast } = useToast();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Risk Assessment</h2>
        <p className="text-muted-foreground">Risk rating input and comments</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar List */}
        <div className="col-span-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Recent Assessments</h3>
            <div className="space-y-2">
              {assessments.map((assessment) => (
                <Card
                  key={assessment.id}
                  className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
                    selectedAssessment.id === assessment.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedAssessment(assessment)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{assessment.company}</p>
                      <Badge variant={getRiskColor(assessment.riskLevel)} className="flex items-center gap-1">
                        {getRiskIcon(assessment.riskLevel)}
                        {assessment.riskLevel}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Risk Score</span>
                        <span className="font-medium">{assessment.score}/100</span>
                      </div>
                      <Progress value={assessment.score} className="h-1" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">{selectedAssessment.company}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant={getRiskColor(selectedAssessment.riskLevel)}>
                    {selectedAssessment.riskLevel} risk
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Score: {selectedAssessment.score}/100
                  </span>
                </div>
              </div>
              <Button onClick={() => {
                toast({
                  title: "Risk Report Submitted",
                  description: "The Risk Report has been submitted and the Secretariat and Transaction Team have been notified.",
                });
              }}>Save Assessment</Button>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">Risk Assessment Guidelines</p>
                  <p className="text-xs text-muted-foreground">
                    Evaluate credit, market, operational, and compliance risks. Consider historical data, 
                    industry trends, and regulatory environment.
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-base mb-3 block">Overall Risk Rating</Label>
                <RadioGroup value={selectedRisk} onValueChange={setSelectedRisk}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:bg-accent">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Low Risk</span>
                          <Badge variant="success">Score: 70-100</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Minimal risk factors, strong financials, stable market position
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:bg-accent">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Medium Risk</span>
                          <Badge variant="warning">Score: 40-69</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Moderate concerns, acceptable with mitigation strategies
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:bg-accent">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">High Risk</span>
                          <Badge variant="destructive">Score: 0-39</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Significant risk factors, weak financials, unstable conditions
                        </p>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base mb-2 block">Credit Risk Analysis</Label>
                <Textarea
                  placeholder="Assess creditworthiness, debt levels, payment history..."
                  className="min-h-[100px]"
                  defaultValue="Strong credit history with consistent repayment record. Debt-to-equity ratio within acceptable range."
                />
              </div>

              <div>
                <Label className="text-base mb-2 block">Market Risk Analysis</Label>
                <Textarea
                  placeholder="Evaluate market volatility, competition, demand trends..."
                  className="min-h-[100px]"
                  defaultValue="Operates in stable market with moderate competition. Industry growth projections positive."
                />
              </div>

              <div>
                <Label className="text-base mb-2 block">Operational Risk Analysis</Label>
                <Textarea
                  placeholder="Review operational efficiency, management quality, process risks..."
                  className="min-h-[100px]"
                  defaultValue="Experienced management team. Well-established operational processes with minimal disruption history."
                />
              </div>

              <div>
                <Label className="text-base mb-2 block">Additional Comments</Label>
                <Textarea
                  placeholder="Add any additional risk considerations or observations..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
