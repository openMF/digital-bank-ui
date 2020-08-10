
import {IncomeStatementEntry} from './income-statement-entry.model';

export type Type = 'INCOME' | 'EXPENSES';

export interface IncomeStatementSection {
  type: Type;
  description: string;
  incomeStatementEntries: IncomeStatementEntry[];
  subtotal: string;
}
