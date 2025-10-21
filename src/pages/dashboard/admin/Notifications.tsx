import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, MessageSquare, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "Deal Approval Required",
      message: "ABC Corp deal awaiting your approval at FIM stage",
      type: "Approval",
      priority: "High",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Document Upload Complete",
      message: "Legal documents uploaded for XYZ Industries",
      type: "Document",
      priority: "Medium",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "CP Status Updated",
      message: "Conditions Precedent completed for DEF Ltd",
      type: "Status",
      priority: "Medium",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      title: "Disbursement Scheduled",
      message: "Treasury execution scheduled for tomorrow",
      type: "Disbursement",
      priority: "High",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const notificationSettings = [
    { category: "Deal Approvals", email: true, inApp: true, description: "Receive alerts when deals require approval" },
    { category: "Document Updates", email: true, inApp: true, description: "Get notified about document changes" },
    { category: "CP Status Changes", email: false, inApp: true, description: "Track Conditions Precedent progress" },
    { category: "Disbursement Alerts", email: true, inApp: true, description: "Important disbursement notifications" },
    { category: "System Updates", email: false, inApp: true, description: "Platform maintenance and updates" },
  ];

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      High: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
      Medium: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
      Low: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    };
    return <Badge className={variants[priority] || ""}>{priority}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, any> = {
      Approval: AlertCircle,
      Document: Mail,
      Status: MessageSquare,
      Disbursement: Bell,
    };
    const Icon = icons[type] || Bell;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">Manage workflow reminders and alerts</p>
        </div>
        <Button variant="outline">Mark All as Read</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardDescription>Unread</CardDescription>
            <CardTitle className="text-3xl">2</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-3">
            <CardDescription>High Priority</CardDescription>
            <CardTitle className="text-3xl">2</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardDescription>Today</CardDescription>
            <CardTitle className="text-3xl">4</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardDescription>This Week</CardDescription>
            <CardTitle className="text-3xl">18</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={notification.read ? "opacity-60" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">{getTypeIcon(notification.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <CardDescription>{notification.message}</CardDescription>
                      <div className="flex items-center gap-2 pt-2">
                        <Badge variant="outline">{notification.type}</Badge>
                        {getPriorityBadge(notification.priority)}
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Dismiss
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive workflow reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {notificationSettings.map((setting) => (
                <div key={setting.category} className="flex items-start justify-between gap-4 py-4 border-b last:border-0">
                  <div className="space-y-1 flex-1">
                    <h4 className="font-medium">{setting.category}</h4>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <div className="flex gap-8">
                    <div className="flex items-center gap-2">
                      <Switch checked={setting.email} />
                      <span className="text-sm">Email</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={setting.inApp} />
                      <span className="text-sm">In-App</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
