import React, { useState, useEffect } from 'react';
import { BarChart3, PieChart, TrendingUp, Download, Maximize2, RefreshCw, Filter, Settings } from 'lucide-react';

interface PowerBIDashboardProps {
  dataset: any;
  dashboardType: 'overview' | 'trends' | 'correlations' | 'distributions' | 'predictions';
  isActive: boolean;
}

export const PowerBIDashboard: React.FC<PowerBIDashboardProps> = ({ dataset, dashboardType, isActive }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    if (isActive && dataset) {
      generateDashboard();
    }
  }, [isActive, dataset, dashboardType]);

  const generateDashboard = async () => {
    setIsLoading(true);
    
    // Simulate PowerBI dashboard generation
    setTimeout(() => {
      const mockDashboard = createMockDashboard();
      setDashboardData(mockDashboard);
      setIsLoading(false);
    }, 2000);
  };

  const createMockDashboard = () => {
    switch (dashboardType) {
      case 'overview':
        return {
          title: 'Dataset Overview Dashboard',
          widgets: [
            {
              type: 'kpi',
              title: 'Total Records',
              value: dataset?.samples || 1000,
              trend: '+5.2%',
              color: 'blue'
            },
            {
              type: 'kpi',
              title: 'Features',
              value: dataset?.features || 8,
              trend: 'stable',
              color: 'green'
            },
            {
              type: 'chart',
              title: 'Data Quality Score',
              chartType: 'gauge',
              value: 87,
              max: 100
            },
            {
              type: 'chart',
              title: 'Feature Distribution',
              chartType: 'bar',
              data: generateFeatureDistribution()
            }
          ]
        };
      
      case 'trends':
        return {
          title: 'Trends Analysis Dashboard',
          widgets: [
            {
              type: 'chart',
              title: 'Time Series Trends',
              chartType: 'line',
              data: generateTimeSeriesData()
            },
            {
              type: 'chart',
              title: 'Growth Patterns',
              chartType: 'area',
              data: generateGrowthData()
            },
            {
              type: 'chart',
              title: 'Seasonal Patterns',
              chartType: 'heatmap',
              data: generateSeasonalData()
            }
          ]
        };
      
      case 'correlations':
        return {
          title: 'Correlation Analysis Dashboard',
          widgets: [
            {
              type: 'chart',
              title: 'Correlation Matrix',
              chartType: 'heatmap',
              data: generateCorrelationMatrix()
            },
            {
              type: 'chart',
              title: 'Feature Relationships',
              chartType: 'scatter',
              data: generateScatterData()
            },
            {
              type: 'chart',
              title: 'Dependency Network',
              chartType: 'network',
              data: generateNetworkData()
            }
          ]
        };
      
      case 'distributions':
        return {
          title: 'Data Distributions Dashboard',
          widgets: [
            {
              type: 'chart',
              title: 'Feature Histograms',
              chartType: 'histogram',
              data: generateHistogramData()
            },
            {
              type: 'chart',
              title: 'Box Plots',
              chartType: 'boxplot',
              data: generateBoxPlotData()
            },
            {
              type: 'chart',
              title: 'Probability Distributions',
              chartType: 'density',
              data: generateDensityData()
            }
          ]
        };
      
      case 'predictions':
        return {
          title: 'Predictive Analytics Dashboard',
          widgets: [
            {
              type: 'chart',
              title: 'Model Performance',
              chartType: 'gauge',
              value: 92,
              max: 100
            },
            {
              type: 'chart',
              title: 'Prediction Confidence',
              chartType: 'bar',
              data: generateConfidenceData()
            },
            {
              type: 'chart',
              title: 'Feature Importance',
              chartType: 'horizontal-bar',
              data: generateFeatureImportance()
            },
            {
              type: 'chart',
              title: 'Prediction vs Actual',
              chartType: 'scatter',
              data: generatePredictionData()
            }
          ]
        };
      
      default:
        return null;
    }
  };

  const generateFeatureDistribution = () => ({
    labels: ['Numerical', 'Categorical', 'Boolean', 'Date'],
    values: [45, 30, 15, 10],
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
  });

  const generateTimeSeriesData = () => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Trend 1',
        data: [65, 78, 82, 88, 95, 102],
        color: '#3b82f6'
      },
      {
        label: 'Trend 2',
        data: [45, 52, 58, 65, 72, 78],
        color: '#10b981'
      }
    ]
  });

  const generateGrowthData = () => ({
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    values: [25, 45, 65, 85],
    color: '#8b5cf6'
  });

  const generateSeasonalData = () => ({
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    hours: Array.from({length: 24}, (_, i) => i),
    values: Array.from({length: 12}, () => 
      Array.from({length: 24}, () => Math.random() * 100)
    )
  });

  const generateCorrelationMatrix = () => ({
    features: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
    correlations: [
      [1.0, 0.8, 0.3, -0.2],
      [0.8, 1.0, 0.5, -0.1],
      [0.3, 0.5, 1.0, 0.7],
      [-0.2, -0.1, 0.7, 1.0]
    ]
  });

  const generateScatterData = () => ({
    points: Array.from({length: 100}, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      category: Math.floor(Math.random() * 3)
    }))
  });

  const generateNetworkData = () => ({
    nodes: [
      {id: 'A', label: 'Feature A', size: 20},
      {id: 'B', label: 'Feature B', size: 15},
      {id: 'C', label: 'Feature C', size: 25},
      {id: 'D', label: 'Feature D', size: 18}
    ],
    edges: [
      {from: 'A', to: 'B', weight: 0.8},
      {from: 'B', to: 'C', weight: 0.5},
      {from: 'C', to: 'D', weight: 0.7},
      {from: 'A', to: 'D', weight: 0.3}
    ]
  });

  const generateHistogramData = () => ({
    bins: Array.from({length: 20}, (_, i) => i * 5),
    frequencies: Array.from({length: 20}, () => Math.floor(Math.random() * 50))
  });

  const generateBoxPlotData = () => ({
    features: ['Feature A', 'Feature B', 'Feature C'],
    boxplots: [
      {min: 10, q1: 25, median: 50, q3: 75, max: 90, outliers: [5, 95]},
      {min: 15, q1: 30, median: 45, q3: 70, max: 85, outliers: [8, 92]},
      {min: 20, q1: 35, median: 55, q3: 80, max: 95, outliers: [12, 98]}
    ]
  });

  const generateDensityData = () => ({
    x: Array.from({length: 100}, (_, i) => i),
    densities: Array.from({length: 100}, (_, i) => 
      Math.exp(-Math.pow(i - 50, 2) / 200) + Math.random() * 0.1
    )
  });

  const generateConfidenceData = () => ({
    labels: ['High', 'Medium', 'Low'],
    values: [65, 25, 10],
    colors: ['#10b981', '#f59e0b', '#ef4444']
  });

  const generateFeatureImportance = () => ({
    features: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
    importance: [0.35, 0.28, 0.18, 0.12, 0.07]
  });

  const generatePredictionData = () => ({
    points: Array.from({length: 50}, () => ({
      actual: Math.random() * 100,
      predicted: Math.random() * 100
    }))
  });

  const renderWidget = (widget: any, index: number) => {
    if (widget.type === 'kpi') {
      return (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{widget.title}</h3>
            <div className={`w-3 h-3 rounded-full bg-${widget.color}-500 animate-pulse`}></div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {typeof widget.value === 'number' ? widget.value.toLocaleString() : widget.value}
          </div>
          <div className={`text-sm ${widget.trend.includes('+') ? 'text-green-600' : widget.trend === 'stable' ? 'text-gray-600' : 'text-red-600'}`}>
            {widget.trend}
          </div>
        </div>
      );
    }

    if (widget.type === 'chart') {
      return (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{widget.title}</h3>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center">
            {renderChart(widget)}
          </div>
        </div>
      );
    }

    return null;
  };

  const renderChart = (widget: any) => {
    switch (widget.chartType) {
      case 'gauge':
        return (
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="8"
                strokeDasharray={`${(widget.value / widget.max) * 251.2} 251.2`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{widget.value}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
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
                  className="bg-blue-500 rounded-t transition-all duration-1000 hover:bg-blue-600"
                  style={{
                    height: `${(value / Math.max(...widget.data.values)) * 200}px`,
                    width: '40px',
                    animationDelay: `${idx * 0.1}s`
                  }}
                ></div>
                <span className="text-xs text-gray-600 dark:text-gray-400 transform rotate-45">
                  {widget.data.labels[idx]}
                </span>
              </div>
            ))}
          </div>
        );

      case 'line':
        return (
          <div className="w-full h-full relative">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              {widget.data.datasets.map((dataset: any, idx: number) => {
                const points = dataset.data.map((value: number, i: number) => 
                  `${(i / (dataset.data.length - 1)) * 380 + 10},${200 - (value / Math.max(...dataset.data)) * 180}`
                ).join(' ');
                
                return (
                  <polyline
                    key={idx}
                    points={points}
                    fill="none"
                    stroke={dataset.color}
                    strokeWidth="3"
                    className="animate-pulse"
                    style={{ animationDelay: `${idx * 0.5}s` }}
                  />
                );
              })}
            </svg>
          </div>
        );

      case 'heatmap':
        return (
          <div className="grid grid-cols-4 gap-1 w-full h-full">
            {Array.from({length: 16}, (_, i) => (
              <div
                key={i}
                className="rounded transition-all duration-500 hover:scale-110"
                style={{
                  backgroundColor: `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 30 + 50}%)`,
                  animationDelay: `${i * 0.05}s`
                }}
              ></div>
            ))}
          </div>
        );

      case 'scatter':
        return (
          <div className="relative w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 300 200">
              {widget.data.points.slice(0, 30).map((point: any, idx: number) => (
                <circle
                  key={idx}
                  cx={point.x * 2.8 + 10}
                  cy={200 - point.y * 1.8 - 10}
                  r="3"
                  fill={['#3b82f6', '#10b981', '#f59e0b'][point.category]}
                  className="animate-pulse hover:r-5 transition-all duration-300"
                  style={{ animationDelay: `${idx * 0.02}s` }}
                />
              ))}
            </svg>
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {dashboardData?.title || 'Loading Dashboard...'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Interactive PowerBI-style analytics
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={generateDashboard}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({length: 6}, (_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData?.widgets.map((widget: any, index: number) => renderWidget(widget, index))}
        </div>
      )}
    </div>
  );
};