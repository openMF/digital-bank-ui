
import {AccountType} from './account-type.model';
import {AccountState} from './account-state.model';

export interface Account {
  type?: AccountType;
  identifier: string;
  name: string;
  holders?: string[];
  signatureAuthorities?: string[];
  balance?: number;
  referenceAccount?: string;
  ledger: string;
  alternativeAccountNumber?: string;
  state?: AccountState;
  createdOn?: string;
  createdBy?: string;
  lastModifiedOn?: string;
  lastModifiedBy?: string;
}
