import { TimeUnit } from '../../../services/depositAccount/domain/time-unit.model';

export interface TimeUnitOption {
  label: string;
  type: TimeUnit;
}

export const timeUnitOptionList: TimeUnitOption[] = [
  { type: 'MONTH', label: 'Month' },
  { type: 'YEAR', label: 'Year' },
];
