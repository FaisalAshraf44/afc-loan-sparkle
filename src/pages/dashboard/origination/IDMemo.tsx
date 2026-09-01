import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FileText, Save, Send, Download, Target } from "lucide-react";
import ImpactAnnex from "@/components/ImpactAnnex";

const IDMemo = () => {
  const { toast } = useToast();

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Identification Memo
        </h1>
        <p className="text-muted-foreground">
          Draft and review Identification Memo for investment opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Memo List Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Recent Memos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg border border-border cursor-pointer hover:bg-accent transition-colors">
              <div className="flex items-start justify-between mb-1">
                <p className="font-medium text-sm">TechVenture Inc</p>
                <Badge variant="warning" className="text-xs">Draft</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Updated 2 hours ago</p>
            </div>
            <div className="p-3 rounded-lg border border-border cursor-pointer hover:bg-accent transition-colors">
              <div className="flex items-start justify-between mb-1">
                <p className="font-medium text-sm">GreenEnergy Sol.</p>
                <Badge variant="success" className="text-xs">Approved</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Updated yesterday</p>
            </div>
            <div className="p-3 rounded-lg border border-border cursor-pointer hover:bg-accent transition-colors">
              <div className="flex items-start justify-between mb-1">
                <p className="font-medium text-sm">Healthcare Plus</p>
                <Badge variant="secondary" className="text-xs">Review</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Updated 3 days ago</p>
            </div>
          </CardContent>
        </Card>

        {/* Main Memo Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Draft ID Memo</CardTitle>
              </div>
              <Badge variant="warning">Draft</Badge>
            </div>
            <CardDescription>Complete the identification memo details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" placeholder="Enter company name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dealSize">Deal Size</Label>
                  <Input id="dealSize" type="number" placeholder="$0.00" />
                </div>
                <div>
                  <Label htmlFor="sector">Sector</Label>
                  <Input id="sector" placeholder="e.g., Technology" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Executive Summary */}
            <div>
              <Label htmlFor="executiveSummary">Executive Summary</Label>
              <Textarea
                id="executiveSummary"
                placeholder="Provide a brief overview of the investment opportunity..."
                rows={4}
              />
            </div>

            <Separator />

            {/* Business Overview */}
            <div>
              <Label htmlFor="businessOverview">Business Overview</Label>
              <Textarea
                id="businessOverview"
                placeholder="Describe the company's business model, operations, and market position..."
                rows={4}
              />
            </div>

            <Separator />

            {/* Investment Rationale */}
            <div>
              <Label htmlFor="investmentRationale">Investment Rationale</Label>
              <Textarea
                id="investmentRationale"
                placeholder="Explain why this is an attractive investment opportunity..."
                rows={4}
              />
            </div>

            <Separator />

            {/* Key Risks */}
            <div>
              <Label htmlFor="keyRisks">Key Risks</Label>
              <Textarea
                id="keyRisks"
                placeholder="Identify and describe potential risks associated with this investment..."
                rows={4}
              />
            </div>

            <Separator />

            {/* Financial Highlights */}
            <div>
              <Label htmlFor="financialHighlights">Financial Highlights</Label>
              <Textarea
                id="financialHighlights"
                placeholder="Summarize key financial metrics and projections..."
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button className="flex-1" onClick={() => {
                toast({
                  title: "ID Memo Submitted",
                  description: "The ID Memo has been submitted and the Divisional Head has been notified.",
                });
              }}>
                <Send className="h-4 w-4 mr-2" />
                Submit for Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preliminary Impact Radar */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle>Preliminary Impact Radar</CardTitle>
          </div>
          <CardDescription>
            The Impact Annex starts at the ID Memo and is refined at EIM, FIM and BRIC.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImpactAnnex variant="preliminary" />
        </CardContent>
      </Card>
    </div>
  );
};

export default IDMemo;
