import React from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between relative z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-accent-yellow rounded-lg flex items-center justify-center shadow-lg shadow-accent-yellow/20">
           <span className="font-bold text-black">T</span>
        </div>
        <span className="font-bold text-xl text-white tracking-tight">TADA</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Features</a>
        <a href="#testimonials" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Testimonials</a>
        <a href="#pricing" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Pricing</a>
        <button 
          onClick={() => navigate('/login')}
          className="text-sm font-bold text-black bg-white px-5 py-2.5 rounded-full hover:bg-accent-yellow transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Login
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg p-6 flex flex-col gap-4 border-b border-white/10 animate-in fade-in slide-in-from-top-4">
          <a href="#features" className="text-white/80 hover:text-white py-2">Features</a>
          <a href="#testimonials" className="text-white/80 hover:text-white py-2">Testimonials</a>
          <a href="#pricing" className="text-white/80 hover:text-white py-2">Pricing</a>
          <button 
            onClick={() => {
              navigate('/login');
              setIsOpen(false);
            }}
            className="w-full bg-accent-yellow text-black font-bold py-3 rounded-xl"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};