export interface User {
  id: string;
  name: string;
  email: string;
}

export interface DataRow {
  [key: string]: string | number | null;
}

export interface Dataset {
  id?: string;
  name: string;
  data?: DataRow[];
  columns?: string[];
  uploadedAt?: Date;
  rowCount?: number;
  fileSize?: number;
  size: number;
  features: number;
  samples: number;
  type: 'numerical' | 'categorical' | 'mixed';
  target: 'classification' | 'regression' | 'clustering';
}

export interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'area' | 'scatter';
  xAxis?: string;
  yAxis?: string;
  title: string;
}

export interface PowerBIConfig {
  embedUrl: string;
  accessToken: string;
  reportId: string;
  groupId?: string;
}

export interface DashboardMetrics {
  totalRows: number;
  totalColumns: number;
  numericColumns: number;
  categoricalColumns: number;
  missingValues: number;
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

export interface AlgorithmStep {
  id: number;
  title: string;
  description: string;
  animation: string;
  code?: string;
}

export interface CalculationStep {
  step: number;
  title: string;
  formula: string;
  calculation: string;
  result: string;
  explanation: string;
}

export interface MathematicalExample {
  title: string;
  dataset: {
    description: string;
    features: string[];
    data: (string | number)[][];
  };
  calculations: CalculationStep[];
  finalResult: string;
  prediction: {
    newCase: (string | number)[];
    result: string | number;
    explanation: string;
  };
}

export interface Algorithm {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  complexity: string;
  useCase: string;
  pros: string[];
  cons: string[];
  steps: AlgorithmStep[];
  mathematicalExample: MathematicalExample;
}