import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Search, UserPlus, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const users = [
    { id: 1, name: "John Smith", email: "john.smith@company.com", role: "Admin", status: "Active", lastLogin: "2025-10-20" },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@company.com", role: "Manager", status: "Active", lastLogin: "2025-10-21" },
    { id: 3, name: "Mike Williams", email: "mike.w@company.com", role: "Analyst", status: "Active", lastLogin: "2025-10-19" },
    { id: 4, name: "Emily Brown", email: "emily.b@company.com", role: "Analyst", status: "Inactive", lastLogin: "2025-10-15" },
    { id: 5, name: "David Lee", email: "david.lee@company.com", role: "Manager", status: "Active", lastLogin: "2025-10-21" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Active: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
      Inactive: "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20",
    };
    return <Badge className={variants[status] || ""}>{status}</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, string> = {
      Admin: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
      Manager: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
      Analyst: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
    };
    return <Badge className={variants[role] || ""}>{role}</Badge>;
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage internal system users and their access</p>
        </div>
        <Button className="md:self-start" onClick={() => {
          toast({
            title: "Welcome Email Sent",
            description: "A welcome email has been sent to the new user.",
          });
        }}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">24</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardDescription>Active Users</CardDescription>
            <CardTitle className="text-3xl">21</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardDescription>Admins</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardDescription>Managers</CardDescription>
            <CardTitle className="text-3xl">8</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
          <CardDescription>View and manage all internal users</CardDescription>
          <div className="flex items-center gap-2 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Deactivate User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
