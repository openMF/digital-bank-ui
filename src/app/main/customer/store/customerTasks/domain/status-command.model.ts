import { CustomerState } from '../../../../../services/customer/domain/customer-state.model';
import { TaskDefinition } from '../../../../../services/customer/domain/task-definition.model';
import { CommandAction } from '../../../../../services/customer/domain/command.model';

export interface StatusCommand {
  action: CommandAction;
  comment?: string;
  tasks: TaskDefinition[];
  preStates: CustomerState[];
}
