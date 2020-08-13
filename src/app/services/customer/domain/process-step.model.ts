import {Command} from './command.model';
import {TaskDefinition} from './task-definition.model';

export interface ProcessStep {
  command: Command;
  taskDefinitions: TaskDefinition[];
}
