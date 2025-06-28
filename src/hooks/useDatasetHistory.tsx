import { useState, useEffect } from 'react';
import { DatasetAnalysis } from '../types';

export const useDatasetHistory = (userId: string | null) => {
  const [history, setHistory] = useState<DatasetAnalysis[]>([]);

  useEffect(() => {
    if (userId) {
      const savedHistory = localStorage.getItem(`ml-dataset-history-${userId}`);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    }
  }, [userId]);

  const addToHistory = (analysis: DatasetAnalysis) => {
    if (!userId) return;
    
    const newHistory = [analysis, ...history].slice(0, 10); // Keep last 10 analyses
    setHistory(newHistory);
    localStorage.setItem(`ml-dataset-history-${userId}`, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    if (!userId) return;
    
    setHistory([]);
    localStorage.removeItem(`ml-dataset-history-${userId}`);
  };

  return { history, addToHistory, clearHistory };
};