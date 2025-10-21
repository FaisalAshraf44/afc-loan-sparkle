import { 
  FileText, 
  Users, 
  UserPlus,
  Search,
  FileCheck,
  BarChart3,
  CheckCircle,
  Gavel,
  Shield,
  FileOutput,
  DollarSign,
  Activity,
  PieChart,
  Settings,
  UserCog,
  ClipboardList
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationGroups = [
  {
    label: "Deal Origination",
    items: [
      { title: "CRM & Leads", url: "/dashboard/origination/crm", icon: Users },
      { title: "NDA Management", url: "/dashboard/origination/nda", icon: FileText },
      { title: "Client Onboarding", url: "/dashboard/origination/onboarding", icon: UserPlus },
      { title: "ID Memo", url: "/dashboard/origination/id-memo", icon: FileText },
    ],
  },
  {
    label: "Investment Pre-Screening",
    items: [
      { title: "EIM Drafting", url: "/dashboard/pre-screening/eim", icon: FileText },
      { title: "Divisional Review", url: "/dashboard/pre-screening/review", icon: Search },
      { title: "Risk Assessment", url: "/dashboard/pre-screening/risk", icon: BarChart3 },
      { title: "Sub-InvestCo Meeting", url: "/dashboard/pre-screening/sub-investco", icon: Users },
    ],
  },
  {
    label: "Investment Approval",
    items: [
      { title: "FIM Preparation", url: "/dashboard/approval/fim", icon: FileText },
      { title: "InvestCo Review", url: "/dashboard/approval/investco", icon: Users },
      { title: "BRIC Review", url: "/dashboard/approval/bric", icon: FileCheck },
      { title: "Board Approval", url: "/dashboard/approval/board", icon: Gavel },
      { title: "Approval Tracking", url: "/dashboard/approval/tracking", icon: Activity },
    ],
  },
  {
    label: "Pre-Disbursement",
    items: [
      { title: "Legal Documentation", url: "/dashboard/legal", icon: FileOutput },
      { title: "Compliance Checks", url: "/dashboard/compliance", icon: Shield },
      { title: "Disbursement Prep", url: "/dashboard/disbursement/prep", icon: ClipboardList },
    ],
  },
  {
    label: "Disbursement & Monitoring",
    items: [
      { title: "Active Loans", url: "/dashboard/loans/active", icon: DollarSign },
      { title: "Payment Tracking", url: "/dashboard/payments", icon: Activity },
      { title: "Performance Reports", url: "/dashboard/reports", icon: PieChart },
    ],
  },
  {
    label: "System Administration",
    items: [
      { title: "User Management", url: "/dashboard/admin/users", icon: UserCog },
      { title: "System Settings", url: "/dashboard/admin/settings", icon: Settings },
      { title: "Audit Logs", url: "/dashboard/admin/audit", icon: ClipboardList },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-primary-foreground" />
          </div>
          {state !== "collapsed" && (
            <div>
              <h2 className="text-sm font-semibold text-foreground">AFC Loan</h2>
              <p className="text-xs text-muted-foreground">Workflow System</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navigationGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = isActive(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={active}>
                        <NavLink to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
