import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CheckCircle2, Zap, Shield, Smartphone } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-accent-yellow" />,
      title: "Task Management",
      description: "Organize your life with our intuitive drag-and-drop task board."
    },
    {
      icon: <Zap className="w-6 h-6 text-accent-yellow" />,
      title: "Lightning Fast",
      description: "Built for speed, so you can focus on getting things done."
    },
    {
      icon: <Shield className="w-6 h-6 text-accent-yellow" />,
      title: "Secure & Private",
      description: "Your data is encrypted and stored locally. We prioritize your privacy."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-accent-yellow" />,
      title: "Mobile Ready",
      description: "Access your tasks on the go with our fully responsive design."
    }
  ];

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
                Powerful Features
             </h1>
             <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl text-center">
                Everything you need to stay organized and boost your productivity.
             </p>
          </div>
        </div>

        <div className="px-6 py-20 bg-white dark:bg-gray-900 flex-grow">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {features.map((feature, index) => (
                    <div key={index} className="flex gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-black dark:bg-white flex items-center justify-center overflow-hidden">
                             {/* icon wrapper */}
                             <div className="text-white dark:text-black">
                                {feature.icon}
                             </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};
