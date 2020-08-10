
import {FinancialConditionEntry} from './financial-condition-entry.model';

export type Type = 'ASSET' | 'EQUITY' | 'LIABILITY';

export interface FinancialConditionSection {
  type: Type;
  description: string;
  financialConditionEntries: FinancialConditionEntry[];
  subtotal: string;
}
