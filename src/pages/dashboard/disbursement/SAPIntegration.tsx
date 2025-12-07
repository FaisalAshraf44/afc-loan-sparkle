import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Database, 
  RefreshCw, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Send,
  FileText,
  Shield,
  Activity,
  Server,
  Link2,
  Zap,
  History
} from "lucide-react";

const SAPIntegration = () => {
  const [selectedDeal, setSelectedDeal] = useState("");
  const [limitAmount, setLimitAmount] = useState("");
  const [limitCurrency, setLimitCurrency] = useState("USD");
  const [limitType, setLimitType] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [notes, setNotes] = useState("");

  // Mock data for pending requests
  const pendingRequests = [
    { id: "SAP-001", deal: "Project Alpha", type: "Credit Limit", amount: "$15,000,000", status: "pending", createdAt: "2024-01-15" },
    { id: "SAP-002", deal: "Project Beta", type: "Exposure Limit", amount: "$8,500,000", status: "pending", createdAt: "2024-01-14" },
    { id: "SAP-003", deal: "Project Gamma", type: "Country Limit", amount: "$25,000,000", status: "pending", createdAt: "2024-01-13" },
  ];

  // Mock data for completed requests
  const completedRequests = [
    { id: "SAP-098", deal: "Project Delta", type: "Credit Limit", amount: "$12,000,000", status: "completed", completedAt: "2024-01-12", sapRef: "SAP-REF-78901" },
    { id: "SAP-097", deal: "Project Epsilon", type: "Sector Limit", amount: "$5,000,000", status: "completed", completedAt: "2024-01-10", sapRef: "SAP-REF-78900" },
  ];

  // Mock system status
  const systemStatus = {
    connection: "disconnected",
    lastSync: "N/A",
    version: "Pending Setup",
    environment: "Development"
  };

  const handleCreateLimitRequest = () => {
    if (!selectedDeal || !limitAmount || !limitType) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Limit creation request queued for SAP sync", {
      description: "Request will be processed when SAP integration is active"
    });
    setSelectedDeal("");
    setLimitAmount("");
    setLimitType("");
    setExpiryDate("");
    setNotes("");
  };

  const handleTestConnection = () => {
    toast.info("SAP Connection Test", {
      description: "SAP integration is pending setup. Connection test will be available once configured."
    });
  };

  const handleSyncNow = () => {
    toast.info("Manual Sync Initiated", {
      description: "Sync will process when SAP integration is active."
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle2 className="h-3 w-3 mr-1" /> Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30"><XCircle className="h-3 w-3 mr-1" /> Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">SAP Integration</h1>
        <p className="text-muted-foreground mt-1">Manage risk limits and SAP system connectivity</p>
      </div>

      {/* Integration Status Banner */}
      <Card className="border-yellow-500/30 bg-yellow-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-yellow-500/20">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">SAP Integration Pending</h3>
              <p className="text-sm text-muted-foreground mt-1">
                SAP system integration is scheduled for a future development phase. 
                You can queue limit creation requests now, and they will be automatically 
                synced once the integration is active.
              </p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={handleTestConnection}>
                  <Link2 className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
                <Button variant="outline" size="sm" onClick={handleSyncNow}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Now
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20">
                <Server className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Connection</p>
                <p className="font-semibold text-red-400">Disconnected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <RefreshCw className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Sync</p>
                <p className="font-semibold text-foreground">{systemStatus.lastSync}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Zap className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Version</p>
                <p className="font-semibold text-foreground">{systemStatus.version}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Activity className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Environment</p>
                <p className="font-semibold text-foreground">{systemStatus.environment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">
            <Database className="h-4 w-4 mr-2" />
            Create Limit
          </TabsTrigger>
          <TabsTrigger value="pending">
            <Clock className="h-4 w-4 mr-2" />
            Pending Queue
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />
            Sync History
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Create Limit Request
              </CardTitle>
              <CardDescription>Queue a new limit creation request for SAP processing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Deal / Project *</Label>
                  <Select value={selectedDeal} onValueChange={setSelectedDeal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select deal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alpha">Project Alpha - TechCorp Industries</SelectItem>
                      <SelectItem value="beta">Project Beta - Global Manufacturing</SelectItem>
                      <SelectItem value="gamma">Project Gamma - Energy Solutions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Limit Type *</Label>
                  <Select value={limitType} onValueChange={setLimitType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select limit type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Credit Limit</SelectItem>
                      <SelectItem value="exposure">Exposure Limit</SelectItem>
                      <SelectItem value="country">Country Limit</SelectItem>
                      <SelectItem value="sector">Sector Limit</SelectItem>
                      <SelectItem value="tenor">Tenor Limit</SelectItem>
                      <SelectItem value="concentration">Concentration Limit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Limit Amount *</Label>
                  <div className="flex gap-2">
                    <Select value={limitCurrency} onValueChange={setLimitCurrency}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="NGN">NGN</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      type="number"
                      placeholder="Enter amount"
                      value={limitAmount}
                      onChange={(e) => setLimitAmount(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input 
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes / Justification</Label>
                <Textarea 
                  placeholder="Enter any additional notes or justification for this limit..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleCreateLimitRequest}>
                  <Send className="h-4 w-4 mr-2" />
                  Queue Limit Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending SAP Requests</CardTitle>
              <CardDescription>Limit requests awaiting SAP synchronization</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Deal</TableHead>
                    <TableHead>Limit Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-mono text-sm">{request.id}</TableCell>
                      <TableCell>{request.deal}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell className="font-semibold">{request.amount}</TableCell>
                      <TableCell>{request.createdAt}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sync History</CardTitle>
              <CardDescription>Completed SAP synchronization records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Deal</TableHead>
                    <TableHead>Limit Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>SAP Reference</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-mono text-sm">{request.id}</TableCell>
                      <TableCell>{request.deal}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell className="font-semibold">{request.amount}</TableCell>
                      <TableCell>{request.completedAt}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">{request.sapRef}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SAP Configuration</CardTitle>
              <CardDescription>Configure SAP system connection settings (for future integration)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SAP Server URL</Label>
                  <Input placeholder="https://sap.example.com" disabled />
                </div>
                <div className="space-y-2">
                  <Label>SAP Client ID</Label>
                  <Input placeholder="Enter client ID" disabled />
                </div>
                <div className="space-y-2">
                  <Label>System ID (SID)</Label>
                  <Input placeholder="PRD" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Instance Number</Label>
                  <Input placeholder="00" disabled />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Sync Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Auto-Sync Interval</Label>
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="Every 15 minutes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Every 5 minutes</SelectItem>
                        <SelectItem value="15">Every 15 minutes</SelectItem>
                        <SelectItem value="30">Every 30 minutes</SelectItem>
                        <SelectItem value="60">Every hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Retry Attempts</Label>
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="3 attempts" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 attempt</SelectItem>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" disabled>
                  Test Connection
                </Button>
                <Button disabled>
                  Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SAPIntegration;
