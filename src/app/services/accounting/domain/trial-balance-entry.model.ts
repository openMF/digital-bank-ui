
import {Ledger} from './ledger.model';
import {TrialBalanceEntryType} from './trial-balance-entry-type.model';

export interface TrialBalanceEntry {
  ledger: Ledger;
  type: TrialBalanceEntryType;
  amount: number;
}
