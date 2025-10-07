import React from 'react';
import { cn } from '../../utils/cn';

export const LoadingSpinner = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'border-cyber-yellow border-t-transparent rounded-full animate-spin',
          sizes[size],
          className
        )}
      />
    </div>
  );
};

export const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-bg">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-cyber-yellow font-mono text-sm uppercase tracking-wider">
        {message}
      </p>
    </div>
  );
};

