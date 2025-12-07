import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, TrendingUp, TrendingDown, Minus, FileText, Send, Clock, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ReportStage = "EIM" | "FIM" | "BRIC";

const assessments = [
  { id: 1, company: "Tech Solutions Ltd", riskLevel: "low", score: 85, status: "approved", stage: "FIM" as ReportStage, dueDate: "2024-01-20" },
  { id: 2, company: "Green Energy Corp", riskLevel: "medium", score: 65, status: "pending", stage: "EIM" as ReportStage, dueDate: "2024-01-19" },
  { id: 3, company: "Manufacturing Inc", riskLevel: "high", score: 35, status: "stepped-down", stage: "BRIC" as ReportStage, dueDate: "2024-01-18" },
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

const getStageBadge = (stage: ReportStage) => {
  const colors: Record<ReportStage, string> = {
    "EIM": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "FIM": "bg-purple-500/10 text-purple-500 border-purple-500/20",
    "BRIC": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  };
  return (
    <Badge variant="outline" className={colors[stage]}>
      {stage} Stage
    </Badge>
  );
};

const RiskAssessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState(assessments[0]);
  const [selectedRisk, setSelectedRisk] = useState("medium");
  const [riskRating, setRiskRating] = useState(5);
  const { toast } = useToast();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Risk Assessment Reports</h2>
        <p className="text-muted-foreground">Prepare risk assessments for EIM, FIM, and BRIC stages</p>
      </div>

      {/* Stage Info */}
      <Card className="mb-6 p-4 bg-muted/30">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-sm">Risk Assessment Timeline Requirements</p>
            <p className="text-xs text-muted-foreground mt-1">
              Risk Assessment Reports must be submitted to Corporate Secretariat <strong>at least 1 day before</strong> the respective committee meeting. 
              The deal team should respond to risk issues online prior to the meeting.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar List */}
        <div className="col-span-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Pending Assessments</h3>
            <Tabs defaultValue="all" className="mb-4">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="eim" className="text-xs">EIM</TabsTrigger>
                <TabsTrigger value="fim" className="text-xs">FIM</TabsTrigger>
                <TabsTrigger value="bric" className="text-xs">BRIC</TabsTrigger>
              </TabsList>
            </Tabs>
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
                      {getStageBadge(assessment.stage)}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant={getRiskColor(assessment.riskLevel)} className="flex items-center gap-1">
                        {getRiskIcon(assessment.riskLevel)}
                        {assessment.riskLevel}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Due: {assessment.dueDate}
                      </div>
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
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold">{selectedAssessment.company}</h3>
                  {getStageBadge(selectedAssessment.stage)}
                </div>
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
                  title: `${selectedAssessment.stage} Risk Report Submitted`,
                  description: "The Risk Report has been submitted and the Secretariat and Transaction Team have been notified.",
                });
              }}>
                <Send className="h-4 w-4 mr-2" />
                Submit Report
              </Button>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">{selectedAssessment.stage} Risk Assessment Report</p>
                  <p className="text-xs text-muted-foreground">
                    This report will be circulated to the {selectedAssessment.stage === "EIM" ? "Sub-Investment Committee" : 
                    selectedAssessment.stage === "FIM" ? "Investment Committee (InvestCo)" : "Board Risk and Investment Committee (BRIC)"} members.
                  </p>
                </div>
              </div>

              {/* Risk Rating Scale 1-10 */}
              <div>
                <Label className="text-base mb-3 block">Risk Rating (1-10 Scale)</Label>
                <p className="text-xs text-muted-foreground mb-3">
                  1 = Excellent, 10 = Expected Loss
                </p>
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <Button
                      key={num}
                      variant={riskRating === num ? "default" : "outline"}
                      size="sm"
                      className={`w-10 h-10 ${
                        num <= 3 ? "hover:bg-green-500/20" : 
                        num <= 6 ? "hover:bg-yellow-500/20" : 
                        "hover:bg-red-500/20"
                      }`}
                      onClick={() => setRiskRating(num)}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="text-green-500">Low Risk</span>
                  <span className="text-yellow-500">Medium Risk</span>
                  <span className="text-red-500">High Risk</span>
                </div>
              </div>

              <div>
                <Label className="text-base mb-3 block">Overall Risk Classification</Label>
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
                <Label className="text-base mb-2 block">Risk Issues for Deal Team Response</Label>
                <Textarea
                  placeholder="List risk issues that require deal team clarification before the meeting..."
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
