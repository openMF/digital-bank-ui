import { ContactDetail } from '../../domain/contact/contact-detail.model';

export interface Employee {
  identifier: string;
  givenName: string;
  middleName?: string;
  surname: string;
  assignedOffice?: string;
  contactDetails: ContactDetail[];
}
