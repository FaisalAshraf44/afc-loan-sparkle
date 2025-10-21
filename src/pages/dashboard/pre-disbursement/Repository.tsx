import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Download, Eye, Search, FolderOpen } from "lucide-react";
import { useState } from "react";

const Repository = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Credit Agreement.pdf",
      category: "Legal",
      uploadedBy: "John Smith",
      date: "2025-10-15",
      size: "2.4 MB",
      status: "verified"
    },
    {
      id: 2,
      name: "Security Documents.pdf",
      category: "Legal",
      uploadedBy: "Sarah Johnson",
      date: "2025-10-18",
      size: "1.8 MB",
      status: "pending"
    },
    {
      id: 3,
      name: "Insurance Policy.pdf",
      category: "Insurance",
      uploadedBy: "Mike Davis",
      date: "2025-10-20",
      size: "3.2 MB",
      status: "verified"
    },
    {
      id: 4,
      name: "Environmental Clearance.pdf",
      category: "Regulatory",
      uploadedBy: "Emily Brown",
      date: "2025-10-22",
      size: "5.1 MB",
      status: "verified"
    },
    {
      id: 5,
      name: "Valuation Report.pdf",
      category: "Financial",
      uploadedBy: "Robert Wilson",
      date: "2025-10-23",
      size: "4.7 MB",
      status: "pending"
    },
    {
      id: 6,
      name: "Board Resolution.pdf",
      category: "Corporate",
      uploadedBy: "John Smith",
      date: "2025-10-10",
      size: "0.8 MB",
      status: "verified"
    },
  ]);

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === "verified" ? (
      <Badge variant="default">Verified</Badge>
    ) : (
      <Badge variant="secondary">Pending Review</Badge>
    );
  };

  const categories = [...new Set(documents.map(d => d.category))];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Document Repository</h2>
        <p className="text-muted-foreground">Upload and manage key documents</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter(d => d.status === "verified").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter(d => d.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Upload */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>
                Add a new document to the repository
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="doc-name">Document Name</Label>
                <Input id="doc-name" placeholder="e.g., Credit Agreement" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc-category">Category</Label>
                <Select>
                  <SelectTrigger id="doc-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="regulatory">Regulatory</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc-file">File</Label>
                <Input id="doc-file" type="file" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Upload</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Documents by Category */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryDocs = filteredDocuments.filter(d => d.category === category);
          
          if (categoryDocs.length === 0) return null;

          return (
            <Card key={category}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5" />
                  <CardTitle>{category}</CardTitle>
                  <Badge variant="secondary">{categoryDocs.length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Uploaded by {doc.uploadedBy} • {doc.date} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(doc.status)}
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Repository;
