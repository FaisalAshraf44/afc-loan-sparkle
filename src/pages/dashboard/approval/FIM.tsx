import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Download, Save } from "lucide-react";

const FIM = () => {
  const [memo, setMemo] = useState({
    dealName: "Tech Corp Acquisition",
    executiveSummary: "",
    financialAnalysis: "",
    riskAssessment: "",
    recommendations: "",
  });

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">FIM Preparation</h2>
          <p className="text-muted-foreground">Create Final Investment Memo</p>
        </div>
        <Badge variant="outline" className="text-sm">
          Draft
        </Badge>
      </div>

      <div className="grid gap-6">
        {/* Deal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Deal Information
            </CardTitle>
            <CardDescription>Basic details about the investment opportunity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="dealName">Deal Name</Label>
              <Input
                id="dealName"
                value={memo.dealName}
                onChange={(e) => setMemo({ ...memo, dealName: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Executive Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
            <CardDescription>High-level overview of the investment opportunity</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Provide a concise executive summary..."
              value={memo.executiveSummary}
              onChange={(e) => setMemo({ ...memo, executiveSummary: e.target.value })}
              rows={6}
            />
          </CardContent>
        </Card>

        {/* Financial Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Analysis</CardTitle>
            <CardDescription>Detailed financial projections and analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Include revenue projections, EBITDA, ROI calculations..."
              value={memo.financialAnalysis}
              onChange={(e) => setMemo({ ...memo, financialAnalysis: e.target.value })}
              rows={6}
            />
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>Key risks and mitigation strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Detail key risks and proposed mitigation strategies..."
              value={memo.riskAssessment}
              onChange={(e) => setMemo({ ...memo, riskAssessment: e.target.value })}
              rows={6}
            />
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Final recommendations for the investment committee</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Provide your recommendations..."
              value={memo.recommendations}
              onChange={(e) => setMemo({ ...memo, recommendations: e.target.value })}
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Supporting Docs
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export as PDF
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button>Submit for Review</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FIM;
