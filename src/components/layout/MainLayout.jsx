import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

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

  return (
    <div className="h-screen flex flex-col scanlines">
      <Header onSearch={handleSearch} />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-cyber-bg">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

