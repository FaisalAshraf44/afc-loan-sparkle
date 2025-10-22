import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/dashboard/Overview";
import Users from "./pages/dashboard/admin/Users";
import Roles from "./pages/dashboard/admin/Roles";
import Notifications from "./pages/dashboard/admin/Notifications";
import Logs from "./pages/dashboard/admin/Logs";
import CRM from "./pages/dashboard/origination/CRM";
import NDA from "./pages/dashboard/origination/NDA";
import Onboarding from "./pages/dashboard/origination/Onboarding";
import IDMemo from "./pages/dashboard/origination/IDMemo";
import EIM from "./pages/dashboard/pre-screening/EIM";
import DivisionalReview from "./pages/dashboard/pre-screening/DivisionalReview";
import RiskAssessment from "./pages/dashboard/pre-screening/RiskAssessment";
import SubInvestCo from "./pages/dashboard/pre-screening/SubInvestCo";
import FIM from "./pages/dashboard/approval/FIM";
import InvestCo from "./pages/dashboard/approval/InvestCo";
import BRIC from "./pages/dashboard/approval/BRIC";
import Board from "./pages/dashboard/approval/Board";
import Tracking from "./pages/dashboard/approval/Tracking";
import CPTracker from "./pages/dashboard/pre-disbursement/CPTracker";
import Repository from "./pages/dashboard/pre-disbursement/Repository";
import Legal from "./pages/dashboard/pre-disbursement/Legal";
import ClosingMemo from "./pages/dashboard/pre-disbursement/ClosingMemo";
import Process from "./pages/dashboard/disbursement/Process";
import Treasury from "./pages/dashboard/disbursement/Treasury";
import Portfolio from "./pages/dashboard/disbursement/Portfolio";
import Reports from "./pages/dashboard/disbursement/Reports";
import EXCOApproval from "./pages/dashboard/disbursement/EXCOApproval";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="origination/crm" element={<CRM />} />
            <Route path="origination/nda" element={<NDA />} />
            <Route path="origination/onboarding" element={<Onboarding />} />
            <Route path="origination/id-memo" element={<IDMemo />} />
            <Route path="pipeline" element={<Overview />} />
            <Route path="pre-screening/eim" element={<EIM />} />
            <Route path="pre-screening/review" element={<DivisionalReview />} />
            <Route path="pre-screening/risk" element={<RiskAssessment />} />
            <Route path="pre-screening/sub-investco" element={<SubInvestCo />} />
            <Route path="approval/fim" element={<FIM />} />
            <Route path="approval/investco" element={<InvestCo />} />
            <Route path="approval/bric" element={<BRIC />} />
            <Route path="approval/board" element={<Board />} />
            <Route path="approval/tracking" element={<Tracking />} />
            <Route path="pre-disbursement/cp-tracker" element={<CPTracker />} />
            <Route path="pre-disbursement/repository" element={<Repository />} />
            <Route path="pre-disbursement/legal" element={<Legal />} />
            <Route path="pre-disbursement/closing-memo" element={<ClosingMemo />} />
            <Route path="disbursement/process" element={<Process />} />
            <Route path="disbursement/exco-approval" element={<EXCOApproval />} />
            <Route path="disbursement/treasury" element={<Treasury />} />
            <Route path="disbursement/portfolio" element={<Portfolio />} />
            <Route path="disbursement/reports" element={<Reports />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/roles" element={<Roles />} />
            <Route path="admin/notifications" element={<Notifications />} />
            <Route path="admin/logs" element={<Logs />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
