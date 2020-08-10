import { Type } from '../../../services/depositAccount/domain/type.model';

export interface TypeOption {
  label: string;
  type: Type;
}

export const typeOptionList: TypeOption[] = [
  { type: 'CHECKING', label: 'Checking' },
  { type: 'SAVINGS', label: 'Savings' },
  { type: 'SHARE', label: 'Share' },
];
