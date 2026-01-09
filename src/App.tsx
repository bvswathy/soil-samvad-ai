import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";

// Pages
import SplashScreen from "./pages/SplashScreen";
import LanguageSelection from "./pages/LanguageSelection";
import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";
import SoilInput from "./pages/SoilInput";
import SoilImageAnalysis from "./pages/SoilImageAnalysis";
import SoilManualEntry from "./pages/SoilManualEntry";
import ClimateIntelligence from "./pages/ClimateIntelligence";
import CropRecommendations from "./pages/CropRecommendations";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import VoiceAssistant from "./pages/VoiceAssistant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/language" element={<LanguageSelection />} />
            <Route path="/profile" element={<ProfileSetup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/soil" element={<SoilInput />} />
            <Route path="/soil/image" element={<SoilImageAnalysis />} />
            <Route path="/soil/manual" element={<SoilManualEntry />} />
            <Route path="/soil/voice" element={<VoiceAssistant />} />
            <Route path="/climate" element={<ClimateIntelligence />} />
            <Route path="/recommendations" element={<CropRecommendations />} />
            <Route path="/schemes" element={<GovernmentSchemes />} />
            <Route path="/assistant" element={<VoiceAssistant />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
