import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { useActivityLogStore } from './useActivityLogStore';

export type TaskStatus = 'Todo' | 'Doing' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Project {
  id: string;
  name: string;
  color: string;
  boardColor?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null; // ISO string
  backgroundColor?: string;
  tags: string[];
  createdAt: string; // ISO string
}

interface TaskState {
  projects: Project[];
  currentProjectId: string | null;
  tasks: Task[];
  
  // Project Actions
  addProject: (name: string, color: string) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (id: string) => void;

  // Task Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'projectId'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: TaskStatus) => void;
  resetBoard: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProjectId: null,
      tasks: [],

      // --- Project Actions ---
      addProject: (name, color) => {
        const newProject: Project = {
          id: uuidv4(),
          name,
          color,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          projects: [...state.projects, newProject],
          currentProjectId: state.currentProjectId || newProject.id, // Set as current if none selected
        }));
        useActivityLogStore.getState().logActivity('create', `Created project "${name}"`);
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) => p.id === id ? { ...p, ...updates } : p),
        }));
        useActivityLogStore.getState().logActivity('edit', `Updated project`);
      },

      deleteProject: (id) => {
        const projectToDelete = get().projects.find(p => p.id === id);
        if (!projectToDelete) return;

        set((state) => {
          const remainingProjects = state.projects.filter((p) => p.id !== id);
          const nextProject = remainingProjects.length > 0 ? remainingProjects[0].id : null;
          
          return {
            projects: remainingProjects,
            tasks: state.tasks.filter((t) => t.projectId !== id), // Cascade delete tasks
            currentProjectId: nextProject,
          };
        });
        useActivityLogStore.getState().logActivity('delete', `Deleted project "${projectToDelete.name}"`);
      },

      setCurrentProject: (id) => set({ currentProjectId: id }),

      // --- Task Actions ---
      addTask: (task) => {
        const { currentProjectId, projects } = get();
        
        // Ensure there is a project
        let targetProjectId = currentProjectId;
        if (!targetProjectId) {
            // Should not happen if we initialize correctly, but safety first
            const defaultProject: Project = { id: uuidv4(), name: 'General', color: '#6366f1', createdAt: new Date().toISOString() };
            set(state => ({ projects: [...state.projects, defaultProject], currentProjectId: defaultProject.id }));
            targetProjectId = defaultProject.id;
        }

        const newTask: Task = {
          ...task,
          id: uuidv4(),
          projectId: targetProjectId!,
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
        const { currentProjectId } = get();
        if (currentProjectId) {
          set((state) => ({
            tasks: state.tasks.filter((t) => t.projectId !== currentProjectId),
          }));
          useActivityLogStore.getState().logActivity('reset', 'Reset tasks in the current project');
        }
      },
    }),
    {
      name: 'task-storage',
      onRehydrateStorage: () => (state) => {
        // Migration logic: If no projects exist but tasks do, create a default project and assign tasks to it
        if (state) {
            if (state.projects.length === 0) {
                const defaultProject: Project = { id: uuidv4(), name: 'General', color: '#FCD535', createdAt: new Date().toISOString() };
                state.projects = [defaultProject];
                state.currentProjectId = defaultProject.id;
                
                // Assign existing tasks to this project if they don't have a projectId
                state.tasks = state.tasks.map(t => ({
                    ...t,
                    projectId: t.projectId || defaultProject.id
                }));
            } else if (!state.currentProjectId && state.projects.length > 0) {
                state.currentProjectId = state.projects[0].id;
            }
        }
      }
    }
  )
);
