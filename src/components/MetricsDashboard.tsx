import React from 'react';
import { Dataset, DashboardMetrics } from '../types';
import { calculateMetrics } from '../utils/dataProcessor';
import { BarChart3, Database, AlertTriangle, CheckCircle, TrendingUp, Users } from 'lucide-react';

interface MetricsDashboardProps {
  dataset: Dataset;
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ dataset }) => {
  const metrics = calculateMetrics(dataset);
  
  const completenessPercentage = ((metrics.totalRows * metrics.totalColumns - metrics.missingValues) / 
    (metrics.totalRows * metrics.totalColumns) * 100).toFixed(1);

  const metricCards = [
    {
      title: 'Data Quality',
      value: `${completenessPercentage}%`,
      subtitle: 'Completeness',
      icon: CheckCircle,
      color: 'green',
      trend: '+2.3%'
    },
    {
      title: 'Total Records',
      value: metrics.totalRows.toLocaleString(),
      subtitle: 'Rows in dataset',
      icon: Database,
      color: 'blue',
      trend: 'New upload'
    },
    {
      title: 'Data Dimensions',
      value: `${metrics.numericColumns}/${metrics.categoricalColumns}`,
      subtitle: 'Numeric/Categorical',
      icon: BarChart3,
      color: 'purple',
      trend: `${metrics.totalColumns} total`
    },
    {
      title: 'Missing Values',
      value: metrics.missingValues.toLocaleString(),
      subtitle: 'Null or empty cells',
      icon: AlertTriangle,
      color: metrics.missingValues > 0 ? 'red' : 'green',
      trend: `${((metrics.missingValues / (metrics.totalRows * metrics.totalColumns)) * 100).toFixed(1)}%`
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(metric.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 font-medium">{metric.trend}</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="text-sm font-medium text-gray-700">{metric.title}</div>
                <div className="text-xs text-gray-500">{metric.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dataset Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
            Column Analysis
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-medium text-blue-900">Numeric Columns</div>
                <div className="text-sm text-blue-700">Suitable for mathematical operations</div>
              </div>
              <div className="text-2xl font-bold text-blue-600">{metrics.numericColumns}</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <div className="font-medium text-green-900">Categorical Columns</div>
                <div className="text-sm text-green-700">Text-based grouping variables</div>
              </div>
              <div className="text-2xl font-bold text-green-600">{metrics.categoricalColumns}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-primary-600" />
            Data Health
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Data Completeness</span>
              <span className="font-semibold text-gray-900">{completenessPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completenessPercentage}%` }}
              ></div>
            </div>
            
            <div className="pt-2 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Cells</span>
                <span className="font-medium">{(metrics.totalRows * metrics.totalColumns).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Populated Cells</span>
                <span className="font-medium text-green-600">
                  {(metrics.totalRows * metrics.totalColumns - metrics.missingValues).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Missing Values</span>
                <span className={`font-medium ${metrics.missingValues > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {metrics.missingValues.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Column Details */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Column Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Column Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sample Values
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unique Count
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dataset.columns.map((column, index) => {
                const columnType = getColumnType(dataset, column);
                const sampleValues = dataset.data.slice(0, 3).map(row => row[column]).filter(val => val !== null && val !== '');
                const uniqueCount = new Set(dataset.data.map(row => row[column])).size;
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {column}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        columnType === 'numeric' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {columnType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {sampleValues.slice(0, 3).join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {uniqueCount.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};