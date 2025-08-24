export interface DataRow {
  [key: string]: string | number | null;
}

export interface Dataset {
  id: string;
  name: string;
  data: DataRow[];
  columns: string[];
  uploadedAt: Date;
  rowCount: number;
  fileSize: number;
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