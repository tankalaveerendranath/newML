import React, { useState, useCallback } from 'react';
import { ArrowLeft, Upload, FileText, BarChart3, Brain, Zap, Download, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { Dataset, DatasetRecommendation, DatasetAnalysis } from '../../types';
import { useDatasetHistory } from '../../hooks/useDatasetHistory';
import { useAuth } from '../../hooks/useAuth';
import { AnimatedBackground } from '../Dashboard/AnimatedBackground';

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
  originalData: any[][];
  headers: string[];
  cleaningSteps: string[];
  dataTypes: string[];
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

  const parseCSVData = (csvText: string): { headers: string[], data: any[][], dataTypes: string[] } => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const rawData = lines.slice(1).map(line => 
      line.split(',').map(cell => cell.trim().replace(/"/g, ''))
    );

    // Detect data types for each column
    const dataTypes = headers.map((_, colIndex) => {
      const sample = rawData.slice(0, 5).map(row => row[colIndex]).filter(val => val && val !== '');
      if (sample.length === 0) return 'text';
      
      const isNumeric = sample.every(val => !isNaN(Number(val)) && val !== '');
      return isNumeric ? 'number' : 'text';
    });

    // Convert data based on detected types
    const processedData = rawData.map(row => 
      row.map((cell, colIndex) => {
        if (!cell || cell === '' || cell.toLowerCase() === 'null' || cell.toLowerCase() === 'na') {
          return null;
        }
        return dataTypes[colIndex] === 'number' ? Number(cell) : cell;
      })
    );

    return { headers, data: processedData, dataTypes };
  };

  const simulateDataCleaning = (originalData: any[][], headers: string[], dataTypes: string[]): CleanedDataset => {
    const originalRows = originalData.length;
    let cleanedData = [...originalData];
    const cleaningSteps: string[] = [];
    let removedRows = 0;
    let missingValues = 0;
    let outliers = 0;
    let duplicates = 0;

    // Step 1: Remove rows with missing values
    const rowsWithMissing = cleanedData.filter(row => row.some(cell => cell === null || cell === undefined));
    missingValues = rowsWithMissing.length;
    cleanedData = cleanedData.filter(row => !row.some(cell => cell === null || cell === undefined));
    removedRows += missingValues;
    if (missingValues > 0) {
      cleaningSteps.push(`Removed ${missingValues} rows with missing values`);
    }

    // Step 2: Remove duplicates
    const uniqueData: any[][] = [];
    const seen = new Set();
    cleanedData.forEach(row => {
      const rowString = JSON.stringify(row);
      if (!seen.has(rowString)) {
        seen.add(rowString);
        uniqueData.push(row);
      } else {
        duplicates++;
      }
    });
    cleanedData = uniqueData;
    removedRows += duplicates;
    if (duplicates > 0) {
      cleaningSteps.push(`Removed ${duplicates} duplicate rows`);
    }

    // Step 3: Remove outliers for numerical columns
    headers.forEach((header, colIndex) => {
      if (dataTypes[colIndex] === 'number') {
        const values = cleanedData.map(row => row[colIndex]).filter(val => typeof val === 'number');
        if (values.length > 0) {
          const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
          const std = Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length);
          const threshold = 2; // 2 standard deviations
          
          const beforeOutlierRemoval = cleanedData.length;
          cleanedData = cleanedData.filter(row => {
            const value = row[colIndex];
            if (typeof value === 'number') {
              return Math.abs(value - mean) <= threshold * std;
            }
            return true;
          });
          const outliersRemoved = beforeOutlierRemoval - cleanedData.length;
          outliers += outliersRemoved;
        }
      }
    });
    
    if (outliers > 0) {
      cleaningSteps.push(`Removed ${outliers} outlier data points`);
    }

    // Add data processing steps
    cleaningSteps.push('Validated data types and formats');
    cleaningSteps.push('Standardized text formatting');
    cleaningSteps.push('Applied data quality checks');

    const cleanedRows = cleanedData.length;

    return {
      originalRows,
      cleanedRows,
      removedRows: originalRows - cleanedRows,
      missingValues,
      outliers,
      duplicates,
      cleanedData,
      originalData,
      headers,
      cleaningSteps,
      dataTypes
    };
  };

  const analyzeDataset = useCallback((file: File) => {
    setIsAnalyzing(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target?.result as string;
      const { headers, data, dataTypes } = parseCSVData(csvText);
      
      setTimeout(() => {
        const mockDataset: Dataset = {
          name: file.name,
          size: Math.round(file.size / 1024), // KB
          features: headers.length - 1, // Assuming last column is target
          samples: data.length,
          type: dataTypes.some(type => type === 'number') ? 
                (dataTypes.every(type => type === 'number') ? 'numerical' : 'mixed') : 'categorical',
          target: data.some(row => row[row.length - 1] === 0 || row[row.length - 1] === 1) ? 'classification' : 
                  dataTypes[dataTypes.length - 1] === 'number' ? 'regression' : 'classification'
        };

        const cleaned = simulateDataCleaning(data, headers, dataTypes);
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
    };
    
    reader.readAsText(file);
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
      
      if (dataset.features > 3) {
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
      
      if (dataset.samples > 100) {
        recommendations.push({
          algorithm: 'Support Vector Machine',
          confidence: 88,
          reasoning: 'SVM is effective for datasets with complex decision boundaries.'
        });
      }
    }
    
    if (dataset.target === 'regression') {
      recommendations.push({
        algorithm: 'Linear Regression',
        confidence: 75,
        reasoning: 'Good baseline for regression problems, especially with numerical features.'
      });
      
      if (dataset.features > 2) {
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
    
    if (dataset.samples > 1000 && dataset.features > 10) {
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
    
    const csvContent = [
      cleanedDataset.headers.join(','),
      ...cleanedDataset.cleanedData.map(row => 
        row.map(cell => {
          if (cell === null || cell === undefined) return '';
          if (typeof cell === 'string' && cell.includes(',')) return `"${cell}"`;
          return cell;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cleaned_${file?.name || 'dataset.csv'}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white animate-fade-in">Dataset Analysis & Recommendations</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-2 animate-bounce" />
                Upload Your Dataset
              </h2>
              
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 scale-105'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className={`w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4 ${dragActive ? 'animate-bounce' : 'animate-pulse'}`} />
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
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-all duration-300 transform hover:scale-105"
                >
                  Choose File
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                  Supported formats: CSV, JSON, Excel (.xlsx, .xls)
                </p>
              </div>

              {file && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
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
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 animate-pulse" />
                  Dataset Overview
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:scale-105 transition-transform">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{dataset.samples.toLocaleString()}</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Samples</div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:scale-105 transition-transform">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{dataset.features}</div>
                    <div className="text-sm text-emerald-700 dark:text-emerald-300">Features</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:scale-105 transition-transform">
                    <div className="text-sm font-medium text-purple-600 dark:text-purple-400 capitalize">{dataset.type}</div>
                    <div className="text-xs text-purple-700 dark:text-purple-300">Data Type</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:scale-105 transition-transform">
                    <div className="text-sm font-medium text-orange-600 dark:text-orange-400 capitalize">{dataset.target}</div>
                    <div className="text-xs text-orange-700 dark:text-orange-300">Problem Type</div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Cleaning Results */}
            {cleanedDataset && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600 animate-pulse" />
                    Data Cleaning Results
                  </h3>
                  <button
                    onClick={downloadCleanedData}
                    className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 text-sm transform hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Cleaned Data</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{cleanedDataset.originalRows.toLocaleString()}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Original Rows</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:scale-105 transition-transform">
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
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0 animate-pulse" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setShowCleanedData(!showCleanedData)}
                  className="mt-4 w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  {showCleanedData ? 'Hide' : 'Show'} Cleaned Data Preview
                </button>

                {showCleanedData && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-600">
                            {cleanedDataset.headers.map((header, index) => (
                              <th key={index} className="text-left py-2 px-2 font-medium text-gray-900 dark:text-white">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {cleanedDataset.cleanedData.slice(0, 5).map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-gray-100 dark:border-gray-600">
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="py-2 px-2 text-gray-700 dark:text-gray-300">
                                  {cell === null || cell === undefined ? 'N/A' : 
                                   typeof cell === 'number' ? cell.toLocaleString() : String(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Showing first 5 rows of cleaned data with original column values preserved
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Analysis & Recommendations */}
          <div className="space-y-6">
            {isAnalyzing && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center transition-colors animate-fade-in">
                <Brain className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analyzing Dataset...</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Our AI is examining your data and performing cleaning operations to provide the best algorithm recommendations.</p>
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full animate-pulse" style={{ width: '66%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Processing data and preserving original values...</p>
                </div>
              </div>
            )}

            {recommendations.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500 animate-pulse" />
                  Algorithm Recommendations
                </h3>
                
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{rec.algorithm}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(rec.confidence)} animate-pulse`}>
                          {rec.confidence}% match
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{rec.reasoning}</p>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                          <div 
                            className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${rec.confidence}%` }}
                          ></div>
                        </div>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium whitespace-nowrap transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg animate-fade-in">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Pro Tip:</strong> These recommendations are based on your cleaned dataset characteristics. 
                    The data cleaning process preserved original column values while removing {cleanedDataset?.removedRows || 0} problematic rows, 
                    which should lead to better model performance.
                  </p>
                </div>
              </div>
            )}

            {!isAnalyzing && !file && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center transition-colors animate-fade-in">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-gray-400 dark:text-gray-500 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ready to Analyze</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Upload your dataset to get personalized algorithm recommendations and automatic data cleaning with preserved original values.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};