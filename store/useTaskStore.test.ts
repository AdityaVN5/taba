import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTaskStore } from './useTaskStore';
import { useActivityLogStore } from './useActivityLogStore';

// Mock persist middleware to avoid localStorage issues in test environment
vi.mock('zustand/middleware', () => ({
  persist: (fn: any) => (set: any, get: any, api: any) => fn(set, get, api),
}));

describe('TaskStore', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [] });
    useActivityLogStore.setState({ activities: [] });
  });

  it('should add a task', () => {
    const { addTask, tasks } = useTaskStore.getState();
    const newTask = {
      title: 'Test Task',
      description: 'Description',
      status: 'Todo' as const,
      priority: 'Medium' as const,
      dueDate: null,
      tags: [],
    };

    addTask(newTask);

    const updatedTasks = useTaskStore.getState().tasks;
    expect(updatedTasks).toHaveLength(1);
    expect(updatedTasks[0].title).toBe('Test Task');
    expect(updatedTasks[0].id).toBeDefined();
    
    // Verify log
    const activities = useActivityLogStore.getState().activities;
    expect(activities).toHaveLength(1);
    expect(activities[0].action).toBe('create');
  });

  it('should delete a task', () => {
    const { addTask } = useTaskStore.getState();
    addTask({
      title: 'Task to delete',
      description: '',
      status: 'Todo',
      priority: 'Medium',
      dueDate: null,
      tags: [],
    });

    const task = useTaskStore.getState().tasks[0];
    useTaskStore.getState().deleteTask(task.id);

    const tasks = useTaskStore.getState().tasks;
    expect(tasks).toHaveLength(0);

    // Verify log
    const activities = useActivityLogStore.getState().activities;
    expect(activities[0].action).toBe('delete');
  });

  it('should move a task', () => {
     const { addTask } = useTaskStore.getState();
     addTask({
       title: 'Task to move',
       description: '',
       status: 'Todo',
       priority: 'Medium',
       dueDate: null,
       tags: [],
     });
 
     const task = useTaskStore.getState().tasks[0];
     useTaskStore.getState().moveTask(task.id, 'Done');
 
     const updatedTask = useTaskStore.getState().tasks[0];
     expect(updatedTask.status).toBe('Done');

    // Verify log
    const activities = useActivityLogStore.getState().activities;
    expect(activities[0].action).toBe('move');
  });

  it('should reset the board', () => {
    const { addTask, resetBoard } = useTaskStore.getState();
    addTask({ title: 'Task 1', description: '', status: 'Todo', priority: 'Medium', dueDate: null, tags: [] });
    addTask({ title: 'Task 2', description: '', status: 'Doing', priority: 'High', dueDate: null, tags: [] });

    expect(useTaskStore.getState().tasks).toHaveLength(2);

    resetBoard();

    expect(useTaskStore.getState().tasks).toHaveLength(0);
    
    // Verify log
    const activities = useActivityLogStore.getState().activities;
    expect(activities[0].action).toBe('reset');
  });
});
