import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type ActivityAction = 'create' | 'edit' | 'move' | 'delete' | 'reset';

export interface Activity {
  id: string;
  action: ActivityAction;
  details: string;
  timestamp: string; // ISO string
}

interface ActivityLogState {
  activities: Activity[];
  logActivity: (action: ActivityAction, details: string) => void;
  clearLog: () => void;
}

export const useActivityLogStore = create<ActivityLogState>()(
  persist(
    (set) => ({
      activities: [],
      logActivity: (action, details) =>
        set((state) => ({
          activities: [
            {
              id: uuidv4(),
              action,
              details,
              timestamp: new Date().toISOString(),
            },
            ...state.activities,
          ].slice(0, 50), // Keep last 50 activities
        })),
      clearLog: () => set({ activities: [] }),
    }),
    {
      name: 'activity-log-storage',
    }
  )
);
