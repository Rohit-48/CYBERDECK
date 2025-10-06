import React from 'react';
import { cn } from '../../utils/cn';

export const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn('cyber-input min-h-[100px] resize-y', className)}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

