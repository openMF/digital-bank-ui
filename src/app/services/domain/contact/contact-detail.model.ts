
export interface ContactDetail {
  type: ContactDetailType;
  group: ContactDetailGroup;
  value: string;
  preferenceLevel: number;
}

export const BUSINESS = 'BUSINESS';
export const PRIVATE = 'PRIVATE';

export type ContactDetailGroup = 'BUSINESS' | 'PRIVATE';

export const EMAIL = 'EMAIL';
export const PHONE = 'PHONE';
export const MOBILE = 'MOBILE';

export type ContactDetailType = 'EMAIL' | 'PHONE' | 'MOBILE';
