import { MICR } from './micr.model';
import { State } from './state.model';

export interface Cheque {
  micr: MICR;
  drawee: string;
  drawer: string;
  payee: string;
  amount: string;
  dateIssued: string;
  openCheque: boolean;
  state: State;
  journalEntryIdentifier: string;
}
