export interface Charge {
  actionIdentifier: string;
  incomeAccountIdentifier: string;
  name: string;
  description?: string;
  proportional?: boolean;
  amount?: number;
}
