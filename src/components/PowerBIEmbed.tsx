import React, { useEffect, useRef, useState } from 'react';
import { PowerBIConfig } from '../types/index';
import { ExternalLink, Settings, AlertTriangle } from 'lucide-react';

interface PowerBIEmbedProps {
  config?: PowerBIConfig;
  onConfigChange: (config: PowerBIConfig) => void;
}

export const PowerBIEmbed: React.FC<PowerBIEmbedProps> = ({ config, onConfigChange }) => {
  const embedRef = useRef<HTMLDivElement>(null);
  const [showConfig, setShowConfig] = useState(!config);
  const [formData, setFormData] = useState<PowerBIConfig>(
    config || {
      embedUrl: '',
      accessToken: '',
      reportId: '',
      groupId: ''
    }
  );

  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfigChange(formData);
    setShowConfig(false);
  };

  const handleInputChange = (field: keyof PowerBIConfig, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (config && embedRef.current) {
      // In a real implementation, you would use the Power BI JavaScript SDK here
      // For demo purposes, we'll show a placeholder
      embedRef.current.innerHTML = `
        <div class="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-300">
          <div class="text-center p-8">
            <div class="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v10H7V7zm2 2v6h6V9H9z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Power BI Report</h3>
            <p class="text-gray-600 mb-4">Report ID: ${config.reportId}</p>
            <p class="text-sm text-gray-500">Interactive dashboard would be embedded here</p>
          </div>
        </div>
      `;
    }
  }, [config]);

  if (showConfig || !config) {
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Power BI Configuration</h3>
          <Settings className="w-5 h-5 text-gray-500" />
        </div>

        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Power BI Setup Required</p>
              <p>To embed Power BI reports, you'll need to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Create a Power BI workspace and report</li>
                <li>Register an Azure AD application</li>
                <li>Generate an access token with appropriate permissions</li>
                <li>Get the embed URL from your Power BI report</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleConfigSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Embed URL
            </label>
            <input
              type="url"
              value={formData.embedUrl}
              onChange={(e) => handleInputChange('embedUrl', e.target.value)}
              className="input-field"
              placeholder="https://app.powerbi.com/reportEmbed?reportId=..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Token
            </label>
            <textarea
              value={formData.accessToken}
              onChange={(e) => handleInputChange('accessToken', e.target.value)}
              className="input-field h-24 resize-none"
              placeholder="Your Power BI access token"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report ID
            </label>
            <input
              type="text"
              value={formData.reportId}
              onChange={(e) => handleInputChange('reportId', e.target.value)}
              className="input-field"
              placeholder="12345678-1234-1234-1234-123456789012"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group ID (Optional)
            </label>
            <input
              type="text"
              value={formData.groupId}
              onChange={(e) => handleInputChange('groupId', e.target.value)}
              className="input-field"
              placeholder="12345678-1234-1234-1234-123456789012"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn-primary">
              Connect Power BI
            </button>
            {config && (
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Need Help?</p>
              <p>
                Check out the{' '}
                <a
                  href="https://docs.microsoft.com/en-us/power-bi/developer/embedded/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Power BI Embedded documentation
                </a>{' '}
                for detailed setup instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-96">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Power BI Dashboard</h3>
        <button
          onClick={() => setShowConfig(true)}
          className="btn-secondary text-sm"
        >
          <Settings className="w-4 h-4 mr-2" />
          Configure
        </button>
      </div>
      <div ref={embedRef} className="h-full rounded-lg overflow-hidden" />
    </div>
  );
};