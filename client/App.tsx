import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteFrame from "@/components/SiteFrame";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Audit from "./pages/Audit";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import Onboarding from "./pages/Onboarding";
import Parents from "./pages/Parents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const Msimbo = lazy(() => import("./pages/Msimbo"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteFrame />}>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/learn" element={<Learn />} />
          <Route path="/msimbo" element={<Suspense fallback={<div className="grid min-h-[50vh] place-items-center bg-cream px-6 text-center text-sm font-black text-forest">Loading the Msimbo world…</div>}><Msimbo /></Suspense>} />
          <Route path="/audit" element={<Audit />} />
            <Route path="/parents" element={<Parents />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
