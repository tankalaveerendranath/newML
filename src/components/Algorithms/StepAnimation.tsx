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

interface StepAnimationProps {
  step: AlgorithmStep;
  isActive: boolean;
  algorithmId: string;
}

export const StepAnimation: React.FC<StepAnimationProps> = ({ step, isActive, algorithmId }) => {
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
              isActive ? 'text-blue-700 dark:text-blue-200' : '  text-gray-600 dark:text-gray-300'
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
        
        {/* Visualization and Mathematical Example */}
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
            
            {/* Mathematical Example - only show for the first step */}
            {step.id === 1 && (
              <MathematicalExample 
                example={
                  algorithmId === 'linear-regression' ? {
                    title: 'House Price Prediction Example',
                    dataset: {
                      description: 'Predicting house prices based on size (square feet)',
                      features: ['Size (sq ft)', 'Price ($)'],
                      data: [
                        [1000, 150000],
                        [1200, 180000],
                        [1500, 225000],
                        [1800, 270000],
                        [2000, 300000]
                      ]
                    },
                    calculations: [
                      {
                        step: 1,
                        title: 'Initialize Parameters',
                        formula: 'θ₀ = 0, θ₁ = 0, α = 0.0001',
                        calculation: 'Starting with zero weights and learning rate 0.0001',
                        result: 'θ₀ = 0, θ₁ = 0',
                        explanation: 'We start with zero parameters and will learn the optimal values through gradient descent.'
                      },
                      {
                        step: 2,
                        title: 'First Prediction',
                        formula: 'ŷ = θ₀ + θ₁ × x',
                        calculation: 'ŷ₁ = 0 + 0 × 1000 = 0',
                        result: '0',
                        explanation: 'With zero parameters, our initial predictions are all zero, which is clearly wrong.'
                      },
                      {
                        step: 3,
                        title: 'Calculate Cost (MSE)',
                        formula: 'J = (1/2m) × Σ(ŷᵢ - yᵢ)²',
                        calculation: 'J = (1/10) × [(0-150000)² + (0-180000)² + ... ] = 5.145 × 10¹⁰',
                        result: '51,450,000,000',
                        explanation: 'The initial cost is very high because our predictions are far from actual values.'
                      }
                    ],
                    finalResult: 'After many iterations, the algorithm converges to θ₀ ≈ 30,000 and θ₁ ≈ 135, giving us the equation: Price = 30,000 + 135 × Size.'
                  } : {
                    title: 'Mathematical Example',
                    dataset: {
                      description: 'Example calculation',
                      features: ['Feature'],
                      data: [[1]]
                    },
                    calculations: [{
                      step: 1,
                      title: 'Example Step',
                      formula: 'Example formula',
                      calculation: 'Example calculation',
                      result: 'Example result',
                      explanation: 'Example explanation'
                    }],
                    finalResult: 'Example final result'
                  }
                }
                isActive={isActive}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};