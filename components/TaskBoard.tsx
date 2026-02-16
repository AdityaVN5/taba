import React, { useState, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { useTaskStore, Task, TaskStatus, TaskPriority } from '../store/useTaskStore';
import { Column } from './Column';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { Search, Filter, ArrowUpDown, Plus, Grid, Edit2, Trash2, Palette, ListFilter, X, Check } from 'lucide-react';
import { createPortal } from 'react-dom';
import { ContextMenu } from './ContextMenu';

export const TaskBoard: React.FC = () => {
  const { 
    tasks, 
    projects, 
    currentProjectId, 
    moveTask, 
    updateTask, 
    updateProject 
  } = useTaskStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'All'>('All');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priorityHighToLow' | 'priorityLowToHigh' | 'default'>('default');
  const [taskContextMenu, setTaskContextMenu] = useState<{ x: number; y: number; task: Task } | null>(null);
  const [boardContextMenu, setBoardContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [activeSortPopoverOpen, setActiveSortPopoverOpen] = useState(false);

  const currentProject = useMemo(() => 
    projects.find(p => p.id === currentProjectId), 
    [projects, currentProjectId]
  );

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Filter and Sort Logic
  const filteredTasks = useMemo(() => {
    let result = tasks.filter(t => t.projectId === currentProjectId); // Filter by Project!

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(lowerQuery) ||
          t.description?.toLowerCase().includes(lowerQuery)
      );
    }

    if (priorityFilter !== 'All') {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    if (sortBy === 'dueDate') {
      result = [...result].sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    } else if (sortBy === 'priorityHighToLow' || sortBy === 'priorityLowToHigh') {
      const priorityWeight = { High: 3, Medium: 2, Low: 1 };
      result = [...result].sort((a, b) => {
        const weightA = priorityWeight[a.priority];
        const weightB = priorityWeight[b.priority];
        return sortBy === 'priorityHighToLow' ? weightB - weightA : weightA - weightB;
      });
    }

    return result;
  }, [tasks, searchQuery, priorityFilter, sortBy, currentProjectId]);

  const columns: TaskStatus[] = ['Todo', 'Doing', 'Done'];

  // DnD Handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTask) return;

    // Dropping on a column (empty or not)
    if (columns.includes(overId as TaskStatus)) {
        if (activeTask.status !== overId) {
             moveTask(activeId, overId as TaskStatus);
        }
    } else if (overTask && activeTask.status !== overTask.status) {
        // Dropping on a task in a different column
        moveTask(activeId, overTask.status);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
  };

  const [modalStatus, setModalStatus] = useState<TaskStatus>('Todo');

  const handleCreateTask = (status?: TaskStatus) => {
    setEditingTask(null);
    setModalStatus(status || 'Todo');
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };
  
  const handleDeleteTask = (id: string) => {
      useTaskStore.getState().deleteTask(id);
  }

  const handleTaskContextMenu = (e: React.MouseEvent, task: Task) => {
      e.preventDefault();
      e.stopPropagation();
      setTaskContextMenu({ x: e.clientX, y: e.clientY, task });
  };

  const handleBoardContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setBoardContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeTaskContextMenu = () => setTaskContextMenu(null);
  const closeBoardContextMenu = () => setBoardContextMenu(null);

  const changeBoardColor = (color: string) => {
      if (currentProjectId) {
          updateProject(currentProjectId, { boardColor: color });
      }
      closeBoardContextMenu();
  };

  const activeTask = tasks.find((t) => t.id === activeId);

  return (
    <div 
        className="flex flex-col h-full relative transition-colors duration-500 min-h-screen"
        style={{ backgroundColor: currentProject?.boardColor || 'transparent' }}
        onContextMenu={handleBoardContextMenu}
    >
      {/* Header / Toolbar */}
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex flex-col gap-4">
              
              {/* Top Row: Search (Left) + New Task (Right) */}
              <div className="flex items-center justify-between gap-4">
                  <div className="relative w-full max-w-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="text-gray-400" size={16} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search tasks..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-yellow/50 transition-all dark:text-white shadow-sm"
                    />
                  </div>

                  <button 
                    onClick={handleCreateTask}
                    className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-md active:scale-95 whitespace-nowrap"
                  >
                    <Plus size={18} strokeWidth={3} /> New Task
                  </button>
              </div>

            {/* Filters Row */}
            <div className="flex items-center justify-between gap-4 pr-2">
                 {/* Scrollable Filters */}
                 <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide flex-1">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Filter:</span>
                      
                      {['All', 'High', 'Medium', 'Low'].map((p) => {
                          const isSelected = priorityFilter === p;
                          return (
                             <button
                                 key={p}
                                 onClick={() => setPriorityFilter(p as any)}
                                 className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                                     isSelected 
                                     ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-transparent shadow-md transform scale-105' 
                                     : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                 }`}
                             >
                                 {p} Priority
                             </button>
                          );
                      })}
                 </div>

                 {/* Non-scrollable Sort Controls */}
                 <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2 flex-shrink-0" />

                      {/* Sort Icon Dropdown */}
                      <div className="relative">
                          <button 
                             onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                             className={`p-1.5 rounded-full border transition-all ${
                                 isSortDropdownOpen
                                 ? 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                                 : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                             }`}
                             title="Sort Tasks"
                          >
                             <ListFilter size={16} className="text-gray-600 dark:text-gray-400" />
                          </button>

                          {isSortDropdownOpen && (
                              <div className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-1 z-[60] animate-in fade-in slide-in-from-top-2">
                                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 mb-1">
                                      Sort By
                                  </div>
                                  
                                  <button
                                     onClick={() => { setSortBy('dueDate'); setIsSortDropdownOpen(false); }}
                                     className="flex items-center justify-between w-full px-2 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg text-left"
                                  >
                                      <span>Due Date</span>
                                      {sortBy === 'dueDate' && <Check size={14} className="text-accent-yellow" />}
                                  </button>

                                  <button
                                     onClick={() => { setSortBy('priorityHighToLow'); setIsSortDropdownOpen(false); }}
                                     className="flex items-center justify-between w-full px-2 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg text-left"
                                  >
                                      <span>Priority (High to Low)</span>
                                      {sortBy === 'priorityHighToLow' && <Check size={14} className="text-accent-yellow" />}
                                  </button>

                                  <button
                                     onClick={() => { setSortBy('priorityLowToHigh'); setIsSortDropdownOpen(false); }}
                                     className="flex items-center justify-between w-full px-2 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg text-left"
                                  >
                                      <span>Priority (Low to High)</span>
                                      {sortBy === 'priorityLowToHigh' && <Check size={14} className="text-accent-yellow" />}
                                  </button>
                              </div>
                          )}
                      </div>

                      {/* Active Sort Pill */}
                      {sortBy !== 'default' && (
                         <div className="relative">
                             <button
                                 onClick={() => setActiveSortPopoverOpen(!activeSortPopoverOpen)}
                                 className="bg-accent-yellow text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-md transform scale-105 flex items-center gap-1.5 animate-in fade-in zoom-in duration-200 whitespace-nowrap"
                             >
                                 {sortBy === 'dueDate' && <ArrowUpDown size={12} />}
                                 {sortBy === 'priorityHighToLow' && 'Priority (High → Low)'}
                                 {sortBy === 'priorityLowToHigh' && 'Priority (Low → High)'}
                                 {sortBy === 'dueDate' && 'Due Date'}
                             </button>
                             
                             {/* Delete Sort Popover */}
                             {activeSortPopoverOpen && (
                                 <div className="absolute top-full mt-2 right-0 w-max bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-1 z-[60] animate-in fade-in slide-in-from-top-2">
                                     <button
                                         onClick={() => {
                                             setSortBy('default');
                                             setActiveSortPopoverOpen(false);
                                         }}
                                         className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg w-full text-left"
                                     >
                                         <X size={12} /> Clear Sort
                                     </button>
                                 </div>
                             )}
                         </div>
                      )}
                 </div>
            </div>
         </div>
      </div>

      {/* Board Area */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 overflow-x-auto p-6">
           <div className="flex gap-6 min-w-[800px] h-full">
              {columns.map((status) => (
                <Column
                  key={status}
                  id={status}
                  title={status}
                  tasks={filteredTasks.filter((t) => t.status === status)}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onAddTask={handleCreateTask}
                  onContextMenu={handleTaskContextMenu}
                />
              ))}
           </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} onEdit={() => {}} onDelete={() => {}} onContextMenu={() => {}} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={editingTask}
        initialStatus={modalStatus}
      />

      {taskContextMenu && (
          <ContextMenu
            x={taskContextMenu.x}
            y={taskContextMenu.y}
            onClose={closeTaskContextMenu}
            options={[
                { label: 'Edit Task', icon: <Edit2 size={14} />, onClick: () => handleEditTask(taskContextMenu.task) },
                { 
                    label: 'Background Color', 
                    icon: <Palette size={14} />, 
                    options: [
                        { label: 'Default', icon: <div className="w-3 h-3 rounded-full bg-white border border-gray-200" />, onClick: () => updateTask(taskContextMenu.task.id, { backgroundColor: undefined }) },
                        { label: 'Soft Red', icon: <div className="w-3 h-3 rounded-full bg-red-50 border border-red-200" />, onClick: () => updateTask(taskContextMenu.task.id, { backgroundColor: '#fef2f2' }) },
                        { label: 'Soft Blue', icon: <div className="w-3 h-3 rounded-full bg-blue-50 border border-blue-200" />, onClick: () => updateTask(taskContextMenu.task.id, { backgroundColor: '#eff6ff' }) },
                        { label: 'Soft Green', icon: <div className="w-3 h-3 rounded-full bg-green-50 border border-green-200" />, onClick: () => updateTask(taskContextMenu.task.id, { backgroundColor: '#f0fdf4' }) },
                        { label: 'Soft Yellow', icon: <div className="w-3 h-3 rounded-full bg-yellow-50 border border-yellow-200" />, onClick: () => updateTask(taskContextMenu.task.id, { backgroundColor: '#fefce8' }) },
                        { label: 'Soft Purple', icon: <div className="w-3 h-3 rounded-full bg-purple-50 border border-purple-200" />, onClick: () => updateTask(taskContextMenu.task.id, { backgroundColor: '#f5f3ff' }) },
                        { label: 'Soft Orange', icon: <div className="w-3 h-3 rounded-full bg-orange-50 border border-orange-200" />, onClick: () => updateTask(taskContextMenu.task.id, { backgroundColor: '#fff7ed' }) },
                        { label: 'Soft Pink', icon: <div className="w-3 h-3 rounded-full bg-pink-50 border border-pink-200" />, onClick: () => updateTask(taskContextMenu.task.id, { backgroundColor: '#fdf2f8' }) },
                        { label: 'Soft Teal', icon: <div className="w-3 h-3 rounded-full bg-teal-50 border border-teal-200" />, onClick: () => updateTask(taskContextMenu.task.id, { backgroundColor: '#f0fdfa' }) },
                    ]
                },
                { label: 'Delete Task', icon: <Trash2 size={14} />, color: 'text-red-500', onClick: () => handleDeleteTask(taskContextMenu.task.id) }
            ]}
          />
      )}

      {boardContextMenu && (
          <ContextMenu
            x={boardContextMenu.x}
            y={boardContextMenu.y}
            onClose={closeBoardContextMenu}
            options={[
                { label: 'Default Background', icon: <Palette size={14} />, onClick: () => changeBoardColor('') },
                { label: 'Slate Background', icon: <div className="w-3 h-3 rounded-full bg-slate-50 dark:bg-slate-900 border border-gray-200" />, onClick: () => changeBoardColor('#f8fafc') },
                { label: 'Gray Background', icon: <div className="w-3 h-3 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200" />, onClick: () => changeBoardColor('#f3f4f6') },
                { label: 'Soft Blue', icon: <div className="w-3 h-3 rounded-full bg-blue-50 dark:bg-blue-900 border border-gray-200" />, onClick: () => changeBoardColor('#eff6ff') },
                { label: 'Soft Amber', icon: <div className="w-3 h-3 rounded-full bg-amber-50 dark:bg-amber-900 border border-gray-200" />, onClick: () => changeBoardColor('#fffbeb') },
            ]}
          />
      )}
    </div>
  );
};
