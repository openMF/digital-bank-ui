export type Action = 'OPEN' | 'CLOSE';

export type Adjustment = 'NONE' | 'DEBIT' | 'CREDIT';

export interface TellerManagementCommand {
  action: Action;
  adjustment?: Adjustment;
  amount?: number;
  assignedEmployeeIdentifier?: string;
}
