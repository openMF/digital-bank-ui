
import {TrialBalanceEntry} from './trial-balance-entry.model';

export interface TrialBalance {
  trialBalanceEntries: TrialBalanceEntry[];
  debitTotal: number;
  creditTotal: number;
}
