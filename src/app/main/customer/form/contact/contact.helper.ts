import { ContactDetail } from '../../../../services/domain/contact/contact-detail.model';

export function getContactDetailValueByType(contactDetails: ContactDetail[], type: string): string {
  const items = contactDetails.filter(contact => contact.type === type);
  return items.length ? items[0].value : '';
}
