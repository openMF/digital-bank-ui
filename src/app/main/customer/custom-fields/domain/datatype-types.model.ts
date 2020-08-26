import { FieldDataType } from '../../../../services/catalog/domain/field.model';

export interface DataTypeOption {
  type: FieldDataType;
  label: string;
}

export const dataTypes: DataTypeOption[] = [
  { type: 'TEXT', label: 'Text' },
  { type: 'NUMBER', label: 'Number' },
  { type: 'DATE', label: 'Date' },
  { type: 'SINGLE_SELECTION', label: 'Single selection' },
  { type: 'MULTI_SELECTION', label: 'Multi selection' },
];
