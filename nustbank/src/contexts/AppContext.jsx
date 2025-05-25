// src/contexts/AppContext.jsx
import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Upload a file
  const uploadFile = async (file) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.addDocument(formData);
      if (response && response.success) {
        return true;
      }
      throw new Error('Failed to upload file');
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        error,
        uploadFile,
        clearError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}