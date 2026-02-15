import React, { useEffect, useRef } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  options: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    color?: string; // For text color (e.g., delete red)
  }[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, options }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Adjust for screen boundaries (simple version)
  const adjustedX = Math.min(x, window.innerWidth - 200); 
  const adjustedY = Math.min(y, window.innerHeight - options.length * 40);

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 min-w-[160px] animate-in fade-in zoom-in-95 duration-100"
      style={{ top: adjustedY, left: adjustedX }}
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            option.onClick();
            onClose();
          }}
          className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${option.color ? option.color : 'text-gray-700 dark:text-gray-200'}`}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
};
