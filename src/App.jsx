import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import WeeklyChart from "./components/WeeklyChart";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { useApp } from "./context/AppContext";

const AppContent = () => {
  const { theme } = useApp()
  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0F0F1A] text-[#E8E8F0]' : 'bg-[#F8F5F0] text-[#1A1A2E]'}`}>
      <Navbar />
      <div className="ml-0 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/week" element={<WeeklyChart />} />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App