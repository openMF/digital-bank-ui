import { InterestPayable } from '../../../services/depositAccount/domain/interest-payable.model';

export interface InterestPayableOption {
  label: string;
  type: InterestPayable;
}

export const interestPayableOptionList: InterestPayableOption[] = [
  { type: 'MATURITY', label: 'Maturity' },
  { type: 'ANNUALLY', label: 'Annually' },
  { type: 'QUARTERLY', label: 'Quarterly' },
  { type: 'MONTHLY', label: 'Monthly' },
];
