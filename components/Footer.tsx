import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-8 md:px-16 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-bold text-xl text-black dark:text-white tracking-tight">TABA.</span>
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2026 TABA Inc. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-8">
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Terms</a>
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Twitter</a>
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};
