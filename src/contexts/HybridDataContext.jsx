import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { DataProvider, useData } from './DataContext';
import { SupabaseDataProvider, useSupabaseData } from './SupabaseDataContext';

const HybridDataContext = createContext();

export const useHybridData = () => {
  const context = useContext(HybridDataContext);
  if (!context) {
    throw new Error('useHybridData must be used within a HybridDataProvider');
  }
  return context;
};

// Component that switches between localStorage and Supabase
const HybridDataSwitcher = ({ children }) => {
  const { isConfigured } = useAuth();
  
  // Use Supabase if configured, otherwise use localStorage
  if (isConfigured) {
    return (
      <SupabaseDataProvider>
        <SupabaseDataWrapper>{children}</SupabaseDataWrapper>
      </SupabaseDataProvider>
    );
  }

  return (
    <DataProvider>
      <LocalStorageDataWrapper>{children}</LocalStorageDataWrapper>
    </DataProvider>
  );
};

// Wrapper for Supabase data
const SupabaseDataWrapper = ({ children }) => {
  const supabaseData = useSupabaseData();
  return (
    <HybridDataContext.Provider value={{ ...supabaseData, mode: 'supabase' }}>
      {children}
    </HybridDataContext.Provider>
  );
};

// Wrapper for localStorage data
const LocalStorageDataWrapper = ({ children }) => {
  const localStorageData = useData();
  return (
    <HybridDataContext.Provider value={{ ...localStorageData, mode: 'localStorage' }}>
      {children}
    </HybridDataContext.Provider>
  );
};

export const HybridDataProvider = ({ children }) => {
  return <HybridDataSwitcher>{children}</HybridDataSwitcher>;
};

