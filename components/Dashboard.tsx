import React, { useState } from 'react';
import { 
  Layout, 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Rocket, 
  TrendingUp, 
  Target, 
  Heart, 
  Clock,
  List,
  Grid,
  Settings,
  Users,
  BarChart2,
  FolderOpen,
  Star,
  Zap,
  Monitor,
  PanelLeftClose,
  PanelLeftOpen,
  CheckCircle2,
  AlertCircle,
  PieChart
} from 'lucide-react';

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

// Kanban Card Component
interface CardProps {
  title: string;
  description: string;
  impact: number;
  theme: string;
  themeColor: string;
  themeIcon: any;
}

const KanbanCard = ({ title, description, impact, theme, themeColor, themeIcon: Icon }: CardProps) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer group">
    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-accent-yellow transition-colors">{title}</h3>
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{description}</p>
    
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500 dark:text-gray-400">Impact score</span>
        <span className={`font-bold ${impact > 80 ? 'text-green-500' : impact > 40 ? 'text-orange-500' : 'text-red-500'}`}>{impact}</span>
      </div>
      
      <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
        <span className="text-gray-400">Theme</span>
        <div className="flex items-center gap-1 ml-auto">
          <Icon size={12} className={themeColor} />
          <span>{theme}</span>
        </div>
      </div>
    </div>
  </div>
);

// --- Props Interface for Views ---
interface ViewProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

// --- View Components ---

const ToggleButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="p-1.5 mr-3 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
    title="Open Sidebar"
  >
    <PanelLeftOpen size={20} />
  </button>
);

const RecentView = ({ isSidebarOpen, onToggleSidebar }: ViewProps) => (
  <div className="p-8 max-w-4xl">
    <div className="flex items-center mb-6">
        {!isSidebarOpen && <ToggleButton onClick={onToggleSidebar} />}
        <h2 className="text-2xl font-bold flex items-center gap-2"><Clock className="text-gray-400" /> Recent Activity</h2>
    </div>
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {[
        { title: 'My new idea', type: 'Idea', time: '2 hours ago' },
        { title: 'New Pro plan', type: 'Feature', time: '5 hours ago' },
        { title: 'Q3 Goals', type: 'Goal', time: 'Yesterday' },
        { title: 'Marketing Sync', type: 'Meeting', time: '2 days ago' },
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
               <FileIcon type={item.type} />
             </div>
             <div>
               <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
               <p className="text-xs text-gray-500">Viewed {item.time}</p>
             </div>
          </div>
          <button className="text-sm text-accent-yellow font-medium">Open</button>
        </div>
      ))}
    </div>
  </div>
);

const StarredView = ({ isSidebarOpen, onToggleSidebar }: ViewProps) => (
   <div className="p-8 max-w-4xl">
    <div className="flex items-center mb-6">
        {!isSidebarOpen && <ToggleButton onClick={onToggleSidebar} />}
        <h2 className="text-2xl font-bold flex items-center gap-2"><Star className="text-accent-yellow fill-accent-yellow" /> Starred Items</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { title: 'New rewards program', desc: 'Gamification elements for daily users.' },
        { title: 'Refactor user profile', desc: 'Optimize database queries for faster load.' },
        { title: 'Q4 Strategy', desc: 'High level overview of upcoming quarter.' },
      ].map((item, i) => (
         <div key={i} className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <Star size={18} className="text-accent-yellow fill-accent-yellow" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
         </div>
      ))}
    </div>
  </div>
);

