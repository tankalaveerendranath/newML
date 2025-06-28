import React, { useState } from 'react';
import { Calculator, Play, Pause, RotateCcw, ChevronRight, ChevronDown } from 'lucide-react';
import { MathematicalExample as MathExample } from '../../types';

interface MathematicalExampleProps {
  example: MathExample;
  isActive: boolean;
}

export const MathematicalExample: React.FC<MathematicalExampleProps> = ({ example, isActive }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDataset, setShowDataset] = useState(true);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < example.calculations.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 3000);
    } else if (isPlaying && currentStep === example.calculations.length - 1) {
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, example.calculations.length]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  if (!isActive) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-600 mt-4 transition-colors">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calculator className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{example.title}</h4>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePlay}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                isPlaying 
                  ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30' 
                  : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30'
              }`}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Dataset Section */}
        <div className="mb-6">
          <button
            onClick={() => setShowDataset(!showDataset)}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {showDataset ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <span className="font-medium">Example Dataset</span>
          </button>
          
          {showDataset && (
            <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{example.dataset.description}</p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      {example.dataset.features.map((feature, index) => (
                        <th key={index} className="text-left py-2 px-3 font-medium text-gray-900 dark:text-white">
                          {feature}
                        </th>
                      ))}
                      {example.dataset.labels && (
                        <th className="text-left py-2 px-3 font-medium text-gray-900 dark:text-white">Target</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {example.dataset.data.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-gray-100 dark:border-gray-600">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="py-2 px-3 text-gray-700 dark:text-gray-300">
                            {typeof cell === 'number' ? cell.toFixed(2) : cell}
                          </td>
                        ))}
                        {example.dataset.labels && (
                          <td className="py-2 px-3 text-gray-700 dark:text-gray-300">
                            {example.dataset.labels[rowIndex]}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Calculation Steps */}
        <div className="space-y-4">
          <h5 className="font-medium text-gray-900 dark:text-white">Step-by-Step Calculations:</h5>
          
          {example.calculations.map((calc, index) => (
            <div
              key={calc.step}
              className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                index <= currentStep
                  ? 'border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
              } ${index === currentStep ? 'ring-2 ring-blue-400 dark:ring-blue-500' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  index <= currentStep
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {calc.step}
                </div>
                <div className="flex-1">
                  <h6 className="font-medium text-gray-900 dark:text-white mb-2">{calc.title}</h6>
                  
                  <div className="space-y-2">
                    <div className="bg-gray-900 dark:bg-gray-800 rounded p-3 font-mono text-sm">
                      <div className="text-green-400 mb-1">Formula:</div>
                      <div className="text-white">{calc.formula}</div>
                    </div>
                    
                    {index <= currentStep && (
                      <div className="bg-blue-900 dark:bg-blue-800 rounded p-3 font-mono text-sm animate-fade-in">
                        <div className="text-blue-300 mb-1">Calculation:</div>
                        <div className="text-white">{calc.calculation}</div>
                        <div className="text-yellow-300 mt-2">
                          Result: <span className="font-bold">{calc.result}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {index <= currentStep && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 animate-fade-in">
                      {calc.explanation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Result */}
        {currentStep >= example.calculations.length - 1 && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg animate-fade-in">
            <h6 className="font-semibold text-green-800 dark:text-green-300 mb-2">Final Result:</h6>
            <p className="text-green-700 dark:text-green-400">{example.finalResult}</p>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Step {currentStep + 1} of {example.calculations.length}</span>
          <div className="flex space-x-1">
            {example.calculations.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};