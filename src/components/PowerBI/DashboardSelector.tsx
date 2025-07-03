import React from 'react';
import { BarChart3, TrendingUp, GitBranch, PieChart, Brain, Target } from 'lucide-react';

interface DashboardSelectorProps {
  selectedDashboard: string;
  onDashboardChange: (dashboard: string) => void;
}

export const DashboardSelector: React.FC<DashboardSelectorProps> = ({ 
  selectedDashboard, 
  onDashboardChange 
}) => {
  const dashboards = [
    {
      id: 'overview',
      name: 'Overview',
      description: 'General dataset statistics and quality metrics',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'trends',
      name: 'Trends',
      description: 'Time series analysis and pattern detection',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'correlations',
      name: 'Correlations',
      description: 'Feature relationships and dependencies',
      icon: GitBranch,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'distributions',
      name: 'Distributions',
      description: 'Data distribution analysis and outlier detection',
      icon: PieChart,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'predictions',
      name: 'Predictions',
      description: 'ML model performance and feature importance',
      icon: Brain,
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {dashboards.map((dashboard, index) => {
        const IconComponent = dashboard.icon;
        const isSelected = selectedDashboard === dashboard.id;
        
        return (
          <button
            key={dashboard.id}
            onClick={() => onDashboardChange(dashboard.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 animate-fade-in ${
              isSelected
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${dashboard.color} rounded-lg flex items-center justify-center mb-3 mx-auto animate-pulse`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <h3 className={`font-semibold mb-1 ${
              isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'
            }`}>
              {dashboard.name}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
              {dashboard.description}
            </p>
          </button>
        );
      })}
    </div>
  );
};