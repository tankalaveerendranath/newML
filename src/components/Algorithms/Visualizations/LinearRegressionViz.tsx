import React, { useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
  isActive: boolean;
}

interface LinearRegressionVizProps {
  isActive: boolean;
  step: number;
}

export const LinearRegressionViz: React.FC<LinearRegressionVizProps> = ({ isActive, step }) => {
  const [points] = useState<Point[]>([
    { x: 30, y: 180, isActive: false }, { x: 50, y: 160, isActive: false }, 
    { x: 70, y: 140, isActive: false }, { x: 90, y: 130, isActive: false },
    { x: 110, y: 110, isActive: false }, { x: 130, y: 100, isActive: false }, 
    { x: 150, y: 80, isActive: false }, { x: 170, y: 70, isActive: false },
    { x: 190, y: 50, isActive: false }, { x: 210, y: 40, isActive: false }
  ]);
  
  const [currentLine, setCurrentLine] = useState({ slope: -0.5, intercept: 150 });
  const [iteration, setIteration] = useState(0);
  const [animatedPoints, setAnimatedPoints] = useState<Point[]>(points);

  useEffect(() => {
    if (isActive && step >= 1) {
      // Animate points appearing one by one
      points.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedPoints(prev => prev.map((p, i) => 
            i === index ? { ...p, isActive: true } : p
          ));
        }, index * 200);
      });
    }
  }, [isActive, step, points]);

  useEffect(() => {
    if (isActive && step >= 3) {
      const interval = setInterval(() => {
        setIteration(prev => {
          const newIteration = prev + 1;
          // Gradually improve the line fit with animation
          const targetSlope = -0.7;
          const targetIntercept = 180;
          const progress = Math.min(newIteration / 15, 1);
          
          setCurrentLine({
            slope: -0.5 + (targetSlope + 0.5) * progress,
            intercept: 150 + (targetIntercept - 150) * progress
          });
          
          // Animate points during gradient descent
          setAnimatedPoints(prev => prev.map((p, index) => ({
            ...p,
            isActive: true,
            x: p.x + Math.sin(newIteration * 0.1 + index) * 2
          })));
          
          return newIteration > 20 ? 0 : newIteration;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [isActive, step]);

  const getLineY = (x: number) => currentLine.slope * x + currentLine.intercept;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 transition-colors">
      <h4 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-white">Linear Regression Animation</h4>
      
      <svg width="300" height="250" className="mx-auto border border-gray-300 dark:border-gray-600 rounded">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Axes */}
        <line x1="20" y1="230" x2="280" y2="230" stroke="#666" strokeWidth="2" />
        <line x1="20" y1="230" x2="20" y2="20" stroke="#666" strokeWidth="2" />
        
        {/* Data points with animation */}
        {animatedPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x + 20}
            cy={point.y + 20}
            r={point.isActive ? "5" : "0"}
            fill="#3b82f6"
            className={`transition-all duration-500 ${
              point.isActive ? 'opacity-100 animate-pulse' : 'opacity-0'
            }`}
            style={{ 
              transitionDelay: `${index * 100}ms`,
              transform: step >= 3 ? `scale(${1 + Math.sin(iteration * 0.2 + index) * 0.1})` : 'scale(1)'
            }}
          />
        ))}
        
        {/* Regression line with animation */}
        {isActive && step >= 3 && (
          <line
            x1="20"
            y1={getLineY(0) + 20}
            x2="280"
            y2={getLineY(260) + 20}
            stroke="#ef4444"
            strokeWidth="3"
            className="transition-all duration-300 animate-pulse"
            strokeDasharray={step >= 5 ? "0" : "10,5"}
          />
        )}
        
        {/* Prediction lines (residuals) with staggered animation */}
        {isActive && step >= 4 && points.map((point, index) => (
          <line
            key={`residual-${index}`}
            x1={point.x + 20}
            y1={point.y + 20}
            x2={point.x + 20}
            y2={getLineY(point.x) + 20}
            stroke="#fbbf24"
            strokeWidth="2"
            strokeDasharray="3,3"
            className="transition-all duration-500 animate-fade-in"
            style={{ 
              transitionDelay: `${index * 100}ms`,
              opacity: Math.sin(iteration * 0.1 + index) * 0.3 + 0.7
            }}
          />
        ))}
        
        {/* Gradient descent visualization */}
        {isActive && step >= 5 && (
          <g>
            <circle
              cx={150}
              cy={100}
              r={3 + Math.sin(iteration * 0.3) * 2}
              fill="#10b981"
              className="animate-pulse"
            />
            <text x="155" y="105" className="text-xs fill-green-600 dark:fill-green-400">
              Optimizing...
            </text>
          </g>
        )}
        
        {/* Labels */}
        <text x="150" y="245" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Features (X)</text>
        <text x="10" y="125" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400" transform="rotate(-90 10 125)">Target (Y)</text>
      </svg>
      
      <div className="mt-4 text-center">
        <div className="flex justify-center space-x-4 text-sm mb-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-gray-700 dark:text-gray-300">Data Points</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-1 bg-red-500 mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">Best Fit Line</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-1 bg-yellow-500 mr-2" style={{ borderStyle: 'dashed' }}></div>
            <span className="text-gray-700 dark:text-gray-300">Residuals</span>
          </div>
        </div>
        {isActive && step >= 5 && (
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 animate-fade-in">
            Iteration: {iteration} | Cost: {(Math.random() * 0.5 + 0.1).toFixed(3)} | Learning...
          </div>
        )}
      </div>
    </div>
  );
};