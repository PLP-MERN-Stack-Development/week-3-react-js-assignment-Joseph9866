import React from 'react';
// Footer component for the TaskManager application
// This component provides a simple footer with copyright information
export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 TaskManager. Demonstrating React hooks, component architecture, and API integration. Designed by keamkyarie
          </p>
        </div>
      </div>
    </footer>
  );
};