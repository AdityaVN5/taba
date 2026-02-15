import React from 'react';
import { ChevronDown } from 'lucide-react';

interface NavbarProps {
  onLoginClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  return (
    <nav className="w-full max-w-5xl mt-6 sm:mt-8 px-4 relative z-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer" onClick={() => window.location.reload()}>
          TABA.
        </div>

        {/* Nav Links Container */}
        <div className="glass-nav rounded-full px-2 py-1.5 flex items-center gap-1 sm:gap-2 shadow-sm transition-all duration-300">
          <a
            href="#"
            className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
          >
            Home
          </a>

          <div className="relative group">
            <button className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white inline-flex items-center gap-1 transition-colors">
              Features <ChevronDown size={16} />
            </button>
          </div>

          <a
            href="#"
            className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors hidden sm:block"
          >
            Pricing
          </a>

          <span className="w-px h-5 bg-gray-400/30 mx-1 hidden sm:block"></span>

          <button
            onClick={onLoginClick}
            className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
          >
            Log in
          </button>

          <a
            href="#"
            className="bg-primary hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 px-6 py-2.5 rounded-full text-sm font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};