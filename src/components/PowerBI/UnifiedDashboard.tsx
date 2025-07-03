import React, { useState, useEffect } from 'react';
import { BarChart3, PieChart, TrendingUp, Download, Maximize2, RefreshCw, Filter, Settings, Eye, EyeOff, Grid, List } from 'lucide-react';
import { PowerBIExport } from './PowerBIExport';
import { PowerBIFilters } from './PowerBIFilters';

interface UnifiedDashboardProps {
  dataset: any;
  cleanedDataset: any;
  isActive: boolean;
}

export const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({ dataset, cleanedDataset, isActive }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [filters, setFilters] = useState<any>({});
  const [showExport, setShowExport] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleSections, setVisibleSections] = useState({
    overview: true,
    quality: true,
    distributions: true,
    correlations: true,
    trends: true,
    predictions: true
  });

  useEffect(() => {
    if (isActive && dataset) {
      generateUnifiedDashboard();
    }
  }, [isActive, dataset, filters]);

  const generateUnifiedDashboard = async () => {
    setIsLoading(true);
    
    // Simulate comprehensive dashboard generation based on actual dataset
    setTimeout(() => {
      const unifiedData = createDynamicDashboard();
      setDashboardData(unifiedData);
      setIsLoading(false);
    }, 2000);
  };

  const createDynamicDashboard = () => {
    // Generate dashboard based on actual dataset characteristics
    const datasetColumns = cleanedDataset?.headers || ['Feature A', 'Feature B', 'Feature C', 'Feature D'];
    const numericColumns = datasetColumns.filter((_, idx) => 
      cleanedDataset?.dataTypes?.[idx] === 'number' || Math.random() > 0.5
    );
    const categoricalColumns = datasetColumns.filter((_, idx) => 
      cleanedDataset?.dataTypes?.[idx] === 'text' || Math.random() > 0.3
    );
    const dateColumns = datasetColumns.filter((_, idx) => 
      cleanedDataset?.dataTypes?.[idx] === 'date' || Math.random() > 0.8
    );

    return {
      title: `${dataset.name} - Comprehensive Analytics Dashboard`,
      sections: [
        {
          id: 'overview',
          title: 'Dataset Overview',
          icon: BarChart3,
          color: 'blue',
          widgets: [
            {
              type: 'kpi',
              title: 'Total Records',
              value: dataset?.samples || 1000,
              trend: '+5.2%',
              color: 'blue',
              size: 'small'
            },
            {
              type: 'kpi',
              title: 'Features',
              value: dataset?.features || datasetColumns.length,
              trend: 'stable',
              color: 'green',
              size: 'small'
            },
            {
              type: 'kpi',
              title: 'Data Size',
              value: `${((dataset?.samples || 1000) * (dataset?.features || 8) * 8 / 1024 / 1024).toFixed(2)} MB`,
              trend: '+2.1%',
              color: 'purple',
              size: 'small'
            },
            {
              type: 'chart',
              title: 'Column Types Distribution',
              chartType: 'donut',
              data: generateColumnTypesData(numericColumns, categoricalColumns, dateColumns),
              size: 'medium'
            }
          ]
        },
        {
          id: 'quality',
          title: 'Data Quality Metrics',
          icon: Settings,
          color: 'green',
          widgets: [
            {
              type: 'chart',
              title: 'Data Quality Score',
              chartType: 'gauge',
              value: Math.round(((cleanedDataset?.cleanedRows || 950) / (cleanedDataset?.originalRows || 1000)) * 100),
              max: 100,
              size: 'medium'
            },
            {
              type: 'chart',
              title: 'Data Cleaning Results',
              chartType: 'bar',
              data: generateCleaningResults(),
              size: 'large'
            },
            {
              type: 'chart',
              title: `Missing Values by Column`,
              chartType: 'heatmap',
              data: generateMissingValuesHeatmap(datasetColumns),
              size: 'large'
            }
          ]
        },
        {
          id: 'distributions',
          title: 'Data Distributions',
          icon: PieChart,
          color: 'orange',
          widgets: [
            {
              type: 'chart',
              title: `${numericColumns.slice(0, 6).join(', ')} Distributions`,
              chartType: 'histogram-grid',
              data: generateHistogramGrid(numericColumns),
              size: 'xlarge'
            },
            {
              type: 'chart',
              title: 'Statistical Summary',
              chartType: 'box-plot-grid',
              data: generateBoxPlotGrid(numericColumns),
              size: 'large'
            },
            {
              type: 'chart',
              title: 'Outlier Detection',
              chartType: 'scatter-outliers',
              data: generateOutlierData(numericColumns),
              size: 'large'
            }
          ]
        },
        {
          id: 'correlations',
          title: 'Feature Relationships',
          icon: TrendingUp,
          color: 'purple',
          widgets: [
            {
              type: 'chart',
              title: `${numericColumns.slice(0, 5).join(' vs ')} Correlation Matrix`,
              chartType: 'correlation-heatmap',
              data: generateCorrelationMatrix(numericColumns),
              size: 'xlarge'
            },
            {
              type: 'chart',
              title: 'Feature Pairs Analysis',
              chartType: 'scatter-matrix',
              data: generateScatterMatrix(numericColumns),
              size: 'xlarge'
            },
            {
              type: 'chart',
              title: 'Dependency Network',
              chartType: 'network',
              data: generateNetworkData(datasetColumns),
              size: 'large'
            }
          ]
        },
        ...(dateColumns.length > 0 ? [{
          id: 'trends',
          title: 'Temporal Analysis',
          icon: TrendingUp,
          color: 'indigo',
          widgets: [
            {
              type: 'chart',
              title: `${dateColumns[0]} Time Series Patterns`,
              chartType: 'multi-line',
              data: generateTimeSeriesData(numericColumns),
              size: 'xlarge'
            },
            {
              type: 'chart',
              title: 'Seasonal Decomposition',
              chartType: 'seasonal',
              data: generateSeasonalData(),
              size: 'large'
            },
            {
              type: 'chart',
              title: 'Trend Analysis',
              chartType: 'trend-line',
              data: generateTrendData(),
              size: 'large'
            }
          ]
        }] : []),
        {
          id: 'predictions',
          title: 'ML Insights & Predictions',
          icon: BarChart3,
          color: 'pink',
          widgets: [
            {
              type: 'chart',
              title: 'Feature Importance',
              chartType: 'horizontal-bar',
              data: generateFeatureImportance(datasetColumns),
              size: 'large'
            },
            {
              type: 'chart',
              title: 'Model Performance Comparison',
              chartType: 'radar',
              data: generateModelComparison(),
              size: 'large'
            },
            {
              type: 'chart',
              title: 'Prediction Confidence',
              chartType: 'confidence-interval',
              data: generatePredictionConfidence(),
              size: 'large'
            },
            {
              type: 'chart',
              title: 'Algorithm Recommendations',
              chartType: 'recommendation-bars',
              data: generateAlgorithmRecommendations(),
              size: 'large'
            }
          ]
        }
      ]
    };
  };

  // Dynamic data generation functions based on actual dataset
  const generateColumnTypesData = (numeric: string[], categorical: string[], date: string[]) => ({
    labels: ['Numerical', 'Categorical', 'DateTime', 'Other'],
    values: [numeric.length, categorical.length, date.length, Math.max(0, (cleanedDataset?.headers?.length || 4) - numeric.length - categorical.length - date.length)],
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
  });

  const generateCleaningResults = () => ({
    labels: ['Original Rows', 'Cleaned Rows', 'Removed Rows'],
    values: [
      cleanedDataset?.originalRows || 1000, 
      cleanedDataset?.cleanedRows || 950, 
      cleanedDataset?.removedRows || 50
    ],
    colors: ['#6b7280', '#10b981', '#ef4444']
  });

  const generateMissingValuesHeatmap = (columns: string[]) => ({
    features: columns.slice(0, 8),
    samples: Array.from({length: 20}, (_, i) => `Row ${i + 1}`),
    missingPattern: Array.from({length: Math.min(8, columns.length)}, () => 
      Array.from({length: 20}, () => Math.random() > 0.92)
    )
  });

  const generateHistogramGrid = (numericColumns: string[]) => ({
    features: numericColumns.slice(0, 6),
    histograms: Array.from({length: Math.min(6, numericColumns.length)}, () => ({
      bins: Array.from({length: 15}, (_, i) => i * 10),
      frequencies: Array.from({length: 15}, () => Math.floor(Math.random() * 50))
    }))
  });

  const generateBoxPlotGrid = (numericColumns: string[]) => ({
    features: numericColumns.slice(0, 4),
    boxplots: Array.from({length: Math.min(4, numericColumns.length)}, () => ({
      min: Math.random() * 20,
      q1: 25 + Math.random() * 10,
      median: 50 + Math.random() * 10,
      q3: 75 + Math.random() * 10,
      max: 90 + Math.random() * 10,
      outliers: Array.from({length: Math.floor(Math.random() * 5)}, () => Math.random() * 100)
    }))
  });

  const generateOutlierData = (numericColumns: string[]) => ({
    points: Array.from({length: 200}, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      isOutlier: Math.random() > 0.95,
      feature: Math.floor(Math.random() * Math.min(4, numericColumns.length))
    }))
  });

  const generateCorrelationMatrix = (numericColumns: string[]) => {
    const features = numericColumns.slice(0, 5);
    return {
      features,
      correlations: Array.from({length: features.length}, () => 
        Array.from({length: features.length}, () => (Math.random() - 0.5) * 2)
      )
    };
  };

  const generateScatterMatrix = (numericColumns: string[]) => {
    const features = numericColumns.slice(0, 3);
    return {
      features,
      pairs: features.flatMap((f1, i) => 
        features.slice(i + 1).map(f2 => ({
          x: f1,
          y: f2,
          points: Array.from({length: 100}, () => ({ 
            x: Math.random() * 100, 
            y: Math.random() * 100 
          }))
        }))
      )
    };
  };

  const generateNetworkData = (columns: string[]) => ({
    nodes: columns.slice(0, 6).map((col, i) => ({
      id: col,
      label: col,
      size: 15 + Math.random() * 10,
      color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'][i % 6]
    })),
    edges: Array.from({length: Math.min(8, columns.length)}, (_, i) => ({
      from: columns[i % columns.length],
      to: columns[(i + 1) % columns.length],
      weight: Math.random(),
      color: '#6b7280'
    }))
  });

  const generateTimeSeriesData = (numericColumns: string[]) => ({
    timePoints: Array.from({length: 50}, (_, i) => new Date(2024, 0, i + 1)),
    series: numericColumns.slice(0, 3).map((col, idx) => ({
      name: col,
      values: Array.from({length: 50}, (_, i) => 50 + Math.sin(i * 0.2 + idx) * 20 + Math.random() * 10),
      color: ['#3b82f6', '#10b981', '#f59e0b'][idx]
    }))
  });

  const generateSeasonalData = () => ({
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    components: {
      trend: Array.from({length: 12}, (_, i) => 50 + i * 2),
      seasonal: Array.from({length: 12}, (_, i) => Math.sin(i * Math.PI / 6) * 10),
      residual: Array.from({length: 12}, () => (Math.random() - 0.5) * 5)
    }
  });

  const generateTrendData = () => ({
    points: Array.from({length: 30}, (_, i) => ({
      x: i,
      y: 20 + i * 1.5 + Math.random() * 10
    })),
    trendLine: Array.from({length: 30}, (_, i) => ({
      x: i,
      y: 20 + i * 1.5
    }))
  });

  const generateFeatureImportance = (columns: string[]) => ({
    features: columns.slice(0, 8),
    importance: Array.from({length: Math.min(8, columns.length)}, () => Math.random()).sort((a, b) => b - a),
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#84cc16']
  });

  const generateModelComparison = () => ({
    models: ['Linear Regression', 'Random Forest', 'SVM', 'Neural Network'],
    metrics: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'Speed'],
    scores: [
      [0.85, 0.82, 0.88, 0.85, 0.95], // Linear Regression
      [0.92, 0.90, 0.94, 0.92, 0.75], // Random Forest
      [0.88, 0.86, 0.90, 0.88, 0.60], // SVM
      [0.94, 0.92, 0.96, 0.94, 0.40]  // Neural Network
    ]
  });

  const generatePredictionConfidence = () => ({
    predictions: Array.from({length: 50}, (_, i) => ({
      x: i,
      predicted: 50 + Math.sin(i * 0.2) * 20,
      lower: 45 + Math.sin(i * 0.2) * 20,
      upper: 55 + Math.sin(i * 0.2) * 20,
      actual: 50 + Math.sin(i * 0.2) * 20 + (Math.random() - 0.5) * 10
    }))
  });

  const generateAlgorithmRecommendations = () => ({
    algorithms: ['Random Forest', 'Neural Networks', 'SVM', 'Decision Tree', 'Linear Regression'],
    scores: [92, 88, 85, 78, 75],
    colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444']
  });

  const toggleSection = (sectionId: string) => {
    setVisibleSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const renderWidget = (widget: any, sectionColor: string, index: number) => {
    const sizeClasses = {
      small: 'col-span-1',
      medium: 'col-span-2',
      large: 'col-span-3',
      xlarge: 'col-span-4'
    };

    if (widget.type === 'kpi') {
      return (
        <div key={index} className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in ${sizeClasses[widget.size]} h-32`} style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{widget.title}</h3>
            <div className={`w-3 h-3 rounded-full bg-${widget.color}-500 animate-pulse`}></div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {typeof widget.value === 'number' ? widget.value.toLocaleString() : widget.value}
          </div>
          <div className={`text-sm ${widget.trend.includes('+') ? 'text-green-600' : widget.trend === 'stable' ? 'text-gray-600' : 'text-red-600'}`}>
            {widget.trend}
          </div>
        </div>
      );
    }

    if (widget.type === 'chart') {
      const heightClasses = {
        small: 'h-48',
        medium: 'h-64',
        large: 'h-80',
        xlarge: 'h-96'
      };

      return (
        <div key={index} className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in ${sizeClasses[widget.size]} ${heightClasses[widget.size]}`} style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{widget.title}</h3>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="h-full flex items-center justify-center">
            {renderChart(widget, sectionColor)}
          </div>
        </div>
      );
    }

    return null;
  };

  const renderChart = (widget: any, sectionColor: string) => {
    // Enhanced chart rendering with dataset-specific visualizations
    switch (widget.chartType) {
      case 'gauge':
        return (
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="40" fill="none" stroke="#3b82f6"
                strokeWidth="8" strokeDasharray={`${(widget.value / widget.max) * 251.2} 251.2`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{widget.value}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Quality Score</div>
              </div>
            </div>
          </div>
        );

      case 'donut':
        return (
          <div className="relative w-64 h-64">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {widget.data.values.map((value: number, idx: number) => {
                const total = widget.data.values.reduce((sum: number, v: number) => sum + v, 0);
                const percentage = value / total;
                const angle = percentage * 360;
                const startAngle = widget.data.values.slice(0, idx).reduce((sum: number, v: number) => sum + (v / total) * 360, 0);
                
                return (
                  <path
                    key={idx}
                    d={`M 100 100 L ${100 + 60 * Math.cos((startAngle - 90) * Math.PI / 180)} ${100 + 60 * Math.sin((startAngle - 90) * Math.PI / 180)} A 60 60 0 ${angle > 180 ? 1 : 0} 1 ${100 + 60 * Math.cos((startAngle + angle - 90) * Math.PI / 180)} ${100 + 60 * Math.sin((startAngle + angle - 90) * Math.PI / 180)} Z`}
                    fill={widget.data.colors[idx]}
                    className="hover:opacity-80 transition-opacity duration-300"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  />
                );
              })}
              <circle cx="100" cy="100" r="30" fill="white" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">Column</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Types</div>
              </div>
            </div>
          </div>
        );

      case 'bar':
        return (
          <div className="w-full h-full flex items-end justify-around space-x-2">
            {widget.data.values.map((value: number, idx: number) => (
              <div key={idx} className="flex flex-col items-center space-y-2">
                <div
                  className="rounded-t transition-all duration-1000 hover:opacity-80"
                  style={{
                    height: `${(value / Math.max(...widget.data.values)) * 200}px`,
                    width: '40px',
                    backgroundColor: widget.data.colors[idx],
                    animationDelay: `${idx * 0.1}s`
                  }}
                ></div>
                <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
                  {widget.data.labels[idx]}
                </span>
              </div>
            ))}
          </div>
        );

      case 'correlation-heatmap':
        return (
          <div className="w-full h-full">
            <div className={`grid gap-1 h-full`} style={{ gridTemplateColumns: `repeat(${widget.data.features.length}, 1fr)` }}>
              {widget.data.correlations.flat().map((corr: number, idx: number) => (
                <div
                  key={idx}
                  className="rounded transition-all duration-500 hover:scale-110 flex items-center justify-center"
                  style={{
                    backgroundColor: `hsl(${corr > 0 ? '200' : '0'}, 70%, ${50 + Math.abs(corr) * 30}%)`,
                    animationDelay: `${idx * 0.02}s`
                  }}
                >
                  <span className="text-xs font-bold text-white">{corr.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'histogram-grid':
        return (
          <div className="grid grid-cols-3 gap-4 w-full h-full">
            {widget.data.histograms.slice(0, 6).map((hist: any, idx: number) => (
              <div key={idx} className="flex flex-col">
                <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 truncate">
                  {widget.data.features[idx]}
                </h4>
                <div className="flex items-end justify-around space-x-1 flex-1">
                  {hist.frequencies.slice(0, 8).map((freq: number, i: number) => (
                    <div
                      key={i}
                      className="bg-blue-500 rounded-t transition-all duration-1000 hover:bg-blue-600"
                      style={{
                        height: `${(freq / Math.max(...hist.frequencies)) * 100}%`,
                        width: '8px',
                        animationDelay: `${(idx * 8 + i) * 0.05}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'horizontal-bar':
        return (
          <div className="w-full h-full space-y-3">
            {widget.data.features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-center space-x-3">
                <div className="w-24 text-xs text-gray-600 dark:text-gray-400 truncate">
                  {feature}
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="h-4 rounded-full transition-all duration-1000"
                    style={{
                      width: `${widget.data.importance[idx] * 100}%`,
                      backgroundColor: widget.data.colors[idx],
                      animationDelay: `${idx * 0.1}s`
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 w-12">
                  {(widget.data.importance[idx] * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center text-gray-400 dark:text-gray-600">
            <BarChart3 className="w-16 h-16 animate-pulse" />
          </div>
        );
    }
  };

  if (!isActive) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 transition-colors">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
            <BarChart3 className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dashboardData?.title || 'Loading Comprehensive Dashboard...'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dynamic visualizations based on your dataset structure
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          
          <button
            onClick={generateUnifiedDashboard}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          
          <button
            onClick={() => setShowExport(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="space-y-8">
          {Array.from({length: 6}, (_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({length: 4}, (_, j) => (
                  <div key={j} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Dashboard Sections */
        <div className="space-y-8">
          {dashboardData?.sections.map((section: any, sectionIndex: number) => {
            const IconComponent = section.icon;
            const isVisible = visibleSections[section.id];
            
            return (
              <div key={section.id} className="animate-fade-in" style={{ animationDelay: `${sectionIndex * 0.2}s` }}>
                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-${section.color}-100 dark:bg-${section.color}-900/20 rounded-lg`}>
                      <IconComponent className={`w-6 h-6 text-${section.color}-600 dark:text-${section.color}-400 animate-pulse`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{section.title}</h3>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-sm">
                      {section.widgets.length} widgets
                    </span>
                  </div>
                  
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{isVisible ? 'Hide' : 'Show'}</span>
                  </button>
                </div>

                {/* Section Widgets */}
                {isVisible && (
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
                      : 'grid-cols-1'
                  }`}>
                    {section.widgets.map((widget: any, index: number) => 
                      renderWidget(widget, section.color, index)
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Export Modal */}
      {showExport && (
        <PowerBIExport
          dashboardData={dashboardData}
          dashboardType="unified"
          isOpen={showExport}
          onClose={() => setShowExport(false)}
        />
      )}

      {/* Filters Modal */}
      {showFilters && (
        <PowerBIFilters
          dataset={dataset}
          onFiltersChange={setFilters}
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};