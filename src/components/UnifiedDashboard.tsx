import React, { useMemo } from 'react';
import { Dataset } from '../types';
import { calculateMetrics, getColumnType, getUniqueValues } from '../utils/dataProcessor';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, ScatterChart, Scatter
} from 'recharts';
import { 
  Database, TrendingUp, BarChart3, PieChart as PieIcon, 
  Activity, Target, Users, AlertTriangle, CheckCircle,
  FileText, Hash, Type, Calendar
} from 'lucide-react';

interface UnifiedDashboardProps {
  dataset: Dataset;
}

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f59e0b'];

export const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({ dataset }) => {
  const metrics = useMemo(() => calculateMetrics(dataset), [dataset]);
  
  const numericColumns = useMemo(() => {
    return dataset.columns?.filter(col => getColumnType(dataset, col) === 'numeric') || [];
  }, [dataset]);

  const categoricalColumns = useMemo(() => {
    return dataset.columns?.filter(col => getColumnType(dataset, col) === 'categorical') || [];
  }, [dataset]);

  // Generate comprehensive analytics
  const analytics = useMemo(() => {
    const totalCells = (dataset.data?.length || 0) * (dataset.columns?.length || 0);
    const completeness = totalCells > 0 ? ((totalCells - metrics.missingValues) / totalCells * 100) : 100;
    
    // Column type distribution
    const columnTypeData = [
      { name: 'Numeric', value: metrics.numericColumns, color: '#f97316' },
      { name: 'Categorical', value: metrics.categoricalColumns, color: '#3b82f6' }
    ].filter(item => item.value > 0);

    // Data quality distribution
    const qualityData = [
      { name: 'Complete', value: totalCells - metrics.missingValues, color: '#10b981' },
      { name: 'Missing', value: metrics.missingValues, color: '#ef4444' }
    ].filter(item => item.value > 0);

    // Feature analysis for numeric columns
    const featureAnalysis = numericColumns.slice(0, 6).map((col, index) => {
      const values = dataset.data?.map(row => Number(row[col])).filter(val => !isNaN(val)) || [];
      const sum = values.reduce((acc, val) => acc + val, 0);
      const avg = values.length > 0 ? sum / values.length : 0;
      const max = values.length > 0 ? Math.max(...values) : 0;
      const min = values.length > 0 ? Math.min(...values) : 0;
      
      return {
        name: col.length > 12 ? col.substring(0, 12) + '...' : col,
        average: Math.round(avg * 100) / 100,
        maximum: max,
        minimum: min,
        count: values.length
      };
    });

    // Category distribution for first categorical column
    const categoryData = categoricalColumns.length > 0 ? 
      getUniqueValues(dataset, categoricalColumns[0]).slice(0, 8).map((value, index) => {
        const count = dataset.data?.filter(row => row[categoricalColumns[0]] === value).length || 0;
        return { 
          name: value.toString().length > 15 ? value.toString().substring(0, 15) + '...' : value.toString(), 
          value: count,
          color: COLORS[index % COLORS.length]
        };
      }) : [];

    // Correlation matrix data (simplified)
    const correlationData = numericColumns.slice(0, 5).map((col1, i) => {
      const row: any = { name: col1.length > 8 ? col1.substring(0, 8) + '...' : col1 };
      numericColumns.slice(0, 5).forEach((col2, j) => {
        // Simplified correlation calculation (random for demo)
        row[col2.length > 8 ? col2.substring(0, 8) + '...' : col2] = 
          i === j ? 1 : Math.random() * 0.8 + 0.1;
      });
      return row;
    });

    return {
      completeness: Math.round(completeness),
      columnTypeData,
      qualityData,
      featureAnalysis,
      categoryData,
      correlationData,
      totalCells,
      uniqueValuesCount: dataset.columns?.reduce((acc, col) => {
        return acc + getUniqueValues(dataset, col).length;
      }, 0) || 0
    };
  }, [dataset, metrics, numericColumns, categoricalColumns]);

  const CircularProgress: React.FC<{
    value: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    label?: string;
    showPercentage?: boolean;
  }> = ({ value, size = 80, strokeWidth = 8, color = 'orange', label, showPercentage = true }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              className="text-gray-700"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className={`text-${color}-400 transition-all duration-1000 ease-out`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-lg font-bold text-${color}-400`}>
                {showPercentage ? `${value}%` : value}
              </div>
            </div>
          </div>
        </div>
        {label && (
          <div className="text-xs text-gray-400 mt-2 text-center max-w-20 truncate">{label}</div>
        )}
      </div>
    );
  };

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ComponentType<any>;
    color: string;
    trend?: string;
  }> = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 hover:border-gray-600 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg bg-${color}-500 bg-opacity-20`}>
          <Icon className={`w-5 h-5 text-${color}-400`} />
        </div>
        {trend && (
          <div className="text-xs text-gray-500">{trend}</div>
        )}
      </div>
      <div className="space-y-1">
        <div className={`text-xl font-bold text-${color}-400`}>{value}</div>
        <div className="text-sm font-medium text-gray-300">{title}</div>
        {subtitle && (
          <div className="text-xs text-gray-500">{subtitle}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">DATASET ANALYTICS DASHBOARD</h1>
          <p className="text-teal-400 uppercase tracking-wide text-sm">{dataset.name} • Comprehensive Analysis</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Dataset Overview Section */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-6 uppercase tracking-wide">DATASET OVERVIEW</h3>
              <div className="grid grid-cols-2 gap-6">
                <CircularProgress 
                  value={Math.min(dataset.samples || 0, 100)} 
                  label="Records" 
                  color="orange" 
                  showPercentage={false}
                />
                <CircularProgress 
                  value={Math.min(dataset.features || 0, 100)} 
                  label="Features" 
                  color="blue" 
                  showPercentage={false}
                />
                <CircularProgress 
                  value={analytics.completeness} 
                  label="Quality" 
                  color="green" 
                />
                <CircularProgress 
                  value={Math.min(Math.round((dataset.size || 0) / 10), 100)} 
                  label="Size (KB)" 
                  color="purple" 
                  showPercentage={false}
                />
              </div>
            </div>
          </div>

          {/* Data Engagement Section */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-6 uppercase tracking-wide">DATA ENGAGEMENT</h3>
              <div className="grid grid-cols-2 gap-6">
                <CircularProgress 
                  value={metrics.numericColumns} 
                  label="Numeric" 
                  color="orange" 
                  showPercentage={false}
                />
                <CircularProgress 
                  value={metrics.categoricalColumns} 
                  label="Categorical" 
                  color="blue" 
                  showPercentage={false}
                />
                <CircularProgress 
                  value={Math.min(analytics.uniqueValuesCount, 999)} 
                  label="Unique Values" 
                  color="green" 
                  showPercentage={false}
                />
                <CircularProgress 
                  value={metrics.missingValues} 
                  label="Missing" 
                  color="red" 
                  showPercentage={false}
                />
              </div>
            </div>
          </div>

          {/* Feature Distribution Chart */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">FEATURE DISTRIBUTION</h3>
              <div className="space-y-3">
                {analytics.featureAnalysis.map((feature, index) => {
                  const maxValue = Math.max(...analytics.featureAnalysis.map(f => f.average));
                  const percentage = maxValue > 0 ? (feature.average / maxValue) * 100 : 0;
                  
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-16 text-xs text-gray-400 truncate">{feature.name}</div>
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-orange-500 transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-orange-400 w-12 text-right">
                        {feature.average}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Data Types Breakdown */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">DATA TYPES</h3>
              <div className="space-y-4">
                {analytics.columnTypeData.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: type.color }} />
                      <span className="text-gray-300">{type.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-orange-400 font-bold">{type.value}</span>
                      <span className="text-gray-500 text-xs">cols</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Quality Pie Chart */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">DATA QUALITY</h3>
              <div className="flex justify-center">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie
                      data={analytics.qualityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={50}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {analytics.qualityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {analytics.qualityData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-400">{item.name}</span>
                    </div>
                    <span className="text-orange-400 font-bold">{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category Distribution */}
          {analytics.categoryData.length > 0 && (
            <div className="col-span-12 lg:col-span-6">
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
                <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">
                  CATEGORY DISTRIBUTION - {categoricalColumns[0]?.toUpperCase()}
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.categoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        axisLine={{ stroke: '#4B5563' }}
                      />
                      <YAxis 
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        axisLine={{ stroke: '#4B5563' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F3F4F6'
                        }}
                      />
                      <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Numeric Features Trend */}
          {numericColumns.length > 0 && (
            <div className="col-span-12 lg:col-span-6">
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
                <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">NUMERIC FEATURES TREND</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.featureAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        axisLine={{ stroke: '#4B5563' }}
                      />
                      <YAxis 
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        axisLine={{ stroke: '#4B5563' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F3F4F6'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="average" 
                        stroke="#f97316" 
                        strokeWidth={3}
                        dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Key Metrics Grid */}
          <div className="col-span-12">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
              <MetricCard
                title="Total Records"
                value={metrics.totalRows.toLocaleString()}
                icon={Database}
                color="orange"
                trend="Rows"
              />
              <MetricCard
                title="Features"
                value={metrics.totalColumns}
                icon={Target}
                color="blue"
                trend="Columns"
              />
              <MetricCard
                title="Numeric Cols"
                value={metrics.numericColumns}
                icon={Hash}
                color="green"
                trend="Numbers"
              />
              <MetricCard
                title="Text Cols"
                value={metrics.categoricalColumns}
                icon={Type}
                color="purple"
                trend="Categories"
              />
              <MetricCard
                title="Data Quality"
                value={`${analytics.completeness}%`}
                icon={CheckCircle}
                color="teal"
                trend="Complete"
              />
              <MetricCard
                title="Missing Values"
                value={metrics.missingValues.toLocaleString()}
                icon={AlertTriangle}
                color="red"
                trend="Nulls"
              />
            </div>
          </div>

          {/* Feature Analysis Table */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">FEATURE ANALYSIS</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Feature</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Unique</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Missing</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Sample</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataset.columns?.slice(0, 8).map((column, index) => {
                      const columnType = getColumnType(dataset, column);
                      const uniqueCount = getUniqueValues(dataset, column).length;
                      const missingCount = dataset.data?.filter(row => 
                        row[column] === null || row[column] === '' || row[column] === undefined
                      ).length || 0;
                      const sampleValue = dataset.data?.[0]?.[column]?.toString() || '-';
                      
                      return (
                        <tr key={index} className="border-b border-gray-700 hover:bg-gray-750">
                          <td className="py-3 px-4 text-gray-300 font-medium">{column}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              columnType === 'numeric' 
                                ? 'bg-orange-900 text-orange-300' 
                                : 'bg-blue-900 text-blue-300'
                            }`}>
                              {columnType}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-orange-400 font-bold">{uniqueCount}</td>
                          <td className="py-3 px-4 text-red-400">{missingCount}</td>
                          <td className="py-3 px-4 text-gray-400 max-w-32 truncate">{sampleValue}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Data Insights */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">DATA INSIGHTS</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Completeness</span>
                  <span className="text-orange-400 font-bold">{analytics.completeness}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Density</span>
                  <span className="text-orange-400 font-bold">
                    {Math.round((analytics.totalCells / 1000) * 10) / 10}K
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Diversity</span>
                  <span className="text-orange-400 font-bold">
                    {Math.round((analytics.uniqueValuesCount / analytics.totalCells) * 100)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Sparsity</span>
                  <span className="text-orange-400 font-bold">
                    {Math.round((metrics.missingValues / analytics.totalCells) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Data Preview */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">SAMPLE DATA PREVIEW</h3>
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
                    {dataset.data?.slice(0, 5).map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-gray-700">
                        {dataset.columns?.slice(0, 4).map((col, colIndex) => (
                          <td key={colIndex} className="py-2 px-3 text-gray-300">
                            {row[col]?.toString().length > 15 
                              ? row[col]?.toString().substring(0, 15) + '...'
                              : row[col]?.toString() || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {(dataset.data?.length || 0) > 5 && (
                <div className="mt-3 text-center text-xs text-gray-500">
                  Showing 5 of {dataset.data?.length.toLocaleString()} rows
                </div>
              )}
            </div>
          </div>

          {/* Data Quality Metrics */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">QUALITY METRICS</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-1">
                    {metrics.totalRows.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">Total Rows</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">
                    {metrics.totalColumns}
                  </div>
                  <div className="text-xs text-gray-400">Total Columns</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">
                    {analytics.completeness}%
                  </div>
                  <div className="text-xs text-gray-400">Completeness</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">
                    {analytics.uniqueValuesCount.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">Unique Values</div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistical Summary for Numeric Columns */}
          {numericColumns.length > 0 && (
            <div className="col-span-12">
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-teal-400 mb-4 uppercase tracking-wide">STATISTICAL SUMMARY</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Feature</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Count</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Mean</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Min</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Max</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.featureAnalysis.map((feature, index) => (
                        <tr key={index} className="border-b border-gray-700 hover:bg-gray-750">
                          <td className="py-3 px-4 text-gray-300 font-medium">{feature.name}</td>
                          <td className="py-3 px-4 text-orange-400">{feature.count.toLocaleString()}</td>
                          <td className="py-3 px-4 text-blue-400">{feature.average}</td>
                          <td className="py-3 px-4 text-green-400">{feature.minimum}</td>
                          <td className="py-3 px-4 text-purple-400">{feature.maximum}</td>
                          <td className="py-3 px-4 text-teal-400">
                            {(feature.maximum - feature.minimum).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};