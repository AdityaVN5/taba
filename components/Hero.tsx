import React from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 md:py-20 relative z-10 w-full max-w-4xl mx-auto mt-8 md:mt-0">
      
      {/* Badge */}
      <div className="glass-nav px-5 py-1.5 rounded-full mb-8 inline-flex items-center gap-2 animate-fade-in-up">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200">
          Minimal Productivity
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1] drop-shadow-sm">
        TABA: Organize Tasks<br className="hidden md:block" /> with Intelligence
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-10 leading-relaxed font-medium">
        A streamlined way to manage projects and boost productivity. Focus on what matters while TABA handles the complexity for you.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
        <button
          onClick={() => navigate('/signup')}
          className="w-full sm:w-auto px-8 py-4 bg-accent-yellow hover:bg-[#FCD56E] text-gray-900 font-bold rounded-full transition-all transform hover:-translate-y-1 shadow-glow text-center"
        >
          Get Started for Free
        </button>
        <button className="w-full sm:w-auto px-8 py-4 glass-nav hover:bg-white/40 text-gray-900 dark:text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 group">
          <span className="p-1 rounded-full border border-gray-900/10 dark:border-white/20 group-hover:bg-white/20 transition-colors">
             <Play size={18} fill="currentColor" className="text-gray-900 dark:text-white" />
          </span>
          Watch Video
        </button>
      </div>
    </main>
  );
};