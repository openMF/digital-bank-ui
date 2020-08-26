import { Cheque } from './cheque.model';

export interface ChequeTransaction {
  cheque: Cheque;
  creditorAccountNumber: string;
}
