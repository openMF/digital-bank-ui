export type CommandAction = 'ACTIVATE' | 'LOCK' | 'UNLOCK' | 'CLOSE' | 'REOPEN';

export interface Command {
  action: CommandAction;
  comment?: string;
  createdOn?: string;
  createdBy?: string;
}
