import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter
} from 'recharts';
import { Dataset, ChartConfig } from '../types/index';
import { getColumnType, getUniqueValues } from '../utils/dataProcessor';
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, TrendingUp, ScatterChart as Scatter3D } from 'lucide-react';

interface DataVisualizationProps {
  dataset: Dataset;
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'];

export const DataVisualization: React.FC<DataVisualizationProps> = ({ dataset }) => {
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    type: 'bar',
    title: 'Data Visualization'
  });

  const numericColumns = useMemo(() => {
    return dataset.columns.filter(col => getColumnType(dataset, col) === 'numeric');
  }, [dataset]);

  const categoricalColumns = useMemo(() => {
    return dataset.columns.filter(col => getColumnType(dataset, col) === 'categorical');
  }, [dataset]);

  const chartData = useMemo(() => {
    if (!chartConfig.xAxis) return [];

    if (chartConfig.type === 'pie') {
      const values = getUniqueValues(dataset, chartConfig.xAxis);
      return values.slice(0, 8).map(value => {
        const count = dataset.data.filter(row => row[chartConfig.xAxis!] === value).length;
        return { name: value.toString(), value: count };
      });
    }

    // For other chart types, aggregate data
    const groupedData: { [key: string]: any } = {};
    
    dataset.data.forEach(row => {
      const xValue = row[chartConfig.xAxis!]?.toString() || 'Unknown';
      if (!groupedData[xValue]) {
        groupedData[xValue] = { name: xValue };
      }
      
      if (chartConfig.yAxis) {
        const yValue = Number(row[chartConfig.yAxis]) || 0;
        groupedData[xValue][chartConfig.yAxis] = (groupedData[xValue][chartConfig.yAxis] || 0) + yValue;
      }
    });

    return Object.values(groupedData).slice(0, 20);
  }, [dataset, chartConfig]);

  const renderChart = () => {
    if (!chartConfig.xAxis || chartData.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Select columns to generate visualization</p>
          </div>
        </div>
      );
    }

    const commonProps = {
      width: '100%',
      height: 300,
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (chartConfig.type) {
      case 'bar':
        return (
          <ResponsiveContainer {...commonProps}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chartConfig.yAxis && (
                <Bar dataKey={chartConfig.yAxis} fill="#3b82f6" />
              )}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer {...commonProps}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chartConfig.yAxis && (
                <Line type="monotone" dataKey={chartConfig.yAxis} stroke="#3b82f6" strokeWidth={2} />
              )}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer {...commonProps}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chartConfig.yAxis && (
                <Area type="monotone" dataKey={chartConfig.yAxis} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              )}
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer {...commonProps}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'scatter':
        return (
          <ResponsiveContainer {...commonProps}>
            <ScatterChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chartConfig.yAxis && (
                <Scatter dataKey={chartConfig.yAxis} fill="#3b82f6" />
              )}
            </ScatterChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const chartTypes = [
    { type: 'bar' as const, icon: BarChart3, label: 'Bar Chart' },
    { type: 'line' as const, icon: LineChartIcon, label: 'Line Chart' },
    { type: 'area' as const, icon: TrendingUp, label: 'Area Chart' },
    { type: 'pie' as const, icon: PieChartIcon, label: 'Pie Chart' },
    { type: 'scatter' as const, icon: Scatter3D, label: 'Scatter Plot' }
  ];

  return (
    <div className="space-y-6">
      {/* Chart Configuration */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Visualization Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
            <div className="grid grid-cols-2 gap-2">
              {chartTypes.map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => setChartConfig(prev => ({ ...prev, type }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    chartConfig.type === type
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-xs font-medium">{label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">X-Axis</label>
            <select
              value={chartConfig.xAxis || ''}
              onChange={(e) => setChartConfig(prev => ({ ...prev, xAxis: e.target.value }))}
              className="input-field"
            >
              <option value="">Select column</option>
              {dataset.columns.map(column => (
                <option key={column} value={column}>{column}</option>
              ))}
            </select>
          </div>

          {chartConfig.type !== 'pie' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Y-Axis</label>
              <select
                value={chartConfig.yAxis || ''}
                onChange={(e) => setChartConfig(prev => ({ ...prev, yAxis: e.target.value }))}
                className="input-field"
              >
                <option value="">Select column</option>
                {numericColumns.map(column => (
                  <option key={column} value={column}>{column}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={chartConfig.title}
              onChange={(e) => setChartConfig(prev => ({ ...prev, title: e.target.value }))}
              className="input-field"
              placeholder="Chart title"
            />
          </div>
        </div>
      </div>

      {/* Chart Display */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{chartConfig.title}</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          {renderChart()}
        </div>
      </div>
    </div>
  );
};