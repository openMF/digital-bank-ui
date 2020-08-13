import { CustomerState } from './customer-state.model';
import { CustomerType } from './customer-type.model';
import { DateOfBirth } from './date-of-birth.model';
import { IdentificationCard } from './identification-card.model';
import { Address } from '../../domain/address/address.model';
import { ContactDetail } from '../../domain/contact/contact-detail.model';
import { Value } from '../../catalog/domain/value.model';

export interface Customer {
  identifier: string;
  type: CustomerType;
  givenName: string;
  middleName?: string;
  surname: string;
  dateOfBirth: DateOfBirth;
  identificationCard?: IdentificationCard;
  accountBeneficiary?: string;
  referenceCustomer?: string;
  assignedOffice?: string;
  assignedEmployee?: string;
  address: Address;
  contactDetails?: ContactDetail[];
  currentState?: CustomerState;
  applicationDate?: string;
  customValues: Value[];
  member: boolean;
  createdBy?: string;
  createdOn?: string;
  lastModifiedBy?: string;
  lastModifiedOn?: string;
}
