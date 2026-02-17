import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { useUIStore, Theme } from '../store/useUIStore';
import { Trash2, Moon, Sun, Monitor, AlertTriangle } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const resetAllData = useTaskStore((state) => state.resetAllData);
  const { theme, setTheme } = useUIStore();

  const handleReset = () => {
    if (confirm('Are you sure you want to completely, irreversibly wipe ALL projects and tasks? This cannot be undone.')) {
      resetAllData();
      alert('Global reset complete. Your workspace is now empty.');
    }
  };

  const themeOptions: { id: Theme; icon: any; label: string }[] = [
    { id: 'light', icon: Sun, label: 'Light' },
    { id: 'dark', icon: Moon, label: 'Dark' },
    { id: 'system', icon: Monitor, label: 'System' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">Manage your workspace preferences</p>

      <div className="space-y-6">
        
        {/* Appearance Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-900 dark:text-white">Appearance</h2>
            </div>
            <div className="p-6">
                 <div className="flex items-center justify-between">
                     <div>
                         <p className="text-sm font-medium text-gray-900 dark:text-white">Theme</p>
                         <p className="text-xs text-gray-500 mt-1">Customize how TABA Discovery looks on your device.</p>
                     </div>
                     <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg gap-1">
                         {themeOptions.map((opt) => (
                             <button
                                key={opt.id}
                                onClick={() => setTheme(opt.id)}
                                className={`p-2 rounded-md transition-all ${
                                    theme === opt.id 
                                    ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white' 
                                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                                title={opt.label}
                             >
                                 <opt.icon size={16} />
                             </button>
                         ))}
                     </div>
                 </div>
                 <p className="text-xs text-gray-400 mt-4 italic">
                    {theme === 'system' ? 'Standardized to your system preferences.' : `Set to ${theme} mode.`}
                 </p>
            </div>
        </section>

        {/* Data Management Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-red-50/50 dark:bg-red-900/10">
                <h2 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                    <AlertTriangle size={18} />
                    Danger Zone
                </h2>
            </div>
            <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Reset Everything</p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-md">Delete all projects, tasks, and history. This action cannot be undone and will wipe your entire local workspace.</p>
                    </div>
                    <button 
                        onClick={handleReset}
                        className="w-full sm:w-auto px-6 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 rounded-lg text-sm font-semibold transition-all border border-red-200 dark:border-red-900 shadow-sm flex-shrink-0"
                    >
                        Reset Everything
                    </button>
                </div>
            </div>
        </section>

        <div className="text-center text-xs text-gray-400 mt-8">
            TABA Discovery v1.0.0
        </div>
      </div>
    </div>
  );
};
