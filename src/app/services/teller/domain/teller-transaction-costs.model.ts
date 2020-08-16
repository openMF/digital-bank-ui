import { Charge } from './charge.model';

export interface TellerTransactionCosts {
  tellerTransactionIdentifier?: string;
  totalAmount?: string;
  charges?: Charge[];
}
