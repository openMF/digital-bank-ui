
export interface ChartOfAccountEntry {
  code: string;
  name: string;
  level: number;
  description: string;
  type: string;
  chartOfAccountEntries: ChartOfAccountEntry[];
}
