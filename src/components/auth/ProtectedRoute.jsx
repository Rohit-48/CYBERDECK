import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading, isConfigured } = useAuth();

  // If Supabase is not configured, allow access (fallback to localStorage mode)
  if (!isConfigured) {
    return children;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-bg">
        <div className="text-center">
          <div className="text-cyber-yellow text-2xl font-mono mb-2">Loading...</div>
          <div className="text-cyber-gray-500 font-mono text-sm">Accessing system</div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

