import { TellerEntry } from './teller-entry.model';

export interface TellerBalanceSheet {
  day?: string;
  cashOnHand: string;
  cashReceivedTotal: string;
  cashDisbursedTotal: string;
  chequesReceivedTotal: string;
  cashEntries: TellerEntry[];
  chequeEntries: TellerEntry[];
}
