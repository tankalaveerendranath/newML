import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle, XCircle, Calculator } from 'lucide-react';
import { Algorithm } from '../../types';
import { StepAnimation } from './StepAnimation';
import { MathematicalExample } from './MathematicalExample';

interface AlgorithmExplainerProps {
  algorithm: Algorithm;
  onBack: () => void;
}

export const AlgorithmExplainer: React.FC<AlgorithmExplainerProps> = ({ algorithm, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showExample, setShowExample] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < algorithm.steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          const next = prev + 1;
          setCompletedSteps(completed => new Set([...completed, prev]));
          return next;
        });
      }, 4000); // Increased time to allow for animations
    } else if (isPlaying && currentStep === algorithm.steps.length - 1) {
      setCompletedSteps(completed => new Set([...completed, currentStep]));
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, algorithm.steps.length]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setCompletedSteps(new Set());
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setIsPlaying(false);
  };

  const toggleExample = () => {
    setShowExample(!showExample);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            
            <div className="flex items-center space-x-4">
              {/* Explain with Example Button */}
              <button
                onClick={toggleExample}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  showExample 
                    ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/30' 
                    : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>{showExample ? 'Hide Example' : 'Explain with an Example'}</span>
              </button>
              
              <button
                onClick={handlePlay}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isPlaying 
                    ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30' 
                    : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Play Animation</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Algorithm Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 transition-colors">
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{algorithm.name}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{algorithm.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    Advantages
                  </h3>
                  <ul className="space-y-2">
                    {algorithm.pros.map((pro, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <XCircle className="w-5 h-5 text-red-600 mr-2" />
                    Limitations
                  </h3>
                  <ul className="space-y-2">
                    {algorithm.cons.map((con, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="lg:w-80 mt-6 lg:mt-0">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 transition-colors">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Algorithm Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Category:</span>
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{algorithm.category}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Complexity:</span>
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{algorithm.complexity}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Common Use Cases:</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{algorithm.useCase}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mathematical Example - Conditionally displayed */}
        {showExample && algorithm.mathematicalExample && (
          <div className="mb-8 animate-fade-in">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-2xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-2 flex items-center">
                <Calculator className="w-6 h-6 mr-3" />
                Mathematical Example: {algorithm.mathematicalExample.title}
              </h3>
              <p className="text-purple-100">
                Follow along with real data and step-by-step calculations to understand how {algorithm.name} works in practice.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-b-2xl border-2 border-purple-200 dark:border-purple-700 transition-colors">
              <MathematicalExample 
                example={algorithm.mathematicalExample}
                isActive={true}
              />
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Learning Progress</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Step {currentStep + 1} of {algorithm.steps.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / algorithm.steps.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex space-x-2 overflow-x-auto">
            {algorithm.steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  index === currentStep
                    ? 'bg-blue-600 text-white'
                    : completedSteps.has(index)
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Algorithm Steps */}
        <div className="space-y-6">
          {algorithm.steps.map((step, index) => (
            <StepAnimation
              key={step.id}
              step={step}
              isActive={index === currentStep}
              algorithmId={algorithm.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};