interface LoginPageProps {
  onLogin?: () => void;
  onBack?: () => void;
}

import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password, remember);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[700px] flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      {/* Back Link */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl p-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Welcome Back</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center text-sm">Please sign in to your TABA account</p>

        {error && (
            <div className="w-full mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} />
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="intern@demo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-yellow/50 transition-all text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-yellow/50 transition-all text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-1 pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-accent-yellow focus:ring-accent-yellow transition-all" 
              />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium group-hover:text-gray-900 dark:group-hover:text-gray-200">Remember me</span>
            </label>
            <a href="#" className="text-xs text-gray-900 dark:text-gray-300 font-bold hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-accent-yellow text-gray-900 font-bold rounded-xl hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-accent-yellow/20 text-sm tracking-wide mt-4 flex justify-center items-center"
          >
            {isLoading ? 'Signing In...' : 'Log In'}
          </button>
        </form>

        <p className="mt-8 text-xs text-gray-600 dark:text-gray-400">
          Don't have an account? <a href="#" className="text-gray-900 dark:text-white font-bold hover:underline ml-1">Sign up</a>
        </p>
      </div>
    </div>
  );
};