import React from 'react';
import { cn } from '../../utils/cn';

export const Badge = ({ className, variant = 'default', children, ...props }) => {
  const variants = {
    default: 'bg-cyber-bg-tertiary text-cyber-gray-300',
    primary: 'bg-cyber-yellow/20 text-cyber-yellow border border-cyber-yellow/50',
    success: 'bg-green-900/20 text-green-400 border border-green-700',
    warning: 'bg-orange-900/20 text-orange-400 border border-orange-700',
    danger: 'bg-red-900/20 text-red-400 border border-red-700',
    info: 'bg-blue-900/20 text-blue-400 border border-blue-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 text-xs font-mono uppercase tracking-wider',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

