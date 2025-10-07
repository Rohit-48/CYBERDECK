import React from 'react';
import { cn } from '../../utils/cn';

export const Avatar = ({ emoji, color, size = 'md', className }) => {
  const sizes = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-4xl',
    xl: 'w-24 h-24 text-6xl',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full border-2',
        'bg-cyber-bg-secondary transition-all duration-200',
        'hover:scale-110 cursor-pointer',
        sizes[size],
        className
      )}
      style={{ borderColor: color || '#fcee0a' }}
    >
      <span role="img" aria-label="avatar">
        {emoji}
      </span>
    </div>
  );
};

export const AvatarWithName = ({ emoji, color, name, subtitle, size = 'md' }) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar emoji={emoji} color={color} size={size} />
      <div className="flex-1 min-w-0">
        <div className="font-display font-semibold text-cyber-yellow truncate">
          {name}
        </div>
        {subtitle && (
          <div className="text-xs text-cyber-gray-500 font-mono truncate">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

