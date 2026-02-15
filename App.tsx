import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { Moon, Sun } from "lucide-react";

type ViewState = "home" | "login" | "dashboard";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>("home");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogin = () => {
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setCurrentView("home");
  };

  // Render Dashboard in full screen without the wrapper
  if (currentView === "dashboard") {
    return (
      <div className="w-full h-screen bg-white dark:bg-gray-900 overflow-hidden relative transition-colors duration-300">
        <Dashboard />
        
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-accent-yellow shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform duration-200 z-50"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    );
  }

  // Render Landing/Login pages with centered card layout
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 transition-colors duration-300">
      <div className="w-full max-w-[1400px] bg-white dark:bg-gray-900 rounded-[2rem] shadow-soft overflow-hidden relative transition-colors duration-300">
        
        {currentView === "home" && (
          <>
            {/* Main colored container */}
            <div className="relative w-full h-auto min-h-[700px] rounded-[1.8rem] m-0 sm:m-2 bg-hero-gradient dark:bg-hero-gradient-dark flex flex-col items-center overflow-hidden transition-all duration-500">
              
              {/* Pattern Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-pattern-dots bg-repeat opacity-100 mix-blend-multiply dark:mix-blend-soft-light"></div>

              {/* Navigation */}
              <Navbar onLoginClick={() => setCurrentView("login")} />

              {/* Hero Content */}
              <Hero />

            </div>

            {/* Bottom Social Proof Strip */}
            <SocialProof />
          </>
        )}

        {currentView === "login" && (
           <div className="relative w-full h-auto min-h-[700px] rounded-[1.8rem] m-0 sm:m-2 bg-hero-gradient dark:bg-hero-gradient-dark flex flex-col items-center overflow-hidden transition-all duration-500">
               {/* Pattern Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-pattern-dots bg-repeat opacity-100 mix-blend-multiply dark:mix-blend-soft-light"></div>
              
              <LoginPage onLogin={handleLogin} onBack={() => setCurrentView("home")} />
           </div>
        )}

      </div>

      {/* Dark Mode Toggle - Floating */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-accent-yellow shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform duration-200 z-50"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
}