
import {TransactionType} from './transaction-type.model';

export interface TransactionTypePage {
  transactionTypes: TransactionType[];
  totalPages: number;
  totalElements: number;
}
