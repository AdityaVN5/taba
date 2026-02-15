import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { useActivityLogStore } from './useActivityLogStore';

export type TaskStatus = 'Todo' | 'Doing' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null; // ISO string
  tags: string[];
  createdAt: string; // ISO string
}

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: TaskStatus) => void;
  resetBoard: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (task) => {
        const newTask = {
          ...task,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
        useActivityLogStore.getState().logActivity('create', `Created task "${task.title}"`);
      },
      updateTask: (id, updates) => {
        const task = get().tasks.find((t) => t.id === id);
        if (task) {
           set((state) => ({
            tasks: state.tasks.map((t) =>
              t.id === id ? { ...t, ...updates } : t
            ),
          }));
          useActivityLogStore.getState().logActivity('edit', `Updated task "${task.title}"`);
        }
      },
      deleteTask: (id) => {
        const task = get().tasks.find((t) => t.id === id);
        if (task) {
          set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== id),
          }));
          useActivityLogStore.getState().logActivity('delete', `Deleted task "${task.title}"`);
        }
      },
      moveTask: (id, newStatus) => {
        const task = get().tasks.find((t) => t.id === id);
        if (task && task.status !== newStatus) {
           set((state) => ({
            tasks: state.tasks.map((t) =>
              t.id === id ? { ...t, status: newStatus } : t
            ),
          }));
          useActivityLogStore.getState().logActivity('move', `Moved task "${task.title}" to ${newStatus}`);
        }
      },
      resetBoard: () => {
        set({ tasks: [] });
        useActivityLogStore.getState().logActivity('reset', 'Reset the board');
      },
    }),
    {
      name: 'task-storage',
    }
  )
);
