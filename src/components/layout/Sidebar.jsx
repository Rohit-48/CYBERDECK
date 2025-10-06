import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, ListTodo, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/gigs', icon: Briefcase, label: 'Gigs' },
  { to: '/jobs', icon: ListTodo, label: 'Jobs' },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-cyber-bg-secondary border-r border-cyber-border flex flex-col">
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-wide',
                  'border border-transparent transition-all duration-200',
                  'hover:border-cyber-yellow-muted hover:text-cyber-yellow',
                  isActive && 'border-cyber-yellow text-cyber-yellow bg-cyber-yellow/5'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} className={isActive ? 'text-cyber-yellow' : ''} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-cyber-border">
        <div className="px-4 py-2 text-xs font-mono text-cyber-gray-500 uppercase">
          System Status: <span className="text-green-400">Online</span>
        </div>
      </div>
    </aside>
  );
};

