import {Field} from './field.model';

export interface Catalog {
  identifier: string;
  name: string;
  description?: string;
  fields: Field[];
  createdBy?: string;
  createdOn?: string;
  lastModifiedBy?: string;
  lastModifiedOn?: string;
}
