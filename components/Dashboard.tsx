import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Search, 
  Plus, 
  Settings, 
  PanelLeftClose, 
  LogOut, 
  Activity, 
  Folder,
  Trash2,
  Edit2,
  Palette,
  RotateCcw,
  Grid
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useTaskStore } from '../store/useTaskStore';
import { TaskBoard } from './TaskBoard';
import { ActivityLogView } from './ActivityLogView';
import { SettingsView } from './SettingsView';
import { ContextMenu } from './ContextMenu';
import { ProjectModal } from './ProjectModal';

// Sidebar Item Component
interface SidebarItemProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  color?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  active = false, 
  onClick,
  onContextMenu,
  color
}) => (
  <div 
    onClick={onClick}
    onContextMenu={onContextMenu}
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-accent-yellow/20 text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5'}`}
  >
    <Icon size={18} className={active ? 'text-gray-900 dark:text-white' : ''} style={{ color: color }} />
    <span className="text-sm truncate flex-1">{label}</span>
  </div>
);

export const Dashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('board');
  const navigate = useNavigate();
  
  // Stores
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const { 
    projects, 
    currentProjectId, 
    setCurrentProject, 
    addProject, 
    deleteProject, 
    updateProject,
    resetBoard
  } = useTaskStore();

  // Dialog State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<{ id: string, name: string, color: string } | null>(null);

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; projectId: string } | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (name: string, color: string) => {
    if (editingProject) {
      updateProject(editingProject.id, { name, color });
    } else {
      addProject(name, color);
    }
    setEditingProject(null);
  };

  const handleContextMenu = (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, projectId });
  };

  const closeContextMenu = () => setContextMenu(null);

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Delete this project and all its tasks?')) {
      deleteProject(id);
    }
  };

  const handleRenameProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
        setEditingProject({ id: project.id, name: project.name, color: project.color });
        setIsProjectModalOpen(true);
    }
  };
  
  // Kept for context menu "Change Color" quick action if needed, or redirect to modal
  const handleChangeColor = (id: string) => {
     const project = projects.find(p => p.id === id);
     if (project) {
         setEditingProject({ id: project.id, name: project.name, color: project.color });
         setIsProjectModalOpen(true);
     }
  };

  const handleResetBoard = () => {
      if(confirm("Are you sure you want to reset the entire board? This cannot be undone.")) {
          resetBoard();
      }
  }

  const renderContent = () => {
    switch (currentView) {
      case 'board': return <TaskBoard key={currentProjectId} />; 
      case 'activity': return <ActivityLogView />;
      case 'settings': return <SettingsView />;
      default: return <TaskBoard key={currentProjectId} />; 
    }
  };

  return (
    <div className="flex h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0 opacity-0'
        } border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex-shrink-0 flex flex-col transition-all duration-300 overflow-hidden relative`}
      >
        
        {/* Header */}
        <div className="px-3 pt-4 pb-2 flex items-center justify-between">
             <div className="flex items-center gap-2 px-2">
                <div className="w-6 h-6 bg-accent-yellow rounded-md flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-xs text-black">TD</span>
                </div>
                <span className="font-semibold text-sm">TABA Discovery</span>
             </div>
            <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
                <PanelLeftClose size={16} />
            </button>
        </div>

        {/* Projects Section */}
        <div className="px-4 py-2 mt-4">
             <div className="flex items-center justify-between mb-2">
                 <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects</h3>
                 <button 
                    onClick={handleCreateProject} 
                    className="p-1 bg-black text-white hover:bg-gray-800 rounded-md transition-colors shadow-sm"
                    title="New Project"
                 >
                     <Plus size={12} strokeWidth={3} />
                 </button>
             </div>
             <div className="space-y-1">
                 {projects.map(project => (
                     <SidebarItem 
                        key={project.id}
                        icon={Folder} 
                        label={project.name} 
                        color={project.color}
                        active={currentView === 'board' && currentProjectId === project.id}
                        onClick={() => {
                            setCurrentProject(project.id);
                            setCurrentView('board');
                        }}
                        onContextMenu={(e) => handleContextMenu(e, project.id)}
                     />
                 ))}
                 {projects.length === 0 && (
                     <div className="text-xs text-gray-400 italic px-2 py-1">No projects</div>
                 )}
             </div>
        </div>

        {/* Profile & Activity Section */}
        <div className="px-4 py-2 mt-4 border-t border-gray-200 dark:border-gray-800 pt-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Profile & Activity</h3>
            <div className="space-y-1">
                <SidebarItem 
                    icon={Activity} 
                    label="Activity Log" 
                    active={currentView === 'activity'} 
                    onClick={() => setCurrentView('activity')} 
                />
                 <SidebarItem 
                    icon={Settings} 
                    label="Settings" 
                    active={currentView === 'settings'} 
                    onClick={() => setCurrentView('settings')} 
                />
                <button 
                    onClick={handleResetBoard}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 dark:hover:text-red-400"
                >
                    <RotateCcw size={18} />
                    <span className="text-sm truncate flex-1 text-left">Reset Board</span>
                </button>
            </div>
        </div>
        
        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
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

      {/* Project Context Menu */}
      {contextMenu && (
        <ContextMenu 
            x={contextMenu.x} 
            y={contextMenu.y} 
            onClose={closeContextMenu}
            options={[
                { label: 'Rename Project', icon: <Edit2 size={14} />, onClick: () => handleRenameProject(contextMenu.projectId) },
                { label: 'Change Icon Color', icon: <Palette size={14} />, onClick: () => handleChangeColor(contextMenu.projectId) },
                { 
                    label: 'Board Background', 
                    icon: <Grid size={14} />, 
                    onClick: () => {
                        // Toggle to a default or open modal? 
                        // For now, let's just cycle or provide a quick way.
                        // Actually, the user asked for "predefined board background colors".
                        // I already added them to the Board itself. 
                        // I'll add them here too for consistency.
                        updateProject(contextMenu.projectId, { boardColor: '#f8fafc' });
                    } 
                },
                { label: 'Delete Project', icon: <Trash2 size={14} />, color: 'text-red-500', onClick: () => handleDeleteProject(contextMenu.projectId) },
            ]}
        />
      )}

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSubmit={handleSaveProject}
        initialName={editingProject?.name}
        initialColor={editingProject?.color}
        title={editingProject ? 'Edit Project' : 'New Project'}
      />
    </div>
  );
};