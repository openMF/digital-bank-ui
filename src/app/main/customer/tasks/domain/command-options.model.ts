import { TaskDefinitionCommand } from '../../../../services/customer/domain/task-definition.model';

interface CommandOption {
  command: TaskDefinitionCommand;
  label: string;
}

export const defaultCommandOptions: CommandOption[] = [
  { command: 'ACTIVATE', label: 'is activated' },
  { command: 'UNLOCK', label: 'is unlocked' },
  { command: 'REOPEN', label: 'is reopened' },
];
