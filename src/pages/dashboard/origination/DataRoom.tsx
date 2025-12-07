import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Plus, 
  Folder, 
  FileText, 
  Download, 
  ExternalLink, 
  Lock, 
  Clock, 
  CheckCircle,
  File,
  FileSpreadsheet,
  Image
} from "lucide-react";

interface DataRoomAccess {
  id: string;
  projectName: string;
  clientName: string;
  accessUrl: string;
  accessGrantedDate: string;
  status: "active" | "pending" | "expired";
  documentsCount: number;
  lastAccessed?: string;
  expiryDate?: string;
}

interface Document {
  id: string;
  name: string;
  type: "pdf" | "excel" | "word" | "image" | "other";
  size: string;
  uploadedDate: string;
  category: string;
}

const mockDataRooms: DataRoomAccess[] = [
  {
    id: "1",
    projectName: "Series B Expansion",
    clientName: "TechVenture Inc",
    accessUrl: "https://dataroom.example.com/techventure",
    accessGrantedDate: "2024-01-15",
    status: "active",
    documentsCount: 45,
    lastAccessed: "2024-01-18",
    expiryDate: "2024-04-15"
  },
  {
    id: "2",
    projectName: "Solar Farm Development",
    clientName: "GreenEnergy Solutions",
    accessUrl: "https://dataroom.example.com/greenenergy",
    accessGrantedDate: "2024-01-14",
    status: "active",
    documentsCount: 78,
    lastAccessed: "2024-01-17",
    expiryDate: "2024-04-14"
  },
  {
    id: "3",
    projectName: "Hospital Network Expansion",
    clientName: "Healthcare Plus",
    accessUrl: "https://dataroom.example.com/healthcare",
    accessGrantedDate: "2024-01-10",
    status: "pending",
    documentsCount: 0,
    expiryDate: "2024-04-10"
  }
];

const mockDocuments: Document[] = [
  { id: "1", name: "Financial Model FY2023.xlsx", type: "excel", size: "2.4 MB", uploadedDate: "2024-01-15", category: "Financial" },
  { id: "2", name: "Business Plan.pdf", type: "pdf", size: "5.1 MB", uploadedDate: "2024-01-15", category: "Business" },
  { id: "3", name: "Legal Structure.pdf", type: "pdf", size: "1.2 MB", uploadedDate: "2024-01-14", category: "Legal" },
  { id: "4", name: "Market Analysis Report.pdf", type: "pdf", size: "3.8 MB", uploadedDate: "2024-01-14", category: "Market" },
  { id: "5", name: "Cap Table.xlsx", type: "excel", size: "890 KB", uploadedDate: "2024-01-13", category: "Financial" },
  { id: "6", name: "Project Photos.zip", type: "image", size: "15.2 MB", uploadedDate: "2024-01-12", category: "Assets" },
];

const DataRoom = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<DataRoomAccess | null>(null);
  const [isNewAccessOpen, setIsNewAccessOpen] = useState(false);
  const { toast } = useToast();

  const getStatusColor = (status: DataRoomAccess["status"]) => {
    switch (status) {
      case "active": return "success";
      case "pending": return "warning";
      case "expired": return "destructive";
    }
  };

  const getFileIcon = (type: Document["type"]) => {
    switch (type) {
      case "pdf": return <FileText className="h-5 w-5 text-red-500" />;
      case "excel": return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
      case "word": return <FileText className="h-5 w-5 text-blue-500" />;
      case "image": return <Image className="h-5 w-5 text-purple-500" />;
      default: return <File className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const filteredDataRooms = mockDataRooms.filter(room =>
    room.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Data Room Access
        </h1>
        <p className="text-muted-foreground">
          Manage access to client project data rooms and preliminary documents
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{mockDataRooms.length}</div>
            <p className="text-xs text-muted-foreground">Total Data Rooms</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-500">
              {mockDataRooms.filter(r => r.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Active Access</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-500">
              {mockDataRooms.filter(r => r.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Pending Access</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search data rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isNewAccessOpen} onOpenChange={setIsNewAccessOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Request Access
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Data Room Access</DialogTitle>
              <DialogDescription>Request access to a client's project data room</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Project Name</Label>
                <Input placeholder="Enter project name" />
              </div>
              <div>
                <Label>Client Name</Label>
                <Input placeholder="Enter client name" />
              </div>
              <div>
                <Label>Data Room URL</Label>
                <Input placeholder="https://dataroom.example.com/..." />
              </div>
              <div>
                <Label>Access Request Notes</Label>
                <Input placeholder="Any special access requirements..." />
              </div>
              <Button className="w-full" onClick={() => {
                setIsNewAccessOpen(false);
                toast({
                  title: "Access Requested",
                  description: "Data room access request has been sent to the client.",
                });
              }}>
                Request Access
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Room List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-semibold text-lg">Project Data Rooms</h3>
          {filteredDataRooms.map((room) => (
            <Card 
              key={room.id} 
              className={`cursor-pointer hover:shadow-lg transition-shadow ${selectedRoom?.id === room.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedRoom(room)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Folder className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">{room.projectName}</CardTitle>
                  </div>
                  <Badge variant={getStatusColor(room.status)}>
                    {room.status}
                  </Badge>
                </div>
                <CardDescription>{room.clientName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Documents:</span>
                    <span className="font-medium">{room.documentsCount}</span>
                  </div>
                  {room.lastAccessed && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Last accessed: {new Date(room.lastAccessed).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Document Viewer */}
        <div className="lg:col-span-2">
          {selectedRoom ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedRoom.projectName}</CardTitle>
                    <CardDescription>{selectedRoom.clientName} - Data Room Documents</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      window.open(selectedRoom.accessUrl, '_blank');
                    }}>
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Open Data Room
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedRoom.status === "active" ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>Showing {mockDocuments.length} documents</span>
                      <span>Access expires: {selectedRoom.expiryDate ? new Date(selectedRoom.expiryDate).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    {mockDocuments.map((doc) => (
                      <div 
                        key={doc.id} 
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {getFileIcon(doc.type)}
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {doc.category} • {doc.size} • {new Date(doc.uploadedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h4 className="font-medium mb-2">Access Pending</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Waiting for client to grant data room access
                    </p>
                    <Button variant="outline" onClick={() => {
                      toast({
                        title: "Reminder Sent",
                        description: "A reminder has been sent to the client.",
                      });
                    }}>
                      Send Reminder
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Folder className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h4 className="font-medium mb-2">Select a Data Room</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose a project data room from the list to view documents
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataRoom;
