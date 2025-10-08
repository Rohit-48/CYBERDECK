import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

export const MainLayout = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Navigate to jobs page with search query
    if (query.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(query)}`);
    }
  };

  // Keyboard shortcuts
  useKeyboardShortcuts([
    { key: 'd', action: () => navigate('/') },
    { key: 'g', action: () => navigate('/gigs') },
    { key: 'j', action: () => navigate('/jobs') },
    { key: 'a', action: () => navigate('/analytics') },
    { key: 's', action: () => navigate('/settings') },
    { key: '/', action: () => document.querySelector('input[type="text"]')?.focus() },
  ]);

  return (
    <div className="h-screen flex flex-col scanlines">
      <Header onSearch={handleSearch} />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-cyber-bg">
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

