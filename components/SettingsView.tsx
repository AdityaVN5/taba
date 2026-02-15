import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Trash2, Moon, Sun, Monitor, AlertTriangle } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const resetBoard = useTaskStore((state) => state.resetBoard);

  const handleReset = () => {
    if (confirm('Are you sure you want to completely, irreversibly wipe all data?')) {
      resetBoard();
      alert('Board reset complete.');
      window.location.reload(); 
    }
  };

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
                     <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                         <button className="p-2 rounded-md bg-white dark:bg-gray-600 shadow-sm">
                             <Sun size={16} />
                         </button>
                         <button className="p-2 rounded-md text-gray-500 dark:text-gray-400">
                             <Moon size={16} />
                         </button>
                          <button className="p-2 rounded-md text-gray-500 dark:text-gray-400">
                             <Monitor size={16} />
                         </button>
                     </div>
                 </div>
                 <p className="text-xs text-gray-400 mt-4 italic">Theme switching is currently synced with your system preferences or manual toggle in the navbar.</p>
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
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Reset Workspace</p>
                        <p className="text-xs text-gray-500 mt-1">Delete all projects, tasks, and history. This action cannot be undone.</p>
                    </div>
                    <button 
                        onClick={handleReset}
                        className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 rounded-lg text-sm font-medium transition-colors border border-red-200 dark:border-red-900"
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
