import React from 'react';
import { TaskFilter as TaskFilterType } from '../types';

interface TaskFilterProps {
  currentFilter: TaskFilterType;
  onFilterChange: (filter: TaskFilterType) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  currentFilter,
  onFilterChange,
  taskCounts,
}) => {
  const filters: { key: TaskFilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: taskCounts.all },
    { key: 'active', label: 'Active', count: taskCounts.active },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
            currentFilter === key
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <span>{label}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            currentFilter === key
              ? 'bg-indigo-500 text-indigo-100'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            {count}
          </span>
        </button>
      ))}
    </div>
  );
};