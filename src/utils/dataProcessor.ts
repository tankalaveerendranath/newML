import { DataRow, Dataset, DashboardMetrics } from '../types/index';

export const processCSVData = (csvData: string, fileName: string): Dataset => {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  const data: DataRow[] = lines.slice(1).map((line, index) => {
    const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
    const row: DataRow = {};
    
    headers.forEach((header, i) => {
      const value = values[i] || null;
      // Try to convert to number if possible
      const numValue = parseFloat(value as string);
      row[header] = !isNaN(numValue) && value !== '' ? numValue : value;
    });
    
    return row;
  });

  return {
    id: `dataset_${Date.now()}`,
    name: fileName.replace('.csv', ''),
    data,
    columns: headers,
    uploadedAt: new Date(),
    rowCount: data.length,
    fileSize: csvData.length
  };
};

export const calculateMetrics = (dataset: Dataset): DashboardMetrics => {
  const { data, columns } = dataset;
  
  let numericColumns = 0;
  let categoricalColumns = 0;
  let missingValues = 0;
  
  columns.forEach(column => {
    const sampleValues = data.slice(0, 10).map(row => row[column]);
    const isNumeric = sampleValues.every(val => 
      val === null || val === '' || !isNaN(Number(val))
    );
    
    if (isNumeric) {
      numericColumns++;
    } else {
      categoricalColumns++;
    }
    
    // Count missing values for this column
    data.forEach(row => {
      if (row[column] === null || row[column] === '' || row[column] === undefined) {
        missingValues++;
      }
    });
  });
  
  return {
    totalRows: data.length,
    totalColumns: columns.length,
    numericColumns,
    categoricalColumns,
    missingValues
  };
};

export { calculateMetrics }

export { processCSVData }