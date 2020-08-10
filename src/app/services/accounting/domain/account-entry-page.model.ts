
import {AccountEntry} from './account-entry.model';

export interface AccountEntryPage {
  accountEntries: AccountEntry[];
  totalElements: number;
  totalPages: number;
}
