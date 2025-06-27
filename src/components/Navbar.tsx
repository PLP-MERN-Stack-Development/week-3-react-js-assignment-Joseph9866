import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, FileText, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white">
              <CheckSquare className="w-6 h-6 text-indigo-600" />
              <span>TaskManager</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                Tasks
              </Link>
              <Link
                to="/posts"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/posts') 
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                Posts
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              icon={theme === 'light' ? Moon : Sun}
              className="!p-2"
            >
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <div className="md:hidden flex space-x-1">
              <Link
                to="/"
                className={`p-2 rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                <CheckSquare className="w-5 h-5" />
              </Link>
              <Link
                to="/posts"
                className={`p-2 rounded-lg transition-colors ${
                  isActive('/posts') 
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' 
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                <FileText className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};