import React from 'react';
import { Terminal, Search } from 'lucide-react';

export const Header = ({ onSearch }) => {
  return (
    <header className="border-b border-cyber-border bg-cyber-bg-secondary">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="text-cyber-yellow" size={28} />
          <div>
            <h1 className="text-2xl font-display font-bold uppercase tracking-wider text-cyber-yellow">
              Cyberdeck
            </h1>
            <p className="text-xs font-mono text-cyber-gray-500 uppercase">
              Project Management System
            </p>
          </div>
        </div>
        
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search gigs and jobs..."
              className="cyber-input pl-10 w-full"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>

        <div className="font-mono text-sm text-cyber-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
      </div>
    </header>
  );
};

