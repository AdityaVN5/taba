import React, { useState } from 'react';
import { 
  Layout, 
  Search, 
  Plus, 
  Filter, 
  Target, 
  Clock,
  Settings,
  Users,
  FolderOpen,
  Star,
  Monitor,
  PanelLeftClose,
  LogOut,
  RotateCcw,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useTaskStore } from '../store/useTaskStore';
import { TaskBoard } from './TaskBoard';
import { ActivityLogView } from './ActivityLogView';

// --- Shared Components ---

// Sidebar Item Component
const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active = false, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active?: boolean, 
  onClick?: () => void 
}) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-accent-yellow/20 text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5'}`}
  >
    <Icon size={18} className={active ? 'text-gray-900 dark:text-white' : ''} />
    <span className="text-sm">{label}</span>
  </div>
);

// --- Main Dashboard Component ---

export const Dashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('board');
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const resetBoard = useTaskStore((state) => state.resetBoard);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleResetBoard = () => {
    if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
      resetBoard();
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'board': return <TaskBoard />;
      case 'activity': return <ActivityLogView />;
      default: return <TaskBoard />; 
    }
  };

  return (
    <div className="flex h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0 opacity-0'
        } border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex-shrink-0 flex flex-col transition-all duration-300 overflow-hidden`}
      >
        
        {/* Search and Collapse Header */}
        <div className="px-3 pt-4 pb-0 flex items-center gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                <input
                    type="text"
                    placeholder="Search"
                    disabled
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-yellow transition-all cursor-not-allowed opacity-60"
                />
            </div>
            <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
                title="Collapse Sidebar"
            >
                <PanelLeftClose size={16} />
            </button>
        </div>

        {/* Branding */}
        <div className="px-5 py-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-accent-yellow rounded-md flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-xs text-black">TD</span>
            </div>
            <span className="font-semibold text-sm whitespace-nowrap">Task Board</span>
        </div>

        <div className="px-3 mb-4">
            <button className="w-full bg-primary dark:bg-white text-white dark:text-black py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <Plus size={16} /> Create Project
            </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          <SidebarItem icon={Layout} label="Task Board" active={currentView === 'board'} onClick={() => setCurrentView('board')} />
          <SidebarItem icon={Activity} label="Activity Log" active={currentView === 'activity'} onClick={() => setCurrentView('activity')} />
          <SidebarItem icon={Clock} label="Recent" active={currentView === 'recent'} onClick={() => setCurrentView('board')} />
          <SidebarItem icon={Star} label="Starred" active={currentView === 'starred'} onClick={() => setCurrentView('board')} />
          
          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-500 uppercase">Views</div>
          <SidebarItem icon={Filter} label="Filters" active={currentView === 'filters'} onClick={() => setCurrentView('board')} />
          <SidebarItem icon={Monitor} label="Dashboards" active={currentView === 'dashboards'} onClick={() => setCurrentView('board')} />
          <SidebarItem icon={Users} label="Teams" active={currentView === 'teams'} onClick={() => setCurrentView('board')} />
          <SidebarItem icon={Settings} label="Settings" active={currentView === 'settings'} onClick={() => setCurrentView('board')} />
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
            <button 
                onClick={handleResetBoard}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
                <RotateCcw size={16} /> Reset Board
            </button>

            <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs flex-shrink-0">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                </div>
            </div>
            
            <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
            >
                <LogOut size={16} /> Logout
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-900 overflow-auto relative">
        {!isSidebarOpen && (
             <button
                onClick={() => setSidebarOpen(true)}
                className="absolute left-4 top-4 z-50 p-2 bg-white dark:bg-gray-800 shadow-md rounded-md hover:scale-105 transition-transform"
            >
                <Layout size={20} />
            </button>
        )}
        {renderContent()}
      </main>
    </div>
  );
};