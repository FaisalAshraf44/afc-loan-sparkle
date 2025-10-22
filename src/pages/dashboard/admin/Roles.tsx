import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shield, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const Roles = () => {
  const { toast } = useToast();
  const roles = [
    {
      name: "Admin",
      description: "Full system access and control",
      users: 3,
      color: "purple",
    },
    {
      name: "Manager",
      description: "Can approve deals and manage teams",
      users: 8,
      color: "blue",
    },
    {
      name: "Analyst",
      description: "Can view and create reports",
      users: 13,
      color: "cyan",
    },
  ];

  const permissions = [
    { module: "Origination", actions: ["View", "Create", "Edit", "Delete", "Approve"] },
    { module: "Pre-Screening", actions: ["View", "Create", "Edit", "Delete", "Approve"] },
    { module: "Approval", actions: ["View", "Create", "Edit", "Delete", "Approve"] },
    { module: "Pre-Disbursement", actions: ["View", "Create", "Edit", "Delete", "Approve"] },
    { module: "Disbursement", actions: ["View", "Create", "Edit", "Delete", "Approve"] },
    { module: "Admin", actions: ["View", "Create", "Edit", "Delete"] },
  ];

  const rolePermissions = {
    Admin: { View: true, Create: true, Edit: true, Delete: true, Approve: true },
    Manager: { View: true, Create: true, Edit: true, Delete: false, Approve: true },
    Analyst: { View: true, Create: true, Edit: false, Delete: false, Approve: false },
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Role Permissions</h1>
          <p className="text-muted-foreground mt-1">Configure role-based access control</p>
        </div>
        <Button className="md:self-start">
          <Plus className="mr-2 h-4 w-4" />
          Create New Role
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.name} className={`border-l-4 border-l-${role.color}-500`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Shield className={`h-5 w-5 text-${role.color}-500`} />
                  <CardTitle>{role.name}</CardTitle>
                </div>
                <Badge variant="secondary">{role.users} users</Badge>
              </div>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full" onClick={() => {
                toast({
                  title: "Role Change Notification Sent",
                  description: `Users with the ${role.name} role have been notified of the permission changes.`,
                });
              }}>
                Edit Role
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
          <CardDescription>Configure permissions for each role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Module</th>
                  {Object.keys(rolePermissions).map((role) => (
                    <th key={role} className="text-center p-4 font-semibold">
                      {role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions.map((permission) => (
                  <>
                    <tr key={permission.module} className="border-b bg-muted/50">
                      <td colSpan={4} className="p-4 font-semibold">
                        {permission.module}
                      </td>
                    </tr>
                    {permission.actions.map((action) => (
                      <tr key={`${permission.module}-${action}`} className="border-b hover:bg-muted/30">
                        <td className="p-4 pl-8 text-sm text-muted-foreground">{action}</td>
                        {Object.entries(rolePermissions).map(([role, perms]) => (
                          <td key={role} className="p-4 text-center">
                            <div className="flex justify-center">
                              <Checkbox
                                checked={perms[action as keyof typeof perms]}
                                disabled
                              />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Roles;
