interface LoginPageProps {
  onLogin?: () => void;
  onBack?: () => void;
}

import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('**********'); // Mock password
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/dashboard');
    }
  };

  return (
    <div className="relative w-full h-full min-h-[700px] flex items-center justify-center p-6">
      {/* Back Link */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl p-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Welcome Back</h2>
        <p className="text-gray-500 mb-10 text-center">Please sign in to your TABA account</p>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="intern@demo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-yellow/50 transition-all text-gray-900"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-yellow/50 transition-all text-gray-900"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-accent-yellow focus:ring-accent-yellow" />
              <span className="text-xs text-gray-600 font-medium">Remember me</span>
            </label>
            <a href="#" className="text-xs text-gray-900 font-bold hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-accent-yellow text-gray-900 font-bold rounded-xl hover:bg-yellow-400 transition-all shadow-md shadow-accent-yellow/20 text-sm tracking-wide mt-2"
          >
            Log In
          </button>
        </form>

        <p className="mt-8 text-xs text-gray-600">
          Don't have an account? <a href="#" className="text-gray-900 font-bold hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};