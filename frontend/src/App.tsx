import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import Dashboard from "@/pages/Dashboard";
import History from "@/pages/History";
import Settings from "@/pages/Settings";
import ResearchDetailsPage from "@/pages/ResearchDetailsPage";

function App() {
  return (
    <div className="App min-h-screen bg-scout-bg text-scout-text">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/research" element={<Dashboard />} />

          <Route path="/research/:id" element={<ResearchDetailsPage />} />

          <Route path="/history" element={<History />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            border: "1px solid #E2E8F0",
            background: "#FFFFFF",
            color: "#0F172A",
            fontFamily: "Manrope, sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;
