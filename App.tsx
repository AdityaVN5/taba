import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Moon, Sun } from "lucide-react";

export default function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 transition-colors duration-300 bg-gray-50 dark:bg-black">
               <div className="w-full max-w-[1400px] bg-white dark:bg-gray-900 rounded-[2rem] shadow-soft overflow-hidden relative transition-colors duration-300">
                  <div className="relative w-full h-auto min-h-[700px] rounded-[1.8rem] m-0 sm:m-2 bg-hero-gradient dark:bg-hero-gradient-dark flex flex-col items-center overflow-hidden transition-all duration-500">
                    <div className="absolute inset-0 pointer-events-none bg-pattern-dots bg-repeat opacity-100 mix-blend-multiply dark:mix-blend-soft-light"></div>
                    <Navbar />
                    <Hero />
                  </div>
                  <SocialProof />
               </div>
            </div>
          } />
          
          <Route path="/login" element={
            <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 transition-colors duration-300 bg-gray-50 dark:bg-black">
               <div className="w-full max-w-[1400px] bg-white dark:bg-gray-900 rounded-[2rem] shadow-soft overflow-hidden relative transition-colors duration-300">
                  <div className="relative w-full h-auto min-h-[700px] rounded-[1.8rem] m-0 sm:m-2 bg-hero-gradient dark:bg-hero-gradient-dark flex flex-col items-center overflow-hidden transition-all duration-500">
                    <div className="absolute inset-0 pointer-events-none bg-pattern-dots bg-repeat opacity-100 mix-blend-multiply dark:mix-blend-soft-light"></div>
                    <LoginPage />
                  </div>
               </div>
            </div>
          } />

          <Route element={<ProtectedRoute />}>
             <Route path="/dashboard/*" element={
               <div className="w-full h-screen bg-white dark:bg-gray-900 overflow-hidden relative transition-colors duration-300">
                 <Dashboard />
               </div>
             } />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-accent-yellow shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform duration-200 z-50"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </BrowserRouter>
  );
}