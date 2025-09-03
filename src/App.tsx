import React from 'react';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './hooks/useAuth';
import { AuthPage } from './components/Auth/AuthPage';
import { FileUpload } from './components/FileUpload';
import { UnifiedDashboard } from './components/UnifiedDashboard';
import { Dataset } from './types';
import { processCSVData } from './utils/dataProcessor';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [dataset, setDataset] = useState<Dataset | null>(null);

  const handleFileUpload = (file: File, content: string) => {
    const processedDataset = processCSVData(content, file.name);
    setDataset(processedDataset);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {!dataset ? (
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">Analytics Dashboard</h1>
              <p className="text-gray-400 text-lg">Upload your dataset to generate comprehensive analytics</p>
            </div>
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        </div>
      ) : (
        <UnifiedDashboard dataset={dataset} />
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

import { useState } from 'react';

export default App;