import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, AlertCircle, Calendar, Tag, MoreHorizontal } from 'lucide-react';
import { Task } from '../store/useTaskStore';
import { format } from 'date-fns';
import { clsx } from 'clsx';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { task } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColor = {
    Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    Medium: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    High: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group relative",
        isDragging && "opacity-50 ring-2 ring-accent-yellow rotate-2"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", priorityColor[task.priority])}>
          {task.priority}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
             onClick={(e) => { e.stopPropagation(); onEdit(task); }}
             className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500"
           >
             <MoreHorizontal size={14} />
           </button>
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 leading-snug">{task.title}</h3>
      {task.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-2 mt-auto">
        {task.dueDate && (
          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
             <Clock size={12} />
             <span>{format(new Date(task.dueDate), 'MMM d')}</span>
          </div>
        )}
        
        {task.tags.map((tag) => (
            <div key={tag} className="flex items-center gap-1 text-[10px] text-gray-400 font-medium bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                <Tag size={10} /> {tag}
            </div>
        ))}
      </div>
      
      {/* Delete Overlay for quick action? Or context menu. Keeping it simple for now with edit button opening modal which can have delete */}
      {/* Actually I'll add a delete x button on hover for speed */}
        <button 
             onClick={(e) => { 
                 e.stopPropagation(); 
                 if(window.confirm('Delete task?')) onDelete(task.id); 
             }}
             className="absolute top-2 right-2 p-1 hover:text-red-500 rounded text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
             title="Delete"
           >
             <XAlertIcon size={14} />
       </button>
    </div>
  );
};

const XAlertIcon = ({ size }: { size: number }) => (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="lucide lucide-x"
    >
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
)
