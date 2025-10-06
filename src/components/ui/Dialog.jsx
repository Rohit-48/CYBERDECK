import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ className, children, onClose }) => {
  return (
    <div className={cn('cyber-card clip-corner-lg p-6', className)}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:text-cyber-yellow transition-colors"
      >
        <X size={20} />
      </button>
      {children}
    </div>
  );
};

export const DialogHeader = ({ className, children }) => {
  return (
    <div className={cn('mb-6 pr-8', className)}>
      {children}
    </div>
  );
};

export const DialogTitle = ({ className, children }) => {
  return (
    <h2 className={cn('text-2xl font-display font-bold uppercase tracking-wide text-cyber-yellow', className)}>
      {children}
    </h2>
  );
};

export const DialogDescription = ({ className, children }) => {
  return (
    <p className={cn('text-sm text-cyber-gray-400 mt-2', className)}>
      {children}
    </p>
  );
};

