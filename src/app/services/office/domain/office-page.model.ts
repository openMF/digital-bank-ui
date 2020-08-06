import { Office } from './office.model';

export interface OfficePage {
  offices: Office[];
  totalPages: number;
  totalElements: number;
}
