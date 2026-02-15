import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLogin?: () => void;
  onBack?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const [email, setEmail] = useState('');
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
    <div className="flex flex-col items-center justify-center w-full h-full p-6 text-center">
      <h2 className="text-3xl font-bold mb-6 text-white">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-yellow"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-accent-yellow text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Sign In
        </button>
      </form>
      <button
        onClick={() => navigate('/')}
        className="mt-4 text-sm text-white/70 hover:text-white underline"
      >
        Back to Home
      </button>
    </div>
  );
};