import React from 'react';
import { Check, Trash2, Clock } from 'lucide-react';
import { Task } from '../types';
import { Button } from './Button';
import { Card } from './Card';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card hover padding="md" className="group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={() => onToggle(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              task.completed
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400'
            }`}
          >
            {task.completed && <Check className="w-4 h-4" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium transition-all ${
              task.completed
                ? 'text-gray-500 dark:text-gray-400 line-through'
                : 'text-gray-900 dark:text-gray-100'
            }`}>
              {task.text}
            </p>
            <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{formatDate(task.createdAt)}</span>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          icon={Trash2}
          className="opacity-0 group-hover:opacity-100 transition-opacity !p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <span className="sr-only">Delete task</span>
        </Button>
      </div>
    </Card>
  );
};