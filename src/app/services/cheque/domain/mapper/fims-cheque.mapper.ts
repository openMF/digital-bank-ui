import { FimsCheque } from '../fims-cheque.model';
import { Cheque } from '../cheque.model';
import { MICR } from '../micr.model';

export function mapToFimsCheque(cheque: Cheque): FimsCheque {
  return Object.assign({}, cheque, {
    identifier: micrToIdentifier(cheque.micr),
  });
}

export function mapToFimsCheques(cheques: Cheque[]): FimsCheque[] {
  return cheques.map(cheque => mapToFimsCheque(cheque));
}

export function micrToIdentifier(micr: MICR): string {
  return toMICRIdentifier(micr.chequeNumber, micr.branchSortCode, micr.accountNumber);
}

export function toMICRIdentifier(chequeNumber: string, branchSortCode: string, accountNumber: string): string {
  return `${chequeNumber}~${branchSortCode}~${accountNumber}`;
}
