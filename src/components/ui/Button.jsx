import React from 'react';
import { cn } from '../../utils/cn';

export const Button = React.forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'default', 
  children,
  ...props 
}, ref) => {
  const variants = {
    default: 'cyber-btn',
    primary: 'cyber-btn-primary',
    ghost: 'hover:bg-cyber-bg-tertiary border-transparent',
    destructive: 'bg-red-900/20 border-red-700 text-red-400 hover:bg-red-900/40',
  };

  const sizes = {
    default: 'px-4 py-2',
    sm: 'px-3 py-1 text-xs',
    lg: 'px-6 py-3 text-base',
    icon: 'p-2',
  };

  return (
    <button
      className={cn(
        'cyber-btn',
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

