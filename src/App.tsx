import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/dashboard/Overview";
import CRM from "./pages/dashboard/origination/CRM";
import NDA from "./pages/dashboard/origination/NDA";
import Onboarding from "./pages/dashboard/origination/Onboarding";
import IDMemo from "./pages/dashboard/origination/IDMemo";
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
            <Route path="review/initial" element={<Overview />} />
            <Route path="documents" element={<Overview />} />
            <Route path="credit-assessment" element={<Overview />} />
            <Route path="approval/queue" element={<Overview />} />
            <Route path="approval/committee" element={<Overview />} />
            <Route path="approval/decisions" element={<Overview />} />
            <Route path="legal" element={<Overview />} />
            <Route path="compliance" element={<Overview />} />
            <Route path="disbursement/prep" element={<Overview />} />
            <Route path="loans/active" element={<Overview />} />
            <Route path="payments" element={<Overview />} />
            <Route path="reports" element={<Overview />} />
            <Route path="admin/users" element={<Overview />} />
            <Route path="admin/settings" element={<Overview />} />
            <Route path="admin/audit" element={<Overview />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
