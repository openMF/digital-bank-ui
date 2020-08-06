import { Address } from '../../domain/address/address.model';

export interface Office {
  identifier: string;
  parentIdentifier?: string;
  name: string;
  description?: string;
  address?: Address;
  branches?: Office[];
  tellerIds?: string[];
  externalReferences?: boolean;
}
