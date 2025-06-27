import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <Card className="text-center">
      <div className="flex flex-col items-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{message}</p>
        </div>
        {onRetry && (
          <Button onClick={onRetry} icon={RefreshCw} variant="primary">
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
};