const AllProjectsView = ({ isSidebarOpen, onToggleSidebar }: ViewProps) => (
  <div className="p-8">
     <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
            {!isSidebarOpen && <ToggleButton onClick={onToggleSidebar} />}
            <h2 className="text-2xl font-bold flex items-center gap-2"><FolderOpen className="text-gray-400" /> All Projects</h2>
        </div>
        <button className="bg-primary dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <Plus size={16} /> New Project
        </button>
     </div>
     <div className="overflow-x-auto">
       <table className="w-full text-left border-collapse">
         <thead>
           <tr className="border-b border-gray-200 dark:border-gray-700">
             <th className="py-3 px-4 text-sm font-semibold text-gray-500">Name</th>
             <th className="py-3 px-4 text-sm font-semibold text-gray-500">Key</th>
             <th className="py-3 px-4 text-sm font-semibold text-gray-500">Lead</th>
             <th className="py-3 px-4 text-sm font-semibold text-gray-500">Status</th>
           </tr>
         </thead>
         <tbody>
           {[
             { name: 'Mobile App Redesign', key: 'MAR', lead: 'Sarah C.', status: 'Active' },
             { name: 'Web Platform', key: 'WEB', lead: 'Mike R.', status: 'Active' },
             { name: 'Internal Tools', key: 'INT', lead: 'David K.', status: 'Maintenance' },
             { name: 'Marketing Site', key: 'MKT', lead: 'Jenny L.', status: 'Planning' },
           ].map((row, i) => (
             <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
               <td className="py-3 px-4 font-medium">{row.name}</td>
               <td className="py-3 px-4 text-gray-500 text-sm">{row.key}</td>
               <td className="py-3 px-4 flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                   {row.lead.charAt(0)}
                 </div>
                 {row.lead}
               </td>
               <td className="py-3 px-4">
                 <span className={`px-2 py-1 rounded text-xs font-medium ${
                   row.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                   row.status === 'Planning' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                   'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                 }`}>
                   {row.status}
                 </span>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
  </div>
);

const FiltersView = ({ isSidebarOpen, onToggleSidebar }: ViewProps) => (
  <div className="p-8 max-w-2xl">
    <div className="flex items-center mb-6">
        {!isSidebarOpen && <ToggleButton onClick={onToggleSidebar} />}
        <h2 className="text-2xl font-bold flex items-center gap-2"><Filter className="text-gray-400" /> Saved Filters</h2>
    </div>
    <div className="space-y-4">
      {['High Impact Items', 'Assigned to Me', 'Next Release Candidates', 'Stale Ideas'].map((filter, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <span className="font-medium">{filter}</span>
          <div className="flex gap-2">
            <button className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">Edit</button>
            <button className="text-sm text-red-500 hover:text-red-600">Delete</button>
          </div>
        </div>
      ))}
      <button className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500 font-medium hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
        + Create New Filter
      </button>
    </div>
  </div>
);

const DashboardsView = ({ isSidebarOpen, onToggleSidebar }: ViewProps) => (
  <div className="p-8">
    <div className="flex items-center mb-6">
        {!isSidebarOpen && <ToggleButton onClick={onToggleSidebar} />}
        <h2 className="text-2xl font-bold flex items-center gap-2"><Monitor className="text-gray-400" /> Executive Dashboards</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-500 text-sm font-medium mb-1">Total Velocity</h3>
        <div className="text-3xl font-bold mb-4">124 <span className="text-green-500 text-sm font-medium">+12%</span></div>
        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 w-3/4"></div>
        </div>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-500 text-sm font-medium mb-1">Ideas Captured</h3>
        <div className="text-3xl font-bold mb-4">856 <span className="text-gray-400 text-sm font-medium">total</span></div>
        <div className="flex items-center gap-2 mt-2">
           <span className="w-3 h-3 rounded-full bg-purple-500"></span> <span className="text-xs text-gray-500">New</span>
           <span className="w-3 h-3 rounded-full bg-blue-500"></span> <span className="text-xs text-gray-500">Validated</span>
        </div>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-500 text-sm font-medium mb-1">Team Health</h3>
        <div className="text-3xl font-bold mb-4">98% <span className="text-green-500 text-sm font-medium">Excellent</span></div>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(n => <div key={n} className="h-8 w-2 bg-green-400 rounded-sm"></div>)}
        </div>
      </div>
    </div>
  </div>
);

const TeamsView = ({ isSidebarOpen, onToggleSidebar }: ViewProps) => (
  <div className="p-8 max-w-4xl">
    <div className="flex items-center mb-6">
        {!isSidebarOpen && <ToggleButton onClick={onToggleSidebar} />}
        <h2 className="text-2xl font-bold flex items-center gap-2"><Users className="text-gray-400" /> Teams</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       {['Engineering', 'Product Design', 'Marketing', 'Customer Success', 'Sales', 'Data Science'].map((team, i) => (
         <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-accent-yellow transition-colors cursor-pointer">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl
              ${i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-purple-500' : 'bg-pink-500'}
            `}>
              {team.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold">{team}</h3>
              <p className="text-xs text-gray-500">12 Members • 4 Active Projects</p>
            </div>
         </div>
       ))}
    </div>
  </div>
);

const GoalsView = ({ isSidebarOpen, onToggleSidebar }: ViewProps) => (
  <div className="p-8 max-w-3xl">
    <div className="flex items-center mb-6">
        {!isSidebarOpen && <ToggleButton onClick={onToggleSidebar} />}
        <h2 className="text-2xl font-bold flex items-center gap-2"><Target className="text-gray-400" /> Quarterly Goals</h2>
    </div>
    <div className="space-y-6">
      {[
        { title: 'Increase Annual Recurring Revenue by 20%', progress: 65, color: 'bg-green-500' },
        { title: 'Launch Mobile Application v2.0', progress: 40, color: 'bg-blue-500' },
        { title: 'Reduce Customer Churn to < 2%', progress: 85, color: 'bg-purple-500' },
        { title: 'Hire 5 Senior Engineers', progress: 20, color: 'bg-orange-500' },
      ].map((goal, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
           <div className="flex justify-between items-end mb-2">
             <h3 className="font-medium text-lg">{goal.title}</h3>
             <span className="font-bold text-lg">{goal.progress}%</span>
           </div>
           <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
             <div className={`h-full ${goal.color} transition-all duration-1000 ease-out`} style={{ width: `${goal.progress}%` }}></div>
           </div>
           <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><CheckCircle2 size={12} /> On Track</span>
              <span className="flex items-center gap-1"><Clock size={12} /> Due in 34 days</span>
           </div>
        </div>
      ))}
    </div>
  </div>
);

const ProductRoadmapView = ({ isSidebarOpen, onToggleSidebar }: ViewProps) => (
    <div className="flex flex-col h-full">
         {/* Header */}
         <header className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
                {!isSidebarOpen && <ToggleButton onClick={onToggleSidebar} />}
                <h1 className="text-xl font-bold">Product roadmap</h1>
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium text-gray-500">7</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><Monitor size={18} /></button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><Settings size={18} /></button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><MoreHorizontal size={18} /></button>
            </div>
        </header>

        {/* Toolbar */}
        <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 space-y-4 flex-shrink-0">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Find an idea in this view" 
                    className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-yellow transition-all"
                />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Grid size={14} /> Columns
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Group by <Plus size={14} className="text-gray-400" />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Filter <Plus size={14} className="text-gray-400" />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Fields
                </button>
            </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto p-6">
            <div className="flex gap-6 min-w-[800px]">
                
                {/* Column: Todo */}
                <div className="flex-1 min-w-[280px]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700">Todo</span>
                        <div className="flex items-center gap-1 text-gray-400">
                            <MoreHorizontal size={16} />
                            <Plus size={16} />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <KanbanCard 
                            title="My new idea" 
                            description="Research phase complete for core functionality."
                            impact={100}
                            theme="Expand horizons"
                            themeColor="text-orange-500"
                            themeIcon={Rocket}
                        />
                        <KanbanCard 
                            title="New Pro plan" 
                            description="Pricing tier restructuring for Q3."
                            impact={40}
                            theme="Increase revenue"
                            themeColor="text-green-500"
                            themeIcon={TrendingUp}
                        />
                        <KanbanCard 
                            title="Customize theme" 
                            description="Allow users to toggle dark mode."
                            impact={55}
                            theme="Delight users"
                            themeColor="text-blue-500"
                            themeIcon={Heart}
                        />
                    </div>
                </div>

                {/* Column: Doing */}
                <div className="flex-1 min-w-[280px]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">Doing</span>
                        <div className="flex items-center gap-1 text-gray-400">
                            <MoreHorizontal size={16} />
                            <Plus size={16} />
                        </div>
                    </div>
                    <div className="space-y-3">
                         <KanbanCard 
                            title="New rewards program" 
                            description="Gamification elements for daily users."
                            impact={40}
                            theme="Increase revenue"
                            themeColor="text-green-500"
                            themeIcon={TrendingUp}
                        />
                         <KanbanCard 
                            title="Refactor user profile" 
                            description="Optimize database queries."
                            impact={76}
                            theme="Increase revenue"
                            themeColor="text-green-500"
                            themeIcon={TrendingUp}
                        />
                         <KanbanCard 
                            title="New dashboard section" 
                            description="Add analytics widgets."
                            impact={96}
                            theme="Win enterprise"
                            themeColor="text-purple-500"
                            themeIcon={Target}
                        />
                    </div>
                </div>

                {/* Column: Done */}
                <div className="flex-1 min-w-[280px]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800">Done</span>
                        <div className="flex items-center gap-1 text-gray-400">
                            <MoreHorizontal size={16} />
                            <Plus size={16} />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <KanbanCard 
                            title="Express checkout" 
                            description="One-click purchasing flow."
                            impact={17}
                            theme="Win enterprise"
                            themeColor="text-purple-500"
                            themeIcon={Target}
                        />
                        <KanbanCard 
                            title="Review AI credits price" 
                            description="Market analysis for 2024 pricing."
                            impact={100}
                            theme="Increase revenue"
                            themeColor="text-green-500"
                            themeIcon={TrendingUp}
                        />
                         <KanbanCard 
                            title="Improve waiting list" 
                            description="Currently low priority."
                            impact={83}
                            theme="Delight users"
                            themeColor="text-blue-500"
                            themeIcon={Heart}
                        />
                    </div>
                </div>

            </div>
        </div>
    </div>
);

const FileIcon = ({ type }: { type: string }) => {
  if (type === 'Idea') return <Zap size={20} className="text-orange-500" />;
  if (type === 'Feature') return <Rocket size={20} className="text-blue-500" />;
  if (type === 'Goal') return <Target size={20} className="text-green-500" />;
  return <List size={20} className="text-gray-500" />;
};

// --- Main Dashboard Component ---

export const Dashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('roadmap');

  const renderContent = () => {
    const props = { isSidebarOpen, onToggleSidebar: () => setSidebarOpen(true) };
    
    switch (currentView) {
      case 'recent': return <RecentView {...props} />;
      case 'starred': return <StarredView {...props} />;
      case 'all_projects': return <AllProjectsView {...props} />;
      case 'roadmap': return <ProductRoadmapView {...props} />;
      case 'filters': return <FiltersView {...props} />;
      case 'dashboards': return <DashboardsView {...props} />;
      case 'teams': return <TeamsView {...props} />;
      case 'goals': return <GoalsView {...props} />;
      default: return <ProductRoadmapView {...props} />;
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
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-yellow transition-all"
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
            <span className="font-semibold text-sm whitespace-nowrap">TADA Discovery</span>
        </div>

        <div className="px-3 mb-4">
            <button className="w-full bg-primary dark:bg-white text-white dark:text-black py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <Plus size={16} /> Create
            </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          <SidebarItem icon={Clock} label="Recent" active={currentView === 'recent'} onClick={() => setCurrentView('recent')} />
          <SidebarItem icon={Star} label="Starred" active={currentView === 'starred'} onClick={() => setCurrentView('starred')} />
          
          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-500 uppercase">Projects</div>
          <SidebarItem icon={FolderOpen} label="All Projects" active={currentView === 'all_projects'} onClick={() => setCurrentView('all_projects')} />
          <SidebarItem icon={Layout} label="Product roadmap" active={currentView === 'roadmap'} onClick={() => setCurrentView('roadmap')} />
          
          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-500 uppercase">Views</div>
          <SidebarItem icon={Filter} label="Filters" active={currentView === 'filters'} onClick={() => setCurrentView('filters')} />
          <SidebarItem icon={Monitor} label="Dashboards" active={currentView === 'dashboards'} onClick={() => setCurrentView('dashboards')} />
          <SidebarItem icon={Users} label="Teams" active={currentView === 'teams'} onClick={() => setCurrentView('teams')} />
          <SidebarItem icon={Target} label="Goals" active={currentView === 'goals'} onClick={() => setCurrentView('goals')} />
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs flex-shrink-0">
                VD
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Vladimir d'Ursel</p>
                <p className="text-xs text-gray-500 truncate">vlad@jpd.app</p>
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-900 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};