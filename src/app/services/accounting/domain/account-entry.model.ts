
import {AccountEntryType} from './account-entry-type.model';

export interface AccountEntry {
  type: AccountEntryType;
  transactionDate: string;
  message: string;
  amount: number;
  balance: number;
}
