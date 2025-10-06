import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { GigList } from './components/gigs/GigList';
import { GigDetail } from './components/gigs/GigDetail';
import { JobList } from './components/jobs/JobList';
import { JobDetail } from './components/jobs/JobDetail';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="gigs" element={<GigList />} />
            <Route path="gigs/:gigId" element={<GigDetail />} />
            <Route path="jobs" element={<JobList />} />
            <Route path="jobs/:jobId" element={<JobDetail />} />
            <Route path="*" element={<div className="text-center py-16 font-mono text-cyber-gray-500">404 - Page Not Found</div>} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;

