import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface MenuOption {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  color?: string;
  options?: MenuOption[];
}

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  options: MenuOption[];
  depth?: number;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, options, depth = 0 }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<{ index: number; options: MenuOption[] } | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (depth === 0 && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (depth === 0) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, depth]);

  // Adjust for screen boundaries
  const menuWidth = 180;
  const itemHeight = 36;
  const menuHeight = options.length * itemHeight + 8;
  
  let adjustedX = x;
  let adjustedY = y;

  if (depth === 0) {
    adjustedX = Math.min(x, window.innerWidth - menuWidth - 10); 
    adjustedY = Math.min(y, window.innerHeight - menuHeight - 10);
  }

  return (
    <div
      ref={menuRef}
      className={`${depth === 0 ? 'fixed' : 'absolute'} z-[100] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 min-w-[180px] animate-in fade-in zoom-in-95 duration-100 font-sans`}
      style={depth === 0 ? { top: adjustedY, left: adjustedX } : { top: -4, left: '100%' }}
    >
      {options.map((option, index) => (
        <div 
          key={index} 
          className="relative"
          onMouseEnter={() => {
            if (option.options) {
              setActiveSubMenu({ index, options: option.options });
            } else {
              setActiveSubMenu(null);
            }
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (option.onClick) {
                option.onClick();
                onClose();
              }
            }}
            className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${option.color ? option.color : 'text-gray-700 dark:text-gray-200'} ${activeSubMenu?.index === index ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            {option.icon}
            <span className="flex-1 truncate">{option.label}</span>
            {option.options && <ChevronRight size={14} className="text-gray-400" />}
          </button>
          
          {activeSubMenu?.index === index && option.options && (
            <ContextMenu 
                x={0} 
                y={0} 
                onClose={onClose} 
                options={option.options} 
                depth={depth + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};
