import React from 'react';
import { Target, Shield, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-8 md:px-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why TABA?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We built TABA to solve the friction of modern task management. Simple, fast, and powerful.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent-yellow/10 rounded-2xl flex items-center justify-center mb-6">
              <Target className="text-accent-yellow" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Precision Focused</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Only features that help you get things done. No bloat, just workflow.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="text-blue-500" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Secure by Default</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your data is encrypted and stored locally in your browser for maximum privacy.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Users className="text-purple-500" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Built for You</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Whether you're a freelancer or a startup team, TABA scales with your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
