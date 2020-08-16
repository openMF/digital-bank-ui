export type Status = 'ACTIVE' | 'CLOSED' | 'OPEN' | 'PAUSED';

export interface Teller {
  code: string;
  password: string;
  cashdrawLimit: number;
  tellerAccountIdentifier: string;
  vaultAccountIdentifier: string;
  chequesReceivableAccount: string;
  cashOverShortAccount: string;
  denominationRequired: boolean;
  assignedEmployee?: string;
  state?: Status;
  createdBy?: string;
  createdOn?: string;
  lastModifiedBy?: string;
  lastModifiedOn?: string;
  lastOpenedBy?: string;
  lastOpenedOn?: string;
}
