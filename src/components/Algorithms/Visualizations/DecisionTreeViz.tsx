import React, { useState, useEffect } from 'react';

interface TreeNode {
  id: string;
  question?: string;
  value?: string;
  left?: TreeNode;
  right?: TreeNode;
  x: number;
  y: number;
  isVisible: boolean;
  isAnimating: boolean;
}

interface DecisionTreeVizProps {
  isActive: boolean;
  step: number;
}

export const DecisionTreeViz: React.FC<DecisionTreeVizProps> = ({ isActive, step }) => {
  const [tree, setTree] = useState<TreeNode>({
    id: 'root',
    question: 'Credit > 700?',
    x: 200,
    y: 50,
    isVisible: false,
    isAnimating: false,
    left: {
      id: 'left1',
      question: 'Debt < 0.4?',
      x: 100,
      y: 120,
      isVisible: false,
      isAnimating: false,
      left: {
        id: 'left2',
        value: 'Approved',
        x: 50,
        y: 190,
        isVisible: false,
        isAnimating: false
      },
      right: {
        id: 'right2',
        value: 'Rejected',
        x: 150,
        y: 190,
        isVisible: false,
        isAnimating: false
      }
    },
    right: {
      id: 'right1',
      value: 'Approved',
      x: 300,
      y: 120,
      isVisible: false,
      isAnimating: false
    }
  });

  const [dataFlow, setDataFlow] = useState<{ x: number; y: number; active: boolean }[]>([]);

  useEffect(() => {
    if (isActive) {
      const showNodes = async () => {
        const updateNodeVisibility = (node: TreeNode, nodeId: string, visible: boolean, animating: boolean = false): TreeNode => {
          if (node.id === nodeId) {
            return { ...node, isVisible: visible, isAnimating: animating };
          }
          return {
            ...node,
            left: node.left ? updateNodeVisibility(node.left, nodeId, visible, animating) : undefined,
            right: node.right ? updateNodeVisibility(node.right, nodeId, visible, animating) : undefined
          };
        };

        if (step >= 1) {
          setTree(prev => updateNodeVisibility(prev, 'root', true, true));
          setTimeout(() => {
            setTree(prev => updateNodeVisibility(prev, 'root', true, false));
          }, 500);
        }
        
        if (step >= 3) {
          setTimeout(() => {
            setTree(prev => updateNodeVisibility(prev, 'left1', true, true));
            setTree(prev => updateNodeVisibility(prev, 'right1', true, true));
            
            // Animate data flow
            setDataFlow([
              { x: 200, y: 50, active: true },
              { x: 100, y: 120, active: true },
              { x: 300, y: 120, active: true }
            ]);
            
            setTimeout(() => {
              setTree(prev => updateNodeVisibility(prev, 'left1', true, false));
              setTree(prev => updateNodeVisibility(prev, 'right1', true, false));
            }, 500);
          }, 800);
        }
        
        if (step >= 5) {
          setTimeout(() => {
            setTree(prev => updateNodeVisibility(prev, 'left2', true, true));
            setTree(prev => updateNodeVisibility(prev, 'right2', true, true));
            
            // Extended data flow animation
            setDataFlow(prev => [
              ...prev,
              { x: 50, y: 190, active: true },
              { x: 150, y: 190, active: true }
            ]);
            
            setTimeout(() => {
              setTree(prev => updateNodeVisibility(prev, 'left2', true, false));
              setTree(prev => updateNodeVisibility(prev, 'right2', true, false));
            }, 500);
          }, 1200);
        }
      };

      showNodes();
    }
  }, [isActive, step]);

  const renderNode = (node: TreeNode): JSX.Element => (
    <g key={node.id}>
      {/* Node shape with animation */}
      {node.question ? (
        <rect
          x={node.x - 40}
          y={node.y - 15}
          width="80"
          height="30"
          rx="5"
          fill="#3b82f6"
          stroke="#1e40af"
          strokeWidth="2"
          className={`transition-all duration-500 ${
            node.isVisible ? 'opacity-100' : 'opacity-0'
          } ${node.isAnimating ? 'animate-bounce' : ''}`}
          style={{
            transform: node.isAnimating ? 'scale(1.1)' : 'scale(1)',
            filter: node.isAnimating ? 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))' : 'none'
          }}
        />
      ) : (
        <ellipse
          cx={node.x}
          cy={node.y}
          rx="35"
          ry="20"
          fill={node.value === 'Approved' ? '#10b981' : '#ef4444'}
          stroke={node.value === 'Approved' ? '#059669' : '#dc2626'}
          strokeWidth="2"
          className={`transition-all duration-500 ${
            node.isVisible ? 'opacity-100' : 'opacity-0'
          } ${node.isAnimating ? 'animate-pulse' : ''}`}
          style={{
            transform: node.isAnimating ? 'scale(1.1)' : 'scale(1)',
            filter: node.isAnimating ? `drop-shadow(0 0 10px ${node.value === 'Approved' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'})` : 'none'
          }}
        />
      )}
      
      {/* Node text */}
      <text
        x={node.x}
        y={node.y + 4}
        textAnchor="middle"
        className={`text-xs font-medium transition-all duration-500 ${
          node.isVisible ? 'opacity-100' : 'opacity-0'
        } ${node.question ? 'fill-white' : 'fill-white'}`}
      >
        {node.question || node.value}
      </text>
      
      {/* Animated connections */}
      {node.left && (
        <>
          <line
            x1={node.x - 20}
            y1={node.y + 15}
            x2={node.left.x}
            y2={node.left.y - 15}
            stroke="#6b7280"
            strokeWidth="2"
            className={`transition-all duration-500 ${
              node.left.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            strokeDasharray={node.left.isAnimating ? "5,5" : "0"}
            style={{
              animation: node.left.isAnimating ? 'dash 1s linear infinite' : 'none'
            }}
          />
          <text
            x={(node.x - 20 + node.left.x) / 2 - 10}
            y={(node.y + 15 + node.left.y - 15) / 2}
            className="text-xs fill-gray-600 dark:fill-gray-400"
          >
            Yes
          </text>
          {renderNode(node.left)}
        </>
      )}
      
      {node.right && (
        <>
          <line
            x1={node.x + 20}
            y1={node.y + 15}
            x2={node.right.x}
            y2={node.right.y - 15}
            stroke="#6b7280"
            strokeWidth="2"
            className={`transition-all duration-500 ${
              node.right.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            strokeDasharray={node.right.isAnimating ? "5,5" : "0"}
            style={{
              animation: node.right.isAnimating ? 'dash 1s linear infinite' : 'none'
            }}
          />
          <text
            x={(node.x + 20 + node.right.x) / 2 + 10}
            y={(node.y + 15 + node.right.y - 15) / 2}
            className="text-xs fill-gray-600 dark:fill-gray-400"
          >
            No
          </text>
          {renderNode(node.right)}
        </>
      )}
    </g>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-600 transition-colors">
      <h4 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-white">Decision Tree Animation</h4>
      
      <svg width="400" height="250" className="mx-auto">
        <defs>
          <style>
            {`
              @keyframes dash {
                to {
                  stroke-dashoffset: -10;
                }
              }
            `}
          </style>
        </defs>
        
        {/* Data flow particles */}
        {dataFlow.map((flow, index) => (
          <circle
            key={index}
            cx={flow.x}
            cy={flow.y}
            r="3"
            fill="#fbbf24"
            className={`transition-all duration-1000 ${flow.active ? 'animate-ping' : ''}`}
            style={{
              opacity: flow.active ? 1 : 0,
              animationDelay: `${index * 200}ms`
            }}
          />
        ))}
        
        {renderNode(tree)}
      </svg>
      
      <div className="mt-4 text-center">
        <div className="flex justify-center space-x-4 text-sm mb-2">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">Decision Node</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">Approved</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300">Rejected</span>
          </div>
        </div>
        {isActive && step >= 2 && (
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 animate-fade-in">
            Building tree by finding best splits based on information gain
          </div>
        )}
      </div>
    </div>
  );
};