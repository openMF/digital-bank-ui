import { TaskDefinitionType } from '../../../../services/customer/domain/task-definition.model';

interface TypeOption {
  type: TaskDefinitionType;
  label: string;
}

export const defaultTypeOptions: TypeOption[] = [
  { type: 'ID_CARD', label: 'Identification card' },
  { type: 'FOUR_EYES', label: 'Four eyes' },
  { type: 'CUSTOM', label: 'Custom' },
];
