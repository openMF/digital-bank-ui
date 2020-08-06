import { MICR } from './micr.model';

export interface Cheque {
  micr: MICR;
  drawee: string;
  drawer: string;
  payee: string;
  amount: number;
  dateIssued: string;
  openCheque?: boolean;
}
