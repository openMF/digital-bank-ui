export type Action = 'ACTIVATE' | 'DEACTIVATE';

export interface ProductDefinitionCommand {
  action: Action;
  note?: string;
  createdBy?: string;
  createdOn?: string;
}
