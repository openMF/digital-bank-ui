import { Type } from '../type.model';
import { Currency } from './currency.model';
import { Charge } from './charge.model';
import { Term } from './term.model';

export interface ProductDefinition {
  type: Type;
  identifier: string;
  name: string;
  description?: string;
  currency: Currency;
  minimumBalance: number;
  equityLedgerIdentifier?: string;
  expenseAccountIdentifier: string;
  cashAccountIdentifier: string;
  accrueAccountIdentifier?: string;
  interest?: number;
  term: Term;
  charges: Charge[];
  flexible: boolean;
  active?: boolean;
}
