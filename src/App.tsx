
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DreamProvider } from "./context/DreamContext";
import DreamsPage from "./pages/DreamsPage";
import CommunityPage from "./pages/CommunityPage";
import DreamDetailPage from "./pages/DreamDetailPage";
import RecordPage from "./pages/RecordPage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import { Navigation } from "./components/Navigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DreamProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DreamsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/dream/:id" element={<DreamDetailPage />} />
            <Route path="/record" element={<RecordPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Navigation />
        </BrowserRouter>
      </DreamProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
