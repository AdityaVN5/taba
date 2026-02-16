import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const DocsPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-8 transition-colors duration-300 bg-gray-50 dark:bg-black overflow-y-auto">
          <div 
            className="w-full max-w-[1600px] bg-white dark:bg-gray-900 rounded-[2rem] shadow-soft overflow-hidden relative transition-colors duration-300 flex flex-col"
            style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}
          >
            <div className="relative w-full h-auto min-h-[400px] rounded-[1.8rem] m-0 sm:m-2 bg-hero-gradient dark:bg-hero-gradient-dark flex flex-col items-center overflow-hidden transition-all duration-500">
              <div className="absolute inset-0 pointer-events-none bg-pattern-dots bg-repeat opacity-100 mix-blend-multiply dark:mix-blend-soft-light"></div>
              <Navbar />
              <div className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 relative z-10 w-full max-w-4xl mx-auto">
                 <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                    Documentation
                 </h1>
                 <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl text-center">
                    Learn how to get the most out of TABA.
                 </p>
              </div>
            </div>
    
            <div className="px-6 py-20 bg-white dark:bg-gray-900 flex-grow">
                <div className="max-w-4xl mx-auto prose dark:prose-invert">
                    <h2>Getting Started</h2>
                    <p>Welcome to TABA! This guide will help you get up and running quickly.</p>
                    
                    <h3>Creating Your First Task</h3>
                    <p>Click the "New Task" button in the top right corner of the dashboard. Fill in the task details and click "Create".</p>
                    
                    <h3>Organizing with Priority</h3>
                    <p>You can assign Low, Medium, or High priority to your tasks. Use the sort feature to arrange tasks by priority.</p>
                </div>
            </div>
    
            <Footer />
          </div>
        </div>
      );
};
