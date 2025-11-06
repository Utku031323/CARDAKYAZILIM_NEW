import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TeklifAl from "./pages/TeklifAl";
import Basla from "./pages/Basla";
import NotFound from "./pages/NotFound";

// Admin imports
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminQuotes from "./pages/admin/AdminQuotes";
import AdminQuoteDetail from "./pages/admin/AdminQuoteDetail";
import AdminOnboarding from "./pages/admin/AdminOnboarding";
import AdminOnboardingDetail from "./pages/admin/AdminOnboardingDetail";
import AdminPricing from "./pages/admin/AdminPricing";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/teklif-al" element={<TeklifAl />} />
          <Route path="/basla" element={<Basla />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="quotes" element={<AdminQuotes />} />
            <Route path="quotes/:id" element={<AdminQuoteDetail />} />
            <Route path="onboarding" element={<AdminOnboarding />} />
            <Route path="onboarding/:id" element={<AdminOnboardingDetail />} />
            <Route path="pricing" element={<AdminPricing />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            {/* ADD ADMIN ROUTES HERE */}
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
