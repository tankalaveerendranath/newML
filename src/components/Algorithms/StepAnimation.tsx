import React, { useEffect, useState } from 'react';
import { AlgorithmStep } from '../../types';
import { LinearRegressionViz } from './Visualizations/LinearRegressionViz';
import { DecisionTreeViz } from './Visualizations/DecisionTreeViz';
import { RandomForestViz } from './Visualizations/RandomForestViz';
import { KMeansViz } from './Visualizations/KMeansViz';
import { NeuralNetworkViz } from './Visualizations/NeuralNetworkViz';
import { SVMViz } from './Visualizations/SVMViz';
import { PseudocodeDisplay } from './PseudocodeDisplay';
import { MathematicalExample } from './MathematicalExample';
import { algorithms } from '../../data/algorithms';

interface StepAnimationProps {
  step: AlgorithmStep;
  isActive: boolean;
  algorithmId: string;
  isLastStep: boolean;
}

export const StepAnimation: React.FC<StepAnimationProps> = ({ step, isActive, algorithmId, isLastStep }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShouldAnimate(true);
    }
  }, [isActive]);

  const getAnimationClass = () => {
    if (!shouldAnimate) return 'opacity-0 transform translate-y-4';
    
    switch (step.animation) {
      case 'slideInLeft':
        return 'animate-slide-in-left';
      case 'slideInRight':
        return 'animate-slide-in-right';
      case 'slideInUp':
        return 'animate-slide-in-up';
      case 'slideInDown':
        return 'animate-slide-in-down';
      case 'fadeInUp':
        return 'animate-fade-in-up';
      case 'fadeInDown':
        return 'animate-fade-in-down';
      case 'bounceIn':
        return 'animate-bounce-in';
      case 'zoomIn':
        return 'animate-zoom-in';
      case 'rotateIn':
        return 'animate-rotate-in';
      default:
        return 'animate-fade-in';
    }
  };

  const renderVisualization = () => {
    if (!isActive) return null;

    switch (algorithmId) {
      case 'linear-regression':
        return <LinearRegressionViz isActive={isActive} step={step.id} />;
      case 'decision-tree':
        return <DecisionTreeViz isActive={isActive} step={step.id} />;
      case 'random-forest':
        return <RandomForestViz isActive={isActive} step={step.id} />;
      case 'kmeans':
        return <KMeansViz isActive={isActive} step={step.id} />;
      case 'neural-networks':
        return <NeuralNetworkViz isActive={isActive} step={step.id} />;
      case 'svm':
        return <SVMViz isActive={isActive} step={step.id} />;
      default:
        return null;
    }
  };

  const getCurrentAlgorithm = () => {
    return algorithms.find(algo => algo.id === algorithmId);
  };

  return (
    <div className={`transition-all duration-700 ${getAnimationClass()}`}>
      <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
        isActive 
          ? 'border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-lg' 
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
      }`}>
        <div className="flex items-start space-x-4">
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
            isActive 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            {step.id}
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold mb-2 transition-colors ${
              isActive ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
            }`}>
              {step.title}
            </h3>
            <p className={`text-sm transition-colors ${
              isActive ? 'text-blue-700 dark:text-blue-200' : 'text-gray-600 dark:text-gray-300'
            }`}>
              {step.description}
            </p>
            {step.code && isActive && (
              <div className="mt-3 p-3 bg-gray-900 dark:bg-gray-800 rounded-lg">
                <code className="text-green-400 text-xs font-mono">
                  {step.code}
                </code>
              </div>
            )}
          </div>
        </div>
        
        {/* Visualization and Pseudocode */}
        {isActive && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                {renderVisualization()}
              </div>
              <div>
                <PseudocodeDisplay 
                  algorithmId={algorithmId} 
                  isActive={isActive} 
                  step={step.id} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Mathematical Example - Show only after the last step */}
      {isLastStep && isActive && getCurrentAlgorithm()?.mathematicalExample && (
        <div className="mt-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-2xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">📊 Complete Mathematical Example</h3>
            <p className="text-purple-100">
              Now that you understand all the steps, let's see how {getCurrentAlgorithm()?.name} works with real data and calculations.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-b-2xl border-2 border-purple-200 dark:border-purple-700">
            <MathematicalExample 
              example={getCurrentAlgorithm()!.mathematicalExample}
              isActive={isActive}
            />
          </div>
        </div>
      )}
    </div>
  );
};