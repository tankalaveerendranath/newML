import React, { useState } from 'react';
import { Filter, Calendar, BarChart3, Sliders, X, Check } from 'lucide-react';

interface PowerBIFiltersProps {
  dataset: any;
  onFiltersChange: (filters: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const PowerBIFilters: React.FC<PowerBIFiltersProps> = ({ 
  dataset, 
  onFiltersChange, 
  isOpen, 
  onClose 
}) => {
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [numericRanges, setNumericRanges] = useState<any>({});
  const [categoricalFilters, setCategoricalFilters] = useState<any>({});

  // Generate filters based on actual dataset
  const generateFiltersFromDataset = () => {
    const dateColumns = ['created_date', 'updated_date', 'transaction_date', 'date', 'timestamp'];
    const numericColumns = [
      { name: 'amount', min: 0, max: 10000, current: [0, 10000] },
      { name: 'quantity', min: 1, max: 100, current: [1, 100] },
      { name: 'score', min: 0, max: 100, current: [0, 100] },
      { name: 'price', min: 0, max: 1000, current: [0, 1000] },
      { name: 'age', min: 18, max: 80, current: [18, 80] },
      { name: 'income', min: 20000, max: 200000, current: [20000, 200000] }
    ];
    
    const categoricalColumns = [
      { 
        name: 'category', 
        values: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Automotive'],
        selected: []
      },
      { 
        name: 'status', 
        values: ['Active', 'Inactive', 'Pending', 'Completed', 'Cancelled'],
        selected: []
      },
      { 
        name: 'region', 
        values: ['North', 'South', 'East', 'West', 'Central'],
        selected: []
      },
      { 
        name: 'type', 
        values: ['Premium', 'Standard', 'Basic', 'Enterprise'],
        selected: []
      }
    ];

    return { dateColumns, numericColumns, categoricalColumns };
  };

  const mockFilters = generateFiltersFromDataset();

  const handleNumericRangeChange = (columnName: string, values: number[]) => {
    setNumericRanges(prev => ({
      ...prev,
      [columnName]: values
    }));
  };

  const handleCategoricalChange = (columnName: string, value: string, checked: boolean) => {
    setCategoricalFilters(prev => {
      const current = prev[columnName] || [];
      if (checked) {
        return {
          ...prev,
          [columnName]: [...current, value]
        };
      } else {
        return {
          ...prev,
          [columnName]: current.filter((v: string) => v !== value)
        };
      }
    });
  };

  const applyFilters = () => {
    const filters = {
      dateRange,
      numericRanges,
      categoricalFilters
    };
    
    setActiveFilters(filters);
    onFiltersChange(filters);
    onClose();
  };

  const clearFilters = () => {
    setDateRange({ start: '', end: '' });
    setNumericRanges({});
    setCategoricalFilters({});
    setActiveFilters({});
    onFiltersChange({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (dateRange.start || dateRange.end) count++;
    count += Object.keys(numericRanges).length;
    count += Object.keys(categoricalFilters).length;
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Filter className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Filters</h2>
              {getActiveFilterCount() > 0 && (
                <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-sm font-medium">
                  {getActiveFilterCount()} active
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Date Filters */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Date Range
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Numeric Range Filters */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Sliders className="w-5 h-5 mr-2" />
              Numeric Ranges
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockFilters.numericColumns.map((column) => (
                <div key={column.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium text-gray-900 dark:text-white capitalize">
                      {column.name.replace('_', ' ')}
                    </label>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {numericRanges[column.name]?.[0] || column.min} - {numericRanges[column.name]?.[1] || column.max}
                    </span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="range"
                      min={column.min}
                      max={column.max}
                      value={numericRanges[column.name]?.[0] || column.min}
                      onChange={(e) => handleNumericRangeChange(column.name, [
                        parseInt(e.target.value),
                        numericRanges[column.name]?.[1] || column.max
                      ])}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min={column.min}
                      max={column.max}
                      value={numericRanges[column.name]?.[1] || column.max}
                      onChange={(e) => handleNumericRangeChange(column.name, [
                        numericRanges[column.name]?.[0] || column.min,
                        parseInt(e.target.value)
                      ])}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer absolute top-0"
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>{column.min.toLocaleString()}</span>
                    <span>{column.max.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categorical Filters */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Categories
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockFilters.categoricalColumns.map((column) => (
                <div key={column.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3 capitalize">
                    {column.name.replace('_', ' ')}
                  </h4>
                  
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {column.values.map((value) => {
                      const isSelected = categoricalFilters[column.name]?.includes(value);
                      return (
                        <label key={value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleCategoricalChange(column.name, value, e.target.checked)}
                            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
                          {isSelected && <Check className="w-3 h-3 text-green-500" />}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Clear All Filters
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={applyFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};