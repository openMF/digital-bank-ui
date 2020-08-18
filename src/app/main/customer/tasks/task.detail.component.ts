import { Component } from '@angular/core';
import { TaskDefinition, TaskDefinitionCommand, TaskDefinitionType } from '../../../services/customer/domain/task-definition.model';
import { Observable } from 'rxjs/Observable';
import * as fromCustomers from '../store/index';
import { Store } from '@ngrx/store';
import { defaultCommandOptions } from './domain/command-options.model';
import { defaultTypeOptions } from './domain/type-options.model';

@Component({
  templateUrl: './task.detail.component.html',
  styleUrls: ['./task.detail.component.scss'],
})
export class TaskDetailComponent {
  task$: Observable<TaskDefinition>;

  constructor(private store: Store<fromCustomers.State>) {
    this.task$ = this.store.select(fromCustomers.getSelectedTask);
  }

  formatType(type: TaskDefinitionType): string {
    return defaultTypeOptions.find(option => option.type === type).label;
  }

  formatCommands(commands: TaskDefinitionCommand[]): string {
    const options = commands.map(command => defaultCommandOptions.find(option => option.command === command).label);

    return options.join(', ');
  }
}
