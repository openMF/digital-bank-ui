import { AccountCommandAction } from './account-command-action.model';

export interface AccountCommand {
  action: AccountCommandAction;
  comment: string;
  createdOn?: string;
  createdBy?: string;
}
