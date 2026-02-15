import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '../store/useTaskStore';
import { TaskCard } from './TaskCard';
import { Plus, MoreHorizontal } from 'lucide-react';
import { clsx } from 'clsx';

interface ColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: () => void;
}

export const Column: React.FC<ColumnProps> = ({ id, title, tasks, onEditTask, onDeleteTask, onAddTask }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const statusColors = {
    Todo: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700',
    Doing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    Done: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800'
  };

  return (
    <div className="flex-1 min-w-[300px] flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <span className={clsx("px-3 py-1 rounded-full text-xs font-bold border", statusColors[id])}>
          {title} <span className="ml-1 opacity-60">({tasks.length})</span>
        </span>
        <div className="flex items-center gap-1 text-gray-400">
           <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><MoreHorizontal size={16} /></button>
           <button onClick={onAddTask} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><Plus size={16} /></button>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={clsx(
          "flex-1 rounded-xl transition-colors p-2 -mx-2",
          isOver ? "bg-gray-50/50 dark:bg-gray-800/30 ring-2 ring-dashed ring-accent-yellow/50" : ""
        )}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </SortableContext>
        
        {tasks.length === 0 && (
            <div className="h-24 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center text-gray-400 text-sm mt-2">
                Drop tasks here
            </div>
        )}
      </div>
    </div>
  );
};
