import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ChatBuilder from "./pages/ChatBuilder";
import AgentStudio from "./pages/AgentStudio";
import ToolsGateway from "./pages/ToolsGateway";
import RAGData from "./pages/RAGData";
import Memory from "./pages/Memory";
import Observability from "./pages/Observability";
import Deploy from "./pages/Deploy";
import Identity from "./pages/Identity";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<ChatBuilder />} />
          <Route path="/agents" element={<AgentStudio />} />
          <Route path="/tools" element={<ToolsGateway />} />
          <Route path="/rag" element={<RAGData />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/observability" element={<Observability />} />
          <Route path="/deploy" element={<Deploy />} />
          <Route path="/identity" element={<Identity />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
