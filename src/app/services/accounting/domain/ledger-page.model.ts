
import {Ledger} from './ledger.model';

export interface LedgerPage {
  ledgers: Ledger[];
  totalElements: number;
  totalPages: number;
}
