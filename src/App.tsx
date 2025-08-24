import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { DataPreview } from './components/DataPreview';
import { MetricsDashboard } from './components/MetricsDashboard';
import { DataVisualization } from './components/DataVisualization';
import { PowerBIEmbed } from './components/PowerBIEmbed';
import { processCSVData } from './utils/dataProcessor';
import { Dataset, PowerBIConfig } from './types';
import { BarChart3, Database, Eye, Settings, Upload } from 'lucide-react';

function App() {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [powerBIConfig, setPowerBIConfig] = useState<PowerBIConfig | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'preview' | 'metrics' | 'visualize' | 'powerbi'>('upload');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (file: File, content: string) => {
    setIsLoading(true);
    try {
      // Simulate processing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const processedDataset = processCSVData(content, file.name);
      setDataset(processedDataset);
      setActiveTab('preview');
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePowerBIConfig = (config: PowerBIConfig) => {
    setPowerBIConfig(config);
  };

  const tabs = [
    { id: 'upload' as const, label: 'Upload Data', icon: Upload, disabled: false },
    { id: 'preview' as const, label: 'Data Preview', icon: Eye, disabled: !dataset },
    { id: 'metrics' as const, label: 'Analytics', icon: Database, disabled: !dataset },
    { id: 'visualize' as const, label: 'Visualizations', icon: BarChart3, disabled: !dataset },
    { id: 'powerbi' as const, label: 'Power BI', icon: Settings, disabled: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Data Dashboard</h1>
                <p className="text-sm text-gray-600">Integrated with Power BI</p>
              </div>
            </div>
            {dataset && (
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{dataset.name}</div>
                <div className="text-xs text-gray-500">
                  {dataset.rowCount.toLocaleString()} rows • {dataset.columns.length} columns
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => !tab.disabled && setActiveTab(tab.id)}
                  disabled={tab.disabled}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : tab.disabled
                      ? 'border-transparent text-gray-400 cursor-not-allowed'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          {activeTab === 'upload' && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Dataset</h2>
                <p className="text-gray-600">
                  Upload a CSV file to get started with data analysis and Power BI integration
                </p>
              </div>
              <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
            </div>
          )}

          {activeTab === 'preview' && dataset && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Preview</h2>
                <p className="text-gray-600">
                  Overview of your uploaded dataset with key statistics and sample data
                </p>
              </div>
              <DataPreview dataset={dataset} />
            </div>
          )}

          {activeTab === 'metrics' && dataset && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Analytics</h2>
                <p className="text-gray-600">
                  Comprehensive analysis of your data quality, structure, and characteristics
                </p>
              </div>
              <MetricsDashboard dataset={dataset} />
            </div>
          )}

          {activeTab === 'visualize' && dataset && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Visualizations</h2>
                <p className="text-gray-600">
                  Create interactive charts and graphs to explore your data patterns
                </p>
              </div>
              <DataVisualization dataset={dataset} />
            </div>
          )}

          {activeTab === 'powerbi' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Power BI Integration</h2>
                <p className="text-gray-600">
                  Connect and embed your Power BI reports for advanced analytics
                </p>
              </div>
              <PowerBIEmbed config={powerBIConfig} onConfigChange={handlePowerBIConfig} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>Data Dashboard with Power BI Integration • Built with React & TypeScript</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;