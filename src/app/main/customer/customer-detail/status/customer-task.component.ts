import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskDefinition, TaskDefinitionType } from '../../../../services/customer/domain/task-definition.model';
import { defaultTypeOptions } from '../../tasks/domain/type-options.model';

export interface SelectTaskEvent {
  taskIdentifier: string;
  checked: boolean;
}

@Component({
  selector: 'ngx-customer-task',
  templateUrl: './customer-task.component.html',
})
export class CustomerTaskComponent {
  @Input() task: TaskDefinition;

  @Input() disabled: boolean;

  @Output() onSelectTask = new EventEmitter<SelectTaskEvent>();

  constructor() {}

  selectTask(change: any): void {
    this.onSelectTask.emit({
      taskIdentifier: this.task.identifier,
      checked: change.checked,
    });
  }

  formatType(type: TaskDefinitionType): string {
    return defaultTypeOptions.find(option => option.type === type).label;
  }
}
