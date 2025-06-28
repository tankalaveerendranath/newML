export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Algorithm {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  useCase: string;
  pros: string[];
  cons: string[];
  steps: AlgorithmStep[];
  mathematicalExample: MathematicalExample;
}

export interface AlgorithmStep {
  id: number;
  title: string;
  description: string;
  animation: string;
  code?: string;
}

export interface MathematicalExample {
  title: string;
  dataset: {
    description: string;
    data: number[][];
    labels?: (string | number)[];
    features: string[];
  };
  calculations: CalculationStep[];
  finalResult: string;
}

export interface CalculationStep {
  step: number;
  title: string;
  formula: string;
  calculation: string;
  result: string | number;
  explanation: string;
}

export interface Dataset {
  name: string;
  size: number;
  features: number;
  samples: number;
  type: 'numerical' | 'categorical' | 'mixed';
  target: 'classification' | 'regression' | 'clustering';
}

export interface DatasetRecommendation {
  algorithm: string;
  confidence: number;
  reasoning: string;
}

export interface DatasetAnalysis {
  id: string;
  timestamp: Date;
  fileName: string;
  dataset: Dataset;
  recommendations: DatasetRecommendation[];
}