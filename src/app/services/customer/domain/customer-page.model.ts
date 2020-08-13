import { Customer } from './customer.model';

export interface CustomerPage {
  customers: Customer[];
  totalElements: number;
  totalPages: number;
}
