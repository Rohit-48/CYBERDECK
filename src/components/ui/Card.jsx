import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ className, children, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        hover ? 'cyber-card-hover' : 'cyber-card',
        'clip-corner',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3 className={cn('text-lg font-semibold font-display uppercase tracking-wide', className)} {...props}>
      {children}
    </h3>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
};

