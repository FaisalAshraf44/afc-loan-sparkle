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
  Send,
  FileOutput,
  DollarSign,
  Activity,
  PieChart,
  UserCog,
  ClipboardList,
  Bell,
  Building2,
  ChevronDown,
  Database,
  Megaphone
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Department = "all" | "origination" | "risk" | "legal" | "treasury" | "admin";

interface DepartmentConfig {
  label: string;
  icon: typeof Building2;
  color: string;
}

const departmentConfig: Record<Department, DepartmentConfig> = {
  all: { label: "All Departments", icon: Building2, color: "text-primary" },
  origination: { label: "Origination", icon: Users, color: "text-blue-500" },
  risk: { label: "Risk & Analysis", icon: BarChart3, color: "text-amber-500" },
  legal: { label: "Legal", icon: Shield, color: "text-purple-500" },
  treasury: { label: "Treasury", icon: DollarSign, color: "text-emerald-500" },
  admin: { label: "Admin", icon: UserCog, color: "text-rose-500" },
};

const navigationGroups = [
  {
    label: "Deal Origination",
    department: "origination" as Department,
    items: [
      { title: "CRM & Leads", url: "/dashboard/origination/crm", icon: Users },
      { title: "Teaser Review", url: "/dashboard/origination/teaser", icon: FileText },
      { title: "NDA Management", url: "/dashboard/origination/nda", icon: FileText },
      { title: "Client Onboarding", url: "/dashboard/origination/onboarding", icon: UserPlus },
      { title: "Data Room Access", url: "/dashboard/origination/data-room", icon: FileOutput },
      { title: "KYC & Compliance", url: "/dashboard/origination/kyc", icon: Shield },
      { title: "Team Assignment", url: "/dashboard/origination/team-assignment", icon: UserCog },
      { title: "ID Memo", url: "/dashboard/origination/id-memo", icon: FileText },
    ],
  },
  {
    label: "Investment Pre-Screening",
    department: "risk" as Department,
    items: [
      { title: "EIM Drafting", url: "/dashboard/pre-screening/eim", icon: FileText },
      { title: "Divisional Approval", url: "/dashboard/pre-screening/divisional-approval", icon: CheckCircle },
      { title: "Risk Assessment", url: "/dashboard/pre-screening/risk", icon: BarChart3 },
      { title: "Sub-InvestCo Meeting", url: "/dashboard/pre-screening/sub-investco", icon: Users },
    ],
  },
  {
    label: "Investment Approval",
    department: "risk" as Department,
    items: [
      { title: "Mandate Letter", url: "/dashboard/approval/mandate-letter", icon: FileCheck },
      { title: "FIM Preparation", url: "/dashboard/approval/fim", icon: FileText },
      { title: "InvestCo Review", url: "/dashboard/approval/investco", icon: Users },
      { title: "CEO Approval", url: "/dashboard/approval/ceo-approval", icon: UserCog },
      { title: "BRIC Review", url: "/dashboard/approval/bric", icon: FileCheck },
      { title: "Board Approval", url: "/dashboard/approval/board", icon: Gavel },
      { title: "Approval Communication", url: "/dashboard/approval/communication", icon: Send },
      { title: "Approval Tracking", url: "/dashboard/approval/tracking", icon: Activity },
    ],
  },
  {
    label: "Legal & Documentation",
    department: "legal" as Department,
    items: [
      { title: "Deal Documentation", url: "/dashboard/legal/documentation", icon: FileText },
    ],
  },
  {
    label: "Pre-Disbursement",
    department: "legal" as Department,
    items: [
      { title: "CP Tracker", url: "/dashboard/pre-disbursement/cp-tracker", icon: ClipboardList },
      { title: "Document Repository", url: "/dashboard/pre-disbursement/repository", icon: FileOutput },
      { title: "Legal Review", url: "/dashboard/pre-disbursement/legal", icon: Shield },
      { title: "Closing Memo", url: "/dashboard/pre-disbursement/closing-memo", icon: FileCheck },
    ],
  },
  {
    label: "Disbursement & Monitoring",
    department: "treasury" as Department,
    items: [
      { title: "EXCO Approval", url: "/dashboard/disbursement/exco-approval", icon: CheckCircle },
      { title: "Document Repository", url: "/dashboard/pre-disbursement/repository", icon: FileOutput },
      { title: "SAP Integration", url: "/dashboard/disbursement/sap-integration", icon: Database },
      { title: "Disbursement Process", url: "/dashboard/disbursement/process", icon: Activity },
      { title: "Treasury Execution", url: "/dashboard/disbursement/treasury", icon: DollarSign },
      { title: "Investment Disclosure", url: "/dashboard/disbursement/investment-disclosure", icon: Megaphone },
      { title: "Portfolio Management", url: "/dashboard/disbursement/portfolio", icon: BarChart3 },
      { title: "Reports & Analytics", url: "/dashboard/disbursement/reports", icon: PieChart },
    ],
  },
  {
    label: "System Administration",
    department: "admin" as Department,
    items: [
      { title: "User Management", url: "/dashboard/admin/users", icon: UserCog },
      { title: "Role Permissions", url: "/dashboard/admin/roles", icon: Shield },
      { title: "Notifications", url: "/dashboard/admin/notifications", icon: Bell },
      { title: "Audit Logs", url: "/dashboard/admin/logs", icon: ClipboardList },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [selectedDepartment, setSelectedDepartment] = useState<Department>("all");

  const isActive = (path: string) => currentPath === path;

  const filteredGroups = selectedDepartment === "all" 
    ? navigationGroups 
    : navigationGroups.filter(group => group.department === selectedDepartment);

  const currentDeptConfig = departmentConfig[selectedDepartment];
  const DeptIcon = currentDeptConfig.icon;

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

        {/* Department Selector */}
        {state !== "collapsed" && (
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-4 w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-center gap-2">
                <DeptIcon className={`h-4 w-4 ${currentDeptConfig.color}`} />
                <span className="text-sm font-medium">{currentDeptConfig.label}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              {(Object.entries(departmentConfig) as [Department, DepartmentConfig][]).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <DropdownMenuItem 
                    key={key}
                    onClick={() => setSelectedDepartment(key)}
                    className={selectedDepartment === key ? "bg-muted" : ""}
                  >
                    <Icon className={`h-4 w-4 mr-2 ${config.color}`} />
                    {config.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarHeader>

      <SidebarContent>
        {filteredGroups.map((group) => {
          const groupConfig = departmentConfig[group.department];
          return (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel className="flex items-center gap-2">
                {state !== "collapsed" && (
                  <span className={`w-2 h-2 rounded-full ${groupConfig.color.replace('text-', 'bg-')}`} />
                )}
                {group.label}
              </SidebarGroupLabel>
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
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
