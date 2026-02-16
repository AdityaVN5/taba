import React from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const linkClass = (path: string) => `text-sm font-medium transition-all px-4 py-2 rounded-full ${
    isActive(path) 
    ? 'bg-black/5 dark:bg-white/10 text-black dark:text-white' 
    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
  }`;

  return (
    <nav className="w-full px-8 py-6 flex items-center justify-between relative z-50">
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <span className="font-bold text-2xl text-black dark:text-white tracking-tight">TABA.</span>
      </div>

      {/* Desktop Menu Pill */}
      <div className="hidden md:flex items-center gap-1 p-1 bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-full border border-white/40 dark:border-white/20 shadow-sm">
        <button onClick={() => navigate('/')} className={linkClass('/')}>
            Home
        </button>
        <button onClick={() => navigate('/features')} className={linkClass('/features')}>
            Features
        </button>
        <button onClick={() => navigate('/docs')} className={linkClass('/docs')}>
            Docs
        </button>
        
        <div className="w-[1px] h-4 bg-black/10 dark:bg-white/20 mx-2"></div>
        
        <button 
          onClick={() => navigate('/login')}
          className="text-sm font-medium text-black dark:text-white hover:opacity-60 transition-opacity px-4 py-2"
        >
          Log in
        </button>
        
        <button 
          onClick={() => navigate('/signup')}
          className="text-sm font-bold text-white bg-black dark:bg-white dark:text-black px-6 py-2.5 rounded-full hover:opacity-90 transition-all shadow-sm"
        >
          Sign Up
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-black dark:text-white p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mx-6 mt-2 bg-white/90 dark:bg-gray-900/95 backdrop-blur-lg p-6 rounded-2xl flex flex-col gap-4 border border-gray-200 dark:border-white/10 shadow-xl animate-in fade-in slide-in-from-top-4 overflow-hidden">
          <button 
            onClick={() => { navigate('/'); setIsOpen(false); }} 
            className={`text-left font-medium py-2 border-b border-gray-100 dark:border-white/5 ${isActive('/') ? 'text-accent-yellow' : 'text-black dark:text-white'}`}
          >
            Home
          </button>
          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-white/5">
            <button 
                onClick={() => { navigate('/features'); setIsOpen(false); }} 
                className={`font-medium ${isActive('/features') ? 'text-accent-yellow' : 'text-black dark:text-white'}`}
            >
                Features
            </button>
          </div>
          <button 
            onClick={() => { navigate('/docs'); setIsOpen(false); }} 
            className={`text-left font-medium py-2 border-b border-gray-100 dark:border-white/5 ${isActive('/docs') ? 'text-accent-yellow' : 'text-black dark:text-white'}`}
          >
            Docs
          </button>
          <button 
            onClick={() => {
              navigate('/login');
              setIsOpen(false);
            }}
            className="text-black dark:text-white font-medium py-2 text-left"
          >
            Log in
          </button>
          <button 
            onClick={() => {
              navigate('/signup');
              setIsOpen(false);
            }}
            className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 rounded-xl shadow-lg"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};