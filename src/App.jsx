import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { HybridDataProvider } from './contexts/HybridDataContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { UserProfile } from './components/auth/UserProfile';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { GigList } from './components/gigs/GigList';
import { GigDetail } from './components/gigs/GigDetail';
import { JobList } from './components/jobs/JobList';
import { JobDetail } from './components/jobs/JobDetail';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { Settings } from './components/settings/Settings';
import { ToastProvider } from './components/ui/Toast';

function App() {
  return (
    <AuthProvider>
      <HybridDataProvider>
        <Router>
          <ToastProvider />
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="gigs" element={<GigList />} />
              <Route path="gigs/:gigId" element={<GigDetail />} />
              <Route path="jobs" element={<JobList />} />
              <Route path="jobs/:jobId" element={<JobDetail />} />
              <Route path="analytics" element={<AnalyticsDashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="*" element={<div className="text-center py-16 font-mono text-cyber-gray-500">404 - Page Not Found</div>} />
            </Route>
          </Routes>
        </Router>
      </HybridDataProvider>
    </AuthProvider>
  );
}

export default App;

