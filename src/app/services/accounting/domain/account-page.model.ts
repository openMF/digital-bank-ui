
import {Account} from './account.model';

export interface AccountPage {
  accounts: Account[];
  totalElements: number;
  totalPages: number;
}
