
import {Debtor} from './debtor.model';
import {Creditor} from './creditor.model';
import {JournalEntryState} from './journal-entry-state.model';

export interface JournalEntry {
  transactionIdentifier: string;
  transactionDate: string;
  transactionType: string;
  clerk: string;
  note?: string;
  debtors: Debtor[];
  creditors: Creditor[];
  state?: JournalEntryState;
  message?: string;
}
