import React from 'react';
import { ArrowLeft, Calendar, FileText, BarChart3, Trash2, Download } from 'lucide-react';
import { useDatasetHistory } from '../../hooks/useDatasetHistory';
import { useAuth } from '../../hooks/useAuth';

interface DatasetHistoryProps {
  onBack: () => void;
}

export const DatasetHistory: React.FC<DatasetHistoryProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { history, clearHistory } = useDatasetHistory(user?.id || null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
    if (confidence >= 80) return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dataset Analysis History</h1>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear History</span>
            </button>
          )}
        </div>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16">
          <BarChart3 className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Analysis History</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Upload and analyze datasets to see your history here.
          </p>
          <button
            onClick={() => onBack()}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upload Your First Dataset
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((analysis) => (
            <div key={analysis.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{analysis.fileName}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(analysis.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Dataset Overview */}
                <div className="lg:col-span-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Dataset Overview</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{analysis.dataset.samples.toLocaleString()}</div>
                      <div className="text-xs text-blue-700 dark:text-blue-300">Samples</div>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{analysis.dataset.features}</div>
                      <div className="text-xs text-emerald-700 dark:text-emerald-300">Features</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-xs font-medium text-purple-600 dark:text-purple-400 capitalize">{analysis.dataset.type}</div>
                      <div className="text-xs text-purple-700 dark:text-purple-300">Data Type</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-xs font-medium text-orange-600 dark:text-orange-400 capitalize">{analysis.dataset.target}</div>
                      <div className="text-xs text-orange-700 dark:text-orange-300">Problem Type</div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="lg:col-span-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Algorithm Recommendations</h4>
                  <div className="space-y-3">
                    {analysis.recommendations.map((rec, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-gray-900 dark:text-white">{rec.algorithm}</h5>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(rec.confidence)}`}>
                            {rec.confidence}% match
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{rec.reasoning}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-3">
                            <div 
                              className="bg-blue-600 dark:bg-blue-400 h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${rec.confidence}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};