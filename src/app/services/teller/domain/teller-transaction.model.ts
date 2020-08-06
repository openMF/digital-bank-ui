import { Cheque } from './cheque.model';

export type State = 'PENDING' | 'CANCELED' | 'CONFIRMED';

export type TransactionType = 'ACCO' | 'ACCC' | 'ACCT' | 'CDPT' | 'CWDL' | 'PPAY' | 'CCHQ';

export interface TellerTransaction {
  identifier?: string;
  transactionType: TransactionType;
  transactionDate: string;
  customerIdentifier: string;
  productIdentifier: string;
  productCaseIdentifier?: string;
  customerAccountIdentifier: string;
  targetAccountIdentifier?: string;
  clerk: string;
  amount: number;
  state?: State;
  cheque?: Cheque;
}
