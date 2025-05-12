
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashboardLayout from "./components/DashboardLayout";
import EntitySets from "./pages/EntitySets";
import NewTraining from "./pages/NewTraining";
import TrainingResults from "./pages/TrainingResults";
import DocumentView from "./pages/DocumentView";
import PastTrainings from "./pages/PastTrainings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<EntitySets />} />
            <Route path="entity-sets" element={<EntitySets />} />
            <Route path="new-training" element={<NewTraining />} />
            <Route path="training-results" element={<TrainingResults />} />
            <Route path="past-trainings" element={<PastTrainings />} />
            <Route path="document/:id" element={<DocumentView />} />
            <Route path="training/:id" element={<TrainingResults />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
