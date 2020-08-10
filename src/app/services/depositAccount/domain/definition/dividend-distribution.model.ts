export interface DividendDistribution {
  dueDate: {
    year?: number;
    month?: number;
    day?: number;
  };
  dividendRate: string;
}
