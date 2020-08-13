import {ExpirationDate} from './expiration-date.model';

export interface IdentificationCard {
  type: string;
  number: string;
  expirationDate: ExpirationDate;
  issuer?: string;
  createdBy?: string;
  createdOn?: string;
  lastModifiedBy?: string;
  lastModifiedOn?: string;
}
