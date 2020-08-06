export type Type = 'DEBIT' | 'CREDIT' | 'CHEQUE';

export interface TellerEntry {
  type?: Type;
  transactionDate: string;
  message: string;
  amount: number;
  balance: number;
}
