import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Logs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const logs = [
    { id: 1, timestamp: "2025-10-21 14:35:22", user: "John Smith", action: "Login", module: "Authentication", status: "Success", ip: "192.168.1.100" },
    { id: 2, timestamp: "2025-10-21 14:32:18", user: "Sarah Johnson", action: "Updated Deal", module: "Origination", status: "Success", ip: "192.168.1.101" },
    { id: 3, timestamp: "2025-10-21 14:28:45", user: "Mike Williams", action: "Approved FIM", module: "Approval", status: "Success", ip: "192.168.1.102" },
    { id: 4, timestamp: "2025-10-21 14:25:12", user: "Emily Brown", action: "Login Failed", module: "Authentication", status: "Failed", ip: "192.168.1.103" },
    { id: 5, timestamp: "2025-10-21 14:20:33", user: "David Lee", action: "Uploaded Document", module: "Pre-Disbursement", status: "Success", ip: "192.168.1.104" },
    { id: 6, timestamp: "2025-10-21 14:15:09", user: "Sarah Johnson", action: "Created CP Item", module: "Pre-Disbursement", status: "Success", ip: "192.168.1.101" },
    { id: 7, timestamp: "2025-10-21 14:10:44", user: "Admin System", action: "Database Backup", module: "System", status: "Success", ip: "System" },
    { id: 8, timestamp: "2025-10-21 14:05:21", user: "John Smith", action: "Export Report", module: "Disbursement", status: "Success", ip: "192.168.1.100" },
    { id: 9, timestamp: "2025-10-21 14:00:15", user: "Mike Williams", action: "Updated Role", module: "Admin", status: "Warning", ip: "192.168.1.102" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Success: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
      Failed: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
      Warning: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    };
    return <Badge className={variants[status] || ""}>{status}</Badge>;
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.module.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === "all" || log.module.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Track all system events and user activities</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardDescription>Total Events Today</CardDescription>
            <CardTitle className="text-3xl">247</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardDescription>Successful</CardDescription>
            <CardTitle className="text-3xl">238</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardDescription>Failed</CardDescription>
            <CardTitle className="text-3xl">6</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-3">
            <CardDescription>Warnings</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Read-only audit trail of all system events</CardDescription>
          <div className="flex flex-col gap-2 pt-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by user, action, or module..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="authentication">Authentication</SelectItem>
                <SelectItem value="origination">Origination</SelectItem>
                <SelectItem value="approval">Approval</SelectItem>
                <SelectItem value="pre-disbursement">Pre-Disbursement</SelectItem>
                <SelectItem value="disbursement">Disbursement</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.module}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{log.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;
