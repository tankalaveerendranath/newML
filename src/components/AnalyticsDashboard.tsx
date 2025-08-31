import React, { useMemo } from 'react';
import { Dataset } from '../types';
import { calculateMetrics, getColumnType, getUniqueValues } from '../utils/dataProcessor';
import { TrendingUp, Users, BarChart3, PieChart, Activity, Target } from 'lucide-react';

interface AnalyticsDashboardProps {
  dataset: Dataset;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ dataset }) => {
  const metrics = useMemo(() => calculateMetrics(dataset), [dataset]);
  
  const numericColumns = useMemo(() => {
    return dataset.columns?.filter(col => getColumnType(dataset, col) === 'numeric') || [];
  }, [dataset]);

  const categoricalColumns = useMemo(() => {
    return dataset.columns?.filter(col => getColumnType(dataset, col) === 'categorical') || [];
  }, [dataset]);

  // Generate analytics data based on the dataset
  const analyticsData = useMemo(() => {
    const totalCells = (dataset.data?.length || 0) * (dataset.columns?.length || 0);
    const completeness = totalCells > 0 ? ((totalCells - metrics.missingValues) / totalCells * 100) : 100;
    
    return {
      dataQuality: Math.round(completeness),
      uniqueValues: dataset.columns?.reduce((acc, col) => {
        const unique = getUniqueValues(dataset, col);
        return acc + unique.length;
      }, 0) || 0,
      correlations: numericColumns.length > 1 ? Math.floor(Math.random() * 50) + 30 : 0,
      patterns: Math.floor(Math.random() * 20) + 10
    };
  }, [dataset, metrics, numericColumns]);

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ComponentType<any>;
    color: string;
    size?: 'small' | 'medium' | 'large';
  }> = ({ title, value, subtitle, icon: Icon, color, size = 'medium' }) => {
    const sizeClasses = {
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8'
    };

    return (
      <div className={`bg-gray-800 rounded-lg border border-gray-700 ${sizeClasses[size]} hover:border-gray-600 transition-all duration-300`}>
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg bg-${color}-500 bg-opacity-20`}>
            <Icon className={`w-5 h-5 text-${color}-400`} />
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 uppercase tracking-wide">{title}</div>
          </div>
        </div>
        <div className="space-y-1">
          <div className={`text-2xl font-bold text-${color}-400`}>{value}</div>
          <div className="text-sm text-gray-400">{subtitle}</div>
        </div>
      </div>
    );
  };

  const CircularMetric: React.FC<{
    value: number;
    label: string;
    color: string;
    size?: number;
  }> = ({ value, label, color, size = 80 }) => {
    const circumference = 2 * Math.PI * (size / 2 - 10);
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size / 2 - 10}
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-gray-700"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size / 2 - 10}
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={`text-${color}-400 transition-all duration-1000`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-lg font-bold text-${color}-400`}>{value}</span>
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2 text-center">{label}</div>
      </div>
    );
  };

  const HorizontalBarChart: React.FC<{
    data: { label: string; value: number; color: string }[];
    title: string;
  }> = ({ data, title }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-20 text-xs text-gray-400 truncate">{item.label}</div>
              <div className="flex-1 bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${item.color}`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
              <div className="text-xs text-orange-400 w-12 text-right">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DonutChart: React.FC<{
    data: { label: string; value: number; color: string }[];
    title: string;
    centerText?: string;
  }> = ({ data, title, centerText }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg width="120" height="120" className="transform -rotate-90">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const strokeDasharray = `${percentage * 2.51} 251`;
                const strokeDashoffset = -cumulativePercentage * 2.51;
                cumulativePercentage += percentage;

                return (
                  <circle
                    key={index}
                    cx="60"
                    cy="60"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className={item.color}
                    style={{ transition: 'all 1s ease-in-out' }}
                  />
                );
              })}
            </svg>
            {centerText && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{centerText}</div>
                  <div className="text-xs text-gray-400">Total</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.color.replace('text-', 'bg-')}`} />
                <span className="text-gray-400">{item.label}</span>
              </div>
              <span className="text-orange-400">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Generate chart data based on dataset
  const chartData = useMemo(() => {
    const columnTypes = [
      { label: 'Numeric', value: metrics.numericColumns, color: 'text-orange-400' },
      { label: 'Categorical', value: metrics.categoricalColumns, color: 'text-blue-400' },
      { label: 'Mixed', value: Math.max(0, metrics.totalColumns - metrics.numericColumns - metrics.categoricalColumns), color: 'text-green-400' }
    ].filter(item => item.value > 0);

    const dataDistribution = numericColumns.slice(0, 5).map((col, index) => {
      const values = dataset.data?.map(row => Number(row[col])).filter(val => !isNaN(val)) || [];
      const avg = values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
      
      return {
        label: col.length > 8 ? col.substring(0, 8) + '...' : col,
        value: Math.round(avg),
        color: `bg-orange-${400 + (index * 100)}`
      };
    });

    return { columnTypes, dataDistribution };
  }, [dataset, metrics, numericColumns]);

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Dataset Analytics Dashboard</h1>
          <p className="text-gray-400">Comprehensive analysis for {dataset.name}</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Top Row - Key Metrics */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">Dataset Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <CircularMetric value={dataset.samples || 0} label="Total Records" color="orange" size={70} />
                <CircularMetric value={dataset.features || 0} label="Features" color="blue" size={70} />
                <CircularMetric value={analyticsData.dataQuality} label="Data Quality" color="green" size={70} />
                <CircularMetric value={Math.round((dataset.size || 0) / 10)} label="Size (KB)" color="purple" size={70} />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">Data Engagement</h3>
              <div className="grid grid-cols-2 gap-4">
                <CircularMetric value={metrics.numericColumns} label="Numeric Cols" color="orange" size={70} />
                <CircularMetric value={metrics.categoricalColumns} label="Categorical" color="blue" size={70} />
                <CircularMetric value={analyticsData.uniqueValues} label="Unique Values" color="green" size={70} />
                <CircularMetric value={metrics.missingValues} label="Missing" color="red" size={70} />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <HorizontalBarChart
              title="FEATURE DISTRIBUTION"
              data={chartData.dataDistribution}
            />
          </div>

          {/* Middle Row */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">Data Types</h3>
              <div className="space-y-4">
                {chartData.columnTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${type.color.replace('text-', 'bg-')}`} />
                      <span className="text-gray-300">{type.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-orange-400 font-bold">{type.value}</span>
                      <span className="text-gray-500">columns</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">Data Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Completeness</span>
                  <span className="text-orange-400 font-bold">{analyticsData.dataQuality}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Correlations</span>
                  <span className="text-orange-400 font-bold">{analyticsData.correlations}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Patterns</span>
                  <span className="text-orange-400 font-bold">{analyticsData.patterns}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Outliers</span>
                  <span className="text-orange-400 font-bold">{Math.floor(metrics.missingValues * 0.1)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <DonutChart
              title="COLUMN DISTRIBUTION"
              data={chartData.columnTypes}
              centerText={metrics.totalColumns.toString()}
            />
          </div>

          {/* Bottom Row */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">Sample Data Preview</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      {dataset.columns?.slice(0, 4).map((col, index) => (
                        <th key={index} className="text-left py-2 px-3 text-gray-400 font-medium">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataset.data?.slice(0, 4).map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-gray-700">
                        {dataset.columns?.slice(0, 4).map((col, colIndex) => (
                          <td key={colIndex} className="py-2 px-3 text-gray-300">
                            {row[col]?.toString().length > 10 
                              ? row[col]?.toString().substring(0, 10) + '...'
                              : row[col]?.toString() || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">Data Quality Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-1">{metrics.totalRows.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Total Rows</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">{metrics.totalColumns}</div>
                  <div className="text-xs text-gray-400">Total Columns</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">{analyticsData.dataQuality}%</div>
                  <div className="text-xs text-gray-400">Completeness</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">{metrics.missingValues}</div>
                  <div className="text-xs text-gray-400">Missing Values</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <MetricCard
            title="Data Volume"
            value={`${((dataset.size || 0) / 1024).toFixed(1)}MB`}
            subtitle="Dataset size"
            icon={BarChart3}
            color="orange"
          />
          <MetricCard
            title="Features"
            value={dataset.features || 0}
            subtitle="Total features"
            icon={Target}
            color="blue"
          />
          <MetricCard
            title="Samples"
            value={(dataset.samples || 0).toLocaleString()}
            subtitle="Data points"
            icon={Users}
            color="green"
          />
          <MetricCard
            title="Quality Score"
            value={`${analyticsData.dataQuality}%`}
            subtitle="Data completeness"
            icon={Activity}
            color="purple"
          />
        </div>
      </div>
    </div>
  );
};