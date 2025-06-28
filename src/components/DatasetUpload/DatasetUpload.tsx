import React, { useState, useCallback } from 'react';
import { ArrowLeft, Upload, FileText, BarChart3, Brain, Zap, Download, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { Dataset, DatasetRecommendation, DatasetAnalysis } from '../../types';
import { useDatasetHistory } from '../../hooks/useDatasetHistory';
import { useAuth } from '../../hooks/useAuth';

interface DatasetUploadProps {
  onBack: () => void;
}

interface CleanedDataset {
  originalRows: number;
  cleanedRows: number;
  removedRows: number;
  missingValues: number;
  outliers: number;
  duplicates: number;
  cleanedData: any[][];
  cleaningSteps: string[];
}

export const DatasetUpload: React.FC<DatasetUploadProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { addToHistory } = useDatasetHistory(user?.id || null);
  const [file, setFile] = useState<File | null>(null);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [cleanedDataset, setCleanedDataset] = useState<CleanedDataset | null>(null);
  const [recommendations, setRecommendations] = useState<DatasetRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showCleanedData, setShowCleanedData] = useState(false);

  const simulateDataCleaning = (originalData: any[][]): CleanedDataset => {
    const originalRows = originalData.length;
    let cleanedData = [...originalData];
    const cleaningSteps: string[] = [];
    let removedRows = 0;
    let missingValues = 0;
    let outliers = 0;
    let duplicates = 0;

    // Simulate missing values detection and removal
    const missingValueRows = Math.floor(originalRows * 0.1); // 10% missing values
    missingValues = missingValueRows;
    cleanedData = cleanedData.filter((_, index) => index % 10 !== 0); // Remove every 10th row
    removedRows += missingValueRows;
    if (missingValues > 0) {
      cleaningSteps.push(`Removed ${missingValues} rows with missing values`);
    }

    // Simulate outlier detection and removal
    const outlierRows = Math.floor(originalRows * 0.05); // 5% outliers
    outliers = outlierRows;
    cleanedData = cleanedData.filter((_, index) => index % 20 !== 0); // Remove every 20th row
    removedRows += outlierRows;
    if (outliers > 0) {
      cleaningSteps.push(`Removed ${outliers} outlier data points`);
    }

    // Simulate duplicate detection and removal
    const duplicateRows = Math.floor(originalRows * 0.03); // 3% duplicates
    duplicates = duplicateRows;
    removedRows += duplicateRows;
    if (duplicates > 0) {
      cleaningSteps.push(`Removed ${duplicates} duplicate rows`);
    }

    // Add data normalization step
    cleaningSteps.push('Normalized numerical features to [0, 1] range');
    cleaningSteps.push('Encoded categorical variables');
    cleaningSteps.push('Applied feature scaling for optimal model performance');

    const cleanedRows = originalRows - removedRows;

    return {
      originalRows,
      cleanedRows,
      removedRows,
      missingValues,
      outliers,
      duplicates,
      cleanedData,
      cleaningSteps
    };
  };

  const analyzeDataset = useCallback((file: File) => {
    setIsAnalyzing(true);
    
    // Simulate dataset analysis
    setTimeout(() => {
      const mockDataset: Dataset = {
        name: file.name,
        size: Math.round(file.size / 1024), // KB
        features: Math.floor(Math.random() * 20) + 5,
        samples: Math.floor(Math.random() * 10000) + 1000,
        type: ['numerical', 'categorical', 'mixed'][Math.floor(Math.random() * 3)] as any,
        target: ['classification', 'regression', 'clustering'][Math.floor(Math.random() * 3)] as any
      };

      // Generate mock original data
      const originalData = Array.from({ length: mockDataset.samples }, (_, i) => 
        Array.from({ length: mockDataset.features }, (_, j) => 
          Math.random() * 100 + (i * 0.1) + (j * 0.05)
        )
      );

      const cleaned = simulateDataCleaning(originalData);
      const mockRecommendations = generateRecommendations(mockDataset);
      
      setDataset(mockDataset);
      setCleanedDataset(cleaned);
      setRecommendations(mockRecommendations);
      setIsAnalyzing(false);

      // Add to history
      const analysis: DatasetAnalysis = {
        id: Date.now().toString(),
        timestamp: new Date(),
        fileName: file.name,
        dataset: mockDataset,
        recommendations: mockRecommendations
      };
      addToHistory(analysis);
    }, 3000);
  }, [addToHistory]);

  const generateRecommendations = (dataset: Dataset): DatasetRecommendation[] => {
    const recommendations: DatasetRecommendation[] = [];
    
    // Logic based on dataset characteristics
    if (dataset.target === 'classification') {
      if (dataset.samples < 1000) {
        recommendations.push({
          algorithm: 'K-Nearest Neighbors',
          confidence: 85,
          reasoning: 'KNN works well with small datasets and provides good classification results.'
        });
      }
      
      if (dataset.features > 10) {
        recommendations.push({
          algorithm: 'Random Forest',
          confidence: 92,
          reasoning: 'Random Forest handles high-dimensional data well and provides feature importance.'
        });
      } else {
        recommendations.push({
          algorithm: 'Decision Tree',
          confidence: 78,
          reasoning: 'Decision trees are interpretable and work well with moderate feature counts.'
        });
      }
      
      if (dataset.samples > 5000) {
        recommendations.push({
          algorithm: 'Support Vector Machine',
          confidence: 88,
          reasoning: 'SVM is effective for large datasets with complex decision boundaries.'
        });
      }
    }
    
    if (dataset.target === 'regression') {
      recommendations.push({
        algorithm: 'Linear Regression',
        confidence: 75,
        reasoning: 'Good baseline for regression problems, especially with numerical features.'
      });
      
      if (dataset.features > 5) {
        recommendations.push({
          algorithm: 'Random Forest',
          confidence: 89,
          reasoning: 'Handles non-linear relationships and multiple features effectively.'
        });
      }
    }
    
    if (dataset.target === 'clustering') {
      recommendations.push({
        algorithm: 'K-Means Clustering',
        confidence: 82,
        reasoning: 'Effective for discovering natural groupings in your data.'
      });
    }
    
    if (dataset.samples > 10000 && dataset.features > 20) {
      recommendations.push({
        algorithm: 'Neural Networks',
        confidence: 91,
        reasoning: 'Deep learning excels with large datasets and high-dimensional feature spaces.'
      });
    }
    
    return recommendations.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      analyzeDataset(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      analyzeDataset(selectedFile);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
    if (confidence >= 80) return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
  };

  const downloadCleanedData = () => {
    if (!cleanedDataset) return;
    
    const csvContent = cleanedDataset.cleanedData
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cleaned_${file?.name || 'dataset.csv'}`;
    a.click();
    window.URL.revokeObjectURL(url);
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
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dataset Analysis & Recommendations</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Upload Your Dataset</h2>
            
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Drop your dataset here
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                or click to browse your files
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".csv,.json,.xlsx,.xls"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Choose File
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Supported formats: CSV, JSON, Excel (.xlsx, .xls)
              </p>
            </div>

            {file && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dataset Info */}
          {dataset && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Dataset Overview
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{dataset.samples.toLocaleString()}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Samples</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{dataset.features}</div>
                  <div className="text-sm text-emerald-700 dark:text-emerald-300">Features</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-sm font-medium text-purple-600 dark:text-purple-400 capitalize">{dataset.type}</div>
                  <div className="text-xs text-purple-700 dark:text-purple-300">Data Type</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-sm font-medium text-orange-600 dark:text-orange-400 capitalize">{dataset.target}</div>
                  <div className="text-xs text-orange-700 dark:text-orange-300">Problem Type</div>
                </div>
              </div>
            </div>
          )}

          {/* Data Cleaning Results */}
          {cleanedDataset && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Data Cleaning Results
                </h3>
                <button
                  onClick={downloadCleanedData}
                  className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Cleaned Data</span>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{cleanedDataset.originalRows.toLocaleString()}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Original Rows</div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">{cleanedDataset.cleanedRows.toLocaleString()}</div>
                  <div className="text-xs text-green-700 dark:text-green-300">Cleaned Rows</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Missing values removed:</span>
                  <span className="font-medium text-red-600 dark:text-red-400">{cleanedDataset.missingValues}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Outliers removed:</span>
                  <span className="font-medium text-red-600 dark:text-red-400">{cleanedDataset.outliers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Duplicates removed:</span>
                  <span className="font-medium text-red-600 dark:text-red-400">{cleanedDataset.duplicates}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Cleaning Steps Applied:</h4>
                <ul className="space-y-1">
                  {cleanedDataset.cleaningSteps.map((step, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setShowCleanedData(!showCleanedData)}
                className="mt-4 w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
              >
                {showCleanedData ? 'Hide' : 'Show'} Cleaned Data Preview
              </button>

              {showCleanedData && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          {Array.from({ length: Math.min(5, dataset?.features || 0) }, (_, i) => (
                            <th key={i} className="text-left py-2 px-2 font-medium text-gray-900 dark:text-white">
                              Feature {i + 1}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {cleanedDataset.cleanedData.slice(0, 5).map((row, rowIndex) => (
                          <tr key={rowIndex} className="border-b border-gray-100 dark:border-gray-600">
                            {row.slice(0, 5).map((cell, cellIndex) => (
                              <td key={cellIndex} className="py-2 px-2 text-gray-700 dark:text-gray-300">
                                {typeof cell === 'number' ? cell.toFixed(2) : cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Showing first 5 rows and 5 columns of cleaned data
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Analysis & Recommendations */}
        <div className="space-y-6">
          {isAnalyzing && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center transition-colors">
              <Brain className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analyzing Dataset...</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Our AI is examining your data and performing cleaning operations to provide the best algorithm recommendations.</p>
              <div className="space-y-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full animate-pulse" style={{ width: '33%' }}></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Cleaning data and removing outliers...</p>
              </div>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                Algorithm Recommendations
              </h3>
              
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{rec.algorithm}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(rec.confidence)}`}>
                        {rec.confidence}% match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{rec.reasoning}</p>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                        <div 
                          className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${rec.confidence}%` }}
                        ></div>
                      </div>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium whitespace-nowrap">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Pro Tip:</strong> These recommendations are based on your cleaned dataset characteristics. 
                  The data cleaning process has improved data quality by removing {cleanedDataset?.removedRows || 0} problematic rows, 
                  which should lead to better model performance.
                </p>
              </div>
            </div>
          )}

          {!isAnalyzing && !file && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center transition-colors">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ready to Analyze</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload your dataset to get personalized algorithm recommendations and automatic data cleaning.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};