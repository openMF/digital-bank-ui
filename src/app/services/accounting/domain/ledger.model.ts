
import {AccountType} from './account-type.model';

export interface Ledger {
  parentLedgerIdentifier?: string;
  type: AccountType;
  identifier: string;
  name: string;
  description?: string;
  subLedgers: Ledger[];
  showAccountsInChart: boolean;
  totalValue?: string;
  createdOn?: string;
  createdBy?: string;
  lastModifiedOn?: string;
  lastModifiedBy?: string;
}
