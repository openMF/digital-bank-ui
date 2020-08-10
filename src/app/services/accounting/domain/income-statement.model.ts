
import {IncomeStatementSection} from './income-statement-section.model';

export interface IncomeStatement {
  date: string;
  incomeStatementSections: IncomeStatementSection[];
  grossProfit: string;
  totalExpenses: string;
  netIncome: string;
}
