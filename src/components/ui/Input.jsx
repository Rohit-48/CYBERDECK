import React from 'react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn('cyber-input', className)}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

