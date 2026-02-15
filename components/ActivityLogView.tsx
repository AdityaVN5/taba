import React from 'react';
import { useActivityLogStore, ActivityAction } from '../store/useActivityLogStore';
import { Clock, Plus, Edit2, Move, Trash2, RotateCcw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const ActivityLogView: React.FC = () => {
  const activities = useActivityLogStore((state) => state.activities);

  const getIcon = (action: ActivityAction) => {
    switch (action) {
      case 'create': return <Plus size={16} className="text-green-500" />;
      case 'edit': return <Edit2 size={16} className="text-blue-500" />;
      case 'move': return <Move size={16} className="text-orange-500" />;
      case 'delete': return <Trash2 size={16} className="text-red-500" />;
      case 'reset': return <RotateCcw size={16} className="text-purple-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <Clock className="text-gray-400" /> Activity Log
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        {activities.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No recent activity.
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {activities.map((activity) => (
              <div key={activity.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  {getIcon(activity.action)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{activity.details}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
