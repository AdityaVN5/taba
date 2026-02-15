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
import { Search, Filter, ArrowUpDown, Plus, Grid } from 'lucide-react';
import { createPortal } from 'react-dom';

export const TaskBoard: React.FC = () => {
  const { tasks, moveTask, updateTask } = useTaskStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'All'>('All');
  const [sortBy, setSortBy] = useState<'dueDate' | 'default'>('default');

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Filter and Sort Logic
  const filteredTasks = useMemo(() => {
    let result = tasks;

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
    }

    return result;
  }, [tasks, searchQuery, priorityFilter, sortBy]);

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

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };
  
  const handleDeleteTask = (id: string) => {
      useTaskStore.getState().deleteTask(id);
  }

  const activeTask = tasks.find((t) => t.id === activeId);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Header / Toolbar */}
      <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800 flex-shrink-0 space-y-3">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
             <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search tasks..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-accent-yellow transition-all dark:text-white"
                />
            </div>
            
            <div className="flex items-center gap-2">
                 <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value as any)}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none dark:text-white"
                 >
                     <option value="All">All Priorities</option>
                     <option value="High">High</option>
                     <option value="Medium">Medium</option>
                     <option value="Low">Low</option>
                 </select>

                 <button 
                    onClick={() => setSortBy(sortBy === 'default' ? 'dueDate' : 'default')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-200 dark:border-gray-700 rounded-md transition-colors ${sortBy === 'dueDate' ? 'bg-accent-yellow text-black border-accent-yellow' : 'hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white'}`}
                 >
                    <ArrowUpDown size={14} /> Due Date
                 </button>

                 <button 
                  onClick={handleCreateTask}
                  className="bg-primary dark:bg-white text-white dark:text-black px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 hover:opacity-90 transition-opacity"
                 >
                   <Plus size={14} /> New Task
                 </button>
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
                />
              ))}
           </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} onEdit={() => {}} onDelete={() => {}} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={editingTask}
      />
    </div>
  );
};
