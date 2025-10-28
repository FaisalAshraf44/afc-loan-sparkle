import { Outlet, useLocation } from "react-router-dom";
import { 
  Bell, 
  User, 
  FileText, 
  CheckCircle, 
  Activity 
} from "lucide-react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const location = useLocation();
  const isMainDashboard = location.pathname === "/dashboard";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-foreground">
                  AFC Loan Workflow Dashboard
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {isMainDashboard ? (
              <div className="container mx-auto p-6">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                    Welcome to AFC Loan Workflow
                  </h2>
                  <p className="text-muted-foreground">
                    Manage loans, track applications, and monitor performance from your centralized dashboard
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Quick Stats */}
                  <div className="p-6 rounded-lg border border-border bg-card shadow-card">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Pending Applications
                    </h3>
                    <p className="text-3xl font-bold text-foreground">24</p>
                    <p className="text-sm text-success mt-2">↑ 12% from last week</p>
                  </div>

                  <div className="p-6 rounded-lg border border-border bg-card shadow-card">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Active Loans
                    </h3>
                    <p className="text-3xl font-bold text-foreground">156</p>
                    <p className="text-sm text-muted-foreground mt-2">Total portfolio value: $12.4M</p>
                  </div>

                  <div className="p-6 rounded-lg border border-border bg-card shadow-card">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Approval Rate
                    </h3>
                    <p className="text-3xl font-bold text-foreground">68%</p>
                    <p className="text-sm text-success mt-2">↑ 5% this month</p>
                  </div>
                </div>

                <div className="mt-8 p-8 rounded-lg border border-border bg-card shadow-card">
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button className="h-auto py-4 flex flex-col items-start gap-2" variant="outline">
                      <FileText className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-semibold">New Application</div>
                        <div className="text-xs text-muted-foreground">Create a new loan application</div>
                      </div>
                    </Button>
                    
                    <Button className="h-auto py-4 flex flex-col items-start gap-2" variant="outline">
                      <CheckCircle className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-semibold">Review Queue</div>
                        <div className="text-xs text-muted-foreground">Process pending approvals</div>
                      </div>
                    </Button>
                    
                    <Button className="h-auto py-4 flex flex-col items-start gap-2" variant="outline">
                      <Activity className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-semibold">Monitor Loans</div>
                        <div className="text-xs text-muted-foreground">Track active loan performance</div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </main>

          {/* Footer */}
          <footer className="border-t border-border bg-card/50 backdrop-blur">
            <div className="px-6 py-3 flex justify-end items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Developed by <span className="font-semibold text-foreground">Insyt</span>
              </p>
              <img src="/src/assets/insyt-logo.png" alt="Insyt Logo" className="h-6 w-auto" />
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
