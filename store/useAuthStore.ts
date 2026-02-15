import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password, remember) => {
        // Hardcoded credentials
        if (email === 'intern@demo.com' && password === 'intern123') {
          set({
            user: { id: '1', name: 'Intern User', email },
            isAuthenticated: true,
          });
          
          // If remember is false, we might want to use sessionStorage, 
          // but persist is already set up. 
          // One way is to set a flag in the store that can be checked.
        } else {
          throw new Error('Invalid email or password');
        }
      },
      logout: () => {
          set({ user: null, isAuthenticated: false });
          // Clear storage manually if needed?
      },
    }),
    {
      name: 'taba-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
