export type TaskDefinitionType = 'ID_CARD' | 'FOUR_EYES' | 'CUSTOM';

export type TaskDefinitionCommand = 'ACTIVATE' | 'LOCK' | 'UNLOCK' | 'CLOSE' | 'REOPEN';

export interface TaskDefinition {
  identifier: string;
  type: TaskDefinitionType;
  commands: TaskDefinitionCommand[];
  name: string;
  description: string;
  mandatory: boolean;
  predefined: boolean;
}
