import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SparkleIcon } from './SparkleIcon';

export const SocialProof: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-10 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 relative z-20 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      
      {/* Left Content */}
      <div className="flex items-start gap-4 max-w-lg">
        <div className="flex-shrink-0 mt-1">
          <SparkleIcon className="w-12 h-12 drop-shadow-md" />
        </div>
        <div>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100 leading-snug">
            Manage Tasks & Projects Like a Pro – AI-Driven, Collaborative, and Deadline-Ready!
          </p>
        </div>
      </div>

      {/* Divider (Desktop only) */}
      <div className="hidden md:block w-px h-16 bg-gray-200 dark:bg-gray-700"></div>

      {/* Right Content */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <span className="text-xl font-medium text-gray-900 dark:text-white">
          Proved by Startups
        </span>
        <ArrowRight className="text-gray-900 dark:text-white transform group-hover:translate-x-1 transition-transform" />
      </div>

    </div>
  );
};