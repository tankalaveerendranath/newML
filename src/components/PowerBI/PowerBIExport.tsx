import React, { useState } from 'react';
import { Download, FileText, Image, Database, Share2, Mail, Link, Copy } from 'lucide-react';

interface PowerBIExportProps {
  dashboardData: any;
  dashboardType: string;
  isOpen: boolean;
  onClose: () => void;
}

export const PowerBIExport: React.FC<PowerBIExportProps> = ({ 
  dashboardData, 
  dashboardType, 
  isOpen, 
  onClose 
}) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [shareMethod, setShareMethod] = useState('link');
  const [isExporting, setIsExporting] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const exportFormats = [
    { id: 'pdf', name: 'PDF Report', icon: FileText, description: 'Complete dashboard as PDF' },
    { id: 'png', name: 'PNG Image', icon: Image, description: 'High-quality image export' },
    { id: 'csv', name: 'CSV Data', icon: Database, description: 'Raw data in CSV format' },
    { id: 'powerbi', name: 'PowerBI Template', icon: Share2, description: 'PowerBI .pbit template' }
  ];

  const shareOptions = [
    { id: 'link', name: 'Share Link', icon: Link, description: 'Generate shareable link' },
    { id: 'email', name: 'Email', icon: Mail, description: 'Send via email' },
    { id: 'embed', name: 'Embed Code', icon: Copy, description: 'HTML embed code' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      const filename = `dashboard-${dashboardType}-${Date.now()}`;
      
      switch (exportFormat) {
        case 'pdf':
          // Simulate PDF generation
          console.log(`Generating PDF: ${filename}.pdf`);
          break;
        case 'png':
          // Simulate PNG export
          console.log(`Exporting PNG: ${filename}.png`);
          break;
        case 'csv':
          // Simulate CSV export
          const csvData = generateCSVData();
          downloadCSV(csvData, `${filename}.csv`);
          break;
        case 'powerbi':
          // Simulate PowerBI template
          console.log(`Creating PowerBI template: ${filename}.pbit`);
          break;
      }
      
      setIsExporting(false);
    }, 2000);
  };

  const generateCSVData = () => {
    // Generate sample CSV data based on dashboard
    const headers = ['Metric', 'Value', 'Category', 'Date'];
    const rows = [
      ['Total Records', '1000', 'Overview', new Date().toISOString()],
      ['Features', '8', 'Overview', new Date().toISOString()],
      ['Data Quality', '87%', 'Quality', new Date().toISOString()],
      ['Model Accuracy', '92%', 'Performance', new Date().toISOString()]
    ];
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const generateShareLink = () => {
    const baseUrl = window.location.origin;
    const shareId = Math.random().toString(36).substr(2, 9);
    const url = `${baseUrl}/shared-dashboard/${shareId}`;
    setShareUrl(url);
    return url;
  };

  const handleShare = () => {
    switch (shareMethod) {
      case 'link':
        const url = generateShareLink();
        navigator.clipboard.writeText(url);
        alert('Share link copied to clipboard!');
        break;
      case 'email':
        const subject = `PowerBI Dashboard - ${dashboardType}`;
        const body = `Check out this interactive dashboard: ${generateShareLink()}`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        break;
      case 'embed':
        const embedCode = `<iframe src="${generateShareLink()}" width="800" height="600" frameborder="0"></iframe>`;
        navigator.clipboard.writeText(embedCode);
        alert('Embed code copied to clipboard!');
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Export & Share Dashboard</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Export Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Export Dashboard
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {exportFormats.map((format) => {
                const IconComponent = format.icon;
                return (
                  <button
                    key={format.id}
                    onClick={() => setExportFormat(format.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      exportFormat === format.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`w-6 h-6 ${
                        exportFormat === format.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                      }`} />
                      <div>
                        <div className={`font-medium ${
                          exportFormat === format.id ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                        }`}>
                          {format.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {format.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export {exportFormats.find(f => f.id === exportFormat)?.name}</span>
                </>
              )}
            </button>
          </div>

          {/* Share Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Share2 className="w-5 h-5 mr-2" />
              Share Dashboard
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {shareOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setShareMethod(option.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                      shareMethod === option.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <IconComponent className={`w-6 h-6 mx-auto mb-2 ${
                      shareMethod === option.id ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                    }`} />
                    <div className={`font-medium text-sm ${
                      shareMethod === option.id ? 'text-green-900 dark:text-green-100' : 'text-gray-900 dark:text-white'
                    }`}>
                      {option.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {option.description}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleShare}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share via {shareOptions.find(o => o.id === shareMethod)?.name}</span>
            </button>

            {shareUrl && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Share URL:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(shareUrl)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dashboard Preview */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Dashboard Preview</h3>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-gray-600 dark:text-gray-400 mb-2">
                {dashboardType.charAt(0).toUpperCase() + dashboardType.slice(1)} Dashboard
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                {dashboardData?.widgets?.length || 0} widgets • Interactive charts and metrics
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};