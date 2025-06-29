import React, { useState, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
  cluster: number;
  id: number;
  isAnimating: boolean;
}

interface Centroid {
  x: number;
  y: number;
  id: number;
  isMoving: boolean;
  oldX?: number;
  oldY?: number;
}

interface KMeansVizProps {
  isActive: boolean;
  step: number;
}

export const KMeansViz: React.FC<KMeansVizProps> = ({ isActive, step }) => {
  const [points] = useState<Point[]>([
    { x: 60, y: 80, cluster: -1, id: 1, isAnimating: false }, 
    { x: 80, y: 60, cluster: -1, id: 2, isAnimating: false },
    { x: 70, y: 90, cluster: -1, id: 3, isAnimating: false }, 
    { x: 90, y: 70, cluster: -1, id: 4, isAnimating: false },
    { x: 180, y: 160, cluster: -1, id: 5, isAnimating: false }, 
    { x: 200, y: 140, cluster: -1, id: 6, isAnimating: false },
    { x: 190, y: 170, cluster: -1, id: 7, isAnimating: false }, 
    { x: 210, y: 150, cluster: -1, id: 8, isAnimating: false },
    { x: 120, y: 200, cluster: -1, id: 9, isAnimating: false }, 
    { x: 140, y: 180, cluster: -1, id: 10, isAnimating: false },
    { x: 130, y: 210, cluster: -1, id: 11, isAnimating: false }, 
    { x: 150, y: 190, cluster: -1, id: 12, isAnimating: false }
  ]);

  const [centroids, setCentroids] = useState<Centroid[]>([
    { x: 100, y: 100, id: 0, isMoving: false },
    { x: 200, y: 100, id: 1, isMoving: false },
    { x: 150, y: 200, id: 2, isMoving: false }
  ]);

  const [assignedPoints, setAssignedPoints] = useState<Point[]>(points);
  const [iteration, setIteration] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'assign' | 'update' | 'idle'>('idle');

  const colors = ['#3b82f6', '#ef4444', '#10b981'];

  useEffect(() => {
    if (isActive && step >= 3) {
      const interval = setInterval(() => {
        setIteration(prev => {
          const newIteration = prev + 1;
          
          // Phase 1: Assign points to clusters with animation
          setAnimationPhase('assign');
          const newAssignedPoints = points.map(point => {
            let minDistance = Infinity;
            let nearestCluster = -1;
            
            centroids.forEach(centroid => {
              const distance = Math.sqrt(
                Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2)
              );
              if (distance < minDistance) {
                minDistance = distance;
                nearestCluster = centroid.id;
              }
            });
            
            return { ...point, cluster: nearestCluster, isAnimating: true };
          });
          
          setTimeout(() => {
            setAssignedPoints(newAssignedPoints.map(p => ({ ...p, isAnimating: false })));
          }, 500);
          
          // Phase 2: Update centroids with animation
          if (step >= 4) {
            setTimeout(() => {
              setAnimationPhase('update');
              const newCentroids = centroids.map(centroid => {
                const clusterPoints = newAssignedPoints.filter(p => p.cluster === centroid.id);
                if (clusterPoints.length > 0) {
                  const avgX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
                  const avgY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
                  return { 
                    ...centroid, 
                    oldX: centroid.x, 
                    oldY: centroid.y, 
                    x: avgX, 
                    y: avgY, 
                    isMoving: true 
                  };
                }
                return centroid;
              });
              setCentroids(newCentroids);
              
              setTimeout(() => {
                setCentroids(prev => prev.map(c => ({ ...c, isMoving: false })));
                setAnimationPhase('idle');
              }, 1000);
            }, 1000);
          }
          
          return newIteration > 8 ? 0 : newIteration;
        });
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isActive, step, points, centroids]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 transition-colors">
      <h4 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-white">K-Means Clustering Animation</h4>
      
      <svg width="300" height="280" className="mx-auto border border-gray-300 dark:border-gray-600 rounded">
        {/* Grid background */}
        <defs>
          <pattern id="kmeans-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f5f5f5" strokeWidth="1"/>
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#kmeans-grid)" />
        
        {/* Data points with enhanced animation */}
        {assignedPoints.map((point, index) => (
          <g key={point.id}>
            <circle
              cx={point.x}
              cy={point.y}
              r={point.isAnimating ? "7" : "5"}
              fill={point.cluster >= 0 ? colors[point.cluster] : '#6b7280'}
              stroke="#fff"
              strokeWidth="2"
              className={`transition-all duration-500 ${
                isActive && step >= 1 ? 'opacity-100' : 'opacity-0'
              } ${point.isAnimating ? 'animate-pulse' : ''}`}
              style={{ 
                transitionDelay: `${index * 50}ms`,
                filter: point.isAnimating ? 'url(#glow)' : 'none',
                transform: point.isAnimating ? 'scale(1.2)' : 'scale(1)'
              }}
            />
            
            {/* Ripple effect during assignment */}
            {point.isAnimating && animationPhase === 'assign' && (
              <circle
                cx={point.x}
                cy={point.y}
                r="15"
                fill="none"
                stroke={colors[point.cluster] || '#6b7280'}
                strokeWidth="2"
                opacity="0.5"
                className="animate-ping"
              />
            )}
          </g>
        ))}
        
        {/* Centroids with movement animation */}
        {centroids.map((centroid, index) => (
          <g key={centroid.id}>
            {/* Trail effect during movement */}
            {centroid.isMoving && centroid.oldX && centroid.oldY && (
              <line
                x1={centroid.oldX}
                y1={centroid.oldY}
                x2={centroid.x}
                y2={centroid.y}
                stroke={colors[centroid.id]}
                strokeWidth="3"
                strokeDasharray="5,5"
                opacity="0.6"
                className="animate-pulse"
              />
            )}
            
            <circle
              cx={centroid.x}
              cy={centroid.y}
              r={centroid.isMoving ? "10" : "8"}
              fill={colors[centroid.id]}
              stroke="#000"
              strokeWidth="3"
              className={`transition-all duration-1000 ${
                isActive && step >= 2 ? 'opacity-100' : 'opacity-0'
              } ${centroid.isMoving ? 'animate-bounce' : ''}`}
              style={{ 
                transitionDelay: `${index * 200}ms`,
                filter: centroid.isMoving ? 'url(#glow)' : 'none'
              }}
            />
            
            <text
              x={centroid.x}
              y={centroid.y + 3}
              textAnchor="middle"
              className="text-xs font-bold fill-white"
            >
              C{centroid.id + 1}
            </text>
            
            {/* Pulsing ring during update phase */}
            {centroid.isMoving && (
              <circle
                cx={centroid.x}
                cy={centroid.y}
                r="20"
                fill="none"
                stroke={colors[centroid.id]}
                strokeWidth="2"
                opacity="0.3"
                className="animate-ping"
              />
            )}
          </g>
        ))}
        
        {/* Distance lines with animation */}
        {isActive && step >= 3 && assignedPoints.map(point => {
          const centroid = centroids.find(c => c.id === point.cluster);
          return centroid ? (
            <line
              key={`line-${point.id}`}
              x1={point.x}
              y1={point.y}
              x2={centroid.x}
              y2={centroid.y}
              stroke={colors[point.cluster]}
              strokeWidth="1"
              strokeDasharray="2,2"
              opacity={animationPhase === 'assign' ? "0.8" : "0.3"}
              className={`transition-all duration-500 ${
                animationPhase === 'assign' ? 'animate-pulse' : ''
              }`}
            />
          ) : null;
        })}
        
        {/* Convergence indicator */}
        {isActive && step >= 5 && iteration > 5 && (
          <g>
            <circle cx="250" cy="30" r="15" fill="#10b981" className="animate-pulse" />
            <text x="250" y="35" textAnchor="middle" className="text-xs font-bold fill-white">
              ✓
            </text>
          </g>
        )}
      </svg>
      
      <div className="mt-4 text-center">
        <div className="flex justify-center space-x-4 text-sm mb-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">Cluster 1</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">Cluster 2</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">Cluster 3</span>
          </div>
        </div>
        <div className="flex justify-center space-x-4 text-sm mb-2">
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-black rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">Centroids</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-1 bg-gray-400 mr-2" style={{ borderStyle: 'dashed' }}></div>
            <span className="text-gray-700 dark:text-gray-300">Assignments</span>
          </div>
        </div>
        {isActive && step >= 3 && (
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 animate-fade-in">
            Iteration: {iteration} | Phase: {animationPhase} | 
            {animationPhase === 'assign' ? ' Assigning points...' : 
             animationPhase === 'update' ? ' Updating centroids...' : ' Converging...'}
          </div>
        )}
      </div>
    </div>
  );
};