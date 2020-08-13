import {Option} from './option.model';

export class Field {
  identifier: string;
  dataType: FieldDataType;
  label: string;
  hint?: string;
  description?: string;
  options: Option[];
  mandatory?: boolean;
  length?: number;
  precision?: number;
  minValue?: number;
  maxValue?: number;
  createdBy?: string;
  createdOn?: string;
}

export type FieldDataType = 'TEXT' | 'NUMBER' | 'DATE' | 'SINGLE_SELECTION' | 'MULTI_SELECTION';
