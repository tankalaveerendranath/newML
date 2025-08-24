import React from 'react';
import { Dataset } from '../types/index';
import { Table, BarChart3, TrendingUp } from 'lucide-react';

interface DataPreviewProps {
  dataset: Dataset;
}

export const DataPreview: React.FC<DataPreviewProps> = ({ dataset }) => {
  const previewRows = dataset.data.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Dataset Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
            <Table className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{dataset.rowCount.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Rows</div>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{dataset.columns.length}</div>
          <div className="text-sm text-gray-600">Columns</div>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {(dataset.fileSize / 1024).toFixed(1)}KB
          </div>
          <div className="text-sm text-gray-600">File Size</div>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3">
            <div className="w-6 h-6 bg-orange-600 rounded"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{dataset.name}</div>
          <div className="text-sm text-gray-600">Dataset Name</div>
        </div>
      </div>

      {/* Data Preview Table */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Preview</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {dataset.columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {previewRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {dataset.columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {row[column]?.toString() || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {dataset.rowCount > 5 && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Showing 5 of {dataset.rowCount.toLocaleString()} rows
          </div>
        )}
      </div>
    </div>
  );
};