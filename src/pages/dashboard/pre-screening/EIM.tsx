import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Upload } from "lucide-react";

const eimDrafts = [
  { id: 1, company: "Tech Solutions Ltd", status: "approved", updatedAt: "2024-01-15" },
  { id: 2, company: "Green Energy Corp", status: "pending", updatedAt: "2024-01-14" },
  { id: 3, company: "Manufacturing Inc", status: "stepped-down", updatedAt: "2024-01-13" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved": return "success";
    case "pending": return "warning";
    case "stepped-down": return "destructive";
    default: return "default";
  }
};

const EIM = () => {
  const [selectedDraft, setSelectedDraft] = useState(eimDrafts[0]);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">EIM Drafting</h2>
        <p className="text-muted-foreground">Template-based EIM document editor</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar List */}
        <div className="col-span-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Drafts</h3>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-2" />
                New EIM
              </Button>
            </div>
            <div className="space-y-2">
              {eimDrafts.map((draft) => (
                <Card
                  key={draft.id}
                  className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
                    selectedDraft.id === draft.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedDraft(draft)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{draft.company}</p>
                      <p className="text-xs text-muted-foreground">{draft.updatedAt}</p>
                    </div>
                    <Badge variant={getStatusColor(draft.status)}>
                      {draft.status === "stepped-down" ? "Stepped Down" : draft.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{selectedDraft.company}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm">Save Draft</Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Executive Summary</label>
                  <Textarea
                    placeholder="Enter executive summary..."
                    className="min-h-[120px]"
                    defaultValue="This investment opportunity presents a compelling case for..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Investment Rationale</label>
                  <Textarea
                    placeholder="Enter investment rationale..."
                    className="min-h-[120px]"
                    defaultValue="Strategic fit with portfolio objectives..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Key Risks</label>
                  <Textarea
                    placeholder="Enter key risks..."
                    className="min-h-[120px]"
                    defaultValue="Market volatility, regulatory changes..."
                  />
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Upload Documents
                  </Button>
                </div>
                <div className="space-y-2">
                  <Card className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">Financial_Statements_2023.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </Card>
                  <Card className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">Business_Plan.docx</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="space-y-4">
                <div>
                  <Textarea
                    placeholder="Add a comment..."
                    className="min-h-[100px]"
                  />
                  <Button className="mt-2" size="sm">
                    Post Comment
                  </Button>
                </div>
                <div className="space-y-3">
                  <Card className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium">JD</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">John Doe</span>
                          <span className="text-xs text-muted-foreground">2 hours ago</span>
                        </div>
                        <p className="text-sm">
                          The financial projections look solid. Recommend approval pending legal review.
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium">SM</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">Sarah Miller</span>
                          <span className="text-xs text-muted-foreground">1 day ago</span>
                        </div>
                        <p className="text-sm">
                          Need clarification on the market analysis section.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EIM;
